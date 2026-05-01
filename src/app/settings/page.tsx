'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Shield, Bell, CreditCard, Key, Smartphone, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-black text-black tracking-tighter">System Settings</h1>
        <p className="text-zinc-500 mt-2 font-medium">Configure your autonomous protection layers and account preferences.</p>
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
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all group ${
                item.active ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-zinc-400 group-hover:text-black'}`} />
                <span className="font-bold tracking-tight">{item.label}</span>
              </div>
              {item.active && <ChevronRight className="w-3 h-3 text-zinc-400" />}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="lg:col-span-3 flex flex-col gap-10">
          <Card className="border-zinc-200">
            <CardHeader title="Agent Behavior" subtitle="Define how the autonomous engine reacts to high-confidence threats." />
            <CardContent className="space-y-10">
              <div className="flex items-center justify-between">
                <div className="max-w-md">
                  <h4 className="text-base font-bold text-black tracking-tight">Real-time Auto-Blocking</h4>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                    Automatically neutralize and report senders when the agent's risk confidence exceeds 92%.
                  </p>
                </div>
                <div className="w-12 h-6 bg-black rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>

              <div className="h-px bg-zinc-100" />

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-bold text-black tracking-tight">Threat Sensitivity</h4>
                  <Badge variant="neutral" className="bg-zinc-50 px-3 py-1">Aggressive</Badge>
                </div>
                <div className="flex items-center gap-8">
                  <input type="range" className="flex-1 accent-black h-1 bg-zinc-100 rounded-full appearance-none cursor-pointer" />
                  <span className="text-sm font-black text-black tabular-nums">90%</span>
                </div>
                <p className="text-xs text-zinc-400 font-medium italic">Higher sensitivity may increase false positives in ambiguous communications.</p>
              </div>

              <div className="h-px bg-zinc-100" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-black tracking-tight">Security Audit Logging</h4>
                  <p className="text-sm text-zinc-500 mt-1">
                    Retain detailed analysis logs for up to 90 days for forensic review.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-zinc-200">Configure Retention</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200">
            <CardHeader title="Plan & Billing" subtitle="You are currently on the Enterprise tier." />
            <CardContent>
              <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-black rounded-2xl text-white shadow-xl shadow-black/10">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-black tracking-tighter uppercase">Enterprise Annual</h4>
                    <p className="text-xs font-bold text-zinc-400 tracking-widest mt-1">RENEWAL DATE: OCT 24, 2026</p>
                  </div>
                </div>
                <Button variant="primary" className="rounded-xl px-8">Manage Subscription</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
