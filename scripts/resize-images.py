#!/usr/bin/env python3
"""Author-side tool: generate resized WebP derivatives for gallery images.

Usage:
  python3 scripts/resize-images.py <image-path>   # one image
  python3 scripts/resize-images.py --all           # every file directly in images/

Writes:
  images/thumbs/<basename>.webp    (card-grid thumbnail, ~640px wide)
  images/display/<basename>.webp   (modal display version, ~1600px wide)

Not loaded by the app itself - the app references the generated .webp
paths (data.js's `thumb`/`display` fields). Run this whenever a new
screenshot is added, before writing its data.js entry.
"""
import os
import sys

from PIL import Image

THUMB_WIDTH = 640
DISPLAY_WIDTH = 1600
IMAGES_DIR = os.path.join(os.path.dirname(__file__), '..', 'images')
THUMBS_DIR = os.path.join(IMAGES_DIR, 'thumbs')
DISPLAY_DIR = os.path.join(IMAGES_DIR, 'display')


def resized(img, target_width):
    if img.width <= target_width:
        return img
    target_height = round(img.height * (target_width / img.width))
    return img.resize((target_width, target_height), Image.LANCZOS)


def process(path):
    basename = os.path.splitext(os.path.basename(path))[0]
    img = Image.open(path).convert('RGB')

    os.makedirs(THUMBS_DIR, exist_ok=True)
    os.makedirs(DISPLAY_DIR, exist_ok=True)

    thumb_path = os.path.join(THUMBS_DIR, basename + '.webp')
    display_path = os.path.join(DISPLAY_DIR, basename + '.webp')

    resized(img, THUMB_WIDTH).save(thumb_path, 'WEBP', quality=82, method=6)
    resized(img, DISPLAY_WIDTH).save(display_path, 'WEBP', quality=85, method=6)

    thumb_kb = os.path.getsize(thumb_path) // 1024
    display_kb = os.path.getsize(display_path) // 1024
    print('{}: thumb={}KB display={}KB'.format(os.path.basename(path), thumb_kb, display_kb))


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python3 scripts/resize-images.py <image-path> | --all', file=sys.stderr)
        sys.exit(1)

    if sys.argv[1] == '--all':
        for name in sorted(os.listdir(IMAGES_DIR)):
            full = os.path.join(IMAGES_DIR, name)
            if os.path.isfile(full) and name.lower().endswith(('.png', '.jpg', '.jpeg')):
                process(full)
    else:
        process(sys.argv[1])
