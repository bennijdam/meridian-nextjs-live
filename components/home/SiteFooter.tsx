/**
 * Homepage footer — exact visual parity.
 * Uses anchor tags with `#` to match the original homepage behaviour.
 */
export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <a href="#" className="logo">
              <span className="logo-mark"></span>
              <span>Meridian</span>
            </a>
            <p>London&apos;s boutique digital performance studio. Engineering compounding growth across SEO, PPC, web, app and social since 2014.</p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#">SEO Agency London</a></li>
              <li><a href="#">PPC Agency London</a></li>
              <li><a href="#">Web Design London</a></li>
              <li><a href="#">App Development London</a></li>
              <li><a href="#">Social Media London</a></li>
              <li><a href="#">Branding London</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Locations</h4>
            <ul>
              <li><a href="#">Shoreditch</a></li>
              <li><a href="#">Mayfair</a></li>
              <li><a href="#">Canary Wharf</a></li>
              <li><a href="#">King&apos;s Cross</a></li>
              <li><a href="#">All Boroughs →</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Free SEO Audit</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Meridian Digital Ltd · Company No. 09876543 · 1 Finsbury Avenue, London EC2M 2PF</span>
          <span>Cyber Essentials Plus · ISO 27001 · GDPR Compliant</span>
        </div>
      </div>
    </footer>
  );
}
