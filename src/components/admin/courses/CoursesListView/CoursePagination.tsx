"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CoursePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (n: 10 | 25 | 50) => void;
}

export default function CoursePagination({
  currentPage,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
  onPerPageChange,
}: CoursePaginationProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalItems);

  const pages = buildPageList(currentPage, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-neutral-100 dark:border-neutral-800">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Menampilkan <span className="font-semibold text-neutral-700 dark:text-neutral-300">{start}-{end}</span> dari{" "}
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">{totalItems}</span> kursus
      </p>
      <div className="flex items-center gap-2">
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value) as 10 | 25 | 50)}
          className="h-9 px-2 rounded-lg bg-transparent border border-black/10 dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-primary cursor-pointer"
          aria-label="Item per halaman"
        >
          <option value={10}>10 / halaman</option>
          <option value={25}>25 / halaman</option>
          <option value={50}>50 / halaman</option>
        </select>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-black/10 disabled:hover:text-neutral-600 transition-colors"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {pages.map((p, i) =>
            p === "…" ? (
              <span key={`e-${i}`} className="px-1 text-neutral-400 text-xs">…</span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`
                  min-w-8 h-8 px-2 rounded-lg text-xs font-medium transition-colors
                  ${
                    p === currentPage
                      ? "bg-primary text-black"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                `}
                aria-label={`Halaman ${p}`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-black/10 disabled:hover:text-neutral-600 transition-colors"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}
