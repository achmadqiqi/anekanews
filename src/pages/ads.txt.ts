import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const runtimeEnv = (context.locals as any)?.runtime?.env || (context.locals as any)?.env || env;
  const pubId = runtimeEnv?.ADSENSE_PUBLISHER_ID || "pub-0000000000000000";
  const enabled = runtimeEnv?.ADSENSE_ENABLED === "true";

  if (!enabled || pubId === "pub-0000000000000000") {
    return new Response("# Google AdSense is currently disabled or pending publisher ID configuration.\n", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const content = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
