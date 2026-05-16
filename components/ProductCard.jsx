import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Box } from 'lucide-react';

/**
 * Product card — used in both home grid and /products grid.
 * - White card, 1px hairline border, small radius
 * - Fixed 4:3 image area; clean placeholder when no image
 * - Product code in muted Barlow, letter-spaced
 * - Category as a small tag
 * - Hover: border shifts to accent + 2-4px lift
 */
export default function ProductCard({ product, href, ctaLabel = 'View Details' }) {
  const cover = product.images?.[0] || product.img || null;
  const linkHref =
    href ||
    (product.slug ? `/products#${product.slug}` : '/products');

  return (
    <Link
      href={linkHref}
      className="product-card group flex flex-col h-full bg-white rounded-md border border-hairline overflow-hidden transition-all duration-200 hover:border-accent hover:-translate-y-0.5 hover:shadow-hover"
    >
      {/* 4:3 image area */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-offwhite">
        {cover ? (
          <Image
            src={cover}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover product-card-img"
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

        <h3 className="font-heading font-semibold text-ink text-[15px] md:text-base leading-snug group-hover:text-accent transition-colors">
          {product.title}
        </h3>

        {product.shortDescription && (
          <p className="text-muted text-[13px] leading-relaxed mt-2 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-accent text-xs font-semibold font-heading uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
          {ctaLabel} <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
