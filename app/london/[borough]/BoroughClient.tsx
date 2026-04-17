'use client';
import { useEffect } from 'react';

/**
 * Client-side interactivity for borough pages:
 *   - Reveal-on-scroll (IntersectionObserver)
 *   - Theme toggle
 */
export default function BoroughClient() {
  useEffect(() => {
    // Reveal-on-scroll
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    const onTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('meridian-theme', next); } catch {}
    };
    themeBtn?.addEventListener('click', onTheme);

    return () => {
      themeBtn?.removeEventListener('click', onTheme);
      obs.disconnect();
    };
  }, []);

  return null;
}
