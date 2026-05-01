'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Shield, Zap, Globe, Activity, Search, Filter, 
  ArrowUpRight, AlertTriangle, ShieldAlert, CheckCircle,
  MapPin, Radio, Cpu, Network, MessageSquare, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const MOCK_LIVE_EVENTS = [
  { id: 'TX-902', source: 'SMS', country: 'US', risk: 89, type: 'Banking Phish', status: 'Blocked', time: 'Just now' },
  { id: 'TX-901', source: 'Email', country: 'UK', risk: 42, type: 'Marketing Spam', status: 'Analyzed', time: '2m' },
  { id: 'TX-900', source: 'Audio', country: 'SG', risk: 96, type: 'Deepfake Call', status: 'Isolated', time: '5m' },
  { id: 'TX-899', source: 'SMS', country: 'IN', risk: 78, type: 'Lottery Scam', status: 'Intercepted', time: '12m' },
];

export default function AdminMonitorPage() {
  const [events, setEvents] = useState(MOCK_LIVE_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        id: `TX-${Math.floor(Math.random() * 1000)}`,
        source: ['SMS', 'Email', 'Audio', 'Image'][Math.floor(Math.random() * 4)],
        country: ['US', 'UK', 'DE', 'IN', 'JP'][Math.floor(Math.random() * 5)],
        risk: Math.floor(Math.random() * 100),
        type: 'Suspicious Signal',
        status: 'Intercepted',
        time: 'Just now'
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 10)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Header Section */}
      <div className="flex items-end justify-between border-b border-zinc-100 pb-10">
        <div>
          <h1 className="text-6xl font-black text-black tracking-tighter uppercase italic">Global Monitor</h1>
          <p className="text-zinc-700 mt-4 font-black uppercase tracking-[0.2em] flex items-center gap-3">
            Admin Console • <span className="text-emerald-600">L3 Intercept Stream Active</span>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="px-8 border-2 font-black uppercase tracking-widest text-[10px]">Forensic Report</Button>
          <Button className="rounded-2xl px-12 py-7 shadow-2xl shadow-black/30 font-black uppercase tracking-widest text-[10px]">Global Purge</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Intercept Map Simulation */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          <Card className="rounded-[3.5rem] border-zinc-200 bg-white shadow-2xl shadow-black/5 overflow-hidden p-2 relative group hover:border-black transition-all">
            <div className="bg-zinc-50 rounded-[3rem] h-[450px] relative overflow-hidden">
              {/* Mock Map Grid */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-80 h-80 text-zinc-100 animate-[spin_60s_linear_infinite]" />
              </div>

              {/* Ping Simulations */}
              <AnimatePresence>
                {events.slice(0, 4).map((e, i) => (
                  <motion.div 
                    key={e.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute"
                    style={{ 
                      top: `${20 + (i * 15)}%`, 
                      left: `${30 + (i * 12)}%` 
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-4 h-4 rounded-full shadow-2xl relative",
                        e.risk > 75 ? "bg-red-600" : "bg-emerald-600"
                      )}>
                        <span className={cn(
                          "absolute inset-0 rounded-full animate-ping opacity-50",
                          e.risk > 75 ? "bg-red-400" : "bg-emerald-400"
                        )} />
                      </div>
                      <div className="mt-2 bg-black text-white text-[8px] font-black uppercase px-2 py-1 rounded-md shadow-xl whitespace-nowrap">
                        {e.country} • {e.risk}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Map UI Overlay */}
              <div className="absolute top-8 left-8">
                <div className="p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200 shadow-xl">
                  <div className="flex items-center gap-3 text-black mb-4">
                    <Radio className="w-4 h-4 animate-pulse text-emerald-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Signal Nodes</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span className="text-[9px] font-bold text-zinc-600 uppercase">SGP-Cluster-01 (Stable)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span className="text-[9px] font-bold text-zinc-600 uppercase">NYC-Cluster-04 (Synced)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[9px] font-bold text-zinc-600 uppercase">LON-Cluster-02 (High Load)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-black tracking-tighter uppercase italic">Neural Signal Matrix</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-2 italic">Real-time heuristics correlation active.</p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-black tabular-nums tracking-tighter">14,242</div>
                  <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest mt-1">Nodes Active</p>
                </div>
                <div className="h-10 w-px bg-zinc-100" />
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-600 tabular-nums tracking-tighter">0.02ms</div>
                  <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest mt-1">Sync Latency</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Table Section */}
          <Card className="rounded-[3rem] border-zinc-200 shadow-xl shadow-black/5 overflow-hidden bg-white">
            <div className="p-8 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black rounded-2xl text-white">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-black tracking-tighter uppercase">Live Intercepts</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-zinc-200 shadow-sm">
                  <Search className="w-3.5 h-3.5 text-zinc-400" />
                  <input type="text" placeholder="Grep Feed..." className="text-[10px] font-black uppercase tracking-widest outline-none bg-transparent" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-50 bg-white">
                    {['Event ID', 'Source', 'Region', 'Type', 'Risk Score', 'Action'].map((h) => (
                      <th key={h} className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  <AnimatePresence mode="popLayout">
                    {events.map((event) => (
                      <motion.tr 
                        key={event.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group cursor-pointer hover:bg-zinc-50 transition-all"
                      >
                        <td className="px-8 py-6">
                          <span className="text-sm font-black text-black group-hover:underline">#{event.id}</span>
                          <p className="text-[9px] text-zinc-400 font-bold uppercase mt-1">{event.time}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            {event.source === 'SMS' ? <MessageSquare className="w-3 h-3 text-zinc-400" /> : <Phone className="w-3 h-3 text-zinc-400" />}
                            <Badge variant="white" className="border-zinc-200 text-[9px]">{event.source}</Badge>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 font-black text-[10px] uppercase">
                            <Globe className="w-3.5 h-3.5 text-zinc-400" />
                            {event.country}
                          </div>
                        </td>
                        <td className="px-8 py-6 font-bold text-sm">{event.type}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1 w-16 bg-zinc-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${event.risk > 75 ? 'bg-red-600' : 'bg-emerald-600'}`}
                                style={{ width: `${event.risk}%` }}
                              />
                            </div>
                            <span className={cn("text-xs font-black tabular-nums", event.risk > 75 ? "text-red-600" : "text-emerald-600")}>{event.risk}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <button className="text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-all">Intercept</button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Intelligence Panel */}
        <div className="lg:col-span-4 flex flex-col gap-10">
          <Card className="rounded-[3rem] bg-black text-white p-12 relative overflow-hidden shadow-2xl shadow-black/30 border-4 border-black hover:border-zinc-800 transition-all group">
            <div className="relative z-10">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-10 border-b border-zinc-800 pb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Neural Stats
              </h3>
              <div className="space-y-10">
                <div>
                  <div className="text-6xl font-black tracking-tighter italic tabular-nums leading-none">42.8k</div>
                  <p className="text-[10px] font-black uppercase text-zinc-500 mt-3 tracking-widest">Analyzed / Hr</p>
                </div>
                <div>
                  <div className="text-6xl font-black tracking-tighter italic text-emerald-500 tabular-nums leading-none">1.2k</div>
                  <p className="text-[10px] font-black uppercase text-zinc-500 mt-3 tracking-widest">Blocked / Hr</p>
                </div>
              </div>
              
              <div className="mt-16 p-8 bg-zinc-900 rounded-[2rem] border border-zinc-800 relative overflow-hidden group/alert hover:bg-zinc-800 transition-all">
                <ShieldAlert className="w-12 h-12 text-red-600 opacity-20 absolute -right-4 -bottom-4 group-hover/alert:scale-110 transition-all" />
                <h4 className="text-[10px] font-black uppercase text-white mb-3 flex items-center gap-2 tracking-widest">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                  Node Alert
                </h4>
                <p className="text-sm font-bold text-zinc-400 leading-snug">
                  Credential stuffing surge detected from <span className="text-white">SEA-Node-04</span>. Isolation protocol enabled.
                </p>
              </div>
            </div>
            {/* Mesh Background */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] [background-size:20px_20px]" />
          </Card>

          <Card className="rounded-[3rem] border-zinc-200 p-10 bg-white shadow-xl shadow-black/5 hover:border-black transition-all group">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-2">
              <Network className="w-4 h-4 text-black" />
              Cluster Sync
            </h3>
            <div className="space-y-6">
              {[
                { node: 'SGP-SCAN-01', load: 42, status: 'Active' },
                { node: 'LON-NODE-04', load: 88, status: 'Critical' },
                { node: 'NYC-CENTRAL-2', load: 12, status: 'Idle' },
                { node: 'TKY-SYNC-01', load: 35, status: 'Active' },
              ].map((node, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-zinc-50 rounded-2xl border border-zinc-100 group-hover:bg-white group-hover:border-zinc-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      node.status === 'Active' ? 'bg-emerald-600' : node.status === 'Critical' ? 'bg-red-600 animate-pulse' : 'bg-zinc-300'
                    )} />
                    <span className="text-[11px] font-black uppercase tracking-tight text-black">{node.node}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black tabular-nums text-black">{node.load}% Load</div>
                    <div className="text-[8px] font-bold uppercase text-zinc-400 tracking-widest mt-0.5">{node.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-10 text-[10px] font-black uppercase tracking-widest border-2 py-4 rounded-2xl">
              Node Management
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
