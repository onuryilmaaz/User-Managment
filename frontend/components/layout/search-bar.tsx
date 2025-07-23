"use client";

import { Search, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      <div className={cn(
        "relative flex items-center transition-all duration-200",
        isFocused && "scale-105"
      )}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Arama yapın... (Ctrl+K)"
          className={cn(
            "w-full rounded-lg bg-background pl-10 pr-12 transition-all duration-200",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary",
            isFocused && "shadow-lg"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <Command className="h-3 w-3" />
            K
          </kbd>
        </div>
      </div>
    </div>
  );
}
