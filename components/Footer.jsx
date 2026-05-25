import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

const diffusers = [
  ['Ceiling Diffusers (SAD)',       '/products#ceiling-diffusers'],
  ['Round Diffusers (RAD)',         '/products#ceiling-diffusers'],
  ['Linear Slot Diffusers (SLSD)',  '/products#linear-diffusers'],
  ['Round Linear Slot (RLSD)',      '/products#linear-diffusers'],
];

const grilles = [
  ['Supply Air Grilles (SAG)',  '/products#supply-grilles'],
  ['Return Air Grilles (RAG)',  '/products#return-grilles'],
  ['Linear Bar Grilles (SLBR)', '/products#linear-bar'],
  ['Egg-Crate Return',          '/products#return-grilles'],
];

const louversDampers = [
  ['Louvers',                   '/products#louvers'],
  ['Sand-Trap Louvers',         '/products#louvers'],
  ['Volume Control Dampers',    '/products#dampers'],
  ['Non-Return Dampers',        '/products#non-return'],
];

const company = [
  ['About ALUGRIDX', '/about'],
  ['Projects',       '/projects'],
  ['FAQs',           '/faq'],
  ['Catalogue',      '/catalogue'],
  ['Contact',        '/contact'],
];

const standards = [
  'ASHRAE-aligned performance data',
  'EN 13182 / ISO 5135 airflow methodology',
  'RAL powder-coated finishes',
  '1-year product warranty',
];

function Column({ title, items }) {
  return (
    <div>
      <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-[0.22em] mb-5 pb-3 border-b border-white/10">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {items.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-[13px] text-white/55 hover:text-white transition-colors leading-relaxed"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Top CTA strip */}
      <div className="border-b border-white/10">
        <div className="container py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="font-heading font-semibold text-white text-lg md:text-xl">
              Planning an HVAC project? Let&apos;s talk specs.
            </p>
            <p className="text-white/55 text-sm mt-1">
              Sizing, submissions and quotations from Ajman, UAE.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Contact Sales <ArrowRight size={14} />
            </Link>
            <Link href="/catalogue" className="btn-white-outline">
              Request Catalogue
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Brand block — spans both cols on sm, 4/12 on lg */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center mb-5">
              <div className="relative w-[180px] h-[72px]">
                <Image
                  src="/images/logo white.png"
                  alt="ALUGRIDX"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-6">
              Premium HVAC air distribution manufacturer. Based in Ajman, UAE,
              serving the GCC with diffusers, grilles, louvers and dampers in
              aluminum.
            </p>

            <div className="space-y-3 text-sm">
              <a href="tel:+971585521251" className="flex items-center gap-3 text-white/65 hover:text-white transition-colors">
                <Phone size={14} className="text-accent flex-shrink-0" /> +971 58 552 1251
              </a>
              <a href="mailto:info@alugridx.com" className="flex items-center gap-3 text-white/65 hover:text-white transition-colors">
                <Mail size={14} className="text-accent flex-shrink-0" /> info@alugridx.com
              </a>
              <div className="flex items-start gap-3 text-white/65 leading-relaxed">
                <MapPin size={14} className="text-accent flex-shrink-0 mt-1" />
                <span>
                  Building 144, Warehouse 16, Humaideya Street,<br />
                  Al Jurf 3, Ajman, UAE
                </span>
              </div>
            </div>
          </div>

          {/* Product columns (grouped by category) */}
          <div className="lg:col-span-2">
            <Column title="Diffusers" items={diffusers} />
          </div>
          <div className="lg:col-span-2">
            <Column title="Grilles" items={grilles} />
          </div>
          <div className="lg:col-span-2">
            <Column title="Louvers & Dampers" items={louversDampers} />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <Column title="Company" items={company} />
          </div>
        </div>

        {/* Standards strip */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-accent flex-shrink-0" strokeWidth={1.8} />
              <span className="font-heading font-semibold text-white text-xs uppercase tracking-[0.22em]">
                Standards & Compliance
              </span>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/55">
              {standards.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} ALUGRIDX Air Conditioning Industry LLC. All rights reserved.</p>
          <p className="font-heading uppercase tracking-[0.25em]">
            ALUGRIDX — Air Distribution Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
