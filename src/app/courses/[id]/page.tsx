"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import {
  PlayerHeader,
  VideoPlayer,
  CurrentLessonInfo,
  CourseSidebar,
} from "@/components/course-player";

// Types
interface Lesson {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  status: "completed" | "active" | "locked" | "default";
}

interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

interface CoursePlayerData {
  courseId: string;
  enrollmentId: string;
  title: string;
  instructor: string;
  currentLesson: {
    id: string;
    title: string;
    duration: string;
    durationSeconds: number;
  };
  progress: {
    completedLessons: number;
    totalLessons: number;
    percentage: number;
  };
  modules: Module[];
}

// Mock data - same enrollment data from courses page for continuity
const mockCourseData: Record<string, CoursePlayerData> = {
  "enroll-001": {
    courseId: "course-react-mastery",
    enrollmentId: "enroll-001",
    title: "Mastering React & Next.js 14 - Dari Dasar Sampai Mahir",
    instructor: "Budi Santoso",
    currentLesson: {
      id: "lesson-015",
      title: "Latihan Praktek Pertama",
      duration: "1 jam 20 menit",
      durationSeconds: 4800,
    },
    progress: {
      completedLessons: 14,
      totalLessons: 24,
      percentage: 58,
    },
    modules: [
      {
        id: "module-001",
        title: "Modul 1: Pengenalan Dasar",
        duration: "2 jam 30 menit",
        lessons: [
          { id: "lesson-001", title: "Selamat Datang di Kursus", duration: "5 menit", durationSeconds: 300, status: "completed" },
          { id: "lesson-002", title: "Pendahuluan React", duration: "10 menit", durationSeconds: 600, status: "completed" },
          { id: "lesson-003", title: "Persiapan Lingkungan Development", duration: "15 menit", durationSeconds: 900, status: "completed" },
        ],
      },
      {
        id: "module-002",
        title: "Modul 2: Konsep Inti React",
        duration: "1 jam 45 menit",
        lessons: [
          { id: "lesson-004", title: "Component & Props", duration: "20 menit", durationSeconds: 1200, status: "completed" },
          { id: "lesson-005", title: "State & Lifecycle", duration: "25 menit", durationSeconds: 1500, status: "completed" },
          { id: "lesson-006", title: "Event Handling", duration: "15 menit", durationSeconds: 900, status: "completed" },
        ],
      },
      {
        id: "module-003",
        title: "Modul 3: Latihan Praktek",
        duration: "2 jam",
        lessons: [
          { id: "lesson-014", title: "Setup Project Pertama", duration: "20 menit", durationSeconds: 1200, status: "completed" },
          { id: "lesson-015", title: "Latihan Praktek Pertama", duration: "1 jam 20 menit", durationSeconds: 4800, status: "active" },
          { id: "lesson-016", title: "Latihan Praktek Kedua", duration: "45 menit", durationSeconds: 2700, status: "locked" },
          { id: "lesson-017", title: "Review dan Refactoring", duration: "30 menit", durationSeconds: 1800, status: "locked" },
        ],
      },
      {
        id: "module-004",
        title: "Modul 4: Deployment & Optimasi",
        duration: "1 jam 30 menit",
        lessons: [
          { id: "lesson-018", title: "Build Optimization", duration: "20 menit", durationSeconds: 1200, status: "locked" },
          { id: "lesson-019", title: "Deployment ke Vercel", duration: "25 menit", durationSeconds: 1500, status: "locked" },
        ],
      },
    ],
  },
  "enroll-002": {
    courseId: "course-figma-ui",
    enrollmentId: "enroll-002",
    title: "UI/UX Design dengan Figma - Complete Guide",
    instructor: "Sarah Wijaya",
    currentLesson: {
      id: "lesson-006",
      title: "Membuat Component Library",
      duration: "45 menit",
      durationSeconds: 2700,
    },
    progress: {
      completedLessons: 6,
      totalLessons: 18,
      percentage: 33,
    },
    modules: [
      {
        id: "module-001",
        title: "Modul 1: Pengenalan Figma",
        duration: "1 jam",
        lessons: [
          { id: "lesson-001", title: "Pengenalan UI/UX Design", duration: "15 menit", durationSeconds: 900, status: "completed" },
          { id: "lesson-002", title: "Interface Figma", duration: "20 menit", durationSeconds: 1200, status: "completed" },
        ],
      },
      {
        id: "module-002",
        title: "Modul 2: Fundamental Design",
        duration: "2 jam",
        lessons: [
          { id: "lesson-003", title: "Typography & Color Theory", duration: "30 menit", durationSeconds: 1800, status: "completed" },
          { id: "lesson-004", title: "Layout & Grid System", duration: "25 menit", durationSeconds: 1500, status: "completed" },
          { id: "lesson-005", title: "Icon & Illustration", duration: "20 menit", durationSeconds: 1200, status: "completed" },
          { id: "lesson-006", title: "Membuat Component Library", duration: "45 menit", durationSeconds: 2700, status: "active" },
        ],
      },
      {
        id: "module-003",
        title: "Modul 3: Prototype & Animasi",
        duration: "1 jam 30 menit",
        lessons: [
          { id: "lesson-007", title: "Interactive Prototype", duration: "30 menit", durationSeconds: 1800, status: "locked" },
          { id: "lesson-008", title: "Micro-interactions", duration: "25 menit", durationSeconds: 1500, status: "locked" },
        ],
      },
    ],
  },
  "enroll-003": {
    courseId: "course-python-data",
    enrollmentId: "enroll-003",
    title: "Python untuk Data Science - Hands-on Projects",
    instructor: "Andi Kurniawan",
    currentLesson: {
      id: "lesson-017",
      title: "Machine Learning Pipeline",
      duration: "1 jam",
      durationSeconds: 3600,
    },
    progress: {
      completedLessons: 17,
      totalLessons: 20,
      percentage: 85,
    },
    modules: [
      {
        id: "module-001",
        title: "Modul 1: Python Fundamentals",
        duration: "2 jam",
        lessons: [
          { id: "lesson-001", title: "Python Basics", duration: "30 menit", durationSeconds: 1800, status: "completed" },
          { id: "lesson-002", title: "Data Types & Structures", duration: "45 menit", durationSeconds: 2700, status: "completed" },
        ],
      },
      {
        id: "module-002",
        title: "Modul 2: NumPy & Pandas",
        duration: "3 jam",
        lessons: [
          { id: "lesson-003", title: "NumPy Array Operations", duration: "1 jam", durationSeconds: 3600, status: "completed" },
          { id: "lesson-004", title: "Pandas DataFrames", duration: "1 jam", durationSeconds: 3600, status: "completed" },
          { id: "lesson-005", title: "Data Cleaning Techniques", duration: "1 jam", durationSeconds: 3600, status: "completed" },
        ],
      },
      {
        id: "module-003",
        title: "Modul 3: Data Visualization",
        duration: "2 jam",
        lessons: [
          { id: "lesson-006", title: "Matplotlib Fundamentals", duration: "40 menit", durationSeconds: 2400, status: "completed" },
          { id: "lesson-007", title: "Seaborn & Plotly", duration: "40 menit", durationSeconds: 2400, status: "completed" },
        ],
      },
      {
        id: "module-004",
        title: "Modul 4: Machine Learning",
        duration: "4 jam",
        lessons: [
          { id: "lesson-014", title: "Scikit-Learn Introduction", duration: "1 jam", durationSeconds: 3600, status: "completed" },
          { id: "lesson-015", title: "Supervised Learning", duration: "1 jam", durationSeconds: 3600, status: "completed" },
          { id: "lesson-016", title: "Unsupervised Learning", duration: "1 jam", durationSeconds: 3600, status: "completed" },
          { id: "lesson-017", title: "Machine Learning Pipeline", duration: "1 jam", durationSeconds: 3600, status: "active" },
        ],
      },
      {
        id: "module-005",
        title: "Modul 5: Final Project",
        duration: "3 jam",
        lessons: [
          { id: "lesson-018", title: "Capstone Project Overview", duration: "30 menit", durationSeconds: 1800, status: "locked" },
          { id: "lesson-019", title: "Data Analysis & Model Building", duration: "1 jam 30 menit", durationSeconds: 5400, status: "locked" },
          { id: "lesson-020", title: "Presentation & Insights", duration: "1 jam", durationSeconds: 3600, status: "locked" },
        ],
      },
    ],
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function CoursePlayerContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const enrollmentId = params.id as string;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(765);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsDataLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push(`/login?redirect=/courses/${enrollmentId}`);
    }
  }, [isAuthenticated, isLoading, router, enrollmentId]);

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

  // Get course data based on enrollment ID
  const courseData = mockCourseData[enrollmentId];

  if (!courseData) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Kelas Tidak Ditemukan
          </h1>
          <p className="text-neutral-500 dark:text-white/50 mb-6">
            Maaf, kelas yang kamu cari tidak tersedia.
          </p>
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-3 bg-primary text-neutral-900 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            Kembali ke Kelas Saya
          </button>
        </div>
      </div>
    );
  }

  const handleLessonClick = (lessonId: string) => {
    // In real app: navigate to specific lesson
    console.log("Navigate to lesson:", lessonId);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    // In real app: start video playback
    console.log("Start video playback");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <PlayerHeader />

      {/* Main Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row"
      >
        {/* Main Content Area */}
        <main className="flex-1">
          {/* Video Player */}
          <motion.div variants={itemVariants}>
            <VideoPlayer
              currentTime={currentTime}
              totalDuration={courseData.currentLesson.durationSeconds}
              isPlaying={isPlaying}
              onPlayClick={handlePlayClick}
            />
          </motion.div>

          {/* Current Lesson Info */}
          <motion.div variants={itemVariants}>
            <CurrentLessonInfo
              title={courseData.currentLesson.title}
              duration={courseData.currentLesson.duration}
              moduleLabel={`${courseData.progress.completedLessons} dari ${courseData.progress.totalLessons} materi selesai`}
            />
          </motion.div>
        </main>

        {/* Sidebar - Hidden on mobile, shown on lg+ */}
        <motion.div variants={itemVariants} className="hidden lg:block">
          <CourseSidebar
            completedLessons={courseData.progress.completedLessons}
            totalLessons={courseData.progress.totalLessons}
            modules={courseData.modules}
            onLessonClick={handleLessonClick}
          />
        </motion.div>
      </motion.div>

      {/* Mobile Sidebar - Full width below content */}
      <motion.div
        variants={itemVariants}
        className="lg:hidden border-t border-black/5 dark:border-white/10"
      >
        <CourseSidebar
          completedLessons={courseData.progress.completedLessons}
          totalLessons={courseData.progress.totalLessons}
          modules={courseData.modules}
          onLessonClick={handleLessonClick}
        />
      </motion.div>
    </div>
  );
}

export default function CoursePlayerPage() {
  return (
    <AuthProvider>
      <CoursePlayerContent />
    </AuthProvider>
  );
}
