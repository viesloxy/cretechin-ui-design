"use client";

export default function TransactionCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Memuat transaksi"
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-sm animate-pulse"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="h-3 w-40 bg-neutral-200 dark:bg-neutral-800 rounded" />
        <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-5 w-56 bg-neutral-200 dark:bg-neutral-800 rounded" />
        <div className="h-3 w-40 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </div>
      <div className="h-px bg-neutral-200 dark:bg-neutral-800 mb-4" />
      <div className="flex flex-col-reverse sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="space-y-1.5">
          <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          <div className="h-9 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}
