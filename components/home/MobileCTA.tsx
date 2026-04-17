/**
 * Mobile bottom CTA bar — exact visual parity.
 * Visible on screens under 920px (CSS media query).
 */
export default function MobileCTA() {
  return (
    <div className="mobile-cta" role="complementary">
      <span className="mobile-cta-text">Free SEO audit, 90s.</span>
      <a href="#audit" className="mobile-cta-btn">Get Audit →</a>
    </div>
  );
}
