'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  score: number;
}

export default function RiskGauge({ score }: RiskGaugeProps) {
  // Semantic color logic
  const isSafe = score > 85;
  const isCritical = score < 40;
  
  const statusColor = isSafe 
    ? 'text-emerald-600' 
    : isCritical 
      ? 'text-red-600' 
      : 'text-amber-500';

  const strokeColor = isSafe 
    ? '#059669' // emerald-600
    : isCritical 
      ? '#dc2626' // red-600
      : '#000000'; // Default black

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white border border-zinc-200 rounded-[3rem] shadow-xl shadow-black/5 relative overflow-hidden group hover:border-black transition-all">
      <div className="relative z-10">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="72"
            stroke="#f4f4f5"
            strokeWidth="14"
            fill="transparent"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="72"
            stroke={strokeColor}
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={452.16}
            initial={{ strokeDashoffset: 452.16 }}
            animate={{ strokeDashoffset: 452.16 - (452.16 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("text-5xl font-black tracking-tighter tabular-nums transition-colors", statusColor)}
          >
            {score}%
          </motion.span>
          <span className="text-[11px] uppercase tracking-[0.4em] text-zinc-900 font-black leading-none mt-1">Safety</span>
        </div>
      </div>
      
      <div className="mt-10 flex justify-between w-full border-t border-zinc-100 pt-8">
        <div className="text-center group/metric cursor-default">
          <div className="text-lg font-black text-black group-hover/metric:scale-110 transition-all tabular-nums">12.4k</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-800 font-black mt-1">Nodes</div>
        </div>
        <div className="text-center border-l border-zinc-100 pl-10 group/metric cursor-default">
          <div className="text-lg font-black text-emerald-600 group-hover/metric:scale-110 transition-all tabular-nums">429</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-800 font-black mt-1">Blocked</div>
        </div>
      </div>
      
      {/* Decorative pulse based on status */}
      <div className={cn(
        "absolute -bottom-4 -right-4 w-24 h-24 blur-[60px] opacity-20 animate-pulse",
        isSafe ? "bg-emerald-500" : isCritical ? "bg-red-500" : "bg-black"
      )} />
    </div>
  );
}
