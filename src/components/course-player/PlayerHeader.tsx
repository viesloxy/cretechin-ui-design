"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function PlayerHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-black/5 dark:border-white/10"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Back Button */}
        <Link
          href="/courses"
          className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-white/60 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Kembali</span>
        </Link>

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
      </div>
    </motion.header>
  );
}