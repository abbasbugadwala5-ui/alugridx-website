'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

const initProducts = [
  { id: 1, code: 'SAD', title: 'Square Ceiling Diffuser', category: 'Ceiling Diffusers', specs: 'Square face, adjustable pattern, aluminum powder-coated', active: true },
  { id: 2, code: 'RAD', title: 'Round/Square Ceiling Diffuser', category: 'Ceiling Diffusers', specs: 'Round neck, square face, 4-way blow pattern', active: true },
  { id: 3, code: 'SLSD', title: 'Linear Slot Diffuser', category: 'Linear Diffusers', specs: '1-4 slot options, up to 3000mm length', active: true },
  { id: 4, code: 'SAR', title: 'Supply Air Register', category: 'Supply Grilles', specs: 'Fixed & adjustable blade, integral VCD option', active: true },
  { id: 5, code: 'EAL', title: 'Exhaust Air Louver', category: 'Louvers', specs: 'Drainable blade, weather protection, bird mesh', active: true },
  { id: 6, code: 'STL', title: 'Sand Trap Louver', category: 'Louvers', specs: 'Desert climate designed, sand & dust prevention', active: true },
  { id: 7, code: 'VCD', title: 'Volume Control Damper', category: 'Dampers', specs: 'Opposed parallel blades, manual & motorized', active: false },
];

const cats = ['Ceiling Diffusers', 'Linear Diffusers', 'Supply Grilles', 'Return Grilles', 'Linear Bar Grilles', 'Louvers', 'Dampers', 'Non Return Dampers'];

const blank = { code: '', title: '', category: cats[0], specs: '', active: true };

export default function AdminProducts() {
  const [products, setProducts] = useState(initProducts);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setForm(blank); setEditing('new'); setIsNew(true); };
  const openEdit = (p) => { setForm({...p}); setEditing(p.id); setIsNew(false); };
  const close = () => { setEditing(null); setForm(blank); };

  const save = () => {
    if (isNew) {
      setProducts(prev => [...prev, { ...form, id: Date.now() }]);
    } else {
      setProducts(prev => prev.map(p => p.id === editing ? { ...form, id: editing } : p));
    }
    close();
  };

  const remove = (id) => { if (confirm('Remove this product?')) setProducts(prev => prev.filter(p => p.id !== id)); };
  const toggle = (id) => setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-navy text-xl">Products</h2>
          <p className="text-muted text-sm">{products.length} products, {products.filter(p=>p.active).length} active</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5">
          <Plus size={15} /> Add Product
        </button>
      </div>

      {/* Form modal */}
      {editing && (
        <div className="card p-6 border-l-4" style={{borderLeftColor:'#0D1B3E'}}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-navy text-lg">{isNew ? 'Add New Product' : 'Edit Product'}</h3>
            <button onClick={close} className="text-muted hover:text-navy transition-colors"><X size={18}/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Product Code</label>
              <input className="form-input" placeholder="e.g. SAD, VCD" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} />
            </div>
            <div>
              <label className="form-label">Product Title</label>
              <input className="form-input" placeholder="e.g. Square Ceiling Diffuser" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select className="form-input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Status</label>
              <select className="form-input" value={form.active?'active':'inactive'} onChange={e=>setForm({...form,active:e.target.value==='active'})}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Specifications / Description</label>
              <textarea className="form-input resize-none" rows={3} placeholder="Key specs..." value={form.specs} onChange={e=>setForm({...form,specs:e.target.value})} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="btn-primary text-sm py-2.5 px-6"><Save size={14}/> Save Product</button>
            <button onClick={close} className="btn-outline text-sm py-2.5 px-5">Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                {['Code','Product','Category','Specs','Status','Actions'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider font-heading">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="badge text-[10px] py-0.5 px-2">{p.code}</span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-dark text-xs">{p.title}</td>
                  <td className="px-4 py-3.5 text-muted text-xs">{p.category}</td>
                  <td className="px-4 py-3.5 text-muted text-xs max-w-xs truncate">{p.specs}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={()=>toggle(p.id)} className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${p.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}>
                      {p.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button onClick={()=>openEdit(p)} className="p-1.5 rounded hover:bg-gray-100 text-muted hover:text-navy transition-colors" title="Edit"><Edit2 size={14}/></button>
                      <button onClick={()=>remove(p.id)} className="p-1.5 rounded hover:bg-red-50 text-muted hover:text-red-500 transition-colors" title="Delete"><Trash2 size={14}/></button>
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
