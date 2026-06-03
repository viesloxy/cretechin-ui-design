"use client";

import Link from "next/link";
import { FolderOpen, SearchX } from "lucide-react";

export type EmptyStateVariant = "no-assets" | "no-filter-results" | "no-search-results";

interface LibraryEmptyStateProps {
  variant: EmptyStateVariant;
  onResetFilter?: () => void;
}

const variants: Record<
  EmptyStateVariant,
  { title: string; subtitle: string; primaryAction: string; primaryHref: string }
> = {
  "no-assets": {
    title: "Belum ada aset digital",
    subtitle: "Mulai kumpulkan UI Kit, Template, dan Mockup favoritmu di sini",
    primaryAction: "Cari Aset Digital",
    primaryHref: "/products",
  },
  "no-filter-results": {
    title: "Tidak ada aset di kategori ini",
    subtitle: "Coba kategori lain atau lihat semua aset digitalmu",
    primaryAction: "Lihat semua aset",
    primaryHref: "",
  },
  "no-search-results": {
    title: "Aset tidak ditemukan",
    subtitle: "Coba kata kunci lain atau hapus filter pencarian",
    primaryAction: "Lihat semua aset",
    primaryHref: "",
  },
};

export default function LibraryEmptyState({
  variant,
  onResetFilter,
}: LibraryEmptyStateProps) {
  const content = variants[variant];
  const Icon = variant === "no-assets" ? FolderOpen : SearchX;

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

        {variant === "no-assets" ? (
          <Link
            href={content.primaryHref}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-neutral-900 text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200"
          >
            {content.primaryAction}
          </Link>
        ) : (
          <button
            onClick={onResetFilter}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-neutral-900 text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200"
          >
            {content.primaryAction}
          </button>
        )}
      </div>
    </section>
  );
}
