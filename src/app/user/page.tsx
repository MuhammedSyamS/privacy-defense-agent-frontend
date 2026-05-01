'use client';

import { useState } from 'react';
import { MOCK_EVENTS } from '@/mockData';
import { ScamEvent } from '@/types';
import RiskGauge from '@/components/RiskGauge';
import ThreatFeed from '@/components/ThreatFeed';
import Analyzer from '@/components/Analyzer';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Shield, Smartphone, Mail, Activity, ArrowRight } from 'lucide-react';

export default function UserPanel() {
  const [events] = useState<ScamEvent[]>(MOCK_EVENTS.slice(0, 2));
  const [selectedEvent, setSelectedEvent] = useState<ScamEvent | null>(events[0]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black text-black tracking-tighter">My Protection</h1>
          <p className="text-zinc-500 mt-2 font-medium">Your personal digital identity is being monitored by <span className="text-black font-bold">PrivacyAgent</span>.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-zinc-200">View History</Button>
          <Button className="rounded-xl px-8 shadow-lg shadow-black/20">Check Link</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Protected Email', value: 'admin@work.com', icon: Mail, status: 'Active' },
          { label: 'Secure Devices', value: '3 Active', icon: Smartphone, status: 'Encrypted' },
          { label: 'Security Score', value: '98/100', icon: Shield, status: 'Excellent' },
        ].map((stat, i) => (
          <Card key={i} className="border-zinc-100 bg-white hover:bg-zinc-50 transition-all cursor-default group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-black group-hover:text-white transition-all">
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant="success">
                  {stat.status}
                </Badge>
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.1em]">{stat.label}</p>
                <h4 className="text-xl font-bold text-black mt-1 tracking-tight">{stat.value}</h4>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 flex flex-col gap-8">
          <Card>
            <CardHeader title="Live Monitoring" subtitle="Inbound communications being analyzed." />
            <CardContent>
              <ThreatFeed 
                events={events} 
                onSelect={setSelectedEvent} 
                selectedId={selectedEvent?.id} 
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Analyzer event={selectedEvent} />
        </div>
      </div>

      <Card className="bg-black text-white p-10 relative overflow-hidden border-none shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black tracking-tighter mb-4">Security Insights</h2>
            <p className="text-zinc-400 font-medium leading-relaxed">
              We've blocked 12 suspicious attempts to access your account this week. 
              Most came from unauthorized IP ranges in foreign territories.
            </p>
          </div>
          <Button variant="secondary" className="px-10 py-5 text-[10px] font-black uppercase tracking-widest bg-white text-black hover:bg-zinc-200">
            Download Security Report
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Activity className="w-48 h-48" />
        </div>
      </Card>
    </div>
  );
}
