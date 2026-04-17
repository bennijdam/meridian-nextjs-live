'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { LeadMagnet } from '@/lib/lead-magnets';

type Props = {
  magnets: LeadMagnet[];
};

const CATEGORIES: Array<LeadMagnet['category'] | 'All'> = [
  'All',
  'SEO',
  'PPC',
  'Web',
  'eCommerce',
  'Social',
  'General',
];

export default function LeadMagnetGrid({ magnets }: Props) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>('All');

  const filtered = useMemo(() => {
    if (active === 'All') return magnets;
    return magnets.filter((m) => m.category === active);
  }, [magnets, active]);

  return (
    <>
      <div
        className="borough-track reveal"
        role="tablist"
        aria-label="Filter resources by category"
        style={{ justifyContent: 'center', marginBottom: '40px' }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(cat)}
              className={isActive ? 'borough featured' : 'borough'}
              style={{ cursor: 'pointer', border: 0, font: 'inherit' }}
            >
              <span className="dot" />
              {cat}
            </button>
          );
        })}
      </div>

      <div className="includes-grid stagger-grid reveal">
        {filtered.map((m) => (
          <Link
            key={m.slug}
            href={`/resources/${m.slug}`}
            className="include-card"
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', textDecoration: 'none' }}
          >
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'var(--mono)',
                color: 'var(--ink-3)',
                letterSpacing: '0.06em',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}
            >
              {m.category} · {m.format}
              {m.pages ? ` · ${m.pages} pages` : ''}
            </div>
            <div style={{ fontSize: '40px', marginBottom: '8px' }} aria-hidden="true">
              {m.icon}
            </div>
            <h3 className="include-h" style={{ fontSize: '20px' }}>
              {m.title}
            </h3>
            <p className="include-p" style={{ flex: 1 }}>
              {m.subtitle}
            </p>
            <span
              style={{
                fontSize: '13px',
                color: 'var(--accent)',
                marginTop: '14px',
                display: 'block',
                fontWeight: 500,
              }}
            >
              Download free →
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--ink-2)', marginTop: '24px' }}>
          No resources in this category yet — more on the way.
        </p>
      )}
    </>
  );
}
