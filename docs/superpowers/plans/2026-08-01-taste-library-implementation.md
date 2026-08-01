# Taste Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static Taste Library gallery app described in `docs/superpowers/specs/2026-08-01-taste-library-design.md` — a filterable, categorized screenshot gallery with an expanded modal view that generates a Copy Image Prompt and a Copy Brief, plus an in-app upload Inbox.

**Architecture:** Plain HTML/CSS/JS, no build step, no server, no dependencies. Content-generation logic (prompt/brief text, filtering, counts) lives in a small pure, Node-testable module (`lib/content.js`); gallery data lives in `data.js`; DOM rendering and interaction live in `app.js`. All three are loaded as plain `<script>` tags (not ES modules) so the page works under `file://` without hitting CORS restrictions.

**Tech Stack:** Vanilla JS (no framework), Node's built-in `node:test` runner for logic tests (zero install, ships with Node), Python 3 + Pillow for the one-off author-side color-sampling script (not shipped with the app).

---

## File structure

```
taste-library/
  index.html            # page shell: filters, upload/inbox, category sections, modal
  styles.css             # all presentation
  data.js                 # categories[] + images[] (UMD: window.TASTE_DATA / module.exports)
  lib/
    content.js            # pure functions: buildImagePrompt, buildBrief, filtering, counts
  app.js                  # DOM rendering + interaction, built up across Tasks 5-8
  images/                 # screenshot files
  scripts/
    extract-colors.py     # author-side tool: sample dominant colors from a screenshot
  tests/
    content.test.js
    data.test.js
  README.md
```

---

### Task 1: Move screenshots into `images/`, commit the color-sampling tool

**Files:**
- Move: `Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.png` → `images/Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.png`
- Move: `Business-Communication-Digital-Strategy-Blog-by-Usman-Group.png` → `images/Business-Communication-Digital-Strategy-Blog-by-Usman-Group.png`
- Move: `Contact-Usman-Group.png` → `images/Contact-Usman-Group.png`
- Move: `Web-Consultant-Marketing-Design-Development-Consulting.png` → `images/Web-Consultant-Marketing-Design-Development-Consulting.png`
- Already created: `scripts/extract-colors.py` (author-side dominant-color sampler, written during design)

- [ ] **Step 1: Create the images folder and move the screenshots into it**

```bash
mkdir -p images
mv "Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.png" images/
mv "Business-Communication-Digital-Strategy-Blog-by-Usman-Group.png" images/
mv "Contact-Usman-Group.png" images/
mv "Web-Consultant-Marketing-Design-Development-Consulting.png" images/
```

- [ ] **Step 2: Verify**

Run: `ls images/`
Expected: the 4 `.png` files listed, root directory no longer contains them (`ls *.png` in the root should now error with "no matches found").

- [ ] **Step 3: Commit**

```bash
git add images/ scripts/extract-colors.py
git commit -m "Move screenshots into images/, add author-side color sampler"
```

---

### Task 2: `lib/content.js` — pure content-generation and filtering logic (TDD)

**Files:**
- Create: `lib/content.js`
- Test: `tests/content.test.js`

- [ ] **Step 1: Write the failing tests**

Create `tests/content.test.js`:

