import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-[#5c4c29] placeholder:text-[#8b7e57] selection:bg-[#8b7e57] selection:text-[#f0e6c9] border-[#8b7e57] flex h-10 w-full min-w-0 rounded-md border-2 bg-[#f0e6c9] px-3 py-1 text-base font-bold text-[#5c4c29] shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-[#f0e6c9] file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[#8b7e57] focus-visible:ring-[#8b7e57]/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:!shadow-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
