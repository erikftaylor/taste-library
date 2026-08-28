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
        fonts: {
          roles: [
            ['Display, section heads, body & eyebrows', 'Archivo, Space Grotesk or Hanken Grotesk — one geometric grotesk family throughout, with a large x-height that holds 700 without clogging']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face; no serif anywhere in this style'
        },
        copyRegister: [
          'CTA labels: imperative, 1–3 words, all-caps, tracked wide',
          'Eyebrows: conversational greeting or verb phrase, 1–3 words, all-caps, tracked wide',
          'Headlines: plain-spoken first-person-plural claims in sentence case. The highlighter swipe lands on the hero display\'s claim words and on emphasised checkmark rows — never on block section heads, and never on wash grounds, where swipe and ground would share a hue',
          'Block section heads: the target\'s own section names as supplied — claims belong to the hero display and body copy, never to block heads',
          'Closing-band heading: a first-person-plural question or claim in the Headlines register — never a label',
          'Block body: prose when the target supplies prose, a checkmarked list when it supplies enumerable items, and prose by default when it supplies only a title — swiped list rows exist only where a list does',
          'Body: short declarative sentences, contractions welcome; no third-person firm-speak'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: reveal the connector thread by stroke-dashoffset as it enters the viewport; fade washes in at full size, never scaling; rise blocks 8px with a fade, 200ms ease-out; stagger ring badges 80ms apart.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Dark tape CTA', 'hover: fill lightens 10% keeping its own hue; focus-visible: 2px ink outline, 2px offset (tapes never sit on the ink footer); active: translateY(1px); disabled: 40% opacity'],
          ['Accent tape button', 'hover: fill darkens 8%; focus-visible: 2px near-black outline, 2px offset; active: translateY(1px)'],
          ['Text link', 'resting: set in the darkest wash hue with a matching 2px underline — the underline, not the colour, is the affordance and links are never colour-only (the link hue may sit below body-text AA, as the reference\'s does — §5\'s AA floor governs body copy); hover: underline thickens to 3px; focus-visible: same outline rule as buttons'],
          ['Nav item', 'hover: highlighter swipe appears behind the label; current page: swipe persists — on a single-page build no item is current, so the swipe appears on hover only; focus-visible: 2px ink outline on light grounds, 2px page-ground outline on the ink footer; on the ink footer the hover swipe still appears and the label flips to ink over it'],
          ['Burger menu', 'icon hover: highlighter swipe appears behind it; focus-visible: 2px ink outline, 2px offset; tap: opens a full-screen page-ground panel listing the nav links in eyebrow style, the icon becoming an ×; closes on selection; 150ms opacity fade only']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one white or near-white page ground, one near-black ink, one wash hue shared by the hero, the final numbered block and the closing band, plus one wash hue per intermediate block (every wash light enough to carry the ink at AA), one highlighter hue, one near-black CTA fill. Roles locked, hexes negotiable. Fill the shared hero wash first by §12\'s Filling-the-roles procedure, then the intermediate block washes in document order using §5\'s block rows in table order — never by semantic fit; when the brand\'s qualifying hues run out, derive the remainder as pale tints of the brand primary — the first at the relative luminance of the palest assigned wash, each further tint stepped 8% away so no two coincide. There is no cycling: every intermediate block gets its own hue. The highlighter is a near-twin of the hero wash — the same hue shifted just enough to read as a marker. Type rescales through §2; the grotesk voice does not yield to a brand serif.',
          locked: [
            'Torn-edge watercolour washes bleeding off the page edge',
            'Single-line character illustration at uniform stroke',
            'The hand-drawn connector thread crossing section boundaries',
            'Highlighter marker emphasis on headline words'
          ],
          register: 'approachable and zine-like — people over firm. Wrong for firms selling rigor, audit, seniority or compliance; a bank, a law firm or a security vendor in this style reads as unserious.'
        },
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
            ['Illustration', '1.5px uniform stroke in the ink colour, no fill and no shading, spans 4–6 columns'],
            ['Connector thread', '1.5px uniform stroke in the ink, one continuous line entering and leaving each block on its wash side'],
            ['Highlighter mark', '3u marker swipe behind 1–3 words, sits behind the glyphs'],
            ['Accent tape button', '5u tall, 2u × 4u padding, square corners, flat fill in the highlighter hue'],
            ['Dark tape CTA', '5u tall, 2u × 4u padding, square corners, stacked-tape near-black fill, all-caps label at eyebrow size in the adjacent wash hue — the wash nearest the tape, including a band the tape sits on; the wash\'s own hex, lightened only if the pair falls below AA — and page-ground white when no wash is near'],
            ['Numbered ring badge', '5u circle, 1px stroke, ink numeral centred'],
            ['Footer', 'full-bleed ink ground; exactly the contact details the target supplies — nothing conventional added — stacked in a left column under an eyebrow-style heading (uppercase, tracked), page links in a row to the right using the same list and fallback as the burger and styled as nav items, everything at eyebrow size reversed to the page ground hue']
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
          '│  │  off L) │╲       │ body · [tape CTA]    │   │',
          '│  └─────────┘ ╲      └──────────────────────┘   │',
          '├──────────────╲────────────────────────────────┤',
          '│  BLOCK 02  copy LEFT, wash RIGHT   ← zigzag    │',
          '│  ┌ 2–6 ───────┐    ┌ 7–12 wash (bleeds off R)┐ │',
          '│  │ ( 02 ) head│   ╱│                         │ │',
          '│  └────────────┘  ╱ └─────────────────────────┘ │',
          '├─────────────────╱─────────────────────────────┤',
          '│  CLOSING BAND — full-bleed accent wash         │',
          '│   section head · body · [tape CTA]             │',
          '├───────────────────────────────────────────────┤',
          '│  FOOTER — full-bleed black                     │',
          '└───────────────────────────────────────────────┘',
          'The thread is one continuous drawn line crossing every block boundary; it starts under the hero and ends at the top edge of the closing band — never inside it or the footer. Alternate wash side each block; never place two washes on the same side in a row. Copy columns alternate 7–11 and 2–6 with each block; extend further blocks by repeating both alternations.',
          'Every numbered block carries its own illustration over its wash and closes with body · tape CTA, exactly as BLOCK 01 draws. The hero carries no button. The dark tape CTA is the only button on this layout; the accent tape belongs to the family\'s card and form layouts. BLOCK 01 also carries the rotated eyebrow beside the thread (§1b) — the one element this drawing does not show.',
          'The closing band is the one hard-edged wash: full-bleed both sides with straight edges, in the hero\'s wash hue, its heading in ink at section-head size, its content centred on the grid, and no illustration of its own — the final numbered block above it shares the hero\'s wash hue, and its illustration is the closing illustration. The NAV wordmark is the target\'s name in the grotesk at 700 in ink; the burger lists the target\'s pages, or the numbered blocks and closing CTA by their headings when no page list exists.'
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
        fonts: {
          roles: [
            ['Display, heads, body & eyebrows', 'General Sans, Plus Jakarta Sans or Söhne — one contemporary neo-grotesk family throughout'],
            ['Serif-italic accent word', 'Fraunces italic, Source Serif 4 italic or Freight Text italic']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'CTA labels: imperative, 2–4 words, sentence case, trailing arrow on the primary',
          'Eyebrows: 2–3-word topic labels, all-caps, accent colour',
          'Headlines: outcome claims in sentence case; exactly one phrase per display line set in the serif italic',
          'Body: calm and consultative; no exclamation marks'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: the gradient wash may drift as a slow opacity cross-fade on a 20s+ loop; the product mockup rises 12px with a fade on scroll; spine cards fade in from their own side, 200ms ease-out.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Terracotta pill CTA', 'hover: fill darkens 8%, arrow shifts 4px right; focus-visible: 2px terracotta outline, 2px offset; active: translateY(1px)'],
          ['Ghost pill', 'hover: 8% terracotta tint fill; focus-visible and active: same as the primary pill'],
          ['Tag pill', 'static label — no hover, focus or active state'],
          ['Text link', 'resting: terracotta, no underline; hover: underline appears; focus-visible: 2px terracotta outline']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one near-white ground, two to three pastel mesh hues pale enough to hold near-black display type, one saturated warm accent carrying every CTA and reaching 4.5:1 on white, one near-black ink. Roles locked, hexes negotiable.',
          locked: [
            'Pastel gradient-mesh wash under a fine grid texture',
            'A serif-italic word interrupting the sans display line',
            'The vertical dotted spine organising process steps',
            'A single warm accent carrying every call to action'
          ],
          register: 'calm and premium — wrong for discount offers, urgency-driven marketing, or brands that need to look hand-made; loud playful brands read as sedated in it.'
        },
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
        fonts: {
          roles: [
            ['Display, section heads & pull-quotes', 'Source Serif 4, Freight Text or GT Sectra — an editorial serif that stays elegant at light weights'],
            ['Body & eyebrows', 'Source Sans 3 or Public Sans — a humanist sans at 400/600']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face; no geometric display grotesk'
        },
        copyRegister: [
          'Headlines: complete declarative sentences making a checkable claim, sentence case, never exclamatory',
          'Eyebrows: 1–3-word topic labels, all-caps',
          'CTA labels: verb plus object, 2–4 words, sentence case',
          'Attributions: full name, role and organisation — never anonymous'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: opacity fades only, 200ms ease-out; statistics may count up once on first view; photographs never zoom or pan.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Primary button', 'hover: fill darkens 8%; focus-visible: 2px outline in the accent, 2px offset; active: translateY(1px)'],
          ['Bare-underline field', 'focus: underline thickens from 1px to 2px in the accent, label stays above; error: underline and label in a desaturated red'],
          ['Text link', 'resting: accent colour, no underline; hover: underline appears; focus-visible: 2px accent outline']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one white ground, one pale band tint derived from the brand primary (pale enough for AAA ink on it), one dark ink, one saturated accent for eyebrows and links reaching 4.5:1 on white. Roles locked, hexes negotiable.',
          locked: [
            'Claim and proof sharing a row — every statement adjacent to a photograph, list, statistic or named quote',
            'Pale tinted full-bleed bands with unmarked transitions',
            'Serif display set light, never bold',
            'Named attribution with a face on every quote'
          ],
          register: 'measured and senior — wrong for playful consumer brands, startups selling speed, or any subject without real evidence to show; the style collapses when the proof is thin.'
        },
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
        fonts: {
          roles: [
            ['Display, heads, body & labels', 'Suisse Int’l, Söhne or Space Grotesk — one sans family throughout; metrics may use its tabular figures']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'Headlines: capability claims, sentence case, tightly worded',
          'Micro labels: 1–2 words, all-caps, tracked',
          'CTA labels: imperative, 1–3 words',
          'Metrics: numeral plus a one-line caption'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: media tiles fade in with an 8px rise, 200ms ease-out; metrics count up once on first view; nothing loops and no carousel auto-plays.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Accent CTA', 'hover: fill lightens 10%; focus-visible: 2px accent outline, 2px offset; active: translateY(1px)'],
          ['Dark card', 'hover: border brightens from 10–15% to 25% white; no fill change, no lift'],
          ['Pill tab', 'resting: 1px border; hover: 8% white fill; active tab: solid accent fill'],
          ['Text link', 'resting: white at 80%; hover: white at 100% with underline; focus-visible: 2px accent outline']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one near-black ground (the brand’s darkest hue may serve), exactly one high-chroma accent taken from the brand, one pale inset-panel tint, white type at the stated opacities. If the brand runs several accents, promote one and demote the rest to screenshot content. Roles locked, hexes negotiable.',
          locked: [
            'Near-black canvas with light panels as inset islands, never as the page ground',
            'Exactly one high-chroma accent',
            'Rounded media tiles carrying screenshots or duotone photography',
            'Body copy in white at reduced opacity'
          ],
          register: 'technical and premium — wrong for warm human services, non-profits, and audiences needing maximum readability; the reduced-opacity body copy is part of the look and needs care.'
        },
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
        fonts: {
          roles: [
            ['Display, heads, body & captions', 'Suisse Int’l, Neue Haas Grotesk or Aeonik — one quiet neo-grotesk family throughout']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'Headlines: short noun phrases or claims, sentence case, no terminal punctuation',
          'Captions: client and discipline pairs at micro size',
          'CTA labels: 1–2 words, sentence case',
          'Body: spare and unhurried; cut anything that only fills space'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static — stillness is part of the style. If animating: opacity-only fades at 150ms; nothing moves on scroll and nothing loops.',
          'Transform and opacity only. Honour prefers-reduced-motion by disabling everything.'
        ],
        states: [
          ['Small dark button', 'hover: fill lightens to #333333; focus-visible: 2px near-black outline, 2px offset; active: translateY(1px)'],
          ['Media tile', 'hover: the caption pair underlines; the image itself never zooms or dims'],
          ['Hairline list row', 'hover: rule under the row darkens to 20% ink; focus-visible: 2px near-black outline'],
          ['Text link', 'resting: ink with 1px underline; hover: underline moves to the accent hue']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one bone or light-grey canvas (warmed or cooled toward the brand, never pure white), one near-black ink, exactly one saturated accent held at or under roughly 2% of the visible area. The accent hex is the only place the brand’s colour enters. Roles locked, hexes negotiable.',
          locked: [
            'The bone canvas held almost empty — emptiness is a component',
            'A single accent used as punctuation, at roughly 2% of the area',
            'Type at oversized display scale or very small — never comfortable mid-sizes',
            'Asymmetric, unevenly sized media tiles'
          ],
          register: 'confident and unhurried — wrong for information-dense products, urgency marketing, or brands that need to look busy or affordable.'
        },
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
        fonts: {
          roles: [
            ['Display & section heads', 'Hanken Grotesk, Public Sans or Plus Jakarta Sans; where the reference leads with a serif (see §6), Source Serif 4 or Freight Text'],
            ['Body & eyebrows', 'the same sans family at 400/600']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'Headlines: benefit claims, sentence case',
          'Eyebrows: 1–4-word category labels, all-caps, accent colour',
          'CTA labels: verb-led, 2–3 words, sentence case',
          'Reviews: quote plus full name, role and company'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: sections fade in with an 8px rise, 200ms ease-out; accordions animate height at 200ms ease; logo walls stay still.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Accent CTA', 'hover: fill darkens 8%; focus-visible: 2px accent outline, 2px offset; active: translateY(1px); disabled: 40% opacity'],
          ['Product card', 'hover: border darkens to 20% ink; no lift, no shadow growth'],
          ['Accordion row', 'hover: 4% ink fill; open: the plus glyph becomes a minus; focus-visible: 2px accent outline'],
          ['Text link', 'resting: accent colour; hover: underline appears; focus-visible: 2px accent outline']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one white ground, one bright primary carrying CTAs, eyebrows and links (4.5:1 on white, and able to carry a white button label), its pale tint for section bands, one near-black ink. Roles locked, hexes negotiable.',
          locked: [
            'The conventional B2B block order — hero, logos, services, proof, work, FAQ, CTA',
            'One bright primary; personality lives in colour and imagery, never in structure',
            'Proof blocks — the logo wall and review or metric cards'
          ],
          register: 'competent before distinctive — the workhorse costume for B2B services. Wrong for luxury, cultural or avant-garde brands that must not look like SaaS.'
        },
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
        fonts: {
          roles: [
            ['Display caps', 'Archivo Condensed, Oswald or a Druk-class condensed grotesk at 700–800'],
            ['Italic counterpoint', 'Freight Text italic, GT Sectra italic or Source Serif 4 italic'],
            ['Body & micro labels', 'Work Sans or Public Sans at 400/600']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'Display: blunt second-person claims — a heavy caps line completed or undercut by the serif-italic phrase',
          'Micro labels: 1–2 words, all-caps, tracked',
          'CTA labels: imperative, 1–3 words',
          'Body: opinionated and editor-like; short sentences, no hedging'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: a hand-drawn mark may draw itself once by stroke reveal, 400ms, on first view — never on loop; everything else stays still.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by disabling the stroke reveal.'
        ],
        states: [
          ['Arrow link', 'hover: the arrow glyph shifts 4px right; focus-visible: 2px accent outline, 2px offset'],
          ['Accordion row', 'hover: 4% ink fill on light bands, 8% white on dark; open: arrow rotates 90°'],
          ['Button', 'hover: fill inverts between black and white; focus-visible: 2px accent outline; active: translateY(1px)']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand only at the annotation layer: the bands stay pure black and pure white, and the single annotation accent is taken from the brand. Role structure: black, white, one accent. Roles locked; only the accent hex is negotiable.',
          locked: [
            'Display type carrying the page with no accompanying imagery',
            'Exactly one hand-made mark per viewport — circle, swipe, underline or arrow',
            'The serif-italic counterpoint inside heavy caps',
            'Stark black-and-white band alternation'
          ],
          register: 'opinionated and editor-like — the style is an argument, not a catalogue. Wrong for neutral institutions, comparison shoppers, or brands unwilling to state a view.'
        },
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
        fonts: {
          roles: [
            ['All roles', 'IBM Plex Sans, Source Sans 3 or Public Sans — one utilitarian sans family throughout; the statistic role drops to weight 300']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'Headlines: task-oriented and second-person, sentence case, with the opening word emphasised in the warm accent',
          'Tile titles: 2–4-word noun phrases',
          'Links: full phrases ending in the trailing arrow — never "click here"',
          'Statistics: numeral plus a caption with the figure bolded'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. Wave dividers never animate. If animating: link arrows may shift 4px right on hover; content fades in at 150ms.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Solid warm CTA', 'hover: fill darkens 8%; focus-visible: 2px outline in the cool accent, 2px offset; active: translateY(1px)'],
          ['Capability tile', 'whole tile clickable; hover: the icon circle takes a 10% cool-accent tint; focus-visible: 2px cool-accent outline around the tile'],
          ['Anchor sub-nav link', 'hover: white underline; current section: underline persists'],
          ['Arrow link', 'hover: arrow shifts 4px right; focus-visible: 2px cool-accent outline']
        ],
        adaptation: {
          yields: 'Both accents may be re-derived from the target brand IF the division of labour holds: one warm accent carrying headlines, CTAs and statistics; one cool accent carrying navigation and iconography; an off-white ground with dark bands. The warm accent never carries navigation; the cool accent never carries a statistic. Roles locked, hexes negotiable.',
          locked: [
            'The scrimmed photographic hero with type sitting directly on it',
            'The outlined-circle line-art icon grid',
            'Curved wave dividers handing light bands into dark ones',
            'The warm/cool division of labour between the two accents'
          ],
          register: 'institutional wayfinding — built for colleagues, not conversion. Wrong for consumer marketing, boutique studios, or anything selling delight.'
        },
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
        fonts: {
          roles: [
            ['Display, heads & statements', 'Source Serif 4, Freight Text or Lora — an editorial serif'],
            ['Body', 'Public Sans or Source Sans 3 at 400'],
            ['Methodology labels', 'IBM Plex Mono, JetBrains Mono or Space Mono — a true monospace, never a tracked sans']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'Claims: complete sentences a reviewer could mark true or false',
          'Methodology labels: mono all-caps naming a real standard — never decorative',
          'Step titles: imperative, closed by a mono line stating the deliverable',
          'CTA labels: verb plus object, 2–4 words, sentence case'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: the line chart may draw itself once by stroke reveal on first view; nothing else moves and nothing loops.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by disabling the stroke reveal.'
        ],
        states: [
          ['Solid accent CTA', 'hover: fill darkens 8%; focus-visible: 2px accent outline, 2px offset; active: translateY(1px)'],
          ['Outlined secondary CTA', 'hover: 8% accent tint fill; focus-visible and active: same as the primary'],
          ['Taxonomy tag', 'static label — no hover, focus or active state'],
          ['Text link', 'resting: accent with 1px underline; hover: underline thickens to 2px']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one warm bone band hue, one lighter ground, one ink, one accent dark enough to carry white labels and used sparingly enough to read as punctuation; the taxonomy tag hues re-derive as a coded set. Roles locked, hexes negotiable.',
          locked: [
            'The monospaced methodology label anchoring every claim',
            'The bordered parameter grid with shared 1px rules',
            'The three-voice system — serif claims, sans body, mono citations',
            'The accent as punctuation, never decoration'
          ],
          register: 'diagnostic and accountable — the visual language of an audit. Wrong for brands selling warmth, creativity or speed; without real named standards to cite it becomes costume.'
        },
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
        fonts: {
          roles: [
            ['Display & section heads', 'Archivo or Space Grotesk; a serif display of equivalent weight range is admissible where the reference used one (see §6)'],
            ['Italic counterpoint', 'Fraunces italic, GT Sectra italic or Freight Text italic'],
            ['Body & micro labels', 'the same sans at 400, or Space Mono where the reference sets labels in mono']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'Display: confident claims in sentence case or caps, with a 1–3-word serif-italic aside supplying the wink',
          'Micro chips: 1–2 words, all-caps',
          'CTA labels: imperative, 1–3 words',
          'Body: brand-forward and direct; the constraint does the charming, not the copy'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. Duotone images never animate. If animating: hover fills cross-fade between hue and paper at 120ms; entrances are opacity fades at 200ms.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Hue-filled CTA', 'hover: inverts to paper fill with hue label and a 1px hue border; focus-visible: 2px hue outline, 2px offset; active: translateY(1px)'],
          ['Outline panel', 'hover: 8% hue tint fill; the border never changes weight'],
          ['Text link', 'resting: hue with 1px underline; hover: underline thickens to 2px; focus-visible: 2px hue outline'],
          ['Micro chip', 'static label — no hover, focus or active state']
        ],
        adaptation: {
          yields: 'The single hue is taken from the target brand’s primary; every tint, shade and duotone derives from it, over one paper ground. If the brand primary is too light to carry text on paper, darken it for type and keep the brand hex for fills. Role structure: one hue, one paper. Roles locked; the hue hex is the only negotiable value.',
          locked: [
            'The single-hue constraint itself — no second accent, no grey midtones beyond the paper',
            'Photography duotone-mapped entirely into the hue',
            'The serif-italic counterpoint inside the display voice',
            'Knockout reversal — hue band, paper type — as the contrast mechanism'
          ],
          register: 'disciplined and brand-forward — the constraint is the identity. Wrong for content-heavy products needing semantic colour (alerts, charts, states), or brands without one ownable hue.'
        },
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
        fonts: {
          roles: [
            ['Display, heads & step titles', 'Fraunces at 300–400, Source Serif 4 Light or Playfair Display at low weight — a light editorial serif'],
            ['Body & eyebrows', 'Work Sans or Nunito Sans at 400/700']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'Headlines: warm first-person-plural, sentence case',
          'Eyebrows: short greeting or topic, all-caps, accent colour',
          'Quotes: first person, attributed in bold caps to a full name and role',
          'CTA labels: invitation phrases, 2–4 words, sentence case'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. The quote strip scrolls only on drag or arrow press — never automatically. If animating: entrances are opacity fades at 200ms; chevrons stay still.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Accent CTA', 'hover: fill darkens 8%; focus-visible: 2px outline in the same accent, 2px offset; active: translateY(1px)'],
          ['Quote card', 'static surface; only its attribution link underlines on hover'],
          ['Form field', 'white fill on the tinted panel; focus: 2px accent outline, 2px offset; error: outline in the coral accent'],
          ['Portrait link', 'hover: a 2px accent ring appears around the circle']
        ],
        adaptation: {
          yields: 'The accent set may be rebuilt from the target brand IF it stays a fixed, ordered set: one bone ground, one ink, four or five saturated accents of comparable weight, reused in the same order across quotes, steps and stripes. Never pick colours per element. Roles locked, hexes negotiable.',
          locked: [
            'The fixed ordered accent set repeating across quotes, steps and stripes',
            'The light serif display voice',
            'Named people — portraits with names and roles, first-person quotes',
            'The warm bone ground'
          ],
          register: 'approachable expertise — serious method delivered warmly by named people. Wrong for anonymous enterprises, technical products sold on specs, or brands that cannot show real faces.'
        },
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
        fonts: {
          roles: [
            ['All roles', 'Karla, Work Sans or Assistant at 300–400 — one quiet humanist sans; nothing on the page is set at display weight']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face; no serifs, no condensed faces'
        },
        copyRegister: [
          'Headlines: short reflective statements, sentence case, no terminal punctuation, deliberately quiet',
          'Accordion rows: noun phrases',
          'CTA labels: 1–2 words, sentence case',
          'Body: unhurried and metaphor-led; the render argues, the copy confirms'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: one render per page may float slowly (translateY ±6px, 6s ease loop); accordions animate height at 200ms; nothing else moves.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by disabling the float.'
        ],
        states: [
          ['Accordion row', 'hover: the bottom rule darkens; open: the plus glyph rotates to a cross; focus-visible: 2px accent outline'],
          ['Small solid CTA', 'hover: fill darkens 8%; focus-visible: 2px accent outline, 2px offset; active: translateY(1px)'],
          ['Text link', 'resting: accent, no underline; hover: underline appears']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one white or off-white ground, one muted accent made by desaturating the brand primary until it reads calm (it carries every heading, rule, button and the footer), one mid-grey body ink, plus the render palette of a pale backdrop and one or two muted solids. Roles locked, hexes negotiable.',
          locked: [
            'Photoreal renders at impossible scale — tiny figures against giant solids — as the argument',
            'The pale seamless cloud backdrop; no real setting, no horizon',
            'Deliberately quiet, small type',
            'Empty space of roughly 20 base units between sections'
          ],
          register: 'considered and unhurried, metaphor over copy — wrong for feature-list products, urgent offers, or audiences who need literal imagery of the actual service.'
        },
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
      },
      {
        id: 'specimen-board-readout',
        name: 'Specimen Board Readout',
        description: 'A near-black board that documents a design system rather than selling anything. A narrow centred column runs top to bottom, cut into sections by full-width hairlines, each section opened by an em-dash glyph and a lowercase label. Values are always shown twice — the swatch and its hex, the specimen and its spec chips, the contrast pair and its measured ratio — so nothing on the board has to be taken on trust.',
        vocabulary: [
          'em-dash section label',
          'tonal ramp strip',
          'measured contrast pair',
          'monospace spec chip',
          'hex-printed swatch card',
          'narrow centred column',
          'hairline section divider',
          'export format tab row'
        ],
        imageryTechnique: 'flat generated specimens — swatch blocks, type specimens, live component renders and framed preview cards, all sitting directly on the dark ground with no photographic treatment',
        imageryExclusions: 'no photography as page furniture, no illustration, no gradients, no shadows other than a single documented elevation sample, no decorative imagery of any kind',
        fonts: {
          roles: [
            ['Display, heads & body', 'Open Sans, Source Sans 3, or the documented brand face itself — the board sets its own copy in the system it documents wherever it can'],
            ['Spec chips, hex values & code', 'JetBrains Mono, IBM Plex Mono, or SF Mono — every measured value is monospaced, and nothing measured is ever set in the proportional face']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face'
        },
        copyRegister: [
          'Section labels: 1–3 words, lowercase or sentence case, never a sentence',
          'Micro labels above a specimen: all-caps, tracked, 1–2 words',
          'Measured values: numeral plus unit, never prose — write 4.7:1 and 300ms, not roughly five to one',
          'Descriptive lines: one sentence, declarative, describing what the specimen is rather than praising it',
          'Never write persuasive copy anywhere on the board — the board reports, it does not argue'
        ],
        motion: [
          'No motion was observed — the reference is a static capture, though the board itself documents a 300ms smooth easing as the system\'s value.',
          'Default: static. If animating: sections fade in at 150ms ease-out as they enter; swatch and specimen cards never stagger, because a ramp read out of order misreports its own order.',
          'Transform and opacity only. Never animate a swatch fill, a ramp cell or a contrast ratio — a value that moves reads as a value still being computed. Honour prefers-reduced-motion by dropping to opacity alone.'
        ],
        states: [
          ['Format tab', 'resting: transparent, muted label; hover: 8% white fill; active: solid accent fill with white label; focus-visible: 2px accent outline, 2px offset'],
          ['Toolbar button', 'resting: 1px border at 15% white; hover: border to 30%, 6% white fill; active: translateY(1px)'],
          ['Swatch or ramp cell', 'hover: 1px white outline inset, hex value stays put; never lift, never scale — a swatch that moves misrepresents its own size'],
          ['Comparison card', 'hover: 1px accent border, no fill change; focus-visible: 2px accent outline'],
          ['Text link', 'resting: accent, no underline; hover: underline; focus-visible: 2px accent outline'],
          ['Form input', 'resting: 1px underline at 30% of the ink role; hover: underline to 50%; focus-visible: underline to the accent at 2px plus a 2px accent outline offset 2px; invalid: underline takes the error role with its message beneath in micro-label type'],
          ['Adjective pill', 'non-interactive by default; if made filterable, hover fills 8% ink and the active state fills the accent with the board ground as its label colour']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one near-black board ground, one slightly-tinted panel ground for code and preview frames, white at full and reduced strength for type, a four-to-six step neutral ramp for cell fills and borders, and one or two brand accents used only for interactive affordances and for the accent swatches being documented. The board must never colour itself in the brand it documents beyond those two accents — the brand is the subject, not the styling. The feedback triad is the one place a third hue is permitted: if the target supplies no error colour, derive one by rotating the warmer of its two accents toward red until it clears 4.5:1 on the card ground, and say in the chip that the value was derived rather than supplied.',
          locked: [
            'Every measured value is printed beside the thing it measures, in a monospaced face',
            'Sections open with an em-dash glyph and a lowercase label, separated by full-width hairlines',
            'A single narrow centred column, well under half the canvas width, holding every section',
            'Contrast pairs state their ratio and their WCAG level as content, not as a badge to be passed over'
          ],
          register: 'technical and evidentiary — wrong for anything selling to a non-specialist audience, and wrong wherever the reader is meant to feel something rather than check something. The near-black ground and the very narrow column make it a poor fit for any board meant to be read on a phone.'
        },
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop, board scrolling well past a single viewport',
          grid: 'single centred column at 82u (656px at the reference canvas, ≈ 46% of its width), no multi-column page grid; sections divide internally',
          rhythm: 'section 9u · label-to-content 3u · specimen row 2u · chip inline 1u',
          typeScale: [
            ['Wordmark specimen', 'sans, 700', '5u', 1.1],
            ['Board heading', 'sans, 300', '3.5u', 1.3],
            ['Section heading', 'sans, 400', '2.5u', 1.35],
            ['Body', 'sans, 400, white at 75%', '2u', 1.6],
            ['Section label', 'sans, 400, lowercase, preceded by an em-dash glyph', '1.5u', 1.4],
            ['Micro label', 'sans, 500, uppercase, tracking +10%', '1.25u', 1.3],
            ['Spec chip', 'mono, 400', '1.25u', 1.2]
          ],
          components: [
            ['Swatch card', '2.5u × 2.5u block, 0.25u radius, hex in mono above the colour name and its rgb triplet'],
            ['Tonal ramp strip', 'ten cells at steps 50, 100, 200, 300, 400, 500, 600, 700, 800 and 900 in one unbroken row, 4u tall, no gaps; each carries its step number above a six-character hex with the # dropped, set at 9px mono — at a 656px column a cell is 65px wide and holds no more than that'],
            ['Contrast pair card', '5u tall, the two colours as ground and type, a level badge and the measured ratio, and a caption naming which role sits on which. One card per pairing the documented system actually uses for text — not every combination, and never fewer than the roles that carry body copy'],
            ['Spec chip row', 'mono chips at 2u tall with 0.5u radius carrying the face name and role, followed by unstyled values inline'],
            ['Hairline divider', '1px rule at 12% white, full column width, 9u clear above and below'],
            ['Format tab row', '4u tall segmented control, active tab filled in the accent'],
            ['Preview frame', '1px border at 15% white, 0.5u radius, the specimen centred inside and its pixel dimensions in a footer bar'],
            ['Comparison card', 'white fill, 1u radius, logo centred above the name and domain'],
            ['Adjective pill', '3u tall, 1.5u radius, 1px border at 25% of the ink role, transparent fill, micro-label type, 1.5u horizontal padding'],
            ['Toolbar', '4u bar, navigation glyphs left and actions right; action buttons 3u tall with 1u gaps, exactly one filled in the accent and the rest outlined'],
            ['Form input', '4u tall with no box — a 1px underline only, its label above in micro-label type, 1u inset padding'],
            ['Feedback chip', '3u tall, 0.25u radius, a leading glyph then the state name then its hex in mono; one chip each for success, error and info']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  TOOLBAR — nav left, actions right       4u   │',
          '├───────────────────────────────────────────────┤',
          '│         ┌ 4–9 · the only column ┐             │',
          '│         │ WORDMARK              │             │',
          '│         │ heading · body · link │             │',
          '│         ├───────── hairline ────┤             │',
          '│         │ — brand identity      │             │',
          '│         │ heading · ○○○○○ pills │             │',
          '│         ├───────── hairline ────┤             │',
          '│         │ — logos               │             │',
          '│         │ [light]     [dark]    │             │',
          '│         ├───────── hairline ────┤             │',
          '│         │ — color palette       │             │',
          '│         │ ▢ ▢ ▢ ▢ ▢  hex + rgb  │             │',
          '│         │ ▤▤▤▤▤▤▤▤▤▤ 50–900  one ramp per        │',
          '│         │ ▤▤▤▤▤▤▤▤▤▤ 50–900  documented colour, │',
          '│         │ ▤▤▤▤▤▤▤▤▤▤ 50–900  however many       │',
          '│         │ ACCESSIBLE COMBINATIONS             │',
          '│         │ [Aa 21.0:1] [Aa 4.7:1]│             │',
          '│         ├───────── hairline ────┤             │',
          '│         │ — typography          │             │',
          '│         │ H1 specimen           │             │',
          '│         │ ⟨mono⟩ 40px w300 ls0  │             │',
          '│         ├───────── hairline ────┤             │',
          '│         │ — components          │             │',
          '│         │ live inputs · buttons │             │',
          '│         ├───────── hairline ────┤             │',
          '│         │ — compare             │             │',
          '│         │ ▭ ▭ ▭  white cards    │             │',
          '│         └───────────────────────┘             │',
          '├───────────────────────────────────────────────┤',
          '│  EXPORT — format tabs + code panel            │',
          '└───────────────────────────────────────────────┘',
          'Sections are added by appending another hairline and another em-dash label — the column never widens and never splits into two, however much is documented.'
        ]
      },
      {
        id: 'ridge-hero-variation-study',
        name: 'Ridge Hero Variation Study',
        description: 'One hero skeleton — letter-spaced wordmark, a two-weight display headline, a narrow body paragraph and a filled-plus-outlined CTA pair — rendered repeatedly with only the ground treatment changed. A single angular ridge motif is restated each time in a different medium: flat silhouette, stacked outline, halftone field, layered paper, or removed entirely. The layout is the constant and the technique is the variable, which is what makes the set legible as a study rather than as seven unrelated pages.',
        vocabulary: [
          'angular ridge motif',
          'two-weight display split',
          'letter-spaced wordmark',
          'filled-plus-outlined CTA pair',
          'narrow body measure',
          'single-viewport hero',
          'restated ground treatment',
          'flat geometric horizon'
        ],
        imageryTechnique: 'a flat angular ridge profile with no photographic content, rendered in exactly one medium per variation — solid silhouette, repeated outline stroke, halftone dot field, or stacked flat-colour layers — and always bled to both edges of the viewport',
        imageryExclusions: 'no photography, no texture or noise overlay, no three-dimensional shading, no drop shadows other than the flat offset a paper-layer treatment implies, and never two ridge techniques combined in one composition',
        fonts: {
          roles: [
            ['Display headline', 'Poppins, Futura, Century Gothic or a geometric sans with a single-storey a and near-circular o — the split between weights carries the whole composition, so the family must hold at both 700 and 200'],
            ['Body, nav & CTA labels', 'the same geometric sans at 400; do not introduce a second family anywhere in the hero'],
            ['Wordmark', 'the display face at 700 with wide positive tracking, set in caps']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face; any serif; any face lacking a true 200 or 300 weight, since the light line cannot be faked by reducing opacity'
        },
        copyRegister: [
          'Display headline: two to four words, a noun then a prepositional phrase, ending in a full stop',
          'Body: two to four sentences, second person, plain present tense, no more than four lines at the stated measure',
          'Primary CTA: imperative, 3–4 words, sentence case, no terminal punctuation',
          'Secondary CTA: imperative, 3–4 words, closed by a rightward arrow glyph',
          'Nav links: single words, sentence case, never more than four'
        ],
        motion: [
          'No motion was observed — every variation is a static capture.',
          'Default: the ridge motif draws or rises once on load over 600ms ease-out and then holds; the headline and body fade in with a 12px rise, 200ms, staggered 60ms. Nothing loops, and the ridge never parallaxes on scroll.',
          'Transform and opacity only. A stroke-based treatment may animate stroke-dashoffset once on first paint. Honour prefers-reduced-motion by rendering the ridge in its final state immediately.'
        ],
        states: [
          ['Primary CTA', 'hover: fill darkens 8%; focus-visible: 2px outline in the fill colour, 2px offset; active: translateY(1px)'],
          ['Secondary CTA', 'resting: 1px border, transparent fill; hover: border to full strength and 6% fill; focus-visible: 2px outline, 2px offset'],
          ['Nav link', 'resting: 70% strength; hover: 100% with a 1px underline at 2px offset; focus-visible: 2px outline'],
          ['Wordmark', 'non-interactive in the hero; if linked, hover raises opacity only, never tracking']
        ],
        adaptation: {
          yields: 'Every hex yields to the target brand provided the role structure holds: one ground carrying at least 55% of the viewport, one to three stepped values of a single hue building the ridge, one type colour at full strength for the display line and a reduced strength for body, and one accent reserved exclusively for the primary CTA. The ridge hue and the CTA accent must not be the same value, or the composition loses its only focal point. Where §5 carries no accent row at all, that is because the reference\'s CTA sat below every sampler threshold and no hex could honestly be claimed for it — supply the accent from the target brand, chosen to clear 3:1 against the ground behind the button and to sit outside the ridge\'s hue.',
          locked: [
            'One angular ridge motif in exactly one medium, bled to both viewport edges',
            'The display headline split across two weights of one geometric sans',
            'A filled primary CTA paired with an outlined secondary carrying an arrow glyph',
            'A body measure of roughly one third the viewport width, never centred'
          ],
          register: 'confident and design-led — wrong wherever the hero must carry proof, pricing or navigation depth, since the composition holds one idea and nothing else. The full-bleed ridge assumes a wide viewport and needs a different motif entirely below roughly 600px.'
        },
        system: {
          baseUnit: 8,
          canvas: '1440 × 800 desktop, a single viewport with no scroll implied',
          grid: '12 columns, 24px gutter, 14u side margin',
          rhythm: 'nav-to-display 9u · display-to-body 3u · body-to-CTA 4u',
          typeScale: [
            ['Display heavy', 'geometric sans, 700, tracking -2%', '12u', 0.95],
            ['Display light', 'geometric sans, 200, tracking -1%', '12u', 1.05],
            ['Body', 'geometric sans, 400, at 75–85% of type strength', '2u', 1.65],
            ['Nav link', 'geometric sans, 400', '2u', 1.2],
            ['Wordmark', 'geometric sans, 700, uppercase, tracking +18%', '1.75u', 1.2],
            ['CTA label', 'geometric sans, 500', '1.75u', 1.2]
          ],
          components: [
            ['Primary CTA', '7u tall, 0 radius, solid accent fill, 3u horizontal padding'],
            ['Secondary CTA', '7u tall, 0 radius, 1px border, transparent fill, label closed by an arrow glyph'],
            ['Nav bar', '9u tall, wordmark left and three links right, transparent over the ground'],
            ['Body block', '60u measure (≈ one third of the canvas), left-aligned, never exceeding four lines'],
            ['Ridge motif', 'full-bleed, occupying 30–45% of viewport height, anchored to the edge §1b names for this reference']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  WORDMARK              Approach Services About│',
          '├───────────────────────────────────────────────┤',
          '│  ┌ 1–7 ───────────────────┐                   │',
          '│  │ Display heavy          │                   │',
          '│  │ display light          │    (field left    │',
          '│  └────────────────────────┘     deliberately  │',
          '│  ┌ 1–5 ──────────┐               empty)       │',
          '│  │ body, 4 lines │                            │',
          '│  └───────────────┘                            │',
          '│  [ filled CTA ] [ outlined CTA → ]            │',
          '│                                               │',
          '│  ▄▀▄▄▀▀▄▄▀▄▀▀▄▄▀▄▄▀▀▄▄▀▄▀▀▄▄▀▄▄▀▀▄  ridge     │',
          '└───────────────────────────────────────────────┘',
          'The ridge anchors to whichever edge §1b names for this reference — the bottom for most of the study, the top for the high-key treatment, which pushes the whole type stack down beneath it. That choice is the only structural variation the study permits; nothing else in the skeleton moves.'
        ]
      },
      {
        id: 'dark-navy-diagnostic-editorial',
        name: 'Dark Navy Diagnostic Editorial',
        description: 'A long dark-navy page that argues in prose rather than in cards. Headings are short declarative sentences closed by a full stop, body copy sits at a narrow measure in the left half with the right half deliberately empty, and one warm coral carries every label, numeral, bullet and link. Sections alternate between two near-identical navies, so the page divides without a single visible rule.',
        vocabulary: [
          'declarative heading with a full stop',
          'coral micro label',
          'left-half measure',
          'alternating navy band',
          'definition row with bold lead-in',
          'coral step numeral',
          'italic coral pull quote',
          'credential trailer line'
        ],
        imageryTechnique: 'flat geometric illustration in stepped navy layers with small saturated peak accents, plus plain rectangular headshots at small scale, cropped square-ish and never masked into circles',
        imageryExclusions: 'no stock photography, no icons, no gradients other than the flat steps of the illustration, no rounded media tiles, no logos other than as plain text credits',
        fonts: {
          roles: [
            ['Headings & bold lead-ins', 'Poppins, Figtree or a geometric sans at 700 — the same family as body, distinguished only by weight'],
            ['Body & labels', 'the same geometric sans at 400; micro labels take the uppercase with wide tracking rather than a different face'],
            ['Pull quote', 'the same family at 400 italic — the only italic on the page']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face; any serif; any monospace, since measured values are not part of this style'
        },
        copyRegister: [
          'Headings: one short declarative sentence, sentence case, always closed by a full stop',
          'Body: second person, present tense, 2–5 sentences, plain words over industry terms',
          'Micro labels: all-caps, tracked, role or category, separated by a middle dot when compound',
          'Definition rows: a bold clause naming the option, then the explanation continuing inline in body weight',
          'Pull quote: first person plural, a commitment the reader can hold the writer to',
          'CTA labels: imperative, 3–4 words; text links close with a rightward arrow'
        ],
        motion: [
          'No motion was observed — the reference is a static full-page capture.',
          'Default: sections fade in with a 16px rise at 200ms ease-out as they enter, once only; step numerals and bullet markers do not animate independently of their block.',
          'Transform and opacity only. The hero illustration must not parallax — its stepped layers read as a single flat plane and separating them on scroll breaks that. Honour prefers-reduced-motion by dropping to opacity alone.'
        ],
        states: [
          ['Primary CTA', 'hover: fill darkens 8%; focus-visible: 2px outline in the accent, 2px offset; active: translateY(1px)'],
          ['Text link', 'resting: accent with a 1px underline at 4px offset; hover: underline thickens to 2px; focus-visible: 2px outline'],
          ['Nav link', 'resting: 70% white; hover: 100%; active section: 1px underline in white at 6px offset'],
          ['Definition row', 'non-interactive; if made expandable, the hairline above brightens 20% on hover and nothing moves']
        ],
        adaptation: {
          yields: 'Hexes may be re-derived from the target brand IF the role structure holds: two near-identical dark grounds one step apart for the alternating bands, off-white for headings, a desaturated cool grey for body, a hot accent used only for filled CTAs, and one warm accent doing every label, numeral, bullet, text link and pull quote. The two accents must be far enough apart in hue to read as different roles and never swap duties. The two grounds must stay close enough that the boundary reads as a shift rather than a rule; if the brand offers only one dark, derive the second by lightening it 4–6%.',
          locked: [
            'Two accents and no third — a hot accent used only for filled CTAs, and a warm accent carrying every label, numeral, bullet marker, text link and pull quote',
            'Body copy held to the left half of the canvas with the right half left empty',
            'Section division by a step between two near-identical grounds, never by a visible rule',
            'Headings written as complete declarative sentences closed by a full stop'
          ],
          register: 'senior and plainspoken — wrong for anything that needs to look energetic or affordable, and wrong where the reader skims, since the page rewards reading and offers very few visual entry points. The empty right half reads as confidence at desktop width and as a bug on narrow viewports unless the measure is allowed to fill.'
        },
        system: {
          baseUnit: 8,
          canvas: '1440 × long scroll; the reference runs about eleven viewport heights, which records its content volume and is not a length to pad toward',
          grid: '12 columns, 24px gutter, 6u side margin; prose occupies columns 1–5 (≈ one third of the canvas) and the right half stays empty',
          rhythm: 'section 14u · heading-to-body 2u · block 5u · definition row 2.5u',
          typeScale: [
            ['Display headline', 'geometric sans, 700 on the first line and 400 on the second, tracking -1%', '5u', 1.15],
            ['Section heading', 'geometric sans, 700', '3.5u', 1.25],
            ['Sub heading', 'geometric sans, 700', '2.25u', 1.35],
            ['Body', 'geometric sans, 400, cool grey', '1.875u', 1.65],
            ['Step numeral', 'geometric sans, 700, accent', '2.5u', 1.1],
            ['Micro label', 'geometric sans, 500, uppercase, tracking +10%, accent', '1.25u', 1.3],
            ['Pull quote', 'geometric sans, 400 italic, accent', '1.875u', 1.6]
          ],
          components: [
            ['Definition row', 'bold lead-in clause then inline body, 1px hairline above, 2.5u vertical padding'],
            ['Step block', 'accent numeral above a bold label above two lines of body, four across'],
            ['Founder card', 'small rectangular headshot left, name and accent micro-role right, bio beneath, closing with a plain-text credentials line'],
            ['Bullet list', 'small accent square marker, 2u indent, body copy hanging'],
            ['Primary CTA', '5.5u tall, 0 radius, solid accent fill, 3u horizontal padding'],
            ['Text link', 'accent label closed by an arrow glyph, 1px underline at 4px offset'],
            ['Credential strip', 'five micro-labelled columns — two named people, then framework, investment and location — each a caps micro label above one or two lines of body'],
            ['Pull quote', 'accent, 400 italic, no rule and no quotation marks, 60u measure, 5u clear above and below'],
            ['Question pill row', 'a wrapping row of pills, each a 1u accent dot then a short question in body weight, 2u gaps, no borders']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  WORDMARK          Approach Services About [C]│',
          '├───────────────────────────────────────────────┤',
          '│  HERO ┌ 1–6 ──────────────┐                   │',
          '│       │ display headline  │   (right half     │',
          '│       │ body · [CTA] [→]  │    left empty)    │',
          '│       └───────────────────┘                   │',
          '│  ▄▀▄▄▀▀▄▄▀▄▀▀▄▄▀▄▄▀▀▄  stepped ridge          │',
          '├───────────────────────────────────────────────┤',
          '│  CREDENTIAL STRIP — 5 micro-labelled columns   │',
          '├───────────────────────────────────────────────┤',
          '│  ┌ 1–6 ──────────────┐   band steps one value │',
          '│  │ Heading.          │   darker, no rule drawn │',
          '│  │ body prose        │                        │',
          '│  └───────────────────┘                        │',
          '├───────────────────────────────────────────────┤',
          '│  FOUNDERS ┌ 1–3 ┐ ┌ 4–6 ┐                     │',
          '│           │ ▣ bio│ │ ▣ bio│                    │',
          '│           └──────┘ └──────┘                    │',
          '├───────────────────────────────────────────────┤',
          '│  STEPS  01        02        03        04       │',
          '│         label     label     label     label    │',
          '├───────────────────────────────────────────────┤',
          '│  DEFINITION ROWS — bold lead-in, hairline above│',
          '│  ─────────────────────────────────────────     │',
          '├───────────────────────────────────────────────┤',
          '│  FOOTER                                        │',
          '└───────────────────────────────────────────────┘',
          'Add sections by alternating the two grounds again — the page never introduces a third value, and never draws a rule to divide a section from the next. The founder row takes as many cards as there are people, splitting the prose columns evenly between them; it is not fixed at two.'
        ]
      },
      {
        id: 'concept-comparison-cards',
        name: 'Concept Comparison Cards',
        description: 'A dark comparator that puts two or more design directions side by side and makes each one argue for itself in a fixed order: a full-bleed mockup, then a monospaced descriptor of what the mockup is, a short title, a one-line premise, the materials it is made of, the risk of choosing it, and a commit button. Every card carries the same fields in the same sequence, so the reader compares like against like rather than reading each concept on its own terms.',
        vocabulary: [
          'full-bleed concept preview',
          'monospaced descriptor line',
          'material chip',
          'swatch dot row',
          'stated risk line',
          'commit button',
          'fixed field order',
          'side-by-side comparator'
        ],
        imageryTechnique: 'each card leads with a complete rendered mockup of the concept it proposes, shown full-bleed to the card edges at the top, never cropped to a detail and never abstracted into a thumbnail or icon',
        imageryExclusions: 'no stock imagery, no illustration standing in for the concept, no partial crops that hide the concept\'s layout, and no card without a preview',
        fonts: {
          roles: [
            ['Card title & premise', 'Söhne, Suisse Int\'l or Public Sans at 400–500 — a neutral face, because the card chrome must not compete with the mockups it frames'],
            ['Descriptor, chips & risk label', 'JetBrains Mono, IBM Plex Mono or SF Mono in uppercase with wide tracking — the machine-written fields are monospaced and the human-readable ones are not']
          ],
          never: 'any display or decorative face in the card chrome, since each preview brings its own typography and a third voice makes the comparison unreadable'
        },
        copyRegister: [
          'Descriptor: one sentence, no verb required, naming the concrete referent and its two or three defining details, all caps',
          'Title: 2–3 words naming the device, not the feeling',
          'Premise: one sentence stating what the concept does for the reader, never what it looks like',
          'Material chips: 2–3 words, all caps, each naming a physical or graphic material rather than a style adjective',
          'Risk: one sentence stating the strongest honest argument against choosing this concept, never hedged',
          'Commit button: two words, imperative'
        ],
        motion: [
          'No motion was observed — the reference is a static capture of a comparator.',
          'Default: cards do not animate on entry, because a stagger implies a ranking the comparator is not making. Advancing to the next pair slides horizontally at 240ms ease-in-out.',
          'Transform and opacity only. Never animate a preview thumbnail on hover — the preview is evidence and motion makes it look like a promotion. Honour prefers-reduced-motion by cross-fading between pairs instead of sliding.'
        ],
        states: [
          ['Commit button', 'hover: fill lightens 8%; focus-visible: 2px outline in the fill colour, 2px offset; active: translateY(1px)'],
          ['Card', 'resting: no border; hover: 1px border at 20% white; never lift or scale, since size difference reads as preference'],
          ['Preview overlay control', 'resting: 60% opacity over the mockup; hover: 100%, applied instantly with no transition, because §11 forbids animating anything sitting over a preview; focus-visible: 2px outline'],
          ['Pair advance control', 'resting: 1px accent ring, transparent fill; hover: accent fill with dark glyph; focus-visible: 2px outline, 2px offset']
        ],
        adaptation: {
          yields: 'Hexes may be re-derived from the target brand IF the role structure holds: a near-black comparator ground darker than any preview it frames, a one-step-lighter card ground, white at full and reduced strength for title and premise, and exactly one high-chroma accent reserved for the commit button and the advance control. The accent must not appear inside any preview, or the eye reads it as part of the concept rather than part of the chrome. Where the previews are concepts for the same brand that owns the accent — the usual case — the rule still holds and it is the chrome that yields: pick the accent from the brand hue the concepts use least, and if every hue is spoken for, derive the chrome accent as a lightness step far enough from all of them to read as a different thing. Never solve it by letting the accent into a preview.',
          locked: [
            'Every card carries the same fields in the same order, with no field omitted for any card',
            'A full-bleed rendered preview leads each card, never a crop or an abstraction',
            'A stated risk sits directly above the commit button, so the argument against is read last',
            'The comparator ground is darker than every preview it frames'
          ],
          register: 'candid and decision-oriented — wrong wherever the concepts must be sold rather than weighed, since the risk field actively argues against each option. It also assumes the reader has authority to choose; without that, the commit button is a dead end.'
        },
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop, two cards visible with the next pair one control away',
          grid: '2–3 columns of equal width, 4u gutter, 3u outer margin; every column identical whatever the count',
          rhythm: 'card padding 3u · field 2u · preview-to-descriptor 3u',
          typeScale: [
            ['Card title', 'sans, 500', '3u', 1.25],
            ['Premise', 'sans, 400', '2.5u', 1.45],
            ['Descriptor', 'mono, 400, uppercase, tracking +8%', '1.5u', 1.7],
            ['Chip label', 'mono, 400, uppercase, tracking +8%', '1.375u', 1.2],
            ['Risk body', 'sans, 400, white at 70%', '2u', 1.5],
            ['Commit label', 'sans, 500', '2.25u', 1.2]
          ],
          components: [
            ['Concept card', 'card ground one step lighter than the comparator, 0.5u radius, 3u padding, preview bled to the top three edges'],
            ['Preview frame', 'full card width, roughly 45% of card height, the mockup rendered complete inside it'],
            ['Descriptor block', 'monospaced uppercase, 2–3 lines, sitting directly beneath the preview'],
            ['Swatch dot row', '2u squares with 0.25u radius in a tight row, one per palette entry, no labels'],
            ['Material chip', '1px border at 25% white, 0.25u radius, 2.5u tall, monospaced uppercase label'],
            ['Risk line', 'a monospaced uppercase RISK label followed inline by body-weight prose'],
            ['Commit button', '5u tall, 0.5u radius, solid accent fill, dark label'],
            ['Pair advance control', '5u circular ring in the accent, centred on the gutter at the card midline — present only when more concepts exist than the viewport shows, and omitted entirely when they all fit'],
            ['Preview overlay control', '3u square glyph button over the preview\'s lower right at 60% opacity, expanding the mockup to full size when activated']
          ]
        },
        wireframe: [
          '┌─ 1 ─────────────────┐ ┌─ 2 ─────────────────┐',
          '│ ┌─────────────────┐ │ │ ┌─────────────────┐ │',
          '│ │ FULL-BLEED      │ │ │ │ FULL-BLEED      │ │',
          '│ │ CONCEPT PREVIEW │ │ │ │ CONCEPT PREVIEW │ │',
          '│ └─────────────────┘ │ │ └─────────────────┘ │',
          '│ MONO DESCRIPTOR OF  │ │ MONO DESCRIPTOR OF  │',
          '│ WHAT THE MOCKUP IS  │ │ WHAT THE MOCKUP IS  │',
          '│                     │ │                     │',
          '│ Title               │ │ Title               │',
          '│ One-line premise.   │ │ One-line premise.   │',
          '│ ▪▪▪▪ [CHIP] [CHIP]  │ │ ▪▪▪▪ [CHIP] [CHIP]  │',
          '│ [CHIP]              │ │ [CHIP]              │',
          '│ RISK the honest     │ │ RISK the honest     │',
          '│      argument against│ │      argument against│',
          '│ ┌───────────────┐   │ │ ┌───────────────┐   │',
          '│ │  Commit       │   │ │ │  Commit       │   │',
          '│ └───────────────┘   │ │ └───────────────┘   │',
          '└─────────────────────┘ └─────────────────────┘',
          'Adding a third concept adds a third column of identical structure, never a differently-shaped hero card — the moment one card is bigger, the comparator has made the choice for the reader.'
        ]
      },
      {
        id: 'storybook-serif-product',
        name: 'Storybook Serif Product',
        description: 'A warm bone canvas carrying a high-contrast serif at display size, where exactly one saturated red does every job the brand colour is allowed to do — pill buttons, step numerals, attributions, and the full stop closing each display line. A painted illustration opens the page in a register the rest of it never repeats, and product interface is then shown as flat mockup cards rather than described. The combination reads as a storybook that happens to be selling software.',
        vocabulary: [
          'red terminal full stop',
          'high-contrast serif display',
          'single saturated accent',
          'painted illustration hero',
          'knockout wordmark on the horizon',
          'flat product mockup card',
          'numbered step spine',
          'arced capital ticker'
        ],
        imageryTechnique: 'one painted or rendered scene at the top of the page, warm and atmospheric with real depth of field, used once and never repeated; everything below it is flat — the product itself captured as-is on a plain card, plus line-drawn glyphs and one photograph of the team. For software that means interface screenshots; for a physical product it means the artefact the buyer would actually be shown before committing — a fitting sheet, a spec drawing, a finished piece against a plain ground — never a lifestyle photograph and never a rendering that flatters what a screenshot would not',
        imageryExclusions: 'no stock photography, no gradient meshes, no drop shadows on flat elements, no illustration style below the hero that competes with the painted scene, and never a second painterly image once the first has been spent',
        fonts: {
          roles: [
            ['Display serif', 'Canela, Editorial New, Freight Display or a high-contrast transitional serif with a true hairline thin — the stroke contrast is the whole effect and a low-contrast serif will not carry it'],
            ['Body, labels & interface', 'Aeonik, Basis Grotesque or a neutral geometric sans at 400 — it must recede completely behind the serif and is never used above 2.5u'],
            ['Wordmark', 'a heavy rounded-terminal display sans, set in caps and knocked out of the illustration']
          ],
          never: 'Inter, Roboto, Arial or system-ui as a display face; any slab serif; any second serif anywhere on the page'
        },
        copyRegister: [
          'Display lines: 2–5 words, sentence case, always closed by a full stop that takes the accent colour',
          'Step headings: second person, present tense, 3–5 words, no terminal punctuation',
          'Step body: 2–3 sentences explaining what happens, never what it feels like',
          'Step numerals: two digits with a leading zero, in the accent',
          'CTA labels: 2–4 words, imperative or invitational, sentence case',
          'Micro labels: all-caps, tracked, naming the mockup a card is showing',
          'Ticker: first-person questions a user of the product would actually ask, unanswered and unpunctuated by any product claim'
        ],
        motion: [
          'No motion was observed — the reference is a static full-page capture, though the arced ticker and the step spine both imply travel.',
          'Default: the ticker translates horizontally at a constant slow rate, looping seamlessly and pausing on hover. The step spine draws downward as its section enters, once, over 800ms ease-out. Display lines fade in with a 12px rise at 200ms; the accent full stop arrives 120ms after the words it closes.',
          'Transform and opacity only. The painted hero never parallaxes and never zooms — it is a picture, not a stage. Honour prefers-reduced-motion by halting the ticker, drawing the spine instantly, and dropping all entrances to opacity.'
        ],
        states: [
          ['Accent pill CTA', 'hover: fill darkens 8%; focus-visible: 2px outline in the accent, 3px offset; active: translateY(1px)'],
          ['Dark pill CTA', 'hover: fill lifts 10% toward the page ground; focus-visible: 2px accent outline, 3px offset; active: translateY(1px)'],
          ['Selectable chip', 'resting: 1px border, white fill; hover: border to full ink; selected: accent fill with a white label and its glyph knocked out; focus-visible: 2px accent outline'],
          ['Form field', 'resting: filled, no border, placeholder at 55% ink; focus-visible: 2px accent outline, 2px offset; invalid: 1px accent border with the message beneath in micro-label type'],
          ['Testimonial scroller', 'the row scrolls horizontally; hover pauses any auto-advance, and the track must remain keyboard-reachable with visible focus on each card'],
          ['Disclosure row', 'resting: circular accent glyph button at rest; hover: fill darkens 8%; expanded: glyph rotates 180 degrees, panel height animates, content fades in after']
        ],
        adaptation: {
          yields: 'Hexes may be re-derived from the target brand IF the role structure holds: one warm off-white page ground carrying at least half the scroll, one near-black for full-bleed dark sections, one deep saturated ground for the illustrated opening, white for knockouts and card fills, one desaturated tint of the accent for the step spine, and exactly one saturated accent doing pill fills, numerals, attributions and the terminal full stop. If the brand runs more than one saturated hue, promote one and let the others live only inside the painted hero, where they read as scene rather than system.',
          locked: [
            'Exactly one saturated accent, and the full stop closing every display line is set in it',
            'A high-contrast serif at display size against a neutral sans everywhere else',
            'One painted scene at the top of the page and flat treatment for everything below it',
            'Product interface shown as captured mockups on plain cards, never described in prose alone'
          ],
          register: 'warm and confident, with a wonder register that is easy to get wrong — it reads as condescending on anything sold to professionals, and the painted hero is expensive enough that a weak one sinks the whole page. Wrong wherever the product must look neutral or institutional.'
        },
        system: {
          baseUnit: 8,
          canvas: '1440 × long scroll, roughly fourteen viewport heights at the reference capture',
          grid: '12 columns, 24px gutter, 10u side margin; step content occupies columns 5–9 (≈ 38% of the canvas) and display lines centre across columns 3–10',
          rhythm: 'section 16u · display-to-body 3u · step 10u · card-to-caption 2u',
          typeScale: [
            ['Display serif', 'serif, 400, tracking -1%', '15u', 1.05],
            ['Section serif', 'serif, 400', '7u', 1.1],
            ['Step heading', 'sans, 500', '2.75u', 1.3],
            ['Body', 'sans, 400', '1.75u', 1.6],
            ['Ticker', 'serif, 400, uppercase, set on an arc', '4u', 1],
            ['Micro label', 'sans, 500, uppercase, tracking +8%', '1.25u', 1.3],
            ['Step numeral', 'sans, 500, accent', '1.25u', 1.2]
          ],
          components: [
            ['Accent pill CTA', '5.5u tall, fully rounded, saturated accent fill, white label, 3u horizontal padding'],
            ['Dark pill CTA', '5.5u tall, fully rounded, near-black fill, white label'],
            ['Selectable chip', '4u tall, fully rounded, white fill, 1px border, a small glyph before the label'],
            ['Step spine', '2u wide path in a desaturated tint of the accent, running the full height of the left margin, with 2.5u white circular nodes and a solid accent segment entering each node'],
            ['Mockup card', 'white fill, 1u radius, 1px border, a micro label at the top and captured interface beneath, filling the step column'],
            ['Testimonial card', '1px border, 2.5u padding, quote in body then an accent attribution line naming the speaker and their relationship'],
            ['Icon circle', '5u outlined circle holding a line glyph, a serif label beneath and two lines of body under that'],
            ['Rounded section panel', 'the bone panel overlaps the section above it with a 4u top radius on both corners, and no rule between them'],
            ['Inline signup form', 'two filled fields and an accent pill CTA on a single row, all 5.5u tall, set directly in the illustrated hero'],
            ['Arced ticker', 'a single line of accent capitals set on a shallow arc, bleeding past both edges of the viewport']
          ]
        },
        wireframe: [
          '┌─ 1 ────────────────────────────────────── 12 ─┐',
          '│  PAINTED HERO — full bleed                    │',
          '│      █▀▀█ WORDMARK knocked out of the sky     │',
          '│      one-line promise                         │',
          '│      [ field ][ field ][ accent pill ]        │',
          '├───────────────────────────────────────────────┤',
          '│  DARK — deep ground                            │',
          '│      Display serif line.                       │',
          '│      Display serif line●   ← accent full stop  │',
          '│      body · credibility wall                   │',
          '├──╮ rounded top corners overlap the dark ╭──────┤',
          '│  │ BONE PANEL                           │      │',
          '│ ┃│         Welcome line●                │      │',
          '│ ●│ ┌ 5–9 ─────────────┐                 │      │',
          '│ ┃│ │ 01 step heading  │                 │      │',
          '│ ┃│ │ body             │                 │      │',
          '│ ●│ │ ▭ mockup card    │                 │      │',
          '│ ┃│ │ 02 step heading  │                 │      │',
          '│ ●│ │ ▭ mockup card    │   spine runs    │      │',
          '│ ┃│ └──────────────────┘   the margin    │      │',
          '├───────────────────────────────────────────────┤',
          '│  Display serif line●                           │',
          '│  ( chip )( chip )( chip )( chip )              │',
          '│         ▭ device mockup                        │',
          '├───────────────────────────────────────────────┤',
          '│  ╭─ ARCED TICKER IN ACCENT CAPITALS ─╮         │',
          '├───────────────────────────────────────────────┤',
          '│  TESTIMONIALS — bordered cards, scrolls right  │',
          '│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────              │',
          '├───────────────────────────────────────────────┤',
          '│  DARK — Display serif line●                    │',
          '│      ◯ icon   ◯ icon   ◯ icon                  │',
          '├───────────────────────────────────────────────┤',
          '│  PRINCIPLES — 4 bordered cards                 │',
          '│  JOIN — glyph, form, mascot                    │',
          '│  FOOTER — near-black, links left, wordmark     │',
          '└───────────────────────────────────────────────┘',
          'The painted hero is spent once and never reprised; every later image is flat. Sections alternate bone against a dark ground, and a bone panel may overlap the dark section above it with rounded top corners, which is the only place the page draws a curve at section scale.'
        ]
      },
      {
        id: 'amber-terminal-docs',
        name: 'Amber Terminal Docs',
        description: 'A near-black documentation shell where a single warm amber marks everything actionable — the primary button fill, the active nav tab, every inline link — against three flat greys of panel depth and a dark forest-green tip callout. Code and install commands run in monospace inside bordered dark panels; a dense two-column table of icon-plus-label rows serves as the page\'s real table of contents. Reads as developer-facing and utilitarian — a project that expects to be read in a terminal as much as a browser.',
        vocabulary: [
          'amber CTA button',
          'active-tab amber underline',
          'bordered ghost button',
          'forest-green tip callout',
          'monospace install command',
          'icon-plus-label quick-link row',
          'collapsible sidebar chevron',
          'numbered bullet feature list'
        ],
        imageryTechnique: 'no photographic or illustrated imagery — the page is built entirely from a small circular avatar mark, line icons and typography',
        imageryExclusions: 'no photography, no illustration, no gradients, no mockups',
        fonts: {
          roles: [
            ['Display, headings, nav & body', 'Inter, IBM Plex Sans or Söhne — a neutral grotesk sized for dense technical reading'],
            ['Code, commands & inline tokens', 'IBM Plex Mono, JetBrains Mono or Berkeley Mono — a monospace face with a distinct zero']
          ],
          never: 'a display serif anywhere; a script or condensed face for headings'
        },
        copyRegister: [
          'CTA labels: imperative, 1–3 words',
          'Quick-link table titles: short noun phrases naming the doc section, each paired with a one-line description in sentence case stating what it covers',
          'Callout labels: all-caps declarative claim',
          'Body: second person, direct instruction; code and flags stay in monospace inline, never prose-quoted'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: sidebar chevrons rotate 90° on expand over 120ms ease; the tip callout may fade in 150ms on first paint; nothing else moves.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Amber CTA button', 'hover: fill lightens 8%; focus-visible: 2px amber outline, 2px offset; active: translateY(1px); disabled: 40% opacity'],
          ['Bordered ghost button', 'hover: border brightens to full white, fill gains a 6% white wash; focus-visible: 2px amber outline, 2px offset; active: translateY(1px)'],
          ['Sidebar nav item', 'resting: muted grey label; hover: label brightens to white; current section: amber label, no background or border change; focus-visible: 2px amber outline'],
          ['Inline text link', 'resting: amber, no underline; hover: underline appears; focus-visible: 2px amber outline, 2px offset'],
          ['Quick-link table row', 'hover: row fill lightens one step; focus-visible: 2px amber outline around the row']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one near-black page ground, one step-lighter panel/table fill, one darker nav-bar tone, one saturated brand hue carrying every CTA/active-state/link, plus white for headings and body. The tip-callout ground may be re-derived as a low-saturation dark tint of a second brand hue if the target has one, or dropped entirely if it does not — it is not required to exist. Fill the roles ground first, panel fill second, then the single accent last; there is no second accent to place.',
          locked: [
            'A single accent hue carrying every CTA, active state and link, with no second accent anywhere',
            'The two-column icon-plus-label quick-link table used as an in-page table of contents',
            'A tinted callout box breaking the panel rhythm to flag one path as fastest or recommended'
          ],
          register: 'developer-facing and utilitarian. Wrong for a consumer product, a luxury brand or anything selling on emotion rather than capability — a page in this style reads as instructions to follow, not a feeling to have.'
        },
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns · fixed 280px sidebar + fluid content, 64px content margin',
          rhythm: 'section 6u · row 3u · inline 1.5u',
          typeScale: [
            ['H1', 'grotesk, 700', '5u', 1.15],
            ['H2', 'grotesk, 700', '3.25u', 1.2],
            ['Body', 'grotesk, 400', '2u', 1.6],
            ['Nav / label', 'grotesk, 500', '1.75u', 1.4],
            ['Code', 'monospace, 400', '1.75u', 1.5]
          ],
          components: [
            ['Amber CTA button', 'square corners, 1.5u × 3u padding, solid amber fill, near-black label'],
            ['Bordered ghost button', 'square corners, 1.5u × 3u padding, 1px muted border, white label'],
            ['Tip callout', 'full-width panel, 2u padding, forest-green fill, 1px lighter-green left rule, monospace command highlighted inside'],
            ['Quick-link row', 'icon left at 2.5u, title + one-line description stacked right, row fill alternates one step lighter every other row'],
            ['Sidebar', 'fixed 280px, section labels in caps, chevron-expandable groups, active item in amber with no background change']
          ]
        },
        wireframe: [
          '┌ SIDEBAR 280px ┬─ 1 ──────────────────────────────── 12 ─┐',
          '│ logo + nav     │  TOP NAV — wordmark left, links right   4u │',
          '│ grouped links  ├──────────────────────────────────────────┤',
          '│ chevron groups │  H1 + intro paragraph                     │',
          '│                │  [amber CTA] [ghost] [ghost] [ghost]       │',
          '│                │  H2 Install                                │',
          '│                │  H3 + prose + monospace command block      │',
          '│                │  ┌ tip callout — full width ─────────────┐ │',
          '│                │  │ green fill, command highlighted        │ │',
          '│                │  └─────────────────────────────────────────┘',
          '│                │  H2 Quick Links                            │',
          '│                │  ┌ icon · title ─────┬ description ───────┐│',
          '│                │  │ row               │ row                ││',
          '│                │  │ row (alt fill)    │ row                ││',
          '│                │  └────────────────────┴────────────────────┘',
          '│                │  H2 Key Features — bulleted list           │',
          '│                │  footer — three link columns                │',
          '└────────────────┴─────────────────────────────────────────────┘',
          'The sidebar never scrolls with the content column; it holds its own scroll and stays fixed to viewport height. Quick-link rows extend downward for as many doc sections as exist, alternating fill every row. The tip callout is optional per page — include zero or one, never stacked.'
        ]
      },
      {
        id: 'engraved-ultramarine-hero',
        name: 'Engraved Ultramarine Hero',
        description: 'A single saturated ultramarine blue fills the entire canvas, carrying a white steel-engraving illustration of a many-armed mythological figure radiating hairline sunburst strokes behind a tracked serif wordmark. Monospace eyebrows and nav labels sit in all-caps beside a display serif set in full capitals, and every button is a stark white pill against the blue. A closing band repeats the same blue at a duotone product-photography scale before handing off to an oversized cross-promotional wordmark. Reads as mythic and premium rather than technical — a native-app landing built to feel like an art print.',
        vocabulary: [
          'full-bleed ultramarine ground',
          'radiating hairline sunburst',
          'steel-engraving figure illustration',
          'tracked all-caps serif wordmark',
          'monospace eyebrow label',
          'white pill download button',
          'grainy duotone product photography',
          'oversized cross-promo watermark'
        ],
        imageryTechnique: 'monochrome steel-engraving line illustration in white on the ultramarine ground, built from dense parallel hairline hatching and radiating sunburst strokes, no fill and no photographic texture within the illustration itself',
        imageryExclusions: 'no colour within the illustration beyond the single ground blue and white, no flat vector icons inside the artwork, no photographic imagery in the hero',
        fonts: {
          roles: [
            ['Display & wordmark', 'a high-contrast serif in full capitals — Canela, GT Sectra or Freight Display — tracked wide at display size'],
            ['Nav, eyebrows, labels & buttons', 'a monospace face — IBM Plex Mono, JetBrains Mono or Berkeley Mono — set in tracked all-caps throughout']
          ],
          never: 'a grotesk or humanist sans as the display face; lowercase in any nav, eyebrow or button label'
        },
        copyRegister: [
          'Eyebrows: 1–2 words, all-caps, tracked wide',
          'Display headline: the product name only, in full caps, two words maximum',
          'Body: one short paragraph, sentence case, stating platform and category plainly',
          'Button labels: imperative + platform noun, all-caps',
          'FAQ questions: direct, sentence case, ending in a question mark; answers stay under two sentences'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: sunburst hairlines may extend from the centre outward via stroke-dashoffset on load, 400ms ease-out; the wordmark and body fade up 12px, 200ms ease-out, staggered 80ms after the illustration.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['White pill download button', 'hover: fill dims 6% toward the ground blue; focus-visible: 2px white outline, 2px offset; active: translateY(1px); disabled: 40% opacity'],
          ['Platform card', 'hover: 1px border brightens from translucent white to full white; focus-visible: 2px white outline; active: translateY(1px)'],
          ['Nav link', 'resting: white monospace caps; hover: an underline appears at 60% opacity; focus-visible: 2px white outline, 2px offset'],
          ['FAQ row', 'resting: closed; hover: question brightens to full white; focus-visible: 2px white outline around the row']
        ],
        adaptation: {
          yields: 'The single ultramarine ground may be re-derived as the target\'s own saturated primary IF it stays fully saturated and dark enough to carry white at AA — this style tolerates no pastel or tinted substitute. White stays white; there is no second hue anywhere in the hero. The engraving illustration\'s subject may change, but its technique — white hairline hatching, a radiating sunburst, no fill — must not loosen into flat vector art or photography.',
          locked: [
            'Full-bleed single-hue ground with no gradient and no second colour',
            'A white steel-engraving illustration built from hairline hatching and a radiating sunburst',
            'Tracked all-caps serif wordmark paired with monospace everywhere else',
            'White pill buttons as the only button treatment on the ground'
          ],
          register: 'mythic and premium. Wrong for a page that needs to look approachable, fast or budget — the engraving technique and the single saturated hue read as expensive and considered, not casual.'
        },
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 96px side margin',
          rhythm: 'section 14u · block 7u · inline 2u',
          typeScale: [
            ['Display wordmark', 'serif, full caps, tracking +2%', '10u', 0.95],
            ['Section head', 'serif, full caps, tracking +4%', '4u', 1.1],
            ['Body', 'monospace, 400', '2u', 1.6],
            ['Eyebrow / nav / button label', 'monospace, 500, uppercase, tracking +8%', '1.5u', 1.3]
          ],
          components: [
            ['Sunburst illustration', 'centred figure with radiating hairline strokes extending to the canvas edge, white on the ground blue, spans 6–7 columns'],
            ['White pill button', '5u tall, 2u × 4u padding, fully rounded, blue label on white fill'],
            ['Platform card', 'bordered rectangle in translucent white, faint statue or figure photography ground, label + button stacked bottom-left'],
            ['FAQ row', 'full-width, hairline top rule, question in section-head weight, answer in body directly beneath, no accordion chevron drawn'],
            ['Cross-promo watermark band', 'oversized outline wordmark spanning the full width behind a foreground illustration, closes the page below a single CTA']
          ]
        },
        wireframe: [
          '┌─ 1 ──────────────────────────────────────────── 12 ─┐',
          '│  NAV  brand left · links centre · install right  5u  │',
          '├───────────────────────────────────────────────────────┤',
          '│  HERO — full-bleed ultramarine                        │',
          '│  ┌ 1–6 ─────────────┐        ┌ 7–12 ─────────────┐    │',
          '│  │ eyebrow            │        │ sunburst figure    │  │',
          '│  │ display wordmark    │       │ illustration        │  │',
          '│  │ body                │        │ (bleeds off top/R) │  │',
          '│  │ [white pill button] │       │                     │  │',
          '│  └────────────────────┘        └────────────────────┘  │',
          '├───────────────────────────────────────────────────────┤',
          '│  WHY — H2 + body left, illustration right, repeated   │',
          '│  twice at smaller scale                                │',
          '├───────────────────────────────────────────────────────┤',
          '│  PLATFORM ROW — 3-up bordered cards, same ground blue  │',
          '├───────────────────────────────────────────────────────┤',
          '│  FAQ — single column, hairline-ruled question rows      │',
          '├───────────────────────────────────────────────────────┤',
          '│  CROSS-PROMO — oversized watermark wordmark, single CTA │',
          '└───────────────────────────────────────────────────────┘',
          'The hero illustration is the only element permitted to bleed off a page edge; every other block stays inside the grid margins. The 3-up platform row never drops below three columns — on a narrower canvas the cards stack full-width rather than going to two-up. The cross-promo band is optional and belongs only where a second, related product genuinely exists to promote.'
        ]
      },
      {
        id: 'navy-serif-dashboard',
        name: 'Navy Serif Dashboard',
        description: 'An account-management shell built on a near-black navy canvas, lit by a slim indigo gradient bar along the very top edge. Page headlines run in a light, high-contrast serif — a section name, a dollar figure — against a UI otherwise set entirely in tracked grotesk and monospace, and a fixed sidebar carries a stacked wordmark, an account balance chip and grouped nav sections over a faint dot-pattern map watermark. Content resolves into hairline-bordered rectangular cards, tables and pill badges rather than photography — pricing figures, usage stats and subscription tiers all read as instrumentation. Reads as operational rather than persuasive: the job is account management, not conversion, even where one page argues a sales case.',
        vocabulary: [
          'slim top gradient bar',
          'stacked sidebar wordmark',
          'account balance chip',
          'monospace breadcrumb',
          'serif page headline',
          'hairline-bordered data card',
          'colour-coded pill badge',
          'dot-pattern map watermark'
        ],
        imageryTechnique: 'no photography inside the dashboard chrome itself — data is shown as tables, stat tiles, line charts and bordered cards; where product photography does appear (subscription tier cards, marketing feature tiles) it is grainy and blue-toned, sitting inside a card rather than as a page ground',
        imageryExclusions: 'no full-bleed photography, no illustration, no gradients beyond the single top edge bar',
        fonts: {
          roles: [
            ['Page headline (H1)', 'a light, high-contrast serif — Canela, GT Sectra or Freight Display — set at display size, never bold'],
            ['Sidebar wordmark', 'a heavy condensed grotesk or slab — Archivo Expanded, Druk or similar — stacked two lines'],
            ['UI body, nav, table & card text', 'a neutral grotesk — Inter, Söhne or General Sans'],
            ['Breadcrumbs, pricing figures & badges', 'a monospace face — IBM Plex Mono or JetBrains Mono']
          ],
          never: 'the display serif anywhere outside the H1 role; a script or handwritten face anywhere'
        },
        copyRegister: [
          'Breadcrumbs: a slash-prefixed section path, monospace, all-caps',
          'Page headline: the section name alone, one to three words, serif, sentence case',
          'Stat tile labels: one or two words, all-caps, small, beneath the figure they describe',
          'Card and button labels: imperative or noun-phrase, 1–3 words, all-caps for buttons, sentence case for card titles',
          'Badges: a single fact, all-caps or mixed-case as the fact demands'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: the line chart draws in left-to-right over 400ms ease-out on first paint; stat tiles fade up 8px, staggered 40ms apart; nothing else moves.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Solid blue CTA button', 'hover: fill lightens 8%; focus-visible: 2px white outline, 2px offset; active: translateY(1px); disabled: 40% opacity'],
          ['Sidebar nav item', 'resting: muted grey label; hover: label brightens to white; current page: white label plus a 2px left rule in the accent blue; focus-visible: 2px accent outline'],
          ['Data table row', 'hover: row fill lightens one step; focus-visible: 2px accent outline around the row'],
          ['Filter chip / tab', 'resting: 1px border, muted label; selected: filled white, near-black label; hover (unselected): border brightens; focus-visible: 2px accent outline'],
          ['Top-up amount chip', 'resting: 1px border; hover: border brightens; selected: filled, the state persists until another chip or a custom entry is chosen']
        ],
        adaptation: {
          yields: 'Palette hexes may be re-derived from the target brand IF the role structure holds: one near-black navy page ground, one step-lighter panel/sidebar ground, a further step-lighter card/table-row fill, a slim gradient bar at the very top in a saturated tint of the ground hue, one saturated accent carrying every primary CTA and the current-page nav rule, and white for headlines and primary body. Badge colours (free/green, discount/amber, warning/yellow) are semantic and stay fixed regardless of brand — they read as status, not brand voice. The sidebar wordmark and dot-pattern watermark may be redrawn in the target\'s own mark, but the balance chip, grouped nav sections and fixed-sidebar structure carry as-is.',
          locked: [
            'A slim saturated gradient bar running the full width of the very top edge only',
            'A light display serif reserved for the page H1 and nothing else',
            'A fixed sidebar with a stacked wordmark, an account balance chip and chevron-grouped nav sections',
            'Data shown as hairline-bordered cards and tables rather than illustration or photography'
          ],
          register: 'operational and instrumented. Wrong for a page whose job is to persuade a first-time visitor — this shell reads as an account you already hold, not a landing page, even on the one screen that argues a sales case.'
        },
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns · fixed 280px sidebar + fluid content, 48px content margin, 24px gutter',
          rhythm: 'section 8u · card 4u · inline 1.5u',
          typeScale: [
            ['H1', 'serif, 400', '6u', 1.05],
            ['Large numeral (e.g. balance)', 'serif, 400', '9u', 1.0],
            ['Card title / H2', 'grotesk, 600', '2.5u', 1.2],
            ['Body / table cell', 'grotesk, 400', '1.75u', 1.5],
            ['Breadcrumb / badge / figure', 'monospace, 500, tracking +4%', '1.5u', 1.3]
          ],
          components: [
            ['Top gradient bar', 'full-width, 0.5u tall, indigo-to-transparent, fixed to the very top of the viewport'],
            ['Sidebar', 'fixed 280px, stacked wordmark + mark top, balance chip beneath, chevron-grouped nav sections, faint dot-pattern watermark bottom, account row pinned to the bottom edge'],
            ['Data card', 'hairline 1px border, square or barely-rounded corners, 3u padding, title + figure + supporting row'],
            ['Stat tile', 'part of a borderless row, figure in the large-numeral scale, label in badge scale beneath, one tile highlighted with a filled ground'],
            ['Pill badge', 'fully rounded, 0.5u × 1.5u padding, semantic fill (green/amber/yellow) with a contrasting label'],
            ['Data table row', 'hairline bottom rule only, no vertical rules, figures right-aligned in monospace']
          ]
        },
        wireframe: [
          '┌ SIDEBAR 280px ─┬─ 1 ────────────────────────────── 12 ─┐',
          '│ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ top gradient bar, full width, 0.5u ▬▬▬▬▬│',
          '│ mark + wordmark │ // SECTION > SUBSECTION   breadcrumb   │',
          '│ ┌ balance chip ┐│                                        │',
          '│ └──────────────┘│ H1 — serif                              │',
          '├ ACCOUNT ─────────┤                                        │',
          '│  nav · nav · nav │ ┌ data card ─┐┌ data card ─┐┌ card ───┐│',
          '├ CLOUD ────────────┤ │            ││            ││        ││',
          '│  nav · nav · nav │ └────────────┘└────────────┘└────────┘│',
          '├ RESOURCES ────────┤                                        │',
          '│  nav · nav · nav │ ┌ table or chart, full content width ─┐│',
          '│  (dot-map watermark, faint, behind lower nav groups)     │',
          '│ account row — pinned bottom  │ └───────────────────────────┘│',
          '└──────────────────┴────────────────────────────────────────┘',
          'The sidebar never scrolls with the content column; only the content column scrolls, and the balance chip, nav groups and account row stay fixed to viewport height in that order top to bottom. The content column\'s card row is one to four cards wide depending on how many the page needs, but every card in a row shares the same height. Tables and charts always run the full content width, never inside a card alongside other cards.'
        ]
      },
      {
        id: 'cyanotype-output-readout',
        name: 'Cyanotype Output Readout',
        description: 'A near-white canvas holds duotone cyanotype-blue photography in a strict two-column row — image left, headline and body right — each row closing with a monospace output-number and seed-number tag and a single small line-icon glyph, as if every block were a generative print labelled with its own render metadata. Dashed hairline rules divide each row full-bleed. Reads as documentary and process-driven rather than promotional — a company describing itself the way it would caption a dataset.',
        vocabulary: [
          'duotone cyanotype photography',
          'dashed full-bleed divider',
          'output/seed monospace tag',
          'small line-icon glyph',
          'underlined section label',
          'two-column image-text row',
          'centred nav with social glyphs',
          'consistent single-hue accent'
        ],
        imageryTechnique: 'photography toned into a single blue duotone — near-white highlights, saturated blue shadows — documentary and observational in subject rather than staged or illustrative',
        imageryExclusions: 'no full-colour photography, no illustration, no gradients, no UI screenshots',
        fonts: {
          roles: [
            ['Nav & section labels', 'a classic serif in small caps or tracked capitals — Times, Freight Text or Tiempos'],
            ['Body, headings & metadata tags', 'a monospace face — IBM Plex Mono, JetBrains Mono or Courier — set bold for headings, regular for body']
          ],
          never: 'a grotesk or geometric sans as the primary body face; a display serif at large decorative size'
        },
        copyRegister: [
          'Section labels: 2–4 words, all-caps, underlined, monospace bold',
          'Nav labels: 1–2 words, small caps serif',
          'Body: short declarative paragraphs, third person, plain statement of fact — no imperative, no exclamation',
          'Metadata tags: an output number and a seed number, stacked, always both present, monospace bold'
        ],
        motion: [
          'No motion was observed — the reference is a static screenshot.',
          'Default: static. If animating: each row fades up 8px on scroll entry, 200ms ease-out, staggered by row; the dashed divider draws left-to-right via stroke-dashoffset ahead of the row above it.',
          'Transform and opacity only. No parallax, no scroll-jacking. Honour prefers-reduced-motion by reducing to opacity alone.'
        ],
        states: [
          ['Nav link', 'resting: accent-blue small caps; hover: underline appears; focus-visible: 2px accent outline, 2px offset'],
          ['Section label', 'resting: underlined by default; hover: underline thickens; focus-visible: 2px accent outline'],
          ['Row', 'no interactive affordance was observed — rows are not links; hover and focus states default to none']
        ],
        adaptation: {
          yields: 'The single accent may be re-derived as any brand hue IF the photography is toned into a true duotone of it — near-white highlight to a saturated shadow in the one hue — rather than left in full colour, and IF the same hue carries every nav link, section label and metadata tag with no second colour introduced. The metadata-tag convention — a two-line output-number / seed-number pair — is a specific device of this reference and may be swapped for a different two-line technical-sounding tag pair, but the row must keep exactly two lines and a monospace bold weight.',
          locked: [
            'A single-hue duotone applied to every photograph on the page',
            'Dashed, full-bleed hairline rules dividing every row',
            'A two-line monospace metadata tag beside every row',
            'A small single line-icon glyph unique to each row, sitting beside its metadata tag'
          ],
          register: 'documentary and process-driven. Wrong for a page that needs to sell urgency or emotion — the captioned, dataset-like presentation reads as observational, not persuasive.'
        },
        system: {
          baseUnit: 8,
          canvas: '1440 × 900 desktop',
          grid: '12 columns, 24px gutter, 64px side margin',
          rhythm: 'row 10u · inline 2u',
          typeScale: [
            ['Section label', 'monospace, 700, uppercase, underlined', '1.75u', 1.3],
            ['Body', 'monospace, 500', '1.75u', 1.5],
            ['Metadata tag', 'monospace, 700', '1.5u', 1.4],
            ['Nav', 'serif, small caps, tracking +6%', '1.5u', 1.3]
          ],
          components: [
            ['Image tile', 'square or near-square duotone photograph, fixed column width, no border'],
            ['Metadata tag', 'two stacked lines, an output number then a seed number, monospace bold, accent colour'],
            ['Line-icon glyph', 'single small outlined icon (globe, note, gem, …) beneath the metadata tag, accent colour, no fill'],
            ['Dashed divider', 'full-bleed, 1px, evenly dashed, accent colour at reduced weight']
          ]
        },
        wireframe: [
          '┌─ 1 ──────────────────────────────────────────── 12 ─┐',
          '│  NAV — centred small-caps links, home icon left  3u    │',
          '├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤',
          '│  ┌ 1–5 image ┐   ┌ 6–10 text ──────────┐ ┌11–12 tag┐│',
          '│  │ duotone    │   │ label (underlined)   │ │ output # │',
          '│  │ photograph │   │ heading + body        │ │ seed #  │',
          '│  └────────────┘   └───────────────────────┘ │ glyph  │',
          '│                                               └────────┘',
          '├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤',
          '│  (row repeats — image always column 1–5, text 6–10,   │',
          '│   tag 11–12 — the image side never alternates)          │',
          '└───────────────────────────────────────────────────────┘',
          'Every row shares the same three-column split; only the photograph and copy change. A dashed full-bleed divider separates every row from the next, including the first row from the nav. Extend the page by repeating rows in document order — there is no alternation to track.'
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
          'dark tape CTA',
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
          { name: 'Charcoal tape', hex: '#2C2C2C', usage: 'stacked tape CTA fill' }
        ],
        typography: 'Geometric grotesk throughout — display at roughly 56px/700 with tight tracking, body at 17px/400, and 12px all-caps eyebrows tracked wide ("HI THERE"). One eyebrow ("THREAD ON") is rotated 90°, reading top-to-bottom, set beside the thread in the white gap where the hero hands into the first block.',
        layoutNotes: 'White ground with illustration blocks alternating left and right. A hand-drawn connector line runs from below the hero to the closing band, stepping between sections and physically joining them. Watercolour washes have torn organic edges and bleed off the left or right edge rather than sitting inside the grid. Numbered ring badges mark each block. A full-bleed mustard CTA band sits above the black footer.',
        imagerySubject: 'two people collaborating at a whiteboard, sketching a diagram',
        mood: ['approachable', 'optimistic', 'human', 'confident'],
        signature: {
          carry: [
            'A single hand-drawn line runs from below the hero to the top of the closing band, stepping left and right to physically connect every section',
            'Watercolour washes have torn organic edges and bleed off the page edge — never rectangles sitting inside the grid',
            'Numbered ring badges (01, 02, 03) sit above each block heading, stroke colour matching the adjacent wash',
            'CTAs are stacked tape-style rectangles in near-black, their tracked all-caps label set in the adjacent wash hue',
            'A rotated eyebrow reads top-to-bottom beside the connector thread as it leaves the hero, on white — never over a wash'
          ],
          rewrite: [
            'CTA copy — the reference uses playful imperatives ("PROVE IT", "LET\'S TALK"); write new 1–3-word all-caps imperatives for the target',
            'Eyebrow copy — the reference greets with "HI THERE" and puns with "THREAD ON"; write new 1–3-word conversational eyebrows for the target',
            'Highlighted words — the marker swipe lands on the one or two words carrying each headline\'s claim; choose the new headline\'s claim words'
          ]
        }
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
        signature: {
          carry: [
            'Article cards form a full-bleed 2×2 grid with zero gutters — colour fields meet flush, no borders or radii',
            'A long → arrow is the only link affordance on each card, bottom-left, with no button around it',
            'The active filter tab is marked with a hand-drawn squiggle underline rather than a solid rule',
            'The featured CTA is a tape-style rectangle in highlighter yellow rather than the site\'s usual near-black',
            'Watercolour wash appears only beneath the illustration\'s feet, acting as a ground line rather than a field'
          ],
          rewrite: [
            'Article titles, filter-tab labels and card body copy are reference content — write the target\'s own articles and categories',
            'Button copy — the tape buttons read "READ IT" and "JOIN"; write new 1–2-word all-caps imperatives for the target'
          ]
        }
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
        signature: {
          carry: [
            'The contact form is a mad-lib: one running sentence at headline size with inline underlined blanks as the inputs',
            'Field labels float above each blank in small grey caps, inside the sentence flow rather than beside it',
            'Every input is a 2px mint underline — no boxes, no fills, no borders anywhere in the form',
            'Mint replaces the site\'s usual yellow across this whole page, including the highlighter swipe',
            'The SEND button is a tape-style rectangle matching the blanks, in mint rather than the site\'s near-black'
          ],
          rewrite: [
            'The running sentence itself is reference copy — write a new one-sentence form in the target\'s voice that collects the same fields (name, company, need, email)',
            'The mint SEND button label is reference copy — write the target\'s own 1–2-word all-caps send imperative'
          ]
        }
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
        signature: {
          carry: [
            'Three value panels sit flush as one hard-edge colour band, each with its own eyebrow, heading and checkmark list',
            'Team portraits are black-and-white squares in a five-across grid on a full-bleed coral ground',
            'Year headings in the history cards are struck through with a hand-drawn red marker line',
            'Faint dot-grid texture fills the white sections — the only texture anywhere in the site',
            'Service categories appear as full-width coloured accordion bars with a caret at the right edge'
          ],
          rewrite: [
            'Panel eyebrows — the reference declares "WE ARE", "WE BELIEVE", "WE DELIVER"; write new 1–3-word first-person-plural declarations',
            'History-card years and milestones are the reference\'s history — use the target\'s real dates',
            'Team portraits are the reference\'s staff — use the target\'s real people, kept black-and-white'
          ]
        }
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
          { name: 'Terracotta', hex: '#CB693F', usage: 'pill CTAs, eyebrow labels, inline links', contrastNote: '3.27:1 measured against the near-white it actually sits on, short of the 4.5:1 the eyebrow labels and inline links need. As a CTA fill it is no better — white on this terracotta is 3.73:1. The accent sits mid-luminance, so it fails in both directions and can carry only large text or non-text fills.' },
          { name: 'White', hex: '#FFFFFF', usage: 'card and mockup surfaces' },
          { name: 'Near-black', hex: '#1A1A1A', usage: 'display type and code text' },
          { name: 'Hairline grey', hex: '#F0F0F0', usage: 'card borders' }
        ],
        typography: 'Sans throughout: display at roughly 48px/700 tight-tracked, section heads at 32px/700, body at 16px/400 held to a narrow measure, and 12px terracotta all-caps eyebrows above every section head ("WHAT WE BUILD", "OUR APPROACH", "GET STARTED").',
        layoutNotes: 'Full-bleed pastel gradient mesh with a fine grid texture, content held to a narrow centred measure. A light code-editor mockup with window chrome and a file-tree sidebar floats over the wash. Service cards run 1 + 3 with pale tinted fills. The four-step approach section uses a vertical dotted spine with cards alternating left and right. The closing section pairs a progress-meter sidebar with a long multi-field form.',
        imagerySubject: 'an abstract pastel colour field, blurred and gridded, with no subject in it',
        mood: ['calm', 'premium', 'technical', 'unhurried'],
        signature: {
          carry: [
            'The code-editor mockup is light, not dark, with window traffic-lights and a file-tree sidebar',
            'Approach steps alternate left and right of a vertical dotted spine, each anchored by a small ringed numeral',
            'A terracotta all-caps eyebrow sits above every section headline without exception',
            'Card body copy ends in tinted rust micro-pills used as inline tags',
            'The closing section is a full multi-field consultation form with a live progress meter in a sidebar'
          ],
          rewrite: [
            'Eyebrow strings — the reference labels sections "WHAT WE BUILD", "OUR APPROACH", "GET STARTED"; write new 2–3-word all-caps labels for the target',
            'Form fields and progress-meter steps mirror the reference\'s intake — collect what the target actually needs'
          ]
        }
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
        signature: {
          carry: [
            'A serif-italic phrase is set inline inside the sans display headline at the same size',
            'The roadmap is a long vertical dotted spine with cards alternating either side and ringed numerals on the spine',
            'Social proof is real dark chat-app screenshots in a 2×2 grid, not styled testimonial cards',
            'One centred price card carries the figure at display size in terracotta above a checkmark list',
            'A three-step numbered circle row sits directly above the application form as the closing move'
          ],
          rewrite: [
            'The italic phrase — the reference italicises its timeframe promise ("in 90 Days"); italicise the new headline\'s outcome phrase',
            'The price figure and checkmark inclusions are the reference\'s offer — use the target\'s real price and terms',
            'Chat screenshots are real conversations — substitute the target\'s own receipts, never mock them up'
          ]
        }
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
        signature: {
          carry: [
            'Serif display is set large and light — never bold — with unusually generous leading',
            'Every documentary photo is paired side by side with a checkmark or numbered list, never used alone',
            'Section bands are pale ice-blue and white with no rule or border marking the transition',
            'The pull-quote is centred serif with a circular avatar beneath and blue link-styled attribution',
            'Form fields are bare 1px underlines with the label above — no boxes, no fills'
          ],
          rewrite: [
            'Comparison copy — the two-column checkmark block contrasts what the offer is with what you get; rewrite both columns for the target offer',
            'The quote, avatar and attribution are reference people — use a real named client of the target'
          ]
        }
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
        signature: {
          carry: [
            'Case studies are a mosaic of unequal tiles mixing photography with flat saturated colour panels',
            'Colour tiles carry their label as white text set directly on the fill, with no card or overlay',
            'A four-part interlocking ring diagram labels the process stages',
            'Service links are underlined in different accent hues, one colour per service line',
            'The perspectives carousel pairs a full-height cutout portrait with a stacked avatar column beside the quote'
          ],
          rewrite: [
            'Process stage names — the reference uses discover, define, design, develop; use the target\'s own four stages, one word each',
            'Case-study tiles and their labels are reference work — substitute the target\'s projects'
          ]
        }
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
        signature: {
          carry: [
            'Oversized burnt-orange statistics carry the argument, each with a tiny all-caps caption beneath',
            'Cream, white and black bands rotate, so no two adjacent sections share a ground colour',
            'Every case-study card leads with its metric in orange above the serif title, not below it',
            'The team appears as a dense four-column grid of candid headshots at equal size',
            'The footer is teal — the only place that hue appears at full-bleed scale'
          ],
          rewrite: [
            'Statistic values and captions are the reference\'s outcomes — use the target\'s real figures, never carry the numbers',
            'Headshots are the reference\'s team — use the target\'s real people at equal crop and size'
          ]
        }
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
        signature: {
          carry: [
            'Each case study is a full-width rounded band in its own saturated colour — navy, purple, rust, black',
            'Every case band pairs a serif title and tag pills on the left with a video testimonial card on the right',
            'A literal before-and-after comparison sets two interface screenshots against each other with arrows between',
            'The closing CTA band is acid lime, the only high-chroma light colour on an otherwise deep palette',
            'Testimonial cards carry a real face and a play button rather than a pull-quote alone'
          ],
          rewrite: [
            'Tag pill labels, case titles and testimonial faces are reference content — use the target\'s projects and clients'
          ]
        }
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
        signature: {
          carry: [
            'Full-width cream and lavender panels are inset as islands inside the black page, never used as the ground',
            'The hero headline ends in a live typewriter cursor mid-word',
            'Section labels are small pill badges with a leading dot, sitting above each heading',
            'Reach is shown as a world map in lavender and mint beside oversized metric numerals',
            'Every dark card is defined by a 1px hairline border alone, with no fill behind it'
          ],
          rewrite: [
            'Map data, metrics and industry tabs are the reference\'s reach — plot the target\'s real markets and figures'
          ]
        }
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
        signature: {
          carry: [
            'Sections are divided by large curved arc horizons rather than straight edges, so the dark ground swells and recedes',
            'A 3D character render is the hero image, not a screenshot or photograph',
            'Magenta is used only for pills and metrics — never for type, fills or borders',
            'The page inverts to white in the middle third, then returns to purple for the closing arc',
            'Feature cards carry checkmark lists with a magenta CTA inside each card rather than one shared CTA'
          ],
          rewrite: [
            'Metric values are the reference\'s results — use the target\'s real numbers',
            'The robot render is the reference\'s mascot — substitute the target\'s own character, kept a 3D render'
          ]
        }
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
        signature: {
          carry: [
            'Project tiles form a two-column mosaic at deliberately uneven heights, never a regular grid',
            'Each tile is either a fully saturated flat colour or a full-bleed photograph — no cards, borders or radii',
            'A rainbow gradient hairline is the only divider between major sections',
            'Process steps are thin line-icon circles in a four-up row, all at identical size',
            'The testimonial band is a cyan gradient carrying an oversized review score at its left edge'
          ],
          rewrite: [
            'The review score and testimonial are reference proof — use the target\'s real score and quote',
            'Project tiles are reference work — substitute the target\'s portfolio, keeping saturated flat colour or full-bleed photography per tile'
          ]
        }
      },
      {
        id: 'experience-dynamics-1',
        file: 'images/experience-dynamics 1.png',
        thumb: 'images/thumbs/experience-dynamics 1.webp',
        display: 'images/display/experience-dynamics 1.webp',
        categoryId: 'dark-saturated-product-showcase',
        title: 'Experience Dynamics — Service Design Consultancy',
        descriptor: 'Cyan hero and dark duotone photo tiles, punctuated by salmon-pink pill CTAs.',
        keywords: [
          'cyan hero band',
          'duotone photo tile',
          'salmon-pink pill CTA',
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
          { name: 'Salmon pink', hex: '#FF7587', usage: 'pill CTAs and inline highlights' },
          { name: 'White', hex: '#FFFFFF', usage: 'headings and logo wall ground' }
        ],
        typography: 'Sans throughout: hero display at roughly 34px/600 reversed out of cyan; tile headings at 22px/600 over photography; body at 14px/400; 11px all-caps micro labels on the pill CTAs.',
        layoutNotes: 'Cyan hero pairs the headline with a cutout portrait at right. Below it a quadrant grid of tiles alternates duotone photography with flat dark panels holding pull-quotes and case links. A full-width video tile carries a play button and a cyan CTA. A dark contact section places a duotone portrait beside a form with a drag-and-drop upload field. A full-colour client logo wall sits on white, followed by a cyan newsletter band and a dark footer.',
        imagerySubject: 'a consultant speaking to camera in an office, and colleagues at a whiteboard session',
        mood: ['expert', 'personal', 'established', 'direct'],
        signature: {
          carry: [
            'Photography is duotone-graded into the palette so every image reads as blue rather than full colour',
            'Tiles are arranged as quadrants that meet flush, alternating photography with flat dark copy panels',
            'The hero portrait is a cutout with no background, standing directly on the cyan band',
            'Salmon-pink pill CTAs are the only warm colour on the page and appear in every section',
            'The client logo wall is full-colour on white — deliberately breaking the duotone treatment used elsewhere'
          ],
          rewrite: [
            'The client logo wall is the reference\'s roster — use the target\'s real clients',
            'Portraits are the reference\'s consultants — use the target\'s people, cut out on the hero band'
          ]
        }
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
          { name: 'Pale lilac', hex: '#CFCFF3', usage: 'body copy on dark grounds' }
        ],
        typography: 'Sans throughout: display at roughly 36px/600; section heads at 26px/600; body at 14px/400 in pale lilac; stat numerals at 32px/600 above a 10px all-caps caption.',
        layoutNotes: 'Deep indigo ground with generously rounded corners on every surface — photo tiles, cards, panels and buttons all share a large radius. A stat row pairs line icons with numerals and captions. A periwinkle process panel stacks four labelled steps down its right edge. Client testimonials form a masonry grid of white rounded cards at uneven heights. A white rounded panel carries the closing form.',
        imagerySubject: 'two colleagues reviewing a product interface together at a desk',
        mood: ['assured', 'corporate', 'polished', 'systematic'],
        signature: {
          carry: [
            'Every surface shares one large corner radius — photos, cards, panels and buttons alike',
            'The process panel is a single periwinkle block with its four steps stacked down the right edge',
            'Testimonials form a masonry grid of white rounded cards at uneven heights against the indigo ground',
            'Statistics pair a line icon above the numeral, with the caption below in small caps',
            'The closing form sits inside a white rounded panel rather than directly on the page ground'
          ],
          rewrite: [
            'Stat values and captions are reference outcomes — use the target\'s real figures',
            'Process step labels are the reference\'s method — write the target\'s own four steps'
          ]
        }
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
          { name: 'Warm taupe', hex: '#D4CFC4', usage: 'muted captions and secondary text', contrastNote: '1.49:1 against the near-white it sits on — the most severe failure in the library. It sets the muted captions and secondary text, which are close to invisible in the capture itself. Darken substantially before reuse; this is not a stylistic choice worth carrying.' }
        ],
        typography: 'Sans throughout: centred display at roughly 34px/500; section heads at 24px/500; body at 15px/400 held to a narrow measure; small dark buttons carry 12px/500 labels.',
        layoutNotes: 'Bone ground with an unusually low content density. A logo wall is drawn as a bordered cell grid with hairline rules and no fills. Content alternates between centred single-column statements and two-column rows pairing copy with a line-art diagram. Diagrams are fine grey isometric or dot-cluster drawings, each containing exactly one orange sphere as the focal point.',
        imagerySubject: 'a fine grey isometric wireframe lattice with one orange sphere resting on it',
        mood: ['restrained', 'pragmatic', 'quiet', 'assured'],
        signature: {
          carry: [
            'Exactly one orange element appears in each diagram, acting as the focal point in an otherwise grey drawing',
            'The logo wall is a bordered cell grid with hairline rules and no fills, not a floating row of marks',
            'The canvas is warm bone rather than white, and stays visible across most of the page',
            'Statements alternate between centred single-column and two-column diagram rows, with no other layout used',
            'Buttons are small, dark and rectangular — deliberately understated against all the empty space'
          ],
          rewrite: [
            'The logo wall is the reference\'s clients — fill the bordered cells with the target\'s real logos'
          ]
        }
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
        signature: {
          carry: [
            'Project tiles are placed asymmetrically at deliberately uneven sizes — never a regular grid',
            'Each tile is captioned by a pair in micro caps: client name left, discipline right',
            'A full statement block is set in low-contrast grey at display size, almost disappearing into the canvas',
            'An oversized wordmark runs across the page foot and bleeds off both edges',
            'Insights are hairline-ruled rows with no thumbnails, category label left and title right'
          ],
          rewrite: [
            'The oversized wordmark at the page foot is the reference\'s brand — set the target\'s own wordmark bleeding off both edges',
            'Caption pairs name the reference\'s clients and disciplines — write the target\'s own'
          ]
        }
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
        signature: {
          carry: [
            'A narrow fixed left rail holds the entire navigation at very small size, with content inset beside it',
            'Projects are a single stacked column of ultra-wide tiles, never a two- or three-up grid',
            'Every tile image is desaturated to near-monochrome, so acid green is the only chroma on the page',
            'Each tile carries its title reversed out at bottom-left and a circular green arrow at bottom-right',
            'The white content panel floats on the grey canvas rather than filling the viewport'
          ],
          rewrite: [
            'Tile imagery and project names are reference work — substitute the target\'s projects, desaturated to match'
          ]
        }
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
        signature: {
          carry: [
            'Soft organic colour blobs sit behind each case-study screenshot in teal, magenta or sky — the only non-neutral shapes',
            'Testimonials are video cards with a play button, star rating and named role, two across',
            'Every case study leads with bolded metric bullets rather than prose',
            'A horizontal strip of product screenshots runs directly under the hero as proof-of-work before any copy',
            'Section headings are centred while case-study content alternates left and right beneath them'
          ],
          rewrite: [
            'Metric bullets are the reference\'s case results — use the target\'s real figures in the same bolded-inline form',
            'Video testimonials are reference clients — use the target\'s real clients'
          ]
        }
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
          { name: 'Steel blue', hex: '#4D77BD', usage: 'inline links and section labels', contrastNote: '4.29:1 against the near-white it sits on, against the 4.5:1 the inline links and section labels need — a marginal miss rather than a design failure. White on the same blue is 4.48:1, so the button fill misses by the same hair.' },
          { name: 'Data yellow', hex: '#F5BD07', usage: 'chart and scorecard highlights' },
          { name: 'Off-white', hex: '#F6F6F6', usage: 'alternating band behind the closing CTA' },
          { name: 'Charcoal', hex: '#333333', usage: 'body copy' }
        ],
        typography: 'Sans throughout at small sizes: display at roughly 30px/600, section heads at 22px/600, body at 14px/400 set in long measures. Client quotes use a serif at 18px italic. Line length and density are deliberately high.',
        layoutNotes: 'White ground with an unusually dense text-to-space ratio. Claims pair with data-table and scorecard screenshots placed right of the copy. Client logo bars break the sections. A long two-column accordion lists industry-specific audits. Brand pull-quotes are set centred with a large grayscale wordmark above them. A pale CTA band precedes the deep navy footer, which is itself a dense multi-column link directory.',
        imagerySubject: 'UX audit scorecards, benchmark tables and annotated interface screenshots',
        mood: ['rigorous', 'dense', 'authoritative', 'unglamorous'],
        signature: {
          carry: [
            'Text density is deliberately high — long measures, small type, minimal spacing between blocks',
            'Every claim is paired with a data-table or scorecard screenshot placed to its right',
            'Brand quotes are centred beneath a large grayscale client wordmark rather than an avatar',
            'Industry audits are listed as a two-column accordion running dozens of rows deep',
            'The navy footer is a dense multi-column link directory, as tall as a content section'
          ],
          rewrite: [
            'Data tables, scorecards and benchmark figures are the reference\'s research — show the target\'s real data, never invented numbers'
          ]
        }
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
        signature: {
          carry: [
            'Spot illustrations use filled colour shapes with outlined figures — not line art, not photography',
            'Reviews are Clutch-style cards with blue star rows and a verified badge beneath each attribution',
            'Project screenshots each sit on their own saturated colour tile rather than on white',
            'The closing CTA band carries a subtle squiggle texture over the flat blue',
            'A tracked all-caps eyebrow labels every section, always above the heading'
          ],
          rewrite: [
            'Eyebrow strings — the reference uses 2–4-word all-caps labels ("WHAT WE DO", "CASE STUDIES"); write the target\'s own',
            'Clutch reviews and verified badges are reference proof — use the target\'s real review platform and scores'
          ]
        }
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
          { name: 'Teal', hex: '#078593', usage: 'outlined and solid pill CTAs, links', contrastNote: '4.20:1 against the near-white it sits on, short of 4.5:1 for the links named here. White on the same teal reaches only 4.39:1, so the solid pill CTAs miss too — another mid-luminance accent that fails in both directions.' },
          { name: 'Pale peach', hex: '#F6EAC6', usage: 'icon-pattern tile behind the first card' },
          { name: 'Blush', hex: '#FFAB99', usage: 'icon-pattern tile behind the second card' },
          { name: 'Pale mint', hex: '#C6EAEA', usage: 'icon-pattern tile behind the third card' }
        ],
        typography: 'Centred serif display at roughly 30px/400 across three lines; sans body at 14px/400; card headings at 18px/600 reversed out of navy; teal pill CTAs carry 12px all-caps tracked labels.',
        layoutNotes: 'A white content column sits inside a slate navy page frame. Focus areas are shown as three offset pairs: a pastel tile filled with a repeating line-icon pattern, overlapped by a dark navy card carrying the copy, alternating which side leads. An award badge row, a two-column accordion, and a grayscale client logo grid follow. A pale band carries contact details above the navy footer.',
        imagerySubject: 'repeating line-icon patterns of domain objects — carts, shields, brain glyphs — tiled at low contrast',
        mood: ['clear', 'considered', 'professional', 'calm'],
        signature: {
          carry: [
            'Focus areas pair a pastel icon-pattern tile with a dark navy card overlapping it, alternating which side leads',
            'The pattern tiles are filled with repeating line icons drawn from that focus area\'s domain',
            'The whole content column is inset inside a slate navy page frame rather than running full-bleed',
            'Display copy is centred serif across three short lines, unusually narrow for the page width',
            'Award badges are shown as their original hexagonal medallions in a six-up row, not flattened to logos'
          ],
          rewrite: [
            'Icon-pattern glyphs are drawn from each focus area\'s domain — redraw the tiles from the target\'s own domains',
            'Award medallions are the reference\'s awards — show the target\'s real ones'
          ]
        }
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
        signature: {
          carry: [
            'One electric green carries every accent — icons, checks, highlights and the full-bleed closing band',
            'Full-bleed black bands interrupt the white ground at regular intervals, each holding a single claim',
            'Help topics are shown as pale mint cards with abstract green leaf shapes rather than conventional icons',
            'The team appears as a candid photo grid of uneven tile sizes, not as headshots',
            'Guarantees run as a horizontal strip of short negative statements'
          ],
          rewrite: [
            'Guarantee strings — the reference reassures with "no cost", "no commitment"; write the target\'s own short negative reassurances',
            'Team photos are the reference\'s studio — use candid photos of the target\'s real team'
          ]
        }
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
          { name: 'Mint green', hex: '#07BDA1', usage: 'metrics, inline highlights, accent numerals', contrastNote: '2.27:1 against the cream it sits on. Everything it sets here is large — an italic display line and oversized metric numerals — so the bar is 3:1, and it still fails. It reads better than the number suggests at display size, but would not survive at body size.' },
          { name: 'Off-white', hex: '#F6F6F6', usage: 'secondary light band' },
          { name: 'Charcoal', hex: '#121212', usage: 'card fills on the dark bands' }
        ],
        typography: 'Condensed sans display in all caps at roughly 64px/800 with tight leading, interrupted by serif-italic phrases at the same size ("that don\'t.", "you can measure", "for itself."). Body at 14px/400; service rows at 16px/600 all-caps.',
        layoutNotes: 'Stark alternation between full-bleed black and white bands with no transitional colour. Display type fills the full measure with no accompanying image. Device screenshots float over the bands carrying mint metric callouts. Statistics run four-up at display size. Services are an accordion of all-caps rows with arrow glyphs at the right edge. Testimonial cards sit three-up on white.',
        imagerySubject: 'mobile app screens floating at an angle with metric callouts beside them',
        mood: ['blunt', 'confident', 'high-contrast', 'commercial'],
        signature: {
          carry: [
            'Every display line pairs heavy condensed caps with a serif-italic phrase completing the sentence',
            'Bands alternate pure black and pure white with no intermediate tone anywhere in the page',
            'Mint appears only on numerals and metric callouts — never on type, fills or buttons',
            'Display blocks fill the full 12-column measure with no accompanying image beside them',
            'Service categories are all-caps accordion rows with a → glyph pinned to the right edge'
          ],
          rewrite: [
            'Serif-italic completions — each caps sentence is finished by an italic phrase ("that don\'t.", "you can measure"); write new completions that land the target\'s claim',
            'Statistic values are reference results — use the target\'s real numbers'
          ]
        }
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
          { name: 'Forest teal', hex: '#1B7563', usage: 'secondary headings and body accents' },
          { name: 'Mint green', hex: '#1BFFBD', usage: 'highlighter swipe and footer accent type' },
          { name: 'Ink black', hex: '#1A1A1A', usage: 'body copy and solid buttons' },
          { name: 'Sage grey', hex: '#7E7E7E', usage: 'captions and metadata', contrastNote: '3.89:1 against the near-white it sits on, short of the 4.5:1 captions and metadata need. A small darkening clears it; nothing structural is wrong here.' }
        ],
        typography: 'Very heavy condensed sans in all caps at roughly 44px/800 for section headings in deep teal, each answered directly beneath by a serif-italic sentence at 24px/400 carrying a thickly underlined link. Body at 15px/400; case-study titles at 24px/700.',
        layoutNotes: 'White ground with a gradient-mesh hero carrying ghosted outline display type. Each section opens with a flush-left heavy caps heading immediately followed by a serif-italic line. Case studies run two-up separated only by a thin vertical rule with no card or fill. Article cards run four-up with saturated thumbnail images. A deep teal footer carries the email address at heading size in mint.',
        imagerySubject: 'saturated abstract poster art and portrait collages used as article thumbnails',
        mood: ['opinionated', 'editorial', 'European', 'direct'],
        signature: {
          carry: [
            'Every section heading is heavy condensed caps in teal, answered immediately beneath by a serif-italic sentence',
            'The serif-italic line always contains one thickly underlined link as its emphasis',
            'A mint highlighter swipe marks a single serif-italic line, used exactly once on the page',
            'Case studies are separated by a thin vertical rule alone — no cards, borders or fills',
            'The footer sets the studio email address at heading size in mint on deep teal'
          ],
          rewrite: [
            'The footer email is the studio\'s — set the target\'s real address at heading size',
            'Article thumbnails are the reference\'s editorial art — substitute the target\'s own imagery at equal saturation'
          ]
        }
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
          { name: 'Annotation red', hex: '#E03C1F', usage: 'hand-drawn circles, arrows and tab labels', contrastNote: '3.79:1 against the cream it sits on, short of 4.5:1 for the tab labels named here. The hand-drawn circles and arrows are graphics rather than text and are not held to this threshold.' },
          { name: 'White', hex: '#FFFFFF', usage: 'closing form card' }
        ],
        typography: 'Serif display at roughly 44px/400 with generous leading; section heads at 30px/400 serif; body at 14px/400 sans; 10px all-caps red tab labels; press headlines set in serif at 20px in a hairline-ruled list.',
        layoutNotes: 'Cream canvas alternating with full-bleed black bands. Brand work is shown as flat colour tiles at logo scale — one wide, two half-width — each with a tiny caption beneath. Hand-drawn red circles and arrows annotate headings, book covers and FAQ titles throughout. A book promotion card sits on black with a red arrow pointing at the cover. Client press runs as a hairline-ruled serif list with a red arrow link at the foot.',
        imagerySubject: 'brand identity work shown as flat colour fields with the client wordmark centred',
        mood: ['confident', 'crafted', 'editorial', 'warm'],
        signature: {
          carry: [
            'Hand-drawn red circles and arrows annotate headings, covers and FAQ titles across the whole page',
            'Brand work appears as flat colour tiles at logo scale rather than as screenshots or mockups',
            'The canvas is cream, not white, and alternates with pure black full-bleed bands',
            'Section labels appear as small red tabs attached to the top edge of the band they introduce',
            'Client press is an editorial serif list with hairline rules and no thumbnails'
          ],
          rewrite: [
            'Press headlines and the book promotion are the reference\'s publications — substitute the target\'s real press and publications',
            'Brand tiles carry reference client wordmarks — use the target\'s real client marks'
          ]
        }
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
          { name: 'Amber', hex: '#F3993F', usage: 'headline emphasis word, section headings, register link', contrastNote: '2.50:1 measured against the brown photograph it actually sits on. The verifier pairs it against the off-white page ground instead, which is the wrong pairing — but the real one is worse, not better. Both the headline emphasis word and the register link fail.' },
          { name: 'Corporate blue', hex: '#0785BD', usage: 'outlined icon circles and the Launch CSA nav button', contrastNote: '3.95:1 against the near-white it sits on. The outlined icon circles are graphics and exempt, but the nav button carries a white label on this blue at 4.12:1, which also misses.' },
          { name: 'White', hex: '#FFFFFF', usage: 'nav bar and the rounded search field' }
        ],
        typography: 'Sans throughout: hero display at roughly 40px/600 with the first word in amber; section headings at 24px/600 in amber; tile titles at 18px/600; body at 16px/400; link rows at 15px/400 each closing with a trailing arrow.',
        layoutNotes: 'Full-bleed photograph under a heavy dark scrim carries the headline and a rounded search field, with the photo subject bleeding off the right edge. News and Spotlight sit as two plain link columns inside the darkened band below. A light band holds twelve capability tiles four across, each an outlined blue circle icon above a title and two lines of body. A full-width curved wave hands the light band into the dark resources footer.',
        imagerySubject: 'a person at a laptop holding a mug, shot in warm natural light in a plain interior',
        mood: ['institutional', 'service-like', 'orderly', 'plain'],
        signature: {
          carry: [
            'The headline sits directly on the scrimmed photograph with no card, panel or plate behind it',
            'News and Spotlight are two plain link columns inside the darkened hero band, not a separate section',
            'Capability tiles are outlined blue circle icons above a title and two lines of body, four across and three rows deep',
            'A full-width curved wave hands the light icon grid into the dark resources footer',
            'Every link inside the dark bands closes with a trailing arrow glyph instead of being underlined'
          ],
          rewrite: [
            'Tile titles, News and Spotlight links are the reference\'s programmes — write the target\'s own 2–4-word noun-phrase titles',
            'The search placeholder and hero headline are reference copy — write the target\'s own task-oriented prompt'
          ]
        }
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
          { name: 'Amber', hex: '#F59323', usage: 'display headline, CTA fills, line icons, statistic numerals', contrastNote: 'Checked, and it splits. The verifier pairs this against white for 2.31:1, but the display headline and statistic numerals sit on a dark navy ground, measuring 5.68:1 — clear at any size. Where it is a CTA fill the white label on it is 2.31:1, which fails badly. Same hex, one role safe and one not.' },
          { name: 'Corporate blue', hex: '#0785BD', usage: 'anchor sub-nav band, inline links, nav button', contrastNote: '3.95:1 against the near-white it sits on, short of the 4.5:1 the inline links and nav button label need.' },
          { name: 'Charcoal', hex: '#313131', usage: 'demo-video button and testimonial card fills' },
          { name: 'Near-black', hex: '#232323', usage: 'footer band' },
          { name: 'Off-white', hex: '#F5F5F5', usage: 'thin transitional band above the curved divider' }
        ],
        typography: 'Sans throughout: hero display at roughly 34px/600 in amber; feature titles at 17px/600; body and bullet lists at 15px/400; statistics at 64px/300 in amber above a 15px caption with the money figure bolded; the blue sub-nav links at 15px/400.',
        layoutNotes: 'Deep navy hero splits an amber headline and amber CTA left against an embedded video thumbnail right. A blue anchor sub-nav band runs full width directly beneath it. The white feature section places a rotated statement at far left against a six-cell grid of amber line-art icons with bulleted body copy. An orange CTA card floats over the curved divider, half on white and half on navy. Below, three oversized amber statistics sit on navy, then a testimonial carousel of bordered cards with circular avatars.',
        imagerySubject: 'a video still of a meeting room seen through overlapping translucent panels on a dark network backdrop',
        mood: ['institutional', 'explanatory', 'evidence-led', 'corporate'],
        signature: {
          carry: [
            'The hero splits an amber headline left against an embedded video thumbnail right, both on deep navy',
            'A blue anchor sub-nav band of in-page links sits directly beneath the hero as its own full-width band',
            'Feature icons are amber line-art glyphs with no enclosing circle, unlike the outlined blue circles used elsewhere on the site',
            'An amber CTA card floats over the curved divider, half on the white band and half on the navy one',
            'Statistics are set at display size in amber on navy, with the money figure bolded inside the caption beneath'
          ],
          rewrite: [
            'Statistics and money figures are the reference\'s business case — use the target\'s real numbers with the figure bolded',
            'Sub-nav anchor labels name the reference\'s page sections — write the target\'s own'
          ]
        }
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
        signature: {
          carry: [
            'Every claim carries a monospaced uppercase label beneath it naming the standard it is scored against',
            'The diagnostic framework is a bordered four-by-two grid sharing 1px rules between cells, with exactly one cell tinted mint to explain the scoring',
            'Findings are classified by two independent legends — severity and effort — each a row of pill tags in its own hue with a leading glyph',
            'The only image on the page is a single-stroke line chart on a flat tinted plate, with no axes, labels or gridlines',
            'Ordered steps place the teal numeral above a hairline rule and close with a monospaced line stating the deliverable'
          ],
          rewrite: [
            'The standards cited — the reference scores against CORE WEB VITALS, WCAG 2.1 AA and BAYMARD INSTITUTE; cite only standards the target actually audits against, never invent one'
          ]
        }
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
        signature: {
          carry: [
            'The hero photograph is duotoned entirely into the brand blue, so the page contains no full-colour image anywhere',
            'A serif-italic aside sits above the heavy caps statement, softening a line that would otherwise read as a boast',
            'A starburst badge carries the founding year inside the blue band, the only non-rectangular shape on the page',
            'Capability illustrations are drawn in blue line only, at uniform stroke, with no fill or shading',
            'Light serif and heavy condensed caps alternate as the two display voices, never appearing in the same block'
          ],
          rewrite: [
            'The italic aside — the reference softens its boast with "(Almost)"; write a new 1–2-word aside that undercuts the target\'s caps statement',
            'The badge year and client wordmarks are the reference\'s history — use the target\'s real founding year and clients'
          ]
        }
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
          { name: 'Ice blue', hex: '#E1E1F3', usage: 'faint card tints behind the security cards' }
        ],
        typography: 'Sans display at roughly 34px/600 in deep blue with serif-italic phrases set inline at the same size ("The AI support agent", "Nothing you don\'t."); monospaced body copy at 15px/400 for the primary explanation block; 10px monospaced all-caps labels prefixed with an arrow glyph; a striped horizontal-line display treatment for the "ASK TORI" band.',
        layoutNotes: 'White ground gridded by 1px dashed blue borders that outline nearly every region, giving a blueprint feel. The hero is a solid blue panel split between headline and white-outlined wireframe chat boxes. Step and feature cards sit inside dashed cells with an arrow-prefixed label, a solid blue icon chip, and a blue title. A full-width band renders "ASK TORI" in outline lettering filled with horizontal stripes. The closing contact section pairs copy with a dashed-bordered form.',
        imagerySubject: 'wireframe chat panels drawn as white outlines on flat blue, with no interface chrome or real text',
        mood: ['technical', 'precise', 'engineered', 'restrained'],
        signature: {
          carry: [
            'Nearly every region is outlined by a 1px dashed blue border, giving the page a blueprint rather than a card feel',
            'Body copy in the primary explanation block is monospaced, not sans, and set at reading size rather than as code',
            'Every micro label is prefixed with an arrow glyph',
            'The product-name band is outline lettering filled with horizontal stripes, the only decorative type on the page',
            'There is no black anywhere — headlines, body and rules are all blue, and the darkest value on the page is a deep blue'
          ],
          rewrite: [
            'Micro-label strings — the reference labels steps and features (STEP 01, KNOWLEDGE, DATA); write the target\'s own 1–2-word all-caps labels behind the arrow',
            'The striped band word is the reference\'s product name — set the target\'s product name'
          ]
        }
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
          { name: 'Coral', hex: '#F54D31', usage: 'quote card fill, chevron step, hero CTA, role labels', contrastNote: '4.20:1 measured against the dark it actually sits on, rather than the 3.19:1 the verifier computes against the warm bone. Still short of 4.5:1 for the role labels. White on the coral quote-card fill reaches 3.51:1, so that misses as well.' },
          { name: 'Blue', hex: '#3177BD', usage: 'quote card fill, chevron step, secondary CTA' },
          { name: 'White', hex: '#FFFFFF', usage: 'quote strip ground and form field fills' }
        ],
        typography: 'Light serif display at roughly 40px/300 across three lines; serif section heads at 30px/300; serif step titles at 22px/400; sans body at 13px/400; 10px sans all-caps tracked eyebrows in an accent colour ("HI, WE\'RE HIGH FIVE.", "WHAT OUR CLIENTS SAY", "HOW WE DO IT").',
        layoutNotes: 'Warm bone ground with a circular badge ring overlapping the founder portrait in the hero. Client quotes run as a horizontally scrolling strip of cards, each filled with a different accent and closed by a bold-caps attribution. A full-bleed near-black band carries five arrow-shaped process steps, one per accent, each with a line icon and a serif title beneath. A five-colour stripe closes that band. Team members alternate left and right as large circular portraits beside serif bios, and a mint form panel closes the page.',
        imagerySubject: 'two women high-fiving across a desk in a bright office, and warm posed portraits of named consultants',
        mood: ['warm', 'personal', 'encouraging', 'methodical'],
        signature: {
          carry: [
            'Five fixed accents repeat in the same order across quote cards, chevron steps and the stripe divider',
            'Process steps are arrow-shaped chevrons interlocking across a full-bleed near-black band, one accent each',
            'A five-colour stripe divider closes the dark band, restating the palette as a legend',
            'Client quotes scroll horizontally as colour-filled cards, each attributed in bold caps to a named executive',
            'A circular badge ring overlaps the founder portrait in the hero, part logo and part frame'
          ],
          rewrite: [
            'Eyebrow strings — the reference greets in first person ("HI, WE\'RE HIGH FIVE."); write new short we-voice eyebrows for the target',
            'Quotes, executives and portraits are reference people — use the target\'s real clients and team'
          ]
        }
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
        signature: {
          carry: [
            'Every image is a photoreal render at impossible scale — human figures the size of a hand beside cubes and spheres taller than they are',
            'Renders sit on a pale seamless backdrop with soft cloud, so no image has a real setting or horizon',
            'The only saturated element is a muted teal, and it carries every heading, rule and button on the page',
            'Empty space between sections runs to roughly twenty base units, more than most sections occupy themselves',
            'Headings are deliberately small for their position — the render, not the type, opens each section'
          ],
          rewrite: [
            'Accordion row labels name the reference\'s services — write the target\'s own noun phrases'
          ]
        }
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
        signature: {
          carry: [
            'A grainy green gradient bookends the page, rising into the hero and mirrored in the closing band',
            'Each gradient terminates in a dot-grid texture strip rather than a hard edge',
            'Every section heading is a transitional serif, unusual for a product page otherwise built from conventional SaaS blocks',
            'The comparison table highlights the Canopy column with a green fill and a leading dot, while alternatives stay grey',
            'The product mockup carries only window dots — no browser chrome, no toolbar, no real interface text'
          ],
          rewrite: [
            'Section headings — the reference speaks in clipped serif promises ("Blog on autopilot."); write new 2–4-word promises ending in a full stop',
            'Comparison and pricing content is the reference\'s offer — use the target\'s real alternatives and tiers'
          ]
        }
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
        signature: {
          carry: [
            'The hero is a full-bleed iridescent ribbon of twisted colour, the only saturated element on an otherwise monochrome page',
            'The download CTA is a translucent glass pill carrying the Apple glyph, floating directly on the ribbon',
            'Feature markers are small app icons rather than line icons or numerals, set above their captions',
            'Body copy sits at markedly reduced opacity against the near-black, so headings carry almost all the contrast',
            'The FAQ heading is left-aligned against a right-hand accordion column, breaking the page\'s otherwise centred axis'
          ],
          rewrite: [
            'The Apple glyph and app icons are platform marks — use the real marks of the target\'s platform',
            'Feature captions and FAQ copy are reference product facts — write the target\'s own'
          ]
        }
      },
      {
        id: 'deloitte-brand-book',
        file: 'images/deloitte-brand-book-unbrand-my.png',
        thumb: 'images/thumbs/deloitte-brand-book-unbrand-my.webp',
        display: 'images/display/deloitte-brand-book-unbrand-my.webp',
        categoryId: 'specimen-board-readout',
        title: 'Deloitte Brand Book — unbrand.my Readout',
        descriptor: 'A near-black board that documents a brand rather than selling it, printing the measured value beside every swatch, specimen and contrast pair.',
        keywords: [
          'em-dash section label',
          'ten-step tonal ramp',
          'contrast ratio as content',
          'monospace spec chip',
          'hex and rgb swatch card',
          'narrow centred column',
          'export format tab',
          'syntax-highlighted code panel'
        ],
        colors: [
          { name: 'Near-black', hex: '#090909', usage: 'board ground, running behind every section from the toolbar to the footer' },
          { name: 'Blue-black', hex: '#091B2D', usage: 'export code panel ground and the tinted fills behind the monospace spec chips' },
          { name: 'White', hex: '#FFFFFF', usage: 'wordmark, headings, the light logo plate and the three comparison card fills' },
          { name: 'Light grey', hex: '#CFCFCF', usage: 'body copy, section descriptions, and the documented light-grey swatch' },
          { name: 'Mid grey', hex: '#757575', usage: 'caption and spec-value text set beneath each specimen', contrastNote: '4.32:1 on the near-black board ground, short of the 4.5:1 this size needs. The board documents accessible combinations elsewhere on the page while its own captions fail; lighten to at least #7A7A7A when rebuilding.' },
          { name: 'Charcoal', hex: '#3F3F3F', usage: 'neutral ramp cells, swatch card borders and hairline section dividers' },
          { name: 'Slate grey', hex: '#636363', usage: 'upper steps of the black and white ramps, and the muted button specimen fill' },
          { name: 'Brand blue', hex: '#0975AB', usage: 'active toolbar button, the filled CTA specimen and the active export format tab' },
          { name: 'Light blue', hex: '#1B87BD', usage: 'text links, the info feedback chip, and the highlighted keys in the export panel' },
          { name: 'Brand green', hex: '#87BD2D', usage: 'the accent dot closing the wordmark, the brand green swatch, and the success chip' },
          { name: 'Deep green', hex: '#63991B', usage: 'lower steps of the brand green tonal ramp' }
        ],
        typography: 'A single humanist sans throughout — the board sets itself in the face it documents. Wordmark specimen at roughly 44px/700; the board heading at 30px/300, markedly lighter than anything below it; section headings at 20px/400; body at 16px/400 in light grey; section labels at 13px lowercase, each preceded by a short em-dash glyph; micro labels at 11px uppercase tracked wide above the ramps and feedback rows; every measured value — hex, rgb triplet, ratio, size, duration — set in a monospace at 12px, never in the proportional face.',
        layoutNotes: 'A dark toolbar spans the full width, navigation left and actions right, with one filled blue button among outlined ones. Everything below runs in a single centred column occupying under half the canvas, leaving the near-black as deep margin on both sides for the entire scroll. Sections are separated by full-width hairlines and opened by an em-dash glyph beside a lowercase label. The palette section stacks three readings of the same colours: swatch cards printing hex above name above rgb, then five ten-cell tonal ramps with the step number and hex inside each cell and no gaps between them, then contrast pair cards showing large sample letterforms with a level badge, the ratio to one decimal, and a caption naming which role sits on which. Typography pairs each specimen with a chip row. Components render live inputs and buttons in their default and focused states. Three white cards close the body with competitor logos, and a full-width export panel with format tabs and a syntax-highlighted code block sits beneath the column.',
        imagerySubject: 'flat generated specimens — swatch blocks, tonal ramps, type specimens and live component renders — plus three small thumbnails of the documented brand\'s own photography and a framed social-share preview',
        mood: ['evidentiary', 'technical', 'systematic', 'neutral'],
        signature: {
          carry: [
            'Every colour is read out three times over — as a swatch card printing its hex above its rgb triplet, as the head of a ten-step tonal ramp, and again inside a contrast pair',
            'Contrast pairs are page content rather than a compliance badge: each renders the two colours as ground and type, states the WCAG level, and prints the ratio to one decimal place',
            'Each type specimen is followed by a row of monospaced chips naming the face and the role, then the size, weight, line height and letter spacing as unstyled values inline',
            'The entire board runs in one centred column under half the canvas width, so the ground reads as deep margin on both sides for the whole scroll',
            'The board closes on an export panel whose format tabs switch a syntax-highlighted code block, making the documented system copyable rather than merely visible'
          ],
          rewrite: [
            'The documented brand is the reference\'s subject — the wordmark, the positioning line, the five adjective pills and the closing descriptive paragraph all belong to it; substitute the target\'s own mark, its own positioning line, and adjectives taken from its actual voice rather than carried across',
            'The three comparison cards name real competitors in the reference\'s sector; populate them from the target\'s genuine peer set, and drop the section rather than invent peers',
            'The toolbar actions and the footer credit the tool that generated the board; replace them with the target\'s own attribution, or remove both bars if the board is not a product surface'
          ]
        }
      },
      {
        id: 'ridgeframe-hero-a-high-key',
        file: 'images/ridgeframe-hero-a-high-key.png',
        thumb: 'images/thumbs/ridgeframe-hero-a-high-key.webp',
        display: 'images/display/ridgeframe-hero-a-high-key.webp',
        categoryId: 'ridge-hero-variation-study',
        title: 'Ridge Hero — A · High Key',
        descriptor: 'The ridge hangs from the top of the viewport in three flat teal bands, leaving the type to sit in open bone below it.',
        keywords: ['bone ground', 'inverted ridge anchor', 'stacked teal band', 'flat silhouette', 'open lower field', 'symmetric peak pitch', 'nav above illustration', 'high-key contrast'],
        colors: [
          { name: 'Bone', hex: '#F3F3E1', usage: 'page ground, above and below the ridge' },
          { name: 'Mid teal', hex: '#3F6363', usage: 'the largest and lowest of the three stacked ridge bands' },
          { name: 'Deep teal', hex: '#2D5151', usage: 'the middle ridge band' },
          { name: 'Darkest teal', hex: '#1B2D2D', usage: 'the topmost ridge band, meeting the nav' },
          { name: 'Ink green', hex: '#091B1B', usage: 'display headline and wordmark' },
          { name: 'Grey green', hex: '#758775', usage: 'body copy on the bone ground', contrastNote: '3.42:1 on the bone ground, well short of 4.5:1. This is the hero paragraph, so the failure is on the primary reading path; darken toward #5C6B5C before shipping this treatment.' }
        ],
        typography: 'Geometric sans throughout. Display heavy at roughly 96px/700 with the second line at the same size in a 200 weight; body at 17px/400 across four lines at a third of the viewport measure; nav links at 17px/400; wordmark at 15px/700 uppercase, tracked wide.',
        layoutNotes: 'The nav sits on bone at the very top, wordmark left and three links right. Directly beneath it the ridge enters as three flat teal bands, darkest at the top and lightest at the bottom, filling roughly the upper third and bleeding to both edges. The type stack begins well below the ridge in open bone: heavy display word, light display phrase, then a narrow body paragraph and the CTA pair.',
        imagerySubject: 'a flat angular ridge profile in three stacked teal bands, bled to both edges, with no shading or texture',
        mood: ['calm', 'airy', 'composed', 'editorial'],
        signature: {
          carry: [
            'The ridge hangs from the top edge like a ceiling rather than rising from the floor, so the type stack sits in open ground beneath it',
            'Three flat bands stack with the darkest at the very top, reversing the aerial-perspective convention in which distant layers go paler',
            'The nav sits on the page ground above the ridge, so the illustration begins below the navigation rather than running behind it',
            'Peaks are symmetric and sharply angled, every vertex meeting at a consistent pitch across the full width'
          ],
          rewrite: [
            'The wordmark, the three nav labels and both CTA labels belong to the reference consultancy; replace them with the target\'s own, keeping the primary CTA an invitation to talk rather than a transaction'
          ]
        }
      },
      {
        id: 'ridgeframe-hero-b-ridgeline',
        file: 'images/ridgeframe-hero-b-ridgeline.png',
        thumb: 'images/thumbs/ridgeframe-hero-b-ridgeline.webp',
        display: 'images/display/ridgeframe-hero-b-ridgeline.webp',
        categoryId: 'ridge-hero-variation-study',
        title: 'Ridge Hero — B · Ridgeline',
        descriptor: 'The ridge becomes twenty stacked outline strokes on near-black, fading as they descend, with a single mint fill for the CTA.',
        keywords: ['near-black ground', 'repeated outline stroke', 'stroke decay', 'no fill', 'mint accent', 'line density as depth', 'strokes behind copy', 'linear field'],
        colors: [
          { name: 'Near-black navy', hex: '#09091B', usage: 'page ground behind the entire composition' },
          { name: 'Off-white', hex: '#F3F3F3', usage: 'display headline' },
          { name: 'Mint stroke', hex: '#3F5151', usage: 'the brightest contour strokes at the top of the stack' },
          { name: 'Dim mint', hex: '#2D3F3F', usage: 'strokes through the middle of the stack' },
          { name: 'Faint mint', hex: '#1B2D2D', usage: 'the crowded strokes at the base, where the stack is densest' },
          { name: 'Grey', hex: '#878787', usage: 'body copy' }
        ],
        typography: 'Geometric sans throughout. Display heavy at roughly 96px/700 over a 200-weight second line at the same size; body at 17px/400 in grey across four lines; nav at 17px/400 at reduced strength; wordmark at 15px/700 uppercase, tracked wide.',
        layoutNotes: 'Near-black fills the viewport. Roughly twenty thin zigzag strokes repeat down the lower two thirds, each offset slightly from the one above, unfilled and progressively dimmer toward the bottom. The type stack sits at the left over the strokes, and the filled CTA is the only solid area anywhere in the frame.',
        imagerySubject: 'a repeated angular ridge outline, stroked roughly twenty times down the viewport with no fill between the lines',
        mood: ['technical', 'quiet', 'precise', 'nocturnal'],
        signature: {
          carry: [
            'The ridge is drawn as roughly twenty repeated outline strokes stacked down the viewport, with no fill anywhere between them',
            'Stroke brightness decays toward the base of the stack, so density alone reads as depth without any change in hue',
            'The stroke stack begins level with the body paragraph, so the lines run behind live copy rather than clearing it',
            'The primary CTA is the only filled area in the composition, leaving it the single non-linear element on the page'
          ],
          rewrite: [
            'The headline pairs an abstract quality against a process noun; write the target\'s own pairing, keeping the second line lighter in weight and longer in measure than the first'
          ]
        }
      },
      {
        id: 'ridgeframe-hero-c-monolith',
        file: 'images/ridgeframe-hero-c-monolith.png',
        thumb: 'images/thumbs/ridgeframe-hero-c-monolith.webp',
        display: 'images/display/ridgeframe-hero-c-monolith.webp',
        categoryId: 'ridge-hero-variation-study',
        title: 'Ridge Hero — C · Monolith',
        descriptor: 'Amber sky against a black mass that overruns the headline, with one peak carrying a lit rust face.',
        keywords: ['amber ground', 'figure-ground inversion', 'occluded headline', 'lit peak face', 'flat silhouette', 'rust accent', 'copy crossing a boundary', 'poster contrast'],
        colors: [
          { name: 'Amber', hex: '#E1BD51', usage: 'page ground, the sky the silhouette is cut against' },
          { name: 'Near-black navy', hex: '#09091B', usage: 'the silhouette mass and the display headline' },
          { name: 'Rust', hex: '#BD3F2D', usage: 'the lit face of the tallest peak and the primary CTA fill' },
          { name: 'Pale amber', hex: '#F3CF63', usage: 'the lighter band along the very top edge of the ground' },
          { name: 'Deep rust', hex: '#AB2D1B', usage: 'the shaded lower edge of the lit peak face' },
          { name: 'Olive', hex: '#63512D', usage: 'body copy where it crosses from the amber onto the silhouette', contrastNote: '4.23:1 against the amber ground and 2.57:1 against the black silhouette the same paragraph runs onto. Both fail. The occlusion is the composition, so the fix is to move the copy clear of the silhouette rather than to recolour it.' }
        ],
        typography: 'Geometric sans throughout. Display heavy at roughly 96px/700 with the light second and third lines at the same size in 200; body at 17px/400 across four lines at a narrower measure than the other variations, because the silhouette takes the right of the block; wordmark at 15px/700 uppercase, tracked wide.',
        layoutNotes: 'Amber fills the frame. A single black mass rises from the bottom edge across the full width, its tallest peak reaching more than half the viewport height and cutting across the display headline so the closing word disappears behind it. One peak face is filled rust rather than black. The type stack sits left; the body paragraph runs across the amber-to-black boundary, and the primary CTA sits on the black mass.',
        imagerySubject: 'a single flat black mountain silhouette rising past the midpoint of the viewport, one face filled in rust',
        mood: ['bold', 'graphic', 'poster-like', 'assertive'],
        signature: {
          carry: [
            'The silhouette occludes the display headline, cutting the closing word mid-letterform rather than clearing space around it',
            'Figure and ground invert against the rest of the study: the light value is the sky and the dark mass is the subject',
            'Exactly one peak carries a contrasting lit face, implying a light source nothing else in the composition acknowledges',
            'The body paragraph crosses the boundary between the two masses, so its last lines lose contrast where they pass onto the dark'
          ],
          rewrite: [
            'The body paragraph addresses an owner who already has a product; rewrite it for the target\'s actual reader and shorten it, because at this variation\'s occlusion the fourth line is effectively unreadable'
          ]
        }
      },
      {
        id: 'ridgeframe-hero-d-split-field',
        file: 'images/ridgeframe-hero-d-split-field.png',
        thumb: 'images/thumbs/ridgeframe-hero-d-split-field.webp',
        display: 'images/display/ridgeframe-hero-d-split-field.webp',
        categoryId: 'ridge-hero-variation-study',
        title: 'Ridge Hero — D · Split Field',
        descriptor: 'The ridge is removed entirely and the headline breaks across three lines into an almost empty bone field.',
        keywords: ['bone ground', 'no illustration', 'three-line break', 'type-only composition', 'faint tonal band', 'maroon CTA', 'generous void', 'dropped final word'],
        colors: [
          { name: 'Bone', hex: '#F3F3E1', usage: 'page ground across almost the whole viewport' },
          { name: 'Ink', hex: '#1B1B1B', usage: 'display headline and wordmark' },
          { name: 'Grey', hex: '#636363', usage: 'body copy and nav links' },
          { name: 'Warm bone shade', hex: '#E1E1CF', usage: 'the faint tonal band dividing the lower field' },
          { name: 'Pale warm grey', hex: '#CFCFBD', usage: 'the outlined secondary CTA border' }
        ],
        typography: 'Geometric sans throughout. Display heavy at roughly 96px/700 on the first line, then two 200-weight lines at the same size; body at 17px/400 across four lines; nav at 17px/400; wordmark at 15px/700 uppercase, tracked wide. The three-line break makes this the tallest type stack in the study.',
        layoutNotes: 'Bone fills the viewport with no illustration of any kind. The headline breaks across three lines rather than two, dropping the closing word onto its own line at the light weight, which pushes the body and CTA pair well down the frame. A barely perceptible warmer band sits across the lower field. The primary CTA is a deep maroon block, the only saturated element present; its fill fell below every sampler threshold, so no hex is claimed for it here.',
        imagerySubject: 'none — the field is empty, and the composition is carried by type and void alone',
        mood: ['restrained', 'confident', 'spacious', 'literary'],
        signature: {
          carry: [
            'The ridge motif is absent entirely, leaving the composition to be carried by type and void alone',
            'The display headline breaks across three lines instead of two, dropping the closing word to its own line at the light weight',
            'A single barely-there tonal band is the only division in the field, sitting well below the type stack',
            'The primary CTA is the sole saturated element on a near-white page, so it carries all of the composition\'s contrast by itself'
          ],
          rewrite: [
            'The three-line break depends on the closing word being long enough to hold a line of its own; if the target\'s closing word is short, break after the first word instead and keep the stack at three lines'
          ]
        }
      },
      {
        id: 'ridgeframe-hero-e-contour',
        file: 'images/ridgeframe-hero-e-contour.png',
        thumb: 'images/thumbs/ridgeframe-hero-e-contour.webp',
        display: 'images/display/ridgeframe-hero-e-contour.webp',
        categoryId: 'ridge-hero-variation-study',
        title: 'Ridge Hero — E · Contour',
        descriptor: 'Nested topographic contours run a hue gradient from amber at the crest to violet at the base.',
        keywords: ['near-black ground', 'nested contour line', 'hue gradient by elevation', 'continuous path', 'topographic reading', 'line over copy', 'amber to violet', 'cartographic field'],
        colors: [
          { name: 'Near-black navy', hex: '#09091B', usage: 'page ground behind the contour field' },
          { name: 'Bone', hex: '#F3F3E1', usage: 'display headline' },
          { name: 'Amber stroke', hex: '#AB753F', usage: 'the contour strokes crossing the upper third of the stack' },
          { name: 'Rose brown stroke', hex: '#633F3F', usage: 'the contour strokes through the middle of the stack' },
          { name: 'Violet stroke', hex: '#3F2D51', usage: 'the contour strokes at the base of the stack' },
          { name: 'Deep navy', hex: '#1B1B2D', usage: 'the slightly lifted ground between the densest lower contours' },
          { name: 'Grey', hex: '#878787', usage: 'body copy' }
        ],
        typography: 'Geometric sans throughout. Display heavy at roughly 96px/700 over a 200-weight second line at the same size; body at 17px/400 across four lines in grey; nav at 17px/400; wordmark at 15px/700 uppercase, tracked wide.',
        layoutNotes: 'Near-black fills the viewport. Nested contour lines run edge to edge across the lower two thirds, each an unbroken continuous path, shifting hue as the stack descends from amber through rose-brown to violet. The uppermost contour crosses the body paragraph. The type stack sits at the left, and the primary CTA is an amber-filled block whose fill fell below every sampler threshold, so no hex is claimed for it here.',
        imagerySubject: 'nested topographic contour lines spanning the viewport, each a single continuous unbroken path',
        mood: ['cartographic', 'analytical', 'atmospheric', 'layered'],
        signature: {
          carry: [
            'The ridge is nested topographic contours, each line a continuous unbroken path from edge to edge',
            'The contour stack runs a hue gradient from amber at the crest through rose to violet at the base, encoding elevation as colour',
            'The uppermost contour passes directly through the body paragraph, placing line work on top of running copy'
          ],
          rewrite: [
            'The nav names three sections specific to the reference\'s own site; use the target\'s real sections and keep the count at three, so the right side of the bar stays visually lighter than the wordmark'
          ]
        }
      },
      {
        id: 'ridgeframe-hero-f-halftone',
        file: 'images/ridgeframe-hero-f-halftone.png',
        thumb: 'images/thumbs/ridgeframe-hero-f-halftone.webp',
        display: 'images/display/ridgeframe-hero-f-halftone.webp',
        categoryId: 'ridge-hero-variation-study',
        title: 'Ridge Hero — F · Halftone',
        descriptor: 'The ridge is a halftone dot field whose upper boundary alone describes the profile, with no drawn edge at all.',
        keywords: ['near-black ground', 'halftone dot field', 'implied edge', 'growing dot diameter', 'achromatic treatment', 'print reference', 'no outline', 'mass by density'],
        colors: [
          { name: 'Near-black navy', hex: '#09091B', usage: 'page ground behind the dot field' },
          { name: 'Bone', hex: '#F3F3E1', usage: 'display headline and the halftone dots at their largest' },
          { name: 'Dim navy', hex: '#3F3F51', usage: 'the sparse small dots along the upper edge of the field' },
          { name: 'Mid navy', hex: '#2D2D3F', usage: 'the mid-density zone of the dot field' },
          { name: 'Deep navy', hex: '#1B1B2D', usage: 'the ground showing between dots where the field is densest' },
          { name: 'Grey', hex: '#878787', usage: 'body copy' }
        ],
        typography: 'Geometric sans throughout. Display heavy at roughly 96px/700 over a 200-weight second line at the same size; body at 17px/400 across four lines in grey; nav at 17px/400; wordmark at 15px/700 uppercase, tracked wide.',
        layoutNotes: 'Near-black fills the viewport. A regular grid of pale dots occupies the lower half, their diameter increasing steadily toward the bottom edge so the field gains weight as it descends. The ridge profile exists only as the upper boundary of the dot field — no line is drawn. The type stack sits at the left, and the primary CTA is a warm filled block whose fill fell below every sampler threshold, so no hex is claimed for it here.',
        imagerySubject: 'a regular halftone dot field with dot diameter growing toward the bottom edge, its upper boundary forming the ridge',
        mood: ['printerly', 'restrained', 'tactile', 'nocturnal'],
        signature: {
          carry: [
            'The ridge is a halftone dot field whose upper boundary alone describes the profile — no edge is drawn anywhere',
            'Dot diameter grows steadily toward the bottom of the viewport, so the field reads as gaining mass as it descends',
            'The dot field is a single achromatic value, making this the one variation whose ground treatment introduces no hue at all'
          ],
          rewrite: [
            'The secondary CTA promises a process explainer; name whatever the target actually links to, and keep the arrow glyph as its only punctuation'
          ]
        }
      },
      {
        id: 'ridgeframe-hero-i-cut-paper',
        file: 'images/ridgeframe-hero-i-cut-paper.png',
        thumb: 'images/thumbs/ridgeframe-hero-i-cut-paper.webp',
        display: 'images/display/ridgeframe-hero-i-cut-paper.webp',
        categoryId: 'ridge-hero-variation-study',
        title: 'Ridge Hero — I · Cut Paper',
        descriptor: 'Stacked sand-coloured paper layers cast hard offset shadows onto each other over a dark teal ground.',
        keywords: ['dark teal ground', 'cut paper layer', 'hard offset shadow', 'warming layer stack', 'rust CTA', 'layer over type', 'craft reference', 'flat colour collage'],
        colors: [
          { name: 'Dark teal', hex: '#1B3F3F', usage: 'page ground above the paper stack' },
          { name: 'Pale sand', hex: '#F3E1AB', usage: 'the topmost and largest paper layer' },
          { name: 'Ochre sand', hex: '#E1BD75', usage: 'the second paper layer beneath it' },
          { name: 'Rust', hex: '#BD513F', usage: 'the primary CTA fill' },
          { name: 'Shadow teal', hex: '#092D2D', usage: 'the hard shadow each paper layer casts onto the one below' },
          { name: 'Bone', hex: '#F3F3E1', usage: 'display headline and wordmark' }
        ],
        typography: 'Geometric sans throughout. Display heavy at roughly 96px/700 over a 200-weight second line at the same size; body at 17px/400 across four lines; nav at 17px/400; wordmark at 15px/700 uppercase, tracked wide.',
        layoutNotes: 'A dark teal ground carries the nav and the full type stack. Angular paper layers rise from the bottom edge, the palest and largest in front, each cut at a different peak rhythm and each casting a hard offset shadow onto the layer behind. The stack warms as it descends. The paper overlaps the bottom of the type block, so the primary CTA sits partly on the ground and partly on a layer, and the outlined secondary CTA falls wholly within one.',
        imagerySubject: 'angular flat-colour paper layers stacked front to back, each casting a hard offset shadow onto the next',
        mood: ['warm', 'crafted', 'tactile', 'optimistic'],
        signature: {
          carry: [
            'The ridge is built from stacked flat-colour layers, each casting a hard offset shadow onto the layer behind it',
            'The paper layers overlap the type block, so the primary CTA sits partly on the ground and partly on a layer',
            'The layer stack warms as it descends, moving from pale sand through deeper ochre without ever repeating a value',
            'The outlined secondary CTA falls entirely within a sand layer, dropping its border to near-invisibility against it'
          ],
          rewrite: [
            'The reference sets a consultancy\'s positioning line; write the target\'s own, then check it against the layer edges — copy that overlaps a layer boundary must be moved, never merely recoloured'
          ]
        }
      },
      {
        id: 'ridgeframe-clarity-full-page',
        file: 'images/ridgeframe-clarity-full-page.png',
        thumb: 'images/thumbs/ridgeframe-clarity-full-page.webp',
        display: 'images/display/ridgeframe-clarity-full-page.webp',
        categoryId: 'dark-navy-diagnostic-editorial',
        title: 'Ridgeframe Strategies — Clarity Before Execution',
        descriptor: 'Eleven viewports of dark navy prose where one coral carries every label, numeral and link, and the right half of the page is left empty throughout.',
        keywords: [
          'alternating navy band',
          'coral micro label',
          'left-half measure',
          'coral step numeral',
          'definition row with hairline',
          'italic coral pull quote',
          'credential trailer',
          'stepped ridge illustration'
        ],
        colors: [
          { name: 'Navy', hex: '#1B1B2D', usage: 'page ground for the majority of sections' },
          { name: 'Deep navy', hex: '#09091B', usage: 'the alternating darker section bands' },
          { name: 'Off-white', hex: '#FFFFF3', usage: 'section headings and the bold lead-in clauses' },
          { name: 'Grey lavender', hex: '#636375', usage: 'body copy throughout', contrastNote: '2.88:1 on the navy ground — a substantial failure on every paragraph of an eleven-viewport page. Needs roughly #8A8A9E to clear 4.5:1.' },
          { name: 'Hot pink', hex: '#F33F75', usage: 'primary CTA fill in the hero and mid-page' },
          { name: 'Coral', hex: '#FF8763', usage: 'micro labels, step numerals, bullet markers, the pull quote and text links' },
          { name: 'Slate', hex: '#3F3F51', usage: 'hairline rules above each definition row' },
          { name: 'Raised navy', hex: '#2D2D3F', usage: 'the upper bands of the stepped hero ridge' },
          { name: 'Muted coral', hex: '#AB6351', usage: 'the small flag accents on the hero ridge peaks' }
        ],
        typography: 'A single geometric sans in two weights. Section headings at roughly 28px/700 in off-white, written as complete sentences with a full stop; sub-heads at 18px/700; body at 15px/400 in grey lavender at a measure of roughly a third the canvas; step numerals at 20px/700 in coral; micro labels at 10px/500 uppercase tracked wide in coral, separated by a middle dot; one italic pull quote at 15px/400 in coral, the only italic on the page.',
        layoutNotes: 'A transparent nav over the hero carries the wordmark left, three links and a filled contact button right. The hero sets the two-weight display headline, a four-line paragraph and a CTA pair over a stepped navy ridge illustration whose peaks carry small coral flags. A credential strip of five micro-labelled columns follows. From there the page alternates between two near-identical navies, the boundary visible only as a step in value with no rule drawn. Every prose block sits in the left half and the right half stays empty for the whole scroll. Founder cards pair a small rectangular headshot with a name, a coral micro-role, a bio and a plain-text credentials trailer. Four numbered steps run across in coral. Later sections use definition rows — a bold lead-in clause continuing inline into body weight, each with a hairline above — and a row of coral-dotted pills stating the four questions the engagement must leave answerable.',
        imagerySubject: 'a stepped flat-colour ridge in near-navy layers with small coral peak flags, and two small rectangular founder headshots',
        mood: ['senior', 'plainspoken', 'accountable', 'unhurried'],
        signature: {
          carry: [
            'Sections divide by stepping between two near-identical navies, so the page changes ground without ever drawing a rule',
            'One warm coral carries every label, numeral, bullet marker, link and pull quote, and no second accent appears anywhere on the page',
            'Prose is held to the left half for the entire scroll, leaving the right half empty rather than filling it with media',
            'Engagement outcomes are set as definition rows — a bold clause naming the path, continuing inline into body weight under a hairline',
            'Founder bios close with a plain-text trailer of prior employers, set smaller than body and never styled as logos'
          ],
          rewrite: [
            'Both founders are named with their real employment histories and specialisms; substitute the target\'s own people, and drop the section entirely rather than fabricating credentials for it',
            'Headings are written as the reference consultancy\'s own commitments — each is a claim the business can be held to; write the target\'s equivalents as complete sentences closed by a full stop, never as noun phrases'
          ]
        }
      },
      {
        id: 'impeccable-concept-cards',
        file: 'images/impeccable-concept-cards.png',
        thumb: 'images/thumbs/impeccable-concept-cards.webp',
        display: 'images/display/impeccable-concept-cards.webp',
        categoryId: 'concept-comparison-cards',
        title: 'Concept Comparator — Two Directions Side by Side',
        descriptor: 'Two design directions argued in an identical field order, each closing on the honest case against it before the commit button.',
        keywords: [
          'near-black comparator ground',
          'full-bleed concept preview',
          'monospaced descriptor',
          'material chip',
          'swatch dot row',
          'stated risk',
          'amber commit button',
          'identical field order'
        ],
        colors: [
          { name: 'Near-black', hex: '#090909', usage: 'comparator ground behind and between the cards' },
          { name: 'Card black', hex: '#1B1B1B', usage: 'card ground beneath the preview, one step lighter than the comparator' },
          { name: 'Charcoal', hex: '#2D2D2D', usage: 'material chip borders and the swatch dot outlines' },
          { name: 'Slate', hex: '#3F3F3F', usage: 'the muted swatch dot and the risk label', contrastNote: '1.89:1 on the comparator ground. The risk label names the field carrying the argument against each concept, so this is the least legible element in a component whose whole purpose is candour.' },
          { name: 'Mid grey', hex: '#636363', usage: 'descriptor and risk body copy', contrastNote: '3.31:1 on the comparator ground, short of 4.5:1 for text at this size. Lighten toward #8C8C8C; the descriptor is the field a reader compares cards on.' },
          { name: 'Amber', hex: '#FFBD2D', usage: 'the commit button fill on both cards and the pair-advance ring' },
          { name: 'Rust', hex: '#BD3F2D', usage: 'the red swatch dot and the warm mass inside both previews' },
          { name: 'Ochre', hex: '#CFAB3F', usage: 'the yellow swatch dot and the lit keys inside the right-hand preview' },
          { name: 'Brown', hex: '#752D1B', usage: 'the shadowed zones of the left-hand preview mockup' }
        ],
        typography: 'Card chrome in a neutral sans: titles at roughly 30px/500, premise at 24px/400, risk body at 20px/400 at reduced strength. Every machine-written field is monospaced uppercase and tracked wide — the descriptor at 15px across two to three lines, the material chips at 14px, and the RISK label at 14px sitting inline before its prose. The previews carry their own unrelated typography, which the chrome deliberately does not echo.',
        layoutNotes: 'Two equal cards sit side by side on a near-black ground, the right one partly clipped by the viewport with a circular amber advance control on the gutter between them. Each card leads with a complete rendered mockup bled to its top three edges, filling roughly the upper half. Beneath it every card repeats the same fields in the same order: a monospaced uppercase descriptor naming what the mockup is, a short title, a one-sentence premise, a tight row of square swatch dots followed by bordered material chips, a RISK label with its prose running inline, and an amber commit button spanning most of the card width.',
        imagerySubject: 'two complete rendered page mockups — a video-rental storefront and a rhythm-machine product page — each shown whole rather than cropped to a detail',
        mood: ['candid', 'comparative', 'decisive', 'workmanlike'],
        signature: {
          carry: [
            'Both cards repeat an identical field order, so the reader compares like against like rather than reading each concept on its own terms',
            'A stated risk sits directly above the commit button, placing the argument against the concept last before the decision',
            'The comparator ground is darker than either preview, so the mockups read as lit objects on a neutral surface',
            'Palette is declared as a bare row of square swatch dots with no labels or hex values, immediately beside the named materials',
            'Each preview is rendered complete rather than cropped to a detail, so the concept is judged as a whole composition'
          ],
          rewrite: [
            'Both descriptors name a specific cultural referent and its physical details; write the target\'s own referents, keeping the descriptor concrete — a named object with two or three details, never an adjective',
            'The risk lines argue against these two concepts specifically, one on tone and one on adjacency to a rejected direction; write the genuine strongest objection to each concept offered, and never soften it into a caveat'
          ]
        }
      },
      {
        id: 'marble-learning-world',
        file: 'images/marble-learning-world.png',
        thumb: 'images/thumbs/marble-learning-world.webp',
        display: 'images/display/marble-learning-world.webp',
        categoryId: 'storybook-serif-product',
        title: 'Marble — Interactive Learning World for Curious Kids',
        descriptor: 'A painted island opens the page, then a marble-run track threads the whole scroll while one red does every accent job there is.',
        keywords: [
          'red terminal full stop',
          'marble-run spine',
          'knockout wordmark on the horizon',
          'painted island hero',
          'inline hero signup',
          'arced question ticker',
          'flat product mockup card',
          'rounded panel overlap'
        ],
        colors: [
          { name: 'Bone', hex: '#F3F3E1', usage: 'page ground for every light section, and the rounded panel that overlaps the dark' },
          { name: 'Ink black', hex: '#1B1B1B', usage: 'the full-bleed dark section behind the pioneers block, and the dark pill CTA fills' },
          { name: 'Deep navy', hex: '#091B3F', usage: 'the ocean beneath the hero illustration, continuing into the section below it' },
          { name: 'Near-black', hex: '#090909', usage: 'footer ground and the device mockup bezel' },
          { name: 'White', hex: '#FFFFFF', usage: 'the wordmark knocked out of the sky, mockup card fills, and the circular nodes on the spine', contrastNote: 'Checked and clear. The verifier pairs this against the bone page ground, where it measures 1.12:1, but the wordmark never touches bone — it is knocked out of the illustration, reaching 5.95:1 on the sky blue and 10.61:1 on the mid ocean. Both pass the 3:1 its size needs. Keep the knockout on the painted scene; it cannot survive a move onto the bone ground.' },
          { name: 'Pale pink', hex: '#F3CFCF', usage: 'the marble-run track running the full height of the left margin' },
          { name: 'Red', hex: '#F3091B', usage: 'pill CTA fills, the full stop closing each display line, step numerals, quote attributions and the arced ticker', contrastNote: '3.85:1 against the bone ground, so the step numerals and quote attributions set in it are below the 4.5:1 their size needs; white labels on the red pill fills reach only 4.32:1, also short. The display full stops and the arced ticker are large enough to pass at 3:1. Darken the accent for small type, or set attributions in the ink instead — this hex is doing both fill and type work and cannot serve both at once.' },
          { name: 'Blueprint blue', hex: '#093F99', usage: 'the gridded workspace ground inside the device mockup' },
          { name: 'Mid ocean', hex: '#093F75', usage: 'the mid-depth water band across the hero illustration' },
          { name: 'Sky blue', hex: '#0963BD', usage: 'the upper sky behind the wordmark in the hero illustration' },
          { name: 'Warm grey', hex: '#999999', usage: 'secondary body copy beneath each step heading and the micro labels above each mockup', contrastNote: '2.54:1 on the bone ground, well short of the 4.5:1 this size needs. It carries the step explanations — the copy doing the actual selling — so the failure sits on the primary reading path; darken toward #6E6E6E before shipping.' }
        ],
        typography: 'A high-contrast transitional serif carries every display line at roughly 120px/400 with a hairline thin stroke, dropping to 56px for section lines; each one closes on a full stop set in the red. A neutral geometric sans handles everything else — step headings at 22px/500, body at 14px/400, micro labels at 10px/500 uppercase tracked wide above each mockup, and two-digit step numerals at 10px in red. The ticker is the serif again at 32px, uppercase and set on a shallow arc. The wordmark is a separate heavy rounded-terminal display sans, used only in the hero and the footer.',
        layoutNotes: 'A full-bleed painted island scene opens the page with the wordmark knocked out across the horizon so its letterforms straddle sky and sea, and a signup row of two fields and a red pill sits directly in the illustration. The ocean darkens into a navy section carrying a centred serif display line and a muted advisor logo wall. A bone panel then overlaps that section with rounded top corners, and from there a pale pink marble-run track runs the full height of the left margin, its solid red segments feeding white circular nodes that mark each of four numbered steps. Each step pairs a red two-digit numeral, a sans heading and body with a bordered white card holding captured interface. Below, a chip row and a device mockup sit under a centred display line, then a single arc of red capitals bleeds past both edges carrying children\'s questions. A skill-tree diagram with a three-state legend precedes a horizontally scrolling row of bordered testimonials. A near-black section carries another display line over three outlined icon circles, and the page closes on four bordered principle cards, a signup form, a small mascot and a near-black footer.',
        imagerySubject: 'a painted island with a lighthouse under towering cumulus, seen past a child paddling a kayak, with flat captured product interface and one team photograph everywhere below it',
        mood: ['wondrous', 'warm', 'confident', 'crafted'],
        signature: {
          carry: [
            'A pale marble-run track runs the full height of the left margin, its solid accent segments feeding white circular nodes that mark each numbered step as the page descends',
            'Every display line closes on a full stop set in the accent, making punctuation the only place the brand colour touches the typography',
            'The wordmark is knocked out of the painted hero across the horizon line, so its letterforms are split between sky and sea',
            'The signup form sits inline in the illustration itself — two fields and a pill on one row — rather than being deferred to a section below',
            'A single arc of accent capitals bleeds past both edges between sections, carrying questions a child would ask and no product claim at all'
          ],
          rewrite: [
            'The product name appears inside display lines, section headings and the mockup copy; substitute the target\'s name everywhere and re-check the breaks, because the display face is set tight enough that a longer name reflows the whole stack',
            'The advisor wall names four real institutions and the testimonials name real parents and children with their ages; carry neither — use only endorsements the target genuinely holds, and drop the section rather than filling it with placeholders',
            'The ticker is a run of questions specific to this product\'s subject matter; write questions from the target\'s own domain, keeping them first-person and leaving them unanswered'
          ]
        }
      },
      {
        id: 'hermes-agent-docs-home',
        file: 'images/Hermes-Agent-Docs-Homepage.png',
        thumb: 'images/thumbs/Hermes-Agent-Docs-Homepage.webp',
        display: 'images/display/Hermes-Agent-Docs-Homepage.webp',
        categoryId: 'amber-terminal-docs',
        title: 'Hermes Agent — Documentation Home',
        descriptor: 'A near-black docs shell where amber marks every button, active tab and link, anchored by a two-column quick-link table and a green tip callout.',
        keywords: [
          'amber Get Started button',
          'green tip callout',
          'icon-plus-label quick-link table',
          'collapsible sidebar TOC',
          'bordered ghost button row',
          'numbered feature bullets',
          'monospace install command',
          'three-column footer'
        ],
        colors: [
          { name: 'Charcoal ground', hex: '#1B1B1B', usage: 'page ground, sidebar and content background' },
          { name: 'Slate panel', hex: '#2D2D2D', usage: 'quick-link table alternating row fill, card and table borders' },
          { name: 'Forest green', hex: '#092D09', usage: 'the "fastest path to a working agent" tip callout fill' },
          { name: 'Near-black', hex: '#090909', usage: 'top nav bar fill' },
          { name: 'Off-white', hex: '#F3F3F3', usage: 'H1/H2 headings and body copy' },
          { name: 'Amber', hex: '#FFCF09', usage: 'Get Started button fill, active "Docs" tab, inline links' },
          { name: 'Muted grey', hex: '#999999', usage: 'sidebar inactive nav items and secondary description text' }
        ],
        typography: 'A neutral grotesk carries every role — H1 at roughly 40px/700, section H2s at 28px/700, body at 16px/400, sidebar nav items at 14px/500. Code and the install command run in a monospace face at 15px inside a bordered dark panel. The amber accent is set only on the Get Started fill, the active "Docs" tab, and inline links — nothing else in the type system changes weight or face to carry emphasis.',
        layoutNotes: 'A near-black top bar carries the wordmark and avatar left, primary nav centre-left with "Docs" underlined in amber, and utility links (language, Home, GitHub, Discord, theme toggle, search) right. A fixed sidebar lists grouped, chevron-expandable sections in muted grey with no active-state background change — only the label brightens. The content column opens on an H1, a one-paragraph description linking "Nous Research" in amber, then a row of four buttons — one solid amber, three bordered ghost. An "Install" H2 gives OS-specific monospace commands in bordered dark panels, followed by a full-width green tip callout highlighting a single command in a brighter monospace. Below that, a two-column icon-plus-label table serves as the page\'s real table of contents, each row pairing an emoji-style icon, a bold amber title and a one-line grey description. A bulleted "Key Features" list and a two-line "For LLMs and coding agents" note close the content column above a three-column footer (Docs / Community / More) on the near-black ground.',
        imagerySubject: 'none — the page carries a small circular avatar mark and line icons only, no photography or illustration',
        mood: ['utilitarian', 'developer-facing', 'dense', 'direct'],
        signature: {
          carry: [
            'A single amber accent marks every actionable element — CTA fill, active tab, inline links — with no second accent anywhere on the page',
            'A two-column icon-plus-label table serves as the page\'s real table of contents, each row pairing an icon, a bold title and a one-line description',
            'A tinted callout breaks the panel rhythm once to flag a single recommended path, its key command set in a brighter monospace than the body code',
            'The primary CTA is paired with three bordered ghost buttons in a single row, all four sized identically so none reads as more final than the others',
            'Sidebar sections are chevron-collapsible and the current item changes only its text colour, never gaining a background fill or border'
          ],
          rewrite: [
            'Quick-link titles and descriptions name this project\'s own doc sections; write the target\'s own section names and one-line summaries',
            'The tip callout names a specific command and a specific claim; write the target\'s own single highest-value shortcut',
            'The four button labels name this product\'s own entry points; write the target\'s own primary and secondary calls to action'
          ]
        }
      },
      {
        id: 'hermes-desktop-landing',
        file: 'images/Hermes-Desktop-Landing-Hero.png',
        thumb: 'images/thumbs/Hermes-Desktop-Landing-Hero.webp',
        display: 'images/display/Hermes-Desktop-Landing-Hero.webp',
        categoryId: 'engraved-ultramarine-hero',
        title: 'Hermes Desktop — Landing Hero',
        descriptor: 'A full-bleed ultramarine hero with a white steel-engraving of a many-armed figure radiating sunburst lines behind the tracked serif wordmark.',
        keywords: [
          'radiating sunburst engraving',
          'many-armed figure illustration',
          'tracked serif wordmark',
          'monospace eyebrow and nav',
          'white pill download button',
          'three-up platform card row',
          'grainy statue photography',
          'oversized cross-promo watermark'
        ],
        colors: [
          { name: 'Ultramarine', hex: '#0909F3', usage: 'full-bleed page ground throughout' },
          { name: 'Mid ultramarine', hex: '#2D2DF3', usage: 'secondary section ground, slightly lighter than the hero' },
          { name: 'White', hex: '#FFFFFF', usage: 'download button fill, wordmark and eyebrow type, illustration hairline strokes' },
          { name: 'Mid blue', hex: '#5151F3', usage: 'illustration mid-tone hairline shading' },
          { name: 'Pale lavender', hex: '#E1E1F3', usage: 'platform card ground and statue photography wash' },
          { name: 'Light periwinkle', hex: '#BDBDF3', usage: 'statue photography highlights inside platform cards' },
          { name: 'Deep indigo', hex: '#090963', usage: 'top nav bar fill, one band tall' }
        ],
        typography: 'A tracked, full-capitals high-contrast serif sets the wordmark and every section head at large sizes — "HERMES DESKTOP" spans two stacked lines at roughly 90px. Everything else — nav, eyebrows, button labels, body copy and FAQ questions — runs in a monospace face, uppercase for labels and eyebrows, sentence case for body and FAQ prose.',
        layoutNotes: 'A full-bleed ultramarine ground runs the entire page. A centred nav sits on a marginally darker one-band-tall strip: "NOUS" and "DOCS" left, the stacked "HERMES AGENT" wordmark and social glyphs centred, "PRODUCTS" and "INSTALL" right. The hero splits left copy — eyebrow, two-line wordmark, three-line body, a white pill "DOWNLOAD FOR MAC OS" button — against a sunburst engraving of a many-armed figure bleeding off the top and right edges. Two "Why Hermes Agent" blocks repeat the same left-copy/right-illustration split at a smaller scale. A three-up row of bordered cards (Mac OS / Windows / Linux) each carries a faint statue-photography ground, a platform label and its own download button. An FAQ runs as a single hairline-ruled column of question/answer pairs. The page closes on a promotional band for the companion subscription product: a giant outline wordmark watermark behind a duotone illustrated figure, a single CTA button above it.',
        imagerySubject: 'a many-armed classical figure, rendered as a white line engraving radiating sunburst hairlines, repeated smaller as a duotone illustration in the closing band',
        mood: ['mythic', 'premium', 'considered', 'bold'],
        signature: {
          carry: [
            'A single fully saturated hue fills the entire canvas with no gradient and no second colour anywhere outside pure white',
            'The hero illustration is a white hairline engraving radiating a sunburst of strokes from the figure outward to the canvas edge',
            'Nav, eyebrows, button labels and body all run in monospace while the wordmark and section heads alone carry the tracked serif',
            'Three platform options are presented as identically sized bordered cards in one row, each with its own faint photographic ground and its own button rather than one shared download control',
            'The page closes on an oversized outline wordmark watermark for a second, related product rather than a repeated CTA for the page\'s own subject'
          ],
          rewrite: [
            'The wordmark and eyebrow name this specific product and category; write the target\'s own product name and eyebrow',
            'FAQ questions and answers describe this product\'s own licensing, platform support and account requirements; write the target\'s genuine FAQ content',
            'The closing band promotes a specific companion product by name and plan tiers; substitute the target\'s own cross-sell, or drop the band entirely if none exists'
          ]
        }
      },
      {
        id: 'nous-portal-usage',
        file: 'images/Nous-Portal-Usage.png',
        thumb: 'images/thumbs/Nous-Portal-Usage.webp',
        display: 'images/display/Nous-Portal-Usage.webp',
        categoryId: 'navy-serif-dashboard',
        title: 'Nous Portal — Usage',
        descriptor: 'Six zero-state stat tiles sit above an empty line chart with its own display-range and grouping controls, closing on a tool-pricing accordion.',
        keywords: [
          'six-tile stat row',
          'zero-state line chart',
          'display-range button row',
          'by-model chart dropdown',
          'tool-pricing accordion list',
          'chart-export icon',
          'breadcrumb overview label',
          'sidebar balance chip'
        ],
        colors: [
          { name: 'Navy panel', hex: '#1B1B2D', usage: 'sidebar and stat-tile row ground' },
          { name: 'Near-black', hex: '#09091B', usage: 'main content page ground' },
          { name: 'Indigo bar', hex: '#090951', usage: 'slim gradient bar across the very top edge' },
          { name: 'Slate card', hex: '#2D2D3F', usage: 'chart panel and accordion row fill' },
          { name: 'Cool grey', hex: '#757587', usage: 'stat-tile labels and chart axis figures' },
          { name: 'Off-white', hex: '#F3F3F3', usage: '"Usage" H1 and stat-tile figures' }
        ],
        typography: 'The "Usage" H1 runs in a light serif at roughly 40px against a monospace breadcrumb above it. Stat-tile figures are set large in a neutral grotesk at around 28px/500 with their all-caps labels beneath at 11px tracked wide. Axis figures on the chart and the display-range buttons run in the same tracked monospace as the breadcrumb.',
        layoutNotes: 'Six unbordered stat tiles sit in a single row on a shared panel ground, the first ("SPEND") distinguished only by a slightly lighter tile fill and a leading dollar figure; the other five show token/request counts at zero. Below, a bordered chart panel pairs two dropdowns (grouping and chart type) with a row of display-range buttons and a download icon, framing an empty axis grid at $0–$1.00 with no data drawn. A "Top 8 / Show all" toggle and a legend key sit at the panel\'s lower-right corner. A "Tool Pricing" H2 introduces an accordion list of provider names, each row closed with a chevron and no pricing shown until expanded.',
        imagerySubject: 'none — the page is entirely stat tiles, an axis chart and list rows',
        mood: ['instrumented', 'sparse', 'quiet', 'precise'],
        signature: {
          carry: [
            'Six stat tiles share one borderless row and one ground, with only the first tile\'s fill distinguishing it as the primary figure',
            'The chart panel pairs a grouping dropdown and a chart-type dropdown on one side with a row of preset display-range buttons on the other, both controlling the same axis',
            'A provider accordion list closes the page with every row collapsed and no pricing visible until a row is opened',
            'The chart\'s empty state still draws its full axis grid and legend controls rather than substituting an empty-state illustration or message',
            'A range toggle governing how many series the legend lists sits at the chart\'s lower corner rather than beside its title'
          ],
          rewrite: [
            'The six stat tiles measure this product\'s own usage metrics; substitute the target\'s own metered quantities in its own units',
            'The accordion lists this product\'s own priced tool integrations by name; write the target\'s own list of metered add-ons, or drop the section if none exist',
            'The breadcrumb and H1 name this specific section; write the target\'s own section name'
          ]
        }
      },
      {
        id: 'nous-portal-billing',
        file: 'images/Nous-Portal-Billing.png',
        thumb: 'images/thumbs/Nous-Portal-Billing.webp',
        display: 'images/display/Nous-Portal-Billing.webp',
        categoryId: 'navy-serif-dashboard',
        title: 'Nous Portal — Billing',
        descriptor: 'A single oversized balance sits above a three-row breakdown table, four subscription tier cards, and a top-up stepper beside a cracked-glass texture image.',
        keywords: [
          'oversized balance numeral',
          'three-row balance breakdown',
          'four-tier subscription row',
          'bonus ribbon badge',
          'grainy statue tier photography',
          'payment method module',
          'top-up chip stepper',
          'cracked-glass texture panel'
        ],
        colors: [
          { name: 'Near-black', hex: '#09091B', usage: 'main content page ground' },
          { name: 'Navy panel', hex: '#1B1B2D', usage: 'sidebar ground' },
          { name: 'Indigo bar', hex: '#090951', usage: 'slim gradient bar across the very top edge' },
          { name: 'Ultramarine', hex: '#0909F3', usage: 'the "Plus" tier card fill and its button' },
          { name: 'Slate card', hex: '#2D2D3F', usage: 'balance breakdown row fill' },
          { name: 'Off-white', hex: '#F3F3F3', usage: '"Billing" H1, the balance numeral and breakdown figures' },
          { name: 'Cool grey', hex: '#ABABAB', usage: 'breakdown row secondary labels' }
        ],
        typography: 'The "Billing" H1 and the balance numeral both run in the same light serif, the balance scaled to roughly triple the H1 size with a thin stroke that stays legible even that large. Breakdown-row labels and tier-card copy run in a neutral grotesk, bullet points at 14px/400; tier prices are set large and bold with "PER MONTH" beneath in tracked monospace caps. Badge and button labels are tracked monospace uppercase throughout.',
        layoutNotes: 'Below the H1 and a one-line description, the balance is stated once at very large size with no card around it. A three-row breakdown table (Top-up credits / Subscription credits / Spent this period) pairs an icon glyph, the row\'s own figure, a status note and a right-column detail, one underlined link among them. A "Subscription" H2 introduces four tier cards in one row, each carrying a grainy blue-toned statue photograph, a bulleted feature list and its own CTA button; the second tier is highlighted with a filled blue ground and a bonus ribbon the others also carry in outline. A "Payment Method" module states no card is on file beside an add-a-card button. A "Topup" module pairs a row of preset amount chips and a custom dollar figure with a pay button, beside a full-height cracked-glass texture image, and closes on a one-line note about payment throttling for new accounts.',
        imagerySubject: 'grainy blue-duotone photography of classical statue busts, one per subscription tier, escalating in apparent formality from a bare figure to an armoured one; a cracked-glass texture beside the top-up module',
        mood: ['instrumented', 'transactional', 'tiered', 'precise'],
        signature: {
          carry: [
            'The account balance is stated once at roughly triple the page headline\'s size with no card, border or label crowding it',
            'A three-row breakdown table pairs each figure with its own icon glyph and a plain-language expiry or status note rather than leaving the figure to speak alone',
            'Four subscription tiers run in one row as identically structured cards — photograph, bulleted features, price, button — with only the second tier\'s ground filled to mark it recommended',
            'A top-up module pairs preset amount chips with a free-entry figure and states the exact conditions that unlock higher limits, rather than hiding the throttle behind a support link',
            'Grainy duotone statue photography escalates in apparent formality one tier at a time, standing in for a feature-seniority ladder without naming it'
          ],
          rewrite: [
            'Tier names, prices and feature bullets belong to this specific product; write the target\'s own tiers, pricing and feature lists',
            'The payment-throttle note states this account\'s specific unlock conditions; write the target\'s own genuine throttle rule or drop the note if none applies',
            'The statue photography is this brand\'s own art direction; choose imagery that escalates in the target\'s own register — it need not be classical sculpture'
          ]
        }
      },
      {
        id: 'nous-portal-models',
        file: 'images/Nous-Portal-Models.png',
        thumb: 'images/thumbs/Nous-Portal-Models.webp',
        display: 'images/display/Nous-Portal-Models.webp',
        categoryId: 'navy-serif-dashboard',
        title: 'Nous Portal — Models',
        descriptor: 'Amber promo cards and a free-model chip row sit above a dense, filterable pricing table with struck-through list prices and a percent-saved column.',
        keywords: [
          'amber percent-off badge',
          'green free chip row',
          'strikethrough list price',
          'sortable pricing table',
          'provider filter dropdown',
          'per-page count selector',
          'model-type toggle row',
          'ranked daily-usage column'
        ],
        colors: [
          { name: 'Navy panel', hex: '#1B1B2D', usage: 'promo-card and table-row ground' },
          { name: 'Near-black', hex: '#09091B', usage: 'page ground behind the promo-card grid' },
          { name: 'Indigo bar', hex: '#090951', usage: 'slim gradient bar across the very top edge' },
          { name: 'Slate card', hex: '#2D2D3F', usage: 'promo card border fill and alternating table rows' },
          { name: 'Off-white', hex: '#F3F3F3', usage: '"Models" H1, table headers and model names' },
          { name: 'Muted green', hex: '#099963', usage: '"FREE" pill badge fill' },
          { name: 'Muted amber', hex: '#BD8751', usage: '"% OFF" pill badge fill' }
        ],
        typography: 'The "Models" H1 runs in the shared light serif at roughly 40px. Promo-card headlines and the pricing table\'s model names run in a neutral grotesk at 15–16px/500; per-token figures and list-price strikethroughs run in tracked monospace, as do the percent-off and FREE badges. Table headers are small tracked monospace caps.',
        layoutNotes: 'Three amber-bordered promo cards sit in a row beneath "Active Promos," each pairing a model name, a percent-off badge and its discounted per-token rate over a struck-through list rate; a fourth card spans the full row width for the catalog-wide discount claim. A "Free Models" row lists model names as bordered chips. The "All Models" table below runs a search field, provider dropdown and per-page selector above a tab row (All/Text/Embeddings/Other/Free/Discounted) and a result count, then a dense table — rank, model, type, portal price, struck-through list price, percent saved — with FREE and percent-off badges replacing the price columns where they apply. Pagination sits at the table\'s foot beside a note on how often prices refresh.',
        imagerySubject: 'none — the page is entirely promo cards, chips and a data table',
        mood: ['dense', 'comparative', 'transactional', 'exhaustive'],
        signature: {
          carry: [
            'Promo cards state the discount as a badge in the corner rather than in the headline, keeping the model name the most prominent text on the card',
            'Every discounted price is shown paired with its struck-through list price in the same row, so the saving is always checkable rather than asserted',
            'A tab row filters by content type independently of a second filter for pricing status, so the two axes compose rather than exclude each other',
            'A ranked usage column orders the table by observed popularity rather than by price or name, putting demand ahead of cost as the default sort',
            'Free models get their own unbadged chip row above the priced table entirely, rather than being sorted to the top of the same table'
          ],
          rewrite: [
            'The promo cards and table rows name this platform\'s own catalogue of third-party models and their real per-token prices; write the target\'s own priced catalogue',
            'The result count and pagination reflect this catalogue\'s actual size; recompute for the target\'s own inventory',
            'The refresh-cadence note states this platform\'s own data-freshness guarantee; write the target\'s own genuine cadence or drop the note'
          ]
        }
      },
      {
        id: 'nous-portal-api-docs',
        file: 'images/Nous-Portal-API-Docs.png',
        thumb: 'images/thumbs/Nous-Portal-API-Docs.webp',
        display: 'images/display/Nous-Portal-API-Docs.webp',
        categoryId: 'navy-serif-dashboard',
        title: 'Nous Portal — API Docs',
        descriptor: 'An OpenAPI reference page pairing a numbered auth-options list with a bordered server selector, collapsible method rows and nested schema trees.',
        keywords: [
          'version chip pair',
          'numbered auth options list',
          'bordered server-selector row',
          'lock-icon authorize button',
          'collapsible method row',
          'colour-coded HTTP verb badge',
          'nested schema tree',
          'inline monospace token'
        ],
        colors: [
          { name: 'Near-black', hex: '#09091B', usage: 'main content page ground' },
          { name: 'Navy panel', hex: '#1B1B2D', usage: 'sidebar ground' },
          { name: 'Indigo bar', hex: '#090951', usage: 'slim gradient bar across the very top edge' },
          { name: 'Slate row', hex: '#3F3F51', usage: 'schema-tree row and method-row alternating fill' },
          { name: 'Mid slate', hex: '#515163', usage: 'bordered server-selector row and inline code-token background' },
          { name: 'Cool grey', hex: '#757587', usage: 'body prose and secondary schema field labels', contrastNote: '4.36:1 on the near-black page ground — a narrow miss of the 4.5:1 body copy needs. Close enough to read as intentional but does not clear AA; darken toward #8686A0 to pass cleanly.' },
          { name: 'Off-white', hex: '#F3F3F3', usage: '"API Docs" H1, endpoint titles and schema type names' }
        ],
        typography: 'The "API Docs" H1 runs in the shared light serif; the API title beneath it is set in a bold tracked grotesk with two small monospace version chips beside it. Body prose runs in a neutral grotesk at 15px/400 with inline code tokens (endpoint paths, header names) set in monospace on a slightly lighter fill. Method rows show the HTTP verb in a small bold monospace badge beside the endpoint path in monospace.',
        layoutNotes: 'A title block states the API name, version chips and a link to its OpenAPI spec, followed by prose sections mixing bulleted lists with inline monospace tokens and a two-option numbered choice (API keys vs. an alternative payment protocol) each broken into its own numbered sub-steps. A rate-limit list and an available-models list follow as plain bullets. A bordered row pairs a server-URL dropdown with a lock-icon authorize button. Below that, collapsible method rows (verb badge + path + one-line description) expand into full request/response detail, and a "Schemas" section holds nested, indentable type trees showing each field\'s name, type and whether it is required.',
        imagerySubject: 'none — the page is prose, code tokens and a schema tree',
        mood: ['technical', 'exhaustive', 'precise', 'referential'],
        signature: {
          carry: [
            'Two version chips sit directly beside the API title rather than in a metadata row, making the spec version as visually prominent as the title itself',
            'Authentication is presented as two independent numbered paths rather than one procedure, letting the reader skip straight to the option relevant to them',
            'A single bordered row pairs the environment selector with the authorize control, so choosing a server and authorizing against it read as one action',
            'Rate limits are tabulated by account tier as plain bullets rather than a table, keeping them scannable without implying the tiers can be compared cell by cell',
            'Schema trees show required fields marked inline at the field level rather than in a separate list, so requiredness never has to be cross-referenced'
          ],
          rewrite: [
            'The API name, base URL, available models and rate limits are this platform\'s own; write the target\'s own service name, endpoint and real limits',
            'The two authentication paths are this platform\'s own supported methods; write the target\'s own genuine auth options, which may be only one',
            'Schema names and field lists belong to this API\'s own contract; write the target\'s own schemas from its real spec'
          ]
        }
      },
      {
        id: 'nous-portal-overview',
        file: 'images/Nous-Portal-Overview.png',
        thumb: 'images/thumbs/Nous-Portal-Overview.webp',
        display: 'images/display/Nous-Portal-Overview.webp',
        categoryId: 'navy-serif-dashboard',
        title: 'Nous Portal — Overview',
        descriptor: 'A two-column hero over a numbered, halftone-illustrated feature list, closing on the same Getting-Started, subscription and top-up modules the utility pages use.',
        keywords: [
          'halftone feature illustration',
          'numbered why-us list',
          'three-card getting-started row',
          'inline model search preview',
          'reused subscription tier row',
          'reused top-up module',
          'single blue CTA hero',
          'sidebar map watermark'
        ],
        colors: [
          { name: 'Near-black', hex: '#09091B', usage: 'main content page ground' },
          { name: 'Navy panel', hex: '#1B1B2D', usage: 'sidebar ground and feature-row alternating fill' },
          { name: 'Slate card', hex: '#2D2D3F', usage: 'getting-started and subscription card fill' },
          { name: 'Indigo bar', hex: '#090951', usage: 'slim gradient bar across the very top edge' },
          { name: 'Slate row', hex: '#3F3F51', usage: 'model-search table and topup card fill' },
          { name: 'Off-white', hex: '#F3F3F3', usage: 'H1 and body copy' },
          { name: 'Ultramarine', hex: '#0909F3', usage: 'the "See Plans" CTA button fill' }
        ],
        typography: 'The H1 runs in the shared light serif at roughly twice the size used on the utility pages, wrapping to two lines. Body intro copy is a neutral grotesk at 18px/400; the numbered "Why Nous Portal?" list sets each numeral in tracked monospace beside a grotesk sub-heading and body. Getting-Started and subscription cards reuse the same grotesk/monospace pairing as Billing.',
        layoutNotes: 'A two-column hero pairs a large serif headline, intro paragraph and single blue CTA button on the left against empty space on the right, where a faint halftone globe graphic bleeds in from below. A "Why Nous Portal?" section runs four numbered blocks, each pairing a monospace numeral, a grotesk sub-heading and body copy against a bitmap halftone photograph, alternating which side the image sits on. A "Getting Started" H2 introduces three cards each holding a small product screenshot and its own CTA button. A "What\'s Included?" section pairs a models blurb with an inline scrollable table preview and a tools blurb with an icon-list graphic. The page closes by reusing the Billing page\'s subscription-tier row and top-up module verbatim.',
        imagerySubject: 'halftone-textured bitmap photography (a stone bust, a hand, a wall of monitor eyes, a reaching figure) illustrating each numbered feature; small product screenshots inside the Getting-Started cards',
        mood: ['persuasive', 'instrumented', 'comprehensive', 'confident'],
        signature: {
          carry: [
            'The hero pairs a single CTA with genuinely empty space beside it rather than a product screenshot, deferring all product proof to the sections below',
            'Each numbered feature block pairs its explanation with a halftone-textured photograph rather than a flat icon, giving an otherwise all-UI page its only imagery',
            'Getting-Started is presented as three parallel onboarding paths rather than one, each with its own screenshot and its own CTA, so the reader picks an entry point rather than following one funnel',
            'The page closes by reusing the account page\'s own subscription and top-up modules verbatim rather than a simplified marketing summary, so pricing is never inconsistent between the sales and account views',
            'A live, scrollable table preview stands in for the models section\'s proof rather than a static screenshot of one'
          ],
          rewrite: [
            'The four numbered claims and their headlines are this product\'s own value propositions; write the target\'s own, matched one-for-one against real capabilities',
            'The Getting-Started cards name this product\'s own three onboarding paths; write the target\'s own entry points, which may number fewer or more than three',
            'The hero headline and intro state this specific product\'s promise; write the target\'s own'
          ]
        }
      },
      {
        id: 'nous-research-home',
        file: 'images/Nous-Research-Homepage.png',
        thumb: 'images/thumbs/Nous-Research-Homepage.webp',
        display: 'images/display/Nous-Research-Homepage.webp',
        categoryId: 'cyanotype-output-readout',
        title: 'Nous Research — Homepage',
        descriptor: 'A near-white page presenting each statement as a captioned dataset row: a cyanotype photograph, a heading and body, and a monospace output/seed tag with its own glyph.',
        keywords: [
          'cyanotype duotone photograph',
          'dashed full-bleed divider',
          'output/seed metadata tag',
          'globe/note/gem line-icon',
          'underlined section label',
          'small-caps serif nav',
          'consistent single-blue accent',
          'documentary photography subject'
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', usage: 'page ground throughout' },
          { name: 'Mid slate-blue', hex: '#2D6387', usage: 'primary duotone photograph mid-tone' },
          { name: 'Deep blue', hex: '#1B5175', usage: 'duotone photograph shadow tone and nav/heading text colour' },
          { name: 'Ink navy', hex: '#093F51', usage: 'darkest duotone shadow in the interior/night photographs' },
          { name: 'Sky blue', hex: '#3F87AB', usage: 'duotone photograph highlight tone' },
          { name: 'Pale cyan', hex: '#E1F3F3', usage: 'the dashed divider rule' }
        ],
        typography: 'Nav links run in a serif set in small caps, tracked wide, centred with a small home glyph at the left edge. Every row uses the same pairing: an underlined monospace bold section label, a monospace bold two-line lead sentence, and monospace regular body beneath it — there is no separate serif body face despite the serif nav. The output/seed metadata tag is the same monospace bold as the section label, right-aligned in its own column.',
        layoutNotes: 'A centred nav (Home, Hermes Agent, Nous Portal, Careers, Releases, Shop, Blog) sits above a dashed full-bleed rule that recurs after every row. Each row runs a fixed three-column split: a square duotone photograph at left, an underlined label plus bold lead sentence and body in the centre, and a right-aligned metadata column carrying a two-line output-number / seed-number tag above a single small outlined glyph (globe, musical note, gem) that has no stated relationship to the copy beside it. The photograph column never swaps sides; only its subject, the copy and the tag values change row to row.',
        imagerySubject: 'documentary photography toned into a single blue duotone — a forest cabin, a glass sphere on a snowy field, a rippled water reflection — one per row, unrelated to each other in subject',
        mood: ['documentary', 'considered', 'quiet', 'process-driven'],
        signature: {
          carry: [
            'Every row is captioned with a two-line monospace output-number and seed-number pair, as if the row itself were a labelled generative print',
            'A single small outlined glyph sits beneath each metadata tag with no explained relationship to the row\'s subject, functioning as an icon without a legend',
            'All photography is toned into the same single blue duotone regardless of its original subject or colour',
            'The image column holds a fixed position at the row\'s left edge across every row rather than alternating sides',
            'A dashed, full-bleed rule recurs after every row including the first, so the nav reads as its own row rather than page chrome sitting outside the system'
          ],
          rewrite: [
            'The section labels and body copy state this specific company\'s mission, model work and research focus; write the target\'s own statements',
            'The nav lists this company\'s own site sections; write the target\'s own',
            'The output and seed numbers are specific values with no stated meaning; generate the target\'s own values in the same two-line format, or drop the tag if the target has no equivalent generative-process framing'
          ]
        }
      }
    ]
  };
});
