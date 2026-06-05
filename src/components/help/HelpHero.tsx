"use client";

import { motion } from "framer-motion";
import HelpSearchBar from "./HelpSearchBar";
import HelpSearchResults from "./HelpSearchResults";
import { POPULAR_SEARCHES } from "./constants";
import type { SearchResult } from "./types";

interface HelpHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: SearchResult[];
  onResultClick: (result: SearchResult) => void;
  onViewAllResults: () => void;
  onPopularClick?: (term: string) => void;
}

export default function HelpHero({
  searchQuery,
  onSearchChange,
  searchResults,
  onResultClick,
  onViewAllResults,
  onPopularClick,
}: HelpHeroProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-primary/5 dark:bg-neutral-900/50 border-b border-black/5 dark:border-white/5 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35] dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "var(--primary, #A4D624)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white">
          Halo, ada yang bisa kami bantu?
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-white/50 max-w-xl mx-auto">
          Pusat bantuan lengkap untuk semua kebutuhan Anda di CreTechin
        </p>
        <div className="mt-6 sm:mt-8 relative">
          <HelpSearchBar
            value={searchQuery}
            onChange={onSearchChange}
            popularSearches={POPULAR_SEARCHES}
            onPopularClick={onPopularClick}
            autoFocus
          />
          <HelpSearchResults
            query={searchQuery}
            results={searchResults}
            onResultClick={onResultClick}
            onViewAll={onViewAllResults}
          />
        </div>
      </div>
    </motion.header>
  );
}
