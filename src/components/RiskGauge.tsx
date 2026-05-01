'use client';

import { motion } from 'framer-motion';

interface RiskGaugeProps {
  score: number;
}

export default function RiskGauge({ score }: RiskGaugeProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-zinc-200 rounded-[2rem] shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <svg className="w-36 h-36 transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r="64"
            stroke="#f4f4f5"
            strokeWidth="12"
            fill="transparent"
          />
          <motion.circle
            cx="72"
            cy="72"
            r="64"
            stroke="black"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={401.92}
            initial={{ strokeDashoffset: 401.92 }}
            animate={{ strokeDashoffset: 401.92 - (401.92 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-black tracking-tighter text-black"
          >
            {score}%
          </motion.span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-black">Score</span>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between w-full border-t border-zinc-50 pt-6">
        <div className="text-center">
          <div className="text-sm font-black text-black">12.4k</div>
          <div className="text-[9px] uppercase tracking-widest text-zinc-400 font-black">Processed</div>
        </div>
        <div className="text-center border-l border-zinc-100 pl-8">
          <div className="text-sm font-black text-black">429</div>
          <div className="text-[9px] uppercase tracking-widest text-zinc-400 font-black">Neutralized</div>
        </div>
      </div>
    </div>
  );
}
