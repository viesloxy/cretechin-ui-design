"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wallet, Building2, CreditCard } from "lucide-react";
import PaymentOption from "./PaymentOption";

export interface PaymentMethod {
  id: string;
  group: "ewallet" | "virtualaccount" | "creditcard";
  name: string;
  label: string;
  sublabel?: string;
  logo: string;
  fee?: number;
}

interface PaymentMethodGroupProps {
  type: "ewallet" | "virtualaccount" | "creditcard";
  label: string;
  options: PaymentMethod[];
  selectedId: string | null;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: (method: PaymentMethod) => void;
}

const GROUP_ICONS = {
  ewallet: Wallet,
  virtualaccount: Building2,
  creditcard: CreditCard,
};

const GROUP_ANIMATIONS = {
  ewallet: { accent: "text-neutral-600 dark:text-white", bg: "bg-neutral-100 dark:bg-neutral-800" },
  virtualaccount: { accent: "text-neutral-600 dark:text-white", bg: "bg-neutral-100 dark:bg-neutral-800" },
  creditcard: { accent: "text-neutral-600 dark:text-white", bg: "bg-neutral-100 dark:bg-neutral-800" },
};

export default function PaymentMethodGroup({
  type,
  label,
  options,
  selectedId,
  isExpanded,
  onToggle,
  onSelect,
}: PaymentMethodGroupProps) {
  const Icon = GROUP_ICONS[type];
  const colors = GROUP_ANIMATIONS[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900"
    >
      {/* Group Header (Accordion Trigger) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg}`}>
            <Icon className={`w-5 h-5 ${colors.accent}`} />
          </div>
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
              {label}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-white/50">
              {options.length} metode
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expandable Options */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 sm:px-4 sm:pb-4 space-y-2">
              {options.map((option) => (
                <PaymentOption
                  key={option.id}
                  option={option}
                  isSelected={selectedId === option.id}
                  onSelect={() => onSelect(option)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}