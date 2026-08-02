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
    assert.ok(Array.isArray(image.signature) && image.signature.length >= 3, image.id + ' needs at least 3 signature bullets');
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
    image.signature.forEach(function (line) {
      var hit = byCategory[image.categoryId].filter(function (e) { return e.line === line; })[0];
      assert.ok(!hit, image.id + ' repeats a signature bullet from ' + (hit && hit.id) + ': ' + line);
      byCategory[image.categoryId].push({ id: image.id, line: line });
    });
  });
});
