'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import { ArrowRight } from 'lucide-react';
import { fetchBlogs } from '@/lib/api';

const FALLBACK_IMG = '/images/CD.jpeg';

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-AE', { year: 'numeric', month: 'short', day: '2-digit' });
}

export default function BlogClient() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchBlogs();
        setPosts((json.data || []).filter(p => p.published));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-navy py-10 sm:py-14 md:py-20 border-b border-white/5">
          <div className="container reveal">
            <div className="breadcrumb mb-3">
              <Link href="/">Home</Link><span>/</span><span className="text-white">Blog & News</span>
            </div>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">Blog & News</h1>
            <p className="text-white/65 mt-3 max-w-xl">HVAC insights, product guides and industry news.</p>
          </div>
        </div>

        <section className="section section-light">
          <div className="container">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-5">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center text-muted py-16">Loading posts…</div>
            ) : posts.length === 0 ? (
              <div className="text-center text-muted py-16 border border-dashed border-hairline rounded-md bg-white">
                No published posts yet.
              </div>
            ) : (
              <>
                {featured && (
                  <div className="card overflow-hidden mb-8 sm:mb-10 group reveal">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative aspect-[4/3] lg:aspect-auto bg-offwhite">
                        <Image
                          src={featured.img || FALLBACK_IMG}
                          alt={featured.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover product-card-img"
                        />
                      </div>
                      <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                          {featured.category && <span className="tag tag-accent">{featured.category}</span>}
                          <span className="text-muted text-xs tabular-nums">{formatDate(featured.date || featured.createdAt)}</span>
                        </div>
                        <h2 className="font-heading font-bold text-ink text-xl sm:text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors leading-snug">
                          {featured.title}
                        </h2>
                        <p className="text-slate text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                        <Link href="/blog" className="btn-primary self-start">
                          Read article <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {rest.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {rest.map((post, i) => (
                      <div key={post._id} className={`card overflow-hidden group hover:border-accent transition-colors reveal delay-${Math.min((i % 6) + 1, 6)}`}>
                        <div className="relative aspect-[4/3] overflow-hidden bg-offwhite">
                          <Image
                            src={post.img || FALLBACK_IMG}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover product-card-img"
                          />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            {post.category && <span className="tag tag-accent">{post.category}</span>}
                            <span className="text-muted text-xs tabular-nums">{formatDate(post.date || post.createdAt)}</span>
                          </div>
                          <h3 className="font-heading font-semibold text-ink text-base mb-2 group-hover:text-accent transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-muted text-[13px] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                          <Link href="/blog" className="inline-flex items-center gap-1.5 text-accent text-xs font-heading font-semibold uppercase tracking-wider hover:gap-2.5 transition-all">
                            Read article <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <CatalogueSection />
      </main>
      <Footer />
    </>
  );
}
