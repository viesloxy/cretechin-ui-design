"use client";

import SettingsCard from "./SettingsCard";
import { CATEGORY_OPTIONS, type ArticleCategory } from "@/lib/articles/types";
import { Plus } from "lucide-react";

interface CategorySelectProps {
  value: ArticleCategory;
  onChange: (c: ArticleCategory) => void;
}

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <SettingsCard title="Kategori" badge="Wajib">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ArticleCategory)}
        className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
        aria-label="Pilih kategori"
      >
        <option value="" disabled>
          Pilih kategori...
        </option>
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Tidak menemukan kategori?{" "}
        <button
          type="button"
          className="text-primary hover:underline inline-flex items-center gap-0.5"
        >
          <Plus className="w-3 h-3" /> Tambah baru
        </button>
      </p>
    </SettingsCard>
  );
}
