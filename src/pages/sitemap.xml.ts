import type { APIRoute } from "astro";
import { CHANNELS } from "../lib/channels";
import { getPublicPosts } from "../lib/content";

const STATIC_PATHS = [
  "",
  "tentang",
  "kontak",
  "kebijakan-privasi",
  "disclaimer",
  "pedoman-media",
];

export const GET: APIRoute = async ({ locals }) => {
  const posts = await getPublicPosts(locals.cfContext?.env?.DB);
  const urls = [
    ...STATIC_PATHS.map((path) => `https://anekanews.com/${path}`),
    ...CHANNELS.map(
      (channel) => `https://anekanews.com/kategori/${channel.slug}`,
    ),
    ...posts.map((post) => `https://anekanews.com/artikel/${post.slug}`),
  ];
  const body = urls
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
    { headers: { "content-type": "application/xml; charset=utf-8" } },
  );
};
