"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Star, Clock, Users } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2026",
    category: "Teknologi",
    instructor: "Budi Santoso",
    rating: 4.9,
    students: 1234,
    duration: "40 jam",
    price: "Rp 299.000",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    badge: "Populer",
    badgeColor: "bg-primary",
  },
  {
    id: 2,
    title: "UI/UX Design Mastery dengan Figma",
    category: "Kreatif",
    instructor: "Siti Nurhaliza",
    rating: 4.8,
    students: 892,
    duration: "25 jam",
    price: "Rp 249.000",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    badge: "Terbaru",
    badgeColor: "bg-info",
  },
  {
    id: 3,
    title: "Digital Marketing Strategy 2026",
    category: "Bisnis",
    instructor: "Ahmad Rizki",
    rating: 4.7,
    students: 756,
    duration: "18 jam",
    price: "Rp 199.000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    badge: "Best Seller",
    badgeColor: "bg-warning",
  },
  {
    id: 4,
    title: "Python untuk Data Science & AI",
    category: "Teknologi",
    instructor: "Dr. Rina Wijaya",
    rating: 4.9,
    students: 1567,
    duration: "35 jam",
    price: "Rp 349.000",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    badge: "Populer",
    badgeColor: "bg-primary",
  },
];

export default function NewCourses() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-16 md:py-24" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
              Kursus Populer & Terbaru
            </h2>
            <p className="text-base max-w-2xl text-neutral-600 dark:text-white/50">
              Pilihan terbaik untuk memulai perjalanan belajarmu
            </p>
          </div>
          <Link
            href="/courses"
            className="hidden md:block text-sm font-semibold text-primary hover:underline"
          >
            Lihat Semua
          </Link>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {courses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <Link href={`/courses/${course.id}`}>
                <Card className="h-full group cursor-pointer p-0 rounded-2xl border-black/5 dark:border-white/5 hover:border-primary/30 transition-all duration-300 overflow-hidden" padding="none">
                  {/* Image */}
                  <div className="relative aspecrflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Badge */}
                    <div className={`absolute top-3 left-3 ${course.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {course.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category */}
                    <p className="text-xs font-semibold text-yellow-400 mb-2">
                      {course.category}
                    </p>

                    {/* Title */}
                    <h3 className="text-base font-semibold mb-3 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>

                    {/* Instructor */}
                    <p className="text-sm text-neutral-600 dark:text-white/50 mb-3">
                      {course.instructor}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-white/40 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="pt-3 border-t border-black/5 dark:border-white/5">
                      <p className="text-lg font-bold text-primary">
                        {course.price}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/courses"
            className="inline-block text-sm font-semibold text-primary hover:underline"
          >
            Lihat Semua Kursus
          </Link>
        </div>
      </div>
    </section>
  );
}