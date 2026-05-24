"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Grid3x3,
  GraduationCap,
  Package,
  Calendar,
  Search,
  ShoppingCart,
  User,
  Settings,
  Receipt,
  HelpCircle,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Beranda", href: "/dashboard", icon: Home },
  { label: "Katalog Produk", href: "/catalog", icon: Grid3x3 },
  { label: "Kelas/Kursus", href: "/courses", icon: GraduationCap },
  { label: "Aset Digital", href: "/marketplace", icon: Package },
  { label: "Acara", href: "/events", icon: Calendar },
];

const profileMenuItems = [
  { label: "Profil", href: "/profile", icon: User },
  { label: "Pengaturan Akun", href: "/settings", icon: Settings },
  { label: "History Transaksi", href: "/transactions", icon: Receipt },
  { label: "Pusat Bantuan", href: "/help", icon: HelpCircle },
];

export default function DashboardNavbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Mock cart count
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex-shrink-0">
            <Image
              src="/images/Logo CreTechin.png"
              alt="CreTechin"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 ml-12">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-neutral-600 dark:text-white/50 hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Section: Search, Cart, Profile */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-4 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Cari kursus, aset, artikel..."
                className="w-80 pl-11 pr-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Sea Icon - Mobile */}
            <button className="md:hidden p-2 text-neutral-600 dark:text-white/50 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 text-neutral-600 dark:text-white/50 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-neutral-900 text-xs font-semibold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center border-2 border-primary">
                  <span className="text-sm font-semibold text-neutral-900">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-neutral-900 dark:text-white">
                  {user?.name || "User"}
                </span>
                <ChevronDown className="hidden sm:block w-4 h-4 text-neutral-600 dark:text-white/50" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-xl shadow-lg p-2"
                  >
                    {profileMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 dark:text-white/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                    <div className="my-1 border-t border-black/5 dark:border-white/5" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 dark:text-white/50 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-black/5 dark:border-white/5 bg-white dark:bg-black"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-neutral-600 dark:text-white/50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}