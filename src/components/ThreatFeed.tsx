'use client';

import { ScamEvent } from '@/types';
import { Shield, MessageSquare, Phone, Image as ImageIcon, ChevronRight } from 'lucide-react';
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
        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-black flex items-center gap-2">
          Live Threat Feed
          <span className="flex h-1.5 w-1.5 rounded-full bg-red-600 animate-ping" />
        </h2>
        <button className="text-[10px] font-black uppercase text-zinc-900 border-b border-black pb-0.5 hover:text-zinc-500 hover:border-zinc-300 transition-all">
          View Archives
        </button>
      </div>
      
      <div className="flex flex-col gap-4 h-[calc(100vh-340px)] overflow-y-auto pr-3 custom-scrollbar">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(event)}
            className={`p-5 rounded-[1.5rem] cursor-pointer transition-all border group relative flex flex-col gap-3 ${
              selectedId === event.id 
                ? 'bg-black border-black text-white shadow-2xl shadow-black/20 scale-[1.02]' 
                : 'bg-white border-zinc-200 text-black hover:border-black hover:bg-zinc-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border transition-all ${
                  selectedId === event.id 
                    ? 'bg-zinc-900 border-zinc-800 text-white' 
                    : 'bg-zinc-50 border-zinc-100 text-black group-hover:bg-black group-hover:text-white group-hover:border-black'
                }`}>
                  {getIcon(event.content_type)}
                </div>
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${
                    selectedId === event.id ? 'text-zinc-400' : 'text-zinc-700'
                  }`}>
                    {event.source} • {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className={`text-sm font-black truncate w-28 tracking-tight ${
                    selectedId === event.id ? 'text-white' : 'text-black'
                  }`}>
                    {event.metadata.sender}
                  </div>
                </div>
              </div>
              <Badge 
                variant={selectedId === event.id ? 'white' : (event.risk_score > 75 ? 'danger' : 'success')}
                className={selectedId === event.id ? 'border-zinc-700 font-black' : 'font-black'}
              >
                {event.risk_score}%
              </Badge>
            </div>
            <p className={`text-xs font-medium line-clamp-1 italic px-1 ${
              selectedId === event.id ? 'text-zinc-300' : 'text-zinc-600'
            }`}>
              "{event.raw_content}"
            </p>
            {selectedId !== event.id && (
              <div className="absolute right-5 bottom-5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <ChevronRight className="w-4 h-4 text-black" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
