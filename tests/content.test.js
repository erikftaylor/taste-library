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

function briefFixture() {
  return {
    category: {
      name: 'Illustrated Editorial Blocking',
      imageryTechnique: 'flat illustration',
      imageryExclusions: 'no text, no logos',
      vocabulary: ['flat color-blocking', 'underline emphasis'],
      description: 'A friendly, editorial style.',
      system: {
        baseUnit: 8,
        canvas: '1440 × 900 desktop',
        grid: '12 columns, 24px gutter',
        rhythm: 'section 12u · block 6u',
        typeScale: [['Display', 'grotesk, 700', '7u', 1.05]],
        components: [['Pill CTA', '6u tall, 2.5u × 6u padding']]
      },
      wireframe: ['┌─ 1 ── 12 ─┐', '│  HERO     │'],
      fonts: {
        roles: [['Display & body', 'Archivo, Space Grotesk or similar']],
        never: 'Inter, Roboto, Arial or system-ui as a display face'
      },
      copyRegister: ['CTA labels: imperative, 1–3 words, all-caps'],
      states: [['Pill CTA', 'hover: fill lightens to #333333; focus-visible: 2px outline; active: translateY(1px)']],
      motion: ['No motion was observed — static reference. Default: static; if animating, transform and opacity only.'],
      adaptation: {
        yields: 'Palette hexes may re-derive if the role structure holds: one ground, one ink, one accent.',
        locked: ['The hand-drawn thread', 'Torn-edge washes'],
        register: 'approachable and zine-like — wrong for firms selling rigor or audit.'
      }
    },
    image: {
      title: 'Usman Group — Homepage',
      descriptor: 'Hand-drawn figures on color blocks.',
      colors: [{ name: 'mustard-gold wash', hex: '#E9B97D', usage: 'section background' }],
      typography: 'Bold geometric grotesk display type.',
      layoutNotes: 'Alternating full-bleed color-block sections.',
      imagerySubject: 'two people at a whiteboard',
      mood: ['approachable', 'confident'],
      signature: {
        carry: ['A hand-drawn thread connects every section down the full page height'],
        rewrite: ['CTA copy — write new 1–3-word all-caps imperatives for the target']
      }
    }
  };
}

test('buildBrief emits the layered sections in fidelity order', function () {
  var f = briefFixture();
  var brief = TasteContent.buildBrief(f.image, f.category);

  var order = [
    '## How to read this brief',
    '## 1. The style in one paragraph',
    '## 1b. What this reference does',
    '## 2. Proportional system',
    '## 3. Resolved values',
    '## 4. Layout wireframe',
    '## 5. Palette — locked',
    '## 6. Typography and layout notes as observed',
    '## 7. Imagery — and what to exclude',
    '## 8. Vocabulary and mood',
    '## 9. Copy register',
    '## 10. Interaction states',
    '## 11. Motion',
    '## 12. Adapting to an existing brand'
  ];
  var lastIndex = -1;
  order.forEach(function (heading) {
    var idx = brief.indexOf(heading);
    assert.ok(idx > lastIndex, heading + ' missing or out of order');
    lastIndex = idx;
  });

  assert.ok(brief.includes('| mustard-gold wash | `#E9B97D` | section background |'));
  assert.ok(brief.includes('Bold geometric grotesk display type.'));
  assert.ok(brief.includes('Mood: approachable, confident.'));
  assert.ok(brief.includes('Vocabulary: flat color-blocking, underline emphasis.'));
  assert.ok(brief.includes('Exclusions (locked): no text, no logos.'));
});

test('buildBrief splits §1b into labelled Carry and Rewrite lists', function () {
  var f = briefFixture();
  var brief = TasteContent.buildBrief(f.image, f.category);
  var section = brief.slice(brief.indexOf('## 1b.'), brief.indexOf('## 2.'));

  var carryIdx = section.indexOf('**Carry (devices)**');
  var rewriteIdx = section.indexOf('**Rewrite (content)**');
  assert.ok(carryIdx > -1 && rewriteIdx > carryIdx, 'Carry must precede Rewrite');
  assert.ok(section.indexOf('- A hand-drawn thread connects every section') > carryIdx);
  assert.ok(section.indexOf('- CTA copy — write new 1–3-word all-caps imperatives') > rewriteIdx);
});

