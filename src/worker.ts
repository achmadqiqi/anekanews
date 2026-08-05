import { astro, FetchState } from "astro/fetch";
import { cf } from "@astrojs/cloudflare/fetch";
import { createApp } from "astro/app/entrypoint";
import { ulid } from "emdash";
import { GeminiEditorialClient } from "./lib/automation/gemini";
import { advanceNextJob } from "./lib/automation/pipeline";
import { D1ArticlePublisher } from "./lib/automation/publisher";
import { D1JobRepository } from "./lib/automation/repository";
import { selectDailyTopic } from "./lib/automation/topics";

interface Env extends __BaseEnv_Env {
  ASSETS: Fetcher;
  GEMINI_API_KEY: string;
}

let appInstance: ReturnType<typeof createApp> | undefined;

function getOrInitApp() {
  if (!appInstance) {
    appInstance = createApp();
  }
  return appInstance;
}

async function runEditorialPipeline(env: Env, now: Date): Promise<void> {
  const repository = new D1JobRepository(env.DB);
  const publisher = new D1ArticlePublisher(env.DB);
  const ai = new GeminiEditorialClient(env.GEMINI_API_KEY);
  const selected = selectDailyTopic(now);

  const dependencies = {
    repository,
    selectTopic: () => ({
      channel: selected.channel,
      topic: selected.topic,
    }),
    generateDraft: ({ channel, topic }: { channel: string; topic: string }) =>
      ai.generateRoutineDraft({
        channel,
        topic,
        sourceExcerpts: selected.sourceExcerpts,
      }),
    publishDraft: (draft: Parameters<typeof publisher.publish>[0]) =>
      publisher.publish(draft, now),
    createId: ulid,
  };

  for (let step = 0; step < 7; step += 1) {
    const result = await advanceNextJob(dependencies, now);
    if (result.status === "daily-limit" || result.status === "idle") break;
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const app = getOrInitApp();
    if (env.SESSION && app.manifest.sessionConfig) {
      const options = (app.manifest.sessionConfig.options as Record<string, unknown>) || {};
      options.binding = env.SESSION;
      app.manifest.sessionConfig.options = options as typeof app.manifest.sessionConfig.options;
    }
    if (!Reflect.has(request, Symbol.for("astro.app"))) {
      Reflect.set(request, Symbol.for("astro.app"), app);
    }
    const locals = (Reflect.get(request, Symbol.for("astro.locals")) as object) || {};
    Object.assign(locals, {
      runtime: { env, ctx },
      cfContext: { env, ctx },
      env,
    });
    Reflect.set(request, Symbol.for("astro.locals"), locals);

    try {
      const state = new FetchState(request);
      const asset = await cf(state, env, ctx);
      if (asset) return asset;

      // Check Cloudflare Cache API for GET/HEAD public HTML requests
      const isGetOrHead = request.method === "GET" || request.method === "HEAD";
      const url = new URL(request.url);
      const isBypassCache =
        url.searchParams.has("nocache") ||
        url.pathname.startsWith("/api/") ||
        url.pathname.startsWith("/quick-login") ||
        url.pathname.startsWith("/dev-bypass") ||
        request.headers.has("Authorization") ||
        (request.headers.get("Cookie")?.includes("session") ?? false);

      if (isGetOrHead && !isBypassCache) {
        const cache = (caches as any).default;
        const cacheKey = new Request(url.toString(), request);
        try {
          const cachedResponse = await cache.match(cacheKey);
          if (cachedResponse && cachedResponse.status === 200) {
            const hitResponse = new Response(cachedResponse.body, cachedResponse);
            hitResponse.headers.set("x-edge-cache", "HIT");
            return hitResponse;
          } else if (cachedResponse) {
            ctx.waitUntil(cache.delete(cacheKey));
          }
        } catch {
          // Ignore edge cache errors
        }
        const response = await astro(state);
        if (response.status === 200) {
          try {
            const responseToCache = new Response(response.body, response);
            responseToCache.headers.set(
              "Cache-Control",
              "public, max-age=60, s-maxage=300, stale-while-revalidate=600"
            );
            responseToCache.headers.set("x-edge-cache", "MISS");
            ctx.waitUntil(cache.put(cacheKey, responseToCache.clone()));
            return responseToCache;
          } catch {
            return response;
          }
        }
        return response;
      }

      return await astro(state);
    } catch (error) {
      console.error("Worker Execution Error:", error);
      return new Response(
        `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><title>AnekaNews - Memuat Ulang...</title><meta http-equiv="refresh" content="1"></head><body style="font-family:sans-serif;text-align:center;padding:4rem;"><h2>Memuat ulang halaman...</h2><p>Server sedang menyegarkan koneksi. Halaman akan terbuka otomatis.</p><script>setTimeout(()=>window.location.reload(),1000);</script></body></html>`,
        {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        }
      );
    }
  },

  async scheduled(
    event: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    ctx.waitUntil(runEditorialPipeline(env, new Date(event.scheduledTime)));
  },
};
