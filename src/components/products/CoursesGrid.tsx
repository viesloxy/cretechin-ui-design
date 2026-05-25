"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Users, Clock } from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  badge?: string;
  image: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  price: number;
}

interface CoursesGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CoursesGrid({ courses }: CoursesGridProps) {
  if (courses.length === 0) {
    return (
      <div className="py-16 text-center bg-white dark:bg-black px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <div className="w-48 h-48 mx-auto mb-6 text-neutral-300 dark:text-neutral-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
            Tidak ada kursus ditemukan
          </h3>
          <p className="text-base text-neutral-600 dark:text-white/50">
            Coba ubah filter atau kata pencarian Anda
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 bg-white dark:bg-black">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      >
          {courses.map((course) => (
            <motion.div key={course.id} variants={cardVariants}>
              <Link href={`/courses/${course.id}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {course.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-neutral-900">
                          {course.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-white/50 mb-3 sm:mb-4 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {course.instructor}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {course.rating}
                      </span>
                      <span className="text-sm text-neutral-600 dark:text-white/50">
                        ({course.reviewCount.toLocaleString()})
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-neutral-600 dark:text-white/50">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{(course.studentCount / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="pt-3 sm:pt-4 border-t border-black/5 dark:border-white/10">
                      <p className="text-base sm:text-lg font-bold text-primary">
                        {course.price === 0 ? "Gratis" : `Rp ${course.price.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
    </section>
  );
}