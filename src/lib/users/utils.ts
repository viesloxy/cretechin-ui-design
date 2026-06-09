import type {
  JoinPeriod,
  PaginationResult,
  User,
  UserFilter,
  UserRole,
  UserSortBy,
  UserStats,
  UserStatus,
} from "./types";

const MONTH_ID = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  user: "User / Siswa",
  super_admin: "Super Admin",
};

const STATUS_LABELS: Record<UserStatus, string> = {
  active: "Aktif",
  suspended: "Suspend",
  banned: "Banned",
};

export function getRoleLabel(role: UserRole): string {
  return ROLE_LABELS[role] ?? role;
}

export function getStatusLabel(status: UserStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function getUserInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function formatUserJoinDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTH_ID[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatRelativeTime(iso: string): string {
  const NOW = new Date("2026-06-09T10:00:00Z").getTime();
  const ts = new Date(iso).getTime();
  const diff = NOW - ts;
  const absDiff = Math.abs(diff);
  const future = diff < 0;

  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(absDiff / 3600000);
  const days = Math.floor(absDiff / 86400000);

  if (minutes < 1) return "Baru saja";
  if (minutes < 60)
    return future ? `Dalam ${minutes} menit` : `${minutes} menit yang lalu`;
  if (hours < 24)
    return future ? `Dalam ${hours} jam` : `${hours} jam yang lalu`;
  if (days < 7)
    return future ? `Dalam ${days} hari` : `${days} hari yang lalu`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return future ? `Dalam ${weeks} minggu` : `${weeks} minggu yang lalu`;
  }
  const months = Math.floor(days / 30);
  return future ? `Dalam ${months} bulan` : `${months} bulan yang lalu`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function formatRupiah(value: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function generateTempPassword(): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*";
  let result = "";
  for (let i = 0; i < 12; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function isLastAdmin(users: User[], userId: string): boolean {
  const target = users.find((u) => u.id === userId);
  if (!target || target.role !== "admin") return false;
  const adminCount = users.filter(
    (u) => (u.role === "admin" || u.role === "super_admin") && u.status === "active",
  ).length;
  return adminCount === 1 && target.status === "active";
}

export function isCurrentUser(user: User, currentAdminId: string): boolean {
  return user.id === currentAdminId;
}

// =================== Filter / Sort / Paginate ===================

export function filterUsers(users: User[], filters: UserFilter): User[] {
  const search = filters.search.toLowerCase().trim();
  const now = new Date("2026-06-09T10:00:00Z").getTime();
  const dayMs = 86400000;

  return users.filter((u) => {
    if (search) {
      const haystack = `${u.name} ${u.email}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (filters.role !== "all" && u.role !== filters.role) return false;
    if (filters.status !== "all" && u.status !== filters.status) return false;

    if (filters.joinPeriod !== "all") {
      const joined = new Date(u.joinedAt).getTime();
      const diffDays = (now - joined) / dayMs;
      if (filters.joinPeriod === "7days" && diffDays > 7) return false;
      if (filters.joinPeriod === "30days" && diffDays > 30) return false;
      if (filters.joinPeriod === "3months" && diffDays > 90) return false;
      if (filters.joinPeriod === "this_year") {
        const year = new Date(u.joinedAt).getUTCFullYear();
        if (year !== new Date(now).getUTCFullYear()) return false;
      }
    }
    return true;
  });
}

export function sortUsers(users: User[], sortBy: UserSortBy): User[] {
  const sorted = [...users];
  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
      );
    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime(),
      );
    case "name_asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
}

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number,
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);
  return {
    data: items.slice(startIndex, endIndex),
    totalPages,
    totalItems,
    startIndex: startIndex + 1,
    endIndex,
  };
}

export function countUsersByStatus(users: User[]): UserStats {
  const stats: UserStats = {
    total: users.length,
    admin: users.filter((u) => u.role === "admin" || u.role === "super_admin").length,
    active: 0,
    suspended: 0,
    banned: 0,
  };
  users.forEach((u) => {
    if (u.status === "active") stats.active += 1;
    else if (u.status === "suspended") stats.suspended += 1;
    else if (u.status === "banned") stats.banned += 1;
  });
  return stats;
}

export function hasActiveFilters(filters: UserFilter): boolean {
  return (
    filters.search.trim() !== "" ||
    filters.role !== "all" ||
    filters.status !== "all" ||
    filters.joinPeriod !== "all" ||
    filters.sortBy !== "newest"
  );
}

// =================== CSV Export ===================

export function generateUsersCSV(users: User[]): string {
  const header = [
    "ID",
    "Nama",
    "Email",
    "Role",
    "Status",
    "Tanggal Bergabung",
    "Kursus Diambil",
    "Kursus Selesai",
    "Sertifikat",
    "Total Belanja",
    "Event Diikuti",
  ];
  const rows = users.map((u) =>
    [
      u.id,
      `"${u.name.replace(/"/g, '""')}"`,
      u.email,
      getRoleLabel(u.role),
      getStatusLabel(u.status),
      u.joinedAt.substring(0, 10),
      u.coursesEnrolled,
      u.coursesCompleted,
      u.certificates,
      u.totalSpent,
      u.eventsAttended,
    ].join(","),
  );
  // BOM for Excel Indonesia
  return "\uFEFF" + [header.join(","), ...rows].join("\n");
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
