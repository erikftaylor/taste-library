# Browser Upload → Disk → Ingest, and Non-Website References

## Goal

Two gaps, closed together:

1. The in-app Upload area is browser-only. Dropped files sit in an in-memory
   Inbox and never reach `images/`, so the Scan/Prepare/Import pipeline cannot
   see them.
2. The ingest pipeline's authoring guidance is written around website
   screenshots. Design boards, UI kit shots, and palette cards should ingest
   and present exactly like website entries.

## Upload endpoint

`POST /api/upload` on `scripts/taste-library-api.py`, token-gated like the
other mutating endpoints (`X-Taste-Token`).

- **Body**: raw binary image bytes. Filename arrives in an `X-Filename`
  header. No multipart parsing, no base64 — keeps the server dependency-free
  and bodies small.
- **Sanitization**: the server keeps only the basename, lowercases it,
  transliterates/strips non-ASCII, collapses runs of separators into single
  hyphens, and preserves the extension. `Deloitte-—-Brand-Book-Unbrand-my.png`
  → `deloitte-brand-book-unbrand-my.png`. Path separators and traversal
  sequences never survive.
- **Accepted extensions**: `.png`, `.jpg`, `.jpeg`, `.webp` (the pipeline's
  existing `IMAGE_SUFFIXES`). Anything else → 400.
- **Collision handling**: if the sanitized name exists in `images/` with
  byte-identical content, respond success with `alreadyPresent: true` and do
  not write. If content differs, append `-2`, `-3`, … before the extension.
- **Response**: `{ "file": "images/<final-name>", "alreadyPresent": bool }`.
  The UI tracks the returned path, which may differ from the uploaded name.

## Inbox becomes status-aware

When the import API is present (`/api/token` probe already exists), dropping
or picking a file immediately uploads it. Each Inbox card shows one state:

- **uploading** — POST in flight.
- **saved — not in library** — on disk in `images/`, no `data.js` entry yet.
  The card gains an **Import** button that calls `/api/import` with
  `{ files: ["images/<name>"] }`, reusing the existing job log and note UI.
- **failed** — upload rejected or unreachable; the card offers **Retry**.

The global Scan/Prepare/Import bar is unchanged and also covers uploaded
files — after upload they are ordinary files in `images/`.

Served statically or opened from disk (no API), the Inbox behaves exactly as
today: preview, Download, Remove. No new behaviour appears without the API,
matching the existing pattern of hiding the import bar.

After a successful per-file import, the card reports success and points at
reload (same copy pattern as the global Import button). Removing a card never
deletes anything from disk — Remove stays a browser-side action only.

## Non-website references

No data-model change, no new fields, no brief-format fork. `AGENTS.md` and
the `ANALYST_PROMPT` in `taste-library-api.py` gain a short paragraph
establishing:

- A reference is a **designed artifact**, not only a web page. UI kit boards,
  palette cards, posters, and app screens all qualify.
- The entry describes the design *of the artifact itself* — the palette
  card's own rounded blocks, its typography, its composition — with the same
  fields and the same standards as a website entry.
- Categories stay emergent. A neumorphism board that fits no existing family
  founds a new category whose `system` and `wireframe` describe the board's
  composition.
- Colour `usage` roles use the artifact's own vocabulary ("canvas ground",
  "card ground") rather than forcing "page ground". The verifier's
  OVERCLAIMED check only fires on page-level ground claims, and that rule
  applies verbatim to artifacts.

## Testing

- `tests/upload_api_test.sh` (sibling of the lifecycle test): starts the API
  server against a temp copy of the repo layout, then asserts —
  - POST with valid token and a real PNG lands the sanitized name in `images/`
  - same bytes again → `alreadyPresent: true`, no duplicate file
  - different bytes, same name → `-2` suffix
  - non-image extension → 400, nothing written
  - missing/wrong token → 403, nothing written
  - filename with path traversal (`../x.png`) → written under `images/` only
- Inbox UI states are verified manually in the browser, per the project's
  no-DOM-testing rule. `node --test` is unaffected (no pure-logic change).

## Out of scope

- Auto-running prepare/import on upload (rejected: several minutes of analyst
  time per drop, even for images not kept).
- Browser-side writes via the File System Access API (Chromium-only, splits
  the mutation path).
- Reference-type fields or brief-format changes for non-page artifacts.
- Deleting files from `images/` via the UI.
