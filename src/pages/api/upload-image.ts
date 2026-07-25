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

export const POST: APIRoute = async (context) => {
  const { request } = context;
  try {
    const runtimeEnv = (context.locals as any)?.runtime?.env || (context.locals as any)?.env || env;
    const media = runtimeEnv?.MEDIA;
    if (!media) {
      return new Response(
        JSON.stringify({ success: false, error: "R2 binding MEDIA not found" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return new Response(
        JSON.stringify({ success: false, error: "No image file provided" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid file type. Only JPEG, PNG, and WEBP are allowed." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ success: false, error: "File too large. Max size is 5MB." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    function getExtension(mimeType: string): string {
      switch (mimeType) {
        case "image/jpeg": return "jpg";
        case "image/png": return "png";
        case "image/webp": return "webp";
        default: return "webp";
      }
    }

    const timestamp = Date.now();
    const random6 = Math.random().toString(36).substring(2, 8).padEnd(6, "0");
    const ext = getExtension(file.type);
    const filename = `${timestamp}-${random6}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    await media.put(filename, arrayBuffer, {
      httpMetadata: { contentType: file.type || "image/webp" },
    });

    return new Response(
      JSON.stringify({
        success: true,
        url: `https://anekanews.com/media/${filename}`,
        key: filename,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};
