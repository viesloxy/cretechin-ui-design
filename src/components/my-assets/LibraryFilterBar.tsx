"use client";

import { motion } from "framer-motion";
import { LayoutGrid, List, LayoutDashboard, FileCode, Image as ImageIcon, Sparkles, Type, Palette, Code, FolderOpen } from "lucide-react";
import SortDropdown, { type SortOption } from "./SortDropdown";
import type { CategoryFilter } from "./LibraryStatsBar";

export type ViewMode = "grid" | "list";

interface LibraryFilterBarProps {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  categoryCounts: Record<CategoryFilter, number>;
}

const categories: { label: string; value: CategoryFilter; icon: typeof LayoutGrid }[] = [
  { label: "Semua", value: "all", icon: FolderOpen },
  { label: "UI Kit", value: "ui-kit", icon: LayoutDashboard },
  { label: "Template", value: "template", icon: FileCode },
  { label: "Mockup", value: "mockup", icon: ImageIcon },
  { label: "Icon", value: "icon", icon: Sparkles },
  { label: "Font", value: "font", icon: Type },
  { label: "Ilustrasi", value: "illustration", icon: Palette },
  { label: "Source Code", value: "source-code", icon: Code },
];

export default function LibraryFilterBar({
  activeCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  categoryCounts,
}: LibraryFilterBarProps) {
  return (
    <section className="bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Category Chips - Scrollable on mobile */}
        <div className="py-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          <div className="flex gap-2 sm:flex-wrap min-w-max sm:min-w-0">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.value;
              const count = categoryCounts[category.value] ?? 0;
              return (
                <motion.button
                  key={category.value}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onCategoryChange(category.value)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-neutral-900 shadow-lg shadow-primary/30"
                      : "bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-white/70 hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{category.label}</span>
                  {category.value !== "all" && count > 0 && (
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-neutral-900/15 text-neutral-900"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-white/50"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sort & View Mode */}
        <div className="flex items-center justify-between gap-3 pb-4">
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="inline-flex items-center bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-full p-1">
              <button
                onClick={() => onViewModeChange("grid")}
                aria-label="Tampilan grid"
                className={`p-2 rounded-full transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-neutral-900"
                    : "text-neutral-500 dark:text-white/50 hover:text-primary"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                aria-label="Tampilan list"
                className={`p-2 rounded-full transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-neutral-900"
                    : "text-neutral-500 dark:text-white/50 hover:text-primary"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sort Dropdown */}
          <SortDropdown value={sortOption} onChange={onSortChange} />
        </div>
      </div>
    </section>
  );
}
