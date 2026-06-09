"use client";

import { Package, CheckCircle2, FileEdit, AlertCircle } from "lucide-react";
import type { ProductStats } from "@/lib/products/utils";

interface ProductStatsStripProps {
  stats: ProductStats;
}

export default function ProductStatsStrip({ stats }: ProductStatsStripProps) {
  const items = [
    { label: "Total Produk", value: stats.total, Icon: Package, color: "text-neutral-700 dark:text-neutral-300", bg: "bg-neutral-100 dark:bg-neutral-800/50" },
    { label: "Published", value: stats.published, Icon: CheckCircle2, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/15" },
    { label: "Draft", value: stats.draft, Icon: FileEdit, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/15" },
    { label: "Habis", value: stats.outOfStock, Icon: AlertCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/15" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map(({ label, value, Icon, color, bg }) => (
        <div
          key={label}
          className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-4 shadow-sm shadow-black/5"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white mt-1 font-mono">{value}</p>
            </div>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
