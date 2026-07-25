import { describe, expect, it } from "vitest";
import type { ArticleDraft } from "../src/lib/automation/types";
import { applyCommercialLink } from "../src/lib/automation/links";

const baseDraft: ArticleDraft = {
  title: "Panduan Lengkap Merencanakan Lapangan Olahraga Modern",
  slug: "panduan-lapangan-olahraga-modern",
  excerpt: "Ringkasan artikel.",
  body: "Isi artikel.",
  channel: "olahraga",
  tags: [],
  sources: [{ title: "Sumber", url: "https://example.org/sumber" }],
};

describe("applyCommercialLink", () => {
  it("adds one eligible destination with a non-repeated anchor", () => {
    const result = applyCommercialLink(baseDraft, {
      recentTargets: [],
      recentAnchors: ["fasilitas olahraga profesional"],
    });
    expect(result.commercialLink?.url).toBe("https://ultimatesport.co.id");
    expect(result.commercialLink?.anchor).not.toBe(
      "fasilitas olahraga profesional",
    );
  });

  it("does not add a fourth commercial link within five articles", () => {
    const result = applyCommercialLink(baseDraft, {
      recentTargets: [
        "https://ultimatesport.co.id",
        "https://ultimatesport.co.id",
        "https://ultimatesport.co.id",
        undefined,
        undefined,
      ],
      recentAnchors: [],
    });
    expect(result.commercialLink).toBeUndefined();
  });

  it("does not add a destination for lifestyle articles", () => {
    const result = applyCommercialLink(
      { ...baseDraft, channel: "gaya-hidup" },
      { recentTargets: [], recentAnchors: [] },
    );
    expect(result.commercialLink).toBeUndefined();
  });
});
