"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center px-4 py-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-center mb-8">
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
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white mb-2">
              {title}
            </h1>
            <p className="text-sm text-neutral-600 dark:text-white/50">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
}