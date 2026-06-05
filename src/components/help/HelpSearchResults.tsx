"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SearchX, FileText } from "lucide-react";
import type { SearchResult } from "./types";
import { highlightSnippet } from "./searchLogic";
import { CATEGORY_LABELS } from "./constants";

interface HelpSearchResultsProps {
  query: string;
  results: SearchResult[];
  isLoading?: boolean;
  onResultClick: (result: SearchResult) => void;
  onViewAll: () => void;
}

function HighlightedSnippet({ text, query }: { text: string; query: string }) {
  const parts = highlightSnippet(text, query);
  if (!parts) {
    return <>{text}</>;
  }
  return (
    <>
      {parts.before}
      <mark className="bg-primary/20 text-neutral-900 dark:text-white rounded px-0.5">
        {parts.match}
      </mark>
      {parts.after}
    </>
  );
}

export default function HelpSearchResults({
  query,
  results,
  onResultClick,
  onViewAll,
}: HelpSearchResultsProps) {
  const visible = results.slice(0, 5);
  const hasMore = results.length > 5;

  return (
    <AnimatePresence>
      {query.length >= 2 && (
        <motion.div
          id="search-results"
          role="listbox"
          aria-label="Hasil pencarian"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden z-20"
        >
          {visible.length === 0 ? (
            <div className="flex flex-col items-center text-center py-8 px-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
                <SearchX className="w-6 h-6 text-neutral-500 dark:text-white/40" />
              </div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white mb-1">
                Tidak ada hasil untuk "{query}"
              </p>
              <p className="text-xs text-neutral-500 dark:text-white/40 mb-4">
                Coba kata kunci lain atau hubungi support
              </p>
              <a
                href={`mailto:support@cretechin.id?subject=Bantuan%20CreTechin%20-%20${encodeURIComponent(query)}`}
                className="py-2 px-4 rounded-full bg-primary text-neutral-900 text-xs font-semibold hover:bg-primary-dark transition-colors"
              >
                Hubungi Support
              </a>
            </div>
          ) : (
            <>
              <ul
                role="list"
                className="max-h-80 overflow-y-auto divide-y divide-black/5 dark:divide-white/5"
              >
                {visible.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={false}
                      onClick={() => onResultClick(r)}
                      className="w-full text-left px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors flex items-start gap-3"
                    >
                      <FileText
                        aria-hidden="true"
                        className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">
                          {r.title}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-white/40 line-clamp-2 mt-0.5">
                          <HighlightedSnippet text={r.snippet} query={query} />
                        </p>
                        {r.category && (
                          <span className="inline-block text-xs text-primary font-medium mt-1">
                            {CATEGORY_LABELS[r.category]}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <button
                  type="button"
                  onClick={onViewAll}
                  className="w-full py-2.5 text-xs font-semibold text-primary hover:bg-primary/5 border-t border-black/5 dark:border-white/5 transition-colors"
                >
                  Lihat semua hasil ({results.length})
                </button>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
