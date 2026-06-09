import type { Article, SortBy } from "./types";

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

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function sortArticles(articles: Article[], sortBy: SortBy): Article[] {
  const arr = [...articles];
  switch (sortBy) {
    case "newest":
      return arr.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "oldest":
      return arr.sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case "popular":
      return arr.sort((a, b) => b.views - a.views);
    case "title":
      return arr.sort((a, b) => a.title.localeCompare(b.title, "id"));
    default:
      return arr;
  }
}

export function filterArticles(
  articles: Article[],
  query: string,
  category: string,
  status: string
): Article[] {
  const q = query.toLowerCase().trim();
  return articles.filter((a) => {
    const matchQuery =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q));
    const matchCategory = category === "all" || a.category === category;
    const matchStatus = status === "all" || a.status === status;
    return matchQuery && matchCategory && matchStatus;
  });
}

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}
