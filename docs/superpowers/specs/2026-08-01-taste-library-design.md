# Taste Library — Design Spec

Date: 2026-08-01

## Purpose

A personal design-inspiration gallery: a static local web app that displays UI/UX screenshots grouped by aesthetic family, explains each family's design vocabulary, and lets the owner pull a ready-to-use image prompt or a design brief out of any single reference.

## Architecture

Static single-page app: plain HTML/CSS/JS, no build step, no server, no external dependencies. Opens directly as a local file (`index.html`) or via any static host later. No backend — all content lives in a single embedded JS data file, since `fetch()` of local JSON is blocked by CORS under `file://`.

Version-controlled with a local git repo (no remote for now).

## File structure

```
taste-library/
  index.html
  styles.css
  app.js
  data.js          # categories + image metadata (see Data model)
  images/           # screenshot files
    usman-home.png
    usman-blog.png
    usman-contact.png
    usman-about.png
  docs/superpowers/specs/   # this spec
```

The 4 existing root-level screenshots move into `images/` as part of setup.

## Data model (`data.js`)

```js
categories: [{
  id, name,
  description,     // what the style is + what it communicates (2-4 sentences)
  vocabulary: []    // general terms associated with the family
}]

images: [{
  id, file, categoryId,
  title, descriptor,       // one-line style summary
  keywords: [],             // specific per-image design-vocabulary tags
  colors: [{ name, hex }],  // sampled programmatically from the screenshot, not guessed
  typography, layoutNotes, imageryStyle,
  mood: []
}]
```

Categories are **emergent**: there is no fixed taxonomy. Each time a screenshot is added, it's matched to an existing category or a new one is proposed, the way the reference example did (Print-Tech Paper, Dither Mono, Vast Quiet Cinematic, etc.).

The 4 current screenshots (all from Usman Group) form the seed data for a single category — a friendly, editorial style built from flat full-bleed color blocks and single-line hand-drawn illustration.

## Content workflow

No in-app data entry. To add screenshots:
1. Drop image files into `images/` (or use in-app Upload → Download, see below).
2. Tell Claude they're there.
3. Claude analyzes each image, samples its dominant colors programmatically, assigns/creates a category, and writes the `data.js` entry (description, vocabulary, keywords, colors, typography/layout/imagery notes).

No manual metadata entry required from the owner.

## Gallery UI

Visual style modeled closely on a reference screenshot the owner provided: cream/paper background, monospace type, black-bordered cards, filter chips with counts, filled (borderless) keyword pill tags.

- **Filter row**: "ALL" + one chip per category, each showing a count. Active chip is filled black. Selecting a chip filters the sections below to that category (or shows all).
- **Category sections**, stacked vertically, each with:
  - Heading (category name) + reference count
  - Description paragraph: what the style is, what it means/communicates
  - Vocabulary chip row: general terms for the family
  - Card grid for that category's images
- **Cards**: cropped screenshot (top-aligned, `object-fit: cover`), title, one-line descriptor, a few keyword tags with `+N` overflow, category badge (◆ icon), index counter (e.g. `01 / 04`). Clicking a card opens the expanded modal view.

## Expanded modal view

Validated interactively against a reference screenshot the owner provided; final layout is **side-by-side**: screenshot fills the left half (scrollable if the capture is tall), a scrollable info panel fills the right half. Panel contents, top to bottom:

1. Header row: serif-font title (image title) + category badge, right-aligned
2. One-line descriptor
3. Full, untruncated keyword tag list (filled pill style, no border)
4. Dashed divider, then the **image recipe box**:
   - Small olive/mono label: `IMAGE RECIPE — fill [SUBJECT]`
   - Prompt text where the `[SUBJECT: ...]` clause is visually highlighted (yellow) and distinct from the fixed "recipe" (technique, palette, lighting, exclusions) that stays constant for the style family — see Copy Image Prompt below
5. Button row, pinned to the bottom of the panel: **Copy Brief**, **Copy Image Prompt** (both solid black), **Close** (outlined)

No inline "edit" affordance — metadata changes go through Claude editing `data.js` directly, since there's no backend to persist in-browser edits anyway.

## Copy Image Prompt

Copies the exact text shown in the recipe box to the clipboard (Clipboard API, with an `execCommand('copy')` fallback for compatibility). The text is assembled from the image's structured metadata into a **reusable template**:

- `[SUBJECT: ...]` — a swappable clause describing this image's actual subject matter (what's depicted), meant to be edited by hand when reusing the recipe for a new piece of art
- Followed by the fixed "recipe": medium/technique, a **named** color palette (color names, not hex — image models respond to natural-language color words, not hex codes), lighting/composition and negative-space notes, and explicit exclusions (`no text, no interface elements, no logos`) since the source is a UI screenshot and generators otherwise hallucinate interface chrome into what should be pure background/illustration art

Model-agnostic — no specific tool or model is named in the prompt, so it works pasted into any image generator.

Example (Usman Group homepage):

> [SUBJECT: two people collaborating at a whiteboard, sketching a diagram] rendered as loose single-line vector illustration, minimal facial detail, flat watercolor-wash color field behind the figures (STRICT palette: mustard yellow, coral red, or soft cyan — pick one per image, no gradients), generous white negative space around the scene, clean editorial tech-consultancy illustration style, no text, no interface elements, no logos

## Copy Brief

Copies a longer, structured design brief to the clipboard — meant to be pasted into a Claude session (works well with the `impeccable` skill, which expects concrete tokens rather than mood language) to build a new site in that style. Structured as a literal token sheet plus prose context:

- Style name + one-line summary
- Color palette: named + hex, pulled from the same sampled `colors[]` data
- Type scale: family, weights, sizes (from `typography` notes)
- Spacing rhythm and named component patterns (button style, card style, CTA treatment) from `layoutNotes`
- Short prose section: layout philosophy, tone/voice, and the category's vocabulary list — the parts a token sheet can't express on its own

## Upload / Inbox

Since there's no backend, an in-app "Upload" affordance can't run categorization itself. It stages picked files as an **Inbox**:

- Drop zone / file picker adds images to an in-memory `inboxImages` list (not persisted — lost on refresh; this is a short-lived staging step, not permanent storage)
- Rendered as its own section: bare cards (image + filename, "Uncategorized" badge), no keywords/buttons since nothing has been categorized yet
- Each inbox card has **Download** (saves the real file to disk via a browser download) and **Remove**
- Workflow: upload → review → Download → tell Claude the files landed in Downloads → Claude moves them into `images/`, categorizes, and writes the `data.js` entries → owner removes the now-processed items from the Inbox

## Out of scope

- No backend, no database, no auth
- No fixed/preset category taxonomy
- No in-browser editing of existing entries
- No specific image-model targeting in prompts
- No cross-session persistence of Inbox uploads (in-memory only)
