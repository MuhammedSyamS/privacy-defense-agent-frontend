'use client';

import {
  LayoutDashboard, Search, FileText, History, BarChart3,
  Key, Settings, Shield, ChevronLeft, ChevronRight,
  LogOut, User, Users, ShieldAlert, Activity
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';

const USER_NAV = [
  { icon: Search, label: 'Scan Hub', href: '/user', exact: true },
  { icon: LayoutDashboard, label: 'Overview', href: '/user/overview' },
  { icon: History, label: 'Threat History', href: '/user/history' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

const ADMIN_NAV = [
  { icon: Activity, label: 'Global Monitor', href: '/admin/monitor' },
  { icon: ShieldAlert, label: 'Pattern Matrix', href: '/admin' },
  { icon: Users, label: 'User Intel', href: '/admin/users' },
  { icon: FileText, label: 'System Logs', href: '/admin/logs' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, role, signOut } = useAuth();

  const isAdmin = role === 'admin';

  return (
    <aside className={cn(
      "h-screen border-r border-white/5 bg-[#0D121F] transition-all duration-300 flex flex-col z-50 sticky top-0",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Brand */}
      <div className="h-16 flex items-center px-5 border-b border-white/5 gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-white tracking-tight text-base italic">ScamShield Agent</span>
        )}
      </div>

      {/* User Nav */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {!isCollapsed && (
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-3">User</p>
        )}
        {USER_NAV.map((item, i) => {
          const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          return (
            <Link key={i} href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                isActive ? "bg-blue-600/10 text-blue-400" : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
              )}
            >
              <item.icon className={cn("w-[18px] h-[18px] shrink-0", isActive && "text-blue-400")} />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              {isActive && (
                <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-blue-500 rounded-r-full" />
              )}
            </Link>
          );
        })}

        {/* Admin Nav — only visible if role is admin */}
        {isAdmin && (
          <>
            <div className="my-4 border-t border-white/5" />
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-3 flex items-center gap-2">
                Admin
                <span className="px-1.5 py-0.5 text-[8px] bg-red-500/15 text-red-400 rounded-md border border-red-500/30 font-bold">Elevated</span>
              </p>
            )}
            {ADMIN_NAV.map((item, i) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link key={i} href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                    isActive ? "bg-blue-600/10 text-blue-400" : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
                  )}
                >
                  <item.icon className={cn("w-[18px] h-[18px] shrink-0", isActive && "text-blue-400")} />
                  {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/5 space-y-2">
        {!isCollapsed && user && (
          <div className="px-3 py-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.email}</p>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{role ?? 'user'}</p>
            </div>
            <button onClick={signOut} className="text-zinc-600 hover:text-red-400 transition-colors" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-zinc-600 hover:text-white hover:bg-white/[0.05] transition-all"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : (
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <ChevronLeft className="w-3.5 h-3.5" /> Collapse
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
