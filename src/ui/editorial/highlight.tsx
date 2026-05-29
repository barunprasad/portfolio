import { Fragment, type ReactNode } from 'react';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Wraps occurrences of `keywords` in an accent span. Case-insensitive; builds a
// React node array (no HTML injection). Used to emphasize key phrases in prose.
export function highlight(text: string, keywords: string[]): ReactNode {
  if (!keywords.length) return text;
  const pattern = new RegExp(`(${keywords.map(escapeRegExp).join('|')})`, 'gi');
  const lower = keywords.map((k) => k.toLowerCase());
  return text.split(pattern).map((part, i) =>
    lower.includes(part.toLowerCase()) ? (
      <span key={i} className="text-accent">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
