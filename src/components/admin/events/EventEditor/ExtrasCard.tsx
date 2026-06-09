"use client";

import { SettingsCard } from "./SettingsCard";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

interface ExtrasCardProps {
  featured: boolean;
  allowRegistration: boolean;
  sendReminder: boolean;
  recordEvent: boolean;
  onChange: (data: {
    featured?: boolean;
    allowRegistration?: boolean;
    sendReminder?: boolean;
    recordEvent?: boolean;
  }) => void;
}

export function ExtrasCard({
  featured,
  allowRegistration,
  sendReminder,
  recordEvent,
  onChange,
}: ExtrasCardProps) {
  return (
    <SettingsCard title="Pengaturan Tambahan">
      <div className="space-y-4">
        <ToggleSwitch
          checked={featured}
          onChange={(v) => onChange({ featured: v })}
          label="Featured"
          description="Tampilkan di section Unggulan di halaman Acara publik"
        />
        <ToggleSwitch
          checked={allowRegistration}
          onChange={(v) => onChange({ allowRegistration: v })}
          label="Izinkan Pendaftaran"
          description="User dapat mendaftar/bergabung ke acara"
        />
        <ToggleSwitch
          checked={sendReminder}
          onChange={(v) => onChange({ sendReminder: v })}
          label="Kirim Reminder Email"
          description="Kirim email pengingat 24 jam sebelum acara dimulai"
        />
        <ToggleSwitch
          checked={recordEvent}
          onChange={(v) => onChange({ recordEvent: v })}
          label="Rekam Acara"
          description="Sediakan rekaman acara setelah selesai"
        />
      </div>
    </SettingsCard>
  );
}
