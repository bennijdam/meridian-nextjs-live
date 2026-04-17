/**
 * Homepage final CTA — exact visual parity.
 * The form is vanilla HTML; HomepageInteractions wires submit via `#finalForm`.
 */
export default function HomeFinalCTA() {
  return (
    <section className="final-cta">
      <div className="wrap">
        <div className="final-card reveal">
          <h2 className="final-h">Ready to dominate London search?</h2>
          <p className="final-p">Get your free SEO audit in 90 seconds. No call required, no obligation, no spam — just a 12-page PDF with your top 10 quick wins delivered to your inbox.</p>
          <form className="final-form" id="finalForm">
            <input type="email" placeholder="you@company.co.uk" autoComplete="email" required aria-label="Email address" />
            <button type="submit">Send My Audit</button>
          </form>
        </div>
      </div>
    </section>
  );
}
