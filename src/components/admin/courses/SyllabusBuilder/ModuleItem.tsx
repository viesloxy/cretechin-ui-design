"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  GripVertical,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { CourseModule } from "@/lib/courses/types";
import { getModuleDuration } from "@/lib/courses/utils";
import LessonRow from "./LessonRow";

interface ModuleItemProps {
  module: CourseModule;
  index: number;
  totalModules: number;
  defaultOpen?: boolean;
  onEditModule: () => void;
  onDeleteModule: () => void;
  onAddLesson: () => void;
  onEditLesson: (lessonId: string) => void;
  onDeleteLesson: (lessonId: string) => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isDragging: boolean;
  isDragOver: boolean;
}

export default function ModuleItem({
  module,
  index,
  totalModules,
  defaultOpen = false,
  onEditModule,
  onDeleteModule,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onDragStart,
  onDragOver,
  onDrop,
  onMoveUp,
  onMoveDown,
  isDragging,
  isDragOver,
}: ModuleItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [draggedLessonId, setDraggedLessonId] = useState<string | null>(null);
  const [dragOverLessonId, setDragOverLessonId] = useState<string | null>(null);

  const handleLessonDrop = (targetId: string) => {
    if (!draggedLessonId || draggedLessonId === targetId) return;
    // Reorder lessons handled by parent
    setDraggedLessonId(null);
    setDragOverLessonId(null);
  };

  return (
    <motion.div
      layout
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`
        bg-white dark:bg-neutral-900 border rounded-2xl overflow-hidden
        transition-all
        ${
          isDragOver
            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
            : isDragging
              ? "opacity-50 scale-[0.98] border-primary/30"
              : "border-black/5 dark:border-white/10"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Drag untuk reorder modul"
          title="Drag untuk reorder"
        >
          <GripVertical className="w-4 h-4 text-neutral-400" />
        </button>

        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          aria-expanded={open}
          aria-controls={`mod-${module.id}`}
          className="flex-1 flex items-center gap-3 min-w-0 text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary-dark">{index + 1}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-neutral-900 dark:text-white truncate">
              Modul {index + 1}: {module.title}
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {module.lessons.length} pelajaran
              {getModuleDuration(module) > 0 && ` • ${formatDur(getModuleDuration(module))}`}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            aria-label="Pindah ke atas"
            title="Pindah ke atas"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === totalModules - 1}
            aria-label="Pindah ke bawah"
            title="Pindah ke bawah"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onEditModule}
            aria-label="Edit modul"
            title="Edit modul"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDeleteModule}
            aria-label="Hapus modul"
            title="Hapus modul"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((p) => !p)}
            aria-label={open ? "Tutup" : "Buka"}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {module.description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 px-3 py-2 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg">
                  {module.description}
                </p>
              )}

              {module.objectives.length > 0 && (
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-xs font-semibold text-primary-dark mb-1.5">Tujuan Pembelajaran:</p>
                  <ul className="space-y-1">
                    {module.objectives.map((obj, i) => (
                      <li key={i} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-1.5">
                {module.lessons.length === 0 ? (
                  <div className="text-center py-6 text-sm text-neutral-500 dark:text-neutral-400 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                    Belum ada materi. Klik tombol di bawah untuk menambah.
                  </div>
                ) : (
                  module.lessons.map((lesson, idx) => (
                    <LessonRow
                      key={lesson.id}
                      lesson={lesson}
                      index={idx}
                      onEdit={() => onEditLesson(lesson.id)}
                      onDelete={() => onDeleteLesson(lesson.id)}
                      onDragStart={() => setDraggedLessonId(lesson.id)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverLessonId(lesson.id);
                      }}
                      onDrop={() => handleLessonDrop(lesson.id)}
                      isDragging={draggedLessonId === lesson.id}
                    />
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={onAddLesson}
                className="w-full h-10 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:border-primary hover:text-primary-dark hover:bg-primary/5 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Materi
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function formatDur(seconds: number): string {
  if (seconds < 60) return `${seconds}d`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    return `${m}m`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m > 0 ? `${h}j ${m}m` : `${h}j`;
}
