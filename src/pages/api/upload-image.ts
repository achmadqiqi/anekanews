import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const media = (env as any).MEDIA;
    if (!media) {
      return new Response(JSON.stringify({ success: false, error: "R2 binding MEDIA not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return new Response(JSON.stringify({ success: false, error: "No image file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const slug = (formData.get("slug") as string) || "image";
    const timestamp = Date.now();
    const filename = `${slug}-${timestamp}.webp`;

    const arrayBuffer = await file.arrayBuffer();
    await media.put(filename, arrayBuffer, {
      httpMetadata: { contentType: file.type || "image/webp" }
    });

    return new Response(
      JSON.stringify({
        success: true,
        url: `https://anekanews.com/media/${filename}`
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
