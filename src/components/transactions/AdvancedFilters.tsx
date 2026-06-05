"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import type {
  TransactionTypeFilter,
  TransactionPeriodFilter,
} from "./types";

interface AdvancedFiltersProps {
  type: TransactionTypeFilter;
  period: TransactionPeriodFilter;
  onTypeChange: (t: TransactionTypeFilter) => void;
  onPeriodChange: (p: TransactionPeriodFilter) => void;
  onReset: () => void;
}

const TYPE_OPTIONS: { value: TransactionTypeFilter; label: string }[] = [
  { value: "all", label: "Semua Tipe" },
  { value: "course", label: "Kursus" },
  { value: "asset", label: "Aset Digital" },
  { value: "event", label: "Acara" },
];

const PERIOD_OPTIONS: {
  value: TransactionPeriodFilter;
  label: string;
}[] = [
  { value: "7d", label: "7 hari terakhir" },
  { value: "30d", label: "30 hari terakhir" },
  { value: "90d", label: "90 hari terakhir" },
  { value: "1y", label: "1 tahun terakhir" },
  { value: "all", label: "Semua waktu" },
];

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

function Select({ id, label, value, onChange, options }: SelectProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium text-neutral-600 dark:text-white/50"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white rounded-full outline-none focus:border-primary transition-colors px-4 py-2 pr-10 text-sm cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
      </div>
    </div>
  );
}

export default function AdvancedFilters({
  type,
  period,
  onTypeChange,
  onPeriodChange,
  onReset,
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isFiltered = type !== "all" || period !== "all";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="advanced-filters-panel"
          className={twMerge(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            isOpen || isFiltered
              ? "bg-primary/10 text-primary"
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-white/70 hover:bg-neutral-200 dark:hover:bg-neutral-700",
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
          {isFiltered && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="advanced-filters-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  id="filter-type"
                  label="Tipe Transaksi"
                  value={type}
                  onChange={(v) => onTypeChange(v as TransactionTypeFilter)}
                  options={TYPE_OPTIONS}
                />
                <Select
                  id="filter-period"
                  label="Periode"
                  value={period}
                  onChange={(v) => onPeriodChange(v as TransactionPeriodFilter)}
                  options={PERIOD_OPTIONS}
                />
              </div>
              {isFiltered && (
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/70 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
