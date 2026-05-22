"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Globe, Smartphone, WifiOff } from "lucide-react";

const mockups = [
  {
    title: "Dashboard Kreatif",
    description: "Pantau progress pembelajaran dan project-mu dalam satu tampilan yang bersih dan mudah dipahami",
    image: "/images/Dashboard Intuitive.svg",
  },
  {
    title: "Learning Center",
    description: "Akses ribuan modul pembelajaran interaktif dengan video dan quiz berkualitas",
    image: "/images/Pencatatan Cepat.svg",
  },
  {
    title: "Marketplace",
    description: "Jual dan beli karya digital dengan mudah di marketplace kreatif Indonesia",
    image: "/images/Budget Tracking.svg",
  },
  {
    title: "Portfolio Builder",
    description: "Buat portfolio profesional yang memukau hanya dalam beberapa menit",
    image: "/images/Tabungan Goals.svg",
  },
];

export default function MockupSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-black transition-colors duration-300" id="preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
            Tampilan Aplikasi
          </h2>
          <p className="text-base max-w-2xl mx-auto text-neutral-600 dark:text-white/50">
            Antarmuka yang modern dan intuitif, dirancang untuk pengalaman terbaik
          </p>
        </motion.div>

        {/* Mockups Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
        >
          {mockups.map((mockup) => (
            <motion.div key={mockup.title} variants={itemVariants}>
              <Card className="overflow-hidden p-0 group rounded-2xl border-black/5 dark:border-white/5" padding="none">
                {/* Mockup Image */}
                <div className="bg-neutral-100 dark:bg-neutral-900">
                  <div className="relative bg-white dark:bg-neutral-950" style={{ minHeight: "200px" }}>
                    <Image
                      src={mockup.image}
                      alt={mockup.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="p-5">
                  <h3 className="text-lg font-medium mb-2">{mockup.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/50">
                    {mockup.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Promo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Card className="inline-block p-8 md:p-12 rounded-2xl border-primary/20">
            <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">
              Tersedia di Semua Platform
            </h3>
            <p className="text-base mb-6 max-w-md mx-auto text-neutral-600 dark:text-white/50">
              CreTechin dapat diakses melalui browser di desktop maupun mobile. Tidak perlu download aplikasi tambahan
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-primary/20">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-sm text-black dark:text-white">Web App</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-black/10 dark:border-white/10">
                <Smartphone className="w-5 h-5 text-neutral-600 dark:text-white/50" />
                <span className="text-sm text-neutral-600 dark:text-white/50">Mobile Responsive</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-black/10 dark:border-white/10">
                <WifiOff className="w-5 h-5 text-neutral-600 dark:text-white/50" />
                <span className="text-sm text-neutral-600 dark:text-white/50">Offline Mode</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}