"use client";

import { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import type { SettingsTabId } from "./types";

interface SettingsTabsMobileProps {
  activeTab: SettingsTabId;
  onTabChange: (tab: SettingsTabId) => void;
}

const TABS: { id: SettingsTabId; label: string }[] = [
  { id: "profile", label: "Profil" },
  { id: "password", label: "Kata Sandi" },
  { id: "privacy", label: "Privasi" },
  { id: "notifications", label: "Notifikasi" },
  { id: "region", label: "Bahasa & Region" },
];

export default function SettingsTabsMobile({
  activeTab,
  onTabChange,
}: SettingsTabsMobileProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const active = scrollRef.current.querySelector(
      `[data-tab-id="${activeTab}"]`,
    ) as HTMLElement | null;
    if (active) {
      active.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  return (
    <div
      ref={scrollRef}
      role="tablist"
      aria-label="Pengaturan"
      className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            data-tab-id={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={twMerge(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              isActive
                ? "bg-primary text-neutral-900"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-white/70 hover:bg-neutral-200 dark:hover:bg-neutral-700",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
