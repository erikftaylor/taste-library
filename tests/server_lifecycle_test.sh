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
DEFAULT_TMPDIR="$TEST_ROOT/default-tmp"
DEFAULT_STATE_DIR="$DEFAULT_TMPDIR/taste-library-server-${UID}"
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

run_default_server() {
  (
    unset TASTE_LIBRARY_ROOT TASTE_LIBRARY_HOST TASTE_LIBRARY_PORT TASTE_LIBRARY_STATE_DIR
    unset TASTE_LIBRARY_PYTHON TASTE_LIBRARY_CURL TASTE_LIBRARY_OPEN TASTE_LIBRARY_READY_ATTEMPTS
    TASTE_LIBRARY_NO_OPEN='1' TMPDIR="$DEFAULT_TMPDIR" "$SERVER_SCRIPT" "$@"
  )
}

fail() {
  print -u2 -- "FAIL: $*"
  exit 1
}

cleanup() {
  run_server stop >/dev/null 2>&1 || true
  run_default_server stop >/dev/null 2>&1 || true
  if [[ -n "$foreign_pid" ]] && kill -0 "$foreign_pid" 2>/dev/null; then
    kill "$foreign_pid" 2>/dev/null || true
    wait "$foreign_pid" 2>/dev/null || true
  fi
  rm -rf -- "$TEST_ROOT"
}
trap cleanup EXIT INT TERM

default_start_output=$(run_default_server start)
[[ "$default_start_output" == *'http://127.0.0.1:8765/'* ]] || fail "defaults did not use loopback port 8765: $default_start_output"
[[ -s "$DEFAULT_STATE_DIR/server.pid" ]] || fail 'defaults did not use a TMP-backed state directory'
/usr/bin/curl --fail --silent --show-error --max-time 1 'http://127.0.0.1:8765/' > "$TEST_ROOT/default-index.html" || fail 'default server is not reachable'
cmp -s "$REPO_ROOT/index.html" "$TEST_ROOT/default-index.html" || fail 'default server did not serve the repository document root'
default_stop_output=$(run_default_server stop)
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
