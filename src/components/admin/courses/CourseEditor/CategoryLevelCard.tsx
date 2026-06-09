"use client";

import SettingsCard from "@/components/admin/articles/ArticleEditor/SettingsCard";
import { CATEGORY_OPTIONS, LEVEL_OPTIONS, type CourseCategory, type CourseLevel } from "@/lib/courses/types";

interface CategoryLevelCardProps {
  category: CourseCategory;
  level: CourseLevel;
  onCategoryChange: (c: CourseCategory) => void;
  onLevelChange: (l: CourseLevel) => void;
}

export default function CategoryLevelCard({
  category,
  level,
  onCategoryChange,
  onLevelChange,
}: CategoryLevelCardProps) {
  return (
    <SettingsCard title="Kategori & Level" badge="Wajib">
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
            Kategori <span className="text-primary">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as CourseCategory)}
            className="mt-1.5 w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
            aria-label="Kategori kursus"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
            Level <span className="text-primary">*</span>
          </label>
          <select
            value={level}
            onChange={(e) => onLevelChange(e.target.value as CourseLevel)}
            className="mt-1.5 w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
            aria-label="Level kursus"
          >
            {LEVEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </SettingsCard>
  );
}