```js
var test = require('node:test');
var assert = require('node:assert');
var TasteContent = require('../lib/content.js');

test('computeCategoryCounts returns an All entry plus one entry per category with correct counts', function () {
  var categories = [{ id: 'a', name: 'Alpha' }, { id: 'b', name: 'Beta' }];
  var images = [{ categoryId: 'a' }, { categoryId: 'a' }, { categoryId: 'b' }];
  var result = TasteContent.computeCategoryCounts(categories, images);
  assert.deepStrictEqual(result, [
    { id: 'all', name: 'All', count: 3 },
    { id: 'a', name: 'Alpha', count: 2 },
    { id: 'b', name: 'Beta', count: 1 }
  ]);
});

test('filterImagesByCategory returns all images for "all"', function () {
  var images = [{ categoryId: 'a' }, { categoryId: 'b' }];
  assert.strictEqual(TasteContent.filterImagesByCategory(images, 'all').length, 2);
});

test('filterImagesByCategory returns only matching images for a specific category', function () {
  var images = [{ categoryId: 'a', id: 1 }, { categoryId: 'b', id: 2 }, { categoryId: 'a', id: 3 }];
  var result = TasteContent.filterImagesByCategory(images, 'a');
  assert.deepStrictEqual(result.map(function (i) { return i.id; }), [1, 3]);
});

test('buildImagePromptParts joins palette names and combines technique/exclusions', function () {
  var category = {
    imageryTechnique: 'loose single-line vector illustration, flat watercolor wash background',
    imageryExclusions: 'no text, no interface elements, no logos'
  };
  var image = {
    imagerySubject: 'two people collaborating at a whiteboard',
    colors: [{ name: 'mustard-gold wash', hex: '#E9B97D' }, { name: 'pale cyan', hex: '#8DF1F4' }]
  };
  var parts = TasteContent.buildImagePromptParts(image, category);
  assert.strictEqual(parts.subject, 'two people collaborating at a whiteboard');
  assert.strictEqual(
    parts.rest,
    'loose single-line vector illustration, flat watercolor wash background (STRICT palette: mustard-gold wash, pale cyan), no text, no interface elements, no logos'
  );
});

test('buildImagePrompt wraps the subject in a [SUBJECT: ...] clause', function () {
  var category = { imageryTechnique: 'flat illustration', imageryExclusions: 'no text' };
  var image = { imagerySubject: 'a tree', colors: [{ name: 'green', hex: '#00FF00' }] };
  var result = TasteContent.buildImagePrompt(image, category);
  assert.strictEqual(result, '[SUBJECT: a tree] flat illustration (STRICT palette: green), no text');
});

test('buildBrief includes palette, typography, layout, imagery, tone, and summary sections in order', function () {
  var category = {
    name: 'Illustrated Editorial Blocking',
    imageryTechnique: 'flat illustration',
    vocabulary: ['flat color-blocking', 'underline emphasis'],
    description: 'A friendly, editorial style.'
  };
  var image = {
    title: 'Usman Group — Homepage',
    descriptor: 'Hand-drawn figures on color blocks.',
    colors: [{ name: 'mustard-gold wash', hex: '#E9B97D' }],
    typography: 'Bold geometric grotesk display type.',
    layoutNotes: 'Alternating full-bleed color-block sections.',
    imagerySubject: 'two people at a whiteboard',
    mood: ['approachable', 'confident']
  };
  var brief = TasteContent.buildBrief(image, category);

  ['## Color Palette', '## Typography', '## Layout & Components', '## Imagery Style', '## Tone & Vocabulary', '## Style Summary'].forEach(function (heading) {
    assert.ok(brief.includes(heading), 'missing heading: ' + heading);
  });
  assert.ok(brief.includes('mustard-gold wash — #E9B97D'));
  assert.ok(brief.includes('Bold geometric grotesk display type.'));
  assert.ok(brief.includes('Mood: approachable, confident'));
  assert.ok(brief.includes('Vocabulary: flat color-blocking, underline emphasis'));

  var order = ['## Color Palette', '## Typography', '## Layout & Components', '## Imagery Style', '## Tone & Vocabulary', '## Style Summary'];
  var lastIndex = -1;
  order.forEach(function (heading) {
    var idx = brief.indexOf(heading);
    assert.ok(idx > lastIndex, heading + ' out of order');
    lastIndex = idx;
  });
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/content.test.js`
Expected: FAIL — `Cannot find module '../lib/content.js'`

- [ ] **Step 3: Implement `lib/content.js`**

```js
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.TasteContent = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {

  function computeCategoryCounts(categories, images) {
    var perCategory = categories.map(function (category) {
      var count = images.filter(function (image) { return image.categoryId === category.id; }).length;
      return { id: category.id, name: category.name, count: count };
    });
    return [{ id: 'all', name: 'All', count: images.length }].concat(perCategory);
  }

  function filterImagesByCategory(images, categoryId) {
    if (categoryId === 'all') return images.slice();
    return images.filter(function (image) { return image.categoryId === categoryId; });
  }

  function buildImagePromptParts(image, category) {
    var paletteNames = image.colors.map(function (c) { return c.name; }).join(', ');
    return {
      subject: image.imagerySubject,
      rest: category.imageryTechnique + ' (STRICT palette: ' + paletteNames + '), ' + category.imageryExclusions
    };
  }

  function buildImagePrompt(image, category) {
    var parts = buildImagePromptParts(image, category);
    return '[SUBJECT: ' + parts.subject + '] ' + parts.rest;
  }

  function buildBrief(image, category) {
    var paletteLines = image.colors.map(function (c) {
      return '- ' + c.name + ' — ' + c.hex;
    }).join('\n');

    return [
      '# Design Brief — ' + category.name + ': ' + image.title,
      '',
      image.descriptor,
      '',
      '## Color Palette',
      paletteLines,
      '',
      '## Typography',
      image.typography,
      '',
      '## Layout & Components',
      image.layoutNotes,
      '',
      '## Imagery Style',
      category.imageryTechnique + '. Depicts subjects like: ' + image.imagerySubject + '.',
      '',
      '## Tone & Vocabulary',
      'Mood: ' + image.mood.join(', '),
      'Vocabulary: ' + category.vocabulary.join(', '),
      '',
      '## Style Summary',
      category.description
    ].join('\n');
  }

  return {
    computeCategoryCounts: computeCategoryCounts,
    filterImagesByCategory: filterImagesByCategory,
    buildImagePromptParts: buildImagePromptParts,
    buildImagePrompt: buildImagePrompt,
    buildBrief: buildBrief
  };
});
```

- [ ] **Step 4: Run the tests and verify they pass**

Run: `node --test tests/content.test.js`
Expected: PASS — 6 tests, 0 failures

- [ ] **Step 5: Commit**

```bash
git add lib/content.js tests/content.test.js
git commit -m "Add pure content-generation logic for prompts, briefs, and filtering"
```

---

### Task 3: `data.js` — real category and image metadata (TDD)

**Files:**
- Create: `data.js`
- Test: `tests/data.test.js`

- [ ] **Step 1: Write the failing test**

Create `tests/data.test.js`:

