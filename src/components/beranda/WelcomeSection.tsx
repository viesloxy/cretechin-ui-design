"use client";

import { motion } from "framer-motion";

export default function WelcomeSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-transparent border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
            Selamat datang, <span className="text-primary">Viesloxy</span>!
          </h1>
          <p className="text-base max-w-2xl text-neutral-600 dark:text-white/50">
            Temukan kursus dan aset digital terbaik untuk karirmu
          </p>
        </motion.div>
      </div>
    </section>
  );
}