'use client';

import { Shield, LayoutDashboard, Database, Settings, Zap, Globe, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true, href: '/' },
    { icon: Zap, label: 'Threat Feed', href: '/threats' },
    { icon: Database, label: 'Memory Bank', href: '/memory' },
    { icon: Globe, label: 'Network', href: '/network' },
    { icon: Settings, label: 'Settings', href: '/settings' },
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
