"use client";

import { motion } from "framer-motion";
import { Sparkles, Palette, Code, Briefcase } from "lucide-react";

export type Category = "all" | "creative" | "technology" | "business";

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories = [
  { label: "Semua", value: "all" as Category, icon: Sparkles },
  { label: "Creative", value: "creative" as Category, icon: Palette },
  { label: "Technology", value: "technology" as Category, icon: Code },
  { label: "Business", value: "business" as Category, icon: Briefcase },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <section className="py-8 border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                <Icon className="w-4 h-4" />
                {category.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}