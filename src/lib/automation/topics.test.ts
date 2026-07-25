import { describe, expect, it } from "vitest";
import { selectDailyTopic } from "./topics";

describe("selectDailyTopic", () => {
  it("is deterministic for a calendar day", () => {
    const first = selectDailyTopic(new Date("2026-07-24T01:15:00Z"));
    const second = selectDailyTopic(new Date("2026-07-24T20:00:00Z"));

    expect(second).toEqual(first);
    expect(first.sourceExcerpts.length).toBeGreaterThan(0);
    expect(first.sourceExcerpts.every((source) => source.includes("https://"))).toBe(true);
  });
});
