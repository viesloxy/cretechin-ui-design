"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";
import PageHeader from "@/components/my-assets/PageHeader";
import LibraryStatsBar, {
  type CategoryFilter,
} from "@/components/my-assets/LibraryStatsBar";
import LibraryFilterBar from "@/components/my-assets/LibraryFilterBar";
import AssetLibraryCard from "@/components/my-assets/AssetLibraryCard";
import AssetLibraryRow from "@/components/my-assets/AssetLibraryRow";
import AssetCardSkeleton from "@/components/my-assets/AssetCardSkeleton";
import LibraryEmptyState from "@/components/my-assets/LibraryEmptyState";
import {
  type OwnedAsset,
  type AssetCategory,
  type ViewMode,
  ASSET_CATEGORY_ORDER,
  ASSET_CATEGORY_LABELS,
} from "@/components/my-assets/types";

// ===== MOCK DATA =====
const MOCK_OWNED_ASSETS: OwnedAsset[] = [
  {
    id: "asset-001",
    title: "Modern Dashboard UI Kit for SaaS",
    category: "ui-kit",
    format: "figma",
    fileSize: 12_500_000,
    fileSizeLabel: "12 MB",
    version: "v2.1.0",
    previewImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    creator: { name: "Raka Pratama", studio: "Pixel Studio" },
    purchaseDate: "2026-05-20T10:00:00Z",
    purchaseDateLabel: "20 Mei 2026",
    orderId: "TRX-2026-00512",
    expiresAt: "2027-05-20T10:00:00Z",
    isNew: false,
    hasUpdate: true,
    fileType: "premium",
    license: { type: "commercial", seats: 5 },
    downloadCount: 3,
    popularity: 95,
  },
  {
    id: "asset-002",
    title: "Mobile App Onboarding Screens",
    category: "template",
    format: "figma",
    fileSize: 8_200_000,
    fileSizeLabel: "8.2 MB",
    version: "v1.0.0",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    creator: { name: "Siti Aminah", studio: "DesignBox" },
    purchaseDate: "2026-05-15T14:00:00Z",
    purchaseDateLabel: "15 Mei 2026",
    orderId: "TRX-2026-00489",
    expiresAt: null,
    isNew: true,
    hasUpdate: false,
    fileType: "premium",
    license: { type: "personal", seats: 1 },
    downloadCount: 1,
    popularity: 80,
  },
  {
    id: "asset-003",
    title: "iPhone 15 Pro Clay Mockup",
    category: "mockup",
    format: "psd",
    fileSize: 24_000_000,
    fileSizeLabel: "24 MB",
    version: "v1.2.0",
    previewImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    creator: { name: "Andi Wijaya" },
    purchaseDate: "2026-05-10T09:00:00Z",
    purchaseDateLabel: "10 Mei 2026",
    orderId: "TRX-2026-00445",
    expiresAt: null,
    isNew: false,
    hasUpdate: false,
    fileType: "premium",
    license: { type: "commercial", seats: 3 },
    downloadCount: 5,
    popularity: 88,
  },
  {
    id: "asset-004",
    title: "500+ Minimal Line Icons Pack",
    category: "icon",
    format: "svg",
    fileSize: 2_100_000,
    fileSizeLabel: "2.1 MB",
    version: "v3.0.0",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    creator: { name: "Rina Marlina", studio: "IconLab" },
    purchaseDate: "2026-05-05T16:00:00Z",
    purchaseDateLabel: "5 Mei 2026",
    orderId: "TRX-2026-00420",
    expiresAt: null,
    isNew: false,
    hasUpdate: true,
    fileType: "premium",
    license: { type: "commercial", seats: 10 },
    downloadCount: 2,
    popularity: 92,
  },
  {
    id: "asset-005",
    title: "Gen-Z Illustration Character Set",
    category: "illustration",
    format: "ai",
    fileSize: 18_500_000,
    fileSizeLabel: "18 MB",
    version: "v1.5.0",
    previewImage: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80",
    creator: { name: "Dimas Saputra" },
    purchaseDate: "2026-04-28T11:00:00Z",
    purchaseDateLabel: "28 Apr 2026",
    orderId: "TRX-2026-00398",
    expiresAt: null,
    isNew: false,
    hasUpdate: false,
    fileType: "premium",
    license: { type: "personal", seats: 1 },
    downloadCount: 0,
    popularity: 75,
  },
  {
    id: "asset-006",
    title: "Inter Display Variable Font",
    category: "font",
    format: "ttf",
    fileSize: 850_000,
    fileSizeLabel: "850 KB",
    version: "v1.0.0",
    previewImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    creator: { name: "Rasmus Andersson" },
    purchaseDate: "2026-04-20T13:00:00Z",
    purchaseDateLabel: "20 Apr 2026",
    orderId: "TRX-2026-00365",
    expiresAt: null,
    isNew: false,
    hasUpdate: false,
    fileType: "free",
    license: { type: "personal", seats: 1 },
    downloadCount: 1,
    popularity: 60,
  },
  {
    id: "asset-007",
    title: "React Landing Page Starter Kit",
    category: "source-code",
    format: "zip",
    fileSize: 4_500_000,
    fileSizeLabel: "4.5 MB",
    version: "v2.0.0",
    previewImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    creator: { name: "Fajar Nugroho", studio: "DevKit" },
    purchaseDate: "2026-04-15T15:00:00Z",
    purchaseDateLabel: "15 Apr 2026",
    orderId: "TRX-2026-00340",
    expiresAt: null,
    isNew: false,
    hasUpdate: true,
    fileType: "premium",
    license: { type: "commercial", seats: 3 },
    downloadCount: 4,
    popularity: 85,
  },
  {
    id: "asset-008",
    title: "E-commerce Mobile UI Kit",
    category: "ui-kit",
    format: "figma",
    fileSize: 15_000_000,
    fileSizeLabel: "15 MB",
    version: "v1.3.0",
    previewImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    creator: { name: "Maya Sari", studio: "Pixel Studio" },
    purchaseDate: "2026-04-10T10:00:00Z",
    purchaseDateLabel: "10 Apr 2026",
    orderId: "TRX-2026-00310",
    expiresAt: null,
    isNew: false,
    hasUpdate: false,
    fileType: "premium",
    license: { type: "commercial", seats: 5 },
    downloadCount: 6,
    popularity: 90,
  },
  {
    id: "asset-009",
    title: "Notion Productivity Template Bundle",
    category: "template",
    format: "pdf",
    fileSize: 3_200_000,
    fileSizeLabel: "3.2 MB",
    version: "v1.0.0",
    previewImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    creator: { name: "Bayu Setiawan" },
    purchaseDate: "2026-04-01T12:00:00Z",
    purchaseDateLabel: "1 Apr 2026",
    orderId: "TRX-2026-00280",
    expiresAt: null,
    isNew: false,
    hasUpdate: false,
    fileType: "free",
    license: { type: "personal", seats: 1 },
    downloadCount: 2,
    popularity: 70,
  },
];

