/**
 * InternalLinks — automated contextual internal linking component.
 *
 * Analyses the current page context (service, borough, industry) and
 * generates relevant cross-links to strengthen the internal link graph
 * across 2,000+ pages.
 */
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { FEATURED_BOROUGHS, BOROUGHS } from '@/lib/boroughs';
import { INDUSTRIES } from '@/lib/industries';
import { POSTS } from '@/lib/blog';
import { GUIDES } from '@/lib/guides';

type Props = {
  currentService?: string;
  currentBorough?: string;
  currentIndustry?: string;
  maxLinks?: number;
};

type LinkItem = { href: string; label: string; type: 'service' | 'borough' | 'industry' | 'blog' | 'guide' };

export default function InternalLinks({
  currentService,
  currentBorough,
  currentIndustry,
  maxLinks = 12,
}: Props) {
  const links: LinkItem[] = [];

  // Related services (exclude current)
  const relatedServices = SERVICES.filter(s => s.slug !== currentService).slice(0, 3);
  relatedServices.forEach(s => {
    if (currentBorough) {
      links.push({ href: `/services/${s.slug}/${currentBorough}`, label: `${s.shortName} in ${BOROUGHS.find(b => b.slug === currentBorough)?.name || currentBorough}`, type: 'service' });
    } else {
      links.push({ href: `/services/${s.slug}`, label: s.shortName, type: 'service' });
    }
  });

  // Related boroughs (exclude current)
  const relatedBoroughs = currentBorough
    ? BOROUGHS.filter(b => b.slug !== currentBorough).slice(0, 3)
    : FEATURED_BOROUGHS.slice(0, 3);
  relatedBoroughs.forEach(b => {
    if (currentService) {
      links.push({ href: `/services/${currentService}/${b.slug}`, label: `${SERVICES.find(s => s.slug === currentService)?.shortName || ''} in ${b.name}`, type: 'borough' });
    } else {
      links.push({ href: `/london/${b.slug}`, label: b.name, type: 'borough' });
    }
  });

  // Related industries (exclude current)
  if (currentIndustry) {
    const relatedInds = INDUSTRIES.filter(i => i.slug !== currentIndustry).slice(0, 2);
    relatedInds.forEach(i => {
      links.push({ href: `/industries/${i.slug}`, label: i.shortName, type: 'industry' });
    });
  }

  // Related blog posts (keyword-match based on context)
  const contextKeywords = [currentService, currentBorough, currentIndustry].filter(Boolean);
  const relatedPosts = POSTS.filter(p =>
    contextKeywords.some(kw => kw && (p.keywords.some(k => k.includes(kw)) || p.category.toLowerCase().includes(kw)))
  ).slice(0, 2);
  relatedPosts.forEach(p => {
    links.push({ href: `/blog/${p.slug}`, label: p.title.slice(0, 50) + (p.title.length > 50 ? '...' : ''), type: 'blog' });
  });

  // Related guides
  const relatedGuides = GUIDES.filter(g =>
    contextKeywords.some(kw => kw && (g.keywords.some(k => k.includes(kw)) || g.category.toLowerCase().includes(kw)))
  ).slice(0, 2);
  relatedGuides.forEach(g => {
    links.push({ href: `/guides/${g.slug}`, label: g.title.slice(0, 50) + (g.title.length > 50 ? '...' : ''), type: 'guide' });
  });

  const finalLinks = links.slice(0, maxLinks);
  if (finalLinks.length === 0) return null;

  return (
    <section className="locations-section" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <div className="wrap">
        <div className="section-head" style={{ marginBottom: '20px' }}>
          <span className="section-eyebrow">RELATED</span>
        </div>
        <div className="borough-track">
          {finalLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`borough${link.type === 'service' || link.type === 'industry' ? ' featured' : ''}`}
            >
              <span className="dot"></span>{link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
