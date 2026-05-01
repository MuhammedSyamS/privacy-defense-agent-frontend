'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Shield, Bell, CreditCard, Key, Smartphone, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      <div>
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">System Settings</h1>
        <p className="text-zinc-500 mt-4 font-bold uppercase tracking-[0.2em] text-sm">Configure your autonomous protection layers and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Navigation */}
        <aside className="lg:col-span-1 flex flex-col gap-2">
          {[
            { icon: User, label: 'Profile' },
            { icon: Shield, label: 'Security', active: true },
            { icon: Bell, label: 'Notifications' },
            { icon: CreditCard, label: 'Billing' },
            { icon: Key, label: 'API Keys' },
            { icon: Smartphone, label: 'Devices' },
          ].map((item, i) => (
            <button
              key={i}
              className={`flex items-center justify-between px-6 py-4 rounded-2xl text-sm transition-all group ${
                item.active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/20 scale-[1.02]' : 'text-zinc-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-zinc-500 group-hover:scale-110 group-hover:text-white'}`} />
                <span className="font-bold tracking-tight uppercase">{item.label}</span>
              </div>
              {item.active && <ChevronRight className="w-4 h-4 text-white/50" />}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="lg:col-span-3 flex flex-col gap-12">
          <Card className="border-white/5 shadow-2xl bg-white/[0.02] rounded-[2.5rem]">
            <CardHeader title="Agent Behavior" subtitle="Define how the autonomous engine reacts to high-confidence threats." className="text-white" />
            <CardContent className="space-y-12 p-10">
              <div className="flex items-center justify-between group cursor-default">
                <div className="max-w-md">
                  <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">Real-time Auto-Blocking</h4>
                  <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                    Automatically neutralize and report senders when the agent's risk confidence exceeds 92%.
                  </p>
                </div>
                <div className="w-14 h-7 bg-blue-600 rounded-full relative cursor-pointer border-2 border-transparent hover:scale-110 transition-all">
                  <div className="absolute right-1 top-1 w-4.5 h-4.5 bg-white rounded-full shadow-lg" />
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-bold text-white tracking-tight">Threat Sensitivity</h4>
                  <Badge variant="primary" className="px-5 py-1.5 rounded-xl bg-blue-600/10 text-blue-400 border-blue-600/20">Aggressive</Badge>
                </div>
                <div className="flex items-center gap-10">
                  <input type="range" className="flex-1 accent-blue-600 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer hover:bg-white/20 transition-all" />
                  <span className="text-2xl font-black text-white tabular-nums tracking-tighter">90%</span>
                </div>
                <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest italic">Higher sensitivity may increase false positives in ambiguous communication clusters.</p>
              </div>

              <div className="h-px bg-white/5" />

              <div className="flex items-center justify-between group cursor-default">
                <div>
                  <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">Security Audit Logging</h4>
                  <p className="text-sm text-zinc-500 mt-2">
                    Retain detailed neural analysis logs for forensic review.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 rounded-xl px-6 text-white hover:bg-white/5">Modify Retention</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/5 shadow-2xl bg-white/[0.02] rounded-[2.5rem]">
            <CardHeader title="Plan & Billing" subtitle="You are currently on the Enterprise Console tier." className="text-white" />
            <CardContent className="p-10">
              <div className="p-10 bg-white/[0.03] rounded-[3rem] border border-white/5 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                <div className="flex items-center gap-8">
                  <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-2xl shadow-blue-600/20 group-hover:scale-110 transition-all">
                    <Shield className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">Enterprise Console</h4>
                    <p className="text-xs font-bold text-zinc-500 tracking-[0.2em] mt-2 uppercase">RENEWAL: OCT 24, 2026</p>
                  </div>
                </div>
                <Button className="rounded-2xl px-10 py-6 bg-blue-600 hover:bg-blue-500 text-white">Manage Subscription</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
