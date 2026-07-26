import { marked } from "marked";

/**
 * Converts a paragraph string or an array of paragraph strings into HTML using marked.
 */
export function renderMarkdownParagraph(paragraph: string): string {
  if (!paragraph) return "";
  const trimmed = paragraph.trim();
  
  // Headings
  if (trimmed.startsWith("### ")) {
    const text = trimmed.replace(/^###\s+/, "");
    return `<h3>${marked.parseInline(text)}</h3>`;
  }
  if (trimmed.startsWith("## ")) {
    const text = trimmed.replace(/^##\s+/, "");
    return `<h2>${marked.parseInline(text)}</h2>`;
  }
  if (trimmed.startsWith("# ")) {
    const text = trimmed.replace(/^#\s+/, "");
    return `<h1>${marked.parseInline(text)}</h1>`;
  }
  
  // Horizontal rule
  if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
    return "<hr />";
  }

  // Full block marked parse fallback
  return marked.parse(paragraph, { async: false }) as string;
}

export function renderFullBody(bodyParagraphs: string[]): string {
  if (!bodyParagraphs || !Array.isArray(bodyParagraphs)) return "";
  return bodyParagraphs
    .map((p) => renderMarkdownParagraph(p))
    .join("\n");
}
