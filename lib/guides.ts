/**
 * Guide/checklist data — targeting high-volume informational queries.
 * These are the AI citation builders — structured content for Featured Snippets
 * and AI Overview mentions.
 */

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  readTime: string;
  image: string;
  intro: string;
  sections: Array<{ heading: string; content: string }>;
  checklist?: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const GUIDES: Guide[] = [
  {
    slug: 'how-to-choose-web-design-agency',
    title: 'How to Choose a Web Design Agency: The Complete Checklist',
    metaTitle: 'How to Choose a Web Design Agency | 2026 Checklist | Meridian',
    metaDescription: 'Step-by-step guide to choosing a web design agency. 15-point checklist, red flags, questions to ask, and what to expect. Updated 2026.',
    keywords: ['how to choose a web design agency', 'web design agency checklist', 'choosing web designer london'],
    category: 'Web Design', readTime: '10 min', image: 'ux-ui-design',
    intro: 'The right web design agency will build you a fast, conversion-optimised site that ranks. The wrong one will burn your budget on a pretty site nobody visits. Here\'s how to tell the difference.',
    sections: [
      { heading: 'Start with their own website', content: 'If an agency\'s website is slow, poorly designed, or doesn\'t rank for its own keywords — that tells you everything. Run their site through PageSpeed Insights. If their LCP is above 3 seconds, they\'re not practising what they preach.' },
      { heading: 'Ask for case studies with metrics', content: 'Pretty screenshots aren\'t enough. Ask for: conversion rates before and after, Core Web Vitals scores, organic traffic growth, and revenue attribution. An agency that can\'t show these numbers isn\'t measuring the right things.' },
      { heading: 'Check their technical SEO knowledge', content: 'Your website is your #1 SEO asset. Ask: do you implement schema markup? What\'s your approach to Core Web Vitals? Do you use responsive images (AVIF/WebP)? Do you build with AI Overview optimisation in mind? If they look blank, walk away.' },
      { heading: 'Understand the platform recommendation', content: 'A good agency recommends the platform based on your needs, not what they like building in. Webflow for marketing sites, Shopify for eCommerce, Next.js for performance-critical builds, WordPress for content-heavy sites. Be wary of agencies that only build on one platform.' },
      { heading: 'Verify you own everything', content: 'You must own the domain, hosting account, CMS login, code repository, analytics, and ad accounts. Any agency that builds on their infrastructure is creating lock-in. Clarify this before signing anything.' },
    ],
    checklist: [
      'Their own website scores 90+ on PageSpeed Insights (mobile)',
      'Case studies include real metrics: conversion rates, traffic, revenue',
      'They implement schema markup and structured data as standard',
      'Platform recommendation is based on your needs, not their preference',
      'You own the domain, hosting, CMS, code, and all accounts',
      'Core Web Vitals targets are contractually committed (LCP < 2.5s)',
      'Responsive images (AVIF/WebP with srcset) are standard practice',
      'Post-launch support window is included (minimum 30 days)',
      'They provide training on the CMS for your team',
      'Pricing is transparent and published, not "contact for quote"',
      'No lock-in contracts beyond reasonable project scope',
      'They understand AI Overview / GEO optimisation',
      'Mobile-first design is default, not an add-on',
      'Accessibility (WCAG 2.1 AA) is addressed',
      'Timeline and milestones are clearly defined upfront',
    ],
    faqs: [
      { q: 'How do I choose between agencies?', a: 'Run their site through PageSpeed Insights, ask for case studies with revenue attribution, and verify you own all deliverables. The agency that scores highest on these three criteria is usually the right choice.' },
      { q: 'Should I choose the cheapest agency?', a: 'No. A cheap website that doesn\'t convert or rank costs more in the long run. Compare scope, not just price. Meridian is 40% below London market average — that\'s good value, not cheap.' },
      { q: 'How long should a web design project take?', a: 'Brochure site: 2–4 weeks. Lead-gen: 4–6 weeks. eCommerce: 6–12 weeks. Any agency quoting more than double these timelines is either padding or understaffed.' },
    ],
  },
  {
    slug: 'how-to-choose-seo-agency',
    title: 'How to Choose an SEO Agency: 12 Questions to Ask',
    metaTitle: 'How to Choose an SEO Agency UK | 12 Questions | Meridian',
    metaDescription: 'How to vet SEO agencies in 2026. 12 essential questions, red flags, what to look for in contracts, and how to evaluate results.',
    keywords: ['how to choose an seo agency uk', 'seo agency checklist', 'how to vet seo agency'],
    category: 'SEO', readTime: '9 min', image: 'seo-search-optimisation',
    intro: 'Most SEO agencies sell rankings. The good ones sell revenue attribution. Here are 12 questions that separate the two — and the answers you should expect.',
    sections: [
      { heading: 'Do you guarantee rankings?', content: 'The right answer is NO. No reputable agency guarantees specific rankings because Google\'s algorithm is not within their control. What they should guarantee: transparent process, consistent effort, measurable reporting, and demonstrated average outcomes across their client base.' },
      { heading: 'How do you measure success?', content: 'The right answer: revenue and leads, not just traffic. A good agency attributes organic revenue, tracks cost per organic lead, and reports against commercial keywords — not vanity metrics like total impressions or clicks on blog posts that don\'t convert.' },
      { heading: 'What\'s your approach to AI Overviews?', content: 'In 2026, 25–35% of commercial queries show AI Overviews. An agency that doesn\'t mention GEO (Generative Engine Optimisation) or AEO (Answer Engine Optimisation) is already behind. Ask how they get brands cited in AI-generated results.' },
      { heading: 'Who does the actual work?', content: 'Ask whether you\'ll work with senior strategists or junior account managers. Many agencies sell with senior staff then hand off to graduates. Clarify who does the technical work, who writes the content, and who runs your fortnightly calls.' },
      { heading: 'Can I see client retention rates?', content: 'Client retention is the single best proxy for agency quality. Ask for their 12-month and 24-month retention rates. Anything below 70% at 12 months is a red flag. Meridian\'s is 94% at 24 months.' },
    ],
    checklist: [
      'No ranking guarantees (process and effort guarantees instead)',
      'Reports on revenue and leads, not just traffic',
      'GEO/AEO strategy for AI Overviews and ChatGPT citations',
      'Named senior strategist on your account (not rotating juniors)',
      'Client retention rate above 70% at 12 months',
      'Content production included (not outsourced to content mills)',
      'Link building from authoritative UK sources (.gov.uk, .ac.uk)',
      'Technical SEO covers Core Web Vitals, schema, mobile-first',
      'Transparent pricing published on their website',
      'You own all content, backlinks, and work product if you leave',
      'Fortnightly calls minimum (weekly for enterprise)',
      'Real-time dashboard with revenue attribution',
    ],
    faqs: [
      { q: 'How much should SEO cost in London?', a: 'Starter: £490–£800/month. Growth: £1,200–£2,500/month. Scale: £3,000–£5,800/month. Meridian prices all tiers 40% below market.' },
      { q: 'How long does SEO take to work?', a: 'Borough-level keywords: 6–8 weeks. Competitive London terms: 4–6 months. Full ROI: 9–12 months. The fastest wins come from technical fixes.' },
      { q: 'What\'s the difference between SEO and GEO?', a: 'SEO gets you ranked in Google. GEO gets you cited in AI-generated answers (Google AI Overviews, ChatGPT, Perplexity). Both matter in 2026.' },
    ],
  },
  {
    slug: 'how-to-write-business-plan-uk',
    title: 'How to Write a Business Plan UK: Step-by-Step Guide 2026',
    metaTitle: 'How to Write a Business Plan UK | Step-by-Step 2026 | Meridian',
    metaDescription: 'Complete guide to writing a UK business plan in 2026. Structure, financials, market analysis, and Innovator Founder visa requirements.',
    keywords: ['how to write a business plan uk', 'business plan template uk', 'business plan guide 2026'],
    category: 'Business Plans', readTime: '12 min', image: 'branding-strategy',
    intro: 'A good business plan does three things: proves the opportunity exists, proves you can capture it, and proves the numbers work. Here\'s how to write one that actually gets funded or approved.',
    sections: [
      { heading: 'Executive summary (write last)', content: 'The executive summary is the most important page — and it should be written last. In one page, it must answer: what does the business do, who does it serve, how does it make money, how big is the market, and what\'s the ask (funding, visa approval, loan). Investors read this first and decide whether to continue.' },
      { heading: 'Market analysis with UK-specific data', content: 'Use ONS, Companies House, IBISWorld, Statista, and Google Trends for UK market sizing. Show TAM (total addressable), SAM (serviceable addressable), and SOM (serviceable obtainable). For Innovator Founder visa plans, you must demonstrate UK-specific market opportunity.' },
      { heading: 'Financial projections that make sense', content: 'Three-year minimum (five-year for visa and investor plans). Include P&L, cash flow, and balance sheet. Revenue projections must be bottom-up (units × price), not top-down (% of market). Include assumptions documentation — investors will challenge every number.' },
      { heading: 'Innovator Founder visa: the three criteria', content: 'If writing for the Innovator Founder visa, explicitly map to: Innovation (what\'s genuinely new about your approach in the UK market), Viability (can this actually work — show customer evidence), and Scalability (how does this grow beyond the founder — hiring plan, market expansion).' },
      { heading: 'Common mistakes to avoid', content: 'Generic market analysis not specific to the UK. Financial projections with no assumptions. Failing to address all three visa criteria explicitly. No customer evidence (even one letter of intent helps). Confusing "innovative" with "high-tech" — a novel business model is equally valid.' },
    ],
    checklist: [
      'Executive summary written last, one page maximum',
      'Market analysis uses UK-specific data sources (ONS, Companies House)',
      'TAM, SAM, SOM clearly defined with methodology',
      'Financial projections are bottom-up (units × price)',
      '3-year P&L, cash flow, and balance sheet included',
      'All assumptions documented and defensible',
      'Customer evidence included (letters of intent, pilot data, pre-orders)',
      'Competitor analysis covers at least 5 UK competitors',
      'Go-to-market strategy has specific channels and timelines',
      'Team section shows relevant experience for each role',
      'Risk analysis covers top 5 risks with specific mitigations',
      'For visa: Innovation, Viability, Scalability explicitly addressed',
    ],
    faqs: [
      { q: 'How long should a business plan be?', a: 'Grant/accelerator: 10–15 pages. Innovator Founder visa: 25–35 pages. Investor-ready: 35–50 pages. Longer is not better — every page must earn its place.' },
      { q: 'Can I write it myself?', a: 'Yes, if you have the financial modelling skills and understand what endorsing bodies or investors look for. Professional writers (from £590) ensure you don\'t miss criteria.' },
      { q: 'How much does a professional business plan cost?', a: 'London rates: £590–£4,150. Meridian prices: £590 (starter), £1,090 (visa), £2,490 (investor with deck). 40% below market.' },
    ],
  },
  {
    slug: 'instagram-growth-strategy-2026',
    title: 'How to Grow on Instagram in 2026: London Business Guide',
    metaTitle: 'How to Grow on Instagram 2026 | Strategy Guide for London | Meridian',
    metaDescription: 'Instagram growth strategy for London businesses in 2026. Algorithm changes, Reels strategy, hashtag updates, and what actually works now.',
    keywords: ['how to grow on instagram 2026', 'instagram growth strategy', 'instagram marketing london'],
    category: 'Social Media', readTime: '8 min', image: 'social-media-management',
    intro: 'Instagram\'s algorithm in 2026 rewards original content, Reels, and genuine engagement over follower count. Here\'s what actually works for London businesses right now.',
    sections: [
      { heading: 'Reels are still king (but quality matters more)', content: 'Short-form video accounts for 60%+ of Instagram reach in 2026. But the bar has risen — low-effort trending audio clips no longer get algorithmic boost. What works: original hooks in the first 1.5 seconds, educational or entertaining content specific to your niche, and vertical video shot natively (not repurposed horizontal footage).' },
      { heading: 'Carousels for saves (the new engagement metric)', content: 'Saves are weighted 3–5x higher than likes in the 2026 algorithm. Carousels drive more saves than any other format. Structure: bold statement on slide 1, value delivery on slides 2–8, CTA on the final slide. Educational carousels and "save this for later" formats consistently outperform.' },
      { heading: 'DM strategy over follower count', content: 'Instagram now weights DM conversations as a top engagement signal. Businesses with active DM conversations see 2–3x higher reach. Prompt DMs in your CTAs, use Instagram Broadcast Channels, and respond within 1 hour during business hours.' },
      { heading: 'London-specific strategies', content: 'Geotag every post to your borough (Shoreditch, Mayfair, etc.) — it significantly boosts local discovery. Collaborate with other London businesses via Collab posts. Engage with local community hashtags. London audiences respond well to behind-the-scenes content showing real London life, not polished studio content.' },
      { heading: 'What doesn\'t work anymore', content: 'Follow/unfollow (shadowban risk). Buying followers (engagement rate tanks). Generic hashtag spam. Posting without Reels. Inconsistent posting cadence. Pod groups (detectable and penalised). Overuse of link stickers without context.' },
    ],
    faqs: [
      { q: 'How often should a London business post on Instagram?', a: '4–5 Reels per week, 2–3 carousels, 3–5 stories daily. Consistency matters more than volume. Better to post 3 quality pieces than 7 mediocre ones.' },
      { q: 'Do hashtags still work in 2026?', a: 'Yes, but differently. Use 5–8 specific, niche hashtags (not generic ones). Location hashtags (#Shoreditch, #LondonBusiness) are particularly effective for local discovery.' },
      { q: 'Should I use a social media agency?', a: 'If you can\'t produce 4–5 quality Reels per week in-house, yes. In-house is cheaper but agencies bring content production capability and strategy. Meridian\'s social management starts at £490/month.' },
    ],
  },
  {
    slug: 'what-is-fractional-cmo',
    title: 'What is a Fractional CMO? London Guide 2026',
    metaTitle: 'What is a Fractional CMO? | London Guide 2026 | Meridian',
    metaDescription: 'Fractional CMO explained: what they do, when to hire one, what to pay, and how it compares to an agency or full-time hire. London focus.',
    keywords: ['what is a fractional cmo', 'fractional cmo london', 'fractional cmo cost'],
    category: 'Marketing', readTime: '7 min', image: 'digital-marketing-team',
    intro: 'A fractional CMO gives you senior marketing leadership at a fraction of the cost of a full-time hire. Here\'s when it makes sense, what to expect, and how it compares to an agency.',
    sections: [
      { heading: 'What a fractional CMO does', content: 'A fractional CMO works 1–3 days per week as your senior marketing leader. They set strategy, manage agency relationships, own the marketing budget, build the team, and report to the CEO/board. They don\'t write blog posts or manage ad accounts — they lead the people who do.' },
      { heading: 'When to hire one', content: 'You need a fractional CMO when: you\'re spending £5k+/month on marketing but nobody\'s owning the strategy, you\'re between full-time CMO hires, you\'re pre-Series A and can\'t justify a £120k+ salary, or your marketing is a collection of tactics without a coherent plan.' },
      { heading: 'Cost comparison', content: 'Full-time CMO in London: £100–£180k salary + equity + benefits. Fractional CMO: £3,000–£8,000/month for 1–3 days/week. Agency retainer: £2,000–£10,000/month depending on scope. A fractional CMO is typically 60–70% cheaper than a full-time hire.' },
      { heading: 'Fractional CMO vs agency', content: 'An agency executes. A fractional CMO leads. They\'re complementary, not competitive. The best setup for most London scale-ups: a fractional CMO to own strategy and manage vendors, plus an agency (like Meridian) to execute SEO, PPC, content, and creative.' },
      { heading: 'Red flags when hiring', content: 'They want to replace your agency instead of working with them. They can\'t show revenue attribution from previous roles. They\'ve never managed a budget above your spend level. They only want strategy — no willingness to get hands dirty in month 1.' },
    ],
    faqs: [
      { q: 'How much does a fractional CMO cost in London?', a: '£3,000–£8,000/month for 1–3 days per week. Senior operators with exit experience command the top end. Junior "fractional CMOs" (often just consultants) start around £2,000.' },
      { q: 'Do I need a fractional CMO or an agency?', a: 'If you have clear strategy but need execution: agency. If you need someone to own the strategy, budget, and vendor relationships: fractional CMO. Most businesses benefit from both.' },
      { q: 'How long do fractional CMO engagements last?', a: '6–18 months typically. Some evolve into full-time hires. Most end when the company hires a permanent CMO or the fractional has built the team and processes to run without them.' },
    ],
  },
];

export const ALL_GUIDE_SLUGS = GUIDES.map(g => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find(g => g.slug === slug);
}
