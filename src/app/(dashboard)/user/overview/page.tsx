'use client';

import { 
  Shield, AlertTriangle, CheckCircle, Ban,
  ArrowUpRight, ArrowDownRight, MessageSquare, 
  Image as ImageIcon, Mic, Video, Link2, Clock, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const KPI_CARDS = [
  { label: 'Total Scans', value: '12,421', change: '+8.2%', up: true, icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { label: 'High Risk Detected', value: '142', change: '+12.4%', up: true, icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { label: 'Safe Content', value: '11,897', change: '+7.1%', up: true, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { label: 'Threats Blocked', value: '987', change: '-3.2%', up: false, icon: Ban, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
];

const SCANS = [
  { id: '1', type: 'SMS', snippet: 'Your bank account has been suspended. Verify immediately at...', time: '2m ago', risk: 'high' },
  { id: '2', type: 'Image', snippet: 'Screenshot_invoice_2024.png', time: '14m ago', risk: 'suspicious' },
  { id: '3', type: 'Link', snippet: 'https://hsbc-secure-verify.ru/login', time: '31m ago', risk: 'high' },
  { id: '4', type: 'Audio', snippet: 'Voicemail_unknown_caller.mp3', time: '1h ago', risk: 'safe' },
  { id: '5', type: 'SMS', snippet: "Hi! You've won a $500 Amazon gift card. Click to claim now...", time: '2h ago', risk: 'suspicious' },
  { id: '6', type: 'Video', snippet: 'viral_investment_tip.mp4', time: '3h ago', risk: 'high' },
];

const RISK_BREAKDOWN = [
  { label: 'SMS Scams', pct: 68, color: 'bg-red-500' },
  { label: 'Phishing Links', pct: 54, color: 'bg-orange-500' },
  { label: 'Fake Images', pct: 31, color: 'bg-yellow-500' },
  { label: 'Deepfake Video', pct: 12, color: 'bg-purple-500' },
];

const TYPE_ICONS: Record<string, any> = {
  SMS: MessageSquare,
  Image: ImageIcon,
  Audio: Mic,
  Video: Video,
  Link: Link2,
};

const RISK_STYLES: Record<string, string> = {
  high: 'bg-red-500/15 text-red-400 border-red-500/30',
  suspicious: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  safe: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
};

export default function UserOverviewPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">Overview</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Security Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Live Monitoring</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={cn("p-6 rounded-2xl border bg-[#111827]/60 backdrop-blur-xl glass-card-hover cursor-default", card.border)}
          >
            <div className="flex items-start justify-between mb-6">
              <div className={cn("p-2.5 rounded-xl", card.bg)}>
                <card.icon className={cn("w-5 h-5", card.color)} />
              </div>
              <div className={cn("flex items-center gap-1 text-[11px] font-bold", card.up ? 'text-emerald-400' : 'text-red-400')}>
                {card.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {card.change}
              </div>
            </div>
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-white tracking-tight">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Scans (70%) */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827]/60 backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-white/[0.05] flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Recent Scans</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Last 24 hours of threat analysis</p>
              </div>
              <Link href="/user/history" className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-white/[0.03]">
              {SCANS.map((scan, i) => {
                const Icon = TYPE_ICONS[scan.type];
                return (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-white/10 transition-all">
                      <Icon className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-blue-300 transition-colors">{scan.snippet}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-2 py-0.5 bg-white/[0.04] rounded-md border border-white/[0.04]">{scan.type}</span>
                        <span className="flex items-center gap-1 text-[10px] text-zinc-600"><Clock className="w-3 h-3" />{scan.time}</span>
                      </div>
                    </div>
                    <span className={cn("px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border", RISK_STYLES[scan.risk])}>
                      {scan.risk === 'high' ? 'High Risk' : scan.risk === 'suspicious' ? 'Suspicious' : 'Safe'}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Risk Insights (30%) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Risk Breakdown */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827]/60 backdrop-blur-xl p-6">
            <h3 className="text-sm font-bold text-white mb-1">Risk Insights</h3>
            <p className="text-xs text-zinc-500 mb-6">Threat category distribution</p>
            <div className="space-y-5">
              {RISK_BREAKDOWN.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-300">{item.label}</span>
                    <span className="text-xs font-bold text-white">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className={cn("h-full rounded-full", item.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action */}
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/15">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Run New Scan</p>
                <p className="text-xs text-zinc-500">Multi-modal detection</p>
              </div>
            </div>
            <Link
              href="/user"
              className="w-full block text-center py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
            >
              Start Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
