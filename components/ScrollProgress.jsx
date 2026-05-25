'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Thin accent bar fixed to the top of the viewport. Width = scroll progress.
// Hidden on admin routes.
export default function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0;
      setProgress(pct);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[10000] pointer-events-none"
    >
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #1A56DB 0%, #6366F1 50%, #A855F7 100%)',
          boxShadow: '0 0 10px rgba(26, 86, 219, 0.6)',
        }}
      />
    </div>
  );
}
