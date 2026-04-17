/**
 * lib/targeted.ts — Triple-matrix SEO pages.
 *
 * 20 strategic service+industry pairs × 10 top-tier London boroughs = 200
 * ultra-long-tail landing pages targeting queries like:
 *   - "fintech seo agency shoreditch"
 *   - "saas web design canary wharf"
 *   - "ecommerce ppc mayfair"
 *
 * Combo slug format: "{serviceRoot}-{industry}-{borough}"
 *   e.g. "seo-fintech-shoreditch", "web-design-saas-mayfair"
 *
 * We strip the "-london" suffix from the service slug for the URL so the
 * resulting URL reads naturally.
 */
import { getService, type Service, SERVICES } from './services';
import { getIndustry, type Industry } from './industries';
import { getBorough, type Borough } from './boroughs';

/** The 20 highest-value service + industry pairs, based on search volume
 *  and commercial intent. */
export const STRATEGIC_COMBOS: Array<{
  service: string;     // lib/services slug (full, incl. -london)
  industry: string;    // lib/industries slug
  boroughs: string[];  // borough slugs
}> = (() => {
  const TOP_BOROUGHS = [
    'shoreditch', 'mayfair', 'canary-wharf', 'kings-cross', 'soho',
    'camden', 'hackney', 'islington', 'farringdon', 'clerkenwell',
  ];
  const PAIRS: Array<[string, string]> = [
    ['seo-london', 'fintech'],
    ['seo-london', 'saas'],
    ['seo-london', 'ecommerce'],
    ['seo-london', 'legal'],
    ['seo-london', 'healthcare'],
    ['ppc-london', 'ecommerce'],
    ['ppc-london', 'saas'],
    ['ppc-london', 'legal'],
    ['web-design-london', 'fintech'],
    ['web-design-london', 'ecommerce'],
    ['web-design-london', 'startup'],
    ['app-development-london', 'fintech'],
    ['app-development-london', 'healthcare'],
    ['app-development-london', 'startup'],
    ['ecommerce-london', 'fashion-retail'],
    ['ecommerce-london', 'food-beverage'],
    ['email-marketing-london', 'ecommerce'],
    ['social-media-london', 'hospitality'],
    ['social-media-london', 'beauty-wellness'],
    ['copywriting-london', 'saas'],
  ];
  return PAIRS.map(([service, industry]) => ({
    service, industry, boroughs: TOP_BOROUGHS,
  }));
})();

/**
 * Build the URL slug piece (i.e. strip `-london` from the end of the
 * service slug so "seo-london" becomes "seo").
 */
function serviceRoot(serviceSlug: string): string {
  return serviceSlug.replace(/-london$/, '');
}

export type TargetedCombo = {
  /** Combined slug used in the URL, e.g. "seo-fintech-shoreditch" */
  slug: string;
  service: Service;
  industry: Industry;
  borough: Borough;
};

/** All 200 targeted combinations, fully resolved. Invalid refs are silently
 *  skipped so a mistyped slug in STRATEGIC_COMBOS doesn't blow up the build. */
export const TARGETED_COMBOS: TargetedCombo[] = (() => {
  const combos: TargetedCombo[] = [];
  for (const row of STRATEGIC_COMBOS) {
    const s = getService(row.service);
    const ind = getIndustry(row.industry);
    if (!s || !ind) continue;
    const root = serviceRoot(s.slug);
    for (const boroughSlug of row.boroughs) {
      const b = getBorough(boroughSlug);
      if (!b) continue;
      combos.push({
        slug: `${root}-${ind.slug}-${b.slug}`,
        service: s,
        industry: ind,
        borough: b,
      });
    }
  }
  return combos;
})();

export const ALL_TARGETED_SLUGS: string[] = TARGETED_COMBOS.map(c => c.slug);

/** Lookup a combo by its URL slug. */
export function getTargeted(slug: string): TargetedCombo | undefined {
  return TARGETED_COMBOS.find(c => c.slug === slug);
}

/** Group combos by service for the /targeted index page. */
export function groupTargetedByService(): Array<{
  service: Service;
  combos: TargetedCombo[];
}> {
  const map = new Map<string, { service: Service; combos: TargetedCombo[] }>();
  for (const c of TARGETED_COMBOS) {
    const key = c.service.slug;
    if (!map.has(key)) map.set(key, { service: c.service, combos: [] });
    map.get(key)!.combos.push(c);
  }
  // Preserve the SERVICES ordering for a stable, recognisable grouping.
  const ordered: Array<{ service: Service; combos: TargetedCombo[] }> = [];
  for (const s of SERVICES) {
    const entry = map.get(s.slug);
    if (entry) ordered.push(entry);
  }
  return ordered;
}

/** Same service+industry in other boroughs (cross-link helper). */
export function sameServiceIndustryOtherBoroughs(c: TargetedCombo): TargetedCombo[] {
  return TARGETED_COMBOS.filter(x =>
    x.service.slug === c.service.slug &&
    x.industry.slug === c.industry.slug &&
    x.borough.slug !== c.borough.slug,
  );
}

/** Same industry+borough with other services (cross-link helper). */
export function sameIndustryBoroughOtherServices(c: TargetedCombo): TargetedCombo[] {
  return TARGETED_COMBOS.filter(x =>
    x.industry.slug === c.industry.slug &&
    x.borough.slug === c.borough.slug &&
    x.service.slug !== c.service.slug,
  );
}

/** Same service+borough with other industries (cross-link helper). */
export function sameServiceBoroughOtherIndustries(c: TargetedCombo): TargetedCombo[] {
  return TARGETED_COMBOS.filter(x =>
    x.service.slug === c.service.slug &&
    x.borough.slug === c.borough.slug &&
    x.industry.slug !== c.industry.slug,
  );
}

