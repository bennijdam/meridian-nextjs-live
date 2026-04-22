'use client';

import { useEffect } from 'react';

export default function HomepageInteractions() {
  useEffect(() => {
    // ── Reveal on scroll ─────────────────────────────────────────────
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ── Theme toggle ─────────────────────────────────────────────────
    const themeBtn = document.getElementById('themeToggle');
    const onTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('meridian-theme', next); } catch {}
    };
    themeBtn?.addEventListener('click', onTheme);

    // ── Audit form ───────────────────────────────────────────────────
    const auditForm = document.getElementById('auditForm') as HTMLFormElement | null;
    const onAudit = async (e: Event) => {
      e.preventDefault();
      const fd = new FormData(auditForm!);
      const btn = auditForm!.querySelector('.audit-btn') as HTMLButtonElement;
      btn.innerHTML = '<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite"></span> Analysing...';
      try {
        const res = await fetch('/api/audit', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: fd.get('url'), email: fd.get('email'), industry: fd.get('industry') || undefined }),
        });
        btn.innerHTML = res.ok
          ? '✓ Audit on the way! Check your inbox.'
          : '⚠ Try again — ' + (await res.json()).error;
        if (res.ok) btn.style.background = 'linear-gradient(135deg,#c4ff5b,#5b8cff)';
      } catch { btn.innerHTML = '⚠ Network error'; }
    };
    auditForm?.addEventListener('submit', onAudit);

    // ── Final CTA form ───────────────────────────────────────────────
    const finalForm = document.getElementById('finalForm') as HTMLFormElement | null;
    const onFinal = async (e: Event) => {
      e.preventDefault();
      const email = (finalForm!.querySelector('input[type=email]') as HTMLInputElement).value;
      const btn = finalForm!.querySelector('button')!;
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage_footer' }),
      });
      btn.textContent = res.ok ? '✓ Sent!' : '⚠ Try again';
      if (res.ok) { btn.style.background = '#c4ff5b'; btn.style.color = '#000'; }
    };
    finalForm?.addEventListener('submit', onFinal);

    // ── Spinner keyframes ────────────────────────────────────────────
    if (!document.getElementById('spin-kf')) {
      const s = document.createElement('style');
      s.id = 'spin-kf';
      s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
      document.head.appendChild(s);
    }

    // ── Custom cursor ────────────────────────────────────────────────
    const cursor = document.createElement('div');
    cursor.className = 'c-cursor';
    const glow = document.createElement('div');
    glow.className = 'c-glow';
    document.body.appendChild(cursor);
    document.body.appendChild(glow);

    // Spring-physics state for glow
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
    let mx = gx, my = gy;
    let glowRaf = 0;
    const springGlow = () => {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      glowRaf = requestAnimationFrame(springGlow);
    };
    springGlow();

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', onMouseMove);

    // Cursor expand on interactive elements
    const interactives = 'a,button,.bento-card,.why-card,.review-card,.magnetic';
    const onMouseEnterInteractive = () => cursor.classList.add('big');
    const onMouseLeaveInteractive = () => cursor.classList.remove('big');
    document.querySelectorAll(interactives).forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));

    // ── Text scramble on eyebrow ─────────────────────────────────────
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&';
    const scramble = (el: HTMLElement) => {
      const final = el.dataset.originalText || el.textContent || '';
      if (!el.dataset.originalText) el.dataset.originalText = final;
      let iter = 0;
      clearInterval((el as HTMLElement & { _sc?: ReturnType<typeof setInterval> })._sc);
      (el as HTMLElement & { _sc?: ReturnType<typeof setInterval> })._sc = setInterval(() => {
        el.textContent = final.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < Math.floor(iter)) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        iter += 0.4;
        if (iter >= final.length) {
          el.textContent = final;
          clearInterval((el as HTMLElement & { _sc?: ReturnType<typeof setInterval> })._sc);
        }
      }, 28);
    };

    const scrambleObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scramble(entry.target as HTMLElement);
          scrambleObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-scramble]').forEach(el => scrambleObs.observe(el));

    // ── Particle canvas in hero ──────────────────────────────────────
    const heroSection = document.querySelector<HTMLElement>('.hero');
    let animId = 0;
    if (!document.getElementById('particleCanvas') && heroSection) {
      const canvas = document.createElement('canvas');
      canvas.id = 'particleCanvas';
      canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.6';
      heroSection.insertBefore(canvas, heroSection.firstChild);

      const ctx = canvas.getContext('2d')!;
      const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';
      const resize = () => { canvas.width = heroSection.offsetWidth; canvas.height = heroSection.offsetHeight; };
      resize();
      window.addEventListener('resize', resize);

      type P = { x: number; y: number; vx: number; vy: number; r: number };
      const N = 70;
      const pts: P[] = Array.from({ length: N }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
      }));
      const LINK = 150;

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const dark = isDark();
        const ac = dark ? [91, 140, 255] : [37, 99, 235];
        const ac2 = dark ? [255, 91, 227] : [236, 72, 153];

        for (const p of pts) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        for (let i = 0; i < N; i++) {
          for (let j = i + 1; j < N; j++) {
            const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < LINK) {
              const a = (1 - d / LINK) * 0.22;
              const t = d / LINK;
              const r = ac[0] + (ac2[0] - ac[0]) * t;
              const g2 = ac[1] + (ac2[1] - ac[1]) * t;
              const b = ac[2] + (ac2[2] - ac[2]) * t;
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(${r},${g2},${b},${a})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }

        for (const p of pts) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = dark ? `rgba(${ac[0]},${ac[1]},${ac[2]},0.65)` : `rgba(${ac[0]},${ac[1]},${ac[2]},0.5)`;
          ctx.fill();
        }

        animId = requestAnimationFrame(drawParticles);
      };
      drawParticles();
    }

    // ── 3D bento card tilt + holographic shimmer ─────────────────────
    const bentoCards = document.querySelectorAll<HTMLElement>('.bento-card');
    const tiltCleanups: (() => void)[] = [];
    bentoCards.forEach(card => {
      const onEnter = () => { card.style.transition = 'transform 0.1s ease, border-color 0.35s ease'; };
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (x - 0.5) * 18;
        const ry = (y - 0.5) * -12;
        card.style.transform = `perspective(900px) rotateY(${rx}deg) rotateX(${ry}deg) translateY(-6px) scale(1.015)`;
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
      };
      const onLeave = () => {
        card.style.transition = 'transform 0.65s cubic-bezier(.2,.8,.2,1), border-color 0.35s ease';
        card.style.transform = '';
      };
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      tiltCleanups.push(() => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    // ── Audit card tilt ──────────────────────────────────────────────
    const auditCard = document.querySelector<HTMLElement>('.audit-card');
    let auditCleanup: (() => void) | null = null;
    if (auditCard) {
      const onMove = (e: MouseEvent) => {
        const r = auditCard.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        auditCard.style.transform = `perspective(1400px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
        auditCard.style.transition = 'transform 0.1s ease';
      };
      const onLeave = () => {
        auditCard.style.transition = 'transform 0.7s cubic-bezier(.2,.8,.2,1)';
        auditCard.style.transform = '';
      };
      auditCard.addEventListener('mousemove', onMove);
      auditCard.addEventListener('mouseleave', onLeave);
      auditCleanup = () => {
        auditCard.removeEventListener('mousemove', onMove);
        auditCard.removeEventListener('mouseleave', onLeave);
      };
    }

    // ── Why-card tilt ────────────────────────────────────────────────
    const whyCards = document.querySelectorAll<HTMLElement>('.why-card');
    const whyCleanups: (() => void)[] = [];
    whyCards.forEach(card => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
        card.style.transition = 'transform 0.1s ease';
      };
      const onLeave = () => {
        card.style.transition = 'transform 0.65s cubic-bezier(.2,.8,.2,1)';
        card.style.transform = '';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      whyCleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    // ── Review card tilt ─────────────────────────────────────────────
    const reviewCards = document.querySelectorAll<HTMLElement>('.review-card');
    const reviewCleanups: (() => void)[] = [];
    reviewCards.forEach(card => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
        card.style.transition = 'transform 0.1s ease';
      };
      const onLeave = () => {
        card.style.transition = 'transform 0.65s cubic-bezier(.2,.8,.2,1)';
        card.style.transform = '';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      reviewCleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    // ── Hero 3D parallax (spring physics) ────────────────────────────
    const heroVisual = document.querySelector<HTMLElement>('.hero-visual');
    const fc1 = document.querySelector<HTMLElement>('.fc-1');
    const fc2 = document.querySelector<HTMLElement>('.fc-2');
    let hvx = 0, hvy = 0, hvtx = 0, hvty = 0;
    let hvRaf = 0;
    const springHero = () => {
      hvx += (hvtx - hvx) * 0.06;
      hvy += (hvty - hvy) * 0.06;
      if (heroVisual) heroVisual.style.transform = `perspective(1200px) rotateY(${hvx}deg) rotateX(${hvy}deg)`;
      hvRaf = requestAnimationFrame(springHero);
    };
    springHero();

    let f1x = 0, f1y = 0, f2x = 0, f2y = 0;
    let f1tx = 0, f1ty = 0, f2tx = 0, f2ty = 0;
    let fcRaf = 0;
    const springFC = () => {
      f1x += (f1tx - f1x) * 0.05; f1y += (f1ty - f1y) * 0.05;
      f2x += (f2tx - f2x) * 0.04; f2y += (f2ty - f2y) * 0.04;
      if (fc1) fc1.style.transform = `translateX(${f1x}px) translateY(${f1y}px)`;
      if (fc2) fc2.style.transform = `translateX(${f2x}px) translateY(${f2y}px)`;
      fcRaf = requestAnimationFrame(springFC);
    };
    springFC();

    const onHeroMouse = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      hvtx = cx * 10; hvty = -cy * 6;
      f1tx = cx * -18; f1ty = cy * -22;
      f2tx = cx * 22; f2ty = cy * 18;
    };
    const onHeroLeave = () => { hvtx = 0; hvty = 0; f1tx = 0; f1ty = 0; f2tx = 0; f2ty = 0; };
    heroSection?.addEventListener('mousemove', onHeroMouse);
    heroSection?.addEventListener('mouseleave', onHeroLeave);

    // ── Mouse-tracked gradient wash on hero bg ───────────────────────
    let gradRaf = 0;
    const onDocMouse = (e: MouseEvent) => {
      cancelAnimationFrame(gradRaf);
      gradRaf = requestAnimationFrame(() => {
        const xPct = (e.clientX / window.innerWidth * 100).toFixed(1);
        const yPct = (e.clientY / window.innerHeight * 100).toFixed(1);
        if (heroSection) {
          heroSection.style.setProperty('--mx-hero', `${xPct}%`);
          heroSection.style.setProperty('--my-hero', `${yPct}%`);
        }
      });
    };
    document.addEventListener('mousemove', onDocMouse);

    // ── Magnetic buttons ─────────────────────────────────────────────
    const magnetics = document.querySelectorAll<HTMLElement>('.magnetic');
    const magCleanups: (() => void)[] = [];
    magnetics.forEach(btn => {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
      };
      const onLeave = () => {
        btn.style.transform = '';
      };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      magCleanups.push(() => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
      });
    });

    // ── Counter animation on why-num ────────────────────────────────
    const counters = document.querySelectorAll<HTMLElement>('.why-num');
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        counterObs.unobserve(el);
        const raw = el.textContent || '';
        const match = raw.match(/^([+£]?)(\d+(?:\.\d+)?)(.*)$/);
        if (!match) return;
        const [, prefix, numStr, suffix] = match;
        const target = parseFloat(numStr);
        const isFloat = numStr.includes('.');
        const inner = el.querySelector('.small');
        const smallHtml = inner ? inner.outerHTML : '';
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1800, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const display = isFloat ? (target * ease).toFixed(1) : Math.floor(target * ease).toString();
          el.innerHTML = `${prefix}${display}${smallHtml || suffix}`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObs.observe(el));

    // ── Scroll-based parallax on section boxes ───────────────────────
    let scrollRaf = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>('.section-box').forEach(el => {
          const r = el.getBoundingClientRect();
          const shift = ((r.top + r.height / 2) - window.innerHeight / 2) * 0.025;
          el.style.backgroundPositionY = `calc(50% + ${shift}px)`;
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      revealObs.disconnect();
      counterObs.disconnect();
      scrambleObs.disconnect();
      themeBtn?.removeEventListener('click', onTheme);
      auditForm?.removeEventListener('submit', onAudit);
      finalForm?.removeEventListener('submit', onFinal);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', onDocMouse);
      heroSection?.removeEventListener('mousemove', onHeroMouse);
      heroSection?.removeEventListener('mouseleave', onHeroLeave);
      window.removeEventListener('scroll', onScroll);
      tiltCleanups.forEach(fn => fn());
      whyCleanups.forEach(fn => fn());
      reviewCleanups.forEach(fn => fn());
      magCleanups.forEach(fn => fn());
      auditCleanup?.();
      cancelAnimationFrame(animId);
      cancelAnimationFrame(glowRaf);
      cancelAnimationFrame(hvRaf);
      cancelAnimationFrame(fcRaf);
      cancelAnimationFrame(gradRaf);
      cancelAnimationFrame(scrollRaf);
      document.querySelectorAll(interactives).forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      cursor.remove();
      glow.remove();
    };
  }, []);

  return null;
}
