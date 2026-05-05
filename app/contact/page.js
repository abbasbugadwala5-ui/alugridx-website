'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Phone', lines: ['+971 58 552 1251', '+971 58 552 1253'], href: 'tel:+971585521251' },
  { icon: Mail, label: 'Email', lines: ['info@alugridx.com'], href: 'mailto:info@alugridx.com' },
  { icon: MapPin, label: 'Address', lines: ['Building No.144, Warehouse No.16', 'Al Jurf 3, Behind China Mall', 'Ajman, UAE'], href: null },
  { icon: Clock, label: 'Hours', lines: ['Sat – Thu: 8:00 AM – 6:00 PM', 'Friday: Closed'], href: null },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/enquiry`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
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
              <span className="text-white">Contact Us</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl">Contact Us</h1>
            <p className="text-white/60 mt-2">We're here to help with your HVAC requirements</p>
          </div>
        </div>

        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Contact info */}
              <div className="space-y-5">
                <h2 className="heading-md mb-6">Get in Touch</h2>
                {contactInfo.map(({ icon: Icon, label, lines, href }) => (
                  <div key={label} className="card p-5 flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-navy" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{label}</p>
                      {lines.map((line) =>
                        href ? (
                          <a key={line} href={href} className="block text-muted text-sm hover:text-navy transition-colors">{line}</a>
                        ) : (
                          <p key={line} className="text-muted text-sm">{line}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <div className="card p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle size={52} className="text-navy mx-auto mb-4" />
                      <h3 className="font-heading font-bold text-dark text-2xl mb-2">Message Sent!</h3>
                      <p className="text-muted">Our team will respond within 1 business day.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="font-heading font-bold text-dark text-xl mb-2">Send a Message</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                          { name: 'name', label: 'Full Name', placeholder: 'John Smith', required: true },
                          { name: 'email', label: 'Email', placeholder: 'john@company.com', required: true, type: 'email' },
                          { name: 'phone', label: 'Phone', placeholder: '+971 XX XXX XXXX' },
                          { name: 'company', label: 'Company', placeholder: 'Your Company LLC' },
                        ].map((f) => (
                          <div key={f.name}>
                            <label className="form-label">{f.label} {f.required && <span className="text-red-500">*</span>}</label>
                            <input required={f.required} type={f.type || 'text'} name={f.name} value={form[f.name]}
                              onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                              placeholder={f.placeholder} className="form-input" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="form-label">Subject</label>
                        <select name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="form-input">
                          <option value="">Select a subject...</option>
                          <option>Product Enquiry</option>
                          <option>Quote Request</option>
                          <option>Technical Specifications</option>
                          <option>Catalogue Request</option>
                          <option>Partnership</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Message <span className="text-red-500">*</span></label>
                        <textarea required name="message" value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Describe your project requirements..." rows={5} className="form-input resize-none" />
                      </div>
                      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                        {loading ? 'Sending...' : <><Send size={15} /> Send Message</>}
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
