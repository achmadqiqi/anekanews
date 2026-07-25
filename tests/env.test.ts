import { describe, expect, it } from "vitest";
import { getRuntimeEnv } from "../src/lib/env";

const bindings = {
  DB: {} as D1Database,
  MEDIA: {} as R2Bucket,
  CACHE: {} as KVNamespace,
  AI_OVERAGE_ENABLED: "false",
  MAX_DAILY_ARTICLES: "1",
};

describe("getRuntimeEnv", () => {
  it("accepts required free-plan bindings", () => {
    expect(getRuntimeEnv(bindings)).toMatchObject(bindings);
  });

  it("rejects missing Cloudflare bindings", () => {
    expect(() => getRuntimeEnv({ ...bindings, DB: undefined })).toThrow(
      "Required Cloudflare bindings are unavailable",
    );
  });

  it("rejects paid AI overage", () => {
    expect(() =>
      getRuntimeEnv({ ...bindings, AI_OVERAGE_ENABLED: "true" }),
    ).toThrow("Paid AI overage must remain disabled");
  });
});
