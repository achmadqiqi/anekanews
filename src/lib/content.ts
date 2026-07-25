import { CHANNELS } from "./channels";

export interface PublicPost {
  slug: string;
  title: string;
  excerpt: string;
  channel: string;
  publishedAt: Date;
  author: string;
  readingMinutes: number;
  body: string[];
  featured?: boolean;
  image_url?: string;
  images?: { image_url: string; alt_text?: string | null }[];
}

export const DEMO_POSTS: readonly PublicPost[] = [
  {
    slug: "membangun-fasilitas-olahraga-yang-bertahan-lama",
    title: "Membangun Fasilitas Olahraga yang Nyaman dan Bertahan Lama",
    excerpt:
      "Perencanaan permukaan, drainase, pencahayaan, dan perawatan menentukan kualitas fasilitas olahraga.",
    channel: "olahraga",
    publishedAt: new Date("2026-07-24T08:00:00+07:00"),
    author: "Redaksi AnekaNews",
    readingMinutes: 6,
    featured: true,
    body: [
      "Fasilitas olahraga yang baik tidak hanya terlihat menarik ketika pertama kali dibuka. Kualitas sebenarnya terlihat setelah digunakan setiap hari, terkena perubahan cuaca, dan menjalani perawatan rutin.",
      "Perencanaan perlu dimulai dari kebutuhan pengguna, karakter lokasi, sistem drainase, pilihan material, dan pola operasional. Keputusan yang tepat sejak awal dapat mengurangi biaya perbaikan sekaligus meningkatkan kenyamanan.",
      "AnekaNews membahas topik ini sebagai panduan awal. Perhitungan teknis tetap perlu disesuaikan dengan kondisi lapangan dan diperiksa oleh tenaga yang kompeten.",
    ],
  },
  {
    slug: "ai-agent-mengubah-cara-umkm-bekerja",
    title: "Bagaimana AI Agent Mengubah Cara UMKM Menjalankan Pekerjaan",
    excerpt:
      "AI agent mulai bergeser dari alat percakapan menjadi sistem yang dapat menyelesaikan rangkaian pekerjaan.",
    channel: "teknologi",
    publishedAt: new Date("2026-07-23T08:00:00+07:00"),
    author: "Redaksi AnekaNews",
    readingMinutes: 5,
    body: [
      "AI agent membantu usaha kecil mengotomatisasi pekerjaan berulang, mulai dari pengelolaan data hingga penyusunan laporan.",
      "Manfaat terbesar muncul ketika proses bisnis sudah jelas. Otomatisasi yang dipasang pada proses yang berantakan justru dapat mempercepat kesalahan.",
    ],
  },
  {
    slug: "kolam-renang-rumah-perlu-direncanakan-sejak-awal",
    title: "Mengapa Kolam Renang Rumah Perlu Direncanakan Sejak Awal",
    excerpt:
      "Struktur, sirkulasi, ruang mesin, dan akses perawatan harus menjadi satu kesatuan perencanaan.",
    channel: "rumah-properti",
    publishedAt: new Date("2026-07-22T08:00:00+07:00"),
    author: "Redaksi AnekaNews",
    readingMinutes: 7,
    body: [
      "Kolam renang merupakan bagian bangunan yang menampung air secara terus-menerus. Karena itu, keputusan desain tidak sebaiknya dilakukan setelah struktur rumah selesai.",
      "Ruang mesin, jalur perpipaan, akses teknisi, elevasi, dan pembuangan air perlu dibahas sejak tahap perencanaan.",
    ],
  },
  {
    slug: "membaca-arus-kas-usaha-dengan-sederhana",
    title: "Cara Sederhana Membaca Arus Kas Sebelum Usaha Kehabisan Napas",
    excerpt:
      "Laba di atas kertas tidak selalu berarti uang tunai tersedia untuk membayar kebutuhan operasional.",
    channel: "bisnis",
    publishedAt: new Date("2026-07-21T08:00:00+07:00"),
    author: "Redaksi AnekaNews",
    readingMinutes: 5,
    body: [
      "Arus kas menunjukkan kapan uang masuk dan keluar. Catatan sederhana yang diperbarui rutin sering lebih berguna daripada laporan rumit yang terlambat.",
      "Pemilik usaha perlu memisahkan uang pribadi, biaya operasional, kewajiban, dan dana pengembangan.",
    ],
  },
  {
    slug: "membuat-rumah-nyaman-untuk-keluarga-muda",
    title: "Membuat Rumah Lebih Nyaman untuk Keluarga Muda",
    excerpt:
      "Ruang yang mudah dirawat, aman, dan fleksibel sering lebih berharga daripada dekorasi yang berlebihan.",
    channel: "gaya-hidup",
    publishedAt: new Date("2026-07-20T08:00:00+07:00"),
    author: "Redaksi AnekaNews",
    readingMinutes: 4,
    body: [
      "Kebutuhan rumah keluarga berubah cepat. Area bermain hari ini dapat berubah menjadi area belajar atau ruang kerja beberapa tahun kemudian.",
      "Sirkulasi yang jelas, penyimpanan yang cukup, pencahayaan alami, dan material yang mudah dibersihkan membantu rumah tetap nyaman.",
    ],
  },
];

