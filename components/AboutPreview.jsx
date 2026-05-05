'use client';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useReveal } from '@/components/useReveal';

const points = [
  'High-quality aluminum construction',
  'Excellent air distribution performance',
  'Compliant with industry standards',
  'Custom sizes available',
  'Easy installation & maintenance',
  '1-Year product warranty',
];

export default function AboutPreview() {
  useReveal();

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <div className="relative reveal-left">
            <div className="relative h-[400px] lg:h-[480px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80"
                alt="ALUGRIDX Manufacturing"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-5 -right-5 bg-navy text-white rounded-xl p-5 shadow-md w-44">
              <p className="font-heading font-extrabold text-3xl">500+</p>
              <p className="text-white/80 text-xs mt-0.5">Successful Projects</p>
            </div>
            {/* Experience badge */}
            <div className="absolute -top-4 -left-4 bg-navy text-white rounded-xl p-4 shadow-lg">
              <p className="font-heading font-extrabold text-2xl">10+</p>
              <p className="text-white/70 text-xs">Years Experience</p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right">
            <span className="section-label">About ALUGRIDX</span>
            <h2 className="heading-lg mb-4">
              Leading Manufacturer of<br />Air Distribution Products
            </h2>
            <p className="text-muted leading-relaxed mb-4 font-body">
              ALUGRIDX is a UAE-based manufacturer of premium HVAC air distribution products. Founded under the legacy of Hashim Darwish Commission LLC (Est. 1986), we bring nearly four decades of expertise to every product we make.
            </p>
            <p className="text-muted leading-relaxed mb-6 font-body">
              We deliver innovative, reliable and high performance solutions for residential, commercial and industrial projects across UAE & GCC.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {points.map((pt) => (
                <div key={pt} className="flex items-center gap-2.5">
                  <CheckCircle size={16} className="text-navy flex-shrink-0" />
                  <span className="text-dark text-sm font-body">{pt}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Learn More About Us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
