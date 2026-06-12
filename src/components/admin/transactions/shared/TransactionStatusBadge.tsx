"use client";

import { CheckCircle2, Clock, XCircle, RotateCcw, Timer } from "lucide-react";
import type { TransactionStatus } from "@/lib/transactions/types";
import { getStatusLabel } from "@/lib/transactions/utils";

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
  size?: "sm" | "md";
}

const STATUS_CONFIG: Record<
  TransactionStatus,
  { Icon: typeof CheckCircle2; classes: string }
> = {
  berhasil: {
    Icon: CheckCircle2,
    classes: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  },
  tertunda: {
    Icon: Clock,
    classes: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  },
  gagal: {
    Icon: XCircle,
    classes: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  },
  refund: {
    Icon: RotateCcw,
    classes: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  },
  expired: {
    Icon: Timer,
    classes: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-300",
  },
};

export function TransactionStatusBadge({
  status,
  size = "sm",
}: TransactionStatusBadgeProps) {
  const { Icon, classes } = STATUS_CONFIG[status];
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  const iconSize = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wider ${sizeClasses} ${classes}`}
    >
      <Icon className={iconSize} />
      {getStatusLabel(status)}
    </span>
  );
}