test('buildBrief states an explicit None when the rewrite list is empty', function () {
  var f = briefFixture();
  f.image.signature.rewrite = [];
  var brief = TasteContent.buildBrief(f.image, f.category);
  assert.ok(brief.includes('- None — no literal copy from this reference is part of the style.'));
});

test('buildBrief names typefaces with a never-list inside §2', function () {
  var f = briefFixture();
  var brief = TasteContent.buildBrief(f.image, f.category);
  var section2 = brief.slice(brief.indexOf('## 2.'), brief.indexOf('## 3.'));
  assert.ok(section2.includes('- **Display & body** — Archivo, Space Grotesk or similar'));
  assert.ok(section2.includes('Never: Inter, Roboto, Arial or system-ui as a display face.'));
});

test('buildBrief emits copy register, states, motion and adaptation from the category', function () {
  var f = briefFixture();
  var brief = TasteContent.buildBrief(f.image, f.category);
  assert.ok(brief.includes('- CTA labels: imperative, 1–3 words, all-caps'));
  assert.ok(brief.includes('- **Pill CTA** — hover: fill lightens to #333333'));
  assert.ok(brief.includes('No motion was observed — static reference.'));
  assert.ok(brief.includes('**Layers that yield.** Palette hexes may re-derive if the role structure holds'));
  assert.ok(brief.includes('- The hand-drawn thread'));
  assert.ok(brief.includes('**Register and contraindications.** Approachable and zine-like'));
  assert.ok(brief.includes('Read the mood as a compatibility claim, not decoration: approachable and zine-like'));
});

test('buildBrief prescribes explicit defaults for states and motion when a category lacks them', function () {
  var f = briefFixture();
  delete f.category.states;
  delete f.category.motion;
  var brief = TasteContent.buildBrief(f.image, f.category);
  assert.ok(brief.includes('## 10. Interaction states'));
  assert.ok(brief.includes('States were not separately specified for this family. Default for every interactive element:'));
  assert.ok(brief.includes('## 11. Motion'));
  assert.ok(brief.includes('No motion was observed — the reference is a static capture. Default: static.'));
});

test('buildGroundSafety classifies grounds by their best palette pairing', function () {
  var safe = TasteContent.buildGroundSafety({
    colors: [
      { name: 'Paper', hex: '#FFFFFF', usage: 'page ground' },
      { name: 'Ink', hex: '#111111', usage: 'body copy' },
      { name: 'Teal band', hex: '#4D8593', usage: 'hero band' }
    ]
  });
  // Paper carries ink at 18.9:1; the teal band still reaches 4.6:1 against ink.
  assert.deepStrictEqual(safe.safe, ['Paper', 'Teal band']);
  assert.deepStrictEqual(safe.large, []);

  var large = TasteContent.buildGroundSafety({
    colors: [
      { name: 'Off-white', hex: '#F5F5F5', usage: 'page ground' },
      { name: 'Teal', hex: '#4D8593', usage: 'pill CTA fill' }
    ]
  });
  // Best pairing is 3.8:1 — large text only, in both directions.
  assert.deepStrictEqual(large.large, ['Off-white', 'Teal']);

  var deco = TasteContent.buildGroundSafety({
    colors: [
      { name: 'White', hex: '#FFFFFF', usage: 'page ground' },
      { name: 'Pale wash', hex: '#E8E8E8', usage: 'watercolour field' }
    ]
  });
  assert.deepStrictEqual(deco.decorative, ['White', 'Pale wash']);
});

test('the brief carries the ground-safety line inside section 5', function () {
  var f = briefFixture();
  f.image.colors = [
    { name: 'Ink', hex: '#111111', usage: 'body copy' },
    { name: 'Paper', hex: '#FFFFFF', usage: 'page ground' }
  ];
  var brief = TasteContent.buildBrief(f.image, f.category);
  var section5 = brief.slice(brief.indexOf('## 5.'), brief.indexOf('## 6.'));
  assert.ok(section5.includes('text-safe for body copy — Paper. Palette roles not named here are marks or accents, not grounds.'));
});

