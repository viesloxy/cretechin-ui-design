// Product type system for Kelola Produk (#28)

export type ProductType = "physical" | "digital";
export type ProductStatus = "published" | "draft" | "out_of_stock";
export type ProductCategory =
  | "ui_kits"
  | "templates"
  | "mockups"
  | "icon_sets"
  | "fonts"
  | "source_code"
  | "other";

export type ProductSortBy =
  | "newest"
  | "oldest"
  | "title_asc"
  | "title_desc"
  | "price_asc"
  | "price_desc"
  | "best_selling";

export interface ProductImage {
  id: string;
  url: string;
  width: number;
  height: number;
  alt?: string;
  isPrimary: boolean;
}

export interface ProductDiscount {
  enabled: boolean;
  originalPrice: number;
  percent: number;
  validUntil?: string;
}

export interface ProductCreator {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  studioName?: string;
}

export interface ProductSourceFile {
  name: string;
  size: number; // bytes
  url: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  productType: ProductType;
  category: ProductCategory;
  status: ProductStatus;

  creator: ProductCreator;

  // Pricing
  price: number;
  isFree: boolean;
  discount: ProductDiscount | null;

  // Inventory (physical)
  stock: number;
  sku: string;
  weight: number; // grams, 0 for digital
  dimensions?: string;

  // Media
  thumbnail: ProductImage;
  gallery: ProductImage[];
  sourceFile?: ProductSourceFile;
  demoUrl?: string;

  // Metadata
  tags: string[];
  specifications: string[];
  whatsIncluded: string[];

  // Settings
  featured: boolean;
  enableReview: boolean;
  downloadLimit?: number;

  // SEO
  metaTitle: string;
  metaDescription: string;

  // Stats
  viewCount: number;
  soldCount: number;
  rating: number;
  reviewCount: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface ProductFilter {
  search: string;
  category: ProductCategory | "all";
  status: ProductStatus | "all";
  productType: ProductType | "all";
  sortBy: ProductSortBy;
  page: number;
  perPage: number;
}

// Label maps (Indonesian)
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  ui_kits: "UI Kits",
  templates: "Templates",
  mockups: "Mockups",
  icon_sets: "Icon Sets",
  fonts: "Fonts",
  source_code: "Source Code",
  other: "Lainnya",
};

export const STATUS_LABELS: Record<ProductStatus, string> = {
  published: "Published",
  draft: "Draft",
  out_of_stock: "Habis",
};

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  physical: "Fisik",
  digital: "Digital",
};

export const SORT_LABELS: Record<ProductSortBy, string> = {
  newest: "Terbaru",
  oldest: "Terlama",
  title_asc: "Judul A-Z",
  title_desc: "Judul Z-A",
  price_asc: "Harga Terendah",
  price_desc: "Harga Tertinggi",
  best_selling: "Terlaris",
};

export const CATEGORY_FILTER_OPTIONS: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "Semua Kategori" },
  { value: "ui_kits", label: CATEGORY_LABELS.ui_kits },
  { value: "templates", label: CATEGORY_LABELS.templates },
  { value: "mockups", label: CATEGORY_LABELS.mockups },
  { value: "icon_sets", label: CATEGORY_LABELS.icon_sets },
  { value: "fonts", label: CATEGORY_LABELS.fonts },
  { value: "source_code", label: CATEGORY_LABELS.source_code },
  { value: "other", label: CATEGORY_LABELS.other },
];

export const STATUS_FILTER_OPTIONS: { value: ProductStatus | "all"; label: string }[] = [
  { value: "all", label: "Semua Status" },
  { value: "published", label: STATUS_LABELS.published },
  { value: "draft", label: STATUS_LABELS.draft },
  { value: "out_of_stock", label: STATUS_LABELS.out_of_stock },
];

export const SORT_OPTIONS: { value: ProductSortBy; label: string }[] = [
  { value: "newest", label: SORT_LABELS.newest },
  { value: "oldest", label: SORT_LABELS.oldest },
  { value: "title_asc", label: SORT_LABELS.title_asc },
  { value: "title_desc", label: SORT_LABELS.title_desc },
  { value: "price_asc", label: SORT_LABELS.price_asc },
  { value: "price_desc", label: SORT_LABELS.price_desc },
  { value: "best_selling", label: SORT_LABELS.best_selling },
];
