import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string, subtitle?: string, action?: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}
