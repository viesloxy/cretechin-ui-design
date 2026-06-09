"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Layers } from "lucide-react";
import type { Course, CourseModule, CourseLesson, LessonType } from "@/lib/courses/types";
import { formatRelativeTime } from "@/lib/courses/utils";
import SyllabusHeader from "./SyllabusHeader";
import CourseSummaryStrip from "./CourseSummaryStrip";
import ModuleItem from "./ModuleItem";
import ModuleFormDialog from "./ModuleFormDialog";
import LessonFormDialog from "./LessonFormDialog";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface SyllabusBuilderProps {
  course: Course;
  onBack: () => void;
  onSaveSyllabus: (modules: CourseModule[]) => Promise<void>;
  onGoToEditor: (id: string) => void;
}

export default function SyllabusBuilder({
  course,
  onBack,
  onSaveSyllabus,
  onGoToEditor,
}: SyllabusBuilderProps) {
  const [modules, setModules] = useState<CourseModule[]>(course.modules);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(formatRelativeTime(course.updatedAt));

  // Drag state for modules
  const [draggedModuleId, setDraggedModuleId] = useState<string | null>(null);
  const [dragOverModuleId, setDragOverModuleId] = useState<string | null>(null);

  // Module dialog
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<CourseModule | null>(null);
  const [pendingDeleteModule, setPendingDeleteModule] = useState<CourseModule | null>(null);

  // Lesson dialog
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<{ moduleId: string; lesson: CourseLesson | null } | null>(null);
  const [pendingDeleteLesson, setPendingDeleteLesson] = useState<{ moduleId: string; lesson: CourseLesson } | null>(null);

  const isDirty = useRef(false);

  useEffect(() => {
    isDirty.current = true;
  }, [modules]);

  useEffect(() => {
    if (!isDirty.current) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  });

  // Module handlers
  const handleAddModule = () => {
    setEditingModule(null);
    setModuleDialogOpen(true);
  };

  const handleEditModule = (m: CourseModule) => {
    setEditingModule(m);
    setModuleDialogOpen(true);
  };

  const handleSaveModule = (data: { title: string; description: string; objectives: string[] }) => {
    if (editingModule) {
      setModules((prev) =>
        prev.map((m) => (m.id === editingModule.id ? { ...m, ...data } : m))
      );
    } else {
      const newModule: CourseModule = {
        id: `mod-${Date.now()}`,
        ...data,
        order: modules.length + 1,
        lessons: [],
      };
      setModules((prev) => [...prev, newModule]);
    }
    setModuleDialogOpen(false);
    setEditingModule(null);
  };

  const handleDeleteModule = (m: CourseModule) => {
    setPendingDeleteModule(m);
  };

  const confirmDeleteModule = () => {
    if (!pendingDeleteModule) return;
    setModules((prev) => prev.filter((m) => m.id !== pendingDeleteModule.id));
    setPendingDeleteModule(null);
  };

  // Module reorder (drag)
  const handleModuleDragStart = (id: string) => setDraggedModuleId(id);
  const handleModuleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDragOverModuleId(id);
  };
  const handleModuleDrop = (targetId: string) => {
    if (!draggedModuleId || draggedModuleId === targetId) {
      setDraggedModuleId(null);
      setDragOverModuleId(null);
      return;
    }
    setModules((prev) => {
      const fromIdx = prev.findIndex((m) => m.id === draggedModuleId);
      const toIdx = prev.findIndex((m) => m.id === targetId);
      if (fromIdx < 0 || toIdx < 0) return prev;
      const arr = [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr.map((m, i) => ({ ...m, order: i + 1 }));
    });
    setDraggedModuleId(null);
    setDragOverModuleId(null);
  };

  // Module move up/down (keyboard)
  const moveModule = (id: string, direction: "up" | "down") => {
    setModules((prev) => {
      const idx = prev.findIndex((m) => m.id === id);
      if (idx < 0) return prev;
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[targetIdx]] = [arr[targetIdx], arr[idx]];
      return arr.map((m, i) => ({ ...m, order: i + 1 }));
    });
  };

  // Lesson handlers
  const handleAddLesson = (moduleId: string) => {
    setEditingLesson({ moduleId, lesson: null });
    setLessonDialogOpen(true);
  };

  const handleEditLesson = (moduleId: string, lessonId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    const lesson = module?.lessons.find((l) => l.id === lessonId) ?? null;
    if (lesson) {
      setEditingLesson({ moduleId, lesson });
      setLessonDialogOpen(true);
    }
  };

  const handleSaveLesson = (data: { title: string; type: LessonType; duration: number; isFree: boolean; contentUrl: string }) => {
    if (!editingLesson) return;
    const { moduleId, lesson } = editingLesson;
    if (lesson) {
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId
            ? {
                ...m,
                lessons: m.lessons.map((l) => (l.id === lesson.id ? { ...l, ...data } : l)),
              }
            : m
        )
      );
    } else {
      const newLesson: CourseLesson = {
        id: `les-${Date.now()}`,
        ...data,
        order: modules.find((m) => m.id === moduleId)?.lessons.length ?? 0 + 1,
      };
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m
        )
      );
    }
    setLessonDialogOpen(false);
    setEditingLesson(null);
  };

  const handleDeleteLesson = (moduleId: string, lesson: CourseLesson) => {
    setPendingDeleteLesson({ moduleId, lesson });
  };

  const confirmDeleteLesson = () => {
    if (!pendingDeleteLesson) return;
    const { moduleId, lesson } = pendingDeleteLesson;
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lesson.id) } : m
      )
    );
    setPendingDeleteLesson(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveSyllabus(modules);
      isDirty.current = false;
      setLastSaved("baru saja");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (isDirty.current && !confirm("Anda memiliki perubahan silabus yang belum disimpan. Yakin keluar?")) return;
    onBack();
  };

  return (
    <div className="space-y-6">
      <SyllabusHeader
        courseTitle={course.title}
        onBack={handleBack}
        onPreview={() => alert("Preview sebagai siswa")}
        onSave={handleSave}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />

      <CourseSummaryStrip course={course} onEditInfo={() => onGoToEditor(course.id)} />

      {/* Modules */}
      <div className="space-y-3">
        {modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
              Silabus masih kosong
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5 max-w-sm">
              Mulai susun kurikulum kursus dengan menambah modul dan materi.
            </p>
            <button
              type="button"
              onClick={handleAddModule}
              className="h-10 px-5 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Modul Pertama
            </button>
          </div>
        ) : (
          <>
            {modules.map((module, idx) => (
              <ModuleItem
                key={module.id}
                module={module}
                index={idx}
                totalModules={modules.length}
                defaultOpen={idx === 0}
                onEditModule={() => handleEditModule(module)}
                onDeleteModule={() => handleDeleteModule(module)}
                onAddLesson={() => handleAddLesson(module.id)}
                onEditLesson={(lessonId) => handleEditLesson(module.id, lessonId)}
                onDeleteLesson={(lessonId) => {
                  const lesson = module.lessons.find((l) => l.id === lessonId);
                  if (lesson) handleDeleteLesson(module.id, lesson);
                }}
                onDragStart={() => handleModuleDragStart(module.id)}
                onDragOver={(e) => handleModuleDragOver(e, module.id)}
                onDrop={() => handleModuleDrop(module.id)}
                onMoveUp={() => moveModule(module.id, "up")}
                onMoveDown={() => moveModule(module.id, "down")}
                isDragging={draggedModuleId === module.id}
                isDragOver={dragOverModuleId === module.id}
              />
            ))}

            <button
              type="button"
              onClick={handleAddModule}
              className="w-full h-14 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-transparent hover:border-primary hover:bg-primary/5 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-primary-dark transition-colors inline-flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Tambah Modul Baru
            </button>
          </>
        )}
      </div>

      <ModuleFormDialog
        open={moduleDialogOpen}
        module={editingModule}
        onClose={() => {
          setModuleDialogOpen(false);
          setEditingModule(null);
        }}
        onSave={handleSaveModule}
      />

      <LessonFormDialog
        open={lessonDialogOpen}
        lesson={editingLesson?.lesson ?? null}
        onClose={() => {
          setLessonDialogOpen(false);
          setEditingLesson(null);
        }}
        onSave={handleSaveLesson}
      />

      <ConfirmDialog
        open={!!pendingDeleteModule}
        title="Hapus Modul?"
        description={
          pendingDeleteModule
            ? `Modul "${pendingDeleteModule.title}" dan ${pendingDeleteModule.lessons.length} materi di dalamnya akan terhapus.`
            : ""
        }
        confirmText="Hapus Modul"
        onConfirm={confirmDeleteModule}
        onCancel={() => setPendingDeleteModule(null)}
      />

      <ConfirmDialog
        open={!!pendingDeleteLesson}
        title="Hapus Materi?"
        description={
          pendingDeleteLesson
            ? `Materi "${pendingDeleteLesson.lesson.title}" akan dihapus dari modul.`
            : ""
        }
        confirmText="Hapus Materi"
        onConfirm={confirmDeleteLesson}
        onCancel={() => setPendingDeleteLesson(null)}
      />
    </div>
  );
}
