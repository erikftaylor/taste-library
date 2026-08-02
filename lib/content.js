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

  function resolveUnits(value, baseUnit) {
    return String(value).replace(/([\d.]+)u\b/g, function (_, n) {
      return Math.round(parseFloat(n) * baseUnit) + 'px';
    });
  }

  function buildBrief(image, category) {
    var system = (image.system || category.system) || null;
    var wireframe = image.wireframe || category.wireframe || null;
    var lines = [];

    function push() {
      lines.push.apply(lines, Array.prototype.slice.call(arguments));
    }

    push(
      '# ' + image.title + ' — style brief',
      '',
      'Style family: ' + category.name + '. ' + image.descriptor,
      '',
      '## How to read this brief',
      '',
      '- **Recreating this design faithfully** — follow §3, §4 and §5 as written.',
      '- **Generating variations on the style** — follow §1, §2, §5 and §7; re-derive §3 from the ratios in §2 at whatever canvas you are working in.',
      '- **Feeding a design tool** (Figma Make, Claude Design, Impeccable) — paste the whole thing; §3 and §4 are the machine-readable layers.',
      '- **Brainstorming** — §1, §1b and §8 alone are enough; ignore the rest.',
      '',
      'Everything in §3 is *one valid resolution* of §2, not a constraint. §5 and §7 are fixed at every fidelity level — palette and exclusions are what make it this style rather than a different one.',
      '',
      'Where layers disagree, §6 wins: §2 and §3 describe the style family, §6 is what this specific reference actually does.',
      '',
      '## 1. The style in one paragraph',
      '',
      category.description,
      ''
    );

    if (image.signature && image.signature.length) {
      push('## 1b. What this reference does that the style family does not', '');
      image.signature.forEach(function (line) {
        push('- ' + line);
      });
      push(
        '',
        'These are specific to this reference. Carry them at every fidelity level — they are what distinguishes it from the other references in the same family.',
        ''
      );
    }

    if (system) {
      push(
        '## 2. Proportional system — vary against this',
        '',
        '- Base unit (1u): ' + system.baseUnit + 'px',
        '- Reference canvas: ' + system.canvas,
        '- Grid: ' + system.grid,
        '- Vertical rhythm: ' + system.rhythm,
        '',
        'Type scale, in base units:',
        '',
        '| Role | Treatment | Size | Line-height |',
        '| --- | --- | --- | --- |'
      );
      system.typeScale.forEach(function (row) {
        push('| ' + row[0] + ' | ' + row[1] + ' | ' + row[2] + ' | ' + row[3] + ' |');
      });
      push(
        '',
        'Components, in base units:',
        ''
      );
      system.components.forEach(function (row) {
        push('- **' + row[0] + '** — ' + row[1]);
      });
      push(
        '',
        'To rescale: pick a new base unit, multiply every `u` value by it, keep the ratios and the column spans.',
        '',
        '## 3. Resolved values at ' + system.canvas + ' (derived — override freely when varying)',
        '',
        '| Role | Size | Line-height |',
        '| --- | --- | --- |'
      );
      system.typeScale.forEach(function (row) {
        push('| ' + row[0] + ' | ' + resolveUnits(row[2], system.baseUnit) + ' | ' + row[3] + ' |');
      });
      push('');
      system.components.forEach(function (row) {
        push('- **' + row[0] + '** — ' + resolveUnits(row[1], system.baseUnit));
      });
      push('');
    }

    if (wireframe) {
      push(
        '## 4. Layout wireframe',
        '',
        '```',
        wireframe.join('\n'),
        '```',
        ''
      );
    }

    push(
      '## 5. Palette — locked',
      '',
      '| Swatch | Hex | Role |',
      '| --- | --- | --- |'
    );
    image.colors.forEach(function (c) {
      push('| ' + c.name + ' | `' + c.hex + '` | ' + (c.usage || '—') + ' |');
    });
    push(
      '',
      'Hold these hex values and their role assignments across every variation. Reproportion the layout, not the palette.',
      '',
      '## 6. Typography and layout notes as observed',
      '',
      image.typography,
      '',
      image.layoutNotes,
      '',
      '## 7. Imagery — and what to exclude',
      '',
      'Technique: ' + category.imageryTechnique + '.',
      '',
      'Subjects: ' + image.imagerySubject + '.',
      '',
      'Exclusions: ' + category.imageryExclusions + '.',
      '',
      '## 8. Vocabulary and mood',
      '',
      'Mood: ' + image.mood.join(', ') + '.',
      '',
      'Vocabulary: ' + category.vocabulary.join(', ') + '.'
    );

    return lines.join('\n');
  }

  return {
    computeCategoryCounts: computeCategoryCounts,
    filterImagesByCategory: filterImagesByCategory,
    buildImagePromptParts: buildImagePromptParts,
    buildImagePrompt: buildImagePrompt,
    buildBrief: buildBrief
  };
});
