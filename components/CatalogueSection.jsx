'use client';
import { useState } from 'react';
import { Send, CheckCircle, FileText } from 'lucide-react';
import { useReveal } from '@/components/useReveal';
import { submitEnquiry } from '@/lib/api';

export default function CatalogueSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', requirements: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useReveal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitEnquiry({
        ...form,
        subject: 'Catalogue Request',
        message: form.requirements,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section bg-white border-t border-hairline">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">

          {/* Left — copy */}
          <div className="lg:col-span-5 reveal-left">
            <span className="section-label">Catalogue 2026</span>
            <h2 className="heading-lg">Request the full technical catalogue.</h2>
            <p className="text-slate mt-5 leading-relaxed mb-6">
              Complete submission tables, k-factors, throw and noise data,
              dimensional drawings and coating options across all 15+ product
              series.
            </p>
            <ul className="space-y-3">
              {[
                'All 15+ product series with dimensional drawings',
                'Submission tables and pressure-drop curves',
                'Throw and NC noise data',
                'Coating options and material grades',
                'Installation and maintenance guidance',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate">
                  <FileText size={14} className="text-accent flex-shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7 reveal-right">
            <div className="card-static p-6 md:p-8 bg-offwhite">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle size={48} className="text-accent mx-auto mb-4" strokeWidth={1.6} />
                  <h3 className="font-heading font-bold text-ink text-xl mb-2">Request received</h3>
                  <p className="text-muted text-sm">
                    We&apos;ll send the catalogue to your email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-ink text-lg">Send a request</h3>
                    <p className="text-muted text-xs mt-1">
                      All fields marked with * are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'name',    label: 'Name *',           required: true },
                      { name: 'company', label: 'Company',          required: false },
                      { name: 'email',   label: 'Email *',          required: true, type: 'email' },
                      { name: 'requirements', label: 'Requirements', required: false },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="form-label">{field.label}</label>
                        <input
                          required={field.required}
                          type={field.type || 'text'}
                          name={field.name}
                          value={form[field.name]}
                          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                          className="form-input"
                        />
                      </div>
                    ))}
                  </div>

                  {error && (
                    <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                    {loading ? 'Sending…' : <><Send size={14} /> Request Catalogue</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
