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
        description: 'A friendly, editorial style built from flat, full-bleed color-block sections paired with loose single-line hand-drawn character illustrations. Bold, tightly-tracked grotesk headlines sit against generous whitespace on white sections, with underline or highlighter-style accents used to punch up key words instead of relying on bold weight or color alone. It reads as approachable and human rather than corporate — common on consultancy, agency, and B2B-services sites that want warmth without looking unserious.',
        vocabulary: [
          'flat color-blocking',
          'single-line illustration',
          'watercolor wash background',
          'underline emphasis',
          'geometric grotesk display type',
          'asymmetric zigzag layout',
          'dark pill CTA button',
          'numbered process badge'
        ],
        imageryTechnique: 'loose single-line vector illustration with minimal facial detail, flat watercolor-wash color field behind the figures, no gradients, generous white negative space around the scene',
        imageryExclusions: 'no text, no interface elements, no logos'
      }
    ],
    images: [
      {
        id: 'usman-home',
        file: 'images/Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.png',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — Homepage',
        descriptor: 'Hand-drawn line-art figures set against flat watercolor-wash color blocks — approachable, human, editorial.',
        keywords: [
          'single-line hand-drawn illustration',
          'flat watercolor wash background',
          'full-bleed color-block sections',
          'underline text emphasis',
          'bold geometric grotesk headline',
          'asymmetric zigzag composition',
          'dark pill CTA button',
          'numbered process steps'
        ],
        colors: [
          { name: 'pale cyan wash', hex: '#8DF1F4' },
          { name: 'warm terracotta', hex: '#967359' },
          { name: 'muted mustard-gold wash', hex: '#E9B97D' },
          { name: 'deep rust accent', hex: '#844441' },
          { name: 'pale cream', hex: '#F2E3BA' }
        ],
        typography: 'Bold geometric grotesk display headline (~800 weight) for hero copy, regular-weight body text, small tracked all-caps eyebrow labels ("HI THERE", "THREAD ON").',
        layoutNotes: 'Alternating full-bleed watercolor-wash sections behind illustrations, connected by a hand-drawn dotted line that threads down the page; illustrations placed asymmetrically left/right in a zigzag; dark pill-shaped CTA buttons ("PROVE IT"); wide vertical rhythm with generous whitespace on white sections.',
        imagerySubject: 'two people collaborating at a whiteboard, sketching a diagram',
        mood: ['approachable', 'optimistic', 'human', 'confident']
      },
      {
        id: 'usman-blog',
        file: 'images/Business-Communication-Digital-Strategy-Blog-by-Usman-Group.png',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — Blog Index',
        descriptor: 'Flat 4-up color-block card grid for article previews, with the same hand-drawn illustration style in the hero.',
        keywords: [
          '4-up flat color-block grid',
          'arrow link glyph',
          'category label with underline rule',
          'hand-drawn hero illustration',
          'bold grotesk headline',
          'tab-style content filter'
        ],
        colors: [
          { name: 'muted sage green', hex: '#5E816B' },
          { name: 'warm khaki gold', hex: '#C1AB74' },
          { name: 'pale sage green', hex: '#C8D6AD' },
          { name: 'deep maroon-brown', hex: '#622725' },
          { name: 'bright mint green', hex: '#72F799' }
        ],
        typography: 'Same bold grotesk display type as the homepage for headlines; small tracked all-caps category labels ("ARTICLES") with a short underline rule beneath.',
        layoutNotes: 'Featured article in a two-column hero (text + illustration), followed by a strict 2x2 grid of solid-color article cards where color is the only visual differentiator (no imagery inside cards), each with a simple arrow-glyph link; horizontal tab filter bar above the grid ("ALL / ARTICLES / CASE STUDIES / ESSAYS").',
        imagerySubject: 'a four-piece band playing music together',
        mood: ['organized', 'playful', 'confident']
      },
      {
        id: 'usman-contact',
        file: 'images/Contact-Usman-Group.png',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — Contact',
        descriptor: 'Mad-libs-style conversational form built from underlined fill-in-the-blank fields.',
        keywords: [
          'fill-in-the-blank mad-libs form',
          'underline input field',
          'inline field labels above the line',
          'hand-drawn illustration accent',
          'dark pill CTA button',
          'flat mint watercolor wash'
        ],
        colors: [
          { name: 'bright mint green', hex: '#6BF193' },
          { name: 'medium mint green', hex: '#61DC86' },
          { name: 'pale sand', hex: '#D9CFB1' }
        ],
        typography: 'Bold grotesk display type used for both the headline and the form’s sentence-style copy, so the form itself reads like enlarged headline text; small tracked all-caps micro-labels above each blank ("FIRST NAME", "PROJECT OR GOAL").',
        layoutNotes: 'Form is written as a single flowing sentence ("My name is ___ with ___...") with underlined blanks standing in for input fields, breaking the conventional label-above-input form pattern; hero illustration paired with a flat mint watercolor-wash background.',
        imagerySubject: 'two people talking through paper cups connected by string, seated among potted plants',
        mood: ['conversational', 'warm', 'human']
      },
      {
        id: 'usman-about',
        file: 'images/Web-Consultant-Marketing-Design-Development-Consulting.png',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Usman Group — About / Team',
        descriptor: 'Team headshot grid and numbered process steps inside a bold coral color-block section.',
        keywords: [
          'headshot grid',
          'numbered process steps',
          'three-column value prop blocks',
          'full-bleed coral section',
          'accordion capability bar',
          'bold grotesk headline'
        ],
        colors: [
          { name: 'bright mint green', hex: '#73F7AE' },
          { name: 'coral red', hex: '#ED4544' },
          { name: 'pale cyan', hex: '#ADEFE9' },
          { name: 'warm sand', hex: '#DBCBAD' },
          { name: 'dusty rose-brown', hex: '#B38E8B' }
        ],
        typography: 'Consistent bold grotesk display type for section headers; small tracked all-caps labels for team roles and section eyebrows.',
        layoutNotes: 'Three-column flat-color value-prop blocks (cyan/coral/mint) under a two-column intro; horizontal accordion-style capability bar (Strategy/Communications/Technology); dense 3x3 headshot grid for the team section, all inside a full-bleed coral background block; numbered circular badges (01/02/03) mark process steps.',
        imagerySubject: 'two people high-fiving in front of a whiteboard and desk',
        mood: ['confident', 'established', 'trustworthy']
      }
    ]
  };
});
