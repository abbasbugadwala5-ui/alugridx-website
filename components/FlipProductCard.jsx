'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Box, CheckCircle2 } from 'lucide-react';

// Two-faced product card.
//   - Desktop (hover-capable): flips on hover.
//   - Touch devices: auto-flips once when scrolled into view (peek-and-return).
// Whole card is a Link so a tap navigates to the detail page regardless of
// which face is showing.
export default function FlipProductCard({ product }) {
  const cover = product.images?.[0] || product.img || null;
  const linkHref = product.slug ? `/products/${product.slug}` : '/products';
  const cardRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia?.('(hover: none)').matches;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!isTouch || reduce) return;

    const el = cardRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    let showTimer, hideTimer;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showTimer = setTimeout(() => el.classList.add('is-flipped'), 350);
            hideTimer = setTimeout(() => el.classList.remove('is-flipped'), 2800);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.55 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const bullets = [
    product.subCategory,
    product.specs?.material,
    product.specs?.finish,
    product.specs?.application,
  ].filter(Boolean).slice(0, 3);

  return (
    <Link
      ref={cardRef}
      href={linkHref}
      className="flip-card block h-full group"
      aria-label={`${product.title} — view details`}
    >
      <div className="flip-inner aspect-[4/5] sm:aspect-[3/4]">
        {/* ── FRONT ────────────────────────────────── */}
        <div className="flip-face flex flex-col bg-white border border-hairline transition-colors group-hover:border-accent">
          {/* 4:3 image area */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-offwhite">
            {cover ? (
              <Image
                src={cover}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Box size={36} strokeWidth={1.4} className="text-navy/30" />
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-col flex-grow p-4 md:p-5">
            {(product.code || product.category) && (
              <div className="flex items-center justify-between gap-2 mb-2">
                {product.code && <span className="product-code">{product.code}</span>}
                {product.category && (
                  <span className="tag tag-accent">{product.category}</span>
                )}
              </div>
            )}

            <h3 className="font-heading font-semibold text-ink text-[15px] md:text-base leading-snug">
              {product.title}
            </h3>

            {product.shortDescription && (
              <p className="text-muted text-[13px] leading-relaxed mt-2 line-clamp-2">
                {product.shortDescription}
              </p>
            )}

            <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-accent text-xs font-semibold font-heading uppercase tracking-wider">
              Hover for details <ArrowRight size={12} />
            </span>
          </div>
        </div>

        {/* ── BACK ─────────────────────────────────── */}
        <div className="flip-face flip-back flex flex-col bg-navy text-white p-5 md:p-6">
          {product.code && (
            <span className="text-accent font-heading font-bold text-xs tracking-[0.22em] uppercase">
              {product.code}
            </span>
          )}
          <h3 className="font-heading font-bold text-white text-lg md:text-xl leading-tight mt-2">
            {product.title}
          </h3>

          {product.shortDescription && (
            <p className="text-white/70 text-[13px] leading-relaxed mt-3 line-clamp-3">
              {product.shortDescription}
            </p>
          )}

          {bullets.length > 0 && (
            <ul className="mt-4 space-y-2">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-white/85 text-[12.5px] leading-snug"
                >
                  <CheckCircle2
                    size={13}
                    className="text-accent flex-shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span className="line-clamp-1">{b}</span>
                </li>
              ))}
            </ul>
          )}

          <span className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-accent text-white font-heading font-semibold text-xs uppercase tracking-wider">
            View Details <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
