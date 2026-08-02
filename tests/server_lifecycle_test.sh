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
DEFAULT_TMPDIR_ONE="$TEST_ROOT/default-tmp-one"
DEFAULT_TMPDIR_TWO="$TEST_ROOT/default-tmp-two"
DEFAULT_STATE_ROOT="$TEST_ROOT/default-state-root"
DEFAULT_STATE_DIR="$DEFAULT_STATE_ROOT/taste-library-server-${UID}"
RACE_PYTHON="$TEST_ROOT/race-python.sh"
RACE_SENTINEL="$TEST_ROOT/race-first-launch"
RACE_FIRST_PID_FILE="$TEST_ROOT/race-first.pid"
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

cat > "$RACE_PYTHON" <<'RACE_PYTHON_WRAPPER'
#!/bin/zsh
set -eu
if [[ ${1:-} == '-c' ]]; then
  sleep 0.3
  exec "$REAL_PYTHON" "$@"
fi
if [[ ${1:-} == '-m' && ${2:-} == 'http.server' ]]; then
  if mkdir "$RACE_SENTINEL" 2>/dev/null; then
    print -r -- "$$" > "$RACE_FIRST_PID_FILE"
    sleep 0.2
  else
    sleep 0.6
  fi
fi
exec "$REAL_PYTHON" "$@"
RACE_PYTHON_WRAPPER
chmod +x "$RACE_PYTHON"

free_port() {
  "$PYTHON_BIN" - <<'PY'
import socket
with socket.socket() as sock:
    sock.bind(('127.0.0.1', 0))
    print(sock.getsockname()[1])
PY
}

PORT=$(free_port)
RACE_PORT=$(free_port)
RACE_STATE_DIR="$TEST_ROOT/race-state"
DETACH_PORT=$(free_port)
DETACH_STATE_DIR="$TEST_ROOT/detach-state"

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

run_default_server() {
  (
    unset TASTE_LIBRARY_ROOT TASTE_LIBRARY_HOST TASTE_LIBRARY_PORT TASTE_LIBRARY_STATE_DIR
    unset TASTE_LIBRARY_PYTHON TASTE_LIBRARY_CURL TASTE_LIBRARY_OPEN TASTE_LIBRARY_READY_ATTEMPTS
    TASTE_LIBRARY_NO_OPEN='1' \
      TASTE_LIBRARY_STATE_BASE="$DEFAULT_STATE_ROOT" \
      TMPDIR="${DEFAULT_TMPDIR_OVERRIDE:-$DEFAULT_TMPDIR_ONE}" \
      "$SERVER_SCRIPT" "$@"
  )
}

run_race_server() {
  env \
    TASTE_LIBRARY_ROOT="$SITE_ROOT" \
    TASTE_LIBRARY_HOST='127.0.0.1' \
    TASTE_LIBRARY_PORT="$RACE_PORT" \
    TASTE_LIBRARY_STATE_DIR="$RACE_STATE_DIR" \
    TASTE_LIBRARY_PYTHON="$RACE_PYTHON" \
    TASTE_LIBRARY_NO_OPEN='1' \
    TASTE_LIBRARY_READY_ATTEMPTS='50' \
    TASTE_LIBRARY_LOCK_ATTEMPTS="${TASTE_LIBRARY_LOCK_ATTEMPTS:-50}" \
    REAL_PYTHON="$PYTHON_BIN" \
    RACE_SENTINEL="$RACE_SENTINEL" \
    RACE_FIRST_PID_FILE="$RACE_FIRST_PID_FILE" \
    "$SERVER_SCRIPT" "$@"
}

run_detach_server() {
  env \
    TASTE_LIBRARY_ROOT="$SITE_ROOT" \
    TASTE_LIBRARY_HOST='127.0.0.1' \
    TASTE_LIBRARY_PORT="$DETACH_PORT" \
    TASTE_LIBRARY_STATE_DIR="$DETACH_STATE_DIR" \
    TASTE_LIBRARY_PYTHON="$PYTHON_BIN" \
    TASTE_LIBRARY_NO_OPEN='1' \
    TASTE_LIBRARY_READY_ATTEMPTS='50' \
    "$SERVER_SCRIPT" "$@"
}

fail() {
  print -u2 -- "FAIL: $*"
  exit 1
}

cleanup() {
  run_server stop >/dev/null 2>&1 || true
  run_default_server stop >/dev/null 2>&1 || true
  run_race_server stop >/dev/null 2>&1 || true
  run_detach_server stop >/dev/null 2>&1 || true
  if [[ -r "$RACE_FIRST_PID_FILE" ]]; then
    local race_first_pid
    race_first_pid=$(<"$RACE_FIRST_PID_FILE")
    kill "$race_first_pid" 2>/dev/null || true
    wait "$race_first_pid" 2>/dev/null || true
  fi
  if [[ -n "$foreign_pid" ]] && kill -0 "$foreign_pid" 2>/dev/null; then
    kill "$foreign_pid" 2>/dev/null || true
    wait "$foreign_pid" 2>/dev/null || true
  fi
  rm -rf -- "$TEST_ROOT"
}
trap cleanup EXIT INT TERM

