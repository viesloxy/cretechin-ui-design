"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Award, MessageSquare } from "lucide-react";

interface CourseEnrollment {
  id: string;
  courseId: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  completedAt?: string;
  certificateId?: string;
  hasReview?: boolean;
}

interface CourseCardCompletedProps {
  enrollment: CourseEnrollment;
}

export default function CourseCardCompleted({ enrollment }: CourseCardCompletedProps) {
  const { courseId, title, instructor, thumbnail, completedAt, certificateId, hasReview } = enrollment;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/courses/${courseId}`}>
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-neutral-900 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Selesai 100%
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white mb-1 sm:mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-white/50 mb-2 sm:mb-3 flex items-center gap-2">
            <span>{instructor}</span>
          </p>
          {completedAt && (
            <p className="text-xs text-neutral-400 dark:text-white/40 mb-4 sm:mb-5">
              Diselesaikan pada {completedAt}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-5">
            {certificateId ? (
              <Link
                href={`/certificates/${certificateId}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-full bg-primary text-neutral-900 text-sm sm:text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200"
              >
                <Award className="w-4 h-4" />
                Lihat Sertifikat
              </Link>
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-white/30 text-sm sm:text-base font-semibold cursor-not-allowed"
              >
                <Award className="w-4 h-4" />
                Sertifikat Belum Tersedia
              </button>
            )}

            {hasReview ? (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-full border border-black/5 dark:border-white/10 text-neutral-400 dark:text-white/30 text-sm sm:text-base font-medium cursor-not-allowed"
              >
                <MessageSquare className="w-4 h-4" />
                Sudah Diulas
              </button>
            ) : (
              <Link
                href={`/courses/${courseId}?review=true`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/70 text-sm sm:text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                Beri Ulasan
              </Link>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}