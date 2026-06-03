"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, Check } from "lucide-react";

export type SortOption =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "most-downloaded"
  | "size-smallest"
  | "size-largest";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Terbaru Dibeli", value: "newest" },
  { label: "Terlama Dibeli", value: "oldest" },
  { label: "Nama A-Z", value: "name-asc" },
  { label: "Nama Z-A", value: "name-desc" },
  { label: "Paling Sering Diunduh", value: "most-downloaded" },
  { label: "Ukuran File Terkecil", value: "size-smallest" },
  { label: "Ukuran File Terbesar", value: "size-largest" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLabel = sortOptions.find((opt) => opt.value === value)?.label ?? "Urutkan";

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 hover:border-primary text-sm font-medium text-neutral-700 dark:text-white/70 transition-colors"
      >
        <ArrowUpDown className="w-4 h-4" />
        <span className="hidden sm:inline">Urutkan: </span>
        <span>{currentLabel}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-xl shadow-lg z-20 py-1.5"
          >
            {sortOptions.map((option) => {
              const isActive = option.value === value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2 text-sm text-left transition-colors ${
                    isActive
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-neutral-700 dark:text-white/70 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <span>{option.label}</span>
                  {isActive && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
