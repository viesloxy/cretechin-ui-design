"use client";

import SettingsCard from "@/components/admin/articles/ArticleEditor/SettingsCard";
import { formatNumber, formatRelativeTime } from "@/lib/courses/utils";

interface CourseInfoCardProps {
  studentCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function CourseInfoCard({
  studentCount,
  rating,
  reviewCount,
  createdAt,
  updatedAt,
}: CourseInfoCardProps) {
  return (
    <SettingsCard title="Informasi" variant="subtle">
      <div className="space-y-2 text-sm">
        <Row label="Total Siswa" value={formatNumber(studentCount)} />
        <Row label="Rating" value={rating > 0 ? `⭐ ${rating} (${reviewCount} ulasan)` : "Belum ada"} />
        <Row label="Dibuat" value={formatRelativeTime(createdAt)} />
        <Row label="Diperbarui" value={formatRelativeTime(updatedAt)} />
      </div>
    </SettingsCard>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-neutral-500 dark:text-neutral-400 text-xs">{label}</span>
      <span className="font-medium text-neutral-900 dark:text-white text-xs truncate">{value}</span>
    </div>
  );
}
