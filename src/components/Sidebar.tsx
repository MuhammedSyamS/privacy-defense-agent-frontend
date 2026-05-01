'use client';

import { Shield, LayoutDashboard, Database, Settings, Zap, Globe, ChevronRight, X, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'admin' | 'user'>('admin');

  const navItems = viewMode === 'admin' ? [
    { icon: LayoutDashboard, label: 'Admin Overview', active: true, href: '/' },
    { icon: Zap, label: 'Global Threat Feed', href: '/' },
    { icon: Globe, label: 'Network Intel', href: '/' },
    { icon: Settings, label: 'System Settings', href: '/settings' },
  ] : [
    { icon: UserCircle, label: 'User Dashboard', active: true, href: '/user' },
    { icon: Shield, label: 'My Protection', href: '/user' },
    { icon: Database, label: 'Security History', href: '/user' },
    { icon: Settings, label: 'Account Settings', href: '/settings' },
  ];

  return (
    <aside className={cn(
      "h-screen border-r border-zinc-200 bg-white transition-all duration-300 flex flex-col z-50",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-50 gap-3">
        <div className="p-1.5 bg-black rounded-lg shrink-0">
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-black tracking-tighter text-lg">PrivacyAgent</span>
        )}
      </div>

      {/* View Switcher */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="bg-zinc-50 p-1 rounded-xl flex border border-zinc-100">
            <button 
              onClick={() => setViewMode('admin')}
              className={cn("flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all", viewMode === 'admin' ? "bg-white text-black shadow-sm" : "text-zinc-400")}
            >
              Admin
            </button>
            <button 
              onClick={() => setViewMode('user')}
              className={cn("flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all", viewMode === 'user' ? "bg-white text-black shadow-sm" : "text-zinc-400")}
            >
              User
            </button>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
              item.active 
                ? "bg-zinc-100 text-black font-semibold" 
                : "text-zinc-500 hover:bg-zinc-50 hover:text-black"
            )}
          >
            <item.icon className={cn("w-4 h-4 shrink-0", item.active ? "text-black" : "text-zinc-400 group-hover:text-black")} />
            {!isCollapsed && <span className="text-sm tracking-tight">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-zinc-50">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-zinc-50 text-zinc-400 hover:text-black transition-all"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><X className="w-3 h-3" /> Hide Sidebar</div>}
        </button>
      </div>
    </aside>
  );
}
