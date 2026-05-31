"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  const { courseId, title, instructor, thumbnail, progress, totalModules, totalDuration } = enrollment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/40"
    >
      {/* Thumbnail */}
      <Link href={`/products/${courseId}`} className="block relative aspect-video overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Badge: in progress */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-warning/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Sedang Dipelajari
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <Link href={`/products/${courseId}`}>
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white line-clamp-2 mb-1 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-neutral-500 dark:text-white/50 mb-3 sm:mb-4">{instructor}</p>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-neutral-400 dark:text-white/30 mb-3">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {totalModules} Modul
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {totalDuration}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-neutral-500 dark:text-white/50">Progress</span>
            <span className="text-xs font-semibold text-primary">{progress}%</span>
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
          href={`/products/${courseId}`}
          className="mt-4 sm:mt-5 w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full bg-primary text-neutral-900 text-sm sm:text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200"
        >
          <Play className="w-4 h-4" />
          Lanjutkan Belajar
        </Link>
      </div>
    </motion.div>
  );
}
