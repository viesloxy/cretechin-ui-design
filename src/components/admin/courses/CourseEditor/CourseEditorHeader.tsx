"use client";

import { ArrowLeft, Save, Eye, ListTree } from "lucide-react";

interface CourseEditorHeaderProps {
  mode: "create" | "edit";
  lastSaved: string;
  onBack: () => void;
  onSaveDraft: () => void;
  onPreview: () => void;
  onGoToSyllabus?: () => void;
  isSaving: boolean;
}

export default function CourseEditorHeader({
  mode,
  lastSaved,
  onBack,
  onSaveDraft,
  onPreview,
  onGoToSyllabus,
  isSaving,
}: CourseEditorHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali ke daftar kursus"
          title="Kembali"
          className="w-10 h-10 flex items-center justify-center rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white truncate">
            {mode === "create" ? "Tambah Kursus Baru" : "Edit Kursus"}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {mode === "create"
              ? "Buat kursus baru untuk CreTechin"
              : `Terakhir disimpan ${lastSaved}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSaving}
          className="h-10 px-4 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Simpan Draft</span>
        </button>
        <button
          type="button"
          onClick={onPreview}
          className="h-10 px-4 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Preview</span>
        </button>
        {mode === "edit" && onGoToSyllabus && (
          <button
            type="button"
            onClick={onGoToSyllabus}
            className="h-10 px-4 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <ListTree className="w-4 h-4" />
            <span className="hidden sm:inline">Kelola Silabus</span>
          </button>
        )}
      </div>
    </div>
  );
}
