"use client";

import { PlayCircle, FileText, Type, HelpCircle, Link as LinkIcon, Download, Pencil, Trash2, GripVertical, Eye } from "lucide-react";
import type { CourseLesson, LessonType } from "@/lib/courses/types";
import { LESSON_TYPE_LABELS } from "@/lib/courses/types";
import { formatDuration } from "@/lib/courses/utils";

const LESSON_ICONS: Record<LessonType, { Icon: React.ComponentType<{ className?: string }>; color: string }> = {
  video: { Icon: PlayCircle, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
  pdf: { Icon: FileText, color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" },
  text: { Icon: Type, color: "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" },
  quiz: { Icon: HelpCircle, color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" },
  link: { Icon: LinkIcon, color: "bg-primary/10 text-primary-dark" },
  download: { Icon: Download, color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
};

interface LessonRowProps {
  lesson: CourseLesson;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  isDragging: boolean;
}

export default function LessonRow({
  lesson,
  index,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}: LessonRowProps) {
  const { Icon, color } = LESSON_ICONS[lesson.type];

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`
        flex items-center gap-3 p-3 rounded-xl border border-black/5 dark:border-white/10
        bg-white dark:bg-neutral-900 transition-all
        group
        ${isDragging ? "opacity-50 scale-[0.98]" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/30"}
      `}
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity p-1 -ml-1"
        aria-label="Drag untuk reorder"
        title="Drag untuk reorder"
      >
        <GripVertical className="w-4 h-4 text-neutral-400" />
      </button>

      <span className="text-xs font-mono text-neutral-400 w-6 text-center flex-shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
          {lesson.title}
        </h5>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {LESSON_TYPE_LABELS[lesson.type]}
          </span>
          {lesson.duration > 0 && (
            <>
              <span className="text-xs text-neutral-300 dark:text-neutral-600">•</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {formatDuration(lesson.duration)}
              </span>
            </>
          )}
          {lesson.isFree && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-primary-dark bg-primary/15 px-1.5 py-0.5 rounded">
              Preview
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onEdit}
          aria-label="Edit materi"
          title="Edit"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Hapus materi"
          title="Hapus"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
