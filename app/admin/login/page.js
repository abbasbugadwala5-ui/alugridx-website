'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { login } from '@/lib/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.username, form.password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{background:'#F7F8FC'}}>
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12" style={{background:'#0D1B3E'}}>
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/hero/slide-1.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png" alt="ALUGRIDX" fill className="object-contain brightness-200" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-white text-xl">ALUGRIDX</p>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">Admin Panel</p>
            </div>
          </div>
          <h1 className="font-heading font-extrabold text-white text-4xl leading-tight mb-4">
            Manage Your<br />Business From<br />One Place
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            View enquiries, update products, manage projects, and publish blog posts — all from a single dashboard.
          </p>
        </div>
        <div className="relative grid grid-cols-2 gap-4">
          {[['Enquiries','Track leads & messages'],['Products','Update catalogue'],['Projects','Add project photos'],['Blog','Publish articles']].map(([t,d])=>(
            <div key={t} className="rounded-xl p-4" style={{background:'rgba(255,255,255,0.07)'}}>
              <p className="font-heading font-bold text-white text-sm mb-0.5">{t}</p>
              <p className="text-white/50 text-xs">{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="relative w-8 h-8"><Image src="/images/logo.png" alt="ALUGRIDX" fill className="object-contain" /></div>
            <p className="font-heading font-extrabold text-navy text-lg">ALUGRIDX Admin</p>
          </div>

          <h2 className="font-heading font-extrabold text-navy text-2xl mb-1">Welcome back</h2>
          <p className="text-muted text-sm mb-8">Sign in to your admin account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Username</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  required
                  type="text"
                  placeholder="admin"
                  value={form.username}
                  onChange={e => setForm({...form, username: e.target.value})}
                  className="form-input pl-10"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  required
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="form-input pl-10 pr-10"
                />
                <button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-navy transition-colors">
                  {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60">
              {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

         
        </div>
      </div>
    </div>
  );
}
