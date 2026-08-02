# Taste Library macOS Shortcuts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add native Apple Shortcuts that reliably start/reuse and stop a localhost development server for Taste Library.

**Architecture:** A focused zsh lifecycle script owns server process management, readiness, and browser launch. Two reproducibly generated and locally signed Apple Shortcut files call that script, while shell and Python tests validate the lifecycle and Shortcut source structure independently of the GUI.

**Tech Stack:** macOS 27, Apple Shortcuts CLI, zsh, Python 3 standard library, Python `http.server`, curl, lsof, Node's built-in test runner

## Global Constraints

- Bind the server only to `127.0.0.1` on port `8765`.
- Serve `/Users/cerebra/Documents/GitHub/taste-library` as the document root.
- Reuse a healthy owned server rather than starting a duplicate.
- Never terminate an unrelated process, including one referenced by a stale PID file.
- Wait for an HTTP response before opening the default browser.
- Store PID and log files below `${TMPDIR:-/tmp}`, never in the repository.
- Use only built-in macOS and Python capabilities; add no package dependency.
- Provide signed **Open Taste Library** and **Stop Taste Library** `.shortcut` files.

---

## File Structure

- `scripts/taste-library-server.sh` — owns the `start`, `stop`, and `status` lifecycle interface.
- `tests/server_lifecycle_test.sh` — black-box tests for server ownership, reuse, readiness, stale state, and conflicts.
- `scripts/build_shortcuts.py` — creates deterministic Shortcut workflow plists and signs the two distributable files.
- `tests/shortcuts_test.py` — validates generated workflow structure and embedded commands without opening the GUI.
- `shortcuts/Open Taste Library.shortcut` — signed native launch shortcut.
- `shortcuts/Stop Taste Library.shortcut` — signed native stop shortcut.
- `README.md` — installation, use, troubleshooting, and pinning instructions.

---

### Task 1: Tested Server Lifecycle Controller

**Files:**
- Create: `scripts/taste-library-server.sh`
- Create: `tests/server_lifecycle_test.sh`

**Interfaces:**
- Consumes: command `start`, `stop`, or `status` as `$1`.
- Consumes test overrides: `TASTE_LIBRARY_ROOT`, `TASTE_LIBRARY_HOST`, `TASTE_LIBRARY_PORT`, `TASTE_LIBRARY_STATE_DIR`, `TASTE_LIBRARY_PYTHON`, `TASTE_LIBRARY_CURL`, `TASTE_LIBRARY_OPEN`, `TASTE_LIBRARY_NO_OPEN`, and `TASTE_LIBRARY_READY_ATTEMPTS`.
- Produces: one human-readable status line on stdout and exit status `0` on success; one actionable error line on stderr and nonzero status on failure.
- Produces runtime state: `$TASTE_LIBRARY_STATE_DIR/server.pid` and `$TASTE_LIBRARY_STATE_DIR/server.log`.

- [ ] **Step 1: Write the failing lifecycle test**

Create `tests/server_lifecycle_test.sh`:

