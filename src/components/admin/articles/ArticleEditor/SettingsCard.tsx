"use client";

import { ChevronDown } from "lucide-react";
import { useState, ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  badge?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  variant?: "white" | "subtle";
}

export default function SettingsCard({
  title,
  badge,
  children,
  collapsible = false,
  defaultOpen = true,
  variant = "white",
}: SettingsCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  const bg =
    variant === "subtle"
      ? "bg-neutral-50 dark:bg-neutral-800/30"
      : "bg-white dark:bg-neutral-900";

  return (
    <div
      className={`${bg} border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-sm shadow-black/5`}
    >
      <button
        type="button"
        onClick={() => collapsible && setOpen((p) => !p)}
        className={`w-full flex items-center justify-between mb-3 ${
          collapsible ? "cursor-pointer" : "cursor-default"
        }`}
        disabled={!collapsible}
        aria-expanded={open}
      >
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
          {title}
          {badge && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-primary-dark bg-primary/15 px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </h3>
        {collapsible && (
          <ChevronDown
            className={`w-4 h-4 text-neutral-500 transition-transform ${
              open ? "rotate-0" : "-rotate-90"
            }`}
          />
        )}
      </button>
      {open && <div className="space-y-3">{children}</div>}
    </div>
  );
}
