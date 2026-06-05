"use client";

import type { UserProfile } from "@/components/profile/types";

export type SettingsTabId =
  | "profile"
  | "password"
  | "privacy"
  | "notifications"
  | "region";

export interface ProfileFormData {
  name: string;
  username: string;
  bio: string;
  institution: string;
  jobTitle: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  website: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ProfileVisibility = "public" | "registered" | "private";
export type DirectMessagePolicy = "everyone" | "followers" | "none";

export interface PrivacyData {
  profileVisibility: ProfileVisibility;
  showActivityStatus: boolean;
  showStatsOnProfile: boolean;
  allowDirectMessages: DirectMessagePolicy;
  searchableByEmail: boolean;
}

export interface NotificationData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  courseUpdates: boolean;
  newMessages: boolean;
  promotionalEmails: boolean;
  eventReminders: boolean;
  weeklyDigest: boolean;
}

export type LanguageCode = "id" | "en";
export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
export type Currency = "IDR" | "USD";

export interface RegionData {
  language: LanguageCode;
  timezone: string;
  dateFormat: DateFormat;
  currency: Currency;
}

export interface UserSettings {
  privacy: PrivacyData;
  notifications: NotificationData;
  region: RegionData;
}

export type { UserProfile };
