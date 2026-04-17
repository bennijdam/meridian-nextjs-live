/**
 * Homepage hero section. Exact visual parity with the original inline hero.
 * Includes the marquee brand bar.
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="eyebrow">London&apos;s #1 rated digital studio<span className="visually-hidden"> with </span></span>
            <h1 className="hero-title">
              London&apos;s <span className="accent">performance</span> engine for serious brands.
            </h1>
            <p className="hero-sub">
              A boutique London digital marketing agency engineering compounding growth through SEO, PPC, web design, app development and social media management — with measured ROI from month one.
            </p>
            <div className="cta-row">
              <a href="#audit" className="btn btn-primary">
                Get Free SEO Audit
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href="#services" className="btn btn-ghost">
                Explore Services
              </a>
            </div>

            <div className="rating-row">
              <div className="rating-stars" aria-label="4.9 out of 5 stars">
                <svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <div className="rating-text">
                <strong>4.9</strong> from <strong>127 reviews</strong>
                <span className="rating-divider">·</span>
                <span>Google &amp; Trustpilot verified</span>
              </div>
              <div className="rating-avatars" aria-hidden="true">
                <span className="rating-avatar">JM</span>
                <span className="rating-avatar a2">SC</span>
                <span className="rating-avatar a3">MO</span>
                <span className="rating-avatar a4">+</span>
              </div>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-num">£47M</div>
                <div className="stat-label">Client revenue driven</div>
              </div>
              <div>
                <div className="stat-num">200+</div>
                <div className="stat-label">London brands served</div>
              </div>
              <div>
                <div className="stat-num">12 yrs</div>
                <div className="stat-label">Compounding playbooks</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-img-wrap">
              <picture>
                <source type="image/avif" srcSet="/img/digital-marketing-team-480w.avif 480w, /img/digital-marketing-team-768w.avif 768w, /img/digital-marketing-team-1200w.avif 1200w, /img/digital-marketing-team-1920w.avif 1920w" sizes="(min-width: 1024px) 560px, 100vw" />
                <source type="image/webp" srcSet="/img/digital-marketing-team-480w.webp 480w, /img/digital-marketing-team-768w.webp 768w, /img/digital-marketing-team-1200w.webp 1200w, /img/digital-marketing-team-1920w.webp 1920w" sizes="(min-width: 1024px) 560px, 100vw" />
                <img src="/img/digital-marketing-team-1200w.webp" alt="London digital marketing agency team strategy session" width="560" height="700" loading="eager" fetchPriority="high" />
              </picture>
            </div>
            <div className="floating-card fc-1" aria-hidden="true">
              <div className="fc-icon">📈</div>
              <div className="fc-meta">
                <div className="fc-num">+342%</div>
                <div className="fc-cap">Organic traffic, Q1</div>
              </div>
            </div>
            <div className="floating-card fc-2" aria-hidden="true">
              <div className="fc-icon fc-icon-2">⚡</div>
              <div className="fc-meta">
                <div className="fc-num">2.4s</div>
                <div className="fc-cap">Avg LCP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-label">Trusted across London&apos;s most ambitious brands</div>
          <div className="marquee-track">
            <span className="marquee-item">Shoreditch fintech</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Mayfair private equity</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Soho creative</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Canary Wharf SaaS</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">King&apos;s Cross deeptech</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Camden ecommerce</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Hackney lifestyle</span>
            <span className="marquee-item">·</span>
            {/* Duplicate for seamless loop */}
            <span className="marquee-item">Shoreditch fintech</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Mayfair private equity</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Soho creative</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Canary Wharf SaaS</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">King&apos;s Cross deeptech</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Camden ecommerce</span>
            <span className="marquee-item">·</span>
            <span className="marquee-item">Hackney lifestyle</span>
            <span className="marquee-item">·</span>
          </div>
        </div>
      </div>
    </section>
  );
}
