  'use client';
  import { useState, useEffect } from 'react';
  import Link from 'next/link';
  import Image from 'next/image';
  import { usePathname } from 'next/navigation';
  import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';

  const navItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Products', href: '/products',
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
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); setDropdown(null); }, [pathname]);
    useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; }, [mobileOpen]);

    return (
      <>
        {/* Top bar
        <div className="top-bar hidden lg:block">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="tel:+971585521251" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                <Phone size={11} /> +971 58 552 1251
              </a>
              <a href="mailto:info@alugridx.com" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                <Mail size={11} /> info@alugridx.com
              </a>
            </div>
            <span className="opacity-60">Building No.144, Al Jurf 3, Ajman, UAE</span>
          </div>
        </div> */}

        {/* Main header */}
        <header className={`sticky top-3 z-50 bg-white border-b border-border transition-shadow duration-300 ${scrolled ? 'header-scrolled' : ''}`}>
          <div className="container">
            <div className="flex items-center justify-between h-16 lg:h-18">

              {/* Logo */}
              <Link href="/" className="flex items-center 2 flex-shrink-0">
                <div className="relative w-20 h-20">
                  <Image src="/images/logo.png" alt="ALUGRIDX" fill className="object-contain" priority />
                </div>
                <div>
                  <p className="font-heading font-bold text-navy text-lg leading-none tracking-wide">ALUGRIDX</p>
                  <p className="text-[5px] text-muted tracking-widest uppercase">Air Distribution Solutions</p>
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
                      className={`nav-link px-3 py-2 flex items-center gap-1 ${pathname === item.href ? 'active' : ''}`}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={13} className={`transition-transform duration-200 ${dropdown === item.label ? 'rotate-180' : ''}`} />}
                    </Link>

                    {/* Dropdown */}
                    {item.children && dropdown === item.label && (
                      <div className="absolute top-full left-0 w-56 bg-white border border-border rounded-lg shadow-xl py-2 z-50 animate-fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-dark hover:bg-gray-100 hover:text-navy transition-colors font-body"
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
                <Link href="/catalogue" className="hidden lg:flex btn-primary text-sm py-2.5 px-5">
                  Request Catalogue
                </Link>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden p-2 text-dark hover:text-navy transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-white overflow-y-auto pt-20">
            <div className="container py-4">
              {navItems.map((item) => (
                <div key={item.href} className="border-b border-border">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-4 font-heading font-semibold text-dark"
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="pb-3 pl-4 space-y-1">
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href} className="block py-2 text-sm text-muted hover:text-navy">
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="block py-4 font-heading font-semibold text-dark hover:text-navy">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-6 space-y-3">
                <Link href="/catalogue" className="btn-primary w-full justify-center">Request Catalogue</Link>
                <a href="tel:+971585521251" className="btn-outline w-full justify-center">Call Us Now</a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
