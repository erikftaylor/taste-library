#!/usr/bin/env python3
"""Author-side tool: sample a screenshot's real palette in two passes.

Usage:
    python3 scripts/sample-palette.py <image-path> [<image-path> ...]
    python3 scripts/sample-palette.py --verify [<image-id> ...]

Pass 1 ranks quantised colours by area, neutrals INCLUDED. Most pages in
this library are 40-70% white or near-black, and that ground colour is the
single most important palette entry — an extractor that filters neutrals
out reports incidental pixels instead and produces a palette that describes
no part of the page. (That is exactly what happened to the 19 entries
rebuilt in commit fbbc1a6; see AGENTS.md.)

Pass 2 ranks by area again but only among colours with real chroma, so a
small saturated accent — a 4%-of-viewport green CTA, a magenta pill —
surfaces instead of being averaged away by pass 1.

Output is a starting point, not an answer. Look at the screenshot and
assign each hex a usage role by hand before it goes into data.js.

--verify goes the other way: it reads the palettes already in data.js and
confirms every hex actually occurs in its own screenshot, so a colour cannot
be invented, copied from a neighbouring entry, or left behind after an image
is replaced. Run it after editing any palette.
"""
import colorsys
import json
import subprocess
import sys
from collections import Counter
from pathlib import Path

from PIL import Image

QUANT = 14          # bucket width per channel; coarse enough to merge JPEG noise
SAMPLE_PX = 700     # longest-edge budget, keeps very tall pages fast
MIN_SHARE = 0.0015  # ignore colours under 0.15% of the image
MIN_CHROMA = 0.22   # "has real chroma" threshold for pass 2


def to_hex(rgb):
    return '#{:02X}{:02X}{:02X}'.format(*rgb)


def chroma(rgb):
    """Saturation weighted so near-white and near-black score ~0."""
    r, g, b = [v / 255 for v in rgb]
    _, lightness, saturation = colorsys.rgb_to_hls(r, g, b)
    return saturation * (1 - abs(2 * lightness - 1))


