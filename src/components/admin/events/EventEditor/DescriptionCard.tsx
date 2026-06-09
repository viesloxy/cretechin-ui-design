"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading2,
} from "lucide-react";
import { SettingsCard } from "./SettingsCard";
import Textarea from "@/components/ui/Textarea";

interface DescriptionCardProps {
  description: string;
  topics: string[];
  onDescriptionChange: (v: string) => void;
  onTopicsChange: (v: string[]) => void;
}

export function DescriptionCard({
  description,
  topics,
  onDescriptionChange,
  onTopicsChange,
}: DescriptionCardProps) {
  const [topicInput, setTopicInput] = useState("");

  const addTopic = () => {
    const t = topicInput.trim();
    if (!t || topics.includes(t) || topics.length >= 10) return;
    onTopicsChange([...topics, t]);
    setTopicInput("");
  };

  const removeTopic = (i: number) => {
    onTopicsChange(topics.filter((_, idx) => idx !== i));
  };

  return (
    <SettingsCard title="Deskripsi & Topik">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Deskripsi Lengkap
          </label>
          <div className="overflow-hidden rounded-xl border border-black/5 bg-white dark:border-white/10 dark:bg-neutral-900">
            <div className="flex items-center gap-0.5 border-b border-black/5 bg-neutral-50 px-2 py-1.5 dark:border-white/10 dark:bg-neutral-900/50">
              {[
                { Icon: Bold, label: "Bold" },
                { Icon: Italic, label: "Italic" },
                { Icon: UnderlineIcon, label: "Underline" },
                { Icon: Heading2, label: "Heading" },
                { Icon: List, label: "Bullet list" },
                { Icon: ListOrdered, label: "Numbered list" },
                { Icon: LinkIcon, label: "Link" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  className="rounded p-1.5 text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
            <Textarea
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Ceritakan detail acara Anda. Apa yang akan dipelajari peserta? Mengapa mereka harus hadir?"
              rows={8}
              maxLength={5000}
              className="!border-0 !rounded-t-none"
            />
            <div className="px-3 pb-2 text-right text-xs text-neutral-500">
              {description.length}/5000 karakter
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Topik / Yang Akan Dibahas
            <span className="ml-2 text-xs font-normal text-neutral-500">
              {topics.length}/10
            </span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTopic();
                }
              }}
              placeholder="cth: Tren generative AI 2026"
              className="h-10 flex-1 rounded-xl border border-black/5 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
            />
            <button
              type="button"
              onClick={addTopic}
              disabled={!topicInput.trim() || topics.length >= 10}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-black/5 bg-white px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Tambah
            </button>
          </div>
          {topics.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {topics.map((topic, idx) => (
                <li
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  {topic}
                  <button
                    type="button"
                    onClick={() => removeTopic(idx)}
                    className="rounded-full p-0.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-red-600 dark:hover:bg-neutral-800"
                    aria-label={`Hapus topik ${topic}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SettingsCard>
  );
}
