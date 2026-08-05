import { definePlugin } from "emdash";

// Helper function to convert Portable Text blocks to simple paragraphs
function portableTextToParagraphs(blocks: any[]): string[] {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .filter((block: any) => block._type === "block" && Array.isArray(block.children))
    .map((block: any) => block.children.map((c: any) => c.text || "").join(""))
    .filter((text: string) => text.trim().length > 0);
}

export function createPlugin(_config: any) {
  return definePlugin({
    id: "emdash-sync-plugin",
    version: "1.0.0",
    capabilities: ["content:read"],
    hooks: {
      "content:afterPublish": {
        handler: async (event, ctx) => {
          if (event.collection !== "posts") return;
          const content = event.content as any;

          let db: any;
          try {
            // Dynamically import the workers env context
            const workersEnv = (await import("cloudflare:workers")).env;
            db = (workersEnv as any).DB;
          } catch (e) {
            ctx.log.error("Failed to load Cloudflare D1 Database binding from cloudflare:workers", { error: String(e) });
            return;
          }

          if (!db) {
            ctx.log.error("D1 database binding 'DB' not found in environment.");
            return;
          }

          const slug = content.slug as string;
          const title = content.title as string;
          const excerpt = (content.excerpt as string) || "";
          const publishedAt = content.publishedAt 
            ? new Date(content.publishedAt as string).toISOString() 
            : new Date().toISOString();
          
          let imageUrl: string | null = null;
          if (content.featured_image) {
            if (typeof content.featured_image === "string") {
              if (content.featured_image.trim().startsWith("{")) {
                try {
                  const parsed = JSON.parse(content.featured_image);
                  imageUrl = parsed.src || parsed.url || null;
                } catch {
                  imageUrl = content.featured_image;
                }
              } else {
                imageUrl = content.featured_image;
              }
            } else if (typeof content.featured_image === "object") {
              imageUrl = (content.featured_image as any).src || (content.featured_image as any).url || null;
            }
          }
          if (!imageUrl) {
            imageUrl = `/images/${slug}.jpg`;
          }

          // Convert content blocks to paragraph array
          const paragraphs = portableTextToParagraphs(content.content as any[]);
          const bodyJson = JSON.stringify(paragraphs);

          // Resolve channel (category)
          const categoryTerms = (content.terms?.category || content.terms?.categories || []) as any[];
          const channel = categoryTerms[0]?.slug || "pilihan";

          // Resolve tags
          const tagTerms = (content.terms?.tag || content.terms?.tags || []) as any[];
          const tags = tagTerms.map((t: any) => t.name || t.slug);
          const tagsJson = JSON.stringify(tags);

          // Resolve author
          let author = "Redaksi AnekaNews";
          if (content.bylines && Array.isArray(content.bylines) && content.bylines.length > 0) {
            const primaryByline = content.bylines[0];
            if (primaryByline && primaryByline.byline) {
              author = primaryByline.byline.name || primaryByline.byline.label || "Redaksi AnekaNews";
            } else if (primaryByline && primaryByline.name) {
              author = primaryByline.name as string;
            }
          }

          ctx.log.info(`[Sync Plugin] Syncing published article '${slug}' to published_articles`);

          try {
            await db
              .prepare(
                `INSERT OR REPLACE INTO published_articles (
                  slug, title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
              )
              .bind(
                slug,
                title,
                excerpt,
                bodyJson,
                channel,
                tagsJson,
                "[]", // default empty sources array
                author,
                publishedAt,
                imageUrl
              )
              .run();
            ctx.log.info(`[Sync Plugin] Successfully synced article '${slug}'`);
          } catch (err) {
            ctx.log.error(`[Sync Plugin] Failed to sync article '${slug}'`, { error: String(err) });
          }
        }
      },
      "content:afterUnpublish": {
        handler: async (event, ctx) => {
          if (event.collection !== "posts") return;
          const content = event.content as any;

          let db: any;
          try {
            const workersEnv = (await import("cloudflare:workers")).env;
            db = (workersEnv as any).DB;
          } catch (e) {
            ctx.log.error("Failed to load Cloudflare D1 Database binding from cloudflare:workers", { error: String(e) });
            return;
          }

          if (!db) {
            ctx.log.error("D1 database binding 'DB' not found in environment.");
            return;
          }

          const slug = content.slug as string;
          ctx.log.info(`[Sync Plugin] Removing unpublished article '${slug}' from published_articles`);

          try {
            await db
              .prepare(`DELETE FROM published_articles WHERE slug = ?`)
              .bind(slug)
              .run();
            ctx.log.info(`[Sync Plugin] Successfully removed article '${slug}'`);
          } catch (err) {
            ctx.log.error(`[Sync Plugin] Failed to remove article '${slug}'`, { error: String(err) });
          }
        }
      }
    }
  });
}

export function emdashSyncPlugin(config: { entrypoint: string }) {
  return {
    id: "emdash-sync-plugin",
    version: "1.0.0",
    entrypoint: config.entrypoint,
    format: "native",
    options: {},
    capabilities: ["content:read"]
  };
}
