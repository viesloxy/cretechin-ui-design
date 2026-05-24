"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function WelcomeSection() {
  const { user } = useAuth();

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-transparent border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-3">
            Selamat datang, {user?.name || "User"}!
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-white/50">
            Temukan kursus dan aset digital terbaik untuk karirmu
          </p>
        </motion.div>
      </div>
    </section>
  );
}