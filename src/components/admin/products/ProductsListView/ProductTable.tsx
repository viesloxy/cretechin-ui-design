"use client";

import { motion } from "framer-motion";
import { Eye, Pencil, Trash2, Star, Download } from "lucide-react";
import { ThumbnailImage } from "@/components/admin/articles/shared";
import { ProductStatusBadge, ProductTypeBadge, PriceCell } from "../shared";
import { CATEGORY_LABELS } from "@/lib/products/types";
import { formatNumber } from "@/lib/products/utils";
import type { Product } from "@/lib/products/types";

interface ProductTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete, onPreview }: ProductTableProps) {
  if (products.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/30 border-b border-black/5 dark:border-white/10">
              <th className="text-left text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400 px-4 py-3 w-[30%]">
                Detail Produk
              </th>
              <th className="text-left text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400 px-4 py-3 w-[16%]">
                Kreator
              </th>
              <th className="text-left text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400 px-4 py-3 w-[12%]">
                Harga
              </th>
              <th className="text-left text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400 px-4 py-3 w-[10%]">
                Terjual
              </th>
              <th className="text-left text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400 px-4 py-3 w-[12%]">
                Status
              </th>
              <th className="text-center text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400 px-4 py-3 w-[120px]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.25 }}
                className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors group"
              >
                {/* Detail */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ThumbnailImage
                      src={product.thumbnail.url}
                      alt={product.thumbnail.alt ?? product.title}
                      size={56}
                      rounded="xl"
                      className="flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-sm text-neutral-900 dark:text-white line-clamp-1">
                          {product.title}
                        </h4>
                        {product.featured && (
                          <Star className="w-3.5 h-3.5 fill-primary text-primary flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                          {CATEGORY_LABELS[product.category]}
                        </span>
                        <ProductTypeBadge type={product.productType} size="sm" />
                      </div>
                    </div>
                  </div>
                </td>

                {/* Kreator */}
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <p className="font-medium text-neutral-900 dark:text-white truncate">
                      {product.creator.studioName ?? product.creator.name}
                    </p>
                    {product.creator.title && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                        {product.creator.title}
                      </p>
                    )}
                  </div>
                </td>

                {/* Harga */}
                <td className="px-4 py-3">
                  <PriceCell product={product} />
                </td>

                {/* Terjual */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-white">
                      {formatNumber(product.soldCount)}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <ProductStatusBadge status={product.status} size="sm" />
                </td>

                {/* Aksi */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => onPreview(product.id)}
                      aria-label={`Preview ${product.title}`}
                      title="Preview"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(product.id)}
                      aria-label={`Edit ${product.title}`}
                      title="Edit"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product.id)}
                      aria-label={`Hapus ${product.title}`}
                      title="Hapus"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