test('buildBrief keeps §2 in base units and resolves the same values to px in §3', function () {
  var f = briefFixture();
  var brief = TasteContent.buildBrief(f.image, f.category);
  var proportional = brief.slice(brief.indexOf('## 2.'), brief.indexOf('## 3.'));
  var resolved = brief.slice(brief.indexOf('## 3.'), brief.indexOf('## 4.'));

  assert.ok(proportional.includes('| Display | grotesk, 700 | 7u | 1.05 |'));
  assert.ok(proportional.includes('6u tall, 2.5u × 6u padding'));

  assert.ok(resolved.includes('| Display | 56px | 1.05 |'));
  assert.ok(resolved.includes('48px tall, 20px × 48px padding'));
  assert.ok(!/\d+u\b/.test(resolved), '§3 must not leave unresolved base units');
});

test('buildBrief degrades to the descriptive layers when no system or wireframe exists', function () {
  var f = briefFixture();
  delete f.category.system;
  delete f.category.wireframe;
  var brief = TasteContent.buildBrief(f.image, f.category);

  assert.ok(!brief.includes('## 2. Proportional system'));
  assert.ok(!brief.includes('## 4. Layout wireframe'));
  assert.ok(brief.includes('## 5. Palette — locked'));
  assert.ok(brief.includes('## 8. Vocabulary and mood'));
});

test('buildBrief places the signature above the fidelity split so every reader sees it', function () {
  var f = briefFixture();
  var brief = TasteContent.buildBrief(f.image, f.category);

  assert.ok(brief.includes('- A hand-drawn thread connects every section down the full page height'));
  assert.ok(brief.indexOf('## 1b.') < brief.indexOf('## 2.'), 'signature must precede the proportional system');
  assert.ok(brief.indexOf('## 1b.') < brief.indexOf('## 3.'), 'signature must precede the resolved values');
});

test('buildBrief omits the signature section when an image has none', function () {
  var f = briefFixture();
  delete f.image.signature;
  var brief = TasteContent.buildBrief(f.image, f.category);

  assert.ok(!brief.includes('## 1b.'));
  assert.ok(brief.includes('## 1. The style in one paragraph'));
  assert.ok(brief.includes('## 2. Proportional system'));
});

test('buildBrief prefers a per-image system override over the category default', function () {
  var f = briefFixture();
  f.image.system = {
    baseUnit: 4,
    canvas: '390 × 844 mobile',
    grid: '4 columns, 16px gutter',
    rhythm: 'section 8u',
    typeScale: [['Display', 'grotesk, 700', '7u', 1.05]],
    components: [['Pill CTA', '6u tall']]
  };
  var brief = TasteContent.buildBrief(f.image, f.category);

  assert.ok(brief.includes('Base unit (1u): 4px'));
  assert.ok(brief.includes('| Display | 28px | 1.05 |'));
  assert.ok(!brief.includes('1440 × 900 desktop'));
});

test('contrastRatio matches the WCAG reference values', function () {
  assert.strictEqual(Math.round(TasteContent.contrastRatio('#FFFFFF', '#000000') * 10) / 10, 21);
  assert.strictEqual(Math.round(TasteContent.contrastRatio('#000000', '#FFFFFF') * 10) / 10, 21);
  assert.strictEqual(Math.round(TasteContent.contrastRatio('#777777', '#FFFFFF') * 10) / 10, 4.5);
  assert.strictEqual(TasteContent.contrastRatio('#ABCDEF', '#ABCDEF'), 1);
});

test('wcagLevel bands on the standard thresholds', function () {
  assert.strictEqual(TasteContent.wcagLevel(21), 'AAA');
  assert.strictEqual(TasteContent.wcagLevel(7), 'AAA');
  assert.strictEqual(TasteContent.wcagLevel(4.5), 'AA');
  assert.strictEqual(TasteContent.wcagLevel(3), 'AA large');
  assert.strictEqual(TasteContent.wcagLevel(2.9), 'fail');
});

test('buildContrastPairs pairs across the whole palette, not only keyword-classified colours', function () {
  // Regression: a palette whose light colour is described as a "centred content
  // column" matches neither the ground nor the mark vocabulary. Classifying first
  // dropped the 11:1 pairing and made the palette look like it failed AA.
  var image = {
    colors: [
      { name: 'White', hex: '#FFFFFF', usage: 'centred content column' },
      { name: 'Slate navy', hex: '#36364E', usage: 'page frame, overlapping cards, footer' },
      { name: 'Teal', hex: '#078593', usage: 'outlined and solid pill CTAs, links' }
    ]
  };
  var pairs = TasteContent.buildContrastPairs(image);
  var top = pairs[0];
  assert.strictEqual(top.mark.name, 'White');
  assert.strictEqual(top.ground.name, 'Slate navy');
  assert.ok(top.ratio > 10, 'expected the white/navy pair, got ' + top.ratio);
  assert.strictEqual(top.level, 'AAA');
  assert.ok(pairs.every(function (p) { return p.level !== 'fail'; }));
  for (var i = 1; i < pairs.length; i += 1) {
    assert.ok(pairs[i - 1].ratio >= pairs[i].ratio, 'pairs must be ranked by ratio');
  }
});

