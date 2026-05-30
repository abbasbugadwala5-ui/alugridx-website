'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { submitEnquiry } from '@/lib/api';

const contactInfo = [
  { icon: Phone,  label: 'Phone',   lines: ['+971 58 552 1251'],                     href: 'tel:+971585521251' },
  { icon: Mail,   label: 'Email',   lines: ['info@alugridx.com'],                     href: 'mailto:info@alugridx.com' },
  { icon: MapPin, label: 'Address', lines: ['Building 144, Warehouse 16', 'Al Jurf 3, Behind China Mall', 'Ajman, UAE'], href: null },
  { icon: Clock,  label: 'Hours',   lines: ['Sat – Thu: 8:00 AM – 6:00 PM', 'Friday: Closed'], href: null },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitEnquiry(form);
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
              <Link href="/">Home</Link><span>/</span><span className="text-white">Contact</span>
            </div>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">Contact Us</h1>
            <p className="text-white/65 mt-3 max-w-xl">We&apos;re here to help with your HVAC requirements.</p>
          </div>
        </div>

        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">

              {/* Contact info column */}
              <div className="lg:col-span-4 space-y-4 reveal-left">
                <h2 className="heading-md mb-2">Get in touch</h2>
                <p className="text-muted text-sm mb-6 leading-relaxed">
                  Sales, technical and post-sale enquiries — typically replied to within one business day.
                </p>
                {contactInfo.map(({ icon: Icon, label, lines, href }, i) => (
                  <div key={label} className={`card-static p-5 flex items-start gap-4 reveal delay-${Math.min(i + 1, 5)}`}>
                    <div className="w-10 h-10 rounded-md bg-offwhite border border-hairline flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-accent" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-ink text-xs uppercase tracking-wider mb-1">{label}</p>
                      {lines.map((line) =>
                        href ? (
                          <a key={line} href={href} className="block text-slate text-sm hover:text-accent transition-colors break-words">{line}</a>
                        ) : (
                          <p key={line} className="text-slate text-sm break-words">{line}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="lg:col-span-8 reveal-right">
                <div className="card-static p-5 sm:p-6 md:p-10 bg-offwhite">
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle size={48} className="text-accent mx-auto mb-4" strokeWidth={1.6} />
                      <h3 className="font-heading font-bold text-ink text-2xl mb-2">Message sent</h3>
                      <p className="text-muted">Our team will respond within 1 business day.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <h3 className="font-heading font-bold text-ink text-xl">Send a message</h3>
                        <p className="text-muted text-xs mt-1">All fields marked with * are required.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {[
                          { name: 'name',    label: 'Full Name *', required: true,  autoComplete: 'name' },
                          { name: 'email',   label: 'Email *',     required: true,  type: 'email', autoComplete: 'email', inputMode: 'email' },
                          { name: 'phone',   label: 'Phone',       required: false, type: 'tel',   autoComplete: 'tel',   inputMode: 'tel' },
                          { name: 'company', label: 'Company',     required: false, autoComplete: 'organization' },
                        ].map((f) => (
                          <div key={f.name}>
                            <label className="form-label" htmlFor={`f-${f.name}`}>{f.label}</label>
                            <input
                              id={`f-${f.name}`}
                              required={f.required}
                              type={f.type || 'text'}
                              name={f.name}
                              value={form[f.name]}
                              autoComplete={f.autoComplete}
                              inputMode={f.inputMode}
                              onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                              className="form-input"
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="form-label" htmlFor="f-subject">Subject</label>
                        <select id="f-subject" name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="form-input">
                          <option value="">Select a subject…</option>
                          <option>Product Enquiry</option>
                          <option>Quote Request</option>
                          <option>Technical Specifications</option>
                          <option>Catalogue Request</option>
                          <option>Partnership</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label" htmlFor="f-message">Message *</label>
                        <textarea
                          id="f-message"
                          required
                          name="message"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Describe your project requirements…"
                          rows={5}
                          className="form-input resize-none"
                        />
                      </div>
                      {error && (
                        <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
                      )}
                      <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                        {loading ? 'Sending…' : <><Send size={14} /> Send Message</>}
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
