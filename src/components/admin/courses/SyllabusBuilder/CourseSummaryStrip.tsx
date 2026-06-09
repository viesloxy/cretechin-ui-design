"use client";

import { Settings, Layers, PlayCircle, FileText, Clock } from "lucide-react";
import { ThumbnailImage } from "@/components/admin/articles/shared";
import { LevelBadge } from "../shared";
import type { Course } from "@/lib/courses/types";
import { getCourseTotalDuration, getCourseTotalLessons } from "@/lib/courses/utils";

interface CourseSummaryStripProps {
  course: Course;
  onEditInfo: () => void;
}

export default function CourseSummaryStrip({ course, onEditInfo }: CourseSummaryStripProps) {
  const totalLessons = getCourseTotalLessons(course);
  const totalDuration = getCourseTotalDuration(course);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-4 shadow-sm shadow-black/5">
      <div className="flex items-center gap-4">
        <ThumbnailImage
          src={course.thumbnail?.url}
          alt={course.title}
          size={64}
          rounded="xl"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 dark:text-white truncate">
            {course.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <LevelBadge level={course.level} showIcon size="sm" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Layers className="w-3 h-3" />
                {course.modules.length} modul
              </span>
              <span className="inline-flex items-center gap-1">
                <PlayCircle className="w-3 h-3" />
                {totalLessons} pelajaran
              </span>
              {totalDuration > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTotal(totalDuration)}
                </span>
              )}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onEditInfo}
          className="h-9 px-3 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-1.5 flex-shrink-0"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Edit Info Kursus</span>
        </button>
      </div>
    </div>
  );
}

function formatTotal(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}j ${m}m`;
  return `${m} menit`;
}
