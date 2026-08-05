import { vi, describe, expect, it } from "vitest";
import { createPlugin } from "../src/lib/emdash-sync-plugin";

// Mock database statements calls
const mockRun = vi.fn().mockResolvedValue({ success: true });
const mockBind = vi.fn().mockReturnValue({ run: mockRun });
const mockPrepare = vi.fn().mockReturnValue({ bind: mockBind });

// Mock the cloudflare:workers module
vi.mock("cloudflare:workers", () => {
  return {
    env: {
      DB: {
        prepare: (query: string) => mockPrepare(query),
      }
    }
  };
});

describe("emdash-sync-plugin", () => {
  const plugin = createPlugin({});
  const mockCtx = {
    log: {
      info: vi.fn(),
      error: vi.fn(),
    }
  } as any;

  it("registers the hooks and capabilities correctly", () => {
    expect(plugin.id).toBe("emdash-sync-plugin");
    expect(plugin.capabilities).toContain("content:read");
    expect(plugin.hooks).toHaveProperty("content:afterPublish");
    expect(plugin.hooks).toHaveProperty("content:afterUnpublish");
  });

  it("handles content:afterPublish hook for posts", async () => {
    const handler = (plugin.hooks as any)["content:afterPublish"].handler;
    const mockEvent = {
      collection: "posts",
      content: {
        slug: "test-article",
        title: "Test Article Title",
        excerpt: "Test excerpt description.",
        content: [
          {
            _type: "block",
            children: [{ text: "This is body paragraph 1." }]
          }
        ],
        terms: {
          category: [{ slug: "bisnis" }]
        },
        bylines: [
          {
            byline: { name: "Penulis AnekaNews" }
          }
        ],
        publishedAt: "2026-07-27T00:00:00.000Z",
        featured_image: { src: "https://example.com/image.jpg" }
      }
    };

    await handler(mockEvent, mockCtx);

    expect(mockPrepare).toHaveBeenCalledWith(
      expect.stringContaining("INSERT OR REPLACE INTO published_articles")
    );
    expect(mockBind).toHaveBeenCalledWith(
      "test-article",
      "Test Article Title",
      "Test excerpt description.",
      JSON.stringify(["This is body paragraph 1."]),
      "bisnis",
      JSON.stringify([]),
      "[]",
      "Penulis AnekaNews",
      "2026-07-27T00:00:00.000Z",
      "https://example.com/image.jpg"
    );
    expect(mockRun).toHaveBeenCalled();
  });

  it("handles content:afterUnpublish hook for posts", async () => {
    const handler = (plugin.hooks as any)["content:afterUnpublish"].handler;
    const mockEvent = {
      collection: "posts",
      content: {
        slug: "test-article"
      }
    };

    await handler(mockEvent, mockCtx);

    expect(mockPrepare).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM published_articles WHERE slug = ?")
    );
    expect(mockBind).toHaveBeenCalledWith("test-article");
    expect(mockRun).toHaveBeenCalled();
  });
});
