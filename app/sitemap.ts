import type { MetadataRoute } from 'next';
import { ALL_BOROUGH_SLUGS } from '@/lib/boroughs';
import { ALL_SERVICE_SLUGS } from '@/lib/services';
import { ALL_POST_SLUGS } from '@/lib/blog';
import { ALL_INDUSTRY_SLUGS } from '@/lib/industries';
import { ALL_PLATFORM_SLUGS } from '@/lib/platforms';
import { ALL_CITY_SLUGS, getAllCityAreas } from '@/lib/cities';
import { CASE_STUDIES } from '@/lib/case-studies';
import { ALL_COST_SLUGS } from '@/lib/cost-pages';
import { ALL_COMPARISON_SLUGS } from '@/lib/comparisons';
import { ALL_GUIDE_SLUGS } from '@/lib/guides';
import { ALL_BEST_SLUGS } from '@/lib/best-pages';
import { ALL_TARGETED_SLUGS } from '@/lib/targeted';
import { ALL_NEIGHBORHOOD_SLUGS } from '@/lib/neighborhoods';
import { ALL_AUDIENCE_SLUGS } from '@/lib/audiences';
import { ALL_LEAD_MAGNET_SLUGS } from '@/lib/lead-magnets';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const top: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,         lastModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/services`, lastModified, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${SITE}/london`,   lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/pricing`,  lastModified, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE}/about`,    lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contact`,  lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/audit`,    lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/reviews`,  lastModified, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${SITE}/results`,  lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/faq`,      lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/blog`,     lastModified, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${SITE}/privacy`,  lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE}/terms`,    lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE}/cookies`,  lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE}/account`,  lastModified, changeFrequency: 'monthly', priority: 0.4 },
  ];

  const services: MetadataRoute.Sitemap = ALL_SERVICE_SLUGS.map(slug => ({
    url: `${SITE}/services/${slug}`,
    lastModified, changeFrequency: 'weekly', priority: 0.9,
  }));

  const boroughs: MetadataRoute.Sitemap = ALL_BOROUGH_SLUGS.map(slug => ({
    url: `${SITE}/london/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.7,
  }));

  const serviceBoroughs: MetadataRoute.Sitemap = [];
  for (const slug of ALL_SERVICE_SLUGS) {
    for (const borough of ALL_BOROUGH_SLUGS) {
      serviceBoroughs.push({
        url: `${SITE}/services/${slug}/${borough}`,
        lastModified, changeFrequency: 'monthly', priority: 0.6,
      });
    }
  }

  const blogPosts: MetadataRoute.Sitemap = ALL_POST_SLUGS.map(slug => ({
    url: `${SITE}/blog/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.8,
  }));

  // City hub pages (Manchester, Edinburgh, Birmingham, Bristol)
  const cityHubs: MetadataRoute.Sitemap = ALL_CITY_SLUGS.map(slug => ({
    url: `${SITE}/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.85,
  }));

  // City x area pages (~49 pages)
  const allCityAreas = getAllCityAreas();
  const cityAreas: MetadataRoute.Sitemap = allCityAreas.map(({ citySlug, areaSlug }) => ({
    url: `${SITE}/${citySlug}/${areaSlug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.65,
  }));

  // City x area x service pages (~528 pages)
  const cityAreaServices: MetadataRoute.Sitemap = [];
  for (const { citySlug, areaSlug } of allCityAreas) {
    for (const serviceSlug of ALL_SERVICE_SLUGS) {
      cityAreaServices.push({
        url: `${SITE}/${citySlug}/${areaSlug}/${serviceSlug}`,
        lastModified, changeFrequency: 'monthly', priority: 0.55,
      });
    }
  }

  // Industry hub pages (15)
  const industryHubs: MetadataRoute.Sitemap = ALL_INDUSTRY_SLUGS.map(slug => ({
    url: `${SITE}/industries/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.85,
  }));

  // Industry x service matrix (15 x 11 = 165)
  const industryServices: MetadataRoute.Sitemap = [];
  for (const industry of ALL_INDUSTRY_SLUGS) {
    for (const service of ALL_SERVICE_SLUGS) {
      industryServices.push({
        url: `${SITE}/industries/${industry}/${service}`,
        lastModified, changeFrequency: 'monthly', priority: 0.6,
      });
    }
  }

  // Industry x borough matrix (15 x 44 = 660)
  const industryBoroughs: MetadataRoute.Sitemap = [];
  for (const industry of ALL_INDUSTRY_SLUGS) {
    for (const borough of ALL_BOROUGH_SLUGS) {
      industryBoroughs.push({
        url: `${SITE}/industries/${industry}/${borough}`,
        lastModified, changeFrequency: 'monthly', priority: 0.5,
      });
    }
  }

  // Platform pages (15)
  const platforms: MetadataRoute.Sitemap = ALL_PLATFORM_SLUGS.map(slug => ({
    url: `${SITE}/platforms/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.8,
  }));

  // Case study pages
  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map(cs => ({
    url: `${SITE}/case-studies/${cs.slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.8,
  }));

  // Cost guide pages (7)
  const costPages: MetadataRoute.Sitemap = ALL_COST_SLUGS.map(slug => ({
    url: `${SITE}/cost/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.8,
  }));

  // Comparison pages (5)
  const comparePages: MetadataRoute.Sitemap = ALL_COMPARISON_SLUGS.map(slug => ({
    url: `${SITE}/compare/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.8,
  }));

  // Guide pages (5)
  const guidePages: MetadataRoute.Sitemap = ALL_GUIDE_SLUGS.map(slug => ({
    url: `${SITE}/guides/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.8,
  }));

  // "Best X in London" pages (7)
  const bestPages: MetadataRoute.Sitemap = ALL_BEST_SLUGS.map(slug => ({
    url: `${SITE}/best/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.8,
  }));

  // "Near me" pages (44)
  const nearPages: MetadataRoute.Sitemap = ALL_BOROUGH_SLUGS.map(slug => ({
    url: `${SITE}/near/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.65,
  }));

  // Triple-matrix (service × industry × borough) targeted pages
  const targetedIndex: MetadataRoute.Sitemap = [
    { url: `${SITE}/targeted`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
  ];
  const targetedPages: MetadataRoute.Sitemap = ALL_TARGETED_SLUGS.map(slug => ({
    url: `${SITE}/targeted/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.7,
  }));

  // London sub-neighborhood landing pages (~50)
  const neighborhoodIndex: MetadataRoute.Sitemap = [
    { url: `${SITE}/london/neighborhoods`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
  ];
  const neighborhoodPages: MetadataRoute.Sitemap = ALL_NEIGHBORHOOD_SLUGS.map(slug => ({
    url: `${SITE}/london/neighborhoods/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.7,
  }));

  // London audience landing pages (10)
  const audienceIndex: MetadataRoute.Sitemap = [
    { url: `${SITE}/london/for`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
  ];
  const audiencePages: MetadataRoute.Sitemap = ALL_AUDIENCE_SLUGS.map(slug => ({
    url: `${SITE}/london/for/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.8,
  }));

  // "Near me" service pages — one per service (11)
  const nearMeIndex: MetadataRoute.Sitemap = [
    { url: `${SITE}/near-me`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
  ];
  const nearMeServicePages: MetadataRoute.Sitemap = ALL_SERVICE_SLUGS.map(slug => ({
    url: `${SITE}/near-me/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.75,
  }));

  // Lead magnet resources (/resources + 6 individual pages)
  const resourcesIndex: MetadataRoute.Sitemap = [
    { url: `${SITE}/resources`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
  ];
  const leadMagnetPages: MetadataRoute.Sitemap = ALL_LEAD_MAGNET_SLUGS.map(slug => ({
    url: `${SITE}/resources/${slug}`,
    lastModified, changeFrequency: 'monthly', priority: 0.85,
  }));

  // Static pages added in Phase 3
  const phase3: MetadataRoute.Sitemap = [
    { url: `${SITE}/industries`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/platforms`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/partners`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/careers`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/case-studies`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/compare`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/guides`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];

  return [
    ...top, ...services, ...boroughs, ...serviceBoroughs, ...blogPosts,
    ...industryHubs, ...industryServices, ...industryBoroughs, ...platforms,
    ...cityHubs, ...cityAreas, ...cityAreaServices,
    ...caseStudies, ...phase3,
    ...costPages, ...comparePages, ...guidePages,
    ...bestPages, ...nearPages,
    ...targetedIndex, ...targetedPages,
    ...neighborhoodIndex, ...neighborhoodPages,
    ...audienceIndex, ...audiencePages,
    ...nearMeIndex, ...nearMeServicePages,
    ...resourcesIndex, ...leadMagnetPages,
  ];
}
