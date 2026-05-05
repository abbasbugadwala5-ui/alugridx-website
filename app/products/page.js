'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import { ArrowRight, ChevronRight } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'ceiling-diffusers', label: 'Ceiling Diffusers' },
  { id: 'linear-diffusers', label: 'Linear Slot Diffusers' },
  { id: 'supply-grilles', label: 'Supply Air Grilles' },
  { id: 'return-grilles', label: 'Return Air Grilles' },
  { id: 'linear-bar', label: 'Linear Bar Grilles' },
  { id: 'louvers', label: 'Louvers' },
  { id: 'dampers', label: 'Volume Control Dampers' },
  { id: 'non-return', label: 'Non Return Dampers' },
];

const products = [
  { id: 'sad', cat: 'ceiling-diffusers', code: 'SAD', title: 'Square Ceiling Diffuser', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', specs: ['Square face, adjustable pattern', 'Aluminum powder-coated', 'Multiple neck sizes', 'ASHRAE compliant'] },
  { id: 'rad', cat: 'ceiling-diffusers', code: 'RAD', title: 'Round/Square Ceiling Diffuser', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', specs: ['Round neck, square face', 'Uniform air distribution', '4-way blow pattern', 'Custom colors'] },
  { id: 'slsd', cat: 'linear-diffusers', code: 'SLSD', title: 'Square Linear Slot Diffuser', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80', specs: ['1, 2, 3, 4 slot options', 'Plaster-in available', 'Adjustable deflection', 'Up to 3000mm length'] },
  { id: 'rlsd', cat: 'linear-diffusers', code: 'RLSD', title: 'Round Linear Slot Diffuser', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80', specs: ['Continuous ceiling line', 'High induction ratio', 'Architectural finish', 'Custom lengths'] },
  { id: 'sar', cat: 'supply-grilles', code: 'SAR', title: 'Supply Air Register', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80', specs: ['Fixed & adjustable blade', 'Integral VCD option', 'Single deflection', 'Multiple sizes'] },
  { id: 'sag', cat: 'supply-grilles', code: 'SAG', title: 'Supply Air Grille', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80', specs: ['Double deflection blades', 'Horizontal & vertical', 'Anodized finish', 'Surface mount'] },
  { id: 'rag', cat: 'return-grilles', code: 'RAG', title: 'Return Air Grille', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', specs: ['Fixed blade design', 'High free area', 'Filter frame option', 'All sizes available'] },
  { id: 'slbr', cat: 'linear-bar', code: 'SLBR', title: 'Linear Bar Register', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', specs: ['0°, 15°, 22.5°, 30° options', 'Floor, wall, ceiling', 'Extruded aluminum', 'Anodized finish'] },
  { id: 'eal', cat: 'louvers', code: 'EAL', title: 'Exhaust Air Louver', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80', specs: ['Drainable blade profile', 'Weather protection', 'Bird mesh included', 'Heavy gauge frame'] },
  { id: 'stl', cat: 'louvers', code: 'STL', title: 'Sand Trap Louver', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80', specs: ['Desert climate designed', 'Sand & dust prevention', 'High efficiency', 'UAE climate tested'] },
  { id: 'vcd', cat: 'dampers', code: 'VCD', title: 'Volume Control Damper', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80', specs: ['Opposed parallel blades', 'Manual & motorized', 'Precise airflow control', 'All duct sizes'] },
  { id: 'nrd', cat: 'non-return', code: 'NRD', title: 'Non Return Damper', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80', specs: ['Gravity operated', 'Backflow prevention', 'Low pressure drop', 'Aluminum blades'] },
];

export default function ProductsPage() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? products : products.filter((p) => p.cat === active);

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-navy py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=60" alt="" fill className="object-cover" />
          </div>
          <div className="container relative">
            <div className="breadcrumb mb-3 text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Our Products</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl">Our Products</h1>
            <p className="text-white/60 mt-2">Premium aluminum HVAC air distribution products</p>
          </div>
        </div>

        {/* Products layout */}
        <section className="section section-light">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Sidebar */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="card p-4 sticky top-24">
                  <h3 className="font-heading font-bold text-dark text-sm uppercase tracking-wider mb-4 pb-3 border-b border-border">
                    Categories
                  </h3>
                  <ul className="space-y-1">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => setActive(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm font-body text-left transition-colors ${
                            active === cat.id
                              ? 'bg-navy text-white font-semibold'
                              : 'text-dark hover:bg-gray-100 hover:text-navy'
                          }`}
                        >
                          {cat.label}
                          <ChevronRight size={13} className={active === cat.id ? 'text-white' : 'text-muted'} />
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Catalogue CTA */}
                  <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-navy/20">
                    <p className="font-heading font-bold text-dark text-sm mb-1">Need Specifications?</p>
                    <p className="text-muted text-xs mb-3">Get our full product catalogue</p>
                    <Link href="/catalogue" className="btn-primary w-full justify-center text-xs py-2">
                      Request Catalogue
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Product grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted text-sm">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((product) => (
                    <div key={product.id} className="product-card card group overflow-hidden">
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <Image src={product.img} alt={product.title} fill className="object-cover product-card-img" />
                        <div className="absolute top-3 left-3">
                          <span className="badge">{product.code}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading font-bold text-dark text-base mb-3 group-hover:text-navy transition-colors">
                          {product.title}
                        </h3>
                        <ul className="space-y-1.5 mb-4">
                          {product.specs.map((spec) => (
                            <li key={spec} className="flex items-center gap-2 text-xs text-muted">
                              <div className="w-1 h-1 rounded-full bg-navy flex-shrink-0" /> {spec}
                            </li>
                          ))}
                        </ul>
                        <Link href="/contact" className="btn-outline w-full justify-center text-sm py-2">
                          Request Quote
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CatalogueSection />
      </main>
      <Footer />
    </>
  );
}
