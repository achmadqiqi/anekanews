import type { ArticleDraft } from "./types";

export class D1ArticlePublisher {
  constructor(private readonly db: D1Database) {}

  async publish(draft: ArticleDraft, now = new Date()): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO published_articles
         (slug, title, excerpt, body, channel, tags_json, sources_json, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(slug) DO NOTHING`,
      )
      .bind(
        draft.slug,
        draft.title,
        draft.excerpt,
        draft.body,
        draft.channel,
        JSON.stringify(draft.tags),
        JSON.stringify(draft.sources),
        now.toISOString(),
      )
      .run();
  }
}
