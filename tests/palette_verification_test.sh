#!/bin/zsh
# Asserts every palette in data.js is grounded in its own screenshot.
#
# Two failure modes, both seen in this repo before commit fbbc1a6:
#   ABSENT      — a hex that does not occur in the image at all (invented,
#                 copied from a neighbouring entry, or stale after a re-shoot)
#   OVERCLAIMED — a hex that does occur but is given a page-ground role while
#                 another palette entry covers far more of the image
#
# The second is the one that mattered: all eight of adam-fard's wrong hexes
# were genuinely present, so presence-checking alone would have passed them.
#
# Not part of `node --test` — needs Python and Pillow. Run it after touching
# any palette, and after replacing any screenshot.
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
