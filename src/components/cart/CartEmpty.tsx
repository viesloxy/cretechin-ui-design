"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";
import { ShoppingCart } from "lucide-react";

export default function CartEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Icon */}
      <div className="w-24 h-24 mb-8 text-neutral-200 dark:text-neutral-800">
        <ShoppingCart strokeWidth={1} className="w-full h-full" />
      </div>

      {/* Text */}
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-3 text-center">
        Keranjang Anda kosong
      </h2>
      <p className="text-sm sm:text-base text-neutral-500 dark:text-white/50 text-center max-w-sm mb-10">
        Belum ada item di keranjang belanja. Yuk, mulai jelajahi kursus dan aset digital terbaik!
      </p>

      {/* Action */}
      <Link href="/products">
        <MotionButton label="Jelajahi Marketplace" />
      </Link>
    </motion.div>
  );
}