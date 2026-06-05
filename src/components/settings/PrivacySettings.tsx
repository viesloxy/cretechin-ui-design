"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { VISIBILITY_OPTIONS, DM_OPTIONS } from "./mockData";
import type { PrivacyData } from "./types";

interface PrivacySettingsProps {
  initialValues: PrivacyData;
  onSave: (data: PrivacyData) => Promise<void>;
  isSaving?: boolean;
}

export default function PrivacySettings({
  initialValues,
  onSave,
  isSaving = false,
}: PrivacySettingsProps) {
  const [data, setData] = useState<PrivacyData>(initialValues);
  const [isDirty, setIsDirty] = useState(false);

  const update = <K extends keyof PrivacyData>(key: K, value: PrivacyData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    await onSave(data);
    setIsDirty(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Privasi
        </h2>
        <p className="text-sm text-neutral-500 dark:text-white/40 mt-1">
          Atur siapa yang dapat melihat profil dan aktivitas Anda
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile visibility */}
        <fieldset>
          <legend className="text-sm font-medium text-neutral-700 dark:text-white/80 mb-3">
            Visibilitas Profil
          </legend>
          <div className="space-y-2">
            {VISIBILITY_OPTIONS.map((opt) => {
              const isSelected = data.profileVisibility === opt.value;
              return (
                <label
                  key={opt.value}
                  className={twMerge(
                    "flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-black/10 dark:border-white/10 hover:border-primary/40",
                  )}
                >
                  <input
                    type="radio"
                    name="profileVisibility"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => update("profileVisibility", opt.value)}
                    className="mt-0.5 w-4 h-4 accent-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-neutral-900 dark:text-white">
                      {opt.label}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">
                      {opt.description}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Activity status */}
        <div>
          <ToggleSwitch
            label="Status Aktivitas"
            description="Tampilkan status online ke pengguna lain"
            checked={data.showActivityStatus}
            onChange={(v) => update("showActivityStatus", v)}
          />
        </div>

        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Stats on profile */}
        <div>
          <ToggleSwitch
            label="Statistik di Profil"
            description="Tampilkan jumlah kelas, sertifikat, dan aset di profil publik"
            checked={data.showStatsOnProfile}
            onChange={(v) => update("showStatsOnProfile", v)}
          />
        </div>

        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Direct messages */}
        <fieldset>
          <legend className="text-sm font-medium text-neutral-700 dark:text-white/80 mb-3">
            Pesan Langsung
          </legend>
          <p className="text-xs text-neutral-500 dark:text-white/40 mb-3">
            Siapa yang dapat mengirim pesan langsung kepada Anda
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DM_OPTIONS.map((opt) => {
              const isSelected = data.allowDirectMessages === opt.value;
              return (
                <label
                  key={opt.value}
                  className={twMerge(
                    "flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-black/10 dark:border-white/10 hover:border-primary/40",
                  )}
                >
                  <input
                    type="radio"
                    name="allowDirectMessages"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => update("allowDirectMessages", opt.value)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm font-medium text-neutral-700 dark:text-white/80">
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Searchable by email */}
        <div>
          <ToggleSwitch
            label="Ditemukan via Email"
            description="Izinkan orang lain menemukan Anda menggunakan alamat email"
            checked={data.searchableByEmail}
            onChange={(v) => update("searchableByEmail", v)}
          />
        </div>
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
