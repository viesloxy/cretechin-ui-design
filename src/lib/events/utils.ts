import type {
  Event,
  EventFilter,
  EventSortBy,
  EventStatus,
  EventStats,
  EventType,
  LocationType,
  PaginationResult,
} from "./types";

const NOW = new Date("2026-06-09T10:00:00Z");

const TYPE_LABELS: Record<EventType, string> = {
  webinar: "Webinar",
  workshop: "Workshop",
  talkshow: "Talkshow",
  conference: "Conference",
  meetup: "Meetup",
  networking: "Networking",
};

const STATUS_LABELS: Record<EventStatus, string> = {
  draft: "Draft",
  upcoming: "Akan Datang",
  ongoing: "Sedang Berlangsung",
  finished: "Selesai",
  archived: "Diarsipkan",
};

const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  online: "Online",
  offline: "Offline",
};

export const EVENT_TYPE_LABELS = TYPE_LABELS;
export const EVENT_STATUS_LABELS = STATUS_LABELS;
export const LOCATION_TYPE_LABELS_MAP = LOCATION_TYPE_LABELS;

export function getEventTypeLabel(t: EventType): string {
  return TYPE_LABELS[t] ?? t;
}

export function getEventStatusLabel(s: EventStatus): string {
  return STATUS_LABELS[s] ?? s;
}

export function getLocationTypeLabel(l: LocationType): string {
  return LOCATION_TYPE_LABELS[l] ?? l;
}

// =================== Status Calculation ===================

export function calculateEventStatus(event: Event): EventStatus {
  if (event.status === "draft" || event.status === "archived") {
    return event.status;
  }
  const now = NOW.getTime();
  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "ongoing";
  return "finished";
}

export function calculateDurationMinutes(startIso: string, endIso: string): number {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  return Math.max(0, Math.round((end - start) / 60000));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} menit`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} jam`;
  return `${hours} jam ${mins} menit`;
}

// =================== Date/Time Formatting ===================

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

export function formatEventDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTH_ID[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatEventTime(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

export function formatEventDateTime(iso: string, timezone = "WIB"): string {
  return `${formatEventDate(iso)}, ${formatEventTime(iso)} ${timezone}`;
}

export function formatEventTimeRange(
  startIso: string,
  endIso: string,
  timezone = "WIB",
): string {
  return `${formatEventTime(startIso)} – ${formatEventTime(endIso)} ${timezone}`;
}

export function formatRelativeTime(iso: string): string {
  const ts = new Date(iso).getTime();
  const diff = NOW.getTime() - ts;
  const absDiff = Math.abs(diff);
  const future = diff < 0;

  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(absDiff / 3600000);
  const days = Math.floor(absDiff / 86400000);

  if (minutes < 1) return future ? "Baru saja" : "Baru saja";
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
  if (value === 0) return "Gratis";
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// =================== Quota ===================

export function isQuotaFull(event: Event): boolean {
  return event.registeredCount >= event.capacity;
}

export function isQuotaAlmostFull(event: Event): boolean {
  const ratio = event.registeredCount / event.capacity;
  return ratio >= 0.5 && ratio < 1;
}

export function getQuotaColor(event: Event): "green" | "yellow" | "red" {
  if (isQuotaFull(event)) return "red";
  if (isQuotaAlmostFull(event)) return "yellow";
  return "green";
}

export function getQuotaRatio(event: Event): number {
  return Math.min(1, event.registeredCount / event.capacity);
}

// =================== Slug ===================

export function isSlugUnique(
  slug: string,
  existingEvents: Event[],
  currentId?: string,
): boolean {
  return !existingEvents.some(
    (e) => e.slug === slug && e.id !== currentId,
  );
}

// =================== Filter / Sort / Paginate ===================

export function filterEvents(
  events: Event[],
  filters: EventFilter,
): Event[] {
  const search = filters.search.toLowerCase().trim();
  return events.filter((e) => {
    if (search) {
      const haystack = [
        e.title,
        e.shortDescription,
        e.description,
        ...e.topics,
        ...e.speakers.map((s) => s.name),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (filters.type !== "all" && e.type !== filters.type) return false;
    if (filters.status !== "all" && calculateEventStatus(e) !== filters.status)
      return false;
    if (filters.locationType !== "all" && e.location.type !== filters.locationType)
      return false;
    return true;
  });
}

export function sortEvents(events: Event[], sortBy: EventSortBy): Event[] {
  const sorted = [...events];
  switch (sortBy) {
    case "nearest":
      return sorted.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
    case "farthest":
      return sorted.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "title_asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "capacity_low":
      return sorted.sort(
        (a, b) => a.registeredCount / a.capacity - b.registeredCount / b.capacity,
      );
    case "capacity_high":
      return sorted.sort(
        (a, b) => b.registeredCount / b.capacity - a.registeredCount / a.capacity,
      );
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

export function countEventsByStatus(events: Event[]): EventStats {
  const stats: EventStats = {
    total: events.length,
    upcoming: 0,
    ongoing: 0,
    finished: 0,
    draft: 0,
  };
  events.forEach((e) => {
    const s = calculateEventStatus(e);
    if (s === "upcoming") stats.upcoming += 1;
    else if (s === "ongoing") stats.ongoing += 1;
    else if (s === "finished") stats.finished += 1;
    else if (s === "draft") stats.draft += 1;
  });
  return stats;
}

export function hasActiveFilters(filters: EventFilter): boolean {
  return (
    filters.search.trim() !== "" ||
    filters.type !== "all" ||
    filters.status !== "all" ||
    filters.locationType !== "all" ||
    filters.sortBy !== "nearest"
  );
}
