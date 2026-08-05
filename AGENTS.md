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
tests/palette_verification_test.sh       # palettes vs. their screenshots (needs Pillow)
tests/server_lifecycle_test.sh           # server start/stop/status
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
| §1b signature: Carry / Rewrite | **image** | devices to reproduce vs. content to replace |
| §2 proportional system + typefaces | category | variations — rescale from the ratios; named faces + never-list |
| §3 resolved px | derived from §2 | faithful recreation, design tools |
| §4 wireframe | category | replaces layout prose; unambiguous in any tool |
| §5 palette + contrast + ground safety | **image** | locked at every fidelity level |
| §6 observed notes | **image** | wins where it conflicts with §2/§3 |
| §7 imagery + exclusions | category + image | technique carry-class, subjects rewrite-class |
| §8 vocabulary + mood | both | brainstorming; mood doubles as a compatibility claim |
| §9 copy register | category | write new copy in the voice without the original words |
| §10 interaction states | category | hover/focus/active/disabled — specified or explicitly defaulted |
| §11 motion | category | mandatory even for static references; states "not observed" + default |
| §12 adapting to an existing brand | category | which layers yield, which never do, who it reads wrong for |

The mechanism that lets exact specs coexist with variation work: every measurement
is authored **once**, in base units, in `category.system`. `resolveUnits()` converts
`6u` and `2.5u × 6u` into `48px` and `20px × 48px` for §3. Same numbers, two
readings — a tool generating variations picks a new base unit and multiplies; a tool
recreating faithfully reads the px table. A test asserts §3 leaves no unresolved `u`.

Sections degrade gracefully: no `system` drops §2/§3, no `wireframe` drops §4, no
`signature` drops §1b. §10 and §11 never drop — with no authored data they emit an
explicit generic default instead, because an absent section is a decision handed to
the consuming agent. An `image.system` or `image.wireframe` overrides the
category's, which is how you'd pin one entry to its own measured values.

### The zero-decision standard

A brief passes when a fresh agent applying it to a *different brand's real content*
makes no narrated judgment calls — nothing to reconcile, sort, or invent. Every
"I'm adapting X because…" or "I'll interpret Y as…" in a consuming agent's response
is a defect in the brief, not diligence in the agent. The 2026-08-03 field test of
the Usman Group brief produced exactly two such decisions (sorting §1b into devices
vs. content; reconciling CTA copy with a new subject) — the Carry/Rewrite split and
§9 exist because of them. Concretely:

- **Carry vs. Rewrite (§1b).** Carry lists structural mechanisms portable to any
  subject; Rewrite lists words, subjects and copy specific to the reference, each
  with a rule for writing replacements. Never mix them. If an item can't be
  classified, it goes in Rewrite. A Carry bullet must not quote literal copy — a
  test rejects `"` in Carry bullets.
- **Fonts.** Never a family description alone: every type role gets named typefaces
  ("Archivo, Space Grotesk, or similar") or explicit selection criteria, plus a
  never-list (default: Inter, Roboto, Arial, system-ui as a display face).
- **Motion.** Mandatory. When nothing was observed, the brief says exactly that and
  prescribes the default per signature device, transform/opacity only.
- **States.** Interactive components get hover/focus/active described or explicitly
  defaulted — a resting-state-only spec forces the agent to invent three more.
- **Ground safety.** §5 states which palette roles are text-safe grounds and which
  are decorative-only, computed from the verified hexes.

### The zero-decision gate — run after generating or revising any brief

Dispatch a **fresh subagent** (clean context — no access to this conversation or the
repo) with only (a) the generated brief and (b) a dummy brand: different palette,
different sector, real content. Ask it to state, *before building anything*, every
decision the brief leaves to it. Count the decisions. **Zero passes.** Each non-zero
item gets folded back into the brief as a rule or an explicit default — usually into
the category's `copyRegister`/`states`/`motion`/`adaptation` or the image's
`signature.rewrite` — then re-run the gate.

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
- `fonts` — `{ roles: [[scope, faces], …], never }`. Named typefaces or selection
  criteria per type scope, plus the never-list (§2). Mandatory.