```zsh
#!/bin/zsh
set -eu

REPO_ROOT=${0:A:h:h}
SERVER_SCRIPT="$REPO_ROOT/scripts/taste-library-server.sh"
TEST_ROOT=$(mktemp -d "${TMPDIR:-/tmp}/taste-library-server-test.XXXXXX")
SITE_ROOT="$TEST_ROOT/site"
STATE_DIR="$TEST_ROOT/state"
PROBE_FILE="$TEST_ROOT/opened-url"
OPEN_PROBE="$TEST_ROOT/open-probe.sh"
PYTHON_BIN=$(command -v python3)
foreign_pid=''

mkdir -p "$SITE_ROOT"
print -r -- '<!doctype html><title>Taste Library Test</title>' > "$SITE_ROOT/index.html"

cat > "$OPEN_PROBE" <<'PROBE'
#!/bin/zsh
set -eu
/usr/bin/curl --fail --silent --show-error --max-time 1 "$1" >/dev/null
print -r -- "$1" > "$PROBE_FILE"
PROBE
chmod +x "$OPEN_PROBE"

free_port() {
  "$PYTHON_BIN" - <<'PY'
import socket
with socket.socket() as sock:
    sock.bind(('127.0.0.1', 0))
    print(sock.getsockname()[1])
PY
}

PORT=$(free_port)

run_server() {
  env \
    TASTE_LIBRARY_ROOT="$SITE_ROOT" \
    TASTE_LIBRARY_HOST='127.0.0.1' \
    TASTE_LIBRARY_PORT="$PORT" \
    TASTE_LIBRARY_STATE_DIR="$STATE_DIR" \
    TASTE_LIBRARY_PYTHON="$PYTHON_BIN" \
    TASTE_LIBRARY_OPEN="$OPEN_PROBE" \
    TASTE_LIBRARY_READY_ATTEMPTS='50' \
    PROBE_FILE="$PROBE_FILE" \
    "$SERVER_SCRIPT" "$@"
}

fail() {
  print -u2 -- "FAIL: $*"
  exit 1
}

cleanup() {
  run_server stop >/dev/null 2>&1 || true
  if [[ -n "$foreign_pid" ]] && kill -0 "$foreign_pid" 2>/dev/null; then
    kill "$foreign_pid" 2>/dev/null || true
    wait "$foreign_pid" 2>/dev/null || true
  fi
  rm -rf -- "$TEST_ROOT"
}
trap cleanup EXIT INT TERM

start_output=$(run_server start)
[[ "$start_output" == *'started'* ]] || fail "unexpected start output: $start_output"
[[ -s "$STATE_DIR/server.pid" ]] || fail 'start did not create a PID file'
[[ -s "$PROBE_FILE" ]] || fail 'browser probe was not called after readiness'
/usr/bin/curl --fail --silent --show-error --max-time 1 "http://127.0.0.1:$PORT/" >/dev/null || fail 'server is not reachable'

first_pid=$(<"$STATE_DIR/server.pid")
reuse_output=$(run_server start)
second_pid=$(<"$STATE_DIR/server.pid")
[[ "$reuse_output" == *'reused'* ]] || fail "unexpected reuse output: $reuse_output"
[[ "$first_pid" == "$second_pid" ]] || fail 'repeated start created a second process'

status_output=$(run_server status)
[[ "$status_output" == *'running'* ]] || fail "unexpected status output: $status_output"

stop_output=$(run_server stop)
[[ "$stop_output" == *'stopped'* ]] || fail "unexpected stop output: $stop_output"
[[ ! -e "$STATE_DIR/server.pid" ]] || fail 'stop left the PID file behind'
if /usr/bin/curl --silent --max-time 1 "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
  fail 'server remained reachable after stop'
fi

second_stop_output=$(run_server stop)
[[ "$second_stop_output" == *'already stopped'* ]] || fail "repeated stop was not idempotent: $second_stop_output"

mkdir -p "$STATE_DIR"
print -r -- '999999' > "$STATE_DIR/server.pid"
if run_server status > "$TEST_ROOT/stale-status" 2>&1; then
  fail 'status succeeded for a stale PID'
fi
[[ ! -e "$STATE_DIR/server.pid" ]] || fail 'stale PID file was not removed'

CONFLICT_PORT=$(free_port)
"$PYTHON_BIN" -m http.server "$CONFLICT_PORT" --bind 127.0.0.1 --directory "$SITE_ROOT" \
  </dev/null >"$TEST_ROOT/foreign.log" 2>&1 &
foreign_pid=$!
for attempt in {1..50}; do
  /usr/bin/curl --silent --max-time 1 "http://127.0.0.1:$CONFLICT_PORT/" >/dev/null 2>&1 && break
  sleep 0.1
done

if env \
  TASTE_LIBRARY_ROOT="$SITE_ROOT" \
  TASTE_LIBRARY_PORT="$CONFLICT_PORT" \
  TASTE_LIBRARY_STATE_DIR="$TEST_ROOT/conflict-state" \
  TASTE_LIBRARY_PYTHON="$PYTHON_BIN" \
  TASTE_LIBRARY_NO_OPEN='1' \
  "$SERVER_SCRIPT" start > "$TEST_ROOT/conflict-output" 2>&1; then
  fail 'start succeeded while another process owned the port'
fi
/usr/bin/grep -q 'already in use' "$TEST_ROOT/conflict-output" || fail 'port conflict error was not actionable'
kill -0 "$foreign_pid" 2>/dev/null || fail 'port conflict handling killed the unrelated server'

if env \
  TASTE_LIBRARY_ROOT="$SITE_ROOT" \
  TASTE_LIBRARY_PORT="$(free_port)" \
  TASTE_LIBRARY_STATE_DIR="$TEST_ROOT/missing-python-state" \
  TASTE_LIBRARY_PYTHON='/path/that/does/not/exist/python3' \
  TASTE_LIBRARY_NO_OPEN='1' \
  "$SERVER_SCRIPT" start > "$TEST_ROOT/missing-python-output" 2>&1; then
  fail 'start succeeded without Python'
fi
/usr/bin/grep -q 'Python 3 was not found' "$TEST_ROOT/missing-python-output" || fail 'missing Python error was not actionable'

print -r -- 'PASS: Taste Library server lifecycle'
```

