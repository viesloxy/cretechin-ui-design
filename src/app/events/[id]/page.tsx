"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarX, ArrowLeft } from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { BerandaNavbar } from "@/components/beranda";
import { Footer } from "@/components/landing-page";
import {
  BackLink,
  EventHero,
  EventTitleBlock,
  SpeakerSection,
  EventDescription,
  EventAgenda,
  RegistrationCard,
  MobileStickyBar,
  RelatedEvents,
  EventDetailSkeleton,
} from "@/components/events/detail";
import type { EventDetail, AgendaItem } from "@/components/events/detail";
import type { EventItem, EventTab } from "@/components/events/types";

/* ─────────────────────────── MOCK DATA ─────────────────────────── */

// Aggregate all mock events from /events page so deep links work
const ALL_MOCK_EVENTS: EventDetail[] = [
  {
    id: "evt-001",
    title: "Mastering React 18 dengan Next.js 14",
    description: `Pelajari konsep React 18 terbaru dan integrasi dengan Next.js 14 untuk web app modern.

Sesi ini akan membahas fundamental hingga advanced patterns, termasuk Server Components, App Router, dan performance optimization techniques yang akan mengubah cara kamu membangun aplikasi web.`,
    type: "webinar",
    banner:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    date: "2026-06-15",
    dateLabel: "Senin, 15 Juni 2026",
    timeStart: "19:00",
    timeEnd: "21:00",
    timezone: "WIB",
    platform: "Live on Zoom",
    speakers: [
      {
        id: "spk-001",
        name: "Budi Santoso",
        role: "Senior Frontend Developer",
        company: "TechCorp Indonesia",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        bio: "Developer dengan 8+ tahun pengalaman di React ecosystem, fokus pada performance optimization dan developer experience. Kontributor aktif di open source React libraries.",
        linkedin: "https://linkedin.com/in/budidev",
        twitter: "@budidev",
      },
    ],
    isRegistered: false,
    price: 0,
    priceDisplay: "Gratis",
    status: "upcoming",
    category: "Technology",
    tags: ["react", "nextjs", "web-development", "frontend"],
    level: "intermediate",
    isFeatured: true,
    viewCount: 1245,
    maxParticipants: 500,
    currentParticipants: 342,
    agenda: [
      { time: "19:00 - 19:15", title: "Pembukaan & Perkenalan" },
      {
        time: "19:15 - 20:00",
        title: "Materi 1: React Server Components & App Router",
        description: "Konsep fundamental dan cara kerja RSC di Next.js 14",
      },
      {
        time: "20:00 - 20:45",
        title: "Materi 2: Streaming, Suspense & Caching",
        description: "Optimasi UX dengan data fetching patterns",
      },
      { time: "20:45 - 21:00", title: "Sesi Tanya Jawab (Q&A)" },
    ],
    requirements: [
      "Pemahaman dasar JavaScript & React",
      "Node.js v18+ terinstall",
      "Code editor favorit (VS Code direkomendasikan)",
    ],
    targetAudience: [
      "Frontend developer yang ingin migrasi ke Next.js 14",
      "Full-stack engineer membangun SaaS modern",
      "Tech lead yang mengevaluasi arsitektur baru",
    ],
    benefits: [
      "Akses penuh rekaman setelah acara",
      "Modul materi bonus (PDF & source code)",
      "Grup diskusi eksklusif Discord",
      "Sertifikat keikutsertaan digital",
    ],
    rating: 4.9,
    totalReviews: 87,
  },
  {
    id: "evt-002",
    title: "UI/UX Design Workshop — Figma to Prototype",
    description: `Workshop hands-on membuat desain UI/UX lengkap dengan Figma dan prototyping interaktif. Peserta akan mempraktikkan langsung setiap tahap dari user research hingga high-fidelity prototype.`,
    type: "workshop",
    banner:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80",
    date: "2026-06-18",
    dateLabel: "Kamis, 18 Juni 2026",
    timeStart: "13:00",
    timeEnd: "16:00",
    timezone: "WIB",
    platform: "Onsite di Jakarta + Live Stream",
    speakers: [
      {
        id: "spk-002",
        name: "Sarah Wijaya",
        role: "UI/UX Designer",
        company: "DesignStudio ID",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        bio: "Designer yang fokus pada mobile dan web design systems. Telah membantu 30+ produk digital meluncurkan UI yang konsisten.",
        linkedin: "https://linkedin.com/in/sarahdesign",
        twitter: "@sarahdesign",
      },
      {
        id: "spk-002b",
        name: "Reza Pratama",
        role: "Senior UX Researcher",
        company: "DesignStudio ID",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        bio: "UX researcher dengan spesialisasi usability testing dan user interview.",
        linkedin: "https://linkedin.com/in/rezapratama",
      },
    ],
    isRegistered: false,
    price: 99000,
    priceDisplay: "Rp 99.000",
    status: "upcoming",
    category: "Design",
    tags: ["figma", "ui-design", "ux-design", "prototyping"],
    level: "beginner",
    viewCount: 856,
    maxParticipants: 50,
    currentParticipants: 28,
    agenda: [
      { time: "13:00 - 13:30", title: "Intro & User Research Basics" },
      { time: "13:30 - 14:30", title: "Wireframing di Figma" },
      { time: "14:30 - 15:30", title: "High-Fidelity Design + Design System" },
      { time: "15:30 - 16:00", title: "Prototyping Interaktif & Sharing" },
    ],
    requirements: [
      "Laptop dengan Figma terinstall (akun gratis cukup)",
      "Tidak perlu pengalaman desain sebelumnya",
    ],
    targetAudience: [
      "Designer pemula yang ingin belajar UI/UX",
      "Developer yang ingin memahami desain",
      "Product owner yang ingin kolaborasi lebih baik dengan tim desain",
    ],
    benefits: [
      "Template Figma latihan yang bisa dibawa pulang",
      "Akses komunitas alumni DesignStudio",
      "Sertifikat completion",
      "Coffee break & lunch (untuk peserta onsite)",
    ],
    rating: 4.8,
    totalReviews: 42,
  },
  {
    id: "evt-003",
    title: "Tech Meetup Jakarta — Networking Night",
    description: `Temui developer, designer, dan founder tech startup di Jakarta. Networking session dengan format lightning talk dan roundtable discussion.`,
    type: "meetup",
    banner:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    date: "2026-06-20",
    dateLabel: "Sabtu, 20 Juni 2026",
    timeStart: "18:30",
    timeEnd: "21:30",
    timezone: "WIB",
    platform: "Onsite di GoWork Plaza Indonesia",
    speakers: [
      {
        id: "spk-003",
        name: "Andi Kurniawan",
        role: "Startup Founder",
        company: "InnovateTech",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        bio: "Founder 2 startup (1 acquired, 1 series A). Suka berbagi pengalaman tentang building products from scratch.",
        linkedin: "https://linkedin.com/in/andikurniawan",
      },
    ],
    isRegistered: false,
    price: 50000,
    priceDisplay: "Rp 50.000",
    status: "upcoming",
    category: "Networking",
    tags: ["networking", "startup"],
    viewCount: 432,
    maxParticipants: 80,
    currentParticipants: 56,
    agenda: [
      { time: "18:30 - 19:00", title: "Registrasi & Welcome Drink" },
      { time: "19:00 - 19:30", title: "Lightning Talk: 3 Founder Stories" },
      { time: "19:30 - 20:30", title: "Roundtable Discussion" },
      { time: "20:30 - 21:30", title: "Networking & Closing" },
    ],
    benefits: [
      "Makan malam & minuman gratis",
      "Akses ke private WhatsApp group komunitas",
      "Doorprize license software premium",
    ],
  },
  {
    id: "evt-004",
    title: "DevConference Asia 2026 — Software Architecture",
    description: `Konferensi tahunan membahas tren arsitektur software untuk skala enterprise. Dibawakan oleh principal engineers dari berbagai unicorn tech Asia.`,
    type: "conference",
    banner:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
    date: "2026-07-05",
    dateLabel: "Minggu, 5 Juli 2026",
    timeStart: "09:00",
    timeEnd: "17:00",
    timezone: "WIB",
    platform: "Onsite di JCC Senayan + Live Stream",
    speakers: [
      {
        id: "spk-004",
        name: "Linda Hartono",
        role: "Principal Engineer",
        company: "ScaleCloud",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        bio: "Principal engineer dengan pengalaman 12+ tahun membangun sistem terdistribusi yang melayani 100M+ users.",
        linkedin: "https://linkedin.com/in/lindahartono",
      },
    ],
    isRegistered: false,
    price: 250000,
    priceDisplay: "Rp 250.000",
    status: "upcoming",
    category: "Technology",
    tags: ["conference", "architecture"],
    viewCount: 1980,
    maxParticipants: 1000,
    currentParticipants: 612,
    agenda: [
      { time: "09:00 - 09:30", title: "Registration & Coffee" },
      { time: "09:30 - 10:30", title: "Keynote: The Future of Cloud Architecture" },
      { time: "10:45 - 12:00", title: "Track 1: Scalable Microservices" },
      { time: "13:00 - 14:30", title: "Track 2: Event-Driven Systems" },
      { time: "14:45 - 16:00", title: "Panel: Lessons from Unicorns" },
      { time: "16:00 - 17:00", title: "Closing & Networking" },
    ],
    benefits: [
      "Akses 6+ talks dari principal engineers",
      "Conference kit (notebook, sticker, t-shirt)",
      "Makan siang & coffee break",
      "Sertifikat kehadiran",
      "Free pass webinar lanjutan series ini",
    ],
  },
  {
    id: "evt-005",
    title: "Flutter Mobile Development — From Zero to Hero",
    description: `Pelajari Flutter dari instalasi hingga publish ke App Store dan Play Store. Cocok untuk pemula yang baru pertama kali ingin membangun mobile app.`,
    type: "workshop",
    banner:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=600&q=80",
    date: "2026-06-25",
    dateLabel: "Kamis, 25 Juni 2026",
    timeStart: "10:00",
    timeEnd: "15:00",
    timezone: "WIB",
    platform: "Live on Google Meet",
    speakers: [
      {
        id: "spk-005",
        name: "Rizky Pratama",
        role: "Mobile Lead",
        company: "AppCraft",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
        bio: "Mobile lead dengan 6 tahun pengalaman Flutter. Sudah mempublikasikan 12+ app di App Store & Play Store.",
        linkedin: "https://linkedin.com/in/rizkypratama",
      },
    ],
    isRegistered: false,
    price: 150000,
    priceDisplay: "Rp 150.000",
    status: "upcoming",
    category: "Technology",
    tags: ["flutter", "mobile"],
    level: "intermediate",
    viewCount: 743,
    maxParticipants: 100,
    currentParticipants: 67,
    agenda: [
      { time: "10:00 - 11:00", title: "Setup & Dart Fundamentals" },
      { time: "11:00 - 12:30", title: "Widget Tree & State Management" },
      { time: "13:30 - 14:30", title: "Build Real App: Todo with Firebase" },
      { time: "14:30 - 15:00", title: "Publish ke Play Store" },
    ],
    requirements: [
      "Laptop dengan Flutter SDK terinstall",
      "Akun Google (untuk Firebase & Play Store)",
      "Pemahaman dasar programming (variabel, function, OOP)",
    ],
    benefits: [
      "Source code 3 mini-project",
      "Cheat sheet Flutter widgets",
      "1 bulan free akses Flutter Pro course",
      "Sertifikat completion",
    ],
  },
  {
    id: "evt-006",
    title: "AI & Machine Learning untuk Web Developer",
    description: `Implementasi AI/ML di aplikasi web modern dengan API dan library terbaru. Dari integrasi LLM hingga image classification langsung di browser.`,
    type: "webinar",
    banner:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    date: "2026-07-10",
    dateLabel: "Jumat, 10 Juli 2026",
    timeStart: "19:30",
    timeEnd: "21:30",
    timezone: "WIB",
    platform: "Live on Zoom",
    speakers: [
      {
        id: "spk-006",
        name: "Dr. Maya Sari",
        role: "AI Researcher",
        company: "AILabs ID",
        avatar:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80",
        bio: "PhD in Machine Learning dari UI. Aktif meneliti aplikasi LLM untuk produk consumer.",
        linkedin: "https://linkedin.com/in/drmayasari",
        twitter: "@drmayasari",
      },
    ],
    isRegistered: false,
    price: 0,
    priceDisplay: "Gratis",
    status: "upcoming",
    category: "Technology",
    tags: ["ai", "ml"],
    level: "advanced",
    viewCount: 2100,
    maxParticipants: 1000,
    currentParticipants: 856,
    agenda: [
      { time: "19:30 - 20:15", title: "LLM APIs: OpenAI, Claude, Gemini" },
      { time: "20:15 - 20:45", title: "Vector DB & RAG Implementation" },
      { time: "20:45 - 21:15", title: "On-device ML dengan TensorFlow.js" },
      { time: "21:15 - 21:30", title: "Q&A" },
    ],
    requirements: [
      "Pemahaman JavaScript/TypeScript",
      "Akses API key OpenAI/Claude (opsional untuk demo)",
    ],
    targetAudience: [
      "Web developer yang ingin integrasi AI ke produk",
      "Full-stack engineer exploring AI features",
      "Tech lead evaluating AI stack",
    ],
    benefits: [
      "Source code demo 4 use-case",
      "Daftar recommended LLM providers & pricing",
      "Akses rekaman selamanya",
    ],
    rating: 4.9,
    totalReviews: 156,
  },
  // My tickets
  {
    id: "tkt-001",
    title: "Design System Workshop: From Zero to Hero",
    description: `Membangun design system yang scalable untuk produk digital. Peserta akan praktek membuat token, komponen, dan dokumentasi design system.`,
    type: "workshop",
    banner:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80",
    date: "2026-06-08",
    dateLabel: "Senin, 8 Juni 2026",
    timeStart: "14:00",
    timeEnd: "18:00",
    timezone: "WIB",
    platform: "Live on Zoom",
    speakers: [
      {
        id: "spk-007",
        name: "Andi Prasetyo",
        role: "Lead Product Designer",
        company: "DesignHub",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
        bio: "Lead designer di DesignHub, membangun design system untuk 20+ produk internal.",
        linkedin: "https://linkedin.com/in/andip",
      },
    ],
    isRegistered: true,
    roomUrl: "https://zoom.us/j/123456789",
    accessCode: "DS2026",
    price: 200000,
    priceDisplay: "Rp 200.000",
    status: "upcoming",
    category: "Design",
    tags: ["design-system", "figma"],
    level: "intermediate",
    viewCount: 678,
    maxParticipants: 75,
    currentParticipants: 65,
  },
  {
    id: "tkt-002",
    title: "Backend Development with Node.js & PostgreSQL",
    description: `Membangun RESTful API yang robust dengan Node.js dan PostgreSQL. Dari setup database hingga deployment.`,
    type: "webinar",
    banner:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    date: "2026-06-04",
    dateLabel: "Rabu, 4 Juni 2026",
    timeStart: "19:00",
    timeEnd: "21:00",
    timezone: "WIB",
    platform: "Live on Google Meet",
    speakers: [
      {
        id: "spk-008",
        name: "Firman Hidayat",
        role: "Backend Engineer",
        company: "CloudStack",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
        bio: "Backend engineer fokus pada API design dan database optimization.",
        linkedin: "https://linkedin.com/in/firmanh",
      },
    ],
    isRegistered: true,
    roomUrl: "https://meet.google.com/abc-defg-hij",
    accessCode: "NODE2026",
    price: 0,
    priceDisplay: "Gratis",
    status: "live",
    category: "Technology",
    tags: ["nodejs", "postgres"],
    level: "intermediate",
    viewCount: 1543,
  },
  // Recordings
  {
    id: "rec-001",
    title: "Introduction to TypeScript for JavaScript Developers",
    description: `Migrasi dari JavaScript ke TypeScript dengan mudah. Pelajari type system, generics, dan best practices TypeScript modern.`,
    type: "webinar",
    banner:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    date: "2026-05-20",
    dateLabel: "Rabu, 20 Mei 2026",
    timeStart: "19:00",
    timeEnd: "21:00",
    timezone: "WIB",
    platform: "Live on Zoom",
    speakers: [
      {
        id: "spk-010",
        name: "Dimas Prakoso",
        role: "Full Stack Developer",
        company: "CodeCraft",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
        bio: "Full stack developer yang aktif menulis tutorial TypeScript di blog pribadinya.",
        linkedin: "https://linkedin.com/in/dimasp",
      },
    ],
    isRegistered: true,
    recordingUrl: "https://youtube.com/watch?v=example1",
    recordingAvailableAt: "21 Mei 2026",
    price: 0,
    priceDisplay: "Gratis",
    status: "completed",
    category: "Technology",
    tags: ["typescript", "javascript"],
    level: "beginner",
    viewCount: 3200,
  },
];