def quantise(image):
    width, height = image.size
    scale = (SAMPLE_PX * SAMPLE_PX / (width * height)) ** 0.5
    if scale < 1:
        image = image.resize((max(1, int(width * scale)), max(1, int(height * scale))), Image.LANCZOS)
    rgb_image = image.convert('RGB')
    reader = getattr(rgb_image, 'get_flattened_data', None) or rgb_image.getdata
    pixels = list(reader())
    buckets = Counter(
        tuple(min(255, (v // QUANT) * QUANT + QUANT // 2) for v in pixel)
        for pixel in pixels
    )
    return buckets, len(pixels)


def analyse(path):
    buckets, total = quantise(Image.open(path))

    by_area = [(rgb, count / total) for rgb, count in buckets.most_common(8)]
    chromatic = sorted(
        ((rgb, count / total) for rgb, count in buckets.items()
         if count / total >= MIN_SHARE and chroma(rgb) >= MIN_CHROMA),
        key=lambda pair: -pair[1],
    )[:6]

    return by_area, chromatic


VERIFY_DISTANCE = 34    # max euclidean RGB distance to count as "this colour is present"
VERIFY_MIN_SHARE = 0.0002   # 0.02% of the image — a small button still clears this
# Phrases that claim the PAGE's base colour. Scoped grounds ("footer ground",
# "project tile ground") are legitimate for a small area and are not checked.
PAGE_GROUND_CLAIMS = (
    'page ground', 'page background', 'page canvas',
    'primary ground', 'primary background', 'primary content ground',
)
GROUND_TOLERANCE = 0.5      # a page-ground claim must hold at least half the widest
                            # measured share in its own palette; the slack absorbs
                            # near-duplicate entries (#FFFFFF and #F6F6F6) splitting it


def load_entries():
    """Read data.js through node so this stays the single source of truth."""
    dumped = subprocess.check_output([
        'node', '-e',
        "var d=require('./data.js');"
        "console.log(JSON.stringify(d.images.map(function(i){"
        "return {id:i.id,file:i.file,colors:i.colors};})));"
    ], text=True)
    return json.loads(dumped)


def present_share(buckets, total, target):
    """Fraction of the image within VERIFY_DISTANCE of target, and the nearest hit."""
    share = 0.0
    nearest = None
    nearest_distance = 1e9
    for rgb, count in buckets.items():
        distance = sum((a - b) ** 2 for a, b in zip(rgb, target)) ** 0.5
        if distance < nearest_distance:
            nearest_distance, nearest = distance, rgb
        if distance <= VERIFY_DISTANCE:
            share += count / total
    return share, nearest, nearest_distance


def parse_hex(value):
    value = value.lstrip('#')
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def verify(only_ids):
    entries = load_entries()
    if only_ids:
        entries = [e for e in entries if e['id'] in only_ids]

    failures = []
    for entry in entries:
        path = Path(entry['file'])
        if not path.exists():
            failures.append((entry['id'], 'missing file', entry['file'], ''))
            continue

        buckets, total = quantise(Image.open(path))
        measured = []
        for colour in entry['colors']:
            share, nearest, distance = present_share(buckets, total, parse_hex(colour['hex']))
            measured.append((colour, share, to_hex(nearest), distance))

        widest = max(m[1] for m in measured) or 1.0

        bad = []
        for colour, share, nearest, distance in measured:
            if share < VERIFY_MIN_SHARE:
                bad.append(('absent', colour, share, nearest, distance))
            elif (any(claim in colour.get('usage', '').lower() for claim in PAGE_GROUND_CLAIMS)
                  and share < widest * GROUND_TOLERANCE):
                # A claim about the page's base colour. If another palette entry covers
                # substantially more of the image, the role is wrong even though the hex
                # itself is real — this is the failure mode that put "#1D232B primary
                # background" on a page that is 63% white. Presence alone misses it:
                # all eight of that entry's wrong hexes did occur in the screenshot.
                bad.append(('overclaimed', colour, share, nearest, distance))

        if bad:
            print('\n%s' % entry['id'])
            for kind, colour, share, nearest, distance in bad:
                if kind == 'absent':
                    print('  ABSENT      %-22s %s  %.3f%% of image; nearest %s (Δ%.0f)'
                          % (colour['name'], colour['hex'], share * 100, nearest, distance))
                else:
                    print('  OVERCLAIMED %-22s %s  %.2f%% of image (widest in this palette '
                          'is %.2f%%) but usage says "%s"'
                          % (colour['name'], colour['hex'], share * 100,
                             max(m[1] for m in measured) * 100, colour['usage']))
                failures.append((entry['id'], kind, colour['hex']))

    absent = len([f for f in failures if f[1] == 'absent'])
    over = len([f for f in failures if f[1] == 'overclaimed'])
    print('\n%d entries checked — %d colour(s) absent from their own screenshot, '
          '%d claiming a ground role they do not hold.' % (len(entries), absent, over))
    if failures:
        print('Fix the hex (absent) or the usage string (overclaimed), then re-run.')
    return 1 if failures else 0


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

            by_area, chromatic = analyse(path)
            print('\n%s' % path)
            print('  by area (grounds and bands — neutrals included):')
            for rgb, share in by_area:
                print('    %s  %5.1f%%' % (to_hex(rgb), share * 100))
            print('  by area among chromatic colours (accents):')
            if not chromatic:
                print('    (none above the chroma threshold — the page is neutral)')
            for rgb, share in chromatic:
                print('    %s  %5.2f%%' % (to_hex(rgb), share * 100))

    print('\nAssign a usage role to each hex by looking at the screenshot.')
    print('data.js requires { name, hex, usage } — the usage test fails without it.')


if __name__ == '__main__':
    main()
