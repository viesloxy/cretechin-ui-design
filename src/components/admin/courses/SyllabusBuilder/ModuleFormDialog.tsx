"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Save } from "lucide-react";
import DynamicListInput from "../CourseEditor/DynamicListInput";
import type { CourseModule } from "@/lib/courses/types";

interface ModuleFormDialogProps {
  open: boolean;
  module: CourseModule | null;
  onClose: () => void;
  onSave: (data: { title: string; description: string; objectives: string[] }) => void;
}

export default function ModuleFormDialog({
  open,
  module,
  onClose,
  onSave,
}: ModuleFormDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setTitle(module?.title ?? "");
      setDescription(module?.description ?? "");
      setObjectives(module?.objectives ?? []);
    }
  }, [open, module]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Judul modul tidak boleh kosong");
      return;
    }
    onSave({ title: title.trim(), description: description.trim(), objectives });
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
                {module ? "Edit Modul" : "Tambah Modul Baru"}
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
                  Judul Modul <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="cth: Dasar React"
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
                  Deskripsi Modul
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan apa yang akan dipelajari di modul ini..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <DynamicListInput
                label="Tujuan Pembelajaran (opsional)"
                value={objectives}
                onChange={setObjectives}
                placeholder="cth: Memahami JSX"
                addLabel="+ Tambah tujuan"
              />
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
                Simpan Modul
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
}
