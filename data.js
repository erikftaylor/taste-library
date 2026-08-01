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
      },
      {
        id: 'soft-gradient-ai-editorial',
        name: 'Soft Gradient AI Editorial',
        description: 'A pastel, atmospheric SaaS/AI-startup style built from soft gradient-mesh color washes (blush, periwinkle, peach) layered with a fine grid texture, paired with dark code-editor UI mockups that visually ground the abstract background in real product screenshots. Headlines mix a heavy sans display face with a lighter serif-italic accent word for emphasis, and terracotta pill buttons carry the calls to action. Roadmaps and process steps are shown as a vertical dotted-line timeline with circular numbered nodes. Reads as calm, premium, and technical at once — common on AI/automation-agency and consulting-adjacent SaaS sites that want to feel sophisticated rather than loud.',
        vocabulary: [
          'pastel gradient-mesh wash',
          'fine grid texture overlay',
          'dark code-editor UI mockup',
          'serif-italic accent word',
          'terracotta pill CTA button',
          'dotted-line roadmap timeline',
          'circular numbered milestone node',
          'dark testimonial card'
        ],
        imageryTechnique: 'soft atmospheric gradient-mesh color wash with a faint grid texture overlay, no illustrated figures, abstract and airy — like a blurred color field rather than a scene',
        imageryExclusions: 'no text, no interface elements, no logos, no hard edges or sharp shapes'
      },
      {
        id: 'editorial-consulting-photography',
        name: 'Editorial Consulting Photography',
        description: 'A photography-led enterprise-consulting style that pairs real documentary-style photos of people in workshops and meetings with a serif editorial headline and muted steel-blue section blocks. Content is organized into clean two-column comparison panels, checkmark bullet lists, and a testimonial block with a circular photo avatar. Where the illustrated and gradient styles in this library reach for warmth through drawing or abstraction, this one reaches for credibility through real photographic evidence of the work happening — common on enterprise consulting and B2B strategy-firm sites selling trust and seniority rather than personality.',
        vocabulary: [
          'documentary workshop photography',
          'serif editorial headline',
          'muted steel-blue section block',
          'checkmark bullet list',
          'circular photo-avatar testimonial',
          'two-column comparison panel',
          'numbered request-flow list'
        ],
        imageryTechnique: 'real documentary-style photography of people in a professional workshop or meeting setting, natural light, candid composition, muted cool color grading — not illustration, not abstract',
        imageryExclusions: 'no text overlay, no interface elements, no logos, no illustration or vector art'
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
      },
      {
        id: 'chase-ai-mentorship',
        file: 'images/1-1-Mentorship-Program-Chase-AI.png',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'Chase AI — 1:1 Mentorship Program',
        descriptor: 'Long-form sales page for an AI mentorship program, built on soft gradient washes and a dotted-line 90-day roadmap.',
        keywords: [
          'pastel gradient-mesh hero background',
          'fine grid texture overlay',
          'dotted-line roadmap timeline',
          'circular numbered milestone nodes',
          'terracotta pill CTA button',
          'serif-italic accent word in headline',
          'dark testimonial message-bubble card',
          'client proof screenshot grid'
        ],
        colors: [
          { name: 'pale periwinkle wash', hex: '#E2EAF9' },
          { name: 'soft blush cream', hex: '#F3EBE7' },
          { name: 'pale peach wash', hex: '#F8F0EC' },
          { name: 'warm taupe accent', hex: '#A29894' },
          { name: 'terracotta CTA orange', hex: '#A5755F' }
        ],
        typography: 'Heavy sans-serif display headline paired with a lighter serif-italic word for emphasis (e.g. "90 Days" set in italic serif); small tracked all-caps eyebrow labels above section headers; clean sans body copy.',
        layoutNotes: 'Long vertical sales-page structure: hero, three-card "how it works" row, a vertical dotted-line roadmap with alternating left/right phase cards and numbered circular nodes, a benefits checklist, a dark testimonial/message-bubble block with a "$12k Client Closed" proof card, a pricing card, an FAQ accordion, and a multi-step application form footer.',
        imagerySubject: 'a soft blush-to-periwinkle gradient wash with a faint diagonal color transition and subtle grid texture, no figures',
        mood: ['calm', 'premium', 'aspirational', 'technical']
      },
      {
        id: 'chase-ai-homepage',
        file: 'images/Chase-AI-Turn-AI-Into-Your-Unfair-Advantage.png',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'Chase AI — Homepage',
        descriptor: 'AI automation agency homepage pairing a pastel gradient hero with a dark code-editor UI mockup.',
        keywords: [
          'pastel gradient-mesh hero background',
          'dark code-editor UI mockup',
          'file-tree and syntax-highlighted code panel',
          'serif-italic accent word in headline',
          'terracotta pill CTA button',
          'four-step numbered process cards',
          'connected-line process diagram'
        ],
        colors: [
          { name: 'pale periwinkle wash', hex: '#E8EDF7' },
          { name: 'soft blush cream', hex: '#F8EEE9' },
          { name: 'pale sky-blue wash', hex: '#DBE6F8' },
          { name: 'terracotta CTA orange', hex: '#A5755F' },
          { name: 'warm taupe accent', hex: '#BFA498' }
        ],
        typography: 'Same heavy sans display plus serif-italic accent-word pairing as the mentorship page ("Turn AI Into Your Unfair Advantage", with the last word rendered in soft italic serif); small tracked all-caps section eyebrows ("WHAT WE BUILD", "OUR APPROACH").',
        layoutNotes: 'Hero with a floating dark code-editor window (file tree plus syntax-highlighted TypeScript) layered over the gradient wash; a "what we build" card row with small UI-mockup thumbnails; a four-step numbered process section connected by thin vertical lines; a long multi-field contact form as the closing section.',
        imagerySubject: 'a soft periwinkle-to-blush gradient wash transitioning diagonally across the frame, faint grid texture, no figures',
        mood: ['calm', 'technical', 'premium', 'confident']
      },
      {
        id: 'think-company-session',
        file: 'images/Enterprise-Software-Modernization-Think-Session.png',
        categoryId: 'editorial-consulting-photography',
        title: 'Think Company — Think Session Landing Page',
        descriptor: 'Enterprise-consulting landing page pairing documentary workshop photography with a serif editorial headline and muted steel-blue sections.',
        keywords: [
          'documentary workshop photography',
          'serif editorial headline',
          'muted steel-blue section block',
          'checkmark bullet list',
          'circular photo-avatar testimonial',
          'two-column comparison panel',
          'numbered request-flow list',
          'long-form qualification form'
        ],
        colors: [
          { name: 'pale steel-blue wash', hex: '#CBD2D6' },
          { name: 'muted slate blue', hex: '#BDC7CD' },
          { name: 'deep navy ink', hex: '#072235' },
          { name: 'pale ice-blue section', hex: '#DAE3E8' },
          { name: 'slate blue-gray', hex: '#54616E' },
          { name: 'charcoal navy', hex: '#263440' }
        ],
        typography: 'Serif editorial display headline for section titles ("Before Modernization Stalls, Get Strategic Clarity."); clean sans body copy; small blue sans links for inline emphasis.',
        layoutNotes: 'Alternating white and pale-steel-blue full-bleed sections; a two-column "what this is / what you get" checkmark comparison panel; a centered pull-quote testimonial with a circular headshot; a numbered "who this is for" list; a long qualification form (name, company, industry, budget range) as the closing section; dark navy footer.',
        imagerySubject: 'a diverse group of enterprise employees in a modern workshop space, one person presenting at a whiteboard, natural window light, documentary editorial photography',
        mood: ['credible', 'serious', 'senior', 'calm']
      }
    ]
  };
});
