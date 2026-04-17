/**
 * Homepage free audit section — exact visual parity.
 * The form is vanilla HTML; HomepageInteractions wires the submit handler
 * via `#auditForm` selector.
 */
export default function AuditSection() {
  return (
    <section className="audit-section" id="audit">
      <div className="wrap">
        <div className="audit-card reveal">
          <div className="audit-grid">
            <div>
              <span className="audit-eye">⚡ FREE INSTANT TOOL</span>
              <h2 className="audit-h">Audit your site against London&apos;s top 100 ranking sites — in 90 seconds.</h2>
              <p className="audit-p">Drop in your URL. We&apos;ll run a full technical SEO scan, score you against Core Web Vitals, surface your top 10 quick-win keywords, and email you a 12-page PDF audit with a 90-day action plan.</p>
              <div className="audit-features">
                <div className="audit-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Full technical audit: schema, Core Web Vitals, INP, CLS, mobile-first signals</span>
                </div>
                <div className="audit-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Keyword gap report vs top 5 London competitors in your niche</span>
                </div>
                <div className="audit-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>AI Overview &amp; ChatGPT citation readiness check (GEO/AEO)</span>
                </div>
                <div className="audit-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>90-day quick-win roadmap with effort + impact scoring</span>
                </div>
              </div>
            </div>

            <form className="audit-form" id="auditForm">
              <label className="field-label" htmlFor="url">Your website URL</label>
              <div className="field-wrap">
                <span className="field-prefix">https://</span>
                <input type="text" id="url" name="url" placeholder="yourdomain.co.uk" autoComplete="url" required />
              </div>

              <label className="field-label" htmlFor="email">Where shall we send your audit?</label>
              <div className="field-wrap">
                <input type="email" id="email" name="email" placeholder="you@company.co.uk" autoComplete="email" required />
              </div>

              <label className="field-label" htmlFor="industry">Your industry (optional)</label>
              <div className="field-wrap" style={{ height: '54px', padding: '0 16px' }}>
                <select id="industry" name="industry" style={{ flex: '1', background: 'transparent', border: '0', color: 'var(--ink)', fontSize: '15.5px', outline: 'none', height: '54px', width: '100%' }}>
                  <option value="" style={{ color: '#000' }}>Select to benchmark vs your niche</option>
                  <option value="ecommerce" style={{ color: '#000' }}>E-commerce / Retail</option>
                  <option value="saas" style={{ color: '#000' }}>SaaS / Software</option>
                  <option value="fintech" style={{ color: '#000' }}>Fintech / Financial Services</option>
                  <option value="legal" style={{ color: '#000' }}>Legal / Professional Services</option>
                  <option value="healthcare" style={{ color: '#000' }}>Healthcare / Medical</option>
                  <option value="property" style={{ color: '#000' }}>Property / Real Estate</option>
                  <option value="hospitality" style={{ color: '#000' }}>Hospitality / F&amp;B</option>
                  <option value="b2b" style={{ color: '#000' }}>B2B Services</option>
                  <option value="other" style={{ color: '#000' }}>Other</option>
                </select>
              </div>

              <button type="submit" className="audit-btn">
                Run My Free Audit
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
              <p className="audit-meta">No obligation · GDPR-compliant · We hate spam too · Audit delivered in 90 seconds</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
