'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Eye, EyeOff } from 'lucide-react';
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '@/lib/api';

const cats = ['HVAC Tips', 'Products', 'Guides', 'Industry', 'News'];
const blank = {
  title: '',
  category: cats[0],
  excerpt: '',
  content: '',
  published: false,
  date: new Date().toISOString().split('T')[0],
  img: '',
};

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const json = await fetchBlogs();
      setPosts(json.data || []);
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
        await createBlog(form);
      } else {
        await updateBlog(editing, form);
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
    if (!confirm('Delete this post?')) return;
    try {
      await deleteBlog(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const togglePublish = async (p) => {
    try {
      await updateBlog(p._id, { ...p, published: !p.published });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-navy text-xl">Blog Posts</h2>
          <p className="text-muted text-sm">{posts.filter(p=>p.published).length} published, {posts.filter(p=>!p.published).length} draft</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5"><Plus size={15}/> New Post</button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {editing && (
        <div className="card p-6 border-l-4" style={{borderLeftColor:'#0D1B3E'}}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-navy">{isNew ? 'New Blog Post' : 'Edit Post'}</h3>
            <button onClick={close} className="text-muted hover:text-navy"><X size={18}/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="form-label">Post Title</label>
              <input className="form-input" placeholder="Article title..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select className="form-input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                {cats.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Date</label>
              <input type="date" className="form-input" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div onClick={()=>setForm({...form,published:!form.published})} className="relative w-10 h-5 rounded-full transition-colors" style={{background:form.published?'#0D1B3E':'#d1d5db'}}>
                  <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform" style={{transform:form.published?'translateX(22px)':'translateX(2px)'}} />
                </div>
                <span className="text-sm font-bold text-dark font-heading">{form.published ? 'Published' : 'Draft'}</span>
              </label>
            </div>
            <div className="md:col-span-3">
              <label className="form-label">Cover Image URL</label>
              <input className="form-input" placeholder="https://... or /images/post.jpg" value={form.img || ''} onChange={e=>setForm({...form,img:e.target.value})} />
            </div>
            <div className="md:col-span-3">
              <label className="form-label">Excerpt / Summary</label>
              <textarea className="form-input resize-none" rows={2} placeholder="Short description shown in listings..." value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} />
            </div>
            <div className="md:col-span-3">
              <label className="form-label">Full Content</label>
              <textarea className="form-input resize-none" rows={6} placeholder="Full article content..." value={form.content} onChange={e=>setForm({...form,content:e.target.value})} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
              <Save size={14}/> {saving ? 'Saving...' : 'Save Post'}
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
                {['Title','Category','Date','Status','Actions'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider font-heading">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map(p => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-dark text-xs leading-snug max-w-xs">{p.title}</p>
                    <p className="text-muted text-[11px] mt-0.5 truncate max-w-xs">{p.excerpt}</p>
                  </td>
                  <td className="px-4 py-3.5"><span className="badge text-[10px] py-0.5 px-2">{p.category}</span></td>
                  <td className="px-4 py-3.5 text-muted text-xs whitespace-nowrap">{p.date}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={()=>togglePublish(p)} className="p-1.5 rounded hover:bg-gray-100 text-muted hover:text-navy transition-colors" title={p.published?'Unpublish':'Publish'}>
                        {p.published ? <EyeOff size={14}/> : <Eye size={14}/>}
                      </button>
                      <button onClick={()=>openEdit(p)} className="p-1.5 rounded hover:bg-gray-100 text-muted hover:text-navy transition-colors"><Edit2 size={14}/></button>
                      <button onClick={()=>remove(p._id)} className="p-1.5 rounded hover:bg-red-50 text-muted hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
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
