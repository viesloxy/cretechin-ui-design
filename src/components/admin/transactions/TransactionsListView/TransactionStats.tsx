"use client";

import { motion } from "framer-motion";
import { Receipt, CheckCircle2, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { formatRupiah } from "@/lib/transactions/utils";
import type { TransactionStats as TransactionStatsType } from "@/lib/transactions/types";

interface TransactionStatsProps {
  stats: TransactionStatsType;
}

export function TransactionStats({ stats }: TransactionStatsProps) {
  const trend =
    stats.lastMonthRevenue > 0
      ? Math.round(
          ((stats.monthRevenue - stats.lastMonthRevenue) / stats.lastMonthRevenue) * 100,
        )
      : null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 md:gap-4">
      {[
        {
          label: "Total Transaksi",
          value: stats.total,
          Icon: Receipt,
          color: "text-neutral-700 dark:text-neutral-300",
          bg: "bg-neutral-100 dark:bg-neutral-800/50",
        },
        {
          label: "Berhasil",
          value: stats.berhasil,
          Icon: CheckCircle2,
          color: "text-green-700 dark:text-green-400",
          bg: "bg-green-50 dark:bg-green-900/20",
        },
        {
          label: "Tertunda",
          value: stats.tertunda,
          Icon: Clock,
          color: "text-amber-700 dark:text-amber-400",
          bg: "bg-amber-50 dark:bg-amber-900/20",
        },
        {
          label: "Gagal + Expired",
          value: stats.gagal + stats.expired,
          Icon: AlertTriangle,
          color: "text-red-700 dark:text-red-400",
          bg: "bg-red-50 dark:bg-red-900/20",
        },
      ].map((cfg, idx) => (
        <motion.div
          key={cfg.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.3 }}
          className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-neutral-900"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 min-w-0">
              <p className="text-xs font-medium text-neutral-500">{cfg.label}</p>
              <p className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                {cfg.value}
              </p>
            </div>
            <div className={`shrink-0 rounded-xl p-2 ${cfg.bg}`}>
              <cfg.Icon className={`h-4 w-4 ${cfg.color}`} />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Pendapatan card - special */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="col-span-2 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 shadow-sm dark:bg-primary/10"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
              Pendapatan Bulan Ini
            </p>
            <p className="truncate text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {formatRupiah(stats.monthRevenue)}
            </p>
            {trend !== null && (
              <p
                className={`text-[10px] font-semibold ${
                  trend >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% dari bulan lalu
              </p>
            )}
          </div>
          <div className="shrink-0 rounded-xl bg-primary/20 p-2">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
