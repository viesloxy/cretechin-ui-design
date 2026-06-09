"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatNumber } from "@/lib/products/utils";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export default function ProductPagination({
  page,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  perPage,
  onPageChange,
  onPerPageChange,
}: ProductPaginationProps) {
  if (totalItems === 0) return null;

  const pages = buildPageList(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Menampilkan <span className="font-mono font-semibold text-neutral-900 dark:text-white">{formatNumber(startIndex)}</span>–
        <span className="font-mono font-semibold text-neutral-900 dark:text-white">{formatNumber(endIndex)}</span> dari{" "}
        <span className="font-mono font-semibold text-neutral-900 dark:text-white">{formatNumber(totalItems)}</span> produk
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Per-page */}
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="h-9 px-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-primary transition-colors cursor-pointer"
          aria-label="Jumlah per halaman"
        >
          <option value={10}>10 / halaman</option>
          <option value={25}>25 / halaman</option>
          <option value={50}>50 / halaman</option>
        </select>

        {/* Page list */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Halaman sebelumnya"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-neutral-500 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={`ell-${i}`} className="px-2 text-neutral-400 text-sm">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`min-w-9 h-9 px-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  p === page
                    ? "bg-primary text-black"
                    : "border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Halaman berikutnya"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-neutral-500 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function buildPageList(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}
