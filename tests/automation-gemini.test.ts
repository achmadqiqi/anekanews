import { describe, expect, it } from "vitest";
import {
  AiQuotaError,
  GeminiEditorialClient,
} from "../src/lib/automation/gemini";

const validDraft = {
  title: "Panduan Lengkap Merencanakan Lapangan Olahraga Modern",
  slug: "panduan-lapangan-olahraga-modern",
  excerpt: "Ringkasan informasi.",
  body: "Isi artikel.",
  channel: "olahraga",
  tags: ["olahraga"],
  sources: [{ title: "Sumber", url: "https://example.org/source" }],
};

describe("GeminiEditorialClient", () => {
  it("uses only Flash Lite for routine drafts", async () => {
    let requestedUrl = "";
    const client = new GeminiEditorialClient("key", async (input) => {
      requestedUrl = String(input);
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [{ text: JSON.stringify(validDraft) }],
              },
            },
          ],
        }),
        { status: 200 },
      );
    });

    const result = await client.generateRoutineDraft({
      channel: "olahraga",
      topic: "lapangan olahraga",
      sourceExcerpts: ["Sumber membahas perencanaan lapangan."],
    });

    expect(requestedUrl).toContain("gemini-3.5-flash-lite");
    expect(result.slug).toBe(validDraft.slug);
  });

  it("turns a 429 response into a quota error without fallback", async () => {
    let calls = 0;
    const client = new GeminiEditorialClient("key", async () => {
      calls += 1;
      return new Response("quota", { status: 429 });
    });

    await expect(
      client.generateRoutineDraft({
        channel: "teknologi",
        topic: "AI",
        sourceExcerpts: ["Sumber"],
      }),
    ).rejects.toBeInstanceOf(AiQuotaError);
    expect(calls).toBe(1);
  });
});
