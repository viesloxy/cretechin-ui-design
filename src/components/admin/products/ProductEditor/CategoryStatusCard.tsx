"use client";

import SettingsCard from "@/components/admin/articles/ArticleEditor/SettingsCard";
import { CATEGORY_LABELS, CATEGORY_FILTER_OPTIONS, type ProductCategory } from "@/lib/products/types";
import { ProductTypeBadge } from "../shared";
import type { ProductType } from "@/lib/products/types";

interface CategoryStatusCardProps {
  category: ProductCategory;
  productType: ProductType;
  onCategoryChange: (c: ProductCategory) => void;
}

export default function CategoryStatusCard({
  category,
  productType,
  onCategoryChange,
}: CategoryStatusCardProps) {
  return (
    <SettingsCard title="Kategori & Tipe" badge="Wajib">
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
            Kategori <span className="text-primary">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as ProductCategory)}
            className="mt-1.5 w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
            aria-label="Kategori produk"
          >
            {CATEGORY_FILTER_OPTIONS.filter((o) => o.value !== "all").map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <label className="text-xs text-neutral-500 dark:text-neutral-400">Tipe Produk</label>
          <div className="mt-1.5">
            <ProductTypeBadge type={productType} />
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}
