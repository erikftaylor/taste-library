#!/usr/bin/env python3
"""
Generate WebP derivatives (thumbnail and display versions) for images

Usage:
    python3 scripts/resize-images.py images/design.png
    python3 scripts/resize-images.py images/design-*.png
    python3 scripts/resize-images.py --all

These are full-page screenshots, so they are constrained by WIDTH only and
allowed to run as tall as they need. Pillow's thumbnail() fits inside BOTH
dimensions, which is wrong here: on a page six times taller than it is wide,
height binds and the width collapses. That is how the library ended up
shipping 49x720 display files that the modal then stretched to ~540 CSS px.

Sizing is driven by how the app actually presents them:
  .modal-image is half of a min(1080px, 96vw) modal -> ~540 CSS px wide,
    so 1440px of pixel data covers 2x displays with headroom.
  .card-image is 200px tall with object-fit: cover and object-position: top,
    inside a minmax(280px, 1fr) grid column -> only the top of the image is
    ever seen, so thumbs are cropped after scaling rather than squashed.
"""

import sys
import os
from pathlib import Path
from PIL import Image

DISPLAY_WIDTH = 1440        # ~2.7x the 540 CSS px the modal pane occupies
DISPLAY_MAX_PIXELS = 16_000_000   # ceiling so 15,000px-tall pages stay a sane size
DISPLAY_MIN_WIDTH = 1080    # 2x the pane; the pixel ceiling must never undercut this
THUMB_WIDTH = 800           # ~2x the widest a grid card gets
THUMB_MAX_HEIGHT = 600      # the card only ever shows the top strip
WEBP_QUALITY = 82


def ensure_dirs():
    """Create output directories if they don't exist."""
    Path('images/thumbs').mkdir(parents=True, exist_ok=True)
    Path('images/display').mkdir(parents=True, exist_ok=True)


def scale_to_width(img, width):
    """Scale by width, preserving aspect. Never upscales past the source."""
    if img.width <= width:
        return img
    height = max(1, round(img.height * width / img.width))
    return img.resize((width, height), Image.Resampling.LANCZOS)


def generate_display(image_path, output_path):
    """Full-width, unbounded height, with a total-pixel ceiling."""
    try:
        source_width = Image.open(image_path).width
        img = Image.open(image_path).convert('RGB')
        img = scale_to_width(img, DISPLAY_WIDTH)
        pixels = img.width * img.height
        if pixels > DISPLAY_MAX_PIXELS:
            capped = max(1, round(img.width * (DISPLAY_MAX_PIXELS / pixels) ** 0.5))
            # A very tall page can drive the pixel ceiling below the width the modal
            # needs. Legibility depends on horizontal resolution, so the floor wins.
            img = scale_to_width(img, max(capped, min(DISPLAY_MIN_WIDTH, source_width)))
        img.save(output_path, 'WEBP', quality=WEBP_QUALITY, method=6)
        return img.size
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None


def generate_thumb(image_path, output_path):
    """Scale to card width, then crop to the strip the card actually shows."""
    try:
        img = Image.open(image_path).convert('RGB')
        img = scale_to_width(img, THUMB_WIDTH)
        if img.height > THUMB_MAX_HEIGHT:
            img = img.crop((0, 0, img.width, THUMB_MAX_HEIGHT))
        img.save(output_path, 'WEBP', quality=WEBP_QUALITY, method=6)
        return img.size
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None


def process_image(image_path):
    """Generate thumbnail and display versions for an image."""
    image_path = Path(image_path)

    if not image_path.exists():
        print(f"⚠️  File not found: {image_path}")
        return False

    stem = image_path.stem
    thumb_path = Path('images/thumbs') / f"{stem}.webp"
    display_path = Path('images/display') / f"{stem}.webp"

    print(f"📸 Processing: {image_path}")

    success = True

    size = generate_thumb(str(image_path), str(thumb_path))
    if size:
        print(f"   ✓ Thumbnail: {size[0]}x{size[1]}")
    else:
        success = False

    size = generate_display(str(image_path), str(display_path))
    if size:
        kb = round(display_path.stat().st_size / 1024)
        print(f"   ✓ Display:   {size[0]}x{size[1]}  ({kb} KB)")
    else:
        success = False

    return success


def main():
    ensure_dirs()

    if len(sys.argv) < 2:
        print("Usage: python3 scripts/resize-images.py <image_path> [image_path2 ...]")
        print("       python3 scripts/resize-images.py --all")
        sys.exit(1)

    if sys.argv[1] == '--all':
        # Process all images in images/ directory
        image_paths = list(Path('images').glob('*.png')) + list(Path('images').glob('*.jpg')) + list(Path('images').glob('*.jpeg'))
        if not image_paths:
            print("❌ No images found in images/")
            sys.exit(1)
    else:
        # Process specified paths
        image_paths = []
        for pattern in sys.argv[1:]:
            matches = list(Path('.').glob(pattern))
            if matches:
                image_paths.extend(matches)
            else:
                image_paths.append(Path(pattern))

    if not image_paths:
        print("❌ No images to process")
        sys.exit(1)

    success_count = 0
    for image_path in image_paths:
        if process_image(image_path):
            success_count += 1

    print(f"\n✅ Processed {success_count}/{len(image_paths)} image(s)")


if __name__ == '__main__':
    main()
