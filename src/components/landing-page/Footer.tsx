"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  produk: [
    { label: "Kursus", href: "/courses" },
    { label: "Aset Digital", href: "/marketplace" },
    { label: "Jalur Karir", href: "/careers" },
    { label: "Event", href: "/events" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Karir", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Kontak", href: "/contact" },
  ],
  legal: [
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Syarat & Ketentuan", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-neutral-50 dark:bg-black border-t border-black/10 dark:border-white/10 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/Logo CreTechin.png"
                  alt="CreTechin"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight">CreTechin</span>
            </Link>
            <p className="text-sm mb-6 max-w-sm text-neutral-600 dark:text-white/50">
              Platform belajar dan marketplace kreatif untuk generasi muda Indonesia. Belajar, berkarya, dan berkembang bersama komunitas terbaik.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-900 hover:bg-primary/20 flex items-center justify-center transition-colors border border-black/10 dark:border-white/10"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-neutral-600 dark:text-white/50" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-900 hover:bg-primary/20 flex items-center justify-center transition-colors border border-black/10 dark:border-white/10"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-neutral-600 dark:text-white/50" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-900 hover:bg-primary/20 flex items-center justify-center transition-colors border border-black/10 dark:border-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-neutral-600 dark:text-white/50" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-900 hover:bg-primary/20 flex items-center justify-center transition-colors border border-black/10 dark:border-white/10"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-neutral-600 dark:text-white/50" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Produk</h4>
            <ul className="space-y-3">
              {footerLinks.produk.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-600 dark:text-white/50">
              2026 CreTechin. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                Kontak
              </Link>
              <Link href="/faq" className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                FAQ
              </Link>
              <Link href="/help" className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                Bantuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}