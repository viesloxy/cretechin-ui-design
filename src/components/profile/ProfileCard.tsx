"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Settings, UserPen, Sparkles } from "lucide-react";
import type { UserProfile } from "./types";
import { formatJoinDate, getRoleBadge, getFallbackAvatarUrl } from "./helpers";

interface ProfileCardProps {
  profile: UserProfile;
  isLoading?: boolean;
}

export default function ProfileCard({ profile, isLoading = false }: ProfileCardProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="lg:sticky lg:top-28">
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-7 space-y-5 animate-pulse">
          <div className="flex justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="space-y-2 text-center">
            <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3 mx-auto" />
            <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-full w-32 mx-auto mt-3" />
          </div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3 mx-auto" />
          <div className="space-y-2 pt-2">
            <div className="h-11 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            <div className="h-11 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="lg:sticky lg:top-28"
    >
      <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-7">
        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-black overflow-hidden bg-neutral-100 dark:bg-neutral-800 transition-transform duration-300 hover:scale-105">
            <Image
              src={profile.avatarUrl}
              alt={`Foto profil ${profile.name}`}
              fill
              sizes="112px"
              className="object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = getFallbackAvatarUrl(profile.name);
              }}
            />
          </div>
        </div>

        {/* Name + handle */}
        <div className="text-center space-y-1 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
            {profile.name}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-white/40">
            @{profile.name.toLowerCase().replace(/\s+/g, "")}
          </p>
        </div>

        {/* Role badge */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-neutral-900">
            <Sparkles className="w-3.5 h-3.5" />
            {getRoleBadge(profile.role)}
          </span>
        </div>

        {/* Join date */}
        <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-white/40 mb-6 pb-6 border-b border-black/5 dark:border-white/5">
          <Calendar className="w-4 h-4" />
          <span>{formatJoinDate(profile.joinDate)}</span>
        </div>

        {/* CTA buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => router.push("/settings")}
            className="w-full py-3 rounded-full bg-primary text-neutral-900 text-sm sm:text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Pengaturan Akun
          </button>
          <button
            type="button"
            onClick={() => router.push("/settings?tab=profile")}
            className="w-full py-3 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary text-sm sm:text-base font-semibold active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <UserPen className="w-4 h-4" />
            Edit Profil
          </button>
        </div>
      </div>
    </motion.div>
  );
}
