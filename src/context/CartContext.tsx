"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export interface CartItem {
  id: string;
  type: "course" | "asset";
  title: string;
  subtitle: string;
  thumbnail: string;
  price: number;
  badge?: string;
  addedAt: string;
}

interface PromoCode {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minPurchase: number;
  maxDiscount?: number;
  validUntil: string;
  description: string;
}

interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  promoCode: PromoCode | null;
  applyPromo: (code: string) => Promise<boolean>;
  removePromo: () => void;
  toasts: Toast[];
  dismissToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PROMO_CODES: PromoCode[] = [
  {
    code: "CRETECHIN10",
    type: "percentage",
    value: 10,
    minPurchase: 100000,
    maxDiscount: 50000,
    validUntil: "2026-12-31",
    description: "Diskon 10% untuk pembelian minimal Rp 100.000",
  },
  {
    code: "WELCOME15",
    type: "percentage",
    value: 15,
    minPurchase: 200000,
    maxDiscount: 100000,
    validUntil: "2026-12-31",
    description: "Diskon 15% untuk pembelian minimal Rp 200.000",
  },
  {
    code: "GENZ20",
    type: "percentage",
    value: 20,
    minPurchase: 150000,
    maxDiscount: 75000,
    validUntil: "2026-12-31",
    description: "Diskon spesial 20% untuk Generasi Z!",
  },
];

const TOAST_ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
  info: Info,
};

const TOAST_STYLES = {
  success: "border-income/30 bg-income/5",
  error: "border-error/30 bg-error/5",
  warning: "border-warning/30 bg-warning/5",
  info: "border-primary/30 bg-primary/5",
};

const TOAST_ICON_STYLES = {
  success: "text-income",
  error: "text-error",
  warning: "text-warning",
  info: "text-primary",
};

const DEMO_CART_ITEMS: CartItem[] = [
  {
    id: "cart-demo-1",
    type: "course",
    title: "Mastering React & Next.js 14",
    subtitle: "Budi Santoso",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    price: 299000,
    badge: "Populer",
    addedAt: new Date().toISOString(),
  },
  {
    id: "cart-demo-2",
    type: "asset",
    title: "Premium Icon Set - 1000+ Icons",
    subtitle: "IconFactory",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400",
    price: 99000,
    badge: "Aset Digital",
    addedAt: new Date().toISOString(),
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cretechin_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        } else {
          // No stored items — use demo items so the cart is never empty
          setItems(DEMO_CART_ITEMS);
          localStorage.setItem("cretechin_cart", JSON.stringify(DEMO_CART_ITEMS));
        }
      } else {
        // No storage at all — seed with demo items
        setItems(DEMO_CART_ITEMS);
        localStorage.setItem("cretechin_cart", JSON.stringify(DEMO_CART_ITEMS));
      }
    } catch {
      setItems(DEMO_CART_ITEMS);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cretechin_cart", JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
    showToast("success", "Ditambahkan ke keranjang", item.title);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    showToast("success", "Item dihapus", "Item berhasil dihapus dari keranjang.");
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode(null);
  }, []);

  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const getDiscount = useCallback(() => {
    if (!promoCode) return 0;
    const subtotal = getSubtotal();
    if (subtotal < promoCode.minPurchase) return 0;
    if (promoCode.type === "percentage") {
      let discount = (subtotal * promoCode.value) / 100;
      if (promoCode.maxDiscount && discount > promoCode.maxDiscount) {
        discount = promoCode.maxDiscount;
      }
      return discount;
    }
    return Math.min(promoCode.value, subtotal);
  }, [promoCode, getSubtotal]);

  const getTotal = useCallback(() => {
    return getSubtotal() - getDiscount();
  }, [getSubtotal, getDiscount]);

  const showToast = (type: Toast["type"], title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const applyPromo = useCallback(async (code: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const promo = PROMO_CODES.find((p) => p.code === code.toUpperCase());
    if (!promo) {
      showToast("error", "Kode promo tidak valid", "Pastikan kode yang Anda masukkan benar.");
      return false;
    }
    const subtotal = getSubtotal();
    if (subtotal < promo.minPurchase) {
      showToast(
        "warning",
        "Syarat tidak terpenuhi",
        `Minimal pembelian Rp ${promo.minPurchase.toLocaleString()} untuk menggunakan kode ini.`
      );
      return false;
    }
    setPromoCode(promo);
    showToast("success", "Promo diterapkan!", promo.description);
    return true;
  }, [getSubtotal]);

  const removePromo = useCallback(() => {
    setPromoCode(null);
    showToast("info", "Kode promo dihapus", "Promo berhasil dibatalkan.");
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        getSubtotal,
        getDiscount,
        getTotal,
        promoCode,
        applyPromo,
        removePromo,
        toasts,
        dismissToast,
      }}
    >
      {children}

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = TOAST_ICONS[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-xl ${TOAST_STYLES[toast.type]} bg-white dark:bg-neutral-900`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${TOAST_ICON_STYLES[toast.type]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">{toast.title}</p>
                  {toast.message && (
                    <p className="text-xs text-neutral-600 dark:text-white/50 mt-0.5">{toast.message}</p>
                  )}
                </div>
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors flex-shrink-0"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}