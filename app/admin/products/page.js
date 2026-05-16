'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Save, Upload, Star, FileText } from 'lucide-react';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  uploadImages,
  uploadDatasheet,
} from '@/lib/api';

const CATEGORIES = [
  'Diffusers',
  'Grilles & Registers',
  'Louvers',
  'Dampers',
  'Air Terminal Units',
  'Plenum Boxes & Accessories',
  'Sound Attenuators',
];

const slugify = (s = '') =>
  s.toLowerCase().trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const blank = {
  code: '',
  title: '',
  slug: '',
  category: CATEGORIES[0],
  subCategory: '',
  shortDescription: '',
  specs: { sizes: '', material: '', finish: '', application: '' },
  performance: { airflowRange: '', throwRange: '', noiseLevel: '', pressureDrop: '' },
  images: [],
  technicalDrawing: '',
  datasheetUrl: '',
  sortOrder: 0,
  active: true,
  featured: false,
};

// Convert API product (sizes: [String]) to form shape (sizes: comma string) and back.
const toForm = (p) => ({
  ...blank,
  ...p,
  specs: {
    ...blank.specs,
    ...(p.specs || {}),
    sizes: Array.isArray(p.specs?.sizes) ? p.specs.sizes.join(', ') : (p.specs?.sizes || ''),
  },
  performance: { ...blank.performance, ...(p.performance || {}) },
  images: Array.isArray(p.images) ? p.images : [],
});

