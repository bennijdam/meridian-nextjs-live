'use client';

import { useState } from 'react';
import CheckoutButton from './CheckoutButton';

type Retainer = {
  id: string;
  serviceName: string;
  tierName: string;
  tagline: string;
  paygMonthly: number;
  monthlyMonthly: number;
  annualMonthly: number;
  marketAvgMonthly: number;
  popular?: boolean;
  features: string[];
};

type Project = {
  id: string;
  serviceName: string;
  tierName: string;
  description: string;
  price: number;
  marketAvg: number;
  popular?: boolean;
  features: string[];
};

type Props = {
  retainers: Retainer[];
  projects: Project[];
  borough?: string;
};

type BillingCycle = 'payg' | 'monthly' | 'annual';

const CYCLE_LABELS: Record<BillingCycle, string> = {
  payg: 'Pay as you go',
  monthly: 'Monthly (6-mo min)',
  annual: 'Annual (save 17%)',
};

export default function PricingCards({ retainers, projects, borough }: Props) {
  const [cycle, setCycle] = useState<BillingCycle>('payg');

  const formatGBP = (n: number) => `£${n.toLocaleString('en-GB')}`;
  const calcSavings = (ours: number, market: number) => {
    if (!market || market <= 0) return 0;
    return Math.round(((market - ours) / market) * 100);
  };

  const getPrice = (r: Retainer) => {
    if (cycle === 'annual') return r.annualMonthly;
    if (cycle === 'monthly') return r.monthlyMonthly;
    return r.paygMonthly;
  };

  const getPeriod = (): 'payg' | 'monthly' | 'annual' => cycle;

  return (
    <>
      {/* Billing toggle */}
      {retainers.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '40px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '999px', padding: '4px', maxWidth: '500px', margin: '0 auto 40px' }}>
          {(['payg', 'monthly', 'annual'] as BillingCycle[]).map((c) => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              style={{
                padding: '10px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: cycle === c ? 600 : 400,
                background: cycle === c ? 'var(--ink)' : 'transparent',
                color: cycle === c ? 'var(--bg)' : 'var(--ink-2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all .2s ease',
                flex: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {CYCLE_LABELS[c]}
            </button>
          ))}
        </div>
      )}

      {/* Retainer cards */}
      {retainers.length > 0 && (
        <div className="includes-grid" style={{ marginBottom: '48px' }}>
          {retainers.map((r) => (
            <article key={r.id} className="include-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {r.popular && (
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>POPULAR</div>
              )}
              <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '6px' }}>{r.serviceName.toUpperCase()} · {r.tierName.toUpperCase()}</div>
              <h3 className="include-h">{r.serviceName} {r.tierName}{borough ? ` — ${borough}` : ''}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '10px 0 4px' }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '40px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(getPrice(r))}</span>
                <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginBottom: '6px' }}>
                vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(r.marketAvgMonthly)}</s> market avg · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavings(getPrice(r), r.marketAvgMonthly)}%</strong>
              </p>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', marginBottom: '14px' }}>{r.tagline}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', flex: 1 }}>
                {r.features.slice(0, 5).map((f, i) => (
                  <li key={i} style={{ fontSize: '12.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.45' }}>
                    <span style={{ color: 'var(--accent-3)', flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                productId={r.id}
                productKind="retainer"
                period={getPeriod()}
                label={r.popular ? 'Get Started →' : 'Choose Plan →'}
                className={r.popular ? 'btn btn-primary' : 'btn btn-ghost'}
              />
            </article>
          ))}
        </div>
      )}

      {/* Project cards */}
      {projects.length > 0 && (
        <>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,32px)', textAlign: 'center', margin: '0 0 28px', letterSpacing: '-0.015em' }}>One-off projects</h3>
          <div className="includes-grid">
            {projects.map((p) => (
              <article key={p.id} className="include-card" style={{ display: 'flex', flexDirection: 'column' }}>
                {p.popular && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>POPULAR</div>
                )}
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '6px' }}>{p.serviceName.toUpperCase()} · {p.tierName.toUpperCase()}</div>
                <h3 className="include-h">{p.serviceName} {p.tierName}{borough ? ` — ${borough}` : ''}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '10px 0 4px' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '40px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(p.price)}</span>
                  <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>fixed price</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginBottom: '6px' }}>
                  vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(p.marketAvg)}</s> market avg · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavings(p.price, p.marketAvg)}%</strong>
                </p>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', marginBottom: '14px' }}>{p.description}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', flex: 1 }}>
                  {p.features.slice(0, 5).map((f, i) => (
                    <li key={i} style={{ fontSize: '12.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.45' }}>
                      <span style={{ color: 'var(--accent-3)', flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <CheckoutButton
                  productId={p.id}
                  productKind="project"
                  label={p.popular ? 'Buy Now →' : 'Buy Now →'}
                  className={p.popular ? 'btn btn-primary' : 'btn btn-ghost'}
                />
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}
