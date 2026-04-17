import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPARISONS } from '@/lib/comparisons';

export const metadata: Metadata = {
  title: 'Comparisons | SEO vs PPC, Shopify vs WooCommerce & More | Meridian',
  description: 'Expert comparisons for London businesses. SEO vs PPC, Shopify vs WooCommerce, Webflow vs WordPress, Flutter vs React Native, Agency vs Freelancer.',
  alternates: { canonical: '/compare' },
};

export default function CompareHub() {
  return (
    <>
      <header role="banner">
        <Link href="/" className="logo" aria-label="Meridian — home"><span className="logo-mark" aria-hidden="true"></span><span>Meridian</span></Link>
        <nav role="navigation" aria-label="Primary"><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/audit">Free Audit</Link><Link href="/reviews">Reviews</Link><Link href="/london">London</Link><Link href="/faq">FAQ</Link></nav>
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      <section className="service-hero" style={{ paddingBottom: '40px' }}>
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>EXPERT COMPARISONS</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6vw,80px)', maxWidth: '800px', margin: '0 auto 22px' }}>
            <span className="accent">X vs Y</span>. Honest answers.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto', maxWidth: '600px', textAlign: 'center' }}>Side-by-side comparisons for London businesses making technology and marketing decisions.</p>
        </div>
      </section>

      <section style={{ padding: '0 0 120px' }}>
        <div className="wrap">
          <div className="includes-grid">
            {COMPARISONS.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="include-card" style={{ cursor: 'pointer' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>COMPARISON</div>
                <h2 className="include-h" style={{ fontSize: '20px' }}>{c.optionA.name} vs {c.optionB.name}</h2>
                <p className="include-p">{c.intro.slice(0, 120)}...</p>
                <span style={{ fontSize: '13px', color: 'var(--accent)', marginTop: '12px', display: 'block' }}>Read comparison →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
    </>
  );
}
