"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, GripVertical, Pencil, Trash2, User, ChevronUp, ChevronDown, Linkedin } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
import { SpeakerFormDialog } from "./SpeakerFormDialog";
import type { EventSpeaker } from "@/lib/events/types";

interface SpeakersCardProps {
  speakers: EventSpeaker[];
  onChange: (speakers: EventSpeaker[]) => void;
  maxSpeakers?: number;
}

function genId() {
  return `spk-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function SpeakersCard({
  speakers,
  onChange,
  maxSpeakers = 5,
}: SpeakersCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const openAdd = () => {
    setEditingIdx(null);
    setDialogOpen(true);
  };

  const openEdit = (idx: number) => {
    setEditingIdx(idx);
    setDialogOpen(true);
  };

  const handleSave = (data: Omit<EventSpeaker, "id" | "order">) => {
    if (editingIdx !== null) {
      const next = [...speakers];
      next[editingIdx] = { ...next[editingIdx], ...data };
      onChange(next);
    } else {
      onChange([
        ...speakers,
        { ...data, id: genId(), order: speakers.length },
      ]);
    }
    setDialogOpen(false);
    setEditingIdx(null);
  };

  const handleRemove = (idx: number) => {
    onChange(speakers.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i })));
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...speakers];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next.map((s, i) => ({ ...s, order: i })));
  };

  return (
    <SettingsCard
      title="Profil Pembicara"
      badge={`${speakers.length}/${maxSpeakers}`}
    >
      {speakers.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-black/5 bg-neutral-50 p-6 text-center dark:border-white/10 dark:bg-neutral-900/50">
          <User className="mx-auto mb-2 h-8 w-8 text-neutral-400" />
          <p className="text-sm text-neutral-500">
            Belum ada pembicara. Klik tombol di bawah untuk menambah.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {speakers.map((speaker, idx) => {
              const initials = speaker.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();
              return (
                <motion.li
                  layout
                  key={speaker.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="group flex items-center gap-3 rounded-xl border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-neutral-900"
                >
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => move(idx, -1)}
                      disabled={idx === 0}
                      className="rounded p-0.5 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 dark:hover:text-white"
                      aria-label="Naikkan urutan"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(idx, 1)}
                      disabled={idx === speakers.length - 1}
                      className="rounded p-0.5 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 dark:hover:text-white"
                      aria-label="Turunkan urutan"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                  <GripVertical className="h-4 w-4 text-neutral-300" />
                  {speaker.avatar?.url ? (
                    <img
                      src={speaker.avatar.url}
                      alt={speaker.name}
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                      {speaker.name}
                    </p>
                    {speaker.title && (
                      <p className="truncate text-xs text-neutral-500">
                        {speaker.title}
                      </p>
                    )}
                    {speaker.linkedinUrl && (
                      <a
                        href={speaker.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-0.5 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <Linkedin className="h-3 w-3" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => openEdit(idx)}
                      className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800"
                      title="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                      title="Hapus"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}

      <button
        type="button"
        onClick={openAdd}
        disabled={speakers.length >= maxSpeakers}
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-black/5 bg-transparent py-2.5 text-sm font-medium text-neutral-600 transition hover:border-primary hover:bg-primary/5 hover:text-primary disabled:opacity-50 dark:border-white/10 dark:text-neutral-300"
      >
        <Plus className="h-4 w-4" />
        Tambah Pembicara
      </button>

      <SpeakerFormDialog
        open={dialogOpen}
        speaker={editingIdx !== null ? speakers[editingIdx] : null}
        onClose={() => {
          setDialogOpen(false);
          setEditingIdx(null);
        }}
        onSave={handleSave}
      />
    </SettingsCard>
  );
}
