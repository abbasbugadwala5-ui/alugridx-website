'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/components/useReveal';
import { fetchProjects } from '@/lib/api';

const FALLBACK_IMG = '/images/CD.jpeg';

function ProjectImage({ src, alt }) {
  const [errored, setErrored] = useState(false);
  return (
    <Image
      src={errored || !src ? FALLBACK_IMG : src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
      onError={() => setErrored(true)}
    />
  );
}

export default function ProjectsPreview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useReveal();

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchProjects();
        setProjects((json.data || []).slice(0, 6));
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="section section-navy">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 reveal">
          <div className="max-w-xl">
            <span className="section-label section-label-on-dark">Selected projects</span>
            <h2 className="heading-lg text-white">A track record across the GCC.</h2>
            <p className="text-white/65 mt-4 lead">
              Residential towers, commercial fit-outs, industrial facilities
              and infrastructure projects.
            </p>
          </div>
          <Link href="/projects" className="btn-white-outline self-start md:self-end flex-shrink-0">
            All projects <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-white/60 py-12">Loading projects…</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-white/60 py-12 border border-dashed border-white/15 rounded-md">
            No projects published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {projects.map((proj) => (
              <Link
                key={proj._id}
                href="/projects"
                className="group relative overflow-hidden rounded-md border border-white/10 bg-navy-light/40 transition-colors hover:border-accent"
              >
                <div className="relative aspect-[4/3]">
                  <ProjectImage src={proj.img} alt={proj.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {proj.category && (
                    <span className="inline-block text-[10px] uppercase tracking-[0.18em] font-semibold text-white/70 font-heading mb-2">
                      {proj.category}
                    </span>
                  )}
                  <h3 className="font-heading font-semibold text-white text-base leading-snug">{proj.title}</h3>
                  {proj.location && (
                    <p className="text-white/55 text-xs mt-1">{proj.location}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
