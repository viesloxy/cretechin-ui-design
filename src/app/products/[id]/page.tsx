"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { BerandaNavbar } from "@/components/beranda";
import { Footer } from "@/components/landing-page";
import {
  Breadcrumb,
  ProductGallery,
  ProductInfo,
  StickyPurchaseCard,
  ProductTabs,
  ProductTabType,
  TabDescription,
  TabSpecification,
  TabReviews,
  RelatedProducts,
} from "@/components/products/detail";

/* ─────────────────────────── MOCK DATA ─────────────────────────── */

interface MockProduct {
  id: string;
  title: string;
  creator: { id: string; name: string; isVerified: boolean };
  badge: string;
  images: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  features: string[];
  description: string;
  specifications: Record<string, string | string[]>;
  additionalImages: string[];
}

interface MockReview {
  id: string;
  user: { name: string; avatar: string };
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

interface MockRelatedProduct {
  id: string;
  title: string;
  creator: string;
  image: string;
  price: number;
  rating: number;
}

const MOCK_PRODUCT: MockProduct = {
  id: "1",
  title: "Modern Dashboard UI Kit - Complete Edition",
  creator: { id: "creator-1", name: "DesignStudio Pro", isVerified: true },
  badge: "Populer",
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  ],
  price: 299000,
  originalPrice: 450000,
  rating: 4.8,
  reviewCount: 1243,
  features: [
    "Termasuk lisensi penggunaan komersial",
    "Akses seumur hidup",
    "Support teknis gratis",
    "Update gratis seumur hidup",
  ],
  description: `Modern Dashboard UI Kit adalah koleksi lengkap komponen UI yang dirancang untuk membuat dashboard yang indah dan fungsional. Dengan lebih dari 250+ komponen yang siap pakai, Anda dapat membuat proyek Anda lebih cepat dari sebelumnya.

Kit ini mencakup berbagai komponen seperti cards, charts, tables, forms, dan banyak lagi. Semua komponen dirancang dengan konsisten dan dapat dengan mudah dikustomisasi sesuai kebutuhan proyek Anda.

Dirancang dengan prinsip atomic design, kit ini memungkinkan Anda membangun interface yang kompleks dengan cepat tanpa mengorbankan kualitas atau konsistensi visual.`,
  specifications: {
    compatibility: ["Adobe XD", "Figma", "Sketch"],
    fileSize: "124 MB",
    components: "250+ UI Components",
    formats: [".xd", ".fig", ".sketch"],
    version: "2.0",
    license: "Commercial License",
    updates: "Lifetime",
  },
  additionalImages: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  ],
};

const MOCK_REVIEWS: MockReview[] = [
  {
    id: "r1",
    user: { name: "Budi Santoso", avatar: "/images/avatar-2.jpeg" },
    rating: 5,
    date: "2026-05-20",
    comment:
      "Sangat lengkap dan profesional. Komponen-komponennya sangat membantu accelerate workflow saya. Worth every penny! Highly recommended!",
    helpfulCount: 12,
  },
  {
    id: "r2",
    user: { name: "Anisa Rahman", avatar: "/images/avatar-3.jpeg" },
    rating: 5,
    date: "2026-05-18",
    comment:
      "Bagus banget! Sudah dipakai di beberapa project dan client sangat suka hasilnya. Sangat membantu sekali!",
    helpfulCount: 8,
  },
  {
    id: "r3",
    user: { name: "Rizky Pratama", avatar: "/images/avatar-4.jpeg" },
    rating: 4,
    date: "2026-05-15",
    comment:
      "Kualitas bagus, tapi masih perlu sedikit adjustment untuk match dengan brand guidelines kami. Overall great product!",
    helpfulCount: 5,
  },
  {
    id: "r4",
    user: { name: "Dewi Lestari", avatar: "/images/avatar-1.jpeg" },
    rating: 5,
    date: "2026-05-10",
    comment:
      "Super recommended! Desainnya sangat modern dan profesional. Sudah dipakai untuk 3 project komersil dan client suka banget.",
    helpfulCount: 15,
  },
  {
    id: "r5",
    user: { name: "Ahmad Fauzi", avatar: "/images/avatar-5.jpeg" },
    rating: 4,
    date: "2026-05-05",
    comment:
      "Good quality overall. Beberapa komponen mungkin perlu dioptimize untuk production use, tapi secara keseluruhan sangat memuaskan.",
    helpfulCount: 3,
  },
];

const MOCK_RELATED_PRODUCTS: MockRelatedProduct[] = [
  {
    id: "rel-1",
    title: "Premium Icon Set - 1000+ Icons",
    creator: "IconFactory",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80",
    price: 99000,
    rating: 4.7,
  },
  {
    id: "rel-2",
    title: "Mobile App UI Kit - E-Commerce",
    creator: "AppDesign Co",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    price: 199000,
    rating: 4.9,
  },
  {
    id: "rel-3",
    title: "Landing Page Template Pack",
    creator: "WebCraft Studio",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
    price: 149000,
    rating: 4.6,
  },
  {
    id: "rel-4",
    title: "3D Illustration Bundle",
    creator: "ArtVibe Studio",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    price: 179000,
    rating: 4.8,
  },
];

/* ─────────────────────────── CONTENT ─────────────────────────── */

function ProductDetailContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProductTabType>("description");

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const product = MOCK_PRODUCT;
  const reviews = MOCK_REVIEWS;

  const reviewDistribution = [78, 15, 5, 1, 1]; // percentages for 5,4,3,2,1 stars

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24 lg:pb-0">
      <BerandaNavbar />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/beranda" },
          { label: "Katalog", href: "/products" },
          { label: product.title },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <ProductGallery images={product.images} title={product.title} />
          </motion.div>

          {/* Right: Info + Sticky CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <ProductInfo product={product} />
            <StickyPurchaseCard
              product={{
                id: product.id,
                title: product.title,
                subtitle: product.creator.name,
                thumbnail: product.images[0],
                price: product.price,
                badge: product.badge,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <ProductTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stats={{ reviewCount: product.reviewCount }}
      />

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {activeTab === "description" && (
          <TabDescription
            description={product.description}
            features={product.features}
            additionalImages={product.additionalImages}
          />
        )}
        {activeTab === "specifications" && (
          <TabSpecification specifications={product.specifications} />
        )}
        {activeTab === "reviews" && (
          <TabReviews
            reviews={reviews}
            stats={{
              averageRating: product.rating,
              totalReviews: product.reviewCount,
              distribution: reviewDistribution,
            }}
          />
        )}
      </div>

      {/* Related Products */}
      <RelatedProducts products={MOCK_RELATED_PRODUCTS} />

      {/* Footer */}
      <Footer />
    </main>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  void params.id; // params available for future dynamic data fetching
  return (
    <AuthProvider>
      <ProductDetailContent />
    </AuthProvider>
  );
}