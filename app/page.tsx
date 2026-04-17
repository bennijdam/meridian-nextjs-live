/**
 * Homepage — Meridian (London digital performance studio).
 *
 * Server component composed of section components in `components/home/`.
 * Visual parity is guaranteed 1:1 with the original monolithic page —
 * every className, HTML structure, and content is preserved.
 *
 * Client-side interactivity (reveal-on-scroll, theme toggle, audit form,
 * final CTA form) is mounted via the `HomepageInteractions` client island.
 */
import HomepageInteractions from '@/components/HomepageInteractions';
import SiteHeader from '@/components/home/SiteHeader';
import Hero from '@/components/home/Hero';
import AuditSection from '@/components/home/AuditSection';
import ServicesBento from '@/components/home/ServicesBento';
import WhyLondon from '@/components/home/WhyLondon';
import BoroughGrid from '@/components/home/BoroughGrid';
import Reviews from '@/components/home/Reviews';
import Page1Promise from '@/components/home/Page1Promise';
import HomeFAQ from '@/components/home/HomeFAQ';
import HomeFinalCTA from '@/components/home/HomeFinalCTA';
import SiteFooter from '@/components/home/SiteFooter';
import MobileCTA from '@/components/home/MobileCTA';

export default function HomePage() {
  return (
    <>
      <HomepageInteractions />
      <SiteHeader />
      <Hero />
      <AuditSection />
      <ServicesBento />
      <WhyLondon />
      <BoroughGrid />
      <Reviews />
      <Page1Promise />
      <HomeFAQ />
      <HomeFinalCTA />
      <SiteFooter />
      <MobileCTA />
    </>
  );
}
