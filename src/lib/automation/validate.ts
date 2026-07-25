import { getCommercialTarget } from "../channels";
import type { ArticleDraft } from "./types";

export interface ValidationResult {
  ok: boolean;
  score: number;
  errors: string[];
  warnings: string[];
}

function wordCount(value: string): number {
  return value.trim().split(/\s+/u).filter(Boolean).length;
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function validateDraft(draft: ArticleDraft): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  if (draft.title.trim().length < 30) {
    errors.push("Judul harus memiliki setidaknya 30 karakter");
  }
  if (wordCount(draft.body) < 800) {
    errors.push("Artikel harus memiliki setidaknya 800 kata");
  }
  if (!draft.sources.length) {
    errors.push("Artikel otomatis wajib memiliki sumber");
  }
  if (draft.sources.some((source) => !isHttpsUrl(source.url))) {
    errors.push("Semua sumber wajib menggunakan URL HTTPS yang valid");
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(draft.slug)) {
    errors.push("Slug artikel tidak valid");
  }

  if (draft.commercialLink) {
    const eligible = getCommercialTarget(draft.channel);
    let actualOrigin: string | undefined;
    try {
      actualOrigin = new URL(draft.commercialLink.url).origin;
    } catch {
      errors.push("URL komersial tidak valid");
    }
    if (!eligible || actualOrigin !== eligible) {
      errors.push("Tujuan komersial tidak sesuai dengan kanal");
    }
  }

  if (draft.excerpt.length > 180) {
    warnings.push("Ringkasan melebihi 180 karakter");
    score -= 10;
  }
  if (draft.tags.length > 6) {
    warnings.push("Artikel memiliki terlalu banyak tag");
    score -= 10;
  }
  score -= errors.length * 25;
  score = Math.max(0, score);

  return {
    ok: errors.length === 0 && score >= 80,
    score,
    errors,
    warnings,
  };
}
