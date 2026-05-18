'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import ProductCard from '@/components/ProductCard';
import { ChevronRight } from 'lucide-react';
import { fetchProducts } from '@/lib/api';

export default function ProductsClient() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchProducts();
        setProducts((json.data || []).filter(p => p.active !== false));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    return [{ id: 'all', label: 'All Products' }, ...unique.map(c => ({ id: c, label: c }))];
  }, [products]);

  const filtered = active === 'all' ? products : products.filter(p => p.category === active);

  return (
    <>
      <Navbar />
      <main>
        {/* Page header — navy strip */}
        <div className="bg-navy py-10 sm:py-14 md:py-20 border-b border-white/5">
          <div className="container reveal">
            <div className="breadcrumb mb-3">
              <Link href="/">Home</Link>
              <span>/</span>
              <span className="text-white">Products</span>
            </div>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">Our Products</h1>
            <p className="text-white/65 mt-3 max-w-xl text-base">
              Premium aluminum HVAC air distribution products, manufactured in Ajman, UAE.
            </p>
          </div>
        </div>

        <section className="section section-light">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

              {/* Sidebar */}
              <aside className="lg:w-64 flex-shrink-0 reveal-left">
                <div className="card-static p-5 lg:sticky lg:top-28">
                  <h3 className="font-heading font-semibold text-ink text-xs uppercase tracking-[0.18em] mb-4 pb-3 border-b border-hairline">
                    Categories
                  </h3>
                  <ul className="space-y-1">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => setActive(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm text-left transition-colors ${
                            active === cat.id
                              ? 'bg-navy text-white font-semibold'
                              : 'text-slate hover:bg-offwhite hover:text-accent'
                          }`}
                        >
                          {cat.label}
                          <ChevronRight size={13} className={active === cat.id ? 'text-white' : 'text-muted'} />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-offwhite border border-hairline rounded-md">
                    <p className="font-heading font-semibold text-ink text-sm mb-1">Need full specifications?</p>
                    <p className="text-muted text-xs mb-3 leading-relaxed">
                      Submission tables, k-factors and pressure data are in the catalogue.
                    </p>
                    <Link href="/catalogue" className="btn-primary w-full text-xs py-2">
                      Request Catalogue
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Product grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-hairline">
                  <p className="text-muted text-sm">
                    {loading ? 'Loading…' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
                  </p>
                </div>

                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-5">
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="text-center text-muted py-16">Loading products…</div>
                ) : filtered.length === 0 ? (
                  <div className="text-center text-muted py-16 border border-dashed border-hairline rounded-md bg-white">
                    No products in this category yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map((product, i) => (
                      <div key={product._id} className={`reveal delay-${Math.min((i % 6) + 1, 6)}`}>
                        <ProductCard
                          product={product}
                          href="/contact"
                          ctaLabel="Request Quote"
                        />
                      </div>
                    ))}
                  </div>
                )}
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