```js
var test = require('node:test');
var assert = require('node:assert');
var data = require('../data.js');

var HEX_RE = /^#[0-9A-F]{6}$/i;

test('every category has the required non-empty fields', function () {
  data.categories.forEach(function (category) {
    assert.ok(category.id, 'category missing id');
    assert.ok(category.name, 'category missing name');
    assert.ok(category.description, category.id + ' missing description');
    assert.ok(Array.isArray(category.vocabulary) && category.vocabulary.length > 0, category.id + ' missing vocabulary');
    assert.ok(category.imageryTechnique, category.id + ' missing imageryTechnique');
    assert.ok(category.imageryExclusions, category.id + ' missing imageryExclusions');
  });
});

test('every image has the required non-empty fields and a valid categoryId', function () {
  var categoryIds = data.categories.map(function (c) { return c.id; });
  data.images.forEach(function (image) {
    assert.ok(image.id, 'image missing id');
    assert.ok(image.file, image.id + ' missing file');
    assert.ok(categoryIds.indexOf(image.categoryId) !== -1, image.id + ' has unknown categoryId: ' + image.categoryId);
    assert.ok(image.title, image.id + ' missing title');
    assert.ok(image.descriptor, image.id + ' missing descriptor');
    assert.ok(Array.isArray(image.keywords) && image.keywords.length > 0, image.id + ' missing keywords');
    assert.ok(Array.isArray(image.colors) && image.colors.length > 0, image.id + ' missing colors');
    image.colors.forEach(function (color) {
      assert.ok(color.name, image.id + ' has a color with no name');
      assert.ok(HEX_RE.test(color.hex), image.id + ' has invalid hex: ' + color.hex);
    });
    assert.ok(image.typography, image.id + ' missing typography');
    assert.ok(image.layoutNotes, image.id + ' missing layoutNotes');
    assert.ok(image.imagerySubject, image.id + ' missing imagerySubject');
    assert.ok(Array.isArray(image.mood) && image.mood.length > 0, image.id + ' missing mood');
  });
});

test('image ids are unique', function () {
  var ids = data.images.map(function (i) { return i.id; });
  assert.strictEqual(new Set(ids).size, ids.length);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/data.test.js`
Expected: FAIL — `Cannot find module '../data.js'`

- [ ] **Step 3: Write `data.js`**

Colors below were sampled from the actual screenshots with `python3 scripts/extract-colors.py <image>` (dominant chromatic colors, near-white/black/gray filtered out), not guessed.

