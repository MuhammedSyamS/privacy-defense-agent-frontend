'use client';

import { ScamEvent } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, ShieldAlert, Cpu, Activity, Database, 
  Globe, Zap, Fingerprint, MapPin, ArrowRight 
} from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface AnalyzerProps {
  event: ScamEvent | null;
}

export default function Analyzer({ event }: AnalyzerProps) {
  if (!event) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-16 text-center bg-zinc-50 rounded-[3rem] border border-zinc-200 border-dashed group cursor-default hover:bg-white hover:border-black transition-all">
        <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-zinc-200 flex items-center justify-center mb-8 shadow-xl shadow-black/5 group-hover:bg-black group-hover:scale-110 transition-all">
          <Fingerprint className="w-10 h-10 text-zinc-200 group-hover:text-white transition-all" />
        </div>
        <h3 className="text-2xl font-black text-black tracking-tighter uppercase italic">Synthesis Standby</h3>
        <p className="text-sm text-zinc-700 mt-3 max-w-xs mx-auto leading-relaxed font-bold uppercase tracking-widest">
          Select an inbound cluster to activate neural intercept.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={event.id}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -10 }}
        className="h-full flex flex-col gap-8"
      >
        <Card className="border-black border-2 shadow-2xl shadow-black/10 rounded-[3rem] overflow-hidden bg-white">
          <div className="p-10">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-10">
              <div className="flex items-center gap-8">
                <div className="p-6 rounded-[2rem] bg-black text-white shadow-2xl shadow-black/20 ring-4 ring-black/5">
                  <ShieldAlert className="w-12 h-12" />
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Intelligence Report</h2>
                    <Badge variant={event.risk_score > 75 ? 'danger' : 'success'} className="px-4 py-1 text-xs">
                      {event.risk_score > 75 ? 'Critical' : 'Verified'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[11px] font-black text-zinc-900 bg-zinc-100 px-3 py-1.5 rounded-xl border border-zinc-200 uppercase tracking-[0.2em]">
                      ID: {event.id.slice(0, 8)}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-black text-zinc-900 bg-zinc-100 px-3 py-1.5 rounded-xl border border-zinc-200 uppercase tracking-[0.2em]">
                      Node: {event.source}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-7xl font-black tracking-tighter text-black tabular-nums leading-none">
                  {event.risk_score}%
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black mt-3">Threat Vector</div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 hover:border-black transition-all group/card">
                <div className="flex items-center gap-3 text-black mb-6">
                  <Activity className="w-5 h-5 group-hover/card:animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Signal Matrix</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {(event.analysis?.signals || []).map((signal: any, i: number) => (
                    <span key={i} className="text-[10px] font-black px-3 py-2 bg-white text-black rounded-xl border border-zinc-200 shadow-sm hover:bg-black hover:text-white transition-all uppercase">
                      {typeof signal === 'string' ? signal : signal.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-black rounded-[2rem] border border-black shadow-xl shadow-black/10 hover:bg-zinc-900 transition-all group/card">
                <div className="flex items-center gap-3 text-white mb-6">
                  <Globe className="w-5 h-5 group-hover/card:rotate-12 transition-all" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Origin Intel</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tracking-tighter italic">Global</span>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-2">Synced</span>
                </div>
                <p className="text-[11px] font-black text-zinc-500 mt-4 uppercase tracking-[0.1em] leading-relaxed">
                  Correlated across 14,242 autonomous security nodes.
                </p>
              </div>
            </div>

            <div className="mt-8 p-10 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 relative overflow-hidden group hover:bg-white hover:border-black transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Database className="w-48 h-48 text-black" />
              </div>
              <h3 className="text-[11px] font-black uppercase text-zinc-500 mb-6 flex items-center gap-2 tracking-[0.3em]">
                <Fingerprint className="w-4 h-4 text-black" />
                Autonomous Synthesis
              </h3>
              <p className="text-2xl text-black leading-tight font-black relative z-10 tracking-tight italic">
                "{event.analysis?.explanation || event.agent_summary}"
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <Button variant="danger" className="flex-1 py-7 text-xs uppercase tracking-[0.3em] font-black rounded-[2rem] shadow-2xl shadow-red-600/20">
                Neuralize Threat
              </Button>
              <Button variant="outline" className="flex-1 py-7 text-xs uppercase tracking-[0.3em] font-black rounded-[2rem] border-2">
                Whitelist Cluster
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
