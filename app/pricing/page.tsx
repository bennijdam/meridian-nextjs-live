import type { Metadata } from 'next';
import Link from 'next/link';
import {
  RETAINERS, PROJECTS, ANNUAL_DISCOUNT_PCT, RETAINER_SAVINGS_VS_MARKET_PCT,
  formatGBP, calcSavingsVsMarket,
} from '@/lib/pricing';
import { jsonLd, breadcrumbSchema, faqSchema } from '@/lib/schema';
import HomepageInteractions from '@/components/HomepageInteractions';
import SiteHeader from '@/components/home/SiteHeader';
import SiteFooter from '@/components/home/SiteFooter';
import MobileCTA from '@/components/home/MobileCTA';

export const metadata: Metadata = {
  title: 'Pricing — 40% Below London Market | Meridian',
  description: 'Transparent pricing for SEO, PPC, web design, app development and more. 40% below London market average. Pay-as-you-go, monthly subscription or annual (save 17%).',
  alternates: { canonical: '/pricing' },
};

const PRICING_FAQS = [
  { q: 'Why is your pricing 40% below the London market average?', a: 'We run a lean 14-person London team with senior practitioners only — no junior account-management layers between you and the people doing the work. The savings are operational, not quality compromises.' },
  { q: "What's the difference between Pay-as-you-go, Monthly and Annual?", a: 'Pay-as-you-go is monthly billing with no minimum — cancel any time. Monthly subscription is a 6-month commitment for ~10% off the PAYG rate. Annual is paid yearly upfront, saving 17% (you pay 10 months, get 12).' },
  { q: 'Can I switch tiers later?', a: 'Yes — upgrade or downgrade any time from your customer portal. Upgrades prorate immediately; downgrades take effect at the next billing cycle.' },
  { q: 'What if I need something not listed?', a: 'Contact us. We custom-quote any combination — multi-service bundles, white-label, fractional leadership, M&A diligence work. Most requests are within a 24-hour quote turnaround.' },
  { q: 'Do project services include hosting and maintenance?', a: 'Project pricing covers build only. Ongoing hosting, updates and small enhancements are usually £290–£890/month depending on stack — quoted once we know what you have.' },
  { q: 'How do I cancel a subscription?', a: 'Open your customer portal from the link in any invoice email, or visit /account once logged in. Pay-as-you-go cancels immediately; monthly and annual subscriptions stop renewing at the end of the paid period.' },
];

