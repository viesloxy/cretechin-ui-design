"use client";

import SettingsCard from "./SettingsCard";
import Textarea from "@/components/ui/Textarea";

interface ExcerptCardProps {
  value: string;
  onChange: (v: string) => void;
}

export default function ExcerptCard({ value, onChange }: ExcerptCardProps) {
  const overLimit = value.length > 160;
  return (
    <SettingsCard title="Excerpt / Ringkasan">
      <Textarea
        placeholder="Ringkasan singkat artikel (untuk preview di daftar)..."
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={500}
        className="!min-h-[80px]"
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Maks. 160 karakter untuk SEO.
        </p>
        <span
          className={`text-xs ${
            overLimit
              ? "text-red-500"
              : "text-neutral-500 dark:text-neutral-400"
          }`}
        >
          {value.length}/160
        </span>
      </div>
    </SettingsCard>
  );
}
