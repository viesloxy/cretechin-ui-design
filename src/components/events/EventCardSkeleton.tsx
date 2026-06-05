"use client";

export default function EventCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-lg animate-pulse">
      {/* Banner Skeleton */}
      <div className="aspect-video bg-neutral-200 dark:bg-neutral-700" />

      {/* Content Skeleton */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-3" />
        <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-4" />

        {/* Date & Time */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
        </div>

        {/* Speaker */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <div className="flex-1">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-1" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
          </div>
        </div>

        {/* Button */}
        <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
      </div>
    </div>
  );
}
