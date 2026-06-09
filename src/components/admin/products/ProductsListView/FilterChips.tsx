"use client";

import { X } from "lucide-react";
import {
  CATEGORY_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  SORT_LABELS,
  type ProductFilter as PF,
} from "@/lib/products/types";

interface FilterChipsProps {
  filters: PF;
  onRemove: (key: keyof PF) => void;
  onReset: () => void;
}

export default function FilterChips({ filters, onRemove, onReset }: FilterChipsProps) {
  const chips: { key: keyof PF; label: string }[] = [];

  if (filters.search.trim()) {
    chips.push({ key: "search", label: `Cari: "${filters.search}"` });
  }
  if (filters.category !== "all") {
    const opt = CATEGORY_FILTER_OPTIONS.find((o) => o.value === filters.category);
    if (opt) chips.push({ key: "category", label: `Kategori: ${opt.label}` });
  }
  if (filters.status !== "all") {
    const opt = STATUS_FILTER_OPTIONS.find((o) => o.value === filters.status);
    if (opt) chips.push({ key: "status", label: `Status: ${opt.label}` });
  }
  if (filters.sortBy !== "newest") {
    chips.push({ key: "sortBy", label: `Urut: ${SORT_LABELS[filters.sortBy]}` });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.key)}
            aria-label={`Hapus filter ${chip.label}`}
            className="hover:text-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="text-xs font-medium text-primary-dark hover:underline"
      >
        Reset semua
      </button>
    </div>
  );
}
