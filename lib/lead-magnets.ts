/**
 * Lead magnet catalogue.
 *
 * Powers:
 *   - /resources              -> index of all lead magnets
 *   - /resources/[slug]       -> individual lead magnet pages with email gate
 *   - /api/download           -> email capture + download delivery endpoint
 *
 * Each entry is a top-of-funnel conversion asset. The email gate is the
 * highest-ROI lead capture mechanism we run — readers trade an email for
 * a meaningful, usable asset (playbook, calculator, checklist, template).
 */

export type LeadMagnet = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  format: 'PDF' | 'Spreadsheet' | 'Checklist' | 'Template';
  pages?: number;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  category: 'SEO' | 'PPC' | 'Web' | 'eCommerce' | 'Social' | 'General';
  outcomes: string[];
  tableOfContents: string[];
  targetAudience: string;
  relatedServices: string[];
  downloadFilename: string;
};

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    slug: 'london-seo-playbook-2026',
    title: 'The London SEO Playbook 2026',
    subtitle: 'A 42-page tactical playbook for ranking on Google, AI Overviews and ChatGPT across every London borough.',
    description:
      'Everything our in-house SEO team uses to put London brands on page one — and increasingly, inside AI-generated answers. Borough-level keyword research frameworks, AI Overview citation engineering, technical SEO audit templates, and a 90-day editorial calendar.',
    format: 'PDF',
    pages: 42,
    icon: '📘',
    metaTitle: 'The London SEO Playbook 2026 — Free 42-Page PDF | Meridian',
    metaDescription:
      'Download the free 42-page London SEO Playbook 2026. Borough-level keyword strategy, AI Overview optimisation, technical SEO checklist, 90-day editorial calendar.',
    category: 'SEO',
    outcomes: [
      'Borough-level keyword research across 44 London boroughs',
      'AI Overview & ChatGPT citation engineering framework (GEO/AEO)',
      'Technical SEO audit checklist — Core Web Vitals, schema, INP',
      '90-day editorial calendar template with topic clustering',
      'Link-building outreach templates for .gov.uk, .ac.uk and UK media',
      'Monthly SEO reporting dashboard template (revenue-tied KPIs)',
    ],
    tableOfContents: [
      '1. The London search landscape in 2026',
      '2. Keyword research for borough-level intent',
      '3. Technical SEO foundations: Core Web Vitals, schema, INP',
      '4. GEO: engineering your content for AI Overviews',
      '5. AEO: getting cited in ChatGPT, Claude and Perplexity',
      '6. Content velocity and topical clustering',
      '7. Link building from UK authority sources',
      '8. Local SEO and Google Business Profile',
      '9. Measurement, reporting and revenue attribution',
      '10. 90-day editorial calendar template',
      '11. 12-month SEO roadmap for London businesses',
      '12. Tools, templates and further reading',
    ],
    targetAudience: 'For founders, marketing leads and in-house SEOs at London SMEs and scaleups.',
    relatedServices: ['seo-london', 'ecommerce-london', 'copywriting-london'],
    downloadFilename: 'meridian-london-seo-playbook-2026.pdf',
  },
  {
    slug: 'app-development-cost-calculator',
    title: 'App Development Cost Calculator',
    subtitle: 'A ready-to-use spreadsheet that estimates the real cost of shipping an iOS, Android or cross-platform app from MVP to enterprise.',
    description:
      'Built from 60+ real London app engagements. Plug in your feature requirements, team size and compliance needs and the model outputs a realistic budget range — broken down by feature, platform, timeline and post-launch maintenance.',
    format: 'Spreadsheet',
    icon: '📊',
    metaTitle: 'App Development Cost Calculator — Free Spreadsheet | Meridian',
    metaDescription:
      'Free London app development cost calculator. Estimate your MVP, production or enterprise app cost. Native vs cross-platform comparison, compliance add-ons.',
    category: 'Web',
    outcomes: [
      'Feature-by-feature cost estimator (auth, payments, real-time, AI)',
      'Native (Swift/Kotlin) vs cross-platform (Flutter/RN) comparison',
      'Timeline estimator tied to engineering hours per feature',
      'Compliance cost add-ons: FCA, PCI-DSS, NHS DSP, GDPR',
      'App Store and Play Store submission checklist',
      'Post-launch maintenance budget planner (12-month view)',
    ],
    tableOfContents: [
      'Tab 1: Project inputs (features, platform, team)',
      'Tab 2: Feature-level cost breakdown',
      'Tab 3: Native vs cross-platform comparison',
      'Tab 4: Compliance cost add-ons',
      'Tab 5: Timeline and milestone estimator',
      'Tab 6: 12-month post-launch maintenance model',
      'Tab 7: App Store submission checklist',
      'Tab 8: Example builds (MVP, production, enterprise)',
    ],
    targetAudience: 'For non-technical founders, product managers and CTOs scoping a new mobile app.',
    relatedServices: ['app-development-london', 'web-design-london'],
    downloadFilename: 'meridian-app-cost-calculator.xlsx',
  },
  {
    slug: 'ecommerce-email-templates',
    title: 'eCommerce Email Flow Templates',
    subtitle: 'Eight battle-tested Klaviyo/Mailchimp email flows that recover abandoned carts, win back lapsed customers and push LTV 30%+.',
    description:
      'The exact flow architecture and copy we deploy for our Shopify and Magento clients. Welcome series, abandoned cart, post-purchase, winback, browse abandonment, VIP, replenishment and review requests — all with copy, subject lines and segmentation rules.',
    format: 'Template',
    icon: '✉️',
    metaTitle: 'eCommerce Email Flow Templates — Free Download | Meridian',
    metaDescription:
      'Free eCommerce email templates for Klaviyo and Mailchimp. 8 proven flows: welcome, cart abandonment, winback, post-purchase, VIP, replenishment.',
    category: 'eCommerce',
    outcomes: [
      '8 complete email flow templates (Klaviyo + Mailchimp-ready)',
      'Full copy: subject lines, preheaders, body and CTAs',
      'Segmentation rules and trigger timing for each flow',
      'A/B testing framework for subject lines and send times',
      'Revenue attribution model (flow-level and SKU-level)',
      'Deliverability checklist: SPF, DKIM, DMARC, warm-up',
    ],
    tableOfContents: [
      '1. Welcome series (5-email flow)',
      '2. Abandoned cart recovery (3-email flow)',
      '3. Browse abandonment (2-email flow)',
      '4. Post-purchase nurture (4-email flow)',
      '5. Winback for lapsed customers (3-email flow)',
      '6. Replenishment for consumables (1-email flow)',
      '7. VIP / loyalty tier flow (3-email flow)',
      '8. Review & UGC request flow (2-email flow)',
      '9. Segmentation logic and trigger timing',
      '10. Deliverability & authentication checklist',
    ],
    targetAudience: 'For Shopify, WooCommerce and Magento store owners and eCommerce managers.',
    relatedServices: ['ecommerce-london', 'email-marketing-london', 'copywriting-london'],
    downloadFilename: 'meridian-ecommerce-email-templates.zip',
  },
  {
    slug: 'shopify-seo-checklist',
    title: 'Shopify SEO Launch Checklist',
    subtitle: 'A 64-point pre-launch and post-launch Shopify SEO checklist that stops you losing rankings the moment you migrate.',
    description:
      'The same checklist we run on every Shopify migration. Technical SEO, on-page, collection and product page structure, URL redirects, schema markup, and the performance tweaks that keep your Lighthouse score green after launch.',
    format: 'Checklist',
    icon: '✅',
    metaTitle: 'Shopify SEO Launch Checklist — Free 64-Point PDF | Meridian',
    metaDescription:
      'Free Shopify SEO launch checklist. 64 pre- and post-launch checks covering technical SEO, redirects, schema, Core Web Vitals, collection structure.',
    category: 'eCommerce',
    outcomes: [
      '64-point pre- and post-launch Shopify SEO checklist',
      'URL redirect mapping template (301s for every legacy path)',
      'Collection and product page structure recommendations',
      'Schema markup: Product, Offer, AggregateRating, BreadcrumbList',
      'Core Web Vitals tuning for the Dawn and custom themes',
      'Post-launch monitoring playbook (30-day checklist)',
    ],
    tableOfContents: [
      '1. Pre-migration: baseline crawl and traffic snapshot',
      '2. URL structure and redirect map',
      '3. Theme performance: LCP, CLS, INP budgets',
      '4. Schema markup for products and collections',
      '5. Image optimisation, alt text and srcset',
      '6. Internal linking and collection hierarchy',
      '7. Metadata, titles and canonical tags',
      '8. Robots.txt, sitemap and indexing',
      '9. Post-launch monitoring (7-day, 30-day)',
      '10. Common Shopify SEO pitfalls and fixes',
    ],
    targetAudience: 'For Shopify merchants, dev leads and agencies running migrations or launching new stores.',
    relatedServices: ['ecommerce-london', 'seo-london'],
    downloadFilename: 'meridian-shopify-seo-checklist.pdf',
  },
  {
    slug: 'london-agency-vetting-guide',
    title: 'How to Choose a London Agency',
    subtitle: 'An 18-page buyer\'s guide that helps you spot a great London agency — and walk away from the ones that will burn your budget.',
    description:
      'The questions we wish every client asked before they hired us. Pricing red flags, contract traps, reporting red flags, case-study forgery tells, and the exact RFP template you should send to every shortlisted agency.',
    format: 'PDF',
    pages: 18,
    icon: '🛡️',
    metaTitle: 'How to Choose a London Agency — Free Vetting Guide | Meridian',
    metaDescription:
      'Free 18-page London agency vetting guide. Pricing red flags, contract traps, reporting red flags, RFP template. The questions every buyer should ask.',
    category: 'General',
    outcomes: [
      'Agency scorecard: 22 criteria to rank any shortlist',
      'RFP template — ready to send to 3–5 London agencies',
      'Pricing red flags and contract traps to avoid',
      'Reporting red flags (vanity metrics, rigged attribution)',
      'Reference-check script and case-study verification guide',
      'In-house vs agency vs freelancer decision framework',
    ],
    tableOfContents: [
      '1. Before you shortlist: defining the problem',
      '2. In-house vs agency vs freelancer',
      '3. The 22-point agency scorecard',
      '4. Pricing red flags: retainers, contracts, lock-ins',
      '5. Reporting red flags: vanity metrics and attribution',
      '6. Verifying case studies and testimonials',
      '7. The RFP template (send to all finalists)',
      '8. Reference check script: what to ask past clients',
      '9. Kickoff checklist for the winning agency',
    ],
    targetAudience: 'For founders, marketing directors and procurement leads hiring a London digital agency.',
    relatedServices: ['seo-london', 'ppc-london', 'web-design-london'],
    downloadFilename: 'meridian-london-agency-vetting-guide.pdf',
  },
  {
    slug: 'saas-growth-framework',
    title: 'B2B SaaS Growth Framework',
    subtitle: 'A 28-page framework combining product-led growth, SEO and paid for UK B2B SaaS companies at the £1–10M ARR stage.',
    description:
      'The integrated SEO + PPC + content framework we use with scaling B2B SaaS clients. Channel-level CAC targets, content cluster mapping for bottom-of-funnel keywords, PLG motion design, and the LinkedIn + Google Ads stack that actually converts.',
    format: 'PDF',
    pages: 28,
    icon: '🚀',
    metaTitle: 'B2B SaaS Growth Framework — Free 28-Page PDF | Meridian',
    metaDescription:
      'Free 28-page B2B SaaS growth framework. SEO, PPC, content, PLG. Channel CAC targets, content cluster maps, LinkedIn and Google Ads playbook.',
    category: 'SEO',
    outcomes: [
      'Channel-level CAC and LTV targets by ARR stage',
      'SEO content cluster maps for bottom-of-funnel keywords',
      'LinkedIn Ads playbook (audience, creative, bidding)',
      'Google Ads playbook for SaaS (branded, competitor, category)',
      'Product-led growth motion design framework',
      'Integrated GTM dashboard template (marketing + sales + product)',
    ],
    tableOfContents: [
      '1. The B2B SaaS growth landscape in 2026',
      '2. CAC, LTV and payback targets by ARR stage',
      '3. SEO: the content cluster strategy for SaaS',
      '4. Category creation and thought leadership',
      '5. LinkedIn Ads playbook for B2B SaaS',
      '6. Google Ads playbook for B2B SaaS',
      '7. Product-led growth motions that compound',
      '8. Sales-assisted PLG: the hybrid model',
      '9. Attribution and dashboarding',
      '10. 12-month growth roadmap',
    ],
    targetAudience: 'For B2B SaaS founders, heads of growth and CMOs at £1–10M ARR companies.',
    relatedServices: ['seo-london', 'ppc-london', 'email-marketing-london'],
    downloadFilename: 'meridian-saas-growth-framework.pdf',
  },
];

export const ALL_LEAD_MAGNET_SLUGS = LEAD_MAGNETS.map((m) => m.slug);

export function getLeadMagnet(slug: string): LeadMagnet | undefined {
  return LEAD_MAGNETS.find((m) => m.slug === slug);
}

/** Whitelist helper for the /api/download/[filename] route. */
export const ALL_LEAD_MAGNET_FILENAMES = LEAD_MAGNETS.map((m) => m.downloadFilename);

export function getLeadMagnetByFilename(filename: string): LeadMagnet | undefined {
  return LEAD_MAGNETS.find((m) => m.downloadFilename === filename);
}
