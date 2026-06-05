"use client";

import { MOCK_USER_PROFILE } from "@/components/profile/mockData";
import type {
  ProfileFormData,
  PrivacyData,
  NotificationData,
  RegionData,
  UserSettings,
} from "./types";

export const INITIAL_PROFILE_FORM: ProfileFormData = {
  name: MOCK_USER_PROFILE.name,
  username: MOCK_USER_PROFILE.name
    .toLowerCase()
    .replace(/\s+/g, ""),
  bio: MOCK_USER_PROFILE.bio,
  institution: MOCK_USER_PROFILE.institution,
  jobTitle: MOCK_USER_PROFILE.jobTitle ?? "",
  location: MOCK_USER_PROFILE.location,
  github: MOCK_USER_PROFILE.socialLinks?.github ?? "",
  linkedin: MOCK_USER_PROFILE.socialLinks?.linkedin ?? "",
  instagram: MOCK_USER_PROFILE.socialLinks?.instagram ?? "",
  twitter: MOCK_USER_PROFILE.socialLinks?.twitter ?? "",
  website: MOCK_USER_PROFILE.socialLinks?.website ?? "",
};

export const INITIAL_AVATAR_URL = MOCK_USER_PROFILE.avatarUrl;
export const DEFAULT_AVATAR_URL = "/images/avatar-4.jpeg";

export const DEFAULT_PRIVACY: PrivacyData = {
  profileVisibility: "public",
  showActivityStatus: true,
  showStatsOnProfile: true,
  allowDirectMessages: "followers",
  searchableByEmail: false,
};

export const DEFAULT_NOTIFICATIONS: NotificationData = {
  emailNotifications: true,
  pushNotifications: true,
  courseUpdates: true,
  newMessages: true,
  promotionalEmails: false,
  eventReminders: true,
  weeklyDigest: false,
};

export const DEFAULT_REGION: RegionData = {
  language: "id",
  timezone: "Asia/Jakarta",
  dateFormat: "DD/MM/YYYY",
  currency: "IDR",
};

export const INITIAL_USER_SETTINGS: UserSettings = {
  privacy: DEFAULT_PRIVACY,
  notifications: DEFAULT_NOTIFICATIONS,
  region: DEFAULT_REGION,
};

export const TIMEZONE_OPTIONS: { value: string; label: string }[] = [
  { value: "Asia/Jakarta", label: "WIB (Asia/Jakarta)" },
  { value: "Asia/Makassar", label: "WITA (Asia/Makassar)" },
  { value: "Asia/Jayapura", label: "WIT (Asia/Jayapura)" },
  { value: "Asia/Singapore", label: "SGT (Asia/Singapore)" },
  { value: "Asia/Kuala_Lumpur", label: "MYT (Asia/Kuala_Lumpur)" },
  { value: "UTC", label: "UTC" },
];

export const LANGUAGE_OPTIONS: { value: "id" | "en"; label: string }[] = [
  { value: "id", label: "Bahasa Indonesia" },
  { value: "en", label: "English" },
];

export const CURRENCY_OPTIONS: { value: "IDR" | "USD"; label: string }[] = [
  { value: "IDR", label: "IDR (Rp)" },
  { value: "USD", label: "USD ($)" },
];

export const DATE_FORMAT_OPTIONS: { value: string; label: string }[] = [
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY (31/12/2026)" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY (12/31/2026)" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD (2026-12-31)" },
];

export const VISIBILITY_OPTIONS: {
  value: "public" | "registered" | "private";
  label: string;
  description: string;
}[] = [
  {
    value: "public",
    label: "Publik",
    description: "Siapa saja dapat melihat profil Anda",
  },
  {
    value: "registered",
    label: "User Terdaftar",
    description: "Hanya pengguna CreTechin yang dapat melihat",
  },
  {
    value: "private",
    label: "Hanya Saya",
    description: "Profil sepenuhnya privat",
  },
];

export const DM_OPTIONS: {
  value: "everyone" | "followers" | "none";
  label: string;
}[] = [
  { value: "everyone", label: "Semua pengguna" },
  { value: "followers", label: "Hanya pengikut saya" },
  { value: "none", label: "Tidak ada" },
];

export const PROFILE_VALIDATION = {
  name: { required: true, minLength: 2, maxLength: 100 },
  username: {
    required: false,
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  bio: { required: false, maxLength: 500 },
  institution: { required: true, minLength: 2, maxLength: 100 },
  jobTitle: { required: false, maxLength: 50 },
  location: { required: true, minLength: 2, maxLength: 100 },
} as const;

export const PASSWORD_VALIDATION = {
  currentPassword: { required: true },
  newPassword: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  },
  confirmPassword: { required: true, mustMatch: "newPassword" },
} as const;

export const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
export const AVATAR_VALID_FORMATS = ["image/jpeg", "image/png", "image/webp"];
export const MAX_BIO_LENGTH = 500;
