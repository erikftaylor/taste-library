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
      wireframe: ['┌─ 1 ── 12 ─┐', '│  HERO     │']
    },
    image: {
      title: 'Usman Group — Homepage',
      descriptor: 'Hand-drawn figures on color blocks.',
      colors: [{ name: 'mustard-gold wash', hex: '#E9B97D', usage: 'section background' }],
      typography: 'Bold geometric grotesk display type.',
      layoutNotes: 'Alternating full-bleed color-block sections.',
      imagerySubject: 'two people at a whiteboard',
      mood: ['approachable', 'confident'],
      signature: ['A hand-drawn thread connects every section down the full page height']
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
    '## 8. Vocabulary and mood'
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
  assert.ok(brief.includes('Exclusions: no text, no logos.'));
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
