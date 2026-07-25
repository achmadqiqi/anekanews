import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import { CHANNELS } from "../lib/channels";
import { getPublicPosts } from "../lib/content";
import { AUTHORS } from "../lib/authors";

export const prerender = false;

const STATIC_PATHS = [
  "",
  "tentang",
  "kontak",
  "kebijakan-privasi",
  "disclaimer",
  "pedoman-media",
  "kebijakan-editorial",
];

export const GET: APIRoute = async () => {
  const posts = await getPublicPosts((env as any).DB).catch(() => []);
  const now = new Date().toISOString();

  const staticEntries = STATIC_PATHS.map(
    (path) => `<url><loc>https://anekanews.com/${path}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`
  );

  const channelEntries = CHANNELS.map(
    (channel) => `<url><loc>https://anekanews.com/kategori/${channel.slug}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq></url>`
  );

  const authorEntries = Object.keys(AUTHORS).map(
    (authorSlug) => `<url><loc>https://anekanews.com/penulis/${authorSlug}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`
  );

  const postEntries = posts.map(
    (post) => `<url><loc>https://anekanews.com/artikel/${post.slug}</loc><lastmod>${post.publishedAt ? post.publishedAt.toISOString() : now}</lastmod><changefreq>monthly</changefreq></url>`
  );

  const body = [...staticEntries, ...channelEntries, ...authorEntries, ...postEntries].join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
    { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } }
  );
};
