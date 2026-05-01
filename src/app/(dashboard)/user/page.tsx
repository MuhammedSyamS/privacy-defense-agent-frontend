'use client';

import { 
  Shield, Search, Globe, MessageSquare, Mail, 
  Image as ImageIcon, Mic, Video, FileText, 
  ArrowRight, Zap, ShieldAlert, Activity, 
  Lock, LayoutGrid, Clock, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const SCAN_TYPES = [
  { 
    id: 'link', 
    label: 'Link / URL', 
    description: 'Verify phishing links and malicious redirects', 
    icon: Globe, 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/10', 
    border: 'border-blue-500/20',
    href: '/user/analyzer?type=link'
  },
  { 
    id: 'sms', 
    label: 'SMS / Message', 
    description: 'Analyze suspicious texts and SMS scams', 
    icon: MessageSquare, 
    color: 'text-purple-400', 
    bg: 'bg-purple-500/10', 
    border: 'border-purple-500/20',
    href: '/user/analyzer?type=sms'
  },
  { 
    id: 'email', 
    label: 'Email Content', 
    description: 'Deep dive into headers and phishing attempts', 
    icon: Mail, 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10', 
    border: 'border-amber-500/20',
    href: '/user/analyzer?type=email'
  },
  { 
    id: 'image', 
    label: 'Image / OCR', 
    description: 'Detect scams in screenshots and fake IDs', 
    icon: ImageIcon, 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-500/10', 
    border: 'border-emerald-500/20',
    href: '/user/analyzer?type=image'
  },
  { 
    id: 'audio', 
    label: 'Audio / Voice', 
    description: 'AI Voice cloning and deepfake detection', 
    icon: Mic, 
    color: 'text-rose-400', 
    bg: 'bg-rose-500/10', 
    border: 'border-rose-500/20',
    href: '/user/analyzer?type=audio'
  },
  { 
    id: 'video', 
    label: 'Video / Deepfake', 
    description: 'Synthetic media and deepfake video audit', 
    icon: Video, 
    color: 'text-cyan-400', 
    bg: 'bg-cyan-500/10', 
    border: 'border-cyan-500/20',
    href: '/user/analyzer?type=video'
  },
  { 
    id: 'file', 
    label: 'Document / PDF', 
    description: 'Scan malicious scripts in PDFs and docs', 
    icon: FileText, 
    color: 'text-orange-400', 
    bg: 'bg-orange-500/10', 
    border: 'border-orange-500/20',
    href: '/user/analyzer?type=file'
  },
  { 
    id: 'website', 
    label: 'Website Audit', 
    description: 'Full domain security and SSL verification', 
    icon: Shield, 
    color: 'text-indigo-400', 
    bg: 'bg-indigo-500/10', 
    border: 'border-indigo-500/20',
    href: '/user/analyzer?type=website'
  },
];

const RECENT_ALERTS = [
  { title: 'Phishing: HSBC Bank UK', risk: 'Critical', time: '12m ago' },
  { title: 'Fake SMS: Amazon Delivery', risk: 'High', time: '45m ago' },
  { title: 'Suspicious URL: crypto-login.net', risk: 'High', time: '1h ago' },
];

export default function ScanHubPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Hero Section */}
      <section className="relative rounded-[2.5rem] overflow-hidden border border-white/[0.05] bg-[#0D121F]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="relative px-8 py-16 md:px-12 md:py-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
          >
            <Zap className="w-3.5 h-3.5" />
            Next-Gen Neural Intercept
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            Scan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic">Anything</span>. <br className="hidden md:block" /> Detect <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500 italic">Everything</span>.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base md:text-lg max-w-2xl mb-12 font-medium"
          >
            Protect your digital life with our multi-modal autonomous security agent. 
            From phishing links to deepfake audio, we've got you covered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl group-focus-within:opacity-100 opacity-0 transition-opacity" />
            <div className="relative flex items-center p-2 bg-[#161C2C] border border-white/10 rounded-2xl shadow-2xl">
              <Search className="w-5 h-5 text-zinc-500 ml-4 shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Paste URL, text, or drop file to intercept..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-zinc-600 px-4 py-3 text-sm font-medium"
              />
              <Link
                href={`/user/analyzer?q=${encodeURIComponent(searchQuery)}`}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                Scan Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight italic">Scan Modalities</h2>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Select intercept vector</p>
            </div>
            <div className="flex gap-2">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-zinc-500">
                <LayoutGrid className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCAN_TYPES.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={type.href} className={cn(
                  "group block p-6 rounded-[2rem] border transition-all hover:scale-[1.02] active:scale-98 bg-[#111827]/40 backdrop-blur-xl",
                  type.border,
                  "hover:bg-white/[0.02]"
                )}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn("p-4 rounded-2xl shadow-inner", type.bg)}>
                      <type.icon className={cn("w-6 h-6", type.color)} />
                    </div>
                    <div className="p-2 rounded-full bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{type.label}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{type.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Intelligence Pulse */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-8 rounded-[2.5rem] border border-white/[0.06] bg-[#111827]/60 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Live Threat Feed</h3>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Global Intercepts</p>
              </div>
            </div>

            <div className="space-y-4">
              {RECENT_ALERTS.map((alert, i) => (
                <div key={i} className="group p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all cursor-default">
                  <div className="flex items-start justify-between mb-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                      alert.risk === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    )}>
                      {alert.risk}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
                      <Clock className="w-3 h-3" /> {alert.time}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{alert.title}</p>
                </div>
              ))}
            </div>

            <Link href="/user/history" className="mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all group">
              View Threat Database <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="p-8 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/5 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity rotate-12">
              <Activity className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative">
              <h3 className="text-sm font-bold text-white mb-2">Neural Protection Active</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">Your autonomous agent is monitoring 24/7. No threats detected in the last 4 hours.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Agent Sync: 99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
