"use client";

export default function CourseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/40 animate-pulse">
      {/* Thumbnail */}
      <div className="aspect-video bg-neutral-200 dark:bg-neutral-700" />

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-4" />
        <div className="flex gap-3 mb-3">
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-20" />
        </div>
        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-2" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4 mb-5" />
        <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
      </div>
    </div>
  );
}
