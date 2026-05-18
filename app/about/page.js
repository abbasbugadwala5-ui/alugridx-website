import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import { Check, ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About Us — UAE HVAC Air Distribution Manufacturer',
  description:
    'ALUGRIDX Air Conditioning Industry LLC — Ajman-based HVAC manufacturer with 10+ years of regional expertise. Built on the 1986 legacy of Hashim Darwish Commission LLC.',
  path: '/about',
  keywords: [
    'about ALUGRIDX',
    'HVAC manufacturer Ajman',
    'air distribution company UAE',
    'Hashim Darwish Commission',
  ],
});

const values = [
  { title: 'Innovation',     desc: 'Continuously improving products, processes, and technologies to stay at the forefront of the HVAC industry.' },
  { title: 'Integrity',      desc: 'Upholding transparency, accountability, and ethical practices in every relationship and business conduct.' },
  { title: 'Teamwork',       desc: 'Combining expertise and experience across our teams to achieve operational excellence.' },
  { title: 'Customer Focus', desc: 'Staying aligned with client needs, delivering responsive service and tailored solutions at every step.' },
];

const stats = [
  { value: '10+',    label: 'Years of experience' },
  { value: '500+',   label: 'Projects completed' },
  { value: '15+',    label: 'Product series' },
  { value: '1 Year', label: 'Product warranty' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-navy py-10 sm:py-14 md:py-20 border-b border-white/5">
          <div className="container reveal">
            <div className="breadcrumb mb-3">
              <Link href="/">Home</Link><span>/</span><span className="text-white">About</span>
            </div>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">About ALUGRIDX</h1>
            <p className="text-white/65 mt-3 max-w-xl">Built on legacy. Driven by precision manufacturing.</p>
          </div>
        </div>

        {/* Story */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 reveal-left">
                <span className="section-label">Our story</span>
                <h2 className="heading-lg">ALUGRIDX Air Conditioning Industry LLC</h2>
                <p className="text-slate leading-relaxed mt-5 mb-4">
                  Founded in 2025 under the established business legacy of{' '}
                  <strong className="text-ink font-semibold">Hashim Darwish Commission LLC</strong> (established 1986),
                  ALUGRIDX brings nearly four decades of regional market experience to HVAC manufacturing.
                </p>
                <p className="text-slate leading-relaxed mb-4">
                  We specialise in manufacturing high-quality grilles, diffusers, louvers, dampers and complete
                  air distribution solutions for residential, commercial, industrial and infrastructure projects
                  across the UAE & GCC.
                </p>
                <p className="text-slate leading-relaxed mb-7">
                  Using premium-grade aluminum and tight tolerance manufacturing, every ALUGRIDX product is built
                  to deliver superior air distribution, indoor comfort and long-term performance.
                </p>
                <Link href="/products" className="btn-primary">View Products <ArrowRight size={14} /></Link>
              </div>
              <div className="lg:col-span-5 reveal-right">
                <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-hairline">
                  <Image src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80" alt="ALUGRIDX" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-tight bg-navy">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((s, i) => (
                <div key={s.label} className={`px-6 text-center text-white reveal delay-${Math.min(i + 1, 5)}`}>
                  <p className="font-heading font-bold text-3xl md:text-4xl tabular-nums tracking-tight">{s.value}</p>
                  <p className="text-white/55 text-xs md:text-sm mt-2 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section section-light">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-static p-8 md:p-10 reveal delay-1">
                <span className="section-label">Mission</span>
                <h3 className="heading-md mb-4">Our mission</h3>
                <p className="text-slate leading-relaxed">
                  To be a leading manufacturer of innovative, high-quality grilles and diffusers for HVAC systems.
                  We are committed to developing products that enhance indoor air comfort, improve energy efficiency,
                  and contribute to the well-being of people and the environment.
                </p>
              </div>
              <div className="card-static p-8 md:p-10 reveal delay-2">
                <span className="section-label">Vision</span>
                <h3 className="heading-md mb-4">Our vision</h3>
                <p className="text-slate leading-relaxed">
                  To become the preferred choice for HVAC air management solutions in the GCC — recognised for
                  excellence in quality, innovation and customer service, setting new industry benchmarks in
                  performance and sustainability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-2xl mb-12 reveal">
              <span className="section-label">Core values</span>
              <h2 className="heading-lg">What drives us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {values.map((v, i) => (
                <div key={v.title} className={`card p-6 md:p-7 reveal delay-${Math.min(i + 1, 5)}`}>
                  <div className="font-heading font-bold text-2xl text-accent leading-none mb-5 tabular-nums">
                    0{i + 1}
                  </div>
                  <h3 className="font-heading font-semibold text-ink text-base mb-2">{v.title}</h3>
                  <p className="text-muted text-[13px] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality policy */}
        <section className="section section-light">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 reveal-left">
                <span className="section-label">Quality policy</span>
                <h2 className="heading-lg">Built into the manufacturing process.</h2>
                <p className="text-slate leading-relaxed mt-5 mb-6">
                  Quality is the cornerstone of our business. ALUGRIDX runs a structured Quality Management System
                  that supports continuous improvement and operational excellence.
                </p>
                <ul className="space-y-3">
                  {[
                    'Regular collection and evaluation of customer feedback',
                    'Strict corrective and preventive action procedures',
                    'Careful supplier selection and performance monitoring',
                    'Continuous employee training and development',
                    'Routine internal quality audits',
                    'Clearly defined and measurable quality objectives',
                    'Management review of audits, feedback, and complaints',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate">
                      <Check size={14} className="text-accent flex-shrink-0 mt-1" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5 reveal-right">
                <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-hairline">
                  <Image src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80" alt="Quality" fill className="object-cover" />
                </div>
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
