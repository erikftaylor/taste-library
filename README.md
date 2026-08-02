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

**Automated workflow:**

1. Drop image files into `images/`, or use the in-app Upload area.
2. Extract colors automatically:
   ```bash
   python3 scripts/extract-comprehensive-colors.py images/design.png
   ```
   This extracts 8 dominant colors and updates `data.js` with color entries.
   Review the auto-generated color names and **manually update the usage 
   descriptions** in `data.js` (e.g., "CTA button", "primary background").
3. Generate WebP derivatives:
   ```bash
   python3 scripts/resize-images.py images/design.png
   ```
   Creates `images/thumbs/` and `images/display/` versions.
4. Complete the entry in `data.js`: title, descriptor, keywords, typography,
   layoutNotes, imagerySubject, mood, and paths (`file`, `thumb`, `display`).
5. Assign to an existing category or propose a new one.
6. Remove processed file(s) from the in-app Inbox (if you used the upload area).

Categories are emergent — there's no fixed taxonomy. Claude either matches
a new screenshot to an existing category or proposes a new one.

Run `python3 scripts/resize-images.py --all` to (re)generate every derivative
at once, e.g. after changing the target sizes/quality in the script.

## Tests

Pure logic (prompt/brief generation, filtering, counts) has automated tests:

    node --test

Everything else (rendering, modal, upload) is verified manually in a
browser — there's no DOM-testing dependency, to keep the app itself at zero
external dependencies.
