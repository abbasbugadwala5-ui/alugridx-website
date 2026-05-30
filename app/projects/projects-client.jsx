'use client';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import { fetchProjects } from '@/lib/api';

const FALLBACK_IMG = '/images/CD.jpeg';

function ProjectImage({ src, alt }) {
  const [errored, setErrored] = useState(false);
  return (
    <Image
      src={errored || !src ? FALLBACK_IMG : src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover product-card-img"
      onError={() => setErrored(true)}
    />
  );
}

export default function ProjectsClient() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState('All');

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchProjects();
        setProjects(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const tabs = useMemo(() => {
    const unique = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
    return ['All', ...unique];
  }, [projects]);

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-navy py-10 sm:py-14 md:py-20 border-b border-white/5">
          <div className="container reveal">
            <div className="breadcrumb mb-3">
              <Link href="/">Home</Link><span>/</span><span className="text-white">Projects</span>
            </div>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">Our Projects</h1>
            <p className="text-white/65 mt-3 max-w-xl">A selection of recent residential, commercial and industrial deliveries across the UAE & GCC.</p>
          </div>
        </div>

        <section className="section bg-white">
          <div className="container">
            {/* Filter tabs — restrained pill style */}
            <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-hairline">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`px-3 sm:px-4 py-2 rounded-md text-[11px] sm:text-xs font-heading font-semibold uppercase tracking-wider transition-all border ${
                    active === tab
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-slate border-hairline hover:border-accent hover:text-accent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-5">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center text-muted py-16">Loading projects…</div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-muted py-16 border border-dashed border-hairline rounded-md">
                No projects to show yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((proj, i) => (
                  <div
                    key={proj._id}
                    className={`card group overflow-hidden hover:border-accent transition-colors reveal delay-${Math.min((i % 6) + 1, 6)}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-offwhite">
                      <ProjectImage src={proj.img} alt={proj.title} />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        {proj.category && <span className="tag tag-accent">{proj.category}</span>}
                        {proj.year && <span className="text-muted text-xs tabular-nums">{proj.year}</span>}
                      </div>
                      <h3 className="font-heading font-semibold text-ink text-base mb-1 group-hover:text-accent transition-colors">
                        {proj.title}
                      </h3>
                      {proj.location && (
                        <p className="text-muted text-xs mb-2">{proj.location}</p>
                      )}
                      {proj.products && (
                        <p className="text-[13px] text-slate leading-relaxed mt-2 pt-3 border-t border-hairline">
                          <span className="font-semibold text-ink">Products: </span>
                          {proj.products}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <CatalogueSection />
      </main>
      <Footer />
    </>
  );
}
