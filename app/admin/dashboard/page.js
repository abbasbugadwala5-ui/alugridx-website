'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Package, FolderOpen, FileText, Eye } from 'lucide-react';
import { fetchStats } from '@/lib/api';

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="card p-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + '15' }}>
      <Icon size={22} style={{ color }} strokeWidth={1.8} />
    </div>
    <div>
      <p className="font-heading font-extrabold text-navy text-2xl leading-none">{value}</p>
      <p className="text-dark font-semibold text-sm mt-0.5">{label}</p>
      {sub && <p className="text-muted text-xs mt-0.5">{sub}</p>}
    </div>
  </div>
);

const statusColor = { new: '#f59e0b', read: '#3b82f6', replied: '#10b981', archived: '#6b7280' };
const statusBg = { new: '#fffbeb', read: '#eff6ff', replied: '#f0fdf4', archived: '#f9fafb' };

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    enquiries: 0,
    products: 0,
    projects: 0,
    blogs: 0,
    newEnquiries: 0,
    recent: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchStats();
        setStats(json.data || stats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-navy text-xl">Dashboard Overview</h2>
          <p className="text-muted text-sm">Welcome back, Admin. Here's what's happening.</p>
        </div>
        <p className="text-muted text-xs bg-white border border-border px-3 py-1.5 rounded-lg">
          {new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Mail} label="Total Enquiries" value={stats.enquiries} sub={`${stats.newEnquiries || 0} new`} color="#0D1B3E" />
        <StatCard icon={Package} label="Products Listed" value={stats.products} color="#1A2D5A" />
        <StatCard icon={FolderOpen} label="Projects Added" value={stats.projects} color="#243660" />
        <StatCard icon={FileText} label="Blog Posts" value={stats.blogs} color="#0D1B3E" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'View All Enquiries', href: '/admin/enquiries', icon: Mail, desc: 'Respond to leads & messages' },
          { label: 'Manage Products', href: '/admin/products', icon: Package, desc: 'Add or update product listings' },
          { label: 'Add Blog Post', href: '/admin/blog', icon: FileText, desc: 'Publish new articles' },
        ].map(({ label, href, icon: Icon, desc }) => (
          <Link key={href} href={href} className="card p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-transform">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#0D1B3E' }}>
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-navy text-sm">{label}</p>
              <p className="text-muted text-xs">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent enquiries */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-heading font-bold text-navy">Recent Enquiries</h3>
          <Link href="/admin/enquiries" className="text-xs font-semibold text-navy hover:underline flex items-center gap-1">
            View all <Eye size={12} />
          </Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-muted text-sm">Loading...</div>
        ) : (stats.recent || []).length === 0 ? (
          <div className="p-8 text-center text-muted text-sm">No enquiries yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {(stats.recent || []).map((enq) => (
              <div key={enq._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-white text-sm" style={{background:'#0D1B3E'}}>
                  {enq.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-dark text-sm truncate">{enq.name}</p>
                  <p className="text-muted text-xs truncate">{enq.email} · {enq.subject || 'General'}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize" style={{ color: statusColor[enq.status], background: statusBg[enq.status] }}>
                    {enq.status}
                  </span>
                  <span className="text-muted text-xs hidden md:block">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
