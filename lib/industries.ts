/**
 * Industry verticals data layer.
 *
 * Powers programmatic generation of:
 *   - /industries/[industry]                 → 15 hub pages
 *   - /industries/[industry]/[service]       → 15 × 11 = 165 pages
 *   - /industries/[industry]/[borough]       → 15 × 44 = 660 pages
 *
 * Total: ~840 new SEO-optimised pages targeting industry-specific keywords
 * like "fintech seo agency london", "healthcare app developer shoreditch".
 */

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  keywords: string[];
  relatedServices: string[];
  topBoroughs: string[];
  stats: Array<{ num: string; label: string }>;
  intro: string;
  bullets: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: 'fintech', name: 'Fintech & Financial Services', shortName: 'Fintech',
    description: 'Digital marketing, app development, and SEO for London fintech companies.',
    metaTitle: 'Fintech Marketing Agency London | SEO, Apps & Growth | Meridian',
    metaDescription: 'London fintech marketing agency. SEO, app development, PPC, and content for FCA-regulated startups and financial institutions.',
    icon: '💳', keywords: ['fintech marketing agency london', 'fintech app developer london', 'fintech seo london'],
    relatedServices: ['app-development-london', 'seo-london', 'ppc-london', 'web-design-london', 'branding-london', 'copywriting-london'],
    topBoroughs: ['shoreditch', 'canary-wharf', 'kings-cross', 'farringdon', 'tower-hamlets', 'mayfair'],
    stats: [{ num: '40+', label: 'Fintech clients served' }, { num: 'FCA', label: 'Compliance expertise' }, { num: '£2.1B', label: 'Client AUM supported' }, { num: '94%', label: 'Client retention 24mo+' }],
    intro: "London is the world's fintech capital — over 2,500 fintech firms. We help them acquire customers compliantly, build category-defining brands, and ship products that scale.",
    bullets: ['FCA-compliant marketing: financial promotions review, DORA considerations, consumer duty alignment', 'Fintech app development: iOS, Android, Flutter — with PCI-DSS and Open Banking integration', 'SEO for regulated financial services — content that ranks without triggering compliance flags', 'Investor-ready pitch decks and business plans for fintech raises', 'Conversion-engineered landing pages for account sign-up and onboarding flows', 'Paid acquisition on Google, Meta, LinkedIn — targeting HNW and business audiences'],
    faqs: [{ q: 'Do you understand FCA financial promotions rules?', a: 'Yes. All marketing content goes through our FCA compliance checklist.' }, { q: 'Can you build apps with Open Banking integration?', a: 'Yes. We integrate with Plaid, TrueLayer, Yapily, and direct bank APIs.' }, { q: 'What fintech companies have you worked with?', a: 'We work with challenger banks, payment processors, wealthtech platforms, and institutional financial services firms.' }],
  },
  {
    slug: 'healthcare', name: 'Healthcare & Healthtech', shortName: 'Healthcare',
    description: 'Marketing, web design, and app development for London healthcare providers and healthtech startups.',
    metaTitle: 'Healthcare Marketing Agency London | Medical SEO & Apps | Meridian',
    metaDescription: 'London healthcare marketing agency. Medical SEO, healthtech app development, NHS-compliant digital.',
    icon: '🏥', keywords: ['healthcare marketing agency london', 'medical seo london', 'healthcare app developer london'],
    relatedServices: ['seo-london', 'web-design-london', 'app-development-london', 'ppc-london', 'copywriting-london'],
    topBoroughs: ['marylebone', 'kings-cross', 'kensington', 'chelsea', 'hammersmith', 'putney'],
    stats: [{ num: '35+', label: 'Healthcare clients' }, { num: 'NHS DSP', label: 'Toolkit compliant' }, { num: 'ISO 27001', label: 'Information security' }, { num: '4.2x', label: 'Avg patient enquiry uplift' }],
    intro: "London's healthcare sector spans Harley Street private practices to King's Cross healthtech startups. We deliver compliant, conversion-focused digital across the spectrum.",
    bullets: ['Medical SEO: rank for competitive terms while maintaining ASA/CMA compliance on claims', 'Healthtech app development with NHS DSP Toolkit and ISO 27001 compliance', 'Patient acquisition funnels for private practices — Google Ads + landing pages', 'Healthcare content marketing: condition guides, treatment pages, FAQ schema', 'Telehealth and patient portal development', 'GDPR-compliant patient data handling and consent management'],
    faqs: [{ q: 'Do you understand medical advertising regulations?', a: 'Yes. We work within ASA CAP code, CMA guidelines, and GMC Good Medical Practice.' }, { q: 'Can you build NHS-compliant health apps?', a: 'Yes. We develop to NHS DSP Toolkit standards and DTAC compliance.' }, { q: 'Do you work with dental practices?', a: 'Yes. Dental SEO is one of our most active verticals.' }],
  },
  {
    slug: 'saas', name: 'SaaS & Software', shortName: 'SaaS',
    description: 'Growth marketing, product-led SEO, and development for London SaaS companies.',
    metaTitle: 'SaaS Marketing Agency London | PLG, SEO & Growth | Meridian',
    metaDescription: 'London SaaS marketing agency. Product-led growth, SaaS SEO, content marketing for B2B software companies.',
    icon: '☁️', keywords: ['saas marketing agency london', 'saas seo agency london', 'b2b saas marketing london'],
    relatedServices: ['seo-london', 'ppc-london', 'copywriting-london', 'web-design-london', 'app-development-london'],
    topBoroughs: ['shoreditch', 'kings-cross', 'farringdon', 'clerkenwell', 'fitzrovia', 'southwark'],
    stats: [{ num: '55+', label: 'SaaS clients' }, { num: '3.4x', label: 'Avg MRR growth in 12mo' }, { num: '-38%', label: 'Avg CAC reduction' }, { num: '94%', label: 'Client retention 24mo+' }],
    intro: "London's SaaS ecosystem is the largest in Europe. We help B2B software companies reduce CAC, build content moats, and compound organic growth.",
    bullets: ['Product-led SEO: feature pages, comparison pages, alternative pages, integration directories', 'SaaS content marketing: bottom-of-funnel guides that convert, not just top-of-funnel traffic', 'Demand generation: paid search + paid social calibrated to pipeline, not MQLs', 'Website redesign: marketing sites that demo the product and convert visitors to signups', 'LinkedIn thought leadership for founders — ghostwriting + paid amplification', 'RevOps consulting: HubSpot, Salesforce pipeline setup, attribution, lifecycle stages'],
    faqs: [{ q: 'Do you understand SaaS metrics?', a: 'We report against MRR, ARR, CAC, LTV, payback period, and pipeline velocity.' }, { q: 'Can you do product-led growth marketing?', a: 'Yes. We build comparison, alternative, and integration landing pages.' }, { q: 'What SaaS companies have you worked with?', a: 'B2B SaaS from pre-revenue to Series C across fintech, HR tech, dev tools, and enterprise software.' }],
  },
  {
    slug: 'ecommerce', name: 'eCommerce & Retail', shortName: 'eCommerce',
    description: 'eCommerce marketing, Shopify development, and performance advertising for London online retailers.',
    metaTitle: 'eCommerce Marketing Agency London | Shopify, DTC Growth | Meridian',
    metaDescription: 'London eCommerce marketing agency. Shopify, performance ads, email flows, and eCommerce SEO for DTC brands.',
    icon: '🛒', keywords: ['ecommerce marketing agency london', 'shopify marketing london', 'dtc marketing agency london'],
    relatedServices: ['ecommerce-london', 'seo-london', 'ppc-london', 'social-media-london', 'email-marketing-london'],
    topBoroughs: ['shoreditch', 'hackney', 'stratford', 'clapham', 'notting-hill', 'camden'],
    stats: [{ num: '70+', label: 'eCommerce clients' }, { num: '4.2x', label: 'Avg ROAS on paid' }, { num: '+127%', label: 'Avg revenue growth 12mo' }, { num: '35%', label: 'Avg email revenue share' }],
    intro: "London's DTC and e-commerce scene is booming — but so is the cost of acquiring customers. We help online retailers grow profitably.",
    bullets: ['Performance advertising: Google Shopping, Meta, TikTok Shop — optimised for ROAS not clicks', 'Klaviyo email flows: welcome, abandoned cart, post-purchase — typically 25–35% of revenue', 'eCommerce SEO: product schema, collection architecture, content commerce strategy', 'Shopify development: custom themes, checkout extensibility, app integrations', 'Social commerce: TikTok Shop, Instagram Shopping, live shopping integrations', 'Amazon marketplace: FBA, A+ content, Seller Central PPC, brand registry'],
    faqs: [{ q: 'What ROAS should I expect?', a: 'Most of our e-commerce clients achieve 3–6x blended ROAS across Google and Meta.' }, { q: 'Do you do email marketing for e-commerce?', a: 'Yes — it is typically the highest-ROI channel for e-commerce.' }, { q: 'Can you help with Amazon?', a: 'Yes. FBA setup, A+ content, Seller Central PPC management, brand registry, and marketplace SEO.' }],
  },
  {
    slug: 'property', name: 'Property & Real Estate', shortName: 'Property',
    description: 'Digital marketing for London estate agents, property developers, and proptech startups.',
    metaTitle: 'Property Marketing Agency London | Estate Agent SEO & Ads | Meridian',
    metaDescription: 'London property marketing agency. SEO, PPC, and web design for estate agents and developers.',
    icon: '🏗️', keywords: ['property marketing agency london', 'estate agent seo london', 'proptech marketing london'],
    relatedServices: ['seo-london', 'ppc-london', 'web-design-london', 'social-media-london', 'video-production-london'],
    topBoroughs: ['mayfair', 'kensington', 'chelsea', 'canary-wharf', 'richmond', 'wandsworth'],
    stats: [{ num: '30+', label: 'Property clients' }, { num: '280%', label: 'Avg organic traffic uplift' }, { num: '£4.2B', label: 'GDV marketed' }, { num: '2.3x', label: 'Avg lead-to-viewing rate' }],
    intro: "London property is one of the world's most searched real estate markets. We deliver digital that generates viewings, reservations, and qualified leads.",
    bullets: ['Estate agent SEO: postcode pages, street-level content, Google Business Profile dominance', 'New development marketing: CGI-led landing pages, reservation funnels, investor portals', 'Proptech app development and product marketing', 'Property video: drone footage, virtual tours, development fly-throughs', 'Portal integration: Rightmove, Zoopla feed optimisation and PPC', 'Commercial real estate: office, retail, industrial — tenant acquisition campaigns'],
    faqs: [{ q: 'Do you work with estate agents?', a: 'Yes. From independent agents to multi-branch groups.' }, { q: 'Can you market new developments?', a: 'Yes. CGI-led landing pages, reservation funnels, investor portals.' }, { q: 'Do you understand PropTech?', a: 'Yes. Rental platforms, property management tools, CRM providers.' }],
  },
  {
    slug: 'hospitality', name: 'Hospitality & Food', shortName: 'Hospitality',
    description: 'Marketing for London restaurants, hotels, bars, and food brands.',
    metaTitle: 'Hospitality Marketing Agency London | Restaurant & Hotel SEO | Meridian',
    metaDescription: 'London hospitality marketing agency. Restaurant SEO, hotel marketing, social media for F&B brands.',
    icon: '🍽️', keywords: ['hospitality marketing agency london', 'restaurant marketing london', 'hotel marketing agency london'],
    relatedServices: ['seo-london', 'social-media-london', 'web-design-london', 'video-production-london', 'branding-london'],
    topBoroughs: ['soho', 'shoreditch', 'mayfair', 'islington', 'clapham', 'brixton'],
    stats: [{ num: '80+', label: 'F&B clients' }, { num: '3.8x', label: 'Avg reservation uplift' }, { num: '95%', label: 'Google 3-pack success' }, { num: '2.1x', label: 'Social follower growth' }],
    intro: "London is one of the world's great food cities. We drive covers, bookings, and footfall through local SEO, social media, and platform optimisation.",
    bullets: ['Restaurant SEO: Google Business Profile dominance, near me ranking, menu schema', 'Social media: Instagram, TikTok — food photography, video content, influencer partnerships', 'Hotel marketing: OTA optimisation, direct booking campaigns, reputation management', 'Delivery platform optimisation: Deliveroo, UberEats, JustEat listing and ranking', 'Event marketing: launch nights, seasonal menus, private dining campaigns', 'Brand identity: restaurant branding, menu design, signage, packaging for retail'],
    faqs: [{ q: 'Can you help my restaurant rank on Google Maps?', a: 'Yes. Google Business Profile optimisation is our highest-ROI channel for restaurants.' }, { q: 'Do you work with hotels?', a: 'Yes. Direct booking campaigns, reputation management, Google Hotel Ads.' }, { q: 'Do you do food photography?', a: 'Yes — in-house. Food-specific photo and video production.' }],
  },
  {
    slug: 'legal', name: 'Legal & Professional Services', shortName: 'Legal',
    description: 'Marketing for London law firms, barristers chambers, and accountancies.',
    metaTitle: 'Legal Marketing Agency London | Law Firm SEO & PPC | Meridian',
    metaDescription: 'London legal marketing agency. Law firm SEO, solicitor PPC. SRA-compliant digital marketing.',
    icon: '⚖️', keywords: ['legal marketing agency london', 'law firm seo london', 'legal seo london'],
    relatedServices: ['seo-london', 'ppc-london', 'web-design-london', 'copywriting-london', 'branding-london'],
    topBoroughs: ['holborn', 'mayfair', 'canary-wharf', 'farringdon', 'bloomsbury', 'southwark'],
    stats: [{ num: '25+', label: 'Law firm clients' }, { num: 'SRA', label: 'Compliant marketing' }, { num: '+310%', label: 'Avg organic growth' }, { num: '£185', label: 'Avg cost per lead' }],
    intro: "Legal services in London is one of the highest-CPC verticals. We help law firms generate qualified leads while maintaining SRA and BSB compliance.",
    bullets: ['Law firm SEO: practice area pages, location targeting, legal directory citations', 'SRA and BSB-compliant advertising: proper fee information, no misleading claims', 'Google Ads for legal: high-intent keyword targeting with conversion-optimised landing pages', 'Website design for law firms: professional, fast, accessible, schema-rich', 'Thought leadership content: articles, whitepapers, legal guides', 'Reputation management: Google reviews, Chambers, Legal 500, Trustpilot'],
    faqs: [{ q: 'Do you understand SRA advertising rules?', a: 'Yes. All content is reviewed against the SRA Code of Conduct and BSB Handbook.' }, { q: 'What practice areas do you have experience in?', a: 'Commercial, corporate, employment, immigration, personal injury, family, criminal, property, and tax.' }, { q: 'Can you help with legal directories?', a: 'Yes. Chambers, Legal 500, The Lawyer — we optimise your submission narrative.' }],
  },
  {
    slug: 'education', name: 'Education & EdTech', shortName: 'Education',
    description: 'Marketing for London universities, schools, training providers, and edtech startups.',
    metaTitle: 'Education Marketing Agency London | Student Recruitment & EdTech | Meridian',
    metaDescription: 'London education marketing agency. Student recruitment, course marketing, edtech app development.',
    icon: '🎓', keywords: ['education marketing agency london', 'university marketing london', 'edtech marketing london'],
    relatedServices: ['seo-london', 'ppc-london', 'web-design-london', 'social-media-london', 'app-development-london'],
    topBoroughs: ['bloomsbury', 'kings-cross', 'southwark', 'greenwich', 'kingston', 'ealing'],
    stats: [{ num: '20+', label: 'Education clients' }, { num: '+250%', label: 'Avg application uplift' }, { num: '-40%', label: 'Cost per application' }, { num: '3.2x', label: 'Open day attendance' }],
    intro: "London's education sector operates in one of the most competitive student recruitment markets in the world. We deliver digital that fills courses.",
    bullets: ['Student recruitment campaigns: paid search, social, programmatic', 'Course-level SEO: programme pages that rank for specific course + location combinations', 'EdTech app development: LMS platforms, tutoring marketplaces, assessment tools', 'Open day and event marketing: registration funnels, email nurture', 'International student targeting: country-specific campaigns and landing pages', 'Alumni engagement: CRM, email, social community building'],
    faqs: [{ q: 'Do you work with universities?', a: 'Yes. Course-level SEO, student recruitment advertising, international campaigns.' }, { q: 'Can you build edtech platforms?', a: 'Yes. LMS development, tutoring marketplaces, assessment tools.' }, { q: 'Do you understand UCAS cycles?', a: 'Yes. Our campaigns align to UCAS timelines and clearing windows.' }],
  },
  {
    slug: 'startup', name: 'Startups & Scale-ups', shortName: 'Startups',
    description: 'Growth marketing, MVP development, and fundraising support for London startups.',
    metaTitle: 'Startup Marketing Agency London | Growth, MVP & Fundraising | Meridian',
    metaDescription: 'London startup marketing agency. Growth marketing, MVP development, pitch decks. Pre-seed to Series B.',
    icon: '🚀', keywords: ['startup marketing agency london', 'startup consultant london', 'mvp development london'],
    relatedServices: ['app-development-london', 'web-design-london', 'seo-london', 'ppc-london', 'business-plan-london', 'branding-london'],
    topBoroughs: ['shoreditch', 'kings-cross', 'farringdon', 'clerkenwell', 'hackney', 'stratford'],
    stats: [{ num: '100+', label: 'Startups launched' }, { num: '£340M', label: 'Client funding raised' }, { num: '12 wk', label: 'Avg MVP delivery' }, { num: '78%', label: 'Funded post-engagement' }],
    intro: "London produces more unicorns than any European city. We help startups go from idea to traction — MVP in 12 weeks, growth marketing from day one.",
    bullets: ['MVP development: idea to launched product in 12 weeks flat', 'Growth marketing: paid acquisition + organic + product-led growth from launch', 'Pitch decks and business plans for seed, Series A, and Innovator Founder visa', 'Brand identity for startups: positioning, naming, visual identity in a 2-week sprint', 'Fractional CTO/CMO: senior strategic guidance without the full-time cost', 'Accelerator preparation: Y Combinator, Techstars, Seedcamp'],
    faqs: [{ q: 'Can you build an MVP in 12 weeks?', a: 'Yes. Discovery, design, build, test and launch in 12 weeks.' }, { q: 'Do you help with fundraising?', a: 'We write pitch decks, financial models, and business plans.' }, { q: 'What stage startups do you work with?', a: 'Pre-seed through Series B.' }],
  },
  {
    slug: 'professional-services', name: 'Professional Services', shortName: 'Professional Services',
    description: 'Marketing for London consultancies, accountancies, and recruitment firms.',
    metaTitle: 'Professional Services Marketing London | B2B Lead Gen | Meridian',
    metaDescription: 'London professional services marketing agency. Lead generation, SEO, LinkedIn for consultancies and accountancies.',
    icon: '💼', keywords: ['professional services marketing london', 'b2b marketing agency london', 'consultancy marketing london'],
    relatedServices: ['seo-london', 'ppc-london', 'copywriting-london', 'web-design-london', 'social-media-london'],
    topBoroughs: ['mayfair', 'canary-wharf', 'holborn', 'farringdon', 'fitzrovia', 'paddington'],
    stats: [{ num: '45+', label: 'B2B clients' }, { num: '+380%', label: 'Avg lead volume uplift' }, { num: '£92', label: 'Avg cost per qualified lead' }, { num: '18mo', label: 'Avg client relationship' }],
    intro: "London's professional services sector generates high lifetime value per client. We deliver the digital marketing that fills your pipeline.",
    bullets: ['B2B SEO: service pages, location pages, industry pages — targeting commercial-intent keywords', 'LinkedIn marketing: founder ghostwriting, company page management, LinkedIn Ads', 'Lead generation: Google Ads + landing page funnels calibrated to SQL', 'Thought leadership content: whitepapers, research reports, industry guides', 'Website redesign: professional, fast, conversion-optimised', 'CRM implementation: HubSpot, Salesforce — pipeline tracking and attribution'],
    faqs: [{ q: 'How do you generate B2B leads?', a: 'Multi-channel: SEO for long-term pipeline, Google Ads for immediate leads, LinkedIn for awareness.' }, { q: 'Do you do LinkedIn marketing?', a: 'Yes. Founder ghostwriting, company page content, LinkedIn Ads.' }, { q: 'What professional services firms do you work with?', a: 'Management consultancies, accountancy firms, recruitment agencies, architecture practices.' }],
  },
  {
    slug: 'fashion-retail', name: 'Fashion & Retail', shortName: 'Fashion & Retail',
    description: 'Marketing for London fashion brands, retailers, and DTC labels.',
    metaTitle: 'Fashion Marketing Agency London | DTC, Social Commerce | Meridian',
    metaDescription: 'London fashion marketing agency. Social commerce, influencer, eCommerce, and brand building.',
    icon: '👗', keywords: ['fashion marketing agency london', 'retail marketing agency london', 'dtc fashion marketing london'],
    relatedServices: ['social-media-london', 'ecommerce-london', 'branding-london', 'video-production-london', 'email-marketing-london'],
    topBoroughs: ['shoreditch', 'notting-hill', 'chelsea', 'hackney', 'soho', 'camden'],
    stats: [{ num: '40+', label: 'Fashion clients' }, { num: '4.8x', label: 'Avg ROAS on Meta' }, { num: '+215%', label: 'Social engagement growth' }, { num: '32%', label: 'Avg email revenue share' }],
    intro: "London is a global fashion capital. We help fashion and retail brands sell through social commerce, influencer partnerships, and eCommerce optimisation.",
    bullets: ['Social commerce: TikTok Shop, Instagram Shopping, live shopping', 'Influencer partnerships: micro to macro, with proper briefs and ROI measurement', 'Shopify development: lookbook themes, collection architecture, upsell flows', 'Email and SMS: Klaviyo flows for fashion — new arrivals, back-in-stock, VIP access', 'Brand identity: lookbooks, campaigns, packaging, art direction', 'Fashion PR integration: editorial placements that drive backlinks'],
    faqs: [{ q: 'Do you do fashion photography?', a: 'Yes. In-house production for lookbooks, campaign imagery, and social content.' }, { q: 'Which social platforms work best for fashion?', a: 'Instagram and TikTok for awareness. Pinterest for discovery. Email for retention.' }, { q: 'Can you help with DTC launch?', a: 'Yes. Shopify store build, brand identity, launch campaign, and paid social.' }],
  },
  {
    slug: 'food-beverage', name: 'Food & Beverage', shortName: 'Food & Beverage',
    description: 'Marketing for London food brands, FMCG, CPG, and beverage companies.',
    metaTitle: 'Food & Beverage Marketing London | FMCG, CPG, DTC | Meridian',
    metaDescription: 'London food and beverage marketing agency. Social media, eCommerce, and retail launch marketing.',
    icon: '🥤', keywords: ['food and drink marketing london', 'fmcg marketing agency london', 'food brand marketing london'],
    relatedServices: ['social-media-london', 'ecommerce-london', 'branding-london', 'video-production-london', 'web-design-london'],
    topBoroughs: ['shoreditch', 'hackney', 'brixton', 'camden', 'islington', 'clapham'],
    stats: [{ num: '35+', label: 'F&B brand clients' }, { num: '12', label: 'Retail listing launches' }, { num: '3.5x', label: 'Avg DTC ROAS' }, { num: '+180%', label: 'Social growth avg' }],
    intro: "London's food and beverage scene needs marketing that builds awareness and drives both DTC and retail sales.",
    bullets: ['Brand identity: packaging design, naming, brand guidelines', 'Social media: food content production, UGC, influencer seeding', 'DTC eCommerce: Shopify subscription stores, sampling campaigns', 'Retail launch marketing: Ocado, Waitrose, Sainsbury listing support', 'Amazon marketplace: FBA, A+ content, vine reviews', 'Trade marketing: B2B website, sales decks, trade show support'],
    faqs: [{ q: 'Can you help us get into retail?', a: 'We support the marketing side of retail launches — buyer decks, shopper marketing, launch advertising.' }, { q: 'Do you do packaging design?', a: 'Yes. Full brand identity including packaging for shelf and eCommerce.' }, { q: 'What about food photography?', a: 'In-house food photography and video production.' }],
  },
  {
    slug: 'construction', name: 'Construction & Trades', shortName: 'Construction',
    description: 'Marketing for London construction companies, builders, and contractors.',
    metaTitle: 'Construction Marketing London | Builder SEO & Lead Gen | Meridian',
    metaDescription: 'London construction marketing agency. SEO, PPC, and lead generation for builders and contractors.',
    icon: '🔨', keywords: ['construction marketing agency london', 'builder marketing london', 'construction seo london'],
    relatedServices: ['seo-london', 'ppc-london', 'web-design-london', 'social-media-london', 'video-production-london'],
    topBoroughs: ['croydon', 'stratford', 'greenwich', 'hounslow', 'barnet', 'enfield'],
    stats: [{ num: '30+', label: 'Construction clients' }, { num: '5.2x', label: 'Avg lead volume uplift' }, { num: '£38', label: 'Avg cost per lead' }, { num: '92%', label: 'Google 3-pack placement' }],
    intro: "London construction is a £50B+ market. We help builders and contractors generate a steady pipeline of qualified leads.",
    bullets: ['Local SEO: dominate the Google 3-pack for trade + area searches', 'Google Ads: high-intent lead gen for extensions, loft conversions, new builds', 'Website design: project portfolio showcases, trust-building testimonials', 'Google Business Profile optimisation: photos, reviews, posts, Q&A', 'Social media: project timelapse videos, team content', 'Review generation: automated review request sequences'],
    faqs: [{ q: 'How do I get more leads?', a: 'Google Business Profile + local SEO — owning the 3-pack is the highest-ROI channel.' }, { q: 'Do you work with small builders?', a: 'Yes. From sole-trader builders to 50+ employee construction firms.' }, { q: 'What about Checkatrade?', a: 'We optimise your directory profiles but focus on helping you own your leads through your own website.' }],
  },
  {
    slug: 'automotive', name: 'Automotive & Mobility', shortName: 'Automotive',
    description: 'Marketing for London car dealers, automotive brands, and EV companies.',
    metaTitle: 'Automotive Marketing Agency London | Dealer SEO & Ads | Meridian',
    metaDescription: 'London automotive marketing agency. Car dealer SEO, automotive PPC, EV marketing.',
    icon: '🚗', keywords: ['automotive marketing agency london', 'car dealer marketing london', 'ev marketing agency london'],
    relatedServices: ['seo-london', 'ppc-london', 'web-design-london', 'video-production-london', 'social-media-london'],
    topBoroughs: ['mayfair', 'kensington', 'chelsea', 'hounslow', 'croydon', 'barnet'],
    stats: [{ num: '15+', label: 'Automotive clients' }, { num: '+420%', label: 'Avg search visibility' }, { num: '£42', label: 'Avg cost per enquiry' }, { num: '3.1x', label: 'Test drive bookings' }],
    intro: "London's automotive market demands marketing that drives showroom visits, test drive bookings, and qualified enquiries.",
    bullets: ['Dealer SEO: model pages, location pages, near me targeting', 'Google Ads: Vehicle Listing Ads, Search, Performance Max', 'EV and mobility marketing: product launches, sustainability messaging', 'Video production: walkaround videos, launch films', 'Website development: stock integration, finance calculator, booking systems', 'Reputation management: Google reviews, AutoTrader, Trustpilot'],
    faqs: [{ q: 'Do you work with car dealerships?', a: 'Yes. Independent dealers, franchise groups, and supercar specialists.' }, { q: 'Can you market EV brands?', a: 'Yes. EV manufacturers, charging infrastructure, and mobility platforms.' }, { q: 'What about AutoTrader?', a: 'We optimise your AutoTrader presence alongside your own website.' }],
  },
  {
    slug: 'beauty-wellness', name: 'Beauty & Wellness', shortName: 'Beauty & Wellness',
    description: 'Marketing for London beauty brands, salons, spas, gyms, and wellness businesses.',
    metaTitle: 'Beauty Marketing Agency London | Salon SEO & Social | Meridian',
    metaDescription: 'London beauty and wellness marketing agency. Salon SEO, beauty brand social media, gym lead generation.',
    icon: '💅', keywords: ['beauty marketing agency london', 'salon marketing london', 'wellness marketing london'],
    relatedServices: ['social-media-london', 'seo-london', 'web-design-london', 'ecommerce-london', 'video-production-london'],
    topBoroughs: ['chelsea', 'kensington', 'notting-hill', 'clapham', 'shoreditch', 'marylebone'],
    stats: [{ num: '50+', label: 'Beauty clients' }, { num: '5.6x', label: 'Avg social ROAS' }, { num: '+340%', label: 'Booking volume growth' }, { num: '28%', label: 'Email revenue share' }],
    intro: "London's beauty and wellness sector is inherently social and local. We build the full-funnel marketing engine for beauty brands, salons, spas, and fitness businesses.",
    bullets: ['Beauty social media: Instagram, TikTok — UGC, before/after, tutorial content', 'Salon local SEO: Google Business Profile, near me ranking, review generation', 'Beauty eCommerce: Shopify stores, subscription boxes, sampling', 'Gym and studio marketing: class booking funnels, membership campaigns', 'Influencer and UGC partnerships: micro-influencer seeding at scale', 'Email and SMS: Klaviyo for beauty — birthday offers, restock reminders, loyalty'],
    faqs: [{ q: 'Which social platform works best for beauty?', a: 'Instagram for established brands. TikTok for viral discovery. Both for most brands.' }, { q: 'Can you help my salon get more bookings?', a: 'Yes. Google Business Profile + local SEO is the #1 channel for salons.' }, { q: 'Do you work with beauty product brands?', a: 'Yes. DTC eCommerce, influencer seeding, social commerce, Amazon.' }],
  },
];

export const ALL_INDUSTRY_SLUGS = INDUSTRIES.map(i => i.slug);

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find(i => i.slug === slug);
}
