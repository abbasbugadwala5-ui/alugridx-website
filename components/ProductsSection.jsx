'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/components/useReveal';
import { fetchProducts } from '@/lib/api';
import FlipProductCard from '@/components/FlipProductCard';

// Static fallback so the home page never goes empty before/while the API responds.
const FALLBACK_ITEMS = [
  { code: 'SAD',  title: 'Square Ceiling Diffuser',       category: 'Diffusers', images: ['/images/CD.jpeg'],         slug: 'square-ceiling-diffuser' },
  { code: 'RAD',  title: 'Round/Square Ceiling Diffuser', category: 'Diffusers', images: ['/images/CD.jpeg'],         slug: 'round-ceiling-diffuser' },
  { code: 'SLSD', title: 'Square Linear Slot Diffuser',   category: 'Diffusers', images: ['/images/SLSD RLSD.jpeg'],  slug: 'square-linear-slot-diffuser' },
  { code: 'RLSD', title: 'Round Linear Slot Diffuser',    category: 'Diffusers', images: ['/images/SLSD RLSD.jpeg'],  slug: 'round-linear-slot-diffuser' },
  { code: 'SAR',  title: 'Supply Air Register',           category: 'Grilles',   images: ['/images/SAG.jpeg'],        slug: 'supply-air-register' },
  { code: 'SAG',  title: 'Supply Air Grille',             category: 'Grilles',   images: ['/images/SAG.jpeg'],        slug: 'supply-air-grille' },
  { code: 'RAG',  title: 'Return Air Grille',             category: 'Grilles',   images: ['/images/RAG.jpeg'],        slug: 'return-air-grille' },
  { code: 'SLBR', title: 'Linear Bar Register',           category: 'Grilles',   images: ['/images/SLBR.jpeg'],       slug: 'linear-bar-register' },
];

export default function ProductsSection() {
  useReveal();
  const [items, setItems] = useState(FALLBACK_ITEMS);

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchProducts();
        const list = (json.data || []).filter((p) => p.active !== false);
        if (!list.length) return;
        const featured = list.filter((p) => p.featured);
        const ordered = featured.length >= 4 ? featured : list;
        setItems(ordered.slice(0, 8));
      } catch {
        // keep fallback
      }
    })();
  }, []);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14 reveal">
          <div className="max-w-xl">
            <span className="section-label">Product Range</span>
            <h2 className="heading-lg">Aluminum air distribution products</h2>
            <p className="lead mt-4 text-muted">
              Eight core product families, manufactured to consistent
              tolerances and ASHRAE-aligned performance.
            </p>
          </div>
          <Link href="/products" className="btn-secondary flex-shrink-0 self-start md:self-end">
            View all products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((item, i) => (
            <div
              key={item._id || item.code}
              className={`reveal delay-${Math.min(i + 1, 5)}`}
            >
              <FlipProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
