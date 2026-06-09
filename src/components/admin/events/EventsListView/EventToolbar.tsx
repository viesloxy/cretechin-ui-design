"use client";

import {
  Search,
  Plus,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import type { EventFilter, EventSortBy, EventStatus, EventType, LocationType } from "@/lib/events/types";
import {
  EVENT_TYPE_LABELS,
  EVENT_STATUS_LABELS,
  LOCATION_TYPE_LABELS_MAP,
} from "@/lib/events/utils";

interface EventToolbarProps {
  filters: EventFilter;
  onFilterChange: (next: Partial<EventFilter>) => void;
  onReset: () => void;
  onAdd: () => void;
  hasActiveFilters: boolean;
}

const TYPE_OPTIONS: Array<EventType | "all"> = [
  "all",
  "webinar",
  "workshop",
  "talkshow",
  "conference",
  "meetup",
  "networking",
];

const STATUS_OPTIONS: Array<EventStatus | "all"> = [
  "all",
  "upcoming",
  "ongoing",
  "finished",
  "draft",
];

const LOCATION_OPTIONS: Array<LocationType | "all"> = [
  "all",
  "online",
  "offline",
];

const SORT_OPTIONS: Array<{ value: EventSortBy; label: string }> = [
  { value: "nearest", label: "Terdekat" },
  { value: "farthest", label: "Terjauh" },
  { value: "newest", label: "Terbaru Dibuat" },
  { value: "title_asc", label: "Judul A-Z" },
  { value: "capacity_low", label: "Kuota Terendah" },
  { value: "capacity_high", label: "Kuota Tertinggi" },
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

export function EventToolbar({
  filters,
  onFilterChange,
  onReset,
  onAdd,
  hasActiveFilters,
}: EventToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Cari acara, pembicara, atau topik..."
            className="h-10 w-full rounded-xl border border-black/5 bg-white pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
          />
        </div>

        <Select
          value={filters.type}
          onChange={(v) => onFilterChange({ type: v, page: 1 })}
          options={TYPE_OPTIONS as EventType[]}
          renderLabel={(v) =>
            v === "all" ? "Semua Tipe" : EVENT_TYPE_LABELS[v as EventType]
          }
        />

        <Select
          value={filters.status}
          onChange={(v) => onFilterChange({ status: v, page: 1 })}
          options={STATUS_OPTIONS as EventStatus[]}
          renderLabel={(v) =>
            v === "all" ? "Semua Status" : EVENT_STATUS_LABELS[v as EventStatus]
          }
        />

        <Select
          value={filters.locationType}
          onChange={(v) => onFilterChange({ locationType: v, page: 1 })}
          options={LOCATION_OPTIONS as LocationType[]}
          renderLabel={(v) =>
            v === "all" ? "Semua Lokasi" : LOCATION_TYPE_LABELS_MAP[v as LocationType]
          }
        />

        <Select
          value={filters.sortBy}
          onChange={(v) => onFilterChange({ sortBy: v as EventSortBy })}
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

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-neutral-900 transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Plus className="h-4 w-4" />
        Tambah Acara Baru
      </button>
    </div>
  );
}
