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
    <section className="py-16 bg-white dark:bg-black">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-48 h-48 mx-auto mb-6 text-neutral-300 dark:text-neutral-700">
          <BookOpen className="w-full h-full" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
          {content.title}
        </h3>
        <p className="text-base text-neutral-600 dark:text-white/50 mb-8">
          {content.subtitle}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-neutral-900 text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200"
        >
          Cari Kelas Sekarang
        </Link>
      </div>
    </section>
  );
}
