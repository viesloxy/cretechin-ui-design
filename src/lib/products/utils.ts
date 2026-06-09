import type { Product, ProductFilter, ProductSortBy } from "./types";

const NOW = new Date("2026-06-09T10:00:00Z").getTime();

export function formatRupiah(value: number): string {
  if (value === 0) return "Rp 0";
  return "Rp " + value.toLocaleString("id-ID");
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("id-ID");
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
  const past = new Date(iso).getTime();
  const diff = NOW - past;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 30) return `${days} hari lalu`;
  return formatDate(iso);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateDiscountedPrice(price: number, percent: number): number {
  return Math.round(price * (1 - percent / 100));
}

export function isOutOfStock(product: Product): boolean {
  return product.productType === "physical" && product.stock === 0;
}

export function getEffectivePrice(product: Product): number {
  if (product.isFree) return 0;
  if (product.discount?.enabled) {
    return calculateDiscountedPrice(product.price, product.discount.percent);
  }
  return product.price;
}

export function isSlugUnique(slug: string, existing: Product[], currentId?: string): boolean {
  return !existing.some((p) => p.slug === slug && p.id !== currentId);
}

// Filter
export function filterProducts(products: Product[], filters: ProductFilter): Product[] {
  const q = filters.search.trim().toLowerCase();
  return products.filter((p) => {
    if (q) {
      const hay = `${p.title} ${p.creator.name} ${p.creator.studioName ?? ""} ${p.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.category !== "all" && p.category !== filters.category) return false;
    if (filters.status !== "all" && p.status !== filters.status) return false;
    if (filters.productType !== "all" && p.productType !== filters.productType) return false;
    return true;
  });
}

// Sort
export function sortProducts(products: Product[], sortBy: ProductSortBy): Product[] {
  const arr = [...products];
  switch (sortBy) {
    case "newest":
      return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "oldest":
      return arr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case "title_asc":
      return arr.sort((a, b) => a.title.localeCompare(b.title, "id"));
    case "title_desc":
      return arr.sort((a, b) => b.title.localeCompare(a.title, "id"));
    case "price_asc":
      return arr.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
    case "price_desc":
      return arr.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
    case "best_selling":
      return arr.sort((a, b) => b.soldCount - a.soldCount);
    default:
      return arr;
  }
}

// Paginate
export interface PaginationResult<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export function paginate<T>(items: T[], page: number, perPage: number): PaginationResult<T> {
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

// Stats
export interface ProductStats {
  total: number;
  published: number;
  draft: number;
  outOfStock: number;
}

export function countProductsByStatus(products: Product[]): ProductStats {
  return products.reduce(
    (acc, p) => {
      acc.total++;
      if (p.status === "published") acc.published++;
      else if (p.status === "draft") acc.draft++;
      else if (p.status === "out_of_stock") acc.outOfStock++;
      return acc;
    },
    { total: 0, published: 0, draft: 0, outOfStock: 0 }
  );
}
