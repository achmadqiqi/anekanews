-- Insert or replace all published posts from ec_posts into published_articles
INSERT OR REPLACE INTO published_articles (
  slug, title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
)
SELECT 
  slug,
  title,
  COALESCE(NULLIF(excerpt, ''), title) as excerpt,
  COALESCE(NULLIF(content, ''), '[]') as body,
  'rumah-properti' as channel,
  '[]' as tags_json,
  '[]' as sources_json,
  'Redaksi AnekaNews' as author,
  COALESCE(published_at, datetime('now')) as published_at,
  COALESCE(featured_image, '/images/harga-properti-naik-tren-rumah-hemat-milenial-2026.jpg') as image_url
FROM ec_posts
WHERE status = 'published' AND slug IS NOT NULL AND slug != '';
