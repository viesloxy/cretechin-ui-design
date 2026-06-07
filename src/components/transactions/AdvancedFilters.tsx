"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { twMerge } from "tailwind-merge";
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
  resultCount: number;
  totalCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
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

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  align?: "left" | "right";
}

function Dropdown({
  id,
  label,
  value,
  onChange,
  options,
  align = "left",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel =
    options.find((opt) => opt.value === value)?.label ?? label;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-700 dark:text-white/80 hover:border-primary transition-colors whitespace-nowrap"
      >
        <SlidersHorizontal className="w-4 h-4 flex-shrink-0" />
        {currentLabel}
        <ChevronDown
          className={twMerge(
            "w-4 h-4 flex-shrink-0 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={twMerge(
              "absolute mt-2 w-48 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-xl shadow-lg p-2 z-10",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={twMerge(
                  "w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors",
                  value === option.value
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-neutral-700 dark:text-white/80 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                )}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SortDropdownProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

function SortDropdown({ value, onChange, options }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel =
    options.find((opt) => opt.value === value)?.label ?? "Urutkan";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-700 dark:text-white/80 hover:border-primary transition-colors whitespace-nowrap"
      >
        <ArrowUpDown className="w-4 h-4 flex-shrink-0" />
        {currentLabel}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-xl shadow-lg p-2 z-10"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={twMerge(
                  "w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors",
                  value === option.value
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-neutral-700 dark:text-white/80 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                )}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdvancedFilters({
  type,
  period,
  onTypeChange,
  onPeriodChange,
  onReset,
  resultCount,
  totalCount,
  searchQuery,
  onSearchChange,
}: AdvancedFiltersProps) {
  const isFiltered =
    type !== "all" || period !== "all" || searchQuery.trim() !== "";

  return (
    <section className="bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4">
          {/* Left: Type filter + search */}
          <div className="flex flex-1 items-center gap-2 min-w-0">
            <Dropdown
              id="filter-type"
              label="Semua Tipe"
              value={type}
              onChange={(v) => onTypeChange(v as TransactionTypeFilter)}
              options={TYPE_OPTIONS}
            />
            <div className="relative flex-1 max-w-md min-w-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari invoice, nama item..."
                className="w-full pl-4 pr-10 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm text-neutral-700 dark:text-white/80 placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  aria-label="Hapus pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right: result count + sort + reset */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="hidden sm:inline text-xs sm:text-sm text-neutral-500 dark:text-white/50 whitespace-nowrap">
              <span className="font-semibold text-neutral-900 dark:text-white">
                {resultCount}
              </span>{" "}
              / {totalCount} transaksi
            </span>
            <SortDropdown
              value={period}
              onChange={(v) => onPeriodChange(v as TransactionPeriodFilter)}
              options={PERIOD_OPTIONS}
            />
            {isFiltered && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full text-xs font-medium text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
