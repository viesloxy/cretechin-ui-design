"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

type TabType = "in-progress" | "completed";

interface EmptyStateProps {
  tab: TabType;
}

const tabContent: Record<TabType, { title: string; subtitle: string }> = {
  "in-progress": {
    title: "Belum ada kelas yang sedang dipelajari",
    subtitle: "Mulai belajar kelas baru dan lacak progressmu di sini",
  },
  completed: {
    title: "Belum ada kelas yang diselesaikan",
    subtitle: "Selesaikan kelas pertamamu dan dapatkan sertifikat",
  },
};

export default function EmptyState({ tab }: EmptyStateProps) {
  const content = tabContent[tab];

  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24 text-center px-4">
      {/* Icon */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6">
        <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-300 dark:text-neutral-600" />
      </div>

      {/* Text */}
      <h3 className="text-xl sm:text-2xl font-semibold text-neutral-700 dark:text-white mb-2">
        {content.title}
      </h3>
      <p className="text-sm sm:text-base text-neutral-500 dark:text-white/50 mb-8 max-w-sm">
        {content.subtitle}
      </p>

      {/* CTA Button */}
      <Link
        href="/products"
        className="px-8 py-3 rounded-full bg-primary text-neutral-900 text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200"
      >
        Cari Kelas Sekarang
      </Link>
    </div>
  );
}
