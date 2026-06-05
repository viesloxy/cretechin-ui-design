"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Code,
  Palette,
  Briefcase,
  Search,
  ArrowUpDown,
} from "lucide-react";

export type CourseCategory = "all" | "technology" | "creative" | "business";
export type CourseSort = "recent" | "oldest" | "title-asc" | "title-desc" | "popular";

interface CategoryFilterBarProps {
  activeCategory: CourseCategory;
  onCategoryChange: (category: CourseCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: CourseSort;
  onSortChange: (sort: CourseSort) => void;
  resultCount: number;
  totalCount: number;
}

const categories: {
  label: string;
  value: CourseCategory;
  icon: typeof Sparkles;
}[] = [
  { label: "Semua", value: "all", icon: Sparkles },
  { label: "Technology", value: "technology", icon: Code },
  { label: "Creative", value: "creative", icon: Palette },
  { label: "Business", value: "business", icon: Briefcase },
];

const sortOptions: { label: string; value: CourseSort }[] = [
  { label: "Terbaru", value: "recent" },
  { label: "Terlama", value: "oldest" },
  { label: "Judul A-Z", value: "title-asc" },
  { label: "Judul Z-A", value: "title-desc" },
  { label: "Terpopuler", value: "popular" },
];

export default function CategoryFilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  resultCount,
  totalCount,
}: CategoryFilterBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label ?? "Urutkan";

  return (
    <section className="bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Category Chips */}
        <div className="py-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          <div className="flex gap-2 sm:flex-wrap min-w-max sm:min-w-0">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.value;
              return (
                <motion.button
                  key={category.value}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onCategoryChange(category.value)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-neutral-900"
                      : "bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-white/70 hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{category.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Search & Sort Row */}
        <div className="flex items-center justify-between gap-3 pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Cari kelas, instruktur, atau topik..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm text-neutral-700 dark:text-white/80 placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs sm:text-sm text-neutral-500 dark:text-white/50 whitespace-nowrap">
              <span className="font-semibold text-neutral-900 dark:text-white">
                {resultCount}
              </span>{" "}
              / {totalCount} kelas
            </span>

            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-700 dark:text-white/80 hover:border-primary transition-colors whitespace-nowrap"
              >
                <ArrowUpDown className="w-4 h-4 flex-shrink-0" />
                {currentSortLabel}
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-xl shadow-lg p-2 z-10"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onSortChange(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors ${
                          sortBy === option.value
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-neutral-700 dark:text-white/80 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
