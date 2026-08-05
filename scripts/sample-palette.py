#!/usr/bin/env python3
"""Author-side tool: propose a screenshot's real palette, and verify data.js against it.

Usage:
    python3 scripts/sample-palette.py <image-path> [<image-path> ...]
    python3 scripts/sample-palette.py --verify [<image-id> ...]

THE RULE: every hex in data.js must be one this tool proposed for that image.
Do not eyedrop by memory, do not copy a hex from a neighbouring entry, and do not
name a colour before checking it is in the candidate list. `--verify` enforces this.

Why provenance rather than pixel semantics: no statistic cleanly separates "a design
colour" from "a colour that merely occurs". A brand amber used for headline text and
a foreign orange inside a client logo can have near-identical area, run length and
page spread. What is checkable is where a hex came from. The library once carried
'#E86C3A coral' on a page whose CTAs are pink; the hex was carried over from another
entry, and it survived an area-based check by matching an orange logo in a logo wall.

Candidates are proposed on three independent signals, because design colours show up
in three different ways:

  AREA    >= 0.5% of the image          grounds, full-bleed bands, large fills
  REGION  a flat run >= 12% of width    buttons, chips, cards, rules
  SPREAD  present in >= 4 page bands    text, thin strokes, dashed borders, gradients

A colour meeting none of the three is not part of the design system, whatever its
raw pixel count.
"""
import colorsys
import json
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

from PIL import Image

PROFILE_WIDTH = 600     # every image normalised to this width so signals compare
PROFILE_MAX_H = 4000    # cap for very tall pages
QUANT = 18              # bucket width; tolerates anti-aliasing inside one fill
BANDS = 24              # horizontal slices used for the spread signal
MIN_CHROMA = 0.22       # "has real chroma" — separates accents from grounds

AREA_MIN = 0.005        # 0.5% of the image
REGION_MIN = 0.12       # flat run as a fraction of width
SPREAD_MIN = 4          # distinct page bands
FLOOR = 0.0002          # 0.02% for area- and region-qualified colours
SPREAD_FLOOR = 0.00005  # 0.005% — a recurring accent can be tiny and still deliberate,
                        # e.g. one orange sphere repeated across several diagrams
MATCH_TOLERANCE = 22    # how close a data.js hex must sit to a proposed candidate


def to_hex(rgb):
    return '#{:02X}{:02X}{:02X}'.format(*rgb)


def parse_hex(value):
    value = value.lstrip('#')
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def distance(a, b):
    return sum((x - y) ** 2 for x, y in zip(a, b)) ** 0.5


def chroma(rgb):
    """Saturation weighted so near-white and near-black score ~0."""
    r, g, b = [v / 255 for v in rgb]
    _, lightness, saturation = colorsys.rgb_to_hls(r, g, b)
    return saturation * (1 - abs(2 * lightness - 1))


