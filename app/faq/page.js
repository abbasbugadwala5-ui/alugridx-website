'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What materials are your products made of?', a: 'All ALUGRIDX products are manufactured using premium-grade aluminum — lightweight, durable, and corrosion-resistant. Finished with powder coating for long-lasting protection and a clean aesthetic.' },
  { q: 'Are your products compliant with international standards?', a: 'Yes. All our products are designed and manufactured to comply with ASHRAE standards and international HVAC performance requirements.' },
  { q: 'Do you provide customized solutions?', a: 'Absolutely. We offer custom sizes, custom powder-coat colors, and bespoke configurations to match your specific project requirements.' },
  { q: 'What is the delivery timeframe?', a: 'Standard products are typically delivered within 7–14 working days across UAE & GCC. Lead times for custom orders vary based on specifications and quantities.' },
  { q: 'Do you offer technical support?', a: 'Yes. Our team of engineers provides pre-sale consultation, technical specifications support, and post-sale installation guidance.' },
  { q: 'What warranty do you offer?', a: 'ALUGRIDX offers a 1-year warranty on all products, covering defects in materials and workmanship including aluminum gauge quality and powder coating durability.' },
  { q: 'Can you supply products for large-scale projects?', a: 'Yes. We have the manufacturing capacity to handle large-scale commercial, industrial, and infrastructure projects. Contact us to discuss volume pricing.' },
  { q: 'Do you distribute outside UAE?', a: 'Yes. We deliver across the GCC region including Saudi Arabia, Kuwait, Bahrain, Qatar, Oman, and beyond. Contact us for international shipping enquiries.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-navy py-12 relative">
          <div className="container">
            <div className="breadcrumb mb-3 text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">FAQs</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl">Frequently Asked Questions</h1>
            <p className="text-white/60 mt-2">Answers to the most common questions about ALUGRIDX</p>
          </div>
        </div>

        <section className="section section-light">
          <div className="container max-w-3xl">
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="card overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-heading font-bold text-dark text-sm md:text-base pr-4">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-navy flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div className={`faq-answer ${open === i ? 'open' : ''}`}>
                    <div className="px-5 pb-5 border-t border-border pt-4">
                      <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 card p-8 text-center">
              <h3 className="font-heading font-bold text-dark text-xl mb-2">Still Have Questions?</h3>
              <p className="text-muted text-sm mb-5">Our team is ready to help you with any enquiry.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary">Contact Us</Link>
                <a href="tel:+971585521251" className="btn-outline">Call +971 58 552 1251</a>
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
