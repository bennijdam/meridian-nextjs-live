import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google';
import { homepageSchemaGraph, jsonLd } from '@/lib/schema';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

// Distinctive type system: editorial serif + geometric sans + mono
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});
const sans = Geist({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400','500'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Meridian — London's Digital Performance Studio · SEO, PPC, Web & App Development",
    template: '%s | Meridian',
  },
  description:
    'London digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ London brands across all 32 boroughs.',
  keywords: [
    'digital marketing agency london','seo agency london','ppc agency london',
    'web design london','app developer london','social media agency london',
    'branding agency london','business plan writer london',
  ],
  authors: [{ name: 'Meridian', url: SITE }],
  creator: 'Meridian',
  publisher: 'Meridian Digital Ltd',
  alternates: {
    canonical: SITE,
    languages: { 'en-GB': SITE },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE,
    siteName: 'Meridian',
    title: "Meridian — London's Digital Performance Studio",
    description: "The boutique London agency engineered for compounding growth. Free instant SEO audit.",
    images: [{ url: `${SITE}/og.png`, width: 1200, height: 630, alt: 'Meridian — London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Meridian — London's Digital Performance Studio",
    description: 'The boutique London agency engineered for compounding growth.',
    creator: '@meridianlondon',
    images: [`${SITE}/og.png`],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: false, email: false, address: false },
  category: 'business',
};

export const viewport: Viewport = {
  themeColor: '#07070a',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga4 = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/*
          Theme bootstrap — runs before paint to prevent FOUC.
          Light is the default. Dark is opt-in via the header toggle (persisted
          to localStorage). We always write the data-theme attribute so the
          CSS selectors :root[data-theme="light"] and [data-theme="dark"] both
          resolve correctly.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('meridian-theme');var t=s||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />

        {/* Performance: preconnect to image CDN if external; otherwise images are same-origin */}
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Master schema graph — gives Google + AI engines rich structured data on the homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(homepageSchemaGraph()) }}
        />

        {/* Plausible (privacy-first analytics — no cookie banner needed) */}
        {plausible && (
          <script defer data-domain={plausible} src="https://plausible.io/js/script.js" />
        )}

        {/* GA4 — only if explicitly opted in; respect Do Not Track */}
        {ga4 && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`,
              }}
            />
          </>
        )}
      </head>
      <body>{children}<CookieConsent /></body>
    </html>
  );
}
