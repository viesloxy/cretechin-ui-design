"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Award, Star } from "lucide-react";

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
        {/* Green overlay to indicate completion */}
        <div className="absolute inset-0 bg-income/20" />
        {/* Completion Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-income text-white text-xs font-bold px-3 py-1 rounded-full">
          <CheckCircle className="w-3.5 h-3.5" />
          Selesai 100%
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <Link href={`/products/${courseId}`}>
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white line-clamp-2 mb-1 hover:text-income transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-neutral-500 dark:text-white/50 mb-1">{instructor}</p>
        {completedAt && (
          <p className="text-xs text-neutral-400 dark:text-white/30 mb-4">
            Selesai pada {completedAt}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          <Link
            href={certificateId ? `/certificates/${certificateId}` : "#"}
            className={`w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 ${
              certificateId
                ? "bg-income text-white hover:brightness-110 active:scale-95"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-white/30 cursor-not-allowed"
            }`}
          >
            <Award className="w-4 h-4" />
            {certificateId ? "Lihat Sertifikat" : "Sertifikat Belum Tersedia"}
          </Link>
          <Link
            href={hasReview ? `#` : `/products/${courseId}?review=true`}
            className={`w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
              hasReview
                ? "border border-neutral-300 dark:border-white/20 text-neutral-500 dark:text-white/30 cursor-not-allowed"
                : "border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95"
            }`}
          >
            <Star className="w-4 h-4" />
            {hasReview ? "Sudah Diulas" : "Beri Ulasan"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
