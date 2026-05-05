'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/components/useReveal';

const categories = [
  { code: 'SAD/RAD', title: 'Ceiling Diffusers', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', href: '/products#ceiling-diffusers' },
  { code: 'SLSD/RLSD', title: 'Linear Slot Diffusers', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', href: '/products#linear-diffusers' },
  { code: 'SAR/SAG', title: 'Supply Air Grilles', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80', href: '/products#supply-grilles' },
  { code: 'RAG', title: 'Return Air Grilles', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80', href: '/products#return-grilles' },
  { code: 'SLBR', title: 'Linear Bar Grilles', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80', href: '/products#linear-bar' },
  { code: 'EAL/STL', title: 'Louvers', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80', href: '/products#louvers' },
  { code: 'VCD', title: 'Volume Control Dampers', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', href: '/products#dampers' },
  { code: 'NRD', title: 'Non Return Dampers', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80', href: '/products#non-return' },
];

export default function ProductsSection() {
  useReveal();

  return (
    <section className="section bg-white">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 reveal">
          <div>
            <span className="section-label">Our Products</span>
            <h2 className="heading-lg">Aluminum Products</h2>
          </div>
          <Link href="/products" className="btn-outline flex-shrink-0">
            View All Products <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <Link
              key={cat.code}
              href={cat.href}
              className={`product-card group rounded-lg overflow-hidden border border-border reveal delay-${Math.min(i + 1, 5)}`}
            >
              {/* Image */}
              <div className="relative h-40 md:h-48 overflow-hidden bg-gray-100">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover product-card-img"
                />
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors" />
              </div>

              {/* Label */}
              <div className="p-3 md:p-4">
                <p className="text-[10px] text-navy font-semibold tracking-widest uppercase mb-1 font-heading">{cat.code}</p>
                <h3 className="font-heading font-bold text-dark text-sm md:text-base leading-snug group-hover:text-navy transition-colors">
                  {cat.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-navy text-xs mt-2 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
