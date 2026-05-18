'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Ceiling Diffusers', href: '/products#ceiling-diffusers' },
      { label: 'Linear Slot Diffusers', href: '/products#linear-diffusers' },
      { label: 'Supply Air Grilles', href: '/products#supply-grilles' },
      { label: 'Return Air Grilles', href: '/products#return-grilles' },
      { label: 'Linear Bar Grilles', href: '/products#linear-bar' },
      { label: 'Louvers', href: '/products#louvers' },
      { label: 'Volume Control Dampers', href: '/products#dampers' },
      { label: 'Non Return Dampers', href: '/products#non-return' },
    ],
  },
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {/* Top contact bar — lg+ only */}
      <div className="hidden lg:block bg-navy text-white text-[11px]">
        <div className="container flex items-center justify-between h-8">
          <div className="flex items-center gap-6">
            <a
              href="tel:+971585521251"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone size={11} /> +971 58 552 1251
            </a>
            <a
              href="mailto:info@alugridx.com"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail size={11} /> info@alugridx.com
            </a>
          </div>
          <span className="opacity-70">Building No.144, Al Jurf 3, Ajman, UAE</span>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 bg-white border-b border-hairline transition-shadow duration-300 ${
          scrolled ? 'shadow-hover' : ''
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* Logo — image only, large within compact header */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative w-[200px] h-[120px] sm:w-[230px] sm:h-[140px] lg:w-[260px] lg:h-[150px] -my-6 lg:-my-8">
                <Image
                  src="/images/logo.png"
                  alt="ALUGRIDX"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setDropdown(item.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`nav-link nav-link-light px-3 py-2 flex items-center gap-1 ${
                      isActive(item.href) ? 'active' : ''
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          dropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {item.children && dropdown === item.label && (
                    <div className="absolute top-full left-0 w-64 bg-white border border-hairline rounded-md shadow-hover py-2 animate-fade-in z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2.5 text-[13px] text-slate hover:bg-offwhite hover:text-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/catalogue"
                className="hidden lg:inline-flex btn-primary text-xs py-2.5 px-5"
              >
                Request Catalogue
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-11 h-11 rounded-md flex items-center justify-center text-ink hover:bg-offwhite border border-hairline transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-white lg:hidden pt-16 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container py-4 h-full overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-hairline">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    className="w-full flex items-center justify-between py-4 font-heading font-semibold text-ink text-sm"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        mobileExpanded === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="pb-4 pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-muted hover:text-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block py-4 font-heading font-semibold text-ink text-sm hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="pt-6 pb-10 space-y-3">
            <Link href="/catalogue" className="btn-primary w-full justify-center">
              Request Catalogue
            </Link>
            <a href="tel:+971585521251" className="btn-secondary w-full justify-center">
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
