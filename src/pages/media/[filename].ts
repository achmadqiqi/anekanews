import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "webp": return "image/webp";
    case "png": return "image/png";
    case "jpg":
    case "jpeg": return "image/jpeg";
    default: return "application/octet-stream";
  }
}

export const GET: APIRoute = async (context) => {
  const { params } = context;
  try {
    const runtimeEnv = (context.locals as any)?.runtime?.env || (context.locals as any)?.env || env;
    const media = runtimeEnv?.MEDIA;
    if (!media) {
      return new Response("Storage not configured", {
        status: 500,
        headers: corsHeaders,
      });
    }

    const filename = params.filename;
    if (!filename) {
      return new Response("Filename required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const object = await media.get(filename);
    if (!object) {
      return new Response("Image not found", {
        status: 404,
        headers: corsHeaders,
      });
    }

    const headers = new Headers(corsHeaders);
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    
    // Explicitly enforce content type according to file extension
    const mimeType = getMimeType(filename);
    headers.set("Content-Type", mimeType);

    return new Response(object.body, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
      headers: corsHeaders,
    });
  }
};
