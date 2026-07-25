import { describe, expect, it } from "vitest";
import {
  CHANNELS,
  getChannel,
  getCommercialTarget,
} from "../src/lib/channels";

describe("editorial channels", () => {
  it("defines five unique channels", () => {
    expect(CHANNELS).toHaveLength(5);
    expect(new Set(CHANNELS.map((item) => item.slug)).size).toBe(5);
  });

  it("maps commercial destinations only to relevant channels", () => {
    expect(getCommercialTarget("olahraga")).toBe(
      "https://ultimatesport.co.id",
    );
    expect(getCommercialTarget("teknologi")).toBe("https://qoobah.id");
    expect(getCommercialTarget("rumah-properti")).toBe(
      "https://ragapool.co.id",
    );
    expect(getCommercialTarget("gaya-hidup")).toBeUndefined();
  });

  it("rejects an unknown channel", () => {
    expect(() => getChannel("unknown")).toThrow("Unknown channel");
  });
});
