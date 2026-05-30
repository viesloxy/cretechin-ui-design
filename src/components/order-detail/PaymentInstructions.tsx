"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface InstructionGroup {
  title: string;
  steps: string[];
}

interface PaymentInstructionsProps {
  methodType: "ewallet" | "virtualaccount" | "creditcard";
}

const VA_INSTRUCTIONS: InstructionGroup[] = [
  {
    title: "ATM",
    steps: [
      "Masukkan kartu ATM dan PIN Anda",
      "Pilih menu \"Transfer\"",
      "Pilih \"Transfer ke Virtual Account\"",
      "Masukkan nomor Virtual Account",
      "Periksa detail pembayaran, konfirmasi dengan PIN",
      "Simpan bukti transaksi",
    ],
  },
  {
    title: "Mobile Banking",
    steps: [
      "Buka aplikasi mobile banking di smartphone Anda",
      "Login ke akun Anda",
      "Pilih menu \"Transfer\" → \"Virtual Account\"",
      "Masukkan nomor Virtual Account",
      "Periksa detail, masukkan PIN atau mToken",
      "Transaksi berhasil",
    ],
  },
  {
    title: "Internet Banking",
    steps: [
      "Buka website bank melalui browser",
      "Login dengan akun internet banking Anda",
      "Pilih menu \"Transfer\" → \"Virtual Account\"",
      "Masukkan nomor Virtual Account",
      "Verifikasi dengan OTP atau mToken",
      "Simpan bukti transfer",
    ],
  },
];

const EWALLET_INSTRUCTIONS: InstructionGroup[] = [
  {
    title: "Scan QR",
    steps: [
      "Buka aplikasi e-wallet di smartphone Anda",
      "Pilih menu \"Scan QR\" atau \"Bayar\"",
      "Arahkan kamera ke QR Code di atas",
      "Periksa nominal yang muncul",
      "Masukkan PIN atau konfirmasi di aplikasi",
      "Pembayaran berhasil, simpan bukti",
    ],
  },
];

const CARD_INSTRUCTIONS: InstructionGroup[] = [
  {
    title: "Petunjuk Pembayaran",
    steps: [
      "Masukkan nomor kartu kredit/debit Anda",
      "Masukkan masa berlaku kartu (bulan/tahun)",
      "Masukkan CVV (3 digit di belakang kartu)",
      "Masukkan nama sesuai di kartu",
      "Klik \"Konfirmasi Pembayaran\" untuk memproses",
      "Simpan bukti transaksi",
    ],
  },
];

export default function PaymentInstructions({ methodType }: PaymentInstructionsProps) {
  const instructions =
    methodType === "ewallet"
      ? EWALLET_INSTRUCTIONS
      : methodType === "creditcard"
      ? CARD_INSTRUCTIONS
      : VA_INSTRUCTIONS;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg mb-6">
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-black/5 dark:border-white/10">
        <h2 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
          Instruksi Pembayaran
        </h2>
      </div>

      <div className="divide-y divide-black/5 dark:divide-white/10">
        {instructions.map((group, gIndex) => (
          <div key={group.title}>
            <button
              onClick={() => toggle(gIndex)}
              className="w-full flex items-center justify-between px-5 sm:px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
            >
              <span className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                {group.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                  openIndex === gIndex ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {openIndex === gIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-4">
                    <ol className="space-y-2">
                      {group.steps.map((step, sIndex) => (
                        <li key={sIndex} className="flex gap-3 text-sm text-neutral-600 dark:text-white/50">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                            {sIndex + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
