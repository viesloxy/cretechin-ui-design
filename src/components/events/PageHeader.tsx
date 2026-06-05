"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 dark:text-white">
            {title}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base text-neutral-500 dark:text-white/50 mt-1"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
