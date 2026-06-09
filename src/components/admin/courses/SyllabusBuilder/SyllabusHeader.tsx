"use client";

import { ArrowLeft, Save, Eye } from "lucide-react";

interface SyllabusHeaderProps {
  courseTitle: string;
  onBack: () => void;
  onPreview: () => void;
  onSave: () => void;
  isSaving: boolean;
  lastSaved: string;
}

export default function SyllabusHeader({
  courseTitle,
  onBack,
  onPreview,
  onSave,
  isSaving,
  lastSaved,
}: SyllabusHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali ke daftar kursus"
          className="w-10 h-10 flex items-center justify-center rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white truncate">
            Kelola Silabus
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
            {courseTitle} • {lastSaved}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={onPreview}
          className="h-10 px-4 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Preview sebagai Siswa</span>
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="h-10 px-4 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              <span className="hidden sm:inline">Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Simpan Silabus</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
