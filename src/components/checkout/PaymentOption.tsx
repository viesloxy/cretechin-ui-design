"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import type { PaymentMethod } from "./PaymentMethodGroup";

interface PaymentOptionProps {
  option: PaymentMethod;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PaymentOption({ option, isSelected, onSelect }: PaymentOptionProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all cursor-pointer text-left ${
        isSelected
          ? "border-2 border-primary bg-primary/5 dark:bg-primary/10"
          : "border border-black/5 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30"
      }`}
      aria-pressed={isSelected}
    >
      {/* Logo */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-black/5 dark:border-white/10 overflow-hidden flex-shrink-0">
        <Image
          src={option.logo}
          alt={option.label}
          width={48}
          height={48}
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white">
          {option.label}
        </p>
        {option.sublabel && (
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-white/50 mt-0.5">
            {option.sublabel}
          </p>
        )}
      </div>

      {/* Radio Indicator */}
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          isSelected
            ? "border-primary bg-primary"
            : "border-neutral-300 dark:border-neutral-600"
        }`}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="w-3 h-3 text-neutral-900" strokeWidth={3} />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}