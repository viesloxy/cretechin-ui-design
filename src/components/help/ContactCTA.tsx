"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Bolt, CircleDot, Clock } from "lucide-react";
import {
  WHATSAPP_NUMBER,
  SUPPORT_EMAIL,
  AVERAGE_RESPONSE_TIME,
  SUPPORT_AVAILABILITY,
} from "./constants";

interface ContactCTAProps {
  currentCategory?: string | null;
  userEmail?: string;
}

function buildWhatsAppUrl(currentCategory?: string | null): string {
  const categoryText = currentCategory
    ? `terkait ${currentCategory}`
    : "berikut";
  const text = `Halo CreTechin, saya butuh bantuan ${categoryText}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function buildEmailUrl(
  currentCategory?: string | null,
  userEmail?: string,
): string {
  const subject = currentCategory
    ? `Bantuan CreTechin - ${currentCategory}`
    : "Bantuan CreTechin";
  const bodyLines = [
    "Halo Tim CreTechin,",
    "",
    currentCategory
      ? `Saya ingin bertanya tentang ${currentCategory}.`
      : "Saya ingin bertanya tentang CreTechin.",
    "",
    "",
    "---",
    userEmail ? `Email: ${userEmail}` : null,
    `Tanggal: ${new Date().toISOString().slice(0, 10)}`,
  ].filter(Boolean);
  const body = bodyLines.join("\n");
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactCTA({
  currentCategory,
  userEmail,
}: ContactCTAProps) {
  return (
    <section
      aria-labelledby="contact-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-neutral-100/60 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 text-center"
      >
        <h2
          id="contact-heading"
          className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white"
        >
          Masih butuh bantuan?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-white/50 max-w-xl mx-auto">
          Tim support kami siap membantu Anda 24/7.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          <a
            href={buildWhatsAppUrl(currentCategory)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi support via WhatsApp"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi via WhatsApp
          </a>
          <a
            href={buildEmailUrl(currentCategory, userEmail)}
            aria-label="Kirim email ke support CreTechin"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary active:scale-95 transition-all text-sm font-semibold"
          >
            <Mail className="w-4 h-4" />
            Kirim Email
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-white/40">
          <span className="inline-flex items-center gap-1.5">
            <Bolt className="w-3.5 h-3.5" />
            Rata-rata respon: {AVERAGE_RESPONSE_TIME}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CircleDot className="w-3.5 h-3.5 text-primary" />
            Online: {SUPPORT_AVAILABILITY}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            {SUPPORT_EMAIL}
          </span>
        </div>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-white/30">
          <Clock className="w-3 h-3" />
          Update terakhir: hari ini
        </p>
      </motion.div>
    </section>
  );
}
