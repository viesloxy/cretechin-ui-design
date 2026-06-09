"use client";

import SettingsCard from "./SettingsCard";
import { formatRelativeTime } from "@/lib/articles/utils";

interface ArticleInfoCardProps {
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export default function ArticleInfoCard({
  authorName,
  createdAt,
  updatedAt,
}: ArticleInfoCardProps) {
  return (
    <SettingsCard title="Informasi" variant="subtle">
      <div className="space-y-2 text-sm">
        <InfoRow label="Penulis" value={authorName} />
        <InfoRow label="Dibuat" value={formatRelativeTime(createdAt)} />
        <InfoRow label="Diperbarui" value={formatRelativeTime(updatedAt)} />
      </div>
    </SettingsCard>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-neutral-500 dark:text-neutral-400 text-xs">{label}</span>
      <span className="font-medium text-neutral-900 dark:text-white text-xs truncate">
        {value}
      </span>
    </div>
  );
}
