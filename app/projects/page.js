'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';

const tabs = ['All', 'Commercial', 'Industrial', 'Residential', 'Hospitality'];

const projects = [
  { title: 'Dubai Commercial Tower', cat: 'Commercial', location: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80', products: 'Ceiling Diffusers, Linear Grilles' },
  { title: 'Ajman Industrial Complex', cat: 'Industrial', location: 'Ajman, UAE', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80', products: 'Louvers, VCD, NRD' },
  { title: 'Abu Dhabi Luxury Residences', cat: 'Residential', location: 'Abu Dhabi, UAE', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80', products: 'Ceiling Diffusers, Grilles' },
  { title: 'Sharjah 5-Star Hotel', cat: 'Hospitality', location: 'Sharjah, UAE', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80', products: 'Linear Slot Diffusers' },
  { title: 'Dubai Airport Expansion', cat: 'Commercial', location: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&q=80', products: 'Jet Diffusers, Louvers' },
  { title: 'RAK Shopping Mall', cat: 'Commercial', location: 'Ras Al Khaimah, UAE', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700&q=80', products: 'Ceiling Diffusers, Grilles' },
  { title: 'Fujairah Industrial Park', cat: 'Industrial', location: 'Fujairah, UAE', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80', products: 'Sand Trap Louvers, VCD' },
  { title: 'Dubai Residential Compound', cat: 'Residential', location: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80', products: 'Ceiling Diffusers, Registers' },
  { title: 'Ajman Business Centre', cat: 'Commercial', location: 'Ajman, UAE', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80', products: 'Linear Diffusers, Dampers' },
];

export default function ProjectsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter((p) => p.cat === active);

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-navy py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=60" alt="" fill className="object-cover" />
          </div>
          <div className="container relative">
            <div className="breadcrumb mb-3 text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Projects</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl">Our Projects</h1>
            <p className="text-white/60 mt-2">Delivering quality across UAE & GCC</p>
          </div>
        </div>

        <section className="section bg-white">
          <div className="container">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all ${
                    active === tab ? 'bg-navy text-white shadow-md' : 'bg-gray-100 text-dark hover:bg-gray-100 hover:text-navy'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((proj, i) => (
                <div key={i} className="card group overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={proj.img} alt={proj.title} fill className="object-cover product-card-img" />
                    <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors" />
                    <div className="absolute top-3 left-3">
                      <span className="badge">{proj.cat}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-dark text-lg mb-1 group-hover:text-navy transition-colors">{proj.title}</h3>
                    <p className="text-muted text-xs mb-2">📍 {proj.location}</p>
                    <p className="text-sm text-muted"><span className="font-semibold text-dark">Products Used:</span> {proj.products}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CatalogueSection />
      </main>
      <Footer />
    </>
  );
}
