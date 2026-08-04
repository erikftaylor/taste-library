#!/usr/bin/env python3
"""Serve the Taste Library and expose a small import API.

    python3 scripts/taste-library-api.py <port> <host> <project-root>

Replaces `python3 -m http.server` so the page can do more than read files. Static
serving is unchanged; everything else lives under /api.

Two endpoints matter, and the split between them is deliberate:

    POST /api/prepare   deterministic. Finds images not yet in data.js, builds
                        their WebP derivatives, and samples palette candidates.
                        Touches no entry text and cannot be wrong about colour.

    POST /api/import    judgment. Runs an analyst over each prepared image to
                        write the ~90% of an entry that requires seeing the page,
                        then REFUSES the result unless the deterministic
                        verifier agrees every hex came from that screenshot.

    POST /api/upload    saves one image into images/ so the two endpoints
                        above can see it. Raw binary body, filename in an
                        X-Filename header (URI-encoded), name sanitized to
                        ASCII, byte-identical re-uploads deduplicated.

The verifier gates the write. A proposed palette that fails provenance is
discarded rather than saved, whoever authored it — that rule is what keeps a
model from reintroducing the class of error this library already shipped once.

Mutating endpoints require the token served at /api/token. Same-origin policy
lets this page read it and stops any other page from doing so, which is what
prevents a stray tab from POSTing to a local code-execution endpoint. Bound to
loopback only.
"""
import json
import os
import queue
import re
import secrets
import shutil
import subprocess
import sys
import threading
import unicodedata
import uuid
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote

TOKEN = secrets.token_urlsafe(24)
JOBS = {}
JOBS_LOCK = threading.Lock()
IMAGE_SUFFIXES = ('.png', '.jpg', '.jpeg', '.webp')
MAX_UPLOAD_BYTES = 50 * 1024 * 1024


def repo_run(root, args, timeout=900):
    return subprocess.run(args, cwd=root, capture_output=True, text=True, timeout=timeout)


def known_sources(root):
    """Source paths already referenced by data.js, read through node."""
    result = repo_run(root, [
        'node', '-e',
        "var d=require('./data.js');"
        "console.log(JSON.stringify(d.images.map(function(i){return i.file;})));"
    ], timeout=30)
    if result.returncode != 0:
        raise RuntimeError('could not read data.js: ' + result.stderr.strip())
    return set(json.loads(result.stdout))


def scan(root):
    """Images on disk that no entry references yet."""
    known = known_sources(root)
    images_dir = os.path.join(root, 'images')
    found = []
    for name in sorted(os.listdir(images_dir)):
        if not name.lower().endswith(IMAGE_SUFFIXES):
            continue
        relative = 'images/' + name
        if relative in known:
            continue
        full = os.path.join(images_dir, name)
        found.append({
            'file': relative,
            'name': name,
            'bytes': os.path.getsize(full),
            'hasThumb': os.path.exists(os.path.join(root, 'images/thumbs', os.path.splitext(name)[0] + '.webp')),
            'hasDisplay': os.path.exists(os.path.join(root, 'images/display', os.path.splitext(name)[0] + '.webp')),
        })
    return found


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
    walks -2, -3, … until a free or identical slot appears. The create uses
    O_EXCL ('xb') so two threads racing on the same sanitized name cannot
    both pass a check and then both write — the loser gets FileExistsError
    and falls through to the byte-compare / suffix walk instead of
    silently clobbering the winner's bytes.
    """
    images_dir = os.path.join(root, 'images')
    os.makedirs(images_dir, exist_ok=True)
    stem, ext = os.path.splitext(name)
    candidate = name
    counter = 2
    while True:
        full = os.path.join(images_dir, candidate)
        try:
            with open(full, 'xb') as fh:
                fh.write(data)
            return 'images/' + candidate, False
        except FileExistsError:
            pass
        with open(full, 'rb') as fh:
            if fh.read() == data:
                return 'images/' + candidate, True
        candidate = '%s-%d%s' % (stem, counter, ext)
        counter += 1


def new_job():
    job_id = uuid.uuid4().hex[:12]
    with JOBS_LOCK:
        JOBS[job_id] = {'id': job_id, 'done': False, 'ok': None, 'log': [], 'result': None}
    return job_id


def log(job_id, message):
    with JOBS_LOCK:
        job = JOBS.get(job_id)
        if job is not None:
            job['log'].append(message)


def finish(job_id, ok, result=None):
    with JOBS_LOCK:
        job = JOBS.get(job_id)
        if job is not None:
            job['done'] = True
            job['ok'] = ok
            job['result'] = result


def run_prepare(root, job_id, files):
    try:
        targets = files or [entry['file'] for entry in scan(root)]
        if not targets:
            log(job_id, 'No new images found — every image in images/ is already in the library.')
            finish(job_id, True, {'prepared': []})
            return

        log(job_id, 'Found %d image(s) not yet in the library.' % len(targets))
        prepared = []
        for path in targets:
            log(job_id, '')
            log(job_id, '── %s' % path)

            result = repo_run(root, ['python3', 'scripts/resize-images.py', path])
            if result.returncode != 0:
                log(job_id, '   derivative generation FAILED: ' + result.stderr.strip()[:300])
                continue
            for line in result.stdout.splitlines():
                if 'Thumbnail' in line or 'Display' in line:
                    log(job_id, '   ' + line.strip())

            result = repo_run(root, ['python3', 'scripts/sample-palette.py', path])
            if result.returncode != 0:
                log(job_id, '   palette sampling FAILED: ' + result.stderr.strip()[:300])
                continue
            candidates = [l.strip() for l in result.stdout.splitlines() if l.strip().startswith('#')]
            log(job_id, '   %d palette candidates proposed' % len(candidates))
            prepared.append({'file': path, 'candidates': candidates, 'sampler': result.stdout})

        log(job_id, '')
        log(job_id, 'Prepared %d image(s). Nothing was written to data.js — this step only '
                    'measures.' % len(prepared))
        finish(job_id, True, {'prepared': prepared})
    except Exception as exc:  # noqa: BLE001 - surfaced to the UI
        log(job_id, 'ERROR: %s' % exc)
        finish(job_id, False)


ANALYST_PROMPT = """You are adding one reference to a design taste library.

