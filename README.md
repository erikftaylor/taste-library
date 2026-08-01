# Taste Library

A personal design-inspiration gallery. Static site, no build step, no backend.

## Running it

Open `index.html` directly in a browser.

## Adding new screenshots

1. Drop image files into `images/`, or use the in-app Upload area (stages
   them in a temporary Inbox — click Download on each to save the real file
   to disk, then move it into `images/` yourself).
2. Ask Claude to add them.
3. Claude samples the dominant colors with
   `python3 scripts/extract-colors.py <path-to-image>`, generates resized
   WebP derivatives with `python3 scripts/resize-images.py <path-to-image>`
   (writes `images/thumbs/<name>.webp` for the card grid and
   `images/display/<name>.webp` for the modal — originals in `images/`
   stay untouched as the source of truth), assigns the screenshot to an
   existing category or proposes a new one, and writes the entry into
   `data.js` (title, descriptor, keywords, colors, typography, layoutNotes,
   imagerySubject, mood, plus `file`/`thumb`/`display` paths).
4. Remove the now-processed file(s) from the in-app Inbox.

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
