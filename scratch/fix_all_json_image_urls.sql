-- Clean up JSON string image_urls in published_articles
UPDATE published_articles
SET image_url = '/images/' || slug || '.jpg'
WHERE image_url LIKE '{%';

-- Fix specific slugs to exact existing public image paths if needed
UPDATE published_articles
SET image_url = '/images/harga-properti-naik-tren-rumah-hemat-milenial-2026.jpg'
WHERE (slug LIKE '%house-flipping%' OR slug LIKE '%kos-kosan%') AND (image_url LIKE '{%' OR image_url IS NULL OR image_url = '');