- [ ] **Step 2: Run the lifecycle test and verify the expected failure**

Run:

```bash
chmod +x tests/server_lifecycle_test.sh
tests/server_lifecycle_test.sh
```

Expected: FAIL because `scripts/taste-library-server.sh` does not exist.

- [ ] **Step 3: Implement the lifecycle controller**

Create `scripts/taste-library-server.sh`:

```zsh
#!/bin/zsh
set -u

SCRIPT_DIR=${0:A:h}
DEFAULT_ROOT=${SCRIPT_DIR:h}
PROJECT_ROOT=${TASTE_LIBRARY_ROOT:-$DEFAULT_ROOT}
HOST=${TASTE_LIBRARY_HOST:-127.0.0.1}
PORT=${TASTE_LIBRARY_PORT:-8765}
STATE_DIR=${TASTE_LIBRARY_STATE_DIR:-${TMPDIR:-/tmp}/taste-library-server-${UID}}
PYTHON_BIN=${TASTE_LIBRARY_PYTHON:-$(command -v python3 2>/dev/null || true)}
CURL_BIN=${TASTE_LIBRARY_CURL:-/usr/bin/curl}
OPEN_BIN=${TASTE_LIBRARY_OPEN:-/usr/bin/open}
READY_ATTEMPTS=${TASTE_LIBRARY_READY_ATTEMPTS:-50}
PID_FILE="$STATE_DIR/server.pid"
LOG_FILE="$STATE_DIR/server.log"
URL="http://${HOST}:${PORT}/"

error() {
  print -u2 -r -- "Taste Library: $*"
}

ensure_state_dir() {
  mkdir -p "$STATE_DIR" || {
    error "could not create state directory: $STATE_DIR"
    return 1
  }
  chmod 700 "$STATE_DIR" 2>/dev/null || true
}

read_pid() {
  [[ -r "$PID_FILE" ]] || return 1
  local pid
  IFS= read -r pid < "$PID_FILE" || return 1
  [[ "$pid" == <-> ]] || return 1
  print -r -- "$pid"
}

pid_is_owned() {
  local pid=$1
  local command_line
  kill -0 "$pid" 2>/dev/null || return 1
  command_line=$(/bin/ps -p "$pid" -o command= 2>/dev/null) || return 1
  [[ "$command_line" == *"-m http.server ${PORT}"* ]] || return 1
  [[ "$command_line" == *"--bind ${HOST}"* ]] || return 1
  [[ "$command_line" == *"--directory ${PROJECT_ROOT}"* ]] || return 1
}

server_is_ready() {
  "$CURL_BIN" --fail --silent --show-error --max-time 1 "$URL" >/dev/null 2>&1
}

port_is_occupied() {
  /usr/sbin/lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1
}

remove_pid_file() {
  rm -f -- "$PID_FILE"
}

terminate_owned_pid() {
  local pid=$1
  local attempt=0
  pid_is_owned "$pid" || return 1
  kill "$pid" 2>/dev/null || return 1
  while kill -0 "$pid" 2>/dev/null && (( attempt < 50 )); do
    sleep 0.1
    (( attempt += 1 ))
  done
  ! kill -0 "$pid" 2>/dev/null
}

open_url() {
  [[ ${TASTE_LIBRARY_NO_OPEN:-0} == 1 ]] && return 0
  [[ -x "$OPEN_BIN" ]] || {
    error "browser launcher was not found: $OPEN_BIN"
    return 1
  }
  "$OPEN_BIN" "$URL" || {
    error "server is running, but the browser could not be opened: $URL"
    return 1
  }
}

start_server() {
  [[ -n "$PYTHON_BIN" && -x "$PYTHON_BIN" ]] || {
    error 'Python 3 was not found. Install Python 3 or set TASTE_LIBRARY_PYTHON.'
    return 1
  }
  [[ -x "$CURL_BIN" ]] || {
    error "curl was not found: $CURL_BIN"
    return 1
  }
  [[ -d "$PROJECT_ROOT" && -r "$PROJECT_ROOT/index.html" ]] || {
    error "Taste Library index.html was not found under: $PROJECT_ROOT"
    return 1
  }
  ensure_state_dir || return 1

  local pid
  if pid=$(read_pid); then
    if pid_is_owned "$pid"; then
      if server_is_ready; then
        open_url || return 1
        print -r -- "Taste Library server reused at $URL"
        return 0
      fi
      terminate_owned_pid "$pid" || {
        error "owned server process $pid is unresponsive; log: $LOG_FILE"
        return 1
      }
    fi
    remove_pid_file
  elif [[ -e "$PID_FILE" ]]; then
    remove_pid_file
  fi

  if port_is_occupied; then
    error "port $PORT is already in use by another process; it was left untouched"
    return 1
  fi

  : > "$LOG_FILE"
  /usr/bin/nohup "$PYTHON_BIN" -m http.server "$PORT" --bind "$HOST" --directory "$PROJECT_ROOT" \
    </dev/null >>"$LOG_FILE" 2>&1 &
  pid=$!
  print -r -- "$pid" > "$PID_FILE"

  local attempt=0
  while (( attempt < READY_ATTEMPTS )); do
    if server_is_ready; then
      open_url || return 1
      print -r -- "Taste Library server started at $URL"
      return 0
    fi
    if ! kill -0 "$pid" 2>/dev/null; then
      remove_pid_file
      error "server exited during startup; log: $LOG_FILE"
      return 1
    fi
    sleep 0.1
    (( attempt += 1 ))
  done

  terminate_owned_pid "$pid" 2>/dev/null || true
  remove_pid_file
  error "server did not become ready; log: $LOG_FILE"
  return 1
}

stop_server() {
  local pid
  if ! pid=$(read_pid); then
    [[ -e "$PID_FILE" ]] && remove_pid_file
    print -r -- 'Taste Library server was already stopped.'
    return 0
  fi

  if ! pid_is_owned "$pid"; then
    remove_pid_file
    print -r -- 'Taste Library server was already stopped; stale state was removed.'
    return 0
  fi

  terminate_owned_pid "$pid" || {
    error "server process $pid did not stop cleanly"
    return 1
  }
  remove_pid_file
  print -r -- 'Taste Library server stopped.'
}

status_server() {
  local pid
  if ! pid=$(read_pid); then
    [[ -e "$PID_FILE" ]] && remove_pid_file
    error 'Taste Library server is not running.'
    return 1
  fi
  if ! pid_is_owned "$pid"; then
    remove_pid_file
    error 'Taste Library server is not running; stale state was removed.'
    return 1
  fi
  if ! server_is_ready; then
    error "Taste Library server process $pid exists but is not reachable; log: $LOG_FILE"
    return 1
  fi
  print -r -- "Taste Library server is running at $URL (PID $pid)."
}

case ${1:-} in
  start) start_server ;;
  stop) stop_server ;;
  status) status_server ;;
  *)
    error 'usage: taste-library-server.sh start|stop|status'
    exit 64
    ;;
esac
```

