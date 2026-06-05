"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import BerandaNavbar from "@/components/beranda/BerandaNavbar";
import Footer from "@/components/landing-page/Footer";
import PageHeader from "@/components/events/PageHeader";
import TabNavigation, { type EventTab } from "@/components/events/TabNavigation";
import FilterBar from "@/components/events/FilterBar";
import EventCard from "@/components/events/EventCard";
import EmptyState from "@/components/events/EmptyState";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";
import type {
  EventItem,
  EventCategory,
  EventSort,
  EmptyStateVariant,
} from "@/components/events/types";

// ===== MOCK DATA =====
const MOCK_UPCOMING: EventItem[] = [
  {
    id: "evt-001",
    title: "Mastering React 18 dengan Next.js 14",
    description: "Pelajari konsep React 18 terbaru dan integrasi dengan Next.js 14 untuk web app modern.",
    type: "webinar",
    banner:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    date: "2026-06-15",
    dateLabel: "15 Juni 2026",
    timeStart: "19:00",
    timeEnd: "21:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-001",
        name: "Budi Santoso",
        role: "Senior Frontend Developer",
        company: "TechCorp Indonesia",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      },
    ],
    isRegistered: false,
    price: 0,
    priceDisplay: "Gratis",
    status: "upcoming",
    category: "Technology",
    tags: ["react", "nextjs", "frontend"],
    level: "intermediate",
    isFeatured: true,
    viewCount: 1245,
    maxParticipants: 500,
    currentParticipants: 342,
  },
  {
    id: "evt-002",
    title: "UI/UX Design Workshop — Figma to Prototype",
    description: "Workshop hands-on membuat desain UI/UX lengkap dengan Figma dan prototyping interaktif.",
    type: "workshop",
    banner:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80",
    date: "2026-06-18",
    dateLabel: "18 Juni 2026",
    timeStart: "13:00",
    timeEnd: "16:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-002",
        name: "Sarah Wijaya",
        role: "UI/UX Designer",
        company: "DesignStudio ID",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      },
    ],
    isRegistered: false,
    price: 99000,
    priceDisplay: "Rp 99.000",
    status: "upcoming",
    category: "Design",
    tags: ["figma", "ui", "ux"],
    level: "beginner",
    viewCount: 856,
    maxParticipants: 50,
    currentParticipants: 28,
  },
  {
    id: "evt-003",
    title: "Tech Meetup Jakarta — Networking Night",
    description: "Temui developer, designer, dan founder tech startup di Jakarta. Networking dan share session.",
    type: "meetup",
    banner:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    date: "2026-06-20",
    dateLabel: "20 Juni 2026",
    timeStart: "18:30",
    timeEnd: "21:30",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-003",
        name: "Andi Kurniawan",
        role: "Startup Founder",
        company: "InnovateTech",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
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
  },
  {
    id: "evt-004",
    title: "DevConference Asia 2026 — Software Architecture",
    description: "Konferensi tahunan membahas tren arsitektur software untuk skala enterprise.",
    type: "conference",
    banner:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
    date: "2026-07-05",
    dateLabel: "5 Juli 2026",
    timeStart: "09:00",
    timeEnd: "17:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-004",
        name: "Linda Hartono",
        role: "Principal Engineer",
        company: "ScaleCloud",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
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
  },
  {
    id: "evt-005",
    title: "Flutter Mobile Development — From Zero to Hero",
    description: "Pelajari Flutter dari instalasi hingga publish ke App Store dan Play Store.",
    type: "workshop",
    banner:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=600&q=80",
    date: "2026-06-25",
    dateLabel: "25 Juni 2026",
    timeStart: "10:00",
    timeEnd: "15:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-005",
        name: "Rizky Pratama",
        role: "Mobile Lead",
        company: "AppCraft",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
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
  },
  {
    id: "evt-006",
    title: "AI & Machine Learning untuk Web Developer",
    description: "Implementasi AI/ML di aplikasi web modern dengan API dan library terbaru.",
    type: "webinar",
    banner:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    date: "2026-07-10",
    dateLabel: "10 Juli 2026",
    timeStart: "19:30",
    timeEnd: "21:30",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-006",
        name: "Dr. Maya Sari",
        role: "AI Researcher",
        company: "AILabs ID",
        avatar:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80",
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
  },
];

