#!/usr/bin/env python3
"""
Extract comprehensive color palettes from design screenshots and update data.js

Usage:
    python3 scripts/extract-comprehensive-colors.py images/new-design.png
    python3 scripts/extract-comprehensive-colors.py images/design-*.png
"""

import sys
import os
import json
import re
from pathlib import Path
from PIL import Image
from collections import Counter

def extract_dominant_colors(image_path, num_colors=8):
    """Extract dominant colors from an image."""
    try:
        img = Image.open(image_path)
        img = img.resize((150, 150))
        img = img.convert('RGB')

        pixels = list(img.getdata())

        # Filter out near-white, near-black, near-gray colors
        filtered = []
        for r, g, b in pixels:
            # Skip near-neutral colors
            if max(abs(r-g), abs(g-b), abs(r-b)) > 20:  # Not too gray
                # Skip very light colors
                if not (r > 240 and g > 240 and b > 240):
                    # Skip very dark colors
                    if not (r < 15 and g < 15 and b < 15):
                        filtered.append((r, g, b))

        if not filtered:
            filtered = pixels

        # Count color frequencies
        color_counts = Counter(filtered)
        most_common = color_counts.most_common(num_colors)

        colors = []
        for rgb, _ in most_common:
            hex_color = '#{:02X}{:02X}{:02X}'.format(rgb[0], rgb[1], rgb[2])
            colors.append({
                'name': rgb_to_color_name(rgb),
                'hex': hex_color,
                'usage': 'primary color'  # Default, user should customize
            })

        return colors
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return []

def rgb_to_color_name(rgb):
    """Generate a descriptive color name from RGB values."""
    r, g, b = rgb

    # Determine brightness
    brightness = (r + g + b) / 3

    # Determine dominant hue
    max_val = max(r, g, b)
    min_val = min(r, g, b)

    if max_val == min_val:
        if brightness > 200:
            return "Off-white"
        elif brightness > 150:
            return "Light gray"
        elif brightness > 100:
            return "Medium gray"
        else:
            return "Dark gray"

    if r == max_val:
        if g > b:
            return "Orange" if brightness > 150 else "Rust brown"
        else:
            return "Red" if brightness > 150 else "Dark red"
    elif g == max_val:
        if r > b:
            return "Yellow-green" if brightness > 150 else "Olive"
        else:
            return "Green" if brightness > 150 else "Dark green"
    else:  # b == max_val
        if r > g:
            return "Purple" if brightness > 150 else "Dark purple"
        else:
            return "Cyan" if brightness > 150 else "Teal"

def image_path_to_id(image_path):
    """Convert image path to data.js image ID."""
    filename = Path(image_path).stem
    # Convert spaces to hyphens and add -1 suffix for consistency
    image_id = filename.lower().replace(' ', '-')
    if not image_id.endswith('-1'):
        image_id += '-1'
    return image_id

def update_data_js(image_data_dict):
    """Update data.js with new color palettes."""
    data_js_path = '/Users/cerebra/Documents/GitHub/taste-library/data.js'

    with open(data_js_path, 'r') as f:
        data_content = f.read()

    # Update each image's colors
    for image_id, colors in image_data_dict.items():
        # Create the new colors array string
        colors_str = 'colors: [\n          ' + \
            ',\n          '.join([f'{{ name: \'{c["name"]}\', hex: \'{c["hex"]}\', usage: \'{c["usage"]}\' }}' for c in colors]) + \
            '\n        ]'

        # Find and replace the colors array for this image
        pattern = r"(id: '" + re.escape(image_id) + r"',.*?)(colors: \[.*?\]\s*[,}])"

        def replace_func(match):
            return match.group(1) + colors_str + ','

        data_content = re.sub(pattern, replace_func, data_content, flags=re.DOTALL)

    with open(data_js_path, 'w') as f:
        f.write(data_content)

    print(f"✅ Updated data.js with {len(image_data_dict)} image(s)")

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/extract-comprehensive-colors.py <image_path> [image_path2 ...]")
        print("Example: python3 scripts/extract-comprehensive-colors.py images/design.png")
        sys.exit(1)

    image_data_dict = {}

    # Process each image
    for image_pattern in sys.argv[1:]:
        # Handle glob patterns
        image_paths = list(Path('.').glob(image_pattern))

        if not image_paths:
            # Try as direct path
            image_paths = [Path(image_pattern)]

        for image_path in image_paths:
            if not image_path.exists():
                print(f"⚠️  File not found: {image_path}")
                continue

            print(f"📸 Extracting colors from: {image_path}")

            colors = extract_dominant_colors(str(image_path), num_colors=8)
            image_id = image_path_to_id(str(image_path))

            if colors:
                image_data_dict[image_id] = colors
                print(f"   ID: {image_id}")
                print(f"   Found {len(colors)} colors")

                # Print extracted colors for review
                for i, color in enumerate(colors, 1):
                    print(f"   {i}. {color['name']} ({color['hex']}) - {color['usage']}")
                print()

    if not image_data_dict:
        print("❌ No images processed")
        sys.exit(1)

    print("\n⚠️  IMPORTANT: Review the extracted colors above!")
    print("   - Color names and usage descriptions are auto-generated")
    print("   - Edit the colors in data.js manually to match your design system")
    print("   - Update 'usage' fields with accurate descriptions:")
    print("     • primary background, CTA button, text color, accent, etc.\n")

    response = input("Proceed with updating data.js? (yes/no): ").strip().lower()

    if response in ['yes', 'y']:
        update_data_js(image_data_dict)
        print("\n✅ Done! Reload http://127.0.0.1:8765/ to see the new colors")
    else:
        print("Cancelled.")

if __name__ == '__main__':
    main()
