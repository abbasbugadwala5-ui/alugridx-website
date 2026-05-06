'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/components/useReveal';

const categories = [
  { code: 'SAD/RAD', title: 'Ceiling Diffusers', img: '/images/CD.jpeg', href: '/products#ceiling-diffusers' },
  { code: 'SLSD/RLSD', title: 'Linear Slot Diffusers', img: '/images/SLSD RLSD.jpeg', href: '/products#linear-diffusers' },
  { code: 'SAR/SAG', title: 'Supply Air Grilles', img: '/images/SAG.jpeg', href: '/products#supply-grilles' },
  { code: 'RAG', title: 'Return Air Grilles', img: '/images/RAG.jpeg', href: '/products#return-grilles' },
    { code: 'NRD', title: 'Non Return Dampers', img: '/images/NRD.jpeg', href: '/products#non-return' },

  { code: 'SLBR', title: 'Linear Bar Grilles', img: '/images/SLBR.jpeg', href: '/products#linear-bar' },
  
  { code: 'EAL/STL', title: 'Louvers', img: '/images/EAL STL.jpeg', href: '/products#louvers' },
  { code: 'VCD', title: 'Volume Control Dampers', img: '/images/VCD.jpeg', href: '/products#dampers' },

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
              <div className="relative h-45 md:h-48 overflow-hidden bg-gray-100">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover product-card-img"
                />
                <div className="absolute inset-0 bg-white/05 group-hover:bg-navy/10 transition-colors" />
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
