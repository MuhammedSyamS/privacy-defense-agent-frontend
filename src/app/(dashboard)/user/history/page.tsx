'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Shield, Search, Filter, Calendar, ArrowUpRight, MessageSquare, Image as ImageIcon, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_HISTORY = [
  { id: 'SC-1024', date: '2024-10-24 14:02', type: 'text', sender: '+44 7700 900077', risk: 92, status: 'Blocked', content: 'URGENT: Your HSBC account has been compromised. Verify here: https://hsbc-verify.net' },
  { id: 'SC-1023', date: '2024-10-23 09:45', type: 'text', sender: 'Netflix', risk: 45, status: 'Analyzed', content: 'Your subscription is about to expire. Renew today.' },
  { id: 'SC-1022', date: '2024-10-22 18:30', type: 'image', sender: 'Unknown', risk: 12, status: 'Safe', content: 'Family_Photo_2024.jpg' },
  { id: 'SC-1021', date: '2024-10-21 11:20', type: 'audio', sender: '+1 202 555 0192', risk: 98, status: 'Neutralized', content: 'Voice clip: Urgent financial aid request' },
  { id: 'SC-1020', date: '2024-10-20 22:15', type: 'text', sender: 'Amazon', risk: 65, status: 'Intercepted', content: 'Unusual login attempt on your account. Click to secure.' },
];

export default function HistoryPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'text': return <MessageSquare className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'audio': return <Phone className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex items-end justify-between border-b border-white/5 pb-10">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Security History</h1>
          <p className="text-zinc-500 mt-4 font-bold uppercase tracking-[0.2em] text-sm">Audit and review past security interventions.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="px-8 border-white/10 hover:bg-white/5 text-white">Generate Report</Button>
          <Button className="rounded-2xl px-10 py-7 bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/20">Download Logs</Button>
        </div>
      </div>

      <Card className="rounded-[2.5rem] border-white/5 shadow-2xl bg-white/[0.02] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/5 shadow-sm w-full max-w-lg group">
            <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-white transition-all" />
            <input type="text" placeholder="Search by sender, content, or ID..." className="flex-1 bg-transparent text-white text-[10px] font-bold uppercase tracking-widest outline-none placeholder:text-zinc-600" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/5 shadow-sm cursor-pointer hover:bg-white/[0.05] transition-all">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">Last 30 Days</span>
            </div>
            <Button variant="secondary" size="sm" className="rounded-xl border border-white/5 bg-white/[0.03] text-white hover:bg-white/10"><Filter className="w-3.5 h-3.5" /></Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                {['ID', 'Date', 'Type', 'Sender', 'Risk', 'Status', ''].map((h) => (
                  <th key={h} className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_HISTORY.map((item, i) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/[0.02] transition-all cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">#{item.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-xs font-medium text-white">{item.date.split(' ')[0]}</div>
                    <div className="text-[9px] text-zinc-500 font-bold uppercase">{item.date.split(' ')[1]}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="p-2 bg-white/5 rounded-lg text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all w-fit">
                      {getIcon(item.type)}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-white">{item.sender}</div>
                    <div className="text-[10px] text-zinc-500 truncate max-w-[200px] font-medium mt-0.5 italic">"{item.content}"</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.risk > 75 ? 'bg-red-600' : item.risk > 40 ? 'bg-amber-500' : 'bg-emerald-600'}`}
                          style={{ width: `${item.risk}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-white tabular-nums">{item.risk}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge variant={item.risk > 75 ? 'danger' : item.risk > 40 ? 'warning' : 'success'} className="group-hover:scale-105 transition-all">
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-all" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Showing 1-5 of 1,242 entries</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg px-4 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5">Previous</Button>
            <Button variant="outline" size="sm" className="rounded-lg px-4 border-white/5 bg-white/5 text-white">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
