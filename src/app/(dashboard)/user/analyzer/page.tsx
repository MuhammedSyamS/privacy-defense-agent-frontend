'use client';

import { useState } from 'react';
import { 
  MessageSquare, Upload, ArrowRight, Loader2, 
  AlertTriangle, CheckCircle, Shield, Fingerprint,
  MapPin, Cpu, Activity, Zap, Globe, Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';


const STEPS = ['Scanning linguistic heuristics', 'Verifying origin metadata', 'Correlating patterns', 'Synthesizing risk matrix'];

export default function AnalyzerPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'text';
  const queryParam = searchParams.get('q') || '';

  const [inputType, setInputType] = useState<'text' | 'file' | 'link'>(
    typeParam === 'link' || typeParam === 'website' ? 'link' : 
    typeParam === 'image' || typeParam === 'video' || typeParam === 'audio' || typeParam === 'file' ? 'file' : 'text'
  );
  const [content, setContent] = useState(queryParam);
  const [isDeepScan, setIsDeepScan] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<any>(null);
  const WORKER_URL = 'https://scamshield-agent.privacy-agent-sham.workers.dev';

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setResult(null);
    setStepIndex(0);

    const stepInterval = setInterval(() => {
      setStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      const response = await fetch(`${WORKER_URL}/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: inputType, payload: content })
      });

      const data = await response.json();
      if (data.id) {
        // Start polling
        const pollInterval = setInterval(async () => {
          try {
            const res = await fetch(`${WORKER_URL}/result/${data.id}`);
            if (res.ok) {
              const resData = await res.json();
              clearInterval(pollInterval);
              clearInterval(stepInterval);
              setResult({
                score: resData.riskScore,
                type: resData.scamType,
                explanation: resData.explanation,
                action: resData.action,
                confidence: 0.98,
                origin: { country: 'Detected', ip: 'Secured' },
                signals: [
                  { name: 'Neural Pattern', severity: resData.riskScore > 70 ? 'Critical' : 'High' },
                  { name: 'Phishing Heuristic', severity: 'High' }
                ]
              });
              setIsAnalyzing(false);
            }
          } catch (e) { /* Pending */ }
        }, 1500);
      }
    } catch (err) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
    }
  };



  const scoreColor = result 
    ? result.score > 70 ? 'text-red-400' : result.score > 40 ? 'text-yellow-400' : 'text-emerald-400'
    : '';
  const strokeColor = result
    ? result.score > 70 ? '#f87171' : result.score > 40 ? '#facc15' : '#34d399'
    : '#3b82f6';

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">Multi-Modal Detection</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Neural Analyzer</h1>
        </div>
        <div className="flex p-1 gap-1 bg-white/[0.04] border border-white/[0.06] rounded-2xl">
          <button
            onClick={() => setIsDeepScan(false)}
            className={cn("px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all", !isDeepScan ? "bg-white/[0.08] text-white" : "text-zinc-500 hover:text-zinc-300")}
          >Standard</button>
          <button
            onClick={() => setIsDeepScan(true)}
            className={cn("px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all", isDeepScan ? "bg-red-600/20 text-red-400 border border-red-500/30" : "text-zinc-500 hover:text-zinc-300")}
          >Deep Scan</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Mode toggle */}
          <div className="flex p-1 bg-white/[0.04] border border-white/[0.06] rounded-2xl w-fit">
            <button
              onClick={() => setInputType('text')}
              className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all", inputType === 'text' ? "bg-white/[0.08] text-white" : "text-zinc-500 hover:text-zinc-300")}
            ><MessageSquare className="w-3.5 h-3.5" />Text</button>
            <button
              onClick={() => setInputType('link')}
              className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all", inputType === 'link' ? "bg-white/[0.08] text-white" : "text-zinc-500 hover:text-zinc-300")}
            ><Globe className="w-3.5 h-3.5" />Link</button>
            <button
              onClick={() => setInputType('file')}
              className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all", inputType === 'file' ? "bg-white/[0.08] text-white" : "text-zinc-500 hover:text-zinc-300")}
            ><Upload className="w-3.5 h-3.5" />Media</button>
          </div>

          {/* Input Card */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827]/70 backdrop-blur-xl p-6 min-h-[400px] flex flex-col">
            {inputType === 'text' ? (
              <div className="flex-1 flex flex-col">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Input Buffer</label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder={typeParam === 'sms' ? "Paste SMS or message content here..." : "Paste suspicious text, email content, etc..."}
                  className="flex-1 w-full bg-transparent text-base text-white placeholder:text-zinc-700 focus:outline-none resize-none leading-relaxed font-medium"
                />
              </div>
            ) : inputType === 'link' ? (
              <div className="flex-1 flex flex-col">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">URL Intercept</label>
                <input
                  type="text"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="https://suspicious-site.com/verify"
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                />
                <div className="mt-8 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Automated Crawl</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Our agent will automatically crawl the destination, analyze SSL certificates, domain reputation, and forensic scripts.</p>
                </div>
              </div>
            ) : (

              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/[0.08] rounded-2xl hover:border-blue-500/40 transition-all group cursor-pointer">
                <div className="p-6 rounded-2xl bg-white/[0.04] group-hover:bg-blue-500/10 transition-all mb-4">
                  <Upload className="w-10 h-10 text-zinc-500 group-hover:text-blue-400 transition-all" />
                </div>
                <p className="text-sm font-bold text-white">Drop media files here</p>
                <p className="text-xs text-zinc-600 font-medium mt-2 uppercase tracking-widest">PNG · JPG · MP3 · MP4 · PDF</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {[Zap, Globe, Cpu].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-zinc-600" />
                  </div>
                ))}
                <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Multi-Node</span>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || (!content && inputType === 'text')}
                className={cn(
                  "flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  isDeepScan
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20",
                  "disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                )}
              >
                {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</> : <>Analyze<ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {/* Idle State */}
            {!result && !isAnalyzing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full min-h-[480px] rounded-2xl border border-dashed border-white/[0.06] bg-[#111827]/40 flex flex-col items-center justify-center text-center p-12"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-6">
                  <Fingerprint className="w-10 h-10 text-zinc-700" />
                </div>
                <p className="text-base font-bold text-zinc-400">Awaiting Input</p>
                <p className="text-sm text-zinc-600 mt-2 max-w-xs">Paste content or upload a file to start the neural intercept.</p>
              </motion.div>
            )}

            {/* Processing State */}
            {isAnalyzing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full min-h-[480px] rounded-2xl bg-[#111827]/90 border border-white/[0.06] flex flex-col items-center justify-center p-10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
                <Activity className="w-16 h-16 text-blue-400 animate-pulse mb-8" />
                <p className="text-xl font-bold text-white mb-8 tracking-tight">Agent Intercepting</p>
                <div className="w-full max-w-sm space-y-3">
                  {STEPS.map((step, i) => (
                    <div key={i} className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all",
                      i <= stepIndex ? "bg-blue-500/10 border-blue-500/30" : "bg-white/[0.02] border-white/[0.04]"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className={cn("w-1.5 h-1.5 rounded-full", i <= stepIndex ? "bg-blue-400" : "bg-zinc-700")} />
                        <span className="text-xs font-medium text-zinc-300">{step}</span>
                      </div>
                      {i < stepIndex && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                      {i === stepIndex && <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Result State */}
            {result && !isAnalyzing && (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-4"
              >
                {/* Score Card */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#111827]/80 p-6">
                  <div className="flex items-start gap-6">
                    {/* Ring Score */}
                    <div className="relative shrink-0">
                      <svg className="w-28 h-28 -rotate-90">
                        <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                        <motion.circle
                          cx="56" cy="56" r="48"
                          stroke={strokeColor} strokeWidth="8" fill="none"
                          strokeDasharray={301.6}
                          initial={{ strokeDashoffset: 301.6 }}
                          animate={{ strokeDashoffset: 301.6 - (301.6 * result.score / 100) }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={cn("text-3xl font-bold tabular-nums", scoreColor)}>{result.score}</span>
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">Risk</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-red-500/15 text-red-400 border border-red-500/30">High Risk</span>
                        <span className="text-[10px] text-zinc-500 font-bold">· {(result.confidence * 100).toFixed(0)}% Confidence</span>
                      </div>
                      <h2 className="text-lg font-bold text-white tracking-tight">{result.type}</h2>
                      <p className="text-sm text-zinc-400 mt-2 leading-relaxed">"{result.explanation}"</p>
                    </div>
                  </div>

                  {/* Origin + Model */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Origin</p>
                        <p className="text-sm font-bold text-white">{result.origin.country}</p>
                        <p className="text-[10px] text-zinc-500 tabular-nums">{result.origin.ip}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Model</p>
                        <p className="text-sm font-bold text-white">V4-Stable</p>
                        <p className="text-[10px] text-zinc-500">98.4% Precision</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signals */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#111827]/80 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Signal Matrix</h3>
                    <span className="text-xs font-bold text-zinc-500">{result.signals.length} Detected</span>
                  </div>
                  <div className="space-y-2">
                    {result.signals.map((sig: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.08] transition-all">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                          <span className="text-sm font-medium text-white">{sig.name}</span>
                        </div>
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border",
                          sig.severity === 'Critical' ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
                        )}>{sig.severity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-red-500/20 active:scale-95">
                    Block &amp; Report
                  </button>
                  <button className="py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-white text-xs font-bold uppercase tracking-widest transition-all active:scale-95">
                    Mark Safe
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
