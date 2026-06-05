"use client";

import Link from "next/link";
import type { FAQ } from "./types";
import HelpfulFeedback from "./HelpfulFeedback";

interface FAQAnswerContentProps {
  faq: FAQ;
  onHelpful?: (helpful: boolean) => void;
}

/**
 * Render answer with simple markdown (bold, lists, numbered steps).
 * Keeps it lightweight — no external lib.
 */
function renderAnswerText(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      elements.push(<br key={`br-${key++}`} />);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      // Bullet item
      const content = trimmed.slice(2);
      elements.push(
        <div key={`li-${key++}`} className="flex gap-2 ml-1 my-0.5">
          <span className="text-neutral-400 dark:text-white/30 mt-0.5">
            &bull;
          </span>
          <span className="flex-1">
            {renderInlineMarkdown(content)}
          </span>
        </div>,
      );
      continue;
    }

    const numbered = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numbered) {
      const num = numbered[1];
      const content = numbered[2] ?? "";
      elements.push(
        <div key={`num-${key++}`} className="flex gap-2 ml-1 my-0.5">
          <span className="text-neutral-500 dark:text-white/50 font-medium min-w-[1.25rem]">
            {num}.
          </span>
          <span className="flex-1">
            {renderInlineMarkdown(content)}
          </span>
        </div>,
      );
      continue;
    }

    elements.push(
      <p key={`p-${key++}`} className="my-1.5">
        {renderInlineMarkdown(trimmed)}
      </p>,
    );
  }

  return <div className="space-y-0.5">{elements}</div>;
}

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /\*\*(.+?)\*\*/g;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong
        key={`b-${key++}`}
        className="font-semibold text-neutral-900 dark:text-white"
      >
        {match[1]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

export default function FAQAnswerContent({
  faq,
  onHelpful,
}: FAQAnswerContentProps) {
  return (
    <div>
      {renderAnswerText(faq.answer)}
      {faq.relatedLinks && faq.relatedLinks.length > 0 && (
        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 space-y-1.5">
          <p className="text-xs font-semibold text-neutral-700 dark:text-white/70">
            Tautan terkait:
          </p>
          {faq.relatedLinks.map((link, idx) => {
            if (link.external) {
              return (
                <a
                  key={`rl-${idx}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-primary hover:underline"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={`rl-${idx}`}
                href={link.href}
                className="block text-xs text-primary hover:underline"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
      <HelpfulFeedback faqId={faq.id} onHelpful={onHelpful} />
    </div>
  );
}
