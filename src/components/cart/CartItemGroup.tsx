"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, Code } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

interface CartItemGroupProps {
  type: "course" | "asset";
  items: CartItem[];
}

const TYPE_CONFIG = {
  course: {
    label: "Program Belajar",
    icon: ShoppingBag,
    badge: "Kelas",
    href: (id: string) => `/courses/${id}`,
  },
  asset: {
    label: "Aset Digital",
    icon: Code,
    badge: "Aset",
    href: (id: string) => `/assets/${id}`,
  },
};

function CartItemCard({ item }: { item: CartItem }) {
  const { removeItem } = useCart();
  const config = TYPE_CONFIG[item.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="flex items-stretch gap-4 p-4 sm:p-5">
        {/* Thumbnail */}
        <Link href={config.href(item.id)} className="flex-shrink-0 relative">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            {/* Badge + Remove */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                {config.badge}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-error hover:bg-error/10 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Hapus item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Title */}
            <Link href={config.href(item.id)}>
              <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                {item.title}
              </h3>
            </Link>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-white/50 mt-1 line-clamp-1">
              {item.subtitle}
            </p>
          </div>

          {/* Price + Action */}
          <div className="flex items-center justify-between mt-3 sm:mt-4">
            <p className="text-base sm:text-lg font-bold text-primary">
              Rp {item.price.toLocaleString("id-ID")}
            </p>
            <Link
              href={config.href(item.id)}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-primary text-neutral-900 hover:bg-primary-dark transition-all shadow-sm"
            >
              Lihat Detail
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CartItemGroup({ type, items }: CartItemGroupProps) {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  if (items.length === 0) return null;

  return (
    <section>
      {/* Group Header */}
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-neutral-500 dark:text-white/50" />
        <h2 className="text-base font-semibold text-neutral-700 dark:text-white/80">
          {config.label}
        </h2>
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
          {items.length}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}