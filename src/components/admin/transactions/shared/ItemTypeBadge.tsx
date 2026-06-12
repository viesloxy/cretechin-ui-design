"use client";

import { GraduationCap, Package, Ticket } from "lucide-react";
import type { ItemType } from "@/lib/transactions/types";
import { getItemTypeLabel } from "@/lib/transactions/utils";

interface ItemTypeBadgeProps {
  type: ItemType;
  size?: "sm" | "md";
}

const TYPE_CONFIG: Record<
  ItemType,
  { Icon: typeof GraduationCap; classes: string }
> = {
  course: {
    Icon: GraduationCap,
    classes: "bg-primary/10 text-primary border-primary/20",
  },
  product: {
    Icon: Package,
    classes: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/40",
  },
  event: {
    Icon: Ticket,
    classes: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/40",
  },
};

export function ItemTypeBadge({ type, size = "sm" }: ItemTypeBadgeProps) {
  const { Icon, classes } = TYPE_CONFIG[type];
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  const iconSize = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold uppercase tracking-wider ${sizeClasses} ${classes}`}
    >
      <Icon className={iconSize} />
      {getItemTypeLabel(type)}
    </span>
  );
}
