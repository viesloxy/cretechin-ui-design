"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  badge?: string;
  variant?: "default" | "subtle";
  children: ReactNode;
}

export function SettingsCard({
  title,
  badge,
  variant = "default",
  children,
}: SettingsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border p-5 ${
        variant === "subtle"
          ? "border-black/5 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900/50"
          : "border-black/5 bg-white dark:border-white/10 dark:bg-neutral-900"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
          {title}
        </h3>
        {badge && (
          <span className="rounded-full border border-black/5 bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:border-white/10 dark:bg-neutral-800">
            {badge}
          </span>
        )}
      </div>
      {children}
    </motion.div>
  );
}
