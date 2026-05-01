'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Terminal, Search, Filter, ArrowUpRight, 
  Clock, Server, Database, Shield, 
  ChevronRight, Download, RefreshCw, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MOCK_LOGS = [
  { id: 'LOG-4821', time: '14:10:42.02', level: 'INFO', node: 'SGP-01', message: 'Neural synthesis complete for cluster TX-902.', status: 'SUCCESS' },
  { id: 'LOG-4820', time: '14:10:41.88', level: 'DEBUG', node: 'LON-04', message: 'OCR scanning attached image payload (PAT-002)...', status: 'PENDING' },
  { id: 'LOG-4819', time: '14:10:40.12', level: 'WARN', node: 'NYC-02', message: 'High latency detected in cluster correlation nodes.', status: 'RESOLVED' },
  { id: 'LOG-4818', time: '14:10:38.45', level: 'ERROR', node: 'SGP-01', message: 'Source IP blacklisting failed: Rate limit exceeded.', status: 'FAILED' },
  { id: 'LOG-4817', time: '14:10:35.22', level: 'INFO', node: 'SGP-01', message: 'New user deployment provisioned: USR-009.', status: 'SUCCESS' },
  { id: 'LOG-4816', time: '14:10:32.11', level: 'DEBUG', node: 'SGP-01', message: 'Syncing signature matrix with global database...', status: 'SUCCESS' },
];

export default function SystemLogsPage() {
  const [filter, setFilter] = useState('ALL');

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex items-end justify-between border-b border-zinc-100 pb-10">
        <div>
          <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic">System Logs</h1>
          <p className="text-zinc-700 mt-4 font-black uppercase tracking-[0.2em]">Real-time telemetry and forensic trace archives.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="px-8 border-2 flex gap-2">
            <Download className="w-4 h-4" />
            Export Archive
          </Button>
          <Button className="rounded-2xl px-10 py-7 shadow-2xl shadow-black/30 flex gap-2">
            <RefreshCw className="w-4 h-4" />
            Live Stream
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Statistics Bar */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Event Throughput', value: '142/s', icon: Server, color: 'text-emerald-600' },
            { label: 'Storage Latency', value: '4ms', icon: Database, color: 'text-black' },
            { label: 'System Uptime', value: '99.99%', icon: Shield, color: 'text-emerald-600' },
            { label: 'Unresolved Errors', value: '2', icon: AlertCircle, color: 'text-red-600' },
          ].map((stat, i) => (
            <Card key={i} className="p-8 border-zinc-200 bg-white shadow-xl shadow-black/5 hover:border-black transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-zinc-50 rounded-lg group-hover:bg-black group-hover:text-white transition-all">
                  <stat.icon className="w-4 h-4" />
                </div>
                <Badge variant="neutral" className="text-[8px]">Real-time</Badge>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
              <h4 className={`text-3xl font-black mt-2 tracking-tighter ${stat.color}`}>{stat.value}</h4>
            </Card>
          ))}
        </div>

        {/* Log Stream */}
        <div className="lg:col-span-12">
          <Card className="rounded-[2.5rem] border-zinc-200 shadow-xl shadow-black/5 overflow-hidden bg-white">
            <div className="p-8 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/50">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-zinc-200 shadow-sm w-80 group">
                  <Search className="w-4 h-4 text-zinc-400" />
                  <input type="text" placeholder="Grep trace logs..." className="flex-1 text-[10px] font-black uppercase tracking-widest outline-none" />
                </div>
                <div className="flex gap-2">
                  {['ALL', 'INFO', 'WARN', 'ERROR'].map((lvl) => (
                    <button 
                      key={lvl}
                      onClick={() => setFilter(lvl)}
                      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${filter === lvl ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-zinc-400 border-zinc-100 hover:border-black hover:text-black'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl border-zinc-200"><Filter className="w-3.5 h-3.5" /></Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-50 bg-white">
                    {['Trace ID', 'Timestamp', 'Level', 'Execution Node', 'Message', 'Status'].map((h) => (
                      <th key={h} className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 font-mono">
                  {MOCK_LOGS.map((log, i) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-zinc-50/80 transition-all cursor-default"
                    >
                      <td className="px-8 py-6 text-xs font-bold text-zinc-400">#{log.id}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-black text-black">
                          <Clock className="w-3 h-3 text-zinc-300" />
                          {log.time}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <Badge variant={log.level === 'ERROR' ? 'danger' : log.level === 'WARN' ? 'warning' : 'neutral'} className="text-[8px] font-black">
                          {log.level}
                        </Badge>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                          {log.node}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-black group-hover:underline decoration-zinc-300 underline-offset-4">{log.message}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'FAILED' ? 'text-red-600' : 'text-emerald-600'}`}>
                          {log.status}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 border-t border-zinc-50 bg-zinc-50/30 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.3em]">Stream: Active-Node-Sync</p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-black flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-ping" />
                  Live Trace
                </span>
                <ChevronRight className="w-4 h-4 text-zinc-300" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
