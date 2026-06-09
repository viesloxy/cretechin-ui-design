"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Trash2, Linkedin, User } from "lucide-react";
import type { EventSpeaker } from "@/lib/events/types";

interface SpeakerFormDialogProps {
  open: boolean;
  speaker: EventSpeaker | null;
  onClose: () => void;
  onSave: (data: Omit<EventSpeaker, "id" | "order">) => void;
}

const EMPTY_SPEAKER: Omit<EventSpeaker, "id" | "order"> = {
  name: "",
  title: "",
  bio: "",
  linkedinUrl: "",
  avatar: undefined,
};

export function SpeakerFormDialog({
  open,
  speaker,
  onClose,
  onSave,
}: SpeakerFormDialogProps) {
  const [form, setForm] = useState<Omit<EventSpeaker, "id" | "order">>(EMPTY_SPEAKER);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (speaker) {
      setForm({
        name: speaker.name,
        title: speaker.title ?? "",
        bio: speaker.bio ?? "",
        linkedinUrl: speaker.linkedinUrl ?? "",
        avatar: speaker.avatar,
      });
    } else {
      setForm(EMPTY_SPEAKER);
    }
  }, [speaker, open]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) {
      alert("Ukuran file maksimal 1MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({
        ...f,
        avatar: {
          url: reader.result as string,
          width: 200,
          height: 200,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/5 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-neutral-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {speaker ? "Edit Pembicara" : "Tambah Pembicara"}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Avatar
                </label>
                <div className="flex items-center gap-3">
                  {form.avatar?.url ? (
                    <img
                      src={form.avatar.url}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                      <User className="h-7 w-7 text-neutral-400" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-black/5 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                      <Upload className="h-3 w-3" />
                      Upload
                    </button>
                    {form.avatar && (
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, avatar: undefined }))}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-3 w-3" />
                        Hapus
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="cth: Andi Wijaya"
                  required
                  className="h-10 w-full rounded-xl border border-black/5 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Jabatan / Role
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="cth: Senior Product Designer"
                  className="h-10 w-full rounded-xl border border-black/5 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Bio Singkat
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  rows={2}
                  placeholder="Bio singkat tentang pembicara..."
                  className="w-full rounded-xl border border-black/5 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  <span className="inline-flex items-center gap-1">
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn URL
                  </span>
                </label>
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) => setForm((f) => ({ ...f, linkedinUrl: e.target.value }))}
                  placeholder="https://linkedin.com/in/..."
                  className="h-10 w-full rounded-xl border border-black/5 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-black/5 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-primary/90"
                >
                  Simpan
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
