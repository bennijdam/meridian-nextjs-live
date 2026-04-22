import type { Metadata } from 'next';
import Link from 'next/link';
import { jsonLd, breadcrumbSchema, faqSchema } from '@/lib/schema';
import HomepageInteractions from '@/components/HomepageInteractions';
import SiteHeader from '@/components/home/SiteHeader';
import SiteFooter from '@/components/home/SiteFooter';
import MobileCTA from '@/components/home/MobileCTA';

export const metadata: Metadata = {
  title: 'FAQ — Meridian | Pricing, Contracts, Services, Delivery',
  description: 'Every question we hear about working with a London digital marketing agency. Pricing, contracts, services, delivery — answered.',
  alternates: { canonical: '/faq' },
};

const FAQ_GROUPS = [
  {
    title: 'Pricing & contracts',
    items: [
      { q: 'How do you actually deliver work for 40% less than competitors?', a: 'Three structural reasons: no premium office, flat team structure with no middle managers, and heavy AI automation of audit, reporting and research workflows. The senior strategist who pitches you is the senior strategist who delivers.' },
      { q: "What's the minimum contract length?", a: "90 days for retainers — this is how long compounding work takes to show meaningful results. After that, month-to-month with 30 days' notice." },
      { q: 'Are there hidden setup fees?', a: 'No. The price you see is the price you pay. PPC ad spend is paid directly to Google/Meta from your account.' },
      { q: 'Is there a money-back guarantee?', a: "Yes. If you're not happy in your first 14 days, we refund the month in full." },
      { q: 'How does annual billing work?', a: 'Pay 12 months upfront and you save 17%. Charged in one Stripe transaction, refundable pro-rata if you cancel.' },
      { q: 'Can I change tier later?', a: 'Yes — upgrade any time, prorated to the day. Downgrade at the end of your current billing cycle.' },
      { q: 'What payment methods do you accept?', a: 'All major credit cards (via Stripe), GBP/EUR/USD bank transfers, direct debit for annual plans.' },
    ],
  },
  {
    title: 'Services & delivery',
    items: [
      { q: 'How long does SEO take to work in London?', a: 'For competitive London terms, expect meaningful organic traffic gains in 4–6 months and full ROI by month 9–12.' },
      { q: 'Do you guarantee rankings?', a: 'No reputable SEO agency does. We guarantee process, transparency and effort.' },
      { q: 'Do you work with startups or only enterprise?', a: 'Both. Startup track from £490/month per service line.' },
      { q: 'Which London boroughs do you cover?', a: 'All 32 boroughs plus the City of London. Particular depth in Shoreditch, Mayfair, Canary Wharf, Camden, Soho.' },
      { q: 'What is GEO and AEO?', a: 'Generative Engine Optimisation and Answer Engine Optimisation are the disciplines for being cited in AI search — Google AI Overviews, ChatGPT, Perplexity, Claude.' },
      { q: 'Can you write a business plan for the Innovator Founder visa?', a: "Yes. We've written endorsing-body-approved plans. 10 working days standard turnaround. From £1,090." },
      { q: 'Do you build native or cross-platform apps?', a: 'Both. Native (Swift, Kotlin) when performance demands. Cross-platform (Flutter, React Native) when speed matters more.' },
      { q: 'Will you sign an NDA?', a: 'Yes. Standard before any discovery work. Cyber Essentials Plus certified.' },
    ],
  },
  {
    title: 'Working with us',
    items: [
      { q: 'Who actually does the work?', a: "The senior strategist who pitches you is the senior strategist who delivers. We don't have juniors executing what seniors sold." },
      { q: 'What does onboarding look like?', a: 'Day 1: Stripe payment, contract signed. Day 2: kick-off call. Day 8: first deliverables ship. Most agencies take 4-6 weeks. We take 8 days.' },
      { q: 'How do we communicate?', a: 'Slack channel for day-to-day. Fortnightly video call. Monthly performance report. All work in a shared Notion or Drive folder you own.' },
      { q: 'What if we want to leave?', a: "After 90 days, give 30 days' notice. We hand back ad accounts, GA4, Search Console (always yours), all work product, and a transition document." },
    ],
  },
];

export default function FaqPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Faq', url: '/faq' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ_GROUPS.flatMap(g => g.items))) }} />
      <HomepageInteractions />
      <SiteHeader />

      <section className="inner-hero">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-dot-grid" aria-hidden="true" />
        <div className="wrap">
          <span className="section-eyebrow" data-scramble="true">EVERYTHING YOU&apos;D ASK ON THE CALL</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Got <span className="accent">questions</span>?
          </h1>
          <p className="section-sub">We&apos;ve answered the ones we hear most often.</p>
        </div>
      </section>

      <div className="section-box-wrap inner-section-box-wrap">
        <div className="section-box">
          <div className="wrap">
            {FAQ_GROUPS.map((group, gi) => (
              <div key={gi} className="reveal" style={{ marginTop: gi === 0 ? '0' : '48px' }}>
                <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', textAlign: 'left', marginBottom: '20px' }}>
                  {group.title}
                </h2>
                <div className="faq-list">
                  {group.items.map((item, i) => (
                    <details key={i} className="faq-item">
                      <summary className="faq-q">{item.q}</summary>
                      <div className="faq-a">{item.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="final-cta" style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready to start?</h2>
            <p className="final-p">Pick a tier on pricing, or get a free audit first.</p>
            <div className="cta-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <Link href="/pricing" className="btn btn-primary magnetic">See Pricing →</Link>
              <Link href="/audit" className="btn btn-ghost magnetic">Free SEO Audit</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
    </>
  );
}
