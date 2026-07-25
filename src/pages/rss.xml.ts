import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import { getPublicPosts } from "../lib/content";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = async () => {
  const posts = await getPublicPosts((env as any).DB);
  const items = posts
    .map(
      (post) => `<item>
<title>${escapeXml(post.title)}</title>
<link>https://anekanews.com/artikel/${post.slug}</link>
<guid>https://anekanews.com/artikel/${post.slug}</guid>
<description>${escapeXml(post.excerpt)}</description>
<pubDate>${post.publishedAt.toUTCString()}</pubDate>
</item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>
<title>AnekaNews</title>
<link>https://anekanews.com</link>
<description>Beragam informasi tepercaya untuk keputusan yang lebih baik.</description>
<language>id-ID</language>${items}</channel></rss>`,
    { headers: { "content-type": "application/rss+xml; charset=utf-8" } },
  );
};
