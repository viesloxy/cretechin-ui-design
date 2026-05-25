"use client";

import { motion } from "framer-motion";
import { GraduationCap, Package } from "lucide-react";

export type TabType = "courses" | "assets";

interface TabSwitcherProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { label: "Program Belajar", value: "courses" as TabType, icon: GraduationCap },
  { label: "Aset Digital", value: "assets" as TabType, icon: Package },
];

export default function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <section className="bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center gap-2 sm:gap-4 py-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;
            return (
              <motion.button
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium transition-colors relative ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-neutral-600 dark:text-white/50 hover:text-primary"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="hidden xs:inline sm:inline">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}