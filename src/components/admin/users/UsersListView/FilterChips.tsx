"use client";

import { X, RotateCcw } from "lucide-react";
import type { JoinPeriod, UserFilter, UserRole, UserStatus } from "@/lib/users/types";
import { getRoleLabel, getStatusLabel } from "@/lib/users/utils";

interface FilterChipsProps {
  filters: UserFilter;
  onFilterChange: (next: Partial<UserFilter>) => void;
  onReset: () => void;
}

interface ChipDescriptor {
  key: string;
  label: string;
  onRemove: () => void;
}

const PERIOD_LABELS: Record<JoinPeriod, string> = {
  all: "Semua",
  "7days": "7 Hari",
  "30days": "30 Hari",
  "3months": "3 Bulan",
  this_year: "Tahun Ini",
};

const SORT_LABELS = {
  newest: "Terbaru",
  oldest: "Terlama",
  name_asc: "A-Z",
  name_desc: "Z-A",
} as const;

function buildChips(
  filters: UserFilter,
  onFilterChange: (next: Partial<UserFilter>) => void,
): ChipDescriptor[] {
  const chips: ChipDescriptor[] = [];

  if (filters.role !== "all") {
    chips.push({
      key: "role",
      label: `Role: ${getRoleLabel(filters.role as UserRole)}`,
      onRemove: () => onFilterChange({ role: "all", page: 1 }),
    });
  }
  if (filters.status !== "all") {
    chips.push({
      key: "status",
      label: `Status: ${getStatusLabel(filters.status as UserStatus)}`,
      onRemove: () => onFilterChange({ status: "all", page: 1 }),
    });
  }
  if (filters.joinPeriod !== "all") {
    chips.push({
      key: "period",
      label: `Bergabung: ${PERIOD_LABELS[filters.joinPeriod]}`,
      onRemove: () => onFilterChange({ joinPeriod: "all", page: 1 }),
    });
  }
  if (filters.search.trim() !== "") {
    chips.push({
      key: "search",
      label: `Pencarian: "${filters.search}"`,
      onRemove: () => onFilterChange({ search: "", page: 1 }),
    });
  }
  if (filters.sortBy !== "newest") {
    chips.push({
      key: "sort",
      label: `Urutkan: ${SORT_LABELS[filters.sortBy] ?? filters.sortBy}`,
      onRemove: () => onFilterChange({ sortBy: "newest" }),
    });
  }
  return chips;
}

export function FilterChips({
  filters,
  onFilterChange,
  onReset,
}: FilterChipsProps) {
  const chips = buildChips(filters, onFilterChange);
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200"
        >
          {chip.label}
          <button
            type="button"
            onClick={chip.onRemove}
            className="rounded-full p-0.5 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label={`Hapus filter ${chip.label}`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-neutral-500 transition hover:text-neutral-900 dark:hover:text-white"
      >
        <RotateCcw className="h-3 w-3" />
        Reset Semua
      </button>
    </div>
  );
}
