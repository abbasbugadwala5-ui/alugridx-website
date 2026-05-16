'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import { Plus } from 'lucide-react';
import { fetchFaqs } from '@/lib/api';

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchFaqs();
        setFaqs((json.data || []).filter(f => f.active !== false));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-navy py-10 sm:py-14 md:py-20 border-b border-white/5">
          <div className="container reveal">
            <div className="breadcrumb mb-3">
              <Link href="/">Home</Link><span>/</span><span className="text-white">FAQs</span>
            </div>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">Frequently Asked Questions</h1>
            <p className="text-white/65 mt-3 max-w-xl">Answers to common questions about ALUGRIDX products, lead times and technical specifications.</p>
          </div>
        </div>

        <section className="section section-light">
          <div className="container max-w-3xl">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-5">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center text-muted py-16">Loading FAQs…</div>
            ) : faqs.length === 0 ? (
              <div className="text-center text-muted py-16 border border-dashed border-hairline rounded-md bg-white">
                No FAQs published yet.
              </div>
            ) : (
              <div className="card-static bg-white divide-y divide-hairline reveal">
                {faqs.map((faq, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={faq._id}>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="w-full flex items-start justify-between gap-5 px-5 md:px-6 py-5 text-left hover:bg-offwhite transition-colors"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <span className="font-heading font-semibold text-muted text-xs tabular-nums mt-1 w-6 flex-shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-heading font-semibold text-ink text-[15px] md:text-base leading-snug">
                            {faq.question}
                          </span>
                        </div>
                        <Plus
                          size={16}
                          className={`text-accent flex-shrink-0 mt-1.5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                        />
                      </button>
                      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                        <div className="px-5 md:px-6 pb-5 pl-14 md:pl-[3.75rem]">
                          <p className="text-slate text-sm leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-12 card-static p-8 md:p-10 text-center bg-white reveal">
              <h3 className="font-heading font-semibold text-ink text-xl mb-2">Still have questions?</h3>
              <p className="text-muted text-sm mb-6">Our team is ready to help with any technical or sales enquiry.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary">Contact Us</Link>
                <a href="tel:+971585521251" className="btn-secondary">Call +971 58 552 1251</a>
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
