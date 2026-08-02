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

  var GROUND_WORDS = /ground|background|band|canvas|panel|surface|section|fill|wash|tile|card/i;
  var MARK_WORDS = /type|text|copy|headline|heading|label|numeral|link|glyph|icon|rule|stroke|accent|emphasis/i;

  function relativeLuminance(hex) {
    var channels = [1, 3, 5].map(function (i) {
      var v = parseInt(hex.substr(i, 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }

  function contrastRatio(hexA, hexB) {
    var a = relativeLuminance(hexA);
    var b = relativeLuminance(hexB);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }

  function wcagLevel(ratio) {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return 'AA large';
    return 'fail';
  }

  /**
   * Pair every colour that reads as a mark against every colour that reads as a
   * ground, and rank by contrast. Derived entirely from hexes already verified
   * against the screenshot, so it adds no new authored data.
   */
  function buildContrastPairs(image) {
    var colors = image.colors || [];
    var pairs = [];

    // Every unordered pair. Filtering to keyword-classified mark/ground pairs first
    // looked tidier but silently dropped the pairing that matters most: slide-ux
    // describes its white as a "centred content column", which matches neither
    // vocabulary, so white-on-navy at 11:1 never appeared and the palette read as
    // failing AA. Contrast is symmetric — compute it for everything and rank.
    for (var i = 0; i < colors.length; i += 1) {
      for (var j = i + 1; j < colors.length; j += 1) {
        var a = colors[i];
        var b = colors[j];
        var aMark = MARK_WORDS.test(a.usage || '');
        var bMark = MARK_WORDS.test(b.usage || '');
        var aGround = GROUND_WORDS.test(a.usage || '');
        var bGround = GROUND_WORDS.test(b.usage || '');

        // Orient only when the usage strings say so; otherwise leave it unoriented
        // rather than inventing a direction.
        var mark = a;
        var ground = b;
        var oriented = false;
        if (aMark !== bMark) {
          oriented = true;
          mark = aMark ? a : b;
          ground = aMark ? b : a;
        } else if (aGround !== bGround) {
          oriented = true;
          ground = aGround ? a : b;
          mark = aGround ? b : a;
        }

        var ratio = contrastRatio(a.hex, b.hex);
        pairs.push({
          mark: mark, ground: ground, oriented: oriented,
          ratio: ratio, level: wcagLevel(ratio)
        });
      }
    }

    return pairs.filter(function (p) {
      return p.level !== 'fail';
    }).sort(function (a, b) {
      return b.ratio - a.ratio;
    }).slice(0, 6);
  }

  function contrastWarning(pairs) {
    var best = pairs.length ? pairs[0].ratio : 0;
    if (best >= 4.5) return null;
    return 'No pair in this palette reaches 4.5:1. Either a hex is wrong, or the ' +
      'reference itself fails WCAG AA for body text — check the screenshot before ' +
      'reusing these values.';
  }

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function uniqueSlugs(colors) {
    var used = {};
    return colors.map(function (c) {
      var base = slug(c.name) || 'colour';
      var name = base;
      var n = 2;
      while (used[name]) { name = base + '-' + n; n += 1; }
      used[name] = true;
      return { name: name, color: c };
    });
  }

  function buildCssTokens(image, category) {
    var named = uniqueSlugs(image.colors || []);
    var lines = [
      '/* ' + image.title + ' — ' + category.name + ' */',
      '/* Palette sampled from the source screenshot; roles as observed. */',
      ':root {'
    ];
    named.forEach(function (entry) {
      lines.push('  --' + entry.name + ': ' + entry.color.hex + '; /* ' + entry.color.usage + ' */');
    });
    if (category.system) {
      lines.push('', '  --base-unit: ' + category.system.baseUnit + 'px;');
      category.system.typeScale.forEach(function (row) {
        lines.push('  --type-' + slug(row[0]) + ': ' + resolveUnits(row[2], category.system.baseUnit) +
          '; /* line-height ' + row[3] + ' */');
      });
    }
    lines.push('}');
    return lines.join('\n');
  }

  function buildTailwindTokens(image, category) {
    var named = uniqueSlugs(image.colors || []);
    var colours = named.map(function (entry) {
      return "        '" + entry.name + "': '" + entry.color.hex + "',";
    });
    var sizes = [];
    if (category.system) {
      category.system.typeScale.forEach(function (row) {
        sizes.push("        '" + slug(row[0]) + "': ['" +
          resolveUnits(row[2], category.system.baseUnit) + "', { lineHeight: '" + row[3] + "' }],");
      });
    }
    return [
      '// ' + image.title + ' — ' + category.name,
      'module.exports = {',
      '  theme: {',
      '    extend: {',
      '      colors: {',
      colours.join('\n'),
      '      },',
      '      fontSize: {',
      sizes.join('\n'),
      '      },',
      '    },',
      '  },',
      '};'
    ].join('\n');
  }

  function buildJsonTokens(image, category) {
    var pairs = buildContrastPairs(image);
    return JSON.stringify({
      reference: image.title,
      styleFamily: category.name,
      descriptor: image.descriptor,
      source: image.file,
      palette: (image.colors || []).map(function (c) {
        return { name: c.name, hex: c.hex, role: c.usage };
      }),
      contrast: pairs.map(function (p) {
        return {
          mark: p.mark.name,
          ground: p.ground.name,
          ratio: Math.round(p.ratio * 10) / 10,
          wcag: p.level
        };
      }),
      typography: image.typography,
      layout: image.layoutNotes,
      signature: image.signature || [],
      mood: image.mood,
      vocabulary: category.vocabulary,
      system: category.system || null
    }, null, 2);
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
      ''
    );

    var contrast = buildContrastPairs(image);
    if (contrast.length) {
      push(
        'Measured contrast, computed from the hexes above:',
        '',
        '| Mark | Ground | Ratio | WCAG |',
        '| --- | --- | --- | --- |'
      );
      contrast.forEach(function (p) {
        push('| ' + p.mark.name + ' | ' + p.ground.name + ' | ' +
          p.ratio.toFixed(1) + ':1 | ' + p.level + ' |');
      });
      var warning = contrastWarning(contrast);
      push('', warning || 'Keep body text on a pairing that reaches AA (4.5:1) when reusing this palette.', '');
    }

    push(
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
    buildBrief: buildBrief,
    contrastRatio: contrastRatio,
    wcagLevel: wcagLevel,
    buildContrastPairs: buildContrastPairs,
    contrastWarning: contrastWarning,
    buildCssTokens: buildCssTokens,
    buildTailwindTokens: buildTailwindTokens,
    buildJsonTokens: buildJsonTokens
  };
});
