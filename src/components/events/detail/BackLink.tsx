"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  href?: string;
  label?: string;
}

export default function BackLink({
  href = "/events",
  label = "Kembali ke Daftar Acara",
}: BackLinkProps) {
  const router = useRouter();

  return (
    <section className="bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2 sm:pt-8 sm:pb-4">
        <button
          onClick={() => router.push(href)}
          className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-white/60 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{label}</span>
        </button>
      </div>
    </section>
  );
}
