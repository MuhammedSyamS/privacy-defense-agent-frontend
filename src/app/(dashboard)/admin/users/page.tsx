'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, Search, MoreHorizontal, Shield, Mail, Calendar, Activity, ArrowRight, UserPlus, Filter, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_USERS = [
  { id: 'USR-001', name: 'Muhammed Syam', email: 'syam@enterprise.com', role: 'admin', status: 'Active', scans: 429, lastActive: '2m ago', threatLevel: 'Low' },
  { id: 'USR-002', name: 'Alice Smith', email: 'alice@work.com', role: 'user', status: 'Active', scans: 124, lastActive: '14m ago', threatLevel: 'Medium' },
  { id: 'USR-003', name: 'Bob Johnson', email: 'bob@gmail.com', role: 'user', status: 'Suspended', scans: 8, lastActive: '2 days ago', threatLevel: 'N/A' },
  { id: 'USR-004', name: 'Sarah Wilson', email: 'sarah@tech.co', role: 'user', status: 'Active', scans: 56, lastActive: '1h ago', threatLevel: 'Low' },
];

export default function UserManagementPage() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      <div className="flex items-end justify-between border-b border-zinc-100 pb-10">
        <div>
          <h1 className="text-6xl font-black text-black tracking-tighter uppercase italic">User Intelligence</h1>
          <p className="text-zinc-700 mt-4 font-black uppercase tracking-[0.2em] flex items-center gap-2">
            Directory Status • <span className="text-black underline underline-offset-4 decoration-2">1,242 Identities Secured</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="px-8 border-2 font-black uppercase tracking-widest text-[10px]">Permission Audit</Button>
          <Button className="rounded-2xl px-10 py-7 shadow-2xl shadow-black/30 flex items-center gap-3 font-black uppercase tracking-widest text-[10px]">
            <UserPlus className="w-5 h-5" />
            Provision Node
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {[
          { label: 'Identities Monitored', value: '1,242', icon: Users, color: 'text-black' },
          { label: 'Neutralized Scams', value: '42.8k', icon: ShieldCheck, color: 'text-emerald-600' },
          { label: 'Active Sessions', value: '84', icon: Zap, color: 'text-amber-500' },
          { label: 'Auth Success Rate', value: '99.9%', icon: Activity, color: 'text-emerald-600' },
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-zinc-200 bg-white hover:bg-black group transition-all cursor-default shadow-xl shadow-black/5">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 bg-zinc-100 rounded-2xl group-hover:bg-zinc-800 transition-all">
                <stat.icon className="w-5 h-5 text-black group-hover:text-white" />
              </div>
              <Badge variant="neutral" className="text-[8px] group-hover:bg-zinc-900 group-hover:text-white transition-all">Real-time</Badge>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400">{stat.label}</p>
            <h4 className={`text-4xl font-black mt-2 tracking-tighter group-hover:text-white transition-colors ${stat.color}`}>{stat.value}</h4>
          </Card>
        ))}
      </div>

      <Card className="rounded-[3.5rem] border-zinc-200 shadow-2xl shadow-black/5 overflow-hidden bg-white">
        <div className="p-10 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/30">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-zinc-200 shadow-sm w-96 group">
              <Search className="w-4 h-4 text-zinc-400 group-focus-within:text-black transition-all" />
              <input type="text" placeholder="Identity Grep..." className="flex-1 text-[10px] font-black uppercase tracking-widest outline-none bg-transparent" />
            </div>
            <div className="flex gap-2">
              <Badge variant="white" className="border-zinc-200 px-4 py-2 cursor-pointer hover:border-black transition-all">All Roles</Badge>
              <Badge variant="white" className="border-zinc-200 px-4 py-2 cursor-pointer hover:border-black transition-all">Risk: Low</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl border-zinc-200"><Filter className="w-4 h-4" /></Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-50 bg-white">
                {['Identity', 'Auth Status', 'Intel Feed', 'Threat Scans', 'Role', 'Actions'].map((h) => (
                  <th key={h} className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {MOCK_USERS.map((user, i) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-zinc-50/80 transition-all cursor-pointer"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-black font-black uppercase group-hover:bg-black group-hover:text-white transition-all shadow-xl shadow-black/5">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-base font-black text-black group-hover:underline decoration-2 underline-offset-4">{user.name}</span>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1 tracking-tight flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-600 shadow-lg shadow-emerald-500/30 animate-pulse' : 'bg-red-600'}`} />
                      <span className="text-[11px] font-black uppercase tracking-tighter">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3 text-[10px] font-black text-zinc-900 uppercase tracking-widest">
                      <Activity className="w-4 h-4 text-zinc-300" />
                      {user.lastActive}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="text-xl font-black text-black tabular-nums">{user.scans}</div>
                    <div className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.2em] mt-1">Interventions</div>
                  </td>
                  <td className="px-10 py-8">
                    <Badge variant={user.role === 'admin' ? 'primary' : 'neutral'} className="px-4 py-1.5 text-[9px] font-black group-hover:scale-105 transition-all">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-10 py-8">
                    <button className="p-3 hover:bg-black hover:text-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-black"><MoreHorizontal className="w-5 h-5" /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-10 bg-zinc-50/50 border-t border-zinc-50 text-center">
          <button className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-black transition-all flex items-center justify-center gap-3 group mx-auto">
            Load Forensics Directory
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </Card>
    </div>
  );
}
