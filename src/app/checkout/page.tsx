"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider, useCart } from "@/context/CartContext";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import PaymentMethodGroup from "@/components/checkout/PaymentMethodGroup";
import OrderSummaryCheckout from "@/components/checkout/OrderSummaryCheckout";
import MobileBottomBar from "@/components/checkout/MobileBottomBar";
import type { PaymentMethod } from "@/components/checkout/PaymentMethodGroup";

const PAYMENT_GROUPS = [
  {
    type: "ewallet" as const,
    label: "E-Wallet",
    options: [
      { id: "gopay", group: "ewallet" as const, name: "GoPay", label: "GoPay", sublabel: "Proses instan", logo: "/images/payment1.svg" },
      { id: "ovo", group: "ewallet" as const, name: "OVO", label: "OVO", sublabel: "Proses 1x24 jam", logo: "/images/payment1.svg" },
      { id: "dana", group: "ewallet" as const, name: "DANA", label: "DANA", sublabel: "Proses instan", logo: "/images/payment1.svg" },
      { id: "shopeepay", group: "ewallet" as const, name: "ShopeePay", label: "ShopeePay", sublabel: "Proses instan", logo: "/images/payment1.svg" },
    ],
  },
  {
    type: "virtualaccount" as const,
    label: "Virtual Account",
    options: [
      { id: "bca_va", group: "virtualaccount" as const, name: "BCA VA", label: "BCA Virtual Account", sublabel: "Tidak ada biaya admin", logo: "/images/payment1.svg" },
      { id: "mandiri_va", group: "virtualaccount" as const, name: "Mandiri VA", label: "Mandiri Virtual Account", sublabel: "Biaya admin Rp 2.500", logo: "/images/payment1.svg" },
      { id: "bni_va", group: "virtualaccount" as const, name: "BNI VA", label: "BNI Virtual Account", sublabel: "Biaya admin Rp 2.500", logo: "/images/payment1.svg" },
    ],
  },
  {
    type: "creditcard" as const,
    label: "Kartu Kredit/Debit",
    options: [
      { id: "visa", group: "creditcard" as const, name: "Visa", label: "Visa", sublabel: "Kartu kredit & debit Visa", logo: "/images/payment1.svg" },
      { id: "mastercard", group: "creditcard" as const, name: "Mastercard", label: "Mastercard", sublabel: "Kartu kredit & debit Mastercard", logo: "/images/payment1.svg" },
    ],
  },
];

function CheckoutContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const { items } = useCart();
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>("ewallet");

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      router.push("/cart");
    }
  }, [items, isLoading, router]);

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
  if (items.length === 0) return null;

  const handlePay = () => {
    if (!selectedMethod) return;
    const orderId = `ORD-${Date.now()}`;
    router.push(`/orders/${orderId}?method=${selectedMethod.id}`);
  };

  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleToggleGroup = (type: string) => {
    setExpandedGroup((prev) => (prev === type ? null : type));
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors pb-28 lg:pb-0">
      <BerandaNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CheckoutHeader />

        <div className="py-8 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Payment Methods */}
            <div className="lg:col-span-2 space-y-4">
              {PAYMENT_GROUPS.map((group, index) => (
                <motion.div
                  key={group.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PaymentMethodGroup
                    type={group.type}
                    label={group.label}
                    options={group.options}
                    selectedId={selectedMethod?.id ?? null}
                    isExpanded={expandedGroup === group.type}
                    onToggle={() => handleToggleGroup(group.type)}
                    onSelect={handleSelectMethod}
                  />
                </motion.div>
              ))}
            </div>

            {/* Right: Order Summary */}
            <div className="hidden lg:block">
              <OrderSummaryCheckout selectedMethod={selectedMethod} onPay={handlePay} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <MobileBottomBar selectedMethod={selectedMethod} onPay={handlePay} />

      <Footer />
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutContent />
      </CartProvider>
    </AuthProvider>
  );
}