import Link from 'next/link';

/**
 * Homepage header. Exact visual parity with the original inline header.
 * Logo uses an anchor to `#` to match the original homepage behaviour
 * (on the homepage, the logo scrolls to top rather than navigating).
 */
export default function SiteHeader() {
  return (
    <header role="banner">
      <a href="#" className="logo" aria-label="Meridian — home">
        <span className="logo-mark" aria-hidden="true"></span>
        <span>Meridian</span>
      </a>
      <nav role="navigation" aria-label="Primary">
        <Link href="/services">Services</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/audit">Free Audit</Link>
        <Link href="/reviews">Reviews</Link>
        <Link href="/london">London</Link>
        <Link href="/faq">FAQ</Link>
      </nav>
      <button className="theme-toggle" id="themeToggle" aria-label="Toggle light/dark theme" type="button">
        <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <a href="#audit" className="nav-cta">Get Free Audit →</a>
    </header>
  );
}
