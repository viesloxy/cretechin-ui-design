"use client";

import { FileEdit, Globe, Clock, Send } from "lucide-react";
import SettingsCard from "@/components/admin/articles/ArticleEditor/SettingsCard";
import type { CourseStatus } from "@/lib/courses/types";

interface PublishStatusCardProps {
  status: CourseStatus;
  onStatusChange: (s: CourseStatus) => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function PublishStatusCard({
  status,
  onStatusChange,
  onSave,
  isSaving,
}: PublishStatusCardProps) {
  const isPublish = status === "published";
  const label = isPublish ? "Simpan & Terbitkan" : "Simpan Kursus";

  return (
    <SettingsCard title="Publikasi" badge="Wajib">
      <div className="space-y-2">
        <RadioItem
          id="cs-draft"
          value="draft"
          checked={status === "draft"}
          onChange={() => onStatusChange("draft")}
          label="Simpan sebagai Draft"
          description="Tidak akan tampil di publik"
          icon={FileEdit}
        />
        <RadioItem
          id="cs-publish"
          value="published"
          checked={status === "published"}
          onChange={() => onStatusChange("published")}
          label="Publikasikan"
          description="Tampil di katalog CreTechin"
          icon={Globe}
        />
        <RadioItem
          id="cs-coming"
          value="coming_soon"
          checked={status === "coming_soon"}
          onChange={() => onStatusChange("coming_soon")}
          label="Coming Soon"
          description="Tampil tapi belum bisa dibeli"
          icon={Clock}
        />
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="w-full mt-4 h-11 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
      >
        {isSaving ? (
          <>
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {label}
          </>
        )}
      </button>
    </SettingsCard>
  );
}

function RadioItem({
  id,
  value,
  checked,
  onChange,
  label,
  description,
  icon: Icon,
}: {
  id: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <label
      htmlFor={id}
      className={`
        flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors
        ${checked ? "border-primary bg-primary/5" : "border-black/10 dark:border-white/10 hover:border-primary/50"}
      `}
    >
      <input type="radio" id={id} name="course-status" value={value} checked={checked} onChange={onChange} className="sr-only" />
      <div
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
          checked ? "border-primary" : "border-neutral-300 dark:border-neutral-600"
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-primary" />}
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-sm font-medium text-neutral-900 dark:text-white">{label}</span>
        <span className="block text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{description}</span>
      </div>
      <Icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
    </label>
  );
}
