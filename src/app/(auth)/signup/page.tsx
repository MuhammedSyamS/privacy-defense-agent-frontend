'use client';

import { useState } from 'react';
import { Shield, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Create profile row with default 'user' role
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        role: 'user',
      });
    }

    router.push('/user');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-600/20">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create account</h1>
          <p className="text-sm text-zinc-500 mt-1.5">Start protecting your digital identity</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] transition-all"
              />
            </div>
          </div>

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
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
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
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating account...</> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-600 mt-6 leading-relaxed px-4">
          By signing up you agree to our{' '}
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Terms</Link> and{' '}
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link>.
        </p>

        <p className="text-center text-sm text-zinc-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
