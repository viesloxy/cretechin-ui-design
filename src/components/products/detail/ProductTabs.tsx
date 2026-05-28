"use client";

import { motion } from "framer-motion";

export type ProductTabType = "description" | "specifications" | "reviews";

interface ProductTabsProps {
  activeTab: ProductTabType;
  onTabChange: (tab: ProductTabType) => void;
  stats?: {
    reviewCount: number;
  };
}

const tabs = [
  { label: "Deskripsi", value: "description" as ProductTabType },
  { label: "Spesifikasi", value: "specifications" as ProductTabType },
  { label: "Ulasan", value: "reviews" as ProductTabType },
];

export default function ProductTabs({ activeTab, onTabChange, stats }: ProductTabsProps) {
  return (
    <div className="bg-white dark:bg-black border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                className={`relative flex items-center gap-2 px-6 py-4 text-base font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-neutral-600 dark:text-white/50 hover:text-primary"
                }`}
              >
                <span>{tab.label}</span>
                {tab.value === "reviews" && stats?.reviewCount && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-white/50">
                    {stats.reviewCount.toLocaleString()}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}