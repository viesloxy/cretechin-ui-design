"use client";

import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface HelpSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  popularSearches?: string[];
  onPopularClick?: (term: string) => void;
}

export default function HelpSearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = "Cari topik bantuan (contoh: cara bayar, sertifikat, dll)...",
  autoFocus = false,
  className,
  popularSearches,
  onPopularClick,
}: HelpSearchBarProps) {
  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <div className={twMerge("w-full max-w-2xl mx-auto", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(value);
        }}
        className="relative bg-white dark:bg-neutral-900 rounded-full shadow-lg shadow-black/5 dark:shadow-black/30 border border-black/5 dark:border-white/10"
      >
        <Search
          aria-hidden="true"
          className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-white/40 pointer-events-none"
        />
        <input
          id="help-search"
          type="search"
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Cari topik bantuan"
          aria-autocomplete="list"
          aria-controls="search-results"
          className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-3.5 sm:py-4 bg-transparent rounded-full text-base sm:text-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <AnimatePresence>
          {value.length > 0 && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={handleClear}
              aria-label="Hapus pencarian"
              className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 dark:text-white/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </form>

      {popularSearches && popularSearches.length > 0 && !value && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-xs text-neutral-500 dark:text-white/40">
          <span className="font-medium">Populer:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onPopularClick?.(term)}
              className="px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10 hover:border-primary/40 hover:text-primary transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
