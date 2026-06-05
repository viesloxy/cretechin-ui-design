"use client";

import { Receipt, Wallet, Clock } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { formatRupiah } from "@/lib/format";
import type { TransactionsSummary as Summary } from "./types";

interface TransactionsSummaryProps {
  summary: Summary;
  isLoading?: boolean;
  onPendingClick?: () => void;
}

export default function TransactionsSummaryCards({
  summary,
  isLoading = false,
  onPendingClick,
}: TransactionsSummaryProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 sm:mb-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-2xl"
          />
        ))}
      </div>
    );
  }

  const tiles = [
    {
      key: "total",
      label: "Total Transaksi",
      value: String(summary.totalTransactions),
      icon: Receipt,
      clickable: false,
    },
    {
      key: "spent",
      label: "Total Belanja",
      value: formatRupiah(summary.totalSpent),
      icon: Wallet,
      clickable: false,
    },
    {
      key: "pending",
      label: "Tertunda",
      value: String(summary.pendingCount),
      icon: Clock,
      clickable: !!onPendingClick && summary.pendingCount > 0,
      highlight: summary.pendingCount > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 sm:mb-8">
      {tiles.map((tile) => {
        const Icon = tile.icon;
        const Tag = tile.clickable ? "button" : "div";
        return (
          <Tag
            key={tile.key}
            type={tile.clickable ? "button" : undefined}
            onClick={tile.clickable ? onPendingClick : undefined}
            className={twMerge(
              "bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-4 sm:p-5 text-left transition-colors",
              tile.clickable && "hover:border-primary/40 cursor-pointer",
              tile.highlight &&
                "ring-1 ring-primary/30 border-primary/30",
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={twMerge(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  tile.highlight
                    ? "bg-primary/15"
                    : "bg-neutral-100 dark:bg-neutral-800",
                )}
              >
                <Icon
                  className={twMerge(
                    "w-4 h-4",
                    tile.highlight
                      ? "text-primary"
                      : "text-neutral-600 dark:text-white/50",
                  )}
                />
              </div>
              <span className="text-xs text-neutral-500 dark:text-white/40 font-medium">
                {tile.label}
              </span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white truncate">
              {tile.value}
            </p>
          </Tag>
        );
      })}
    </div>
  );
}
