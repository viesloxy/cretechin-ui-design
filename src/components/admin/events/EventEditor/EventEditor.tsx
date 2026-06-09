"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Event } from "@/lib/events/types";
import { isSlugUnique, slugify } from "@/lib/events/utils";
import { EventEditorHeader } from "./EventEditorHeader";
import { BasicInfoCard } from "./BasicInfoCard";
import { SpeakersCard } from "./SpeakersCard";
import { DescriptionCard } from "./DescriptionCard";
import { BannerCard } from "./BannerCard";
import { ExtrasCard } from "./ExtrasCard";
import { EventSettingsPanel } from "./EventSettingsPanel";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface EventEditorProps {
  mode: "create" | "edit";
  initialEvent: Event;
  existingEvents: Event[];
  onBack: () => void;
  onSave: (data: Event) => Promise<void> | void;
  onPreview: (slug: string) => void;
}

export function EventEditor({
  mode,
  initialEvent,
  existingEvents,
  onBack,
  onSave,
  onPreview,
}: EventEditorProps) {
  const [event, setEvent] = useState<Event>(initialEvent);
  const [lastSaved, setLastSaved] = useState<string | null>(
    mode === "edit" ? initialEvent.updatedAt : null,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [confirmBack, setConfirmBack] = useState(false);
  const initialRef = useRef(JSON.stringify(initialEvent));

  useEffect(() => {
    setIsDirty(JSON.stringify(event) !== initialRef.current);
  }, [event]);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const updateField = (data: Partial<Event>) => {
    setEvent((prev) => ({ ...prev, ...data }));
  };

  const handleBack = () => {
    if (isDirty) setConfirmBack(true);
    else onBack();
  };

  const performSave = async (publish = false) => {
    setIsSaving(true);
    try {
      const nextStatus = publish ? "published" : "draft";
      const updated: Event = {
        ...event,
        status: nextStatus as Event["status"],
        updatedAt: new Date().toISOString(),
        publishedAt:
          publish && !event.publishedAt
            ? new Date().toISOString()
            : event.publishedAt,
      };
      await onSave(updated);
      setLastSaved(updated.updatedAt);
      initialRef.current = JSON.stringify(updated);
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  };

  const slugOk = isSlugUnique(event.slug, existingEvents, event.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <EventEditorHeader
        mode={mode}
        lastSaved={lastSaved}
        isSaving={isSaving}
        isPublished={
          event.status === "upcoming" ||
          event.status === "ongoing" ||
          event.status === "finished"
        }
        onBack={handleBack}
        onSaveDraft={() => performSave(false)}
        onPublish={() => performSave(true)}
        onPreview={() => onPreview(event.slug)}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        {/* Form Area - 70% */}
        <div className="space-y-4 lg:col-span-7">
          <BasicInfoCard
            title={event.title}
            slug={event.slug}
            shortDescription={event.shortDescription}
            type={event.type}
            isSlugUnique={slugOk}
            onChange={(data) => {
              if (data.title !== undefined) {
                const newTitle = data.title;
                setEvent((prev) => {
                  const shouldSyncSlug =
                    prev.slug === slugify(prev.title) || prev.slug === "";
                  return {
                    ...prev,
                    title: newTitle,
                    slug: shouldSyncSlug ? slugify(newTitle) : prev.slug,
                    ...data,
                  };
                });
              } else {
                updateField(data);
              }
            }}
          />

          <SpeakersCard
            speakers={event.speakers}
            onChange={(speakers) => updateField({ speakers })}
          />

          <DescriptionCard
            description={event.description}
            topics={event.topics}
            onDescriptionChange={(description) => updateField({ description })}
            onTopicsChange={(topics) => updateField({ topics })}
          />

          <BannerCard
            banner={event.banner}
            onChange={(banner) => updateField({ banner })}
          />

          <ExtrasCard
            featured={event.featured}
            allowRegistration={event.allowRegistration}
            sendReminder={event.sendReminder}
            recordEvent={event.recordEvent}
            onChange={(data) => updateField(data)}
          />
        </div>

        {/* Settings Panel - 30% */}
        <div className="lg:col-span-3">
          <EventSettingsPanel
            event={event}
            isEditMode={mode === "edit"}
            onChange={updateField}
            onSave={() => performSave(true)}
            isSaving={isSaving}
          />
        </div>
      </div>

      <ConfirmDialog
        open={confirmBack}
        title="Buang Perubahan?"
        description="Anda memiliki perubahan yang belum disimpan. Yakin ingin kembali?"
        confirmText="Ya, Kembali"
        cancelText="Tetap di Sini"
        variant="destructive"
        onConfirm={() => {
          setConfirmBack(false);
          onBack();
        }}
        onCancel={() => setConfirmBack(false)}
      />
    </motion.div>
  );
}
