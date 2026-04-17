'use client';

import { useEffect } from 'react';

/**
 * Client island for homepage interactivity.
 * Handles: reveal-on-scroll, theme toggle, audit form, final CTA form.
 * Renders nothing — just mounts effects.
 */
export default function HomepageInteractions() {
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

    // Audit form -> /api/audit
    const auditForm = document.getElementById('auditForm') as HTMLFormElement | null;
    const onAudit = async (e: Event) => {
      e.preventDefault();
      const fd = new FormData(auditForm!);
      const btn = auditForm!.querySelector('.audit-btn') as HTMLButtonElement;
      btn.innerHTML = '<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite"></span> Analysing...';
      try {
        const res = await fetch('/api/audit', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: fd.get('url'), email: fd.get('email'), industry: fd.get('industry') || undefined,
          })
        });
        if (res.ok) {
          btn.innerHTML = '✓ Audit on the way! Check your inbox.';
          btn.style.background = 'linear-gradient(135deg,#c4ff5b,#5b8cff)';
        } else {
          btn.innerHTML = '⚠ Try again — ' + (await res.json()).error;
        }
      } catch {
        btn.innerHTML = '⚠ Network error';
      }
    };
    auditForm?.addEventListener('submit', onAudit);

    // Final form -> /api/leads
    const finalForm = document.getElementById('finalForm') as HTMLFormElement | null;
    const onFinal = async (e: Event) => {
      e.preventDefault();
      const email = (finalForm!.querySelector('input[type=email]') as HTMLInputElement).value;
      const btn = finalForm!.querySelector('button')!;
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage_footer' })
      });
      btn.textContent = res.ok ? '✓ Sent!' : '⚠ Try again';
      if (res.ok) { btn.style.background = '#c4ff5b'; btn.style.color = '#000'; }
    };
    finalForm?.addEventListener('submit', onFinal);

    // Inject spinner keyframes
    if (!document.getElementById('spin-kf')) {
      const s = document.createElement('style');
      s.id = 'spin-kf';
      s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
      document.head.appendChild(s);
    }

    return () => {
      themeBtn?.removeEventListener('click', onTheme);
      auditForm?.removeEventListener('submit', onAudit);
      finalForm?.removeEventListener('submit', onFinal);
      obs.disconnect();
    };
  }, []);

  return null;
}
