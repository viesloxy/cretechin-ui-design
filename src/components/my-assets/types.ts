// Tipe data untuk halaman Aset Digital Saya (My Library)

export type AssetCategory =
  | "ui-kit"
  | "template"
  | "icon"
  | "illustration"
  | "mockup"
  | "font"
  | "source-code";

export type AssetFormat = "figma" | "sketch" | "psd" | "ai" | "zip" | "pdf" | "svg" | "ttf";

export interface OwnedAsset {
  id: string;
  title: string;
  category: AssetCategory;
  format: AssetFormat;
  fileSize: number; // bytes
  fileSizeLabel: string; // "12 MB"
  version: string; // "v1.2.0"
  previewImage: string;
  creator: {
    name: string;
    studio?: string;
    avatarUrl?: string;
  };
  purchaseDate: string; // ISO date
  purchaseDateLabel: string; // "15 Mei 2026"
  orderId: string; // "TRX-2026-00512"
  expiresAt: string | null; // ISO date or null
  isNew: boolean;
  hasUpdate: boolean;
  fileType: "premium" | "free";
  // License info
  license: {
    type: "personal" | "commercial" | "extended";
    seats: number; // jumlah pengguna
  };
  // Download tracking
  downloadCount: number;
  // Untuk sorting
  popularity: number; // 0-100
}

export const ASSET_CATEGORY_LABELS: Record<AssetCategory, string> = {
  "ui-kit": "UI Kit",
  template: "Template",
  icon: "Icon",
  illustration: "Illustration",
  mockup: "Mockup",
  font: "Font",
  "source-code": "Source Code",
};

export const ASSET_CATEGORY_ORDER: AssetCategory[] = [
  "ui-kit",
  "template",
  "icon",
  "illustration",
  "mockup",
  "font",
  "source-code",
];

export type SortOption = "newest" | "oldest" | "title-asc" | "title-desc" | "popular";
export const SORT_LABELS: Record<SortOption, string> = {
  newest: "Terbaru Dibeli",
  oldest: "Pembelian Terlama",
  "title-asc": "Judul A-Z",
  "title-desc": "Judul Z-A",
  popular: "Paling Sering Diunduh",
};

export type ViewMode = "grid" | "list";
