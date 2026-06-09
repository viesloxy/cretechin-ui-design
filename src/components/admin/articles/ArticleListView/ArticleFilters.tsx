"use client";

import { Search, RotateCcw, X } from "lucide-react";
import type { SortBy } from "@/lib/articles/types";

interface ArticleFiltersProps {
  searchQuery: string;
  categoryFilter: string;
  statusFilter: string;
  sortBy: SortBy;
  onSearchChange: (q: string) => void;
  onCategoryChange: (c: string) => void;
  onStatusChange: (s: string) => void;
  onSortChange: (s: SortBy) => void;
  onReset: () => void;
  categoryOptions: { value: string; label: string }[];
}

export default function ArticleFilters({
  searchQuery,
  categoryFilter,
  statusFilter,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onReset,
  categoryOptions,
}: ArticleFiltersProps) {
  const isFiltered =
    searchQuery !== "" ||
    categoryFilter !== "all" ||
    statusFilter !== "all" ||
    sortBy !== "newest";

  const selectClass = `
    h-10 px-3 rounded-xl
    bg-white dark:bg-neutral-900
    border border-black/10 dark:border-white/10
    text-sm text-neutral-700 dark:text-white/80
    focus:outline-none focus:border-primary
    transition-colors
    cursor-pointer
  `;

  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-colors"
            aria-label="Cari artikel"
          />
        </div>

        {/* Filter Group */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={selectClass}
            aria-label="Filter kategori"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value === "all" ? "Semua Kategori" : opt.label}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className={selectClass}
            aria-label="Filter status"
          >
            <option value="all">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className={selectClass}
            aria-label="Urutkan"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="popular">Paling Dilihat</option>
            <option value="title">Judul A-Z</option>
          </select>

          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="h-10 w-10 flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-white/60 hover:border-primary hover:text-primary transition-colors"
              aria-label="Reset filter"
              title="Reset filter"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2">
          {searchQuery && (
            <Chip label={`Pencarian: "${searchQuery}"`} onRemove={() => onSearchChange("")} />
          )}
          {categoryFilter !== "all" && (
            <Chip
              label={`Kategori: ${categoryOptions.find((c) => c.value === categoryFilter)?.label}`}
              onRemove={() => onCategoryChange("all")}
            />
          )}
          {statusFilter !== "all" && (
            <Chip
              label={`Status: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}`}
              onRemove={() => onStatusChange("all")}
            />
          )}
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-xs font-medium border border-primary/20">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
        aria-label={`Hapus filter ${label}`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
