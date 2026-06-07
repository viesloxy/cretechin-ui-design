"use client";

import { Search, X } from "lucide-react";
import HelpSearchResults from "./HelpSearchResults";
import { POPULAR_SEARCHES } from "./constants";
import type { SearchResult } from "./types";

interface HelpSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onResultClick: (result: SearchResult) => void;
  onViewAllResults: () => void;
  onPopularClick?: (term: string) => void;
  results: SearchResult[];
}

export default function HelpSearchBar({
  value,
  onChange,
  onResultClick,
  onViewAllResults,
  onPopularClick,
  results,
}: HelpSearchBarProps) {
  return (
    <section className="bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Cari topik bantuan (contoh: cara bayar, sertifikat, dll)..."
              aria-label="Cari topik bantuan"
              className="w-full pl-11 pr-10 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm text-neutral-700 dark:text-white/80 placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-colors"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <HelpSearchResults
              query={value}
              results={results}
              onResultClick={onResultClick}
              onViewAll={onViewAllResults}
            />
          </div>
        </div>

        {POPULAR_SEARCHES.length > 0 && !value && (
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-neutral-500 dark:text-white/40">
            <span className="font-medium">Populer:</span>
            {POPULAR_SEARCHES.map((term) => (
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
    </section>
  );
}

