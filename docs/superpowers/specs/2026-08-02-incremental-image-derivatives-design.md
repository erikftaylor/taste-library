# Incremental Image Derivative Processing

## Goal

Make `scripts/resize-images.py --all` process only source images whose WebP
derivatives are missing or stale.

## Behavior

- Bulk mode scans supported source images in `images/`.
- A source is processed when either its thumbnail or display derivative is
  missing, or when the source modification time is newer than either output.
- Up-to-date sources are skipped and reported briefly.
- Explicit source paths retain force-regeneration behavior for maintenance
  tasks such as changing target dimensions or WebP quality.
- Existing derivative naming and output locations remain unchanged.

## Verification

Add regression coverage that creates a temporary source and derivative set,
confirms up-to-date files are skipped, confirms a missing derivative is
regenerated, and confirms an older derivative is regenerated after the source
changes.
