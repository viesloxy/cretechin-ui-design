"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Future: redirect to search results page
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <>
      {/* Floating Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-50 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="rounded-2xl bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 gap-4">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/Logo CreTechin.png"
                    alt="CreTechin"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-base text-black dark:text-white">CreTechin</span>
              </Link>

              {/* Search Bar - Desktop */}
              <form
                onSubmit={handleSearch}
                className="hidden lg:flex items-center flex-1 max-w-xl mx-4"
              >
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search for courses, assets, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </form>

              {/* Right Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
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

                {/* Desktop Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-semibold rounded-full text-neutral-700 dark:text-white/70 hover:text-primary dark:hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-semibold rounded-full bg-primary text-neutral-900 hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    Daftar
                  </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="w-5 h-5 text-black dark:text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-black dark:text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="lg:hidden overflow-hidden border-t border-black/10 dark:border-white/10"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col gap-4 py-6 px-4">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="w-full">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Search for courses, assets, or topics..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </form>

                    <div className="flex gap-3 pt-2">
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 px-4 py-2 text-sm font-semibold rounded-full text-center text-neutral-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-black/10 dark:border-white/10"
                      >
                        Masuk
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 px-4 py-2 text-sm font-semibold rounded-full bg-primary text-center text-neutral-900 hover:shadow-lg hover:shadow-primary/30 transition-all"
                      >
                        Daftar
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </div>
      {/* Spacer for fixed navbar */}
      <div className="h-[72px]" />
    </>
  );
}