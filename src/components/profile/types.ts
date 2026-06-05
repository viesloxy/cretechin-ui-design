// Types for Profile page (extends User from auth lib)

import type { User } from "@/lib/auth";

export type UserRole = "student" | "mentor" | "admin";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
}

export interface ProfileStats {
  coursesEnrolled: number;
  certificatesEarned: number;
  assetsOwned: number;
  eventsAttended: number;
}

export interface UserProfile extends User {
  id: string;
  joinDate: string; // ISO 8601
  bio: string;
  institution: string;
  jobTitle?: string;
  location: string;
  avatarUrl: string;

  phone?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;

  socialLinks?: SocialLinks;

  role: UserRole;
  isVerified: boolean;

  stats: ProfileStats;
}
