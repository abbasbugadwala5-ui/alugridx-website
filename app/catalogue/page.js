'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, CheckCircle, FileText } from 'lucide-react';

export default function CataloguePage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', requirements: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: 'Catalogue Request', message: form.requirements }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-navy py-12 relative overflow-hidden">
          <div className="container relative">
            <div className="breadcrumb mb-3 text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Request Catalogue</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl">Request Catalogue</h1>
            <p className="text-white/60 mt-2">Get our complete 2026 product catalogue</p>
          </div>
        </div>

        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left info */}
              <div>
                <span className="section-label">Product Catalogue 2026</span>
                <h2 className="heading-lg mb-5">Unlock Our Complete Product Catalogue</h2>
                <p className="text-muted leading-relaxed mb-6">
                  Our 2026 product catalogue includes complete technical specifications, dimensions, material grades, coating options, and installation guidelines for all 15+ product series.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'Ceiling Diffusers — SAD, RAD series',
                    'Linear Slot Diffusers — SLSD, RLSD series',
                    'Supply & Return Air Grilles',
                    'Linear Bar Grilles — SLBR series',
                    'Louvers — Exhaust & Sand Trap',
                    'Dampers — VCD, NRD series',
                    'Technical specs & installation guides',
                    'Custom sizing & project consultation',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <FileText size={15} className="text-navy flex-shrink-0" />
                      <span className="text-dark text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80" alt="Catalogue" fill className="object-cover" />
                  <div className="absolute inset-0 bg-navy/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="font-heading font-extrabold text-2xl">ALUGRIDX</p>
                      <p className="text-white/70 text-sm">Product Catalogue 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="card p-8">
                {submitted ? (
                  <div className="text-center py-10">
                    <CheckCircle size={52} className="text-navy mx-auto mb-4" />
                    <h3 className="font-heading font-bold text-dark text-2xl mb-2">Request Submitted!</h3>
                    <p className="text-muted">We'll send the catalogue to your email within 24 hours.</p>
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                      <p className="text-navy text-sm font-semibold">For urgent requests: <a href="tel:+971585521251">+971 58 552 1251</a></p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-heading font-bold text-dark text-xl mb-6">Fill in Your Details</h3>
                    {[
                      { name: 'name', label: 'Full Name', placeholder: 'John Smith', required: true },
                      { name: 'company', label: 'Company Name', placeholder: 'Your Company LLC', required: false },
                      { name: 'email', label: 'Email Address', placeholder: 'john@company.com', required: true, type: 'email' },
                      { name: 'phone', label: 'Phone Number', placeholder: '+971 XX XXX XXXX', required: false },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="form-label">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                        <input
                          required={field.required}
                          type={field.type || 'text'}
                          name={field.name}
                          value={form[field.name]}
                          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                          placeholder={field.placeholder}
                          className="form-input"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="form-label">Requirements / Message</label>
                      <textarea
                        name="requirements"
                        value={form.requirements}
                        onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                        placeholder="Tell us about your project requirements..."
                        rows={4}
                        className="form-input resize-none"
                      />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                      {loading ? 'Submitting...' : <><Send size={15} /> Submit Request</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
