import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Pengaturan Akun | CreTechin",
  description:
    "Kelola profil, kata sandi, privasi, notifikasi, dan preferensi akun CreTechin Anda.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Pengaturan Akun | CreTechin",
    description: "Halaman pengaturan akun CreTechin",
    type: "website",
  },
};

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
