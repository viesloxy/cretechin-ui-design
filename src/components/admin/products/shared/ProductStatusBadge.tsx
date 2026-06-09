"use client";

import { CheckCircle2, FileEdit, AlertCircle } from "lucide-react";
import type { ProductStatus } from "@/lib/products/types";
import { STATUS_LABELS } from "@/lib/products/types";

interface ProductStatusBadgeProps {
  status: ProductStatus;
  size?: "sm" | "md";
}

export default function ProductStatusBadge({ status, size = "md" }: ProductStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const { Icon, label, classes } = config;
  const sizeClasses = size === "sm" ? "text-[10px] px-1.5 py-0.5 gap-1" : "text-xs px-2 py-0.5 gap-1";
  const iconSize = size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3";

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${sizeClasses} ${classes}`}
    >
      <Icon className={iconSize} />
      {STATUS_LABELS[status]}
    </span>
  );
}

const STATUS_CONFIG: Record<
  ProductStatus,
  { Icon: React.ComponentType<{ className?: string }>; label: string; classes: string }
> = {
  published: {
    Icon: CheckCircle2,
    label: "Published",
    classes: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  },
  draft: {
    Icon: FileEdit,
    label: "Draft",
    classes: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  },
  out_of_stock: {
    Icon: AlertCircle,
    label: "Habis",
    classes: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  },
};