const MOCK_MY_TICKETS: EventItem[] = [
  {
    id: "tkt-001",
    title: "Design System Workshop: From Zero to Hero",
    description: "Membangun design system yang scalable untuk produk digital.",
    type: "workshop",
    banner:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80",
    date: "2026-06-08",
    dateLabel: "8 Juni 2026",
    timeStart: "14:00",
    timeEnd: "18:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-007",
        name: "Andi Prasetyo",
        role: "Lead Product Designer",
        company: "DesignHub",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
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
  },
  {
    id: "tkt-002",
    title: "Backend Development with Node.js & PostgreSQL",
    description: "Membangun RESTful API yang robust dengan Node.js dan PostgreSQL.",
    type: "webinar",
    banner:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    date: "2026-06-04",
    dateLabel: "4 Juni 2026",
    timeStart: "19:00",
    timeEnd: "21:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-008",
        name: "Firman Hidayat",
        role: "Backend Engineer",
        company: "CloudStack",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
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
  {
    id: "tkt-003",
    title: "Product Discovery & User Research Mastery",
    description: "Framework lengkap untuk product discovery dan user research.",
    type: "workshop",
    banner:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    date: "2026-06-12",
    dateLabel: "12 Juni 2026",
    timeStart: "10:00",
    timeEnd: "14:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-009",
        name: "Dewi Anggraeni",
        role: "Senior PM",
        company: "ProductLab",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
      },
    ],
    isRegistered: true,
    roomUrl: "https://zoom.us/j/987654321",
    accessCode: "PD2026",
    price: 175000,
    priceDisplay: "Rp 175.000",
    status: "upcoming",
    category: "Business",
    tags: ["product", "research"],
    viewCount: 412,
  },
];

const MOCK_RECORDINGS: EventItem[] = [
  {
    id: "rec-001",
    title: "Introduction to TypeScript for JavaScript Developers",
    description: "Migrasi dari JavaScript ke TypeScript dengan mudah.",
    type: "webinar",
    banner:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    date: "2026-05-20",
    dateLabel: "20 Mei 2026",
    timeStart: "19:00",
    timeEnd: "21:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-010",
        name: "Dimas Prakoso",
        role: "Full Stack Developer",
        company: "CodeCraft",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
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
  {
    id: "rec-002",
    title: "DevOps Fundamentals: CI/CD dengan GitHub Actions",
    description: "Automasi deployment dengan GitHub Actions dan best practices DevOps.",
    type: "workshop",
    banner:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
    date: "2026-05-15",
    dateLabel: "15 Mei 2026",
    timeStart: "13:00",
    timeEnd: "17:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-011",
        name: "Rizki Maulana",
        role: "DevOps Engineer",
        company: "CloudOps ID",
        avatar:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
      },
    ],
    isRegistered: true,
    recordingUrl: "https://youtube.com/watch?v=example2",
    recordingAvailableAt: "16 Mei 2026",
    price: 100000,
    priceDisplay: "Rp 100.000",
    status: "completed",
    category: "Technology",
    tags: ["devops", "cicd"],
    level: "intermediate",
    viewCount: 2450,
  },
  {
    id: "rec-003",
    title: "Building Scalable APIs dengan GraphQL",
    description: "Pelajari GraphQL dan bagaimana membangun API yang scalable.",
    type: "webinar",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    date: "2026-05-08",
    dateLabel: "8 Mei 2026",
    timeStart: "19:00",
    timeEnd: "21:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-012",
        name: "Tio Wibisono",
        role: "API Architect",
        company: "APIWorks",
        avatar:
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80",
      },
    ],
    isRegistered: true,
    recordingUrl: "https://youtube.com/watch?v=example3",
    recordingAvailableAt: "9 Mei 2026",
    price: 0,
    priceDisplay: "Gratis",
    status: "completed",
    category: "Technology",
    tags: ["graphql", "api"],
    level: "intermediate",
    viewCount: 1890,
  },
  {
    id: "rec-004",
    title: "Career Path di Tech Industry — Sharing Session",
    description: "Berbagi pengalaman karir tech dari junior sampai senior.",
    type: "meetup",
    banner:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    date: "2026-04-28",
    dateLabel: "28 April 2026",
    timeStart: "18:00",
    timeEnd: "20:00",
    timezone: "WIB",
    speakers: [
      {
        id: "spk-013",
        name: "Reza Fauzi",
        role: "Engineering Manager",
        company: "InnovateTech",
        avatar:
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
      },
    ],
    isRegistered: true,
    recordingUrl: "https://youtube.com/watch?v=example4",
    recordingAvailableAt: "29 April 2026",
    price: 0,
    priceDisplay: "Gratis",
    status: "completed",
    category: "Networking",
    tags: ["career", "networking"],
    viewCount: 1245,
  },
];

