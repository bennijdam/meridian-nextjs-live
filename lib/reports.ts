/**
 * Annual market reports — link bait + AI citation magnets.
 * Comprehensive data pages updated annually.
 */

export type MarketStat = { num: string; label: string; source?: string };
export type MarketSection = { heading: string; content: string; stats?: MarketStat[] };

export type Report = {
  slug: string;
  year: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  image: string;
  date: string;
  summary: string;
  keyFindings: string[];
  sections: MarketSection[];
  methodology: string;
  faqs: Array<{ q: string; a: string }>;
};

export const REPORTS: Report[] = [
  {
    slug: 'london-digital-marketing-2026',
    year: 2026,
    title: 'The State of London Digital Marketing 2026',
    metaTitle: 'London Digital Marketing Report 2026 | Market Data & Statistics | Meridian',
    metaDescription: 'Comprehensive 2026 London digital marketing report. Agency pricing, CPC benchmarks, AI search impact, channel ROI, borough-level data. Free to read.',
    keywords: ['london digital marketing report 2026', 'london seo statistics 2026', 'digital marketing market london', 'london agency pricing report'],
    image: 'digital-marketing-team',
    date: '2026-04-17',
    summary: 'London\'s digital services market is the most competitive in the world. This report analyses pricing, demand, AI search disruption, and channel performance across all major service verticals — based on data from 200+ London client engagements and publicly available market benchmarks.',
    keyFindings: [
      'AI Overviews now appear on 25–35% of commercial-services queries in the UK, reducing organic CTR on #1 results by ~30%',
      '60% of Google searches end without a click; on AI Overview queries this rises to 80%+',
      'London service-keyword CPCs are 30–50% above UK averages due to agency density',
      'Mobile accounts for 70% of service-discovery searches in London — higher than UK average',
      'Borough-level keywords (KD 15–35) convert at 2–3x the rate of London-wide hero terms (KD 50+)',
      'The January demand peak (index 135) is the single most important month for agency new-business',
      'Businesses investing in GEO/AEO alongside traditional SEO see 40% higher citation rates in AI-generated results',
    ],
    sections: [
      {
        heading: 'Market size and competition',
        content: 'London has approximately 4,000+ digital agencies, the densest concentration in Europe. The market is segmented into: large global networks (WPP, Publicis, Dentsu), mid-market specialists (50–200 staff), boutique agencies (10–50 staff), and micro-agencies/freelancers. The boutique segment has grown fastest since 2023, driven by demand for senior-level attention and specialist depth that large networks struggle to deliver.',
        stats: [
          { num: '4,000+', label: 'Digital agencies in London', source: 'Companies House / Clutch' },
          { num: '£12.8B', label: 'UK digital advertising spend 2025', source: 'IAB UK / PwC' },
          { num: '~92%', label: 'Google UK search market share', source: 'Statcounter 2026' },
          { num: '3.5%', label: 'Bing UK market share (growing via Copilot)', source: 'Statcounter 2026' },
        ],
      },
      {
        heading: 'AI search disruption',
        content: 'The biggest structural shift in search since mobile-first indexing. Google AI Overviews now appear on roughly 25–35% of commercial-services queries in the UK. When they appear, organic CTR on the #1 result drops by approximately 30%. This has fundamentally changed the SEO value proposition: being cited in the AI answer is increasingly more valuable than ranking #1 below it. New disciplines — GEO (Generative Engine Optimisation) and AEO (Answer Engine Optimisation) — have emerged to address this shift.',
        stats: [
          { num: '25–35%', label: 'Commercial queries showing AI Overviews', source: 'Ahrefs / SEMrush SERP data' },
          { num: '~60%', label: 'Google searches ending without a click', source: 'SparkToro / Datos' },
          { num: '80%+', label: 'Zero-click rate on AI Overview queries', source: 'Ahrefs 2026' },
          { num: '30%', label: 'CTR reduction on #1 organic when AI Overview present', source: 'Authoritas study' },
        ],
      },
      {
        heading: 'CPC benchmarks by vertical',
        content: 'London CPCs for digital-services keywords are among the highest in the world. The PPC vertical has the highest hero-term CPCs (£18–£35) because agencies bid against each other in their own auction. Web design has the largest demand pool (16,830 MSV) but relatively moderate CPCs (£8–£16). Business plan writing has the lowest CPCs (£6–£14) with very high commercial intent.',
        stats: [
          { num: '£15–£25', label: 'App development hero CPC', source: 'Google Ads Keyword Planner' },
          { num: '£8–£16', label: 'Web design hero CPC', source: 'Google Ads Keyword Planner' },
          { num: '£18–£35', label: 'PPC agency hero CPC', source: 'Google Ads Keyword Planner' },
          { num: '£14–£28', label: 'SEO agency hero CPC', source: 'Google Ads Keyword Planner' },
        ],
      },
      {
        heading: 'Demand seasonality',
        content: 'Service-business demand in London follows a predictable annual pattern. January is the peak month (demand index 135) driven by "new year, new agency" behaviour and Q1 budget releases. August is the annual low (index 70). The September rebound (index 115) is the second-most important acquisition window. Smart agencies front-load content publication in October–December to rank for the January demand peak.',
        stats: [
          { num: '135', label: 'January demand index (100 = avg)', source: 'Google Trends 2024–2026' },
          { num: '70', label: 'August demand index (annual low)', source: 'Google Trends 2024–2026' },
          { num: '115', label: 'September rebound index', source: 'Google Trends 2024–2026' },
          { num: '75', label: 'December demand index', source: 'Google Trends 2024–2026' },
        ],
      },
      {
        heading: 'Borough-level opportunity',
        content: 'Borough-level keywords represent the most under-exploited opportunity in London SEO. Terms like "web design Shoreditch" (70 MSV, KD 25) have significantly lower competition than "web design London" (4,400 MSV, KD 62) but convert at 2–3x the rate because the searcher has already narrowed their geographic intent. Systematically targeting the top 10 boroughs across all service terms can unlock 3,000–5,000 additional monthly searches with minimal competition.',
        stats: [
          { num: '15–35', label: 'Avg KD for borough keywords (vs 50+ for London)', source: 'Ahrefs' },
          { num: '2–3x', label: 'Conversion rate uplift vs London-wide terms', source: 'Meridian client data' },
          { num: '3,000–5,000', label: 'Additional MSV from top-10 borough targeting', source: 'SEMrush estimate' },
          { num: '44', label: 'London boroughs + areas with search demand', source: 'ONS / Google' },
        ],
      },
      {
        heading: 'Agency pricing benchmarks',
        content: 'London agency pricing has remained relatively stable since 2024 despite AI disruption. The premium for London-based delivery (vs UK-wide remote agencies) sits at approximately 30–50%. The market is bifurcating: large agencies charge more for brand prestige, while boutique agencies compete on value and senior-level attention. Transparent pricing is becoming a competitive advantage — agencies that publish rates report higher conversion rates from organic traffic.',
        stats: [
          { num: '£2,500', label: 'Avg Growth SEO retainer, London', source: 'Clutch / Sortlist data' },
          { num: '£1,650', label: 'Avg Growth PPC management, London', source: 'Clutch / Sortlist data' },
          { num: '£8,300', label: 'Avg 10-page website project, London', source: 'DesignRush / The Manifest' },
          { num: '30–50%', label: 'London premium vs UK-wide agencies', source: 'Sortlist 2026 survey' },
        ],
      },
    ],
    methodology: 'This report combines data from three sources: (1) Meridian\'s own client portfolio of 200+ London businesses across all major service verticals, providing first-party conversion, retention, and ROI data; (2) publicly available market data from Google Keyword Planner, Ahrefs, SEMrush, Google Trends, IAB UK, Statcounter, and ONS; (3) third-party agency benchmarking data from Clutch, Sortlist, DesignRush, and The Manifest. All CPC and search volume figures are modelled estimates — for investment decisions, validate against Google Keyword Planner with an active Ads account.',
    faqs: [
      { q: 'How often is this report updated?', a: 'Annually, in Q1 each year. Major data points are validated quarterly.' },
      { q: 'Can I cite this report?', a: 'Yes. Please cite as: "The State of London Digital Marketing 2026, Meridian Digital Ltd, www.meridianweb.co.uk/reports/london-digital-marketing-2026".' },
      { q: 'Is this report free?', a: 'Yes, fully free to read. No email gate. We believe in open data — it gets cited more.' },
    ],
  },
];

export const ALL_REPORT_SLUGS = REPORTS.map(r => r.slug);

export function getReport(slug: string): Report | undefined {
  return REPORTS.find(r => r.slug === slug);
}
