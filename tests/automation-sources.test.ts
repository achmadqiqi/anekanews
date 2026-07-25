import { describe, expect, it } from "vitest";
import { normalizeApprovedUrl } from "../src/lib/automation/sources";

describe("normalizeApprovedUrl", () => {
  const allowed = new Set(["example.org", "developers.google.com"]);

  it("accepts an exact allowlisted HTTPS host", () => {
    expect(
      normalizeApprovedUrl("https://example.org/news?id=1", allowed).href,
    ).toBe("https://example.org/news?id=1");
  });

  it("rejects HTTP, IP literals, and unlisted subdomains", () => {
    expect(() =>
      normalizeApprovedUrl("http://example.org/news", allowed),
    ).toThrow("HTTPS");
    expect(() =>
      normalizeApprovedUrl("https://127.0.0.1/news", allowed),
    ).toThrow("IP literal");
    expect(() =>
      normalizeApprovedUrl("https://news.example.org/news", allowed),
    ).toThrow("allowlist");
  });
});
