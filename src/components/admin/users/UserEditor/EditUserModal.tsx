"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ShieldAlert, CheckCircle2, Clock, Ban } from "lucide-react";
import type { User, UserRole, UserStatus } from "@/lib/users/types";
import { getRoleLabel, getStatusLabel } from "@/lib/users/utils";
import { UserAvatar } from "../shared/UserAvatar";
import { RoleBadge } from "../shared/RoleBadge";
import { UserStatusBadge } from "../shared/UserStatusBadge";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  currentAdminId: string;
  isLastAdmin: boolean;
  onClose: () => void;
  onSave: (data: { role: UserRole; status: UserStatus; notify: boolean }) => Promise<void>;
}

const STATUS_OPTIONS: Array<{
  value: UserStatus;
  label: string;
  Icon: typeof CheckCircle2;
  helper: string;
}> = [
  {
    value: "active",
    label: "Aktif",
    Icon: CheckCircle2,
    helper: "User dapat login dan mengakses semua fitur CreTechin.",
  },
  {
    value: "suspended",
    label: "Suspend",
    Icon: Clock,
    helper:
      "User tidak dapat login. Cocok untuk investigasi atau tunggakan pembayaran.",
  },
  {
    value: "banned",
    label: "Banned",
    Icon: Ban,
    helper:
      "User tidak dapat login permanen. Gunakan hanya untuk pelanggaran berat.",
  },
];

const ROLE_OPTIONS: Array<{ value: UserRole; label: string; description: string }> = [
  {
    value: "user",
    label: "User / Siswa",
    description: "Akses standar ke beranda, kursus, dan fitur publik.",
  },
  {
    value: "admin",
    label: "Admin",
    description: "Akses penuh ke panel admin untuk mengelola konten.",
  },
];

export function EditUserModal({
  open,
  user,
  currentAdminId,
  isLastAdmin,
  onClose,
  onSave,
}: EditUserModalProps) {
  const [role, setRole] = useState<UserRole>("user");
  const [status, setStatus] = useState<UserStatus>("active");
  const [notify, setNotify] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setStatus(user.status);
    }
  }, [user, open]);

  if (!user) return null;

  const isSelf = user.id === currentAdminId;
  const demoteDisabled =
    isLastAdmin && user.role === "admin" && role !== "admin";
  const suspendDisabled = isLastAdmin && status !== "active" && user.status === "active";
  const dirty = role !== user.role || status !== user.status;
  const canSave = !isSelf && !saving && dirty && !demoteDisabled;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true);
    try {
      await onSave({ role, status, notify });
    } finally {
      setSaving(false);
    }
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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-lg max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-black/5 bg-white shadow-xl dark:border-white/10 dark:bg-neutral-900"
            role="dialog"
            aria-modal="true"
            aria-label="Edit Pengguna"
          >
            {/* Header */}
            <div className="flex items-start gap-3 border-b border-black/5 p-5 dark:border-white/10">
              <UserAvatar user={user} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-lg font-semibold text-neutral-900 dark:text-white">
                    {user.name}
                  </h3>
                  {isSelf && (
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary">
                      Anda
                    </span>
                  )}
                </div>
                <p className="truncate text-sm text-neutral-500">{user.email}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <RoleBadge role={user.role} size="sm" />
                  <UserStatusBadge status={user.status} size="sm" />
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              {isSelf && (
                <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Anda tidak dapat mengubah role/status Anda sendiri. Hubungi
                    admin lain untuk perubahan.
                  </p>
                </div>
              )}

              {/* Read-only info */}
              <div className="mb-5 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Informasi Akun (Read-Only)
                </h4>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="h-10 w-full cursor-not-allowed rounded-xl border border-black/5 bg-neutral-50 px-3 text-sm text-neutral-500 dark:border-white/10 dark:bg-neutral-900/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="h-10 w-full cursor-not-allowed rounded-xl border border-black/5 bg-neutral-50 px-3 text-sm text-neutral-500 dark:border-white/10 dark:bg-neutral-900/50"
                  />
                </div>
                <p className="text-[11px] text-neutral-500">
                  Nama & email tidak dapat diubah. User dapat mengubahnya sendiri
                  via /settings dengan verifikasi.
                </p>
              </div>

              <div className="mb-5 h-px bg-black/5 dark:bg-white/10" />

              {/* Role */}
              <div className="mb-5 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Pengaturan Role
                </h4>
                <div className="space-y-2">
                  {ROLE_OPTIONS.map((opt) => {
                    const active = role === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        disabled={isSelf}
                        onClick={() => setRole(opt.value)}
                        className={`flex w-full items-start gap-2.5 rounded-lg border p-3 text-left transition ${
                          active
                            ? "border-primary bg-primary/5"
                            : "border-black/5 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                        } disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                            {opt.label}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            {opt.description}
                          </p>
                        </div>
                        <div
                          className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 transition ${
                            active
                              ? "border-primary bg-primary"
                              : "border-neutral-300 dark:border-neutral-600"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                {role === "admin" && user.role !== "admin" && !isSelf && (
                  <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300">
                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <p>
                      User akan mendapat akses penuh ke panel admin. Pastikan Anda
                      benar-benar menaikkan hak akses ini.
                    </p>
                  </div>
                )}
                {demoteDisabled && (
                  <p className="text-xs text-red-600">
                    Tidak bisa demote admin terakhir. Tambah admin baru terlebih
                    dahulu.
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="mb-5 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Status Akun
                </h4>
                <select
                  value={status}
                  disabled={isSelf || (isLastAdmin && status !== "active")}
                  onChange={(e) => setStatus(e.target.value as UserStatus)}
                  className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-black/5 bg-white px-3 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500">
                  {STATUS_OPTIONS.find((o) => o.value === status)?.helper}
                </p>
                {suspendDisabled && (
                  <p className="text-xs text-red-600">
                    Tidak bisa suspend admin terakhir.
                  </p>
                )}
              </div>

              <div className="mb-5 h-px bg-black/5 dark:bg-white/10" />

              {/* Notification */}
              <div className="mb-5">
                <ToggleSwitch
                  checked={notify}
                  onChange={setNotify}
                  label="Kirim email notifikasi ke user"
                  description="User akan menerima email tentang perubahan role/status"
                />
              </div>

              {/* Footer */}
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
                  disabled={!canSave}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
