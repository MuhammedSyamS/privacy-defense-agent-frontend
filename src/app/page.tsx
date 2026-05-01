'use client';

import { useState, useCallback } from 'react';
import { MOCK_EVENTS } from '@/mockData';
import { ScamEvent } from '@/types';
import RiskGauge from '@/components/RiskGauge';
import ThreatFeed from '@/components/ThreatFeed';
import Analyzer from '@/components/Analyzer';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScamShieldAgent } from '@/lib/agent';
import { ArrowUpRight, TrendingUp, Users, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  const [events, setEvents] = useState<ScamEvent[]>(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<ScamEvent | null>(MOCK_EVENTS[0]);

  const simulateThreat = useCallback(async () => {
    const payload = {
      content: 'ALERTA: Your Netflix subscription has expired. Update payment now: http://netflix-billing-fix.net',
      type: 'text',
      source: 'SMS'
    };

    try {
      const response = await fetch('http://localhost:4000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      const newEvent: ScamEvent = {
        id: data.id,
        created_at: new Date().toISOString(),
        source: 'SMS',
        content_type: 'text',
        raw_content: payload.content,
        metadata: { sender: '+44 7700 900077' },
        risk_score: data.riskScore,
        status: 'analyzed',
        agent_summary: data.analysis.explanation,
        analysis: {
          confidence: data.analysis.confidence,
          signals: data.analysis.signals,
          explanation: data.analysis.explanation,
          suggested_action: data.analysis.suggestedAction
        }
      };

      setEvents(prev => [newEvent, ...prev]);
      setSelectedEvent(newEvent);
    } catch (error) {
      const analysis = ScamShieldAgent.analyze('text', payload.content, {});
      const fallbackEvent: ScamEvent = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        source: 'SMS',
        content_type: 'text',
        raw_content: payload.content,
        metadata: { sender: '+44 7700 900077' },
        risk_score: Math.round(analysis.confidence * 100),
        status: 'analyzed',
        agent_summary: analysis.explanation,
        analysis
      };
      setEvents(prev => [fallbackEvent, ...prev]);
      setSelectedEvent(fallbackEvent);
    }
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* SaaS Dashboard Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black text-black tracking-tighter">Security Overview</h1>
          <p className="text-zinc-500 mt-2 font-medium">Monitoring inbound signals for <span className="text-black font-bold underline">Admin User</span>. Nodes: 12 Active.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setSelectedEvent(null)} className="border-zinc-200">Reset View</Button>
          <Button onClick={simulateThreat} className="rounded-xl px-8 shadow-lg shadow-black/20">Simulate Inbound</Button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Network Active', value: '12', icon: ShieldCheck, trend: 'STABLE' },
          { label: 'Intercepted', value: '429', icon: Zap, trend: '+12%' },
          { label: 'Safety Rate', value: '99.8%', icon: TrendingUp, trend: 'OPTIMAL' },
          { label: 'Total Users', value: '1,242', icon: Users, trend: '+84' },
        ].map((stat, i) => (
          <Card key={i} className="border-zinc-100 bg-zinc-50/50 hover:bg-white transition-all cursor-default group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="p-2 bg-white rounded-lg border border-zinc-100 group-hover:bg-black group-hover:text-white transition-all">
                  <stat.icon className="w-4 h-4" />
                </div>
                <Badge variant="neutral" className="text-[9px] font-black bg-white group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                  {stat.trend}
                </Badge>
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.1em]">{stat.label}</p>
                <h4 className="text-2xl font-black text-black mt-1 tracking-tighter">{stat.value}</h4>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Primary Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Metrics & Feed */}
        <div className="lg:col-span-3 flex flex-col gap-10">
          <RiskGauge score={78} />
          <ThreatFeed 
            events={events} 
            onSelect={setSelectedEvent} 
            selectedId={selectedEvent?.id} 
          />
        </div>

        {/* Middle: Agent Analyzer */}
        <div className="lg:col-span-6 min-h-[600px]">
          <Analyzer event={selectedEvent} />
        </div>

        {/* Right: Intel & Upgrade */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Threat Intelligence</h3>
            <div className="space-y-6">
              {[
                { title: 'Phishing Pattern #42', status: 'Blocked', date: '2m' },
                { title: 'Synthetic Voice', status: 'Analysis', date: '14m' },
                { title: 'Auth Portal Clone', status: 'Removed', date: '1h' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <p className="text-sm font-bold text-black group-hover:underline">{item.title}</p>
                    <p className="text-[10px] text-zinc-400 font-black uppercase tracking-tighter">{item.date} ago</p>
                  </div>
                  <Badge variant="neutral" className="bg-zinc-50">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-8 text-[10px] font-black uppercase tracking-widest border border-zinc-100">
              Full Intelligence Feed
            </Button>
          </div>

          <div className="bg-black rounded-[2rem] p-8 relative overflow-hidden group cursor-pointer shadow-xl shadow-black/20">
            <div className="relative z-10">
              <h3 className="text-white text-xl font-black tracking-tighter mb-2 flex items-center gap-2">
                Privacy Pro
                <ArrowUpRight className="w-5 h-5 text-zinc-500" />
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                Unlock multi-node support, deepfake visual analysis, and custom remediation rules.
              </p>
              <Button variant="secondary" className="mt-6 w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl bg-white text-black hover:bg-zinc-200">
                Upgrade Enterprise
              </Button>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-all">
              <ShieldCheck className="w-32 h-32 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
