/**
 * lib/pricing.ts — single source of truth for all Meridian pricing.
 *
 * Pricing strategy: every line is set 40% below documented London market
 * average ("RETAINER_SAVINGS_VS_MARKET_PCT"). Three billing options for
 * retainers:
 *   • payg     — month-to-month, no minimum, highest unit price
 *   • monthly  — 6-month commitment, ~10% off PAYG
 *   • annual   — paid yearly upfront, 17% off PAYG (12 months for the price of 10)
 *
 * Stripe price IDs are read from env vars at runtime so the same source
 * file works in dev, preview and production. See CODEX.md §12 for the
 * one-shot Stripe setup script that creates products + prices.
 */

export const RETAINER_SAVINGS_VS_MARKET_PCT = 40;
export const ANNUAL_DISCOUNT_PCT = 17;
export const MONTHLY_DISCOUNT_PCT = 10;

// =============================================================
// Service-level meta — used to render service tabs on /pricing
// =============================================================

export type ServiceMeta = { name: string; slug: string };

export const SERVICES_META: ServiceMeta[] = [
  { name: 'SEO',           slug: 'seo' },
  { name: 'PPC',           slug: 'ppc' },
  { name: 'Social Media',  slug: 'social-media' },
  { name: 'Content',       slug: 'content-marketing' },
  { name: 'Web Design',    slug: 'web-design' },
  { name: 'App Dev',       slug: 'app-development' },
  { name: 'Branding',      slug: 'branding' },
  { name: 'Business Plan', slug: 'business-plans' },
  { name: 'Copywriting',   slug: 'copywriting' },
  { name: 'Email',         slug: 'email-marketing' },
  { name: 'Video',         slug: 'video-production' },
  { name: 'eCommerce',     slug: 'ecommerce' },
];

// =============================================================
// RETAINERS — recurring monthly subscriptions
// =============================================================

export type Retainer = {
  /** Stable identifier — also used as Stripe Product lookup key */
  id: string;
  serviceName: string;
  serviceSlug: string;
  tierName: 'Starter' | 'Growth' | 'Scale';
  tagline: string;
  description: string;
  /** Pay-as-you-go: monthly billing, no commitment, full price */
  paygMonthly: number;
  /** Monthly subscription: 6-month commitment, 10% off PAYG */
  monthlyMonthly: number;
  /** Annual: paid upfront, 17% off PAYG (effective monthly rate shown) */
  annualMonthly: number;
  /** London market average for comparable scope — used for "vs market" deltas */
  marketAvgMonthly: number;
  popular?: boolean;
  features: string[];
  cta?: string;
  /** Env-var keys for Stripe Price IDs (resolved at runtime) */
  stripePriceIds: {
    payg: string;
    monthly: string;
    annual: string;
  };
};

/** Helper: derive monthly + annual prices from the PAYG anchor */
function tier(payg: number) {
  return {
    payg,
    monthly: Math.round(payg * (1 - MONTHLY_DISCOUNT_PCT / 100)),
    annual:  Math.round(payg * (1 - ANNUAL_DISCOUNT_PCT  / 100)),
  };
}

