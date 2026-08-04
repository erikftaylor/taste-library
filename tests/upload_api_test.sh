#!/bin/zsh
set -eu

REPO_ROOT=${0:A:h:h}
API_SCRIPT="$REPO_ROOT/scripts/taste-library-api.py"
TEST_ROOT=$(mktemp -d "${TMPDIR:-/tmp}/taste-library-upload-test.XXXXXX")
SITE_ROOT="$TEST_ROOT/site"
PYTHON_BIN=$(command -v python3)
SERVER_PID=''

mkdir -p "$SITE_ROOT/images"

fail() {
  print -u2 -- "FAIL: $*"
  exit 1
}

cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  rm -rf -- "$TEST_ROOT"
}
trap cleanup EXIT INT TERM

free_port() {
  "$PYTHON_BIN" - <<'PY'
import socket
with socket.socket() as sock:
    sock.bind(('127.0.0.1', 0))
    print(sock.getsockname()[1])
PY
}

PORT=$(free_port)
BASE="http://127.0.0.1:$PORT"

"$PYTHON_BIN" "$API_SCRIPT" "$PORT" 127.0.0.1 "$SITE_ROOT" \
  >"$TEST_ROOT/server.log" 2>&1 &
SERVER_PID=$!

for attempt in {1..50}; do
  /usr/bin/curl --silent --max-time 1 "$BASE/api/token" >/dev/null 2>&1 && break
  sleep 0.1
done

TOKEN=$(/usr/bin/curl --silent "$BASE/api/token" | "$PYTHON_BIN" -c \
  'import json,sys; print(json.load(sys.stdin)["token"])')
[[ -n "$TOKEN" ]] || fail 'could not fetch the API token'

print -rn -- 'first-image-bytes' > "$TEST_ROOT/a.png"
print -rn -- 'different-bytes!!' > "$TEST_ROOT/b.png"

# The client sends encodeURIComponent(filename); this is the encoding of
# "Deloitte-—-Brand-Book-Unbrand-my.png" (em dash is %E2%80%94).
FANCY_NAME='Deloitte-%E2%80%94-Brand-Book-Unbrand-my.png'

upload() {
  # upload <file> <x-filename> <extra curl args...> — prints "<body>|<status>"
  local file=$1 name=$2
  shift 2
  /usr/bin/curl --silent --max-time 5 -X POST "$BASE/api/upload" \
    -H "X-Filename: $name" \
    -H 'Content-Type: application/octet-stream' \
    --data-binary "@$file" \
    -w '|%{http_code}' "$@"
}

# 1. Valid upload: sanitized ASCII kebab name lands in images/.
out=$(upload "$TEST_ROOT/a.png" "$FANCY_NAME" -H "X-Taste-Token: $TOKEN")
[[ "$out" == *'"file": "images/deloitte-brand-book-unbrand-my.png"'* ]] \
  || fail "sanitized upload path wrong: $out"
[[ "$out" == *'"alreadyPresent": false'* ]] || fail "fresh upload marked already present: $out"
[[ "$out" == *'|200' ]] || fail "valid upload did not return 200: $out"
cmp -s "$TEST_ROOT/a.png" "$SITE_ROOT/images/deloitte-brand-book-unbrand-my.png" \
  || fail 'uploaded bytes do not match the source file'

# 2. Same bytes again: deduped, no second file.
out=$(upload "$TEST_ROOT/a.png" "$FANCY_NAME" -H "X-Taste-Token: $TOKEN")
[[ "$out" == *'"alreadyPresent": true'* ]] || fail "identical re-upload not deduped: $out"
count=$(ls "$SITE_ROOT/images" | wc -l | tr -d ' ')
[[ "$count" == '1' ]] || fail "dedupe wrote a duplicate file (count=$count)"

# 3. Different bytes, same name: -2 suffix.
out=$(upload "$TEST_ROOT/b.png" "$FANCY_NAME" -H "X-Taste-Token: $TOKEN")
[[ "$out" == *'"file": "images/deloitte-brand-book-unbrand-my-2.png"'* ]] \
  || fail "collision did not get a -2 suffix: $out"
cmp -s "$TEST_ROOT/b.png" "$SITE_ROOT/images/deloitte-brand-book-unbrand-my-2.png" \
  || fail 'suffixed upload bytes do not match'

# 3b. A third distinct content under the same name: suffix walk continues to -3.
print -rn -- 'a-third-distinct-payload' > "$TEST_ROOT/c.png"
out=$(upload "$TEST_ROOT/c.png" "$FANCY_NAME" -H "X-Taste-Token: $TOKEN")
[[ "$out" == *'"file": "images/deloitte-brand-book-unbrand-my-3.png"'* ]] \
  || fail "second collision did not get a -3 suffix: $out"
cmp -s "$TEST_ROOT/c.png" "$SITE_ROOT/images/deloitte-brand-book-unbrand-my-3.png" \
  || fail 'second suffixed upload bytes do not match'

# 4. Non-image extension: 400, nothing written.
out=$(upload "$TEST_ROOT/a.png" 'notes.txt' -H "X-Taste-Token: $TOKEN")
[[ "$out" == *'|400' ]] || fail "non-image extension was not rejected: $out"
[[ ! -e "$SITE_ROOT/images/notes.txt" ]] || fail 'rejected upload still wrote a file'

# 5. Missing token: 403, nothing written.
out=$(upload "$TEST_ROOT/a.png" 'untokened.png')
[[ "$out" == *'|403' ]] || fail "missing token was not rejected: $out"
[[ ! -e "$SITE_ROOT/images/untokened.png" ]] || fail '403 upload still wrote a file'

# 6. Path traversal: basename only, lands inside images/.
out=$(upload "$TEST_ROOT/a.png" '../../escape.png' -H "X-Taste-Token: $TOKEN")
[[ "$out" == *'"file": "images/escape.png"'* ]] || fail "traversal name not flattened: $out"
[[ -e "$SITE_ROOT/images/escape.png" ]] || fail 'flattened upload missing from images/'
[[ ! -e "$SITE_ROOT/escape.png" && ! -e "$TEST_ROOT/escape.png" ]] \
  || fail 'traversal escaped the images/ directory'

print -r -- 'PASS: upload API'
