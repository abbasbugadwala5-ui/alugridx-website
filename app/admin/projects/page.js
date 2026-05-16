'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from '@/lib/api';

const cats = ['Commercial', 'Industrial', 'Residential', 'Hospitality', 'Infrastructure'];
const blank = { title: '', category: cats[0], location: '', products: '', year: String(new Date().getFullYear()), img: '' };

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const json = await fetchProjects();
      setProjects(json.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(blank); setEditing('new'); setIsNew(true); setError(''); };
  const openEdit = (p) => { setForm({ ...p }); setEditing(p._id); setIsNew(false); setError(''); };
  const close = () => { setEditing(null); setError(''); };

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      if (isNew) {
        await createProject(form);
      } else {
        await updateProject(editing, form);
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
    if (!confirm('Remove this project?')) return;
    try {
      await deleteProject(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-navy text-xl">Projects</h2>
          <p className="text-muted text-sm">{projects.length} projects listed</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5"><Plus size={15}/> Add Project</button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {editing && (
        <div className="card p-6 border-l-4" style={{borderLeftColor:'#0D1B3E'}}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-navy">{isNew ? 'Add New Project' : 'Edit Project'}</h3>
            <button onClick={close} className="text-muted hover:text-navy"><X size={18}/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Project Title</label>
              <input className="form-input" placeholder="e.g. Dubai Commercial Tower" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select className="form-input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                {cats.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Location</label>
              <input className="form-input" placeholder="e.g. Dubai, UAE" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
            </div>
            <div>
              <label className="form-label">Year</label>
              <input className="form-input" placeholder="2026" value={form.year} onChange={e=>setForm({...form,year:e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Products Used</label>
              <input className="form-input" placeholder="e.g. Ceiling Diffusers, Linear Grilles" value={form.products} onChange={e=>setForm({...form,products:e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Image URL</label>
              <input className="form-input" placeholder="https://... or /images/project.jpg" value={form.img || ''} onChange={e=>setForm({...form,img:e.target.value})} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
              <Save size={14}/> {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={close} className="btn-outline text-sm py-2.5 px-5">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p._id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="badge text-[10px]">{p.category}</span>
              <div className="flex gap-1">
                <button onClick={()=>openEdit(p)} className="p-1.5 rounded hover:bg-gray-100 text-muted hover:text-navy transition-colors"><Edit2 size={13}/></button>
                <button onClick={()=>remove(p._id)} className="p-1.5 rounded hover:bg-red-50 text-muted hover:text-red-500 transition-colors"><Trash2 size={13}/></button>
              </div>
            </div>
            <h3 className="font-heading font-bold text-navy text-sm mb-1">{p.title}</h3>
            <p className="text-muted text-xs mb-1">📍 {p.location} · {p.year}</p>
            <p className="text-muted text-xs">{p.products}</p>
          </div>
        ))}
        <button onClick={openNew} className="card p-5 border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted hover:text-navy hover:border-navy transition-all min-h-[120px]">
          <Plus size={24}/>
          <span className="text-sm font-heading font-bold">Add Project</span>
        </button>
      </div>
    </div>
  );
}
