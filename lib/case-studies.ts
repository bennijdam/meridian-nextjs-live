/**
 * Case studies data layer.
 *
 * Powers:
 *   - /case-studies          -> index page with result cards
 *   - /case-studies/[slug]   -> individual case study pages
 */

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  service: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: Array<{ metric: string; before: string; after: string }>;
  testimonial: { quote: string; author: string; role: string };
  duration: string;
  services: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'finpay-organic-growth',
    client: 'FinPay',
    industry: 'Fintech',
    service: 'SEO + PPC',
    title: '+412% organic traffic in 9 months',
    description: 'How we helped FinPay dominate competitive fintech search terms and slash customer acquisition costs through an integrated SEO and PPC strategy.',
    challenge: 'FinPay, a London-based payment processing startup, was burning through runway on paid acquisition with a CAC of £340 per customer. Organic visibility was near-zero — they ranked for just 12 keywords on page one. Competitors with ten times the domain authority dominated every high-intent search term in the payments space.',
    solution: 'We deployed a three-phase programme: (1) a full technical SEO overhaul — schema markup, Core Web Vitals remediation, and crawl-budget optimisation; (2) a topically-clustered content engine targeting 180+ commercial-intent keywords across payments, invoicing, and merchant services; (3) a targeted Google Ads campaign focused on bottom-of-funnel terms to generate leads while organic compounded. Every content piece was structured for AI Overview citation, with answer-first formatting and FAQPage schema.',
    results: [
      { metric: 'Organic traffic', before: '2,400/mo', after: '12,300/mo' },
      { metric: 'Page-one keywords', before: '12', after: '187' },
      { metric: 'Customer acquisition cost', before: '£340', after: '£112' },
      { metric: 'Monthly inbound demos', before: '8', after: '47' },
    ],
    testimonial: {
      quote: 'Meridian took us from invisible to unmissable. Our organic channel now generates more demos than our entire paid programme did before — at a third of the cost.',
      author: 'Marcus Chen',
      role: 'CEO, FinPay',
    },
    duration: '9 months',
    services: ['SEO', 'PPC', 'Content Marketing', 'Technical SEO'],
  },
  {
    slug: 'urbankitchen-local-seo',
    client: 'UrbanKitchen',
    industry: 'Hospitality',
    service: 'Local SEO + Social Media',
    title: 'Google 3-pack in 18 London boroughs',
    description: 'A multi-location restaurant chain went from patchy local visibility to dominating the Google 3-pack across 18 boroughs in under six months.',
    challenge: 'UrbanKitchen operates 22 locations across London but had no local SEO strategy. Google Business Profiles were incomplete, reviews were unmanaged, and location pages were thin duplicates. They were losing footfall to competitors who ranked higher in local search despite inferior offerings.',
    solution: 'We rebuilt all 22 Google Business Profiles with category optimisation, attribute markup, and a weekly posting schedule. We created unique, content-rich location pages for every branch — each targeting borough-specific long-tail terms. A review generation programme boosted average review counts from 23 to 180+ per location. Social media content was localised to each borough with targeted Instagram and TikTok campaigns driving awareness.',
    results: [
      { metric: 'Google 3-pack boroughs', before: '3', after: '18' },
      { metric: 'Avg reviews per location', before: '23', after: '184' },
      { metric: 'Monthly reservations (organic)', before: '1,200', after: '4,800' },
      { metric: 'Social media followers', before: '8,400', after: '34,600' },
    ],
    testimonial: {
      quote: 'We went from being invisible on Google Maps to owning our boroughs. Reservations are up 4x and we have not increased our marketing spend by a penny.',
      author: 'Sophie Laurent',
      role: 'Marketing Director, UrbanKitchen',
    },
    duration: '6 months',
    services: ['Local SEO', 'Social Media', 'Content Marketing', 'Google Business Profile'],
  },
  {
    slug: 'legalshield-revenue-growth',
    client: 'LegalShield',
    industry: 'Legal',
    service: 'SEO + Content Marketing',
    title: '£2.1M in attributed revenue',
    description: 'A mid-size London law firm generated £2.1 million in directly attributed revenue from organic search within 12 months of engagement.',
    challenge: 'LegalShield, a 45-partner commercial law firm in Holborn, relied almost entirely on referrals. Their website generated fewer than 30 enquiries per month. Competitors outranked them for every practice-area keyword. The site was slow, lacked schema, and had no content strategy.',
    solution: 'We executed a complete digital transformation: a Next.js website rebuild with perfect Core Web Vitals, practice-area landing pages targeting 120+ high-intent legal keywords, a thought leadership content programme publishing two articles per week, and a backlink velocity campaign targeting legal directories, .gov.uk, and .ac.uk sources. Every page included SRA-compliant messaging with proper fee transparency.',
    results: [
      { metric: 'Monthly organic enquiries', before: '28', after: '215' },
      { metric: 'Attributed revenue (12mo)', before: '£180K', after: '£2.1M' },
      { metric: 'Page-one keywords', before: '9', after: '134' },
      { metric: 'Domain authority', before: '24', after: '47' },
    ],
    testimonial: {
      quote: 'The ROI is extraordinary. Every pound we spend with Meridian returns over twelve in billed revenue. They understand the legal sector better than any agency we have worked with.',
      author: 'Richard Hartley',
      role: 'Managing Partner, LegalShield',
    },
    duration: '12 months',
    services: ['SEO', 'Content Marketing', 'Web Design', 'Copywriting'],
  },
  {
    slug: 'cloudmetrics-cac-reduction',
    client: 'CloudMetrics',
    industry: 'SaaS',
    service: 'Content Marketing + PPC',
    title: 'CAC reduced by 47%',
    description: 'A B2B SaaS company cut customer acquisition cost by 47% through a combined content and paid media strategy that shifted pipeline from paid to organic.',
    challenge: 'CloudMetrics, a London-based observability SaaS platform, was spending £85K/month on Google Ads with a CAC of £620. The content programme produced top-of-funnel blog posts that generated traffic but no pipeline. Organic contributed just 8% of demos. The board demanded better unit economics before the Series B.',
    solution: 'We restructured the content engine entirely around bottom-of-funnel intent: comparison pages (vs Datadog, vs New Relic), alternative pages, integration landing pages, and use-case guides. Simultaneously, we rebuilt the Google Ads account from scratch — restructuring campaigns around product features rather than generic keywords, implementing Enhanced Conversions, and launching a Performance Max campaign targeting in-market audiences. Content and paid were orchestrated as one system.',
    results: [
      { metric: 'Customer acquisition cost', before: '£620', after: '£328' },
      { metric: 'Organic % of pipeline', before: '8%', after: '41%' },
      { metric: 'Monthly demos', before: '45', after: '92' },
      { metric: 'Google Ads ROAS', before: '2.1x', after: '4.8x' },
    ],
    testimonial: {
      quote: 'Meridian transformed our unit economics. We went into our Series B with a CAC story that investors loved. The content moat they built is now our most defensible growth channel.',
      author: 'Aisha Patel',
      role: 'VP Marketing, CloudMetrics',
    },
    duration: '8 months',
    services: ['Content Marketing', 'PPC', 'SEO', 'Copywriting'],
  },
  {
    slug: 'bloom-beauty-ecommerce',
    client: 'Bloom Beauty',
    industry: 'Beauty & Wellness',
    service: 'eCommerce + Email Marketing',
    title: '4.8x ROAS, 31% email revenue',
    description: 'A DTC beauty brand achieved 4.8x ROAS on paid media and built an email programme that generates 31% of total revenue.',
    challenge: 'Bloom Beauty, a clean beauty DTC brand, was stuck at £40K/month in revenue with a 1.8x ROAS on Meta Ads. Email was limited to a monthly newsletter that barely broke 15% open rates. The Shopify store had a 1.2% conversion rate and no post-purchase retention strategy. Customer lifetime value was declining.',
    solution: 'We rebuilt the entire eCommerce funnel: a Shopify theme redesign focused on conversion (product pages, checkout, upsells), a full Klaviyo implementation with 12 automated flows (welcome, abandoned cart, post-purchase, win-back, VIP, birthday, back-in-stock, sunset, review request, cross-sell, replenishment, and referral), and a restructured Meta Ads programme with UGC creative and Advantage+ campaigns. Every email flow was A/B tested over 90 days.',
    results: [
      { metric: 'Monthly revenue', before: '£40K', after: '£142K' },
      { metric: 'Meta Ads ROAS', before: '1.8x', after: '4.8x' },
      { metric: 'Email % of revenue', before: '4%', after: '31%' },
      { metric: 'Shopify conversion rate', before: '1.2%', after: '3.4%' },
    ],
    testimonial: {
      quote: 'Our email programme alone now generates more revenue than our entire business did before Meridian. The Klaviyo flows they built are an absolute machine.',
      author: 'Emma Whitfield',
      role: 'Founder, Bloom Beauty',
    },
    duration: '7 months',
    services: ['eCommerce', 'Email Marketing', 'PPC', 'Social Media'],
  },
  {
    slug: 'buildright-lead-generation',
    client: 'BuildRight',
    industry: 'Construction',
    service: 'Local SEO + Google Ads',
    title: '520% lead volume increase',
    description: 'A London construction company went from 12 leads per month to 74 through a combined local SEO and Google Ads programme.',
    challenge: 'BuildRight, a residential construction company operating across South London, generated most of their leads through word of mouth and Checkatrade. Their website was outdated, slow, and invisible in search. Google Business Profile had 8 reviews. They wanted a predictable pipeline of high-value extension, loft conversion, and new-build leads.',
    solution: 'We built a conversion-focused website with portfolio showcases, trust signals, and a multi-step lead form. Local SEO targeted every South London borough with dedicated landing pages. Google Business Profile was overhauled with project photos, weekly posts, and a review generation programme. Google Ads targeted high-intent searches — loft conversion, house extension, new build — with location-specific landing pages and call tracking.',
    results: [
      { metric: 'Monthly qualified leads', before: '12', after: '74' },
      { metric: 'Google 3-pack keywords', before: '0', after: '28' },
      { metric: 'Google reviews', before: '8', after: '96' },
      { metric: 'Cost per lead', before: '£180', after: '£42' },
    ],
    testimonial: {
      quote: 'We have had to hire two new project managers to handle the volume. The leads are genuine, high-value homeowners — not tyre-kickers from Checkatrade.',
      author: 'James Hargreaves',
      role: 'Director, BuildRight Construction',
    },
    duration: '5 months',
    services: ['Local SEO', 'Google Ads', 'Web Design', 'Google Business Profile'],
  },
];

export const ALL_CASE_STUDY_SLUGS = CASE_STUDIES.map(cs => cs.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(cs => cs.slug === slug);
}
