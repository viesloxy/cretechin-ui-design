"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartHeaderAction {
  title: string;
  count?: number;
  action?: "clear" | "move";
}

function CartHeaderAction({ title, count, action }: CartHeaderAction) {
  const { clearCart } = useCart();

  const handleAction = () => {
    if (action === "clear") {
      clearCart();
    }
  };

  if (!action) return null;

  return (
    <button
      onClick={handleAction}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-600 dark:text-white/50 hover:border-error/50 hover:text-error transition-all"
    >
      <Trash2 className="w-4 h-4" />
      <span>Hapus Semua</span>
    </button>
  );
}

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="py-12 md:py-16"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white mb-3">
            Keranjang Belanja
          </h1>
          <p className="text-base text-neutral-600 dark:text-white/50">
            {itemCount > 0
              ? `${itemCount} item${itemCount > 1 ? "s" : ""} di keranjang Anda`
              : "Tidak ada item di keranjang"}
          </p>
        </div>
        {itemCount > 1 && <CartHeaderAction title="Hapus Semua" count={itemCount} action="clear" />}
      </div>
    </motion.div>
  );
}