"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface RelatedProduct {
  id: string;
  title: string;
  creator: string;
  image: string;
  price: number;
  rating: number;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
          Produk Terkait
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/products/${product.id}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden hover:shadow-lg transition-shadow h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-neutral-900">
                        Aset Digital
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-3">{product.creator}</p>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10">
                      <p className="text-base font-bold text-primary">
                        Rp {product.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}