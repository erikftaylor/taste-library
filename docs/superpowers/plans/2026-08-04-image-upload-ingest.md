# Browser Upload → Disk → Ingest Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dropped images upload straight into `images/` through a new token-gated `/api/upload` endpoint, the Inbox tracks their status with a per-file Import button, and the analyst guidance accepts non-website design artifacts as first-class references.

**Architecture:** Extend `scripts/taste-library-api.py` (the existing loopback API server) with one upload endpoint — raw binary body, filename in an `X-Filename` header, ASCII-kebab sanitization, byte-identical dedupe, `-2`/`-3` collision suffixes. `app.js` gains upload-on-drop when the API probe succeeds, and per-card status states (uploading / saved / imported / failed). `AGENTS.md` and the `ANALYST_PROMPT` get a paragraph making designed artifacts (UI boards, palette cards, posters) valid references. Spec: `docs/superpowers/specs/2026-08-04-image-upload-ingest-design.md`.

**Tech Stack:** Python 3 stdlib (`http.server`, `unicodedata`), plain ES5-style JS, zsh test script. No new dependencies.

**Conventions that bind every task:** plain `var`/`function` JS (no arrows, no `let`), no `package.json`, commit messages explain *why*. The Inbox has no DOM tests by design — browser behaviour is verified by hand in Task 4.

---

### Task 1: `/api/upload` endpoint

**Files:**
- Test: `tests/upload_api_test.sh` (create)
- Modify: `scripts/taste-library-api.py`

- [ ] **Step 1: Write the failing test**

Create `tests/upload_api_test.sh` (make it executable):

```zsh
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
  # upload <file> <x-filename> <extra curl args...> — prints "<status>|<body>"
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
```

Note on assertions: `json.dumps` in `_json` emits `", "`-separated keys with a
space after the colon — the substring matches above rely on that existing
formatting.

- [ ] **Step 2: Run the test to verify it fails**

```bash
chmod +x tests/upload_api_test.sh && tests/upload_api_test.sh
```

Expected: `FAIL: valid upload did not return 200: ...|404` — the endpoint does not exist yet (`do_POST` answers 404 for unknown paths).

- [ ] **Step 3: Implement the endpoint**

In `scripts/taste-library-api.py`:

3a. Add to the imports block (keep alphabetical):

```python
import unicodedata
```

and below the `IMAGE_SUFFIXES` constant:

```python
from urllib.parse import unquote

MAX_UPLOAD_BYTES = 50 * 1024 * 1024
```

(Style note: the file groups stdlib imports at top; put `unicodedata` there and
`from urllib.parse import unquote` directly after them.)

3b. Add two module-level functions after `scan()`:

```python
def sanitize_filename(raw):
    """ASCII kebab basename for images/, or None if not an image extension.

    The client sends encodeURIComponent(name) because fetch() headers cannot
    carry characters above U+00FF; unquote() reverses that and is harmless on
    plain names.
    """
    name = unquote(raw or '').replace('\\', '/').rsplit('/', 1)[-1]
    stem, dot, ext = name.rpartition('.')
    if not dot:
        return None
    ext = '.' + ext.lower()
    if ext not in IMAGE_SUFFIXES:
        return None
    stem = unicodedata.normalize('NFKD', stem).encode('ascii', 'ignore').decode()
    stem = re.sub(r'[^a-z0-9]+', '-', stem.lower()).strip('-') or 'upload'
    return stem + ext


def store_upload(root, name, data):
    """Write into images/. Returns (relative path, alreadyPresent).

    Byte-identical content under any candidate name is reported as already
    present rather than rewritten; a name collision with different content
    walks -2, -3, … until a free or identical slot appears.
    """
    images_dir = os.path.join(root, 'images')
    os.makedirs(images_dir, exist_ok=True)
    stem, ext = os.path.splitext(name)
    candidate = name
    counter = 2
    while True:
        full = os.path.join(images_dir, candidate)
        if not os.path.exists(full):
            with open(full, 'wb') as fh:
                fh.write(data)
            return 'images/' + candidate, False
        with open(full, 'rb') as fh:
            if fh.read() == data:
                return 'images/' + candidate, True
        candidate = '%s-%d%s' % (stem, counter, ext)
        counter += 1
```

3c. Replace the body of `Handler.do_POST` with:

```python
    def do_POST(self):
        if self.path == '/api/upload':
            self._upload()
            return
        if self.path not in ('/api/prepare', '/api/import'):
            self._json(404, {'error': 'no such endpoint'})
            return
        if not self._authorised():
            return

        length = int(self.headers.get('Content-Length') or 0)
        try:
            body = json.loads(self.rfile.read(length) or b'{}')
        except json.JSONDecodeError:
            self._json(400, {'error': 'invalid JSON'})
            return

        files = body.get('files') or []
        job_id = new_job()
        if self.path == '/api/prepare':
            worker = partial(run_prepare, self.project_root, job_id, files)
        else:
            worker = partial(run_import, self.project_root, job_id, files, body.get('mode', 'model'))
        threading.Thread(target=worker, daemon=True).start()
        self._json(202, {'jobId': job_id})
```

