"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle } from "lucide-react";

export type TabType = "in-progress" | "completed";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  inProgressCount?: number;
  completedCount?: number;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
  inProgressCount,
  completedCount,
}: TabNavigationProps) {
  const tabs: { key: TabType; label: string; icon: React.ElementType }[] = [
    { key: "in-progress", label: "Masih Dipelajari", icon: BookOpen },
    { key: "completed", label: "Sudah Lulus", icon: CheckCircle },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const count = tab.key === "in-progress" ? inProgressCount : completedCount;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white dark:bg-neutral-800 text-primary font-semibold shadow-sm"
                  : "text-neutral-500 dark:text-white/50 hover:text-neutral-700 dark:hover:text-white/70"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {count !== undefined && count > 0 && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-white/40"
                  }`}
                >
                  {count}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
