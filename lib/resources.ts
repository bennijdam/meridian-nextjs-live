/**
 * Gated lead magnet resources.
 * Email gate → PDF delivery via Resend.
 */

export type Resource = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  format: string;
  pageCount: string;
  image: string;
  description: string;
  whatYouGet: string[];
  preview: string;
};

export const RESOURCES: Resource[] = [
  {
    slug: 'london-seo-playbook-2026',
    title: 'The London SEO Playbook 2026',
    metaTitle: 'London SEO Playbook 2026 | Free PDF Download | Meridian',
    metaDescription: 'Free 40-page London SEO playbook. Borough-level keyword strategy, AI Overview optimisation, technical checklist, content calendar template.',
    keywords: ['london seo playbook', 'seo guide london', 'seo strategy template'],
    category: 'SEO', format: 'PDF', pageCount: '40 pages', image: 'seo-search-optimisation',
    description: 'A comprehensive 40-page SEO playbook specifically for London businesses. Covers borough-level keyword strategy, AI Overview optimisation, technical SEO checklist, and a 90-day content calendar template.',
    whatYouGet: ['Borough-level keyword research template (44 boroughs × your service terms)', 'AI Overview / GEO optimisation checklist (15 points)', 'Technical SEO audit template (Core Web Vitals, schema, mobile)', '90-day content calendar template with topic clusters', 'Link building outreach templates for UK authoritative sources', 'Monthly reporting dashboard template'],
    preview: 'Sample: Chapter 1 covers the London search landscape in 2026, including AI Overview penetration rates by query type, borough-level keyword opportunity sizing, and the seasonality patterns that determine when to publish content for maximum January-peak impact.',
  },
  {
    slug: 'app-development-cost-calculator',
    title: 'London App Development Cost Calculator',
    metaTitle: 'App Development Cost Calculator London | Free Tool | Meridian',
    metaDescription: 'Free app development cost calculator for London. Estimate your MVP, production app, or enterprise platform cost. Native vs cross-platform comparison.',
    keywords: ['app development cost calculator', 'how much does an app cost london', 'app cost estimator'],
    category: 'App Development', format: 'Interactive PDF', pageCount: '12 pages', image: 'web-hosting-domain',
    description: 'An interactive cost estimator for London app development projects. Fill in your requirements and get instant cost estimates for MVP, production, and enterprise builds — plus a native vs cross-platform comparison.',
    whatYouGet: ['Interactive cost estimator by feature complexity', 'Native (Swift/Kotlin) vs cross-platform (Flutter/React Native) comparison', 'Timeline estimator based on feature count', 'Compliance cost add-on calculator (FCA, PCI-DSS, NHS DSP)', 'App Store submission checklist', 'Post-launch maintenance budget planner'],
    preview: 'Sample: The calculator walks you through 8 categories — auth, payments, real-time features, push notifications, analytics, admin dashboard, third-party integrations, and compliance — and estimates development hours per category.',
  },
  {
    slug: 'innovator-visa-checklist',
    title: 'Innovator Founder Visa Business Plan Checklist',
    metaTitle: 'Innovator Founder Visa Checklist | Free PDF | Meridian',
    metaDescription: 'Free Innovator Founder visa business plan checklist. Endorsing body criteria mapping, required sections, financial model template, common mistakes.',
    keywords: ['innovator founder visa checklist', 'innovator visa business plan template', 'uk startup visa checklist'],
    category: 'Business Plans', format: 'PDF', pageCount: '15 pages', image: 'branding-strategy',
    description: 'A complete checklist for writing an endorsing-body-approved Innovator Founder visa business plan. Maps every endorsing body criterion to specific plan sections with examples of what passes and what fails.',
    whatYouGet: ['Endorsing body criteria mapping (Innovation, Viability, Scalability)', 'Section-by-section plan structure with word counts', 'Financial projection templates (3-year and 5-year)', 'Customer evidence checklist (what endorsers want to see)', 'Common rejection reasons and how to avoid them', 'Sample executive summary structure'],
    preview: 'Sample: Section 3 covers the Viability criterion in detail, including the specific financial metrics endorsing bodies look for, the minimum customer evidence threshold, and the team experience requirements.',
  },
  {
    slug: 'web-design-brief-template',
    title: 'Web Design Brief Template for London Businesses',
    metaTitle: 'Web Design Brief Template | Free Download | Meridian',
    metaDescription: 'Free web design brief template. Structure your requirements for any agency. Platform comparison, content checklist, SEO requirements, budget guide.',
    keywords: ['web design brief template', 'website brief template', 'web design rfp template'],
    category: 'Web Design', format: 'PDF + Notion', pageCount: '20 pages', image: 'ux-ui-design',
    description: 'A structured brief template that helps London businesses communicate their web design requirements to any agency. Includes platform comparison, content checklist, SEO requirements, and budget guide.',
    whatYouGet: ['Structured brief template (fill-in-the-blanks)', 'Platform comparison matrix (Webflow vs Next.js vs Shopify vs WordPress)', 'Content preparation checklist (copy, images, video)', 'SEO requirements specification template', 'Core Web Vitals performance targets to include in contracts', 'Budget range guide by project type'],
    preview: 'Sample: The brief template includes 8 sections — business context, target audience, competitor examples, feature requirements, content inventory, SEO targets, performance requirements, and timeline/budget.',
  },
  {
    slug: 'ppc-audit-template',
    title: 'Google Ads Account Audit Template',
    metaTitle: 'Google Ads Audit Template | Free PPC Checklist | Meridian',
    metaDescription: 'Free Google Ads account audit template. 50-point checklist covering account structure, tracking, bid strategy, ad copy, and landing pages.',
    keywords: ['google ads audit template', 'ppc audit checklist', 'google ads checklist'],
    category: 'PPC', format: 'PDF + Spreadsheet', pageCount: '25 pages', image: 'digital-marketing-team',
    description: 'A 50-point Google Ads audit template used by Meridian\'s PPC team. Covers account structure, conversion tracking, bid strategy, ad copy, landing page quality, and budget allocation.',
    whatYouGet: ['50-point account audit checklist', 'Account structure best-practices template', 'Conversion tracking verification checklist', 'Bid strategy decision framework', 'Ad copy A/B testing template', 'Landing page CRO checklist (15 points)', 'Budget allocation calculator by campaign type'],
    preview: 'Sample: Section 1 (Account Structure) covers campaign naming conventions, ad group granularity, keyword match type distribution, and negative keyword management — the single highest-leverage area in most underperforming accounts.',
  },
  {
    slug: 'social-media-content-calendar',
    title: 'Social Media Content Calendar Template 2026',
    metaTitle: 'Social Media Content Calendar 2026 | Free Template | Meridian',
    metaDescription: 'Free social media content calendar template for 2026. Instagram, TikTok, LinkedIn scheduling. Content pillars, posting cadence, engagement tracking.',
    keywords: ['social media content calendar template', 'instagram content calendar', 'social media schedule template'],
    category: 'Social Media', format: 'Spreadsheet + Notion', pageCount: '12 pages', image: 'social-media-management',
    description: 'A ready-to-use content calendar template for Instagram, TikTok, and LinkedIn. Includes content pillar framework, optimal posting cadence, and engagement tracking dashboard.',
    whatYouGet: ['12-month content calendar template (Google Sheets)', 'Content pillar framework (4 pillars per brand)', 'Platform-specific posting cadence recommendations', 'Reel/TikTok script template', 'LinkedIn ghostwriting template for founders', 'Engagement tracking dashboard', 'Hashtag research template'],
    preview: 'Sample: The content pillar framework helps you define 4 content categories that balance educational, entertaining, promotional, and community-building content — with recommended ratios per platform.',
  },
];

export const ALL_RESOURCE_SLUGS = RESOURCES.map(r => r.slug);

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find(r => r.slug === slug);
}
