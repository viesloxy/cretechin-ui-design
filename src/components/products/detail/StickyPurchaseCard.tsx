"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Share2, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface StickyPurchaseCardProps {
  product: {
    id: string;
    title: string;
    subtitle?: string;
    thumbnail?: string;
    price: number;
    badge?: string;
  };
}

export default function StickyPurchaseCard({ product }: StickyPurchaseCardProps) {
  const { addItem, items } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isAlreadyInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = async () => {
    if (isAlreadyInCart) return;
    setIsAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    addItem({
      id: product.id,
      type: "asset",
      title: product.title,
      subtitle: product.subtitle || "",
      thumbnail: product.thumbnail || "",
      price: product.price,
      badge: product.badge,
      addedAt: new Date().toISOString(),
    });
    setIsAddingToCart(false);
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
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || isAlreadyInCart}
          className="w-full relative h-auto cursor-pointer rounded-full overflow-hidden outline-none transition-all duration-300 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-primary" />
          <span className="relative z-10 flex items-center justify-center gap-2 px-8 py-3.5">
            <span className="text-sm font-medium tracking-tight text-black">
              {isAlreadyInCart ? "Sudah di Keranjang" : isAddingToCart ? "Memuat..." : "Tambah ke Keranjang"}
            </span>
            {!isAddingToCart && !isAlreadyInCart && (
              <ShoppingCart className="w-4 h-4 text-black" />
            )}
            {isAddingToCart && <Loader2 className="w-4 h-4 animate-spin text-black" />}
          </span>
        </button>

        {/* Secondary CTA - Buy Now */}
        <Link href={`/checkout?product=${product.id}`} className="block">
          <button className="w-full relative h-auto cursor-pointer rounded-full border border-primary overflow-hidden outline-none transition-all duration-300 bg-transparent hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed">
            <span className="absolute inset-0 bg-transparent" />
            <span className="relative z-10 flex items-center justify-center gap-2 px-8 py-3.5">
              <span className="text-sm font-medium tracking-tight text-primary">
                Beli Sekarang
              </span>
              <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </Link>

        {/* Wishlist & Share */}
        <div className="flex justify-center gap-6 pt-4 border-t border-black/5 dark:border-white/5">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`flex items-center gap-2 text-sm transition-colors ${
              isWishlisted ? "text-error" : "text-neutral-600 dark:text-white/50 hover:text-error"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            <span>Wishlist</span>
          </button>
          <button
            onClick={async () => {
              if (navigator.share) {
                await navigator.share({ title: product.title, text: `Lihat produk ini: ${product.title}`, url: window.location.href });
              } else {
                await navigator.clipboard.writeText(window.location.href);
              }
            }}
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
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || isAlreadyInCart}
            className="flex-1 relative h-auto cursor-pointer rounded-full overflow-hidden outline-none transition-all duration-300 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-primary" />
            <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-3.5">
              <span className="text-sm font-medium tracking-tight text-black">
                {isAlreadyInCart ? "Sudah di Keranjang" : isAddingToCart ? "Memuat..." : "Tambah ke Keranjang"}
              </span>
              {isAddingToCart ? (
                <Loader2 className="w-4 h-4 animate-spin text-black" />
              ) : (
                <ShoppingCart className="w-4 h-4 text-black" />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}