default_start_output=$(DEFAULT_TMPDIR_OVERRIDE="$DEFAULT_TMPDIR_ONE" run_default_server start)
[[ "$default_start_output" == *'http://127.0.0.1:8765/'* ]] || fail "defaults did not use loopback port 8765: $default_start_output"
[[ -s "$DEFAULT_STATE_DIR/server.pid" ]] || fail 'defaults did not use the stable state base'
/usr/bin/curl --fail --silent --show-error --max-time 1 'http://127.0.0.1:8765/' > "$TEST_ROOT/default-index.html" || fail 'default server is not reachable'
cmp -s "$REPO_ROOT/index.html" "$TEST_ROOT/default-index.html" || fail 'default server did not serve the repository document root'
default_status_output=$(DEFAULT_TMPDIR_OVERRIDE="$DEFAULT_TMPDIR_TWO" run_default_server status)
[[ "$default_status_output" == *'running'* ]] || fail "state was not shared across launcher TMPDIR values: $default_status_output"
default_stop_output=$(DEFAULT_TMPDIR_OVERRIDE="$DEFAULT_TMPDIR_TWO" run_default_server stop)
[[ "$default_stop_output" == *'stopped'* ]] || fail "unexpected default stop output: $default_stop_output"

start_output=$(run_server start)
[[ "$start_output" == *'started'* ]] || fail "unexpected start output: $start_output"
[[ -s "$STATE_DIR/server.pid" ]] || fail 'start did not create a PID file'
[[ -s "$STATE_DIR/server.identity" ]] || fail 'start did not record a launch identity'
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

detach_start_output=$(env \
  TASTE_LIBRARY_ROOT="$SITE_ROOT" \
  TASTE_LIBRARY_HOST='127.0.0.1' \
  TASTE_LIBRARY_PORT="$DETACH_PORT" \
  TASTE_LIBRARY_STATE_DIR="$DETACH_STATE_DIR" \
  TASTE_LIBRARY_PYTHON="$PYTHON_BIN" \
  TASTE_LIBRARY_NO_OPEN='1' \
  TASTE_LIBRARY_READY_ATTEMPTS='50' \
  "$PYTHON_BIN" - "$SERVER_SCRIPT" <<'PY'
import os
import signal
import subprocess
import sys

server_script = sys.argv[1]
helper_source = '''
import os
import subprocess
import sys

completed = subprocess.run(
    [sys.argv[1], 'start'],
    env=os.environ.copy(),
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
)
sys.stdout.write(completed.stdout)
raise SystemExit(completed.returncode)
'''
helper = subprocess.Popen(
    [sys.executable, '-c', helper_source, server_script],
    env=os.environ.copy(),
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
    start_new_session=True,
)
original_process_group = helper.pid
output, _ = helper.communicate(timeout=15)
try:
    os.killpg(original_process_group, signal.SIGTERM)
except ProcessLookupError:
    pass
sys.stdout.write(output)
raise SystemExit(helper.returncode)
PY
)
[[ "$detach_start_output" == *'started'* ]] || fail "unexpected detached start output: $detach_start_output"
sleep 0.2
/usr/bin/curl --fail --silent --show-error --max-time 1 "http://127.0.0.1:$DETACH_PORT/" >/dev/null || fail 'server did not survive cleanup of the launcher process group'
detach_status_output=$(run_detach_server status) || fail 'detached server lost its owned state'
[[ "$detach_status_output" == *'running'* ]] || fail "unexpected detached status output: $detach_status_output"
detach_stop_output=$(run_detach_server stop)
[[ "$detach_stop_output" == *'stopped'* ]] || fail "unexpected detached stop output: $detach_stop_output"

run_race_server start > "$TEST_ROOT/race-start-one" 2>&1 &
race_start_one_pid=$!
run_race_server start > "$TEST_ROOT/race-start-two" 2>&1 &
race_start_two_pid=$!
wait "$race_start_one_pid" || fail 'first concurrent start failed'
wait "$race_start_two_pid" || fail 'second concurrent start failed'
race_outputs=$(<"$TEST_ROOT/race-start-one")$'\n'$(<"$TEST_ROOT/race-start-two")
[[ "$race_outputs" == *'started'* ]] || fail "concurrent starts did not start a server: $race_outputs"
[[ "$race_outputs" == *'reused'* ]] || fail "concurrent starts did not serialize and reuse: $race_outputs"
sleep 0.7
[[ -s "$RACE_STATE_DIR/server.pid" ]] || fail 'concurrent starts lost the PID state record'
[[ -s "$RACE_STATE_DIR/server.identity" ]] || fail 'concurrent starts lost the identity state record'
race_status_output=$(run_race_server status) || fail 'concurrent starts left invalid owned state'
[[ "$race_status_output" == *'running'* ]] || fail "unexpected concurrent status output: $race_status_output"
race_server_pid=$(<"$RACE_STATE_DIR/server.pid")
kill -0 "$race_server_pid" 2>/dev/null || fail 'concurrent starts retained a dead PID'
race_stop_output=$(run_race_server stop)
[[ "$race_stop_output" == *'stopped'* ]] || fail "unexpected concurrent stop output: $race_stop_output"
if /usr/bin/curl --silent --max-time 1 "http://127.0.0.1:$RACE_PORT/" >/dev/null 2>&1; then
  fail 'concurrent server remained reachable after final stop'
