'use client';
import { useState, useEffect } from 'react';
import { Search, Mail, Eye, RefreshCw } from 'lucide-react';
import { fetchEnquiries, updateEnquiryStatus } from '@/lib/api';

const STATUS_COLORS = { new: '#f59e0b', read: '#3b82f6', replied: '#10b981', archived: '#6b7280' };
const STATUS_BG    = { new: '#fffbeb', read: '#eff6ff', replied: '#f0fdf4', archived: '#f9fafb' };
const ALLOWED      = ['new', 'read', 'replied', 'archived'];

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const json = await fetchEnquiries({ limit: 50 });
      setEnquiries(json.data || []);
    } catch (err) {
      setError(err.message);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    try {
      const json = await updateEnquiryStatus(id, status);
      setEnquiries(prev => prev.map(e => e._id === id ? json.data : e));
      if (selected?._id === id) setSelected(json.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const openDetail = (enq) => {
    setSelected(selected?._id === enq._id ? null : enq);
    if (enq.status === 'new') changeStatus(enq._id, 'read');
  };

  const filtered = enquiries.filter(e => {
    const matchSearch = !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.email?.toLowerCase().includes(search.toLowerCase()) || e.subject?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || e.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: enquiries.length,
    new: enquiries.filter(e=>e.status==='new').length,
    read: enquiries.filter(e=>e.status==='read').length,
    replied: enquiries.filter(e=>e.status==='replied').length,
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-navy text-xl">Enquiries</h2>
          <p className="text-muted text-sm">{counts.new} new, {enquiries.length} total</p>
        </div>
        <button onClick={load} className="btn-outline text-sm py-2 px-4 flex items-center gap-2 self-start">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

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

      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="Search by name, email, or subject..."
          className="form-input pl-10 w-full max-w-md"
        />
      </div>

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
                      <button onClick={()=>openDetail(enq)}
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
          <div className="flex flex-wrap gap-3 mt-5 items-center">
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`} className="btn-primary text-sm py-2.5 px-5">
              <Mail size={14} /> Reply via Email
            </a>
            <label className="text-xs text-muted ml-auto">
              Set status:
              <select
                className="form-input ml-2 inline-block w-auto py-1.5 px-2 text-xs"
                value={selected.status}
                onChange={e => changeStatus(selected._id, e.target.value)}
              >
                {ALLOWED.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
