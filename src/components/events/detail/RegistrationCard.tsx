"use client";

import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Share2,
  LogIn,
  Radio,
  Users,
  Star,
} from "lucide-react";
import type { EventDetail } from "./types";

interface RegistrationCardProps {
  event: EventDetail;
  isRegistered: boolean;
  isLoading?: boolean;
  onRegister: () => void;
  onShare: () => void;
}

export default function RegistrationCard({
  event,
  isRegistered,
  isLoading = false,
  onRegister,
  onShare,
}: RegistrationCardProps) {
  const isFree = event.price === 0;
  const isLive = event.status === "live";
  const isCompleted = event.status === "completed";
  const isSoldOut =
    event.maxParticipants !== undefined &&
    event.currentParticipants !== undefined &&
    event.currentParticipants >= event.maxParticipants;

  // Quota calculation
  const remaining =
    event.maxParticipants !== undefined && event.currentParticipants !== undefined
      ? event.maxParticipants - event.currentParticipants
      : null;
  const quotaPercent =
    event.maxParticipants && event.currentParticipants !== undefined
      ? Math.min(100, Math.round((event.currentParticipants / event.maxParticipants) * 100))
      : 0;

  const quotaColorClass =
    remaining !== null && event.maxParticipants
      ? remaining / event.maxParticipants < 0.1
        ? "text-error"
        : remaining / event.maxParticipants < 0.3
        ? "text-warning"
        : "text-neutral-500 dark:text-white/40"
      : "text-neutral-500 dark:text-white/40";

  const renderPrimaryButton = () => {
    if (isCompleted) {
      return (
        <button
          disabled
          className="w-full py-3 rounded-full bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-white/40 text-sm sm:text-base font-semibold cursor-not-allowed"
        >
          Acara Telah Selesai
        </button>
      );
    }

    if (isSoldOut && !isRegistered) {
      return (
        <button
          disabled
          className="w-full py-3 rounded-full bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-white/40 text-sm sm:text-base font-semibold cursor-not-allowed"
        >
          Tiket Habis
        </button>
      );
    }

    if (isRegistered) {
      const handleJoin = () => {
        if (event.roomUrl) {
          window.open(event.roomUrl, "_blank", "noopener,noreferrer");
        }
      };
      return (
        <button
          onClick={handleJoin}
          className={`w-full py-3 rounded-full bg-primary text-neutral-900 text-sm sm:text-base font-semibold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 ${
            isLive ? "animate-pulse" : ""
          }`}
        >
          {isLive ? <Radio className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
          {isLive ? "Masuk ke Sesi — LIVE!" : "Masuk ke Sesi"}
        </button>
      );
    }

    return (
      <button
        onClick={onRegister}
        disabled={isLoading}
        className="w-full py-3 rounded-full bg-primary text-neutral-900 text-sm sm:text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-4 h-4" />
        {isLoading ? "Memproses..." : "Daftar Sekarang"}
      </button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="lg:sticky lg:top-28"
    >
      <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6">
        {/* Registered badge */}
        {isRegistered && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
            <Check className="w-3.5 h-3.5" />
            Anda terdaftar
          </div>
        )}

        {/* Price */}
        <div className="mb-1">
          {isFree ? (
            <p className="text-3xl sm:text-4xl font-bold text-primary">Gratis</p>
          ) : (
            <p className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              {event.priceDisplay}
            </p>
          )}
        </div>
        <p className="text-xs text-neutral-500 dark:text-white/40 mb-5">
          {isFree ? "Akses gratis untuk semua peserta" : "Harga sudah termasuk pajak"}
        </p>

        {/* Quota */}
        {remaining !== null && event.maxParticipants && !isCompleted && (
          <div className="mb-5">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className={`font-medium ${quotaColorClass}`}>
                Sisa {remaining} dari {event.maxParticipants} tiket
              </span>
              <span className="text-xs text-neutral-500 dark:text-white/40">
                {quotaPercent}%
              </span>
            </div>
            <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${quotaPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Primary CTA */}
        <div className="mb-3">{renderPrimaryButton()}</div>

        {/* Secondary share button */}
        <button
          onClick={onShare}
          className="w-full py-2.5 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary transition-colors text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Bagikan Tautan
        </button>

        {/* Benefits */}
        {event.benefits && event.benefits.length > 0 && (
          <div className="mt-5 pt-5 border-t border-black/5 dark:border-white/5">
            <p className="text-xs font-semibold text-neutral-700 dark:text-white/70 uppercase tracking-wide mb-3">
              Yang kamu dapatkan
            </p>
            <ul className="flex flex-col gap-2">
              {event.benefits.slice(0, 4).map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-neutral-600 dark:text-white/50"
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stats footer */}
        <div className="mt-5 pt-5 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-white/40">
            <Users className="w-3.5 h-3.5" />
            <span>{event.currentParticipants ?? 0} terdaftar</span>
          </div>
          {event.rating !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-white/40">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              <span>
                {event.rating.toFixed(1)}
                {event.totalReviews ? ` (${event.totalReviews})` : ""}
              </span>
            </div>
          )}
        </div>

        {/* Organizer footer */}
        <div className="mt-3 text-center">
          <p className="text-xs text-neutral-400 dark:text-white/30">
            Diselenggarakan oleh{" "}
            <span className="font-semibold text-neutral-600 dark:text-white/50">
              CreTechin
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
