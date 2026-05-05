'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85',
    label: 'Premium HVAC Solutions',
    heading: 'SMART SOLUTIONS\nFOR MODERN SPACES',
    sub: 'Advanced engineering. Superior performance.\nSustainable solutions for UAE & GCC.',
    cta1: { label: 'Request Catalogue', href: '/catalogue' },
    cta2: { label: 'Explore Products', href: '/products' },
  },
  {
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85',
    label: 'Precision Manufactured',
    heading: 'ENGINEERED FOR\nPERFECT AIRFLOW',
    sub: 'Premium aluminum grilles, diffusers & louvers.\nBuilt for residential, commercial & industrial.',
    cta1: { label: 'View Products', href: '/products' },
    cta2: { label: 'Contact Us', href: '/contact' },
  },
  {
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=85',
    label: 'UAE Based Manufacturer',
    heading: 'YOUR TRUSTED\nHVAC PARTNER',
    sub: 'Based in Ajman, UAE. Delivering across\nUAE & GCC with 1-year product warranty.',
    cta1: { label: 'Our Projects', href: '/projects' },
    cta2: { label: 'About ALUGRIDX', href: '/about' },
  },
];

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Done' },
  { value: 'UAE & GCC', label: 'Wide Delivery' },
  { value: '1 Year', label: 'Product Warranty' },
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
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.hero-pagination', clickable: true },
        navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
      });
    };
    init();
    return () => swiper?.destroy?.();
  }, []);

  return (
    <section className="relative">
      {/* Swiper */}
      <div ref={swiperRef} className="swiper h-[580px] md:h-[650px] lg:h-[700px]">
        <div className="swiper-wrapper">
          {slides.map((slide, i) => (
            <div key={i} className="swiper-slide relative">
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                className="object-cover"
                priority={i === 0}
              />
              <div className="hero-overlay absolute inset-0" />

              <div className="relative z-10 h-full flex items-center">
                <div className="container">
                  <div className="max-w-2xl">
                    {/* Label */}
                    <div className="inline-flex items-center gap-2 bg-navy/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 font-heading tracking-wider">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      {slide.label}
                    </div>

                    {/* Heading */}
                    <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-5 whitespace-pre-line">
                      {slide.heading}
                    </h1>

                    {/* Sub */}
                    <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-8 whitespace-pre-line">
                      {slide.sub}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
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

        {/* Controls */}
        <div className="hero-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2" />
        <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-navy hover:bg-white transition-colors hidden md:flex">
          <ChevronRight size={18} className="rotate-180" />
        </button>
        <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-navy hover:bg-white transition-colors hidden md:flex">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Stats bar */}
      <div style={{background:"#0D1B3E"}}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {stats.map((stat) => (
              <div key={stat.label} className="py-5 px-6 text-center text-white diagonal-accent">
                <p className="font-heading font-extrabold text-2xl md:text-3xl">{stat.value}</p>
                <p className="text-white/70 text-xs mt-0.5 font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