- `copyRegister` — array of rules describing the copy voice ("CTA labels:
  imperative, 1–3 words, all-caps"), never literal strings (§9). Mandatory.
- `motion` — array of prose lines. First line states whether motion was observed;
  the rest prescribe the default per device, transform/opacity only (§11). Mandatory.
- `states` — `[[component, 'hover: …; focus-visible: …; active: …'], …]` for every
  interactive component (§10). Mandatory.
- `adaptation` — `{ yields, locked[], register }`. `yields` states the palette role
  structure and what may be re-derived from a target brand; `locked` names the 2–4
  devices that ARE the style; `register` is the compatibility claim, phrased as who
  this reads wrong for (§8, §12). Mandatory.

Like `system` and `wireframe`, these five are **authored, not measured** — they
describe the style family prescriptively.

**Image** — one screenshot. `id`, `file`, `thumb`, `display`, `categoryId`, `title`,
`descriptor`, `keywords[]`, `colors[]`, `typography`, `layoutNotes`,
`imagerySubject`, `mood[]`, plus:

- `signature` — `{ carry: [3–5 bullets], rewrite: [1+ items] }`. **Carry** names the
  structural moves specific to this reference — write "dotted thread connects
  sections vertically, full page height", not "feels playful" (mood has its own
  field), and never quote literal copy in a Carry bullet. **Rewrite** names the
  reference-specific words, copy and proper nouns that a consuming agent must
  replace, each with the rule for writing the replacement. Can't classify an item?
  It goes in Rewrite.
- `colors[]` — `{ name, hex, usage }`, plus an optional `contrastNote`. `usage` is
  the observed role ("full-bleed hero ground", "pill CTA fill"), not a guess.
  **Order the array by descending prominence** — grounds first, then the colours
  covering most of the image, accents last. The order is load-bearing: §12 tells a
  consuming agent to work down the table assigning brand hues in that sequence,
  and no area figures are published for it to rank by instead.
  `contrastNote` is the record that someone opened the image and checked. Usually
  it names a contrast failure the reference actually ships — what fails, against
  what, and by how much. It also covers the opposite finding: the verifier pairs
  every text colour against the widest colour in its palette, which is wrong
  whenever the type sits on something else (a knockout over an illustration, copy
  inside a card), so a note may instead record the real pairing and the ratio it
  clears. Either way the note states measured values. Adding one never licenses
  changing the hex; see the LOWCONTRAST check below.

## Invariants the tests enforce

- Every image: valid `categoryId`, all text fields non-empty, **3+ Carry signature
  bullets and 1+ Rewrite items**; no `"` inside a Carry bullet (literal copy belongs
  in Rewrite).
- Every colour: valid hex **and** a non-empty `usage`.
- Every category: a `system` with 3+ type roles and 4+ components, a `wireframe`,
  and the five prescriptive layers — `fonts` (with never-list), `copyRegister` (2+),
  `motion` (2+ lines), `states` (2+ components), `adaptation` (with 2–4 `locked`
  devices).
- **No two images in a category share a signature bullet** (Carry or Rewrite) — this
  fails loudly if someone pads an entry with generic filler instead of looking at
  the screenshot.
- §3 of a brief contains no unresolved base units.
- Every image's original, thumb, and display file exists on disk and is non-empty.

`tests/palette_verification_test.sh` adds two checks that need the image files, so
they live outside `node --test`:

- **NOT-IN-SAMPLE** — the hex is not one `sample-palette.py` proposes for that image.
- **OVERCLAIMED** — the hex is real but is given a page-ground role (`page ground`,
  `primary background`, …) while another entry in the same palette covers
  substantially more of the image. Scoped grounds ("footer ground", "project tile
  ground") are deliberately not checked; only page-level claims are.
- **LOWCONTRAST** — a hex whose `usage` says it is set as *type* does not clear
  4.5:1 (or 3:1 where the usage names only large roles — display, headline,
  wordmark, heading, numeral) against the widest-area colour in its own palette.
  Usages naming a surface — fill, band, plate, tile, panel, or anything sitting
  *behind* text — are excluded, because those are not text pairings.

**A reference is allowed to fail contrast. The library records what is there.**
Never adjust a hex to pass this check — that is fabricating the reference, and it
is the same class of error as eyedropping a palette. Open the image, confirm what
the colour actually sits on, and write a `contrastNote`. §5 of the brief then
carries an explicit "do not reproduce" block naming the failure, instead of
letting the palette's AA framing imply the pairing is safe.

LOWCONTRAST does not fail the run yet: 9 entries predating the check are still
unannotated. Once each carries a note, remove the exemption at the end of
`verify()` in `sample-palette.py` so a new unannotated failure breaks the build.

### Never eyedrop a palette by hand

**Every hex must come from the sampler's output for that specific image.** Not from
memory, not from a sibling entry, not from a brand guideline. This is a provenance
rule, and it exists because no pixel statistic reliably separates "a design colour"
from "a colour that merely occurs" — a brand amber used for headline text and a
foreign orange inside a client logo can have near-identical area, run length and page
spread. What *is* checkable is where the hex came from.

Both failure modes have shipped here. `adam-fard` carried a dark-charcoal "primary
background" on a page that is 63% white. `experience-dynamics` carried
`#E86C3A coral` on a page whose CTAs are pink — the hex was carried over from another
entry, and an area-based check passed it because it matched an orange third-party
logo in a client logo wall.

The sampler proposes a colour on any of three independent signals, because design
colours appear in three different ways:

| Signal | Threshold | Catches |
| --- | --- | --- |
| `area` | ≥ 0.5% of the image | grounds, full-bleed bands, large fills |
| `region` | flat run ≥ 12% of width | buttons, chips, cards, rules |
| `spread` | present in ≥ 4 of 24 page bands | text, thin strokes, dashed borders, gradients |

A colour meeting none of the three is not part of the design system whatever its raw
pixel count. Run length alone is not enough — text, dashes and gradients never form
long runs, and an early version of this check rejected 22 legitimate colours before
the three-signal rule replaced it.

## Adding a reference

A reference is any **designed artifact**, not only a web page — UI kit
boards, palette cards, posters, and app screens all qualify. The entry
describes the design *of the artifact itself* (the palette card's own
rounded blocks, its typography, its composition) with the same fields and
the same standards as a website entry. Categories stay emergent: a board
that fits no existing family founds a new category whose `system` and
`wireframe` describe the board's composition. Colour `usage` roles use the
artifact's own vocabulary ("canvas ground", "card ground") rather than
forcing "page ground" — the verifier's OVERCLAIMED check only fires on
page-level ground claims, and that rule applies verbatim — which means an
artifact-level ground claim gets no verifier backstop; get it right by
looking.

1. Drop the file in `images/`.
2. `python3 scripts/resize-images.py "images/new-thing.png"` → thumb + display WebP.
3. `python3 scripts/sample-palette.py "images/new-thing.png"` → real hexes, two passes.
4. **Open the image and look at it.** Assign each hex a `usage` role. Write
   `descriptor`, `layoutNotes`, `typography`, and the `signature` from what is
   actually on screen — structural devices into `carry`, reference-specific words
   and copy into `rewrite` (with the rule for writing replacements).
5. Match it to an existing category or add a new one. The taxonomy is emergent —
   there is no fixed set. A new category needs its own `system`, `wireframe`,
   `fonts`, `copyRegister`, `motion`, `states`, and `adaptation`.
6. `node --test` and `tests/palette_verification_test.sh`, then reload the page and
   open the modal.
7. **Run the zero-decision gate** (see "The brief format"): hand the generated brief
   plus a dummy brand to a fresh subagent and count the decisions it says the brief
   leaves to it. Fold every one back into the data as a rule or default, and re-run
   until the count is zero.

`python3 scripts/sample-palette.py --verify [id ...]` runs the palette check alone
and exits non-zero on failure, which is quicker while you are iterating on one entry.

## Traps

**Derivatives are constrained by WIDTH only — never use `thumbnail()`.** Pillow's
`thumbnail()` fits inside *both* dimensions. These are full-page screenshots, often
six to fifteen times taller than they are wide, so the height bound binds and the
width collapses: the library once shipped 49×720 display files that the modal then
stretched across a 540 CSS px pane. Sizing follows what the app presents:

| Derivative | Rule | Why |
| --- | --- | --- |
| `display` | 1440px wide, height unbounded, 16MP ceiling, **1080px floor** | `.modal-image` is half of a `min(1080px, 96vw)` modal ≈ 540 CSS px; the floor stops the megapixel ceiling undercutting 2× on very tall pages |
| `thumb` | 800px wide, cropped to the top 600px | `.card-image` is 200px tall with `object-fit: cover; object-position: top`, so only the top strip is ever visible |

Never upscale past the source. One entry (`ridgeframe-strategies-group`) sits at 1.28×
because its capture is only 692px wide — that needs a better screenshot, not a pipeline
change. If you change the CSS that sizes `.modal-image` or `.card-image`, revisit these
constants; they are derived from those rules, not chosen freely.

**Do not reintroduce a neutral-filtering colour extractor.** Two earlier scripts
(`extract-colors.py`, `extract-comprehensive-colors.py`) dropped near-white, near-black
and near-grey pixels before ranking, on the theory that neutrals are not "the palette".
Most pages here are 40–70% white or near-black, so that filter throws away the single
most important entry and reports incidental pixels instead — which is how this library
shipped a dark-charcoal palette for a page that is 63% white. Both were deleted in
favour of `sample-palette.py`, which ranks with neutrals included and finds accents in
a second chroma-weighted pass. They remain in git history if you want to see the bug.

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
