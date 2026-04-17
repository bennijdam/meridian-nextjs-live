/**
 * Service catalogue. Each entry powers:
 *   - the bento card on the homepage
 *   - a dedicated /services/[slug] landing page
 *   - structured data for Service schema
 *   - the borough page service grid
 */

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tag: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  priceFrom: string;
  priceUnit: string;
  cadence: string;          // e.g. "monthly retainer", "project"
  primaryKeyword: string;
  secondaryKeywords: string[];
  imageSlug: string;        // matches /public/img/[slug]-[width].avif
  imageAlt: string;
  bullets: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const SERVICES: Service[] = [
  {
    slug: 'seo-london',
    name: 'SEO Agency London',
    shortName: 'SEO Agency London',
    tag: 'SEO + GEO + AEO',
    intro: 'Technical, content and authority — engineered for AI Overviews, ChatGPT citations and the top three Google results.',
    metaTitle: "SEO Agency London | Top-3 Rankings & AI Citations | Meridian",
    metaDescription: "London SEO agency engineering compounding rankings — technical SEO, content, link velocity, plus GEO/AEO for AI Overviews. Free 90-second audit.",
    priceFrom: "£2,500",
    priceUnit: "month",
    cadence: "monthly retainer",
    primaryKeyword: "seo agency london",
    secondaryKeywords: ["seo london", "seo services london", "seo company london", "local seo london", "technical seo london", "b2b seo agency london", "ecommerce seo london"],
    imageSlug: "seo-search-optimisation",
    imageAlt: "SEO agency London — search engine optimisation services",
    bullets: [
      "Full technical SEO audit and remediation: schema, Core Web Vitals, INP, mobile-first indexing",
      "Keyword strategy mapped to commercial intent across hero, mid-tail and borough long-tail",
      "AI Overview & ChatGPT citation engineering (GEO/AEO) — increasingly more valuable than rank-1",
      "Editorial content velocity: 12–24 pieces per quarter, all topically clustered",
      "London-focused link building from authority sources: media, .gov.uk, .ac.uk, .org.uk",
      "Monthly reporting against revenue, leads and rankings — not vanity traffic"
    ],
    faqs: [
      { q: "How long does SEO take to work in London?", a: "For competitive London terms, expect meaningful organic gains in 4–6 months and full ROI by month 9–12. Local and long-tail keywords often produce results in 6–8 weeks." },
      { q: "What's included in your London SEO retainer?", a: "Strategy, technical audit + remediation, content production (4–8 pieces/month), link velocity, schema and AEO/GEO engineering, monthly reporting, fortnightly calls." },
      { q: "Do you guarantee rankings?", a: "No reputable SEO agency does. We guarantee process, transparency and effort — and we publish our average client outcomes (+342% organic traffic in 12 months) as the benchmark." }
    ]
  },
  {
    slug: 'ppc-london',
    name: 'PPC & Paid Media',
    shortName: 'PPC London',
    tag: 'GOOGLE ADS · META · LINKEDIN',
    intro: "London CPCs are punishing. We squeeze every pound of paid media to ROAS targets — Google Ads, Performance Max, Meta, LinkedIn, TikTok.",
    metaTitle: "PPC Agency London | Google Ads & Paid Social ROAS | Meridian",
    metaDescription: "London PPC agency for Google Ads, Performance Max, Meta, LinkedIn, TikTok. Engineered for ROAS in London's most expensive auction landscape. Live in 7 days.",
    priceFrom: "£1,800",
    priceUnit: "month",
    cadence: "monthly management fee + ad spend",
    primaryKeyword: "ppc agency london",
    secondaryKeywords: ["google ads agency london", "google ads management london", "ppc management london", "facebook ads agency london", "amazon ppc agency london", "b2b ppc agency london"],
    imageSlug: "digital-marketing-team",
    imageAlt: "PPC agency London — Google Ads management",
    bullets: [
      "Google Ads (Search, Performance Max, Shopping, Demand Gen, YouTube)",
      "Meta (Facebook + Instagram), TikTok, LinkedIn, X — paid social mix calibrated to your funnel",
      "Account architecture rebuilt from scratch where needed — the #1 lever in London markets",
      "Conversion API + Enhanced Conversions setup, GA4 + GTM, server-side tracking",
      "Landing-page CRO sprints — usually higher leverage than bid optimisation",
      "Weekly reporting against CPL, CAC and ROAS, not impressions"
    ],
    faqs: [
      { q: "How much should I spend on Google Ads in London?", a: "Minimum viable budgets in London are higher than the national average. £4,000/month is a realistic floor for hero-term competition; below that, restrict to long-tail and exact match." },
      { q: "Do you require long contracts?", a: "No. Our standard term is 90 days then month-to-month. We earn your retention each month." },
      { q: "Can I see the ad accounts?", a: "Yes. All ad accounts are owned by you. You retain full administrator access and the work product if we ever part ways." }
    ]
  },
  {
    slug: 'web-design-london',
    name: 'Web Design London',
    shortName: 'Web Design',
    tag: 'DESIGN + DEV',
    intro: "Lightning-fast, conversion-engineered websites in Next.js, Webflow, Shopify or WordPress. Engineered for Core Web Vitals from day one.",
    metaTitle: "Web Design London | Next.js, Webflow, Shopify | Meridian",
    metaDescription: "Award-winning web design London — Next.js, Webflow, Shopify, WordPress. Conversion-engineered, Core-Web-Vitals-perfect, AI-search-ready. Free site audit.",
    priceFrom: "£8,500",
    priceUnit: "project",
    cadence: "fixed-price project",
    primaryKeyword: "web design london",
    secondaryKeywords: ["web designer london", "website design london", "shopify web design london", "webflow designer london", "ux design agency london", "ecommerce web design london"],
    imageSlug: "ux-ui-design",
    imageAlt: "Web design London — UI UX agency services",
    bullets: [
      "Next.js, Webflow, Shopify or WordPress — chosen on the merits, not what we like to build in",
      "Performance budget enforced from day one: <2.5s LCP, <200ms INP, <0.1 CLS",
      "Conversion-engineered: scroll mapping, heatmaps, A/B testing through to launch",
      "Schema.org structured data baked in — Service, FAQPage, BreadcrumbList, Product, Review",
      "AVIF + WebP responsive images via picture/srcset — 90%+ payload reduction",
      "Hand-off training and a 30-day post-launch support window included"
    ],
    faqs: [
      { q: "How much does a website cost in London?", a: "Brochure sites £8,500–£15k. Lead-gen sites £15–£35k. E-commerce £25–£75k. Bespoke platform builds £50k+. We publish project bands transparently." },
      { q: "Which platform do you recommend?", a: "Marketing site for an SME: Webflow or Next.js. E-commerce: Shopify (most cases) or Shopify Plus (>£5m revenue). Content-heavy: WordPress headless. We help you pick." },
      { q: "How long does a project take?", a: "Brochure 4–6 weeks. Lead-gen 6–10 weeks. E-commerce 8–14 weeks. We move faster than most agencies because we run weekly sprints." }
    ]
  },
  {
    slug: 'app-development-london',
    name: 'App Development',
    shortName: 'App Development',
    tag: 'iOS · ANDROID · WEB',
    intro: "Native and cross-platform apps for London startups and scale-ups. MVP in 12 weeks. Flutter, React Native, Swift, Kotlin.",
    metaTitle: "App Development London | iOS, Android, Flutter | Meridian",
    metaDescription: "London app developers — native iOS, Android, Flutter, React Native. From MVP to scale. Trusted by London fintech, healthtech and SaaS scale-ups.",
    priceFrom: "£25,000",
    priceUnit: "project",
    cadence: "fixed-scope project or month-to-month team",
    primaryKeyword: "app developer london",
    secondaryKeywords: ["app development london", "app development company london", "mobile app developer london", "ios app developer london", "android app developer london", "flutter developer london", "react native developer london", "mvp development london", "ai app developer london"],
    imageSlug: "web-hosting-domain",
    imageAlt: "App development London — iOS Android Flutter developers",
    bullets: [
      "MVP in 12 weeks: discovery, design, build, beta, launch — no 6-month strategy phases",
      "Native (Swift, Kotlin) when performance demands it; Flutter or React Native for cross-platform speed",
      "Cloud-native backend: AWS, GCP, Azure or serverless — chosen on cost and load profile",
      "Compliance-first for fintech (FCA, PCI-DSS) and healthcare (NHS DSP, ISO 27001)",
      "App Store + Play Store submission, ASO setup, analytics + crash reporting",
      "Post-launch retainer for ongoing iteration, A/B testing and feature delivery"
    ],
    faqs: [
      { q: "How much does an app cost in London?", a: "MVP: £25–£60k. Production app: £60–£150k. Complex platform (marketplace, fintech, healthtech): £150k+. We provide fixed-scope quotes after a paid 1-week discovery." },
      { q: "Native or cross-platform?", a: "Native (Swift/Kotlin) when you need 60fps performance, deep platform APIs or AR/ML. Cross-platform (Flutter/React Native) when speed and budget matter more than the last 5% of polish." },
      { q: "Do you build AI-powered apps?", a: "Yes. We work with OpenAI, Anthropic, Google and self-hosted open-source models. Our AI app development practice has shipped fintech, healthcare and consumer products in 2025–2026." }
    ]
  },
  {
    slug: 'social-media-london',
    name: 'Social Media',
    shortName: 'Social Media',
    tag: 'IG · TIKTOK · LINKEDIN',
    intro: "Strategy, content, community, paid social. Instagram, TikTok, LinkedIn ghostwriting, UGC, influencer partnerships.",
    metaTitle: "Social Media Agency London | Instagram, TikTok, LinkedIn | Meridian",
    metaDescription: "London social media agency for Instagram, TikTok, LinkedIn. Content, community, paid social, UGC, influencer. Engineered for measurable engagement.",
    priceFrom: "£2,500",
    priceUnit: "month",
    cadence: "monthly retainer",
    primaryKeyword: "social media agency london",
    secondaryKeywords: ["social media management london", "social media manager london", "tiktok agency london", "instagram marketing agency london", "linkedin lead generation london", "ugc agency london", "influencer marketing agency london"],
    imageSlug: "social-media-management",
    imageAlt: "Social media agency London — Instagram TikTok management",
    bullets: [
      "Channel strategy mapped to your funnel: awareness, consideration, conversion, retention",
      "In-house content production: photography, video, motion, copy",
      "Paid social: Meta, TikTok, LinkedIn, Pinterest, X — calibrated to ROAS targets",
      "LinkedIn ghostwriting for founders and executives — high-leverage in B2B",
      "Influencer + UGC programmes from micro to macro, with proper brief and measurement",
      "Community management with quick response SLAs"
    ],
    faqs: [
      { q: "Which platforms should my brand be on?", a: "Depends on audience and resources. We recommend 1–2 platforms done excellently over 5 done badly. Most B2B: LinkedIn + selective YouTube. Most consumer: Instagram + TikTok." },
      { q: "Do you produce content yourselves?", a: "Yes. We have in-house photography, video and motion production. We don't sub it out to junior creators." },
      { q: "What about influencer marketing?", a: "We run end-to-end influencer programmes — sourcing, briefing, contracts, content approval, paid amplification, measurement. Micro to macro. Always with proper FTC/ASA disclosure." }
    ]
  },
  {
    slug: 'branding-london',
    name: 'Branding & Identity',
    shortName: 'Branding',
    tag: 'IDENTITY · STRATEGY · NAMING',
    intro: "For founders building category-defining brands. From naming through to full visual systems and brand guidelines.",
    metaTitle: "Branding Agency London | Identity, Strategy, Naming | Meridian",
    metaDescription: "London branding agency for category-defining brands. Brand strategy, identity, naming, visual systems. From scale-ups to enterprise rebrands.",
    priceFrom: "£8,500",
    priceUnit: "project",
    cadence: "4–8 week sprint",
    primaryKeyword: "branding agency london",
    secondaryKeywords: ["brand agency london", "logo design london", "graphic design london", "brand identity agency london", "brand strategy agency london", "rebranding agency london", "packaging design london"],
    imageSlug: "branding-strategy",
    imageAlt: "Branding agency London — logo identity design strategy",
    bullets: [
      "Brand strategy: positioning, audience, narrative, tone of voice, naming",
      "Visual identity: logo, type, colour, motion, photography, illustration",
      "Comprehensive brand guidelines for in-house teams to use",
      "Asset libraries for marketing, sales, product, HR",
      "Naming, trademark search support, domain advisory",
      "Refresh and full rebrand programmes for established London businesses"
    ],
    faqs: [
      { q: "How much does branding cost in London?", a: "Naming + identity sprint: £8,500–£15k. Full strategy + identity + guidelines: £15–£35k. Enterprise rebrand: £35–£100k+. Quoted per project after a discovery." },
      { q: "How long does it take?", a: "4–8 weeks for most projects. Enterprise rebrands run 12–20 weeks because of stakeholder process." },
      { q: "Do you do logo only?", a: "Rarely. A logo without strategy is just a sticker. We'll do it but we'll always recommend the strategy first." }
    ]
  },
  {
    slug: 'business-plan-london',
    name: 'Business Plans & Pitch Decks',
    shortName: 'Business Plans',
    tag: 'VISA · INVESTOR · BANK',
    intro: "Innovator Founder visa business plans, investor pitch decks, financial models. Endorsing-body approved, investor-ready.",
    metaTitle: "Business Plan Writer London | Innovator Visa, Investor Decks | Meridian",
    metaDescription: "London business plan writers for Innovator Founder visa, investor decks, bank loans. Endorsing-body approved. 10-day turnaround. From £1,800.",
    priceFrom: "£1,800",
    priceUnit: "project",
    cadence: "fixed-price project",
    primaryKeyword: "business plan writer london",
    secondaryKeywords: ["business plan london", "business plan writers london", "business plan writing services london", "innovator founder visa business plan", "innovator visa business plan writer", "pitch deck designer london", "pitch deck consultant london", "startup consultant london"],
    imageSlug: "branding-strategy",
    imageAlt: "Business plan writer London — Innovator visa pitch deck",
    bullets: [
      "Innovator Founder visa business plans — endorsing-body criteria mapped (innovation, viability, scalability)",
      "Start-up visa, Sole Representative visa, Entrepreneur visa plans",
      "Investor-ready pitch decks — narrative, market, financials, ask",
      "Financial models: 3-statement, scenario analysis, fundraising scenarios",
      "Bank loan and grant application writing",
      "Standard turnaround: 10 working days for most plans"
    ],
    faqs: [
      { q: "Will the plan be approved by an endorsing body?", a: "We've written plans approved by all major Innovator Founder visa endorsing bodies. We map criteria explicitly and revise until approved." },
      { q: "How much does a business plan cost?", a: "Innovator Founder visa: from £2,500. Investor deck: from £1,800. Financial model: from £1,500. Bundle pricing available." },
      { q: "Do you sign NDAs?", a: "Yes. NDAs are signed before any discovery. We work with regulated industries and treat confidentiality as non-negotiable." }
    ]
  },

  // ===== NEW SERVICE VERTICALS (April 2026) =====

  {
    slug: 'copywriting-london',
    name: 'Copywriting & Content Marketing',
    shortName: 'Copywriting',
    tag: 'CONTENT · COPY · AEO',
    intro: "SEO-engineered content, website copy, thought leadership, and AI-citation-optimised articles. Written by specialists, not generalists.",
    metaTitle: "Copywriting Agency London | SEO Content & B2B Copy | Meridian",
    metaDescription: "London copywriting agency for SEO content, website copy, B2B thought leadership, LinkedIn ghostwriting. AEO-optimised to earn AI citations. From £1,290/mo.",
    priceFrom: "£1,290",
    priceUnit: "month",
    cadence: "monthly retainer",
    primaryKeyword: "copywriter london",
    secondaryKeywords: ["copywriting agency london", "copywriting services london", "freelance copywriter london", "seo copywriter london", "website copywriter london", "b2b copywriter london", "content marketing agency london", "content writing services london", "blog writing services london", "ghost writer london", "linkedin ghostwriter london"],
    imageSlug: "branding-strategy",
    imageAlt: "Copywriting agency London — content marketing services",
    bullets: [
      "SEO-engineered long-form articles: 2,000+ words, topically clustered, keyword-mapped",
      "Website copy: homepage, service pages, landing pages — conversion-focused",
      "B2B thought leadership and LinkedIn ghostwriting for founders and executives",
      "AI citation engineering — content structured to be quoted by Google AI Overviews and ChatGPT",
      "Email sequences, case studies, whitepapers, sales enablement",
      "Distribution-ready: newsletter cuts, social snippets, repurposed formats"
    ],
    faqs: [
      { q: "How much does copywriting cost in London?", a: "Retainers from £1,290/month for 6 long-form pieces. One-off website copy projects from £2,500. LinkedIn ghostwriting from £490/month. All priced 40% below London market average." },
      { q: "Do you write for specific industries?", a: "Yes. We have deep experience in fintech, SaaS, healthtech, professional services, and property. Industry knowledge matters — generic content doesn't rank or convert." },
      { q: "How is your content optimised for AI search?", a: "Every piece leads with the answer in the first 50 words, uses structured markup (FAQPage, HowTo, Article schema), cites primary sources, and is date-stamped. This is the formula for earning AI Overview citations." }
    ]
  },
  {
    slug: 'email-marketing-london',
    name: 'Email Marketing & CRM',
    shortName: 'Email Marketing',
    tag: 'KLAVIYO · HUBSPOT · AUTOMATION',
    intro: "Email flows, CRM implementation, marketing automation, lifecycle campaigns. Klaviyo, HubSpot, Salesforce — chosen on the merits.",
    metaTitle: "Email Marketing Agency London | Klaviyo, HubSpot, CRM | Meridian",
    metaDescription: "London email marketing agency for Klaviyo, HubSpot, Salesforce. Email flows, CRM setup, marketing automation, lifecycle campaigns. From £990/mo.",
    priceFrom: "£990",
    priceUnit: "month",
    cadence: "monthly retainer",
    primaryKeyword: "email marketing agency london",
    secondaryKeywords: ["email marketing london", "klaviyo agency london", "klaviyo expert london", "hubspot agency london", "hubspot consultant london", "salesforce consultant london", "marketing automation agency london", "crm consultant london", "retention marketing agency london", "lifecycle marketing agency london"],
    imageSlug: "digital-marketing-team",
    imageAlt: "Email marketing agency London — Klaviyo HubSpot automation",
    bullets: [
      "Klaviyo, HubSpot, Salesforce Marketing Cloud, Mailchimp — platform-agnostic expertise",
      "Welcome, abandoned cart, post-purchase, win-back, sunset flows built from scratch",
      "CRM migration and implementation: data mapping, segmentation, custom properties",
      "Lifecycle campaign strategy: acquisition → onboarding → activation → retention → reactivation",
      "A/B testing on subject lines, send times, content blocks — 20%+ open-rate improvements",
      "Revenue attribution: every email tied to conversions, not just opens and clicks"
    ],
    faqs: [
      { q: "Which email platform should I use?", a: "For e-commerce (Shopify/WooCommerce): Klaviyo. For B2B SaaS or professional services: HubSpot. For enterprise: Salesforce Marketing Cloud. We help you pick and migrate." },
      { q: "How much does email marketing cost in London?", a: "Retainers from £990/month including strategy, flow builds, campaign sends, and reporting. One-off CRM setup projects from £2,500. All priced 40% below London market average." },
      { q: "Can you migrate our existing email platform?", a: "Yes. We've migrated clients from Mailchimp to Klaviyo, Salesforce to HubSpot, and vice versa. Full data mapping, list cleaning, flow rebuilds, and warm-up included." }
    ]
  },
  {
    slug: 'video-production-london',
    name: 'Video Production & Animation',
    shortName: 'Video Production',
    tag: 'VIDEO · MOTION · ANIMATION',
    intro: "Corporate video, explainer animations, social content, event coverage, podcast production. In-house London studio, no sub-contracting.",
    metaTitle: "Video Production London | Corporate, Animation, Explainer | Meridian",
    metaDescription: "London video production company for corporate video, explainer animations, social content, podcasts. In-house studio. From £1,500/project.",
    priceFrom: "£1,500",
    priceUnit: "project",
    cadence: "per-project or monthly retainer",
    primaryKeyword: "video production london",
    secondaryKeywords: ["video production company london", "video production agency london", "corporate video production london", "animation studio london", "animation agency london", "explainer video london", "motion graphics london", "event videographer london", "corporate videographer london", "podcast production london", "youtube video production london", "video marketing agency london"],
    imageSlug: "social-media-management",
    imageAlt: "Video production London — corporate video animation studio",
    bullets: [
      "Corporate video: brand films, culture pieces, testimonials, recruitment, investor updates",
      "Explainer videos and product demos: 2D motion graphics, 3D, live-action hybrid",
      "Social-first short-form: TikTok, Reels, Shorts — optimised for each platform's algorithm",
      "Event coverage: conferences, product launches, roundtables, panel discussions",
      "Podcast production: filming, editing, audiogram clips, distribution setup",
      "Full post-production: colour grading, sound design, subtitles, multi-format delivery"
    ],
    faqs: [
      { q: "How much does video production cost in London?", a: "Social content from £1,500/project. Corporate video from £3,500. Explainer animation from £2,500. Full brand film from £8,000. Monthly retainers from £2,490 for ongoing content." },
      { q: "Do you have an in-house studio?", a: "Yes. Central London studio with lighting rigs, green screen, podcast setup, and editing suites. We also shoot on location across London and the UK." },
      { q: "How long does a video project take?", a: "Social content: 1–2 weeks. Explainer animation: 3–4 weeks. Corporate brand film: 4–6 weeks. Podcast setup: 1 week. Ongoing retainers deliver content weekly." }
    ]
  },
  {
    slug: 'ecommerce-london',
    name: 'eCommerce Development',
    shortName: 'eCommerce',
    tag: 'SHOPIFY · WOOCOMMERCE · HEADLESS',
    intro: "Shopify, Shopify Plus, WooCommerce, headless commerce. Revenue-engineered stores with conversion-optimised checkout and enterprise scalability.",
    metaTitle: "eCommerce Agency London | Shopify, WooCommerce, Headless | Meridian",
    metaDescription: "London eCommerce agency for Shopify, Shopify Plus, WooCommerce, headless commerce. Conversion-engineered stores. From £4,990. Free audit.",
    priceFrom: "£4,990",
    priceUnit: "project",
    cadence: "fixed-price project or growth retainer",
    primaryKeyword: "ecommerce agency london",
    secondaryKeywords: ["ecommerce web design london", "shopify agency london", "shopify developer london", "shopify expert london", "shopify plus agency london", "woocommerce developer london", "magento developer london", "ecommerce consultant london", "ecommerce seo agency london", "amazon agency london", "headless commerce agency london", "online store builder london"],
    imageSlug: "ux-ui-design",
    imageAlt: "eCommerce agency London — Shopify WooCommerce development",
    bullets: [
      "Shopify and Shopify Plus: custom themes, app integrations, checkout extensibility, Markets",
      "WooCommerce: for WordPress-native brands needing flexibility and ownership",
      "Headless commerce: Shopify Hydrogen, Medusa, Saleor — for brands needing blazing speed",
      "Conversion rate optimisation: checkout flow, upsells, abandoned cart recovery, A/B testing",
      "eCommerce SEO: product schema, collection architecture, faceted nav handling, site speed",
      "Amazon integration: FBA, Seller Central optimisation, A+ content, PPC"
    ],
    faqs: [
      { q: "How much does an eCommerce website cost in London?", a: "Shopify starter store: £4,990. Custom Shopify theme: £8,500–£15,000. Shopify Plus build: £25,000+. WooCommerce: £6,000–£20,000. Headless commerce: £15,000+. All priced 40% below London market average." },
      { q: "Shopify or WooCommerce?", a: "Shopify for most e-commerce businesses — it's faster to launch, easier to maintain, and handles payments out of the box. WooCommerce if you're already on WordPress and need maximum flexibility. Shopify Plus for brands doing £5m+ revenue." },
      { q: "Do you do eCommerce SEO?", a: "Yes. Product schema markup, collection page architecture, faceted navigation handling, site speed optimisation, and content strategy. eCommerce SEO is a specialism — generic SEO agencies often break more than they fix." }
    ]
  },
];

export const PRIMARY_SERVICES = SERVICES.slice(0, 5);
export const ALL_SERVICE_SLUGS = SERVICES.map(s => s.slug);

export function getService(slug: string): Service | undefined {
  return SERVICES.find(s => s.slug === slug);
}
