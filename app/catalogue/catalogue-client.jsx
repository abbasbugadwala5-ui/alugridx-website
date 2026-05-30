'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, CheckCircle, FileText } from 'lucide-react';
import { submitEnquiry } from '@/lib/api';

export default function CatalogueClient() {
  const [form, setForm] = useState({ email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Backend requires a `name` field — derive one from the email so the
      // catalogue form can stay minimal (email + phone only).
      const derivedName = form.email.split('@')[0] || 'Catalogue Requester';
      await submitEnquiry({
        name: derivedName,
        email: form.email,
        phone: form.phone,
        subject: 'Catalogue Request',
        message: 'Catalogue requested via website.',
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-navy py-10 sm:py-14 md:py-20 border-b border-white/5">
          <div className="container reveal">
            <div className="breadcrumb mb-3">
              <Link href="/">Home</Link><span>/</span><span className="text-white">Catalogue</span>
            </div>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">Request Catalogue</h1>
            <p className="text-white/65 mt-3 max-w-xl">The complete 2026 product catalogue, with submission tables and dimensional drawings.</p>
          </div>
        </div>

        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">

              {/* Left — copy */}
              <div className="lg:col-span-5 reveal-left">
                <span className="section-label">Catalogue 2026</span>
                <h2 className="heading-lg">What&apos;s in the catalogue</h2>
                <p className="text-slate mt-5 leading-relaxed mb-7">
                  Complete technical specifications, dimensional drawings, k-factors,
                  throw and noise data — across all 15+ product series.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Ceiling Diffusers — SAD, RAD series',
                    'Linear Slot Diffusers — SLSD, RLSD series',
                    'Supply & Return Air Grilles',
                    'Linear Bar Grilles — SLBR series',
                    'Louvers — Exhaust & Sand Trap',
                    'Dampers — VCD, NRD series',
                    'Technical specifications & installation guides',
                    'Custom sizing & project consultation',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate">
                      <FileText size={14} className="text-accent flex-shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-hairline">
                  <Image
                    src="/images/hero/slide-4.jpg"
                    alt="ALUGRIDX product catalogue"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-navy/65 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] font-heading mb-2 text-white/60">Product Catalogue</p>
                      <p className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">ALUGRIDX 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-7 reveal-right">
                <div className="card-static p-5 sm:p-6 md:p-10 bg-offwhite">
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle size={48} className="text-accent mx-auto mb-4" strokeWidth={1.6} />
                      <h3 className="font-heading font-bold text-ink text-2xl mb-2">Request submitted</h3>
                      <p className="text-muted">We&apos;ll send the catalogue to your email within 24 hours.</p>
                      <div className="mt-6 p-4 bg-white border border-hairline rounded-md inline-block">
                        <p className="text-ink text-sm font-semibold">
                          Urgent? <a href="tel:+971585521251" className="text-accent">+971 58 552 1251</a>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <h3 className="font-heading font-bold text-ink text-xl">Get the catalogue</h3>
                        <p className="text-muted text-xs mt-1">Just your email and phone — we&apos;ll send it across within 24 hours.</p>
                      </div>
                      {[
                        { name: 'email', label: 'Email Address *', type: 'email', autoComplete: 'email', inputMode: 'email' },
                        { name: 'phone', label: 'Phone Number *',  type: 'tel',   autoComplete: 'tel',   inputMode: 'tel'   },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="form-label" htmlFor={`cat-${field.name}`}>{field.label}</label>
                          <input
                            id={`cat-${field.name}`}
                            required
                            type={field.type}
                            name={field.name}
                            value={form[field.name]}
                            autoComplete={field.autoComplete}
                            inputMode={field.inputMode}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                            className="form-input"
                          />
                        </div>
                      ))}
                      {error && (
                        <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
                      )}
                      <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                        {loading ? 'Submitting…' : <><Send size={14} /> Submit Request</>}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
