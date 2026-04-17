/**
 * JSON-LD schema generators.
 *
 * These power the structured data Google, AI Overviews, ChatGPT, Claude
 * and Perplexity rely on to understand and cite content.
 *
 * Critical for AEO (Answer Engine Optimisation) and GEO (Generative
 * Engine Optimisation) — the disciplines that have replaced raw rank
 * chasing as AI search reshapes click behaviour.
 */

import { SERVICES, type Service } from './services';
import { type Borough } from './boroughs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://meridian.london';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Meridian';

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    "name": SITE_NAME,
    "alternateName": "Meridian Digital",
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/logo.png`,
      "width": 512,
      "height": 512
    },
    "description": "London digital performance studio. SEO, PPC, web design, app development, social media management. 200+ London brands trust us with their digital programmes.",
    "telephone": "+44-20-XXXX-XXXX",
    "email": "hello@meridian.london",
    "foundingDate": "2014-03-01",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1 Finsbury Avenue",
      "addressLocality": "London",
      "addressRegion": "London",
      "postalCode": "EC2M 2PF",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5197,
      "longitude": -0.0857
    },
    "areaServed": [
      { "@type": "City", "name": "London", "@id": "https://en.wikipedia.org/wiki/London" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "priceRange": "£££",
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00", "closes": "18:00"
    }],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    },
    "sameAs": [
      "https://www.linkedin.com/company/meridian-london",
      "https://twitter.com/meridianlondon",
      "https://www.instagram.com/meridianlondon",
      "https://www.youtube.com/@meridianlondon"
    ],
    "knowsAbout": [
      "Search Engine Optimisation","Pay Per Click Advertising","Web Design",
      "App Development","Social Media Marketing","Branding","Content Marketing",
      "E-commerce","Conversion Rate Optimisation","Generative Engine Optimisation",
      "Answer Engine Optimisation"
    ],
    "slogan": "London's digital performance engine."
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": SITE_NAME,
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "inLanguage": "en-GB",
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}/#service`,
    "name": service.name,
    "description": service.metaDescription,
    "url": `${SITE_URL}/services/${service.slug}`,
    "provider": { "@id": `${SITE_URL}/#organization` },
    "areaServed": { "@type": "City", "name": "London" },
    "serviceType": service.shortName,
    "category": service.tag,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "GBP",
      "price": service.priceFrom.replace(/[£,]/g, ''),
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "GBP",
        "price": service.priceFrom.replace(/[£,]/g, ''),
        "unitText": `per ${service.priceUnit}`,
        "valueAddedTaxIncluded": false
      },
      "availability": "https://schema.org/InStock"
    }
  };
}

export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

export function localBusinessForBorough(borough: Borough) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/london/${borough.slug}/#service`,
    "name": `${SITE_NAME} — ${borough.name}`,
    "description": borough.intro,
    "url": `${SITE_URL}/london/${borough.slug}`,
    "parentOrganization": { "@id": `${SITE_URL}/#organization` },
    "areaServed": {
      "@type": "Place",
      "name": `${borough.name}, London`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": borough.name,
        "addressRegion": "London",
        "postalCode": borough.postcodes[0],
        "addressCountry": "GB"
      }
    }
  };
}

export function homepageSchemaGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      ...SERVICES.map(serviceSchema),
      faqSchema([
        {
          q: "How much does a digital marketing agency in London cost?",
          a: "London digital marketing agencies typically charge £2,500–£15,000 per month for retained services. Project-based work for web design starts at £4,500 and apps at £25,000. Meridian publishes transparent pricing on every service page."
        },
        {
          q: "How long does SEO take to work in a competitive market like London?",
          a: "For competitive London terms, expect meaningful organic traffic gains in 4–6 months and full ROI by month 9–12. Local SEO and long-tail terms often produce results within 6–8 weeks."
        },
        {
          q: "Do you work with startups or only enterprise clients?",
          a: "Both. Dedicated startup track from £2,500/month alongside enterprise programmes for established London brands."
        },
        {
          q: "Which London boroughs do you cover?",
          a: "All 32 London boroughs plus the City of London. Particular depth in Shoreditch, Mayfair, Canary Wharf, King's Cross and Camden."
        },
        {
          q: "What is GEO and AEO and why do they matter in 2026?",
          a: "GEO (Generative Engine Optimisation) and AEO (Answer Engine Optimisation) are the disciplines for being cited in AI search — Google AI Overviews, ChatGPT, Perplexity, Claude. Around 60% of Google searches now end without a click; on AI-Overview queries that figure rises to 80%+. Being the answer the AI quotes is increasingly more valuable than ranking #1."
        }
      ])
    ]
  };
}

/**
 * Helper for embedding JSON-LD safely in a React component.
 * Use as: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemaObject) }} />
 */
export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

// ===== EXPANDED SCHEMA TYPES (Phase 15) =====

/** Review schema for individual reviews — rich-results eligible */
export function reviewSchema(reviews: Array<{ author: string; rating: number; text: string; date: string }>) {
  return reviews.map(r => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": 5 },
    "author": { "@type": "Person", "name": r.author },
    "datePublished": r.date,
    "reviewBody": r.text,
    "itemReviewed": { "@id": `${SITE_URL}/#organization` },
  }));
}

/** HowTo schema for guide pages with step-by-step instructions */
export function howToSchema(args: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": args.name,
    "description": args.description,
    ...(args.totalTime ? { "totalTime": args.totalTime } : {}),
    "step": args.steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.name,
      "text": s.text,
    })),
  };
}

/** Product/Offer schema for service pricing pages */
export function serviceOfferSchema(args: {
  name: string;
  description: string;
  url: string;
  price: number;
  priceCurrency?: string;
  priceUnit?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": args.name,
    "description": args.description,
    "url": `${SITE_URL}${args.url}`,
    "brand": { "@type": "Organization", "name": SITE_NAME },
    "offers": {
      "@type": "Offer",
      "price": args.price,
      "priceCurrency": args.priceCurrency || "GBP",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      ...(args.priceUnit ? { "unitText": args.priceUnit } : {}),
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
    },
  };
}

/** VideoObject schema placeholder — for when video content is added */
export function videoSchema(args: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": args.name,
    "description": args.description,
    "thumbnailUrl": args.thumbnailUrl.startsWith('http') ? args.thumbnailUrl : `${SITE_URL}${args.thumbnailUrl}`,
    "uploadDate": args.uploadDate,
    ...(args.duration ? { "duration": args.duration } : {}),
    ...(args.contentUrl ? { "contentUrl": args.contentUrl } : {}),
    ...(args.embedUrl ? { "embedUrl": args.embedUrl } : {}),
  };
}
