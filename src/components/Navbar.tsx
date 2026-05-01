'use client';

import { Search, Bell, Plus, Command, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="h-16 border-b border-white/5 bg-[#0B0F19]/90 backdrop-blur-md flex items-center justify-between px-6 z-40 sticky top-0">
      {/* Global Search */}
      <div className="flex-1 max-w-xl relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
        <input
          type="text"
          placeholder="Search scans, reports, forensic data..."
          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl py-2.5 pl-11 pr-24 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.06] pointer-events-none">
          <Command className="w-3 h-3 text-zinc-600" />
          <span className="text-[10px] font-bold text-zinc-600">K</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-6">
        <Link
          href="/user/analyzer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          New Scan
        </Link>

        <button className="relative p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.07] transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0F19]" />
        </button>

        <div className="h-7 w-px bg-white/[0.06]" />

        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
        >
          <LogIn className="w-4 h-4" />
          Login
        </Link>
      </div>
    </header>
  );
}