// ===== INNER CONTENT =====
function MyAssetsContent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [assets] = useState<OwnedAsset[]>(MOCK_OWNED_ASSETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<AssetCategory | "all">("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Hitung statistik
  const stats = useMemo(() => {
    const totalSize = assets.reduce((sum, a) => sum + a.fileSize, 0);
    const newCount = assets.filter((a) => a.isNew).length;
    const updateCount = assets.filter((a) => a.hasUpdate).length;
    return {
      total: assets.length,
      totalSize,
      totalSizeLabel: formatFileSize(totalSize),
      newCount,
      updateCount,
      maxStorage: 100 * 1024 * 1024 * 1024, // 100 GB
    };
  }, [assets]);

  // Hitung jumlah per kategori
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: assets.length };
    ASSET_CATEGORY_ORDER.forEach((cat) => {
      counts[cat] = assets.filter((a) => a.category === cat).length;
    });
    return counts;
  }, [assets]);

  // Filter & Sort
  const filteredAssets = useMemo(() => {
    let result = [...assets];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((a) => a.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.creator.name.toLowerCase().includes(q) ||
          (a.creator.studio?.toLowerCase().includes(q) ?? false)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
        case "oldest":
          return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "popular":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

    return result;
  }, [assets, activeCategory, searchQuery, sortBy]);

  const handleResetFilter = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };

  // Tentukan variant empty state
  const emptyVariant: "no-assets" | "no-filter-results" | "no-search-results" =
    assets.length === 0
      ? "no-assets"
      : searchQuery.trim() !== ""
      ? "no-search-results"
      : "no-filter-results";

  // Format file size
  function formatFileSize(bytes: number): string {
    if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`;
    if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
    if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`;
    return `${bytes} B`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <BerandaNavbar />

      <main className="flex-1">
        <PageHeader
          title="Aset Digital Saya"
          description="Kumpulan aset digital yang telah kamu beli dan siap digunakan."
        />

        {!isLoading && (
          <>
            <LibraryStatsBar
              totalAssets={stats.total}
              breakdownByCategory={categoryCounts as Record<CategoryFilter, number>}
              storage={{
                used: stats.totalSize,
                limit: stats.maxStorage,
                percentage: Math.min(100, Math.round((stats.totalSize / stats.maxStorage) * 100)),
              }}
            />

            {assets.length > 0 && (
              <LibraryFilterBar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultCount={filteredAssets.length}
                totalCount={assets.length}
                categoryCounts={categoryCounts}
                categoryLabels={ASSET_CATEGORY_LABELS}
              />
            )}

            {/* Library Content */}
            {isLoading ? (
              <section className="py-8 md:py-12 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <AssetCardSkeleton key={i} />
                    ))}
                  </div>
                </div>
              </section>
            ) : filteredAssets.length === 0 ? (
              <LibraryEmptyState
                variant={emptyVariant}
                onResetFilter={handleResetFilter}
              />
            ) : (
              <section className="py-8 md:py-12 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                      {filteredAssets.map((asset) => (
                        <AssetLibraryCard key={asset.id} asset={asset} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {filteredAssets.map((asset) => (
                        <AssetLibraryRow key={asset.id} asset={asset} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

// ===== PAGE EXPORT =====
export default function MyAssetsPage() {
  return (
    <AuthProvider>
      <MyAssetsContent />
    </AuthProvider>
  );
}
