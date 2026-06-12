"use client";

import { useState } from "react";
import { Search, Download, ChevronDown, RotateCcw, FileText, Printer } from "lucide-react";
import type {
  DateRangePreset,
  ItemType,
  PaymentMethodGroup,
  PaymentMethodId,
  TransactionFilter,
  TransactionSortBy,
  TransactionStatus,
} from "@/lib/transactions/types";
import {
  getItemTypeLabel,
  getPaymentGroupLabel,
  getPaymentLabel,
  getStatusLabel,
} from "@/lib/transactions/utils";

interface TransactionToolbarProps {
  filters: TransactionFilter;
  onFilterChange: (next: Partial<TransactionFilter>) => void;
  onReset: () => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
  hasActiveFilters: boolean;
}

const STATUS_OPTIONS: Array<TransactionStatus | "all"> = [
  "all",
  "berhasil",
  "tertunda",
  "gagal",
  "refund",
  "expired",
];
const TYPE_OPTIONS: Array<ItemType | "all"> = ["all", "course", "product", "event"];
const GROUP_OPTIONS: Array<PaymentMethodGroup | "all"> = [
  "all",
  "ewallet",
  "virtualaccount",
  "creditcard",
];
const METHOD_OPTIONS: Array<PaymentMethodId | "all"> = [
  "all",
  "gopay",
  "ovo",
  "dana",
  "shopeepay",
  "bca_va",
  "mandiri_va",
  "bni_va",
  "visa",
  "mastercard",
];
const PERIOD_OPTIONS: Array<{ value: DateRangePreset; label: string }> = [
  { value: "all", label: "Semua Waktu" },
  { value: "today", label: "Hari Ini" },
  { value: "7days", label: "7 Hari Terakhir" },
  { value: "30days", label: "30 Hari Terakhir" },
  { value: "this_month", label: "Bulan Ini" },
  { value: "3months", label: "3 Bulan Terakhir" },
  { value: "custom", label: "Custom Range" },
];
const SORT_OPTIONS: Array<{ value: TransactionSortBy; label: string }> = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "amount_high", label: "Total Tertinggi" },
  { value: "amount_low", label: "Total Terendah" },
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

export function TransactionToolbar({
  filters,
  onFilterChange,
  onReset,
  onExportCSV,
  onExportPDF,
  hasActiveFilters,
}: TransactionToolbarProps) {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              placeholder="Cari invoice, nama, email, atau item..."
              className="h-10 w-full rounded-xl border border-black/5 bg-white pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
            />
          </div>

          <Select
            value={filters.status}
            onChange={(v) => onFilterChange({ status: v, page: 1 })}
            options={STATUS_OPTIONS as TransactionStatus[]}
            renderLabel={(v) =>
              v === "all" ? "Semua Status" : getStatusLabel(v as TransactionStatus)
            }
          />

          <Select
            value={filters.itemType}
            onChange={(v) => onFilterChange({ itemType: v, page: 1 })}
            options={TYPE_OPTIONS as ItemType[]}
            renderLabel={(v) =>
              v === "all" ? "Semua Tipe" : getItemTypeLabel(v as ItemType)
            }
          />

          <Select
            value={filters.paymentGroup}
            onChange={(v) => onFilterChange({ paymentGroup: v, page: 1 })}
            options={GROUP_OPTIONS as PaymentMethodGroup[]}
            renderLabel={(v) =>
              v === "all"
                ? "Semua Metode"
                : getPaymentGroupLabel(v as PaymentMethodGroup)
            }
          />

          <Select
            value={filters.datePreset}
            onChange={(v) => onFilterChange({ datePreset: v as DateRangePreset, page: 1 })}
            options={PERIOD_OPTIONS.map((o) => o.value)}
            renderLabel={(v) =>
              PERIOD_OPTIONS.find((o) => o.value === v)?.label ?? "Periode"
            }
          />

          <Select
            value={filters.sortBy}
            onChange={(v) => onFilterChange({ sortBy: v as TransactionSortBy })}
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

        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExportOpen((v) => !v)}
            onBlur={() => setTimeout(() => setExportOpen(false), 150)}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-neutral-900 transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Unduh Laporan
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {exportOpen && (
            <div className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-black/5 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-neutral-900">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setExportOpen(false);
                  onExportCSV();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 transition hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <FileText className="h-4 w-4 text-green-600" />
                <span>
                  <span className="block font-medium">CSV</span>
                  <span className="block text-[10px] text-neutral-500">
                    Excel-compatible (UTF-8 BOM)
                  </span>
                </span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setExportOpen(false);
                  onExportPDF();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 transition hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <Printer className="h-4 w-4 text-red-600" />
                <span>
                  <span className="block font-medium">PDF (Print)</span>
                  <span className="block text-[10px] text-neutral-500">
                    Cetak dialog browser
                  </span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {filters.datePreset === "custom" && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-black/5 bg-white p-2 dark:border-white/10 dark:bg-neutral-900">
          <span className="px-1 text-xs font-medium text-neutral-500">Dari:</span>
          <input
            type="date"
            value={filters.customDateFrom}
            onChange={(e) => onFilterChange({ customDateFrom: e.target.value, page: 1 })}
            className="h-8 rounded-lg border border-black/5 bg-white px-2 text-xs text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200"
          />
          <span className="px-1 text-xs font-medium text-neutral-500">Sampai:</span>
          <input
            type="date"
            value={filters.customDateTo}
            onChange={(e) => onFilterChange({ customDateTo: e.target.value, page: 1 })}
            className="h-8 rounded-lg border border-black/5 bg-white px-2 text-xs text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200"
          />
        </div>
      )}
    </div>
  );
}
