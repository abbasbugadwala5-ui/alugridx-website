'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/components/useReveal';

const projects = [
  { title: 'Dubai Commercial Tower', category: 'Commercial', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80' },
  { title: 'Ajman Industrial Complex', category: 'Industrial', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80' },
  { title: 'Abu Dhabi Residential', category: 'Residential', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80' },
  { title: 'Sharjah Hospitality', category: 'Hospitality', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80' },
  { title: 'Dubai Airport Terminal', category: 'Infrastructure', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&q=80' },
  { title: 'RAK Shopping Mall', category: 'Commercial', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700&q=80' },
];

export default function ProjectsPreview() {
  const swiperRef = useRef(null);
  useReveal();

  useEffect(() => {
    let swiper;
    const init = async () => {
      const { Swiper } = await import('swiper');
      const { Autoplay, Navigation } = await import('swiper/modules');
      await import('swiper/css');
      await import('swiper/css/navigation');
      swiper = new Swiper(swiperRef.current, {
        modules: [Autoplay, Navigation],
        loop: true,
        speed: 700,
        autoplay: { delay: 4000, disableOnInteraction: false },
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: { nextEl: '.proj-next', prevEl: '.proj-prev' },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    };
    init();
    return () => swiper?.destroy?.();
  }, []);

  return (
    <section className="section section-navy">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 reveal">
          <div>
            <span className="section-label text-blue-400">Our Projects</span>
            <h2 className="heading-lg text-white">Featured Projects</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="proj-prev w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
              ←
            </button>
            <button className="proj-next w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
              →
            </button>
            <Link href="/projects" className="btn-primary ml-2">
              All Projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div ref={swiperRef} className="swiper">
          <div className="swiper-wrapper">
            {projects.map((proj, i) => (
              <div key={i} className="swiper-slide">
                <div className="group relative rounded-xl overflow-hidden h-64 cursor-pointer">
                  <Image src={proj.img} alt={proj.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="badge text-xs mb-2 inline-block">{proj.category}</span>
                    <h3 className="font-heading font-bold text-white text-lg">{proj.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
