'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Download,
  CheckCircle2,
  FileText,
  Send,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import FlipProductCard from '@/components/FlipProductCard';
import { fetchProductBySlug, fetchProducts } from '@/lib/api';

export default function ProductDetailClient({ slug }) {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const json = await fetchProductBySlug(slug);
        if (cancelled) return;
        const item = json?.data;
        if (!item) {
          setMissing(true);
        } else {
          setProduct(item);
          // Load related (same category, exclude self)
          try {
            const allJson = await fetchProducts();
            const others = (allJson.data || [])
              .filter(
                (p) =>
                  p.active !== false &&
                  p.slug !== item.slug &&
                  p.category === item.category
              )
              .slice(0, 4);
            if (!cancelled) setRelated(others);
          } catch {
            // ignore related fetch errors
          }
        }
      } catch (err) {
        if (!cancelled) {
          if (/404|not found/i.test(err.message)) {
            setMissing(true);
          } else {
            setError(err.message || 'Failed to load product');
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (missing) {
    notFound();
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center bg-white">
          <p className="text-muted">Loading product…</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center bg-white">
          <div className="text-center px-4">
            <p className="text-red-700 mb-4">{error || 'Product not found.'}</p>
            <Link href="/products" className="btn-secondary">
              <ArrowLeft size={14} /> Back to products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = product.images?.length ? product.images : [];
  const cover = images[activeImage] || images[0] || null;
  const specEntries = [
    ['Material', product.specs?.material],
    ['Finish', product.specs?.finish],
    ['Application', product.specs?.application],
  ].filter(([, v]) => v);
  const perfEntries = [
    ['Airflow Range', product.performance?.airflowRange],
    ['Throw Range', product.performance?.throwRange],
    ['Noise Level', product.performance?.noiseLevel],
    ['Pressure Drop', product.performance?.pressureDrop],
  ].filter(([, v]) => v);

  const quoteHref =
    `/contact?subject=${encodeURIComponent('Quote Request')}` +
    `&product=${encodeURIComponent(product.title)}` +
    (product.code ? `&code=${encodeURIComponent(product.code)}` : '');

  return (
    <>
      <Navbar />
      <main>
        {/* Header strip */}
        <div className="bg-navy py-8 sm:py-10 md:py-14 border-b border-white/5">
          <div className="container reveal">
            <div className="breadcrumb mb-3">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/products">Products</Link>
              <span>/</span>
              <span className="text-white">{product.title}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {product.code && (
                <span className="text-accent font-heading font-semibold text-xs tracking-[0.18em] uppercase">
                  {product.code}
                </span>
              )}
              {product.category && (
                <span className="tag tag-accent">{product.category}</span>
              )}
            </div>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3">
              {product.title}
            </h1>
            {product.subCategory && (
              <p className="text-white/65 mt-3 text-base">{product.subCategory}</p>
            )}
          </div>
        </div>

        {/* Main detail */}
        <section className="section section-light">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Image gallery */}
              <div className="lg:col-span-6 reveal-left">
                <div className="card-static overflow-hidden bg-offwhite">
                  <div className="relative w-full aspect-[4/3] bg-offwhite">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={product.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Box size={64} strokeWidth={1.2} className="text-navy/25" />
                      </div>
                    )}
                  </div>
                </div>

                {images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
                    {images.map((src, idx) => (
                      <button
                        key={src + idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                          idx === activeImage
                            ? 'border-accent'
                            : 'border-hairline hover:border-navy/40'
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${product.title} thumbnail ${idx + 1}`}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {product.technicalDrawing && (
                  <div className="mt-5 card-static p-4 flex items-center gap-3">
                    <FileText size={18} className="text-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-semibold text-ink text-sm">
                        Technical Drawing
                      </p>
                      <p className="text-muted text-xs">
                        Dimensional reference for installation
                      </p>
                    </div>
                    <a
                      href={product.technicalDrawing}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs py-2 px-3"
                    >
                      View
                    </a>
                  </div>
                )}
              </div>

              {/* Info column */}
              <div className="lg:col-span-6 reveal-right">
                {product.shortDescription && (
                  <p className="text-slate text-base leading-relaxed mb-6">
                    {product.shortDescription}
                  </p>
                )}

                {/* Sizes */}
                {product.specs?.sizes?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-heading font-semibold text-ink text-xs uppercase tracking-[0.18em] mb-3">
                      Available Sizes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.specs.sizes.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-heading font-medium text-navy bg-white border border-hairline rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {specEntries.length > 0 && (
                  <div className="card-static p-5 mb-5">
                    <h3 className="font-heading font-semibold text-ink text-xs uppercase tracking-[0.18em] mb-4 pb-3 border-b border-hairline">
                      Specifications
                    </h3>
                    <dl className="space-y-3">
                      {specEntries.map(([k, v]) => (
                        <div
                          key={k}
                          className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 text-sm"
                        >
                          <dt className="text-muted sm:w-32 flex-shrink-0">{k}</dt>
                          <dd className="text-ink flex-1">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Performance */}
                {perfEntries.length > 0 && (
                  <div className="card-static p-5 mb-5">
                    <h3 className="font-heading font-semibold text-ink text-xs uppercase tracking-[0.18em] mb-4 pb-3 border-b border-hairline">
                      Performance
                    </h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {perfEntries.map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-muted text-xs uppercase tracking-wider mb-1">
                            {k}
                          </dt>
                          <dd className="text-ink font-heading font-semibold text-sm">
                            {v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* CTA row */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link href={quoteHref} className="btn-primary flex-1 justify-center py-3">
                    <Send size={14} /> Request Quote
                  </Link>
                  {product.datasheetUrl && (
                    <a
                      href={product.datasheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex-1 justify-center py-3"
                    >
                      <Download size={14} /> Datasheet
                    </a>
                  )}
                </div>

                {/* Trust strip */}
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate">
                  {[
                    'Manufactured in Ajman, UAE',
                    'ASHRAE-aligned performance',
                    'Custom sizes on request',
                    'Lead time: 2–3 weeks',
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="section bg-white border-t border-hairline">
            <div className="container">
              <div className="flex items-end justify-between gap-4 mb-8 reveal">
                <div>
                  <span className="section-label">Related Products</span>
                  <h2 className="heading-md mt-2">More in {product.category}</h2>
                </div>
                <Link
                  href="/products"
                  className="btn-secondary flex-shrink-0 hidden sm:inline-flex"
                >
                  All products <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p, i) => (
                  <div key={p._id} className={`reveal delay-${Math.min(i + 1, 4)}`}>
                    <FlipProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <CatalogueSection />
      </main>
      <Footer />
    </>
  );
}
