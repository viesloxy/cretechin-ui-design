"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";
import PageHeader from "@/components/my-learning/PageHeader";
import TabNavigation from "@/components/my-learning/TabNavigation";
import CourseCardInProgress from "@/components/my-learning/CourseCardInProgress";
import CourseCardCompleted from "@/components/my-learning/CourseCardCompleted";
import EmptyState from "@/components/my-learning/EmptyState";
import StatsBar from "@/components/my-learning/StatsBar";
import CourseCardSkeleton from "@/components/my-learning/CourseCardSkeleton";
import type { TabType } from "@/components/my-learning/TabNavigation";

type CourseEnrollment = {
  id: string;
  courseId: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  totalDuration: string;
  enrolledAt: string;
  completedAt?: string;
  certificateId?: string;
  hasReview?: boolean;
  status: "in-progress" | "completed";
};

// Mock data - in-progress courses
const mockInProgressCourses: CourseEnrollment[] = [
  {
    id: "enroll-001",
    courseId: "1",
    title: "Mastering React & Next.js 14 — Dari Dasar Sampai Mahir",
    instructor: "Budi Santoso",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    progress: 60,
    totalModules: 24,
    completedModules: 14,
    totalDuration: "18 Jam 30 Menit",
    enrolledAt: "2026-05-01",
    status: "in-progress",
  },
  {
    id: "enroll-002",
    courseId: "2",
    title: "UI/UX Design dengan Figma — Complete Guide",
    instructor: "Sarah Wijaya",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80",
    progress: 35,
    totalModules: 18,
    completedModules: 6,
    totalDuration: "12 Jam",
    enrolledAt: "2026-05-10",
    status: "in-progress",
  },
  {
    id: "enroll-003",
    courseId: "3",
    title: "Python untuk Data Science — Hands-on Projects",
    instructor: "Andi Kurniawan",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
    progress: 85,
    totalModules: 20,
    completedModules: 17,
    totalDuration: "15 Jam",
    enrolledAt: "2026-04-15",
    status: "in-progress",
  },
  {
    id: "enroll-004",
    courseId: "7",
    title: "Pengembangan Game dengan Unity — Dari Nol Hingga Rilis",
    instructor: "Hendra Kusuma",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
    progress: 15,
    totalModules: 30,
    completedModules: 5,
    totalDuration: "30 Jam",
    enrolledAt: "2026-05-20",
    status: "in-progress",
  },
];

// Mock data - completed courses
const mockCompletedCourses: CourseEnrollment[] = [
  {
    id: "enroll-010",
    courseId: "4",
    title: "HTML & CSS Fundamental — Bangun Website Pertamamu",
    instructor: "Diana Putri",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80",
    progress: 100,
    totalModules: 12,
    completedModules: 12,
    totalDuration: "6 Jam",
    enrolledAt: "2026-03-01",
    completedAt: "20 Mar 2026",
    certificateId: "cert-001",
    hasReview: false,
    status: "completed",
  },
  {
    id: "enroll-011",
    courseId: "5",
    title: "JavaScript Fundamental — Konsep dan Praktik",
    instructor: "Budi Santoso",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80",
    progress: 100,
    totalModules: 15,
    completedModules: 15,
    totalDuration: "10 Jam",
    enrolledAt: "2026-02-15",
    completedAt: "10 Mar 2026",
    certificateId: "cert-002",
    hasReview: true,
    status: "completed",
  },
  {
    id: "enroll-012",
    courseId: "6",
    title: "Git & GitHub untuk Developer Pemula",
    instructor: "Rizky Pratama",
    thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&q=80",
    progress: 100,
    totalModules: 8,
    completedModules: 8,
    totalDuration: "4 Jam",
    enrolledAt: "2026-01-20",
    completedAt: "28 Jan 2026",
    certificateId: "cert-003",
    hasReview: false,
    status: "completed",
  },
];

function MyLearningContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<TabType>("in-progress");
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Initialize tab from URL query param
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "completed") {
      setActiveTab("completed");
    } else if (tabParam === "in-progress") {
      setActiveTab("in-progress");
    }
  }, [searchParams]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsDataLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/login?redirect=/courses");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const inProgressCourses = mockInProgressCourses;
  const completedCourses = mockCompletedCourses;

  const stats = {
    totalEnrolled: inProgressCourses.length + completedCourses.length,
    totalCompleted: completedCourses.length,
    totalHoursLearned: 47,
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url.toString());
  };

  const currentCourses = activeTab === "in-progress" ? inProgressCourses : completedCourses;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <BerandaNavbar />

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <PageHeader
          title="Kelas Saya"
          description="Lanjutkan perjalanan belajarmu dan raih mimpimu."
        />

        {/* Stats Bar */}
        <StatsBar
          totalEnrolled={stats.totalEnrolled}
          totalCompleted={stats.totalCompleted}
          totalHoursLearned={stats.totalHoursLearned}
        />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          inProgressCount={inProgressCourses.length}
          completedCount={completedCourses.length}
        />

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isDataLoading ? (
              /* Loading Skeleton */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            ) : currentCourses.length === 0 ? (
              /* Empty State */
              <EmptyState tab={activeTab} />
            ) : (
              /* Course Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {activeTab === "in-progress" ? (
                  inProgressCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.08,
                      }}
                    >
                      <CourseCardInProgress enrollment={course} />
                    </motion.div>
                  ))
                ) : (
                  completedCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.08,
                      }}
                    >
                      <CourseCardCompleted enrollment={course} />
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default function CoursesPage() {
  return (
    <AuthProvider>
      <MyLearningContent />
    </AuthProvider>
  );
}