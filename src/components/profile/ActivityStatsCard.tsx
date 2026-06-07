"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  Layers,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import type { ProfileStats } from "./types";

interface ActivityStatsCardProps {
  stats: ProfileStats;
  isLoading?: boolean;
}

interface StatConfig {
  key: keyof ProfileStats;
  label: string;
  href: string;
  icon: LucideIcon;
}

const STAT_CONFIG: StatConfig[] = [
  { key: "coursesEnrolled", label: "Kelas Diambil", href: "/courses?tab=my", icon: BookOpen },
  { key: "certificatesEarned", label: "Sertifikat", href: "/certificates", icon: Award },
  { key: "assetsOwned", label: "Aset Dimiliki", href: "/marketplace?tab=my", icon: Layers },
  { key: "eventsAttended", label: "Acara Diikuti", href: "/events?tab=my-tickets", icon: CalendarCheck },
];

export default function ActivityStatsCard({
  stats,
  isLoading = false,
}: ActivityStatsCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-7 animate-pulse">
        <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-32 mb-5" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-7"
    >
      <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-1">
        Aktivitas
      </h3>
      <p className="text-sm text-neutral-500 dark:text-white/40 mb-5">
        Ringkasan aktivitas belajar dan kontribusi Anda di CreTechin.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CONFIG.map((config, idx) => {
          const Icon = config.icon;
          const value = stats[config.key];
          return (
            <motion.div
              key={config.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.35 + idx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={config.href}
                aria-label={`Lihat ${config.label}: ${value}`}
                className="group block h-full bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-4 sm:p-5 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center justify-center w-9 h-9 mb-3 text-neutral-600 dark:text-white/60 transition-colors group-hover:text-primary">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  {value}
                </p>
                <p className="text-xs text-neutral-500 dark:text-white/40 mt-1">
                  {config.label}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
