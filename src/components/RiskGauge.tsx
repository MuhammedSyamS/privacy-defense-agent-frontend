'use client';

import { motion } from 'framer-motion';

interface RiskGaugeProps {
  score: number;
}

export default function RiskGauge({ score }: RiskGaugeProps) {
  const getStatusColor = (s: number) => {
    if (s < 40) return '#10b981'; // Green
    if (s < 75) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const color = getStatusColor(score);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 glass rounded-3xl cyber-glow">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="12"
          fill="transparent"
        />
        <motion.circle
          cx="96"
          cy="96"
          r="80"
          stroke={color}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={502.4}
          initial={{ strokeDashoffset: 502.4 }}
          animate={{ strokeDashoffset: 502.4 - (502.4 * score) / 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold font-mono"
          style={{ color }}
        >
          {score}
        </motion.span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Risk Index</span>
      </div>
    </div>
  );
}
