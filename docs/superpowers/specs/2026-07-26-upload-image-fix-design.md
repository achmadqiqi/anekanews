# Design Specification: Image Upload & Serving via Cloudflare R2

This specification outlines the setup of Cloudflare R2 bucket, adding bindings to Astro, building endpoints for uploading and serving images, enabling CORS, migrating the D1 database, and rendering the hero image on the article details page.

## Proposed Architecture

1. **R2 Storage**: Cloudflare R2 bucket `anekanews-media` bound to the worker environment under the name `MEDIA`.
2. **Upload Endpoint (`POST /api/upload-image`)**:
   - Accepts `multipart/form-data` requests.
   - Validates MIME types: `image/jpeg`, `image/png`, `image/webp`.
   - Validates file size (max 5MB).
   - Generates filename `[timestamp]-[random6].webp` where `random6` is a 6-character random alphanumeric string.
   - Stores files in `MEDIA` R2 bucket using `env.MEDIA.put`.
   - Returns `{ success: true, url: "https://anekanews.com/media/[key]", key: "[key]" }`.
   - Handles `OPTIONS` request for CORS with status 204.
3. **Serving Endpoint (`GET /media/[filename]`)**:
   - Reads the file from R2 using `env.MEDIA.get(filename)`.
   - Returns 404 if the file is not found.
   - Infers the `Content-Type` header from file extension.
   - Sets cache headers: `Cache-Control: public, max-age=31536000, immutable`.
   - Handles `OPTIONS` request for CORS.
4. **CORS Headers**:
   - `Access-Control-Allow-Origin: *`
   - `Access-Control-Allow-Methods: GET, POST, OPTIONS`
   - `Access-Control-Allow-Headers: Content-Type`
5. **Database Migration**:
   - Executes `ALTER TABLE published_articles ADD COLUMN image_url TEXT;` on the D1 database.
6. **Astro Page Updates (Home & Article Detail)**:
   - Fetches `image_url` along with other article columns from D1 in `src/lib/content.ts`.
   - In `src/pages/artikel/[slug].astro` and `src/layouts/ArticleLayout.astro`, if `image_url` is present, renders a lazy-loaded `<img>` tag with appropriate alt text.
   - In `src/components/ArticleCard.astro` (which is used in Home `src/pages/index.astro` and others), if `post.image_url` is present, renders an `<img>` tag with `loading="lazy"` inside the visual wrappers (`hero-visual-wrap`, `side-visual-wrap`, `horizontal-visual`, `grid-visual-wrap`), maintaining the gradient bg as fallback.

## Alternatives Evaluated

### Option 1 (Recommended): Integrate inside Astro using custom bindings fallback
- **Pros**: Matches existing Astro project design; utilizes Astro SSR routing; fallback to context.locals ensures it works in dev and prod.
- **Cons**: None.

### Option 2: Separate worker for media storage and upload
- **Pros**: Offloads image processing and upload requests from the main Astro application.
- **Cons**: Extra deployment overhead, CORS configurations are more complex across domains, doesn't match the current codebase.

## Verification plan

- **Test 1**: Use `curl` to upload an image and assert 200 OK with success and the correct URL structure.
- **Test 2**: Retrieve the uploaded image via `curl -I` and assert 200 OK with `image/webp` content type and cache control headers.
- **Test 3**: Query a published article with `image_url` populated and check if the image displays correctly with `loading="lazy"`.
