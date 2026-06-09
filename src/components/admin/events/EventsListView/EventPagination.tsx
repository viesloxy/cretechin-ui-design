"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationResult } from "@/lib/events/types";
import { formatNumber } from "@/lib/events/utils";

interface EventPaginationProps {
  pagination: PaginationResult<unknown>;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

function buildPageList(current: number, total: number): Array<number | "..."> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: Array<number | "..."> = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export function EventPagination({
  pagination,
  perPage,
  onPageChange,
  onPerPageChange,
}: EventPaginationProps) {
  if (pagination.totalItems === 0) return null;
  const pageList = buildPageList(pagination.totalPages === 0 ? 1 : Math.min(pagination.totalPages, Math.max(1, 1)), pagination.totalPages);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-xs text-neutral-500">
        Menampilkan{" "}
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
          {formatNumber(pagination.startIndex)}-
          {formatNumber(pagination.endIndex)}
        </span>{" "}
        dari{" "}
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
          {formatNumber(pagination.totalItems)}
        </span>{" "}
        acara
      </p>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={pagination.totalPages <= 1}
            onClick={() => onPageChange(Math.max(1, pagination.totalPages - 1) - 1)}
            className="rounded-lg border border-black/5 bg-white p-1.5 text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-40 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {pageList.map((p, idx) =>
            p === "..." ? (
              <span
                key={`dots-${idx}`}
                className="px-1.5 text-xs text-neutral-400"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className="min-w-[32px] rounded-lg border border-black/5 bg-white px-2 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                {p}
              </button>
            ),
          )}
          <button
            type="button"
            disabled={pagination.totalPages <= 1}
            onClick={() => onPageChange(2)}
            className="rounded-lg border border-black/5 bg-white p-1.5 text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-40 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="h-8 cursor-pointer appearance-none rounded-lg border border-black/5 bg-white px-2 text-xs text-neutral-700 transition focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200"
        >
          <option value={10}>10 / hal</option>
          <option value={25}>25 / hal</option>
          <option value={50}>50 / hal</option>
        </select>
      </div>
    </div>
  );
}
