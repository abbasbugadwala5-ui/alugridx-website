'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import StatCounter from '@/components/StatCounter';

const slides = [
  {
    image: '/images/hero/slide-1.jpg',
    label: 'Engineered Ductwork',
    heading: 'Built for the spaces\nthat power industry.',
    sub: 'Insulated, sand-trap-tested air distribution networks — engineered for Gulf climate, installed across UAE & GCC.',
    cta1: { label: 'Browse Products', href: '/products' },
    cta2: { label: 'Our Projects', href: '/projects' },
  },
  {
    image: '/images/hero/slide-2.jpg',
    label: 'Premium HVAC Solutions',
    heading: 'Engineered air distribution\nfor modern spaces.',
    sub: 'Advanced manufacturing. Superior performance. Sustainable solutions across the UAE & GCC.',
    cta1: { label: 'Request Catalogue', href: '/catalogue' },
    cta2: { label: 'Browse Products', href: '/products' },
  },
  {
    image: '/images/hero/slide-3.jpg',
    label: 'Precision Manufactured',
    heading: 'Built for perfect airflow,\nspec sheet by spec sheet.',
    sub: 'Premium aluminum grilles, diffusers and louvers — residential, commercial and industrial.',
    cta1: { label: 'View Products', href: '/products' },
    cta2: { label: 'Contact Us', href: '/contact' },
  },
  {
    image: '/images/hero/slide-4.jpg',
    label: 'Sand-Trap Tested',
    heading: 'Designed for the desert,\ntested by the desert.',
    sub: 'Drainable-blade louvers and weather-grade housings built to defeat Gulf sand, dust and rain.',
    cta1: { label: 'Explore Louvers', href: '/products' },
    cta2: { label: 'Request Catalogue', href: '/catalogue' },
  },
  {
    image: '/images/hero/slide-5.jpg',
    label: 'UAE Based Manufacturer',
    heading: 'Your trusted\nHVAC partner.',
    sub: 'Based in Ajman, UAE. Delivering across UAE & GCC with a 1-year manufacturer warranty.',
    cta1: { label: 'Our Projects', href: '/projects' },
    cta2: { label: 'About ALUGRIDX', href: '/about' },
  },
];

const stats = [
  { value: '10+',       label: 'Years experience' },
  { value: '500+',      label: 'Projects delivered' },
  { value: 'UAE & GCC', label: 'Coverage' },
  { value: '1 Year',    label: 'Warranty' },
];

export default function Hero() {
  const swiperRef = useRef(null);

  useEffect(() => {
    let swiper;
    const init = async () => {
      const { Swiper } = await import('swiper');
      const { Autoplay, Pagination, Navigation, EffectFade } = await import('swiper/modules');
      await import('swiper/css');
      await import('swiper/css/effect-fade');
      await import('swiper/css/pagination');
      await import('swiper/css/navigation');

      swiper = new Swiper(swiperRef.current, {
        modules: [Autoplay, Pagination, Navigation, EffectFade],
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 900,
        autoplay: { delay: 5500, disableOnInteraction: false },
        pagination: { el: '.hero-pagination', clickable: true },
        navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
      });
    };
    init();
    return () => swiper?.destroy?.();
  }, []);

  return (
    <section className="relative">
      <div ref={swiperRef} className="swiper h-[560px] sm:h-[620px] md:h-[700px] lg:h-[760px]">
        <div className="swiper-wrapper">
          {slides.map((slide, i) => (
            <div key={i} className="swiper-slide relative">
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                className="object-cover hero-ken-burns"
              />
              <div className="hero-overlay absolute inset-0" />

              <div className="relative z-10 h-full flex items-center pt-20 md:pt-24 pb-10">
                <div className="container">
                  <div className="max-w-2xl hero-slide-content">
                    {/* Label */}
                    <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-white/80 font-heading mb-4 sm:mb-6">
                      <span className="w-5 sm:w-6 h-px bg-accent" />
                      {slide.label}
                    </span>

                    {/* Heading */}
                    <h1 className="font-heading font-bold text-white leading-[1.05] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 whitespace-pre-line">
                      {slide.heading}
                    </h1>

                    {/* Sub */}
                    <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8">
                      {slide.sub}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                      <Link href={slide.cta1.href} className="btn-primary">
                        {slide.cta1.label} <ArrowRight size={15} />
                      </Link>
                      <Link href={slide.cta2.href} className="btn-white-outline">
                        {slide.cta2.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination — slim hairline bars */}
        <div className="hero-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2" />

        {/* Prev / Next */}
        <button
          className="hero-prev hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-md border border-white/30 bg-navy/40 backdrop-blur-sm text-white items-center justify-center hover:bg-white hover:text-navy transition-colors"
          aria-label="Previous slide"
        >
          <ChevronRight size={18} className="rotate-180" />
        </button>
        <button
          className="hero-next hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-md border border-white/30 bg-navy/40 backdrop-blur-sm text-white items-center justify-center hover:bg-white hover:text-navy transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Stats strip — offwhite under hero */}
      <div className="bg-offwhite border-y border-hairline">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-hairline">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-5 md:py-8 px-4 md:px-8 text-center md:text-left reveal delay-${Math.min(i + 1, 4)}`}
              >
                <p className="font-heading font-bold text-ink text-xl md:text-3xl tabular-nums tracking-tight">
                  <StatCounter value={stat.value} />
                </p>
                <p className="text-muted text-[11px] md:text-sm mt-1 font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
