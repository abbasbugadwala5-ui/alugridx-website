'use client';
import { useEffect, useRef, useState } from 'react';

// Animated stat — counts from 0 to `end` when scrolled into view.
// `value` can be a plain number, or a string like "10+", "500+", "1 Year".
// Non-numeric strings (e.g. "UAE & GCC") render instantly with no count.
export default function StatCounter({
  value,
  duration = 1600,
  className = '',
}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);

  // Parse value into { prefix, number, suffix } — or null if no number.
  const parsed = (() => {
    const str = String(value);
    const m = str.match(/^(\D*)(\d[\d,]*)(.*)$/);
    if (!m) return null;
    const number = parseInt(m[2].replace(/,/g, ''), 10);
    if (!Number.isFinite(number)) return null;
    return { prefix: m[1], number, suffix: m[3] };
  })();

  useEffect(() => {
    if (!parsed) {
      setDisplay(String(value));
      return;
    }

    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setDisplay(`${parsed.prefix}${parsed.number}${parsed.suffix}`);
      return;
    }

    let rafId;
    let started = false;

    const animate = () => {
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutCubic — fast at start, settles smoothly
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(parsed.number * eased);
        setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);
        if (t < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    // Initial render shows 0-state so the count is visible
    setDisplay(`${parsed.prefix}0${parsed.suffix}`);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display ?? String(value)}
    </span>
  );
}
