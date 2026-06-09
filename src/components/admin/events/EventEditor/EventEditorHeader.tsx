"use client";

import { ArrowLeft, Save, Eye, Send, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { formatRelativeTime } from "@/lib/events/utils";

interface EventEditorHeaderProps {
  mode: "create" | "edit";
  lastSaved: string | null;
  isSaving: boolean;
  isPublished: boolean;
  onBack: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onPreview: () => void;
}

export function EventEditorHeader({
  mode,
  lastSaved,
  isSaving,
  isPublished,
  onBack,
  onSaveDraft,
  onPublish,
  onPreview,
}: EventEditorHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/5 bg-white text-neutral-700 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          aria-label="Kembali ke daftar"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white md:text-xl">
            {mode === "create" ? "Tambah Acara Baru" : "Edit Acara"}
          </h2>
          {mode === "edit" && lastSaved && !isSaving && (
            <p className="mt-0.5 text-xs text-neutral-500">
              {formatRelativeTime(lastSaved)}
            </p>
          )}
          {isSaving && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-0.5 inline-flex items-center gap-1 text-xs text-neutral-500"
            >
              <Loader2 className="h-3 w-3 animate-spin" />
              Menyimpan...
            </motion.p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSaving}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-black/5 bg-white px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <Save className="h-3.5 w-3.5" />
          Simpan Draft
        </button>
        <button
          type="button"
          onClick={onPreview}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-black/5 bg-white px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={isSaving}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-neutral-900 transition hover:bg-primary/90 disabled:opacity-50"
        >
          {isPublished ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              Simpan Perubahan
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              Publish
            </>
          )}
        </button>
      </div>
    </div>
  );
}
