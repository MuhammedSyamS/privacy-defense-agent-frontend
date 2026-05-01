'use client';

import { Shield, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';

export default function AuthNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 px-8 flex items-center justify-between z-50 bg-white/50 backdrop-blur-xl border-b border-zinc-100">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="p-2 bg-black rounded-xl shadow-lg shadow-black/10 group-hover:scale-105 transition-all">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="font-black text-black tracking-tighter text-xl">PrivacyAgent</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-all flex items-center gap-1">
          <ChevronLeft className="w-3 h-3" />
          Back to Site
        </Link>
        <div className="h-4 w-px bg-zinc-200" />
        <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-black hover:underline underline-offset-4">Sign In</Link>
        <Link href="/signup">
          <Button variant="primary" size="sm" className="rounded-xl px-6 text-[10px] font-black uppercase tracking-widest">
            Join Now
          </Button>
        </Link>
      </div>
    </nav>
  );
}
