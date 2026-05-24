"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/providers/ThemeProvider";

const navLinks = [
  { label: "Beranda", href: "/beranda" },
  { label: "Katalog", href: "/catalog" },
  { label: "Kursus", href: "/courses" },
  { label: "Aset", href: "/marketplace" },
  { label: "Acara", href: "/events" },
];

const profileMenuItems = [
  { label: "Profil", href: "/profile", icon: User },
  { label: "Pengaturan Akun", href: "/settings", icon: Settings },
  { label: "History Transaksi", href: "/transactions", icon: Receipt },
  { label: "Pusat Bantuan", href: "/help", icon: HelpCircle },
];

export default function BerandaNavbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Floating Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-50 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="rounded-2xl bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 gap-4">
              {/* Logo */}
              <Link href="/beranda" className="flex items-center gap-2 flex-shrink-0">
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/Logo CreTechin.png"
                    alt="CreTechin"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="hidden md:block font-bold text-base text-black dark:text-white">CreTechin</span>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium transition-colors ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-neutral-600 dark:text-white/50 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Search Bar - Desktop */}
                <div className="hidden lg:flex items-center relative">
                  <Search className="absolute left-4 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Cari kursus, aset, artikel..."
                    className="w-56 xl:w-64 pl-11 pr-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Search Icon - Mobile/Tablet */}
                <button className="lg:hidden p-2 text-neutral-600 dark:text-white/50 hover:text-primary transition-colors">
                  <Search className="w-5 h-5" />
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-black/5 dark:bg-white/10"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  <div className="relative w-5 h-5">
                    <Sun
                      className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                        theme === "light"
                          ? "opacity-100 rotate-0 scale-100"
                          : "opacity-0 rotate-90 scale-0"
                      } text-black`}
                    />
                    <Moon
                      className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                        theme === "dark"
                          ? "opacity-100 rotate-0 scale-100"
                          : "opacity-0 -rotate-90 scale-0"
                      } text-white`}
                    />
                  </div>
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
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary">
                      <Image
                        src="/images/avatar-4.jpeg"
                        alt={user?.name || "User"}
                        width={36}
                        height={36}
                        className="object-cover"
                      />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-neutral-900 dark:text-white">
                      Viesloxy
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
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-20 left-4 right-4 z-40 lg:hidden"
          >
            <div className="rounded-2xl bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg p-4">
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-neutral-600 dark:text-white/50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
}