"use client";

import { Calendar, Clock, Radio, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { formatNumber } from "@/lib/events/utils";
import type { EventStats as EventStatsType } from "@/lib/events/types";

interface EventStatsProps {
  stats: EventStatsType;
}

const STATS_CONFIG = [
  {
    key: "total" as const,
    label: "Total Acara",
    Icon: Calendar,
    color: "text-neutral-600 dark:text-neutral-400",
    bg: "bg-neutral-100 dark:bg-neutral-800/50",
  },
  {
    key: "upcoming" as const,
    label: "Akan Datang",
    Icon: Clock,
    color: "text-green-700 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    key: "ongoing" as const,
    label: "Sedang Berlangsung",
    Icon: Radio,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "finished" as const,
    label: "Selesai",
    Icon: CheckCircle2,
    color: "text-neutral-700 dark:text-neutral-300",
    bg: "bg-neutral-100 dark:bg-neutral-800/50",
  },
];

export function EventStats({ stats }: EventStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {STATS_CONFIG.map((cfg, idx) => (
        <motion.div
          key={cfg.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.3 }}
          className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-neutral-900"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <p className="text-xs font-medium text-neutral-500">
                {cfg.label}
              </p>
              <p className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                {formatNumber(stats[cfg.key])}
              </p>
            </div>
            <div className={`rounded-xl p-2 ${cfg.bg}`}>
              <cfg.Icon className={`h-4 w-4 ${cfg.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
