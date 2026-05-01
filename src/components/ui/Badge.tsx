import { cn } from "@/lib/utils";

export function Badge({ children, variant = 'neutral', className }: { 
  children: React.ReactNode, 
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'primary',
  className?: string
}) {
  const variants = {
    neutral: "bg-zinc-100 text-zinc-700 border-zinc-200",
    success: "bg-zinc-900 text-white border-zinc-900",
    warning: "bg-zinc-100 text-zinc-900 border-zinc-300",
    danger: "bg-zinc-900 text-white border-zinc-900",
    primary: "bg-zinc-900 text-white border-zinc-900",
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-tighter border", 
      variants[variant], 
      className
    )}>
      {children}
    </span>
  );
}
