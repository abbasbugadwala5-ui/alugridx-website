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
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-all duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        {/* Container */}
        <div className="container max-w-[100%] pl-1 pr-3 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-[82px] sm:h-[92px] lg:h-[105px]">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 mr-0 lg:mr-10"
            >
              <div className="relative w-[175px] h-[82px] sm:w-[220px] sm:h-[110px] lg:w-[285px] lg:h-[145px]">
                <Image
                  src="/images/logo.png"
                  alt="ALUGRIDX logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setDropdown(item.label)
                  }
                  onMouseLeave={() => setDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`nav-link px-3 py-2 flex items-center gap-1 ${
                      pathname === item.href ? 'active' : ''
                    }`}
                  >
                    {item.label}

                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          dropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && dropdown === item.label && (
                    <div className="absolute top-full left-0 w-60 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-3 text-sm text-dark hover:bg-gray-50 hover:text-navy transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <Link
                href="/catalogue"
                className="hidden lg:inline-flex btn-primary text-xs py-2.5 px-5"
              >
                Request Catalogue
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-dark hover:bg-gray-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-300 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          paddingTop: '82px',
        }}
      >
        <div className="container py-4 h-full overflow-y-auto">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="border-b border-gray-100"
            >
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.label
                          ? null
                          : item.label
                      )
                    }
                    className="w-full flex items-center justify-between py-4 font-heading font-bold text-dark text-sm"
                  >
                    {item.label}

                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        mobileExpanded === item.label
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  {mobileExpanded === item.label && (
                    <div className="pb-4 pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-muted hover:text-navy transition-colors"
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
                  className="block py-4 font-heading font-bold text-dark text-sm hover:text-navy transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="pt-6 pb-10">
            <Link
              href="/catalogue"
              className="btn-primary w-full justify-center"
            >
              Request Catalogue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}