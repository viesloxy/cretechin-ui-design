"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Calendar, Clock, User } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Recap Seminar: Masa Depan AI dalam Pendidikan Digital",
    category: "Recap Seminar",
    author: "Tim CreTechin",
    date: "20 Mei 2026",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    excerpt: "Rangkuman lengkap dari seminar nasional tentang implementasi AI dalam platform pembelajaran digital dan dampaknya terhadap masa depan edukasi.",
  },
  {
    id: 2,
    title: "5 Tips Karir untuk Fresh Graduate di Era Digital",
    category: "Tips Karir",
    author: "Rina Wijaya",
    date: "18 Mei 2026",
    readTime: "7 menit",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    excerpt: "Panduan praktis untuk fresh graduate yang ingin memulai karir di industri teknologi dan digital dengan strategi yang tepat.",
  },
  {
    id: 3,
    title: "Tutorial: Membuat Portfolio Website dengan Next.js",
    category: "Tutorial",
    author: "Budi Santoso",
    date: "15 Mei 2026",
    readTime: "10 menit",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    excerpt: "Pelajari cara membuat portfolio website profesional menggunakan Next.js, Tailwind CSS, dan deploy ke Vercel secara gratis.",
  },
  {
    id: 4,
    title: "Tren Industri Kreatif 2026: Peluang dan Tantangan",
    category: "Berita Industri",
    author: "Ahmad Rizki",
    date: "12 Mei 2026",
    readTime: "6 menit",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    excerpt: "Analisis mendalam tentang tren terkini di industri kreatif, peluang karir yang menjanjikan, dan skill yang dibutuhkan.",
  },
];

export default function Articles() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-black transition-colors duration-300" id="articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
              Artikel & Insight
            </h2>
            <p className="text-base max-w-2xl text-neutral-600 dark:text-white/50">
              Informasi terkini seputar teknologi, karir, dan tips belajar
            </p>
          </div>
          <Link
            href="/articles"
            className="hidden md:block text-sm font-semibold text-primary hover:underline"
          >
            Lihat Semua
          </Link>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={itemVariants}>
              <Link href={`/articles/${article.id}`}>
                <Card className="h-full group cursor-pointer p-0 rounded-2xl border-black/5 dark:border-white/5 hover:border-primary/30 transition-all duration-300 overflow-hidden" padding="none">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category */}
                    <p className="text-xs font-semibold text-yellow-400 mb-2">
                      {article.category}
                    </p>

                    {/* Title */}
                    <h3 className="text-base font-semibold mb-3 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-neutral-600 dark:text-white/50 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-white/40 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="pt-3 border-t border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-white/40">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/articles"
            className="inline-block text-sm font-semibold text-primary hover:underline"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}