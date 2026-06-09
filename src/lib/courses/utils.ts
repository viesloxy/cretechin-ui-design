import type { Course, CourseModule, CourseLesson, CourseSortBy } from "./types";

export function formatRupiah(n: number): string {
  if (n === 0) return "Gratis";
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatRelativeTime(iso: string): string {
  const now = new Date("2026-06-09T10:00:00Z").getTime();
  const past = new Date(iso).getTime();
  const diff = now - past;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 30) return `${days} hari lalu`;
  return formatDate(iso);
}

export function formatNumber(n: number): string {
  return n.toLocaleString("id-ID");
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds} detik`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}d` : `${m} menit`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m > 0 ? `${h}j ${m}m` : `${h} jam`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function sortCourses(courses: Course[], sortBy: CourseSortBy): Course[] {
  const arr = [...courses];
  switch (sortBy) {
    case "newest":
      return arr.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "oldest":
      return arr.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case "popular":
      return arr.sort((a, b) => b.studentCount - a.studentCount);
    case "title":
      return arr.sort((a, b) => a.title.localeCompare(b.title, "id"));
    default:
      return arr;
  }
}

export function filterCourses(
  courses: Course[],
  query: string,
  category: string,
  level: string,
  status: string
): Course[] {
  const q = query.toLowerCase().trim();
  return courses.filter((c) => {
    const matchQuery =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q) ||
      c.instructor.name.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q));
    const matchCategory = category === "all" || c.category === category;
    const matchLevel = level === "all" || c.level === level;
    const matchStatus = status === "all" || c.status === status;
    return matchQuery && matchCategory && matchLevel && matchStatus;
  });
}

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function getModuleDuration(module: CourseModule): number {
  return module.lessons.reduce((sum, l) => sum + l.duration, 0);
}

export function getCourseTotalLessons(course: Course): number {
  return course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

export function getCourseTotalDuration(course: Course): number {
  return course.modules.reduce((sum, m) => sum + getModuleDuration(m), 0);
}

export function countLessonTypes(modules: CourseModule[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const m of modules) {
    for (const l of m.lessons) {
      counts[l.type] = (counts[l.type] || 0) + 1;
    }
  }
  return counts;
}
