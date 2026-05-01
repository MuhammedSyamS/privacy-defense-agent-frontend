'use client';

import { ScamEvent } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, ShieldAlert, Cpu, Activity, Database } from 'lucide-react';

interface AnalyzerProps {
  event: ScamEvent | null;
}

export default function Analyzer({ event }: AnalyzerProps) {
  if (!event) {
    return (
      <div className="h-full flex flex-col items-center justify-center glass rounded-3xl p-12 text-center">
        <Cpu className="w-16 h-16 text-muted-foreground/20 mb-4 animate-pulse" />
        <h3 className="text-xl font-semibold text-muted-foreground">Select an event to start deep analysis</h3>
        <p className="text-sm text-muted-foreground/60 mt-2 max-w-xs">
          Our autonomous agent is continuously monitoring signals for suspicious patterns.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={event.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="h-full flex flex-col gap-6 glass rounded-3xl p-8 overflow-y-auto custom-scrollbar"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${
              event.risk_score > 75 ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
            }`}>
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Threat Analysis</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs uppercase font-mono px-2 py-0.5 bg-white/5 rounded text-muted-foreground border border-white/10">
                  ID: {event.id.slice(0, 8)}
                </span>
                <span className="text-xs uppercase font-mono px-2 py-0.5 bg-white/5 rounded text-muted-foreground border border-white/10">
                  Source: {event.source}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold font-mono text-red-500">{event.risk_score}%</div>
            <div className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">Risk Probability</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Signal Matrix</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.analysis?.signals.map((signal, i) => (
                <span key={i} className="text-[10px] px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">
                  {signal}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <Database className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Confidence</span>
            </div>
            <div className="text-2xl font-bold font-mono">{(event.analysis?.confidence || 0) * 100}%</div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(event.analysis?.confidence || 0) * 100}%` }}
                className="h-full bg-green-500" 
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-primary">
              <Database className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Memory Scan</span>
            </div>
            <span className="text-[10px] font-bold text-primary animate-pulse">MATCH DETECTED</span>
          </div>
          <p className="text-xs text-primary/80">
            Current signal pattern matches <span className="font-bold underline">Scam Cluster #829</span> (Financial Phishing / Netflix Spoofer). 
            Previously neutralized in 12,402 instances globally.
          </p>
        </div>

        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
          <h3 className="text-sm font-bold uppercase mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            Agent Findings
          </h3>
          <p className="text-lg leading-relaxed text-foreground/90 font-medium">
            {event.analysis?.explanation}
          </p>
        </div>

        <div className="mt-auto">
          <h3 className="text-xs font-bold uppercase text-muted-foreground mb-4">Recommended Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <XCircle className="w-5 h-5" />
              Block Sender
            </button>
            <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
              <CheckCircle2 className="w-5 h-5" />
              Flag as Safe
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
