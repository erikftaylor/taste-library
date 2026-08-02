#!/bin/zsh
set -u

SCRIPT_DIR=${0:A:h}
DEFAULT_ROOT=${SCRIPT_DIR:h}
PROJECT_ROOT=${TASTE_LIBRARY_ROOT:-$DEFAULT_ROOT}
HOST=${TASTE_LIBRARY_HOST:-127.0.0.1}
PORT=${TASTE_LIBRARY_PORT:-8765}
STATE_DIR=${TASTE_LIBRARY_STATE_DIR:-${TASTE_LIBRARY_STATE_BASE:-/tmp}/taste-library-server-${UID}}
PYTHON_BIN=${TASTE_LIBRARY_PYTHON:-$(command -v python3 2>/dev/null || true)}
CURL_BIN=${TASTE_LIBRARY_CURL:-/usr/bin/curl}
OPEN_BIN=${TASTE_LIBRARY_OPEN:-/usr/bin/open}
READY_ATTEMPTS=${TASTE_LIBRARY_READY_ATTEMPTS:-50}
LOCK_ATTEMPTS=${TASTE_LIBRARY_LOCK_ATTEMPTS:-50}
PID_FILE="$STATE_DIR/server.pid"
IDENTITY_FILE="$STATE_DIR/server.identity"
LOG_FILE="$STATE_DIR/server.log"
LOCK_DIR="$STATE_DIR/controller.lock"
LOCK_MARKER=''
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

cleanup_stale_controller_lock() {
  [[ -d "$LOCK_DIR" ]] || return 0
  local -a markers
  markers=("$LOCK_DIR"/owner.*(N))
  if (( ${#markers[@]} == 0 )); then
    rmdir "$LOCK_DIR" 2>/dev/null || true
    return 0
  fi

  local marker owner_pid
  for marker in "${markers[@]}"; do
    owner_pid=''
    IFS= read -r owner_pid < "$marker" 2>/dev/null || true
    if [[ "$owner_pid" == <-> ]] && kill -0 "$owner_pid" 2>/dev/null; then
      return 1
    fi
  done

  for marker in "${markers[@]}"; do
    rm -f -- "$marker"
  done
  rmdir "$LOCK_DIR" 2>/dev/null || true
}

lock_marker_is_exclusive() {
  local marker=$1
  local expected_inode=$2
  local current_inode
  current_inode=$(/usr/bin/stat -f '%i' "$LOCK_DIR" 2>/dev/null) || return 1
  [[ "$current_inode" == "$expected_inode" ]] || return 1
  local -a markers
  markers=("$LOCK_DIR"/owner.*(N))
  (( ${#markers[@]} == 1 )) || return 1
  [[ "${markers[1]}" == "$marker" ]]
}

acquire_controller_lock() {
  local attempt=0
  local candidate marker lock_inode
  while (( attempt < LOCK_ATTEMPTS )); do
    candidate=$(/usr/bin/mktemp "$STATE_DIR/owner.XXXXXX") || {
      error "could not prepare the controller lock under: $STATE_DIR"
      return 1
    }
    print -r -- "$$" > "$candidate"
    chmod 600 "$candidate" 2>/dev/null || true

    if mkdir "$LOCK_DIR" 2>/dev/null; then
      lock_inode=$(/usr/bin/stat -f '%i' "$LOCK_DIR" 2>/dev/null || true)
      marker="$LOCK_DIR/${candidate:t}"
      if [[ -n "$lock_inode" ]] && mv "$candidate" "$marker" 2>/dev/null && \
          lock_marker_is_exclusive "$marker" "$lock_inode"; then
        LOCK_MARKER="$marker"
        return 0
      fi
      rm -f -- "$candidate" "$marker"
      rmdir "$LOCK_DIR" 2>/dev/null || true
    else
      rm -f -- "$candidate"
      cleanup_stale_controller_lock || true
    fi
    sleep 0.1
    (( attempt += 1 ))
  done

  error "server controller is busy; try again"
  return 1
}

release_controller_lock() {
  [[ -n "$LOCK_MARKER" ]] || return 0
  rm -f -- "$LOCK_MARKER"
  rmdir "$LOCK_DIR" 2>/dev/null || true
  LOCK_MARKER=''
}

read_pid() {
  [[ -r "$PID_FILE" ]] || return 1
  local pid
  IFS= read -r pid < "$PID_FILE" || return 1
  [[ "$pid" == <-> ]] || return 1
  print -r -- "$pid"
}

read_launch_identity() {
  [[ -r "$IDENTITY_FILE" ]] || return 1
  local identity
  IFS= read -r identity < "$IDENTITY_FILE" || return 1
  [[ -n "$identity" ]] || return 1
  print -r -- "$identity"
}

pid_is_owned() {
  local pid=$1
  local command_line
  local launch_token
  launch_token=$(read_launch_identity) || return 1
  kill -0 "$pid" 2>/dev/null || return 1
  command_line=$(/bin/ps eww -p "$pid" -o command= 2>/dev/null) || return 1
  [[ "$command_line" == *"TASTE_LIBRARY_SERVER_TOKEN=${launch_token}"* ]] || return 1
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
  rm -f -- "$PID_FILE" "$IDENTITY_FILE"
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
  local launch_token
  launch_token=$("$PYTHON_BIN" -c 'import uuid; print(uuid.uuid4())') || {
    error 'could not create a unique server launch identity.'
    return 1
  }
  [[ -n "$launch_token" ]] || {
    error 'could not create a unique server launch identity.'
    return 1
  }
  pid=$("$PYTHON_BIN" - "$PYTHON_BIN" "$PORT" "$HOST" "$PROJECT_ROOT" "$LOG_FILE" "$launch_token" \
    2>>"$LOG_FILE" <<'PY'
import os
import subprocess
import sys

python_bin, port, host, project_root, log_file, launch_token = sys.argv[1:]
environment = os.environ.copy()
environment['TASTE_LIBRARY_SERVER_TOKEN'] = launch_token
with open(log_file, 'ab', buffering=0) as log:
    process = subprocess.Popen(
        [python_bin, '-m', 'http.server', port, '--bind', host, '--directory', project_root],
        stdin=subprocess.DEVNULL,
        stdout=log,
        stderr=subprocess.STDOUT,
        env=environment,
        start_new_session=True,
    )
print(process.pid)
PY
  ) || {
    error "server exited during startup; log: $LOG_FILE"
    return 1
  }
  [[ "$pid" == <-> ]] || {
    error "server exited during startup; log: $LOG_FILE"
    return 1
  }
  print -r -- "$pid" > "$PID_FILE"
  print -r -- "$launch_token" > "$IDENTITY_FILE"

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
  start|stop|status) ;;
  *)
    error 'usage: taste-library-server.sh start|stop|status'
    exit 64
    ;;
esac

ensure_state_dir || exit 1
acquire_controller_lock || exit 1
trap release_controller_lock EXIT
trap 'exit 130' INT TERM HUP

case $1 in
  start) start_server ;;
  stop) stop_server ;;
  status) status_server ;;
esac
