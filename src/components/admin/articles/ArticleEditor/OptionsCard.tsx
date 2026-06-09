"use client";

import SettingsCard from "./SettingsCard";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

interface OptionsCardProps {
  featured: boolean;
  onFeaturedChange: (v: boolean) => void;
  allowComments: boolean;
  onAllowCommentsChange: (v: boolean) => void;
}

export default function OptionsCard({
  featured,
  onFeaturedChange,
  allowComments,
  onAllowCommentsChange,
}: OptionsCardProps) {
  return (
    <SettingsCard title="Opsi Tampilan">
      <ToggleSwitch
        checked={featured}
        onChange={onFeaturedChange}
        label="Jadikan Artikel Unggulan"
        description='Tampil di section "Artikel Pilihan" di halaman beranda.'
      />
      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
        <ToggleSwitch
          checked={allowComments}
          onChange={onAllowCommentsChange}
          label="Izinkan Komentar"
          description="Pembaca dapat berkomentar di artikel."
        />
      </div>
    </SettingsCard>
  );
}
