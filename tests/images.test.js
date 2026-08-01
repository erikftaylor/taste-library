var test = require('node:test');
var assert = require('node:assert');
var fs = require('node:fs');
var path = require('node:path');
var data = require('../data.js');

test('every image has an existing, non-empty original, thumb, and display file on disk', function () {
  data.images.forEach(function (image) {
    ['file', 'thumb', 'display'].forEach(function (field) {
      var fullPath = path.join(__dirname, '..', image[field]);
      assert.ok(fs.existsSync(fullPath), image.id + ' missing ' + field + ' file: ' + image[field]);
      assert.ok(fs.statSync(fullPath).size > 0, image.id + "'s " + field + ' file is empty: ' + image[field]);
    });
  });
});
