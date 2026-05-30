"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import PaymentMethodGroup from "@/components/checkout/PaymentMethodGroup";
import OrderSummaryCheckout from "@/components/checkout/OrderSummaryCheckout";
import MobileBottomBar from "@/components/checkout/MobileBottomBar";
import { useCart } from "@/context/CartContext";
import type { PaymentMethod } from "@/components/checkout/PaymentMethodGroup";

const PAYMENT_METHODS = {
  ewallet: {
    label: "E-Wallet",
    options: [
      { id: "gopay", group: "ewallet" as const, name: "GoPay", label: "GoPay", sublabel: "Proses instan", logo: "/images/payment1.svg" },
      { id: "ovo", group: "ewallet" as const, name: "OVO", label: "OVO", sublabel: "Proses 1x24 jam", logo: "/images/payment1.svg" },
      { id: "dana", group: "ewallet" as const, name: "DANA", label: "DANA", sublabel: "Proses instan", logo: "/images/payment1.svg" },
      { id: "shopeepay", group: "ewallet" as const, name: "ShopeePay", label: "ShopeePay", sublabel: "Proses instan", logo: "/images/payment1.svg" },
    ],
  },
  virtualaccount: {
    label: "Virtual Account",
    options: [
      { id: "bca_va", group: "virtualaccount" as const, name: "BCA VA", label: "BCA Virtual Account", sublabel: "Tidak ada biaya admin", logo: "/images/payment1.svg" },
      { id: "mandiri_va", group: "virtualaccount" as const, name: "Mandiri VA", label: "Mandiri Virtual Account", sublabel: "Biaya admin Rp 2.500", logo: "/images/payment1.svg" },
      { id: "bni_va", group: "virtualaccount" as const, name: "BNI VA", label: "BNI Virtual Account", sublabel: "Biaya admin Rp 2.500", logo: "/images/payment1.svg" },
    ],
  },
  creditcard: {
    label: "Kartu Kredit/Debit",
    options: [
      { id: "visa", group: "creditcard" as const, name: "Visa", label: "Visa", sublabel: "Kartu kredit & debit Visa", logo: "/images/payment1.svg" },
      { id: "mastercard", group: "creditcard" as const, name: "Mastercard", label: "Mastercard", sublabel: "Kartu kredit & debit Mastercard", logo: "/images/payment1.svg" },
    ],
  },
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotal } = useCart();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<"ewallet" | "virtualaccount" | "creditcard" | null>("ewallet");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const total = getTotal();

  // Admin fee for some methods
  const adminFee =
    selectedMethod?.id === "mandiri_va" || selectedMethod?.id === "bni_va" ? 2500 : 0;
  const shippingCost = 15000;
  const grandTotal = total + shippingCost + adminFee;

  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handlePay = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    setTimeout(() => {
      router.push(`/orders/new?method=${selectedMethod!.id}&total=${grandTotal}`);
    }, 800);
  };

  const groupKeys = Object.keys(PAYMENT_METHODS) as Array<keyof typeof PAYMENT_METHODS>;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <BerandaNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-32 lg:pb-20">
        <CheckoutHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            {groupKeys.map((key) => {
              const group = PAYMENT_METHODS[key];
              return (
                <PaymentMethodGroup
                  key={key}
                  type={key}
                  label={group.label}
                  options={group.options}
                  selectedId={selectedMethod?.id ?? null}
                  isExpanded={expandedGroup === key}
                  onToggle={() => setExpandedGroup(expandedGroup === key ? null : key)}
                  onSelect={handleSelectMethod}
                />
              );
            })}
          </motion.div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-24">
              <OrderSummaryCheckout
                items={items}
                subtotal={subtotal}
                shipping={shippingCost}
                adminFee={adminFee}
                total={grandTotal}
                selectedMethod={selectedMethod}
                onPay={handlePay}
                isProcessing={isProcessing}
              />
            </div>
          </motion.div>
        </div>
      </main>

      <MobileBottomBar
        total={grandTotal}
        selectedMethod={selectedMethod}
        onPay={handlePay}
        isProcessing={isProcessing}
      />

      <Footer />
    </div>
  );
}