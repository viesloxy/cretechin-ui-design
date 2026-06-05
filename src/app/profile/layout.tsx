import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Saya | CreTechin",
  description:
    "Kelola informasi akun CreTechin Anda. Lihat bio, instansi, lokasi, sertifikat, dan aktivitas belajar di satu tempat.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Profil Saya | CreTechin",
    description: "Halaman profil pengguna CreTechin",
    type: "profile",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
