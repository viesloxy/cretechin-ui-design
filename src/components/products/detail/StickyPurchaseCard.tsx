"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2, Loader2 } from "lucide-react";
import Link from "next/link";

interface StickyPurchaseCardProps {
  product: {
    id: string;
    title: string;
    price: number;
  };
}

export default function StickyPurchaseCard({ product }: StickyPurchaseCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsAddingToCart(false);
    // In real implementation: add to cart via context
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.title,
        text: `Lihat produk ini: ${product.title}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      // In real implementation: show toast notification
    }
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      {/* Price Summary Card */}
      <div className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl p-6 space-y-4">
        <div>
          <p className="text-sm text-neutral-500">Total</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">
            Rp {product.price.toLocaleString()}
          </p>
        </div>

        {/* Primary CTA - Add to Cart */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary hover:bg-primary-dark disabled:opacity-70 text-neutral-900 font-semibold rounded-full transition-colors shadow-lg shadow-primary/20"
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memuat...</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Tambah ke Keranjang</span>
            </>
          )}
        </motion.button>

        {/* Secondary CTA - Buy Now */}
        <Link href={`/checkout?product=${product.id}`} className="block">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 px-6 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary/10 transition-colors"
          >
            Beli Sekarang
          </motion.button>
        </Link>

        {/* Wishlist & Share */}
        <div className="flex justify-center gap-6 pt-4 border-t border-black/5 dark:border-white/5">
          <button
            onClick={handleToggleWishlist}
            className={`flex items-center gap-2 text-sm transition-colors ${
              isWishlisted ? "text-error" : "text-neutral-600 dark:text-white/50 hover:text-error"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            <span>Wishlist</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-neutral-600 dark:text-white/50 hover:text-primary transition-colors"
            aria-label="Share product"
          >
            <Share2 className="w-5 h-5" />
            <span>Bagikan</span>
          </button>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-black/10 dark:border-white/10 p-4 z-40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex-shrink-0">
            <p className="text-xs text-neutral-500">Total</p>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">
              Rp {product.price.toLocaleString()}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-primary hover:bg-primary-dark disabled:opacity-70 text-neutral-900 font-semibold rounded-full transition-colors shadow-lg shadow-primary/20"
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memuat...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Tambah ke Keranjang</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}