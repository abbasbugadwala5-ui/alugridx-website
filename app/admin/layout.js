'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard, Mail, Package, FolderOpen,
  FileText, HelpCircle, LogOut, ChevronRight, X, Bell
} from 'lucide-react';
import { auth, logout as logoutApi } from '@/lib/api';

const navItems = [
  { label: 'Dashboard',  href: '/admin/dashboard',  icon: LayoutDashboard },
  { label: 'Enquiries',  href: '/admin/enquiries',  icon: Mail },
  { label: 'Products',   href: '/admin/products',   icon: Package },
  { label: 'Projects',   href: '/admin/projects',   icon: FolderOpen },
  { label: 'Blog Posts', href: '/admin/blog',       icon: FileText },
  { label: 'FAQs',       href: '/admin/faq',        icon: HelpCircle },
];

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      setAuthed(true);
    } else if (pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
    setChecking(false);
  }, [pathname, router]);

  const handleLogout = () => {
    logoutApi();
    setAuthed(false);
    router.push('/admin/login');
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (pathname === '/admin/login') return <>{children}</>;
  if (!authed) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`admin-sidebar flex-shrink-0 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="relative w-7 h-7 flex-shrink-0">
            <Image src="/images/logo.png" alt="ALUGRIDX" fill className="object-contain brightness-200" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-heading font-bold text-white text-sm leading-none">ALUGRIDX</p>
              <p className="text-white/40 text-[9px] tracking-widest">Admin Panel</p>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-white/40 hover:text-white transition-colors">
            {collapsed ? <ChevronRight size={16} /> : <X size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`admin-nav-item ${pathname.startsWith(href) ? 'active' : ''}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-white/10">
          <button onClick={handleLogout} className="admin-nav-item w-full" title={collapsed ? 'Logout' : undefined}>
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="font-heading font-bold text-navy text-lg">
              {navItems.find(n => pathname.startsWith(n.href))?.label || 'Admin'}
            </h1>
            <p className="text-muted text-xs">ALUGRIDX Admin Panel</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted hover:text-navy transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link href="/" target="_blank" className="text-xs text-muted hover:text-navy border border-border px-3 py-1.5 rounded-lg transition-colors">
              View Site ↗
            </Link>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-heading" style={{background:'#0D1B3E'}}>
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
