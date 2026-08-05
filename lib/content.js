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

  var GROUND_WORDS = /ground|background|band|canvas|panel|surface|section|fill|wash|tile|card|field/i;
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

  /**
   * Classify every palette colour whose usage reads as a ground by the best
   * contrast it reaches against any other colour in the palette. Consuming
   * agents were putting body copy on washes that only pass for large text;
   * stating the class per ground closes that decision.
   */
  function buildGroundSafety(image) {
    var colors = image.colors || [];
    var safe = [];
    var large = [];
    var decorative = [];
    colors.forEach(function (ground) {
      if (!GROUND_WORDS.test(ground.usage || '')) return;
      var best = 0;
      colors.forEach(function (other) {
        if (other !== ground) best = Math.max(best, contrastRatio(ground.hex, other.hex));
      });
      (best >= 4.5 ? safe : best >= 3 ? large : decorative).push(ground.name);
    });
    return { safe: safe, large: large, decorative: decorative };
  }

  function groundSafetyLine(image) {
    var g = buildGroundSafety(image);
    if (!g.safe.length && !g.large.length && !g.decorative.length) return null;
    var parts = [];
    if (g.safe.length) parts.push('text-safe for body copy — ' + g.safe.join(', '));
    if (g.large.length) parts.push('large text (24px+) only — ' + g.large.join(', '));
    if (g.decorative.length) parts.push('decorative only, no text at any size — ' + g.decorative.join(', '));
    return 'Ground roles, classified by each ground\'s best contrast against the rest of the palette (computed over every pairing, not only the rows shown above): ' + parts.join('; ') +
      '. Palette roles not named here are marks or accents, not grounds.';
  }

  function markInboxImported(items, serverPath) {
    // Uploads dedupe by content, so several Inbox cards can share one
    // serverPath; importing any of them imports them all. A null serverPath
    // means the card never reached the server — never match on it.
    if (serverPath == null) return items;
    items.forEach(function (item) {
      if (item.serverPath === serverPath) item.status = 'imported';
    });
    return items;
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

  function normalizeSignature(signature) {
    if (!signature) return { carry: [], rewrite: [] };
    if (Array.isArray(signature)) return { carry: signature, rewrite: [] };
    return { carry: signature.carry || [], rewrite: signature.rewrite || [] };
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
      signature: normalizeSignature(image.signature),
      mood: image.mood,
      vocabulary: category.vocabulary,
      system: category.system || null,
      fonts: category.fonts || null,
      copyRegister: category.copyRegister || null,
      states: category.states || null,
      motion: category.motion || null,
      adaptation: category.adaptation || null
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
      '- **Recreating this design faithfully** — follow §3, §4, §5, §9, §10 and §11 as written.',
      '- **Generating variations on the style** — follow §1, §2, §5, §7 and §9–§11; re-derive §3 from the ratios in §2 at whatever canvas you are working in.',
      '- **Adapting the style to an existing brand** — read §12 first; it states which layers yield to the target brand and which never do. Everything else binds exactly as in faithful recreation: §2\'s rescale and responsive rules, §3, §4 and §9–§11 as written, §5 as §12 amends it, §1b\'s Carry list and §7\'s technique and exclusions locked.',
      '- **Feeding a design tool** (Figma Make, Claude Design, Impeccable) — paste the whole thing; §3 and §4 are the machine-readable layers.',
      '- **Brainstorming** — §1, §1b and §8 alone are enough; ignore the rest.',
      '',
      '§3 binds in faithful-recreation and brand-adaptation modes. It is free only when varying, where it is *one valid resolution* of §2 rather than a constraint and you re-derive it at your own canvas. §5 and §7 are fixed when recreating or varying — palette and exclusions are what make it this style rather than a different one; in brand-adaptation mode, §12 states exactly which of their values yield. §9–§11 (copy register, states, motion) apply at every fidelity level; where they prescribe a default, the default is the spec, not a suggestion.',
      '',
      'Where layers disagree, resolve in this order:',
      '',
      '1. §4\'s prose notes beat §4\'s ASCII sketch, in every mode.',
      '2. In brand-adaptation mode, §12 beats any layer it amends.',
      '3. §6 records what was measured on the reference, so it beats §2 and §3 **only when recreating that page faithfully**. When varying or adapting, §2 and §3 beat §6 — §6\'s values belong to the reference\'s canvas, not to yours, and a measured observation is not a specification for a different brand.',
      '4. Where two layers state the same quantity in different units or percentages and the arithmetic disagrees, the smaller of the two governs and the discrepancy is a defect in this brief — report it rather than averaging.',
      '',
      '## 1. The style in one paragraph',
      '',
      category.description,
      ''
    );

    var signature = image.signature;
    if (Array.isArray(signature)) signature = { carry: signature, rewrite: [] };
    if (signature && signature.carry && signature.carry.length) {
      push(
        '## 1b. What this reference does that the style family does not',
        '',
        '**Carry (devices)** — structural mechanisms, portable to any subject. Reproduce these at every fidelity level; they are what distinguishes this reference from the others in its family:',
        ''
      );
      signature.carry.forEach(function (line) {
        push('- ' + line);
      });
      push(
        '',
        '**Rewrite (content)** — words, subjects and copy specific to this reference. Never carry them to a new subject; each line says what to write instead:',
        ''
      );
      if (signature.rewrite && signature.rewrite.length) {
        signature.rewrite.forEach(function (line) {
          push('- ' + line);
        });
      } else {
        push('- None — no literal copy from this reference is part of the style. Write all copy fresh in the §9 register.');
      }
      push('');
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
        'Typefaces — the first named face in each row is the default and the later names are substitutes for when it is unavailable; never pick from the treatment column\'s family description alone:',
        ''
      );
      var fonts = category.fonts;
      if (fonts && fonts.roles && fonts.roles.length) {
        fonts.roles.forEach(function (row) {
          push('- **' + row[0] + '** — ' + row[1]);
        });
      } else {
        push('- **All roles** — choose faces that satisfy the treatment column above.');
      }
      push(
        '',
        'Never: ' + ((fonts && fonts.never) || 'Inter, Roboto, Arial or system-ui as a display face') + '.',
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
        'Responsive default: above the reference canvas, hold the content at reference width and centre it — only the page ground extends. Down to 1024px, rescale by shrinking the base unit; gutter and side margin scale with it (their px values are authored at the reference base unit). Narrower than that, stack each section\'s columns full-width, left column first (so side-alternating sections alternate media-first and copy-first down the stack), drop each type role one step in the scale (roles already at the bottom step hold their size), and hide nothing. When columns stack, each section keeps its desktop wash or media side as its bleed edge, so side-alternating devices keep alternating; edge-following devices (threads, spines, rails) follow those same edges down the stack.',
        '',
        '## 3. Resolved values at ' + system.canvas + ' (binding when recreating or adapting; re-derive from §2 when varying)',
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
        '',
        'Place exactly the content the target supplies, in the order supplied — the target\'s content list wins over sector knowledge and its order is binding. Slots the wireframe mandates that the target\'s content does not fill (nav links, footer details, button destinations) take the target\'s real equivalents; a repeated CTA slot with one supplied action routes every instance to the section that owns that action, as an in-page anchor; where no equivalent exists at all, keep the slot with placeholder copy marked TBD. Named-but-valueless content is never fabricated: missing values (addresses, hours, prices) take TBD text, and missing destinations take href="#" marked TBD. Never drop a drawn slot; never add sections the wireframe does not draw. Where §1b\'s Rewrite list forbids fabricating what a slot holds — endorsements, credentials, named third parties, client logos — that prohibition beats the never-drop rule, and it resolves one of two ways: keep the slot with TBD placeholders where a placeholder is visibly a placeholder, or drop the whole section where a placeholder would itself read as a claim. A testimonial card, a logo wall or a named-advisor row filled with TBD still reads as an endorsement that does not exist, so those are dropped; a nav label or an address is not, so those stay as TBD. Say in your output which sections you dropped and why.',
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
      'Hold these hex values and their role assignments across every variation. Reproportion the layout, not the palette. In brand-adaptation mode (§12), hexes may be re-derived — but every entry here keeps its role.',
      ''
    );

    var flagged = image.colors.filter(function (c) { return c.contrastNote; });
    if (flagged.length) {
      push('**Contrast failures carried by this reference — do not reproduce them.**');
      push('');
      flagged.forEach(function (c) {
        push('- **' + c.name + '** `' + c.hex + '` — ' + c.contrastNote);
      });
      push('');
      push('These are measured facts about the reference, not targets. The role assignment above still binds; the *value* must be adjusted until the pairing clears 4.5:1 for normal text or 3:1 for large text before it ships. Where §12 lets you re-derive a hex from the target brand, derive to the threshold rather than to the reference\'s luminance.');
      push('');
    }

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

    var grounds = groundSafetyLine(image);
    if (grounds) push(grounds, '');

    push(
      '## 6. Typography and layout notes as observed',
      '',
      image.typography,
      '',
      image.layoutNotes,
      '',
      '## 7. Imagery — and what to exclude',
      '',
      'Technique (carry — locked at every fidelity level): ' + category.imageryTechnique + '.',
      '',
      'Subjects (rewrite — replace with the target\'s own subject matter, rendered in the technique above): ' + image.imagerySubject + '.',
      '',
      'Where the layout carries more than one illustration or image slot, write one subject per slot from that slot\'s own section content, every one rendered in the technique above.',
      '',
      'Exclusions (locked): ' + category.imageryExclusions + '.',
      '',
      '## 8. Vocabulary and mood',
      '',
      'Mood: ' + image.mood.join(', ') + '.',
      ''
    );
    var adapt = category.adaptation;
    if (adapt && adapt.register) {
      push('Read the mood as a compatibility claim, not decoration: ' + adapt.register, '');
    }
    push(
      'Vocabulary: ' + category.vocabulary.join(', ') + '.',
      '',
      '## 9. Copy register',
      '',
      'Write all copy fresh for the target subject, in this register — the reference\'s literal words are Rewrite-class (§1b):',
      ''
    );
    if (category.copyRegister && category.copyRegister.length) {
      category.copyRegister.forEach(function (line) {
        push('- ' + line);
      });
    } else {
      push('- Default register: sentence case throughout; CTA labels verb-led, 1–3 words; headings are plain claims without terminal punctuation.');
    }

    push('', '## 10. Interaction states', '');
    if (category.states && category.states.length) {
      push('Every interactive component ships with the states below — nothing is left to invent:', '');
      category.states.forEach(function (row) {
        push('- **' + row[0] + '** — ' + row[1]);
      });
    } else {
      push('States were not separately specified for this family. Default for every interactive element: hover — shift the fill or underline 8% toward the ink; focus-visible — 2px outline in the palette accent, offset 2px; active — translateY(1px); disabled — 40% opacity. Nothing else changes.');
    }

    push('', '## 11. Motion', '');
    if (category.motion && category.motion.length) {
      category.motion.forEach(function (line) {
        push(line, '');
      });
    } else {
      push(
        'No motion was observed — the reference is a static capture. Default: static. If animating: entrances are opacity fades with an 8px rise, 200ms ease-out, staggered 80ms per sibling; animate transform and opacity only; no parallax, no scroll-jacking; honour prefers-reduced-motion by reducing to opacity alone.',
        ''
      );
    }

    push('## 12. Adapting to an existing brand', '');
    if (adapt) {
      push(
        '**Layers that yield.** ' + adapt.yields,
        '',
        '**Layers that never yield** — losing any of these makes it a different style, not an adaptation:',
        ''
      );
      adapt.locked.forEach(function (line) {
        push('- ' + line);
      });
      push(
        '',
        '**Register and contraindications.** ' + adapt.register.charAt(0).toUpperCase() + adapt.register.slice(1),
        '',
        '**Filling the roles.** Work down §5\'s palette table in order. For each chromatic reference hex, take the unassigned brand hue nearest in hue angle, then adjust its lightness and saturation until the role\'s contrast constraint is met and the hex still performs the Role column\'s function — the swatch\'s colour name need not survive; role fit outranks hex fidelity. For reference hexes that are near-neutral (near-blacks, greys, near-whites), hue angle is undefined: derive these from the brand primary (dark roles) or the brand\'s palest hue (light roles), moving only lightness — a hue-tinted neutral derived this way is in-brand, a plain neutral is not. Derived hues may share the primary\'s hue angle across any number of roles: distinct lightness steps are distinct colours, and a reference\'s dark pair (an ink plus a slightly lighter fill) becomes two lightness steps of the same derivation. A single identical hex may serve two roles only where the reference\'s own hexes nearly coincide. An ink role must reach 14:1 on the page ground; a fill role must reach AA (4.5:1) with its label; lightness and luminance throughout mean WCAG relative luminance, the measure behind §5\'s contrast table. A brand hue whose RGB chroma (max channel minus min channel, as a percentage of 255) is under 10% is near-neutral: it serves ground- and ink-class roles only — and serves them directly, taking precedence over derivation — and never enters the hue-angle pool. A hue landing within one point of 10% counts as chromatic, because a brand with too few hues is the harder failure. **The brand primary** is whichever hue the target names as primary; where the target names none, it is the chromatic hue covering the most of the target\'s existing material, and failing that the first one listed. Direct assignment consumes a hue from the pool; derivation never does, and every pool hue qualifies for any role — lightness and saturation are always adjustable. **When the brand has fewer chromatic hues than §5 has chromatic roles — which is the normal case, not the exception — the pool does not run dry, it repeats.** Take §5\'s chromatic roles in the order §5 prints them — that table is authored in descending prominence, so the order is the ranking and you need no figures of your own. Assign each brand hue to the highest-ranked unassigned role nearest it in hue angle. Then derive every remaining chromatic role as a distinct lightness or saturation step of whichever assigned hue sits nearest it, holding that hue\'s angle. Two roles derived from one hue must differ by at least 15 points of WCAG relative luminance, or they stop reading as separate roles. Only where that separation cannot be reached while both roles still meet their contrast constraints may two roles collapse into one — and then the brief must name which two merged and why, rather than doing it silently. When adjusting an assigned hue, target the reference hex\'s relative luminance and move further only as the role\'s contrast constraint requires. Colour words inside §2–§4\'s component specs (near-black, white, coral) are role names — resolve them through this section\'s re-derived palette, never as literal reference hexes. Where a category\'s own rules earlier in this section conflict with this procedure, the category\'s rules win. Never import a hue from outside the brand — including in hover and focus states, which shift the role\'s own hue rather than introducing a neutral.'
      );
    } else {
      push(
        '**Layers that yield.** Palette hexes may be re-derived from the target brand provided every role in §5 keeps its role and its measured-contrast class.',
        '',
        '**Layers that never yield.** The Carry list in §1b.',
        '',
        '**Register and contraindications.** Read the mood in §8 as the compatibility claim.'
      );
    }

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
    buildGroundSafety: buildGroundSafety,
    markInboxImported: markInboxImported,
    buildCssTokens: buildCssTokens,
    buildTailwindTokens: buildTailwindTokens,
    buildJsonTokens: buildJsonTokens
  };
});
