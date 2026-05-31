"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, BookOpen, Clock } from "lucide-react";

interface CourseEnrollment {
  id: string;
  courseId: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  totalDuration: string;
}

interface CourseCardInProgressProps {
  enrollment: CourseEnrollment;
}

export default function CourseCardInProgress({ enrollment }: CourseCardInProgressProps) {
  const { courseId, title, instructor, thumbnail, progress, totalModules, completedModules, totalDuration } = enrollment;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/40"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Badge: Sedang Dipelajari */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-neutral-900 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full animate-pulse" />
            Sedang Dipelajari
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-white/50 mb-3 sm:mb-4 flex items-center gap-2">
          {instructor}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-neutral-500 dark:text-white/50">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{totalModules} Modul</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{totalDuration}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3 sm:mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-neutral-600 dark:text-white/50">Progress</span>
            <span className="text-xs font-bold text-primary">{progress}% Selesai</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/courses/${courseId}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-full bg-primary text-neutral-900 text-sm sm:text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200"
        >
          <Play className="w-4 h-4" />
          Lanjutkan Belajar
        </Link>
      </div>
    </motion.div>
  );
}