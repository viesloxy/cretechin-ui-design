"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { BerandaNavbar } from "@/components/beranda";
import { Footer } from "@/components/landing-page";
import { useToast } from "@/components/ui/Toast";
import {
  SettingsHeader,
  SettingsTabs,
  SettingsTabsMobile,
  ProfileEditForm,
  PasswordChangeForm,
  PrivacySettings,
  NotificationSettings,
  RegionSettings,
  SettingsSkeleton,
  INITIAL_PROFILE_FORM,
  INITIAL_USER_SETTINGS,
  DEFAULT_AVATAR_URL,
} from "@/components/settings";
import { MOCK_USER_PROFILE } from "@/components/profile";
import type {
  SettingsTabId,
  ProfileFormData,
  PrivacyData,
  NotificationData,
  RegionData,
  PasswordChangeData,
} from "@/components/settings";

const VALID_TABS: SettingsTabId[] = [
  "profile",
  "password",
  "privacy",
  "notifications",
  "region",
];

function SettingsContent() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [fetchKey, setFetchKey] = useState(0);
  const [savingTab, setSavingTab] = useState<SettingsTabId | null>(null);

  // Read tab from URL
  const tabFromUrl = (searchParams.get("tab") as SettingsTabId) || "profile";
  const activeTab: SettingsTabId = VALID_TABS.includes(tabFromUrl)
    ? tabFromUrl
    : "profile";

  // Settings state (privacy, notifications, region)
  const [privacy, setPrivacy] = useState<PrivacyData>(
    INITIAL_USER_SETTINGS.privacy,
  );
  const [notifications, setNotifications] = useState<NotificationData>(
    INITIAL_USER_SETTINGS.notifications,
  );
  const [region, setRegion] = useState<RegionData>(
    INITIAL_USER_SETTINGS.region,
  );

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) {
      const redirect = activeTab !== "profile" ? `?redirect=/settings?tab=${activeTab}` : "?redirect=/settings";
      router.push(`/login${redirect}`);
    }
  }, [isAuthenticated, isAuthLoading, router, activeTab]);

  // Simulate fetch
  useEffect(() => {
    if (!isAuthenticated || isAuthLoading) return;
    setIsDataLoading(true);
    const t = setTimeout(() => setIsDataLoading(false), 500);
    return () => clearTimeout(t);
  }, [isAuthenticated, isAuthLoading, fetchKey]);

  // Tab change handler
  const handleTabChange = useCallback(
    (tab: SettingsTabId) => {
      if (tab === activeTab) return;
      router.replace(`/settings?tab=${tab}`, { scroll: false });
    },
    [router, activeTab],
  );

  // Save handlers (mock)
  const handleProfileSave = async (_data: ProfileFormData, _avatarUrl: string | null) => {
    setSavingTab("profile");
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Perubahan profil berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan. Coba lagi.");
    } finally {
      setSavingTab(null);
    }
  };

  const handlePasswordSave = async (_data: PasswordChangeData) => {
    setSavingTab("password");
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Kata sandi berhasil diperbarui");
    } catch {
      toast.error("Gagal memperbarui kata sandi");
    } finally {
      setSavingTab(null);
    }
  };

  const handlePrivacySave = async (data: PrivacyData) => {
    setSavingTab("privacy");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setPrivacy(data);
      toast.success("Pengaturan privasi disimpan");
    } catch {
      toast.error("Gagal menyimpan. Coba lagi.");
    } finally {
      setSavingTab(null);
    }
  };

  const handleNotificationSave = async (data: NotificationData) => {
    setSavingTab("notifications");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setNotifications(data);
      toast.success("Pengaturan notifikasi disimpan");
    } catch {
      toast.error("Gagal menyimpan. Coba lagi.");
    } finally {
      setSavingTab(null);
    }
  };

  const handleRegionSave = async (data: RegionData) => {
    setSavingTab("region");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setRegion(data);
      toast.success("Pengaturan bahasa & region disimpan");
    } catch {
      toast.error("Gagal menyimpan. Coba lagi.");
    } finally {
      setSavingTab(null);
    }
  };

  // Full-page spinner while auth is resolving
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
      <SettingsHeader />

      <main className="flex-1 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Mobile tabs (horizontal scroll) */}
          <div className="lg:hidden mb-4">
            <SettingsTabsMobile
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {isDataLoading ? (
            <SettingsSkeleton />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
              {/* Sidebar tabs (desktop) */}
              <div className="hidden lg:block lg:col-span-1">
                <SettingsTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  avatarUrl={DEFAULT_AVATAR_URL}
                  userName={MOCK_USER_PROFILE.name}
                />
              </div>

              {/* Tab content */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.section
                    key={activeTab}
                    role="tabpanel"
                    id={`panel-${activeTab}`}
                    aria-labelledby={`tab-${activeTab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {activeTab === "profile" && (
                      <ProfileEditForm
                        initialValues={INITIAL_PROFILE_FORM}
                        initialAvatar={MOCK_USER_PROFILE.avatarUrl}
                        userEmail={MOCK_USER_PROFILE.email}
                        userPhone={MOCK_USER_PROFILE.phone}
                        isEmailVerified={MOCK_USER_PROFILE.emailVerified ?? false}
                        isPhoneVerified={MOCK_USER_PROFILE.phoneVerified ?? false}
                        onSave={handleProfileSave}
                        onRequestCancel={() => {}}
                        isSaving={savingTab === "profile"}
                      />
                    )}
                    {activeTab === "password" && (
                      <PasswordChangeForm
                        onSubmit={handlePasswordSave}
                        isSaving={savingTab === "password"}
                      />
                    )}
                    {activeTab === "privacy" && (
                      <PrivacySettings
                        initialValues={privacy}
                        onSave={handlePrivacySave}
                        isSaving={savingTab === "privacy"}
                      />
                    )}
                    {activeTab === "notifications" && (
                      <NotificationSettings
                        initialValues={notifications}
                        onSave={handleNotificationSave}
                        isSaving={savingTab === "notifications"}
                      />
                    )}
                    {activeTab === "region" && (
                      <RegionSettings
                        initialValues={region}
                        onSave={handleRegionSave}
                        isSaving={savingTab === "region"}
                      />
                    )}
                  </motion.section>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AuthProvider>
      <Suspense fallback={null}>
        <SettingsContent />
      </Suspense>
    </AuthProvider>
  );
}
