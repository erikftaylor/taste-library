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
