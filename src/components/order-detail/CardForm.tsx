"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import Image from "next/image";

interface CardFormProps {
  onSubmit: (data: CardFormData) => void;
  isLoading?: boolean;
}

export interface CardFormData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
  saveCard: boolean;
}

interface CardFormErrors {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  cardName?: string;
}

function formatCardNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) {
    return digits.slice(0, 2) + "/" + digits.slice(2);
  }
  return digits;
}

export default function CardForm({ onSubmit, isLoading }: CardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [errors, setErrors] = useState<CardFormErrors>({});

  const validate = (): boolean => {
    const newErrors: CardFormErrors = {};
    const rawCard = cardNumber.replace(/\s/g, "");
    if (rawCard.length < 16) newErrors.cardNumber = "Nomor kartu harus 16 digit";
    const expiryParts = expiry.split("/");
    if (expiryParts.length !== 2 || expiryParts[0].length < 2 || expiryParts[1].length < 2)
      newErrors.expiry = "Masa berlaku tidak valid (MM/YY)";
    if (cvv.length < 3) newErrors.cvv = "CVV harus 3-4 digit";
    if (cardName.trim().length < 2) newErrors.cardName = "Nama harus diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ cardNumber, expiry, cvv, cardName, saveCard });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg mb-6">
      <div className="flex items-center gap-3 mb-5">
<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-black/5 dark:border-white/10 overflow-hidden bg-neutral-50 dark:bg-neutral-800 flex-shrink-0">
          <Image
            src="/images/payment1.svg"
            alt="Kartu Kredit/Debit"
            width={48}
            height={48}
            className="w-full h-full object-contain p-1.5"
          />
        </div>
        <div>
          <p className="text-sm text-neutral-500 dark:text-white/50">Pembayaran via</p>
          <p className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">Kartu Kredit/Debit</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-white/80 mb-1.5">
            Nomor Kartu
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              inputMode="numeric"
              className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm font-medium bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none transition-colors ${
                errors.cardNumber
                  ? "border-error focus:border-error"
                  : "border-black/10 dark:border-white/10 focus:border-primary"
              }`}
            />
          </div>
          {errors.cardNumber && <p className="text-xs text-error mt-1">{errors.cardNumber}</p>}
        </div>

        {/* Expiry + CVV Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-white/80 mb-1.5">
              Masa Berlaku
            </label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              inputMode="numeric"
              className={`w-full px-4 py-3.5 rounded-xl border text-sm font-medium bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none transition-colors ${
                errors.expiry
                  ? "border-error focus:border-error"
                  : "border-black/10 dark:border-white/10 focus:border-primary"
              }`}
            />
            {errors.expiry && <p className="text-xs text-error mt-1">{errors.expiry}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-white/80 mb-1.5">
              CVV
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="***"
                inputMode="numeric"
                className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm font-medium bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none transition-colors ${
                  errors.cvv
                    ? "border-error focus:border-error"
                    : "border-black/10 dark:border-white/10 focus:border-primary"
                }`}
              />
            </div>
            {errors.cvv && <p className="text-xs text-error mt-1">{errors.cvv}</p>}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-white/80 mb-1.5">
            Nama pada Kartu
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            placeholder="NAMA SESUAI DI KARTU"
            className={`w-full px-4 py-3.5 rounded-xl border text-sm font-medium bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none transition-colors uppercase ${
              errors.cardName
                ? "border-error focus:border-error"
                : "border-black/10 dark:border-white/10 focus:border-primary"
            }`}
          />
          {errors.cardName && <p className="text-xs text-error mt-1">{errors.cardName}</p>}
        </div>

        {/* Save Card Toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-neutral-600 dark:text-white/50">
            Simpan kartu ini untuk transaksi berikutnya
          </span>
        </label>

        {/* Security Badge */}
        <div className="flex items-center gap-1.5 text-xs text-income font-medium pt-1">
          <Lock className="w-4 h-4" />
          <span>Pembayaran dijamin aman</span>
        </div>
      </div>
    </form>
  );
}