- [ ] **Step 4: Mark the controller executable and run the lifecycle test**

Run:

```bash
chmod +x scripts/taste-library-server.sh
tests/server_lifecycle_test.sh
```

Expected: `PASS: Taste Library server lifecycle` and exit status `0`.

- [ ] **Step 5: Run the existing application tests**

Run:

```bash
node --test tests/*.test.js
```

Expected: 10 tests pass and 0 fail.

- [ ] **Step 6: Commit the lifecycle controller**

```bash
git add scripts/taste-library-server.sh tests/server_lifecycle_test.sh
git commit -m "Add tested Taste Library server lifecycle controller"
```

---

### Task 2: Reproducible Native Apple Shortcut Artifacts

**Files:**
- Create: `scripts/build_shortcuts.py`
- Create: `tests/shortcuts_test.py`
- Create: `shortcuts/Open Taste Library.shortcut`
- Create: `shortcuts/Stop Taste Library.shortcut`

**Interfaces:**
- Consumes: `workflow_for(command: str)`, where `command` is exactly `start` or `stop`.
- Produces: a plist-compatible `dict` containing one `is.workflow.actions.runshellscript` action.
- Embeds: `/Users/cerebra/Documents/GitHub/taste-library/scripts/taste-library-server.sh`, the stable post-integration script path.
- Consumes CLI: `python3 scripts/build_shortcuts.py`.
- Produces: two locally signed `.shortcut` files under `shortcuts/`.