const TAB_DATA: Record<EventTab, EventItem[]> = {
  upcoming: MOCK_UPCOMING,
  "my-tickets": MOCK_MY_TICKETS,
  recordings: MOCK_RECORDINGS,
};

const ALL_CATEGORIES: EventCategory[] = [
  "all",
  "webinar",
  "workshop",
  "meetup",
  "conference",
  "networking",
];

// ===== MAIN CONTENT =====
function EventsContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<EventTab>("upcoming");
  const [activeCategory, setActiveCategory] = useState<EventCategory>("all");
  const [activeSort, setActiveSort] = useState<EventSort>("soonest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/login?redirect=/events");
    }
  }, [isAuthenticated, isLoading, router]);

  // Simulate initial fetch
  useEffect(() => {
    setIsFetching(true);
    const t = setTimeout(() => setIsFetching(false), 400);
    return () => clearTimeout(t);
  }, [activeTab]);

  // Per-tab dataset
  const tabEvents = useMemo(() => TAB_DATA[activeTab] ?? [], [activeTab]);

  // Counts per category (per active tab)
  const categoryCounts = useMemo(() => {
    const counts: Record<EventCategory, number> = {
      all: tabEvents.length,
      webinar: 0,
      workshop: 0,
      meetup: 0,
      conference: 0,
      networking: 0,
    };
    for (const ev of tabEvents) {
      if (ALL_CATEGORIES.includes(ev.type as EventCategory)) {
        counts[ev.type as EventCategory] += 1;
      }
    }
    return counts;
  }, [tabEvents]);

  // Filter & sort
  const filteredEvents = useMemo(() => {
    let events = [...tabEvents];

    if (activeCategory !== "all") {
      events = events.filter((event) => event.type === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      events = events.filter(
        (event) =>
          event.title.toLowerCase().includes(q) ||
          event.description.toLowerCase().includes(q) ||
          event.speakers.some((s) => s.name.toLowerCase().includes(q)),
      );
    }

    switch (activeSort) {
      case "soonest":
        events.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "latest":
        events.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "popular":
        events.sort((a, b) => b.viewCount - a.viewCount);
        break;
    }
    return events;
  }, [tabEvents, activeCategory, searchQuery, activeSort]);

  const tabCounts = useMemo(
    () => ({
      upcoming: MOCK_UPCOMING.length,
      "my-tickets": MOCK_MY_TICKETS.length,
      recordings: MOCK_RECORDINGS.length,
    }),
    [],
  );

  const handleResetFilter = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setActiveSort("soonest");
  };

  const handleViewDetail = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  const handleJoinRoom = (eventId: string) => {
    const event = MOCK_MY_TICKETS.find((e) => e.id === eventId);
    if (event?.roomUrl) {
      window.open(event.roomUrl, "_blank");
    }
  };

  const handleWatchRecording = (eventId: string) => {
    const event = MOCK_RECORDINGS.find((e) => e.id === eventId);
    if (event?.recordingUrl) {
      window.open(event.recordingUrl, "_blank");
    }
  };

  const emptyVariant: EmptyStateVariant = (() => {
    if (searchQuery.trim()) return "no-search-results";
    if (activeCategory !== "all") return "no-filter-results";
    if (activeTab === "my-tickets") return "no-tickets";
    if (activeTab === "recordings") return "no-recordings";
    return "no-events";
  })();

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

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <BerandaNavbar />

      <PageHeader
        title="Acara & Webinar"
        description="Tingkatkan skill dan perbanyak koneksi melalui berbagai sesi interaktif."
      />

      <TabNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setActiveCategory("all");
          setSearchQuery("");
        }}
        counts={tabCounts}
      />

      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={activeSort}
        onSortChange={setActiveSort}
        resultCount={filteredEvents.length}
        totalCount={tabEvents.length}
        categoryCounts={categoryCounts}
      />

      <main className="flex-1 pb-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {isFetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <EmptyState variant={emptyVariant} onResetFilter={handleResetFilter} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <EventCard
                    event={event}
                    tab={activeTab}
                    onViewDetail={handleViewDetail}
                    onJoinRoom={handleJoinRoom}
                    onWatchRecording={handleWatchRecording}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function EventsPage() {
  return (
    <AuthProvider>
      <EventsContent />
    </AuthProvider>
  );
}
