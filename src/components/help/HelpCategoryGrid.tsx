"use client";

import { motion } from "framer-motion";
import { MOCK_CATEGORIES } from "./mockData";
import HelpCategoryCard from "./HelpCategoryCard";
import type { FAQCategory } from "./types";

interface HelpCategoryGridProps {
  activeCategory: FAQCategory | null;
  onCategoryClick: (id: FAQCategory | null) => void;
}

export default function HelpCategoryGrid({
  activeCategory,
  onCategoryClick,
}: HelpCategoryGridProps) {
  const handleClick = (id: FAQCategory) => {
    if (activeCategory === id) {
      onCategoryClick(null);
    } else {
      onCategoryClick(id);
    }
  };

  return (
    <section
      aria-labelledby="categories-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16"
    >
      <motion.h2
        id="categories-heading"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-6 sm:mb-8"
      >
        Kategori Bantuan
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {MOCK_CATEGORIES.map((cat, idx) => (
          <HelpCategoryCard
            key={cat.id}
            category={cat}
            isActive={activeCategory === cat.id}
            onClick={handleClick}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
