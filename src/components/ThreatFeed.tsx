'use client';

import { ScamEvent } from '@/types';
import { Shield, AlertTriangle, MessageSquare, Phone, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThreatFeedProps {
  events: ScamEvent[];
  onSelect: (event: ScamEvent) => void;
  selectedId?: string;
}

export default function ThreatFeed({ events, onSelect, selectedId }: ThreatFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'text': return <MessageSquare className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'audio': return <Phone className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto pr-2 custom-scrollbar">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        Live Threat Feed
      </h2>
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(event)}
          className={`p-4 rounded-xl cursor-pointer transition-all border ${
            selectedId === event.id 
              ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(0,242,255,0.1)]' 
              : 'bg-card/50 border-white/5 hover:border-white/10 hover:bg-card'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${
                event.risk_score > 75 ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {getIcon(event.content_type)}
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-tight">
                  {event.source} • {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-sm font-semibold truncate w-40">
                  {event.metadata.sender}
                </div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded text-[10px] font-bold ${
              event.risk_score > 75 ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
            }`}>
              {event.risk_score}%
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 italic">
            "{event.raw_content}"
          </p>
        </motion.div>
      ))}
    </div>
  );
}
