# AGENTS.md

Working notes for coding agents. Humans want [README.md](README.md).

## What this is

A personal design-inspiration gallery. Static site — no build step, no backend, no
dependencies. `index.html` loads three plain scripts (`data.js`, `lib/content.js`,
`app.js`) and renders a filterable grid of screenshots. Clicking one opens a modal
with its palette and two copy buttons: **Copy Image Prompt** and **Copy Brief**.

The briefs are the point of the project. Everything else exists to produce them.

## Run and test

```bash
scripts/taste-library-server.sh start    # serves http://127.0.0.1:8765/
scripts/taste-library-server.sh status
scripts/taste-library-server.sh stop
node --test                              # 17 tests, no deps, no package.json
```

`node --test` covers pure logic only — brief and prompt generation, filtering,
counts, and data integrity. Rendering, the modal, and upload are verified by hand
in a browser; there is no DOM-testing dependency, deliberately, to keep the app at
zero external dependencies. If you change `app.js`, open the page and look at it.

Python author-side scripts need Pillow. They are never loaded by the app.

## Repo map

```
index.html      markup + cache-buster query params on the script tags
app.js          rendering, modal, inbox/upload. Plain ES5-style, no framework
lib/content.js  buildBrief / buildImagePrompt / filtering — the only tested logic
data.js         all content: categories[] and images[]. Hand-authored
styles.css      all styling
tests/          node:test files, plus a shell test for the server lifecycle
scripts/        author-side Python + the server lifecycle shell script
images/         originals; thumbs/ and display/ hold generated WebP derivatives
shortcuts/      signed macOS Shortcuts wrapping the server start/stop
```

`data.js` and `lib/content.js` are UMD-wrapped so `node --test` can `require()` them
and the browser can load them as globals. Keep that wrapper if you touch either.

## The brief format

`buildBrief(image, category)` emits layered Markdown with a header telling the
receiving model which layer to obey. This is the core design decision — read it
before changing anything in `lib/content.js`.

| Section | Source | Serves |
|---|---|---|
| §1 style paragraph | category | brainstorming — stop here |
| §1b signature | **image** | what this reference does that its family doesn't |
| §2 proportional system | category | variations — rescale from the ratios |
| §3 resolved px | derived from §2 | faithful recreation, design tools |
| §4 wireframe | category | replaces layout prose; unambiguous in any tool |
| §5 palette | **image** | locked at every fidelity level |
| §6 observed notes | **image** | wins where it conflicts with §2/§3 |
| §7 imagery + exclusions | category | locked at every fidelity level |
| §8 vocabulary + mood | both | brainstorming |

The mechanism that lets exact specs coexist with variation work: every measurement
is authored **once**, in base units, in `category.system`. `resolveUnits()` converts
`6u` and `2.5u × 6u` into `48px` and `20px × 48px` for §3. Same numbers, two
readings — a tool generating variations picks a new base unit and multiplies; a tool
recreating faithfully reads the px table. A test asserts §3 leaves no unresolved `u`.

Sections degrade gracefully: no `system` drops §2/§3, no `wireframe` drops §4, no
`signature` drops §1b. An `image.system` or `image.wireframe` overrides the
category's, which is how you'd pin one entry to its own measured values.

## Data model

`data.js` exports `{ categories: [...], images: [...] }`.

**Category** — a style family. `id`, `name`, `description`, `vocabulary[]`,
`imageryTechnique`, `imageryExclusions`, plus:

- `system` — `{ baseUnit, canvas, grid, rhythm, typeScale[], components[] }`.
  `typeScale` rows are `[role, treatment, size, lineHeight]`; `components` rows are
  `[name, spec]`. Sizes and specs are written in base units (`7u`, `2.5u × 6u`) so
  §3 can resolve them.
- `wireframe` — array of strings, joined with newlines into a fenced block. ASCII
  box drawing with **column spans labelled** (`┌ 1–6 ┐`). The last line is a prose
  rule about how to extend the layout.

**Image** — one screenshot. `id`, `file`, `thumb`, `display`, `categoryId`, `title`,
`descriptor`, `keywords[]`, `colors[]`, `typography`, `layoutNotes`,
`imagerySubject`, `mood[]`, plus:

- `signature` — 3–5 bullets naming the **structural** moves specific to this
  reference. This is the only per-image layer that carries structure, and it is what
  stops every entry in a family from generating the same brief. Write
  "dotted thread connects sections vertically, full page height", not "feels
  playful" — mood already has its own field.
- `colors[]` — `{ name, hex, usage }`. `usage` is the observed role
  ("full-bleed hero ground", "pill CTA fill"), not a guess.

## Invariants the tests enforce

- Every image: valid `categoryId`, all text fields non-empty, **3+ signature bullets**.
- Every colour: valid hex **and** a non-empty `usage`.
- Every category: a `system` with 3+ type roles and 4+ components, and a `wireframe`.
- **No two images in a category share a signature bullet** — this fails loudly if
  someone pads an entry with generic filler instead of looking at the screenshot.
- §3 of a brief contains no unresolved base units.
- Every image's original, thumb, and display file exists on disk and is non-empty.

## Adding a screenshot

1. Drop the file in `images/`.
2. `python3 scripts/resize-images.py "images/new-thing.png"` → thumb + display WebP.
3. `python3 scripts/sample-palette.py "images/new-thing.png"` → real hexes, two passes.
4. **Open the screenshot and look at it.** Assign each hex a `usage` role. Write
   `descriptor`, `layoutNotes`, `typography`, and the `signature` bullets from what
   is actually on screen.
5. Match it to an existing category or add a new one. The taxonomy is emergent —
   there is no fixed set. A new category needs its own `system` and `wireframe`.
6. `node --test`, then reload the page and open the modal.

## Traps

**The palettes were wrong once, and the cause is still in the repo.**
`scripts/extract-comprehensive-colors.py` filters out near-neutral colours before
ranking. Most pages here are 40–70% white or near-black, so filtering neutrals
reports incidental pixels and produces a palette describing no part of the page.
It also writes `usage: 'primary color'` for every entry, which now fails the tests.
**Prefer `scripts/sample-palette.py`.** The old script is kept only because the
README documented it; deleting or rewriting it is a welcome change.

**19 of 26 entries once described their assigned category rather than their image.**
A batch job assigned each screenshot to one of three pre-existing categories, then
wrote `descriptor`/`layoutNotes`/colour roles to fit that assignment. Commit
`fbbc1a6` rebuilt all 26 from the screenshots and split 3 categories into 7. The
lesson: **never author image metadata from the category, or from another entry.**
Open the image.

**§2/§3/§4 are authored, not measured.** The proportional system and wireframe
describe the *style family* and were designed, not measured off any one screenshot.
§1b, §5, §6 are the specific reference. Don't present a §3 pixel value as measured
from a particular page.

**Tall screenshots defeat image viewers.** Several pages are 8,000–15,000px tall
and downsample to illegibility. Crop them into vertical slices first:

```python
from PIL import Image
im = Image.open('images/tall-page.png'); w, h = im.size
for i in range(5):
    im.crop((0, i * h // 5, w, (i + 1) * h // 5)).save(f'/tmp/slice{i}.png')
```

**Cache busting.** `index.html` carries `?v=` query params on the script tags. The
browser will happily serve a stale `data.js` without them. Bump the value if a
change doesn't appear.

## Conventions

- Plain ES5-style JS — `var`, `function`, no arrow functions, no build step. Match
  the surrounding code; it is consistent.
- No dependencies, in either direction. No `package.json`.
- Commit messages explain *why*, with the failure mode when fixing something.
- Don't commit or push unless asked.
