'use client';

import { ScamEvent } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, ShieldAlert, Cpu, Activity, Database, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface AnalyzerProps {
  event: ScamEvent | null;
}

export default function Analyzer({ event }: AnalyzerProps) {
  if (!event) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-zinc-100 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 border border-zinc-100">
          <Cpu className="w-8 h-8 text-zinc-300" />
        </div>
        <h3 className="text-xl font-bold text-black tracking-tight">Security Deep Scan</h3>
        <p className="text-sm text-zinc-500 mt-2 max-w-xs mx-auto leading-relaxed">
          Select a suspicious inbound event to initiate autonomous multi-modal analysis.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={event.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="h-full flex flex-col gap-6"
      >
        <Card className="border-zinc-200">
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-black text-white shadow-xl shadow-black/10">
                  <ShieldAlert className="w-10 h-10" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-black text-black tracking-tighter">Threat Analysis</h2>
                    <Badge variant={event.risk_score > 75 ? 'danger' : 'neutral'}>
                      {event.risk_score > 75 ? 'Critical' : 'Review'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100 uppercase tracking-widest">
                      ID: {event.id.slice(0, 8)}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100 uppercase tracking-widest">
                      Type: {event.source}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-black tracking-tighter text-black">
                  {event.risk_score}%
                </div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-black mt-1">Risk Probability</div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-2 text-black mb-4">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Signal Matrix</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.analysis?.signals.map((signal, i) => (
                    <span key={i} className="text-[10px] font-bold px-2.5 py-1.5 bg-zinc-100 text-black rounded-md border border-zinc-200">
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-2 text-black mb-4">
                  <Database className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Cluster Match</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-black">#829</span>
                </div>
                <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-tight">Active Financial Fraud Cluster</p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-zinc-50 rounded-2xl border border-zinc-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldAlert className="w-32 h-32 text-black" />
              </div>
              <h3 className="text-[10px] font-black uppercase text-zinc-400 mb-4 flex items-center gap-2 tracking-widest">
                <AlertCircle className="w-4 h-4 text-black" />
                Agent Intelligence Report
              </h3>
              <p className="text-lg text-black leading-snug font-semibold relative z-10 tracking-tight">
                {event.analysis?.explanation}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Button variant="primary" className="flex-1 py-5 text-xs uppercase tracking-widest font-black rounded-2xl">
                Block & Report
              </Button>
              <Button variant="outline" className="flex-1 py-5 text-xs uppercase tracking-widest font-black rounded-2xl border-zinc-200">
                Mark as Safe
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="mt-auto flex items-center justify-between text-[10px] text-zinc-400 font-black uppercase tracking-widest border-t border-zinc-100 pt-6 px-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
            Security node active (SGP-01)
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-black cursor-pointer transition-all">Audit Log</span>
            <span className="hover:text-black cursor-pointer transition-all">Export Report</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
