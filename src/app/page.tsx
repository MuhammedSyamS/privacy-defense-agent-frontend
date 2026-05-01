'use client';

import { useState, useCallback } from 'react';
import { MOCK_EVENTS } from '@/mockData';
import { ScamEvent } from '@/types';
import RiskGauge from '@/components/RiskGauge';
import ThreatFeed from '@/components/ThreatFeed';
import Analyzer from '@/components/Analyzer';
import { Shield, LayoutDashboard, Database, Settings, Bell, Zap, Globe, Search, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScamShieldAgent } from '@/lib/agent';

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
      console.warn('Backend not running, using local simulation fallback');
      // Fallback to local logic
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
    <main className="flex h-screen bg-[#050507] text-white overflow-hidden cyber-grid">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-white/5 flex flex-col items-center lg:items-start p-6 glass z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-primary rounded-xl cyber-glow">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <h1 className="text-xl font-bold hidden lg:block tracking-tighter italic">SCAM<span className="text-primary">SHIELD</span></h1>
        </div>

        <nav className="flex flex-col gap-2 w-full">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: Zap, label: 'Live Events' },
            { icon: Database, label: 'Threat Memory' },
            { icon: Globe, label: 'Network Intelligence' },
            { icon: Settings, label: 'Agent Settings' },
          ].map((item, i) => (
            <button
              key={i}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all w-full ${
                item.active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 glass rounded-2xl hidden lg:block border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase text-primary">System Status</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <p className="text-[10px] text-muted-foreground">Autonomous Agent active across 4 nodes. Real-time scanning enabled.</p>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 glass shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search threat history or signals..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={simulateThreat}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-xl font-bold hover:scale-105 transition-all cyber-glow"
            >
              <PlusCircle className="w-4 h-4" />
              Simulate Inbound Threat
            </button>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-medium">Node: SGP-01</span>
            </div>
            <button className="relative p-2 text-muted-foreground hover:text-white transition-all">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050507]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 border border-white/10" />
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
          {/* Left Column: Feed */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            <ThreatFeed 
              events={events} 
              onSelect={setSelectedEvent} 
              selectedId={selectedEvent?.id} 
            />
          </div>

          {/* Middle Column: Analyzer */}
          <div className="lg:col-span-6 flex flex-col min-h-0">
            <Analyzer event={selectedEvent} />
          </div>

          {/* Right Column: Stats & Memory */}
          <div className="lg:col-span-3 flex flex-col gap-8 min-h-0">
            <RiskGauge score={78} />
            
            <div className="glass rounded-3xl p-6 flex-1 overflow-y-auto custom-scrollbar border border-white/5">
              <h3 className="text-xs font-bold uppercase text-muted-foreground mb-4">Threat Intelligence</h3>
              <div className="space-y-4">
                {[
                  { title: 'Global Phishing Wave', detail: 'Targeting Chase Bank customers via SMS', severity: 'High' },
                  { title: 'Deepfake Voice Pattern', detail: 'Synthetic speech mimicking family members', severity: 'Critical' },
                  { title: 'New Ransomware Variant', detail: 'Pattern match for LockBit 4.0 detected', severity: 'Medium' }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-default">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{item.title}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        item.severity === 'Critical' ? 'bg-red-500' : 
                        item.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 text-xs font-bold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-all">
                View Full Intelligence Report
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
