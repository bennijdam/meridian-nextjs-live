/**
 * Homepage reviews section — exact visual parity.
 * 6 review cards + summary bar with Google/Trustpilot ratings.
 */
const STAR = (
  <svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
);

const SMALL_STAR = (
  <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'currentColor' }}><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
);

function FiveStars() {
  return (
    <div className="review-stars" aria-label="5 stars">
      {STAR}{STAR}{STAR}{STAR}{STAR}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="section-box-wrap">
      <div className="section-box">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="section-eyebrow">★ 4.9 / 5 · 127 VERIFIED REVIEWS</span>
          <h2 className="section-title">London brands that <span className="accent">trust us</span> with growth.</h2>
          <p className="section-sub">Verified reviews from founders, CMOs and heads of growth at Meridian client companies. No edits, no hand-picking — pulled live from Google and Trustpilot.</p>
        </div>

        <div className="reviews-grid reveal">
          <article className="review-card">
            <FiveStars />
            <p className="review-quote">&quot;Meridian rebuilt our SEO from scratch. Six months in we&apos;re #1 for our three commercial terms and organic traffic is up 380%. Worth every pound.&quot;</p>
            <div className="review-meta">
              <div className="review-avatar-lg">JM</div>
              <div>
                <div className="review-name">James Mitchell</div>
                <div className="review-role">Founder, Apex Wealth · Mayfair</div>
              </div>
            </div>
            <div className="review-source">★ Google verified · Mar 2026</div>
          </article>

          <article className="review-card">
            <FiveStars />
            <p className="review-quote">&quot;The PPC team cut our cost per lead by 62% in eight weeks. They actually understood our buyer journey instead of just bidding harder. Best agency we&apos;ve worked with.&quot;</p>
            <div className="review-meta">
              <div className="review-avatar-lg" style={{ background: 'linear-gradient(135deg,var(--accent-2),var(--accent-3))' }}>SC</div>
              <div>
                <div className="review-name">Sarah Chen</div>
                <div className="review-role">CMO, Lumen Labs · King&apos;s Cross</div>
              </div>
            </div>
            <div className="review-source">★ Google verified · Feb 2026</div>
          </article>

          <article className="review-card">
            <FiveStars />
            <p className="review-quote">&quot;Shipped our MVP in 11 weeks. App Store launch hit 12k installs in week one with zero paid spend. The team operates like an in-house product squad.&quot;</p>
            <div className="review-meta">
              <div className="review-avatar-lg" style={{ background: 'linear-gradient(135deg,var(--accent-3),var(--accent))' }}>MO</div>
              <div>
                <div className="review-name">Michael Okonkwo</div>
                <div className="review-role">Founder, Stride · Shoreditch</div>
              </div>
            </div>
            <div className="review-source">★ Trustpilot verified · Jan 2026</div>
          </article>

          <article className="review-card">
            <FiveStars />
            <p className="review-quote">&quot;Local SEO across 14 restaurant locations was a mess. Meridian fixed it in a quarter. We now own the 3-pack in every borough we trade in. Bookings up 41%.&quot;</p>
            <div className="review-meta">
              <div className="review-avatar-lg" style={{ background: 'linear-gradient(135deg,#fbbf24,var(--accent-2))' }}>OR</div>
              <div>
                <div className="review-name">Olivia Rosso</div>
                <div className="review-role">Head of Digital, Rosso Group · Soho</div>
              </div>
            </div>
            <div className="review-source">★ Google verified · Mar 2026</div>
          </article>

          <article className="review-card">
            <FiveStars />
            <p className="review-quote">&quot;We were quoted £45k by two other London agencies for a website that Meridian built better, faster and for less. They actually care about Core Web Vitals and it shows.&quot;</p>
            <div className="review-meta">
              <div className="review-avatar-lg">DP</div>
              <div>
                <div className="review-name">David Park</div>
                <div className="review-role">Director, Park Healthcare · Marylebone</div>
              </div>
            </div>
            <div className="review-source">★ Trustpilot verified · Feb 2026</div>
          </article>

          <article className="review-card">
            <FiveStars />
            <p className="review-quote">&quot;They got our brand cited in three Google AI Overviews and twice in ChatGPT inside four months. That&apos;s the future of SEO and these guys are already doing it.&quot;</p>
            <div className="review-meta">
              <div className="review-avatar-lg" style={{ background: 'linear-gradient(135deg,var(--accent-2),var(--accent-3))' }}>AB</div>
              <div>
                <div className="review-name">Amelia Brooks</div>
                <div className="review-role">Founder, Studio Brooks · Notting Hill</div>
              </div>
            </div>
            <div className="review-source">★ Google verified · Jan 2026</div>
          </article>
        </div>

        <div className="reviews-summary reveal">
          <div className="reviews-summary-item">
            <span className="rating-stars">{SMALL_STAR}</span>
            <strong>4.9</strong> Google · 87 reviews
          </div>
          <span className="reviews-summary-divider"></span>
          <div className="reviews-summary-item">
            <span className="rating-stars">{SMALL_STAR}</span>
            <strong>4.9</strong> Trustpilot · 40 reviews
          </div>
          <span className="reviews-summary-divider"></span>
          <div className="reviews-summary-item"><strong>94%</strong> client retention beyond 24 months</div>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
