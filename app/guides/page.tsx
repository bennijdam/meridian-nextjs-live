import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Guides & Checklists | Digital Marketing for London Businesses | Meridian',
  description: 'Expert guides and checklists for London businesses. How to choose an agency, write a business plan, grow on Instagram, and more. Free, actionable, 2026-updated.',
  alternates: { canonical: '/guides' },
};

export default function GuidesHub() {
  return (
    <>
      <header role="banner">
        <Link href="/" className="logo" aria-label="Meridian — home"><span className="logo-mark" aria-hidden="true"></span><span>Meridian</span></Link>
        <nav role="navigation" aria-label="Primary"><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/audit">Free Audit</Link><Link href="/reviews">Reviews</Link><Link href="/london">London</Link><Link href="/faq">FAQ</Link></nav>
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      <section className="service-hero" style={{ paddingBottom: '40px' }}>
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>FREE GUIDES &amp; CHECKLISTS</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6vw,80px)', maxWidth: '800px', margin: '0 auto 22px' }}>
            Expert <span className="accent">guides</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto', maxWidth: '600px', textAlign: 'center' }}>Actionable checklists and guides for London businesses. Free, no email required to read.</p>
        </div>
      </section>

      <section style={{ padding: '0 0 120px' }}>
        <div className="wrap">
          <div className="includes-grid">
            {GUIDES.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="include-card" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderRadius: 'var(--r)', overflow: 'hidden', marginBottom: '16px', aspectRatio: '16/9', position: 'relative' }}>
                  <picture>
                    <source type="image/webp" srcSet={`/img/${g.image}-480w.webp 480w, /img/${g.image}-768w.webp 768w`} sizes="400px" />
                    <img src={`/img/${g.image}-480w.webp`} alt={g.title} width="400" height="225" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </picture>
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{g.category.toUpperCase()} · {g.readTime.toUpperCase()}</div>
                <h2 className="include-h" style={{ fontSize: '18px', flex: 1 }}>{g.title}</h2>
                <p className="include-p" style={{ marginTop: '8px' }}>{g.intro.slice(0, 120)}...</p>
                <span style={{ fontSize: '13px', color: 'var(--accent)', marginTop: '14px', display: 'block' }}>Read guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
    </>
  );
}
