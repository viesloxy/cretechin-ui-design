"use client";

import { motion } from "framer-motion";
import { Package, LayoutDashboard, FileCode, HardDrive } from "lucide-react";

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
    used: number;
    limit: number;
    percentage: number;
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
  const uiKitCount = breakdownByCategory["ui-kit"];
  const templateCount = breakdownByCategory["template"];

  return (
    <section className="py-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 p-4 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-2xl"
        >
          {/* Total Aset */}
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-neutral-700 dark:text-white/70 whitespace-nowrap">
              {totalAssets} Aset
            </span>
          </div>

          {/* UI Kit */}
          {uiKitCount > 0 && (
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-neutral-700 dark:text-white/70 whitespace-nowrap">
                UI Kit {uiKitCount}
              </span>
            </div>
          )}

          {/* Template */}
          {templateCount > 0 && (
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-neutral-700 dark:text-white/70 whitespace-nowrap">
                Template {templateCount}
              </span>
            </div>
          )}

          {/* Penyimpanan */}
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-neutral-700 dark:text-white/70 whitespace-nowrap">
              {formatStorage(storage.used)} / {formatStorage(storage.limit)}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
