/**
 * Comparison page data — "X vs Y" pages targeting commercial investigation keywords.
 * These target high-value "vs" queries with 200-2,000+ MSV.
 */

export type Comparison = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  optionA: { name: string; pros: string[]; cons: string[]; bestFor: string };
  optionB: { name: string; pros: string[]; cons: string[]; bestFor: string };
  verdict: string;
  faqs: Array<{ q: string; a: string }>;
};

export const COMPARISONS: Comparison[] = [
  {
    slug: 'seo-vs-ppc',
    title: 'SEO vs PPC: Which Should London Businesses Choose in 2026?',
    metaTitle: 'SEO vs PPC for London Businesses | Which Delivers Better ROI? | Meridian',
    metaDescription: 'SEO vs PPC comparison for London businesses. When to invest in organic, when to go paid, and how to combine both for maximum ROI. Expert analysis.',
    keywords: ['seo vs ppc', 'seo or ppc', 'seo vs google ads', 'organic vs paid search london'],
    intro: 'The short answer: you need both. The long answer depends on your timeline, budget, and competitive landscape. Here\'s how to think about it for London businesses in 2026.',
    optionA: { name: 'SEO', pros: ['Compounding returns — traffic grows month-on-month', 'Lower long-term cost per acquisition', 'Builds brand authority and trust', 'Captures AI Overview and ChatGPT citations', '24/7 visibility without daily spend'], cons: ['Takes 4–6 months for meaningful results', 'Requires continuous investment in content', 'Algorithm updates create short-term volatility', 'Harder to target specific landing pages'], bestFor: 'Businesses building for the long term who want compounding organic growth and AI citation visibility' },
    optionB: { name: 'PPC', pros: ['Instant visibility — live in 24 hours', 'Precise targeting by keyword, location, audience', 'Full control over landing page experience', 'Easy to test offers, pricing, copy', 'Measurable down to the penny'], cons: ['Traffic stops when budget stops', 'London CPCs are among the highest in the world (£12–£35 for service terms)', 'Click fraud is a real risk without proper setup', 'Diminishing returns without constant optimisation'], bestFor: 'Businesses needing immediate leads, testing new markets, or with seasonal demand spikes' },
    verdict: 'For most London businesses, the optimal strategy is: run PPC immediately for bottom-funnel transactional terms (instant lead flow), while investing in SEO for the medium and long term (compounding organic growth). After 6–12 months of SEO, organic traffic replaces paid traffic on your highest-value terms — and your PPC budget can shift to new keyword verticals.',
    faqs: [
      { q: 'Which has better ROI — SEO or PPC?', a: 'SEO has better ROI at 12+ months. PPC has better ROI in months 1–3. The optimal approach is both in parallel.' },
      { q: 'How much does SEO cost vs PPC in London?', a: 'SEO retainers start at £490/month. PPC management starts at £390/month + ad spend (minimum £2,000–£4,000/month for London).' },
      { q: 'Can I stop PPC once SEO is working?', a: 'Partially. Most clients reduce PPC spend by 40–60% once organic rankings compound, then reallocate to new keyword verticals.' },
    ],
  },
  {
    slug: 'shopify-vs-woocommerce',
    title: 'Shopify vs WooCommerce: Which Is Better for London eCommerce in 2026?',
    metaTitle: 'Shopify vs WooCommerce London | Expert Comparison 2026 | Meridian',
    metaDescription: 'Shopify vs WooCommerce comparison for London eCommerce businesses. Pricing, performance, SEO, scalability. Expert analysis from a London agency.',
    keywords: ['shopify vs woocommerce', 'shopify or woocommerce', 'best ecommerce platform london', 'shopify vs woocommerce uk'],
    intro: 'Shopify wins for most London eCommerce businesses in 2026. WooCommerce still has a place for specific use cases. Here\'s the full breakdown.',
    optionA: { name: 'Shopify', pros: ['Hosted — no server management', 'Best-in-class checkout conversion rate', 'Shopify Payments eliminates gateway fees', 'App ecosystem covers 95% of needs', 'Shopify Plus for enterprise (B2B, Markets, checkout extensibility)'], cons: ['Monthly platform fee (£25–£2,000/month)', 'Liquid templating is limiting for custom logic', 'Transaction fees if not using Shopify Payments', 'Less control over hosting and infrastructure'], bestFor: 'Most eCommerce businesses up to £10M revenue, especially those who want to focus on marketing not infrastructure' },
    optionB: { name: 'WooCommerce', pros: ['Free core software (WordPress plugin)', 'Unlimited customisation (PHP + React)', 'No platform transaction fees', 'Own your hosting and data completely', 'Huge developer ecosystem'], cons: ['Hosting, security, and updates are your responsibility', 'Slower out of the box — needs performance work', 'Plugin conflicts are common', 'Checkout experience requires significant customisation'], bestFor: 'Developers who want full control, businesses with complex custom requirements, or those already invested in WordPress' },
    verdict: 'For 80% of London eCommerce businesses, Shopify is the right choice in 2026. It\'s faster to launch, easier to maintain, and has the best checkout conversion rate in the industry. Choose WooCommerce only if you need deep custom functionality that Shopify can\'t support, or if your team has strong WordPress development capability.',
    faqs: [
      { q: 'Which is cheaper?', a: 'WooCommerce has lower platform costs but higher development and maintenance costs. Total cost of ownership is usually similar for stores doing £100k–£1M revenue.' },
      { q: 'Which is better for SEO?', a: 'Both are capable. Shopify has improved dramatically since 2024. WooCommerce offers more granular control. We rank sites on both platforms.' },
      { q: 'Can you migrate us from WooCommerce to Shopify?', a: 'Yes. Full migration including products, customers, orders, URL redirects, and SEO preservation. Typical timeline: 4–6 weeks.' },
    ],
  },
  {
    slug: 'webflow-vs-wordpress',
    title: 'Webflow vs WordPress: Which Is Better for London Businesses in 2026?',
    metaTitle: 'Webflow vs WordPress London | Expert Comparison 2026 | Meridian',
    metaDescription: 'Webflow vs WordPress comparison for London businesses. Design, CMS, performance, SEO, cost. Expert analysis.',
    keywords: ['webflow vs wordpress', 'webflow or wordpress', 'best cms london', 'webflow vs wordpress 2026'],
    intro: 'Webflow for marketing sites. WordPress for content-heavy sites with many editors. Next.js for performance-critical builds. Here\'s when to use which.',
    optionA: { name: 'Webflow', pros: ['Visual builder — marketers can edit without developers', 'Beautiful out-of-the-box templates and interactions', 'Built-in hosting with global CDN', 'Clean code output, fast load times', 'No plugin dependency or security patches'], cons: ['Monthly hosting fee (£12–£36/month)', 'CMS has limitations for complex data structures', 'eCommerce is basic compared to Shopify', 'Smaller developer ecosystem than WordPress'], bestFor: 'Marketing sites for SMEs where the marketing team needs to edit content independently' },
    optionB: { name: 'WordPress', pros: ['Largest CMS market share — 43% of all websites', 'Massive plugin ecosystem (60,000+ plugins)', 'Highly customisable with themes and custom development', 'Strong for blogs, magazines, and content-heavy sites', 'Large developer pool'], cons: ['Requires regular security updates and maintenance', 'Plugin bloat slows performance', 'Design quality depends entirely on the developer', 'Hosting quality varies dramatically'], bestFor: 'Content-heavy sites with multiple editors, membership sites, or businesses already invested in the WordPress ecosystem' },
    verdict: 'For a typical London SME marketing site (5–15 pages), Webflow delivers better design quality, faster load times, and lower maintenance overhead. For a content-heavy site with 100+ pages and multiple editors, WordPress headless (with a modern frontend) is more flexible. For performance-critical sites, we recommend Next.js.',
    faqs: [
      { q: 'Which is better for SEO?', a: 'Both are capable. Webflow generates cleaner HTML. WordPress has more SEO plugins (Yoast, RankMath). We rank sites on both.' },
      { q: 'How much does a Webflow site cost vs WordPress?', a: 'Similar build costs. Webflow has lower ongoing maintenance (no security patches). WordPress hosting + maintenance typically costs £50–£200/month.' },
      { q: 'Can you migrate us from WordPress to Webflow?', a: 'Yes. Full migration including content, URL redirects, and SEO preservation. 2–4 weeks for most sites.' },
    ],
  },
  {
    slug: 'flutter-vs-react-native',
    title: 'Flutter vs React Native: Which Is Better for London App Development in 2026?',
    metaTitle: 'Flutter vs React Native London | App Dev Comparison 2026 | Meridian',
    metaDescription: 'Flutter vs React Native comparison for London app development. Performance, cost, ecosystem. Expert analysis from London app developers.',
    keywords: ['flutter vs react native', 'flutter or react native', 'cross platform app london', 'flutter vs react native 2026'],
    intro: 'Flutter for most new projects. React Native if your team is already JavaScript-heavy. Here\'s the detailed comparison from 47 apps shipped.',
    optionA: { name: 'Flutter', pros: ['Single codebase for iOS, Android, and web', 'Hot reload for rapid development', 'Pixel-perfect UI control with custom rendering', 'Growing enterprise adoption (Google, BMW, Toyota)', 'Dart is easy to learn for most developers'], cons: ['Smaller talent pool than React Native', 'Dart is less mainstream than JavaScript', 'App size slightly larger than native', 'Web support still maturing'], bestFor: 'Most new cross-platform MVPs, especially where pixel-perfect design matters' },
    optionB: { name: 'React Native', pros: ['JavaScript/TypeScript — largest developer talent pool', 'Massive ecosystem of third-party libraries', 'Strong for companies already using React on web', 'Meta maintains it actively', 'New Architecture (Fabric) has closed the performance gap'], cons: ['Bridge architecture can cause performance issues (improving with New Architecture)', 'Native module dependency for complex features', 'iOS and Android styling divergence', 'Upgrade path between versions can be painful'], bestFor: 'Teams already strong in JavaScript/React, or projects where web + mobile code sharing is important' },
    verdict: 'For most London startups building their first cross-platform MVP in 2026, we recommend Flutter. The developer experience is better, the UI control is more precise, and the "it works on both platforms identically" promise is more consistently delivered. Choose React Native if your engineering team is JavaScript-first and you want code sharing with a React web app.',
    faqs: [
      { q: 'Which is faster to develop?', a: 'Similar development speed. Flutter has slight edge for UI-heavy apps. React Native has edge if you\'re already using React on web.' },
      { q: 'Which has better performance?', a: 'Flutter compiles to native ARM code. React Native New Architecture (2024+) has closed the gap. Both are fast enough for 95% of apps.' },
      { q: 'How much does cross-platform cost vs native?', a: 'Cross-platform (Flutter/React Native) is typically 40–50% cheaper than building native iOS + Android separately.' },
    ],
  },
  {
    slug: 'agency-vs-freelancer',
    title: 'Agency vs Freelancer: Which Is Better for London Digital Marketing in 2026?',
    metaTitle: 'Agency vs Freelancer London | Which Delivers Better Results? | Meridian',
    metaDescription: 'Agency vs freelancer comparison for London digital marketing. Cost, quality, reliability, accountability. Expert analysis.',
    keywords: ['agency vs freelancer', 'digital marketing agency or freelancer', 'hire agency or freelancer london'],
    intro: 'Both have their place. Here\'s when to hire an agency, when a freelancer makes more sense, and the specific tradeoffs London businesses should consider.',
    optionA: { name: 'Agency', pros: ['Team depth — specialists across SEO, PPC, design, dev', 'Business continuity — not dependent on one person', 'Structured processes and reporting', 'Accountability — contracts, SLAs, escalation paths', 'Broader perspective from working across industries'], cons: ['Higher cost (£2,000–£10,000+/month for retainers)', 'Potential for junior staff doing the actual work', 'Longer onboarding and communication overhead', 'May be less flexible on scope changes'], bestFor: 'Businesses spending £3,000+/month on marketing who need reliability, breadth of expertise, and accountability' },
    optionB: { name: 'Freelancer', pros: ['Lower cost (typically 30–50% less than agency rates)', 'Direct relationship — you talk to the person doing the work', 'Faster turnaround for small projects', 'More flexible on scope and working hours', 'Deep specialist knowledge in their niche'], cons: ['Single point of failure — illness, holiday, other clients', 'Limited breadth — great at one thing, not everything', 'Less structured reporting and process', 'Harder to scale as your needs grow', 'Quality varies enormously'], bestFor: 'Early-stage businesses with specific, well-defined needs and budget under £2,000/month' },
    verdict: 'For London businesses serious about growth, an agency provides the breadth, reliability, and accountability that a freelancer typically can\'t. For specific, well-defined projects (a one-off website, a logo design, a single PPC campaign), a good freelancer can be excellent value. Meridian offers both: agency-level breadth at pricing that competes with freelancer rates (40% below London agency averages).',
    faqs: [
      { q: 'How much cheaper is a freelancer?', a: 'Freelance SEO: £50–£100/hour. Agency SEO: effectively £60–£150/hour depending on tier. But agencies bundle more scope per hour.' },
      { q: 'Can I start with a freelancer and switch to an agency later?', a: 'Yes, but expect some rework. Freelancers often build systems specific to their workflow that agencies need to rebuild.' },
      { q: 'Does Meridian compete on price with freelancers?', a: 'Our Starter tiers (from £390/month) are comparable to freelancer rates but with agency-level reporting and process.' },
    ],
  },
];

export const ALL_COMPARISON_SLUGS = COMPARISONS.map(c => c.slug);

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find(c => c.slug === slug);
}
