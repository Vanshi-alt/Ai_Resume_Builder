import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // base
        "flex min-h-[140px] w-full rounded-2xl",
        
        // premium background
        "border border-slate-700 bg-slate-900/80 backdrop-blur-md",
        
        // spacing
        "px-4 py-3",
        
        // text
        "text-sm text-slate-100 leading-7",
        
        // placeholder
        "placeholder:text-slate-500",
        
        // focus effect
        "focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
        
        // transition
        "transition-all duration-300",
        
        // scrollbar (better for long content)
        "resize-none",
        
        // hover
        "hover:border-slate-500",
        
        // disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };