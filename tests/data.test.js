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
    assert.ok(image.thumb, image.id + ' missing thumb');
    assert.ok(image.display, image.id + ' missing display');
    assert.ok(categoryIds.indexOf(image.categoryId) !== -1, image.id + ' has unknown categoryId: ' + image.categoryId);
    assert.ok(image.title, image.id + ' missing title');
    assert.ok(image.descriptor, image.id + ' missing descriptor');
    assert.ok(Array.isArray(image.keywords) && image.keywords.length > 0, image.id + ' missing keywords');
    assert.ok(Array.isArray(image.colors) && image.colors.length > 0, image.id + ' missing colors');
    image.colors.forEach(function (color) {
      assert.ok(color.name, image.id + ' has a color with no name');
      assert.ok(HEX_RE.test(color.hex), image.id + ' has invalid hex: ' + color.hex);
      assert.ok(color.usage, image.id + ' has a color with no usage role: ' + color.hex);
    });
    var sig = image.signature;
    assert.ok(sig && Array.isArray(sig.carry) && sig.carry.length >= 3, image.id + ' needs at least 3 Carry signature bullets');
    assert.ok(Array.isArray(sig.rewrite) && sig.rewrite.length >= 1, image.id + ' needs at least 1 Rewrite item — even if only the reference\'s proper nouns');
    sig.carry.forEach(function (line) {
      assert.ok(line.indexOf('"') === -1 && line.indexOf('“') === -1,
        image.id + ' Carry bullet quotes literal copy — move the words to Rewrite: ' + line);
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

test('every category carries a proportional system and a wireframe', function () {
  data.categories.forEach(function (category) {
    var s = category.system;
    assert.ok(s, category.id + ' missing system');
    assert.ok(typeof s.baseUnit === 'number' && s.baseUnit > 0, category.id + ' has an invalid baseUnit');
    assert.ok(s.canvas && s.grid && s.rhythm, category.id + ' missing canvas/grid/rhythm');
    assert.ok(Array.isArray(s.typeScale) && s.typeScale.length >= 3, category.id + ' needs at least 3 type roles');
    assert.ok(Array.isArray(s.components) && s.components.length >= 4, category.id + ' needs at least 4 components');
    assert.ok(Array.isArray(category.wireframe) && category.wireframe.length > 5, category.id + ' missing wireframe');
  });
});

test('no two images in a category share a signature bullet', function () {
  var byCategory = {};
  data.images.forEach(function (image) {
    byCategory[image.categoryId] = byCategory[image.categoryId] || [];
    image.signature.carry.concat(image.signature.rewrite).forEach(function (line) {
      var hit = byCategory[image.categoryId].filter(function (e) { return e.line === line; })[0];
      assert.ok(!hit, image.id + ' repeats a signature bullet from ' + (hit && hit.id) + ': ' + line);
      byCategory[image.categoryId].push({ id: image.id, line: line });
    });
  });
});

test('every category carries the typeface, register, motion, states and adaptation layers', function () {
  data.categories.forEach(function (category) {
    var f = category.fonts;
    assert.ok(f && Array.isArray(f.roles) && f.roles.length >= 1, category.id + ' missing fonts.roles');
    f.roles.forEach(function (row) {
      assert.ok(row[0] && row[1], category.id + ' has a fonts role without a scope or faces');
    });
    assert.ok(f.never, category.id + ' missing fonts.never — the never-list is mandatory');

    assert.ok(Array.isArray(category.copyRegister) && category.copyRegister.length >= 2,
      category.id + ' needs at least 2 copy-register rules');
    assert.ok(Array.isArray(category.motion) && category.motion.length >= 2,
      category.id + ' needs a motion spec — state "not observed" and prescribe the default rather than omitting it');
    assert.ok(Array.isArray(category.states) && category.states.length >= 2,
      category.id + ' needs hover/focus/active states for its interactive components');
    category.states.forEach(function (row) {
      assert.ok(row[0] && row[1], category.id + ' has a states row without a component or spec');
    });

    var a = category.adaptation;
    assert.ok(a && a.yields && a.register, category.id + ' missing adaptation.yields or adaptation.register');
    assert.ok(Array.isArray(a.locked) && a.locked.length >= 2 && a.locked.length <= 4,
      category.id + ' adaptation.locked must name the 2–4 devices that ARE the style');
  });
});
