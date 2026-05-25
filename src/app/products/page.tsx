"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { HeroSection, TabSwitcher, FilterBar, CoursesGrid, AssetsGrid, Pagination } from "@/components/products";
import type { TabType } from "@/components/products";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    title: "Belajar React dari Dasar",
    instructor: "Andi Wijaya",
    category: "technology",
    badge: "Terpopuler",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    rating: 4.8,
    reviewCount: 234,
    studentCount: 1234,
    duration: "12 jam",
    price: 299000,
  },
  {
    id: "2",
    title: "Desain UI/UX Profesional",
    instructor: "Sarah Putri",
    category: "creative",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    rating: 4.9,
    reviewCount: 456,
    studentCount: 892,
    duration: "16 jam",
    price: 499000,
  },
  {
    id: "3",
    title: "Full-Stack Web Development",
    instructor: "Budi Santoso",
    category: "technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    rating: 4.7,
    reviewCount: 789,
    studentCount: 2341,
    duration: "40 jam",
    price: 699000,
  },
  {
    id: "4",
    title: "Machine Learning untuk Pemula",
    instructor: "Dr. Rina Hartati",
    category: "technology",
    badge: "Baru",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    rating: 4.6,
    reviewCount: 123,
    studentCount: 567,
    duration: "20 jam",
    price: 399000,
  },
  {
    id: "5",
    title: "Digital Marketing Strategi",
    instructor: "Diana Pratama",
    category: "business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    rating: 4.5,
    reviewCount: 234,
    studentCount: 1890,
    duration: "8 jam",
    price: 249000,
  },
  {
    id: "6",
    title: "Cloud Computing dengan AWS",
    instructor: "Fajar Nugroho",
    category: "technology",
    badge: "Sertifikasi",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    rating: 4.8,
    reviewCount: 156,
    studentCount: 432,
    duration: "24 jam",
    price: 599000,
  },
  {
    id: "7",
    title: "Pengembangan Game dengan Unity",
    instructor: "Hendra Kusuma",
    category: "technology",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    rating: 4.7,
    reviewCount: 189,
    studentCount: 765,
    duration: "30 jam",
    price: 549000,
  },
  {
    id: "8",
    title: "Mobile App Development Flutter",
    instructor: "Putri Amelia",
    category: "technology",
    badge: "Terpopuler",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
    rating: 4.8,
    reviewCount: 345,
    studentCount: 1098,
    duration: "28 jam",
    price: 449000,
  },
  {
    id: "9",
    title: "Cybersecurity Fundamental",
    instructor: "Arif Rahman",
    category: "technology",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    rating: 4.6,
    reviewCount: 98,
    studentCount: 321,
    duration: "18 jam",
    price: 349000,
  },
  {
    id: "10",
    title: "DevOps Engineering",
    instructor: "Eko Prasetyo",
    category: "technology",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    rating: 4.7,
    reviewCount: 167,
    studentCount: 543,
    duration: "32 jam",
    price: 599000,
  },
  {
    id: "11",
    title: "Data Analytics dengan Python",
    instructor: "Lisa Permatasari",
    category: "technology",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    rating: 4.5,
    reviewCount: 212,
    studentCount: 987,
    duration: "22 jam",
    price: 379000,
  },
  {
    id: "12",
    title: "UI Animation dengan After Effects",
    instructor: "Rendi Saputra",
    category: "creative",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    rating: 4.6,
    reviewCount: 134,
    studentCount: 456,
    duration: "14 jam",
    price: 429000,
  },
  {
    id: "13",
    title: "Branding Strategy untuk Startup",
    instructor: "Mega Sari",
    category: "business",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    rating: 4.7,
    reviewCount: 178,
    studentCount: 654,
    duration: "12 jam",
    price: 299000,
  },
  {
    id: "14",
    title: "3D Modeling untuk Pemula",
    instructor: "Rizky Fernando",
    category: "creative",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    rating: 4.8,
    reviewCount: 234,
    studentCount: 890,
    duration: "20 jam",
    price: 449000,
  },
  {
    id: "15",
    title: "Bisnis Plan Dasar",
    instructor: "Ahmad Fauzi",
    category: "business",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    rating: 4.6,
    reviewCount: 145,
    studentCount: 432,
    duration: "10 jam",
    price: 199000,
  },
  {
    id: "16",
    title: "Ilustrasi Digital dengan Procreate",
    instructor: "Nadia Putri",
    category: "creative",
    badge: "Baru",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    rating: 4.9,
    reviewCount: 312,
    studentCount: 1100,
    duration: "15 jam",
    price: 349000,
  },
];

