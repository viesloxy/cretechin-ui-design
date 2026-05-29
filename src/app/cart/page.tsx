"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider, useCart } from "@/context/CartContext";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";
import CartHeader from "@/components/cart/CartHeader";
import CartItemGroup from "@/components/cart/CartItemGroup";
import OrderSummary from "@/components/cart/OrderSummary";
import CartEmpty from "@/components/cart/CartEmpty";

function CartContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const { items } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const courseItems = items.filter((item) => item.type === "course");
  const assetItems = items.filter((item) => item.type === "asset");

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <BerandaNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CartHeader itemCount={items.length} />

        {items.length === 0 ? (
          <div className="py-12">
            <CartEmpty />
          </div>
        ) : (
          <div className="py-8 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <CartItemGroup type="course" items={courseItems} />
                <CartItemGroup type="asset" items={assetItems} />
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <OrderSummary onCheckout={handleCheckout} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function CartPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <CartContent />
      </CartProvider>
    </AuthProvider>
  );
}