Read AGENTS.md in this repository first — it defines the data model, the
provenance rule for colour, and the authoring standards. Follow it exactly.

Add exactly one entry to data.js for this image:

    {image}

The palette candidates below were measured from that screenshot. Every hex you
use MUST come from this list — do not eyedrop by eye, do not carry a hex from
another entry, do not invent one. Assign each a usage role by looking at the
image.

{sampler}

Then:
  - open the image and look at it before writing anything
  - match it to an existing category, or add a new one with its own system and
    wireframe if nothing genuinely fits; do not force a fit
  - write 3-5 signature bullets naming the STRUCTURAL moves specific to this
    reference, not adjectives
  - set reviewed: false on the entry

Do not modify any existing entry. Do not run git commands. When done, run
`node --test` and `python3 scripts/sample-palette.py --verify` and fix anything
they report."""


def run_import(root, job_id, files, mode):
    try:
        targets = files or [entry['file'] for entry in scan(root)]
        if not targets:
            log(job_id, 'Nothing to import.')
            finish(job_id, True, {'imported': []})
            return

        claude = shutil.which('claude')
        if mode == 'model' and not claude:
            log(job_id, 'The claude CLI was not found on PATH, so the judgment half cannot run.')
            log(job_id, 'Re-run in scaffold mode, or author these entries by hand.')
            finish(job_id, False)
            return

        imported, rejected = [], []
        for path in targets:
            log(job_id, '')
            log(job_id, '── %s' % path)

            sampler = repo_run(root, ['python3', 'scripts/sample-palette.py', path])
            if sampler.returncode != 0:
                log(job_id, '   could not sample palette; skipping')
                rejected.append(path)
                continue

            backup = os.path.join(root, 'data.js.import-backup')
            shutil.copyfile(os.path.join(root, 'data.js'), backup)

            log(job_id, '   analysing — several minutes: it reads AGENTS.md, examines the screenshot,')
            log(job_id, '   writes the entry, then runs the tests…')
            prompt = ANALYST_PROMPT.format(image=path, sampler=sampler.stdout)
            analysis = repo_run(root, [claude, '-p', prompt], timeout=900)
            if analysis.returncode != 0:
                log(job_id, '   analyst failed: ' + (analysis.stderr or analysis.stdout).strip()[:300])
                shutil.copyfile(backup, os.path.join(root, 'data.js'))
                os.remove(backup)
                rejected.append(path)
                continue

            log(job_id, '   verifying every hex against the screenshot…')
            verify = repo_run(root, ['python3', 'scripts/sample-palette.py', '--verify'])
            tests = repo_run(root, ['node', '--test'], timeout=300)

            if verify.returncode != 0 or tests.returncode != 0:
                # The provenance rule outranks the analyst. Roll back rather than
                # keep an entry whose colours are not demonstrably from the image.
                log(job_id, '   REJECTED — verification failed, data.js rolled back:')
                for line in (verify.stdout or '').splitlines():
                    if 'NOT-IN-SAMPLE' in line or 'OVERCLAIMED' in line:
                        log(job_id, '     ' + line.strip())
                if tests.returncode != 0:
                    log(job_id, '     node --test failed')
                shutil.copyfile(backup, os.path.join(root, 'data.js'))
                rejected.append(path)
            else:
                log(job_id, '   verified — entry kept, flagged unreviewed')
                imported.append(path)
            os.remove(backup)

        log(job_id, '')
        log(job_id, 'Imported %d, rejected %d.' % (len(imported), len(rejected)))
        if imported:
            log(job_id, 'New entries are flagged unreviewed — check each against its screenshot.')
        finish(job_id, len(rejected) == 0, {'imported': imported, 'rejected': rejected})
    except Exception as exc:  # noqa: BLE001
        log(job_id, 'ERROR: %s' % exc)
        finish(job_id, False)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, root=None, **kwargs):
        self.project_root = root
        super().__init__(*args, directory=root, **kwargs)

    def log_message(self, fmt, *args):
        sys.stderr.write('%s - %s\n' % (self.address_string(), fmt % args))

    def _json(self, status, payload):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def _authorised(self):
        if self.headers.get('X-Taste-Token') == TOKEN:
            return True
        self._json(403, {'error': 'bad or missing token'})
        return False

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

    def do_GET(self):
        if self.path == '/api/token':
            self._json(200, {'token': TOKEN})
            return
        if self.path == '/api/scan':
            try:
                self._json(200, {'newImages': scan(self.project_root)})
            except Exception as exc:  # noqa: BLE001
                self._json(500, {'error': str(exc)})
            return
        if self.path.startswith('/api/job'):
            job_id = re.sub(r'^.*id=', '', self.path)
            with JOBS_LOCK:
                job = JOBS.get(job_id)
                payload = dict(job) if job else None
            self._json(200 if payload else 404, payload or {'error': 'no such job'})
            return
        super().do_GET()

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


def main():
    port, host, root = int(sys.argv[1]), sys.argv[2], sys.argv[3]
    handler = partial(Handler, root=root)
    server = ThreadingHTTPServer((host, port), handler)
    sys.stderr.write('taste-library-api listening on http://%s:%d/\n' % (host, port))
    server.serve_forever()


if __name__ == '__main__':
    main()
