/**
 * Cost/pricing guide data — targeting "how much does X cost in London" keywords.
 * These are AI Overview magnets: lead with the answer, include structured data.
 */

export type CostPage = {
  slug: string;
  service: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroAnswer: string;
  image: string;
  tiers: Array<{ name: string; priceRange: string; description: string; features: string[]; meridianPrice: string; marketPrice: string }>;
  factors: Array<{ title: string; description: string }>;
  faqs: Array<{ q: string; a: string }>;
};

export const COST_PAGES: CostPage[] = [
  {
    slug: 'seo', service: 'SEO',
    title: 'How Much Does SEO Cost in London? 2026 Pricing Guide',
    metaTitle: 'How Much Does SEO Cost in London? 2026 Guide | Meridian',
    metaDescription: 'London SEO costs £490–£5,800/month in 2026. Full pricing breakdown by tier, what affects cost, and how to get 40% below market rate.',
    keywords: ['how much does seo cost london', 'seo agency london cost', 'seo pricing london 2026', 'seo retainer cost uk'],
    heroAnswer: 'London SEO agencies charge between £490 and £5,800 per month in 2026, depending on scope, competition level, and team seniority. Meridian prices all tiers 40% below the London market average.',
    image: 'seo-search-optimisation',
    tiers: [
      { name: 'Starter', priceRange: '£490–£800/mo', description: 'For solopreneurs and early startups testing organic demand.', features: ['Technical audit + remediation', '8 target keywords', '4 hours senior SEO time/month', 'Monthly reporting'], meridianPrice: '£490', marketPrice: '£820' },
      { name: 'Growth', priceRange: '£1,200–£2,500/mo', description: 'The sweet spot for Series A startups and SMEs.', features: ['Continuous technical SEO', '25+ target keywords', '4 content pieces/month', 'AI Overview engineering', 'Link building'], meridianPrice: '£1,490', marketPrice: '£2,500' },
      { name: 'Scale', priceRange: '£3,000–£5,800/mo', description: 'Enterprise SEO with dedicated team and unlimited scope.', features: ['Unlimited keyword scope', 'Dedicated SEO team', '8+ content pieces/month', 'Weekly cadence', 'Executive dashboards'], meridianPrice: '£3,490', marketPrice: '£5,800' },
    ],
    factors: [
      { title: 'Competition level', description: '"SEO agency London" (KD 64) costs significantly more than "SEO agency Shoreditch" (KD 25). The more competitive your target keywords, the more content, links, and technical work required.' },
      { title: 'Current site health', description: 'A site with major technical debt (slow load times, broken schema, poor mobile experience) needs more upfront work in months 1–3, which affects early-stage pricing.' },
      { title: 'Content velocity', description: 'More content pieces per month means faster compounding but higher cost. 4 pieces/month is standard; 8+ is aggressive growth.' },
      { title: 'AI/GEO work', description: 'Getting cited in Google AI Overviews and ChatGPT requires structured content engineering — an additional specialism that not all agencies offer.' },
    ],
    faqs: [
      { q: 'How much does SEO cost in London per month?', a: 'London SEO retainers range from £490/month (starter) to £5,800/month (enterprise). The market average for Growth-tier SEO is £2,500/month. Meridian charges £1,490/month for equivalent scope — 40% below market.' },
      { q: 'Is SEO worth it for a small London business?', a: 'Yes — especially for borough-level keywords. Terms like "web design Shoreditch" have much lower competition (KD 25) than "web design London" (KD 62) but still deliver high-intent local leads.' },
      { q: 'How long before I see ROI from SEO?', a: 'Borough-level keywords: 6–8 weeks. London-wide competitive terms: 4–6 months for meaningful gains, 9–12 months for full ROI. We provide monthly revenue attribution from month 1.' },
    ],
  },
  {
    slug: 'ppc', service: 'PPC',
    title: 'How Much Does PPC Cost in London? Google Ads Pricing 2026',
    metaTitle: 'PPC & Google Ads Cost London 2026 | Full Pricing Guide | Meridian',
    metaDescription: 'London PPC management costs £390–£4,150/month plus ad spend in 2026. CPC ranges, budget minimums, and how to reduce cost per lead.',
    keywords: ['how much does ppc cost london', 'google ads cost london', 'ppc pricing london', 'how much should i spend on google ads'],
    heroAnswer: 'PPC management in London costs £390–£4,150 per month (management fee) plus £2,000–£150,000 in ad spend. London CPCs for service terms run £8–£35 per click — among the highest in the world.',
    image: 'digital-marketing-team',
    tiers: [
      { name: 'Starter', priceRange: '£390–£650/mo', description: 'Single platform, up to £5k ad spend.', features: ['Google Ads OR Meta', 'Conversion tracking setup', 'Weekly bid management', 'Monthly reporting'], meridianPrice: '£390', marketPrice: '£650' },
      { name: 'Growth', priceRange: '£990–£1,650/mo', description: 'Multi-channel, up to £25k ad spend.', features: ['3 platforms', 'Server-side tracking', 'Landing page CRO', 'Fortnightly calls'], meridianPrice: '£990', marketPrice: '£1,650' },
      { name: 'Scale', priceRange: '£2,490–£4,150/mo', description: 'Enterprise, up to £150k ad spend.', features: ['All platforms + programmatic', 'Dedicated buyer', 'Custom MMM reporting', 'Creative production'], meridianPrice: '£2,490', marketPrice: '£4,150' },
    ],
    factors: [
      { title: 'Ad spend volume', description: 'Management fees scale with ad spend. More spend = more campaigns, ad groups, and keywords to manage.' },
      { title: 'Platform count', description: 'Managing Google + Meta + LinkedIn costs more than a single platform because each has different auction dynamics and creative requirements.' },
      { title: 'London CPC rates', description: 'Service-term CPCs in London are 30–50% above UK averages. "PPC agency London" can hit £35/click. Budget accordingly.' },
      { title: 'Tracking complexity', description: 'Server-side tracking, Conversions API, and enhanced conversions require specialist setup but dramatically improve optimisation.' },
    ],
    faqs: [
      { q: 'What is the minimum Google Ads budget for London?', a: '£2,000/month for long-tail terms. £4,000+/month for competitive hero terms. Below £2,000, auction-position decay makes sustained top-3 placement difficult.' },
      { q: 'How quickly will PPC generate leads?', a: 'Within 24–48 hours of campaign launch. PPC is the fastest channel for lead generation. Most clients see their first qualified lead within the first week.' },
      { q: 'Do I own the ad accounts?', a: 'Always. All accounts are created in your name. You retain full admin access. If we part ways, you keep everything.' },
    ],
  },
  {
    slug: 'web-design', service: 'Web Design',
    title: 'How Much Does Web Design Cost in London? 2026 Guide',
    metaTitle: 'Web Design Cost London 2026 | £1,950–£25,000+ | Meridian',
    metaDescription: 'London web design costs £1,950–£25,000+ in 2026. Brochure, lead-gen, eCommerce, bespoke. Platform comparison and what affects price.',
    keywords: ['how much does a website cost london', 'web design cost london', 'website cost uk 2026', 'how much does web design cost'],
    heroAnswer: 'A professional website in London costs between £1,950 and £25,000+ in 2026. Brochure sites start at £1,950, lead-gen at £4,990, eCommerce at £8,000, and bespoke platforms at £14,990+.',
    image: 'ux-ui-design',
    tiers: [
      { name: 'Lite (5 pages)', priceRange: '£1,950–£3,500', description: 'Brochure site for new businesses.', features: ['5 pages', 'Mobile-first responsive', 'Schema markup', 'Core Web Vitals optimised', '2-week delivery'], meridianPrice: '£1,950', marketPrice: '£3,250' },
      { name: 'Pro (10–15 pages)', priceRange: '£4,990–£8,500', description: 'Lead-gen site with CMS.', features: ['10–15 pages', 'Webflow or Next.js', 'CRO + A/B testing', 'Full schema + SEO', '4-week delivery'], meridianPrice: '£4,990', marketPrice: '£8,300' },
      { name: 'Custom', priceRange: '£14,990–£25,000+', description: 'Bespoke build with integrations.', features: ['Bespoke design + animations', 'Custom CMS + multi-language', 'CRM integrations', 'Top 4% UK performance', '8–12 week delivery'], meridianPrice: '£14,990', marketPrice: '£24,990' },
    ],
    factors: [
      { title: 'Page count', description: 'More pages = more design, more content, more development time. A 5-page brochure and a 50-page content hub are very different projects.' },
      { title: 'Custom vs template', description: 'Bespoke design adds £2,000–£8,000 vs a customised template. Worth it for brands where design differentiation matters.' },
      { title: 'Platform choice', description: 'Webflow: best for marketing sites. Next.js: best for performance. Shopify: best for eCommerce. WordPress: best for content-heavy.' },
      { title: 'Content creation', description: 'If you don\'t have copy, photography, and video, budget an extra £1,500–£4,000 for content production.' },
    ],
    faqs: [
      { q: 'How much does a website cost in London?', a: 'Brochure: £1,950–£3,500. Lead-gen: £4,990–£8,500. eCommerce: £8,000–£25,000. Bespoke: £14,990+. Meridian prices all projects 40% below market.' },
      { q: 'Which platform should I use?', a: 'Marketing site: Webflow or Next.js. eCommerce: Shopify. Content-heavy: WordPress headless. We help you decide in the discovery call.' },
      { q: 'How long does a website take to build?', a: 'Brochure: 2 weeks. Lead-gen: 4 weeks. eCommerce: 6–12 weeks. Bespoke: 8–16 weeks.' },
    ],
  },
  {
    slug: 'app-development', service: 'App Development',
    title: 'How Much Does App Development Cost in London? 2026 Guide',
    metaTitle: 'App Development Cost London 2026 | £9,990–£80,000+ | Meridian',
    metaDescription: 'London app development costs £9,990–£80,000+ in 2026. MVP, cross-platform, native. What affects price and how to save 40%.',
    keywords: ['how much does it cost to build an app london', 'app development cost london', 'app development cost uk 2026'],
    heroAnswer: 'Building an app in London costs between £9,990 and £80,000+ in 2026. A cross-platform MVP starts at £9,990, a full production app at £24,990, and enterprise native builds at £49,950+.',
    image: 'web-hosting-domain',
    tiers: [
      { name: 'MVP Lite', priceRange: '£9,990–£16,650', description: 'Single platform for validation.', features: ['iOS or Android', 'Flutter or React Native', '6 core screens', 'Auth + payments', '8-week delivery'], meridianPrice: '£9,990', marketPrice: '£16,650' },
      { name: 'MVP', priceRange: '£24,990–£41,650', description: 'Cross-platform production app.', features: ['iOS + Android', '15 core screens', 'Backend API', 'App Store + Play Store', '12-week delivery'], meridianPrice: '£24,990', marketPrice: '£41,650' },
      { name: 'Platform', priceRange: '£49,950–£133,000+', description: 'Enterprise native with compliance.', features: ['Native Swift + Kotlin', 'Custom backend', 'FCA/PCI-DSS/NHS DSP', 'Admin dashboard', '16–24 week delivery'], meridianPrice: '£49,950', marketPrice: '£133,300' },
    ],
    factors: [
      { title: 'Native vs cross-platform', description: 'Building native iOS + Android separately costs ~40% more than cross-platform (Flutter/React Native) but delivers better performance for demanding apps.' },
      { title: 'Compliance requirements', description: 'FCA, PCI-DSS, and NHS DSP compliance add 20–30% to development cost due to security controls, audit trails, and penetration testing.' },
      { title: 'Backend complexity', description: 'A simple Firebase backend is much cheaper than a custom API with real-time features, multi-tenancy, and complex business logic.' },
      { title: 'Post-launch support', description: 'Budget for ongoing maintenance (£1,200+/month) — OS updates, bug fixes, and feature iterations are not optional for live apps.' },
    ],
    faqs: [
      { q: 'How much does an app cost in London?', a: 'MVP: £9,990–£25,000. Production app: £25,000–£50,000. Enterprise platform: £50,000+. Meridian prices 40% below London market average.' },
      { q: 'How long does app development take?', a: 'MVP Lite: 8 weeks. Full MVP: 12 weeks. Enterprise: 16–24 weeks. We run weekly sprints with stakeholder demos.' },
      { q: 'Flutter or React Native?', a: 'Flutter for most new MVPs — better UI control, identical cross-platform output. React Native if your team is JavaScript-first.' },
    ],
  },
  {
    slug: 'social-media', service: 'Social Media',
    title: 'How Much Does Social Media Management Cost in London? 2026',
    metaTitle: 'Social Media Management Cost London 2026 | Meridian',
    metaDescription: 'London social media management costs £490–£5,800/month in 2026. What\'s included, platform pricing, and 40% below market rates.',
    keywords: ['social media management cost london', 'social media agency cost london', 'how much does social media management cost uk'],
    heroAnswer: 'Social media management in London costs £490–£5,800 per month in 2026. Single-platform starts at £490/month, multi-channel with content production at £1,490/month, and enterprise with influencer programmes at £3,490/month.',
    image: 'social-media-management',
    tiers: [
      { name: 'Starter', priceRange: '£490–£820/mo', description: 'Single platform, 12 posts/month.', features: ['1 platform', '12 organic posts/month', 'Content calendar', 'Monthly report'], meridianPrice: '£490', marketPrice: '£820' },
      { name: 'Growth', priceRange: '£1,490–£2,500/mo', description: '2 platforms with video content.', features: ['2 platforms + video', '20 posts + 4 videos/month', 'Paid social management', 'LinkedIn ghostwriting'], meridianPrice: '£1,490', marketPrice: '£2,500' },
      { name: 'Scale', priceRange: '£3,490–£5,800/mo', description: '4 platforms, dedicated team.', features: ['4 platforms', 'Unlimited posts', 'Dedicated social lead', 'Influencer + UGC'], meridianPrice: '£3,490', marketPrice: '£5,800' },
    ],
    factors: [
      { title: 'Platform count', description: 'One platform done well beats four done badly. Each additional platform roughly doubles content production requirements.' },
      { title: 'Content production', description: 'Photography, video, and motion design are the biggest cost drivers. In-house production is 2–3x cheaper than outsourcing per-piece.' },
      { title: 'Paid social inclusion', description: 'Organic-only management is cheaper but slower. Adding paid social management (Meta Ads, LinkedIn Ads) increases fees but accelerates growth.' },
      { title: 'Influencer programmes', description: 'Managing influencer and UGC programmes adds £500–£2,000/month depending on scale and number of creators.' },
    ],
    faqs: [
      { q: 'How much does a social media manager cost in London?', a: 'Freelance: £300–£800/month for basic management. Agency: £490–£5,800/month depending on platforms and scope. In-house: £35–£55k salary.' },
      { q: 'Which platform should my brand be on?', a: 'B2B: LinkedIn + selective YouTube. Consumer: Instagram + TikTok. Local business: Instagram + Google Business Profile. We recommend 1–2 done well over 5 done badly.' },
      { q: 'Do you produce content yourselves?', a: 'Yes. In-house photography, video, and motion production. We don\'t outsource to junior creators.' },
    ],
  },
  {
    slug: 'branding', service: 'Branding',
    title: 'How Much Does Branding Cost in London? Logo & Identity 2026',
    metaTitle: 'Branding & Logo Design Cost London 2026 | Meridian',
    metaDescription: 'London branding costs £1,990–£24,990+ in 2026. Logo design, full identity, enterprise rebrand. What affects price and how to save 40%.',
    keywords: ['branding cost london', 'logo design cost london', 'how much does branding cost uk', 'branding agency cost'],
    heroAnswer: 'Branding in London costs £1,990–£24,990+ in 2026. A logo + identity sprint starts at £1,990, full identity systems at £4,990, and enterprise rebrands at £14,990+.',
    image: 'branding-strategy',
    tiers: [
      { name: 'Sprint', priceRange: '£1,990–£3,320', description: 'Logo + basic identity for startups.', features: ['Brand workshop (2h)', 'Logo (3 directions)', 'Colour + typography', 'Basic guidelines (8-page)', '2-week delivery'], meridianPrice: '£1,990', marketPrice: '£3,320' },
      { name: 'Full Identity', priceRange: '£4,990–£8,300', description: 'Complete identity system.', features: ['Full-day strategy workshop', 'Logo system + variations', 'Visual language', 'Guidelines (40-page)', '4-week delivery'], meridianPrice: '£4,990', marketPrice: '£8,300' },
      { name: 'Rebrand', priceRange: '£14,990–£24,990+', description: 'Enterprise rebrand with rollout.', features: ['Brand audit + research', 'Stakeholder interviews', 'Naming exploration', 'Complete identity', 'Rollout plan + migration'], meridianPrice: '£14,990', marketPrice: '£24,990' },
    ],
    factors: [
      { title: 'Scope of work', description: 'A logo-only project is much cheaper than a full brand strategy + identity + guidelines + rollout programme.' },
      { title: 'Naming', description: 'If naming is included, add £2,000–£5,000 for research, trademark searching, and domain availability analysis.' },
      { title: 'Stakeholder complexity', description: 'Enterprise rebrands with board approval, multiple departments, and legacy systems require more rounds of revision and stakeholder management.' },
      { title: 'Asset production', description: 'Templates, social assets, email signatures, stationery, signage — each additional deliverable adds cost.' },
    ],
    faqs: [
      { q: 'How much does a logo cost in London?', a: 'Freelance: £500–£2,000. Agency sprint (logo + basic identity): £1,990–£3,500. Full identity: £4,990+. Meridian prices 40% below market.' },
      { q: 'How long does branding take?', a: 'Sprint: 2 weeks. Full identity: 4 weeks. Rebrand: 10+ weeks. Enterprise with naming: 12–20 weeks.' },
      { q: 'Do you do logo-only projects?', a: 'Rarely. A logo without strategy is just a sticker. We always recommend at least the Sprint tier which includes positioning.' },
    ],
  },
  {
    slug: 'business-plan', service: 'Business Plan',
    title: 'How Much Does a Business Plan Cost in London? 2026 Guide',
    metaTitle: 'Business Plan Writer Cost London 2026 | Visa, Investor, Bank | Meridian',
    metaDescription: 'London business plan writing costs £590–£4,150+ in 2026. Innovator Founder visa, investor decks, bank loans. From £590.',
    keywords: ['business plan cost london', 'business plan writer cost uk', 'how much does a business plan cost', 'innovator visa business plan cost'],
    heroAnswer: 'Business plan writing in London costs £590–£4,150+ in 2026. Grant/accelerator plans from £590, Innovator Founder visa plans from £1,090, and investor-ready plans with pitch deck from £2,490.',
    image: 'branding-strategy',
    tiers: [
      { name: 'Starter', priceRange: '£590–£990', description: 'Lean plan for grants and accelerators.', features: ['12-page lean plan', 'Market analysis', '3-year financials', 'Executive summary', '7-day delivery'], meridianPrice: '£590', marketPrice: '£990' },
      { name: 'Visa', priceRange: '£1,090–£1,820', description: 'Innovator Founder visa, approval-ready.', features: ['30-page plan', 'Endorsing-body criteria mapped', '5-year financials', 'Innovation narrative', '10-day delivery'], meridianPrice: '£1,090', marketPrice: '£1,820' },
      { name: 'Investor', priceRange: '£2,490–£4,150', description: 'Investor plan + pitch deck + model.', features: ['40-page plan', '15-slide pitch deck', '3-statement financial model', 'Pitch coaching session', '14-day delivery'], meridianPrice: '£2,490', marketPrice: '£4,150' },
    ],
    factors: [
      { title: 'Plan type', description: 'An Innovator Founder visa plan has specific endorsing-body criteria that must be explicitly addressed — this is more complex than a standard bank loan plan.' },
      { title: 'Financial complexity', description: 'A simple 3-year P&L forecast is much cheaper than a full 3-statement model with scenario analysis and cap table.' },
      { title: 'Pitch deck inclusion', description: 'Adding a 15-slide investor pitch deck adds £800–£1,500 to the project but is essential for fundraising.' },
      { title: 'Research depth', description: 'Plans with primary market research, customer interviews, and competitor analysis cost more than desk-research-only plans.' },
    ],
    faqs: [
      { q: 'How much does a business plan cost in London?', a: 'Grant/accelerator: from £590. Innovator visa: from £1,090. Investor-ready with deck: from £2,490. Meridian prices 40% below market.' },
      { q: 'Will the plan be approved by an endorsing body?', a: 'We\'ve written plans approved by all major Innovator Founder visa endorsing bodies. We map criteria explicitly and revise until approved.' },
      { q: 'How quickly can you deliver?', a: 'Starter: 7 days. Visa: 10 days. Investor: 14 days. Rush delivery (50% surcharge) available for urgent deadlines.' },
    ],
  },
];

export const ALL_COST_SLUGS = COST_PAGES.map(c => c.slug);

export function getCostPage(slug: string): CostPage | undefined {
  return COST_PAGES.find(c => c.slug === slug);
}
