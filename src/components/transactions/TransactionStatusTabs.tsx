"use client";

import { motion } from "framer-motion";
import {
  ListFilter,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { TransactionStatusFilter } from "./types";
import { STATUS_FILTER_LABELS } from "./format";

const TABS: {
  id: TransactionStatusFilter;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "all", icon: ListFilter },
  { id: "paid", icon: CheckCircle2 },
  { id: "pending", icon: Clock },
  { id: "failed", icon: XCircle },
  { id: "refunded", icon: RotateCcw },
];

interface TransactionStatusTabsProps {
  activeTab: TransactionStatusFilter;
  onTabChange: (tab: TransactionStatusFilter) => void;
  counts?: Partial<Record<TransactionStatusFilter, number>>;
}

export default function TransactionStatusTabs({
  activeTab,
  onTabChange,
  counts,
}: TransactionStatusTabsProps) {
  return (
    <section className="bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div
          role="tablist"
          aria-label="Filter status transaksi"
          className="flex justify-start sm:justify-center gap-1 sm:gap-3 py-5 sm:py-6 overflow-x-auto scrollbar-hide"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count = counts?.[tab.id] ?? 0;

            return (
              <motion.button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="transactions-list-panel"
                onClick={() => onTabChange(tab.id)}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={twMerge(
                  "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium transition-colors relative flex-shrink-0",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-neutral-600 dark:text-white/50 hover:text-primary",
                )}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  {STATUS_FILTER_LABELS[tab.id]}
                </span>
                {isActive && count > 0 && (
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeTransactionTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
