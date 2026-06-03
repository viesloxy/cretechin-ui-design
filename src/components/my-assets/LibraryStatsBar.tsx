"use client";

import { motion } from "framer-motion";
import { Package, LayoutDashboard, FileCode, Image, HardDrive } from "lucide-react";

export type CategoryFilter =
  | "all"
  | "ui-kit"
  | "template"
  | "mockup"
  | "icon"
  | "font"
  | "illustration"
  | "source-code";

interface LibraryStatsBarProps {
  totalAssets: number;
  breakdownByCategory: Record<CategoryFilter, number>;
  storage: {
    used: number; // in bytes
    limit: number; // in bytes
    percentage: number; // 0-100
  };
}

function formatStorage(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
  }
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export default function LibraryStatsBar({
  totalAssets,
  breakdownByCategory,
  storage,
}: LibraryStatsBarProps) {
  const topCategories = (Object.entries(breakdownByCategory) as [CategoryFilter, number][])
    .filter(([key, value]) => key !== "all" && value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <section className="py-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-2xl p-4 sm:p-5"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Aset */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-lg p-1.5 sm:p-2 flex items-center justify-center">
                <Package className="w-full h-full text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-500 dark:text-white/50 font-medium uppercase tracking-wide">
                  Total Aset
                </p>
                <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white truncate">
                  {totalAssets} Aset
                </p>
              </div>
            </div>

            {/* Top Category 1 */}
            {topCategories[0] && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-lg p-1.5 sm:p-2 flex items-center justify-center">
                  <LayoutDashboard className="w-full h-full text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-neutral-500 dark:text-white/50 font-medium uppercase tracking-wide">
                    UI Kit
                  </p>
                  <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white truncate">
                    {breakdownByCategory["ui-kit"]}
                  </p>
                </div>
              </div>
            )}

            {/* Top Category 2 */}
            {topCategories[1] && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-lg p-1.5 sm:p-2 flex items-center justify-center">
                  <FileCode className="w-full h-full text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-neutral-500 dark:text-white/50 font-medium uppercase tracking-wide">
                    Template
                  </p>
                  <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white truncate">
                    {breakdownByCategory["template"]}
                  </p>
                </div>
              </div>
            )}

            {/* Storage */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-lg p-1.5 sm:p-2 flex items-center justify-center">
                <HardDrive className="w-full h-full text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-500 dark:text-white/50 font-medium uppercase tracking-wide">
                  Penyimpanan
                </p>
                <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white truncate">
                  {formatStorage(storage.used)} / {formatStorage(storage.limit)}
                </p>
              </div>
            </div>
          </div>

          {/* Storage Progress Bar */}
          <div className="mt-3 sm:mt-4">
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(storage.percentage, 100)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-neutral-500 dark:text-white/50 mt-1.5">
              Kamu telah menggunakan {formatStorage(storage.used)} dari {formatStorage(storage.limit)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
