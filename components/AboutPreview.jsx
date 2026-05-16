'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { useReveal } from '@/components/useReveal';

const points = [
  'High-quality aluminum construction',
  'ASHRAE-aligned performance data',
  'Custom sizes available to order',
  'Easy installation and maintenance',
  'Powder-coated, corrosion-resistant',
  '1-year manufacturer warranty',
];

const facts = [
  ['10+',  'Years of experience'],
  ['500+', 'Projects delivered'],
];

export default function AboutPreview() {
  useReveal();

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">

          {/* Image */}
          <div className="lg:col-span-6 reveal-left">
            <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-hairline bg-offwhite">
              <Image
                src="/images/logo premium.png"
                alt="ALUGRIDX manufacturing"
                fill
                className="object-contain p-6 sm:p-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {facts.map(([v, l]) => (
                <div key={l} className="card-static p-5">
                  <p className="font-heading font-bold text-ink text-3xl tabular-nums tracking-tight">{v}</p>
                  <p className="text-muted text-xs mt-1 uppercase tracking-widest font-heading">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-6 reveal-right">
            <span className="section-label">About ALUGRIDX</span>
            <h2 className="heading-lg">
              UAE-based manufacturer of air distribution products.
            </h2>
            <p className="text-slate leading-relaxed mt-5 mb-4">
              ALUGRIDX manufactures HVAC air distribution products under the
              established business legacy of <strong className="text-ink font-semibold">Hashim Darwish Commission LLC</strong>{' '}
              (est. 1986) — nearly four decades of regional market presence
              brought to a precision-manufacturing line.
            </p>
            <p className="text-slate leading-relaxed mb-7">
              We supply diffusers, grilles, louvers and dampers to residential,
              commercial and industrial projects across the UAE and GCC.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {points.map((pt) => (
                <div key={pt} className="flex items-start gap-2.5">
                  <Check size={14} className="text-accent flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span className="text-slate text-sm">{pt}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              About the company <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
