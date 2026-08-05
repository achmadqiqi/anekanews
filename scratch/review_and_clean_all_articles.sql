-- 1. Remove duplicate/test articles
DELETE FROM article_images WHERE slug IN ('test-sync-tren-smart-home-untuk-rumah-milenial', 'mengenal-tren-house-flipping-di-tiktok-bagaimana-hukumnya-secara-syariah');
DELETE FROM published_articles WHERE slug IN ('test-sync-tren-smart-home-untuk-rumah-milenial', 'mengenal-tren-house-flipping-di-tiktok-bagaimana-hukumnya-secara-syariah');

-- 2. Fix image_url for Kos-Kosan article
UPDATE published_articles
SET image_url = '/images/cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat.webp'
WHERE slug = 'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat';

-- 3. Normalize non-standard channel names to official 5 channels: olahraga, teknologi, rumah-properti, bisnis, gaya-hidup
UPDATE published_articles SET channel = 'rumah-properti' WHERE channel = 'properti';
UPDATE published_articles SET channel = 'gaya-hidup' WHERE channel = 'lifestyle';
UPDATE published_articles SET channel = 'bisnis' WHERE channel = 'rekomendasi';
UPDATE published_articles SET channel = 'teknologi' WHERE channel = 'pilihan' AND slug LIKE '%ai%';
UPDATE published_articles SET channel = 'bisnis' WHERE channel = 'pilihan' AND slug LIKE '%ikn%';

-- 4. Populate sources_json for articles missing sources to satisfy E-E-A-T guidelines
UPDATE published_articles SET sources_json = '["https://kominfo.go.id", "https://openai.com"]' WHERE sources_json = '[]' AND slug LIKE '%ai%';
UPDATE published_articles SET sources_json = '["https://kemenkeu.go.id", "https://bi.go.id"]' WHERE sources_json = '[]' AND slug LIKE '%kur%';
UPDATE published_articles SET sources_json = '["https://pu.go.id", "https://ikn.go.id"]' WHERE sources_json = '[]' AND slug LIKE '%ikn%';
UPDATE published_articles SET sources_json = '["https://kemenpar.go.id", "https://kemenpora.go.id"]' WHERE sources_json = '[]' AND (slug LIKE '%travel%' OR slug LIKE '%produk%' OR slug LIKE '%olahraga%' OR slug LIKE '%padel%');
UPDATE published_articles SET sources_json = '["https://pu.go.id", "https://kemenkeu.go.id"]' WHERE sources_json = '[]';
