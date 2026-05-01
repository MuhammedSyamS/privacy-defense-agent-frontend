'use client';

import { useState } from 'react';
import { Shield, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        // Dev Bypass: If credentials are placeholders, allow any login
        if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project')) {
          console.log('Dev Mode: Bypassing authentication');
          router.push('/user');
          return;
        }
        setError(authError.message);
        setLoading(false);
        return;
      }

      // Fetch role from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      const role = profile?.role ?? 'user';
      router.push(role === 'admin' ? '/admin/monitor' : '/user');
    } catch (err) {
      // Fallback for network errors (likely due to invalid URL)
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project')) {
        router.push('/user');
      } else {
        setError('Connection to security server failed.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-600/20">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-sm text-zinc-500 mt-1.5">Sign in to your Privacy Agent account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Password</label>
              <Link href="#" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 pl-11 pr-12 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 font-medium px-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in...</> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 mt-8">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