- [ ] **Step 1: Write the failing Shortcut structure tests**

Create `tests/shortcuts_test.py`:

```python
import importlib.util
from pathlib import Path
import unittest


REPO_ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = REPO_ROOT / 'scripts' / 'build_shortcuts.py'
INSTALLED_SERVER_SCRIPT = Path('/Users/cerebra/Documents/GitHub/taste-library/scripts/taste-library-server.sh')


def load_builder():
    spec = importlib.util.spec_from_file_location('build_shortcuts', MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class ShortcutWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.builder = load_builder()

    def action_for(self, command):
        workflow = self.builder.workflow_for(command)
        self.assertEqual(len(workflow['WFWorkflowActions']), 1)
        return workflow['WFWorkflowActions'][0]

    def test_open_shortcut_runs_start_and_notifies(self):
        action = self.action_for('start')
        self.assertEqual(action['WFWorkflowActionIdentifier'], 'is.workflow.actions.runshellscript')
        params = action['WFWorkflowActionParameters']
        self.assertEqual(params['WFShell'], '/bin/zsh')
        self.assertIn(str(INSTALLED_SERVER_SCRIPT), params['WFScript'])
        self.assertIn(' start ', params['WFScript'])
        self.assertIn('display notification', params['WFScript'])

    def test_stop_shortcut_runs_stop_and_notifies(self):
        action = self.action_for('stop')
        params = action['WFWorkflowActionParameters']
        self.assertIn(' stop ', params['WFScript'])
        self.assertIn('display notification', params['WFScript'])

    def test_workflows_have_deterministic_distinct_uuids(self):
        start_one = self.action_for('start')['WFWorkflowActionParameters']['UUID']
        start_two = self.action_for('start')['WFWorkflowActionParameters']['UUID']
        stop_uuid = self.action_for('stop')['WFWorkflowActionParameters']['UUID']
        self.assertEqual(start_one, start_two)
        self.assertNotEqual(start_one, stop_uuid)

    def test_unknown_command_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'start or stop'):
            self.builder.workflow_for('restart')


if __name__ == '__main__':
    unittest.main()
```

- [ ] **Step 2: Run the Shortcut tests and verify the expected failure**

Run:

```bash
python3 -m unittest tests/shortcuts_test.py -v
```

Expected: FAIL because `scripts/build_shortcuts.py` does not exist.

- [ ] **Step 3: Implement the Shortcut workflow builder and signer**

Create `scripts/build_shortcuts.py`:

