"use client";

import { Package, Download } from "lucide-react";
import type { ProductType } from "@/lib/products/types";
import { PRODUCT_TYPE_LABELS } from "@/lib/products/types";

interface ProductTypeBadgeProps {
  type: ProductType;
  size?: "sm" | "md";
}

export default function ProductTypeBadge({ type, size = "md" }: ProductTypeBadgeProps) {
  const Icon = type === "physical" ? Package : Download;
  const isPhysical = type === "physical";
  const sizeClasses = size === "sm" ? "text-[10px] px-1.5 py-0.5 gap-1" : "text-xs px-2 py-0.5 gap-1";
  const iconSize = size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3";
  const colorClasses = isPhysical
    ? "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
    : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${sizeClasses} ${colorClasses}`}>
      <Icon className={iconSize} />
      {PRODUCT_TYPE_LABELS[type]}
    </span>
  );
}
