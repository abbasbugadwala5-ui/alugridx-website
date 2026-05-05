'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

const cats = ['Commercial', 'Industrial', 'Residential', 'Hospitality', 'Infrastructure'];
const blank = { title: '', category: cats[0], location: '', products: '', year: '2026' };

const initProjects = [
  { id: 1, title: 'Dubai Commercial Tower', category: 'Commercial', location: 'Dubai, UAE', products: 'Ceiling Diffusers, Linear Grilles', year: '2026' },
  { id: 2, title: 'Ajman Industrial Complex', category: 'Industrial', location: 'Ajman, UAE', products: 'Louvers, VCD, NRD', year: '2025' },
  { id: 3, title: 'Abu Dhabi Luxury Residences', category: 'Residential', location: 'Abu Dhabi, UAE', products: 'Ceiling Diffusers, Grilles', year: '2025' },
  { id: 4, title: 'Sharjah 5-Star Hotel', category: 'Hospitality', location: 'Sharjah, UAE', products: 'Linear Slot Diffusers', year: '2026' },
];

export default function AdminProjects() {
  const [projects, setProjects] = useState(initProjects);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setForm(blank); setEditing('new'); setIsNew(true); };
  const openEdit = (p) => { setForm({...p}); setEditing(p.id); setIsNew(false); };
  const close = () => { setEditing(null); };

  const save = () => {
    if (isNew) setProjects(prev => [...prev, { ...form, id: Date.now() }]);
    else setProjects(prev => prev.map(p => p.id === editing ? { ...form, id: editing } : p));
    close();
  };
  const remove = (id) => { if (confirm('Remove this project?')) setProjects(prev => prev.filter(p => p.id !== id)); };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-navy text-xl">Projects</h2>
          <p className="text-muted text-sm">{projects.length} projects listed</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5"><Plus size={15}/> Add Project</button>
      </div>

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
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="btn-primary text-sm py-2.5 px-6"><Save size={14}/> Save</button>
            <button onClick={close} className="btn-outline text-sm py-2.5 px-5">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="badge text-[10px]">{p.category}</span>
              <div className="flex gap-1">
                <button onClick={()=>openEdit(p)} className="p-1.5 rounded hover:bg-gray-100 text-muted hover:text-navy transition-colors"><Edit2 size={13}/></button>
                <button onClick={()=>remove(p.id)} className="p-1.5 rounded hover:bg-red-50 text-muted hover:text-red-500 transition-colors"><Trash2 size={13}/></button>
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
