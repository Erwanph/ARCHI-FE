/*
 * English source copy. Every other language mirrors this shape exactly —
 * TypeScript fails the build if a key is missing or extra.
 * Brand rule: state only what is known; never add claims, stock, prices,
 * certifications or markets that are not verified.
 */
const en = {
  meta: {
    siteTitle: 'ARCHI — Indonesian Origins, Global Connections',
    siteDescription:
      'ARCHI connects Indonesian origins with global market opportunities through clear sourcing, considered representation, and dependable coordination.',
    pages: {
      origins: {
        title: 'Our Origins',
        description:
          'The thinking behind ARCHI: an Indonesia-rooted brand shaped by the archipelago, respectful representation, and clear global connections.',
      },
      products: {
        title: 'Products',
        description:
          'Explore ARCHI sourcing categories from Indonesia. Product details, specifications, documents, and availability are confirmed per opportunity.',
      },
      sourcing: {
        title: 'Sourcing',
        description:
          'How ARCHI discovers, structures, connects, and coordinates Indonesian-origin sourcing opportunities.',
      },
      about: {
        title: 'Company Profile',
        description:
          'Meet ARCHI, an Indonesia-rooted sourcing and trading brand connecting Indonesian origins with global market opportunities.',
      },
      contact: {
        title: 'Contact',
        description: 'Send ARCHI a product sourcing, supply partnership, or strategic partner inquiry.',
      },
      privacy: {
        title: 'Privacy',
        description: 'How ARCHI handles information submitted through this website.',
      },
      notFound: { title: 'Page not found' },
    },
  },

  common: {
    skipToContent: 'Skip to content',
    sendInquiry: 'Send an inquiry',
    startInquiry: 'Start an inquiry',
    openNavigation: 'Open navigation',
    closeNavigation: 'Close navigation',
    primaryNavigation: 'Primary navigation',
    mobileNavigation: 'Mobile navigation',
    homeLabel: 'ARCHI home',
    tagline: 'Indonesian origins, global connections.',
    viewDataSheet: 'View data sheet',
    inquire: 'Inquire',
    allProducts: 'All products',
    exploreProducts: 'Explore products',
    readMore: 'Read more',
    back: 'Back',
  },

  nav: {
    home: 'Home',
    origins: 'Origins',
    products: 'Products',
    sourcing: 'Sourcing',
    company: 'Company',
    contact: 'Contact',
  },

  language: {
    label: 'Language',
    choose: 'Choose a language',
    current: 'Current language',
  },

  status: {
    verified: { label: 'Verified', description: 'Confirmed against current evidence.' },
    onRequest: { label: 'Available on request', description: 'Shared for a qualified, specific requirement.' },
    pending: { label: 'Pending supplier confirmation', description: 'Being confirmed with the relevant supplier.' },
    unpublished: { label: 'Not currently published', description: 'Intentionally withheld until it can be verified.' },
  },

  categories: {
    all: 'All categories',
    essentialOils: 'Essential oils',
    botanicals: 'Botanical ingredients',
  },

  productsData: {
    'indonesian-patchouli-oil': {
      name: 'Indonesian Patchouli Oil',
      shortName: 'Patchouli Oil',
      origin: 'Indonesia — regional origin confirmed per offer',
      description:
        'A sourcing category for buyers seeking Indonesian patchouli oil with clearly presented origin, specification, and commercial terms.',
      imageAlt: 'Green foliage photographed in natural light',
      imageCredit: 'Editorial category image · Lallaoke / Unsplash',
      verificationSummary:
        'Published information is category-level only. Supplier, lot, specification, and evidence are qualified against each opportunity.',
      information: [
        {
          label: 'Regional origin',
          note: 'Confirmed against the relevant supplier and offer before presentation.',
        },
        {
          label: 'Specification and grade',
          note: 'Matched to the buyer requirement and presented only when current.',
        },
        {
          label: 'Packaging, MOQ and lead time',
          note: 'Commercial parameters are reviewed for the relevant offer.',
        },
      ],
      documentation: [
        {
          label: 'Product and quality documents',
          note: 'Available documents are listed after supplier and lot verification.',
        },
      ],
    },
    'indonesian-kratom': {
      name: 'Indonesian Kratom',
      shortName: 'Kratom',
      origin: 'Indonesia — regional origin confirmed per offer',
      description:
        'A sourcing category for Indonesian kratom opportunities, with origin, format, quality information, and destination requirements reviewed before presentation.',
      imageAlt: 'Illustrative green botanical leaves arranged on a woven tray',
      imageCredit: 'AI-generated category image · visual reference only',
      verificationSummary:
        'Regional origin, supplier, format, lot, quality evidence, and destination eligibility require current verification for each opportunity.',
      information: [
        {
          label: 'Regional origin and supplier context',
          note: 'Confirmed against the relevant supplier and offer before presentation.',
        },
        {
          label: 'Format and quality parameters',
          note: 'Reviewed against the buyer brief and current supplier evidence.',
        },
        {
          label: 'Destination eligibility and commercial terms',
          note: 'Reviewed for the destination market and confirmed offer before discussion.',
        },
      ],
      documentation: [
        {
          label: 'Product, quality and destination documents',
          note: 'Document requirements and availability are reviewed per offer and destination.',
        },
      ],
    },
  },

  header: {
    readingProgress: 'Reading progress',
  },

  footer: {
    blurb:
      'An Indonesia-rooted sourcing and trading brand connecting origin, product, and opportunity through clear business communication.',
    portfolio: 'Portfolio',
    company: 'Company',
    beginConversation: 'Begin a conversation',
    allCategories: 'All categories',
    originsLink: 'Our Origins',
    sourcingLink: 'Sourcing process',
    profileLink: 'Company profile',
    privacyLink: 'Privacy',
    buyerInquiry: 'Buyer inquiry',
    supplierIntroduction: 'Supplier introduction',
    strategicPartnership: 'Strategic partnership',
    taglineLong: 'Connecting Indonesian Origins to Global Market',
    location: 'Indonesia — Global',
  },

  intro: {
    loading: 'Loading ARCHI',
  },

  whatsapp: {
    label: 'WhatsApp',
    ariaLabel: 'Chat with ARCHI on WhatsApp',
    prefill: 'Hello ARCHI, I would like to ask about sourcing from Indonesia.',
  },

  nusa: {
    name: 'Nusa',
    role: 'ARCHI concierge',
    open: 'Chat with Nusa',
    close: 'Close chat',
    minimize: 'Minimise',
    teaser: 'Hi, I’m Nusa. Ask me anything about sourcing with ARCHI.',
    dismissTeaser: 'Dismiss',
    greeting:
      'Hello, I’m Nusa — ARCHI’s concierge. I can explain our products, how sourcing works, and what each information status means. What are you looking for?',
    placeholder: 'Ask about products, sourcing or next steps…',
    send: 'Send',
    thinking: 'Nusa is writing…',
    suggestionsLabel: 'Suggested questions',
    suggestions: [
      'What do you source from Indonesia?',
      'How does the sourcing process work?',
      'What does “pending supplier confirmation” mean?',
      'How do I start an inquiry?',
    ],
    disclaimer: 'Nusa is an AI assistant and can make mistakes. Terms and availability are confirmed by the ARCHI team.',
    handoffTitle: 'Prefer a person?',
    handoffInquiry: 'Send an inquiry',
    handoffWhatsapp: 'WhatsApp',
    error: 'I couldn’t answer just now. Please try again, or send an inquiry and the team will reply.',
    rateLimited: 'You’re sending messages quickly. Please wait a moment and try again.',
    offlineNotice: 'Quick answers mode',
    fallback: {
      products:
        'ARCHI currently presents two Indonesian sourcing categories: patchouli oil (essential oils) and kratom (botanical ingredients). Details such as specification, packaging, MOQ and documents are confirmed per opportunity — you can see each item’s status on the product pages.',
      process:
        'Sourcing runs in four phases — Discover, Structure, Connect and Coordinate — across eleven stages, from requirement review to ongoing communication. The Sourcing page walks through each stage and its outcome.',
      status:
        'Every product detail carries a status: Verified (confirmed against current evidence), Available on request, Pending supplier confirmation, or Not currently published. Nothing is presented as confirmed until it has been checked.',
      inquiry:
        'The quickest way is the inquiry form on the Contact page. Share the product, destination market, indicative volume, timing and any documents your market requires — ARCHI reviews it and replies with what can be confirmed.',
      pricing:
        'Prices, MOQ, capacity and lead times are not published. They are confirmed for a specific requirement after review — send an inquiry with your volume and destination.',
      default:
        'I can help with ARCHI’s product categories, the sourcing process and what each information status means. For anything specific to your requirement, the team will reply to an inquiry.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Indonesian origins, global connections',
      titleLead: 'From Indonesian origins',
      titleAccent: 'to global opportunities.',
      lede: 'An Indonesia-rooted sourcing and trading brand bringing origin, product, and opportunity into one clear conversation.',
      primaryCta: 'Explore products',
      secondaryCta: 'How sourcing works',
      supplierPrompt: 'Supplying from Indonesia?',
      supplierLink: 'Introduce your product',
    },
    planner: {
      title: 'Route preview',
      from: 'Indonesia',
      productQuestion: 'What are you sourcing?',
      destinationQuestion: 'Where does it need to go?',
      products: {
        patchouli: 'Patchouli oil',
        kratom: 'Kratom',
        other: 'Another origin',
      },
      destinations: {
        'east-asia': 'East Asia',
        'south-asia': 'South Asia',
        'middle-east': 'Middle East',
        africa: 'Africa',
        europe: 'Europe',
        americas: 'Americas',
        oceania: 'Oceania',
      },
      note: 'Eligibility, documents and terms are reviewed for every route.',
      cta: 'Start this route',
      autoplay: 'Exploring routes…',
    },
    marquee: ['Heritage', 'Clarity', 'Connection', 'Continuity', 'Origin connected', 'Many origins. One connection.'],
    marqueeLabel: 'Brand principles',
    premise: {
      eyebrow: '01 · The idea behind ARCHI',
      titleLead: 'Many origins.',
      titleAccent: 'One connection.',
      body: 'Named for the archipelago, ARCHI represents the many places, people, and products that shape Indonesia — and the considered connections that help them enter global business conversations with clarity.',
      link: 'Read our origin story',
      mapFrom: 'Indonesian origins',
      mapTo: 'Global market',
      facts: [
        { unit: 'islands', text: 'One archipelago of distinct origins, communities and craft.' },
        { unit: 'phases', text: 'Discover, structure, connect and coordinate every opportunity.' },
        { unit: 'review stages', text: 'From the first requirement to ongoing communication.' },
      ],
    },
    portfolio: {
      eyebrow: '02 · Sourcing portfolio',
      title: 'Products with a sense of place.',
      body: 'Each category shows exactly what is confirmed and what is still being qualified. Specifications, documents and terms are matched to each opportunity.',
      link: 'View the full catalogue',
      notListedEyebrow: 'Not listed?',
      notListedTitle: 'Bring your requirement. We’ll review the origin behind it.',
      notListedLink: 'Describe what you need',
    },
    approach: {
      eyebrow: '03 · The ARCHI approach',
      titleLead: 'From origin',
      titleAccent: 'to opportunity.',
      body: 'A practical framework for turning a sourcing conversation into a clear, coordinated next step.',
      link: 'See all eleven stages',
      outcome: 'Outcome:',
      steps: [
        {
          title: 'Discover',
          text: 'Understand the origin, product category, and the potential supply context behind a requirement.',
          output: 'A clear brief and visible open questions',
        },
        {
          title: 'Structure',
          text: 'Organize specifications, quality information, and presentation materials into one consistent record.',
          output: 'Information you can compare and verify',
        },
        {
          title: 'Connect',
          text: 'Bring relevant buyer requirements and considered offers into the same conversation.',
          output: 'A qualified basis for discussion',
        },
        {
          title: 'Coordinate',
          text: 'Keep communication, status updates, and next steps clear as the opportunity develops.',
          output: 'Accountable, visible next steps',
        },
      ],
    },
    audience: {
      eyebrow: '04 · Who we speak to',
      titleLead: 'One brand.',
      titleAccent: 'Different conversations.',
      body: 'Choose your role to see what ARCHI focuses on and how the first conversation usually begins.',
      tablistLabel: 'Audience',
      who: 'Who',
      whatMatters: 'What matters',
      howWeRespond: 'How ARCHI responds',
      firstSteps: 'First steps',
      tabs: [
        {
          label: 'Global buyers',
          who: 'Importers, distributors and specialty brands',
          need: 'Clarity of product, consistency of information, and dependable communication.',
          approach: 'Structured offers, traceable claims, and professional follow-up.',
          steps: ['Share the product and destination', 'Receive a structured first review', 'Discuss only what is confirmed'],
          cta: 'Start a buyer inquiry',
        },
        {
          label: 'Indonesian partners',
          who: 'Growers, processors and local suppliers',
          need: 'A fair representation of origin and a practical commercial relationship.',
          approach: 'Clear requirements, respectful storytelling, and transparent expectations.',
          steps: ['Introduce your product and origin', 'Align on evidence and documents', 'Meet relevant buyer requirements'],
          cta: 'Introduce your supply',
        },
        {
          label: 'Strategic partners',
          who: 'Logistics, testing and service providers',
          need: 'An understandable brand and efficient coordination.',
          approach: 'Consistent documents, accurate status updates, and aligned standards.',
          steps: ['Define your role and scope', 'Agree on handover points', 'Coordinate with visible status'],
          cta: 'Explore a partnership',
        },
      ],
    },
    information: {
      eyebrow: '05 · Quality & transparency',
      titleLead: 'Information',
      titleAccent: 'before claims.',
      body: 'Every product detail on this site carries a status. You always see what is confirmed, what is shared on request, and what is still being verified — no invented stock, no assumed specifications.',
      explorerHint: 'Choose a status to see it on the sheet.',
      sheetLabel: 'Example data sheet',
      illustrative: 'Illustrative',
      productName: 'Product name',
      rows: [
        { label: 'Origin', note: 'Region / Indonesia' },
        { label: 'Specification', note: 'Measured and confirmed per lot' },
        { label: 'Packaging', note: 'Confirmed options only' },
        { label: 'MOQ / lead time', note: 'Commercial confirmation' },
        { label: 'Documents', note: 'Listed only if available' },
      ],
    },
    closing: {
      eyebrow: 'Begin a conversation',
      titleLead: 'Let’s connect your',
      titleAccent: 'next opportunity.',
      primary: 'Submit a sourcing inquiry',
      secondary: 'Become a supply partner',
    },
  },

  origins: {
    hero: {
      eyebrow: 'Our origins',
      titleLead: 'A brand born from',
      titleAccent: 'the archipelago.',
      lede: 'ARCHI begins with a simple belief: every origin carries context, character, and value. Connecting it well starts with understanding it.',
      caption: 'Many places. Many people. Many products.',
      imageAlt: 'Aerial coastline at Green Bowl Beach, Bali, Indonesia',
      credit: 'Green Bowl Beach, Bali · Nigel Tadyanehondo / Unsplash',
    },
    name: {
      eyebrow: '01 · The name',
      srTitle: 'ARCHI, from archipelago',
      lead: 'ARCHI is derived from “archipelago” — an expression of Indonesia as a country shaped by islands, natural resources, communities, and distinct regional identities.',
      body: 'The name is a reminder that a product is never only a line item. Its origin informs its story, its specification, and the way it should be represented in a new market. The wave in the letter A hints at the currents between islands — and the connections that carry an origin outward.',
    },
    story: {
      eyebrow: '02 · The story',
      titleLead: 'Rooted in Indonesia.',
      titleAccent: 'Connected to the world.',
      lead: 'Indonesia is not one story. It is a chain of islands, resources, skills, and communities that together form a remarkable diversity of origins.',
      body: 'ARCHI was born from a simple idea: potential from many different places can arrive as one coherent brand experience. Through clear language, honest representation, and lasting relationships, ARCHI brings Indonesian origins together with the needs of international markets.',
      narrativeLabel: 'Brand narrative',
      narrative: 'Many origins. One connection.',
    },
    lenses: {
      eyebrow: '03 · Representing origin',
      titleLead: 'Show the origin,',
      titleAccent: 'not the cliché.',
      body: 'When ARCHI represents a product, it looks through four lenses — and only presents what can be shown honestly. Choose one.',
      counter: 'Lens',
      items: [
        {
          title: 'Place',
          text: 'The landscapes, growing regions, and local context a product comes from.',
          detail: 'We start with where something grows and how that place shapes it — before any product is represented.',
          alt: 'Terraced rice fields in Bali, Indonesia',
        },
        {
          title: 'People',
          text: 'The growers, processors, and craft behind it — represented with permission and respect.',
          detail: 'Partners are introduced the way they would introduce themselves: accurately, and only with their consent.',
          alt: '',
        },
        {
          title: 'Product',
          text: 'Honest texture, consistent detail, and specifications stated exactly as they are known.',
          detail: 'What is confirmed is shown as confirmed. What is still open is shown as open — never smoothed over.',
          alt: 'Patchouli foliage in natural light',
        },
        {
          title: 'Exchange',
          text: 'Packing, sourcing, and movement — the practical route from origin to a new market.',
          detail: 'Responsibilities, handover points, and documents are agreed per engagement, not assumed.',
          alt: 'Coastline in the Riau Islands, Indonesia',
        },
      ],
    },
    premise: {
      eyebrow: '04 · The premise',
      srTitle: 'The premise',
      quoteLead: '“Local origins.',
      quoteAccent: 'Global possibilities.”',
      body: 'Every origin has a story, a character, and a value. ARCHI gives that story an identity that travels well — without losing its context.',
      primary: 'Explore the portfolio',
      secondary: 'Company profile',
    },
  },

  products: {
    hero: {
      eyebrow: 'Product portfolio',
      titleLead: 'Indonesian origins,',
      titleAccent: 'presented with clarity.',
      lede: 'Hover a product to bring it forward. Every detail carries a status, so you know what is confirmed before you ask.',
      filterLabel: 'Filter by category',
      confirmed: '{verified} of {total} details confirmed',
      otherTitle: 'Looking for another Indonesian origin?',
      otherText: 'Share the product and destination — new categories are reviewed per requirement.',
    },
    ledger: {
      eyebrow: 'Information ledger',
      titleLead: 'What is known,',
      titleAccent: 'and what is not yet.',
      body: 'Filter by status to see exactly where each category stands.',
      filterLabel: 'Show details that are',
      everything: 'Everything',
      openSheet: 'Open the {name} data sheet',
    },
    availability: {
      eyebrow: 'A note on availability',
      titleLead: 'No invented stock.',
      titleAccent: 'No assumed specifications.',
      body: 'Product availability, grade, packaging, minimum order, lead time, and documentation are confirmed against the current opportunity — never published in advance.',
    },
  },

  productDetail: {
    breadcrumb: 'Breadcrumb',
    products: 'Products',
    confirmed: 'Information confirmed',
    progressLabel: 'Product information verified',
    inquireCta: 'Inquire about this product',
    sheetCta: 'Read the data sheet',
    sheet: {
      eyebrow: 'Product data sheet',
      titleLead: 'Structured around what still needs to be',
      titleAccent: 'qualified.',
      body: 'Details are shown with their current status. Nothing is presented as confirmed until it has been checked against the relevant supplier, lot, and destination.',
    },
    inquiry: {
      eyebrow: 'Sourcing inquiry',
      title: 'Tell us the specification behind your requirement.',
      body: 'The more context you share, the more useful the first review can be. No availability or commercial term is implied until confirmed.',
      steps: [
        { title: 'Review', text: 'We read the requirement and note what is clear and what is still open.' },
        { title: 'Confirm', text: 'Origin, specification, and documents are checked with the relevant supplier.' },
        { title: 'Respond', text: 'You receive what can be confirmed — and the next useful step.' },
      ],
    },
    related: 'Also in the portfolio',
  },

  sourcing: {
    hero: {
      eyebrow: 'Sourcing process',
      titleLead: 'Four phases.',
      titleAccent: 'Eleven clear stages.',
      lede: 'ARCHI brings structure to the early stages of sourcing — understanding the ask, qualifying available information, and coordinating the next useful step.',
    },
    dial: {
      legend: 'Sourcing phases — use the arrow keys to turn the dial',
      seeStages: 'See the stages',
      previous: 'Previous phase',
      next: 'Next phase',
      turning: 'Turning on its own…',
      turn: 'Turn the dial',
      phaseLabel: 'Phase {number}: {name}',
    },
    phase: 'Phase',
    stage: 'Stage {number}',
    stages: 'Stages {start}–{end}',
    outcome: 'Outcome:',
    phases: {
      discover: {
        name: 'Discover',
        summary: 'Understand the ask and the supply context that could answer it.',
        stages: [
          {
            title: 'Requirement review',
            text: 'Clarify the product, destination, intended use, timing, volume, standards, and open questions behind the brief.',
            output: 'A structured requirement and visible information gaps.',
          },
          {
            title: 'Supplier discovery',
            text: 'Identify potentially relevant supply contexts without treating an introduction as qualification.',
            output: 'A focused set of opportunities for initial review.',
          },
        ],
      },
      structure: {
        name: 'Structure',
        summary: 'Turn available evidence into information that can be compared.',
        stages: [
          {
            title: 'Supplier qualification',
            text: 'Review the available identity, capability, origin, quality, and document evidence relevant to the brief.',
            output: 'Known evidence and remaining verification needs.',
          },
          {
            title: 'Specification alignment',
            text: 'Compare the buyer requirement with the information available for a potential product or lot.',
            output: 'A clear record of alignment, exceptions, and open points.',
          },
          {
            title: 'Sample request',
            text: 'Where appropriate, define the sample format, reference, destination, and review expectations.',
            output: 'A sample request tied to the sourcing requirement.',
          },
          {
            title: 'Sample and document review',
            text: 'Coordinate review of available samples, specifications, COAs, tests, or other relevant documents.',
            output: 'Recorded feedback and the next evidence required.',
          },
        ],
      },
      connect: {
        name: 'Connect',
        summary: 'Bring a verified product context and a real requirement together.',
        stages: [
          {
            title: 'Commercial alignment',
            text: 'Bring verified product context together with quantity, packaging, timing, terms, and destination needs.',
            output: 'A qualified basis for commercial discussion.',
          },
        ],
      },
      coordinate: {
        name: 'Coordinate',
        summary: 'Keep responsibilities, documents, and status visible to everyone.',
        stages: [
          {
            title: 'Quality-control coordination',
            text: 'Define any inspection, test, approval, or reporting need before presenting it as part of the scope.',
            output: 'An agreed quality-control requirement when applicable.',
          },
          {
            title: 'Export documentation',
            text: 'Review document needs against the product, shipment structure, and destination market.',
            output: 'A visible document checklist and unresolved requirements.',
          },
          {
            title: 'Logistics coordination',
            text: 'Clarify responsibilities, handover points, timing, and information needed for the agreed movement of goods.',
            output: 'Defined coordination points without assuming an unconfirmed logistics role.',
          },
          {
            title: 'Ongoing communication',
            text: 'Keep decisions, status, evidence, questions, and next actions visible as the opportunity develops.',
            output: 'A clearer conversation from requirement to next step.',
          },
        ],
      },
    },
    commitments: {
      eyebrow: 'What guides the process',
      titleLead: 'Clear. Warm.',
      titleAccent: 'Credible.',
      items: [
        'We state what is known.',
        'We identify what still needs confirmation.',
        'We do not publish unsupported certifications, stock, or commercial claims.',
        'We communicate with respect for both buyer and origin partner.',
        'Scope and responsibility are confirmed per opportunity; no quality-control, export, or logistics service is implied until agreed.',
      ],
    },
    readiness: {
      eyebrow: 'Before you write',
      titleLead: 'How ready is',
      titleAccent: 'your brief?',
      body: 'Tick what you already know. Nothing is required — it simply shows how focused the first review can be.',
      legend: 'How ready is your brief?',
      cta: 'Write your brief',
      items: [
        'I know the product and the grade or format I need',
        'I know the destination market',
        'I have an indicative volume',
        'I have a timeline in mind',
        'I know which documents my market requires',
        'I can share a specification or reference sample',
      ],
      levels: [
        { title: 'A starting point', text: 'That is fine — the first review is where a brief takes shape.' },
        { title: 'A good foundation', text: 'Share what you have; open points will be listed, not assumed.' },
        { title: 'Nearly there', text: 'A focused first review is possible with what you already know.' },
        { title: 'Ready for review', text: 'Your brief covers the essentials. Send it over.' },
      ],
    },
    brief: {
      eyebrow: 'Start with your requirement',
      title: 'Share the brief behind your next sourcing conversation.',
      body: 'Product, destination, timing, indicative volume, and relevant standards help us frame the right first review.',
    },
  },

  about: {
    hero: {
      eyebrow: 'Company profile',
      titleLead: 'Born from the archipelago.',
      titleAccent: 'Built for global trade.',
      lede: 'An Indonesia-rooted sourcing and trading brand for buyers who value clarity.',
      lockupAlt: 'ARCHI — Connecting Indonesian Origins to Global Market',
      glance: [
        { label: 'Name', value: 'ARCHI' },
        { label: 'Source', value: 'Archipelago, Indonesia' },
        { label: 'Identity', value: 'Full wordmark' },
        { label: 'Voice', value: 'Clear, warm, credible' },
      ],
    },
    manifesto:
      'We help Indonesian origins reach global buyers — with clear information, honest representation, and relationships that last.',
    standsFor: {
      eyebrow: '01 · Positioning',
      title: 'What ARCHI stands for',
      body: 'A trading and sourcing identity that brings the story of Indonesian origins into global business conversations — professionally and measurably.',
      cards: [
        { label: 'Essence', value: 'Origin connected.' },
        { label: 'Promise', value: 'A clearer bridge between Indonesian supply and global opportunity.' },
        { label: 'Personality', value: 'Refined, grounded, dependable, and open.' },
        { label: 'Position', value: 'An Indonesia-rooted sourcing and export-facing brand.' },
      ],
    },
    leadership: {
      eyebrow: '02 · Leadership',
      title: 'The people behind ARCHI',
      body: 'ARCHI is founded and led by a small team building the bridge between Indonesian origins and global buyers.',
      linkedin: 'LinkedIn profile of {name}',
      educationLabel: 'Graduate of',
      schoolNote: 'One of Indonesia’s top engineering universities',
      emailLabel: 'Email',
      roles: {
        founder: 'Founder',
        coFounder: 'Co-Founder',
      },
    },
    direction: {
      eyebrow: '03 · Direction',
      title: 'Purpose, vision & mission',
      purposeLabel: 'Purpose',
      purpose: 'Open meaningful connections between the richness of Indonesian origins and global trade opportunities.',
      visionLabel: 'Vision',
      vision: 'Become a trusted connecting identity for introducing Indonesian product sources professionally to international markets.',
      missionLabel: 'Mission · How we work',
      missions: [
        { title: 'Understand origin', text: 'Understand the character of an origin, the product context, and the needs of each partner.' },
        { title: 'Present clearly', text: 'Communicate information that is accurate, well organized, and easy to understand.' },
        { title: 'Build connections', text: 'Create business conversations and relationships that work across markets.' },
      ],
    },
    approach: {
      eyebrow: '04 · The ARCHI approach',
      title: 'From origin to opportunity',
      body: 'The framework of the experience ARCHI is building — not a claim that every service or document is already available. Each scope is confirmed per engagement.',
      link: 'Explore the full sourcing process',
      steps: [
        { title: 'Discover', text: 'Review the origin, product category, and potential supply.' },
        { title: 'Structure', text: 'Organize specifications, quality information, and presentation materials.' },
        { title: 'Connect', text: 'Match buyer requirements with relevant, considered offers.' },
        { title: 'Coordinate', text: 'Keep communication, status updates, and next steps clear.' },
      ],
    },
    pillars: {
      eyebrow: '05 · Our principles',
      titleLead: 'Four pillars',
      titleAccent: 'of the brand.',
      items: [
        { title: 'Heritage', text: 'Respect the distinct origin and the story behind every product.' },
        { title: 'Clarity', text: 'Communicate information simply, precisely, and openly.' },
        { title: 'Connection', text: 'Build relationships that create value for suppliers and destination markets.' },
        { title: 'Continuity', text: 'Keep identity and relationships consistent for the long term.' },
      ],
    },
    focus: {
      eyebrow: '06 · Current focus',
      title: 'Focused categories, presented responsibly.',
    },
    audiences: {
      eyebrow: '07 · Who we speak to',
      title: 'One brand. Different conversations.',
      items: [
        { title: 'Global buyers', who: 'Importers, distributors, specialty brands', text: 'Structured offers, traceable claims, and professional follow-up.' },
        { title: 'Indonesian partners', who: 'Growers, processors, local suppliers', text: 'Clear requirements, respectful storytelling, and transparent expectations.' },
        { title: 'Strategic partners', who: 'Logistics, testing, service providers', text: 'Consistent documents, accurate status updates, and aligned standards.' },
      ],
    },
    trust: {
      eyebrow: '08 · Commercial responsibility',
      titleLead: 'Information',
      titleAccent: 'before claims.',
      body: 'A credible profile is not built on unsupported superlatives. It is built by making known information useful and making open questions visible.',
      points: [
        'Product origin, specification, and supplier evidence are reviewed for the relevant opportunity.',
        'Certifications and supporting documents are listed only when current and available.',
        'Availability, commercial terms, and lead times are confirmed before they are presented as an offer.',
        'Destination eligibility, scope, and responsibilities are clarified for each engagement.',
      ],
      note: 'Formal business details and supporting documents are shared in context and only when verified.',
    },
    close: {
      eyebrow: 'Begin a conversation',
      title: 'Bring the requirement. We’ll help clarify the next step.',
      primary: 'Buyer inquiry',
      secondary: 'Supplier introduction',
    },
  },

  contact: {
    eyebrow: 'Contact ARCHI',
    titleLead: 'Start with a',
    titleAccent: 'clear requirement.',
    lede: 'Tell us what you are looking for, where it needs to go, and what information matters to your decision.',
    checklistTitle: 'Helpful to include',
    checklist: [
      'The product and destination market',
      'A specification or reference, when available',
      'Indicative volume and timing',
      'Documents or standards relevant to your market',
    ],
    nextTitle: 'What happens next',
    next: [
      { title: 'We review', text: 'Your requirement is read in full and open points are noted.' },
      { title: 'We clarify', text: 'If something is missing, we ask before assuming.' },
      { title: 'We respond', text: 'You hear what can be confirmed — and the next useful step.' },
    ],
    sensitiveNote: 'Please do not share passwords, government identifiers, or payment information through this form.',
  },

  form: {
    roleLegend: 'I am contacting ARCHI as',
    roles: {
      buyer: {
        label: 'Buyer or importer',
        detail: 'Sourcing a product',
        placeholder:
          'Product, destination market, intended use, specification or reference, indicative volume, timing, and documents your market requires.',
      },
      supplier: {
        label: 'Indonesian supplier',
        detail: 'Introducing supply',
        placeholder:
          'Product and regional origin, format, current capacity, available quality documents, and the markets you would like to reach.',
      },
      general: {
        label: 'Strategic partner',
        detail: 'Logistics, testing, services',
        placeholder:
          'Your service, where you operate, the role you could play in a sourcing engagement, and how you usually coordinate.',
      },
    },
    aboutYou: 'About you',
    requirement: 'Your requirement',
    fields: {
      name: 'Full name',
      company: 'Company',
      email: 'Business email',
      country: 'Country / market',
      product: 'Product interest',
      productPlaceholder: 'Select a category',
      productOther: 'Other / not listed',
      details: 'Tell us what you need',
    },
    optional: '(optional)',
    charsNeeded: '{count} more characters needed',
    consentLead: 'I agree that ARCHI may use these details to review and respond to this inquiry as described in the',
    privacyPolicy: 'Privacy Policy',
    consentEnd: '.',
    commercialNote: 'Commercial terms and availability are confirmed only after review.',
    submit: 'Send inquiry',
    submitting: 'Sending…',
    errors: {
      name: 'Please enter your full name.',
      company: 'Please enter your company name.',
      email: 'Please enter a valid business email.',
      country: 'Please tell us your country or market.',
      details: 'Please share at least 20 characters about your requirement.',
      consent: 'Please confirm consent so we can review your inquiry.',
      generic: 'The inquiry could not be sent. Please try again.',
      invalid: 'Please check the required inquiry details.',
      rateLimited: 'Too many recent attempts. Please try again later.',
    },
    success: {
      eyebrow: 'Inquiry received',
      title: 'Thank you for starting the conversation.',
      body: 'Your inquiry has been received for review. ARCHI reviews the requirement first, then responds with what can be confirmed and the next useful step.',
      again: 'Send another inquiry',
    },
  },

  privacy: {
    eyebrow: 'Privacy',
    title: 'Information submitted through this website.',
    updated: 'Last updated: 22 October 2026',
    onThisPage: 'On this page',
    sections: [
      {
        id: 'collect',
        title: 'What we collect',
        body: 'The inquiry form collects the contact, company, market, product interest, and requirement information that you choose to provide. Messages sent to Nusa, the website assistant, are processed by third-party AI model providers (through OpenRouter) to generate a reply. Some of these providers may log or use messages to improve their models, so please do not share confidential or personal information in the chat.',
      },
      {
        id: 'use',
        title: 'Why we use it',
        body: 'Submitted information is used to review the inquiry, determine whether ARCHI can support the request, and coordinate a response.',
      },
      {
        id: 'storage',
        title: 'How it is stored',
        body: 'Inquiries are delivered to the ARCHI team by email (through the email service Resend) and, where the deployment has one, also kept in the website’s private database. They are not published through the public catalogue or exposed as a public list.',
      },
      {
        id: 'sharing',
        title: 'Sharing and retention',
        body: 'Information is used only for inquiry review and relevant follow-up. It should be shared only with parties needed to assess or progress the request. Records are retained for that business purpose and any applicable legal obligation, then removed when no longer required.',
      },
      {
        id: 'contact',
        title: 'Contact',
        body: 'To request access, correction, or deletion, use the general inquiry form. Do not submit passwords, government identifiers, payment information, or other sensitive personal data through the form.',
      },
    ],
    contactLink: 'General inquiry form',
  },

  notFound: {
    eyebrow: '404 · Route not found',
    titleLead: 'This route has not reached',
    titleAccent: 'its destination.',
    body: 'Return to the ARCHI story, explore the sourcing portfolio, or begin a new business conversation.',
    home: 'Return home',
    products: 'Explore products',
  },

  error: {
    eyebrow: 'A temporary interruption',
    titleLead: 'We could not complete',
    titleAccent: 'this page request.',
    body: 'No inquiry has been submitted. Try the page again or return to the homepage to continue browsing.',
    retry: 'Try again',
    home: 'Return home',
  },
};

export type Dictionary = typeof en;

export default en;
