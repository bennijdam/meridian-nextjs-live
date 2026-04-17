'use client';

import { useEffect } from 'react';

/**
 * Client component that sets up IntersectionObserver for .reveal elements.
 * Drop into any page that uses className="reveal" sections.
 * Adds .in class when elements enter the viewport.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
