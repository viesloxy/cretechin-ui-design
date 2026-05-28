"use client";

import Link from "next/link";
import { User, Star } from "lucide-react";

interface ProductInfoProps {
  product: {
    id: string;
    title: string;
    creator: {
      id: string;
      name: string;
    };
    badge?: string;
    rating: number;
    reviewCount: number;
    price: number;
    originalPrice?: number;
    features: string[];
  };
}

const badgeStyles: Record<string, { bg: string; text: string }> = {
  Populer: { bg: "bg-warning/20", text: "text-warning" },
  Terbaru: { bg: "bg-primary/20", text: "text-primary" },
  "Lisensi Komersial": { bg: "bg-income/20", text: "text-income" },
  Exclusive: { bg: "bg-error/20", text: "text-error" },
  "Free Update": { bg: "bg-blue-500/20", text: "text-blue-500" },
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white leading-tight">
        {product.title}
      </h1>

      {/* Creator */}
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-neutral-500" />
        <span className="text-base text-neutral-600 dark:text-white/50">
          oleh{" "}
          <Link
            href={`/creators/${product.creator.id}`}
            className="text-primary hover:underline font-medium"
          >
            {product.creator.name}
          </Link>
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-neutral-200 text-neutral-200 dark:fill-neutral-700 dark:text-neutral-700"
              }`}
            />
          ))}
        </div>
        <span className="text-base font-medium text-neutral-900 dark:text-white">
          {product.rating}
        </span>
        <span className="text-base text-neutral-500">({product.reviewCount.toLocaleString()} ulasan)</span>
      </div>

      {/* Badges */}
      {product.badge && (
        <div className="flex gap-2 flex-wrap">
          {product.badge.split(",").map((b) => {
            const style = badgeStyles[b.trim()] || { bg: "bg-primary/20", text: "text-primary" };
            return (
              <span
                key={b.trim()}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
              >
                {b.trim()}
              </span>
            );
          })}
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3 pt-2">
        <span className="text-2xl md:text-3xl font-bold text-primary">
          Rp {product.price.toLocaleString()}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-neutral-400 line-through">
              Rp {product.originalPrice!.toLocaleString()}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-error text-white">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Feature List */}
      {product.features.length > 0 && (
        <ul className="space-y-2 pt-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-white/50">
              <svg
                className="w-5 h-5 text-income flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}