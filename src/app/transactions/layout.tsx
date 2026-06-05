import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Riwayat Transaksi | CreTechin",
  description:
    "Lihat semua catatan pembelian kursus, aset digital, dan tiket acara Anda di CreTechin.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Riwayat Transaksi | CreTechin",
    description: "Catatan kronologis semua transaksi Anda",
    type: "website",
  },
};

export default function TransactionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
