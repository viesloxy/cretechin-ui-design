"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import {
  BerandaNavbar,
  WelcomeSection,
  CategoryFilter,
  Category,
} from "@/components/beranda";
import {
  NewCourses,
  DigitalAssets,
  Articles,
  Statistics,
  FAQ,
  Footer,
} from "@/components/landing-page";

function BerandaContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

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

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <BerandaNavbar />
      <WelcomeSection />
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <NewCourses />
      <DigitalAssets />
      <Articles />
      <Statistics />
      <FAQ />
      <Footer />
    </main>
  );
}

export default function BerandaPage() {
  return (
    <AuthProvider>
      <BerandaContent />
    </AuthProvider>
  );
}