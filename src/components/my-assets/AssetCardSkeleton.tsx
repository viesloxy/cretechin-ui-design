"use client";

export default function AssetCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden animate-pulse h-full flex flex-col">
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-700" />

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-12" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-10" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
        </div>
        <div className="flex gap-2 mt-auto">
          <div className="h-10 w-10 sm:h-11 sm:w-11 bg-neutral-200 dark:bg-neutral-700 rounded-full flex-shrink-0" />
          <div className="h-10 sm:h-11 flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}
