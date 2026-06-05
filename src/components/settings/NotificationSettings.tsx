"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import type { NotificationData } from "./types";

interface NotificationSettingsProps {
  initialValues: NotificationData;
  onSave: (data: NotificationData) => Promise<void>;
  isSaving?: boolean;
}

export default function NotificationSettings({
  initialValues,
  onSave,
  isSaving = false,
}: NotificationSettingsProps) {
  const [data, setData] = useState<NotificationData>(initialValues);
  const [isDirty, setIsDirty] = useState(false);

  const update = <K extends keyof NotificationData>(
    key: K,
    value: NotificationData[K],
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    await onSave(data);
    setIsDirty(false);
  };

  const masterDisabled = !data.emailNotifications && !data.pushNotifications;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Notifikasi
        </h2>
        <p className="text-sm text-neutral-500 dark:text-white/40 mt-1">
          Pilih notifikasi yang ingin Anda terima
        </p>
      </div>

      <div className="space-y-8">
        {/* Channel masters */}
        <fieldset>
          <legend className="text-sm font-medium text-neutral-700 dark:text-white/80 mb-3">
            Saluran Notifikasi
          </legend>
          <div className="space-y-4">
            <ToggleSwitch
              label="Email"
              description="Terima notifikasi melalui email"
              checked={data.emailNotifications}
              onChange={(v) => update("emailNotifications", v)}
            />
            <ToggleSwitch
              label="Push"
              description="Terima notifikasi push di perangkat Anda"
              checked={data.pushNotifications}
              onChange={(v) => update("pushNotifications", v)}
            />
          </div>
        </fieldset>

        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Content categories */}
        <fieldset>
          <legend className="text-sm font-medium text-neutral-700 dark:text-white/80 mb-3">
            Kategori Konten
          </legend>
          <div className="space-y-4">
            <ToggleSwitch
              label="Update Kelas"
              description="Notifikasi dari kelas yang Anda ikuti (materi baru, pengumuman)"
              checked={data.courseUpdates}
              onChange={(v) => update("courseUpdates", v)}
              disabled={masterDisabled}
            />
            <ToggleSwitch
              label="Pesan Baru"
              description="Notifikasi saat ada pesan langsung baru"
              checked={data.newMessages}
              onChange={(v) => update("newMessages", v)}
              disabled={masterDisabled}
            />
            <ToggleSwitch
              label="Pengingat Acara"
              description="Notifikasi H-1 dan H-0 untuk acara yang Anda ikuti"
              checked={data.eventReminders}
              onChange={(v) => update("eventReminders", v)}
              disabled={masterDisabled}
            />
            <ToggleSwitch
              label="Email Promo"
              description="Penawaran spesial, diskon, dan promo dari CreTechin"
              checked={data.promotionalEmails}
              onChange={(v) => update("promotionalEmails", v)}
              disabled={!data.emailNotifications}
            />
            <ToggleSwitch
              label="Ringkasan Mingguan"
              description="Dapatkan ringkasan aktivitas Anda setiap minggu"
              checked={data.weeklyDigest}
              onChange={(v) => update("weeklyDigest", v)}
              disabled={!data.emailNotifications}
            />
          </div>
        </fieldset>
      </div>

      {isDirty && (
        <p className="text-xs text-neutral-500 dark:text-white/40 italic mt-6 text-right">
          Perubahan belum disimpan
        </p>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 mt-6 sm:mt-8 border-t border-black/5 dark:border-white/5">
        <button
          type="button"
          onClick={() => {
            setData(initialValues);
            setIsDirty(false);
          }}
          disabled={isSaving || !isDirty}
          className="py-3 px-6 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary text-sm font-semibold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving && (
            <span className="inline-block w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
          )}
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </motion.div>
  );
}
