'use client';
import { useState, useEffect } from 'react';
import { Search, Filter, Mail, Eye, Trash2, RefreshCw } from 'lucide-react';

const STATUS_COLORS = { new: '#f59e0b', read: '#3b82f6', replied: '#10b981', archived: '#6b7280' };
const STATUS_BG    = { new: '#fffbeb', read: '#eff6ff', replied: '#f0fdf4', archived: '#f9fafb' };

const mock = [
  { _id: '1', name: 'Ahmed Al Rashid', email: 'ahmed@company.ae', company: 'Al Rashid Construction', phone: '+971501234567', subject: 'Quote Request', message: 'We need ceiling diffusers for a 5-floor commercial building in Dubai. Please share pricing.', status: 'new', createdAt: new Date().toISOString() },
  { _id: '2', name: 'Sara Khan', email: 'sara@hvac.com', company: 'Gulf HVAC Solutions', phone: '+971509876543', subject: 'Catalogue Request', message: 'Please send the complete 2026 product catalogue.', status: 'read', createdAt: new Date(Date.now()-86400000).toISOString() },
  { _id: '3', name: 'Mohammed Ali', email: 'mali@builders.ae', company: 'Emirates Builders', phone: '', subject: 'Product Enquiry', message: 'Do you supply sand trap louvers for a project in Sharjah?', status: 'replied', createdAt: new Date(Date.now()-172800000).toISOString() },
  { _id: '4', name: 'Fatima Zahra', email: 'fz@arch.ae', company: 'FZ Architecture', phone: '+971556789012', subject: 'Technical Specifications', message: 'We need technical data sheets for linear slot diffusers for an airport project.', status: 'new', createdAt: new Date(Date.now()-259200000).toISOString() },
  { _id: '5', name: 'John Smith', email: 'jsmith@global.com', company: 'Global Engineering', phone: '+971501112233', subject: 'Partnership', message: 'Interested in becoming a distributor for ALUGRIDX in Oman.', status: 'archived', createdAt: new Date(Date.now()-432000000).toISOString() },
];

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/enquiry?limit=50`);
      const d = await r.json();
      setEnquiries(d.success && d.data.length ? d.data : mock);
    } catch { setEnquiries(mock); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = enquiries.filter(e => {
    const matchSearch = !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.email?.toLowerCase().includes(search.toLowerCase()) || e.subject?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || e.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = { all: enquiries.length, new: enquiries.filter(e=>e.status==='new').length, read: enquiries.filter(e=>e.status==='read').length, replied: enquiries.filter(e=>e.status==='replied').length };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-navy text-xl">Enquiries</h2>
          <p className="text-muted text-sm">{counts.new} new, {enquiries.length} total</p>
        </div>
        <button onClick={load} className="btn-outline text-sm py-2 px-4 flex items-center gap-2 self-start">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {['all','new','read','replied','archived'].map(s => (
          <button key={s} onClick={()=>setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all font-heading ${filter===s ? 'text-white' : 'bg-white border border-border text-muted hover:text-navy'}`}
            style={filter===s ? {background:'#0D1B3E'} : {}}
          >
            {s} {s!=='archived' && counts[s] !== undefined ? `(${counts[s]})` : ''}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="Search by name, email, or subject..."
          className="form-input pl-10 w-full max-w-md"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted">Loading enquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted">No enquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  {['Name','Email','Subject','Status','Date','Action'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider font-heading">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((enq) => (
                  <tr key={enq._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold font-heading flex-shrink-0" style={{background:'#0D1B3E'}}>
                          {enq.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-dark text-xs">{enq.name}</p>
                          {enq.company && <p className="text-muted text-[10px]">{enq.company}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted text-xs">{enq.email}</td>
                    <td className="px-4 py-3.5 text-dark text-xs font-medium">{enq.subject || 'General'}</td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold capitalize" style={{color:STATUS_COLORS[enq.status], background:STATUS_BG[enq.status]}}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-muted text-xs whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString('en-AE')}
                    </td>
                    <td className="px-4 py-3.5">
                      <button onClick={()=>setSelected(selected?._id===enq._id ? null : enq)}
                        className="text-navy hover:text-navy-light transition-colors p-1.5 rounded hover:bg-gray-100"
                        title="View">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="card p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-heading font-bold text-navy text-lg">{selected.name}</h3>
              <p className="text-muted text-sm">{selected.email} {selected.company && `· ${selected.company}`}</p>
            </div>
            <button onClick={()=>setSelected(null)} className="text-muted hover:text-navy transition-colors text-xl">✕</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {[['Subject',selected.subject||'General'],['Phone',selected.phone||'—'],['Status',selected.status],['Date',new Date(selected.createdAt).toLocaleString('en-AE')]].map(([l,v])=>(
              <div key={l} className="bg-gray-50 rounded-lg p-3">
                <p className="text-muted text-[10px] font-bold uppercase tracking-wider mb-1">{l}</p>
                <p className="text-dark text-sm font-semibold capitalize">{v}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-muted text-xs font-bold uppercase tracking-wider mb-2">Message</p>
            <p className="text-dark text-sm leading-relaxed">{selected.message || '—'}</p>
          </div>
          <div className="flex gap-3 mt-5">
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary text-sm py-2.5 px-5">
              <Mail size={14} /> Reply via Email
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