```python
#!/usr/bin/env python3
"""Build and locally sign Taste Library Apple Shortcut files."""

import plistlib
from pathlib import Path
import shlex
import subprocess
import tempfile
import uuid


REPO_ROOT = Path(__file__).resolve().parents[1]
SOURCE_SERVER_SCRIPT = REPO_ROOT / 'scripts' / 'taste-library-server.sh'
INSTALLED_SERVER_SCRIPT = Path('/Users/cerebra/Documents/GitHub/taste-library/scripts/taste-library-server.sh')
OUTPUT_DIR = REPO_ROOT / 'shortcuts'
SHORTCUTS_BIN = Path('/usr/bin/shortcuts')
ACTION_NAMESPACE = uuid.UUID('cd989a12-480a-45e1-8b0f-2d37a390c7ed')

SHORTCUT_NAMES = {
    'start': 'Open Taste Library',
    'stop': 'Stop Taste Library',
}


def embedded_shell(command):
    script = shlex.quote(str(INSTALLED_SERVER_SCRIPT))
    return '\n'.join([
        f'RESULT=$({script} {command} 2>&1)',
        'STATUS=$?',
        "/usr/bin/osascript -e 'on run argv' "
        "-e 'display notification (item 1 of argv) with title \"Taste Library\"' "
        "-e 'end run' -- \"$RESULT\"",
        'exit "$STATUS"',
    ])


def workflow_for(command):
    if command not in SHORTCUT_NAMES:
        raise ValueError('command must be start or stop')

    action_uuid = str(uuid.uuid5(ACTION_NAMESPACE, command)).upper()
    return {
        'WFWorkflowClientRelease': '4.0',
        'WFWorkflowClientVersion': '4000',
        'WFWorkflowMinimumClientVersion': 900,
        'WFWorkflowMinimumClientVersionString': '900',
        'WFWorkflowIcon': {
            'WFWorkflowIconGlyphNumber': 59446,
            'WFWorkflowIconStartColor': 4282601983,
        },
        'WFWorkflowImportQuestions': [],
        'WFWorkflowInputContentItemClasses': ['WFGenericFileContentItem'],
        'WFWorkflowOutputContentItemClasses': [],
        'WFWorkflowTypes': [],
        'WFWorkflowActions': [
            {
                'WFWorkflowActionIdentifier': 'is.workflow.actions.runshellscript',
                'WFWorkflowActionParameters': {
                    'UUID': action_uuid,
                    'WFShell': '/bin/zsh',
                    'WFScript': embedded_shell(command),
                    'WFUseShellEnvironment': True,
                },
            }
        ],
    }


def build_shortcut(command):
    name = SHORTCUT_NAMES[command]
    output = OUTPUT_DIR / f'{name}.shortcut'
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix='taste-library-shortcut-') as temp_dir:
        unsigned = Path(temp_dir) / f'{name}.shortcut'
        with unsigned.open('wb') as handle:
            plistlib.dump(workflow_for(command), handle, fmt=plistlib.FMT_BINARY, sort_keys=True)

        subprocess.run(
            [
                str(SHORTCUTS_BIN),
                'sign',
                '--mode',
                'people-who-know-me',
                '--input',
                str(unsigned),
                '--output',
                str(output),
            ],
            check=True,
        )
    return output


def main():
    if not SHORTCUTS_BIN.exists():
        raise SystemExit('Apple Shortcuts CLI was not found at /usr/bin/shortcuts')
    if not SOURCE_SERVER_SCRIPT.exists():
        raise SystemExit(f'Server lifecycle script was not found: {SOURCE_SERVER_SCRIPT}')

    for command in ('start', 'stop'):
        output = build_shortcut(command)
        print(f'Built {output}')


if __name__ == '__main__':
    main()
```

- [ ] **Step 4: Run the Shortcut structure tests**

Run:

```bash
python3 -m unittest tests/shortcuts_test.py -v
```

Expected: 4 tests pass and 0 fail.

- [ ] **Step 5: Generate and sign the Shortcut files**

Run:

```bash
chmod +x scripts/build_shortcuts.py
python3 scripts/build_shortcuts.py
```

Expected: both signed output paths are printed and the command exits with status `0`.

- [ ] **Step 6: Verify the signed artifacts exist and are non-empty**

Run:

```bash
test -s "shortcuts/Open Taste Library.shortcut"
test -s "shortcuts/Stop Taste Library.shortcut"
ls -lh shortcuts/*.shortcut
```

Expected: two non-empty `.shortcut` files are listed.

- [ ] **Step 7: Commit the builder, tests, and signed artifacts**

```bash
git add scripts/build_shortcuts.py tests/shortcuts_test.py shortcuts
git commit -m "Add signed Apple Shortcuts for Taste Library"
```

---

### Task 3: Documentation and End-to-End Verification

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: the two signed files under `shortcuts/` and `scripts/taste-library-server.sh start|stop|status`.
- Produces: user-facing installation, pinning, command-line fallback, state, and troubleshooting documentation.

