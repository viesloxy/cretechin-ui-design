"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Star, Download } from "lucide-react";

const assets = [
  {
    id: 1,
    title: "Complete UI Kit - Fintech App",
    category: "UI Kits",
    creator: "DesignStudio",
    rating: 4.9,
    downloads: 1234,
    price: "Rp 149.000",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: 2,
    title: "Modern E-Commerce Website Template",
    category: "Templates",
    creator: "WebCraft",
    rating: 4.8,
    downloads: 892,
    price: "Rp 199.000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 3,
    title: "Icon Set - 500+ Premium Icons",
    category: "Icons",
    creator: "IconFactory",
    rating: 4.7,
    downloads: 2156,
    price: "Rp 99.000",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  },
  {
    id: 4,
    title: "Mobile App Mockup Collection",
    category: "Mockups",
    creator: "MockupPro",
    rating: 4.9,
    downloads: 1567,
    price: "Rp 129.000",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
];

export default function DigitalAssets() {
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
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-black transition-colors duration-300" id="marketplace">
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
              Aset Digital Marketplace
            </h2>
            <p className="text-base max-w-2xl text-neutral-600 dark:text-white/50">
              Template, UI Kits, dan tool desain premium untuk mendukung workflow-mu
            </p>
          </div>
          <Link
            href="/marketplace"
            className="hidden md:block text-sm font-semibold text-primary hover:underline"
          >
            Jelajahi Aset
          </Link>
        </motion.div>

        {/* Assets Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {assets.map((asset) => (
            <motion.div key={asset.id} variants={itemVariants}>
              <Link href={`/marketplace/${asset.id}`}>
                <Card className="h-full group cursor-pointer p-0 rounded-2xl border-black/5 dark:border-white/5 hover:border-primary/30 transition-all duration-300 overflow-hidden" padding="none">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={asset.image}
                      alt={asset.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category */}
                    <p className="text-xs font-semibold text-primary mb-2">
                      {asset.category}
                    </p>

                    {/* Title */}
                    <h3 className="text-base font-semibold mb-2 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
                      {asset.title}
                    </h3>

                    {/* Creator */}
                    <p className="text-sm text-neutral-600 dark:text-white/50 mb-3">
                      by {asset.creator}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-white/40 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                        <span className="font-semibold">{asset.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        <span>{asset.downloads}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="pt-3 border-t border-black/5 dark:border-white/5">
                      <p className="text-lg font-bold text-primary">
                        {asset.price}
                      </p>
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
            href="/marketplace"
            className="inline-block text-sm font-semibold text-primary hover:underline"
          >
            Jelajahi Semua Aset
          </Link>
        </div>
      </div>
    </section>
  );
}