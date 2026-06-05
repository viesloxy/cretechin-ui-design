"use client";

import { motion } from "framer-motion";
import { CalendarDays, Ticket, PlayCircle } from "lucide-react";

export type EventTab = "upcoming" | "my-tickets" | "recordings";

interface TabNavigationProps {
  activeTab: EventTab;
  onTabChange: (tab: EventTab) => void;
  counts?: Record<EventTab, number>;
}

const tabs = [
  { label: "Akan Datang", value: "upcoming" as EventTab, icon: CalendarDays },
  { label: "Tiket Saya", value: "my-tickets" as EventTab, icon: Ticket },
  { label: "Rekaman", value: "recordings" as EventTab, icon: PlayCircle },
];

export default function TabNavigation({
  activeTab,
  onTabChange,
  counts,
}: TabNavigationProps) {
  return (
    <section className="bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center gap-2 sm:gap-6 py-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;
            const count = counts?.[tab.value] ?? 0;

            return (
              <motion.button
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`flex items-center gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium transition-colors relative ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-neutral-600 dark:text-white/50 hover:text-primary"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="hidden xs:inline sm:inline">{tab.label}</span>
                {count > 0 && isActive && (
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeEventTab"
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
