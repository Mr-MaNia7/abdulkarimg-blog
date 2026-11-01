#!/usr/bin/env python3
"""
Build the self-hosted Ethiopic fonts from Google Fonts' variable sources (OFL).

    python3 scripts/fonts/ethiopic.py NotoSerifEthiopic[wdth,wght].ttf NotoSansEthiopic[wdth,wght].ttf

Sources: https://github.com/google/fonts/tree/main/ofl/notoserifethiopic and
.../notosansethiopic. Needs fontTools and brotli (pip install fonttools brotli).
Writes:
  public/fonts/v1/NotoSerifEthiopic.woff2        text face, weight 400-700
  public/fonts/v1/NotoSansEthiopic.woff2         interface face, weight 400-600
  public/fonts/v1/NotoSansEthiopic-labels.woff2  only the glyphs of the Amharic
      links shown on English pages (data/i18n/am.ts: inThisLanguage, readIn),
      so English pages never download the whole face for one link
  assets/og/fonts/NotoSerifEthiopic-{Regular,SemiBold}.ttf  for Open Graph cards
All are subset to the Ethiopic blocks with the width axis pinned at 100.
Rerun after changing those two strings, and rename public/fonts/v1 to v2
when any file changes (it is cached for a year).
"""
import os
import re
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BLOCKS = [(0x1200, 0x137F), (0x1380, 0x139F), (0x2D80, 0x2DDF), (0xAB00, 0xAB2F)]
ETHIOPIC = [c for a, b in BLOCKS for c in range(a, b + 1)]


def label_chars():
    """Ethiopic characters of the two strings English pages show (data/i18n/am.ts)."""
    text = open(os.path.join(ROOT, "data/i18n/am.ts"), encoding="utf8").read()
    strings = [re.search(r"^  %s: '([^']*)'" % key, text, re.M).group(1) for key in ("inThisLanguage", "readIn")]
    return sorted({ord(ch) for s in strings for ch in s if any(a <= ord(ch) <= b for a, b in BLOCKS)})


def build(source, weight, out, unicodes, flavor="woff2"):
    font = TTFont(source, lazy=False)
    options = subset.Options()
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.notdef_outline = True
    options.hinting = False
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    font = instancer.instantiateVariableFont(font, {"wdth": 100, "wght": weight})
    font.flavor = flavor
    path = os.path.join(ROOT, out)
    font.save(path)
    print(f"{out}: {os.path.getsize(path) // 1024} KB")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    serif, sans = sys.argv[1:]
    labels = label_chars()
    build(serif, (400, 700), "public/fonts/v1/NotoSerifEthiopic.woff2", ETHIOPIC)
    build(sans, (400, 600), "public/fonts/v1/NotoSansEthiopic.woff2", ETHIOPIC)
    build(sans, (400, 600), "public/fonts/v1/NotoSansEthiopic-labels.woff2", labels)
    build(serif, 400, "assets/og/fonts/NotoSerifEthiopic-Regular.ttf", ETHIOPIC, None)
    build(serif, 600, "assets/og/fonts/NotoSerifEthiopic-SemiBold.ttf", ETHIOPIC, None)
    print("Labels unicode-range for css/tailwind.css:")
    print("  unicode-range: " + ", ".join(f"U+{c:04X}" for c in labels) + ";")
