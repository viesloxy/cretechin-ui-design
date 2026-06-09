"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import {
  CoursesListView,
  CourseEditor,
  SyllabusBuilder,
  DeleteCourseDialog,
} from "@/components/admin/courses";
import type { Course, CourseModule } from "@/lib/courses/types";
import { MOCK_COURSES } from "@/lib/courses/mockData";

type ViewMode = "list" | "editor" | "syllabus";
type EditorMode = "create" | "edit";

function CoursesContent() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading, adminSession } = useAuth();
  const { isLoading, sidebarCollapsed } = useAdmin();

  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editorMode, setEditorMode] = useState<EditorMode>("create");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 relative">
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-neutral-600 dark:text-white/50 animate-pulse">
            Memuat halaman...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const selectedCourse =
    selectedCourseId !== null
      ? courses.find((c) => c.id === selectedCourseId) ?? null
      : null;

  // Handlers
  const openCreate = () => {
    setEditorMode("create");
    setSelectedCourseId(null);
    setViewMode("editor");
  };

  const openEdit = (id: string) => {
    setEditorMode("edit");
    setSelectedCourseId(id);
    setViewMode("editor");
  };

  const openSyllabus = (id: string) => {
    setSelectedCourseId(id);
    setViewMode("syllabus");
  };

  const closeView = () => {
    setViewMode("list");
    setSelectedCourseId(null);
  };

  const handleDelete = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (!course) return;
    setPendingDelete({ id, title: course.title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setCourses((prev) => prev.filter((c) => c.id !== pendingDelete.id));
    setDeleteDialogOpen(false);
    setPendingDelete(null);
  };

  const handlePreview = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (course) alert(`Preview: ${course.title}\n\n${course.shortDescription}`);
  };

  const handleSaveCourse = async (data: Partial<Course>) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (editorMode === "create") {
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: data.title ?? "",
        slug: data.slug ?? "",
        instructor: data.instructor ?? {
          id: `inst-${Date.now()}`,
          name: adminSession?.name ?? "Admin CreTechin",
        },
        description: data.description ?? "",
        shortDescription: data.shortDescription ?? "",
        whatYouWillLearn: data.whatYouWillLearn ?? [],
        targetAudience: data.targetAudience ?? [],
        thumbnail: data.thumbnail ?? null,
        trailerUrl: data.trailerUrl ?? "",
        category: data.category ?? "teknologi",
        level: data.level ?? "pemula",
        language: data.language ?? "id",
        tags: data.tags ?? [],
        price: data.price ?? 0,
        isFree: data.isFree ?? false,
        discount: data.discount ?? null,
        status: data.status ?? "draft",
        featured: data.featured ?? false,
        certificateEnabled: data.certificateEnabled ?? true,
        discussionEnabled: data.discussionEnabled ?? true,
        modules: [],
        studentCount: 0,
        rating: 0,
        reviewCount: 0,
        estimatedDuration: data.estimatedDuration ?? 0,
        publishedAt: data.publishedAt ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCourses((prev) => [newCourse, ...prev]);
      setSelectedCourseId(newCourse.id);
      setEditorMode("edit");
    } else if (data.id) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === data.id ? { ...c, ...data, updatedAt: new Date().toISOString() } as Course : c
        )
      );
    }
  };

  const handleSaveSyllabus = async (modules: CourseModule[]) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!selectedCourseId) return;
    setCourses((prev) =>
      prev.map((c) =>
        c.id === selectedCourseId
          ? { ...c, modules, updatedAt: new Date().toISOString() }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-row bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Sidebar />
      <div
        className={`w-full transition-[padding] duration-300 ${
          sidebarCollapsed ? "lg:pl-4" : "lg:pl-6"
        }`}
      >
        <TopBar />
        <main className="p-4 lg:p-6 xl:p-8">
          <AnimatePresence mode="wait">
            {viewMode === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <CoursesListView
                  courses={courses}
                  onAdd={openCreate}
                  onEdit={openEdit}
                  onSyllabus={openSyllabus}
                  onPreview={handlePreview}
                  onDelete={handleDelete}
                />
              </motion.div>
            )}
            {viewMode === "editor" && (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <CourseEditor
                  mode={editorMode}
                  course={selectedCourse}
                  onBack={closeView}
                  onSave={handleSaveCourse}
                  onGoToSyllabus={openSyllabus}
                />
              </motion.div>
            )}
            {viewMode === "syllabus" && selectedCourse && (
              <motion.div
                key="syllabus"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <SyllabusBuilder
                  course={selectedCourse}
                  onBack={closeView}
                  onSaveSyllabus={handleSaveSyllabus}
                  onGoToEditor={openEdit}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="h-8" />
        </main>
      </div>

      <DeleteCourseDialog
        open={deleteDialogOpen}
        courseTitle={pendingDelete?.title ?? ""}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

export default function AdminCoursesPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <CoursesContent />
      </AdminProvider>
    </AuthProvider>
  );
}
