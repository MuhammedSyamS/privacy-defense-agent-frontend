'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6 auth-gradient">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-black rounded-2xl shadow-xl shadow-black/10 mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-black tracking-tighter">Create account</h1>
          <p className="text-zinc-500 font-medium">Start protecting your digital identity today.</p>
        </div>

        <Card className="border-zinc-200 shadow-2xl shadow-black/5">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="password" 
                    placeholder="Min. 8 characters" 
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest flex gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-[10px] text-zinc-400 text-center font-medium leading-relaxed">
              By clicking "Get Started", you agree to our <Link href="#" className="underline text-zinc-500">Terms of Service</Link> and <Link href="#" className="underline text-zinc-500">Privacy Policy</Link>.
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-zinc-500 font-medium">
          Already have an account? {' '}
          <Link href="/login" className="text-black font-bold underline decoration-zinc-300 underline-offset-4 hover:decoration-black transition-all">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