```js
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.TASTE_DATA = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  return {
    categories: [
      {
        id: 'illustrated-editorial-blocking',
        name: 'Illustrated Editorial Blocking',
        description: 'A friendly, editorial style built from flat, full-bleed color-block sections paired with loose single-line hand-drawn character illustrations. Bold, tightly-tracked grotesk headlines sit against generous whitespace on white sections, with underline or highlighter-style accents used to punch up key words instead of relying on bold weight or color alone. It reads as approachable and human rather than corporate — common on consultancy, agency, and B2B-services sites that want warmth without looking unserious.',
        vocabulary: [
          'flat color-blocking',
          'single-line illustration',
          'watercolor wash background',
          'underline emphasis',
          'geometric grotesk display type',
          'asymmetric zigzag layout',
          'dark pill CTA button',
          'numbered process badge'
        ],
        imageryTechnique: 'loose single-line vector illustration with minimal facial detail, flat watercolor-wash color field behind the figures, no gradients, generous white negative space around the scene',
        imageryExclusions: 'no text, no interface elements, no logos'
      }
    ],
    images: [
      {
        id: 'usman-home',
        file: 'images/Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.png',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — Homepage',
        descriptor: 'Hand-drawn line-art figures set against flat watercolor-wash color blocks — approachable, human, editorial.',
        keywords: [
          'single-line hand-drawn illustration',
          'flat watercolor wash background',
          'full-bleed color-block sections',
          'underline text emphasis',
          'bold geometric grotesk headline',
          'asymmetric zigzag composition',
          'dark pill CTA button',
          'numbered process steps'
        ],
        colors: [
          { name: 'pale cyan wash', hex: '#8DF1F4' },
          { name: 'warm terracotta', hex: '#967359' },
          { name: 'muted mustard-gold wash', hex: '#E9B97D' },
          { name: 'deep rust accent', hex: '#844441' },
          { name: 'pale cream', hex: '#F2E3BA' }
        ],
        typography: 'Bold geometric grotesk display headline (~800 weight) for hero copy, regular-weight body text, small tracked all-caps eyebrow labels ("HI THERE", "THREAD ON").',
        layoutNotes: 'Alternating full-bleed watercolor-wash sections behind illustrations, connected by a hand-drawn dotted line that threads down the page; illustrations placed asymmetrically left/right in a zigzag; dark pill-shaped CTA buttons ("PROVE IT"); wide vertical rhythm with generous whitespace on white sections.',
        imagerySubject: 'two people collaborating at a whiteboard, sketching a diagram',
        mood: ['approachable', 'optimistic', 'human', 'confident']
      },
      {
        id: 'usman-blog',
        file: 'images/Business-Communication-Digital-Strategy-Blog-by-Usman-Group.png',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — Blog Index',
        descriptor: 'Flat 4-up color-block card grid for article previews, with the same hand-drawn illustration style in the hero.',
        keywords: [
          '4-up flat color-block grid',
          'arrow link glyph',
          'category label with underline rule',
          'hand-drawn hero illustration',
          'bold grotesk headline',
          'tab-style content filter'
        ],
        colors: [
          { name: 'muted sage green', hex: '#5E816B' },
          { name: 'warm khaki gold', hex: '#C1AB74' },
          { name: 'pale sage green', hex: '#C8D6AD' },
          { name: 'deep maroon-brown', hex: '#622725' },
          { name: 'bright mint green', hex: '#72F799' }
        ],
        typography: 'Same bold grotesk display type as the homepage for headlines; small tracked all-caps category labels ("ARTICLES") with a short underline rule beneath.',
        layoutNotes: 'Featured article in a two-column hero (text + illustration), followed by a strict 2x2 grid of solid-color article cards where color is the only visual differentiator (no imagery inside cards), each with a simple arrow-glyph link; horizontal tab filter bar above the grid ("ALL / ARTICLES / CASE STUDIES / ESSAYS").',
        imagerySubject: 'a four-piece band playing music together',
        mood: ['organized', 'playful', 'confident']
      },
      {
        id: 'usman-contact',
        file: 'images/Contact-Usman-Group.png',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — Contact',
        descriptor: 'Mad-libs-style conversational form built from underlined fill-in-the-blank fields.',
        keywords: [
          'fill-in-the-blank mad-libs form',
          'underline input field',
          'inline field labels above the line',
          'hand-drawn illustration accent',
          'dark pill CTA button',
          'flat mint watercolor wash'
        ],
        colors: [
          { name: 'bright mint green', hex: '#6BF193' },
          { name: 'medium mint green', hex: '#61DC86' },
          { name: 'pale sand', hex: '#D9CFB1' }
        ],
        typography: 'Bold grotesk display type used for both the headline and the form’s sentence-style copy, so the form itself reads like enlarged headline text; small tracked all-caps micro-labels above each blank ("FIRST NAME", "PROJECT OR GOAL").',
        layoutNotes: 'Form is written as a single flowing sentence ("My name is ___ with ___...") with underlined blanks standing in for input fields, breaking the conventional label-above-input form pattern; hero illustration paired with a flat mint watercolor-wash background.',
        imagerySubject: 'two people talking through paper cups connected by string, seated among potted plants',
        mood: ['conversational', 'warm', 'human']
      },
      {
        id: 'usman-about',
        file: 'images/Web-Consultant-Marketing-Design-Development-Consulting.png',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — About / Team',
        descriptor: 'Team headshot grid and numbered process steps inside a bold coral color-block section.',
        keywords: [
          'headshot grid',
          'numbered process steps',
          'three-column value prop blocks',
          'full-bleed coral section',
          'accordion capability bar',
          'bold grotesk headline'
        ],
        colors: [
          { name: 'bright mint green', hex: '#73F7AE' },
          { name: 'coral red', hex: '#ED4544' },
          { name: 'pale cyan', hex: '#ADEFE9' },
          { name: 'warm sand', hex: '#DBCBAD' },
          { name: 'dusty rose-brown', hex: '#B38E8B' }
        ],
        typography: 'Consistent bold grotesk display type for section headers; small tracked all-caps labels for team roles and section eyebrows.',
        layoutNotes: 'Three-column flat-color value-prop blocks (cyan/coral/mint) under a two-column intro; horizontal accordion-style capability bar (Strategy/Communications/Technology); dense 3x3 headshot grid for the team section, all inside a full-bleed coral background block; numbered circular badges (01/02/03) mark process steps.',
        imagerySubject: 'two people high-fiving in front of a whiteboard and desk',
        mood: ['confident', 'established', 'trustworthy']
      }
    ]
  };
});
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `node --test tests/data.test.js`
Expected: PASS — 3 tests, 0 failures

- [ ] **Step 5: Commit**

```bash
git add data.js tests/data.test.js
git commit -m "Add real category and image metadata for the 4 seed screenshots"
```

---

### Task 4: `index.html` + `styles.css` — static page shell and full styling

**Files:**
- Create: `index.html`
- Create: `styles.css`

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Taste Library</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <div class="app-title">Taste Library — Design Inspiration Gallery</div>

  <div class="filters" id="filters"></div>

  <div class="upload-section">
    <div class="dropzone" id="dropzone">
      Drop screenshots here, or
      <button type="button" id="file-picker-btn">choose files</button>
      <input type="file" id="file-input" accept="image/*" multiple hidden>
    </div>
    <div class="inbox-grid" id="inbox-grid"></div>
  </div>

  <div id="category-sections"></div>

  <div class="modal-overlay" id="modal-overlay" hidden>
    <div class="modal">
      <div class="modal-image"><img id="modal-img" src="" alt=""></div>
      <div class="modal-panel">
        <div class="modal-header-row">
          <h2 class="modal-title" id="modal-title"></h2>
          <span class="modal-badge" id="modal-badge"></span>
        </div>
        <div class="modal-descriptor" id="modal-descriptor"></div>
        <div class="modal-tags" id="modal-tags"></div>
        <div class="recipe-box">
          <div class="recipe-label">IMAGE RECIPE — fill [SUBJECT]</div>
          <div class="recipe-text" id="modal-recipe"></div>
        </div>
        <div class="modal-buttons">
          <button type="button" class="btn" id="copy-brief-btn">Copy Brief</button>
          <button type="button" class="btn" id="copy-prompt-btn">Copy Image Prompt</button>
          <button type="button" class="btn secondary" id="modal-close-btn">Close</button>
        </div>
      </div>
    </div>
  </div>

  <script src="data.js"></script>
  <script src="lib/content.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write `styles.css`**

```css
* { box-sizing: border-box; }

