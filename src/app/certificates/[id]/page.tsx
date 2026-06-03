"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";
import CertificatePreview from "@/components/certificate/CertificatePreview";
import CertificateInfo from "@/components/certificate/CertificateInfo";

// Types
interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  recipientName: string;
  completionDate: string;
  issuedAt: string;
  certificateCode: string;
  verificationUrl: string;
  instructor: {
    name: string;
    title: string;
  };
  totalDuration: string;
  totalModules: number;
  skills: string[];
}

// Mock data - matching certificate IDs from courses page (cert-001, cert-002, cert-003)
const mockCertificates: Record<string, Certificate> = {
  "cert-001": {
    id: "cert-001",
    courseId: "4",
    courseTitle: "HTML & CSS Fundamental — Bangun Website Pertamamu",
    recipientName: "Vito Aditya",
    completionDate: "20 Mar 2026",
    issuedAt: "2026-03-20T00:00:00Z",
    certificateCode: "CRT-2026-XYZ123",
    verificationUrl: "https://cretechin.com/verify/CRT-2026-XYZ123",
    instructor: {
      name: "Diana Putri",
      title: "Senior Frontend Developer & Instructor",
    },
    totalDuration: "6 Jam",
    totalModules: 12,
    skills: ["HTML5", "CSS3", "Responsive Design", "Web Fundamentals"],
  },
  "cert-002": {
    id: "cert-002",
    courseId: "5",
    courseTitle: "JavaScript Fundamental — Konsep dan Praktik",
    recipientName: "Vito Aditya",
    completionDate: "10 Mar 2026",
    issuedAt: "2026-03-10T00:00:00Z",
    certificateCode: "CRT-2026-ABC789",
    verificationUrl: "https://cretechin.com/verify/CRT-2026-ABC789",
    instructor: {
      name: "Budi Santoso",
      title: "Senior Full-Stack Developer & Instructor",
    },
    totalDuration: "10 Jam",
    totalModules: 15,
    skills: ["JavaScript", "ES6+", "DOM Manipulation", "Async Programming"],
  },
  "cert-003": {
    id: "cert-003",
    courseId: "6",
    courseTitle: "Git & GitHub untuk Developer Pemula",
    recipientName: "Vito Aditya",
    completionDate: "28 Jan 2026",
    issuedAt: "2026-01-28T00:00:00Z",
    certificateCode: "CRT-2026-DEF456",
    verificationUrl: "https://cretechin.com/verify/CRT-2026-DEF456",
    instructor: {
      name: "Rizky Pratama",
      title: "DevOps Engineer & Instructor",
    },
    totalDuration: "4 Jam",
    totalModules: 8,
    skills: ["Git", "GitHub", "Version Control", "Collaboration"],
  },
};

function CertificateDetailContent({ certificateId }: { certificateId: string }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push(`/login?redirect=/certificates/${certificateId}`);
    }
  }, [isAuthenticated, isLoading, router, certificateId]);

  // Simulate fetching certificate
  useEffect(() => {
    setIsDataLoading(true);
    setNotFound(false);
    const timer = setTimeout(() => {
      const found = mockCertificates[certificateId];
      if (found) {
        setCertificate(found);
      } else {
        setNotFound(true);
      }
      setIsDataLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [certificateId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Handler: Download certificate (simulasi)
  const handleDownload = () => {
    if (!certificate) return;
    setIsDownloading(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsDownloading(false);
      // In production, this would trigger actual PDF download
      // window.location.href = `/api/certificates/${certificate.id}/download`;
      console.log(`[Mock] Downloading certificate: ${certificate.id}`);
    }, 1500);
  };

  // Handler: Zoom preview
  const handleZoom = () => {
    if (!certificate) return;
    window.open("/images/Certificate.png", "_blank", "noopener,noreferrer");
  };

  // Handler: Quick download dari toolbar
  const handleQuickDownload = () => {
    handleDownload();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <BerandaNavbar />

      {/* Back Navigation Header */}
      <section className="bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2 sm:pt-8 sm:pb-4">
          <button
            onClick={() => router.push("/courses?tab=completed")}
            className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-white/60 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Kelas Saya</span>
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-6 sm:py-8 md:py-12 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {isDataLoading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
              <div className="lg:col-span-3">
                <div className="bg-neutral-100 dark:bg-neutral-800/50 border border-black/5 dark:border-white/5 rounded-2xl p-6 sm:p-10 min-h-[400px] sm:min-h-[500px] flex items-center justify-center">
                  <div className="w-full max-w-3xl aspect-[4/3] bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 lg:p-8 h-full animate-pulse">
                  <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded mb-3" />
                  <div className="h-8 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded mb-6" />
                  <div className="space-y-4">
                    <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
                    <div className="h-5 w-40 bg-neutral-200 dark:bg-neutral-700 rounded" />
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="h-11 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                    <div className="h-11 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                    <div className="h-6 w-40 mx-auto bg-neutral-200 dark:bg-neutral-700 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ) : notFound ? (
            // Not Found State
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="text-center max-w-md">
                <AlertCircle className="w-12 h-12 text-neutral-400 dark:text-white/40 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Sertifikat Tidak Ditemukan
                </h2>
                <p className="text-sm text-neutral-500 dark:text-white/50 mb-6">
                  Sertifikat yang Anda cari tidak tersedia atau telah dihapus.
                </p>
                <button
                  onClick={() => router.push("/courses?tab=completed")}
                  className="px-5 py-2.5 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all"
                >
                  Kembali ke Kelas Saya
                </button>
              </div>
            </div>
          ) : certificate ? (
            // Loaded State
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
              <div className="lg:col-span-3">
                <CertificatePreview
                  imageUrl="/images/Certificate.png"
                  title={certificate.courseTitle}
                  onZoom={handleZoom}
                  onQuickDownload={handleQuickDownload}
                />
              </div>
              <div className="lg:col-span-2">
                <CertificateInfo
                  courseTitle={certificate.courseTitle}
                  recipientName={user?.name || certificate.recipientName}
                  completionDate={certificate.completionDate}
                  certificateCode={certificate.certificateCode}
                  instructor={certificate.instructor}
                  verificationUrl={certificate.verificationUrl}
                  onDownload={handleDownload}
                  isDownloading={isDownloading}
                />
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return (
    <AuthProvider>
      <CertificateDetailContent certificateId={resolvedParams.id} />
    </AuthProvider>
  );
}
