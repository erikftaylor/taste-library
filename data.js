(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.TASTE_DATA = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  return {
    categories: [
      {
        id: 'illustrated-editorial-blocking',
        name: 'Illustrated Editorial Blocking',
        description: 'Hand-drawn single-line character illustration sitting on torn-edge watercolour wash fields, combined with hard-edge full-bleed colour blocks and marker-style highlighter accents on key words. Bold geometric grotesk headlines carry the page against generous white space. It reads as warm and slightly zine-like rather than corporate — used by consultancies that want to look like people rather than a firm.',
        vocabulary: [
          'single-line character illustration',
          'torn-edge watercolour wash',
          'highlighter marker emphasis',
          'hard-edge colour block',
          'hand-drawn connector thread',
          'tape-style button',
          'tracked all-caps eyebrow',
          'numbered ring badge'
        ],
        imageryTechnique: 'loose single-line vector illustration with minimal facial detail and no shading, sitting on a torn-edge watercolour wash field in a single flat hue, generous white negative space around the figures',
        imageryExclusions: 'no text, no interface elements, no logos, no gradients, no photographic texture',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 80px side margin',
          rhythm: 'section 12u · block 6u · inline 2u',
          typeScale: [
            ['Display', 'geometric grotesk, 700, tracking -2%', '7u', 1.05],
            ['Section head', 'geometric grotesk, 700, tracking -1%', '4u', 1.15],
            ['Body', 'grotesk, 400', '2.125u', 1.6],
            ['Eyebrow', 'grotesk, 500, uppercase, tracking +12%', '1.5u', 1.3]
          ],
          components: [
            ['Watercolour wash', 'torn organic edge, single flat hue, bleeds off the nearest page edge, sits behind the illustration'],
            ['Illustration', '1.5px uniform stroke, no fill and no shading, spans 4–6 columns'],
            ['Highlighter mark', '3u marker swipe behind 1–3 words, sits behind the glyphs'],
            ['Tape button', '5u tall, 2u × 4u padding, square corners, flat accent fill'],
            ['Pill CTA', '5u tall, fully rounded, near-black fill, all-caps label at eyebrow size'],
            ['Numbered ring badge', '5u circle, 1px stroke, numeral centred']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV      wordmark left · burger right   7u    │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — white                                  │',
          '│  ┌ 1–6 ─────────────┐ ┌ 7–12 ──────────────┐   │',
          '│  │ eyebrow          │ │ illustration       │   │',
          '│  │ display + marker │ │ over torn wash     │   │',
          '│  │ body             │ │ bleeding off right │   │',
          '│  └──────────────────┘ └────────────────────┘   │',
          '│         ╲  hand-drawn thread starts here       │',
          '├──────────╲────────────────────────────────────┤',
          '│  BLOCK 01 ╲ wash LEFT, copy RIGHT              │',
          '│  ┌ 1–6 wash┐        ┌ 7–11 ────────────────┐   │',
          '│  │ (bleeds ╲        │ ( 01 ) head          │   │',
          '│  │  off L) │╲       │ body · [pill CTA]    │   │',
          '│  └─────────┘ ╲      └──────────────────────┘   │',
          '├──────────────╲────────────────────────────────┤',
          '│  BLOCK 02  copy LEFT, wash RIGHT   ← zigzag    │',
          '│  ┌ 2–6 ───────┐    ┌ 7–12 wash (bleeds off R)┐ │',
          '│  │ ( 02 ) head│   ╱│                         │ │',
          '│  └────────────┘  ╱ └─────────────────────────┘ │',
          '├─────────────────╱─────────────────────────────┤',
          '│  CLOSING BAND — full-bleed accent wash         │',
          '│         head · body · [pill CTA]               │',
          '├───────────────────────────────────────────────┤',
          '│  FOOTER — full-bleed black                     │',
          '└───────────────────────────────────────────────┘',
          'The thread is one continuous drawn line crossing every block boundary. Alternate wash side each block; never place two washes on the same side in a row.'
        ]
      },
      {
        id: 'soft-gradient-ai-editorial',
        name: 'Soft Gradient AI Editorial',
        description: 'Pastel gradient-mesh washes in blush, periwinkle and peach under a fine grid texture, with product mockups floating above and a vertical dotted spine organising process steps. A serif-italic word interrupts the sans display line, and terracotta pills carry every call to action. Reads as calm and premium rather than loud — common on AI and automation consultancies.',
        vocabulary: [
          'pastel gradient-mesh wash',
          'fine grid texture overlay',
          'serif-italic accent word',
          'terracotta pill CTA',
          'vertical dotted spine',
          'ringed step numeral',
          'tinted tag pill',
          'floating product mockup'
        ],
        imageryTechnique: 'soft atmospheric gradient-mesh wash in two or three pastel hues under a faint square grid overlay, abstract and blurred like a colour field rather than a scene',
        imageryExclusions: 'no text, no interface elements, no logos, no hard edges, no illustrated figures, no visible banding',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 120px side margin (narrow measure, more air)',
          rhythm: 'section 16u · block 8u · inline 2u',
          typeScale: [
            ['Display', 'sans, 700, tracking -3%', '6u', 1.1],
            ['Accent word', 'serif italic, 400 — set inline inside the display line', '6u', 1.1],
            ['Section head', 'sans, 700, tracking -2%', '4u', 1.2],
            ['Body', 'sans, 400', '2u', 1.7],
            ['Eyebrow', 'sans, 600, uppercase, tracking +10%, accent colour', '1.5u', 1.3]
          ],
          components: [
            ['Gradient wash', 'full-bleed, 2–3 pastel hues, blur radius ≥ 25u, no banding'],
            ['Grid texture', '1px lines at 5u pitch, 4–6% opacity, over the wash only'],
            ['Product mockup', 'window chrome with traffic lights, 2u radius, floats 6u above the wash'],
            ['Pill CTA', '6u tall, 2.5u × 5u padding, fully rounded, terracotta fill, trailing arrow'],
            ['Dotted spine', '2px dotted vertical rule with cards alternating either side'],
            ['Step node', '3u ring centred on the spine, numeral at eyebrow size'],
            ['Tag pill', '2.5u tall, tinted accent fill, uppercase micro label']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — floats over the wash              7u    │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — full-bleed gradient wash + grid        │',
          '│      ┌ 3–10 · centred ─────────────────┐       │',
          '│      │ display with serif-italic accent│       │',
          '│      │ body (max 60ch)                 │       │',
          '│      │ [terracotta pill]  [ghost pill] │       │',
          '│      └─────────────────────────────────┘       │',
          '│      ┌ 2–11 — product mockup, floating ┐       │',
          '│      └─────────────────────────────────┘       │',
          '├───────────────────────────────────────────────┤',
          '│  OFFER — eyebrow + head, then 1 + 3 cards      │',
          '│  ┌ 1–12 wide card ────────────────────────┐    │',
          '│  └────────────────────────────────────────┘    │',
          '│  ┌ 1–4 ──┐ ┌ 5–8 ──┐ ┌ 9–12 ─┐                 │',
          '│  └───────┘ └───────┘ └───────┘                 │',
          '├───────────────────────────────────────────────┤',
          '│  PROCESS — vertical dotted spine at col 6.5    │',
          '│  ┌ 2–6 card ┐ ( 01 )                           │',
          '│  └──────────┘   ┊                              │',
          '│           ( 02 )┊ ┌ 7–11 card ┐                │',
          '│                 ┊ └───────────┘                │',
          '│  ┌ 2–6 card ┐ ( 03 )                           │',
          '│  └──────────┘   ┊                              │',
          '├───────────────────────────────────────────────┤',
          '│  CLOSE — ┌ 1–4 progress ┐ ┌ 5–12 form ┐        │',
          '└───────────────────────────────────────────────┘',
          'Content stays centred and narrow; the wash carries the width. Never full-bleed the text itself.'
        ]
      },
      {
        id: 'serif-editorial-evidence',
        name: 'Serif Editorial Evidence',
        description: 'Serif display type over pale tinted bands, where every claim is placed next to proof — a documentary photograph, a checkmark list, an oversized statistic, or a named quote with a face attached. Symmetry and restraint do the persuading. Common on consultancies selling seniority and outcomes rather than personality.',
        vocabulary: [
          'serif editorial display',
          'pale tinted full-bleed band',
          'documentary workshop photography',
          'checkmark evidence list',
          'oversized statistic numeral',
          'circular avatar attribution',
          'before-and-after comparison',
          'hairline-ruled list'
        ],
        imageryTechnique: 'real documentary-style photography of people working together in a professional setting, natural light, candid and unposed, muted colour grading',
        imageryExclusions: 'no text overlay, no interface elements, no logos, no illustration or vector art, no posed groups facing camera',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 72px side margin',
          rhythm: 'section 10u · block 5u · inline 1.5u',
          typeScale: [
            ['Display', 'serif, 400–600, tracking -1%', '5.5u', 1.15],
            ['Section head', 'serif, 600', '3.5u', 1.25],
            ['Statistic', 'serif or sans, 600, accent colour', '7u', 1],
            ['Body', 'sans, 400', '2u', 1.65],
            ['Eyebrow', 'sans, 600, uppercase, tracking +10%', '1.5u', 1.3]
          ],
          components: [
            ['Tinted band', 'full-bleed, 10u vertical padding, pale tint of the accent hue, no border or rule'],
            ['Photo block', '3:2 landscape, square corners, no filter beyond the colour grade'],
            ['Checkmark row', '2u glyph, 1.5u gap, rows 2u apart, arranged in two columns'],
            ['Statistic block', 'numeral at display size in the accent, caption beneath at eyebrow size'],
            ['Pull-quote', 'centred serif at 3.5u, 9u circular avatar beneath, attribution in the accent'],
            ['Bare-underline field', '1px bottom rule only, label above at eyebrow size, no box']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — solid, 8u, wordmark left                │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — white, ┌ 2–10 ─────────────────┐       │',
          '│                │ serif display, large  │       │',
          '│                │ body beneath          │       │',
          '│                └───────────────────────┘       │',
          '├───────────────────────────────────────────────┤',
          '│  CLAIM + PROOF — pale tinted band              │',
          '│  ┌ 1–5 photo 3:2 ─┐ ┌ 6–12 ──────────────┐     │',
          '│  │                │ │ serif head         │     │',
          '│  │                │ │ ✓ evidence row     │     │',
          '│  └────────────────┘ └────────────────────┘     │',
          '├───────────────────────────────────────────────┤',
          '│  COMPARISON — white, two equal halves          │',
          '│  ┌ 1–6 ────────────┬ 7–12 ───────────────┐     │',
          '│  │ ✓ what this is  │ ✓ what you get      │     │',
          '│  └─────────────────┴─────────────────────┘     │',
          '├───────────────────────────────────────────────┤',
          '│  STATS — 3–5 up, numeral over caption          │',
          '│   90%      60+      91%      65+               │',
          '├───────────────────────────────────────────────┤',
          '│  QUOTE — tinted band, centred                  │',
          '│        “ serif pull-quote, 3–4 lines ”         │',
          '│              ( ◯ ) name · role                 │',
          '├───────────────────────────────────────────────┤',
          '│  REQUEST — numbered list, then underline form  │',
          '└───────────────────────────────────────────────┘',
          'Claim and proof always share a row. A statement without adjacent evidence does not belong in this style.'
        ]
      },
      {
        id: 'dark-saturated-product-showcase',
        name: 'Dark Saturated Product Showcase',
        description: 'A near-black or deeply saturated canvas carrying exactly one high-chroma accent, with product screenshots, duotone photography and rounded media tiles doing the talking. Light panels appear as inset islands rather than as the page ground. Reads as technical and premium — common on agencies selling engineering depth rather than warmth.',
        vocabulary: [
          'near-black canvas',
          'single high-chroma accent',
          'rounded media tile',
          'inset light panel',
          'duotone photo grid',
          'oversized metric numeral',
          'pill tab row',
          'hairline-bordered dark card'
        ],
        imageryTechnique: 'product interface screenshots and duotone-graded photography on a dark ground, high contrast with cool shadows, a single saturated accent hue as the only colour present',
        imageryExclusions: 'no text overlay, no logos, no hand-drawn illustration, no pastel washes, no light backgrounds',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 80px side margin',
          rhythm: 'section 12u · block 5u · inline 2u',
          typeScale: [
            ['Display', 'sans, 600, tracking -2%', '6u', 1.1],
            ['Section head', 'sans, 600', '4u', 1.2],
            ['Metric', 'sans, 600, accent colour', '8u', 1],
            ['Body', 'sans, 400, white at 70–80% opacity', '2u', 1.6],
            ['Micro label', 'sans, 500, uppercase, tracking +8%', '1.5u', 1.3]
          ],
          components: [
            ['Dark card', '1px border at 10–15% white, 2u radius, 3u padding, transparent or 4% white fill'],
            ['Inset light panel', 'full-width island in cream or pale tint, 3u radius, 10u vertical padding'],
            ['Media tile', '16:9 or 21:9, 2u radius, screenshot or duotone photo, filling its column span'],
            ['Pill tab row', '5u tall pills, active state filled in the accent'],
            ['Accent CTA', '6u tall, fully rounded or 1u radius, saturated accent fill'],
            ['Metric block', 'numeral at 8u in the accent, caption beneath at micro-label size']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — transparent over the dark hero    7u    │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — dark, media right or full-bleed        │',
          '│  ┌ 1–6 ─────────────┐ ┌ 7–12 media ───────┐    │',
          '│  │ display          │ │ render / product  │    │',
          '│  │ body · [accent]  │ │ screenshot        │    │',
          '│  └──────────────────┘ └───────────────────┘    │',
          '├───────────────────────────────────────────────┤',
          '│  OFFER — 3 hairline dark cards                 │',
          '│  ┌ 1–4 ──┐ ┌ 5–8 ──┐ ┌ 9–12 ─┐                 │',
          '│  │ ✓ list│ │ ✓ list│ │ ✓ list│                 │',
          '│  └───────┘ └───────┘ └───────┘                 │',
          '├───────────────────────────────────────────────┤',
          '│  METRICS — accent numerals, caption beneath    │',
          '│    +83%        +94%        +91%                │',
          '├───────────────────────────────────────────────┤',
          '│  INSET LIGHT PANEL — cream island, 3u radius   │',
          '│  ┌ 1–12 ─────────────────────────────────┐     │',
          '│  │ tab row · content · media             │     │',
          '│  └───────────────────────────────────────┘     │',
          '├───────────────────────────────────────────────┤',
          '│  WORK — rounded media tiles, 2-up or stacked   │',
          '│  ┌ 1–6 ──────────┐ ┌ 7–12 ──────────────┐      │',
          '│  └───────────────┘ └────────────────────┘      │',
          '├───────────────────────────────────────────────┤',
          '│  FOOTER — darkest value on the page            │',
          '└───────────────────────────────────────────────┘',
          'One accent hue only. If a second colour appears it belongs to a screenshot, not to the page.'
        ]
      },
      {
        id: 'bone-canvas-minimal',
        name: 'Bone Canvas Minimal',
        description: 'A warm off-white or cool light-grey canvas held almost empty, with hairline rules, monochrome or line-art imagery, and a single saturated accent used sparingly enough to read as punctuation. Type does the structural work — either oversized to the point of bleeding off the page, or set very tight and small. Reads as confident and unhurried.',
        vocabulary: [
          'bone or light-grey canvas',
          'single punctuation accent',
          'hairline rule grid',
          'line-art isometric diagram',
          'monochrome media tile',
          'oversized display wordmark',
          'asymmetric tile placement',
          'micro caption pair'
        ],
        imageryTechnique: 'fine grey line-art diagrams with one saturated focal element, or desaturated near-monochrome interface and product photography; flat, no gradients, no illustrated figures',
        imageryExclusions: 'no text overlay, no logos, no multi-colour palettes, no drop shadows, no photographic warmth',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 96px side margin',
          rhythm: 'section 14u · block 7u · inline 2u',
          typeScale: [
            ['Oversized display', 'sans, 500–600, tracking -3%', '12u', 0.95],
            ['Section head', 'sans, 500', '3.5u', 1.2],
            ['Body', 'sans, 400', '2u', 1.6],
            ['Micro caption', 'sans, 400, uppercase, tracking +8%, muted', '1.25u', 1.3]
          ],
          components: [
            ['Canvas', 'warm off-white or cool light grey — never pure white'],
            ['Hairline cell', '1px rule at 8% ink, cells sized to the column grid, no fill'],
            ['Accent element', 'exactly one saturated hue, never more than about 2% of the visible area'],
            ['Media tile', 'placed asymmetrically against the grid, sized unevenly, no border or radius'],
            ['Caption pair', 'client left and discipline right, both at micro-caption size beneath the tile'],
            ['Small dark button', '4.5u tall, 1u radius, near-black fill']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — minimal, or a narrow left rail          │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — ┌ 1–7 ───────────────────┐             │',
          '│         │ oversized display type │  (5 empty)  │',
          '│         │ 2–4 lines, tight       │             │',
          '│         └────────────────────────┘             │',
          '│                                                │',
          '│                 (14u of empty canvas)          │',
          '├───────────────────────────────────────────────┤',
          '│  WORK — asymmetric tiles, uneven sizes         │',
          '│  ┌ 1–4 ─────┐                                  │',
          '│  │  tile    │      ┌ 6–12 ──────────────┐      │',
          '│  │          │      │  tile (larger)     │      │',
          '│  └──────────┘      │                    │      │',
          '│  client · type     └────────────────────┘      │',
          '│                    client · type               │',
          '├───────────────────────────────────────────────┤',
          '│  DIAGRAM — ┌ 1–5 copy ┐ ┌ 7–12 line-art ┐      │',
          '│            │          │ │   ● one accent │      │',
          '│            └──────────┘ └────────────────┘      │',
          '├───────────────────────────────────────────────┤',
          '│  LIST — hairline-ruled rows, no thumbnails     │',
          '│  ─────────────────────────────────────────     │',
          '│  ─────────────────────────────────────────     │',
          '├───────────────────────────────────────────────┤',
          '│  WORDMARK — oversized, bleeds off both edges   │',
          '└───────────────────────────────────────────────┘',
          'Empty canvas is a component here. If a section looks balanced, remove something.'
        ]
      },
      {
        id: 'bright-saas-utility',
        name: 'Bright SaaS Utility',
        description: 'A white ground with one bright primary hue, organised into conventional B2B marketing blocks — card grids, logo walls, review rows, product screenshots, accordions. The structure is familiar on purpose; the accent colour and the imagery style carry whatever personality there is. The workhorse pattern for agencies and research firms who want to look competent before they look distinctive.',
        vocabulary: [
          'white ground',
          'single bright primary',
          'product screenshot card',
          'grayscale logo wall',
          'star-rated review card',
          'icon-pattern tile',
          'accordion service list',
          'tinted section band'
        ],
        imageryTechnique: 'product interface screenshots, flat vector spot illustration with filled shapes, or candid team photography — clean, evenly lit, presented on white',
        imageryExclusions: 'no text overlay beyond the product UI itself, no dark canvases, no gradient mesh, no hand-drawn line work',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 80px side margin',
          rhythm: 'section 10u · block 5u · inline 2u',
          typeScale: [
            ['Display', 'sans or serif, 600–700, tracking -1%', '5.5u', 1.15],
            ['Section head', 'sans, 600', '3.5u', 1.25],
            ['Body', 'sans, 400', '2u', 1.6],
            ['Eyebrow', 'sans, 600, uppercase, tracking +8%, accent colour', '1.5u', 1.3]
          ],
          components: [
            ['Product card', 'white fill, 1px border at 10% ink, 1.5u radius, 3u padding'],
            ['Logo wall', 'grayscale marks on a pale band, 5–6 per row, evenly optically sized'],
            ['Review card', 'star row at 2u, quote at body size, attribution at eyebrow size'],
            ['Accent CTA', '5.5u tall, 1u radius or fully rounded, bright primary fill'],
            ['Tinted band', 'pale tint of the primary, 10u vertical padding, full-bleed'],
            ['Accordion row', '1px bottom rule, plus glyph right-aligned, 6u row height']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — solid white, accent CTA right     7u    │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — ┌ 1–6 ────────┐ ┌ 7–12 ───────────┐    │',
          '│         │ display     │ │ product shot or │    │',
          '│         │ body        │ │ spot illustration│   │',
          '│         │ [accent CTA]│ │                 │    │',
          '│         └─────────────┘ └─────────────────┘    │',
          '├───────────────────────────────────────────────┤',
          '│  LOGO WALL — pale band, grayscale, 5–6 up      │',
          '├───────────────────────────────────────────────┤',
          '│  SERVICES — card grid, 3 up (or 2 × 3)         │',
          '│  ┌ 1–4 ──┐ ┌ 5–8 ──┐ ┌ 9–12 ─┐                 │',
          '│  └───────┘ └───────┘ └───────┘                 │',
          '├───────────────────────────────────────────────┤',
          '│  PROOF — review cards or metric row, 3 up      │',
          '│  ┌ ★★★★★ ┐ ┌ ★★★★★ ┐ ┌ ★★★★★ ┐                 │',
          '│  └───────┘ └───────┘ └───────┘                 │',
          '├───────────────────────────────────────────────┤',
          '│  WORK — screenshot left, copy right, repeating │',
          '│  ┌ 1–6 shot ─────┐ ┌ 7–12 copy ─────────┐      │',
          '│  └───────────────┘ └────────────────────┘      │',
          '├───────────────────────────────────────────────┤',
          '│  FAQ — accordion rows, 1px rules               │',
          '├───────────────────────────────────────────────┤',
          '│  CTA BAND — accent or tinted, then footer      │',
          '└───────────────────────────────────────────────┘',
          'Conventional order is the point. Deviate in colour and imagery, not in structure.'
        ]
      },
      {
        id: 'annotated-display-typography',
        name: 'Annotated Display Typography',
        description: 'A page carried almost entirely by display type, with a hand-made mark breaking its formality — a highlighter swipe, a drawn circle, or a serif-italic aside cutting into a heavy caps line. Stark high-contrast bands, minimal ornament, and the annotation doing the emotional work that colour usually does. Reads as opinionated and editor-like.',
        vocabulary: [
          'heavy caps display',
          'serif-italic counterpoint',
          'hand-drawn circle annotation',
          'highlighter marker swipe',
          'stark black-and-white band',
          'arrow glyph link',
          'editorial news list',
          'thin vertical rule divider'
        ],
        imageryTechnique: 'brand and product work shown as flat colour tiles or in-context photography, high contrast and unfiltered; any drawn element is a single-stroke hand-made mark laid over the type',
        imageryExclusions: 'no text overlay, no gradient mesh, no pastel washes, no drop shadows, no decorative iconography',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 72px side margin',
          rhythm: 'section 12u · block 6u · inline 1.5u',
          typeScale: [
            ['Display caps', 'condensed sans, 700–800, uppercase, tracking -1%', '9u', 0.95],
            ['Italic counterpoint', 'serif italic, 400 — inline in or beneath the display line', '9u', 0.95],
            ['Section head', 'sans or serif, 600', '4u', 1.2],
            ['Body', 'sans, 400', '2u', 1.6],
            ['Micro label', 'sans, 600, uppercase, tracking +10%', '1.25u', 1.3]
          ],
          components: [
            ['Display block', 'type set to the full 12-column measure, 2–4 lines, no accompanying image'],
            ['Hand-drawn mark', 'single 2–3px stroke circle, underline or arrow in one accent hue, overlapping the type'],
            ['Highlighter swipe', '3u marker band behind 2–4 words, sitting behind the glyphs'],
            ['Contrast band', 'full-bleed pure black or pure white, 12u vertical padding, no border'],
            ['Arrow link', '→ glyph at body size in the accent, trailing the label'],
            ['Editorial list', 'hairline-ruled rows with a serif or caps title, no thumbnails']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — minimal, micro-label scale        7u    │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — display fills the full measure         │',
          '│  ┌ 1–12 ─────────────────────────────────┐     │',
          '│  │ HEAVY CAPS LINE ONE                   │     │',
          '│  │ HEAVY CAPS LINE TWO ⌒that don\'t.⌒     │     │',
          '│  │        ↑ serif-italic + drawn mark    │     │',
          '│  └───────────────────────────────────────┘     │',
          '├───────────────────────────────────────────────┤',
          '│  STATEMENT — full-bleed BLACK band             │',
          '│  ┌ 1–12 ─────────────────────────────────┐     │',
          '│  │ REAL CLIENTS. ⌐REAL numbers.⌐         │     │',
          '│  └───────────────────────────────────────┘     │',
          '├───────────────────────────────────────────────┤',
          '│  WORK — flat colour tiles, caption beneath     │',
          '│  ┌ 1–12 wide tile ──────────────────────┐      │',
          '│  └──────────────────────────────────────┘      │',
          '│  ┌ 1–6 ────────┐ ┌ 7–12 ───────────────┐       │',
          '│  └─────────────┘ └─────────────────────┘       │',
          '├───────────────────────────────────────────────┤',
          '│  SERVICES — accordion rows, → glyph right      │',
          '│  ─── PRODUCT STRATEGY & UX ──────────────  →   │',
          '│  ─── RESEARCH, TESTING & AUDITS ─────────  →   │',
          '├───────────────────────────────────────────────┤',
          '│  PRESS — editorial list, hairline rules only   │',
          '├───────────────────────────────────────────────┤',
          '│  FOOTER — inverted from the band above it      │',
          '└───────────────────────────────────────────────┘',
          'Exactly one hand-made mark per viewport. Two annotations in view cancel each other out.'
        ]
      },
      {
        id: 'enterprise-portal-utility',
        name: 'Enterprise Portal Utility',
        description: 'An internal-tools portal built from a scrimmed photographic hero, a grid of outlined line-art icons, and curved wave dividers that hand the page between light and dark bands. Unusually for this library it runs two accents rather than one — a warm amber carrying headlines, CTAs and statistics, and a corporate blue carrying navigation and iconography. Reads as institutional and service-like rather than persuasive: the job is wayfinding for colleagues, not conversion.',
        vocabulary: [
          'scrimmed photographic hero',
          'outlined circle line icon',
          'curved wave divider',
          'amber and blue dual accent',
          'capability tile grid',
          'oversized statistic on navy',
          'trailing arrow link',
          'in-page anchor sub-nav'
        ],
        imageryTechnique: 'corporate stock photography of people working, laid full-bleed under a heavy dark scrim so type sits directly on the image; supporting graphics are thin line-art glyphs, never filled illustration',
        imageryExclusions: 'no text overlay baked into the photograph, no logos, no gradient mesh, no hand-drawn marks, no filled or shaded illustration',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 80px side margin',
          rhythm: 'section 10u · block 5u · inline 2u',
          typeScale: [
            ['Display', 'sans, 600, tracking -1%', '5u', 1.2],
            ['Section head', 'sans, 600, amber accent', '3u', 1.25],
            ['Tile title', 'sans, 600', '2.25u', 1.35],
            ['Body', 'sans, 400', '2u', 1.6],
            ['Statistic', 'sans, 300, amber accent', '8u', 1],
            ['Link', 'sans, 400, trailing arrow glyph', '1.75u', 1.4]
          ],
          components: [
            ['Scrimmed hero', 'full-bleed photograph under a 55–70% dark scrim, 14u vertical padding, type sits directly on it'],
            ['Outlined icon', '7u circle, 1.5px stroke in the blue accent, line-art glyph centred inside'],
            ['Capability tile', '3-column span, icon above title above 2–3 lines of body, 5u row gap, no border or fill'],
            ['Curved divider', 'full-width wave of 3–5u amplitude handing a light band into a dark one'],
            ['Statistic block', 'numeral at 8u in amber, caption beneath at body size with the figure bolded'],
            ['Solid CTA', '5u tall, 0.5u radius, amber fill, white label — square-ish, never a pill'],
            ['Anchor sub-nav', '6u band in the blue accent holding in-page anchor links inline']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — white, wordmark left, [blue CTA] right  │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — full-bleed photo under a dark scrim    │',
          '│  ┌ 1–7 ──────────────────┐  photo subject      │',
          '│  │ amber word + display  │  bleeds right       │',
          '│  │ [search] or [amber CTA]│                    │',
          '│  └───────────────────────┘                     │',
          '│  ┌ 1–6 ───────────┐ ┌ 7–12 ──────────────┐     │',
          '│  │ News & updates │ │ Spotlight          │     │',
          '│  │ link →         │ │ ★ link →           │     │',
          '│  └────────────────┘ └────────────────────┘     │',
          '├───────────────────────────────────────────────┤',
          '│  ANCHOR SUB-NAV — blue band, in-page links     │',
          '├───────────────────────────────────────────────┤',
          '│  CAPABILITY GRID — light band, 4 across        │',
          '│  ( ◯ )      ( ◯ )      ( ◯ )      ( ◯ )        │',
          '│  title      title      title      title        │',
          '│  body       body       body       body         │',
          '│  ( ◯ )      ( ◯ )      ( ◯ )      ( ◯ )        │',
          '├──╲────────────────────────────────╱───────────┤',
          '│    ╲──────  CURVED WAVE DIVIDER ─╱             │',
          '├───────────────────────────────────────────────┤',
          '│  DARK BAND — stats or resource links           │',
          '│    2,551        1,770         235              │',
          '│    caption      caption       caption          │',
          '└───────────────────────────────────────────────┘',
          'Light and dark bands alternate, and every transition between them is a curve rather than a straight edge. Amber never carries navigation; blue never carries a statistic.'
        ]
      },
      {
        id: 'diagnostic-framework-serif',
        name: 'Diagnostic Framework Serif',
        description: 'A consultancy page that argues by structure rather than by persuasion: an editorial serif carries the claims, and every claim is anchored by a monospaced micro-label naming the methodology behind it. Content resolves into bordered parameter grids, numbered ordered steps, and colour-coded taxonomy tags. The canvas is warm bone with a single deep teal used so sparingly it reads as punctuation. Reads as diagnostic and accountable — the visual language of an audit rather than a pitch.',
        vocabulary: [
          'editorial serif claim',
          'monospaced methodology label',
          'bordered parameter grid',
          'numbered ordered step',
          'colour-coded taxonomy tag',
          'warm bone band',
          'sparse teal accent',
          'hairline step divider'
        ],
        imageryTechnique: 'minimal analytical line graphics — a single-stroke trend line or small chart on a flat tinted plate; no photography, no illustrated figures, no icons',
        imageryExclusions: 'no photography, no illustrated figures, no decorative iconography, no gradients, no drop shadows',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 96px side margin',
          rhythm: 'section 12u · block 5u · inline 1.5u',
          typeScale: [
            ['Display', 'serif, 600, tracking -1%', '5u', 1.15],
            ['Section head', 'serif, 600', '3u', 1.25],
            ['Statement', 'serif, 400 — a full-width paragraph set at heading size', '2.75u', 1.45],
            ['Body', 'sans, 400', '1.75u', 1.6],
            ['Methodology label', 'mono, 400, uppercase, tracking +10%, muted', '1.25u', 1.4],
            ['Step numeral', 'sans, 400, teal accent', '2.5u', 1.2]
          ],
          components: [
            ['Bone band', 'full-bleed warm off-white, 12u vertical padding, no border, alternating with the lighter ground'],
            ['Parameter grid', '4 columns × 2 rows of bordered cells, 1px rules shared between cells, 2.5u padding'],
            ['Methodology label', 'mono caps directly beneath the cell title, naming the standard the finding is scored against'],
            ['Ordered step', 'teal numeral above a hairline rule, title beneath, closing mono line stating the deliverable'],
            ['Taxonomy tag', '2.5u pill, 1px border and pale tint of its own hue, mono uppercase label with a leading glyph'],
            ['Teal CTA', '4.5u tall, 0.25u radius, solid teal fill; the secondary is the same box with a 1px border and no fill'],
            ['Analytical plate', 'flat tinted rectangle carrying a single-stroke line chart, no axes or labels']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — wordmark left · links · [teal CTA]      │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — light ground                           │',
          '│  ┌ 1–6 ──────────────┐  ┌ 8–12 ────────────┐   │',
          '│  │ MONO EYEBROW      │  │ tinted plate     │   │',
          '│  │ serif display     │  │  ╱╲  ╱╲╱╲        │   │',
          '│  │ body              │  │ ╱  ╲╱     ╲      │   │',
          '│  │ [teal] [outlined] │  └──────────────────┘   │',
          '│  ├ 1–5 tinted note ──┤                         │',
          '│  └───────────────────┘                         │',
          '├───────────────────────────────────────────────┤',
          '│  STATEMENT — bone band, MONO EYEBROW above     │',
          '│  ┌ 1–9 serif paragraph at heading size ────┐   │',
          '│  └──────────────────────────────────────────┘  │',
          '├───────────────────────────────────────────────┤',
          '│  PROCESS — 4 ordered steps, hairline above each │',
          '│  01 ──────  02 ──────  03 ──────  04 ──────    │',
          '│  title      title      title      title        │',
          '│  body       body       body       body         │',
          '│  MONO       MONO       MONO       MONO         │',
          '├───────────────────────────────────────────────┤',
          '│  FRAMEWORK — bone band, bordered 4 × 2 grid    │',
          '│  ┌──────┬──────┬──────┬──────┐                 │',
          '│  │ title│ title│ title│ title│                 │',
          '│  │ MONO │ MONO │ MONO │ MONO │                 │',
          '│  ├──────┼──────┼──────┼──────┤                 │',
          '│  └──────┴──────┴──────┴──────┘                 │',
          '│  SEVERITY ◆med ◆high ▲crit   EFFORT ▪▫▫ ▪▪▫ ▪▪▪ │',
          '└───────────────────────────────────────────────┘',
          'Every claim carries a mono label naming what it is scored against. A claim with no citation beneath it does not belong in this style.'
        ]
      },
      {
        id: 'monochrome-single-hue-system',
        name: 'Monochrome Single-Hue System',
        description: 'One hue does everything. A single saturated colour carries type, fills, borders, illustration and even photography — there is no second accent and no neutral beyond the paper the page sits on. A workhorse display face is interrupted by a serif-italic counterpoint that supplies the warmth the palette refuses to. Reads as disciplined and brand-forward: the constraint itself is the identity.',
        vocabulary: [
          'single-hue constraint',
          'duotone-tinted photography',
          'serif-italic counterpoint',
          'hue-filled full-bleed band',
          'reversed knockout type',
          'tracked micro caps chip',
          'hue-only line illustration',
          'dashed outline panel'
        ],
        imageryTechnique: 'photography duotone-mapped entirely into the single brand hue, or line illustration drawn in that hue at uniform stroke — no second colour appears anywhere in the image',
        imageryExclusions: 'no second hue, no full-colour photography, no gradients, no drop shadows, no greyscale midtones beyond the paper stock',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 80px side margin',
          rhythm: 'section 12u · block 5u · inline 2u',
          typeScale: [
            ['Display', 'sans or serif, 400–700, tracking -1%', '5.5u', 1.1],
            ['Italic counterpoint', 'serif italic, 400 — set inline inside the display line', '5.5u', 1.1],
            ['Section head', 'heavy sans, 700, often uppercase', '4u', 1.15],
            ['Body', 'sans or mono, 400', '1.75u', 1.6],
            ['Micro label', 'mono or sans, 500, uppercase, tracking +12%', '1.25u', 1.3]
          ],
          components: [
            ['Hue-filled band', 'full-bleed flat fill of the single hue, all type reversed to the paper colour'],
            ['Duotone image', 'photograph mapped entirely into the hue, no residual colour anywhere'],
            ['Counterpoint phrase', '1–3 words in serif italic, set inline at display size'],
            ['Micro chip', '3u tall, solid hue fill, paper-coloured mono caps'],
            ['Outline panel', '1px solid or dashed border in the hue, no fill'],
            ['Hue line illustration', 'uniform stroke in the hue, no fill and no shading']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — hue on paper, [hue-filled CTA] right    │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — paper ground                           │',
          '│  ┌ 1–7 ─────────────────────┐                  │',
          '│  │ [micro chip]             │                  │',
          '│  │ display with *italic*    │                  │',
          '│  │ counterpoint inline      │                  │',
          '│  │ [hue CTA]                │                  │',
          '│  └──────────────────────────┘                  │',
          '│  ┌ 1–12 duotone image or hue-filled panel ──┐   │',
          '│  └──────────────────────────────────────────┘   │',
          '├───────────────────────────────────────────────┤',
          '│  STATEMENT — full-bleed HUE, type knocked out  │',
          '│      (italic aside)                            │',
          '│      HEAVY CAPS DISPLAY LINE                   │',
          '│      supporting columns · logo row             │',
          '├───────────────────────────────────────────────┤',
          '│  DETAIL — paper ground, outline panels          │',
          '│  ┌ 1–4 ──┐ ┌ 5–8 ──┐ ┌ 9–12 ─┐                 │',
          '│  │ hue   │ │ hue   │ │ hue   │  1px borders    │',
          '│  │ glyph │ │ glyph │ │ glyph │  in the hue     │',
          '│  └───────┘ └───────┘ └───────┘                 │',
          '├───────────────────────────────────────────────┤',
          '│  CLOSE — full-bleed HUE, reversed type + form  │',
          '└───────────────────────────────────────────────┘',
          'If a second colour is needed, the design has failed. Contrast comes from filling with the hue and knocking type out of it, not from adding another.'
        ]
      },
      {
        id: 'warm-serif-colour-system',
        name: 'Warm Serif Colour System',
        description: 'A warm bone ground and an elegant light serif worked against a fixed set of four or five saturated accents that repeat as a system — one per quote card, one per process step, one per stripe. Posed portrait photography and named first-person quotes keep it personal rather than institutional. Reads as approachable expertise: serious method delivered warmly, by people who want you to know their names.',
        vocabulary: [
          'warm bone ground',
          'light serif display',
          'fixed multi-accent set',
          'colour-coded quote card',
          'chevron process band',
          'multi-colour stripe divider',
          'circular portrait',
          'tinted form panel'
        ],
        imageryTechnique: 'bright posed portrait photography of real named people in real interiors, warm natural light, cut to circles or soft-cornered rectangles',
        imageryExclusions: 'no stock imagery, no illustration, no duotone treatment, no dark colour grading, no anonymous crowds',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 80px side margin',
          rhythm: 'section 10u · block 5u · inline 2u',
          typeScale: [
            ['Display', 'serif, 300–400, tracking -1%', '5u', 1.2],
            ['Section head', 'serif, 400', '3.5u', 1.25],
            ['Step title', 'serif, 400', '2.5u', 1.3],
            ['Body', 'sans, 400', '1.75u', 1.6],
            ['Eyebrow', 'sans, 700, uppercase, tracking +12%, accent colour', '1.25u', 1.3]
          ],
          components: [
            ['Accent set', 'four or five fixed saturated hues, reused in the same order across quotes, steps and stripes'],
            ['Quote card', '4-column span, one accent fill per card, attribution in bold caps beneath'],
            ['Chevron step band', 'dark full-bleed band holding arrow-shaped steps, one accent each, icon centred'],
            ['Stripe divider', 'full-width bar split into the accent set, 1.5u tall'],
            ['Circular portrait', '18u circle, warm natural light, name and role beside it'],
            ['Tinted form panel', 'inset panel in the palest accent, 2u radius, 6u padding']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — centred serif wordmark on bone          │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — ┌ 1–5 portrait ┐ ┌ 6–12 ───────────┐   │',
          '│         │ + badge ring │ │ EYEBROW         │   │',
          '│         │              │ │ serif display   │   │',
          '│         └──────────────┘ │ [accent CTA]    │   │',
          '│                          └─────────────────┘   │',
          '├───────────────────────────────────────────────┤',
          '│  QUOTES — row of colour-coded cards, scrolling │',
          '│  ┌ blue ┐ ┌ white ┐ ┌ mint ┐ ┌ amber ┐         │',
          '│  └──────┘ └───────┘ └──────┘ └───────┘         │',
          '├───────────────────────────────────────────────┤',
          '│  PROCESS — full-bleed DARK band                │',
          '│   ▶blue ▶slate ▶amber ▶mint ▶coral ▶▶          │',
          '│   STEP 1  STEP 2  STEP 3  STEP 4  STEP 5       │',
          '├──── multi-colour stripe divider ──────────────┤',
          '│  COMMITMENT — bone, serif head + photo right   │',
          '├───────────────────────────────────────────────┤',
          '│  TEAM — ( ◯ ) portrait alternating side to side │',
          '│         name · role in accent caps             │',
          '├───────────────────────────────────────────────┤',
          '│  FORM — inset panel in the palest accent       │',
          '└───────────────────────────────────────────────┘',
          'The accent set is fixed and ordered. Reuse the same sequence in every component rather than picking a colour per element.'
        ]
      },
      {
        id: 'surreal-scale-minimal',
        name: 'Surreal Scale Minimal',
        description: 'Near-empty white space with one muted hue, where the imagery does the arguing — photoreal renders at impossible scale, tiny figures pushing, climbing and balancing giant geometric solids against pale cloud backdrops. Type is quiet sans set in the accent and never grows large. Reads as considered and unhurried, with the metaphor carrying what copy would otherwise have to spell out.',
        vocabulary: [
          'near-empty white ground',
          'single muted accent',
          'surreal miniature render',
          'oversized geometric solid',
          'pale cloud backdrop',
          'quiet sans heading',
          'plus-glyph accordion list',
          'full-bleed accent footer'
        ],
        imageryTechnique: 'photoreal 3D render at miniature scale — tiny human figures interacting with oversized geometric solids (cube, sphere, seesaw, stepped columns) on a pale seamless backdrop with soft cloud, desaturated throughout',
        imageryExclusions: 'no photography of real interiors, no line illustration, no saturated colour, no text overlay, no hard shadows',
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 96px side margin',
          rhythm: 'section 20u · block 8u · inline 2u',
          typeScale: [
            ['Display', 'sans, 300–400, accent colour', '4u', 1.3],
            ['Section head', 'sans, 400, accent colour', '3u', 1.3],
            ['Body', 'sans, 400, muted grey', '1.75u', 1.7],
            ['List row', 'sans, 400, accent colour, with a trailing plus glyph', '2u', 1.5]
          ],
          components: [
            ['Render block', 'full-bleed or 6-column, pale seamless backdrop, figures at miniature scale'],
            ['Quiet heading', 'set in the accent at 4u — deliberately small for its position'],
            ['Accordion row', '1px bottom rule in the accent, plus glyph right-aligned, 5u row height'],
            ['Small solid CTA', '4u tall, no radius, accent fill, white label'],
            ['Accent footer', 'full-bleed band in the accent, centred white type'],
            ['Empty space', 'at least 20u between sections — the dominant component on the page']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  NAV — wordmark left · links · [accent CTA]    │',
          '├───────────────────────────────────────────────┤',
          '│  HERO — pale cloud backdrop, full-bleed        │',
          '│  ┌ 1–5 ────────┐        render: figure atop    │',
          '│  │ two-line    │        stepped columns,       │',
          '│  │ sans head   │        bleeding right         │',
          '│  └─────────────┘                               │',
          '├───────────────────────────────────────────────┤',
          '│                (20u of empty ground)           │',
          '│  ┌ 1–5 copy ────┐   ┌ 7–12 render ─────────┐   │',
          '│  │ accent head  │   │ figure + cube        │   │',
          '│  │ body · [CTA] │   └──────────────────────┘   │',
          '│  └──────────────┘                              │',
          '├───────────────────────────────────────────────┤',
          '│  ┌ 1–12 full-bleed render ─────────────────┐   │',
          '│  │  figure pushes cube    figure rolls ball │   │',
          '│  └──────────────────────────────────────────┘  │',
          '├───────────────────────────────────────────────┤',
          '│  SERVICES — ┌ 1–5 copy ┐ ┌ 7–12 accordion ┐    │',
          '│             └──────────┘ │ row          + │    │',
          '│                          │ row          + │    │',
          '│                          └────────────────┘    │',
          '├───────────────────────────────────────────────┤',
          '│  FOOTER — full-bleed accent, centred white     │',
          '└───────────────────────────────────────────────┘',
          'The render is the argument. If a section can be carried by an image at impossible scale, do not write a paragraph for it.'
        ]
      }
    ],
    images: [
      {
        id: 'usman-home',
        file: 'images/Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.png',
        thumb: 'images/thumbs/Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.webp',
        display: 'images/display/Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.webp',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — Homepage',
        descriptor: 'Hand-drawn line-art figures on torn-edge watercolour washes, threaded together by a single continuous drawn line.',
        keywords: [
          'single-line illustration',
          'torn-edge watercolour wash',
          'hand-drawn connector thread',
          'numbered ring badge',
          'highlighter marker emphasis',
          'dark pill CTA',
          'rotated vertical eyebrow',
          'zigzag block alternation'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground, all content sections' },
          { name: 'Ink black', hex: '#060606', usage: 'display headlines, body copy, footer' },
          { name: 'Mustard-gold wash', hex: '#FFD969', usage: 'watercolour field behind hero and closing illustrations, closing CTA band' },
          { name: 'Pale cyan wash', hex: '#93F5F5', usage: 'watercolour field behind the research block' },
          { name: 'Coral red wash', hex: '#FF6969', usage: 'watercolour field behind the guidance block' },
          { name: 'Highlighter yellow', hex: '#FFD977', usage: 'marker swipe behind key headline words' },
          { name: 'Charcoal pill', hex: '#2C2C2C', usage: 'pill CTA fill' }
        ],
        typography: 'Geometric grotesk throughout — display at roughly 56px/700 with tight tracking, body at 17px/400, and 12px all-caps eyebrows tracked wide ("HI THERE"). One eyebrow is rotated 90° and set vertically down the left margin ("THREAD ON").',
        layoutNotes: 'White ground with illustration blocks alternating left and right. A hand-drawn connector line runs the full page height, stepping between sections and physically joining them. Watercolour washes have torn organic edges and bleed off the left or right edge rather than sitting inside the grid. Numbered ring badges mark each block. A full-bleed mustard CTA band sits above the black footer.',
        imagerySubject: 'two people collaborating at a whiteboard, sketching a diagram',
        mood: ['approachable', 'optimistic', 'human', 'confident'],
        signature: [
          'A single hand-drawn line runs the full page height, stepping left and right to physically connect every section',
          'Watercolour washes have torn organic edges and bleed off the page edge — never rectangles sitting inside the grid',
          'Numbered ring badges (01, 02, 03) sit above each block heading, stroke colour matching the adjacent wash',
          'CTA labels are imperative and playful ("PROVE IT", "LET\'S TALK"), tracked all-caps on near-black pills',
          'A rotated eyebrow ("THREAD ON") runs 90° down the left margin of the first block'
        ]
      },
      {
        id: 'usman-blog',
        file: 'images/Business-Communication-Digital-Strategy-Blog-by-Usman-Group.png',
        thumb: 'images/thumbs/Business-Communication-Digital-Strategy-Blog-by-Usman-Group.webp',
        display: 'images/display/Business-Communication-Digital-Strategy-Blog-by-Usman-Group.webp',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — Blog Index',
        descriptor: 'Full-bleed 2×2 grid of saturated colour cards with no gutters, above a black footer.',
        keywords: [
          'gutterless colour card grid',
          'hard-edge colour block',
          'arrow glyph link',
          'squiggle tab underline',
          'tape-style button',
          'single-line illustration',
          'tracked all-caps eyebrow',
          'black full-bleed footer'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'featured hero and filter bar' },
          { name: 'Ink black', hex: '#060606', usage: 'all type and the full-bleed footer' },
          { name: 'Mustard-gold', hex: '#FFD969', usage: 'first article card fill' },
          { name: 'Pale cyan', hex: '#77FFFF', usage: 'second article card fill' },
          { name: 'Coral red', hex: '#FF4D4D', usage: 'third article card fill' },
          { name: 'Mint green', hex: '#77F5A1', usage: 'fourth article card fill' },
          { name: 'Highlighter yellow', hex: '#FFD977', usage: 'tape-style READ IT button, newsletter JOIN button' }
        ],
        typography: 'Geometric grotesk: featured headline at roughly 44px/700, card titles at 30px/700, body at 16px/400, and 11px all-caps tracked eyebrows ("FEATURED ARTICLE", "ARTICLES") sitting above a short black rule.',
        layoutNotes: 'Featured article as a white split hero — headline and tape button left, single-line illustration right with a gold wash under the figures only. Below it a full-bleed 2×2 grid of saturated colour cards with zero gutters, edges meeting flush. Each card carries an eyebrow, short rule, title, body and a long arrow. A filter tab row sits between hero and grid.',
        imagerySubject: 'four musicians playing instruments together in a loose group',
        mood: ['playful', 'editorial', 'direct', 'energetic'],
        signature: [
          'Article cards form a full-bleed 2×2 grid with zero gutters — colour fields meet flush, no borders or radii',
          'A long → arrow is the only link affordance on each card, bottom-left, with no button around it',
          'The active filter tab is marked with a hand-drawn squiggle underline rather than a solid rule',
          'The featured CTA is a tape-style rectangle in highlighter yellow, not the site\'s usual dark pill',
          'Watercolour wash appears only beneath the illustration\'s feet, acting as a ground line rather than a field'
        ]
      },
      {
        id: 'usman-contact',
        file: 'images/Contact-Usman-Group.png',
        thumb: 'images/thumbs/Contact-Usman-Group.webp',
        display: 'images/display/Contact-Usman-Group.webp',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — Contact',
        descriptor: 'The contact form written as one running sentence at headline size, with underlined blanks standing in for inputs.',
        keywords: [
          'mad-lib sentence form',
          'inline underlined input',
          'mint highlighter swipe',
          'tape-style button',
          'watercolour wash',
          'single-line illustration',
          'floating field label',
          'black full-bleed footer'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'hero section ground' },
          { name: 'Off-white', hex: '#F6F6F6', usage: 'form section ground' },
          { name: 'Ink black', hex: '#060606', usage: 'all type and the full-bleed footer' },
          { name: 'Mint green', hex: '#69F593', usage: 'highlighter swipe, input underlines, SEND button' },
          { name: 'Pale mint wash', hex: '#77F5A1', usage: 'watercolour field behind the hero illustration' },
          { name: 'Grey label', hex: '#999999', usage: 'floating field labels above each blank' }
        ],
        typography: 'Geometric grotesk: hero display at roughly 48px/700; the form itself set at 28px/700 as running prose with inline blanks; field labels at 11px all-caps tracked, floating above each blank in grey.',
        layoutNotes: 'Hero splits headline left — with a mint highlighter swipe on key words — against a single-line illustration right sitting over a mint wash. The form below is one continuous sentence at headline size with underlined blanks in place of inputs. A tape-style mint SEND button closes it, above the black footer.',
        imagerySubject: 'two people talking across armchairs, one holding a flag-like banner',
        mood: ['warm', 'conversational', 'inviting', 'informal'],
        signature: [
          'The contact form is a mad-lib: one running sentence at headline size with inline underlined blanks as the inputs',
          'Field labels float above each blank in small grey caps, inside the sentence flow rather than beside it',
          'Every input is a 2px mint underline — no boxes, no fills, no borders anywhere in the form',
          'Mint replaces the site\'s usual yellow across this whole page, including the highlighter swipe',
          'The SEND button is a tape-style rectangle matching the blanks, not the site\'s dark pill CTA'
        ]
      },
      {
        id: 'usman-about',
        file: 'images/Web-Consultant-Marketing-Design-Development-Consulting.png',
        thumb: 'images/thumbs/Web-Consultant-Marketing-Design-Development-Consulting.webp',
        display: 'images/display/Web-Consultant-Marketing-Design-Development-Consulting.webp',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — About / Team',
        descriptor: 'Hard-edge three-up colour panel and a full-bleed coral team grid of black-and-white portraits.',
        keywords: [
          'hard-edge colour panel',
          'checkmark value list',
          'black-and-white portrait grid',
          'dot-grid texture',
          'marker strike-through',
          'coloured accordion bar',
          'horizontal timeline card',
          'tracked all-caps eyebrow'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground' },
          { name: 'Coral red', hex: '#FF4D4D', usage: 'full-bleed team section and closing CTA band' },
          { name: 'Mustard-gold', hex: '#FFD969', usage: '"We know what works" panel fill' },
          { name: 'Pale cyan', hex: '#77FFFF', usage: '"WE ARE" value panel fill' },
          { name: 'Mint green', hex: '#77F5A1', usage: '"WE DELIVER" value panel fill' },
          { name: 'Ink black', hex: '#060606', usage: 'type and the full-bleed footer' },
          { name: 'Off-white', hex: '#F6F6F6', usage: 'dot-grid textured sections' }
        ],
        typography: 'Geometric grotesk: section heads at 30px/700, three-up panel headings at 22px/700, 11px all-caps tracked eyebrows ("WE ARE", "WE BELIEVE", "WE DELIVER"), and history-card years at 28px/700 struck through with a red marker line.',
        layoutNotes: 'A hard-edge three-up colour panel (cyan, coral, mint) carries eyebrow, heading and checkmark list in each cell, meeting flush with no gutters. Faint dot-grid texture fills the white sections. A full-bleed coral team section holds a five-across grid of black-and-white square portraits. Below it a horizontal timeline of bordered cards with arrow navigation, then coloured accordion bars and a coral closing band.',
        imagerySubject: 'three people gathered around a large whiteboard, one gesturing at a diagram',
        mood: ['candid', 'collective', 'warm', 'plainspoken'],
        signature: [
          'Three value panels sit flush as one hard-edge colour band, each with its own eyebrow, heading and checkmark list',
          'Team portraits are black-and-white squares in a five-across grid on a full-bleed coral ground',
          'Year headings in the history cards are struck through with a hand-drawn red marker line',
          'Faint dot-grid texture fills the white sections — the only texture anywhere in the site',
          'Service categories appear as full-width coloured accordion bars with a caret at the right edge'
        ]
      },
      {
        id: 'chase-ai-homepage',
        file: 'images/Chase-AI-Turn-AI-Into-Your-Unfair-Advantage.png',
        thumb: 'images/thumbs/Chase-AI-Turn-AI-Into-Your-Unfair-Advantage.webp',
        display: 'images/display/Chase-AI-Turn-AI-Into-Your-Unfair-Advantage.webp',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'Chase AI — Homepage',
        descriptor: 'Pastel gradient mesh under a fine grid texture, with a light code-editor mockup floating over it.',
        keywords: [
          'pastel gradient-mesh wash',
          'fine grid texture overlay',
          'light code-editor mockup',
          'terracotta pill CTA',
          'vertical dotted spine',
          'ringed step numeral',
          'tinted tag pill',
          'progress-meter form'
        ],
        colors: [
          { name: 'Blush white', hex: '#FFF6F6', usage: 'dominant page wash' },
          { name: 'Pale periwinkle', hex: '#DEEAF6', usage: 'cool zone of the gradient mesh' },
          { name: 'Pale peach', hex: '#F6EADE', usage: 'warm zone of the gradient mesh' },
          { name: 'Terracotta', hex: '#CB693F', usage: 'pill CTAs, eyebrow labels, inline links' },
          { name: 'White', hex: '#FFFFFF', usage: 'card and mockup surfaces' },
          { name: 'Near-black', hex: '#1A1A1A', usage: 'display type and code text' },
          { name: 'Hairline grey', hex: '#F0F0F0', usage: 'card borders' }
        ],
        typography: 'Sans throughout: display at roughly 48px/700 tight-tracked, section heads at 32px/700, body at 16px/400 held to a narrow measure, and 12px terracotta all-caps eyebrows above every section head ("WHAT WE BUILD", "OUR APPROACH", "GET STARTED").',
        layoutNotes: 'Full-bleed pastel gradient mesh with a fine grid texture, content held to a narrow centred measure. A light code-editor mockup with window chrome and a file-tree sidebar floats over the wash. Service cards run 1 + 3 with pale tinted fills. The four-step approach section uses a vertical dotted spine with cards alternating left and right. The closing section pairs a progress-meter sidebar with a long multi-field form.',
        imagerySubject: 'an abstract pastel colour field, blurred and gridded, with no subject in it',
        mood: ['calm', 'premium', 'technical', 'unhurried'],
        signature: [
          'The code-editor mockup is light, not dark, with window traffic-lights and a file-tree sidebar',
          'Approach steps alternate left and right of a vertical dotted spine, each anchored by a small ringed numeral',
          'A terracotta all-caps eyebrow sits above every section headline without exception',
          'Card body copy ends in tinted rust micro-pills used as inline tags',
          'The closing section is a full multi-field consultation form with a live progress meter in a sidebar'
        ]
      },
      {
        id: 'chase-ai-mentorship',
        file: 'images/1-1-Mentorship-Program-Chase-AI.png',
        thumb: 'images/thumbs/1-1-Mentorship-Program-Chase-AI.webp',
        display: 'images/display/1-1-Mentorship-Program-Chase-AI.webp',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'Chase AI — 1:1 Mentorship Program',
        descriptor: 'A long dotted-spine roadmap with alternating cards, and real chat screenshots used as social proof.',
        keywords: [
          'serif-italic accent word',
          'vertical dotted spine',
          'alternating roadmap card',
          'dark chat screenshot',
          'centred price card',
          'terracotta pill CTA',
          'tinted tag pill',
          'numbered circle row'
        ],
        colors: [
          { name: 'Blush white', hex: '#FFF6F6', usage: 'dominant page wash' },
          { name: 'Pale periwinkle', hex: '#DEEAF6', usage: 'cool zone of the gradient mesh' },
          { name: 'Pale peach', hex: '#F6EADE', usage: 'warm zone of the gradient mesh' },
          { name: 'Terracotta', hex: '#CB693F', usage: 'price figure, pill CTAs, step numerals' },
          { name: 'White', hex: '#FFFFFF', usage: 'card surfaces' },
          { name: 'Charcoal', hex: '#333333', usage: 'body copy' },
          { name: 'Near-black', hex: '#1A1A1A', usage: 'chat-screenshot cards' }
        ],
        typography: 'Sans display at roughly 44px/700 with a serif-italic phrase set inline at the same size ("in 90 Days"); section heads at 32px/700; body at 15px/400; 11px terracotta all-caps eyebrows.',
        layoutNotes: 'Same pastel wash and grid texture as the homepage. A long 90-day roadmap runs as a vertical dotted spine with cards alternating left and right, each carrying a ringed numeral and tinted rust tag pills. Social proof appears as a 2×2 grid of real dark chat-app screenshots. A single centred price card states the figure at display size in terracotta, followed by an FAQ accordion and a three-step numbered circle row above the application form.',
        imagerySubject: 'an abstract pastel colour field, blurred and gridded, with no subject in it',
        mood: ['aspirational', 'structured', 'premium', 'direct'],
        signature: [
          'A serif-italic phrase is set inline inside the sans display headline at the same size ("in 90 Days")',
          'The roadmap is a long vertical dotted spine with cards alternating either side and ringed numerals on the spine',
          'Social proof is real dark chat-app screenshots in a 2×2 grid, not styled testimonial cards',
          'One centred price card carries the figure at display size in terracotta above a checkmark list',
          'A three-step numbered circle row sits directly above the application form as the closing move'
        ]
      },
      {
        id: 'think-company-session',
        file: 'images/Enterprise-Software-Modernization-Think-Session.png',
        thumb: 'images/thumbs/Enterprise-Software-Modernization-Think-Session.webp',
        display: 'images/display/Enterprise-Software-Modernization-Think-Session.webp',
        categoryId: 'serif-editorial-evidence',
        title: 'Think Company — Think Session Landing Page',
        descriptor: 'Large light serif over pale ice-blue bands, with every claim paired to a photograph or a checkmark list.',
        keywords: [
          'light serif display',
          'pale ice-blue band',
          'documentary workshop photography',
          'checkmark comparison list',
          'circular avatar pull-quote',
          'bare-underline form field',
          'numbered process list',
          'blue eyebrow label'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'primary content ground' },
          { name: 'Pale ice-blue', hex: '#DAE3E8', usage: 'full-bleed alternating section bands' },
          { name: 'Deep navy', hex: '#061E36', usage: 'footer and heading ink' },
          { name: 'Slate blue-grey', hex: '#54616E', usage: 'body copy' },
          { name: 'Link blue', hex: '#075BBD', usage: 'eyebrow labels, inline links, quote attribution' },
          { name: 'Hairline grey', hex: '#E8ECEF', usage: 'form field underlines and rules' }
        ],
        typography: 'Serif display at roughly 44px/400 with generous leading and never bold; sans body at 16px/400; 13px blue sans labels for eyebrows and list headers; a centred serif pull-quote at 28px.',
        layoutNotes: 'Alternating white and pale ice-blue full-bleed bands with no borders marking the transition. Documentary photography is always paired side by side with a checkmark or numbered list rather than standing alone. A centred serif pull-quote sits above a circular avatar with blue attribution. Two-column "what this is / what you get" checkmark comparison. The closing request section places a numbered process list above a form whose fields are bare underlines.',
        imagerySubject: 'a room of people at a workshop, one presenting to seated colleagues',
        mood: ['measured', 'senior', 'trustworthy', 'calm'],
        signature: [
          'Serif display is set large and light — never bold — with unusually generous leading',
          'Every documentary photo is paired side by side with a checkmark or numbered list, never used alone',
          'Section bands are pale ice-blue and white with no rule or border marking the transition',
          'The pull-quote is centred serif with a circular avatar beneath and blue link-styled attribution',
          'Form fields are bare 1px underlines with the label above — no boxes, no fills'
        ]
      },
      {
        id: 'constructive-1',
        file: 'images/constructive 1.png',
        thumb: 'images/thumbs/constructive 1.webp',
        display: 'images/display/constructive 1.webp',
        categoryId: 'serif-editorial-evidence',
        title: 'Constructive — Brand Strategy for Nonprofits',
        descriptor: 'Light serif headings over a mosaic of photography and saturated colour tiles, anchored by a deep teal.',
        keywords: [
          'light serif heading',
          'photo and colour-tile mosaic',
          'interlocking ring diagram',
          'teal eyebrow label',
          'floating white card',
          'coloured underline link',
          'avatar carousel',
          'teal full-bleed footer'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'primary content ground' },
          { name: 'Deep teal', hex: '#075B5B', usage: 'closing CTA band, footer, eyebrow labels' },
          { name: 'Pale grey', hex: '#F6F6F6', usage: 'secondary section band behind the floating card' },
          { name: 'Brick red', hex: '#5B1515', usage: 'case-study tile fill' },
          { name: 'Electric blue', hex: '#1507CB', usage: 'case-study tile fill' },
          { name: 'Sea teal', hex: '#078577', usage: 'ring diagram segment, underline accents' },
          { name: 'Ink black', hex: '#1A1A1A', usage: 'body copy and headings' }
        ],
        typography: 'Light-weight serif for centred section headings at roughly 34px/400; sans body at 15px/400; 11px teal all-caps tracked eyebrows ("CASE STUDIES", "OUR SERVICES"); serif italic for the carousel pull-quote.',
        layoutNotes: 'Dark full-bleed photo hero with white serif copy over it. Case studies form a mosaic of unequal tiles mixing documentary photography with saturated flat-colour panels carrying white label text. A white card floats over a pale grey band holding the services list, with each service underlined in a different accent hue. A perspectives carousel pairs a cutout portrait with an avatar column and serif italic quote. Teal closing band above the footer.',
        imagerySubject: 'a group of young people standing together outdoors, arms around each other',
        mood: ['principled', 'warm', 'considered', 'civic'],
        signature: [
          'Case studies are a mosaic of unequal tiles mixing photography with flat saturated colour panels',
          'Colour tiles carry their label as white text set directly on the fill, with no card or overlay',
          'A four-part interlocking ring diagram labels the process (discover, define, design, develop)',
          'Service links are underlined in different accent hues, one colour per service line',
          'The perspectives carousel pairs a full-height cutout portrait with a stacked avatar column beside the quote'
        ]
      },
      {
        id: 'goinvo-1',
        file: 'images/goinvo 1.png',
        thumb: 'images/thumbs/goinvo 1.webp',
        display: 'images/display/goinvo 1.webp',
        categoryId: 'serif-editorial-evidence',
        title: 'GoInvo — Healthcare Design Studio',
        descriptor: 'Serif headings on cream bands with oversized burnt-orange statistics carrying the argument.',
        keywords: [
          'serif editorial heading',
          'cream section band',
          'oversized orange statistic',
          'headshot grid',
          'serif pull-quote',
          'black open-source section',
          'orange full-bleed CTA band',
          'hairline stat row'
        ],
        colors: [
          { name: 'Cream', hex: '#F6F6EA', usage: 'primary alternating section band' },
          { name: 'White', hex: '#FFFFFF', usage: 'secondary content ground' },
          { name: 'Burnt orange', hex: '#BD4D15', usage: 'statistics, buttons, links, closing CTA band' },
          { name: 'Teal', hex: '#077785', usage: 'footer ground and secondary accent' },
          { name: 'Near-black', hex: '#1E1E1E', usage: 'dark hero and open-source section' },
          { name: 'Charcoal', hex: '#333333', usage: 'body copy' }
        ],
        typography: 'Light serif headings at roughly 34px/400; oversized statistics at 56px/600 in burnt orange with a 10px all-caps caption beneath; sans body at 15px/400; serif pull-quotes at 26px centred.',
        layoutNotes: 'Dark hero holding a dashboard screenshot with an orange statistic beneath it. A hairline-ruled statistic row runs full width, four across. Cream bands alternate with white. Case study cards each lead with an orange metric above a serif title. A black "open source design" section carries light project cards. A four-column headshot grid presents the team, followed by serif pull-quotes, a full-bleed orange CTA band and a teal footer.',
        imagerySubject: 'a clinician and a colleague reviewing information together at a screen',
        mood: ['rigorous', 'civic', 'senior', 'plainspoken'],
        signature: [
          'Oversized burnt-orange statistics carry the argument, each with a tiny all-caps caption beneath',
          'Cream, white and black bands rotate, so no two adjacent sections share a ground colour',
          'Every case-study card leads with its metric in orange above the serif title, not below it',
          'The team appears as a dense four-column grid of candid headshots at equal size',
          'The footer is teal — the only place that hue appears at full-bleed scale'
        ]
      },
      {
        id: 'ux-cabin-1',
        file: 'images/ux-cabin 1.png',
        thumb: 'images/thumbs/ux-cabin 1.webp',
        display: 'images/display/ux-cabin 1.webp',
        categoryId: 'serif-editorial-evidence',
        title: 'UX Cabin — Product Design Agency',
        descriptor: 'Serif headings on bone, with full-width case-study bands each in a different saturated colour.',
        keywords: [
          'centred serif heading',
          'bone canvas',
          'forest green hero',
          'coloured case-study band',
          'before-and-after comparison',
          'video testimonial card',
          'tag pill row',
          'acid lime CTA band'
        ],
        colors: [
          { name: 'Bone', hex: '#F6F6F6', usage: 'page ground' },
          { name: 'Forest green', hex: '#122A1E', usage: 'hero and footer ground' },
          { name: 'Deep navy', hex: '#15315B', usage: 'first case-study band' },
          { name: 'Rust orange', hex: '#A13F23', usage: 'third case-study band' },
          { name: 'Acid lime', hex: '#E7FF93', usage: 'closing CTA band' },
          { name: 'Warm cream', hex: '#F6F6EA', usage: 'secondary section band' },
          { name: 'Ink black', hex: '#1A1A1A', usage: 'headings and body copy' }
        ],
        typography: 'Centred serif section headings at roughly 32px/400; sans body at 15px/400; case-study titles in serif at 24px/500 reversed out of the coloured bands; 11px sans tag pills in all-caps.',
        layoutNotes: 'Bone ground with a dark forest-green hero and footer. A before-and-after comparison places two interface screenshots against each other with arrows between them. Service rows alternate screenshot and copy. Case studies run as full-width rounded bands, each in a different saturated colour, holding a serif title, a row of tag pills and a testimonial card with a play button.',
        imagerySubject: 'a designer at a desk talking to camera in a home studio',
        mood: ['grounded', 'friendly', 'evidence-led', 'unfussy'],
        signature: [
          'Each case study is a full-width rounded band in its own saturated colour — navy, purple, rust, black',
          'Every case band pairs a serif title and tag pills on the left with a video testimonial card on the right',
          'A literal before-and-after comparison sets two interface screenshots against each other with arrows between',
          'The closing CTA band is acid lime, the only high-chroma light colour on an otherwise deep palette',
          'Testimonial cards carry a real face and a play button rather than a pull-quote alone'
        ]
      },
      {
        id: 'craft-innovations-1',
        file: 'images/craft-innovations 1.png',
        thumb: 'images/thumbs/craft-innovations 1.webp',
        display: 'images/display/craft-innovations 1.webp',
        categoryId: 'dark-saturated-product-showcase',
        title: 'Craft Innovations — Research & Usability Testing',
        descriptor: 'Near-black canvas with lavender accents and cream inset panels breaking the darkness.',
        keywords: [
          'near-black canvas',
          'inset cream panel',
          'lavender accent',
          'typewriter cursor headline',
          'hairline dark card',
          'pill tab row',
          'oversized metric numeral',
          'data map graphic'
        ],
        colors: [
          { name: 'Near-black', hex: '#060606', usage: 'page ground' },
          { name: 'Charcoal slate', hex: '#373F4E', usage: 'card fills and secondary surfaces' },
          { name: 'Lavender', hex: '#8585E7', usage: 'metrics, map data, accent type' },
          { name: 'Pale lavender', hex: '#EAEAF6', usage: 'inset light panel ground' },
          { name: 'Cream', hex: '#F6F6EA', usage: 'second inset light panel ground' },
          { name: 'Signal blue', hex: '#0769BD', usage: 'chart and map highlights' },
          { name: 'Off-white', hex: '#EFEFEF', usage: 'display type and body copy' }
        ],
        typography: 'Sans throughout: display at roughly 42px/600 with an animated typewriter cursor after the last word; section heads at 30px/600; body at 14px/400 in off-white at reduced opacity; 10px all-caps pill badges with a leading dot.',
        layoutNotes: 'Near-black ground with hairline-bordered dark cards in a two-row service grid. Full-width inset panels in pale lavender and cream break the darkness as islands, holding tabbed industry content. Case studies pair copy with a device screenshot. A world map renders reach in lavender and mint beside oversized metrics. Testimonial and download panels repeat the inset-island pattern.',
        imagerySubject: 'a laptop on a stand displaying a banking interface, shot on a dark surface',
        mood: ['technical', 'precise', 'premium', 'analytical'],
        signature: [
          'Full-width cream and lavender panels are inset as islands inside the black page, never used as the ground',
          'The hero headline ends in a live typewriter cursor mid-word',
          'Section labels are small pill badges with a leading dot, sitting above each heading',
          'Reach is shown as a world map in lavender and mint beside oversized metric numerals',
          'Every dark card is defined by a 1px hairline border alone, with no fill behind it'
        ]
      },
      {
        id: 'huemor-1',
        file: 'images/huemor 1.png',
        thumb: 'images/thumbs/huemor 1.webp',
        display: 'images/display/huemor 1.webp',
        categoryId: 'dark-saturated-product-showcase',
        title: 'Huemor — Website Design Agency',
        descriptor: 'Deep purple canvas with a 3D robot render and magenta pill CTAs, divided by curved arc horizons.',
        keywords: [
          'deep purple canvas',
          'magenta pill CTA',
          '3D character render',
          'curved arc divider',
          'oversized metric numeral',
          'hairline dark card',
          'checkmark feature list',
          'grayscale logo row'
        ],
        colors: [
          { name: 'Near-black', hex: '#060606', usage: 'primary page ground' },
          { name: 'Deep purple', hex: '#311569', usage: 'hero and closing arc sections' },
          { name: 'Magenta', hex: '#E7235B', usage: 'pill CTAs and metric numerals' },
          { name: 'Plum', hex: '#23074D', usage: 'card fills and gradient falloff' },
          { name: 'White', hex: '#FFFFFF', usage: 'mid-page content sections' },
          { name: 'Off-white', hex: '#E8E3D8', usage: 'display type on dark' }
        ],
        typography: 'Sans throughout: display at roughly 40px/600 tight-tracked; section heads at 28px/600; body at 14px/400 in white at reduced opacity; metrics at 44px/600 in magenta; 11px all-caps micro labels.',
        layoutNotes: 'Deep purple hero holding a 3D character render at right, with magenta pill CTAs beneath the headline. Sections are separated by large curved arc horizons rather than straight rules, so the dark ground swells and recedes. A three-up card row carries checkmark feature lists with magenta CTAs. Metrics run three across in magenta. Mid-page switches to white for case studies and insights before returning to purple for the closing arc.',
        imagerySubject: 'a stylised humanoid robot standing against a deep field, three-quarter view',
        mood: ['bold', 'futuristic', 'confident', 'theatrical'],
        signature: [
          'Sections are divided by large curved arc horizons rather than straight edges, so the dark ground swells and recedes',
          'A 3D character render is the hero image, not a screenshot or photograph',
          'Magenta is used only for pills and metrics — never for type, fills or borders',
          'The page inverts to white in the middle third, then returns to purple for the closing arc',
          'Feature cards carry checkmark lists with a magenta CTA inside each card rather than one shared CTA'
        ]
      },
      {
        id: 'make-it-clear-1',
        file: 'images/make-it-clear 1.png',
        thumb: 'images/thumbs/make-it-clear 1.webp',
        display: 'images/display/make-it-clear 1.webp',
        categoryId: 'dark-saturated-product-showcase',
        title: 'Make it Clear — Design Consultancy',
        descriptor: 'Dark canvas carrying a mosaic of highly saturated project tiles and a rainbow gradient hairline.',
        keywords: [
          'dark canvas',
          'saturated project mosaic',
          'rainbow gradient hairline',
          'line-icon process circle',
          'cyan gradient testimonial band',
          'three-column link table',
          'uneven tile heights',
          'accordion FAQ'
        ],
        colors: [
          { name: 'Near-black', hex: '#1E1E1E', usage: 'page ground' },
          { name: 'Cyan', hex: '#07E7F5', usage: 'testimonial gradient band and accent type' },
          { name: 'Signal yellow', hex: '#FFE731', usage: 'project tile fill' },
          { name: 'Deep purple', hex: '#4D0769', usage: 'project tile fill' },
          { name: 'Orange', hex: '#FF7707', usage: 'project tile fill' },
          { name: 'White', hex: '#FFFFFF', usage: 'headings and body copy' },
          { name: 'Charcoal', hex: '#424242', usage: 'card borders and hairline rules' }
        ],
        typography: 'Sans throughout: section heads at roughly 30px/600 in white; body at 14px/400; project titles at 15px/500 beneath each tile with a one-line caption in grey; oversized review score at 56px/600.',
        layoutNotes: 'Dark ground holding a two-column mosaic of project tiles at deliberately uneven heights, each tile a fully saturated flat colour or a full-bleed photograph. A rainbow gradient hairline divides the portfolio from the services block. Services and processes are set as three-column link tables with hairline rules and line-icon circles. A cyan gradient band carries the review score and testimonial, followed by an FAQ accordion.',
        imagerySubject: 'a racing car photographed head-on in a dramatic sky',
        mood: ['assertive', 'saturated', 'contemporary', 'confident'],
        signature: [
          'Project tiles form a two-column mosaic at deliberately uneven heights, never a regular grid',
          'Each tile is either a fully saturated flat colour or a full-bleed photograph — no cards, borders or radii',
          'A rainbow gradient hairline is the only divider between major sections',
          'Process steps are thin line-icon circles in a four-up row, all at identical size',
          'The testimonial band is a cyan gradient carrying an oversized review score at its left edge'
        ]
      },
      {
        id: 'experience-dynamics-1',
        file: 'images/experience-dynamics 1.png',
        thumb: 'images/thumbs/experience-dynamics 1.webp',
        display: 'images/display/experience-dynamics 1.webp',
        categoryId: 'dark-saturated-product-showcase',
        title: 'Experience Dynamics — Service Design Consultancy',
        descriptor: 'Cyan hero and dark duotone photo tiles, punctuated by coral pill CTAs.',
        keywords: [
          'cyan hero band',
          'duotone photo tile',
          'coral pill CTA',
          'cutout portrait',
          'dark contact form',
          'full-colour logo wall',
          'video hero tile',
          'quadrant tile grid'
        ],
        colors: [
          { name: 'Cyan', hex: '#0793BD', usage: 'hero band and newsletter band' },
          { name: 'Near-black', hex: '#121E1E', usage: 'primary dark ground' },
          { name: 'Slate navy', hex: '#2A4E66', usage: 'duotone photo tile overlay' },
          { name: 'Deep teal', hex: '#075B85', usage: 'secondary tile ground' },
          { name: 'Coral', hex: '#E86C3A', usage: 'pill CTAs and inline highlights' },
          { name: 'White', hex: '#FFFFFF', usage: 'headings and logo wall ground' }
        ],
        typography: 'Sans throughout: hero display at roughly 34px/600 reversed out of cyan; tile headings at 22px/600 over photography; body at 14px/400; 11px all-caps micro labels on the pill CTAs.',
        layoutNotes: 'Cyan hero pairs the headline with a cutout portrait at right. Below it a quadrant grid of tiles alternates duotone photography with flat dark panels holding pull-quotes and case links. A full-width video tile carries a play button and a cyan CTA. A dark contact section places a duotone portrait beside a form with a drag-and-drop upload field. A full-colour client logo wall sits on white, followed by a cyan newsletter band and a dark footer.',
        imagerySubject: 'a consultant speaking to camera in an office, and colleagues at a whiteboard session',
        mood: ['expert', 'personal', 'established', 'direct'],
        signature: [
          'Photography is duotone-graded into the palette so every image reads as blue rather than full colour',
          'Tiles are arranged as quadrants that meet flush, alternating photography with flat dark copy panels',
          'The hero portrait is a cutout with no background, standing directly on the cyan band',
          'Coral pill CTAs are the only warm colour on the page and appear in every section',
          'The client logo wall is full-colour on white — deliberately breaking the duotone treatment used elsewhere'
        ]
      },
      {
        id: 'guidea-1',
        file: 'images/guidea 1.png',
        thumb: 'images/thumbs/guidea 1.webp',
        display: 'images/display/guidea 1.webp',
        categoryId: 'dark-saturated-product-showcase',
        title: 'Guidea — Strategic Product Design Agency',
        descriptor: 'Deep indigo canvas with periwinkle panels and heavily rounded cards throughout.',
        keywords: [
          'deep indigo canvas',
          'periwinkle process panel',
          'heavily rounded card',
          'masonry testimonial grid',
          'icon and numeral stat row',
          'rounded photo tile',
          'grayscale logo grid',
          'white rounded form panel'
        ],
        colors: [
          { name: 'Deep indigo', hex: '#060636', usage: 'page ground' },
          { name: 'Periwinkle', hex: '#3F4DD9', usage: 'process panel, section fills, buttons' },
          { name: 'Light periwinkle', hex: '#4D69D9', usage: 'secondary panel fill and hover state' },
          { name: 'White', hex: '#FFFFFF', usage: 'testimonial cards and form panel' },
          { name: 'Dark violet', hex: '#1E1E4E', usage: 'expertise card fills' },
          { name: 'Pale lilac', hex: '#E8E4FF', usage: 'body copy on dark grounds' }
        ],
        typography: 'Sans throughout: display at roughly 36px/600; section heads at 26px/600; body at 14px/400 in pale lilac; stat numerals at 32px/600 above a 10px all-caps caption.',
        layoutNotes: 'Deep indigo ground with generously rounded corners on every surface — photo tiles, cards, panels and buttons all share a large radius. A stat row pairs line icons with numerals and captions. A periwinkle process panel stacks four labelled steps down its right edge. Client testimonials form a masonry grid of white rounded cards at uneven heights. A white rounded panel carries the closing form.',
        imagerySubject: 'two colleagues reviewing a product interface together at a desk',
        mood: ['assured', 'corporate', 'polished', 'systematic'],
        signature: [
          'Every surface shares one large corner radius — photos, cards, panels and buttons alike',
          'The process panel is a single periwinkle block with its four steps stacked down the right edge',
          'Testimonials form a masonry grid of white rounded cards at uneven heights against the indigo ground',
          'Statistics pair a line icon above the numeral, with the caption below in small caps',
          'The closing form sits inside a white rounded panel rather than directly on the page ground'
        ]
      },
      {
        id: 'eleken-1',
        file: 'images/eleken 1.png',
        thumb: 'images/thumbs/eleken 1.webp',
        display: 'images/display/eleken 1.webp',
        categoryId: 'bone-canvas-minimal',
        title: 'Eleken — Product Design Agency for SaaS',
        descriptor: 'A bone canvas held almost empty, with grey line diagrams and a single orange focal element.',
        keywords: [
          'bone canvas',
          'single orange accent',
          'grey line-art diagram',
          'isometric wireframe graphic',
          'bordered logo cell grid',
          'centred sans heading',
          'small dark button',
          'generous empty space'
        ],
        colors: [
          { name: 'Bone', hex: '#F6F6F6', usage: 'page ground, roughly three quarters of the visible area' },
          { name: 'White', hex: '#FFFFFF', usage: 'logo cells and card surfaces' },
          { name: 'Orange', hex: '#E7853F', usage: 'the single focal element inside each diagram' },
          { name: 'Charcoal', hex: '#333333', usage: 'headings and body copy' },
          { name: 'Hairline grey', hex: '#DDDDDD', usage: 'logo grid rules and diagram line work' },
          { name: 'Warm taupe', hex: '#D4CFC4', usage: 'muted captions and secondary text' }
        ],
        typography: 'Sans throughout: centred display at roughly 34px/500; section heads at 24px/500; body at 15px/400 held to a narrow measure; small dark buttons carry 12px/500 labels.',
        layoutNotes: 'Bone ground with an unusually low content density. A logo wall is drawn as a bordered cell grid with hairline rules and no fills. Content alternates between centred single-column statements and two-column rows pairing copy with a line-art diagram. Diagrams are fine grey isometric or dot-cluster drawings, each containing exactly one orange sphere as the focal point.',
        imagerySubject: 'a fine grey isometric wireframe lattice with one orange sphere resting on it',
        mood: ['restrained', 'pragmatic', 'quiet', 'assured'],
        signature: [
          'Exactly one orange element appears in each diagram, acting as the focal point in an otherwise grey drawing',
          'The logo wall is a bordered cell grid with hairline rules and no fills, not a floating row of marks',
          'The canvas is warm bone rather than white, and stays visible across most of the page',
          'Statements alternate between centred single-column and two-column diagram rows, with no other layout used',
          'Buttons are small, dark and rectangular — deliberately understated against all the empty space'
        ]
      },
      {
        id: 'createape-1',
        file: 'images/createape 1.png',
        thumb: 'images/thumbs/createape 1.webp',
        display: 'images/display/createape 1.webp',
        categoryId: 'bone-canvas-minimal',
        title: 'CreateApe — Design Agency for Health Tech',
        descriptor: 'Oversized tight-set display type and asymmetric project tiles on a near-white canvas.',
        keywords: [
          'oversized display type',
          'asymmetric tile placement',
          'micro caption pair',
          'marquee wordmark bleed',
          'low-contrast statement type',
          'hairline insight rows',
          'near-white canvas',
          'uneven tile sizing'
        ],
        colors: [
          { name: 'Near-white', hex: '#F6F6F6', usage: 'page ground' },
          { name: 'Ink black', hex: '#121212', usage: 'display type and captions' },
          { name: 'Sky blue', hex: '#5BAFCB', usage: 'project tile imagery and the single accent' },
          { name: 'Dark navy', hex: '#121E36', usage: 'dark product screenshots inside tiles' },
          { name: 'Hairline grey', hex: '#DEDEDE', usage: 'insight row rules' },
          { name: 'Muted grey', hex: '#EAEAEA', usage: 'low-contrast statement type' }
        ],
        typography: 'Sans throughout: hero display at roughly 64px/600 with very tight tracking and leading; a low-contrast grey statement block at 40px/500; section heads at 34px/500; micro captions at 10px all-caps tracked wide.',
        layoutNotes: 'Near-white ground with project tiles placed asymmetrically against the grid at deliberately uneven sizes, some full-bleed and some inset. Each tile carries a caption pair beneath it — client name left, discipline right, both in micro caps. A statement block is set in low-contrast grey at display size. Insights are hairline-ruled rows with a category label left and title right. An oversized wordmark bleeds off both edges at the foot of the page.',
        imagerySubject: 'health-tech product interfaces shown as flat screenshots on plain grounds',
        mood: ['assured', 'spare', 'modern', 'unhurried'],
        signature: [
          'Project tiles are placed asymmetrically at deliberately uneven sizes — never a regular grid',
          'Each tile is captioned by a pair in micro caps: client name left, discipline right',
          'A full statement block is set in low-contrast grey at display size, almost disappearing into the canvas',
          'An oversized wordmark runs across the page foot and bleeds off both edges',
          'Insights are hairline-ruled rows with no thumbnails, category label left and title right'
        ]
      },
      {
        id: 'fuselab-creative-1',
        file: 'images/fuselab-creative 1.png',
        thumb: 'images/thumbs/fuselab-creative 1.webp',
        display: 'images/display/fuselab-creative 1.webp',
        categoryId: 'bone-canvas-minimal',
        title: 'FuseLab Creative — UI/UX for AI and Data Products',
        descriptor: 'Cool grey canvas and a white content panel, carrying a single column of near-monochrome project tiles.',
        keywords: [
          'cool grey canvas',
          'inset white panel',
          'narrow left rail nav',
          'monochrome project tile',
          'acid green accent',
          'circular arrow button',
          'single-column tile stack',
          'ultra-wide media ratio'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'inset content panel' },
          { name: 'Cool grey', hex: '#DEDEDE', usage: 'canvas behind the inset panel, visible at the edges' },
          { name: 'Near-black', hex: '#121212', usage: 'project tile imagery' },
          { name: 'Charcoal', hex: '#2A2A2A', usage: 'tile shadow detail and secondary surfaces' },
          { name: 'Acid green', hex: '#23E785', usage: 'circular arrow buttons and the hero chip' },
          { name: 'Ink black', hex: '#1A1A1A', usage: 'display type and labels' }
        ],
        typography: 'Sans throughout: display at roughly 30px/500 with tight leading and sentence case; project titles at 16px/500 reversed out of the tile; left-rail nav items at 10px; body at 13px/400 in a narrow column.',
        layoutNotes: 'Cool grey canvas with a narrow fixed left rail carrying the nav at very small size. The content sits in a white panel inset from the left rail. Projects run as a single stacked column of ultra-wide near-monochrome tiles, each showing a dashboard or AI interface with the project name reversed out at bottom-left and a circular green arrow button at bottom-right.',
        imagerySubject: 'dark enterprise dashboards and AI data interfaces, desaturated to near-monochrome',
        mood: ['austere', 'technical', 'controlled', 'serious'],
        signature: [
          'A narrow fixed left rail holds the entire navigation at very small size, with content inset beside it',
          'Projects are a single stacked column of ultra-wide tiles, never a two- or three-up grid',
          'Every tile image is desaturated to near-monochrome, so acid green is the only chroma on the page',
          'Each tile carries its title reversed out at bottom-left and a circular green arrow at bottom-right',
          'The white content panel floats on the grey canvas rather than filling the viewport'
        ]
      },
      {
        id: 'adam-fard-studio-1',
        file: 'images/adam-fard-studio 1.png',
        thumb: 'images/thumbs/adam-fard-studio 1.webp',
        display: 'images/display/adam-fard-studio 1.webp',
        categoryId: 'bright-saas-utility',
        title: 'Adam Fard Studio — UX & AI Studio for B2B SaaS',
        descriptor: 'White ground with organic colour blobs behind product screenshots and video testimonial cards.',
        keywords: [
          'white ground',
          'organic colour blob',
          'video testimonial card',
          'product screenshot row',
          'star-rated review',
          'metric bullet list',
          'centred section heading',
          'alternating case-study rows'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground, roughly two thirds of the visible area' },
          { name: 'Off-white', hex: '#F6F6F6', usage: 'alternating section bands' },
          { name: 'Link blue', hex: '#235BD9', usage: 'links, inline CTAs, metric highlights' },
          { name: 'Teal blob', hex: '#31BDBD', usage: 'organic shape behind case-study screenshots' },
          { name: 'Magenta blob', hex: '#FF4D77', usage: 'organic shape behind case-study screenshots' },
          { name: 'Sky blob', hex: '#07A1E7', usage: 'organic shape behind case-study screenshots' },
          { name: 'Near-black', hex: '#1E1E2A', usage: 'display type and body copy' }
        ],
        typography: 'Sans throughout: centred display at roughly 40px/700; section heads at 30px/700 centred; body at 15px/400; metric bullets set in bold inline with the body; small all-caps client labels above each case study.',
        layoutNotes: 'White ground with a horizontal strip of product screenshots directly beneath the hero. A qualification block pairs questions with radio-style options. Video testimonial cards run two-up with star ratings and named attribution beneath. Case studies alternate screenshot and copy left-to-right, each with a soft organic colour blob sitting behind the screenshot. Services close with a tab row and a pricing-style card.',
        imagerySubject: 'B2B SaaS dashboards and analytics interfaces shown as clean product screenshots',
        mood: ['competent', 'commercial', 'busy', 'reassuring'],
        signature: [
          'Soft organic colour blobs sit behind each case-study screenshot in teal, magenta or sky — the only non-neutral shapes',
          'Testimonials are video cards with a play button, star rating and named role, two across',
          'Every case study leads with bolded metric bullets rather than prose',
          'A horizontal strip of product screenshots runs directly under the hero as proof-of-work before any copy',
          'Section headings are centred while case-study content alternates left and right beneath them'
        ]
      },
      {
        id: 'baymard-institute-1',
        file: 'images/baymard-institute 1.png',
        thumb: 'images/thumbs/baymard-institute 1.webp',
        display: 'images/display/baymard-institute 1.webp',
        categoryId: 'bright-saas-utility',
        title: 'Baymard Institute — UX Audit Services',
        descriptor: 'Dense white research page where data tables and scorecard screenshots carry every claim.',
        keywords: [
          'dense white layout',
          'data table screenshot',
          'scorecard graphic',
          'navy footer band',
          'industry accordion list',
          'client logo bar',
          'serif brand pull-quote',
          'blue inline link'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground, roughly two thirds of the visible area' },
          { name: 'Deep navy', hex: '#061E42', usage: 'header bar and full-bleed footer' },
          { name: 'Steel blue', hex: '#4D77BD', usage: 'inline links and section labels' },
          { name: 'Data yellow', hex: '#F5BD07', usage: 'chart and scorecard highlights' },
          { name: 'Off-white', hex: '#F6F6F6', usage: 'alternating band behind the closing CTA' },
          { name: 'Charcoal', hex: '#333333', usage: 'body copy' }
        ],
        typography: 'Sans throughout at small sizes: display at roughly 30px/600, section heads at 22px/600, body at 14px/400 set in long measures. Client quotes use a serif at 18px italic. Line length and density are deliberately high.',
        layoutNotes: 'White ground with an unusually dense text-to-space ratio. Claims pair with data-table and scorecard screenshots placed right of the copy. Client logo bars break the sections. A long two-column accordion lists industry-specific audits. Brand pull-quotes are set centred with a large grayscale wordmark above them. A pale CTA band precedes the deep navy footer, which is itself a dense multi-column link directory.',
        imagerySubject: 'UX audit scorecards, benchmark tables and annotated interface screenshots',
        mood: ['rigorous', 'dense', 'authoritative', 'unglamorous'],
        signature: [
          'Text density is deliberately high — long measures, small type, minimal spacing between blocks',
          'Every claim is paired with a data-table or scorecard screenshot placed to its right',
          'Brand quotes are centred beneath a large grayscale client wordmark rather than an avatar',
          'Industry audits are listed as a two-column accordion running dozens of rows deep',
          'The navy footer is a dense multi-column link directory, as tall as a content section'
        ]
      },
      {
        id: 'depalma-studios-1',
        file: 'images/depalma-studios 1.png',
        thumb: 'images/thumbs/depalma-studios 1.webp',
        display: 'images/display/depalma-studios 1.webp',
        categoryId: 'bright-saas-utility',
        title: 'DePalma Studios — Digital Services for SMBs',
        descriptor: 'White ground with bright blue accents and flat vector spot illustrations with filled shapes.',
        keywords: [
          'bright blue accent',
          'flat vector spot illustration',
          'star-rated review card',
          'grayscale logo wall',
          'coloured project tile',
          'squiggle-textured CTA band',
          'white ground',
          'eyebrow micro label'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground, roughly two thirds of the visible area' },
          { name: 'Bright blue', hex: '#1569CB', usage: 'CTA band, buttons, links, illustration fills' },
          { name: 'Sky blue', hex: '#2377E7', usage: 'secondary illustration fill and review stars' },
          { name: 'Off-white', hex: '#F6F6F6', usage: 'logo wall band' },
          { name: 'Near-black', hex: '#1E1E1E', usage: 'display type and footer' },
          { name: 'Sea green', hex: '#4DA177', usage: 'project tile ground' }
        ],
        typography: 'Sans throughout: display at roughly 34px/700; section heads at 30px/700; body at 14px/400; 10px all-caps tracked eyebrows above each section ("WHAT WE DO", "OUR CLUTCH REVIEWS", "CASE STUDIES").',
        layoutNotes: 'White ground with the hero splitting copy left against a flat vector spot illustration right. Service and review sections alternate illustration and screenshot sides. Reviews are three-up cards with blue star rows and verified badges. A grayscale logo wall sits on a pale band. Project rows pair a coloured screenshot tile with copy. A bright blue CTA band with a subtle squiggle texture precedes the black footer.',
        imagerySubject: 'flat vector figures at desks and a watering can tending a plant, drawn with filled colour shapes',
        mood: ['friendly', 'commercial', 'approachable', 'straightforward'],
        signature: [
          'Spot illustrations use filled colour shapes with outlined figures — not line art, not photography',
          'Reviews are Clutch-style cards with blue star rows and a verified badge beneath each attribution',
          'Project screenshots each sit on their own saturated colour tile rather than on white',
          'The closing CTA band carries a subtle squiggle texture over the flat blue',
          'A tracked all-caps eyebrow labels every section, always above the heading'
        ]
      },
      {
        id: 'slide-ux-1',
        file: 'images/slide-ux 1.png',
        thumb: 'images/thumbs/slide-ux 1.webp',
        display: 'images/display/slide-ux 1.webp',
        categoryId: 'bright-saas-utility',
        title: 'Slide UX — UX Agency for Product and MarCom Teams',
        descriptor: 'Centred serif copy on a white column, with pastel icon-pattern tiles overlapping dark navy cards.',
        keywords: [
          'centred serif display',
          'icon-pattern tile',
          'overlapping dark card',
          'teal outlined pill',
          'award badge row',
          'grayscale logo grid',
          'navy page frame',
          'two-column accordion'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'centred content column' },
          { name: 'Slate navy', hex: '#36364E', usage: 'page frame, overlapping cards, footer' },
          { name: 'Teal', hex: '#078593', usage: 'outlined and solid pill CTAs, links' },
          { name: 'Pale peach', hex: '#F6EAC6', usage: 'icon-pattern tile behind the first card' },
          { name: 'Pale blush', hex: '#FFDEDE', usage: 'icon-pattern tile behind the second card' },
          { name: 'Pale mint', hex: '#C6EAEA', usage: 'icon-pattern tile behind the third card' }
        ],
        typography: 'Centred serif display at roughly 30px/400 across three lines; sans body at 14px/400; card headings at 18px/600 reversed out of navy; teal pill CTAs carry 12px all-caps tracked labels.',
        layoutNotes: 'A white content column sits inside a slate navy page frame. Focus areas are shown as three offset pairs: a pastel tile filled with a repeating line-icon pattern, overlapped by a dark navy card carrying the copy, alternating which side leads. An award badge row, a two-column accordion, and a grayscale client logo grid follow. A pale band carries contact details above the navy footer.',
        imagerySubject: 'repeating line-icon patterns of domain objects — carts, shields, brain glyphs — tiled at low contrast',
        mood: ['clear', 'considered', 'professional', 'calm'],
        signature: [
          'Focus areas pair a pastel icon-pattern tile with a dark navy card overlapping it, alternating which side leads',
          'The pattern tiles are filled with repeating line icons drawn from that focus area\'s domain',
          'The whole content column is inset inside a slate navy page frame rather than running full-bleed',
          'Display copy is centred serif across three short lines, unusually narrow for the page width',
          'Award badges are shown as their original hexagonal medallions in a six-up row, not flattened to logos'
        ]
      },
      {
        id: 'ux-studio-1',
        file: 'images/ux-studio 1.png',
        thumb: 'images/thumbs/ux-studio 1.webp',
        display: 'images/display/ux-studio 1.webp',
        categoryId: 'bright-saas-utility',
        title: 'UX Studio — Research-Driven Product Design',
        descriptor: 'White ground with a single electric green accent and black bands breaking the sections.',
        keywords: [
          'electric green accent',
          'black full-bleed band',
          'leaf-shape icon card',
          'product screenshot tile',
          'candid team photo grid',
          'process card row',
          'white ground',
          'pill tab row'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground' },
          { name: 'Electric green', hex: '#07FF77', usage: 'accent band, icon fills, highlight marks, CTA fills' },
          { name: 'Ink black', hex: '#121212', usage: 'full-bleed section bands and display type' },
          { name: 'Off-white', hex: '#F6F6F6', usage: 'alternating light bands' },
          { name: 'Pale mint', hex: '#EAF6F6', usage: 'icon card fills' },
          { name: 'Charcoal', hex: '#333333', usage: 'body copy' }
        ],
        typography: 'Sans throughout: display at roughly 40px/600 tight-tracked in two short lines; section heads at 28px/600 centred; body at 14px/400; card titles at 16px/500.',
        layoutNotes: 'White ground alternating with full-bleed black bands. Portfolio tiles run three-up with a caption beneath each. A "how can we help" block uses pale mint cards with abstract leaf-shaped green icons. A black band carries the commitment strip and a scrolling row of guarantees. Process steps run four-up as cards with green check icons. A candid team photo grid and a full-bleed electric green CTA band close the page.',
        imagerySubject: 'SaaS product interfaces on device mockups, and candid photos of a design team at work',
        mood: ['energetic', 'systematic', 'contemporary', 'direct'],
        signature: [
          'One electric green carries every accent — icons, checks, highlights and the full-bleed closing band',
          'Full-bleed black bands interrupt the white ground at regular intervals, each holding a single claim',
          'Help topics are shown as pale mint cards with abstract green leaf shapes rather than conventional icons',
          'The team appears as a candid photo grid of uneven tile sizes, not as headshots',
          'Guarantees run as a horizontal strip of short negative statements ("no cost", "no commitment")'
        ]
      },
      {
        id: 'wandr-1',
        file: 'images/wandr 1.png',
        thumb: 'images/thumbs/wandr 1.webp',
        display: 'images/display/wandr 1.webp',
        categoryId: 'annotated-display-typography',
        title: 'Wandr — Product Design and UX Agency',
        descriptor: 'Heavy condensed caps interrupted by serif-italic phrases, on stark black and white bands.',
        keywords: [
          'heavy condensed caps',
          'serif-italic counterpoint',
          'stark black-and-white band',
          'mint metric accent',
          'floating device screenshot',
          'accordion service list',
          'oversized statistic row',
          'arrow glyph link'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'alternating full-bleed band' },
          { name: 'Ink black', hex: '#060606', usage: 'alternating full-bleed band and display type' },
          { name: 'Mint green', hex: '#07BDA1', usage: 'metrics, inline highlights, accent numerals' },
          { name: 'Off-white', hex: '#F6F6F6', usage: 'secondary light band' },
          { name: 'Charcoal', hex: '#121212', usage: 'card fills on the dark bands' }
        ],
        typography: 'Condensed sans display in all caps at roughly 64px/800 with tight leading, interrupted by serif-italic phrases at the same size ("that don\'t.", "you can measure", "for itself."). Body at 14px/400; service rows at 16px/600 all-caps.',
        layoutNotes: 'Stark alternation between full-bleed black and white bands with no transitional colour. Display type fills the full measure with no accompanying image. Device screenshots float over the bands carrying mint metric callouts. Statistics run four-up at display size. Services are an accordion of all-caps rows with arrow glyphs at the right edge. Testimonial cards sit three-up on white.',
        imagerySubject: 'mobile app screens floating at an angle with metric callouts beside them',
        mood: ['blunt', 'confident', 'high-contrast', 'commercial'],
        signature: [
          'Every display line pairs heavy condensed caps with a serif-italic phrase completing the sentence',
          'Bands alternate pure black and pure white with no intermediate tone anywhere in the page',
          'Mint appears only on numerals and metric callouts — never on type, fills or buttons',
          'Display blocks fill the full 12-column measure with no accompanying image beside them',
          'Service categories are all-caps accordion rows with a → glyph pinned to the right edge'
        ]
      },
      {
        id: 'bird-ux-1',
        file: 'images/bird-ux 1.png',
        thumb: 'images/thumbs/bird-ux 1.webp',
        display: 'images/display/bird-ux 1.webp',
        categoryId: 'annotated-display-typography',
        title: 'Bird UX — UX Research and Experience Design Studio',
        descriptor: 'Heavy teal caps headings each answered by a serif-italic line, with a mint highlighter swipe.',
        keywords: [
          'heavy caps section heading',
          'serif-italic subheading',
          'mint highlighter swipe',
          'thick underlined link',
          'gradient mesh hero',
          'thin vertical rule divider',
          'outlined pill button',
          'teal full-bleed footer'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground' },
          { name: 'Deep teal', hex: '#062A36', usage: 'section headings and full-bleed footer' },
          { name: 'Forest teal', hex: '#317769', usage: 'secondary headings and body accents' },
          { name: 'Mint green', hex: '#07855B', usage: 'highlighter swipe and footer accent type' },
          { name: 'Ink black', hex: '#1A1A1A', usage: 'body copy and solid buttons' },
          { name: 'Sage grey', hex: '#7E7E7E', usage: 'captions and metadata' }
        ],
        typography: 'Very heavy condensed sans in all caps at roughly 44px/800 for section headings in deep teal, each answered directly beneath by a serif-italic sentence at 24px/400 carrying a thickly underlined link. Body at 15px/400; case-study titles at 24px/700.',
        layoutNotes: 'White ground with a gradient-mesh hero carrying ghosted outline display type. Each section opens with a flush-left heavy caps heading immediately followed by a serif-italic line. Case studies run two-up separated only by a thin vertical rule with no card or fill. Article cards run four-up with saturated thumbnail images. A deep teal footer carries the email address at heading size in mint.',
        imagerySubject: 'saturated abstract poster art and portrait collages used as article thumbnails',
        mood: ['opinionated', 'editorial', 'European', 'direct'],
        signature: [
          'Every section heading is heavy condensed caps in teal, answered immediately beneath by a serif-italic sentence',
          'The serif-italic line always contains one thickly underlined link as its emphasis',
          'A mint highlighter swipe marks a single serif-italic line, used exactly once on the page',
          'Case studies are separated by a thin vertical rule alone — no cards, borders or fills',
          'The footer sets the studio email address at heading size in mint on deep teal'
        ]
      },
      {
        id: 'focus-lab-1',
        file: 'images/focus-lab 1.png',
        thumb: 'images/thumbs/focus-lab 1.webp',
        display: 'images/display/focus-lab 1.webp',
        categoryId: 'annotated-display-typography',
        title: 'Focus Lab — B2B Brand Agency',
        descriptor: 'Cream canvas and serif display, annotated throughout by hand-drawn red circles and arrows.',
        keywords: [
          'hand-drawn red annotation',
          'cream canvas',
          'serif display',
          'flat brand colour tile',
          'black full-bleed band',
          'arrow glyph link',
          'editorial press list',
          'red tab label'
        ],
        colors: [
          { name: 'Cream', hex: '#F6F6EA', usage: 'page ground, roughly half the visible area' },
          { name: 'Ink black', hex: '#121212', usage: 'full-bleed bands and display type' },
          { name: 'Brand green', hex: '#074D31', usage: 'first case-study tile fill' },
          { name: 'Electric blue', hex: '#074DF5', usage: 'second case-study tile fill' },
          { name: 'Annotation red', hex: '#E03C1F', usage: 'hand-drawn circles, arrows and tab labels' },
          { name: 'White', hex: '#FFFFFF', usage: 'closing form card' }
        ],
        typography: 'Serif display at roughly 44px/400 with generous leading; section heads at 30px/400 serif; body at 14px/400 sans; 10px all-caps red tab labels; press headlines set in serif at 20px in a hairline-ruled list.',
        layoutNotes: 'Cream canvas alternating with full-bleed black bands. Brand work is shown as flat colour tiles at logo scale — one wide, two half-width — each with a tiny caption beneath. Hand-drawn red circles and arrows annotate headings, book covers and FAQ titles throughout. A book promotion card sits on black with a red arrow pointing at the cover. Client press runs as a hairline-ruled serif list with a red arrow link at the foot.',
        imagerySubject: 'brand identity work shown as flat colour fields with the client wordmark centred',
        mood: ['confident', 'crafted', 'editorial', 'warm'],
        signature: [
          'Hand-drawn red circles and arrows annotate headings, covers and FAQ titles across the whole page',
          'Brand work appears as flat colour tiles at logo scale rather than as screenshots or mockups',
          'The canvas is cream, not white, and alternates with pure black full-bleed bands',
          'Section labels appear as small red tabs attached to the top edge of the band they introduce',
          'Client press is an editorial serif list with hairline rules and no thumbnails'
        ]
      },
      {
        id: 'ibm-guidebook-home',
        file: 'images/ibm-digital-sellers-guidebook-home.png',
        thumb: 'images/thumbs/ibm-digital-sellers-guidebook-home.webp',
        display: 'images/display/ibm-digital-sellers-guidebook-home.webp',
        categoryId: 'enterprise-portal-utility',
        title: 'IBM Digital Sellers Guidebook — Home',
        descriptor: 'Internal seller portal with a scrimmed photo hero over a grid of outlined blue icons.',
        keywords: [
          'scrimmed photographic hero',
          'outlined circle line icon',
          'capability tile grid',
          'curved wave divider',
          'amber section heading',
          'trailing arrow link',
          'inline search field',
          'dark resources footer'
        ],
        colors: [
          { name: 'Off-white', hex: '#F5F5F5', usage: 'page ground for the capability grid' },
          { name: 'Near-black', hex: '#232323', usage: 'news and spotlight band, dark resources footer' },
          { name: 'Charcoal scrim', hex: '#313131', usage: 'dark overlay laid across the hero photograph' },
          { name: 'Warm taupe', hex: '#AFA193', usage: 'photographic hero tones showing through the scrim' },
          { name: 'Amber', hex: '#F59323', usage: 'headline emphasis word, section headings, register link' },
          { name: 'Corporate blue', hex: '#0785BD', usage: 'outlined icon circles and the Launch CSA nav button' },
          { name: 'White', hex: '#FFFFFF', usage: 'nav bar and the rounded search field' }
        ],
        typography: 'Sans throughout: hero display at roughly 40px/600 with the first word in amber; section headings at 24px/600 in amber; tile titles at 18px/600; body at 16px/400; link rows at 15px/400 each closing with a trailing arrow.',
        layoutNotes: 'Full-bleed photograph under a heavy dark scrim carries the headline and a rounded search field, with the photo subject bleeding off the right edge. News and Spotlight sit as two plain link columns inside the darkened band below. A light band holds twelve capability tiles four across, each an outlined blue circle icon above a title and two lines of body. A full-width curved wave hands the light band into the dark resources footer.',
        imagerySubject: 'a person at a laptop holding a mug, shot in warm natural light in a plain interior',
        mood: ['institutional', 'service-like', 'orderly', 'plain'],
        signature: [
          'The headline sits directly on the scrimmed photograph with no card, panel or plate behind it',
          'News and Spotlight are two plain link columns inside the darkened hero band, not a separate section',
          'Capability tiles are outlined blue circle icons above a title and two lines of body, four across and three rows deep',
          'A full-width curved wave hands the light icon grid into the dark resources footer',
          'Every link inside the dark bands closes with a trailing arrow glyph instead of being underlined'
        ]
      },
      {
        id: 'ibm-cognitive-sales-advisor',
        file: 'images/ibm-cognitive-sales-advisor.png',
        thumb: 'images/thumbs/ibm-cognitive-sales-advisor.webp',
        display: 'images/display/ibm-cognitive-sales-advisor.webp',
        categoryId: 'enterprise-portal-utility',
        title: 'IBM Digital Sellers Guidebook — Cognitive Sales Advisor',
        descriptor: 'Product page on deep navy with amber statistics and an orange CTA card straddling a curved divider.',
        keywords: [
          'deep navy hero',
          'amber display headline',
          'anchor sub-nav band',
          'amber line-art icon',
          'floating CTA card',
          'oversized statistic',
          'avatar testimonial carousel',
          'curved wave divider'
        ],
        colors: [
          { name: 'Deep navy', hex: '#23314D', usage: 'hero ground and the business-value statistics band' },
          { name: 'White', hex: '#FFFFFF', usage: 'feature grid ground' },
          { name: 'Amber', hex: '#F59323', usage: 'display headline, CTA fills, line icons, statistic numerals' },
          { name: 'Corporate blue', hex: '#0785BD', usage: 'anchor sub-nav band, inline links, nav button' },
          { name: 'Charcoal', hex: '#313131', usage: 'demo-video button and testimonial card fills' },
          { name: 'Near-black', hex: '#232323', usage: 'footer band' },
          { name: 'Off-white', hex: '#F5F5F5', usage: 'thin transitional band above the curved divider' }
        ],
        typography: 'Sans throughout: hero display at roughly 34px/600 in amber; feature titles at 17px/600; body and bullet lists at 15px/400; statistics at 64px/300 in amber above a 15px caption with the money figure bolded; the blue sub-nav links at 15px/400.',
        layoutNotes: 'Deep navy hero splits an amber headline and amber CTA left against an embedded video thumbnail right. A blue anchor sub-nav band runs full width directly beneath it. The white feature section places a rotated statement at far left against a six-cell grid of amber line-art icons with bulleted body copy. An orange CTA card floats over the curved divider, half on white and half on navy. Below, three oversized amber statistics sit on navy, then a testimonial carousel of bordered cards with circular avatars.',
        imagerySubject: 'a video still of a meeting room seen through overlapping translucent panels on a dark network backdrop',
        mood: ['institutional', 'explanatory', 'evidence-led', 'corporate'],
        signature: [
          'The hero splits an amber headline left against an embedded video thumbnail right, both on deep navy',
          'A blue anchor sub-nav band of in-page links sits directly beneath the hero as its own full-width band',
          'Feature icons are amber line-art glyphs with no enclosing circle, unlike the outlined blue circles used elsewhere on the site',
          'An amber CTA card floats over the curved divider, half on the white band and half on the navy one',
          'Statistics are set at display size in amber on navy, with the money figure bolded inside the caption beneath'
        ]
      },
      {
        id: 'ridgeframe-strategies-group',
        file: 'images/ridgeframe-strategies-group.png',
        thumb: 'images/thumbs/ridgeframe-strategies-group.webp',
        display: 'images/display/ridgeframe-strategies-group.webp',
        categoryId: 'diagnostic-framework-serif',
        title: 'Ridgeframe Strategies Group — Digital Presence Diagnostics',
        descriptor: 'Editorial serif on warm bone, where every claim is anchored by a monospaced label naming its methodology.',
        keywords: [
          'editorial serif claim',
          'monospaced methodology label',
          'bordered parameter grid',
          'numbered ordered step',
          'colour-coded taxonomy tag',
          'sparse teal accent',
          'warm bone band',
          'analytical line plate'
        ],
        colors: [
          { name: 'Off-white', hex: '#F5F5F5', usage: 'page ground for the hero and process sections' },
          { name: 'Warm bone', hex: '#F5F5E7', usage: 'alternating full-bleed bands behind the statement and framework' },
          { name: 'White', hex: '#FFFFFF', usage: 'parameter grid cell fills' },
          { name: 'Pale mint tint', hex: '#E7F5F5', usage: 'the single highlighted "How we score" cell' },
          { name: 'Deep teal', hex: '#316969', usage: 'CTA fill, step numerals, the line chart stroke' },
          { name: 'Ink', hex: '#151515', usage: 'serif display and body copy' },
          { name: 'Warm grey', hex: '#E7E7D9', usage: 'hairline rules and cell borders' }
        ],
        typography: 'Editorial serif display at roughly 40px/600; section heads at 24px/600 serif; a full-width serif statement at 22px/400; sans body at 14px/400; monospaced uppercase labels at 10px tracked wide, sitting beneath each claim to name its methodology; teal step numerals at 20px.',
        layoutNotes: 'Warm bone bands alternate with a lighter ground, transitions unmarked by any rule. The hero splits serif copy left against a flat tinted plate carrying a single-stroke line chart right, with a tinted note box beneath the buttons. A full-width serif statement fills its own bone band. Four ordered steps run across, each a teal numeral above a hairline rule with a closing monospaced deliverable line. The diagnostic framework is a bordered four-by-two grid of cells, each naming its anchoring standard in mono caps, with one cell tinted mint. Severity and effort legends close the section as colour-coded pill tags.',
        imagerySubject: 'a single-stroke analytical trend line on a flat tinted plate, no axes or labels',
        mood: ['diagnostic', 'accountable', 'restrained', 'senior'],
        signature: [
          'Every claim carries a monospaced uppercase label beneath it naming the standard it is scored against (CORE WEB VITALS, WCAG 2.1 AA, BAYMARD INSTITUTE)',
          'The diagnostic framework is a bordered four-by-two grid sharing 1px rules between cells, with exactly one cell tinted mint to explain the scoring',
          'Findings are classified by two independent legends — severity and effort — each a row of pill tags in its own hue with a leading glyph',
          'The only image on the page is a single-stroke line chart on a flat tinted plate, with no axes, labels or gridlines',
          'Ordered steps place the teal numeral above a hairline rule and close with a monospaced line stating the deliverable'
        ]
      },
      {
        id: 'cgr-consulting',
        file: 'images/cgr-consulting.jpg',
        thumb: 'images/thumbs/cgr-consulting.webp',
        display: 'images/display/cgr-consulting.webp',
        categoryId: 'monochrome-single-hue-system',
        title: 'CGR Consulting — Direct Marketing Sales Firm',
        descriptor: 'One electric blue carries the whole page, including the photography, which is duotoned into it.',
        keywords: [
          'single-hue constraint',
          'duotone blue photography',
          'light serif display',
          'heavy caps statement band',
          'serif-italic aside',
          'starburst badge',
          'blue line illustration',
          'reversed knockout type'
        ],
        colors: [
          { name: 'Paper off-white', hex: '#F5F5F5', usage: 'page ground for every light section' },
          { name: 'Electric blue', hex: '#154DCB', usage: 'the single hue — type, full-bleed bands, photo duotone, illustration' },
          { name: 'Deep blue', hex: '#073FCB', usage: 'shadowed zones inside the duotoned photograph' },
          { name: 'Pale blue', hex: '#A1BDFF', usage: 'highlight zones inside the duotoned photograph' },
          { name: 'Blue-grey', hex: '#BDCBE7', usage: 'midtones in the duotone and faint rules' },
          { name: 'White', hex: '#FFFFFF', usage: 'type knocked out of the blue bands, starburst badge fill' }
        ],
        typography: 'Light serif display at roughly 46px/300 for the two long statement headings; a heavy condensed sans at 40px/700 in all caps for the band statement, with a serif-italic "(Almost)" set above it at 20px; sans body at 14px/400; 10px all-caps tracked micro labels.',
        layoutNotes: 'Off-white ground alternating with full-bleed electric blue bands where all type is knocked out to white. The hero photograph is duotoned entirely into the blue and runs full-bleed beneath the serif headline. A starburst badge reading "Since 2012" sits inside the blue band beside the founder story and a row of client wordmarks. Below, a long light-serif heading is paired with three blue line-illustration capability blocks, then a second illustrated section, and a closing blue band carrying contact columns.',
        imagerySubject: 'a salesperson leaning over a desk mid-conversation, duotoned entirely into a single blue',
        mood: ['disciplined', 'confident', 'brand-forward', 'energetic'],
        signature: [
          'The hero photograph is duotoned entirely into the brand blue, so the page contains no full-colour image anywhere',
          'A serif-italic "(Almost)" sits above the heavy caps statement, softening a line that would otherwise read as a boast',
          'A starburst badge carries the founding year inside the blue band, the only non-rectangular shape on the page',
          'Capability illustrations are drawn in blue line only, at uniform stroke, with no fill or shading',
          'Light serif and heavy condensed caps alternate as the two display voices, never appearing in the same block'
        ]
      },
      {
        id: 'tori-talkjs',
        file: 'images/tori-talkjs.png',
        thumb: 'images/thumbs/tori-talkjs.webp',
        display: 'images/display/tori-talkjs.webp',
        categoryId: 'monochrome-single-hue-system',
        title: 'Tori by TalkJS — AI Support Agent for Dev Tools',
        descriptor: 'A blueprint idiom in one blue — dashed borders, monospaced copy, and arrow-prefixed labels throughout.',
        keywords: [
          'single-hue constraint',
          'dashed border grid',
          'monospaced body copy',
          'arrow-prefixed micro label',
          'serif-italic counterpoint',
          'striped display lettering',
          'wireframe chat panel',
          'solid chip label'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground, roughly three quarters of the visible area' },
          { name: 'Signal blue', hex: '#2369E7', usage: 'the single hue — type, chips, borders, icons, hero fill' },
          { name: 'Deep blue', hex: '#233F85', usage: 'display headlines and body copy; there is no black on the page' },
          { name: 'Mid blue', hex: '#235BE7', usage: 'chip fills and the hero panel base' },
          { name: 'Pale blue', hex: '#AFCBF5', usage: 'dashed borders and placeholder text' },
          { name: 'Ice blue', hex: '#E7F5FF', usage: 'faint card tints behind the security cards' }
        ],
        typography: 'Sans display at roughly 34px/600 in deep blue with serif-italic phrases set inline at the same size ("The AI support agent", "Nothing you don\'t."); monospaced body copy at 15px/400 for the primary explanation block; 10px monospaced all-caps labels prefixed with an arrow glyph; a striped horizontal-line display treatment for the "ASK TORI" band.',
        layoutNotes: 'White ground gridded by 1px dashed blue borders that outline nearly every region, giving a blueprint feel. The hero is a solid blue panel split between headline and white-outlined wireframe chat boxes. Step and feature cards sit inside dashed cells with an arrow-prefixed label, a solid blue icon chip, and a blue title. A full-width band renders "ASK TORI" in outline lettering filled with horizontal stripes. The closing contact section pairs copy with a dashed-bordered form.',
        imagerySubject: 'wireframe chat panels drawn as white outlines on flat blue, with no interface chrome or real text',
        mood: ['technical', 'precise', 'engineered', 'restrained'],
        signature: [
          'Nearly every region is outlined by a 1px dashed blue border, giving the page a blueprint rather than a card feel',
          'Body copy in the primary explanation block is monospaced, not sans, and set at reading size rather than as code',
          'Every micro label is prefixed with an arrow glyph (→ STEP 01, → KNOWLEDGE, → DATA)',
          'The "ASK TORI" band is outline lettering filled with horizontal stripes, the only decorative type on the page',
          'There is no black anywhere — headlines, body and rules are all blue, and the darkest value on the page is a deep blue'
        ]
      },
      {
        id: 'high-five-strategies',
        file: 'images/high-five-strategies.png',
        thumb: 'images/thumbs/high-five-strategies.webp',
        display: 'images/display/high-five-strategies.webp',
        categoryId: 'warm-serif-colour-system',
        title: 'High Five Strategies — Strategic Planning Consultancy',
        descriptor: 'Warm bone and a light serif worked against five fixed accents that repeat across quotes, steps and stripes.',
        keywords: [
          'warm bone ground',
          'light serif display',
          'five-accent colour system',
          'colour-coded quote card',
          'chevron process band',
          'multi-colour stripe divider',
          'circular portrait',
          'mint form panel'
        ],
        colors: [
          { name: 'Warm bone', hex: '#F5F5E7', usage: 'page ground for the hero, commitment and team sections' },
          { name: 'Near-black', hex: '#313131', usage: 'full-bleed process band behind the chevron steps' },
          { name: 'Mint', hex: '#AFD9D9', usage: 'quote card fill, chevron step, closing form panel' },
          { name: 'Amber', hex: '#FFBD5B', usage: 'quote card fill, chevron step, "Let\'s talk about it" CTA' },
          { name: 'Coral', hex: '#F54D31', usage: 'quote card fill, chevron step, hero CTA, role labels' },
          { name: 'Blue', hex: '#3177BD', usage: 'quote card fill, chevron step, secondary CTA' },
          { name: 'White', hex: '#FFFFFF', usage: 'quote strip ground and form field fills' }
        ],
        typography: 'Light serif display at roughly 40px/300 across three lines; serif section heads at 30px/300; serif step titles at 22px/400; sans body at 13px/400; 10px sans all-caps tracked eyebrows in an accent colour ("HI, WE\'RE HIGH FIVE.", "WHAT OUR CLIENTS SAY", "HOW WE DO IT").',
        layoutNotes: 'Warm bone ground with a circular badge ring overlapping the founder portrait in the hero. Client quotes run as a horizontally scrolling strip of cards, each filled with a different accent and closed by a bold-caps attribution. A full-bleed near-black band carries five arrow-shaped process steps, one per accent, each with a line icon and a serif title beneath. A five-colour stripe closes that band. Team members alternate left and right as large circular portraits beside serif bios, and a mint form panel closes the page.',
        imagerySubject: 'two women high-fiving across a desk in a bright office, and warm posed portraits of named consultants',
        mood: ['warm', 'personal', 'encouraging', 'methodical'],
        signature: [
          'Five fixed accents repeat in the same order across quote cards, chevron steps and the stripe divider',
          'Process steps are arrow-shaped chevrons interlocking across a full-bleed near-black band, one accent each',
          'A five-colour stripe divider closes the dark band, restating the palette as a legend',
          'Client quotes scroll horizontally as colour-filled cards, each attributed in bold caps to a named executive',
          'A circular badge ring overlaps the founder portrait in the hero, part logo and part frame'
        ]
      },
      {
        id: 'fourfold-consulting',
        file: 'images/fourfold-consulting.png',
        thumb: 'images/thumbs/fourfold-consulting.webp',
        display: 'images/display/fourfold-consulting.webp',
        categoryId: 'surreal-scale-minimal',
        title: 'FourFold Consulting — Leadership and Culture Advisory',
        descriptor: 'Near-empty white with one muted teal, arguing entirely through renders of tiny figures and giant solids.',
        keywords: [
          'near-empty white ground',
          'muted teal accent',
          'surreal miniature render',
          'oversized geometric solid',
          'pale cloud backdrop',
          'quiet sans heading',
          'plus-glyph accordion',
          'teal footer band'
        ],
        colors: [
          { name: 'Off-white', hex: '#F5F5F5', usage: 'page ground, close to three fifths of the visible area' },
          { name: 'Pale grey', hex: '#E7E7E7', usage: 'render backdrops and the cloud gradient behind the hero' },
          { name: 'Muted teal', hex: '#4D8593', usage: 'all headings, buttons, accordion rules and the footer band' },
          { name: 'Soft grey', hex: '#D9D9D9', usage: 'render shadow and mid-tone in the seamless backdrop' },
          { name: 'Dusty pink', hex: '#E7D9D9', usage: 'the pink solids inside the renders — cube, ladder, seesaw' },
          { name: 'Warm bone', hex: '#F5F5E7', usage: 'faint warm cast in the render highlights' },
          { name: 'White', hex: '#FFFFFF', usage: 'form field fills and footer type' }
        ],
        typography: 'Quiet sans throughout: display at roughly 32px/300 set in teal across two short lines; section heads at 24px/400 in teal; body at 14px/400 in mid grey; accordion rows at 16px/400 in teal with a trailing plus glyph. Nothing on the page is set large.',
        layoutNotes: 'A pale cloud-gradient hero carries a two-line teal heading at left against a render of stepped columns bleeding off the right. Below, sections alternate a narrow copy column with a render, separated by unusually deep empty space. A full-bleed render places two figures against a cube and a sphere. Services are a plain accordion of four teal rows with plus glyphs, paired with a short copy column. A teal full-bleed footer closes the page with centred white type.',
        imagerySubject: 'tiny human figures pushing a giant pink cube, rolling a teal sphere, and balancing on a seesaw against a pale cloud backdrop',
        mood: ['considered', 'unhurried', 'spacious', 'thoughtful'],
        signature: [
          'Every image is a photoreal render at impossible scale — human figures the size of a hand beside cubes and spheres taller than they are',
          'Renders sit on a pale seamless backdrop with soft cloud, so no image has a real setting or horizon',
          'The only saturated element is a muted teal, and it carries every heading, rule and button on the page',
          'Empty space between sections runs to roughly twenty base units, more than most sections occupy themselves',
          'Headings are deliberately small for their position — the render, not the type, opens each section'
        ]
      },
      {
        id: 'canopy-ai-seo',
        file: 'images/canopy-ai-seo.png',
        thumb: 'images/thumbs/canopy-ai-seo.webp',
        display: 'images/display/canopy-ai-seo.webp',
        categoryId: 'bright-saas-utility',
        title: 'Canopy — AI Content Strategy and SEO for Squarespace',
        descriptor: 'White SaaS page with a serif voice, bookended top and bottom by a grainy green gradient.',
        keywords: [
          'grainy green gradient',
          'serif display heading',
          'floating app mockup',
          'dot-grid texture strip',
          'pale rounded card',
          'highlighted comparison column',
          'three-tier pricing row',
          'green tracked eyebrow'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground, roughly two thirds of the visible area' },
          { name: 'Pale green wash', hex: '#E7F5E7', usage: 'grainy gradient rising into the hero and the closing band' },
          { name: 'Brand green', hex: '#4DBD85', usage: 'CTA fills, eyebrows, checkmarks, highlighted comparison column' },
          { name: 'Sage', hex: '#D9E7CB', usage: 'the deepest zone of the gradient where it meets the fold' },
          { name: 'Off-white', hex: '#F5F5F5', usage: 'card and mockup fills' },
          { name: 'Bone', hex: '#F5F5E7', usage: 'secondary card tint in the feature grid' },
          { name: 'Charcoal', hex: '#313131', usage: 'serif display headings and body copy' }
        ],
        typography: 'Transitional serif display at roughly 40px/500 for every section heading ("Blog on autopilot.", "Reads like you wrote it."); sans body at 15px/400; 10px green all-caps tracked eyebrows above each heading; monospaced labels inside the scorecard panel.',
        layoutNotes: 'White ground with a grainy green gradient rising into the hero and mirrored in the closing band, each fading to a dot-grid texture strip at its edge. A pale rounded app mockup floats over the hero gradient. Feature sections use pale rounded cards in one- and two-column arrangements. A comparison table sets three alternatives against a green-highlighted Canopy column. Pricing runs three tiers across, followed by a plain FAQ accordion.',
        imagerySubject: 'a Squarespace blog editor interface shown as a pale rounded product mockup, no chrome beyond window dots',
        mood: ['clean', 'confident', 'commercial', 'calm'],
        signature: [
          'A grainy green gradient bookends the page, rising into the hero and mirrored in the closing band',
          'Each gradient terminates in a dot-grid texture strip rather than a hard edge',
          'Every section heading is a transitional serif, unusual for a product page otherwise built from conventional SaaS blocks',
          'The comparison table highlights the Canopy column with a green fill and a leading dot, while alternatives stay grey',
          'The product mockup carries only window dots — no browser chrome, no toolbar, no real interface text'
        ]
      },
      {
        id: 'onlook-ring-menu-bar',
        file: 'images/onlook-ring-menu-bar.png',
        thumb: 'images/thumbs/onlook-ring-menu-bar.webp',
        display: 'images/display/onlook-ring-menu-bar.webp',
        categoryId: 'dark-saturated-product-showcase',
        title: 'Onlook — Ring Cameras in the Mac Menu Bar',
        descriptor: 'Near-black Apple-idiom product page opened by an iridescent gradient ribbon.',
        keywords: [
          'near-black canvas',
          'iridescent gradient ribbon',
          'centred sans display',
          'rounded product card',
          'glass pill CTA',
          'low-contrast body copy',
          'chevron FAQ accordion',
          'app-icon feature marker'
        ],
        colors: [
          { name: 'Near-black', hex: '#151515', usage: 'page ground, close to three quarters of the visible area' },
          { name: 'True black', hex: '#070707', usage: 'the darkest zone behind the hero ribbon' },
          { name: 'Charcoal', hex: '#232323', usage: 'rounded product card fills' },
          { name: 'Slate', hex: '#3F3F3F', usage: 'card borders and the accordion rules' },
          { name: 'Deep blue', hex: '#151585', usage: 'the blue lobe of the iridescent hero ribbon' },
          { name: 'White', hex: '#FFFFFF', usage: 'display type and the download CTA fill' }
        ],
        typography: 'Sans throughout: centred display at roughly 44px/500 in white; section head at 30px/500 with the Apple glyph set inline; body at 14px/400 in grey at reduced opacity; feature captions at 13px/500 above 12px grey body.',
        layoutNotes: 'Near-black ground opened by a full-bleed iridescent gradient ribbon that carries the centred headline and a glass download pill. Below it a centred section head introduces a single large rounded product screenshot. Three feature markers run across, each a small app icon above a caption and two lines of body. Two rounded cards sit two-up with screenshots and captions. A left-aligned serif-free FAQ heading pairs with a chevron accordion column, and a minimal footer closes on the app glyph.',
        imagerySubject: 'an iridescent ribbon of twisted colour bands, and Ring camera feeds shown inside a macOS menu-bar panel',
        mood: ['polished', 'premium', 'restrained', 'contemporary'],
        signature: [
          'The hero is a full-bleed iridescent ribbon of twisted colour, the only saturated element on an otherwise monochrome page',
          'The download CTA is a translucent glass pill carrying the Apple glyph, floating directly on the ribbon',
          'Feature markers are small app icons rather than line icons or numerals, set above their captions',
          'Body copy sits at markedly reduced opacity against the near-black, so headings carry almost all the contrast',
          'The FAQ heading is left-aligned against a right-hand accordion column, breaking the page\'s otherwise centred axis'
        ]
      }
    ]
  };
});
