"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";
import OrderDetailHeader from "@/components/order-detail/OrderDetailHeader";
import TimerBanner from "@/components/order-detail/TimerBanner";
import PaymentInfoCard from "@/components/order-detail/PaymentInfoCard";
import VANumberCard from "@/components/order-detail/VANumberCard";
import EWalletQRCard from "@/components/order-detail/EWalletQRCard";
import CardForm from "@/components/order-detail/CardForm";
import PaymentInstructions from "@/components/order-detail/PaymentInstructions";
import PaymentSuccess from "@/components/order-detail/PaymentSuccess";
import ConfirmButton from "@/components/order-detail/ConfirmButton";
import { useCart } from "@/context/CartContext";

interface OrderItem {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  price: number;
  badge?: string;
}

interface PaymentMethodInfo {
  id: string;
  label: string;
  type: "ewallet" | "virtualaccount" | "creditcard";
  name: string;
}

const METHOD_MAP: Record<string, PaymentMethodInfo> = {
  gopay:     { id: "gopay",      label: "GoPay",             type: "ewallet",       name: "GoPay" },
  ovo:       { id: "ovo",        label: "OVO",               type: "ewallet",       name: "OVO" },
  dana:      { id: "dana",       label: "DANA",              type: "ewallet",       name: "DANA" },
  shopeepay: { id: "shopeepay",  label: "ShopeePay",         type: "ewallet",       name: "ShopeePay" },
  bca_va:    { id: "bca_va",     label: "BCA Virtual Account", type: "virtualaccount", name: "BCA VA" },
  mandiri_va: { id: "mandiri_va", label: "Mandiri Virtual Account", type: "virtualaccount", name: "Mandiri VA" },
  bni_va:    { id: "bni_va",     label: "BNI Virtual Account", type: "virtualaccount", name: "BNI VA" },
  visa:      { id: "visa",       label: "Visa",              type: "creditcard",    name: "Visa" },
  mastercard: { id: "mastercard", label: "Mastercard",        type: "creditcard",    name: "Mastercard" },
};

const VA_MOCK_NUMBERS: Record<string, string> = {
  bca_va:     "8901 2345 6789 0123 4567",
  mandiri_va: "8900 1234 5678 9012 3456",
  bni_va:     "8801 2345 6789 0123 4567",
};

const SHIPPING_COST = 15000;

type PaymentStatus = "pending" | "paid";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id: orderId } = params;
  const searchParams = useSearchParams();
  const { items, getSubtotal, clearCart } = useCart();

  const methodId = searchParams.get("method") ?? "";
  const method = METHOD_MAP[methodId] ?? null;

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const subtotal = getSubtotal();
  const total = subtotal + SHIPPING_COST;

  // 24 hours from now
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const orderItems: OrderItem[] = items.length > 0
    ? items.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle ?? "",
        thumbnail: item.thumbnail ?? "",
        price: item.price,
        badge: item.badge ?? undefined,
      }))
    : [
        { id: "checkout-demo-1", title: "Mastering React & Next.js 14", subtitle: "Budi Santoso", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400", price: 299000, badge: "Program Belajar" },
        { id: "checkout-demo-2", title: "Premium Icon Set - 1000+ Icons", subtitle: "IconFactory", thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400", price: 99000, badge: "Aset Digital" },
      ];

  const handleExpired = () => {
    setIsExpired(true);
  };

  const handleConfirm = async () => {
    if (!method) return;
    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setPaymentStatus("paid");
    clearCart();
  };

  const handleCardSubmit = async (data: { cardNumber: string; expiry: string; cvv: string; cardName: string; saveCard: boolean }) => {
    console.log("Card data submitted:", data);
    await handleConfirm();
  };

  if (!method) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <BerandaNavbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-neutral-500 dark:text-white/50 mb-4">
            Metode pembayaran tidak valid atau tidak ditemukan.
          </p>
          <a
            href="/checkout"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            &larr; Kembali ke Pembayaran
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <BerandaNavbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-32 sm:pb-12">
        <OrderDetailHeader />

        {/* Timer Banner */}
        {!isExpired && paymentStatus === "pending" && (
          <TimerBanner expiresAt={expiresAt} onExpired={handleExpired} />
        )}

        {/* Expired State */}
        {isExpired && paymentStatus !== "paid" && (
          <div className="mb-6 p-4 rounded-xl border border-error/30 bg-error/5">
            <p className="text-sm font-semibold text-error text-center">
              Waktu pembayaran telah habis. Pesanan secara otomatis dibatalkan.
            </p>
            <a
              href="/transactions"
              className="block mt-3 text-center text-sm text-neutral-500 hover:text-primary transition-colors"
            >
              Lihat Riwayat Transaksi
            </a>
          </div>
        )}

        {/* Success State */}
        {paymentStatus === "paid" ? (
          <PaymentSuccess
            amount={total}
            methodName={method.label}
            orderId={orderId}
            items={orderItems}
            subtotal={subtotal}
            shipping={SHIPPING_COST}
          />
        ) : (
          <>
            {/* Payment Info Card */}
            <PaymentInfoCard
              amount={total}
              method={{ id: method.id, label: method.label }}
              orderId={orderId}
            />

            {/* Method-specific content */}
            {method.type === "virtualaccount" && (
              <VANumberCard
                number={VA_MOCK_NUMBERS[methodId] ?? "8901 2345 6789 0123 4567"}
                bankName={method.label}
                amount={total}
              />
            )}

            {method.type === "ewallet" && (
              <EWalletQRCard
                name={method.name}
                amount={total}
              />
            )}

            {method.type === "creditcard" && (
              <CardForm onSubmit={handleCardSubmit} isLoading={isLoading} />
            )}

            {/* Instructions */}
            <PaymentInstructions methodType={method.type} />

            {/* Confirm Button */}
            <div className="sm:hidden">
              {/* spacer for sticky button */}
              <div className="h-20" />
            </div>
            <ConfirmButton
              onConfirm={handleConfirm}
              isLoading={isLoading}
              disabled={isExpired}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
