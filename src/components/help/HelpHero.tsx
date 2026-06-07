"use client";

import { motion } from "framer-motion";

export default function HelpHero() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white mb-4">
            Pusat Bantuan
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-base max-w-2xl text-neutral-600 dark:text-white/50"
          >
            Halo, ada yang bisa kami bantu? Temukan jawaban lengkap untuk semua kebutuhan Anda di CreTechin.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
