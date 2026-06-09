"use client";

import { useEffect, useRef } from "react";

interface ContentEditorProps {
  value: string;
  onChange: (html: string) => void;
  onFormat: (command: string) => void;
  onInsert: (type: "image" | "link" | "code") => void;
}

export default function ContentEditor({
  value,
  onChange,
  onFormat,
  onInsert,
}: ContentEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInternalUpdate = useRef(false);

  // Sync external value -> editor (only when not from internal typing)
  useEffect(() => {
    if (!ref.current) return;
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    if (ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (!ref.current) return;
    isInternalUpdate.current = true;
    onChange(ref.current.innerHTML);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 overflow-hidden">
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
            e.preventDefault();
            onFormat("bold");
          } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
            e.preventDefault();
            onFormat("italic");
          } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "u") {
            e.preventDefault();
            onFormat("underline");
          }
        }}
        data-placeholder="Mulai menulis artikel Anda di sini..."
        className="min-h-[500px] p-6 text-base text-neutral-900 dark:text-white focus:outline-none prose prose-neutral dark:prose-invert max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-neutral-300 dark:empty:before:text-neutral-600"
      />
      <EditorFooter value={value} />
    </div>
  );
}

function EditorFooter({ value }: { value: string }) {
  const text = value.replace(/<[^>]+>/g, " ").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
      <span>
        {words} kata • {chars.toLocaleString("id-ID")} karakter
      </span>
      <span>± {readTime} menit baca</span>
    </div>
  );
}
