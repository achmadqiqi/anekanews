import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const media = (env as any).MEDIA;
    if (!media) {
      return new Response("Storage not configured", { status: 500 });
    }

    const filename = params.filename;
    if (!filename) {
      return new Response("Filename required", { status: 400 });
    }

    const object = await media.get(filename);
    if (!object) {
      return new Response("Image not found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("Cache-Control", "public, max-age=31536000");

    return new Response(object.body, {
      headers
    });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};
