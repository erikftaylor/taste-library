#!/usr/bin/env python3
"""Author-side tool: sample a screenshot's real palette in two passes.

Usage: python3 scripts/sample-palette.py <image-path> [<image-path> ...]

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
"""
import colorsys
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


def main():
    if len(sys.argv) < 2:
        print(__doc__.strip())
        sys.exit(1)

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
