import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 backdrop-blur-md transition-all duration-300",
        
        // file input support
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-300",
        
        // placeholder
        "placeholder:text-slate-500",
        
        // focus effects
        "focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
        
        // disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        
        // subtle hover
        "hover:border-slate-500",
        
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };