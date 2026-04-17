/**
 * Homepage "Numbers that compound" section — exact visual parity.
 */
export default function WhyLondon() {
  return (
    <section className="why-section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="section-eyebrow">PERFORMANCE</span>
          <h2 className="section-title">Numbers that <span className="accent">compound</span>.</h2>
          <p className="section-sub">London&apos;s most competitive search market deserves measurement that actually means something. Here&apos;s what 12 years of working only with London brands has produced.</p>
        </div>
        <div className="why-grid reveal">
          <div className="why-card">
            <div className="why-num">+342<span className="small">%</span></div>
            <div className="why-label">Average organic traffic uplift in 12 months across London SEO clients</div>
          </div>
          <div className="why-card">
            <div className="why-num">£0.87</div>
            <div className="why-label">Median CPL in B2B London paid search — vs £4.20 industry benchmark</div>
          </div>
          <div className="why-card">
            <div className="why-num">94<span className="small">%</span></div>
            <div className="why-label">Client retention beyond 24 months — the only metric that matters</div>
          </div>
          <div className="why-card">
            <div className="why-num">2.1s</div>
            <div className="why-label">Average LCP across all sites we ship — top 4% of UK websites</div>
          </div>
        </div>
      </div>
    </section>
  );
}