- [ ] **Step 1: Add the exact macOS Shortcuts documentation**

Append this section to `README.md` after **Running it**:

```markdown
## macOS Shortcuts

The `shortcuts/` folder contains two signed Apple Shortcuts:

- **Open Taste Library** starts or reuses a local server at
  `http://127.0.0.1:8765/`, waits until it is ready, and opens it in your
  default browser.
- **Stop Taste Library** cleanly stops that background server.

Double-click each `.shortcut` file once and choose **Add Shortcut**. You can
then run them from the Shortcuts app or pin them from Shortcut Details to the
menu bar or Dock.

The same lifecycle commands are available in Terminal:

    scripts/taste-library-server.sh start
    scripts/taste-library-server.sh status
    scripts/taste-library-server.sh stop

PID and log files live in a user-specific folder below `${TMPDIR:-/tmp}`.
If launch fails, the notification reports the log location. Port `8765` is
localhost-only; if another process already uses it, Taste Library leaves that
process untouched and reports the conflict.
```

- [ ] **Step 2: Run every automated test**

Run:

```bash
tests/server_lifecycle_test.sh
python3 -m unittest tests/shortcuts_test.py -v
node --test tests/*.test.js
```

Expected: lifecycle test passes, 4 Shortcut tests pass, and 10 JavaScript tests pass.

- [ ] **Step 3: Perform a direct lifecycle smoke test without opening a browser**

Run:

```bash
TASTE_LIBRARY_NO_OPEN=1 scripts/taste-library-server.sh stop
TASTE_LIBRARY_NO_OPEN=1 scripts/taste-library-server.sh start
first_pid=$(<"${TMPDIR:-/tmp}/taste-library-server-${UID}/server.pid")
TASTE_LIBRARY_NO_OPEN=1 scripts/taste-library-server.sh start
second_pid=$(<"${TMPDIR:-/tmp}/taste-library-server-${UID}/server.pid")
test "$first_pid" = "$second_pid"
curl --fail --silent --show-error http://127.0.0.1:8765/ >/dev/null
TASTE_LIBRARY_NO_OPEN=1 scripts/taste-library-server.sh stop
```

Expected: the second start reports reuse, both PID values match, curl succeeds before stop, and stop succeeds.

- [ ] **Step 4: Validate the working tree and commit documentation**

Run:

```bash
git diff --check
git status --short
git add README.md
git commit -m "Document Taste Library macOS Shortcuts"
```

Expected: no whitespace errors; only the intended README change is committed.

- [ ] **Step 5: Confirm the artifacts target the permanent repository path**

Run:

```bash
python3 -m unittest tests/shortcuts_test.py -v
```

Expected: the tests pass and confirm that both workflows invoke `/Users/cerebra/Documents/GitHub/taste-library/scripts/taste-library-server.sh`, not the temporary worktree.

- [ ] **Step 6: Record the required post-integration native verification**

After the feature branch is integrated into `/Users/cerebra/Documents/GitHub/taste-library`, the controller will run:

```bash
open "shortcuts/Open Taste Library.shortcut"
open "shortcuts/Stop Taste Library.shortcut"
shortcuts run "Open Taste Library"
curl --fail --silent --show-error http://127.0.0.1:8765/ >/dev/null
shortcuts run "Open Taste Library"
shortcuts run "Stop Taste Library"
if curl --silent --max-time 1 http://127.0.0.1:8765/ >/dev/null 2>&1; then exit 1; fi
```

Expected after the user accepts both native import prompts: the first run opens the gallery, the second run reuses the server, the stop shortcut reports success, and the final HTTP probe fails because the server is stopped.

- [ ] **Step 7: Record final repository evidence**

Run:

```bash
git status --short --branch
git log -4 --oneline --decorate
```

Expected: a clean working tree on `feature/taste-library-shortcuts` with separate lifecycle, Shortcut, and documentation commits on top of the approved design and plan.

The native import and end-to-end commands in Step 6 are intentionally deferred until after integration because the signed workflows target the stable main-repository path. They must not target the temporary implementation worktree, which is deleted after final review.
