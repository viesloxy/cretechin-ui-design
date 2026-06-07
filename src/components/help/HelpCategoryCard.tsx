"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import type { HelpCategory, FAQCategory } from "./types";

interface HelpCategoryCardProps {
  category: HelpCategory;
  isActive?: boolean;
  onClick?: (id: FAQCategory) => void;
  index?: number;
}

export default function HelpCategoryCard({
  category,
  isActive = false,
  onClick,
  index = 0,
}: HelpCategoryCardProps) {
  const Icon = category.icon;
  const handleClick = () => onClick?.(category.id);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isActive}
      className={twMerge(
        "bg-white dark:bg-neutral-900 border rounded-2xl p-5 sm:p-6 text-left transition-all w-full",
        "shadow-sm hover:shadow-md hover:-translate-y-0.5",
        isActive
          ? "border-primary ring-1 ring-primary/30 bg-primary/5"
          : "border-black/5 dark:border-white/10 hover:border-primary/30",
      )}
    >
      <Icon className="w-5 h-5 text-primary mb-2" />
      <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white mb-1">
        {category.label}
      </h3>
      <p className="text-xs text-neutral-500 dark:text-white/40">
        {category.description}
      </p>
      <p className="text-xs text-neutral-400 dark:text-white/30 mt-2">
        {category.articleCount} artikel
      </p>
    </motion.button>
  );
}
