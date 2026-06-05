// Profile-related helper functions

import type { UserProfile, UserRole } from "./types";

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/** "Bergabung sejak Mei 2026" */
export function formatJoinDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Bergabung sejak -";
  return `Bergabung sejak ${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`;
}

const ROLE_BADGE: Record<UserRole, string> = {
  student: "Mahasiswa Aktif",
  mentor: "Mentor",
  admin: "Administrator",
};

export function getRoleBadge(role: UserRole): string {
  return ROLE_BADGE[role] ?? "Member";
}

/** Normalize a social handle into a full URL. Accepts either a full URL or a handle. */
export function normalizeSocialUrl(
  platform: "github" | "linkedin" | "instagram" | "twitter" | "website",
  value: string,
): string {
  if (/^https?:\/\//i.test(value)) return value;
  switch (platform) {
    case "github":
      return `https://github.com/${value.replace(/^@/, "")}`;
    case "linkedin":
      return /^in\//.test(value)
        ? `https://linkedin.com/${value}`
        : `https://linkedin.com/in/${value.replace(/^@/, "")}`;
    case "instagram":
      return `https://instagram.com/${value.replace(/^@/, "")}`;
    case "twitter":
      return `https://twitter.com/${value.replace(/^@/, "")}`;
    case "website":
      return value.startsWith("http") ? value : `https://${value}`;
  }
}

/** Build fallback avatar URL using ui-avatars.com (returns initial-based avatar). */
export function getFallbackAvatarUrl(name: string): string {
  const params = new URLSearchParams({
    name,
    background: "A4D624",
    color: "000",
    bold: "true",
    size: "256",
  });
  return `https://ui-avatars.com/api/?${params.toString()}`;
}
