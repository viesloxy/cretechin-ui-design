"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface PaymentMethod {
  id: string;
  group: "ewallet" | "virtualaccount" | "creditcard";
  name: string;
  label: string;
  sublabel?: string;
  logo: string;
}

interface PaymentOptionProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentOption({ method, isSelected, onSelect }: PaymentOptionProps) {
  return (
    <motion.button
      onClick={() => onSelect(method)}
      whileHover={{ borderColor: "rgba(164, 214, 36, 0.3)" }}
      transition={{ duration: 0.2 }}
      className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all ${
        isSelected
          ? "border-2 border-primary bg-primary/5"
          : "border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 hover:border-primary/30"
      }`}
    >
      {/* Logo */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
        <Image
          src={method.logo}
          alt={method.label}
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white">
          {method.label}
        </p>
        {method.sublabel && (
          <p className="text-xs text-neutral-500 dark:text-white/50 mt-0.5">
            {method.sublabel}
          </p>
        )}
      </div>

      {/* Radio */}
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          isSelected
            ? "border-primary bg-primary"
            : "border-neutral-300 dark:border-neutral-600"
        }`}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-2 h-2 bg-white rounded-full"
          />
        )}
      </div>
    </motion.button>
  );
}