fi

mkdir -p "$RACE_STATE_DIR/controller.lock"
print -r -- '999999' > "$RACE_STATE_DIR/controller.lock/owner.stale"
if TASTE_LIBRARY_LOCK_ATTEMPTS=2 run_race_server status > "$TEST_ROOT/stale-lock-output" 2>&1; then
  fail 'status unexpectedly succeeded after recovering a stale lock'
fi
if [[ -d "$RACE_STATE_DIR/controller.lock" ]]; then
  rm -f -- "$RACE_STATE_DIR/controller.lock/owner.stale"
  rmdir "$RACE_STATE_DIR/controller.lock" 2>/dev/null || true
  fail 'stale controller lock was not removed safely'
fi
/usr/bin/grep -q 'not running' "$TEST_ROOT/stale-lock-output" || fail 'controller did not proceed after stale lock recovery'

mkdir -p "$RACE_STATE_DIR/controller.lock"
live_lock_marker="$RACE_STATE_DIR/controller.lock/owner.live"
print -r -- "$$" > "$live_lock_marker"
if TASTE_LIBRARY_LOCK_ATTEMPTS=2 run_race_server stop > "$TEST_ROOT/live-lock-output" 2>&1; then
  rm -f -- "$live_lock_marker"
  rmdir "$RACE_STATE_DIR/controller.lock" 2>/dev/null || true
  fail 'controller stole a lock from a live owner'
fi
/usr/bin/grep -q 'controller is busy' "$TEST_ROOT/live-lock-output" || fail 'live lock wait did not fail actionably'
[[ -e "$live_lock_marker" ]] || fail 'live controller lock marker was removed'
rm -f -- "$live_lock_marker"
rmdir "$RACE_STATE_DIR/controller.lock" 2>/dev/null || fail 'could not clean up the live lock fixture'

LIVE_FOREIGN_PORT=$(free_port)
"$PYTHON_BIN" -m http.server "$LIVE_FOREIGN_PORT" --bind 127.0.0.1 --directory "$SITE_ROOT" \
  </dev/null >"$TEST_ROOT/live-foreign.log" 2>&1 &
foreign_pid=$!
for attempt in {1..50}; do
  /usr/bin/curl --silent --max-time 1 "http://127.0.0.1:$LIVE_FOREIGN_PORT/" >/dev/null 2>&1 && break
  sleep 0.1
done

LIVE_FOREIGN_STATE="$TEST_ROOT/live-foreign-state"
mkdir -p "$LIVE_FOREIGN_STATE"
print -r -- "$foreign_pid" > "$LIVE_FOREIGN_STATE/server.pid"
foreign_lstart=$(/bin/ps -p "$foreign_pid" -o lstart=)
print -r -- "$foreign_lstart" > "$LIVE_FOREIGN_STATE/server.identity"
live_foreign_stop_output=$(env \
  TASTE_LIBRARY_ROOT="$SITE_ROOT" \
  TASTE_LIBRARY_HOST='127.0.0.1' \
  TASTE_LIBRARY_PORT="$LIVE_FOREIGN_PORT" \
  TASTE_LIBRARY_STATE_DIR="$LIVE_FOREIGN_STATE" \
  TASTE_LIBRARY_PYTHON="$PYTHON_BIN" \
  TASTE_LIBRARY_NO_OPEN='1' \
  "$SERVER_SCRIPT" stop)
[[ "$live_foreign_stop_output" == *'already stopped'* ]] || fail "live foreign process was not treated as stale state: $live_foreign_stop_output"
kill -0 "$foreign_pid" 2>/dev/null || fail 'stop killed a live foreign process with matching arguments'
if env \
  TASTE_LIBRARY_ROOT="$SITE_ROOT" \
  TASTE_LIBRARY_HOST='127.0.0.1' \
  TASTE_LIBRARY_PORT="$LIVE_FOREIGN_PORT" \
  TASTE_LIBRARY_STATE_DIR="$LIVE_FOREIGN_STATE" \
  TASTE_LIBRARY_PYTHON="$PYTHON_BIN" \
  TASTE_LIBRARY_NO_OPEN='1' \
  "$SERVER_SCRIPT" start > "$TEST_ROOT/live-foreign-start-output" 2>&1; then
  fail 'start succeeded while a live foreign process owned the port'
fi
/usr/bin/grep -q 'already in use' "$TEST_ROOT/live-foreign-start-output" || fail 'live foreign start error was not actionable'
kill -0 "$foreign_pid" 2>/dev/null || fail 'start killed a live foreign process with matching arguments'
kill "$foreign_pid" 2>/dev/null || true
wait "$foreign_pid" 2>/dev/null || true
foreign_pid=''

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
