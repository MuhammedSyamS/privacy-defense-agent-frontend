'use client';

import { ScamEvent } from '@/types';
import { Shield, AlertTriangle, MessageSquare, Phone, Image as ImageIcon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/Badge';

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
          Live Events
          <span className="flex h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
        </h2>
        <button className="text-[10px] font-black uppercase text-zinc-400 hover:text-black transition-all">
          History
        </button>
      </div>
      
      <div className="flex flex-col gap-3 h-[calc(100vh-340px)] overflow-y-auto pr-2 custom-scrollbar">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(event)}
            className={`p-4 rounded-2xl cursor-pointer transition-all border group relative ${
              selectedId === event.id 
                ? 'bg-black border-black text-white shadow-lg shadow-black/10' 
                : 'bg-white border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  selectedId === event.id ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-black'
                }`}>
                  {getIcon(event.content_type)}
                </div>
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-tight ${
                    selectedId === event.id ? 'text-zinc-400' : 'text-zinc-400'
                  }`}>
                    {event.source} • {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className={`text-sm font-bold truncate w-24 ${
                    selectedId === event.id ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {event.metadata.sender}
                  </div>
                </div>
              </div>
              <Badge 
                variant={selectedId === event.id ? 'neutral' : (event.risk_score > 75 ? 'danger' : 'success')}
                className={selectedId === event.id ? 'bg-zinc-800 border-zinc-700 text-white' : ''}
              >
                {event.risk_score}%
              </Badge>
            </div>
            <p className={`text-[11px] line-clamp-1 italic ${
              selectedId === event.id ? 'text-zinc-400' : 'text-zinc-500'
            }`}>
              "{event.raw_content}"
            </p>
            {selectedId !== event.id && (
              <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <ChevronRight className="w-3 h-3 text-zinc-400" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
