'use client';
import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import {
  fetchFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from '@/lib/api';

const blank = { question: '', answer: '', order: 0, active: true };

export default function AdminFaq() {
  const [faqs, setFaqs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const json = await fetchFaqs();
      setFaqs(json.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(blank); setEditing('new'); setIsNew(true); setError(''); };
  const openEdit = (f) => { setForm({ ...f }); setEditing(f._id); setIsNew(false); setError(''); };
  const close = () => { setEditing(null); setError(''); };

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      if (isNew) {
        await createFaq(form);
      } else {
        await updateFaq(editing, form);
      }
      await load();
      close();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await deleteFaq(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleActive = async (f) => {
    try {
      await updateFaq(f._id, { ...f, active: !f.active });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-navy text-xl">FAQs</h2>
          <p className="text-muted text-sm">
            {faqs.length} total, {faqs.filter(f => f.active).length} visible on the website
          </p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5">
          <Plus size={15} /> Add FAQ
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {editing && (
        <div className="card p-6 border-l-4" style={{borderLeftColor:'#0D1B3E'}}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-navy">{isNew ? 'New FAQ' : 'Edit FAQ'}</h3>
            <button onClick={close} className="text-muted hover:text-navy"><X size={18}/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-3">
              <label className="form-label">Question</label>
              <input className="form-input" placeholder="What materials are your products made of?" value={form.question} onChange={e=>setForm({...form,question:e.target.value})} />
            </div>
            <div className="md:col-span-3">
              <label className="form-label">Answer</label>
              <textarea className="form-input resize-none" rows={5} placeholder="Full answer..." value={form.answer} onChange={e=>setForm({...form,answer:e.target.value})} />
            </div>
            <div>
              <label className="form-label">Sort Order</label>
              <input type="number" className="form-input" value={form.order} onChange={e=>setForm({...form,order:Number(e.target.value)||0})} />
            </div>
            <div>
              <label className="form-label">Status</label>
              <select className="form-input" value={form.active?'active':'inactive'} onChange={e=>setForm({...form,active:e.target.value==='active'})}>
                <option value="active">Visible</option>
                <option value="inactive">Hidden</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
              <Save size={14}/> {saving ? 'Saving...' : 'Save FAQ'}
            </button>
            <button onClick={close} className="btn-outline text-sm py-2.5 px-5">Cancel</button>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                {['Order','Question','Answer','Status','Actions'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider font-heading">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {faqs.map(f => (
                <tr key={f._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5 text-muted text-xs">{f.order}</td>
                  <td className="px-4 py-3.5 font-semibold text-dark text-xs max-w-sm">{f.question}</td>
                  <td className="px-4 py-3.5 text-muted text-xs max-w-md truncate">{f.answer}</td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => toggleActive(f)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${f.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}
                    >
                      {f.active ? 'Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button onClick={()=>openEdit(f)} className="p-1.5 rounded hover:bg-gray-100 text-muted hover:text-navy transition-colors" title="Edit"><Edit2 size={14}/></button>
                      <button onClick={()=>remove(f._id)} className="p-1.5 rounded hover:bg-red-50 text-muted hover:text-red-500 transition-colors" title="Delete"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
