'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

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
  { label: 'About', href: '/about' },
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
  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const headerBase = 'fixed top-0 inset-x-0 z-50 transition-colors duration-300';
  // On hero: frosted-navy backdrop so white nav text always reads.
  // Off hero: solid white + hairline border.
  const headerStyles = transparent
    ? 'bg-navy/80 backdrop-blur-md border-b border-white/10'
    : 'bg-white border-b border-hairline shadow-[0_1px_0_rgba(13,27,62,0.03)]';

  const linkClass = transparent ? 'nav-link-dark' : 'nav-link-light';

  return (
    <>
      <header className={`${headerBase} ${headerStyles}`}>
        <div className="container">
          <div className="flex items-center justify-between h-[80px] md:h-[96px] lg:h-[112px]">

            {/* Logo — bigger, consistent across all states */}
            <Link href="/" className="flex items-center flex-shrink-0 mr-3 lg:mr-8">
              <div className="relative w-[170px] h-[60px] sm:w-[200px] sm:h-[72px] md:w-[230px] md:h-[82px] lg:w-[260px] lg:h-[94px]">
                <Image
                  src={transparent ? '/images/logo white.png' : '/images/logo.png'}
                  alt="ALUGRIDX"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => item.children && setDropdown(item.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`nav-link ${linkClass} px-3 py-2 flex items-center gap-1 ${active ? 'active' : ''}`}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${dropdown === item.label ? 'rotate-180' : ''}`}
                        />
                      )}
                    </Link>

                    {item.children && dropdown === item.label && (
                      <div className="absolute top-full left-0 w-64 bg-white border border-hairline rounded-md py-2 mt-2 z-50 overflow-hidden shadow-hover">
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
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="/catalogue"
                className="hidden lg:inline-flex btn-primary text-xs py-2.5 px-5"
              >
                Request Catalogue
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden w-11 h-11 rounded-md flex items-center justify-center transition-colors ${
                  transparent
                    ? 'text-white hover:bg-white/15 border border-white/25'
                    : 'text-ink hover:bg-offwhite border border-hairline'
                }`}
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer so content does not slide under the fixed header on non-home pages. */}
      {!isHome && <div className="h-[80px] md:h-[96px] lg:h-[112px]" aria-hidden="true" />}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 lg:hidden pt-[80px] md:pt-[96px] ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container py-4 h-full overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-hairline">
              {item.children ? (
                <>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between py-4 font-heading font-semibold text-ink text-sm"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
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

          <div className="pt-6 pb-10">
            <Link href="/catalogue" className="btn-primary w-full justify-center">
              Request Catalogue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