export const RETAINERS: Retainer[] = [
  // ===== SEO =====
  {
    id: 'seo-starter', serviceName: 'SEO', serviceSlug: 'seo',
    tierName: 'Starter',
    tagline: 'For solopreneurs and pre-Series A startups testing demand.',
    description: 'Foundational SEO: technical fixes, 8 keywords, monthly content, basic reporting.',
    ...{ paygMonthly: tier(490).payg,  monthlyMonthly: tier(490).monthly,  annualMonthly: tier(490).annual },
    marketAvgMonthly: 820,
    features: [
      '1 technical audit + remediation in month one',
      '8 target keywords (mix of borough + commercial)',
      '4 hours of senior SEO time per month',
      'Monthly performance call (45 min)',
      'Live dashboard + monthly PDF report',
      'Cancel any time after 90 days',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_SEO_STARTER_PAYG', monthly: 'STRIPE_PRICE_SEO_STARTER_MONTHLY', annual: 'STRIPE_PRICE_SEO_STARTER_ANNUAL' },
  },
  {
    id: 'seo-growth', serviceName: 'SEO', serviceSlug: 'seo',
    tierName: 'Growth', popular: true,
    tagline: 'For Series A startups & SMEs ready to compound traffic growth.',
    description: 'The flagship SEO programme: full technical, 25 keywords, 4 pieces a month, AI-Overview engineering, link building.',
    ...{ paygMonthly: tier(1490).payg, monthlyMonthly: tier(1490).monthly, annualMonthly: tier(1490).annual },
    marketAvgMonthly: 2500,
    features: [
      'Continuous technical SEO + Core Web Vitals work',
      '25 target keywords across borough, commercial and editorial',
      '16 hours of senior SEO + content time per month',
      '4 long-form content pieces per month (1,500+ words)',
      'AI Overview & ChatGPT citation engineering',
      'Link building from .gov.uk, .ac.uk, UK media',
      'Fortnightly calls + dedicated account lead',
      'Real-time dashboard with revenue attribution',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_SEO_GROWTH_PAYG', monthly: 'STRIPE_PRICE_SEO_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_SEO_GROWTH_ANNUAL' },
  },
  {
    id: 'seo-scale', serviceName: 'SEO', serviceSlug: 'seo',
    tierName: 'Scale',
    tagline: 'For established businesses dominating their London market.',
    description: 'Enterprise SEO with unlimited scope, weekly cadence, executive reporting, in-house briefings.',
    ...{ paygMonthly: tier(3490).payg, monthlyMonthly: tier(3490).monthly, annualMonthly: tier(3490).annual },
    marketAvgMonthly: 5800,
    features: [
      'Unlimited keywords within agreed scope',
      'Dedicated SEO lead + content + technical team',
      '8+ long-form content pieces per month',
      'Weekly calls + quarterly in-person business review',
      'Executive dashboards + custom attribution',
      'Priority Slack (1h SLA, business hours)',
      'White-glove technical migrations',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_SEO_SCALE_PAYG', monthly: 'STRIPE_PRICE_SEO_SCALE_MONTHLY', annual: 'STRIPE_PRICE_SEO_SCALE_ANNUAL' },
  },

  // ===== PPC =====
  {
    id: 'ppc-starter', serviceName: 'PPC', serviceSlug: 'ppc',
    tierName: 'Starter',
    tagline: 'For startups testing paid acquisition channels.',
    description: 'Single-platform paid (Google or Meta), tight budget mgmt, conversion tracking.',
    ...{ paygMonthly: tier(390).payg,  monthlyMonthly: tier(390).monthly,  annualMonthly: tier(390).annual },
    marketAvgMonthly: 650,
    features: [
      '1 platform (Google Ads OR Meta) — your choice',
      'Up to £5k/mo ad spend managed',
      'Conversion tracking + GA4 setup',
      'Weekly bid + budget management',
      'Monthly performance review call',
      'You own the ad accounts (always)',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_PPC_STARTER_PAYG', monthly: 'STRIPE_PRICE_PPC_STARTER_MONTHLY', annual: 'STRIPE_PRICE_PPC_STARTER_ANNUAL' },
  },
  {
    id: 'ppc-growth', serviceName: 'PPC', serviceSlug: 'ppc',
    tierName: 'Growth', popular: true,
    tagline: 'Multi-channel paid for Series A scale-ups.',
    description: 'Google + Meta + LinkedIn, server-side tracking, landing-page CRO, account architecture.',
    ...{ paygMonthly: tier(990).payg,  monthlyMonthly: tier(990).monthly,  annualMonthly: tier(990).annual },
    marketAvgMonthly: 1650,
    features: [
      '3 platforms: Google, Meta + one of LinkedIn/TikTok/X',
      'Up to £25k/mo ad spend managed',
      'Server-side tracking + Conversions API',
      'Landing-page CRO sprints (usually higher leverage than bid tweaks)',
      'Fortnightly calls + Slack',
      'Real-time ROAS dashboard',
      'Quarterly account architecture review',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_PPC_GROWTH_PAYG', monthly: 'STRIPE_PRICE_PPC_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_PPC_GROWTH_ANNUAL' },
  },
  {
    id: 'ppc-scale', serviceName: 'PPC', serviceSlug: 'ppc',
    tierName: 'Scale',
    tagline: 'Enterprise paid media with dedicated buying team.',
    description: 'All major platforms, programmatic, dedicated PM, executive reporting.',
    ...{ paygMonthly: tier(2490).payg, monthlyMonthly: tier(2490).monthly, annualMonthly: tier(2490).annual },
    marketAvgMonthly: 4150,
    features: [
      'All major platforms + programmatic display',
      'Up to £150k/mo ad spend managed',
      'Dedicated paid media lead + buyer',
      'Custom MMM (marketing mix model) reporting',
      'Weekly calls + monthly executive review',
      'Creative production included (5 ads/mo)',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_PPC_SCALE_PAYG', monthly: 'STRIPE_PRICE_PPC_SCALE_MONTHLY', annual: 'STRIPE_PRICE_PPC_SCALE_ANNUAL' },
  },

  // ===== Social Media =====
  {
    id: 'social-starter', serviceName: 'Social Media', serviceSlug: 'social-media',
    tierName: 'Starter',
    tagline: 'For founders building presence on one core channel.',
    description: 'Single-platform content + community on the channel that matters most.',
    ...{ paygMonthly: tier(490).payg,  monthlyMonthly: tier(490).monthly,  annualMonthly: tier(490).annual },
    marketAvgMonthly: 820,
    features: [
      '1 platform (Instagram, LinkedIn, TikTok or X)',
      '12 organic posts per month',
      'Content calendar + community management',
      'Monthly performance report',
      'Quarterly strategy call',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_SOCIAL_STARTER_PAYG', monthly: 'STRIPE_PRICE_SOCIAL_STARTER_MONTHLY', annual: 'STRIPE_PRICE_SOCIAL_STARTER_ANNUAL' },
  },
  {
    id: 'social-growth', serviceName: 'Social Media', serviceSlug: 'social-media',
    tierName: 'Growth', popular: true,
    tagline: 'Multi-channel social for scale-ups and SMEs.',
    description: 'Two platforms with original creative, paid social management, founder ghostwriting on LinkedIn.',
    ...{ paygMonthly: tier(1490).payg, monthlyMonthly: tier(1490).monthly, annualMonthly: tier(1490).annual },
    marketAvgMonthly: 2500,
    features: [
      '2 platforms with original creative',
      '20 organic posts + 4 short-form videos per month',
      'Paid social management (Meta + LinkedIn)',
      'LinkedIn founder ghostwriting (8 posts/mo)',
      'Fortnightly calls + Slack',
      'In-house photo + motion production',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_SOCIAL_GROWTH_PAYG', monthly: 'STRIPE_PRICE_SOCIAL_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_SOCIAL_GROWTH_ANNUAL' },
  },
  {
    id: 'social-scale', serviceName: 'Social Media', serviceSlug: 'social-media',
    tierName: 'Scale',
    tagline: 'Full social team for established brands.',
    description: 'Four platforms, dedicated social lead, influencer + UGC programmes, weekly cadence.',
    ...{ paygMonthly: tier(3490).payg, monthlyMonthly: tier(3490).monthly, annualMonthly: tier(3490).annual },
    marketAvgMonthly: 5800,
    features: [
      '4 platforms with original creative',
      'Unlimited organic posts within scope',
      'Dedicated social lead + creative producer',
      'Influencer + UGC programme management',
      'Weekly content reviews',
      'Quarterly executive social audit',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_SOCIAL_SCALE_PAYG', monthly: 'STRIPE_PRICE_SOCIAL_SCALE_MONTHLY', annual: 'STRIPE_PRICE_SOCIAL_SCALE_ANNUAL' },
  },

  // ===== Content Marketing =====
  {
    id: 'content-growth', serviceName: 'Content', serviceSlug: 'content-marketing',
    tierName: 'Growth',
    tagline: 'Editorial content for B2B SaaS and professional services.',
    description: 'Long-form, SEO-engineered editorial. Bylined, expert-level, designed to be cited by AI Overviews.',
    ...{ paygMonthly: tier(1290).payg, monthlyMonthly: tier(1290).monthly, annualMonthly: tier(1290).annual },
    marketAvgMonthly: 2150,
    features: [
      '6 long-form pieces per month (2,000+ words each)',
      'SME interviews + briefings included',
      'AI Overview citation engineering',
      'Editorial calendar mapped to keyword strategy',
      'Internal linking + entity SEO',
      'Distribution-ready (newsletter, social cuts)',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_CONTENT_GROWTH_PAYG', monthly: 'STRIPE_PRICE_CONTENT_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_CONTENT_GROWTH_ANNUAL' },
  },

  // ===== Copywriting =====
  {
    id: 'copywriting-starter', serviceName: 'Copywriting', serviceSlug: 'copywriting',
    tierName: 'Starter',
    tagline: 'For startups that need consistent content without a full-time writer.',
    description: '4 SEO articles per month, website copy updates, and basic AEO formatting.',
    ...{ paygMonthly: tier(490).payg, monthlyMonthly: tier(490).monthly, annualMonthly: tier(490).annual },
    marketAvgMonthly: 820,
    features: [
      '4 SEO-engineered articles per month (1,500+ words)',
      'Website copy updates (up to 4 pages/month)',
      'AI citation formatting (AEO structure)',
      'Editorial calendar aligned to keyword strategy',
      'Monthly performance call (45 min)',
      'Cancel any time after 90 days',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_COPY_STARTER_PAYG', monthly: 'STRIPE_PRICE_COPY_STARTER_MONTHLY', annual: 'STRIPE_PRICE_COPY_STARTER_ANNUAL' },
  },
  {
    id: 'copywriting-growth', serviceName: 'Copywriting', serviceSlug: 'copywriting',
    tierName: 'Growth', popular: true,
    tagline: 'Full content engine for scale-ups and SMEs building authority.',
    description: '8 articles/month, LinkedIn ghostwriting, case studies, email copy — all AEO-optimised.',
    ...{ paygMonthly: tier(1290).payg, monthlyMonthly: tier(1290).monthly, annualMonthly: tier(1290).annual },
    marketAvgMonthly: 2150,
    features: [
      '8 long-form articles per month (2,000+ words)',
      'LinkedIn founder ghostwriting (8 posts/month)',
      'Case study writing (1/month)',
      'Email sequence copywriting',
      'AI Overview citation engineering on all content',
      'Fortnightly calls + dedicated account lead',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_COPY_GROWTH_PAYG', monthly: 'STRIPE_PRICE_COPY_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_COPY_GROWTH_ANNUAL' },
  },
  {
    id: 'copywriting-scale', serviceName: 'Copywriting', serviceSlug: 'copywriting',
    tierName: 'Scale',
    tagline: 'Enterprise content team without the enterprise headcount.',
    description: '16+ pieces/month across all formats: editorial, thought leadership, sales enablement, email.',
    ...{ paygMonthly: tier(2690).payg, monthlyMonthly: tier(2690).monthly, annualMonthly: tier(2690).annual },
    marketAvgMonthly: 4480,
    features: [
      '16+ content pieces per month across all formats',
      'Dedicated content strategist + 2 specialist writers',
      'Thought leadership programme for C-suite',
      'Sales enablement: battle cards, one-pagers, decks',
      'Weekly content reviews + quarterly strategy workshops',
      'White-label option for agency clients',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_COPY_SCALE_PAYG', monthly: 'STRIPE_PRICE_COPY_SCALE_MONTHLY', annual: 'STRIPE_PRICE_COPY_SCALE_ANNUAL' },
  },

  // ===== Email Marketing =====
  {
    id: 'email-starter', serviceName: 'Email Marketing', serviceSlug: 'email-marketing',
    tierName: 'Starter',
    tagline: 'For brands setting up email for the first time or fixing broken flows.',
    description: 'Single platform setup, 3 core flows built, 4 campaigns/month, basic reporting.',
    ...{ paygMonthly: tier(390).payg, monthlyMonthly: tier(390).monthly, annualMonthly: tier(390).annual },
    marketAvgMonthly: 650,
    features: [
      '1 platform: Klaviyo, HubSpot, or Mailchimp',
      '3 core flows built (welcome, abandoned cart, post-purchase)',
      '4 email campaigns per month',
      'List segmentation setup',
      'Monthly performance report',
      'Cancel any time after 90 days',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_EMAIL_STARTER_PAYG', monthly: 'STRIPE_PRICE_EMAIL_STARTER_MONTHLY', annual: 'STRIPE_PRICE_EMAIL_STARTER_ANNUAL' },
  },
  {
    id: 'email-growth', serviceName: 'Email Marketing', serviceSlug: 'email-marketing',
    tierName: 'Growth', popular: true,
    tagline: 'Full email + SMS programme for eCommerce and B2B growth.',
    description: 'All flows, 8+ campaigns/month, SMS integration, A/B testing, revenue attribution.',
    ...{ paygMonthly: tier(990).payg, monthlyMonthly: tier(990).monthly, annualMonthly: tier(990).annual },
    marketAvgMonthly: 1650,
    features: [
      '2 platforms: email + SMS (Klaviyo, HubSpot, or Salesforce)',
      'All flows: welcome, cart, browse, post-purchase, win-back, sunset, VIP',
      '8+ campaigns per month with A/B testing',
      'Advanced segmentation: RFM, predictive, behavioural',
      'SMS strategy + compliance setup',
      'Revenue attribution dashboard',
      'Fortnightly calls + Slack',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_EMAIL_GROWTH_PAYG', monthly: 'STRIPE_PRICE_EMAIL_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_EMAIL_GROWTH_ANNUAL' },
  },
  {
    id: 'email-scale', serviceName: 'Email Marketing', serviceSlug: 'email-marketing',
    tierName: 'Scale',
    tagline: 'Enterprise lifecycle marketing with dedicated CRM team.',
    description: 'Full lifecycle across all channels, CRM admin, marketing automation, custom reporting.',
    ...{ paygMonthly: tier(2490).payg, monthlyMonthly: tier(2490).monthly, annualMonthly: tier(2490).annual },
    marketAvgMonthly: 4150,
    features: [
      'All platforms: email, SMS, push, in-app',
      'Dedicated email marketing lead + designer',
      'Full CRM admin: HubSpot or Salesforce ops',
      'Custom marketing automation workflows',
      'Weekly campaign reviews',
      'Executive lifecycle reporting + attribution',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_EMAIL_SCALE_PAYG', monthly: 'STRIPE_PRICE_EMAIL_SCALE_MONTHLY', annual: 'STRIPE_PRICE_EMAIL_SCALE_ANNUAL' },
  },

  // ===== eCommerce Growth Retainer =====
  {
    id: 'ecom-growth', serviceName: 'eCommerce', serviceSlug: 'ecommerce',
    tierName: 'Growth', popular: true,
    tagline: 'Ongoing growth retainer for Shopify and eCommerce stores.',
    description: 'CRO, email flows, paid ads management, eCommerce SEO — the full growth stack.',
    ...{ paygMonthly: tier(1490).payg, monthlyMonthly: tier(1490).monthly, annualMonthly: tier(1490).annual },
    marketAvgMonthly: 2500,
    features: [
      'Conversion rate optimisation: A/B tests, checkout analysis',
      'Klaviyo email flow management + campaigns',
      'Google Shopping + Meta Ads (up to £15k spend)',
      'eCommerce SEO: product + collection pages',
      'Monthly revenue + ROAS reporting',
      'Fortnightly calls + Slack',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_ECOM_GROWTH_PAYG', monthly: 'STRIPE_PRICE_ECOM_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_ECOM_GROWTH_ANNUAL' },
  },

  // ===== Video Production Retainer =====
  {
    id: 'video-growth', serviceName: 'Video', serviceSlug: 'video-production',
    tierName: 'Growth', popular: true,
    tagline: 'Monthly video content for brands that need a steady stream.',
    description: '4 short-form + 1 long-form video per month, fully produced.',
    ...{ paygMonthly: tier(2490).payg, monthlyMonthly: tier(2490).monthly, annualMonthly: tier(2490).annual },
    marketAvgMonthly: 4150,
    features: [
      '4 short-form videos (Reels, TikTok, Shorts)',
      '1 long-form video (brand, case study, or corporate)',
      'In-house production: filming, editing, grading, sound',
      'Social-optimised cuts for each platform',
      'Subtitles + thumbnail design included',
      'Monthly content calendar + strategy call',
    ],
    stripePriceIds: { payg: 'STRIPE_PRICE_VIDEO_GROWTH_PAYG', monthly: 'STRIPE_PRICE_VIDEO_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_VIDEO_GROWTH_ANNUAL' },
  },
];

// =============================================================
// PROJECTS — fixed-price, one-off engagements (Stripe mode=payment)
// =============================================================

export type Project = {
  id: string;
  serviceName: string;
  serviceSlug: string;
  tierName: string;
  description: string;
  price: number;
  marketAvg: number;
  popular?: boolean;
  features: string[];
  /** Env-var key for the Stripe Price ID */
  stripePriceId: string;
};

export const PROJECTS: Project[] = [
  // ===== Web Design =====
  {
    id: 'web-lite', serviceName: 'Web Design', serviceSlug: 'web-design',
    tierName: 'Lite',
    description: '5-page brochure site. Mobile-perfect, SEO-ready, AVIF images, schema markup.',
    price: 1950, marketAvg: 3250,
    features: [
      '5 pages including home, about, services, contact',
      'Mobile-first responsive design',
      'Schema.org markup baked in',
      'AVIF + WebP responsive images',
      'Core Web Vitals: LCP < 2.5s guaranteed',
      'Delivery: 2 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_WEB_LITE',
  },
  {
    id: 'web-pro', serviceName: 'Web Design', serviceSlug: 'web-design',
    tierName: 'Pro', popular: true,
    description: '10–15 page conversion site in Webflow or Next.js. Schema, CMS, analytics, A/B testing.',
    price: 4990, marketAvg: 8300,
    features: [
      '10–15 pages with custom illustrations',
      'Webflow CMS or Next.js (your choice)',
      'Conversion-engineered: heatmaps, A/B testing setup',
      'Full schema markup + AI Overview optimisation',
      'GA4 + Google Tag Manager',
      'Delivery: 4 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_WEB_PRO',
  },
  {
    id: 'web-custom', serviceName: 'Web Design', serviceSlug: 'web-design',
    tierName: 'Custom',
    description: 'Bespoke website with custom design, animations, integrations, multi-language support.',
    price: 14990, marketAvg: 24990,
    features: [
      'Bespoke design with motion + interactions',
      'Custom CMS schema + multi-language',
      'CRM + marketing automation integrations',
      'Headless or monolithic — chosen on the merits',
      'Performance budget: top 4% of UK websites',
      'Delivery: 8–12 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_WEB_CUSTOM',
  },

  // ===== App Development =====
  {
    id: 'app-mvp-lite', serviceName: 'App Dev', serviceSlug: 'app-development',
    tierName: 'MVP Lite',
    description: 'Single-platform mobile app for validation. React Native or Flutter.',
    price: 9990, marketAvg: 16650,
    features: [
      'iOS or Android (your choice)',
      'React Native or Flutter codebase',
      'Up to 6 core screens',
      'Auth + payments integration',
      'TestFlight / Play Console submission',
      'Delivery: 8 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_APP_MVP_LITE',
  },
  {
    id: 'app-mvp', serviceName: 'App Dev', serviceSlug: 'app-development',
    tierName: 'MVP', popular: true,
    description: 'Cross-platform iOS + Android MVP. Production-ready, App Store + Play Store launch.',
    price: 24990, marketAvg: 41650,
    features: [
      'iOS + Android (cross-platform)',
      'Up to 15 core screens',
      'Backend API + database',
      'Auth, payments, push notifications',
      'Analytics + crash reporting',
      'App Store + Play Store submission, ASO setup',
      'Delivery: 12 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_APP_MVP',
  },
  {
    id: 'app-platform', serviceName: 'App Dev', serviceSlug: 'app-development',
    tierName: 'Platform',
    description: 'Native iOS + Android with custom backend. For fintech, healthtech, regulated industries.',
    price: 79990, marketAvg: 133300,
    features: [
      'Native Swift + Kotlin (when performance demands it)',
      'Custom backend in Node.js / Go / Rust',
      'Compliance: FCA, PCI-DSS, NHS DSP, ISO 27001',
      'Real-time features (WebSockets, push)',
      'Admin dashboard + ops tooling',
      '12-week post-launch support included',
      'Delivery: 16–24 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_APP_PLATFORM',
  },

  // ===== Branding =====
  {
    id: 'branding-sprint', serviceName: 'Branding', serviceSlug: 'branding',
    tierName: 'Sprint',
    description: 'Brand identity sprint: logo, colour, type, basic guidelines. For early-stage startups.',
    price: 1990, marketAvg: 3320,
    features: [
      'Brand strategy workshop (2h)',
      'Logo (3 directions, 2 rounds)',
      'Colour palette + typography',
      'Basic brand guidelines (8-page PDF)',
      'Asset pack: social avatars, email signatures',
      'Delivery: 2 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_BRANDING_SPRINT',
  },
  {
    id: 'branding-full', serviceName: 'Branding', serviceSlug: 'branding',
    tierName: 'Full Identity', popular: true,
    description: 'Complete identity system: strategy, naming option, visual language, comprehensive guidelines.',
    price: 4990, marketAvg: 8300,
    features: [
      'Brand strategy + positioning workshop (full day)',
      'Logo system + variations',
      'Visual language: colour, type, photography, motion',
      'Brand guidelines (40-page PDF)',
      'Marketing asset templates',
      'Trademark search support',
      'Delivery: 4 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_BRANDING_FULL',
  },
  {
    id: 'branding-rebrand', serviceName: 'Branding', serviceSlug: 'branding',
    tierName: 'Rebrand',
    description: 'Full rebrand for established businesses. Strategy, identity, rollout plan, asset migration.',
    price: 14990, marketAvg: 24990,
    features: [
      'Brand audit + competitive landscape research',
      'Customer + stakeholder interviews',
      'Naming exploration (if scope includes)',
      'Complete identity system',
      'Comprehensive brand book (80-page PDF)',
      'Rollout plan + migration support',
      'Delivery: 10 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_BRANDING_REBRAND',
  },

  // ===== Business Plans =====
  {
    id: 'plan-starter', serviceName: 'Business Plan', serviceSlug: 'business-plans',
    tierName: 'Starter',
    description: 'Lean business plan for grant applications and accelerator submissions.',
    price: 590, marketAvg: 990,
    features: [
      '12-page lean business plan',
      'Market analysis + go-to-market',
      '3-year financial projections',
      'Executive summary',
      '2 revision rounds',
      'Delivery: 7 days',
    ],
    stripePriceId: 'STRIPE_PRICE_PLAN_STARTER',
  },
  {
    id: 'plan-visa', serviceName: 'Business Plan', serviceSlug: 'business-plans',
    tierName: 'Visa', popular: true,
    description: 'Innovator Founder visa business plan. Endorsing-body criteria mapped, approval-ready.',
    price: 1090, marketAvg: 1820,
    features: [
      '30-page Innovator Founder plan',
      'Endorsing-body criteria explicitly mapped',
      '5-year financial projections',
      'Market validation + customer evidence',
      'Innovation, viability, scalability narrative',
      '3 revision rounds',
      'Delivery: 10 days',
    ],
    stripePriceId: 'STRIPE_PRICE_PLAN_VISA',
  },
  {
    id: 'plan-investor', serviceName: 'Business Plan', serviceSlug: 'business-plans',
    tierName: 'Investor',
    description: 'Investor-ready plan + pitch deck + 3-statement model. For seed and Series A raises.',
    price: 2490, marketAvg: 4150,
    features: [
      '40-page investor business plan',
      '15-slide pitch deck (Apple-grade design)',
      '3-statement financial model with scenarios',
      'Cap table + dilution analysis',
      'Pitch coaching session (90 min)',
      'Investor feedback round',
      'Delivery: 14 days',
    ],
    stripePriceId: 'STRIPE_PRICE_PLAN_INVESTOR',
  },

  // ===== Video Production =====
  {
    id: 'video-social', serviceName: 'Video', serviceSlug: 'video-production',
    tierName: 'Social Pack',
    description: 'Social-first video content pack. 4 short-form videos for TikTok, Reels, Shorts.',
    price: 1490, marketAvg: 2480,
    features: [
      '4 short-form videos (15–60 seconds each)',
      'Platform-optimised: TikTok, Reels, Shorts formats',
      'Filming at your location or our studio',
      'Full editing, grading, subtitles',
      'Thumbnail design included',
      'Delivery: 2 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_VIDEO_SOCIAL',
  },
  {
    id: 'video-corporate', serviceName: 'Video', serviceSlug: 'video-production',
    tierName: 'Corporate', popular: true,
    description: 'Brand film or corporate video + social cuts. Full production.',
    price: 4990, marketAvg: 8300,
    features: [
      '1 hero video (2–5 minutes, interview or narrative)',
      '4 social cuts from the shoot',
      'Pre-production: scripting, storyboard, shot list',
      'Full-day shoot with crew at your location',
      'Post-production: editing, grading, sound design, music',
      'Subtitles + multi-format delivery',
      'Delivery: 3–4 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_VIDEO_CORPORATE',
  },
  {
    id: 'video-campaign', serviceName: 'Video', serviceSlug: 'video-production',
    tierName: 'Campaign',
    description: 'Full brand film + campaign video package. Multiple formats, multiple channels.',
    price: 14990, marketAvg: 24990,
    features: [
      '1 hero brand film (3–5 minutes)',
      '3 supporting videos (testimonials, product, culture)',
      '8 social cuts across all formats',
      '2 shoot days with full crew',
      'Motion graphics + animation elements',
      'Podcast/interview setup if needed',
      'Delivery: 6–8 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_VIDEO_CAMPAIGN',
  },

  // ===== eCommerce Development =====
  {
    id: 'ecom-starter', serviceName: 'eCommerce', serviceSlug: 'ecommerce',
    tierName: 'Starter',
    description: 'Shopify starter store. Theme customisation, products, payments, shipping.',
    price: 4990, marketAvg: 8300,
    features: [
      'Shopify store with customised premium theme',
      'Up to 50 products uploaded + configured',
      'Stripe + Shopify Payments setup',
      'Shipping zones + rates configured',
      'Basic SEO: meta titles, product schema',
      'Delivery: 2–3 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_ECOM_STARTER',
  },
  {
    id: 'ecom-pro', serviceName: 'eCommerce', serviceSlug: 'ecommerce',
    tierName: 'Pro', popular: true,
    description: 'Custom Shopify theme + Klaviyo + full SEO. For brands serious about eCommerce.',
    price: 9990, marketAvg: 16650,
    features: [
      'Custom Shopify theme (pixel-perfect design)',
      'Klaviyo integration: welcome + abandoned cart + post-purchase flows',
      'Up to 200 products uploaded + configured',
      'Full eCommerce SEO: product schema, collections, site speed',
      'GA4 + conversion tracking setup',
      'Training session + 30-day post-launch support',
      'Delivery: 4–6 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_ECOM_PRO',
  },
  {
    id: 'ecom-enterprise', serviceName: 'eCommerce', serviceSlug: 'ecommerce',
    tierName: 'Enterprise',
    description: 'Shopify Plus or headless commerce. Multi-market, B2B, complex requirements.',
    price: 24990, marketAvg: 41650,
    features: [
      'Shopify Plus or headless (Hydrogen, Medusa)',
      'Checkout extensibility + custom scripts',
      'Multi-market: currencies, languages, tax',
      'B2B: wholesale channel, company accounts, net terms',
      'ERP / PIM / OMS integrations',
      'Performance budget: sub-2s LCP globally',
      'Delivery: 8–14 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_ECOM_ENTERPRISE',
  },

  // ===== Copywriting Projects =====
  {
    id: 'copy-website', serviceName: 'Copywriting', serviceSlug: 'copywriting',
    tierName: 'Website Copy',
    description: 'Full website copy for 5–10 pages. Research, brand voice, SEO-optimised.',
    price: 2490, marketAvg: 4150,
    features: [
      'Brand voice workshop (90 min)',
      'Copy for 5–10 pages: home, about, services, landing',
      'SEO keyword integration on every page',
      'Headline and CTA testing variants',
      '2 revision rounds',
      'Delivery: 2 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_COPY_WEBSITE',
  },
  {
    id: 'copy-rebrand', serviceName: 'Copywriting', serviceSlug: 'copywriting',
    tierName: 'Messaging Rebrand', popular: true,
    description: 'Full messaging framework: positioning, tone of voice, key messages, website copy.',
    price: 4990, marketAvg: 8300,
    features: [
      'Messaging workshop + competitor audit',
      'Positioning statement + value propositions',
      'Tone of voice guide',
      'Key messages per audience segment',
      'Website copy for up to 15 pages',
      'Sales enablement copy: one-pager, email templates',
      'Delivery: 3–4 weeks',
    ],
    stripePriceId: 'STRIPE_PRICE_COPY_REBRAND',
  },
];

// =============================================================
// Lookup + helpers used by the pricing page and checkout API
// =============================================================

// Type aliases consumed by lib/stripe.ts
export type ProductKind = 'retainer' | 'project';
export type Period = 'payg' | 'monthly' | 'annual' | 'oneoff';

export function getRetainer(id: string): Retainer | undefined {
  return RETAINERS.find(r => r.id === id);
}

export function getProject(id: string): Project | undefined {
  return PROJECTS.find(p => p.id === id);
}

/**
 * Given a productId + kind + (optional) period, return the env-var KEY name
 * that holds the Stripe Price ID. The caller looks it up in process.env.
 *
 * Returns `undefined` if the product isn't recognised.
 */
export function resolveStripePriceEnv(
  productId: string,
  kind: ProductKind,
  period?: Period
): string | undefined {
  if (kind === 'retainer') {
    const r = getRetainer(productId);
    if (!r) return undefined;
    const cycle = (period === 'payg' || period === 'monthly' || period === 'annual') ? period : 'payg';
    return r.stripePriceIds[cycle];
  }
  const p = getProject(productId);
  return p?.stripePriceId;
}

/**
 * Resolve a Stripe Price ID for a given product + billing period.
 * Returns the env-var KEY name, then looks it up in process.env.
 */
export function resolveStripePriceId(
  product: Retainer | Project,
  period?: 'payg' | 'monthly' | 'annual' | 'oneoff'
): { envKey: string; priceId: string | undefined } {
  if ('stripePriceIds' in product) {
    const cycle = (period === 'payg' || period === 'monthly' || period === 'annual') ? period : 'payg';
    const envKey = product.stripePriceIds[cycle];
    return { envKey, priceId: process.env[envKey] };
  }
  // Project (one-off)
  return { envKey: product.stripePriceId, priceId: process.env[product.stripePriceId] };
}

/** Format GBP — "£1,495" using British locale */
export function formatGBP(n: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n);
}

/** Calculate % savings vs market — used in tier cards and comparison table */
export function calcSavingsVsMarket(ourPrice: number, marketPrice: number): number {
  if (marketPrice <= 0) return 0;
  return Math.round((1 - ourPrice / marketPrice) * 100);
}
