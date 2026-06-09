"use client";

import { Search, Plus, RotateCcw, Download, ChevronDown } from "lucide-react";
import type { JoinPeriod, UserFilter, UserRole, UserSortBy, UserStatus } from "@/lib/users/types";
import { getRoleLabel, getStatusLabel } from "@/lib/users/utils";

interface UserToolbarProps {
  filters: UserFilter;
  onFilterChange: (next: Partial<UserFilter>) => void;
  onReset: () => void;
  onExport: () => void;
  onAddUser: () => void;
  hasActiveFilters: boolean;
}

const ROLE_OPTIONS: Array<UserRole | "all"> = ["all", "admin", "user"];
const STATUS_OPTIONS: Array<UserStatus | "all"> = [
  "all",
  "active",
  "suspended",
  "banned",
];
const PERIOD_OPTIONS: Array<{ value: JoinPeriod; label: string }> = [
  { value: "all", label: "Semua Waktu" },
  { value: "7days", label: "7 Hari Terakhir" },
  { value: "30days", label: "30 Hari Terakhir" },
  { value: "3months", label: "3 Bulan Terakhir" },
  { value: "this_year", label: "Tahun Ini" },
];
const SORT_OPTIONS: Array<{ value: UserSortBy; label: string }> = [
  { value: "newest", label: "Terbaru Bergabung" },
  { value: "oldest", label: "Terlama Bergabung" },
  { value: "name_asc", label: "Nama A-Z" },
  { value: "name_desc", label: "Nama Z-A" },
];

function Select<T extends string>({
  value,
  onChange,
  options,
  renderLabel,
}: {
  value: T;
  onChange: (v: T) => void;
  options: T[];
  renderLabel: (v: T) => string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-10 cursor-pointer appearance-none rounded-xl border border-black/5 bg-white pl-3 pr-9 text-sm text-neutral-700 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {renderLabel(opt)}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
    </div>
  );
}

export function UserToolbar({
  filters,
  onFilterChange,
  onReset,
  onExport,
  onAddUser,
  hasActiveFilters,
}: UserToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Cari nama atau email..."
            className="h-10 w-full rounded-xl border border-black/5 bg-white pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
          />
        </div>

        <Select
          value={filters.role}
          onChange={(v) => onFilterChange({ role: v, page: 1 })}
          options={ROLE_OPTIONS as UserRole[]}
          renderLabel={(v) =>
            v === "all" ? "Semua Role" : getRoleLabel(v as UserRole)
          }
        />

        <Select
          value={filters.status}
          onChange={(v) => onFilterChange({ status: v, page: 1 })}
          options={STATUS_OPTIONS as UserStatus[]}
          renderLabel={(v) =>
            v === "all" ? "Semua Status" : getStatusLabel(v as UserStatus)
          }
        />

        <Select
          value={filters.joinPeriod}
          onChange={(v) => onFilterChange({ joinPeriod: v as JoinPeriod, page: 1 })}
          options={PERIOD_OPTIONS.map((o) => o.value)}
          renderLabel={(v) =>
            PERIOD_OPTIONS.find((o) => o.value === v)?.label ?? "Periode"
          }
        />

        <Select
          value={filters.sortBy}
          onChange={(v) => onFilterChange({ sortBy: v as UserSortBy })}
          options={SORT_OPTIONS.map((o) => o.value)}
          renderLabel={(v) =>
            SORT_OPTIONS.find((o) => o.value === v)?.label ?? "Urutkan"
          }
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-black/5 bg-white px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-neutral-900 transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Download className="h-4 w-4" />
          Unduh Data CSV
        </button>
        <button
          type="button"
          onClick={onAddUser}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-black/5 bg-white px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <Plus className="h-4 w-4" />
          Tambah Pengguna Baru
        </button>
      </div>
    </div>
  );
}
