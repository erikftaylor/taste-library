#!/bin/zsh
# Asserts every palette hex in data.js was drawn from its own screenshot.
#
#   NOT-IN-SAMPLE — the hex is not one the sampler proposes for that image, so
#                   it was eyedropped by memory, carried over from another
#                   entry, or left stale after a re-shoot
#   OVERCLAIMED   — the hex is real but is given a page-ground role while
#                   another palette entry covers far more of the image
#
# Both have happened here. adam-fard once carried a dark-charcoal "primary
# background" on a page that is 63% white, and experience-dynamics carried
# "#E86C3A coral" on a page whose CTAs are pink — that hex came from another
# entry and survived an area-based check by matching an orange third-party
# logo in a client logo wall.
#
# Presence alone cannot catch either, which is why verification is a
# provenance check: the palette must be drawn from what the tool proposed.
#
# Not part of `node --test` — needs Python and Pillow, and takes ~30s. Run it
# after touching any palette, and after replacing any screenshot.
set -eu

REPO_ROOT=${0:A:h:h}
cd "$REPO_ROOT"

if ! command -v python3 >/dev/null 2>&1; then
  print -u2 "SKIP: python3 not available"
  exit 0
fi
if ! python3 -c 'import PIL' >/dev/null 2>&1; then
  print -u2 "SKIP: Pillow not installed (pip3 install pillow)"
  exit 0
fi
if ! command -v node >/dev/null 2>&1; then
  print -u2 "SKIP: node not available (the verifier reads data.js through it)"
  exit 0
fi

print "Verifying every data.js palette against its screenshot..."
if python3 scripts/sample-palette.py --verify; then
  print "PASS: palette verification"
else
  print -u2 "FAIL: palette verification — see the entries listed above"
  exit 1
fi
