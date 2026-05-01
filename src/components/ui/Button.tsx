import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-black text-white border border-black hover:bg-white hover:text-black shadow-sm",
      white: "bg-white text-black border border-zinc-200 hover:bg-black hover:text-white shadow-sm",
      secondary: "bg-zinc-100 text-black border border-zinc-100 hover:bg-zinc-200 hover:border-zinc-300",
      outline: "bg-transparent border border-black text-black hover:bg-black hover:text-white",
      ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-black",
      danger: "bg-red-600 text-white border border-red-600 hover:bg-white hover:text-red-600",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-black uppercase tracking-widest",
      md: "px-4 py-2 text-sm font-black uppercase tracking-widest",
      lg: "px-6 py-3 text-base font-black uppercase tracking-widest",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
