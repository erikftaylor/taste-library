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
