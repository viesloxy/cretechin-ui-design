"use client";

import type { ReactNode } from "react";

interface FieldCardProps {
  label: string;
  value?: string | null;
  icon?: ReactNode;
  verified?: boolean;
  isEmpty?: boolean;
  emptyText?: string;
}

export default function FieldCard({
  label,
  value,
  icon,
  verified = false,
  isEmpty = false,
  emptyText = "Belum ditambahkan",
}: FieldCardProps) {
  if (isEmpty || !value) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-1.5 mb-2">
          {icon}
          <p className="text-xs font-medium text-neutral-500 dark:text-white/40 uppercase tracking-wide">
            {label}
          </p>
        </div>
        <p className="text-sm italic text-neutral-400 dark:text-white/30">
          {emptyText}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-1.5 mb-2">
        {icon}
        <p className="text-xs font-medium text-neutral-500 dark:text-white/40 uppercase tracking-wide">
          {label}
        </p>
      </div>
      <div className="flex items-start gap-2 flex-wrap">
        <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white break-words">
          {value}
        </p>
        {verified && (
          <span
            role="status"
            aria-label="Terverifikasi"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Terverifikasi
          </span>
        )}
      </div>
    </div>
  );
}