def bucket(pixel):
    return tuple(min(255, (v // QUANT) * QUANT + QUANT // 2) for v in pixel)


def profile(path):
    """One pass over the image producing all three signals per colour."""
    image = Image.open(path).convert('RGB')
    width, height = image.size
    image = image.resize(
        (PROFILE_WIDTH, max(BANDS, min(PROFILE_MAX_H, int(height * PROFILE_WIDTH / width)))),
        Image.LANCZOS)
    pixels = image.load()
    _, tall = image.size
    band_height = max(1, tall // BANDS)

    counts, runs, bands = Counter(), {}, {}
    for y in range(tall):
        band = min(BANDS - 1, y // band_height)
        current, length = None, 0
        for x in range(PROFILE_WIDTH):
            key = bucket(pixels[x, y])
            counts[key] += 1
            bands.setdefault(key, set()).add(band)
            if key == current:
                length += 1
            else:
                if current is not None and length > runs.get(current, 0):
                    runs[current] = length
                current, length = key, 1
        if current is not None and length > runs.get(current, 0):
            runs[current] = length

    return counts, PROFILE_WIDTH * tall, runs, bands


def signals(profiled, target):
    """Area share, longest flat run and band spread for one colour.

    Share comes from the target's own bucket only — summing neighbours would
    double-count adjacent buckets and inflate every figure past 100%. Run and
    spread do look at neighbours, because a fill straddling a bucket boundary
    would otherwise report a broken run.
    """
    counts, total, runs, bands = profiled
    base = bucket(target)
    share = counts.get(base, 0) / total
    run, seen = 0, set()
    for dr in (-QUANT, 0, QUANT):
        for dg in (-QUANT, 0, QUANT):
            for db in (-QUANT, 0, QUANT):
                probe = (base[0] + dr, base[1] + dg, base[2] + db)
                if distance(probe, target) <= QUANT * 1.6:
                    run = max(run, runs.get(probe, 0))
                    seen |= bands.get(probe, set())
    return share, run, len(seen)


def qualifies(share, run, spread):
    if share >= AREA_MIN:
        return 'area'
    if run >= PROFILE_WIDTH * REGION_MIN and share >= FLOOR:
        return 'region'
    if spread >= SPREAD_MIN and share >= SPREAD_FLOOR:
        return 'spread'
    return None


def candidates(profiled):
    """Every colour the page actually uses deliberately, deduped."""
    counts, total, runs, bands = profiled
    rows = []
    for key, count in counts.items():
        share, run, spread = signals(profiled, key)
        reason = qualifies(share, run, spread)
        if reason:
            rows.append((key, share, run, spread, reason))
    rows.sort(key=lambda r: -r[1])

    kept = []
    for row in rows:
        if any(distance(row[0], other[0]) < 30 for other in kept):
            continue
        kept.append(row)
    return kept


def report(path):
    profiled = profile(path)
    kept = candidates(profiled)
    grounds = [r for r in kept if chroma(r[0]) < MIN_CHROMA]
    accents = [r for r in kept if chroma(r[0]) >= MIN_CHROMA]

    # Grounds read best largest-first. Accents must not be ordered by area or a
    # 0.03% CTA button sinks below every large wash — order them by how strongly
    # they read as a deliberate region.
    grounds.sort(key=lambda r: -r[1])
    accents.sort(key=lambda r: (-r[2], -r[1]))

    print('\n%s' % path)
    for label, rows, limit in (('GROUNDS AND NEUTRALS', grounds, 10),
                               ('ACCENTS', accents, 12)):
        print('  %s:' % label)
        if not rows:
            print('    (none)')
        for rgb, share, run, spread, reason in rows[:limit]:
            print('    %s  %6.2f%% area   run %3d/%d   %2d/%d bands   [%s]'
                  % (to_hex(rgb), share * 100, run, PROFILE_WIDTH, spread, BANDS, reason))


def load_entries():
    """Read data.js through node so it stays the single source of truth."""
    dumped = subprocess.check_output([
        'node', '-e',
        "var d=require('./data.js');"
        "console.log(JSON.stringify(d.images.map(function(i){"
        "return {id:i.id,file:i.file,colors:i.colors};})));"
    ], text=True)
    return json.loads(dumped)


PAGE_GROUND_CLAIMS = (
    'page ground', 'page background', 'page canvas',
    'primary ground', 'primary background', 'primary content ground',
)
GROUND_TOLERANCE = 0.5

# Words in a usage string that mean the colour is set as type. Normal-size roles
# are checked first, because a colour doing both ("display headline and the bold
# lead-in clauses") has to clear the stricter of the two thresholds.
TEXT_NORMAL = ('body', 'copy', 'caption', 'label', 'link', 'paragraph', 'bio',
               'micro', 'descriptor', 'spec-value', 'nav')
TEXT_LARGE = ('display', 'headline', 'wordmark', 'heading', 'numeral')
# A usage naming a surface means the hex sits *behind* type rather than being
# set as type. Those are not text pairings and are not checked here.
FILL_ONLY = ('fill', 'fills', 'behind', 'band', 'bands', 'bar', 'field',
             'fields', 'plate', 'tile', 'tiles', 'swipe', 'panel', 'bezel')
AA_NORMAL = 4.5
AA_LARGE = 3.0


def relative_luminance(rgb):
    channels = []
    for value in rgb[:3]:
        srgb = value / 255.0
        channels.append(srgb / 12.92 if srgb <= 0.03928
                        else ((srgb + 0.055) / 1.055) ** 2.4)
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]


def contrast_ratio(a, b):
    la, lb = relative_luminance(a), relative_luminance(b)
    lighter, darker = max(la, lb), min(la, lb)
    return (lighter + 0.05) / (darker + 0.05)


def text_threshold(usage):
    """Strictest threshold any single clause of the usage demands.

    Clause by clause, not whole-string: one hex routinely does fill work in one
    clause and type work in the next ("pill CTA fills, step numerals, quote
    attributions"). Testing the whole string let the fill word suppress the
    entire colour, so a red setting both buttons and numerals went unchecked.
    """
    def has(clause, words):
        return any(re.search(r'\b' + re.escape(w) + r's?\b', clause) for w in words)

    strictest = None
    for clause in re.split(r',|;| and | plus ', usage.lower()):
        if has(clause, FILL_ONLY):
            continue
        if has(clause, TEXT_NORMAL):
            return AA_NORMAL
        if has(clause, TEXT_LARGE):
            strictest = AA_LARGE
    return strictest


def verify(only_ids):
    entries = load_entries()
    if only_ids:
        entries = [e for e in entries if e['id'] in only_ids]

    failures = []
    for entry in entries:
        path = Path(entry['file'])
        if not path.exists():
            print('\n%s\n  MISSING FILE %s' % (entry['id'], entry['file']))
            failures.append((entry['id'], 'missing', entry['file']))
            continue

        profiled = profile(path)
        proposals = candidates(profiled)

        measured = []
        for colour in entry['colors']:
            target = parse_hex(colour['hex'])
            share, run, spread = signals(profiled, target)
            nearest = min(proposals, key=lambda r: distance(r[0], target)) if proposals else None
            gap = distance(nearest[0], target) if nearest else 999
            measured.append((colour, share, run, spread, nearest, gap))

        widest = max(m[1] for m in measured) or 1.0
        # The widest measured colour is the ground most type on the page sits on.
        # Text checked against anything else needs an acknowledgement saying so.
        ground = max(measured, key=lambda m: m[1])[0]
        bad = []
        for colour, share, run, spread, nearest, gap in measured:
            if gap > MATCH_TOLERANCE:
                bad.append(('not-in-sample', colour, share, run, spread, nearest, gap))
            elif (any(claim in colour.get('usage', '').lower() for claim in PAGE_GROUND_CLAIMS)
                  and share < widest * GROUND_TOLERANCE):
                bad.append(('overclaimed', colour, share, run, spread, nearest, gap))
                continue

            threshold = text_threshold(colour.get('usage', ''))
            if threshold is None or colour['hex'] == ground['hex']:
                continue
            ratio = contrast_ratio(parse_hex(colour['hex']), parse_hex(ground['hex']))
            if ratio >= threshold or colour.get('contrastNote'):
                continue
            bad.append(('lowcontrast', colour, ratio, threshold, ground, None, 0))

        if bad:
            print('\n%s' % entry['id'])
            for kind, colour, share, run, spread, nearest, gap in bad:
                if kind == 'not-in-sample':
                    hint = ('nearest proposed is %s (Δ%.0f)' % (to_hex(nearest[0]), gap)
                            if nearest else 'nothing proposed')
                    print('  NOT-IN-SAMPLE %-22s %s  area %.3f%%, run %d, %d bands — '
                          'not a colour this page uses deliberately; %s'
                          % (colour['name'], colour['hex'], share * 100, run, spread, hint))
                elif kind == 'lowcontrast':
                    ratio, threshold, ground_colour = share, run, spread
                    print('  LOWCONTRAST   %-22s %s  %.2f:1 on %s %s — needs %.1f:1 for "%s"'
                          % (colour['name'], colour['hex'], ratio,
                             ground_colour['name'], ground_colour['hex'],
                             threshold, colour['usage']))
                else:
                    print('  OVERCLAIMED   %-22s %s  %.2f%% of image (widest here is %.2f%%) '
                          'but usage says "%s"'
                          % (colour['name'], colour['hex'], share * 100, widest * 100,
                             colour['usage']))
                failures.append((entry['id'], kind, colour['hex']))

    kinds = {k: len([f for f in failures if f[1] == k])
             for k in ('not-in-sample', 'overclaimed', 'lowcontrast', 'missing')}
    print('\n%d entries checked — %d hex(es) not drawn from the image, '
          '%d claiming a ground role they do not hold, '
          '%d set as type below the contrast their role needs.'
          % (len(entries), kinds['not-in-sample'], kinds['overclaimed'],
             kinds['lowcontrast']))
    if kinds['not-in-sample'] or kinds['missing']:
        print('Re-run the sampler on that image and take the hex from its output.')
    if kinds['lowcontrast']:
        print('A reference is allowed to fail contrast — the library records what is '
              'there. Do NOT change the hex. Open the image, confirm what the colour '
              'actually sits on, and add a contrastNote to that colour; the brief then '
              'carries the warning into §5 instead of implying the pairing is safe.')
        print('LOWCONTRAST does not fail the run yet: entries predating this check are '
              'still unannotated. Once every one carries a note, drop it from this '
              'exemption so a new unannotated failure breaks the build.')
    fatal = [f for f in failures if f[1] != 'lowcontrast']
    return 1 if fatal else 0


def main():
    if len(sys.argv) < 2:
        print(__doc__.strip())
        sys.exit(1)

    if sys.argv[1] == '--verify':
        sys.exit(verify(set(sys.argv[2:])))

    for arg in sys.argv[1:]:
        paths = sorted(Path('.').glob(arg)) or [Path(arg)]
        for path in paths:
            if not path.exists():
                print('!! not found: %s' % path)
                continue
            report(path)

    print('\nEvery data.js hex must come from this output — --verify enforces it.')
    print('[area] large fill · [region] button or band · [spread] text, stroke or rule.')
    print('Assign each hex a usage role from the screenshot; data.js needs {name,hex,usage}.')


if __name__ == '__main__':
    main()
