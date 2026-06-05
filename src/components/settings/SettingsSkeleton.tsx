"use client";

export default function SettingsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10 animate-pulse">
      {/* Sidebar skeleton */}
      <aside className="lg:col-span-1 space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-2xl"
          />
        ))}
        <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded-2xl mt-4" />
      </aside>

      {/* Form skeleton */}
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-8 space-y-8">
          {/* Avatar skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-40 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="flex gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="space-y-2 flex-1">
                <div className="h-9 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                <div className="h-9 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          {/* Form fields skeleton */}
          <div className="space-y-5">
            <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full" />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <div className="h-12 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            <div className="h-12 w-40 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
