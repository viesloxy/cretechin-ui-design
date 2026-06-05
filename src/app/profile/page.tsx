"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { BerandaNavbar } from "@/components/beranda";
import { Footer } from "@/components/landing-page";
import {
  ProfileHeader,
  ProfileCard,
  ProfileInfoCard,
  ActivityStatsCard,
  ProfileErrorState,
  MOCK_USER_PROFILE,
} from "@/components/profile";
import type { UserProfile } from "@/components/profile";

/* ─────────────────────────── CONTENT ─────────────────────────── */

function ProfileContent() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [fetchKey, setFetchKey] = useState(0);

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) {
      router.push("/login?redirect=/profile");
    }
  }, [isAuthenticated, isAuthLoading, router]);

  // Simulate fetch profile
  useEffect(() => {
    if (!isAuthenticated || isAuthLoading) return;

    setIsDataLoading(true);
    setLoadError(false);
    const t = setTimeout(() => {
      // In real impl, fetch from /api/profile here.
      // For demo, use mock data.
      try {
        setProfile(MOCK_USER_PROFILE);
      } catch {
        setLoadError(true);
      } finally {
        setIsDataLoading(false);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [isAuthenticated, isAuthLoading, fetchKey]);

  // Show full-page spinner while auth is still resolving
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <BerandaNavbar />
      <ProfileHeader />

      <main className="flex-1 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          {loadError ? (
            <ProfileErrorState onRetry={() => setFetchKey((k) => k + 1)} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left: Profile Card (≈33%) */}
              <div className="lg:col-span-1">
                <ProfileCard
                  profile={
                    profile ?? {
                      ...MOCK_USER_PROFILE,
                      name: "",
                      bio: "",
                      institution: "",
                      location: "",
                      email: "",
                      joinDate: new Date().toISOString(),
                      stats: {
                        coursesEnrolled: 0,
                        certificatesEarned: 0,
                        assetsOwned: 0,
                        eventsAttended: 0,
                      },
                    }
                  }
                  isLoading={isDataLoading}
                />
              </div>

              {/* Right: Info + Activity (≈67%) */}
              <div className="lg:col-span-2 space-y-8 sm:space-y-10">
                <ProfileInfoCard
                  profile={profile ?? MOCK_USER_PROFILE}
                  isLoading={isDataLoading}
                />
                <ActivityStatsCard
                  stats={
                    profile?.stats ?? {
                      coursesEnrolled: 0,
                      certificatesEarned: 0,
                      assetsOwned: 0,
                      eventsAttended: 0,
                    }
                  }
                  isLoading={isDataLoading}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function ProfilePage() {
  return (
    <AuthProvider>
      <ProfileContent />
    </AuthProvider>
  );
}