(Only the first three lines are new; the rest is today's body, unchanged.)

3d. Add the `_upload` method to `Handler`, next to `_authorised`:

```python
    def _upload(self):
        if not self._authorised():
            return
        name = sanitize_filename(self.headers.get('X-Filename', ''))
        if name is None:
            self._json(400, {'error': 'filename must end in .png, .jpg, .jpeg or .webp'})
            return
        length = int(self.headers.get('Content-Length') or 0)
        if length <= 0:
            self._json(400, {'error': 'empty upload'})
            return
        if length > MAX_UPLOAD_BYTES:
            self._json(413, {'error': 'upload larger than 50 MB'})
            return
        data = self.rfile.read(length)
        try:
            file_path, already = store_upload(self.project_root, name, data)
        except OSError as exc:
            self._json(500, {'error': str(exc)})
            return
        self._json(200, {'file': file_path, 'alreadyPresent': already})
```

3e. Update the module docstring: after the `/api/import` paragraph, add:

```
    POST /api/upload    saves one image into images/ so the two endpoints
                        above can see it. Raw binary body, filename in an
                        X-Filename header (URI-encoded), name sanitized to
                        ASCII, byte-identical re-uploads deduplicated.
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
tests/upload_api_test.sh
```

Expected: `PASS: upload API`

- [ ] **Step 5: Make sure nothing else broke**

```bash
node --test && tests/server_lifecycle_test.sh
```

Expected: 17 node tests pass; `PASS: Taste Library server lifecycle`.

- [ ] **Step 6: Commit**

```bash
git add scripts/taste-library-api.py tests/upload_api_test.sh
git commit -m "Add /api/upload so browser drops reach images/

The in-app Inbox held files only in browser memory, so the import
pipeline could never see them. Filenames are sanitized to ASCII kebab
(fetch headers cannot carry non-Latin-1 chars, so the client URI-encodes
and the server unquotes), identical bytes dedupe, and collisions walk
-2/-3 suffixes."
```

---

### Task 2: Status-aware Inbox with per-file Import

**Files:**
- Modify: `app.js` (inbox block, lines ~454–565, and `startJob` ~621)
- Modify: `styles.css` (inbox badge colours)
- Modify: `index.html` (cache-buster bump)

No automated test — the project deliberately has no DOM-testing dependency;
Task 4 verifies this in a real browser.

- [ ] **Step 1: Teach `startJob` to report completion**

In `app.js`, first extend `setImportBusy` so the busy state is readable —
per-card Import buttons must refuse to start a second concurrent import job
(two jobs would race on `data.js` and share the single
`data.js.import-backup`):

```js
var importJobRunning = false;

function setImportBusy(busy) {
  importJobRunning = busy;
  ['scan-btn', 'prepare-btn', 'import-btn'].forEach(function (id) {
    document.getElementById(id).disabled = busy;
  });
}
```

Then change the `startJob` signature and its `pollJob` callback:

```js
function startJob(endpoint, body, startingNote, onDone) {
  setImportBusy(true);
  importNote(startingNote);
  importLog('');
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Taste-Token': importToken },
    body: JSON.stringify(body || {})
  }).then(function (r) { return r.json(); }).then(function (data) {
    if (!data.jobId) {
      setImportBusy(false);
      importNote(data.error || 'The server refused the request.', 'failed');
      return;
    }
    pollJob(data.jobId, function (job) {
      importNote(job.ok ? 'Done.' : 'Finished with problems — read the log.', job.ok ? '' : 'failed');
      if (job.ok && endpoint === '/api/import') {
        importNote('Imported. Reload to see the new entries — they are flagged unreviewed.', '');
      }
      if (onDone) onDone(job);
    });
  }).catch(function () {
    setImportBusy(false);
    importNote('Could not reach the import API.', 'failed');
  });
}
```

(Existing callers pass three arguments; `onDone` is simply undefined there.)

- [ ] **Step 2: Upload on drop when the API is present**

Replace `addFilesToInbox` and add `uploadInboxItem` directly below it:

```js
function addFilesToInbox(fileList) {
  Array.prototype.forEach.call(fileList, function (file) {
    if (!file.type || file.type.indexOf('image/') !== 0) return;
    inboxIdCounter += 1;
    var item = {
      id: 'inbox-' + inboxIdCounter,
      file: file,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
      // null = browser-only (no API): today's behaviour, Download/Remove.
      status: importToken ? 'uploading' : null,
      serverPath: null,
      note: ''
    };
    inboxImages.push(item);
    if (item.status === 'uploading') uploadInboxItem(item);
  });
  renderInbox();
}

function uploadInboxItem(item) {
  item.status = 'uploading';
  item.note = '';
  renderInbox();
  fetch('/api/upload', {
    method: 'POST',
    headers: {
      'X-Taste-Token': importToken,
      // Header values are ByteStrings — an em dash in a filename would throw.
      'X-Filename': encodeURIComponent(item.name),
      'Content-Type': 'application/octet-stream'
    },
    body: item.file
  }).then(function (r) {
    return r.json().then(function (data) { return { ok: r.ok, data: data }; });
  }).then(function (result) {
    if (result.ok) {
      item.status = 'saved';
      item.serverPath = result.data.file;
      item.note = result.data.alreadyPresent ? 'Was already in images/.' : '';
    } else {
      item.status = 'failed';
      item.note = result.data.error || 'The server refused the upload.';
    }
    renderInbox();
  }).catch(function () {
    item.status = 'failed';
    item.note = 'Could not reach the import API.';
    renderInbox();
  });
}
```

- [ ] **Step 3: Render the states**

In `renderInbox`, replace the badge and actions sections (keep the card/img/
body/name scaffolding as it is):

```js
    var badge = document.createElement('span');
    badge.className = 'inbox-badge';
    if (item.status === 'uploading') {
      badge.textContent = '⇡ Uploading…';
    } else if (item.status === 'saved') {
      badge.className += ' saved';
      badge.textContent = '◆ In images/ — not in library' + (item.note ? ' · ' + item.note : '');
    } else if (item.status === 'imported') {
      badge.className += ' saved';
      badge.textContent = '✓ Imported — reload to see it';
    } else if (item.status === 'failed') {
      badge.className += ' failed';
      badge.textContent = '✕ ' + item.note;
    } else {
      badge.textContent = '◇ Uncategorized';
    }
    body.appendChild(badge);

    var name = document.createElement('div');
    name.className = 'inbox-card-name';
    name.textContent = item.name;
    body.appendChild(name);

    var actions = document.createElement('div');
    actions.className = 'inbox-actions';

    if (item.status === 'saved') {
      var importBtn = document.createElement('button');
      importBtn.type = 'button';
      importBtn.textContent = 'Import';
      importBtn.addEventListener('click', function () {
        if (importJobRunning) return;
        startJob('/api/import', { files: [item.serverPath], mode: 'model' },
          'Analysing ' + item.name + ' — several minutes: it reads the authoring rules, examines the image and runs the test suite.',
          function (job) {
            if (job.ok) { item.status = 'imported'; renderInbox(); }
          });
      });
      actions.appendChild(importBtn);
    } else if (item.status === 'failed') {
      var retryBtn = document.createElement('button');
      retryBtn.type = 'button';
      retryBtn.textContent = 'Retry';
      retryBtn.addEventListener('click', function () { uploadInboxItem(item); });
      actions.appendChild(retryBtn);
    } else if (item.status === null) {
      var downloadBtn = document.createElement('button');
      downloadBtn.type = 'button';
      downloadBtn.textContent = 'Download';
      downloadBtn.addEventListener('click', function () { downloadInboxItem(item.id); });
      actions.appendChild(downloadBtn);
    }

    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () { removeFromInbox(item.id); });
    actions.appendChild(removeBtn);
```

(Remove stays browser-side only — it never deletes from `images/`. Download
only appears for browser-only cards; once a file is saved to disk the button
would just re-download what is already in the repo.)

- [ ] **Step 4: Badge colours**

In `styles.css`, directly under the existing `.inbox-badge` rule:

```css
.inbox-badge.saved { color: #2f6f4f; }
.inbox-badge.failed { color: #a8442a; }
```

- [ ] **Step 5: Bump the cache busters**

In `index.html`, change all four `?v=20260803a` query params (styles.css,
data.js, lib/content.js, app.js) to `?v=20260804a`.

- [ ] **Step 6: Sanity-check the pure-logic suite still passes**

```bash
node --test
```

Expected: 17 tests pass (nothing in `lib/content.js` or `data.js` changed).

- [ ] **Step 7: Commit**

```bash
git add app.js styles.css index.html
git commit -m "Upload dropped files to images/ and track their status in the Inbox

Dropped files previously lived only in browser memory, so 'use the
upload area' still meant manually moving files into images/. With the
API present a drop now uploads immediately; each card shows uploading /
saved / imported / failed, offers per-file Import (the endpoint already
took a files list), and Retry on failure. Statically served, the Inbox
behaves exactly as before."
```

---

### Task 3: Non-website references in the authoring guidance

**Files:**
- Modify: `scripts/taste-library-api.py` (`ANALYST_PROMPT`)
- Modify: `AGENTS.md` ("Adding a screenshot" area)
- Modify: `README.md` ("Adding new screenshots" area)
- Modify: `index.html` (dropzone copy)

- [ ] **Step 1: Extend the analyst prompt**

In `ANALYST_PROMPT` in `scripts/taste-library-api.py`, after the opening line
`You are adding one reference to a design taste library.` insert:

```
A reference is any designed artifact — a website screenshot, a UI kit board,
a palette card, a poster, an app screen. Describe the design OF the artifact
itself: its own composition, its own typography, its own colour roles. Use
the artifact's vocabulary for colour usage (a palette card has a "canvas
ground", not a "page ground").
```

- [ ] **Step 2: Extend AGENTS.md**

In `AGENTS.md`, rename the section heading `## Adding a screenshot` to
`## Adding a reference` and insert this paragraph directly under it, before
the numbered list:

```markdown
A reference is any **designed artifact**, not only a web page — UI kit
boards, palette cards, posters, and app screens all qualify. The entry
describes the design *of the artifact itself* (the palette card's own
rounded blocks, its typography, its composition) with the same fields and
the same standards as a website entry. Categories stay emergent: a board
that fits no existing family founds a new category whose `system` and
`wireframe` describe the board's composition. Colour `usage` roles use the
artifact's own vocabulary ("canvas ground", "card ground") rather than
forcing "page ground" — the verifier's OVERCLAIMED check only fires on
page-level ground claims, and that rule applies verbatim.
```

- [ ] **Step 3: Update README.md**

In `README.md`, under `## Adding new screenshots`, replace step 1
(`1. Drop image files into images/, or use the in-app Upload area.`) with:

```markdown
1. Drop image files into `images/`, or use the in-app Upload area — when the
   local server is running, dropped files are saved into `images/` for you
   and each Inbox card offers a one-click Import. Any designed artifact
   qualifies, not just website screenshots: UI kit boards, palette cards,
   posters, app screens.
```

- [ ] **Step 4: Update the dropzone copy**

In `index.html`, change the dropzone text `Drop screenshots here, or` to
`Drop images here, or`.

- [ ] **Step 5: Verify the prompt change is syntactically sound**

```bash
python3 -c "import importlib.util; spec = importlib.util.spec_from_file_location('api', 'scripts/taste-library-api.py'); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print(m.ANALYST_PROMPT.format(image='images/x.png', sampler='SAMPLER')[:200])"
```

Expected: prints the first 200 chars of the prompt, including the new
"designed artifact" paragraph, with no `KeyError` (would fire if a brace
slipped into the new text) — note the paragraph must contain no `{` or `}`.

- [ ] **Step 6: Run the suite**

```bash
node --test && tests/upload_api_test.sh
```

Expected: all pass — these files feed prompts and docs, not tested logic.

- [ ] **Step 7: Commit**

```bash
git add scripts/taste-library-api.py AGENTS.md README.md index.html
git commit -m "Admit non-website artifacts as first-class references

The authoring guidance was written around website screenshots, which
made UI boards, palette cards and posters second-class even though the
data model never required a web page. No schema change: the entry
describes the design of the artifact itself, and colour roles use the
artifact's own vocabulary so the page-ground OVERCLAIMED check stays
meaningful."
```

---

### Task 4: End-to-end verification in the browser

**Files:** none (verification only).

- [ ] **Step 1: Start the real server**

```bash
scripts/taste-library-server.sh start
```

Expected: `started` (or `reused`) with `http://127.0.0.1:8765/`.

- [ ] **Step 2: Verify the upload flow in a browser**

Open `http://127.0.0.1:8765/`. Then:

1. Drop any PNG onto the dropzone. The card must flash **⇡ Uploading…**
   then settle on **◆ In images/ — not in library** with an **Import**
   button. Confirm the file exists in `images/` with its kebab name.
2. Drop the same file again — the badge must say `Was already in images/.`
   and `images/` must not contain a duplicate.
3. Click **Scan for new images** — the uploaded file must be listed.
4. Stop the server (`scripts/taste-library-server.sh stop`), open
   `index.html` directly from disk, and confirm the Inbox behaves as before:
   ◇ Uncategorized badge, Download + Remove, no upload attempt, no console
   errors.
5. Delete the test upload from `images/` afterwards.

(Do not click **Import** with a throwaway test image unless you want to burn
several minutes of analyst time — Scan proving visibility is enough; the
import path itself is unchanged and already exercised.)

- [ ] **Step 3: Full suite one last time**

```bash
node --test && tests/upload_api_test.sh && tests/server_lifecycle_test.sh
```

Expected: everything passes.

- [ ] **Step 4: Stop the server**

```bash
scripts/taste-library-server.sh stop
```
