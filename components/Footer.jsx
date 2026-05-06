import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const products = [
  ['Ceiling Diffusers', '/products#ceiling-diffusers'],
  ['Linear Slot Diffusers', '/products#linear-diffusers'],
  ['Supply Air Grilles', '/products#supply-grilles'],
  ['Return Air Grilles', '/products#return-grilles'],
  ['Louvers', '/products#louvers'],
  ['Volume Control Dampers', '/products#dampers'],
  ['Non Return Dampers', '/products#non-return'],
];

const pages = [
  ['About Us', '/about'],
  ['Products', '/products'],
  ['Projects', '/projects'],
  ['Catalogue', '/catalogue'],
  ['Blog / News', '/blog'],
  ['FAQs', '/faq'],
  ['Contact Us', '/contact'],
];

export default function Footer() {
  return (
    <footer
      style={{ background: '#0D1B3E' }}
      className="text-white relative overflow-hidden"
    >

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container py-16 sm:py-20">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center mb-4"
            >
              <div className="relative w-[175px] h-[85px] sm:w-[210px] sm:h-[100px] flex-shrink-0">

                <Image
                  src="/images/logo white.png"
                  alt="ALUGRIDX"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Premium HVAC air distribution manufacturer.
              Based in Ajman, UAE. Serving UAE and GCC
              with high quality aluminum solutions.
            </p>

            {/* Contact */}
            <div className="space-y-3 text-sm">

              <a
                href="tel:+971585521251"
                className="flex items-center gap-3 transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Phone size={14} />

                +971 58 552 1251
              </a>

              <a
                href="mailto:info@alugridx.com"
                className="flex items-center gap-3 transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Mail size={14} />

                info@alugridx.com
              </a>

              <div
                className="flex items-start gap-3 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <MapPin
                  size={14}
                  className="mt-1 flex-shrink-0"
                />

                <span>
                  Building No-144, Warehouse No-16,
                  Humaideya Street Al Jurf 3 Near Red
                  Chilly Restaurant, Ajman
                </span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>

            <h4
              className="font-heading font-bold text-white text-sm uppercase tracking-[0.22em] mb-5 pb-3"
              style={{
                borderBottom:
                  '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Products
            </h4>

            <ul className="space-y-3">

              {products.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Company */}
          <div>

            <h4
              className="font-heading font-bold text-white text-sm uppercase tracking-[0.22em] mb-5 pb-3"
              style={{
                borderBottom:
                  '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Company
            </h4>

            <ul className="space-y-3">

              {pages.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* CTA */}
          <div>

            <h4
              className="font-heading font-bold text-white text-sm uppercase tracking-[0.22em] mb-5 pb-3"
              style={{
                borderBottom:
                  '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Get Catalogue
            </h4>

            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Request our 2026 product catalogue with
              complete technical specifications and
              detailed product information.
            </p>

            {/* Button */}
            <Link
              href="/catalogue"
              className="btn-white text-sm py-3 px-5 w-full justify-center mb-6"
            >
              Request Catalogue
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">

              {[
                ['10+', 'Yrs Exp'],
                ['500+', 'Projects'],
                ['15+', 'Products'],
                ['1 Yr', 'Warranty'],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-xl py-4 text-center border border-white/5"
                  style={{
                    background:
                      'rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="font-heading font-extrabold text-white text-lg">
                    {v}
                  </p>

                  <p
                    className="text-[10px] mt-1 uppercase tracking-widest"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {l}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          borderTop:
            '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="container py-5 flex flex-col lg:flex-row items-center justify-between gap-3 text-center lg:text-left text-xs"
          style={{
            color: 'rgba(255,255,255,0.35)',
          }}
        >

          <p>
            © 2026 ALUGRIDX Air Conditioning
            Industry LLC. All rights reserved.
          </p>

          <p className="font-heading font-bold tracking-[0.25em] text-[10px] uppercase">
            ALUGRIDX — AIR DISTRIBUTION SOLUTIONS
          </p>
        </div>
      </div>
    </footer>
  );
}