// Mock data for digital assets
const mockAssets = [
  {
    id: "1",
    title: "UI Kit - Banking App",
    creator: "Andi Wijaya",
    category: "creative",
    type: "Figma",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    rating: 4.8,
    price: 149000,
  },
  {
    id: "2",
    title: "Dashboard Admin Template",
    creator: "Sarah Putri",
    category: "creative",
    type: "Figma",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    rating: 4.7,
    price: 199000,
  },
  {
    id: "3",
    title: "Icon Pack - 500+ Icons",
    creator: "Budi Santoso",
    category: "creative",
    type: "SVG",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    rating: 4.9,
    price: 99000,
  },
  {
    id: "4",
    title: "Illustration Pack - Startup",
    creator: "Diana Pratama",
    category: "creative",
    type: "PNG",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80",
    rating: 4.6,
    price: 129000,
  },
  {
    id: "5",
    title: "Landing Page Template - SaaS",
    creator: "Fajar Nugroho",
    category: "creative",
    type: "Figma",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    rating: 4.8,
    price: 179000,
  },
  {
    id: "6",
    title: "3D Icon Collection",
    creator: "Hendra Kusuma",
    category: "creative",
    type: "PNG",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    rating: 4.7,
    price: 119000,
  },
  {
    id: "7",
    title: "E-commerce UI Template",
    creator: "Putri Amelia",
    category: "creative",
    type: "Figma",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    rating: 4.9,
    price: 249000,
  },
  {
    id: "8",
    title: "Illustration Pack - Tech",
    creator: "Arif Rahman",
    category: "creative",
    type: "SVG",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    rating: 4.5,
    price: 99000,
  },
  {
    id: "9",
    title: "Pitch Deck Template",
    creator: "Rudi Hermawan",
    category: "business",
    type: "PowerPoint",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    rating: 4.7,
    price: 99000,
  },
  {
    id: "10",
    title: "Business Card Mockup Pack",
    creator: "Maya Sari",
    category: "creative",
    type: "PSD",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    rating: 4.6,
    price: 79000,
  },
  {
    id: "11",
    title: "SEO Checklist Template",
    creator: "Bayu Firmansyah",
    category: "business",
    type: "Notion",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    rating: 4.5,
    price: 49000,
  },
  {
    id: "12",
    title: "Mobile App UI Kit - Fitness",
    creator: "Fitriani",
    category: "creative",
    type: "Figma",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
    rating: 4.8,
    price: 179000,
  },
];

const ITEMS_PER_PAGE = 8;

function KatalogContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("courses");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "technology" | "creative" | "business">("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
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

  // Filter courses by category
  const filteredCourses = mockCourses.filter((course) =>
    selectedCategory === "all" || course.category === selectedCategory
  );

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case "newest":
        return 0;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.studentCount - a.studentCount; // popular
    }
  });

  // Paginate courses
  const totalCoursePages = Math.ceil(sortedCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = sortedCourses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Filter & paginate assets
  const filteredAssets = mockAssets.filter((asset) =>
    selectedCategory === "all" || asset.category === selectedCategory
  );
  const totalAssetPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
  const paginatedAssets = filteredAssets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = activeTab === "courses" ? totalCoursePages : totalAssetPages;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <BerandaNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <section className="pb-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Tab Switcher */}
          <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Filter Bar */}
          <FilterBar
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSelectedSort}
          />

          {/* Grid Content */}
          <div className="mt-8">
            {activeTab === "courses" ? (
              <CoursesGrid courses={paginatedCourses} />
            ) : (
              <AssetsGrid assets={paginatedAssets} />
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function KatalogPage() {
  return (
    <AuthProvider>
      <KatalogContent />
    </AuthProvider>
  );
}