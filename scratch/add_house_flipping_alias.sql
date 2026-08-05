-- Insert alias record for mengenal-tren-house-flipping-di-tiktok-hukum-syariat
INSERT OR REPLACE INTO published_articles (
  slug, title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
)
SELECT 
  'mengenal-tren-house-flipping-di-tiktok-hukum-syariat',
  'Cara Memulai Bisnis Kos-Kosan Milenial yang Sesuai Syariat',
  excerpt,
  body,
  channel,
  tags_json,
  sources_json,
  author,
  published_at,
  image_url
FROM published_articles
WHERE slug = 'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat';

-- Also insert secondary image alias into article_images
INSERT OR REPLACE INTO article_images (slug, image_url, alt_text, position) VALUES (
  'mengenal-tren-house-flipping-di-tiktok-hukum-syariat',
  '/images/cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat-sub.jpg',
  'Desain Interior Kamar Kos-Kosan Milenial Minimalis yang Nyaman',
  1
);
