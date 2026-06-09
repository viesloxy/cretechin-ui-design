"use client";

import { CheckCircle2, FileEdit, Clock } from "lucide-react";
import type { ArticleStatus } from "@/lib/articles/types";

interface StatusBadgeProps {
  status: ArticleStatus;
}

const config: Record<
  ArticleStatus,
  { label: string; className: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  published: {
    label: "Published",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200/50 dark:border-green-800/30",
    Icon: CheckCircle2,
  },
  draft: {
    label: "Draft",
    className:
      "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50",
    Icon: FileEdit,
  },
  scheduled: {
    label: "Scheduled",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30",
    Icon: Clock,
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className, Icon } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
      aria-label={`Status: ${label}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
