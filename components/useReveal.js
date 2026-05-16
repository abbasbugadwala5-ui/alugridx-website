'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Observes any `.reveal | .reveal-left | .reveal-right` elements and
 * adds `.visible` when they enter the viewport.
 * Re-attaches on every route change so SPA navigations animate too.
 */
export function useReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Defer to next frame so dynamically-rendered content is in the DOM.
    const id = requestAnimationFrame(() => {
      document
        .querySelectorAll('.reveal, .reveal-left, .reveal-right')
        .forEach((el) => {
          if (!el.classList.contains('visible')) observer.observe(el);
        });
    });

    // Safety net: anything not visible after 2s is forced in
    // (covers above-the-fold elements skipped by certain browser quirks).
    const failSafe = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
        if (!el.classList.contains('visible')) el.classList.add('visible');
      });
    }, 2000);

    return () => {
      cancelAnimationFrame(id);
      clearTimeout(failSafe);
      observer.disconnect();
    };
  }, [pathname]);
}
