#!/usr/bin/env python3
"""
Generate WebP derivatives (thumbnail and display versions) for images

Usage:
    python3 scripts/resize-images.py images/design.png
    python3 scripts/resize-images.py images/design-*.png
    python3 scripts/resize-images.py --all
"""

import sys
import os
from pathlib import Path
from PIL import Image

# Target sizes for derivatives
THUMB_SIZE = (280, 180)  # Thumbnail for grid
DISPLAY_SIZE = (1080, 720)  # Full modal display


def ensure_dirs():
    """Create output directories if they don't exist."""
    Path('images/thumbs').mkdir(parents=True, exist_ok=True)
    Path('images/display').mkdir(parents=True, exist_ok=True)


def generate_webp_derivative(image_path, output_path, size):
    """Convert and resize image to WebP format."""
    try:
        img = Image.open(image_path)
        img.thumbnail(size, Image.Resampling.LANCZOS)
        img.save(output_path, 'WEBP', quality=85)
        return True
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return False


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
    if generate_webp_derivative(str(image_path), str(thumb_path), THUMB_SIZE):
        print(f"   ✓ Thumbnail: {thumb_path}")
    else:
        success = False

    if generate_webp_derivative(str(image_path), str(display_path), DISPLAY_SIZE):
        print(f"   ✓ Display: {display_path}")
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
