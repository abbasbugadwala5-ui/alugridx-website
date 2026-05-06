import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

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
    <footer style={{ background: '#0D1B3E' }} className="text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
<div>
 <Link href="/" className="flex items-center mb-2">
  <div className="relative w-[140px] h-[70px] sm:w-[170px] sm:h-[85px] flex-shrink-0">
    <Image
      src="/images/logo white.png"
      alt="ALUGRIDX"
      fill
      className="object-contain object-left"
    />
  </div>
</Link>

  <p className="text-xs leading-relaxed mb-5" style={{color:'rgba(255,255,255,0.5)'}}>
    Premium HVAC air distribution manufacturer. Based in Ajman, UAE. Serving UAE and GCC.
  </p>

  <div className="space-y-2 text-xs">
    <a href="tel:+971585521251" className="flex items-center gap-2 transition-colors" style={{color:'rgba(255,255,255,0.5)'}} >
      <Phone size={11} /> +971 58 552 1251
    </a>

    <a href="mailto:info@alugridx.com" className="flex items-center gap-2 transition-colors" style={{color:'rgba(255,255,255,0.5)'}} >
      <Mail size={11} /> info@alugridx.com
    </a>

    <div className="flex items-start gap-2" style={{color:'rgba(255,255,255,0.5)'}}>
      <MapPin size={11} className="mt-0.5 flex-shrink-0" />Building No-144, Warehouse No-16, Humaideya Street Al Jurf 3 Near Red Chilly Restaurant, Ajman
    </div>
  </div>
</div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-4 pb-2" style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}>Products</h4>
            <ul className="space-y-2">
              {products.map(([label, href]) => (
                <li key={label}><Link href={href} className="text-xs transition-colors hover:text-white" style={{color:'rgba(255,255,255,0.5)'}}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-4 pb-2" style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}>Company</h4>
            <ul className="space-y-2">
              {pages.map(([label, href]) => (
                <li key={label}><Link href={href} className="text-xs transition-colors hover:text-white" style={{color:'rgba(255,255,255,0.5)'}}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-4 pb-2" style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}>Get Catalogue</h4>
            <p className="text-xs leading-relaxed mb-4" style={{color:'rgba(255,255,255,0.5)'}}>
              Request our 2026 product catalogue with full technical specifications.
            </p>
            <Link href="/catalogue" className="btn-white text-xs py-2.5 px-5 w-full justify-center mb-5 block text-center">
              Request Catalogue
            </Link>
            <div className="grid grid-cols-2 gap-2">
              {[['10+','Yrs Exp'],['500+','Projects'],['15+','Products'],['1 Yr','Warranty']].map(([v,l])=>(
                <div key={l} className="rounded-lg py-2.5 text-center" style={{background:'rgba(255,255,255,0.06)'}}>
                  <p className="font-heading font-extrabold text-white text-sm">{v}</p>
                  <p className="text-[9px] mt-0.5" style={{color:'rgba(255,255,255,0.4)'}}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{borderTop:'1px solid rgba(255,255,255,0.08)'}}>
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{color:'rgba(255,255,255,0.3)'}}>
          <p>© 2026 ALUGRIDX Air Conditioning Industry LLC. All rights reserved.</p>
          <p className="font-heading font-bold tracking-widest text-[10px]">ALUGRIDX — AIR DISTRIBUTION SOLUTIONS</p>
        </div>
      </div>
    </footer>
  );
}
