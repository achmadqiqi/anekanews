export interface RuntimeEnv {
  DB: D1Database;
  MEDIA: R2Bucket;
  CACHE: KVNamespace;
  GEMINI_API_KEY?: string;
  AI_OVERAGE_ENABLED: "false";
  MAX_DAILY_ARTICLES: "1";
}

export function getRuntimeEnv(value: unknown): RuntimeEnv {
  const env = value as Partial<RuntimeEnv>;
  if (!env.DB || !env.MEDIA || !env.CACHE) {
    throw new Error("Required Cloudflare bindings are unavailable");
  }
  if (env.AI_OVERAGE_ENABLED !== "false") {
    throw new Error("Paid AI overage must remain disabled");
  }
  return env as RuntimeEnv;
}
