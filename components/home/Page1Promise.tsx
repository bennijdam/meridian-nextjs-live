/**
 * Homepage "We get you to page 1" promise section — exact visual parity.
 */
export default function Page1Promise() {
  return (
    <section className="page1-section" id="page1">
      <div className="section-box-wrap">
      <div className="section-box">
      <div className="wrap">
        <div className="page1-grid">
          <div className="page1-text reveal">
            <span className="section-eyebrow">THE PROMISE</span>
            <h1 className="page1-h">We get you to <span className="accent">page&nbsp;1 of Google</span>. And keep you there.</h1>
            <p className="page1-sub">Of the 200+ London brands we&apos;ve worked with for six months or more, 94% rank in the top 10 for their primary commercial keyword, and 71% reach the top 3. The remaining 29% are usually waiting on a domain migration we&apos;ve already shipped.</p>
            <div className="page1-stats">
              <div>
                <div className="page1-stat-num">94%</div>
                <div className="page1-stat-label">Reach top 10 in 6 months</div>
              </div>
              <div>
                <div className="page1-stat-num">71%</div>
                <div className="page1-stat-label">Hit top 3 in 12 months</div>
              </div>
              <div>
                <div className="page1-stat-num">+342%</div>
                <div className="page1-stat-label">Avg. traffic uplift</div>
              </div>
            </div>
            <a href="#audit" className="btn btn-primary">
              See if we can get you there
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div className="page1-visual reveal">
            <div className="page1-img-wrap">
              <picture>
                <source type="image/avif" srcSet="/img/seo-search-optimisation-480w.avif 480w, /img/seo-search-optimisation-768w.avif 768w, /img/seo-search-optimisation-1200w.avif 1200w, /img/seo-search-optimisation-1920w.avif 1920w" sizes="(min-width: 1024px) 560px, 100vw" />
                <source type="image/webp" srcSet="/img/seo-search-optimisation-480w.webp 480w, /img/seo-search-optimisation-768w.webp 768w, /img/seo-search-optimisation-1200w.webp 1200w, /img/seo-search-optimisation-1920w.webp 1920w" sizes="(min-width: 1024px) 560px, 100vw" />
                <img src="/img/seo-search-optimisation-1200w.webp" alt="Get your London business to page 1 of Google search results" width="560" height="700" loading="lazy" decoding="async" />
              </picture>
            </div>
            <div className="rank-card rank-1" aria-hidden="true">
              <div className="rank-pos gold">1</div>
              <div className="rank-meta">
                <div className="rank-kw">&quot;web design london&quot;</div>
                <div className="rank-cap">Position 1 · Google UK</div>
              </div>
            </div>
            <div className="rank-card rank-2" aria-hidden="true">
              <div className="rank-pos">3</div>
              <div className="rank-meta">
                <div className="rank-kw">&quot;seo agency london&quot;</div>
                <div className="rank-cap">Cited in AI Overview</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
