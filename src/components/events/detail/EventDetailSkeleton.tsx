"use client";

export default function EventDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Top grid: hero+title (left) + sticky card (right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column: hero + title */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="aspect-video w-full rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
            <div>
              <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-3" />
              <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 mb-5" />
              <div className="flex gap-2 mb-5">
                <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
              </div>
            </div>
          </div>

          {/* Right column: sticky card skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
              <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
              <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full w-full" />
              <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Full-width sections: speaker, description, agenda, related */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 pb-12">
        {/* Speaker skeleton */}
        <div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-32 mb-5" />
          <div className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
        </div>

        {/* Description skeleton */}
        <div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-48 mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
          </div>
        </div>

        {/* Agenda skeleton */}
        <div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-40 mb-4" />
          <div className="h-48 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
