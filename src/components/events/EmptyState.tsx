"use client";

import { CalendarDays, Ticket, PlayCircle, SearchX } from "lucide-react";
import type { EmptyStateVariant } from "./types";

interface EmptyStateProps {
  variant: EmptyStateVariant;
  onResetFilter?: () => void;
}

const variants: Record<
  EmptyStateVariant,
  {
    title: string;
    subtitle: string;
    primaryAction: string;
    icon: typeof CalendarDays;
  }
> = {
  "no-events": {
    title: "Tidak ada acara yang akan datang",
    subtitle: "Nantikan acara menarik dari CreTechin dan partner komunitas",
    primaryAction: "Lihat Halaman Utama",
    icon: CalendarDays,
  },
  "no-tickets": {
    title: "Kamu belum terdaftar di acara apapun",
    subtitle: "Daftar di acara menarik untuk ikut serta dan tingkatkan skillmu",
    primaryAction: "Lihat Acara Tersedia",
    icon: Ticket,
  },
  "no-recordings": {
    title: "Belum ada rekaman yang tersedia",
    subtitle: "Rekaman akan muncul setelah acara selesai. Cek kembali nanti!",
    primaryAction: "Lihat Acara Akan Datang",
    icon: PlayCircle,
  },
  "no-filter-results": {
    title: "Tidak ada acara di kategori ini",
    subtitle: "Coba kategori lain atau lihat semua acara yang tersedia",
    primaryAction: "Lihat Semua Acara",
    icon: SearchX,
  },
  "no-search-results": {
    title: "Acara tidak ditemukan",
    subtitle: "Coba kata kunci lain atau hapus filter pencarian",
    primaryAction: "Hapus Pencarian",
    icon: SearchX,
  },
};

export default function EmptyState({ variant, onResetFilter }: EmptyStateProps) {
  const content = variants[variant];
  const Icon = content.icon;

  const handleClick = () => {
    if (
      variant === "no-filter-results" ||
      variant === "no-search-results"
    ) {
      onResetFilter?.();
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-black">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-primary/5 dark:bg-primary/10 flex items-center justify-center">
          <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
          {content.title}
        </h3>
        <p className="text-sm sm:text-base text-neutral-500 dark:text-white/50 mb-8">
          {content.subtitle}
        </p>
        <button
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-neutral-900 text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200"
        >
          {content.primaryAction}
        </button>
      </div>
    </section>
  );
}
