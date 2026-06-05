"use client";

import {
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  Hourglass,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { STATUS_LABELS } from "./format";
import type { TransactionStatus } from "./types";

interface StatusBadgeProps {
  status: TransactionStatus;
  size?: "sm" | "md";
  className?: string;
}

const ICONS: Record<
  TransactionStatus,
  React.ComponentType<{ className?: string }>
> = {
  paid: CheckCircle2,
  pending: Clock,
  failed: XCircle,
  refunded: RotateCcw,
  expired: Hourglass,
};

const STYLES: Record<TransactionStatus, string> = {
  paid: "bg-primary/10 text-primary",
  pending:
    "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-white/70",
  failed:
    "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white/70",
  refunded:
    "bg-primary/5 text-primary border border-primary/20",
  expired:
    "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-white/40",
};

export default function StatusBadge({
  status,
  size = "md",
  className,
}: StatusBadgeProps) {
  const Icon = ICONS[status];
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <span
      role="status"
      aria-label={`Status: ${STATUS_LABELS[status]}`}
      className={twMerge(
        "inline-flex items-center gap-1.5 rounded-full text-xs font-semibold",
        size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1",
        STYLES[status],
        className,
      )}
    >
      <Icon
        className={twMerge(iconSize, status === "pending" && "animate-pulse")}
      />
      {STATUS_LABELS[status]}
    </span>
  );
}
