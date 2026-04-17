import type { Metadata } from 'next';
import Link from 'next/link';
import { BOROUGHS, FEATURED_BOROUGHS } from '@/lib/boroughs';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'London Coverage — All 32 Boroughs + The City | Meridian',
  description: 'Local SEO and digital marketing for every London borough. From Shoreditch to Croydon, Mayfair to Wimbledon — the same senior team, dialled to your borough.',
  alternates: { canonical: '/london' },
};

const ZONES = {
  central: ['mayfair','soho','kensington','chelsea','marylebone','fitzrovia','bloomsbury','holborn','clerkenwell','farringdon','paddington','notting-hill'],
  city:    ['shoreditch','canary-wharf','tower-hamlets','islington','hackney','kings-cross','camden'],
  east:    ['stratford','newham','waltham-forest','bermondsey','greenwich','lewisham','redbridge'],
  south:   ['southwark','lambeth','wandsworth','clapham','brixton','wimbledon','putney','croydon','richmond','kingston'],
  west:    ['hammersmith','chiswick','ealing','hounslow','brent','harrow'],
  north:   ['haringey','enfield','barnet'],
};

const ZONE_LABELS = {
  central: 'Central London',
  city:    'City & East-Central',
  east:    'East London',
  south:   'South London',
  west:    'West London',
  north:   'North London',
};

export default function LondonHubPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'London', url: '/london' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

      <main className="wrap" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        {/* HERO */}
        <header style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 60px' }} className="reveal">
          <span className="section-eyebrow">LOCATIONS</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}>
            Every <span className="accent">borough</span>. Every postcode.<br/>One London team.
          </h1>
          <p className="section-sub">
            We don&apos;t outsource London. The same 14-person senior team that wins your hero terms also wins your borough 3-pack — across all 32 boroughs plus the City.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center', marginTop: '32px' }}>
            <Link href="/#audit" className="btn btn-primary">Get Free SEO Audit</Link>
            <Link href="/services" className="btn btn-ghost">See services</Link>
          </div>
        </header>

        {/* FEATURED HUBS */}
        <section style={{ marginBottom: '80px' }}>
          <div className="section-head reveal" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <span className="section-eyebrow">DEEPEST DEPTH</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Where most of our clients are
            </h2>
            <p className="section-sub" style={{ textAlign: 'left' }}>
              These five hubs account for ~70% of our active clients. We know the local SERPs, the local competitors and the local press contacts inside out.
            </p>
          </div>
          <div className="featured-borough-grid reveal">
            {FEATURED_BOROUGHS.map(b => (
              <Link key={b.slug} href={`/london/${b.slug}`} className="featured-borough-card">
                <div className="fbc-postcode">{b.postcodes.join(' · ')}</div>
                <h3 className="fbc-name">{b.name}</h3>
                <p className="fbc-tagline">{b.tagline}</p>
                <div className="fbc-arrow">→</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ALL BOROUGHS BY ZONE */}
        <section style={{ marginBottom: '80px' }}>
          <div className="section-head reveal" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <span className="section-eyebrow">FULL COVERAGE</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              All 44 areas — Central to outer
            </h2>
          </div>
          <div className="zone-stack reveal">
            {(Object.keys(ZONES) as Array<keyof typeof ZONES>).map(zone => {
              const zoneBoroughs = ZONES[zone].map(slug => BOROUGHS.find(b => b.slug === slug)).filter(Boolean);
              return (
                <div key={zone} className="zone-block">
                  <h3 className="zone-label">{ZONE_LABELS[zone]}</h3>
                  <div className="borough-track" style={{ justifyContent: 'flex-start' }}>
                    {zoneBoroughs.map(b => (
                      <Link key={b!.slug} href={`/london/${b!.slug}`} className="borough">
                        <span className="dot" />{b!.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW LOCAL SEO WORKS */}
        <section className="why-section">
          <div className="section-head reveal" style={{ marginBottom: '32px' }}>
            <span className="section-eyebrow">HOW IT WORKS</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              How borough-level SEO actually wins
            </h2>
          </div>
          <div className="why-grid reveal">
            <div className="why-card">
              <div className="why-num">3-pack</div>
              <div className="why-label">Win the Google Business Profile 3-pack for &quot;[service] [your borough]&quot; — the highest-converting placement on the SERP.</div>
            </div>
            <div className="why-card">
              <div className="why-num">KD&nbsp;15-35</div>
              <div className="why-label">Borough-level keywords are 60-70% lower difficulty than &quot;[service] London&quot; — same intent, far less competition.</div>
            </div>
            <div className="why-card">
              <div className="why-num">6-8&nbsp;wks</div>
              <div className="why-label">Typical time to ranking for borough long-tail vs 4-6 months for hero London terms. Compounds together.</div>
            </div>
            <div className="why-card">
              <div className="why-num">+4-7x</div>
              <div className="why-label">Conversion rate uplift on borough-targeted landing pages vs generic London pages. Local intent = qualified buyer.</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="final-cta" style={{ padding: '60px 0' }}>
          <div className="final-card reveal">
            <h2 className="final-h">Don&apos;t see your borough?</h2>
            <p className="final-p">We cover every London postcode. Send us yours and we&apos;ll spin up a borough-specific audit.</p>
            <Link href="/contact" className="btn btn-primary" style={{ marginTop: '20px' }}>Get in touch →</Link>
          </div>
        </section>
      </main>
    </>
  );
}
