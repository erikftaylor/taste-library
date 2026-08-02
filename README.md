# Taste Library

A personal design-inspiration gallery. Static site, no build step, no backend.

## Running it

Open `index.html` directly in a browser.

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

PID and log files live in `/tmp/taste-library-server-${UID}` so the Open and
Stop shortcuts share the same server state even when macOS gives their actions
different temporary directories.
If the server exits during startup or times out before readiness, the
notification reports the log location. Port `8765` is localhost-only; if
another process already uses it, Taste Library leaves that process untouched
and reports the conflict.

## Adding new screenshots

1. Drop image files into `images/`, or use the in-app Upload area.
2. Generate WebP derivatives:
   ```bash
   python3 scripts/resize-images.py "images/design.png"
   ```
   Creates the `images/thumbs/` and `images/display/` versions.
3. Sample the real palette:
   ```bash
   python3 scripts/sample-palette.py "images/design.png"
   ```
   Reports the page's ground colours and its accents as two separate passes.
4. **Open the screenshot and look at it.** Give each hex a `usage` role, then
   write the entry's `descriptor`, `typography`, `layoutNotes`, `mood`, and its
   `signature` — three to five bullets naming what this page does structurally
   that others in its style family don't.
5. Match it to an existing category or add a new one. A new category also needs
   a `system` (its proportional scale) and a `wireframe`.
6. `node --test`, then reload the page and open the modal to check it.
7. Remove the processed file from the in-app Inbox, if you used the upload area.

Categories are emergent — there's no fixed taxonomy. There are currently seven,
derived from the screenshots themselves rather than chosen up front.

Run `python3 scripts/resize-images.py --all` to (re)generate every derivative
at once, e.g. after changing the target sizes/quality in the script.

`scripts/extract-comprehensive-colors.py` is superseded by `sample-palette.py`
and should not be used — it filters out neutral colours, which is backwards for
pages that are mostly white or black. See [AGENTS.md](AGENTS.md).

## What a brief contains

**Copy Brief** in the modal produces layered Markdown, ordered so each reader can
stop where it makes sense: a one-paragraph style summary, then what makes this
particular reference distinct, then the proportional system in base units, the
same values resolved to pixels, an ASCII wireframe with column spans, the locked
palette, and the imagery rules. A header at the top tells the receiving tool which
layers to obey depending on whether you want a faithful recreation or a variation.

[AGENTS.md](AGENTS.md) documents the data model and the invariants behind this.

## Tests

Pure logic (prompt/brief generation, filtering, counts) has automated tests:

    node --test

Everything else (rendering, modal, upload) is verified manually in a
browser — there's no DOM-testing dependency, to keep the app itself at zero
external dependencies.
