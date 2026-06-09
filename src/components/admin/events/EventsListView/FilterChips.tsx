"use client";

import { X, RotateCcw } from "lucide-react";
import type { EventFilter, EventStatus, EventType, LocationType } from "@/lib/events/types";
import {
  EVENT_TYPE_LABELS,
  EVENT_STATUS_LABELS,
  LOCATION_TYPE_LABELS_MAP,
} from "@/lib/events/utils";

interface FilterChipsProps {
  filters: EventFilter;
  onFilterChange: (next: Partial<EventFilter>) => void;
  onReset: () => void;
}

interface ChipDescriptor {
  key: string;
  label: string;
  onRemove: () => void;
}

function buildChips(
  filters: EventFilter,
  onFilterChange: (next: Partial<EventFilter>) => void,
): ChipDescriptor[] {
  const chips: ChipDescriptor[] = [];

  if (filters.type !== "all") {
    chips.push({
      key: "type",
      label: `Tipe: ${EVENT_TYPE_LABELS[filters.type as EventType]}`,
      onRemove: () => onFilterChange({ type: "all", page: 1 }),
    });
  }
  if (filters.status !== "all") {
    chips.push({
      key: "status",
      label: `Status: ${EVENT_STATUS_LABELS[filters.status as EventStatus]}`,
      onRemove: () => onFilterChange({ status: "all", page: 1 }),
    });
  }
  if (filters.locationType !== "all") {
    chips.push({
      key: "location",
      label: `Lokasi: ${
        LOCATION_TYPE_LABELS_MAP[filters.locationType as LocationType]
      }`,
      onRemove: () => onFilterChange({ locationType: "all", page: 1 }),
    });
  }
  if (filters.search.trim() !== "") {
    chips.push({
      key: "search",
      label: `Pencarian: "${filters.search}"`,
      onRemove: () => onFilterChange({ search: "", page: 1 }),
    });
  }
  if (filters.sortBy !== "nearest") {
    chips.push({
      key: "sort",
      label: `Urutkan: ${
        filters.sortBy === "farthest"
          ? "Terjauh"
          : filters.sortBy === "newest"
            ? "Terbaru"
            : filters.sortBy === "title_asc"
              ? "Judul A-Z"
              : filters.sortBy === "capacity_low"
                ? "Kuota Terendah"
                : "Kuota Tertinggi"
      }`,
      onRemove: () => onFilterChange({ sortBy: "nearest" }),
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
