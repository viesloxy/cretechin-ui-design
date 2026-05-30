"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import PaymentMethodGroup from "@/components/checkout/PaymentMethodGroup";
import OrderSummaryCheckout from "@/components/checkout/OrderSummaryCheckout";
import MobileBottomBar from "@/components/checkout/MobileBottomBar";
import { useCart } from "@/context/CartContext";
import type { PaymentMethod } from "@/components/checkout/PaymentMethodGroup";

const PAYMENT_METHODS = [
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

const SHIPPING_COST = 15000;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string>("");

  const subtotal = getSubtotal();
  const total = subtotal + SHIPPING_COST;

  const handleSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleToggle = (type: string) => {
    setExpandedGroup((prev) => (prev === type ? "" : type));
  };

  const handlePay = () => {
    if (!selectedMethod) return;
    const orderId = `ORD-${Date.now()}`;
    router.push(`/orders/${orderId}?method=${selectedMethod.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <BerandaNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-neutral-500 dark:text-white/50">Keranjang Anda kosong.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <BerandaNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-32 lg:pb-12">
        <CheckoutHeader />

        {/* Mobile: Order Summary di atas */}
        <div className="lg:hidden mb-6">
          <OrderSummaryCheckout
            items={items}
            subtotal={subtotal}
            shipping={SHIPPING_COST}
            total={total}
            selectedMethod={selectedMethod}
            onPay={handlePay}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Payment Methods */}
          <div className="lg:col-span-2 space-y-4">
            {PAYMENT_METHODS.map((group) => (
              <PaymentMethodGroup
                key={group.type}
                type={group.type}
                label={group.label}
                options={group.options}
                selectedId={selectedMethod?.id ?? null}
                isExpanded={expandedGroup === group.type}
                onToggle={() => handleToggle(group.type)}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Right: Order Summary (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <OrderSummaryCheckout
                items={items}
                subtotal={subtotal}
                shipping={SHIPPING_COST}
                total={total}
                selectedMethod={selectedMethod}
                onPay={handlePay}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <MobileBottomBar
        total={total}
        selectedMethod={selectedMethod}
        onPay={handlePay}
      />

      <Footer />
    </div>
  );
}
