# Cloudflare R2 Upload & Serving Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Cloudflare R2 bucket for article image storage, write endpoints to upload and serve images with CORS enabled, execute database migrations to add `image_url` column, and render the article images on the Home page and article detail pages.

**Architecture:** We configure the R2 binding `MEDIA` in `wrangler.jsonc`. We implement the upload endpoint `POST /api/upload-image` and image serving endpoint `GET /media/[filename]`, with both robustly reading bindings from both Cloudflare global context and Astro `locals` fallback. We then run database migrations and update the Home page components (`ArticleCard`) and article details page to show images.

**Tech Stack:** Astro, Cloudflare Workers, Cloudflare R2, Cloudflare D1.

## Global Constraints

- Worker name: `anekanews`
- Account ID: `c22018ef1434d958e89d537c898f446b`
- Bucket Name: `anekanews-media`
- R2 binding name: `MEDIA`
- Max upload size: 5MB
- Allowed file types: `image/jpeg`, `image/png`, `image/webp`
- CORS headers:
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Methods: GET, POST, OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type`
- OPTIONS request returns 204 with CORS headers.

---

### Task 1: R2 Bucket Creation & Configuration

**Files:**
- Modify: `wrangler.jsonc`

**Interfaces:**
- Produces: `MEDIA` R2 Bucket binding in the worker environment.

- [ ] **Step 1: Create the R2 bucket using Wrangler**

Run: `npx wrangler r2 bucket create anekanews-media`
Expected: Bucket `anekanews-media` created successfully on Cloudflare.

- [ ] **Step 2: Update `wrangler.jsonc` configuration**

Uncomment/add the `r2_buckets` binding configuration inside `wrangler.jsonc`:
```json
  "r2_buckets": [
    {
      "binding": "MEDIA",
      "bucket_name": "anekanews-media"
    }
  ],
```

- [ ] **Step 3: Commit R2 configuration changes**

Run:
```bash
git add wrangler.jsonc
git commit -m "config: enable R2 MEDIA binding in wrangler.jsonc"
```

---

### Task 2: Upload Endpoint (`POST /api/upload-image`)

**Files:**
- Modify: `src/pages/api/upload-image.ts`

**Interfaces:**
- Produces: `POST /api/upload-image` and `OPTIONS /api/upload-image` routes.

- [ ] **Step 1: Write the updated upload endpoint code**

Write the following implementation to `src/pages/api/upload-image.ts`:
```typescript
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

    const timestamp = Date.now();
    const random6 = Math.random().toString(36).substring(2, 8).padEnd(6, "0");
    const filename = `${timestamp}-${random6}.webp`;

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
```

- [ ] **Step 2: Build the project locally to verify no TypeScript compilation errors**

Run: `npm run build`
Expected: Build passes with zero errors.

- [ ] **Step 3: Commit code changes**

Run:
```bash
git add src/pages/api/upload-image.ts
git commit -m "feat: rewrite upload image endpoint with validation, R2 put, and CORS"
```

---

### Task 3: Media Serving Endpoint (`GET /media/:filename`)

**Files:**
- Modify: `src/pages/media/[filename].ts`

**Interfaces:**
- Produces: `GET /media/[filename]` and `OPTIONS /media/[filename]` routes.

- [ ] **Step 1: Write the updated serving endpoint code**

Write the following implementation to `src/pages/media/[filename].ts`:
```typescript
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
```

- [ ] **Step 2: Build the project locally**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 3: Commit changes**

Run:
```bash
git add src/pages/media/\[filename\].ts
git commit -m "feat: update media serving endpoint with content-type resolver, R2 get, and CORS"
```

---

### Task 4: D1 Database Migration

**Files:**
- Modify: (Database schema changes via command line)

**Interfaces:**
- Produces: `image_url` column added to the `published_articles` table.

- [ ] **Step 1: Execute SQL migrations in D1 DB on Cloudflare**

Run: `npx wrangler d1 execute DB --remote --command="ALTER TABLE published_articles ADD COLUMN image_url TEXT;"`
Expected: Success or message stating that it was already added (since it is in migration 0002).

---

### Task 5: Page & Card Component Updates for Image Rendering

**Files:**
- Modify: `src/layouts/ArticleLayout.astro`
- Modify: `src/components/ArticleCard.astro`

**Interfaces:**
- Consumes: `post.image_url` from the `PublicPost` type.
- Produces: Images rendered inside elements on the Home page and article detail pages.

- [ ] **Step 1: Update article hero rendering in `ArticleLayout.astro`**

Change `src/layouts/ArticleLayout.astro` at lines 51-57:
```astro
    {post.image_url ? (
      <div class="article-hero">
        <picture>
          <source srcset={post.image_url} type="image/webp" />
          <img src={post.image_url} alt={post.title} loading="lazy" />
        </picture>
      </div>
    ) : (
```

- [ ] **Step 2: Update card image rendering in `ArticleCard.astro`**

Modify `src/components/ArticleCard.astro` to add `<img>` tags inside all visual wrapper elements:
For `featured-main`:
```astro
{variant === "featured-main" && (
  <article class="hero-main-card">
    <a href={`/artikel/${post.slug}`} class="hero-visual-wrap" style={`background: ${gradientBg};`}>
      {post.image_url && <img src={post.image_url} alt={post.title} loading="lazy" />}
      <span class="hero-pill-badge">{post.channel}</span>
    </a>
...
```
For `featured-side`:
```astro
{variant === "featured-side" && (
  <article class="side-card">
    <a href={`/artikel/${post.slug}`} class="side-visual-wrap" style={`background: ${gradientBg};`}>
      {post.image_url && <img src={post.image_url} alt={post.title} loading="lazy" />}
      <span class="side-pill-badge">{post.channel}</span>
    </a>
...
```
For `horizontal`:
```astro
{variant === "horizontal" && (
  <article class="horizontal-card">
    <a href={`/artikel/${post.slug}`} class="horizontal-visual" style={`background: ${gradientBg};`}>
      {post.image_url && <img src={post.image_url} alt={post.title} loading="lazy" />}
    </a>
...
```
For `grid`:
```astro
{variant === "grid" && (
  <article class="grid-card">
    <a href={`/artikel/${post.slug}`} class="grid-visual-wrap" style={`background: ${gradientBg};`}>
      {post.image_url && <img src={post.image_url} alt={post.title} loading="lazy" />}
    </a>
...
```

- [ ] **Step 3: Run local build to verify types**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 4: Commit UI changes**

Run:
```bash
git add src/layouts/ArticleLayout.astro src/components/ArticleCard.astro
git commit -m "feat: render article hero images on article page and Home page cards"
```

---

### Task 6: Deploy & Verification

**Files:**
- None

**Interfaces:**
- Produces: Deployed site running on Cloudflare.

- [ ] **Step 1: Deploy to Cloudflare**

Run: `npx wrangler deploy`
Expected: Deploys successfully.

- [ ] **Step 2: Verification Test 1 - Upload Image**

Run a local POST curl request to test uploading:
```bash
curl -X POST https://anekanews.com/api/upload-image -F "image=@tests/fixtures/test.png"
```
Verify JSON response structure.

- [ ] **Step 3: Verification Test 2 - Serve Image**

Run a HEAD curl request to verify headers:
```bash
curl -I https://anekanews.com/media/your-uploaded-key.webp
```
Verify HTTP 200, Content-Type: `image/webp` or correct type, and cache headers.

- [ ] **Step 4: Verification Test 3 - Check Home and Article Page**

Update/insert a database record with `image_url` populated, load `https://anekanews.com` and the article page, and verify the image is shown.
