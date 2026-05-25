"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code, Palette, Briefcase, ArrowUpDown } from "lucide-react";
import { Category } from "@/components/beranda";

interface FilterBarProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  onSortChange: (sort: string) => void;
}

const categories = [
  { label: "Semua", value: "all" as Category, icon: Sparkles },
  { label: "Technology", value: "technology" as Category, icon: Code },
  { label: "Creative", value: "creative" as Category, icon: Palette },
  { label: "Business", value: "business" as Category, icon: Briefcase },
];

const sortOptions = [
  { label: "Terbaru", value: "newest" },
  { label: "Terpopuler", value: "popular" },
  { label: "Rating Tertinggi", value: "rating" },
  { label: "Harga Terendah", value: "price-low" },
  { label: "Harga Tertinggi", value: "price-high" },
  { label: "Nama A-Z", value: "name-asc" },
  { label: "Nama Z-A", value: "name-desc" },
];

export default function FilterBar({ activeCategory, onCategoryChange, onSortChange }: FilterBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("popular");
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

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    onSortChange(value);
    setIsSortOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Category Chips */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.value;
          return (
            <motion.button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "bg-primary border-primary text-neutral-900 font-semibold shadow-lg shadow-primary/30"
                  : "bg-white dark:bg-neutral-900 border-black/10 dark:border-white/10 text-neutral-600 dark:text-white/50 hover:border-primary/50 hover:text-primary hover:scale-105"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {category.label}
            </motion.button>
          );
        })}
      </div>

      {/* Sort Dropdown */}
      <div className="relative flex-shrink-0" ref={sortRef}>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-700 dark:text-white/80 hover:border-primary transition-colors whitespace-nowrap"
        >
          <ArrowUpDown className="w-4 h-4 flex-shrink-0" />
          Urutkan
        </button>

        <AnimatePresence>
          {isSortOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-xl shadow-lg p-2 z-10"
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors ${
                    selectedSort === option.value
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
  );
}