:root {
  --bg: #F2EEE6;
  --ink: #1a1a1a;
  --muted: #888;
  --muted-2: #999;
  --border: #1a1a1a;
  --tag-bg: #E4DDCB;
  --subject-highlight: #F2D98B;
  --recipe-label: #8a8a3a;
  --badge: #b5843a;
}

body {
  margin: 0;
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
  background: var(--bg);
  color: var(--ink);
  padding: 32px 40px 100px;
}

.app-title {
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 24px;
}

.filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 32px; }
.chip {
  border: 1px solid var(--border);
  padding: 8px 14px;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  background: var(--bg);
  font-family: inherit;
}
.chip.active { background: var(--ink); color: var(--bg); }

.upload-section { margin-bottom: 40px; }
.dropzone {
  border: 1px dashed var(--border);
  padding: 20px;
  text-align: center;
  font-size: 13px;
  color: var(--muted);
}
.dropzone.dragover { background: #EDE7D8; }
.dropzone button {
  font-family: inherit;
  border: 1px solid var(--border);
  background: none;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 4px;
}
.inbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.inbox-card { border: 1px solid var(--border); background: #fff; }
.inbox-card img {
  width: 100%; height: 120px; object-fit: cover; object-position: top;
  display: block; border-bottom: 1px solid var(--border);
}
.inbox-card-body { padding: 10px; }
.inbox-badge { font-size: 10px; color: #999; margin-bottom: 8px; display: block; }
.inbox-card-name { font-size: 11px; word-break: break-all; margin-bottom: 8px; }
.inbox-actions { display: flex; gap: 6px; }
.inbox-actions button {
  flex: 1; font-family: inherit; font-size: 10px; border: 1px solid var(--border);
  background: none; padding: 5px; cursor: pointer; text-transform: uppercase;
}

.category-section { margin-bottom: 56px; border-top: 2px solid var(--border); padding-top: 24px; }
.category-heading { display: flex; align-items: baseline; gap: 12px; margin-bottom: 12px; }
.category-heading h2 { font-size: 22px; margin: 0; letter-spacing: -0.5px; }
.category-count { font-size: 12px; color: var(--muted); }
.category-desc { max-width: 720px; font-size: 14px; line-height: 1.6; color: #333; margin-bottom: 16px; }
.vocab-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.vocab-chip {
  font-size: 11px; letter-spacing: 0.5px; border: 1px solid #ccc;
  color: #555; padding: 4px 9px; background: transparent;
}

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
.card { border: 1px solid var(--border); background: #fff; cursor: pointer; transition: transform .15s ease; }
.card:hover { transform: translateY(-3px); }
.card-image { height: 200px; overflow: hidden; border-bottom: 1px solid var(--border); background: #eee; }
.card-image img { width: 100%; display: block; object-fit: cover; object-position: top; }
.card-body { padding: 14px 16px 16px; }
.card-title { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
.card-descriptor { font-size: 11px; color: var(--muted); margin-bottom: 10px; }
.card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
.tag { font-size: 10px; background: var(--tag-bg); color: var(--ink); padding: 4px 8px; border-radius: 2px; }
.card-footer {
  display: flex; justify-content: space-between; font-size: 10px; color: var(--muted-2);
  border-top: 1px dashed #ddd; padding-top: 8px;
}
.card-footer .badge { color: var(--badge); }

.modal-overlay {
  position: fixed; inset: 0; background: rgba(20, 18, 14, 0.75);
  display: flex; align-items: center; justify-content: center; z-index: 50;
}
.modal-overlay[hidden] { display: none; }
.modal {
  background: var(--bg); border: 1px solid var(--border);
  width: min(1080px, 96vw); max-height: 90vh;
  display: grid; grid-template-columns: 1fr 1fr;
}
.modal-image { background: #eee; overflow-y: auto; max-height: 90vh; }
.modal-image img { width: 100%; display: block; }
.modal-panel {
  padding: 28px 32px 26px; border-left: 1px solid var(--border);
  overflow-y: auto; max-height: 90vh; display: flex; flex-direction: column;
}
.modal-header-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 6px; }
.modal-title { font-family: Georgia, 'Times New Roman', serif; font-size: 26px; margin: 0; }
.modal-badge { font-size: 11px; color: var(--badge); white-space: nowrap; }
.modal-descriptor { font-size: 13.5px; color: #666; margin-bottom: 20px; line-height: 1.5; }
.modal-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
.modal-tags .tag { font-size: 12px; padding: 8px 12px; }
.recipe-box { border-top: 1px dashed #bbb; padding-top: 18px; }
.recipe-label { font-size: 11px; color: var(--recipe-label); letter-spacing: 0.3px; margin-bottom: 10px; }
.recipe-text { font-size: 13px; line-height: 1.65; color: var(--ink); }
.recipe-text .subject { background: var(--subject-highlight); padding: 1px 3px; }
.modal-buttons { display: flex; gap: 10px; margin-top: auto; padding-top: 24px; }
.btn {
  border: 1px solid var(--border); background: var(--ink); color: var(--bg);
  font-family: inherit; font-size: 12px; letter-spacing: 0.5px;
  padding: 11px 16px; cursor: pointer; text-transform: uppercase; flex: 1;
}
.btn.secondary { background: transparent; color: var(--ink); flex: 0.6; }
.btn.copied { background: #3a7a4a; border-color: #3a7a4a; }

@media (max-width: 720px) {
  .modal { grid-template-columns: 1fr; }
  .modal-image, .modal-panel { max-height: 45vh; }
}
```

- [ ] **Step 3: Verify the shell loads**

Run: `open index.html`
Expected: page opens with the cream background and "Taste Library — Design Inspiration Gallery" title visible; an empty dashed drop-zone below it; nothing else renders yet (filters/cards/modal wiring come in Task 5) and the browser console shows a 404 for `app.js` — expected, since it doesn't exist until Task 5.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add static page shell and full styling for gallery, upload, and modal"
```

---

### Task 5: `app.js` — filters, category sections, and cards

**Files:**
- Create: `app.js`

- [ ] **Step 1: Write `app.js`**

```js
var activeCategoryId = 'all';

function pad(n) {
  return n < 10 ? '0' + n : String(n);
}

function renderFilters() {
  var container = document.getElementById('filters');
  container.textContent = '';
  var counts = TasteContent.computeCategoryCounts(TASTE_DATA.categories, TASTE_DATA.images);

  counts.forEach(function (entry) {
    var chip = document.createElement('div');
    chip.className = 'chip' + (entry.id === activeCategoryId ? ' active' : '');
    chip.textContent = entry.name.toUpperCase() + '  ' + entry.count;
    chip.addEventListener('click', function () {
      activeCategoryId = entry.id;
      renderFilters();
      renderSections();
    });
    container.appendChild(chip);
  });
}

function renderSections() {
  var container = document.getElementById('category-sections');
  container.textContent = '';

  TASTE_DATA.categories.forEach(function (category) {
    if (activeCategoryId !== 'all' && activeCategoryId !== category.id) return;

    var images = TasteContent.filterImagesByCategory(TASTE_DATA.images, category.id);
    if (images.length === 0) return;

    var section = document.createElement('div');
    section.className = 'category-section';

    var heading = document.createElement('div');
    heading.className = 'category-heading';
    var h2 = document.createElement('h2');
    h2.textContent = category.name;
    heading.appendChild(h2);
    var count = document.createElement('span');
    count.className = 'category-count';
    count.textContent = images.length + ' reference' + (images.length === 1 ? '' : 's');
    heading.appendChild(count);
    section.appendChild(heading);

    var desc = document.createElement('div');
    desc.className = 'category-desc';
    desc.textContent = category.description;
    section.appendChild(desc);

    var vocabRow = document.createElement('div');
    vocabRow.className = 'vocab-row';
    category.vocabulary.forEach(function (term) {
      var chip = document.createElement('span');
      chip.className = 'vocab-chip';
      chip.textContent = term;
      vocabRow.appendChild(chip);
    });
    section.appendChild(vocabRow);

    var grid = document.createElement('div');
    grid.className = 'grid';
    images.forEach(function (image, index) {
      grid.appendChild(createCard(image, category, index, images.length));
    });
    section.appendChild(grid);

    container.appendChild(section);
  });
}

function createCard(image, category, index, total) {
  var card = document.createElement('div');
  card.className = 'card';

  var imageWrap = document.createElement('div');
  imageWrap.className = 'card-image';
  var img = document.createElement('img');
  img.src = image.file;
  img.alt = image.title;
  imageWrap.appendChild(img);
  card.appendChild(imageWrap);

  var body = document.createElement('div');
  body.className = 'card-body';

  var title = document.createElement('div');
  title.className = 'card-title';
  title.textContent = image.title;
  body.appendChild(title);

  var descriptor = document.createElement('div');
  descriptor.className = 'card-descriptor';
  descriptor.textContent = image.descriptor;
  body.appendChild(descriptor);

  var tags = document.createElement('div');
  tags.className = 'card-tags';
  var shown = image.keywords.slice(0, 2);
  var remaining = image.keywords.length - shown.length;
  shown.forEach(function (keyword) {
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = keyword;
    tags.appendChild(tag);
  });
  if (remaining > 0) {
    var more = document.createElement('span');
    more.className = 'tag';
    more.textContent = '+' + remaining;
    tags.appendChild(more);
  }
  body.appendChild(tags);

  var footer = document.createElement('div');
  footer.className = 'card-footer';
  var badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = '◆ ' + category.name;
  footer.appendChild(badge);
  var indexEl = document.createElement('span');
  indexEl.textContent = pad(index + 1) + ' / ' + pad(total);
  footer.appendChild(indexEl);
  body.appendChild(footer);

  card.appendChild(body);
  card.addEventListener('click', function () { openModal(image, category); });
  return card;
}

function init() {
  renderFilters();
  renderSections();
}

document.addEventListener('DOMContentLoaded', init);
```

Note: `createCard` calls `openModal`, which is defined in Task 6. This works because `function openModal(...)` declarations are hoisted, so the reference resolves fine even though `openModal` doesn't exist as a real function until the next task runs — don't try to open the page and click a card until Task 6 is done (it will throw `openModal is not defined` until then).

- [ ] **Step 2: Verify filters and cards render**

Run: `open index.html`
Expected: one active "ALL 4" chip plus one "ILLUSTRATED EDITORIAL BLOCKING 4" chip; below, a single category section with heading, description paragraph, vocabulary chips, and a 4-card grid showing the Usman Group screenshots with titles, descriptors, 2 tags + "+N", a category badge, and an index like `01 / 04`. Clicking the category chip should still show the same 4 cards (only one category exists); clicking a card will error in the console until Task 6 — that's expected.

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "Render category sections and filterable card grid"
```

---

### Task 6: `app.js` — expanded modal view (open/close/populate)

**Files:**
- Modify: `app.js` (append new functions, update `init`)

- [ ] **Step 1: Add modal functions**

Add the following to `app.js`, after the `createCard` function and before `init`:

```js
var currentModalImage = null;
var currentModalCategory = null;

function openModal(image, category) {
  currentModalImage = image;
  currentModalCategory = category;

  document.getElementById('modal-img').src = image.file;
  document.getElementById('modal-img').alt = image.title;
  document.getElementById('modal-title').textContent = image.title;
  document.getElementById('modal-badge').textContent = '◆ ' + category.name;
  document.getElementById('modal-descriptor').textContent = image.descriptor;

  var tagsContainer = document.getElementById('modal-tags');
  tagsContainer.textContent = '';
  image.keywords.forEach(function (keyword) {
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = keyword;
    tagsContainer.appendChild(tag);
  });

  renderRecipe(document.getElementById('modal-recipe'), image, category);

  document.getElementById('modal-overlay').hidden = false;
}

function closeModal() {
  document.getElementById('modal-overlay').hidden = true;
  currentModalImage = null;
  currentModalCategory = null;
}

function renderRecipe(container, image, category) {
  container.textContent = '';
  var parts = TasteContent.buildImagePromptParts(image, category);

  var subjectSpan = document.createElement('span');
  subjectSpan.className = 'subject';
  subjectSpan.textContent = '[SUBJECT: ' + parts.subject + ']';
  container.appendChild(subjectSpan);

  container.appendChild(document.createTextNode(' ' + parts.rest));
}

function setupModalHandlers() {
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);

  document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target.id === 'modal-overlay') closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}
```

- [ ] **Step 2: Update `init` to wire the modal handlers**

Replace the `init` function in `app.js` with:

```js
function init() {
  renderFilters();
  renderSections();
  setupModalHandlers();
}
```

- [ ] **Step 3: Verify**

Run: `open index.html`
Expected: clicking any card opens the modal — screenshot fills the left half (scroll within it if the capture is tall), right panel shows the serif title, category badge, descriptor, full untruncated keyword tags, and the recipe box with `[SUBJECT: ...]` highlighted in yellow followed by the rest of the recipe text. Close button, clicking the dark overlay outside the modal, and pressing Escape all close it.

- [ ] **Step 4: Commit**

```bash
git add app.js
git commit -m "Add expanded modal view with image recipe display"
```

---

### Task 7: `app.js` — Copy Brief / Copy Image Prompt buttons

**Files:**
- Modify: `app.js` (append new functions, update `init`)

- [ ] **Step 1: Add clipboard + button wiring functions**

Add the following to `app.js`, after `setupModalHandlers` and before `init`:

```js
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  return Promise.resolve();
}

function wireCopyButton(button, getText) {
  button.addEventListener('click', function () {
    if (!currentModalImage || !currentModalCategory) return;
    copyToClipboard(getText()).then(function () {
      var original = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('copied');
      setTimeout(function () {
        button.textContent = original;
        button.classList.remove('copied');
      }, 1200);
    });
  });
}

function setupCopyButtons() {
  wireCopyButton(document.getElementById('copy-prompt-btn'), function () {
    return TasteContent.buildImagePrompt(currentModalImage, currentModalCategory);
  });
  wireCopyButton(document.getElementById('copy-brief-btn'), function () {
    return TasteContent.buildBrief(currentModalImage, currentModalCategory);
  });
}
```

- [ ] **Step 2: Update `init`**

```js
function init() {
  renderFilters();
  renderSections();
  setupModalHandlers();
  setupCopyButtons();
}
```

- [ ] **Step 3: Verify**

Run: `open index.html`
Expected: open a card's modal, click "Copy Image Prompt" — button briefly reads "Copied!"; paste into any text field and confirm it matches the recipe box text exactly (the `[SUBJECT: ...]` clause plus the rest of the recipe, no markdown). Click "Copy Brief" — button briefly reads "Copied!"; paste and confirm it's the multi-section Markdown brief (`# Design Brief`, `## Color Palette` with named + hex colors, `## Typography`, `## Layout & Components`, `## Imagery Style`, `## Tone & Vocabulary`, `## Style Summary`).

- [ ] **Step 4: Commit**

```bash
git add app.js
git commit -m "Wire Copy Brief and Copy Image Prompt buttons to clipboard"
```

---

### Task 8: `app.js` — Upload / Inbox

**Files:**
- Modify: `app.js` (append new functions, update `init`)

- [ ] **Step 1: Add inbox functions**

Add the following to `app.js`, after `setupCopyButtons` and before `init`:

```js
var inboxImages = [];
var inboxIdCounter = 0;

function addFilesToInbox(fileList) {
  Array.prototype.forEach.call(fileList, function (file) {
    if (!file.type || file.type.indexOf('image/') !== 0) return;
    inboxIdCounter += 1;
    inboxImages.push({
      id: 'inbox-' + inboxIdCounter,
      file: file,
      name: file.name,
      previewUrl: URL.createObjectURL(file)
    });
  });
  renderInbox();
}

function removeFromInbox(id) {
  var index = -1;
  inboxImages.forEach(function (item, i) { if (item.id === id) index = i; });
  if (index === -1) return;
  URL.revokeObjectURL(inboxImages[index].previewUrl);
  inboxImages.splice(index, 1);
  renderInbox();
}

function downloadInboxItem(id) {
  var item = null;
  inboxImages.forEach(function (i) { if (i.id === id) item = i; });
  if (!item) return;
  var link = document.createElement('a');
  link.href = item.previewUrl;
  link.download = item.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function renderInbox() {
  var grid = document.getElementById('inbox-grid');
  grid.textContent = '';
  inboxImages.forEach(function (item) {
    var card = document.createElement('div');
    card.className = 'inbox-card';

    var img = document.createElement('img');
    img.src = item.previewUrl;
    img.alt = item.name;
    card.appendChild(img);

    var body = document.createElement('div');
    body.className = 'inbox-card-body';

    var badge = document.createElement('span');
    badge.className = 'inbox-badge';
    badge.textContent = '◇ Uncategorized';
    body.appendChild(badge);

    var name = document.createElement('div');
    name.className = 'inbox-card-name';
    name.textContent = item.name;
    body.appendChild(name);

    var actions = document.createElement('div');
    actions.className = 'inbox-actions';

    var downloadBtn = document.createElement('button');
    downloadBtn.type = 'button';
    downloadBtn.textContent = 'Download';
    downloadBtn.addEventListener('click', function () { downloadInboxItem(item.id); });
    actions.appendChild(downloadBtn);

    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () { removeFromInbox(item.id); });
    actions.appendChild(removeBtn);

    body.appendChild(actions);
    card.appendChild(body);
    grid.appendChild(card);
  });
}

function setupDropzone() {
  var dropzone = document.getElementById('dropzone');
  var fileInput = document.getElementById('file-input');
  var pickerBtn = document.getElementById('file-picker-btn');

  pickerBtn.addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', function (e) {
    addFilesToInbox(e.target.files);
    fileInput.value = '';
  });

  dropzone.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', function () {
    dropzone.classList.remove('dragover');
  });
  dropzone.addEventListener('drop', function (e) {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    addFilesToInbox(e.dataTransfer.files);
  });
}
```

- [ ] **Step 2: Update `init`**

```js
function init() {
  renderFilters();
  renderSections();
  setupModalHandlers();
  setupCopyButtons();
  setupDropzone();
}
```

- [ ] **Step 3: Verify**

Run: `open index.html`
Expected: clicking "choose files" opens a file picker; selecting one or more images adds them to the Inbox grid below the dropzone as bare cards (image, "◇ Uncategorized" badge, filename, Download + Remove buttons) — no keywords or copy buttons on these. Dragging an image file over the dropzone highlights it; dropping adds it the same way. "Download" saves the real file to your Downloads folder. "Remove" deletes the card. Refreshing the page clears the Inbox (in-memory only, as designed).

- [ ] **Step 4: Commit**

```bash
git add app.js
git commit -m "Add upload dropzone and in-memory Inbox staging area"
```

---

### Task 9: `README.md` — content workflow documentation

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write `README.md`**

```markdown
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
   `python3 scripts/extract-colors.py <path-to-image>`, assigns the
   screenshot to an existing category or proposes a new one, and writes the
   entry into `data.js` (title, descriptor, keywords, colors, typography,
   layoutNotes, imagerySubject, mood).
4. Remove the now-processed file(s) from the in-app Inbox.

Categories are emergent — there's no fixed taxonomy. Claude either matches
a new screenshot to an existing category or proposes a new one.

## Tests

Pure logic (prompt/brief generation, filtering, counts) has automated tests:

    node --test tests/

Everything else (rendering, modal, upload) is verified manually in a
browser — there's no DOM-testing dependency, to keep the app itself at zero
external dependencies.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "Document the content workflow for adding new screenshots"
```

---

### Task 10: Final manual QA pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full automated test suite**

Run: `node --test tests/`
Expected: PASS — 9 tests total (6 in `content.test.js`, 3 in `data.test.js`), 0 failures

- [ ] **Step 2: Full manual walkthrough**

Run: `open index.html` and check each of the following:

- [ ] Filter chips show "ALL 4" and "ILLUSTRATED EDITORIAL BLOCKING 4"; clicking each toggles the active chip style and both show the same 4 cards
- [ ] Category section shows heading, description, and vocabulary chips above the grid
- [ ] Each of the 4 cards shows the correct screenshot (cropped to the top), title, descriptor, 2 tags + overflow count, category badge, and index (`01 / 04` through `04 / 04`)
- [ ] Clicking a card opens the modal; screenshot and info panel are side by side; the screenshot column scrolls independently for the tall captures
- [ ] Modal shows serif title, category badge, descriptor, full keyword list, and the recipe box with `[SUBJECT: ...]` highlighted
- [ ] Close button, clicking outside the modal, and Escape all close it
- [ ] "Copy Image Prompt" copies the recipe text exactly; "Copy Brief" copies the full structured brief; both show "Copied!" feedback
- [ ] Uploading a file via "choose files" and via drag-and-drop both add it to the Inbox with an "Uncategorized" badge
- [ ] Inbox item's "Download" saves the real file; "Remove" deletes the card
- [ ] Refreshing the page clears the Inbox but not the main gallery

- [ ] **Step 3: Fix anything that doesn't match, then final commit**

```bash
git add -A
git status
```

Review the diff before committing if Step 2 required any fixes; otherwise no commit is needed for this task.
