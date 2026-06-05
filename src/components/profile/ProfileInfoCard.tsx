"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
} from "lucide-react";
import FieldCard from "./FieldCard";
import type { SocialLinks, UserProfile } from "./types";
import { normalizeSocialUrl } from "./helpers";

interface ProfileInfoCardProps {
  profile: UserProfile;
  isLoading?: boolean;
}

const PLATFORM_META: Array<{
  key: keyof SocialLinks;
  label: string;
  Icon: typeof Github;
  testId: string;
}> = [
  { key: "github", label: "GitHub", Icon: Github, testId: "github" },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin, testId: "linkedin" },
  { key: "instagram", label: "Instagram", Icon: Instagram, testId: "instagram" },
  { key: "twitter", label: "Twitter", Icon: Twitter, testId: "twitter" },
  { key: "website", label: "Website", Icon: Globe, testId: "website" },
];

export default function ProfileInfoCard({
  profile,
  isLoading = false,
}: ProfileInfoCardProps) {
  if (isLoading) {
    return (
      <div className="space-y-8 sm:space-y-10">
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 md:p-7 shadow-lg space-y-5 animate-pulse">
          <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
            <div className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
            <div className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
          </div>
          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
          <div className="space-y-3">
            <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-40" />
            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 md:p-7 shadow-lg space-y-4 animate-pulse">
          <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-40" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
            <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
            <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
            <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const hasSocial = profile.socialLinks &&
    Object.values(profile.socialLinks).some((v) => v && v.length > 0);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Main info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-7"
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-1">
          Informasi Pribadi
        </h3>
        <p className="text-sm text-neutral-500 dark:text-white/40 mb-5">
          Ringkasan biodata dan kontak yang ditampilkan di profil publik Anda.
        </p>

        {/* Top field cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <FieldCard
              label="Tentang Saya"
              icon={<FileText className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />}
              value={profile.bio}
              isEmpty={!profile.bio}
              emptyText="Belum menambahkan bio"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <FieldCard
              label={profile.jobTitle ? "Instansi / Pekerjaan" : "Instansi"}
              icon={<Building2 className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />}
              value={
                profile.jobTitle
                  ? `${profile.institution} · ${profile.jobTitle}`
                  : profile.institution
              }
              isEmpty={!profile.institution}
              emptyText="Belum menambahkan instansi"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <FieldCard
              label="Lokasi"
              icon={<MapPin className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />}
              value={profile.location}
              isEmpty={!profile.location}
              emptyText="Belum menambahkan lokasi"
            />
          </motion.div>
        </div>

        <div className="h-px bg-black/5 dark:bg-white/5 mb-5" />

        {/* Email + phone rows */}
        <div className="space-y-3 mb-5">
          <FieldCard
            label="Email"
            icon={<Mail className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />}
            value={profile.email}
            verified={profile.emailVerified}
          />
          <FieldCard
            label="Nomor Telepon"
            icon={<Phone className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />}
            value={profile.phone}
            verified={profile.phoneVerified}
            isEmpty={!profile.phone}
            emptyText="Belum menambahkan nomor telepon"
          />
        </div>

        <div className="h-px bg-black/5 dark:bg-white/5 mb-5" />

        {/* Social links */}
        <div>
          <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
            Social Links
          </h4>
          {hasSocial ? (
            <div className="flex flex-wrap gap-2">
              {PLATFORM_META.map(({ key, label, Icon, testId }) => {
                const raw = profile.socialLinks?.[key];
                if (!raw) return null;
                const href = normalizeSocialUrl(key, raw);
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} profil ${profile.name}`}
                    data-testid={`social-${testId}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/50 hover:text-primary hover:border-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 dark:text-white/40 italic">
              Belum menambahkan social links.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
