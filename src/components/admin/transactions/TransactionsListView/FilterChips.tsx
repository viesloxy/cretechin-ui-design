"use client";

import { X, RotateCcw } from "lucide-react";
import type {
  DateRangePreset,
  ItemType,
  PaymentMethodGroup,
  PaymentMethodId,
  TransactionFilter,
  TransactionStatus,
} from "@/lib/transactions/types";
import {
  getItemTypeLabel,
  getPaymentGroupLabel,
  getPaymentLabel,
  getStatusLabel,
} from "@/lib/transactions/utils";

interface FilterChipsProps {
  filters: TransactionFilter;
  onFilterChange: (next: Partial<TransactionFilter>) => void;
  onReset: () => void;
}

const PERIOD_LABEL: Record<DateRangePreset, string> = {
  all: "Semua",
  today: "Hari Ini",
  "7days": "7 Hari",
  "30days": "30 Hari",
  this_month: "Bulan Ini",
  "3months": "3 Bulan",
  custom: "Custom",
};

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

function buildChips(
  filters: TransactionFilter,
  onFilterChange: (next: Partial<TransactionFilter>) => void,
): Chip[] {
  const chips: Chip[] = [];
  if (filters.status !== "all") {
    chips.push({
      key: "status",
      label: `Status: ${getStatusLabel(filters.status as TransactionStatus)}`,
      onRemove: () => onFilterChange({ status: "all", page: 1 }),
    });
  }
  if (filters.itemType !== "all") {
    chips.push({
      key: "type",
      label: `Tipe: ${getItemTypeLabel(filters.itemType as ItemType)}`,
      onRemove: () => onFilterChange({ itemType: "all", page: 1 }),
    });
  }
  if (filters.paymentGroup !== "all") {
    chips.push({
      key: "pgroup",
      label: `Group: ${getPaymentGroupLabel(filters.paymentGroup as PaymentMethodGroup)}`,
      onRemove: () => onFilterChange({ paymentGroup: "all", page: 1 }),
    });
  }
  if (filters.paymentMethod !== "all") {
    chips.push({
      key: "pmethod",
      label: `Metode: ${getPaymentLabel(filters.paymentMethod as PaymentMethodId)}`,
      onRemove: () => onFilterChange({ paymentMethod: "all", page: 1 }),
    });
  }
  if (filters.datePreset !== "all") {
    chips.push({
      key: "period",
      label: `Periode: ${PERIOD_LABEL[filters.datePreset]}`,
      onRemove: () => onFilterChange({ datePreset: "all", page: 1 }),
    });
  }
  if (filters.search.trim() !== "") {
    chips.push({
      key: "search",
      label: `Pencarian: "${filters.search}"`,
      onRemove: () => onFilterChange({ search: "", page: 1 }),
    });
  }
  return chips;
}

export function FilterChips({ filters, onFilterChange, onReset }: FilterChipsProps) {
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
