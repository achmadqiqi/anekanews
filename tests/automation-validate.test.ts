import { describe, expect, it } from "vitest";
import type { ArticleDraft } from "../src/lib/automation/types";
import { validateDraft } from "../src/lib/automation/validate";

const longBody = Array.from(
  { length: 820 },
  (_, index) => `kata${index}`,
).join(" ");

function draft(patch: Partial<ArticleDraft> = {}): ArticleDraft {
  return {
    title: "Panduan Lengkap Merencanakan Lapangan Olahraga Modern",
    slug: "panduan-lapangan-olahraga-modern",
    excerpt:
      "Hal penting yang perlu diperiksa sebelum membangun fasilitas olahraga.",
    body: longBody,
    channel: "olahraga",
    tags: ["fasilitas olahraga"],
    sources: [
      {
        title: "Pedoman fasilitas",
        url: "https://example.org/pedoman-fasilitas",
      },
    ],
    ...patch,
  };
}

describe("validateDraft", () => {
  it("accepts a compliant Indonesian draft", () => {
    const result = validateDraft(draft());
    expect(result.ok).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(80);
  });

  it("rejects a short title and body", () => {
    const result = validateDraft(draft({ title: "Judul pendek", body: "Singkat" }));
    expect(result.ok).toBe(false);
    expect(result.errors).toContain("Judul harus memiliki setidaknya 30 karakter");
    expect(result.errors).toContain("Artikel harus memiliki setidaknya 800 kata");
  });

  it("rejects a draft without sources", () => {
    const result = validateDraft(draft({ sources: [] }));
    expect(result.ok).toBe(false);
    expect(result.errors).toContain("Artikel otomatis wajib memiliki sumber");
  });

  it("rejects a commercial target that does not match the channel", () => {
    const result = validateDraft(
      draft({
        commercialLink: {
          url: "https://ragapool.co.id/jasa",
          anchor: "kontraktor kolam renang",
        },
      }),
    );
    expect(result.ok).toBe(false);
    expect(result.errors).toContain("Tujuan komersial tidak sesuai dengan kanal");
  });
});