export default function PricingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing', url: '/pricing' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(PRICING_FAQS)) }} />
      <HomepageInteractions />
      <SiteHeader />

      <section className="inner-hero">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-dot-grid" aria-hidden="true" />
        <div className="wrap">
          <span className="section-eyebrow" data-scramble="true">PRICING</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            <span className="accent">{RETAINER_SAVINGS_VS_MARKET_PCT}% below</span> London market.<br/>
            Same senior team. No catch.
          </h1>
          <p className="section-sub">
            Three pricing tiers per service. Three billing options to fit your cash flow.
            Cancel any time. No setup fees, no minimum spend, no agency padding.
          </p>
          <div className="rating-row" style={{ justifyContent: 'center', marginTop: '24px' }}>
            <span className="rating-stars" aria-hidden="true">
              {[0,1,2,3,4].map(i => (
                <svg key={i} viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
              ))}
            </span>
            <span className="rating-text"><strong>4.9</strong> from 127 reviews</span>
          </div>
        </div>
      </section>

      <div className="section-box-wrap inner-section-box-wrap">
        <div className="section-box">
          <div className="wrap">
            <BillingToggle />

            <section style={{ marginBottom: '80px' }} id="retainers">
              <div className="section-head reveal" style={{ textAlign: 'left', marginBottom: '32px' }}>
                <span className="section-eyebrow">MONTHLY RETAINERS</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>Ongoing services</h2>
                <p className="section-sub" style={{ textAlign: 'left' }}>
                  Subscription pricing for SEO, PPC, social and content. Cancel any time on PAYG. Monthly subscription saves 10%; annual saves {ANNUAL_DISCOUNT_PCT}%.
                </p>
              </div>
              <ServiceTabs services={uniqueRetainerServices()} />
              {uniqueRetainerServices().map((svc, i) => (
                <div key={svc.slug} className={`pricing-panel ${i === 0 ? 'active' : ''}`} data-pricing-panel={svc.slug}>
                  <div className="tier-grid">
                    {RETAINERS.filter(r => r.serviceName === svc.name).map(tier => (
                      <TierCard key={tier.id} tier={tier} />
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '80px' }} id="projects">
              <div className="section-head reveal" style={{ textAlign: 'left', marginBottom: '32px' }}>
                <span className="section-eyebrow">FIXED-PRICE PROJECTS</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>One-off projects</h2>
                <p className="section-sub" style={{ textAlign: 'left' }}>
                  Fixed scope, fixed price, fixed timeline. Pay 50% on kick-off, 50% on launch. No surprises.
                </p>
              </div>
              <ProjectServiceTabs services={uniqueProjectServices()} />
              {uniqueProjectServices().map((svc, i) => (
                <div key={svc.slug} className={`project-panel ${i === 0 ? 'active' : ''}`} data-project-panel={svc.slug}>
                  <div className="tier-grid">
                    {PROJECTS.filter(p => p.serviceName === svc.name).map(p => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '80px' }} className="reveal">
              <div className="section-head" style={{ textAlign: 'center', marginBottom: '32px' }}>
                <span className="section-eyebrow">VS MARKET</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>How we compare on price</h2>
                <p className="section-sub">
                  Same scope. Same seniority. Roughly half the bill. Reference market averages from Sortlist UK 2026, Clutch UK and our own n=180 industry survey.
                </p>
              </div>
              <div className="comparison-table-wrap glass">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Service</th><th>Tier</th><th>Meridian</th><th>London market avg</th><th>You save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RETAINERS.map(r => (
                      <tr key={r.id}>
                        <td><strong>{r.serviceName}</strong></td>
                        <td>{r.tierName}</td>
                        <td className="num"><strong>{formatGBP(r.paygMonthly)}/mo</strong></td>
                        <td className="num strikethrough">{formatGBP(r.marketAvgMonthly)}/mo</td>
                        <td className="num savings-pill">{calcSavingsVsMarket(r.paygMonthly, r.marketAvgMonthly)}% off</td>
                      </tr>
                    ))}
                    {PROJECTS.map(p => (
                      <tr key={p.id}>
                        <td><strong>{p.serviceName}</strong></td>
                        <td>{p.tierName}</td>
                        <td className="num"><strong>{formatGBP(p.price)}</strong></td>
                        <td className="num strikethrough">{formatGBP(p.marketAvg)}</td>
                        <td className="num savings-pill">{calcSavingsVsMarket(p.price, p.marketAvg)}% off</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="faq-section" style={{ padding: '40px 0' }} id="faq">
              <div className="section-head reveal" style={{ marginBottom: '40px' }}>
                <span className="section-eyebrow">FAQ</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>Pricing questions</h2>
              </div>
              <div className="faq-list reveal">
                {PRICING_FAQS.map((f, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-q">{f.q}</summary>
                    <div className="faq-a">{f.a}</div>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <section className="final-cta" style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Not sure which tier you need?</h2>
            <p className="final-p">Get your free SEO audit in 90 seconds. We&apos;ll recommend the right tier based on your current site, competitors and goals — no upsell.</p>
            <div className="cta-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <Link href="/#audit" className="btn btn-primary magnetic">
                Get Free SEO Audit
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PricingClientScript />
      <SiteFooter />
      <MobileCTA />
    </>
  );
}

function uniqueRetainerServices() {
  const seen = new Set<string>();
  return RETAINERS.filter(r => {
    if (seen.has(r.serviceName)) return false;
    seen.add(r.serviceName);
    return true;
  }).map(r => ({ slug: r.serviceSlug, name: r.serviceName }));
}

function uniqueProjectServices() {
  const seen = new Set<string>();
  return PROJECTS.filter(p => {
    if (seen.has(p.serviceName)) return false;
    seen.add(p.serviceName);
    return true;
  }).map(p => ({ slug: p.serviceSlug, name: p.serviceName }));
}

function BillingToggle() {
  return (
    <div className="billing-toggle reveal" role="tablist" aria-label="Billing period">
      <button type="button" className="bt-option active" data-period="payg" role="tab">
        Pay-as-you-go<span className="bt-meta">Cancel anytime</span>
      </button>
      <button type="button" className="bt-option" data-period="monthly" role="tab">
        Monthly<span className="bt-meta">Save 10%</span>
      </button>
      <button type="button" className="bt-option" data-period="annual" role="tab">
        Annual<span className="bt-meta savings">Save {ANNUAL_DISCOUNT_PCT}%</span>
      </button>
    </div>
  );
}

function ServiceTabs({ services }: { services: Array<{ slug: string; name: string }> }) {
  return (
    <div className="kw-tabs reveal" style={{ marginBottom: '32px' }} role="tablist">
      {services.map((s, i) => (
        <button key={s.slug} type="button" className={`kw-tab ${i === 0 ? 'active' : ''}`} data-pricing-tab={s.slug} role="tab">
          {s.name}
        </button>
      ))}
    </div>
  );
}

function ProjectServiceTabs({ services }: { services: Array<{ slug: string; name: string }> }) {
  return (
    <div className="kw-tabs reveal" style={{ marginBottom: '32px' }} role="tablist">
      {services.map((s, i) => (
        <button key={s.slug} type="button" className={`kw-tab ${i === 0 ? 'active' : ''}`} data-project-tab={s.slug} role="tab">
          {s.name}
        </button>
      ))}
    </div>
  );
}

function TierCard({ tier }: { tier: typeof RETAINERS[number] }) {
  const savingsPct = calcSavingsVsMarket(tier.paygMonthly, tier.marketAvgMonthly);
  return (
    <article className={`tier-card ${tier.popular ? 'tier-card-popular' : ''}`} data-tier-id={tier.id}>
      {tier.popular && <span className="tier-badge">MOST POPULAR</span>}
      <div className="tier-header">
        <h3 className="tier-name">{tier.tierName}</h3>
        <p className="tier-tagline">{tier.tagline}</p>
      </div>
      <div className="tier-price">
        <span className="tier-currency">£</span>
        <span className="tier-amount" data-payg={tier.paygMonthly} data-monthly={tier.monthlyMonthly} data-annual={tier.annualMonthly}>
          {tier.paygMonthly.toLocaleString('en-GB')}
        </span>
        <span className="tier-period" data-payg-text="/month" data-monthly-text="/month" data-annual-text="/month, billed yearly">/month</span>
      </div>
      <div className="tier-vs-market">
        <span className="strikethrough">{formatGBP(tier.marketAvgMonthly)}/mo market avg</span>
        <span className="savings-pill">{savingsPct}% off</span>
      </div>
      <p className="tier-description">{tier.description}</p>
      <ul className="tier-features">
        {tier.features.map((f, i) => (
          <li key={i}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button type="button" className={`tier-cta btn ${tier.popular ? 'btn-primary' : 'btn-ghost'}`} data-checkout-product-id={tier.id} data-checkout-product-kind="retainer">
        Subscribe to {tier.tierName} →
      </button>
    </article>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[number] }) {
  const savingsPct = calcSavingsVsMarket(project.price, project.marketAvg);
  return (
    <article className={`tier-card ${project.popular ? 'tier-card-popular' : ''}`}>
      {project.popular && <span className="tier-badge">MOST POPULAR</span>}
      <div className="tier-header">
        <h3 className="tier-name">{project.tierName}</h3>
        <p className="tier-tagline">{project.serviceName} project</p>
      </div>
      <div className="tier-price">
        <span className="tier-currency">£</span>
        <span className="tier-amount">{project.price.toLocaleString('en-GB')}</span>
        <span className="tier-period">one-off</span>
      </div>
      <div className="tier-vs-market">
        <span className="strikethrough">{formatGBP(project.marketAvg)} market avg</span>
        <span className="savings-pill">{savingsPct}% off</span>
      </div>
      <p className="tier-description">{project.description}</p>
      <ul className="tier-features">
        {project.features.map((f, i) => (
          <li key={i}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button type="button" className={`tier-cta btn ${project.popular ? 'btn-primary' : 'btn-ghost'}`} data-checkout-product-id={project.id} data-checkout-product-kind="project">
        Buy {project.tierName} →
      </button>
    </article>
  );
}

function PricingClientScript() {
  const js = `
(function(){
  var period = 'payg';
  document.querySelectorAll('.bt-option').forEach(function(b){
    b.addEventListener('click', function(){
      period = b.dataset.period;
      document.querySelectorAll('.bt-option').forEach(function(o){ o.classList.toggle('active', o === b); });
      document.querySelectorAll('.tier-amount').forEach(function(el){
        var v = el.dataset[period];
        if (v) el.textContent = Number(v).toLocaleString('en-GB');
      });
      document.querySelectorAll('.tier-period').forEach(function(el){
        var t = el.dataset[period + 'Text'];
        if (t) el.textContent = t;
      });
    });
  });
  function bindTabs(tabAttr, panelAttr){
    document.querySelectorAll('[' + tabAttr + ']').forEach(function(t){
      t.addEventListener('click', function(){
        var slug = t.getAttribute(tabAttr);
        document.querySelectorAll('[' + tabAttr + ']').forEach(function(x){ x.classList.toggle('active', x === t); });
        document.querySelectorAll('[' + panelAttr + ']').forEach(function(p){
          p.classList.toggle('active', p.getAttribute(panelAttr) === slug);
        });
      });
    });
  }
  bindTabs('data-pricing-tab', 'data-pricing-panel');
  bindTabs('data-project-tab', 'data-project-panel');
  document.querySelectorAll('[data-checkout-product-id]').forEach(function(btn){
    btn.addEventListener('click', async function(){
      var productId   = btn.getAttribute('data-checkout-product-id');
      var productKind = btn.getAttribute('data-checkout-product-kind');
      var original    = btn.innerHTML;
      btn.innerHTML = 'Redirecting…';
      btn.disabled = true;
      try {
        var res = await fetch('/api/stripe/checkout', {
          method: 'POST', headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ productId: productId, productKind: productKind, period: productKind === 'retainer' ? period : 'oneoff' })
        });
        var data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          btn.innerHTML = '✗ ' + (data.error || 'Failed') + '. Try again.';
          setTimeout(function(){ btn.innerHTML = original; btn.disabled = false; }, 3500);
        }
      } catch (err) {
        btn.innerHTML = '✗ Network error';
        setTimeout(function(){ btn.innerHTML = original; btn.disabled = false; }, 3500);
      }
    });
  });
})();
  `;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