/* ─────────────────────────── CONTENT ─────────────────────────── */

function EventDetailContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const eventId = params?.id;

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  // Simulate fetch
  useEffect(() => {
    setIsDataLoading(true);
    const t = setTimeout(() => setIsDataLoading(false), 500);
    return () => clearTimeout(t);
  }, [eventId]);

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push(`/login?redirect=/events/${eventId}`);
    }
  }, [isAuthenticated, isLoading, router, eventId]);

  // Find event from mock data
  const event = useMemo(
    () => ALL_MOCK_EVENTS.find((e) => e.id === eventId),
    [eventId],
  );

  // Related events: same type or sharing speakers
  const relatedEvents = useMemo<EventItem[]>(() => {
    if (!event) return [];
    return ALL_MOCK_EVENTS.filter(
      (e) =>
        e.id !== event.id &&
        (e.type === event.type ||
          e.speakers.some((s) =>
            event.speakers.some((es) => es.id === s.id),
          )),
    ).slice(0, 6);
  }, [event]);

  const tab: EventTab = event?.isRegistered
    ? "my-tickets"
    : event?.status === "completed"
    ? "recordings"
    : "upcoming";

  const handleRegister = async () => {
    if (!event) return;
    setIsRegistering(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setIsRegistering(false);
    // TODO: real API integration
    alert("Pendaftaran berhasil! (mock)");
  };

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/events/${eventId}`
        : "";
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.share &&
        /Mobi|Android/i.test(navigator.userAgent)
      ) {
        await navigator.share({
          title: event?.title ?? "Acara CreTechin",
          text: event?.description?.slice(0, 100),
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link acara disalin ke clipboard!");
      } else {
        alert(`Salin link ini: ${url}`);
      }
    } catch {
      // user cancelled share
    }
  };

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

  // Not found state
  if (!isDataLoading && !event) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <BerandaNavbar />
        <BackLink />
        <div className="max-w-md mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <CalendarX className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Acara tidak ditemukan
          </h2>
          <p className="text-base text-neutral-500 dark:text-white/50 mb-8">
            Acara yang kamu cari mungkin sudah berakhir atau link tidak valid.
          </p>
          <button
            onClick={() => router.push("/events")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-neutral-900 font-semibold hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Acara
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col pb-24 lg:pb-0">
      <BerandaNavbar />
      <BackLink />

      {isDataLoading || !event ? (
        <EventDetailSkeleton />
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left: Hero + Title (≈65-70%) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-2 space-y-6 sm:space-y-8"
              >
                <EventHero event={event} />
                <EventTitleBlock event={event} />
              </motion.div>

              {/* Right: Sticky CTA Card (≈30-35%) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-1"
              >
                <RegistrationCard
                  event={event}
                  isRegistered={event.isRegistered}
                  isLoading={isRegistering}
                  onRegister={handleRegister}
                  onShare={handleShare}
                />
              </motion.div>
            </div>
          </div>

          {/* Flat full-width sections (mirrors ProductTabs + TabContent + RelatedProducts) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 pb-12">
            <SpeakerSection speakers={event.speakers} />
            <EventDescription event={event} />
            <EventAgenda agenda={event.agenda} />
            <RelatedEvents
              currentEventId={event.id}
              events={relatedEvents}
              tab={tab}
            />
          </div>

          {/* Mobile sticky bottom bar */}
          <MobileStickyBar
            event={event}
            isRegistered={event.isRegistered}
            isLoading={isRegistering}
            onRegister={handleRegister}
          />
        </>
      )}

      <Footer />
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function EventDetailPage() {
  return (
    <AuthProvider>
      <EventDetailContent />
    </AuthProvider>
  );
}
