import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us — ALUGRIDX Air Distribution UAE',
  description: 'Learn about ALUGRIDX — UAE-based HVAC manufacturer with 10+ years of expertise in air distribution solutions.',
};

const values = [
  { title: 'Innovation', desc: 'Continuously improving products, processes, and technologies to stay at the forefront of the HVAC industry.' },
  { title: 'Integrity', desc: 'Upholding transparency, accountability, and ethical practices in every relationship and business conduct.' },
  { title: 'Teamwork', desc: 'Combining expertise and experience across our teams to achieve operational excellence.' },
  { title: 'Customer Focus', desc: 'Staying aligned with client needs, delivering responsive service and tailored solutions at every step.' },
];

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '15+', label: 'Product Series' },
  { value: '1 Year', label: 'Product Warranty' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-navy py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=60" alt="" fill className="object-cover" />
          </div>
          <div className="container relative">
            <div className="breadcrumb mb-3 text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl">About ALUGRIDX</h1>
            <p className="text-white/60 mt-3 max-w-xl">Built on legacy. Driven by innovation.</p>
          </div>
        </div>

        {/* About content */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="section-label">Our Story</span>
                <h2 className="heading-lg mb-5">ALUGRIDX Air Conditioning Industry LLC</h2>
                <p className="text-muted leading-relaxed mb-4">
                  Founded in 2025 under the established business legacy of <strong className="text-dark">Hashim Darwish Commission LLC</strong> (established in 1986), ALUGRIDX brings nearly four decades of market experience, trust, and expertise to the HVAC manufacturing industry.
                </p>
                <p className="text-muted leading-relaxed mb-4">
                  We specialize in manufacturing high-quality grilles, diffusers, louvers, dampers, and complete air distribution solutions for residential, commercial, industrial, and infrastructure projects across UAE & GCC.
                </p>
                <p className="text-muted leading-relaxed mb-7">
                  Using advanced manufacturing technologies and premium-grade aluminum materials, every ALUGRIDX product is designed to deliver superior air distribution, enhanced indoor comfort, and long-lasting performance.
                </p>
                <Link href="/products" className="btn-primary">View Our Products <ArrowRight size={15} /></Link>
              </div>
              <div className="relative">
                <div className="relative h-[420px] rounded-xl overflow-hidden shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80" alt="ALUGRIDX" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-navy text-white rounded-xl p-5 shadow-md w-44">
                  <p className="font-heading font-extrabold text-3xl">2025</p>
                  <p className="text-white/80 text-xs mt-0.5">Founded</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-blue py-14">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-heading font-extrabold text-4xl md:text-5xl mb-1">{s.value}</p>
                  <p className="text-white/70 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section section-light">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-8 border-t-4 border-navy">
                <span className="section-label">Mission</span>
                <h3 className="heading-md mb-4">Our Mission</h3>
                <p className="text-muted leading-relaxed">
                  To be a leading manufacturer of innovative, high-quality Grilles & Diffusers for HVAC systems. We are committed to developing products that enhance indoor air comfort, improve energy efficiency, and contribute to the well-being of people and the environment. Through continuous research, technological advancement, and strategic collaboration, we strive to deliver exceptional air distribution solutions that exceed customer expectations.
                </p>
              </div>
              <div className="card p-8 border-t-4 border-navy">
                <span className="section-label">Vision</span>
                <h3 className="heading-md mb-4">Our Vision</h3>
                <p className="text-muted leading-relaxed">
                  To become the preferred choice for HVAC air management solutions, recognized for excellence in quality, innovation, and customer service. ALUGRIDX aims to set new industry benchmarks in performance and sustainability, creating healthier and more efficient indoor environments worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <span className="section-label justify-center">Core Values</span>
              <h2 className="heading-lg">What Drives Us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={v.title} className="card p-6 text-center hover:-translate-y-1 transition-transform">
                  <div className="font-heading font-extrabold text-5xl text-navy-light mb-4 leading-none">0{i + 1}</div>
                  <h3 className="font-heading font-bold text-dark text-lg mb-3">{v.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Policy */}
        <section className="section section-light">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="section-label">Quality</span>
                <h2 className="heading-lg mb-5">Quality Policy</h2>
                <p className="text-muted leading-relaxed mb-5">
                  Quality is the cornerstone of our business. ALUGRIDX has implemented a structured Quality Management System supporting continuous improvement and operational excellence.
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
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckCircle size={15} className="text-navy flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[380px] rounded-xl overflow-hidden shadow-xl">
                <Image src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80" alt="Quality" fill className="object-cover" />
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
