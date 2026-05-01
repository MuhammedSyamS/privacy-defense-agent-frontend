import { cn } from "@/lib/utils";

export function Badge({ children, variant = 'neutral', className }: { 
  children: React.ReactNode, 
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'primary' | 'white',
  className?: string
}) {
  const variants = {
    neutral: "bg-zinc-100 text-zinc-900 border-zinc-200",
    white: "bg-white text-black border-zinc-200",
    success: "bg-emerald-600 text-white border-emerald-700",
    warning: "bg-amber-600 text-white border-amber-700",
    danger: "bg-red-600 text-white border-red-700",
    primary: "bg-black text-white border-black",
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter border shadow-sm transition-all hover:scale-105", 
      variants[variant], 
      className
    )}>
      {children}
    </span>
  );
}
