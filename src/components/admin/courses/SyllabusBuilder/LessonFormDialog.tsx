"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Save } from "lucide-react";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import type { CourseLesson, LessonType } from "@/lib/courses/types";
import { LESSON_TYPE_LABELS } from "@/lib/courses/types";

interface LessonFormDialogProps {
  open: boolean;
  lesson: CourseLesson | null;
  onClose: () => void;
  onSave: (data: { title: string; type: LessonType; duration: number; isFree: boolean; contentUrl: string }) => void;
}

const LESSON_TYPES: { value: LessonType; label: string }[] = [
  { value: "video", label: LESSON_TYPE_LABELS.video },
  { value: "pdf", label: LESSON_TYPE_LABELS.pdf },
  { value: "text", label: LESSON_TYPE_LABELS.text },
  { value: "quiz", label: LESSON_TYPE_LABELS.quiz },
  { value: "link", label: LESSON_TYPE_LABELS.link },
  { value: "download", label: LESSON_TYPE_LABELS.download },
];

export default function LessonFormDialog({
  open,
  lesson,
  onClose,
  onSave,
}: LessonFormDialogProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<LessonType>("video");
  const [duration, setDuration] = useState(0); // seconds
  const [durationInput, setDurationInput] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [contentUrl, setContentUrl] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(lesson?.title ?? "");
      setType(lesson?.type ?? "video");
      const d = lesson?.duration ?? 0;
      setDuration(d);
      setDurationInput(d > 0 ? `${Math.floor(d / 60)}:${String(d % 60).padStart(2, "0")}` : "");
      setIsFree(lesson?.isFree ?? false);
      setContentUrl(lesson?.contentUrl ?? "");
    }
  }, [open, lesson]);

  const parseDuration = (input: string): number => {
    // mm:ss or hh:mm:ss
    const parts = input.split(":").map((p) => parseInt(p, 10) || 0);
    if (parts.length === 1) return parts[0] * 60;
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  };

  const handleDurationChange = (v: string) => {
    setDurationInput(v);
    setDuration(parseDuration(v));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Judul materi tidak boleh kosong");
      return;
    }
    onSave({ title: title.trim(), type, duration, isFree, contentUrl });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-lg border border-black/5 dark:border-white/10 max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {lesson ? "Edit Materi" : "Tambah Materi Baru"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup"
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
                  Judul Materi <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="cth: Intro to JSX"
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
                  Tipe Materi <span className="text-primary">*</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as LessonType)}
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  {LESSON_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
                  {type === "link" ? "URL External" : "URL / Link Konten"}
                </label>
                <input
                  type="url"
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  placeholder={
                    type === "video"
                      ? "https://youtube.com/watch?v=..."
                      : type === "pdf" || type === "download"
                        ? "/files/materi.pdf"
                        : type === "link"
                          ? "https://..."
                          : "URL konten (opsional)"
                  }
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {type === "video" && "Mendukung link YouTube, Vimeo, atau file upload"}
                  {type === "pdf" && "Upload file PDF ke storage lalu paste URL-nya"}
                  {type === "text" && "Tulis konten artikel di editor (coming soon)"}
                  {type === "quiz" && "Buat kuis di halaman Kuis (coming soon)"}
                  {type === "link" && "Link ke resource external"}
                  {type === "download" && "File yang dapat didownload siswa"}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
                  Durasi (mm:ss)
                </label>
                <input
                  type="text"
                  value={durationInput}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  placeholder="15:30"
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors font-mono"
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <ToggleSwitch
                  checked={isFree}
                  onChange={setIsFree}
                  label="Materi Preview Gratis"
                  description="Bisa diakses tanpa membeli kursus"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-5 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-4 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="h-10 px-4 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Simpan Materi
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
}
