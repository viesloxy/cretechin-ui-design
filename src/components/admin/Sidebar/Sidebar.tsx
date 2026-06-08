"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  ShoppingBag,
  Calendar,
  Users,
  Receipt,
  Bell,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/context/AdminContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  matchKey: string;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, matchKey: "dashboard" },
  { label: "Kelola Artikel", href: "/admin/articles", icon: FileText, matchKey: "articles" },
  { label: "Kelola Kursus", href: "/admin/courses", icon: GraduationCap, matchKey: "courses" },
  { label: "Kelola Produk", href: "/admin/products", icon: ShoppingBag, matchKey: "products" },
  { label: "Kelola Acara", href: "/admin/events", icon: Calendar, matchKey: "events" },
  { label: "Kelola Pengguna", href: "/admin/users", icon: Users, matchKey: "users" },
  { label: "Kelola Transaksi", href: "/admin/transactions", icon: Receipt, matchKey: "transactions" },
];

const AVATAR_SRC = "/images/avatar-3.jpeg";

const bottomNavItems: NavItem[] = [
  { label: "Notifications", href: "/admin/notifications", icon: Bell, matchKey: "notifications" },
  { label: "Settings", href: "/admin/settings", icon: Settings, matchKey: "settings" },
];

function getActiveKey(pathname: string): string {
  if (pathname === "/admin") return "dashboard";
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "admin" && segments[1]) return segments[1];
  return "";
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { adminSession, adminLogout } = useAuth();
  const { sidebarCollapsed, toggleSidebar, isMobileSidebarOpen, setMobileSidebarOpen } = useAdmin();
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname, setMobileSidebarOpen]);

  const activeKey = getActiveKey(pathname);
  const expandedWidth = "w-64";
  const collapsedWidth = "w-20";
  const desktopWidth = sidebarCollapsed ? collapsedWidth : expandedWidth;

  const renderNav = (onItemClick?: () => void) => (
    <nav className="flex-1 overflow-y-auto py-4 px-3">
      <div className="space-y-1">
        {mainNavItems.map((item) => {
          const isActive = activeKey === item.matchKey;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onItemClick}
              title={sidebarCollapsed && !isMobile ? item.label : undefined}
              className={`
                relative flex items-center gap-3 px-3 py-3 rounded-xl
                transition-all duration-300 group
                ${isActive
                  ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  : "text-neutral-600 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5"
                }
                ${sidebarCollapsed && !isMobile ? "justify-center" : ""}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {(!sidebarCollapsed || isMobile) && (
                <span className="font-medium whitespace-nowrap text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );

  const renderBottom = (onItemClick?: () => void) => (
    <div className="border-t border-black/5 dark:border-white/5 py-4 px-3">
      <div className="space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onItemClick}
              title={sidebarCollapsed && !isMobile ? item.label : undefined}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl
                text-neutral-600 dark:text-white/60
                hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary
                transition-all duration-300
                ${sidebarCollapsed && !isMobile ? "justify-center" : ""}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {(!sidebarCollapsed || isMobile) && (
                <span className="font-medium whitespace-nowrap text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => {
            adminLogout();
            router.push("/admin/login");
          }}
          title={sidebarCollapsed && !isMobile ? "Keluar" : undefined}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl
            text-neutral-600 dark:text-white/60
            hover:bg-expense/10 hover:text-expense
            transition-all duration-300
            ${sidebarCollapsed && !isMobile ? "justify-center" : ""}
          `}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(!sidebarCollapsed || isMobile) && (
            <span className="font-medium whitespace-nowrap text-sm">Keluar</span>
          )}
        </button>
      </div>
    </div>
  );

  const renderProfile = () => {
    if (sidebarCollapsed && !isMobile) {
      return (
        <div className="border-t border-black/5 dark:border-white/5 p-3 flex justify-center">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex-shrink-0 border-2 border-primary">
            <Image
              src={AVATAR_SRC}
              alt={adminSession?.name ?? "Admin"}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      );
    }
    return (
      <div className="border-t border-black/5 dark:border-white/5 p-3">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-black/5 dark:bg-white/5">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary">
            <Image
              src={AVATAR_SRC}
              alt={adminSession?.name ?? "Admin"}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-neutral-500 dark:text-white/40">Welcome back</p>
            <p className="font-semibold text-sm text-black dark:text-white truncate">
              {adminSession?.name ?? "Admin"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              adminLogout();
              router.push("/admin/login");
            }}
            className="p-1.5 rounded-lg text-neutral-500 dark:text-white/40 hover:bg-expense/10 hover:text-expense transition-colors flex-shrink-0"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderHeader = (onClose?: () => void) => (
    <div className="flex items-center justify-between px-4 h-16 border-b border-black/5 dark:border-white/5 flex-shrink-0">
      <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
        <div className="relative w-9 h-9 flex-shrink-0">
          <Image
            src="/images/Logo CreTechin.png"
            alt="CreTechin"
            fill
            className="object-contain"
          />
        </div>
        {(!sidebarCollapsed || isMobile) && (
          <span className="font-bold text-lg tracking-tight text-black dark:text-white whitespace-nowrap truncate">
            CreTechin
          </span>
        )}
      </Link>
      {isMobile && (
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex-shrink-0"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-neutral-600 dark:text-white/60" />
        </button>
      )}
    </div>
  );

  const renderDesktopToggle = () => (
    <button
      type="button"
      onClick={toggleSidebar}
      className="hidden lg:flex absolute -right-3 top-16 -translate-y-1/2 z-50 w-7 h-7 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-md hover:scale-110 hover:bg-primary hover:text-white hover:border-primary text-neutral-600 dark:text-white/70 transition-all duration-200"
      aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {sidebarCollapsed ? (
        <ChevronRight className="w-4 h-4" />
      ) : (
        <ChevronLeft className="w-4 h-4" />
      )}
    </button>
  );

  // SSR / pre-hydrate minimal state
  if (!hydrated) {
    return (
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-white dark:bg-neutral-950 border-r border-black/5 dark:border-white/5 z-40 flex-col relative">
        {renderHeader()}
        {renderNav()}
        {renderBottom()}
        {renderProfile()}
        {renderDesktopToggle()}
      </aside>
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar (drawer) */}
      <AnimatePresence>
        {isMobile && (
          <motion.aside
            className={`
              fixed top-0 left-0 h-screen z-50 flex flex-col
              bg-white dark:bg-neutral-950
              border-r border-black/5 dark:border-white/5
              w-72 lg:hidden
              transition-transform duration-300 ease-in-out
              ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            initial={false}
          >
            {renderHeader(() => setMobileSidebarOpen(false))}
            {renderNav(() => setMobileSidebarOpen(false))}
            {renderBottom(() => setMobileSidebarOpen(false))}
            {renderProfile()}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex fixed top-0 left-0 h-screen z-40 flex-col relative
          bg-white dark:bg-neutral-950
          border-r border-black/5 dark:border-white/5
          transition-[width] duration-300 ease-in-out
          ${desktopWidth}
        `}
      >
        {renderHeader()}
        {renderNav()}
        {renderBottom()}
        {renderProfile()}
        {renderDesktopToggle()}
      </aside>
    </>
  );
}
