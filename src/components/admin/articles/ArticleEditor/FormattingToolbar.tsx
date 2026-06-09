"use client";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Strikethrough,
} from "lucide-react";

interface FormattingToolbarProps {
  onFormat: (command: string) => void;
  onInsert: (type: "image" | "link" | "code") => void;
  onAlign: (align: "left" | "center" | "right") => void;
  onToggleFullscreen: () => void;
}

export default function FormattingToolbar({
  onFormat,
  onInsert,
  onAlign,
  onToggleFullscreen,
}: FormattingToolbarProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-neutral-100 dark:border-neutral-800">
        <Group>
          <ToolBtn label="Bold" icon={Bold} onClick={() => onFormat("bold")} />
          <ToolBtn label="Italic" icon={Italic} onClick={() => onFormat("italic")} />
          <ToolBtn label="Underline" icon={UnderlineIcon} onClick={() => onFormat("underline")} />
          <ToolBtn label="Strikethrough" icon={Strikethrough} onClick={() => onFormat("strikeThrough")} />
        </Group>

        <Divider />

        <Group>
          <ToolBtn label="Heading 1" icon={Heading1} onClick={() => onFormat("formatBlock:H1")} />
          <ToolBtn label="Heading 2" icon={Heading2} onClick={() => onFormat("formatBlock:H2")} />
          <ToolBtn label="Heading 3" icon={Heading3} onClick={() => onFormat("formatBlock:H3")} />
          <ToolBtn label="Paragraph" icon={Pilcrow} onClick={() => onFormat("formatBlock:P")} />
        </Group>

        <Divider />

        <Group>
          <ToolBtn label="Bullet List" icon={List} onClick={() => onFormat("insertUnorderedList")} />
          <ToolBtn label="Numbered List" icon={ListOrdered} onClick={() => onFormat("insertOrderedList")} />
          <ToolBtn label="Blockquote" icon={Quote} onClick={() => onFormat("formatBlock:BLOCKQUOTE")} />
        </Group>

        <Divider />

        <Group>
          <ToolBtn label="Sisipkan Gambar" icon={ImageIcon} onClick={() => onInsert("image")} />
          <ToolBtn label="Sisipkan Link" icon={LinkIcon} onClick={() => onInsert("link")} />
          <ToolBtn label="Sisipkan Kode" icon={Code} onClick={() => onInsert("code")} />
        </Group>

        <Divider />

        <Group>
          <ToolBtn label="Rata Kiri" icon={AlignLeft} onClick={() => onAlign("left")} />
          <ToolBtn label="Rata Tengah" icon={AlignCenter} onClick={() => onAlign("center")} />
          <ToolBtn label="Rata Kanan" icon={AlignRight} onClick={() => onAlign("right")} />
        </Group>

        <div className="ml-auto">
          <ToolBtn label="Fullscreen" icon={Maximize2} onClick={onToggleFullscreen} />
        </div>
      </div>
    </div>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

function Divider() {
  return <span className="w-px h-5 bg-neutral-200 dark:bg-neutral-700 mx-1" />;
}

function ToolBtn({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
