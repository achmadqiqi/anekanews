-- Delete from child tables first to respect foreign key constraints
DELETE FROM article_images WHERE slug IN (
  'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat',
  'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariah',
  'mengenal-tren-house-flipping-di-tiktok-hukum-syariah',
  'mengenal-tren-house-flipping-di-tiktok-hukum-syariat'
);

DELETE FROM published_articles WHERE slug IN (
  'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat',
  'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariah',
  'mengenal-tren-house-flipping-di-tiktok-hukum-syariah',
  'mengenal-tren-house-flipping-di-tiktok-hukum-syariat'
);

-- Insert primary entry
INSERT INTO published_articles (
  slug, title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
) VALUES (
  'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat',
  'Cara Memulai Bisnis Kos-Kosan Milenial yang Sesuai Syariat',
  'Raih passive income berkah tanpa riba! Simak panduan lengkap cara memulai bisnis kos-kosan syariah yang aman, estetik, dan diminati generasi milenial.',
  '["Siapa yang tidak tergiur melihat tren passive income di TikTok? Banyak kreator muda yang dengan bangganya memamerkan kebebasan finansial mereka hanya dengan bermodalkan bisnis sewa properti, khususnya kos-kosan. Bisa liburan ke mana saja, bekerja santai dari kafe, sementara uang kos bulanan mengalir terus ke rekening.", "Namun, di balik gaya hidup tersebut, banyak bisnis kos-kosan yang beralih menjadi kos bebas (campur pria dan wanita tanpa pengawasan) demi menarik lebih banyak penyewa. Sebagai seorang muslim, tentu kita sadar bahwa kekayaan bukan sekadar soal angka, tapi soal keberkahan.", "Bisakah kita meraup cuan maksimal dari bisnis kos-kosan milenial, namun tetap menjaga syariat dan bebas dari pergaulan bebas? Tentu saja! Mari kita bahas caranya secara mendalam.", "## Mengapa Bisnis Kos-Kosan Sangat Menjanjikan di 2026?", "Seiring dengan kembalinya aktivitas normal pasca-pandemi dan tren hybrid working, tingkat mobilitas anak muda dan pekerja kantoran (terutama Generasi Z) di kota-kota besar semakin tinggi. Mereka lebih memilih menyewa kos yang dekat dengan pusat bisnis atau kampus daripada menghabiskan waktu berjam-jam menembus kemacetan. Tingginya permintaan (demand) inilah yang membuat bisnis indekos seolah tidak ada matinya.", "## Mengapa Harus Mengusung Konsep Kos Syariah?", "Mungkin Anda khawatir: \"Kalau aturannya ketat, nanti kosannya sepi.\" Padahal, realitanya justru sebaliknya! Kos berkonsep syariah kini menjadi buruan utama di wilayah perkotaan.", "### Tiga Manfaat Utama Konsep Kos Syariah:", "1. **Tingginya Permintaan Khusus:** Banyak orang tua mahasiswa dan pekerja muslim yang rela membayar lebih mahal asalkan mendapatkan lingkungan kos yang aman, tenang, dan terjaga privasinya.", "2. **Keberkahan Harta:** Menyewakan properti berarti Anda memfasilitasi kegiatan penyewa. Membiarkan properti Anda menjadi tempat maksiat (pergaulan bebas, miras, dll) sama dengan membiarkan aliran dosa jariyah. Kos syariah memastikan passive income Anda bersih dan membawa berkah.", "3. **Penyewa Lebih Berkualitas:** Penyewa yang mencari kos syariah umumnya memiliki karakter yang lebih rapi, tenang, dan bertanggung jawab terhadap perawatan fasilitas properti Anda.", "## Empat Langkah Praktis Memulai Bisnis Kos Syariah ala Milenial", "Berikut adalah langkah-langkah strategis memulai bisnis kos syariah yang laris manis di kalangan milenial:", "### 1. Menentukan Lokasi Strategis", "Lokasi adalah nyawa dari bisnis properti. Carilah lahan atau rumah di dekat area kampus, kawasan industri, atau perkantoran. Tidak harus di pinggir jalan raya besar; masuk gang sedikit tidak masalah asalkan akses motor mudah dan lingkungannya aman.", "### 2. Desain Estetik & Instagramable", "Milenial dan Gen Z sangat peduli dengan estetika. Anda tidak perlu membangun kos yang mewah bak hotel bintang lima. Cukup usung konsep minimalis, clean look (seperti gaya Japandi atau Industrial), sirkulasi udara yang baik, dan furnitur fungsional. Kamar kos yang terang dan rapi akan sangat cepat laku saat dipasarkan melalui TikTok atau Instagram.", "### 3. Buat Aturan yang Jelas Namun Ramah", "Label syariah bukan berarti kos Anda harus bernuansa pesantren yang kaku. Buatlah aturan tertulis yang tegas di awal (misal: larangan membawa tamu lawan jenis ke dalam kamar, jam malam untuk tamu), tetapi sampaikan dengan cara komunikasi yang ramah. Sediakan ruang tamu terbuka (communal space) agar penyewa tetap bisa menerima tamu dengan sopan tanpa melanggar privasi.", "### 4. Manfaatkan Teknologi Digital", "Pasang CCTV di area publik untuk keamanan, gunakan smart lock di pintu gerbang, dan pasarkan kos Anda melalui platform digital (TikTok, Instagram Reels, Mamikos). Visualisasikan kebersihan dan kenyamanan kos syariah Anda.", "## Kesimpulan dan Catatan Sumber Resmi", "Menjalankan bisnis kos-kosan di era sekarang bukan sekadar berburu passive income. Pandanglah bisnis ini sebagai ladang amal jariyah: Anda menyediakan tempat bernaung yang aman, bersih, dan menenangkan bagi para musafir, perantau, atau penuntut ilmu.", "Dengan desain kamar yang kekinian dipadukan dengan aturan syariat yang menenangkan, kos-kosan Anda tidak hanya akan diserbu oleh generasi milenial, tetapi juga mengalirkan rezeki yang berkah dunia dan akhirat.", "---", "*Artikel properti ini diterbitkan oleh Redaksi AnekaNews berdasarkan dokumen panduan investasi properti syariah dan laporan tren hunian milenial 2026.*"]',
  'rumah-properti',
  '["Bisnis Kos Syariah", "Kos Milenial", "Properti Syariah 2026", "Passive Income Halal", "Investasi Kosan"]',
  '["https://pu.go.id", "https://kemenkeu.go.id"]',
  'Redaksi AnekaNews',
  datetime('now'),
  '/images/harga-properti-naik-tren-rumah-hemat-milenial-2026.jpg'
);

