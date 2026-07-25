import { describe, expect, it, vi } from "vitest";
import { D1ArticlePublisher } from "./publisher";

describe("D1ArticlePublisher", () => {
  it("stores a validated draft idempotently", async () => {
    const run = vi.fn().mockResolvedValue({ success: true });
    const bind = vi.fn().mockReturnValue({ run });
    const prepare = vi.fn().mockReturnValue({ bind });
    const publisher = new D1ArticlePublisher({ prepare } as unknown as D1Database);

    await publisher.publish(
      {
        title: "Judul artikel yang cukup panjang untuk pembaca",
        slug: "judul-artikel",
        excerpt: "Ringkasan artikel.",
        body: "Isi artikel.",
        channel: "teknologi",
        tags: ["AI"],
        sources: [{ title: "BSSN", url: "https://www.bssn.go.id/" }],
      },
      new Date("2026-07-24T01:15:00Z"),
    );

    expect(prepare).toHaveBeenCalledWith(expect.stringContaining("ON CONFLICT(slug) DO NOTHING"));
    expect(bind).toHaveBeenCalledWith(
      "judul-artikel",
      expect.any(String),
      expect.any(String),
      expect.any(String),
      "teknologi",
      '["AI"]',
      '[{"title":"BSSN","url":"https://www.bssn.go.id/"}]',
      "2026-07-24T01:15:00.000Z",
    );
    expect(run).toHaveBeenCalledOnce();
  });
});
