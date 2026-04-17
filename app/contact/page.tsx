import type { Metadata } from 'next';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact Meridian London — hello@meridian.london',
  description: 'Get in touch with Meridian. Email, phone, or send a brief. First reply within four working hours, always from a senior practitioner.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

      <main className="wrap" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        {/* HERO */}
        <header style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 60px' }} className="reveal">
          <span className="section-eyebrow">CONTACT</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}>
            Let&apos;s <span className="accent">talk</span>.
          </h1>
          <p className="section-sub">
            First reply within four working hours, always from a senior practitioner. No SDRs, no discovery scripts.
          </p>
        </header>

        {/* CONTACT GRID */}
        <section className="contact-grid reveal" style={{ marginBottom: '60px' }}>
          {/* LEFT: contact methods */}
          <div className="contact-methods">
            <div className="contact-method-card">
              <div className="cm-icon" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#fff' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <span className="cm-label">EMAIL</span>
                <a href="mailto:hello@meridian.london" className="cm-value">hello@meridian.london</a>
                <p className="cm-meta">First reply &lt; 4 working hours</p>
              </div>
            </div>

            <div className="contact-method-card">
              <div className="cm-icon" style={{ background: 'linear-gradient(135deg, var(--accent-2), var(--accent-3))' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#fff' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <span className="cm-label">PHONE</span>
                <a href="tel:+442000000000" className="cm-value">+44 20 0000 0000</a>
                <p className="cm-meta">Mon–Fri · 9am–6pm UK</p>
              </div>
            </div>

            <div className="contact-method-card">
              <div className="cm-icon" style={{ background: 'linear-gradient(135deg, var(--accent-3), var(--accent))' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#fff' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <span className="cm-label">OFFICE</span>
                <span className="cm-value">1 Finsbury Avenue<br/>London EC2M 2PF</span>
                <p className="cm-meta">5-min walk from Liverpool Street</p>
              </div>
            </div>

            <div className="contact-method-card">
              <div className="cm-icon" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-3))' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#fff' }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <span className="cm-label">CHAT</span>
                <span className="cm-value">In-app chat available</span>
                <p className="cm-meta">Reply within ~10 minutes during UK hours</p>
              </div>
            </div>

            {/* MAP PLACEHOLDER */}
            <div className="map-placeholder">
              <div className="map-grid-pattern"></div>
              <div className="map-pin">
                <div className="map-pin-dot"></div>
                <span>Meridian HQ — 1 Finsbury Avenue</span>
              </div>
              <div className="img-placeholder-note" style={{ position: 'absolute', bottom: 12, left: 12, right: 'auto' }}>
                Replace with embedded Google/Mapbox map
              </div>
            </div>
          </div>

          {/* RIGHT: contact form */}
          <form className="audit-form contact-form" id="contactForm">
            <span className="audit-eye">SEND A BRIEF</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.02em', marginBottom: '20px', marginTop: '8px' }}>
              Tell us what you&apos;re trying to do.
            </h2>

            <label className="field-label" htmlFor="cf-name">Your name</label>
            <div className="field-wrap">
              <input id="cf-name" name="name" type="text" placeholder="Jane Smith" required autoComplete="name" />
            </div>

            <label className="field-label" htmlFor="cf-email">Email</label>
            <div className="field-wrap">
              <input id="cf-email" name="email" type="email" placeholder="you@company.co.uk" required autoComplete="email" />
            </div>

            <label className="field-label" htmlFor="cf-company">Company &amp; role</label>
            <div className="field-wrap">
              <input id="cf-company" name="company" type="text" placeholder="Apex Wealth · Head of Growth" />
            </div>

            <label className="field-label" htmlFor="cf-interest">What are you interested in?</label>
            <div className="field-wrap" style={{ height: '54px', padding: '0 16px' }}>
              <select id="cf-interest" name="interest" style={{ flex: 1, background: 'transparent', border: 0, color: 'var(--ink)', fontSize: '15.5px', outline: 'none', height: '54px', width: '100%' }}>
                <option value="">Select a service</option>
                <option value="seo">SEO</option>
                <option value="ppc">PPC &amp; Paid Media</option>
                <option value="web">Web Design</option>
                <option value="app">App Development</option>
                <option value="social">Social Media</option>
                <option value="brand">Branding</option>
                <option value="plan">Business Plan</option>
                <option value="multi">Multiple services</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <label className="field-label" htmlFor="cf-budget">Approx. monthly budget (optional)</label>
            <div className="field-wrap" style={{ height: '54px', padding: '0 16px' }}>
              <select id="cf-budget" name="budget" style={{ flex: 1, background: 'transparent', border: 0, color: 'var(--ink)', fontSize: '15.5px', outline: 'none', height: '54px', width: '100%' }}>
                <option value="">No idea yet — help me</option>
                <option value="<2k">Less than £2k/mo</option>
                <option value="2-5k">£2k–£5k/mo</option>
                <option value="5-10k">£5k–£10k/mo</option>
                <option value="10-25k">£10k–£25k/mo</option>
                <option value=">25k">£25k+/mo</option>
                <option value="project">One-off project</option>
              </select>
            </div>

            <label className="field-label" htmlFor="cf-message">Brief</label>
            <div className="field-wrap" style={{ height: 'auto', padding: '14px 16px', alignItems: 'flex-start' }}>
              <textarea id="cf-message" name="message" placeholder="What&apos;s the goal? What&apos;s in the way?" rows={4} style={{ flex: 1, fontSize: '15.5px', resize: 'vertical', minHeight: '100px', fontFamily: 'inherit' }} />
            </div>

            <button type="submit" className="audit-btn">
              Send brief
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <p className="audit-meta">First reply &lt; 4 working hours · GDPR-compliant · NDA available</p>
          </form>
        </section>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  var f = document.getElementById('contactForm');
  if (!f) return;
  f.addEventListener('submit', async function(e){
    e.preventDefault();
    var btn = f.querySelector('.audit-btn');
    var orig = btn.innerHTML;
    btn.innerHTML = 'Sending…';
    btn.disabled = true;
    var data = Object.fromEntries(new FormData(f).entries());
    try {
      var r = await fetch('/api/leads', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email: data.email, name: data.name, source: 'contact_form_' + (data.interest || 'general') })
      });
      if (r.ok) {
        btn.innerHTML = '✓ Thanks — we&#39;ll be in touch within 4 hours.';
        btn.style.background = 'linear-gradient(135deg,#c4ff5b,#5b8cff)';
        f.querySelectorAll('input,select,textarea').forEach(function(el){ el.disabled = true; });
      } else {
        btn.innerHTML = '✗ Try again';
        setTimeout(function(){ btn.innerHTML = orig; btn.disabled = false; }, 3000);
      }
    } catch (err) {
      btn.innerHTML = '✗ Network error';
      setTimeout(function(){ btn.innerHTML = orig; btn.disabled = false; }, 3000);
    }
  });
})();
          `,
        }}
      />
    </>
  );
}
