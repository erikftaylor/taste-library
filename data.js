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
        thumb: 'images/thumbs/Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.webp',
        display: 'images/display/Boutique-Design-Digital-Strategy-Agency-in-Denver-Colorado.webp',
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
        thumb: 'images/thumbs/Business-Communication-Digital-Strategy-Blog-by-Usman-Group.webp',
        display: 'images/display/Business-Communication-Digital-Strategy-Blog-by-Usman-Group.webp',
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
        thumb: 'images/thumbs/Contact-Usman-Group.webp',
        display: 'images/display/Contact-Usman-Group.webp',
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
        thumb: 'images/thumbs/Web-Consultant-Marketing-Design-Development-Consulting.webp',
        display: 'images/display/Web-Consultant-Marketing-Design-Development-Consulting.webp',
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
        thumb: 'images/thumbs/1-1-Mentorship-Program-Chase-AI.webp',
        display: 'images/display/1-1-Mentorship-Program-Chase-AI.webp',
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
          { name: 'terracotta CTA orange', hex: '#C06038' }
        ],
        typography: 'Heavy sans-serif display headline paired with a lighter serif-italic word for emphasis (e.g. "90 Days" set in italic serif); small tracked all-caps eyebrow labels above section headers; clean sans body copy.',
        layoutNotes: 'Long vertical sales-page structure: hero, three-card "how it works" row, a vertical dotted-line roadmap with alternating left/right phase cards and numbered circular nodes, a benefits checklist, a dark testimonial/message-bubble block with a "$12k Client Closed" proof card, a pricing card, an FAQ accordion, and a multi-step application form footer.',
        imagerySubject: 'a soft blush-to-periwinkle gradient wash with a faint diagonal color transition and subtle grid texture, no figures',
        mood: ['calm', 'premium', 'aspirational', 'technical']
      },
      {
        id: 'chase-ai-homepage',
        file: 'images/Chase-AI-Turn-AI-Into-Your-Unfair-Advantage.png',
        thumb: 'images/thumbs/Chase-AI-Turn-AI-Into-Your-Unfair-Advantage.webp',
        display: 'images/display/Chase-AI-Turn-AI-Into-Your-Unfair-Advantage.webp',
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
        thumb: 'images/thumbs/Enterprise-Software-Modernization-Think-Session.webp',
        display: 'images/display/Enterprise-Software-Modernization-Think-Session.webp',
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
      },
      {
        id: 'adam-fard-studio-1',
        file: 'images/adam-fard-studio 1.png',
        thumb: 'images/thumbs/adam-fard-studio 1.webp',
        display: 'images/display/adam-fard-studio 1.webp',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Adam Fard Studio — Portfolio',
        descriptor: 'Design studio portfolio with sophisticated dark palette and typography-focused layout.',
        keywords: [
          'portfolio showcase',
          'dark sophisticated palette',
          'serif typography',
          'minimal product grid',
          'case study focus',
          'professional design work',
          'high-end aesthetic',
          'typography-forward'
        ],
        colors: [
          { name: 'dark charcoal', hex: '#1D232B' },
          { name: 'warm brown', hex: '#614742' },
          { name: 'muted blue-gray', hex: '#758494' }
        ],
        typography: 'Bold serif display type for project titles; clean sans-serif body copy; generous whitespace emphasizes hierarchy.',
        layoutNotes: 'Dark navy/black background with centered content; portfolio grid layout with minimal visual interruption; project thumbnails with serif typography labels; high contrast for readability.',
        imagerySubject: 'design portfolio work, product design mockups, interface examples, typography specimens',
        mood: ['sophisticated', 'minimal', 'professional', 'confident']
      },
      {
        id: 'baymard-institute-1',
        file: 'images/baymard-institute 1.png',
        thumb: 'images/thumbs/baymard-institute 1.webp',
        display: 'images/display/baymard-institute 1.webp',
        categoryId: 'editorial-consulting-photography',
        title: 'Baymard Institute — UX Research Services',
        descriptor: 'Research and consulting site with professional dark navy palette emphasizing expertise and methodology.',
        keywords: [
          'dark navy background',
          'professional research',
          'UX expertise',
          'consulting services',
          'structured methodology',
          'findings-focused',
          'credible positioning',
          'enterprise focus'
        ],
        colors: [
          { name: 'deep navy', hex: '#0B233C' },
          { name: 'muted slate', hex: '#30435A' },
          { name: 'navy accent', hex: '#0D243D' },
          { name: 'slate blue', hex: '#132A42' },
          { name: 'dark slate', hex: '#092038' },
          { name: 'navy dark', hex: '#0B233B' }
        ],
        typography: 'Serif display headlines for section titles; clean sans-serif body copy; all-caps labels for research methodologies; high contrast text.',
        layoutNotes: 'Dark navy full-bleed background with white text for maximum contrast; structured sections with clear methodology frameworks; comparison panels for research findings.',
        imagerySubject: 'UX research methodologies, consulting expertise, professional team settings, analytical frameworks',
        mood: ['credible', 'authoritative', 'professional', 'technical']
      },
      {
        id: 'bird-ux-1',
        file: 'images/bird-ux 1.png',
        thumb: 'images/thumbs/bird-ux 1.webp',
        display: 'images/display/bird-ux 1.webp',
        categoryId: 'editorial-consulting-photography',
        title: 'Bird UX — User Experience Design',
        descriptor: 'Design consultancy site with teal and dark contrast emphasizing user-centered research approach.',
        keywords: [
          'teal accent color',
          'dark background',
          'user research focus',
          'design thinking',
          'workshop setting',
          'methodology visualization',
          'team collaboration',
          'professional services'
        ],
        colors: [
          { name: 'dark teal', hex: '#05282E' },
          { name: 'sage gray', hex: '#576D72' },
          { name: 'teal accent', hex: '#107D5F' },
          { name: 'very dark teal', hex: '#091D20' },
          { name: 'dark cyan', hex: '#022F36' },
          { name: 'teal green', hex: '#357367' }
        ],
        typography: 'Bold sans-serif display headlines; clean sans-serif body text; teal accent color for emphasis and CTAs.',
        layoutNotes: 'Alternating teal and dark sections create visual rhythm; workshop photography integrated throughout; process steps shown with circular numbered indicators.',
        imagerySubject: 'team workshops, collaborative design sessions, user research in progress, professional settings',
        mood: ['approachable', 'professional', 'confident', 'research-driven']
      },
      {
        id: 'constructive-1',
        file: 'images/constructive 1.png',
        thumb: 'images/thumbs/constructive 1.webp',
        display: 'images/display/constructive 1.webp',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'Constructive — Design & Strategy Firm',
        descriptor: 'Digital agency site with teal gradient backgrounds showcasing design system and strategic approach.',
        keywords: [
          'teal gradient wash',
          'design system focus',
          'contemporary agency',
          'color-blocked sections',
          'portfolio showcase',
          'methodical approach',
          'brand strategy',
          'modern design'
        ],
        colors: [
          { name: 'deep teal', hex: '#006055' },
          { name: 'dark cyan', hex: '#0A2B2A' },
          { name: 'slate gray', hex: '#3F5049' },
          { name: 'teal dark', hex: '#1C3D36' },
          { name: 'teal blue', hex: '#2A7373' },
          { name: 'warm mauve', hex: '#B28278' }
        ],
        typography: 'Bold sans-serif display type for headlines; clean sans-serif body; color-coded section labels add visual interest.',
        layoutNotes: 'Teal gradient sections alternate with white space and dark content areas; structured grid for portfolio items; generous vertical rhythm.',
        imagerySubject: 'design system components, agency work samples, brand identity examples, design patterns',
        mood: ['modern', 'systematic', 'creative', 'contemporary']
      },
      {
        id: 'craft-innovations-1',
        file: 'images/craft-innovations 1.png',
        thumb: 'images/thumbs/craft-innovations 1.webp',
        display: 'images/display/craft-innovations 1.webp',
        categoryId: 'editorial-consulting-photography',
        title: 'Craft Innovations — Business Strategy',
        descriptor: 'Enterprise consulting firm emphasizing strategic innovation with sophisticated dark aesthetic.',
        keywords: [
          'dark sophisticated palette',
          'enterprise consulting',
          'strategic approach',
          'business transformation',
          'professional credibility',
          'structured methodology',
          'B2B focus',
          'thought leadership'
        ],
        colors: [
          { name: 'charcoal slate', hex: '#373F4E' }
        ],
        typography: 'Serif display headlines for authority; clean sans-serif body copy; strategic whitespace usage.',
        layoutNotes: 'Dark background with structured content sections; service offerings in organized panels; expertise demonstrated through case study methodology.',
        imagerySubject: 'enterprise consulting, strategic meetings, business transformation, professional environments',
        mood: ['serious', 'strategic', 'professional', 'trustworthy']
      },
      {
        id: 'createape-1',
        file: 'images/createape 1.png',
        thumb: 'images/thumbs/createape 1.webp',
        display: 'images/display/createape 1.webp',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'CreateApe — Digital Creative Agency',
        descriptor: 'Creative agency homepage with blue gradient hero and modern interactive portfolio elements.',
        keywords: [
          'blue gradient background',
          'creative portfolio',
          'agency storytelling',
          'interactive design',
          'modern aesthetics',
          'digital creativity',
          'service showcase',
          'contemporary agency'
        ],
        colors: [
          { name: 'very dark navy', hex: '#111928' },
          { name: 'dark navy blue', hex: '#2A2F39' },
          { name: 'sky blue', hex: '#67B8D1' },
          { name: 'light sky blue', hex: '#94D4EE' },
          { name: 'medium blue', hex: '#4DB5D0' },
          { name: 'teal blue', hex: '#2C9EBC' }
        ],
        typography: 'Bold sans-serif display headlines; lightweight sans-serif body; gradient accents used for emphasis.',
        layoutNotes: 'Blue gradient hero section; portfolio items showcased in card grid; interactive hover states; color-coded service sections.',
        imagerySubject: 'creative agency work, digital design samples, brand identity projects, visual design concepts',
        mood: ['creative', 'modern', 'energetic', 'contemporary']
      },
      {
        id: 'depalma-studios-1',
        file: 'images/depalma-studios 1.png',
        thumb: 'images/thumbs/depalma-studios 1.webp',
        display: 'images/display/depalma-studios 1.webp',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'DePalma Studios — Creative Design',
        descriptor: 'Creative studio site with vibrant blue-to-teal gradients and dynamic portfolio presentation.',
        keywords: [
          'vibrant blue gradient',
          'teal accent',
          'dynamic portfolio',
          'creative studio',
          'gradient mesh effects',
          'interactive showcase',
          'modern web design',
          'colorful aesthetic'
        ],
        colors: [
          { name: 'vibrant blue', hex: '#1B6DD6' },
          { name: 'bright blue', hex: '#1B6FDD' },
          { name: 'teal green', hex: '#37A990' },
          { name: 'blue accent', hex: '#1A67CC' },
          { name: 'warm beige', hex: '#C1BBA3' },
          { name: 'teal blue', hex: '#278ACC' }
        ],
        typography: 'Bold sans-serif display type; clean body text; accent colors used strategically for visual hierarchy.',
        layoutNotes: 'Vibrant blue-to-teal gradient backgrounds; portfolio items in dynamic grid layout; generous color treatment creates premium feel.',
        imagerySubject: 'creative design work, color studies, brand identity projects, visual design samples',
        mood: ['vibrant', 'creative', 'energetic', 'dynamic']
      },
      {
        id: 'eleken-1',
        file: 'images/eleken 1.png',
        thumb: 'images/thumbs/eleken 1.webp',
        display: 'images/display/eleken 1.webp',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'Eleken — Product Design Agency',
        descriptor: 'Product design agency with soft gradient sections and detailed case study documentation.',
        keywords: [
          'soft gradient backgrounds',
          'product design focus',
          'case study methodology',
          'design process',
          'sophisticated palette',
          'long-form content',
          'creative excellence',
          'expertise showcase'
        ],
        colors: [
          { name: 'warm taupe', hex: '#D4CFC4' },
          { name: 'soft cream', hex: '#F5F3F0' }
        ],
        typography: 'Mix of serif display and sans-serif body for visual variety; emphasis on typography hierarchy; readable long-form content.',
        layoutNotes: 'Soft gradient sections frame each case study; detailed process steps shown with visual documentation; long-form narrative structure.',
        imagerySubject: 'product design work, design process steps, UI/UX examples, design case studies',
        mood: ['professional', 'creative', 'sophisticated', 'methodical']
      },
      {
        id: 'experience-dynamics-1',
        file: 'images/experience-dynamics 1.png',
        thumb: 'images/thumbs/experience-dynamics 1.webp',
        display: 'images/display/experience-dynamics 1.webp',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'Experience Dynamics — Service Design',
        descriptor: 'Service design consultancy with dark navy background and bright blue accent colors.',
        keywords: [
          'dark navy background',
          'bright blue accents',
          'service design focus',
          'professional expertise',
          'structured methodology',
          'color-coded sections',
          'enterprise consulting',
          'strategic positioning'
        ],
        colors: [
          { name: 'very dark gray', hex: '#161D21' },
          { name: 'dark gray-blue', hex: '#252C30' },
          { name: 'slate blue', hex: '#2D4C61' },
          { name: 'bright cyan', hex: '#0093BC' },
          { name: 'medium cyan', hex: '#0FA3CC' },
          { name: 'slate teal', hex: '#143A52' }
        ],
        typography: 'Bold sans-serif headlines for impact; clean sans-serif body; blue accent text for CTAs and emphasis.',
        layoutNotes: 'Dark navy background with bright blue accent sections; clear information hierarchy; structured methodology visualization.',
        imagerySubject: 'service design process, methodology diagrams, enterprise solutions, professional consulting',
        mood: ['professional', 'technical', 'strategic', 'confident']
      },
      {
        id: 'focus-lab-1',
        file: 'images/focus-lab 1.png',
        thumb: 'images/thumbs/focus-lab 1.webp',
        display: 'images/display/focus-lab 1.webp',
        categoryId: 'editorial-consulting-photography',
        title: 'Focus Lab — UX Research & Strategy',
        descriptor: 'UX research firm emphasizing user-centered methodology with green and blue color scheme.',
        keywords: [
          'green accent color',
          'blue secondary',
          'UX research focus',
          'user-centered approach',
          'research methodology',
          'professional expertise',
          'structured framework',
          'findings-driven'
        ],
        colors: [
          { name: 'dark green', hex: '#054A2F' },
          { name: 'warm brown-gray', hex: '#433B37' },
          { name: 'electric blue', hex: '#074EBD' },
          { name: 'muted blue-gray', hex: '#536C7B' },
          { name: 'forest green', hex: '#034A2D' },
          { name: 'dark teal', hex: '#0B392C' }
        ],
        typography: 'Bold sans-serif for impact; clean sans-serif body copy; green accents for visual interest.',
        layoutNotes: 'Green color provides strong visual identity; structured research frameworks; clear process visualization; professional layout.',
        imagerySubject: 'user research sessions, team collaboration, research insights, professional environments',
        mood: ['approachable', 'professional', 'research-driven', 'credible']
      },
      {
        id: 'fuselab-creative-1',
        file: 'images/fuselab-creative 1.png',
        thumb: 'images/thumbs/fuselab-creative 1.webp',
        display: 'images/display/fuselab-creative 1.webp',
        categoryId: 'illustrated-editorial-blocking',
        title: 'FuseLab Creative — Design & Art Direction',
        descriptor: 'Creative agency with long-form editorial portfolio and hand-drawn visual elements.',
        keywords: [
          'hand-drawn elements',
          'editorial layout',
          'artistic direction',
          'narrative flow',
          'creative expression',
          'color blocking',
          'unique visual voice',
          'crafted aesthetic'
        ],
        colors: [
          { name: 'warm cream', hex: '#F5E8E0' },
          { name: 'soft taupe', hex: '#D9D0C5' }
        ],
        typography: 'Artistic serif or unique display font for headlines; emphasis on visual storytelling over type hierarchy.',
        layoutNotes: 'Long-form editorial narrative; hand-drawn or illustrative elements throughout; color-blocked sections; gallery-like presentation.',
        imagerySubject: 'creative design work, artistic direction, hand-crafted designs, illustrative elements',
        mood: ['creative', 'artistic', 'unique', 'expressive']
      },
      {
        id: 'goinvo-1',
        file: 'images/goinvo 1.png',
        thumb: 'images/thumbs/goinvo 1.webp',
        display: 'images/display/goinvo 1.webp',
        categoryId: 'editorial-consulting-photography',
        title: 'GoInvo — Healthcare Design & Innovation',
        descriptor: 'Healthcare design consultancy with warm orange and teal palette emphasizing human-centered innovation.',
        keywords: [
          'warm orange accent',
          'teal color block',
          'healthcare focus',
          'human-centered design',
          'innovation emphasis',
          'accessible design',
          'patient-focused',
          'medical expertise'
        ],
        colors: [
          { name: 'burnt orange', hex: '#B84A0E' },
          { name: 'teal-cyan', hex: '#157787' },
          { name: 'dark charcoal', hex: '#21242B' },
          { name: 'very dark navy', hex: '#191E25' },
          { name: 'muted teal', hex: '#425F66' },
          { name: 'rust orange', hex: '#BB714A' }
        ],
        typography: 'Bold sans-serif headlines; clean sans-serif body copy; warm orange used for CTAs and emphasis.',
        layoutNotes: 'Warm orange and teal sections create visual rhythm; healthcare expertise demonstrated through detailed case studies.',
        imagerySubject: 'healthcare interface design, medical innovation, patient-focused solutions, professional expertise',
        mood: ['warm', 'approachable', 'professional', 'innovative']
      },
      {
        id: 'guidea-1',
        file: 'images/guidea 1.png',
        thumb: 'images/thumbs/guidea 1.webp',
        display: 'images/display/guidea 1.webp',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'Guidea — Product Design Platform',
        descriptor: 'SaaS platform site with rich purple gradient backgrounds and feature-focused interactive design.',
        keywords: [
          'purple gradient background',
          'SaaS product',
          'interactive features',
          'gradient mesh effects',
          'feature showcase',
          'color-coded sections',
          'premium positioning',
          'modern web design'
        ],
        colors: [
          { name: 'deep purple-black', hex: '#050038' },
          { name: 'vibrant indigo', hex: '#3F53D9' },
          { name: 'periwinkle blue', hex: '#5368D9' },
          { name: 'dark purple', hex: '#1F1B4D' },
          { name: 'very dark purple', hex: '#030036' },
          { name: 'midnight purple', hex: '#000031' }
        ],
        typography: 'Bold sans-serif display headlines; clean sans-serif body; accent colors enhance visual hierarchy.',
        layoutNotes: 'Rich purple gradients create premium feel; feature sections highlighted with color; interactive element showcase.',
        imagerySubject: 'software interface mockups, product features, platform screenshots, design systems',
        mood: ['modern', 'premium', 'technical', 'innovative']
      },
      {
        id: 'huemor-1',
        file: 'images/huemor 1.png',
        thumb: 'images/thumbs/huemor 1.webp',
        display: 'images/display/huemor 1.webp',
        categoryId: 'illustrated-editorial-blocking',
        title: 'Huemor — Creative Design Studio',
        descriptor: 'Design studio with dark aesthetic and artistic color treatment emphasizing creative excellence.',
        keywords: [
          'dark sophisticated palette',
          'artistic color treatment',
          'design studio portfolio',
          'creative excellence',
          'unique visual identity',
          'editorial approach',
          'artistic direction',
          'premium positioning'
        ],
        colors: [
          { name: 'dark purple', hex: '#251C37' },
          { name: 'very dark purple', hex: '#100422' },
          { name: 'muted mauve', hex: '#694B64' },
          { name: 'dark charcoal', hex: '#171222' },
          { name: 'purple dark', hex: '#472147' },
          { name: 'deep purple', hex: '#110823' }
        ],
        typography: 'Artistic serif or unique display type; emphasis on visual design over conventional typography hierarchy.',
        layoutNotes: 'Dark background showcases portfolio work; color treatment used as artistic expression; gallery-like presentation.',
        imagerySubject: 'design studio portfolio, artistic direction, creative work samples, color studies',
        mood: ['artistic', 'sophisticated', 'creative', 'exclusive']
      },
      {
        id: 'make-it-clear-1',
        file: 'images/make-it-clear 1.png',
        thumb: 'images/thumbs/make-it-clear 1.webp',
        display: 'images/display/make-it-clear 1.webp',
        categoryId: 'soft-gradient-ai-editorial',
        title: 'Make It Clear — Communication Design',
        descriptor: 'Communication design agency with bright cyan and dark contrast emphasizing clarity.',
        keywords: [
          'bright cyan accent',
          'dark background',
          'communication focus',
          'clarity emphasis',
          'simple visual language',
          'color-driven design',
          'modern aesthetic',
          'direct messaging'
        ],
        colors: [
          { name: 'warm taupe', hex: '#85786B' },
          { name: 'bright cyan', hex: '#1AE9F2' },
          { name: 'dark cyan-gray', hex: '#11292B' },
          { name: 'dark gray', hex: '#293032' },
          { name: 'light cyan', hex: '#7CE5E3' },
          { name: 'very dark blue', hex: '#071D32' }
        ],
        typography: 'Bold sans-serif headlines; clean sans-serif body; cyan accent for emphasis and CTAs.',
        layoutNotes: 'High-contrast cyan and dark sections; simple visual approach; focus on clear messaging.',
        imagerySubject: 'communication design samples, clarity-focused designs, visual communication examples',
        mood: ['clear', 'modern', 'energetic', 'direct']
      },
      {
        id: 'slide-ux-1',
        file: 'images/slide-ux 1.png',
        thumb: 'images/thumbs/slide-ux 1.webp',
        display: 'images/display/slide-ux 1.webp',
        categoryId: 'editorial-consulting-photography',
        title: 'Slide UX — Presentation Design Specialist',
        descriptor: 'Presentation design specialist with professional dark palette and structured methodology.',
        keywords: [
          'professional dark palette',
          'presentation expertise',
          'slide design focus',
          'structured methodology',
          'business communication',
          'design clarity',
          'communication design',
          'enterprise focus'
        ],
        colors: [
          { name: 'slate gray', hex: '#313A4A' },
          { name: 'medium gray-blue', hex: '#4D535F' },
          { name: 'dark slate', hex: '#2D3646' },
          { name: 'slate dark', hex: '#303949' },
          { name: 'dark gray-blue', hex: '#313A49' },
          { name: 'medium gray', hex: '#444A54' }
        ],
        typography: 'Clean sans-serif throughout; emphasis on hierarchy and readability; professional presentation.',
        layoutNotes: 'Professional layout with clear sections; methodology clearly presented; focus on communication effectiveness.',
        imagerySubject: 'slide design examples, presentation layouts, business communication visuals',
        mood: ['professional', 'structured', 'clear', 'business-focused']
      },
      {
        id: 'ux-cabin-1',
        file: 'images/ux-cabin 1.png',
        thumb: 'images/thumbs/ux-cabin 1.webp',
        display: 'images/display/ux-cabin 1.webp',
        categoryId: 'editorial-consulting-photography',
        title: 'UX Cabin — Product Design Agency',
        descriptor: 'Product design agency with dark sophisticated palette and user experience methodology focus.',
        keywords: [
          'dark color palette',
          'product design focus',
          'UX methodology',
          'user-centered approach',
          'professional services',
          'design process',
          'enterprise focus',
          'credibility positioning'
        ],
        colors: [
          { name: 'very dark teal', hex: '#172C24' },
          { name: 'dark gray', hex: '#30353D' },
          { name: 'muted blue-gray', hex: '#4C515E' },
          { name: 'very dark green', hex: '#122318' },
          { name: 'slate teal', hex: '#173144' },
          { name: 'warm gray-brown', hex: '#A7776D' }
        ],
        typography: 'Bold sans-serif for emphasis; clean sans-serif body; professional visual hierarchy.',
        layoutNotes: 'Dark background with structured sections; UX methodology clearly explained; portfolio work showcased strategically.',
        imagerySubject: 'UX design work, product interface examples, user research, design process documentation',
        mood: ['professional', 'credible', 'user-focused', 'experienced']
      },
      {
        id: 'ux-studio-1',
        file: 'images/ux-studio 1.png',
        thumb: 'images/thumbs/ux-studio 1.webp',
        display: 'images/display/ux-studio 1.webp',
        categoryId: 'illustrated-editorial-blocking',
        title: 'UX Studio — Digital Design Services',
        descriptor: 'UX design studio with sophisticated palette emphasizing user-centered design excellence.',
        keywords: [
          'sophisticated color palette',
          'design studio aesthetic',
          'user-centered approach',
          'design excellence',
          'professional positioning',
          'design process focus',
          'enterprise services',
          'methodology-driven'
        ],
        colors: [
          { name: 'cool gray', hex: '#3E4A4A' },
          { name: 'sage green', hex: '#6DBA98' },
          { name: 'very dark navy', hex: '#11132F' }
        ],
        typography: 'Bold sans-serif display type; clean body copy; emphasis on visual hierarchy.',
        layoutNotes: 'Structured layout with clear sections; design process explained through visual hierarchy; portfolio work highlighted.',
        imagerySubject: 'UX design work, design process documentation, interface examples, case studies',
        mood: ['professional', 'sophisticated', 'methodical', 'credible']
      },
      {
        id: 'wandr-1',
        file: 'images/wandr 1.png',
        thumb: 'images/thumbs/wandr 1.webp',
        display: 'images/display/wandr 1.webp',
        categoryId: 'editorial-consulting-photography',
        title: 'Wandr — Travel & Lifestyle Brand',
        descriptor: 'Modern travel brand with dark palette and editorial photography emphasizing adventure.',
        keywords: [
          'dark sophisticated palette',
          'travel brand aesthetic',
          'adventure photography',
          'editorial storytelling',
          'lifestyle positioning',
          'exploration focus',
          'narrative-driven',
          'aspirational content'
        ],
        colors: [
          { name: 'dark blue-gray', hex: '#32444D' },
          { name: 'dark charcoal', hex: '#282836' },
          { name: 'dark navy blue', hex: '#152037' },
          { name: 'very dark navy', hex: '#0B1022' }
        ],
        typography: 'Serif headlines for editorial feel; clean sans-serif body; emphasis on storytelling.',
        layoutNotes: 'Editorial layout with photography-first approach; narrative storytelling throughout; sophisticated dark aesthetic.',
        imagerySubject: 'travel photography, adventure scenes, lifestyle moments, exploration and discovery',
        mood: ['adventurous', 'sophisticated', 'aspirational', 'editorial']
      }
    ]
  };
});
