'use client';

import { useEffect } from 'react';

/**
 * Client component that wires the theme toggle button.
 * Toggles data-theme on <html> between 'light' and 'dark'.
 * Persists to localStorage.
 */
export default function ThemeToggle() {
  useEffect(() => {
    const btn = document.getElementById('themeToggle');
    const toggle = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('meridian-theme', next); } catch {}
    };
    btn?.addEventListener('click', toggle);
    return () => btn?.removeEventListener('click', toggle);
  }, []);

  return null;
}
