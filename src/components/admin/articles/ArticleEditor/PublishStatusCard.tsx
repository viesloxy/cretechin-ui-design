"use client";

import { FileEdit, Globe, Send, Calendar } from "lucide-react";
import SettingsCard from "./SettingsCard";
import type { ArticleStatus } from "@/lib/articles/types";

interface PublishStatusCardProps {
  status: ArticleStatus;
  scheduledAt: string;
  onStatusChange: (s: ArticleStatus) => void;
  onScheduledAtChange: (v: string) => void;
  onSave: () => void;
  isSaving: boolean;
  primaryLabel?: string;
}

export default function PublishStatusCard({
  status,
  scheduledAt,
  onStatusChange,
  onScheduledAtChange,
  onSave,
  isSaving,
  primaryLabel,
}: PublishStatusCardProps) {
  const isPublish = status === "published" || status === "scheduled";
  const label = primaryLabel ?? (isPublish ? "Simpan & Terbitkan" : "Simpan Draft");

  return (
    <SettingsCard title="Publikasi" badge="Wajib">
      <div className="space-y-2">
        <RadioItem
          id="status-draft"
          name="publish-status"
          value="draft"
          checked={status === "draft"}
          onChange={() => onStatusChange("draft")}
          label="Simpan sebagai Draft"
          description="Tidak akan tampil di publik"
          icon={FileEdit}
        />
        <RadioItem
          id="status-publish"
          name="publish-status"
          value="published"
          checked={status === "published"}
          onChange={() => onStatusChange("published")}
          label="Publikasikan"
          description="Tampil di blog CreTechin"
          icon={Globe}
        />
        <RadioItem
          id="status-scheduled"
          name="publish-status"
          value="scheduled"
          checked={status === "scheduled"}
          onChange={() => onStatusChange("scheduled")}
          label="Jadwalkan"
          description="Otomatis publish di waktu tertentu"
          icon={Calendar}
        />
      </div>

      {status === "scheduled" && (
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <label
            htmlFor="schedule-time"
            className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Waktu Publish
          </label>
          <input
            id="schedule-time"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => onScheduledAtChange(e.target.value)}
            className="mt-1.5 w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      )}

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
  name,
  value,
  checked,
  onChange,
  label,
  description,
  icon: Icon,
}: {
  id: string;
  name: string;
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
        ${
          checked
            ? "border-primary bg-primary/5"
            : "border-black/10 dark:border-white/10 hover:border-primary/50"
        }
      `}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`
          w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5
          flex items-center justify-center
          ${checked ? "border-primary" : "border-neutral-300 dark:border-neutral-600"}
        `}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-primary" />}
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-sm font-medium text-neutral-900 dark:text-white">
          {label}
        </span>
        <span className="block text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          {description}
        </span>
      </div>
      <Icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
    </label>
  );
}
