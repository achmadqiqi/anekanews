import { astro, FetchState } from "astro/fetch";
import { cf } from "@astrojs/cloudflare/fetch";
import { createApp } from "astro/app/entrypoint";
import { ulid } from "emdash";
import { GeminiEditorialClient } from "./lib/automation/gemini";
import { advanceNextJob } from "./lib/automation/pipeline";
import { D1ArticlePublisher } from "./lib/automation/publisher";
import { D1JobRepository } from "./lib/automation/repository";
import { selectDailyTopic } from "./lib/automation/topics";

interface Env {
  DB: D1Database;
  SESSION: KVNamespace;
  CACHE: KVNamespace;
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

    const state = new FetchState(request);
    const asset = await cf(state, env, ctx);
    if (asset) return asset;
    return astro(state);
  },

  async scheduled(
    event: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    ctx.waitUntil(runEditorialPipeline(env, new Date(event.scheduledTime)));
  },
};
