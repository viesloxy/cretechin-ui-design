"use client";

import SettingsCard from "@/components/admin/articles/ArticleEditor/SettingsCard";
import { Eye, Download, Star } from "lucide-react";
import { formatNumber, formatRelativeTime } from "@/lib/products/utils";
import type { Product } from "@/lib/products/types";

interface StatsCardProps {
  product: Product;
}

export default function StatsCard({ product }: StatsCardProps) {
  return (
    <SettingsCard title="Statistik" variant="subtle">
      <div className="space-y-2.5 text-sm">
        <Row icon={Eye} label="Dilihat" value={formatNumber(product.viewCount)} />
        <Row icon={Download} label="Terjual" value={formatNumber(product.soldCount)} />
        <Row
          icon={Star}
          label="Rating"
          value={product.rating > 0 ? `${product.rating} (${product.reviewCount})` : "Belum ada"}
        />
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-500">Dibuat</span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {formatRelativeTime(product.createdAt)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-500">Diperbarui</span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {formatRelativeTime(product.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-1.5 text-xs text-neutral-500">
        <Icon className="w-3 h-3" />
        {label}
      </span>
      <span className="font-mono font-semibold text-neutral-900 dark:text-white text-xs">{value}</span>
    </div>
  );
}
