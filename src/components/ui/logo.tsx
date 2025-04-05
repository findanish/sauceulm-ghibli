"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
  cursorClassName?: string;
}

export function Logo({ 
  className, 
  textClassName,
  cursorClassName
}: LogoProps) {
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 600); // Blink every 600ms
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn("font-bold", textClassName)}>SauceULM</span>
      <span 
        className={cn(
          "transition-opacity duration-100", 
          cursorVisible ? "opacity-100" : "opacity-0",
          cursorClassName
        )}
      >
        _
      </span>
    </div>
  );
}
