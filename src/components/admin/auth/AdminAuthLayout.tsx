"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface AdminAuthLayoutProps {
  children: ReactNode;
}

export default function AdminAuthLayout({ children }: AdminAuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl p-8 md:p-10 shadow-lg shadow-black/5">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/Logo CreTechin.png"
                  alt="CreTechin"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-black dark:text-white">
                CreTechin
              </span>
            </Link>

            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-black dark:text-white mb-2">
                Admin Portal
              </h1>
              <p className="text-sm text-neutral-600 dark:text-white/50 max-w-xs">
                Masuk untuk mengelola platform CreTechin
              </p>
            </div>
          </div>

          {children}
        </div>

        <p className="text-center text-xs text-neutral-500 dark:text-white/40 mt-6">
          © 2026 CreTechin · Admin Panel
        </p>
      </motion.div>
    </div>
  );
}
