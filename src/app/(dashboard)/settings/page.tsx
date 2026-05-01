'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Shield, Bell, CreditCard, Key, Smartphone, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      <div>
        <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic">System Settings</h1>
        <p className="text-zinc-700 mt-4 font-black uppercase tracking-[0.2em]">Configure your autonomous protection layers and security preferences.</p>
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
                item.active ? 'bg-black text-white shadow-2xl shadow-black/10 scale-[1.02]' : 'text-zinc-900 hover:bg-zinc-100 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-zinc-900 group-hover:scale-110'}`} />
                <span className="font-black tracking-tight uppercase">{item.label}</span>
              </div>
              {item.active && <ChevronRight className="w-4 h-4 text-zinc-500" />}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="lg:col-span-3 flex flex-col gap-12">
          <Card className="border-zinc-200 shadow-xl shadow-black/5 rounded-[2.5rem]">
            <CardHeader title="Agent Behavior" subtitle="Define how the autonomous engine reacts to high-confidence threats." />
            <CardContent className="space-y-12 p-10">
              <div className="flex items-center justify-between group cursor-default">
                <div className="max-w-md">
                  <h4 className="text-xl font-black text-black tracking-tight group-hover:underline underline-offset-4 decoration-2">Real-time Auto-Blocking</h4>
                  <p className="text-sm text-zinc-700 mt-2 leading-relaxed font-medium">
                    Automatically neutralize and report senders when the agent's risk confidence exceeds 92%.
                  </p>
                </div>
                <div className="w-14 h-7 bg-black rounded-full relative cursor-pointer border-2 border-black hover:scale-110 transition-all">
                  <div className="absolute right-1 top-1 w-4.5 h-4.5 bg-white rounded-full shadow-lg" />
                </div>
              </div>

              <div className="h-px bg-zinc-100" />

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-black text-black tracking-tight">Threat Sensitivity</h4>
                  <Badge variant="primary" className="px-5 py-1.5 rounded-xl">Aggressive</Badge>
                </div>
                <div className="flex items-center gap-10">
                  <input type="range" className="flex-1 accent-black h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer hover:bg-zinc-200 transition-all" />
                  <span className="text-2xl font-black text-black tabular-nums tracking-tighter">90%</span>
                </div>
                <p className="text-[11px] text-zinc-500 font-black uppercase tracking-widest italic">Higher sensitivity may increase false positives in ambiguous communication clusters.</p>
              </div>

              <div className="h-px bg-zinc-100" />

              <div className="flex items-center justify-between group cursor-default">
                <div>
                  <h4 className="text-xl font-black text-black tracking-tight group-hover:underline underline-offset-4 decoration-2">Security Audit Logging</h4>
                  <p className="text-sm text-zinc-700 mt-2 font-medium">
                    Retain detailed neural analysis logs for forensic review.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-2 rounded-xl px-6">Modify Retention</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 shadow-xl shadow-black/5 rounded-[2.5rem]">
            <CardHeader title="Plan & Billing" subtitle="You are currently on the Enterprise Console tier." />
            <CardContent className="p-10">
              <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 flex items-center justify-between group hover:bg-white hover:border-black transition-all">
                <div className="flex items-center gap-8">
                  <div className="p-6 bg-black rounded-3xl text-white shadow-2xl shadow-black/20 group-hover:scale-110 transition-all">
                    <Shield className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-black tracking-tighter uppercase italic">Enterprise Console</h4>
                    <p className="text-xs font-black text-zinc-700 tracking-[0.2em] mt-2">RENEWAL: OCT 24, 2026</p>
                  </div>
                </div>
                <Button variant="primary" className="rounded-2xl px-10 py-6 shadow-2xl shadow-black/10">Manage Subscription</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
