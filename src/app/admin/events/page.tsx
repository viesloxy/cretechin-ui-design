"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import {
  EventsListView,
  EventEditor,
  DeleteEventDialog,
} from "@/components/admin/events";
import type { Event, EventFilter } from "@/lib/events/types";
import { MOCK_EVENTS } from "@/lib/events/mockData";
import { countEventsByStatus, slugify } from "@/lib/events/utils";

type ViewMode = "list" | "editor";
type EditorMode = "create" | "edit";

const DEFAULT_FILTER: EventFilter = {
  search: "",
  type: "all",
  status: "all",
  locationType: "all",
  sortBy: "nearest",
  page: 1,
  perPage: 10,
};

const BLANK_EVENT: Event = {
  id: "evt-new",
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  type: "webinar",
  status: "draft",
  startDate: "2026-06-20T12:00:00Z",
  endDate: "2026-06-20T14:00:00Z",
  timezone: "WIB",
  location: {
    type: "online",
    platform: "zoom",
    meetingUrl: "",
  },
  speakers: [],
  topics: [],
  price: 0,
  isFree: true,
  earlyBird: null,
  capacity: 100,
  registeredCount: 0,
  banner: null,
  featured: false,
  allowRegistration: true,
  sendReminder: true,
  recordEvent: false,
  autoCloseRegistration: true,
  viewCount: 0,
  attendanceRate: 0,
  rating: 0,
  reviewCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: null,
};

function EventsContent() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { isLoading, sidebarCollapsed } = useAdmin();

  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editorMode, setEditorMode] = useState<EditorMode>("create");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilter>(DEFAULT_FILTER);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, authLoading, router]);

  const stats = useMemo(() => countEventsByStatus(events), [events]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="w-16 h-16 relative">
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-neutral-600 dark:text-white/50 animate-pulse">Memuat halaman...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const selectedEvent = selectedEventId !== null
    ? events.find((e) => e.id === selectedEventId) ?? null
    : null;

  // Handlers
  const openCreate = () => {
    setEditorMode("create");
    setSelectedEventId(null);
    setViewMode("editor");
  };

  const openEdit = (id: string) => {
    setEditorMode("edit");
    setSelectedEventId(id);
    setViewMode("editor");
  };

  const closeView = () => {
    setViewMode("list");
    setSelectedEventId(null);
  };

  const handleDelete = (id: string) => {
    const event = events.find((e) => e.id === id);
    if (!event) return;
    setPendingDelete({ id, title: event.title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setEvents((prev) => prev.filter((e) => e.id !== pendingDelete.id));
    setDeleteDialogOpen(false);
    setPendingDelete(null);
  };

  const handleCopyLink = (id: string) => {
    const event = events.find((e) => e.id === id);
    if (!event) return;
    const url = `${window.location.origin}/events/${event.slug}`;
    navigator.clipboard.writeText(url).catch(() => {
      // fallback
    });
    setCopyToast(`Link "${event.title}" disalin ke clipboard!`);
    setTimeout(() => setCopyToast(null), 2500);
  };

  const handlePreview = (id: string) => {
    const event = events.find((e) => e.id === id);
    if (!event) return;
    alert(
      `Preview: ${event.title}\n\n${event.shortDescription}\n\nTipe: ${event.type}\nLokasi: ${event.location.type}\nHarga: ${event.isFree ? "GRATIS" : "Rp " + event.price.toLocaleString("id-ID")}\nKuota: ${event.registeredCount}/${event.capacity}`,
    );
  };

  const handleFilterChange = (partial: Partial<EventFilter>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters({ ...DEFAULT_FILTER });
  };

  const handleSaveEvent = async (data: Event) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (editorMode === "create") {
      const newEvent: Event = {
        ...data,
        id: `evt-${Date.now()}`,
        slug: data.slug || slugify(data.title),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setEvents((prev) => [newEvent, ...prev]);
      setSelectedEventId(newEvent.id);
      setEditorMode("edit");
    } else {
      setEvents((prev) =>
        prev.map((e) => (e.id === data.id ? { ...e, ...data } : e)),
      );
    }
  };

  const handlePreviewSlug = (slug: string) => {
    alert(`Preview publik: ${window.location.origin}/events/${slug}`);
  };

  return (
    <div className="min-h-screen flex flex-row bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Sidebar />
      <div
        className={`w-full transition-[padding] duration-300 ${
          sidebarCollapsed ? "lg:pl-4" : "lg:pl-6"
        }`}
      >
        <TopBar />
        <main className="p-4 lg:p-6 xl:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white sm:text-3xl md:text-4xl">
              Manajemen Acara &amp; Webinar
            </h1>
            <p className="mt-1 text-sm text-neutral-500 md:text-base">
              Kelola jadwal webinar, workshop, dan acara CreTechin
            </p>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <EventsListView
                  events={events}
                  stats={stats}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  onAdd={openCreate}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onCopyLink={handleCopyLink}
                  onPreview={handlePreview}
                />
              </motion.div>
            )}
            {viewMode === "editor" && (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <EventEditor
                  mode={editorMode}
                  initialEvent={selectedEvent ?? BLANK_EVENT}
                  existingEvents={events}
                  onBack={closeView}
                  onSave={handleSaveEvent}
                  onPreview={handlePreviewSlug}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="h-8" />
        </main>
      </div>

      <DeleteEventDialog
        open={deleteDialogOpen}
        eventTitle={pendingDelete?.title ?? ""}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setPendingDelete(null);
        }}
      />

      {/* Copy Link Toast */}
      <AnimatePresence>
        {copyToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-lg dark:border-white/10 dark:bg-neutral-900"
          >
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              ✓ {copyToast}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminEventsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <EventsContent />
      </AdminProvider>
    </AuthProvider>
  );
}
