/**
 * London audience pages — targets buyer segments that need specialised
 * positioning (startups, restaurants, dentists, etc.). Each audience
 * resolves at /london/for/[audience] and inherits the service-page
 * design language.
 */

export type Audience = {
  slug: string;
  name: string; // "Startups", "Restaurants", "eCommerce brands"
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  icon: string; // emoji
  bullets: string[];
  stats: Array<{ num: string; label: string }>;
  relatedServices: string[]; // service slugs from lib/services.ts
  faqs: Array<{ q: string; a: string }>;
};

export const AUDIENCES: Audience[] = [
  {
    slug: 'startups',
    name: 'Startups',
    metaTitle: 'Digital Marketing for London Startups | SEO, PPC, MVP | Meridian',
    metaDescription: 'Digital marketing agency for London startups. Pre-seed to Series B SEO, PPC, branding and MVP support — priced for startup runway. Free 90-second audit.',
    keywords: ['startup marketing london', 'digital agency for startups london', 'seo for startups london', 'ppc for startups london', 'startup branding agency london'],
    intro: "Pre-seed to Series B startups need compounding acquisition, not vanity spend. We run tight, instrumented programmes that match your runway and board's unit economics.",
    icon: '🚀',
    bullets: [
      'Runway-first budgets — no six-figure minimums or lock-in contracts',
      'SEO and AEO foundations that compound long after a paid campaign stops',
      'PPC built around CAC and payback, with weekly board-ready dashboards',
      'Brand + MVP design sprints that ship in weeks, not quarters',
      'LinkedIn ghostwriting and founder-led content for distribution',
      'Fractional marketing lead model — seat on your team without the FTE cost',
    ],
    stats: [
      { num: '60+', label: 'London startups served' },
      { num: '47%', label: 'Avg CAC reduction in 6 months' },
      { num: '£492', label: 'Median CPL across startup SEO clients' },
      { num: '4–6 wk', label: 'MVP brand + site delivery window' },
    ],
    relatedServices: ['seo-london', 'ppc-london', 'web-design-london', 'branding-london', 'business-plan-london'],
    faqs: [
      { q: 'Do you work with pre-revenue startups?', a: "Yes — we run a dedicated pre-seed / seed track with lighter scopes from £490/mo. We will always be transparent if we think you should wait on paid acquisition until product-market fit is clearer." },
      { q: 'Can you support a founder visa business plan as well?', a: "Yes. Our Innovator Founder visa business plan service has been approved by every major UK endorsing body. It dovetails with the branding and MVP site work for fresh founders." },
      { q: 'How do you price for startups?', a: "Every retainer is 40% below London market average. Starters from £390–£490/mo per discipline; Growth retainers from £990/mo. You can start PAYG or commit for deeper savings." },
    ],
  },
  {
    slug: 'ecommerce-brands',
    name: 'eCommerce brands',
    metaTitle: 'eCommerce Marketing for London DTC Brands | Shopify, Klaviyo | Meridian',
    metaDescription: 'eCommerce agency for London DTC brands. Shopify, Klaviyo, Meta Ads, eCommerce SEO, CRO. Engineered for ROAS. Free store audit.',
    keywords: ['ecommerce agency london', 'shopify agency london', 'dtc marketing london', 'klaviyo agency london', 'ecommerce seo london'],
    intro: "DTC brands in London live and die by ROAS, email revenue share and LTV:CAC. We rebuild the funnel around numbers the finance team trusts.",
    icon: '🛒',
    bullets: [
      'Shopify and Shopify Plus builds with custom themes and conversion-engineered checkout',
      'Klaviyo email flows — welcome, cart, post-purchase, win-back, VIP',
      'Meta, Google Shopping and TikTok paid with server-side tracking',
      'eCommerce SEO: product schema, collection architecture, site speed',
      'CRO programmes with structured A/B tests and lifts quantified',
      'Influencer and UGC programmes with measurement baked in',
    ],
    stats: [
      { num: '4.8x', label: 'Avg ROAS on managed paid social' },
      { num: '31%', label: 'Email share of revenue (Bloom Beauty)' },
      { num: '2.8x', label: 'Avg Shopify conversion-rate lift' },
      { num: '£142K', label: 'Monthly revenue added (median DTC client)' },
    ],
    relatedServices: ['ecommerce-london', 'email-marketing-london', 'ppc-london', 'seo-london', 'social-media-london'],
    faqs: [
      { q: 'Do you work with Shopify Plus brands?', a: 'Yes. Half of our eCommerce work is Shopify Plus — multi-market, B2B wholesale, checkout extensibility, ERP integrations.' },
      { q: 'Can you handle email + paid + SEO together?', a: 'Yes. We run them as one integrated growth engine — email captures from paid traffic, SEO scales organic acquisition, retention flows lift LTV. One monthly report, one team.' },
      { q: 'How quickly can you launch?', a: 'Starter Shopify store: 2–3 weeks. Custom theme + Klaviyo + paid: 4–6 weeks. Klaviyo audit + flow rebuild only: 2 weeks.' },
    ],
  },
  {
    slug: 'agencies',
    name: 'Agencies',
    metaTitle: 'White-label Services for London Agencies | SEO, Web, Content | Meridian',
    metaDescription: 'White-label SEO, web, content and PPC fulfilment for London agencies. Confidential, NDA-backed, on your brand. Free capacity audit.',
    keywords: ['white label seo london', 'white label agency london', 'white label web design london', 'agency fulfilment london', 'seo reseller london'],
    intro: "Agency partners need delivery that looks like them, hits deadlines and scales without poaching risk. We plug in as your silent back office.",
    icon: '🤝',
    bullets: [
      'White-label SEO, content, PPC, web and email fulfilment',
      'On-brand decks, audits and reports — your logo, your tone',
      'Account lead and specialist access via your Slack or project tool',
      'NDA + non-solicit standard on every engagement',
      'Capacity ramps — 10 hours one month, 200 the next',
      'Post-mortems run with you, never surfaced to clients',
    ],
    stats: [
      { num: '18+', label: 'London agencies partnered with' },
      { num: '0', label: 'Clients ever contacted directly' },
      { num: '92%', label: 'On-time delivery rate (trailing 24 mo)' },
      { num: '40%', label: 'Margin retained on resold services' },
    ],
    relatedServices: ['seo-london', 'copywriting-london', 'web-design-london', 'ppc-london'],
    faqs: [
      { q: 'Is pricing transparent for resale?', a: 'Yes. We publish wholesale bands on request and sign on a fixed rate for the engagement. You set the retail price.' },
      { q: 'Do you attend client calls?', a: "Only if you want us to, under your brand. Most partners prefer we stay fully in the background." },
      { q: 'Can you handle large technical SEO migrations?', a: 'Yes — this is one of our most-requested white-label engagements. We run migrations as a fixed-scope sprint with explicit rollback plans.' },
    ],
  },
  {
    slug: 'saas-companies',
    name: 'SaaS companies',
    metaTitle: 'SaaS Marketing for London Software Businesses | SEO, PPC, Content | Meridian',
    metaDescription: 'SaaS marketing agency London — SEO, content, PPC and lifecycle engineered for ARR, not vanity traffic. Trusted by B2B and B2C SaaS scale-ups.',
    keywords: ['saas marketing agency london', 'b2b saas seo london', 'saas ppc agency london', 'saas content marketing london', 'b2b saas marketing london'],
    intro: "B2B SaaS marketing is a pipeline engineering problem, not a branding one. We optimise for MQL-to-SQL, payback, and retention — the numbers your board cares about.",
    icon: '☁️',
    bullets: [
      'Bottom-of-funnel SEO: comparison, alternative, integration, use-case pages',
      'Google Ads rebuilt around product features, not generic keywords',
      'LinkedIn ABM for target accounts with server-side tracking',
      'Lifecycle marketing: in-app, email, CRM orchestration',
      'Content programme aligned to sales enablement — battle cards, case studies',
      'Demo-to-customer CRO: landing pages, scheduling flows, trial onboarding',
    ],
    stats: [
      { num: '47%', label: 'Avg CAC reduction (CloudMetrics)' },
      { num: '4.8x', label: 'Google Ads ROAS uplift' },
      { num: '41%', label: 'Organic share of pipeline (from 8%)' },
      { num: '2x+', label: 'Avg demo-to-SQL conversion' },
    ],
    relatedServices: ['seo-london', 'ppc-london', 'copywriting-london', 'email-marketing-london'],
    faqs: [
      { q: 'Do you only work with B2B SaaS?', a: "No — we work with B2C SaaS too (subscription, freemium, PLG). The playbooks differ but the measurement discipline is the same." },
      { q: 'Do you integrate with HubSpot / Salesforce?', a: "Yes. We support HubSpot and Salesforce as marketing automation leads — setup, custom reporting, lifecycle campaigns and attribution." },
      { q: 'What about PLG growth loops?', a: "We build product-led growth programmes (viral loops, referral, in-app sharing) alongside marketing. They compound better than paid for the right motions." },
    ],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    metaTitle: 'Restaurant Marketing for London Hospitality | Local SEO, Social | Meridian',
    metaDescription: 'Restaurant marketing agency London — local SEO, Google Business Profile, Instagram and TikTok for London restaurants, bars and hotels. Free audit.',
    keywords: ['restaurant marketing agency london', 'hospitality marketing london', 'local seo restaurants london', 'restaurant social media london', 'restaurant ppc london'],
    intro: "London's hospitality market is won in the Google 3-pack, Instagram grid and reservation conversion funnel. We run all three as one programme.",
    icon: '🍽️',
    bullets: [
      'Google Business Profile optimisation and weekly posting',
      'Unique location pages per site targeting borough + cuisine long-tail',
      'Review generation programmes — from 20 to 200+ per location',
      'Instagram + TikTok content production in-house (no outsourcing)',
      'Reservation funnel CRO: OpenTable, ResDiary, own-site booking',
      'Paid campaigns timed to covers, events, and special menus',
    ],
    stats: [
      { num: '4x', label: 'Monthly reservations (UrbanKitchen)' },
      { num: '18', label: 'London boroughs in the 3-pack' },
      { num: '184', label: 'Avg reviews per location' },
      { num: '34.6K', label: 'Instagram followers added (12 mo)' },
    ],
    relatedServices: ['social-media-london', 'seo-london', 'ppc-london', 'video-production-london'],
    faqs: [
      { q: "We are a single-site restaurant — is this overkill?", a: "No. We have a single-site programme from £990/mo covering GBP, local SEO and social. We scale up when you add sites." },
      { q: 'Do you shoot food content?', a: "Yes — in-house photography and video. Short-form Reels/TikTok shot monthly in your venue, with platform-optimised cuts." },
      { q: 'Can you integrate with OpenTable / ResDiary / SevenRooms?', a: 'Yes. We set up conversion tracking back from the reservation system so you see revenue, not just clicks.' },
    ],
  },
  {
    slug: 'law-firms',
    name: 'Law firms',
    metaTitle: 'Legal Marketing for London Law Firms | SRA-Compliant SEO | Meridian',
    metaDescription: 'Legal marketing agency London — SRA-compliant SEO, PPC and content for London law firms and chambers. £2.1M in attributed revenue at LegalShield.',
    keywords: ['legal marketing agency london', 'law firm seo london', 'law firm ppc london', 'sra compliant seo london', 'barristers marketing london'],
    intro: "Legal keywords have the highest commercial intent on the web. We run SRA-compliant campaigns that convert enquiries into billed matters.",
    icon: '⚖️',
    bullets: [
      'Practice-area landing pages for 120+ high-intent legal keywords',
      'SRA-compliant messaging with transparent fee disclosures',
      'Thought leadership programme: two articles per week, bylined',
      'Backlinks from .gov.uk, .ac.uk, legal directories',
      'Google Ads with call tracking tied to matter-type attribution',
      'LinkedIn thought leadership for partners and KCs',
    ],
    stats: [
      { num: '£2.1M', label: 'Attributed revenue at LegalShield' },
      { num: '+215', label: 'Monthly organic enquiries (from 28)' },
      { num: '134', label: 'Page-one keywords (from 9)' },
      { num: '47', label: 'Domain authority achieved' },
    ],
    relatedServices: ['seo-london', 'copywriting-london', 'ppc-london', 'web-design-london'],
    faqs: [
      { q: 'Do you understand SRA advertising rules?', a: "Yes. All copy is reviewed against SRA standards — no guarantees of outcome, transparent fee disclosures where required, no comparative claims." },
      { q: 'Can you work with chambers as well as solicitors?', a: "Yes. Our chambers work focuses on barrister profile pages, practice-area content and thought leadership for direct-access work." },
      { q: 'What is the payback period on legal SEO?', a: 'Typically 4–6 months for enquiry lift and 9–12 months for full ROI. Billed revenue typically exceeds programme cost by 10x+ once mature.' },
    ],
  },
  {
    slug: 'estate-agents',
    name: 'Estate agents',
    metaTitle: 'Property Marketing for London Estate Agents | Local SEO, Paid | Meridian',
    metaDescription: 'Property marketing agency London — local SEO, Rightmove/Zoopla-aligned PPC, estate agency branding and video. Free branch audit.',
    keywords: ['estate agent marketing london', 'property marketing agency london', 'estate agent seo london', 'property ppc london', 'letting agent marketing london'],
    intro: "Instructions are won at the branch level in the Google 3-pack and on the high street. We run both — local SEO, review velocity, and performance paid.",
    icon: '🏠',
    bullets: [
      'Branch-level Google Business Profile optimisation across every office',
      'Borough-specific landing pages for valuation, sales and lettings',
      'Google Ads targeting "house for sale / letting" with call tracking',
      'Rightmove + Zoopla creative support (listing photography, video walk-throughs)',
      'Review generation programmes and reputation management',
      'Video production: branded walk-throughs, vendor testimonials, recruitment',
    ],
    stats: [
      { num: '520%', label: 'Lead volume uplift (construction analogue)' },
      { num: '28', label: 'Google 3-pack keywords achieved' },
      { num: '£42', label: 'Avg cost per qualified lead' },
      { num: '96', label: 'Google reviews added (12 mo)' },
    ],
    relatedServices: ['seo-london', 'ppc-london', 'video-production-london', 'web-design-london'],
    faqs: [
      { q: 'Do you work with single-branch agents?', a: "Yes. Our local SEO + GBP programme from £990/mo is built for single branches. We scale up when you add offices." },
      { q: 'Can you integrate with our CRM?', a: "Yes — most of our property clients use Reapit, Jupix or Alto. We set up lead attribution back to the CRM so you see source-to-instruction performance." },
      { q: 'What about lettings-specific marketing?', a: 'Yes — lettings has distinct keywords (student, corporate, HMO) and we build bespoke landing pages and campaigns per segment.' },
    ],
  },
  {
    slug: 'dentists',
    name: 'Dentists',
    metaTitle: 'Dental Marketing for London Practices | Local SEO, PPC | Meridian',
    metaDescription: 'Dental marketing agency London — local SEO, Google Business Profile, PPC and video for private dentists, orthodontists and implant specialists.',
    keywords: ['dental marketing agency london', 'dentist seo london', 'dental practice marketing london', 'orthodontist marketing london', 'dental implant seo london'],
    intro: "Private dental practices win on local 3-pack visibility and treatment-intent keywords. We run both with CQC- and GDC-compliant creative.",
    icon: '🦷',
    bullets: [
      'Google Business Profile optimisation per practice and per dentist',
      'Treatment-specific landing pages: Invisalign, implants, whitening, composite',
      'Google Ads with treatment-level budgets and call tracking',
      'Review generation programmes via automated post-appointment flows',
      'Patient journey email sequences from enquiry to consultation',
      'Video content: dentist introductions, treatment walk-throughs, testimonials',
    ],
    stats: [
      { num: '8x', label: 'Avg new-patient enquiries per month' },
      { num: '£38', label: 'Cost per consultation booking' },
      { num: '180+', label: 'Avg Google reviews per practice' },
      { num: '12', label: 'London dental clients served' },
    ],
    relatedServices: ['seo-london', 'ppc-london', 'web-design-london', 'video-production-london'],
    faqs: [
      { q: 'Are you GDC / CQC compliant?', a: "Yes. All marketing copy is reviewed against GDC advertising standards — no misleading claims, proper before/after disclosures, and CQC registration details prominently displayed." },
      { q: 'Do you specialise in cosmetic dentistry?', a: "Yes — Invisalign, whitening, composite bonding and implants are some of our highest-volume verticals. We also support general and NHS-mix practices." },
      { q: 'Can you handle multi-practice groups?', a: 'Yes. We manage DSO and multi-site groups with borough-level branch pages, central brand consistency and per-practice performance reporting.' },
    ],
  },
  {
    slug: 'non-profits',
    name: 'Non-profits',
    metaTitle: 'Nonprofit Marketing for London Charities | SEO, Fundraising | Meridian',
    metaDescription: 'Digital marketing for London nonprofits and charities — SEO, Google Ad Grants, fundraising campaigns, donor journeys. Discounted rates for registered charities.',
    keywords: ['nonprofit marketing agency london', 'charity marketing london', 'google ad grants london', 'charity seo london', 'fundraising agency london'],
    intro: "Charities in London compete against the same ad auctions as private-sector brands. We stretch restricted budgets with Ad Grants, SEO and donor-funnel engineering.",
    icon: '🫱',
    bullets: [
      'Google Ad Grants — the free $10K/mo that most charities underuse',
      'Donor journey engineering: single-gift, recurring, legacy',
      'Fundraising landing pages with schema and tracking',
      'SEO for mission, service and campaign pages',
      'Email programmes in Mailchimp, HubSpot or DonorBox',
      'Discounted rates for registered UK charities — 50% below commercial book',
    ],
    stats: [
      { num: '$10K', label: 'Ad Grants spend unlocked per client' },
      { num: '3x', label: 'Avg donor-journey conversion lift' },
      { num: '50%', label: 'Discount for registered charities' },
      { num: '6', label: 'London charities partnered with' },
    ],
    relatedServices: ['seo-london', 'ppc-london', 'email-marketing-london', 'web-design-london'],
    faqs: [
      { q: 'Do you handle Google Ad Grants applications?', a: "Yes — application, policy compliance, account structure and ongoing management. Most charities lose Ad Grants within 12 months because of policy breaches; we keep them live." },
      { q: 'What about legacy and high-net-worth fundraising?', a: "We build distinct journeys for legacy pledges and major gifts — these need different content, creative and email cadences from single-gift funnels." },
      { q: 'Can you support CRM work?', a: 'Yes. Salesforce NPSP, Raisers Edge, Beacon and Donorfy are all supported — segmentation, reporting and lifecycle campaigns.' },
    ],
  },
  {
    slug: 'small-businesses',
    name: 'Small businesses',
    metaTitle: 'Small Business Marketing in London | Local SEO, Google Ads | Meridian',
    metaDescription: 'Digital marketing for London small businesses — local SEO, Google Business Profile, Meta Ads and websites from £490/mo. Free audit, no contracts.',
    keywords: ['small business marketing london', 'small business seo london', 'local seo london', 'small business ppc london', 'small business web design london'],
    intro: "SMEs in London don't need enterprise software. They need local 3-pack visibility, a site that converts and a monthly report that makes sense.",
    icon: '🏪',
    bullets: [
      'Local SEO and Google Business Profile programmes from £490/mo',
      'One-page and five-page websites delivered in two weeks',
      'Meta Ads and Google Ads calibrated to small budgets (from £500/mo spend)',
      'Review generation and reputation management',
      'WhatsApp Business, form routing and call-tracking setup',
      'Monthly 45-minute strategy call — no middle management layers',
    ],
    stats: [
      { num: '490', label: 'Lowest starting retainer (£/month)' },
      { num: '14d', label: 'Standard 5-page website turnaround' },
      { num: '200+', label: 'SMEs across London served' },
      { num: '4.9★', label: 'Verified Google rating' },
    ],
    relatedServices: ['seo-london', 'ppc-london', 'web-design-london', 'social-media-london'],
    faqs: [
      { q: "I run a very small business. Is Meridian too big?", a: "No. Our SME programmes from £490/mo are built for sole traders and micro-businesses. You get a senior lead, not an account manager with a pod." },
      { q: 'Do you do one-off websites?', a: "Yes — fixed-price 5-page sites from £1,950 and 10–15 page sites from £4,990. No retainers required afterwards unless you want ongoing SEO." },
      { q: 'What boroughs do you cover?', a: 'All 44. Our local SEO programmes target borough-specific keywords and the Google 3-pack for your primary and adjacent areas.' },
    ],
  },
];

export const ALL_AUDIENCE_SLUGS = AUDIENCES.map(a => a.slug);

export function getAudience(slug: string): Audience | undefined {
  return AUDIENCES.find(a => a.slug === slug);
}
