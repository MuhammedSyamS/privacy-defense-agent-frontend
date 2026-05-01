import { cn } from "@/lib/utils";

export function Badge({ children, variant = 'neutral', className }: { 
  children: React.ReactNode, 
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'primary',
  className?: string
}) {
  const variants = {
    neutral: "bg-zinc-100 text-zinc-700 border-zinc-200",
    success: "bg-emerald-500 text-white border-emerald-600",
    warning: "bg-amber-500 text-white border-amber-600",
    danger: "bg-red-500 text-white border-red-600",
    primary: "bg-black text-white border-black",
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
