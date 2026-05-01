'use client';

import { Search, Bell, User, PlusCircle } from 'lucide-react';
import { Button } from './ui/Button';

export default function Navbar() {
  return (
    <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 border-zinc-200 text-black">
          <PlusCircle className="w-4 h-4" />
          Quick Scan
        </Button>
        <div className="h-6 w-px bg-zinc-200 mx-2" />
        <button className="relative p-2 text-zinc-400 hover:text-black transition-all">
          <Bell className="w-5 h-5" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-black rounded-full" />
        </button>
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-black group-hover:underline transition-all">Admin User</p>
            <p className="text-[10px] text-zinc-400 uppercase font-black tracking-tighter">Enterprise</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:scale-105 transition-all">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
