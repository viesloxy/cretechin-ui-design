"use client";

import { motion } from "framer-motion";
import AccordionModule from "./AccordionModule";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: "completed" | "active" | "locked" | "default";
}

interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

interface CourseSidebarProps {
  completedLessons: number;
  totalLessons: number;
  modules: Module[];
  onLessonClick?: (lessonId: string) => void;
}

export default function CourseSidebar({
  completedLessons,
  totalLessons,
  modules,
  onLessonClick,
}: CourseSidebarProps) {
  const progressPercent = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 bg-white dark:bg-neutral-900 lg:border-l border-black/5 dark:border-white/10 lg:h-[calc(100vh-52px)] lg:sticky lg:top-[52px] overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-neutral-800/50">
        <h2 className="text-base font-semibold text-neutral-800 dark:text-white mb-2">
          Daftar Materi
        </h2>

        {/* Progress Summary */}
        <p className="text-xs text-neutral-500 dark:text-white/50 mb-2">
          {completedLessons} dari {totalLessons} materi selesai
        </p>

        {/* Progress Bar */}
        <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-xs font-medium text-neutral-400 dark:text-white/30 mt-1 text-right">
          {progressPercent}%
        </p>
      </div>

      {/* Modules List */}
      <div className="p-4 space-y-3">
        {modules.map((module) => {
          const hasActiveLesson = module.lessons.some(
            (l) => l.status === "active"
          );

          return (
            <AccordionModule
              key={module.id}
              id={module.id}
              title={module.title}
              duration={module.duration}
              lessons={module.lessons}
              defaultOpen={hasActiveLesson}
              onLessonClick={onLessonClick}
            />
          );
        })}
      </div>
    </aside>
  );
}