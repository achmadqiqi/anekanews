-- Fix image_url to point to /images/
UPDATE published_articles 
SET image_url = '/images/cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat.jpg' 
WHERE slug = 'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat';

-- Insert secondary image into article_images table
INSERT OR REPLACE INTO article_images (slug, image_url, alt_text, position) VALUES (
  'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat',
  '/images/cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat-sub.jpg',
  'Desain Interior Kamar Kos-Kosan Milenial Minimalis yang Nyaman',
  1
);
