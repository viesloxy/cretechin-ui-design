"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import DashboardHeader from "@/components/admin/Header/Header";
import StatsCards from "@/components/admin/StatsCards/StatsCards";
import RecentTransactions from "@/components/admin/RecentTransactions/RecentTransactions";

// Dynamic chart imports (reduce initial bundle, avoid SSR for canvas)
const RevenueLineChart = dynamic(
  () => import("@/components/admin/Charts/RevenueLineChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 bg-neutral-100 dark:bg-neutral-900 rounded-2xl animate-pulse" />
    ),
  }
);

const CategoryDonutChart = dynamic(
  () => import("@/components/admin/Charts/CategoryDonutChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 bg-neutral-100 dark:bg-neutral-900 rounded-2xl animate-pulse" />
    ),
  }
);

function DashboardContent() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { isLoading, sidebarCollapsed } = useAdmin();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 relative">
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-neutral-600 dark:text-white/50 animate-pulse">
            Memuat dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen flex flex-row bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Sidebar />
      <div
        className={`w-full transition-[padding] duration-300 ${
          sidebarCollapsed ? "lg:pl-4" : "lg:pl-6"
        }`}
      >
        <TopBar />
        <main className="p-4 lg:p-6 xl:p-8 space-y-6 md:space-y-8">
          <DashboardHeader />
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueLineChart />
            </div>
            <div className="lg:col-span-1">
              <CategoryDonutChart />
            </div>
          </div>
          <RecentTransactions />
          <div className="h-8" />
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <DashboardContent />
      </AdminProvider>
    </AuthProvider>
  );
}
