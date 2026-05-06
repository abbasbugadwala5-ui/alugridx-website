'use client';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useReveal } from '@/components/useReveal';

export default function CatalogueSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', requirements: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  useReveal();

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
    
    <section style={{background:"#0D1B3E"}} className="section diagonal-accent">
      <div className="container">
        <div className="text-center mb-8 reveal">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-semibold uppercase tracking-widest mb-3 font-heading">
            <span className="w-6 h-0.5 bg-white/50" /> Get Catalogue Access
          </span>
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl">
            Submit Your Requirements to Unlock<br className="hidden md:block" /> Our Complete Product Catalogue
          </h2>
        </div>

        {submitted ? (
          <div className="max-w-md mx-auto text-center bg-white/10 rounded-xl p-10 backdrop-blur">
            <CheckCircle size={48} className="text-white mx-auto mb-4" />
            <h3 className="font-heading font-bold text-white text-xl mb-2">Request Received!</h3>
            <p className="text-white/80 text-sm">We'll send the catalogue to your email within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              {[
                { name: 'name', placeholder: 'Your Name', required: true },
                { name: 'company', placeholder: 'Company Name', required: false },
                { name: 'email', placeholder: 'Email Address', required: true, type: 'email' },
                { name: 'requirements', placeholder: 'Requirements', required: false },
              ].map((field) => (
                <input
                  key={field.name}
                  required={field.required}
                  type={field.type || 'text'}
                  name={field.name}
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3.5 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white focus:bg-white/20 transition-all"
                />
              ))}
            </div>
            <div className="text-center mt-5">
              <button type="submit" disabled={loading} className="btn-white px-10 py-3.5">
                {loading ? 'Sending...' : <><Send size={14} /> Submit Request</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
