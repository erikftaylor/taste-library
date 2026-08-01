#!/usr/bin/env python3
"""Author-side tool: sample dominant chromatic colors from a screenshot.

Usage: python3 scripts/extract-colors.py <image-path> [count]

Not loaded by the app itself — run by hand (or by Claude) when authoring
a data.js entry for a new screenshot, so palette hex values come from the
actual image instead of being guessed.
"""
import colorsys
import json
import sys

from PIL import Image


def dominant_colors(path, count=6):
    img = Image.open(path).convert("RGB")
    img.thumbnail((400, 400))
    quantized = img.quantize(colors=32, method=Image.MEDIANCUT)
    palette = quantized.getpalette()
    counts = quantized.getcolors()  # [(count, paletteIndex), ...]

    candidates = []
    for pixel_count, idx in counts:
        r, g, b = palette[idx * 3], palette[idx * 3 + 1], palette[idx * 3 + 2]
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if s < 0.15 or v < 0.12 or v > 0.97:
            continue  # skip near-white/near-black/near-gray background noise
        candidates.append((pixel_count, r, g, b))

    candidates.sort(reverse=True, key=lambda c: c[0])
    results = []
    for pixel_count, r, g, b in candidates[:count]:
        results.append({"hex": "#{:02X}{:02X}{:02X}".format(r, g, b), "pixels": pixel_count})
    return results


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/extract-colors.py <image-path> [count]", file=sys.stderr)
        sys.exit(1)
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 6
    print(json.dumps(dominant_colors(sys.argv[1], n), indent=2))