export function getPost(slug: string): PublicPost | undefined {
  return DEMO_POSTS.find((post) => post.slug === slug);
}

export function getPostsByChannel(channel: string): PublicPost[] {
  if (!CHANNELS.some((item) => item.slug === channel)) return [];
  return DEMO_POSTS.filter((post) => post.channel === channel);
}

interface ArticleRow {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  channel: string;
  author: string;
  published_at: string;
  image_url?: string | null;
}

function parseSafeDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const isoStr = dateStr.includes(" ") ? dateStr.replace(" ", "T") + "Z" : dateStr;
  const d = new Date(isoStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

function rowToPost(row: ArticleRow): PublicPost {
  let body: string[] = [];
  if (typeof row.body === "string" && row.body.trim().startsWith("[")) {
    try {
      body = JSON.parse(row.body);
    } catch {
      body = [row.body];
    }
  } else {
    body = row.body
      .split(/\n{2,}/u)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: body.length > 0 ? body : [row.excerpt],
    channel: row.channel,
    author: row.author || "Redaksi AnekaNews",
    publishedAt: parseSafeDate(row.published_at),
    image_url: row.image_url || undefined,
    readingMinutes: Math.max(
      1,
      Math.ceil((Array.isArray(body) ? body.join(" ") : row.body).trim().split(/\s+/u).length / 200),
    ),
  };
}

export async function getPublicPosts(
  db?: D1Database,
  channel?: string,
): Promise<PublicPost[]> {
  if (!db) {
    return channel ? getPostsByChannel(channel) : [...DEMO_POSTS];
  }
  const query = channel
    ? db
        .prepare(
          `SELECT slug, title, excerpt, body, channel, author, published_at, image_url
           FROM published_articles WHERE channel = ?
           ORDER BY published_at DESC LIMIT 50`,
        )
        .bind(channel)
    : db.prepare(
        `SELECT slug, title, excerpt, body, channel, author, published_at, image_url
         FROM published_articles ORDER BY published_at DESC LIMIT 50`,
      );
  const result = await query.all<ArticleRow>();
  const generated = result.results.map(rowToPost);
  return generated.length > 0 ? generated : [...DEMO_POSTS];
}

export async function getPublicPost(
  slug: string,
  db?: D1Database,
): Promise<PublicPost | undefined> {
  if (!db) return getPost(slug);
  const row = await db
    .prepare(
      `SELECT slug, title, excerpt, body, channel, author, published_at, image_url
       FROM published_articles WHERE slug = ? LIMIT 1`,
    )
    .bind(slug)
    .first<ArticleRow>();
  if (!row) return getPost(slug);

  const post = rowToPost(row);

  try {
    const imagesResult = await db
      .prepare(
        `SELECT image_url, alt_text FROM article_images WHERE slug = ? ORDER BY position ASC`
      )
      .bind(slug)
      .all<{ image_url: string; alt_text: string | null }>();
    if (imagesResult.results && imagesResult.results.length > 0) {
      post.images = imagesResult.results;
    }
  } catch (error) {
    console.error("Failed to fetch article_images:", error);
  }

  return post;
}

export function formatIndonesianDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
