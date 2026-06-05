"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User, Lock, Eye, Bell, Globe } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { SettingsTabId } from "./types";

interface SettingsTabsProps {
  activeTab: SettingsTabId;
  onTabChange: (tab: SettingsTabId) => void;
  avatarUrl: string;
  userName: string;
}

const TABS: {
  id: SettingsTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "profile", label: "Profil", icon: User },
  { id: "password", label: "Kata Sandi", icon: Lock },
  { id: "privacy", label: "Privasi", icon: Eye },
  { id: "notifications", label: "Notifikasi", icon: Bell },
  { id: "region", label: "Bahasa & Region", icon: Globe },
];

export default function SettingsTabs({
  activeTab,
  onTabChange,
  avatarUrl,
  userName,
}: SettingsTabsProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="lg:sticky lg:top-28 space-y-2"
      aria-label="Pengaturan"
    >
      <nav role="tablist" className="space-y-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={twMerge(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors text-left",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-neutral-700 dark:text-white/70 hover:bg-neutral-100 dark:hover:bg-neutral-900",
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Mini profile card */}
      <div className="hidden lg:flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 mt-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-black">
          <Image
            src={avatarUrl}
            alt={userName}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
            {userName}
          </p>
          <p className="text-xs text-neutral-500 dark:text-white/40 truncate">
            Akun aktif
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
