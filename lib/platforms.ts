/**
 * Platform/technology pages data layer.
 * Powers: /platforms/[platform] — 15 pages targeting platform-specific searches.
 */

export type Platform = {
  slug: string;
  name: string;
  category: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  bullets: string[];
  relatedServices: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const PLATFORMS: Platform[] = [
  {
    slug: 'shopify', name: 'Shopify', category: 'eCommerce', icon: '🛍️',
    metaTitle: 'Shopify Agency London | Expert Development & Marketing | Meridian',
    metaDescription: 'London Shopify agency. Custom themes, Shopify Plus, app integrations, eCommerce SEO.',
    keywords: ['shopify agency london', 'shopify developer london', 'shopify expert london', 'shopify plus agency london'],
    intro: 'Certified Shopify experts for London brands. Custom themes, Shopify Plus builds, app integrations, and eCommerce growth marketing.',
    bullets: ['Custom Shopify theme development — pixel-perfect, conversion-optimised', 'Shopify Plus: checkout extensibility, B2B, Markets for international', 'App integration: Klaviyo, Gorgias, ReCharge, Yotpo, Loyalty Lion', 'Shopify SEO: product schema, collection architecture, site speed', 'Migration: WooCommerce, Magento, Squarespace to Shopify', 'Ongoing growth retainer: CRO, email flows, paid ads'],
    relatedServices: ['ecommerce-london', 'seo-london', 'web-design-london', 'email-marketing-london'],
    faqs: [{ q: 'Are you Shopify Partners?', a: 'Yes. Official Shopify Partners with Shopify Plus experience.' }, { q: 'How much does a Shopify store cost?', a: 'Starter: £4,990. Custom theme: £8,500–£15,000. Shopify Plus: £25,000+.' }, { q: 'Can you migrate from WooCommerce?', a: 'Yes. Full migration including products, customers, orders, and URLs.' }],
  },
  {
    slug: 'wordpress', name: 'WordPress', category: 'CMS', icon: '📝',
    metaTitle: 'WordPress Agency London | Design, Development & SEO | Meridian',
    metaDescription: 'London WordPress agency. Custom themes, headless WordPress, WooCommerce, and SEO.',
    keywords: ['wordpress web design london', 'wordpress designer london', 'wordpress developer london'],
    intro: 'WordPress powers 40% of the web. We develop custom WordPress sites that are fast, secure, and SEO-optimised.',
    bullets: ['Custom WordPress theme development with Gutenberg', 'Headless WordPress with Next.js frontend', 'WooCommerce development', 'WordPress security: hardening, WAF, malware scanning', 'WordPress SEO: schema, speed, content structure', 'Ongoing maintenance and hosting management'],
    relatedServices: ['web-design-london', 'seo-london', 'ecommerce-london', 'copywriting-london'],
    faqs: [{ q: 'Is WordPress still good in 2026?', a: 'For content-heavy sites — yes. For simple marketing sites, Webflow or Next.js may be better.' }, { q: 'How much does a WordPress site cost?', a: 'Brochure: £4,500–£8,500. Custom theme: £8,500–£15,000. Headless: £15,000+.' }, { q: 'Can you fix my existing site?', a: 'Yes. Performance audits, security hardening, redesigns, and migrations.' }],
  },
  {
    slug: 'webflow', name: 'Webflow', category: 'CMS', icon: '🎨',
    metaTitle: 'Webflow Designer London | Custom Sites & CMS | Meridian',
    metaDescription: 'London Webflow agency. Custom design, CMS, animations, and SEO.',
    keywords: ['webflow designer london', 'webflow agency london', 'webflow developer london'],
    intro: 'Webflow is the best platform for marketing sites that need to look exceptional. We design custom Webflow sites with CMS, interactions, and SEO.',
    bullets: ['Custom Webflow design with interactions and scroll effects', 'CMS setup: blog, case studies, team, careers', 'Webflow SEO: schema, Open Graph, sitemap', 'Webflow + Make/Zapier integrations', 'Design system in Webflow: reusable components', 'Migration from WordPress or Squarespace'],
    relatedServices: ['web-design-london', 'seo-london', 'branding-london', 'copywriting-london'],
    faqs: [{ q: 'Why Webflow over WordPress?', a: 'Pixel-perfect control without developer dependency. Built-in hosting and security.' }, { q: 'How much does a Webflow site cost?', a: 'Marketing site: £4,500–£8,500. Complex with CMS: £8,500–£15,000.' }, { q: 'Can my team update it?', a: 'Yes. Webflow CMS is easy for non-technical teams.' }],
  },
  {
    slug: 'flutter', name: 'Flutter', category: 'Mobile', icon: '📱',
    metaTitle: 'Flutter Developer London | Cross-Platform Apps | Meridian',
    metaDescription: 'London Flutter developers. Cross-platform iOS and Android apps from a single codebase.',
    keywords: ['flutter developer london', 'flutter agency london', 'flutter app development london'],
    intro: 'Flutter: beautiful, high-performance iOS and Android apps from a single Dart codebase — cutting dev time by 40%.',
    bullets: ['Cross-platform iOS + Android from a single codebase', 'Custom UI: Material, Cupertino, and fully custom', 'Backend: Firebase, Supabase, custom APIs', 'State management: Riverpod, Bloc, Provider', 'CI/CD: Codemagic or Bitrise', 'App Store + Play Store submission'],
    relatedServices: ['app-development-london', 'web-design-london', 'branding-london'],
    faqs: [{ q: 'Flutter or React Native?', a: 'Flutter for consistent UI and strong performance. React Native for JS teams.' }, { q: 'How much does a Flutter app cost?', a: 'MVP: £15,000–£35,000. Production: £35,000–£80,000.' }, { q: 'Can you build web apps with Flutter?', a: 'Yes. Flutter Web works for internal tools. For public sites, we recommend Next.js.' }],
  },
  {
    slug: 'react-native', name: 'React Native', category: 'Mobile', icon: '⚛️',
    metaTitle: 'React Native Developer London | Mobile Apps | Meridian',
    metaDescription: 'London React Native developers. Cross-platform mobile apps with native performance.',
    keywords: ['react native developer london', 'react native agency london'],
    intro: 'React Native: native iOS and Android apps for JavaScript/TypeScript teams.',
    bullets: ['Cross-platform with native performance', 'Expo or bare workflow', 'TypeScript-first development', 'Native module integration', 'Backend: Node.js, Supabase, Firebase', 'Over-the-air updates via EAS Update'],
    relatedServices: ['app-development-london', 'web-design-london'],
    faqs: [{ q: 'React Native or Flutter?', a: 'React Native for JS/TS teams. Flutter for complex custom UI.' }, { q: 'How much does a React Native app cost?', a: 'MVP: £15,000–£35,000. Production: £35,000–£80,000.' }, { q: 'Can we share code with web?', a: 'Yes. React Native + Next.js share business logic and some UI components.' }],
  },
  {
    slug: 'hubspot', name: 'HubSpot', category: 'CRM', icon: '🔧',
    metaTitle: 'HubSpot Agency London | CRM, Marketing, Sales Hub | Meridian',
    metaDescription: 'London HubSpot agency. CRM implementation, marketing automation, Sales Hub.',
    keywords: ['hubspot agency london', 'hubspot consultant london', 'hubspot implementation london'],
    intro: 'HubSpot is the leading CRM for B2B — but most implementations waste 80% of its capability. We set it up properly.',
    bullets: ['CRM setup: properties, pipelines, lifecycle stages, lead scoring', 'Marketing Hub: email automation, workflows, landing pages', 'Sales Hub: sequences, meeting scheduler, deal tracking', 'HubSpot website on CMS Hub', 'Migration from Salesforce or Pipedrive', 'Ongoing management and training'],
    relatedServices: ['email-marketing-london', 'copywriting-london', 'web-design-london', 'seo-london'],
    faqs: [{ q: 'Are you HubSpot certified?', a: 'Yes. Certifications across Marketing, Sales, CMS, and Operations hubs.' }, { q: 'How much does implementation cost?', a: 'Basic CRM: £2,500–£5,000. Full implementation: £5,000–£15,000.' }, { q: 'HubSpot or Salesforce?', a: 'HubSpot for SMBs. Salesforce for enterprise with complex processes.' }],
  },
  {
    slug: 'klaviyo', name: 'Klaviyo', category: 'Email', icon: '📧',
    metaTitle: 'Klaviyo Agency London | Email & SMS for eCommerce | Meridian',
    metaDescription: 'London Klaviyo agency. Email flows, SMS, segmentation for Shopify brands.',
    keywords: ['klaviyo agency london', 'klaviyo expert london'],
    intro: 'Klaviyo is the gold standard for eCommerce email and SMS. We build the flows that generate 25–35% of total revenue.',
    bullets: ['Flow architecture: welcome, abandoned cart, post-purchase, win-back', 'Advanced segmentation: RFM, predictive analytics', 'Campaign strategy with A/B testing', 'SMS integration', 'Shopify deep integration', 'Revenue attribution and reporting'],
    relatedServices: ['email-marketing-london', 'ecommerce-london', 'social-media-london'],
    faqs: [{ q: 'How much revenue should email generate?', a: 'Well-optimised eCommerce brands typically get 25–35% of revenue from email + SMS.' }, { q: 'How much does Klaviyo management cost?', a: 'Setup: £2,500–£5,000. Ongoing: from £990/month.' }, { q: 'Can you migrate from Mailchimp?', a: 'Yes. Full migration with consent mapping and flow rebuilds.' }],
  },
  {
    slug: 'salesforce', name: 'Salesforce', category: 'CRM', icon: '☁️',
    metaTitle: 'Salesforce Consultant London | Implementation & Marketing Cloud | Meridian',
    metaDescription: 'London Salesforce consultant. CRM implementation, Marketing Cloud, Sales Cloud.',
    keywords: ['salesforce consultant london', 'salesforce agency london', 'salesforce implementation london'],
    intro: 'Salesforce is the enterprise CRM standard. We deliver projects on time: CRM setup, Marketing Cloud, Sales Cloud, and integrations.',
    bullets: ['Sales Cloud: pipeline, forecasting, territory planning', 'Marketing Cloud / Pardot: journeys, scoring, nurture', 'Service Cloud: case management, chatbot integration', 'Custom development: Apex, Lightning Web Components', 'Data migration and deduplication', 'Ongoing admin and management'],
    relatedServices: ['email-marketing-london', 'copywriting-london', 'web-design-london'],
    faqs: [{ q: 'HubSpot or Salesforce?', a: 'Salesforce for enterprise. HubSpot for SMB/mid-market.' }, { q: 'How much does Salesforce implementation cost?', a: 'Basic: £5,000–£15,000. Enterprise: £40,000+.' }, { q: 'Can you migrate from HubSpot?', a: 'Yes. Full data migration and workflow recreation.' }],
  },
  {
    slug: 'nextjs', name: 'Next.js', category: 'Framework', icon: '▲',
    metaTitle: 'Next.js Developer London | React Web Apps | Meridian',
    metaDescription: 'London Next.js developers. SSR React applications with perfect SEO.',
    keywords: ['nextjs developer london', 'nextjs agency london', 'react developer london'],
    intro: 'Next.js is the React framework for production — SSR, static generation, and the best SEO of any JavaScript framework.',
    bullets: ['SSR and SSG for perfect SEO performance', 'App Router with React Server Components', 'Headless CMS integration: Sanity, Contentful, Strapi', 'API routes and server actions', 'Vercel deployment with Edge Functions', 'Full-stack apps: auth, database, payments'],
    relatedServices: ['web-design-london', 'app-development-london', 'ecommerce-london'],
    faqs: [{ q: 'Why Next.js over WordPress?', a: '10x faster, perfect Lighthouse scores, native React components.' }, { q: 'How much does a Next.js site cost?', a: 'Marketing site: £6,000–£12,000. Web app: £15,000–£50,000.' }, { q: 'Can you host on Vercel?', a: 'Yes. Vercel is our default for Next.js.' }],
  },
  {
    slug: 'squarespace', name: 'Squarespace', category: 'CMS', icon: '⬛',
    metaTitle: 'Squarespace Designer London | Custom Sites | Meridian',
    metaDescription: 'London Squarespace designer. Custom websites for small businesses and portfolios.',
    keywords: ['squarespace designer london', 'squarespace developer london'],
    intro: 'Squarespace is the simplest way for small businesses to get a professional website.',
    bullets: ['Custom Squarespace design matching your brand', 'eCommerce setup', 'SEO setup: meta, schema, sitemap', 'Domain and hosting configuration', 'Content migration', 'Training session included'],
    relatedServices: ['web-design-london', 'seo-london', 'branding-london'],
    faqs: [{ q: 'Is Squarespace good enough?', a: 'For small businesses, portfolios, and restaurants — yes.' }, { q: 'How much does it cost?', a: 'Custom design: £1,950–£4,500. With eCommerce: £3,000–£6,000.' }, { q: 'Can I update it myself?', a: 'Yes — that is the main advantage of Squarespace.' }],
  },
  {
    slug: 'woocommerce', name: 'WooCommerce', category: 'eCommerce', icon: '🟣',
    metaTitle: 'WooCommerce Developer London | WordPress eCommerce | Meridian',
    metaDescription: 'London WooCommerce developer. Custom themes, payments, subscriptions, and SEO.',
    keywords: ['woocommerce developer london', 'woocommerce agency london'],
    intro: 'WooCommerce is the most flexible eCommerce platform — full code ownership on WordPress.',
    bullets: ['Custom WooCommerce theme development', 'Payment integration: Stripe, PayPal, Klarna', 'Subscriptions, memberships, bookings', 'WooCommerce SEO', 'Custom plugin development', 'Hosting setup: WP Engine, Cloudways, Kinsta'],
    relatedServices: ['ecommerce-london', 'web-design-london', 'seo-london'],
    faqs: [{ q: 'WooCommerce or Shopify?', a: 'WooCommerce for maximum flexibility. Shopify for most other eCommerce businesses.' }, { q: 'How much does it cost?', a: 'Simple store: £6,000–£12,000. Custom: £12,000–£25,000.' }, { q: 'Is WooCommerce slow?', a: 'Default can be. Our builds enforce strict performance budgets.' }],
  },
  {
    slug: 'figma', name: 'Figma', category: 'Design', icon: '🎯',
    metaTitle: 'Figma Design Agency London | UI/UX & Design Systems | Meridian',
    metaDescription: 'London Figma design agency. UI/UX, design systems, prototyping, and handoff.',
    keywords: ['figma designer london', 'ui design agency london', 'ux design agency london'],
    intro: 'Figma is where great digital products start. We design from wireframe to pixel-perfect handoff.',
    bullets: ['UI/UX design: wireframes, prototypes, high-fidelity mockups', 'Design systems: component libraries and tokens', 'Developer handoff: auto-layout, CSS-ready specs', 'Responsive design across breakpoints', 'Interactive prototyping', 'Design audits'],
    relatedServices: ['web-design-london', 'app-development-london', 'branding-london'],
    faqs: [{ q: 'Do you design in Figma?', a: 'Yes. Figma is our primary design tool with auto-layout and dev handoff.' }, { q: 'How much does UI/UX design cost?', a: 'UX audit: £2,500–£5,000. App UI: £8,000��£20,000. Design system: £10,000–£25,000.' }, { q: 'Can you build a design system?', a: 'Yes. Component libraries with tokens and documentation.' }],
  },
  {
    slug: 'ios-swift', name: 'iOS / Swift', category: 'Mobile', icon: '🍎',
    metaTitle: 'iOS Developer London | Swift App Development | Meridian',
    metaDescription: 'London iOS developers. Native Swift apps for iPhone and iPad.',
    keywords: ['ios app developer london', 'swift developer london'],
    intro: 'Native iOS with Swift: the best possible iPhone experience — 60fps, deep platform integration, Apple HIG compliance.',
    bullets: ['Native Swift: UIKit and SwiftUI', 'Deep integration: ARKit, Core ML, HealthKit', 'App Store optimisation', 'TestFlight beta management', 'Apple Watch and visionOS', 'App Store Review compliance'],
    relatedServices: ['app-development-london', 'branding-london', 'web-design-london'],
    faqs: [{ q: 'Native or cross-platform?', a: 'Native for peak performance and deep hardware integration. Cross-platform for speed and cost.' }, { q: 'How much does an iOS app cost?', a: 'Simple: £20,000–£40,000. Complex: £40,000–£100,000.' }, { q: 'Do you handle App Store submission?', a: 'Yes. Full submission including metadata, screenshots, and review preparation.' }],
  },
  {
    slug: 'android-kotlin', name: 'Android / Kotlin', category: 'Mobile', icon: '🤖',
    metaTitle: 'Android Developer London | Kotlin App Development | Meridian',
    metaDescription: 'London Android developers. Native Kotlin apps with Material Design.',
    keywords: ['android app developer london', 'kotlin developer london'],
    intro: 'Native Android with Kotlin: Material Design 3, deep Play Services integration, full device range support.',
    bullets: ['Native Kotlin with Jetpack Compose', 'Material Design 3', 'Google services: Maps, Firebase, ML Kit', 'Play Store optimisation', 'Wear OS and Android Auto', 'Enterprise: managed devices, EMM'],
    relatedServices: ['app-development-london', 'branding-london', 'web-design-london'],
    faqs: [{ q: 'Native or cross-platform?', a: 'Native for peak Android performance. Cross-platform when iOS is also needed.' }, { q: 'How much does an Android app cost?', a: 'Simple: £18,000–£35,000. Complex: £35,000–£90,000.' }, { q: 'Do you handle Play Store submission?', a: 'Yes. Full submission including data safety section.' }],
  },
  {
    slug: 'magento', name: 'Magento / Adobe Commerce', category: 'eCommerce', icon: '🔶',
    metaTitle: 'Magento Developer London | Adobe Commerce | Meridian',
    metaDescription: 'London Magento developer. Adobe Commerce implementation, migration, and optimisation.',
    keywords: ['magento developer london', 'adobe commerce london'],
    intro: 'Magento (Adobe Commerce) for enterprise eCommerce. We develop, optimise, and migrate Magento stores.',
    bullets: ['Magento 2 / Adobe Commerce custom development', 'B2B Commerce: shared catalogues, company accounts', 'Performance optimisation: Varnish, Redis, Elasticsearch', 'Extension development', 'Migration: Magento 1 to 2, or to Shopify Plus', 'Managed hosting: AWS, Azure, Adobe Commerce Cloud'],
    relatedServices: ['ecommerce-london', 'web-design-london', 'seo-london'],
    faqs: [{ q: 'Should I stay on Magento?', a: 'For complex B2B or 50,000+ SKUs — yes. For B2C, Shopify Plus is usually better.' }, { q: 'How much does Magento cost?', a: 'Theme: £10,000–£25,000. Full build: £25,000–£80,000.' }, { q: 'Can you migrate from Magento 1?', a: 'Yes. To Magento 2, Shopify Plus, or WooCommerce.' }],
  },
];

export const ALL_PLATFORM_SLUGS = PLATFORMS.map(p => p.slug);

export function getPlatform(slug: string): Platform | undefined {
  return PLATFORMS.find(p => p.slug === slug);
}
