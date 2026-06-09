"use client";

import { Search, RotateCcw, Plus } from "lucide-react";
import {
  CATEGORY_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  SORT_OPTIONS,
  type ProductFilter as PF,
  type ProductCategory,
  type ProductStatus,
  type ProductSortBy,
} from "@/lib/products/types";

interface ProductFiltersProps {
  filters: PF;
  onFilterChange: (filters: Partial<PF>) => void;
  onReset: () => void;
  onAdd: () => void;
}

export default function ProductFilters({ filters, onFilterChange, onReset, onAdd }: ProductFiltersProps) {
  const hasActiveFilter =
    filters.search.trim() !== "" ||
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.productType !== "all" ||
    filters.sortBy !== "newest";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-0">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
            placeholder="Cari produk atau kreator..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
            aria-label="Cari produk"
          />
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value as ProductCategory | "all", page: 1 })}
          className="h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
          aria-label="Filter kategori"
        >
          {CATEGORY_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value as ProductStatus | "all", page: 1 })}
          className="h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
          aria-label="Filter status"
        >
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as ProductSortBy })}
          className="h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
          aria-label="Urutkan"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={onReset}
            className="h-10 px-3 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-1.5"
            title="Reset filter"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="h-10 px-4 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all inline-flex items-center gap-2 shadow-sm hover:shadow-md flex-shrink-0"
      >
        <Plus className="w-4 h-4" />
        Tambah Produk Baru
      </button>
    </div>
  );
}