test('buildContrastPairs orients a pair only when the usage strings justify it', function () {
  var oriented = TasteContent.buildContrastPairs({
    colors: [
      { name: 'Ink', hex: '#111111', usage: 'body copy and headlines' },
      { name: 'Paper', hex: '#FFFFFF', usage: 'page ground' }
    ]
  })[0];
  assert.strictEqual(oriented.oriented, true);
  assert.strictEqual(oriented.mark.name, 'Ink');
  assert.strictEqual(oriented.ground.name, 'Paper');

  var ambiguous = TasteContent.buildContrastPairs({
    colors: [
      { name: 'One', hex: '#111111', usage: 'used somewhere' },
      { name: 'Two', hex: '#FFFFFF', usage: 'used elsewhere' }
    ]
  })[0];
  assert.strictEqual(ambiguous.oriented, false);
});

test('contrastWarning fires only when no pair reaches AA', function () {
  var weak = TasteContent.buildContrastPairs({
    colors: [
      { name: 'Teal', hex: '#4D8593', usage: 'headings' },
      { name: 'Off-white', hex: '#F5F5F5', usage: 'page ground' }
    ]
  });
  assert.ok(TasteContent.contrastWarning(weak), 'a 4.1:1 palette should warn');
  var strong = TasteContent.buildContrastPairs({
    colors: [
      { name: 'Ink', hex: '#111111', usage: 'headings' },
      { name: 'Paper', hex: '#FFFFFF', usage: 'page ground' }
    ]
  });
  assert.strictEqual(TasteContent.contrastWarning(strong), null);
});

test('the brief carries a contrast table inside section 5', function () {
  var f = briefFixture();
  f.image.colors = [
    { name: 'Ink', hex: '#111111', usage: 'body copy' },
    { name: 'Paper', hex: '#FFFFFF', usage: 'page ground' }
  ];
  var brief = TasteContent.buildBrief(f.image, f.category);
  var section5 = brief.slice(brief.indexOf('## 5.'), brief.indexOf('## 6.'));
  assert.ok(section5.indexOf('Measured contrast') > -1);
  assert.ok(/\| Ink \| Paper \| 18\.9:1 \| AAA \|/.test(section5), section5);
});

test('token exports are well formed and carry the palette', function () {
  var f = briefFixture();
  var css = TasteContent.buildCssTokens(f.image, f.category);
  assert.ok(css.indexOf(':root {') > -1);
  assert.ok(css.indexOf('--mustard-gold-wash: #E9B97D;') > -1, css);
  assert.ok(css.indexOf('--base-unit: 8px;') > -1);

  var tw = TasteContent.buildTailwindTokens(f.image, f.category);
  assert.ok(tw.indexOf('module.exports') > -1);
  assert.ok(tw.indexOf("'mustard-gold-wash': '#E9B97D',") > -1, tw);

  var json = JSON.parse(TasteContent.buildJsonTokens(f.image, f.category));
  assert.strictEqual(json.reference, f.image.title);
  assert.strictEqual(json.palette[0].hex, '#E9B97D');
  assert.strictEqual(json.palette[0].role, 'section background');
  assert.ok(Array.isArray(json.contrast));
  assert.ok(Array.isArray(json.signature.carry) && Array.isArray(json.signature.rewrite));
  assert.ok(json.adaptation && json.adaptation.register, 'json tokens must carry the adaptation layer');
});

test('css token names stay unique when two colours share a name', function () {
  var f = briefFixture();
  f.image.colors = [
    { name: 'Blue', hex: '#0000FF', usage: 'page ground' },
    { name: 'Blue', hex: '#000088', usage: 'body copy' }
  ];
  var css = TasteContent.buildCssTokens(f.image, f.category);
  assert.ok(css.indexOf('--blue: #0000FF;') > -1, css);
  assert.ok(css.indexOf('--blue-2: #000088;') > -1, css);
});