const toPayload = (f) => ({
  ...f,
  slug: f.slug || slugify(f.title),
  sortOrder: Number(f.sortOrder) || 0,
  specs: {
    ...f.specs,
    sizes: String(f.specs.sizes || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  },
});

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imagesInputRef = useRef(null);
  const drawingInputRef = useRef(null);
  const datasheetInputRef = useRef(null);

  const load = async () => {
    try {
      const json = await fetchProducts();
      setProducts(json.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(blank); setEditing('new'); setIsNew(true); setError(''); };
  const openEdit = (p) => { setForm(toForm(p)); setEditing(p._id); setIsNew(false); setError(''); };
  const close = () => { setEditing(null); setForm(blank); setError(''); };

  const setField = (path, value) => {
    setForm((f) => {
      const next = { ...f };
      if (path.includes('.')) {
        const [k, sub] = path.split('.');
        next[k] = { ...next[k], [sub]: value };
      } else {
        next[path] = value;
      }
      // Auto-fill slug from title until manually edited
      if (path === 'title' && (!f.slug || f.slug === slugify(f.title))) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const onImagesPicked = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError('');
    try {
      const data = await uploadImages(files, { folder: 'alugridx/products' });
      const urls = data.map((d) => d.url);
      setForm((f) => ({ ...f, images: [...(f.images || []), ...urls] }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (imagesInputRef.current) imagesInputRef.current.value = '';
    }
  };

  const onDrawingPicked = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const data = await uploadImage(file, { folder: 'alugridx/drawings' });
      setForm((f) => ({ ...f, technicalDrawing: data.url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (drawingInputRef.current) drawingInputRef.current.value = '';
    }
  };

  const onDatasheetPicked = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const data = await uploadDatasheet(file, { folder: 'alugridx/datasheets' });
      setForm((f) => ({ ...f, datasheetUrl: data.url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (datasheetInputRef.current) datasheetInputRef.current.value = '';
    }
  };

  const removeImage = (idx) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const moveImage = (idx, dir) =>
    setForm((f) => {
      const next = [...f.images];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return f;
      [next[idx], next[j]] = [next[j], next[idx]];
      return { ...f, images: next };
    });

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = toPayload(form);
      if (isNew) await createProduct(payload);
      else await updateProduct(editing, payload);
      await load();
      close();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Remove this product?')) return;
    try { await deleteProduct(id); await load(); }
    catch (err) { setError(err.message); }
  };

  const toggleActive = async (p) => {
    try { await updateProduct(p._id, { ...p, active: !p.active }); await load(); }
    catch (err) { setError(err.message); }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-navy text-xl">Products</h2>
          <p className="text-muted text-sm">
            {products.length} products · {products.filter((p) => p.active).length} active · {products.filter((p) => p.featured).length} featured
          </p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5">
          <Plus size={15} /> Add Product
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {editing && (
        <div className="card p-6 border-l-4" style={{ borderLeftColor: '#0D1B3E' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-navy text-lg">
              {isNew ? 'Add New Product' : 'Edit Product'}
            </h3>
            <button onClick={close} className="text-muted hover:text-navy transition-colors"><X size={18} /></button>
          </div>

          {/* ── Basics ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Product Code</label>
              <input className="form-input" placeholder="e.g. SAD, VCD" value={form.code} onChange={(e) => setField('code', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Product Title</label>
              <input className="form-input" placeholder="Square Ceiling Diffuser" value={form.title} onChange={(e) => setField('title', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Slug <span className="text-muted text-[10px] font-normal">(URL — auto from title)</span></label>
              <input className="form-input font-mono text-xs" placeholder="square-ceiling-diffuser" value={form.slug} onChange={(e) => setField('slug', slugify(e.target.value))} />
            </div>
            <div>
              <label className="form-label">Sort Order</label>
              <input type="number" className="form-input" value={form.sortOrder} onChange={(e) => setField('sortOrder', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select className="form-input" value={form.category} onChange={(e) => setField('category', e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Sub-category</label>
              <input className="form-input" placeholder="Square Ceiling Diffusers" value={form.subCategory} onChange={(e) => setField('subCategory', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Short Description</label>
              <textarea className="form-input resize-none" rows={2} placeholder="One-line product summary..." value={form.shortDescription} onChange={(e) => setField('shortDescription', e.target.value)} />
            </div>
          </div>

          {/* ── Specs ──────────────────────────────────────────────── */}
          <div className="mt-6 mb-3">
            <p className="font-heading font-bold text-navy text-xs uppercase tracking-wider">Specifications</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="form-label">Sizes <span className="text-muted text-[10px] font-normal">(comma-separated)</span></label>
              <input className="form-input" placeholder="150, 225, 300, 600" value={form.specs.sizes} onChange={(e) => setField('specs.sizes', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Material</label>
              <input className="form-input" placeholder="Extruded aluminum" value={form.specs.material} onChange={(e) => setField('specs.material', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Finish</label>
              <input className="form-input" placeholder="RAL 9010 powder-coated" value={form.specs.finish} onChange={(e) => setField('specs.finish', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Application</label>
              <input className="form-input" placeholder="Commercial ceiling supply air" value={form.specs.application} onChange={(e) => setField('specs.application', e.target.value)} />
            </div>
          </div>

          {/* ── Performance ────────────────────────────────────────── */}
          <div className="mt-6 mb-3">
            <p className="font-heading font-bold text-navy text-xs uppercase tracking-wider">Performance <span className="text-muted normal-case font-normal">(optional)</span></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Airflow Range</label>
              <input className="form-input" placeholder="50 – 1100 L/s" value={form.performance.airflowRange} onChange={(e) => setField('performance.airflowRange', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Throw Range</label>
              <input className="form-input" placeholder="1.0 – 7.5 m" value={form.performance.throwRange} onChange={(e) => setField('performance.throwRange', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Noise Level</label>
              <input className="form-input" placeholder="NC 20 – 35" value={form.performance.noiseLevel} onChange={(e) => setField('performance.noiseLevel', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Pressure Drop</label>
              <input className="form-input" placeholder="15 – 75 Pa" value={form.performance.pressureDrop} onChange={(e) => setField('performance.pressureDrop', e.target.value)} />
            </div>
          </div>

          {/* ── Images ────────────────────────────────────────────── */}
          <div className="mt-6 mb-3 flex items-center justify-between">
            <p className="font-heading font-bold text-navy text-xs uppercase tracking-wider">Product Images</p>
            <button
              type="button"
              onClick={() => imagesInputRef.current?.click()}
              disabled={uploading}
              className="btn-outline text-xs py-1.5 px-3 disabled:opacity-60"
            >
              <Upload size={12} /> {uploading ? 'Uploading…' : 'Upload images'}
            </button>
            <input ref={imagesInputRef} type="file" accept="image/*" multiple onChange={onImagesPicked} className="hidden" />
          </div>
          {form.images.length === 0 ? (
            <p className="text-xs text-muted bg-gray-50 border border-dashed border-border rounded-lg px-4 py-6 text-center">
              No images yet. First image becomes the product card thumbnail.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {form.images.map((url, i) => (
                <div key={url + i} className="relative group border border-border rounded-lg overflow-hidden">
                  <div className="relative aspect-square bg-gray-50">
                    <Image src={url} alt="" fill className="object-cover" unoptimized />
                  </div>
                  {i === 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-navy text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Cover</span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between items-center px-1.5 py-1 bg-white/95 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-0.5">
                      <button type="button" onClick={() => moveImage(i, -1)} className="text-[10px] px-1.5 py-0.5 hover:bg-gray-100 rounded" title="Move left">←</button>
                      <button type="button" onClick={() => moveImage(i, 1)} className="text-[10px] px-1.5 py-0.5 hover:bg-gray-100 rounded" title="Move right">→</button>
                    </div>
                    <button type="button" onClick={() => removeImage(i)} className="text-red-600 hover:text-red-700"><Trash2 size={12} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Technical drawing + datasheet ──────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label flex items-center justify-between">
                <span>Technical Drawing</span>
                <button
                  type="button"
                  onClick={() => drawingInputRef.current?.click()}
                  disabled={uploading}
                  className="text-[10px] text-navy hover:underline disabled:opacity-60"
                >
                  <Upload size={10} className="inline" /> Upload
                </button>
              </label>
              <input ref={drawingInputRef} type="file" accept="image/*" onChange={onDrawingPicked} className="hidden" />
              <input
                className="form-input font-mono text-xs"
                placeholder="https://res.cloudinary.com/..."
                value={form.technicalDrawing}
                onChange={(e) => setField('technicalDrawing', e.target.value)}
              />
              {form.technicalDrawing && (
                <div className="mt-2 relative w-24 h-24 border border-border rounded bg-gray-50">
                  <Image src={form.technicalDrawing} alt="" fill className="object-contain" unoptimized />
                </div>
              )}
            </div>
            <div>
              <label className="form-label flex items-center justify-between">
                <span>Datasheet <span className="text-muted text-[10px] font-normal">(PDF, max 20 MB)</span></span>
                <button
                  type="button"
                  onClick={() => datasheetInputRef.current?.click()}
                  disabled={uploading}
                  className="text-[10px] text-navy hover:underline disabled:opacity-60"
                >
                  <Upload size={10} className="inline" /> Upload PDF
                </button>
              </label>
              <input ref={datasheetInputRef} type="file" accept="application/pdf,.pdf" onChange={onDatasheetPicked} className="hidden" />
              <input
                className="form-input font-mono text-xs"
                placeholder="https://.../datasheet.pdf"
                value={form.datasheetUrl}
                onChange={(e) => setField('datasheetUrl', e.target.value)}
              />
              {form.datasheetUrl && (
                <a
                  href={form.datasheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-navy hover:underline"
                >
                  <FileText size={12} /> Open datasheet
                </a>
              )}
            </div>
          </div>

          {/* ── Toggles ────────────────────────────────────────────── */}
          <div className="flex items-center gap-6 mb-5 pt-4 border-t border-border">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={(e) => setField('active', e.target.checked)} />
              <span className="text-sm">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setField('featured', e.target.checked)} />
              <span className="text-sm flex items-center gap-1"><Star size={12} /> Featured</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button onClick={save} disabled={saving || uploading} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
              <Save size={14} /> {saving ? 'Saving…' : 'Save Product'}
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
                {['', 'Code', 'Product', 'Category', 'Description', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider font-heading">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => {
                const thumb = p.images?.[0];
                return (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 w-12">
                      <div className="relative w-10 h-10 rounded bg-gray-100 overflow-hidden">
                        {thumb ? (
                          <Image src={thumb} alt="" fill className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full grid place-items-center text-muted text-[9px]">No img</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="badge text-[10px] py-0.5 px-2">{p.code}</span>
                      {p.featured && <Star size={11} className="inline ml-1.5 text-amber-500 fill-amber-500" />}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-dark text-xs">{p.title}</div>
                      <div className="text-[10px] text-muted font-mono">/{p.slug}</div>
                    </td>
                    <td className="px-4 py-3.5 text-muted text-xs">
                      <div>{p.category}</div>
                      {p.subCategory && <div className="text-[10px] opacity-70">{p.subCategory}</div>}
                    </td>
                    <td className="px-4 py-3.5 text-muted text-xs max-w-xs truncate">{p.shortDescription}</td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => toggleActive(p)} className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${p.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}>
                        {p.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-gray-100 text-muted hover:text-navy transition-colors" title="Edit"><Edit2 size={14} /></button>
                        <button onClick={() => remove(p._id)} className="p-1.5 rounded hover:bg-red-50 text-muted hover:text-red-500 transition-colors" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
