"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "1.000+",
    label: "Pengguna Aktif",
  },
  {
    value: "500+",
    label: "Kursus Tersedia",
  },
  {
    value: "1.200+",
    label: "Aset Digital",
  },
  {
    value: "4.9/5",
    label: "Rating Rata-rata",
  },
];

export default function Statistics() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-neutral-600 dark:text-white/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}