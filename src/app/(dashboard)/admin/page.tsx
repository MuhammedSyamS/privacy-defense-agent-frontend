'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Shield, Plus, Database, Terminal, Search, Trash2, Edit3, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const MOCK_PATTERNS = [
  { id: 'PAT-001', name: 'HSBC Link Obfuscation', type: 'Phishing', risk: 'High', matches: 1242, status: 'Active' },
  { id: 'PAT-002', name: 'Urgent Netflix Renewal', type: 'Credential Theft', risk: 'Critical', matches: 842, status: 'Active' },
  { id: 'PAT-003', name: 'Crypto Giveaway Bot', type: 'Social Engineering', risk: 'High', matches: 321, status: 'Testing' },
  { id: 'PAT-004', name: 'Deepfake Voice Pattern #12', type: 'Vishing', risk: 'Critical', matches: 42, status: 'Active' },
];

export default function PatternMatrixPage() {
  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex items-end justify-between border-b border-zinc-100 pb-10">
        <div>
          <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic">Pattern Matrix</h1>
          <p className="text-zinc-700 mt-4 font-black uppercase tracking-[0.2em]">Manage AI heuristics and security signatures.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="px-8 border-2">Export Signatures</Button>
          <Button className="rounded-2xl px-10 py-7 shadow-2xl shadow-black/30 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Pattern
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {[
          { label: 'Active Patterns', value: '1,242', icon: Database, color: 'text-black' },
          { label: 'Heuristic Confidence', value: '98.4%', icon: Cpu, color: 'text-emerald-600' },
          { label: 'Detection Rate', value: '99.9%', icon: Shield, color: 'text-emerald-600' },
          { label: 'Sync Latency', value: '14ms', icon: Terminal, color: 'text-black' },
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-zinc-200 bg-white hover:bg-black group transition-all cursor-default">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-zinc-100 rounded-2xl group-hover:bg-zinc-800 transition-all">
                <stat.icon className="w-5 h-5 text-black group-hover:text-white" />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400">{stat.label}</p>
            <h4 className={cn("text-3xl font-black mt-2 tracking-tighter group-hover:text-white transition-colors", stat.color)}>{stat.value}</h4>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-zinc-200 shadow-xl shadow-black/5 overflow-hidden">
        <div className="p-8 bg-zinc-50/50 border-b border-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-zinc-200 shadow-sm w-full max-w-md">
            <Search className="w-4 h-4 text-zinc-400" />
            <input type="text" placeholder="Search patterns, types, or risk levels..." className="flex-1 text-[10px] font-black uppercase tracking-widest outline-none" />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="neutral" className="bg-white">All Types</Badge>
            <Badge variant="neutral" className="bg-white">Risk: Critical</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-50 bg-white">
                {['Pattern Name', 'Type', 'Matches', 'Risk', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {MOCK_PATTERNS.map((pattern, i) => (
                <motion.tr 
                  key={pattern.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-zinc-50 transition-all"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className={`w-4 h-4 ${pattern.risk === 'Critical' ? 'text-red-600' : 'text-amber-500'}`} />
                      <div>
                        <span className="text-sm font-black text-black">{pattern.name}</span>
                        <p className="text-[9px] text-zinc-400 font-bold uppercase mt-0.5">{pattern.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge variant="white" className="border-zinc-200">{pattern.type}</Badge>
                  </td>
                  <td className="px-8 py-6 font-bold tabular-nums text-sm">{pattern.matches.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <Badge variant={pattern.risk === 'Critical' ? 'danger' : 'warning'}>{pattern.risk}</Badge>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${pattern.status === 'Active' ? 'bg-emerald-600' : 'bg-zinc-300'}`} />
                      <span className="text-xs font-bold uppercase">{pattern.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 hover:bg-black hover:text-white rounded-lg transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button className="p-2 hover:bg-red-600 hover:text-white rounded-lg transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
