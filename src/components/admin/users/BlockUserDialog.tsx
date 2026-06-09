"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import type { User, UserStatus } from "@/lib/users/types";
import { UserAvatar } from "./shared/UserAvatar";

interface BlockUserDialogProps {
  open: boolean;
  user: User | null;
  onConfirm: (blockType: UserStatus, reason: string) => void;
  onCancel: () => void;
}

export function BlockUserDialog({
  open,
  user,
  onConfirm,
  onCancel,
}: BlockUserDialogProps) {
  const [blockType, setBlockType] = useState<UserStatus>("suspended");
  const [reason, setReason] = useState("");

  const reasonValid = reason.trim().length >= 10;
  const canSubmit = (blockType === "suspended" || blockType === "banned") && reasonValid;

  if (!user) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/5 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-neutral-900"
            role="alertdialog"
            aria-modal="true"
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20">
                <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Blokir Pengguna?
                </h3>
                <button
                  type="button"
                  onClick={onCancel}
                  className="absolute right-4 top-4 rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  aria-label="Tutup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-3 rounded-xl border border-black/5 bg-neutral-50 p-3 dark:border-white/10 dark:bg-neutral-900/50">
              <UserAvatar user={user} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                  {user.name}
                </p>
                <p className="truncate text-xs text-neutral-500">{user.email}</p>
              </div>
            </div>

            <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">
              Pengguna ini tidak akan bisa login ke CreTechin. Data mereka tetap
              aman dan dapat diaktifkan kembali.
            </p>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Tipe Blokir
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBlockType("suspended")}
                  className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition ${
                    blockType === "suspended"
                      ? "border-amber-300 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/20"
                      : "border-black/5 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  }`}
                >
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Suspend
                  </span>
                  <span className="text-[10px] text-neutral-500">Sementara</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBlockType("banned")}
                  className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition ${
                    blockType === "banned"
                      ? "border-red-300 bg-red-50 dark:border-red-900/40 dark:bg-red-900/20"
                      : "border-black/5 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  }`}
                >
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Banned
                  </span>
                  <span className="text-[10px] text-neutral-500">Permanen</span>
                </button>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Alasan Pemblokiran <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Jelaskan alasan pemblokiran (min 10 karakter)..."
                className="w-full rounded-xl border border-black/5 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              />
              {reason.length > 0 && !reasonValid && (
                <p className="mt-1 text-xs text-red-600">
                  Alasan minimal 10 karakter.
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-black/5 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => canSubmit && onConfirm(blockType, reason)}
                disabled={!canSubmit}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Ya, Blokir
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