-- Insert alias entries
INSERT INTO published_articles (
  slug, title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
)
SELECT 
  'mengenal-tren-house-flipping-di-tiktok-hukum-syariah',
  title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
FROM published_articles WHERE slug = 'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat';

INSERT INTO published_articles (
  slug, title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
)
SELECT 
  'mengenal-tren-house-flipping-di-tiktok-hukum-syariat',
  title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
FROM published_articles WHERE slug = 'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat';

INSERT INTO published_articles (
  slug, title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
)
SELECT 
  'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariah',
  title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
FROM published_articles WHERE slug = 'cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat';

-- Insert secondary images into article_images
INSERT INTO article_images (slug, image_url, alt_text, position) VALUES
('cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariat', '/images/harga-properti-naik-tren-rumah-hemat-milenial-2026-sub.jpg', 'Desain Interior Kamar Kos-Kosan Syariah Milenial Minimalis', 1),
('cara-memulai-bisnis-kos-kosan-milenial-yang-sesuai-syariah', '/images/harga-properti-naik-tren-rumah-hemat-milenial-2026-sub.jpg', 'Desain Interior Kamar Kos-Kosan Syariah Milenial Minimalis', 1),
('mengenal-tren-house-flipping-di-tiktok-hukum-syariah', '/images/harga-properti-naik-tren-rumah-hemat-milenial-2026-sub.jpg', 'Desain Interior Kamar Kos-Kosan Syariah Milenial Minimalis', 1),
('mengenal-tren-house-flipping-di-tiktok-hukum-syariat', '/images/harga-properti-naik-tren-rumah-hemat-milenial-2026-sub.jpg', 'Desain Interior Kamar Kos-Kosan Syariah Milenial Minimalis', 1);
