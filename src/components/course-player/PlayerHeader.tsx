"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PlayerHeader() {
  const { user } = useAuth();

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

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button
            type="button"
            className="relative text-neutral-500 dark:text-white/50 hover:text-primary transition-colors p-1"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {/* Optional badge */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
          </button>

          {/* Profile Avatar */}
          <button
            type="button"
            className="w-8 h-8 rounded-full border-2 border-primary overflow-hidden hover:opacity-80 transition-opacity"
            aria-label="Profile"
          >
            <div className="w-full h-full bg-primary flex items-center justify-center text-neutral-900 text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </button>
        </div>
      </div>
    </motion.header>
  );
}