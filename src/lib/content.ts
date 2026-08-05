
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
  sources?: { title?: string; url: string }[];
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
    image_url: "/images/membangun-fasilitas-olahraga-yang-bertahan-lama.jpg",
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
    image_url: "/images/ai-agent-mengubah-cara-umkm-bekerja.jpg",
    body: [
      "AI agent membantu usaha kecil mengotomatisasi pekerjaan berulang, mulai dari pengelolaan data hingga penyusunan laporan.",
      "Manfaat terbesar muncul ketika proses bisnis sudah jelas. Otomatisasi yang dipasang pada proses yang berantakan justru dapat mempercepat kesalahan.",
    ],
  },
  {
    slug: "kolam-renang-rumah-perlu-direncanakan-sejak-awal",
    title: "Mengapa Kolam Renang Rumah Perlu Direncanakan Sejak Awal",
    excerpt:
      "Struktur, sirkulasi air, dan keamanan anak menjadi tiga pilar penting sebelum penggalian dimulai.",
    channel: "properti",
    publishedAt: new Date("2026-07-22T08:00:00+07:00"),
    author: "Redaksi AnekaNews",
    readingMinutes: 7,
    image_url: "/images/kolam-renang-rumah-perlu-direncanakan-sejak-awal.jpg",
    body: [
      "Kolam renang pribadi di hunian menambah kenyamanan sekaligus nilai properti jika direncanakan secara teknis.",
      "Pertimbangan beban tanah, akses pipa sirkulasi, dan pagar pengaman wajib dipikirkan sebelum konstruksi.",
    ],
  },
  {
    slug: "tren-olahraga-padel-di-kota-besar",
    title: "Tren Olahraga Padel: Mengapa Cabang Ini Cepat Populer",
    excerpt:
      "Kemudahan mempelajari ritme permainan membuat padel diminati berbagai kelompok usia.",
    channel: "olahraga",
    publishedAt: new Date("2026-07-21T08:00:00+07:00"),
    author: "Redaksi AnekaNews",
    readingMinutes: 4,
    image_url: "/images/tren-olahraga-padel-di-kota-besar.jpg",
    body: [
      "Padel kombinasi tenis dan skuasy dengan dinding kaca yang membuat bola tetap dimainkan.",
      "Lapangan yang lebih ringkas memungkinkan interaksi sosial yang lebih hangat di antara pemain.",
    ],
  },
];

export function getPost(slug: string): PublicPost | undefined {
  return DEMO_POSTS.find((post) => post.slug === slug);
}

export function getPostsByChannel(channel: string): PublicPost[] {
  const norm = channel === "rumah-properti" ? "properti" : channel === "gaya-hidup" ? "lifestyle" : channel;
  return DEMO_POSTS.filter((post) => post.channel === channel || post.channel === norm);
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
  sources_json?: string | null;
}

function parseSafeDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const isoStr = dateStr.includes(" ") ? dateStr.replace(" ", "T") + "Z" : dateStr;
  const d = new Date(isoStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

function parseImageUrl(imageUrl: string | null | undefined, slug?: string): string | undefined {
  if (!imageUrl) return undefined;
  const trimmed = imageUrl.trim();
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed.src && typeof parsed.src === "string") return parsed.src;
      if (parsed.url && typeof parsed.url === "string") return parsed.url;
    } catch {
      // Ignore JSON parse errors
    }
    return slug ? `/images/${slug}.jpg` : "/images/harga-properti-naik-tren-rumah-hemat-milenial-2026.jpg";
  }
  return trimmed;
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

  let sources: { title?: string; url: string }[] | undefined;
  if (row.sources_json) {
    try {
      sources = JSON.parse(row.sources_json);
    } catch {
      sources = undefined;
    }
  }

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: body.length > 0 ? body : [row.excerpt],
    channel: row.channel,
    author: row.author || "Redaksi AnekaNews",
    publishedAt: parseSafeDate(row.published_at),
    image_url: parseImageUrl(row.image_url, row.slug),
    sources,
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

  let query;
  if (channel) {
    if (channel === "rumah-properti" || channel === "properti") {
      query = db.prepare(
        `SELECT slug, title, excerpt, body, channel, author, published_at, image_url, sources_json
         FROM published_articles WHERE channel IN ('properti', 'rumah-properti')
           AND published_at <= datetime('now', '+7 hours')
         ORDER BY published_at DESC LIMIT 50`
      );
    } else if (channel === "gaya-hidup" || channel === "lifestyle") {
      query = db.prepare(
        `SELECT slug, title, excerpt, body, channel, author, published_at, image_url, sources_json
         FROM published_articles WHERE channel IN ('gaya-hidup', 'lifestyle')
           AND published_at <= datetime('now', '+7 hours')
         ORDER BY published_at DESC LIMIT 50`
      );
    } else {
      query = db
        .prepare(
          `SELECT slug, title, excerpt, body, channel, author, published_at, image_url, sources_json
           FROM published_articles WHERE channel = ?
             AND published_at <= datetime('now', '+7 hours')
           ORDER BY published_at DESC LIMIT 50`,
        )
        .bind(channel);
    }
  } else {
    query = db.prepare(
      `SELECT slug, title, excerpt, body, channel, author, published_at, image_url, sources_json
       FROM published_articles
       WHERE published_at <= datetime('now', '+7 hours')
       ORDER BY published_at DESC LIMIT 50`,
    );
  }

  const result = await query.all<ArticleRow>();
  const generated = result.results.map(rowToPost);
  return generated.length > 0 ? generated : [...DEMO_POSTS];
}

export async function getPublicPost(
  slug: string,
  db?: D1Database,
): Promise<PublicPost | undefined> {
  if (!db) return getPost(slug);
  const cleanSlug = slug.toLowerCase().trim().replace(/\/+$/, "");

  // 1. Primary lookup in published_articles
  let row = await db
    .prepare(
      `SELECT slug, title, excerpt, body, channel, author, published_at, image_url, sources_json
       FROM published_articles WHERE LOWER(slug) = LOWER(?) LIMIT 1`,
    )
    .bind(cleanSlug)
    .first<ArticleRow>();

  // 2. Fallback lookup by LIKE pattern in published_articles
  if (!row) {
    row = await db
      .prepare(
        `SELECT slug, title, excerpt, body, channel, author, published_at, image_url, sources_json
         FROM published_articles WHERE LOWER(slug) LIKE LOWER(?) LIMIT 1`,
      )
      .bind(`%${cleanSlug}%`)
      .first<ArticleRow>();
  }

  // 3. Fallback lookup in ec_posts (Emdash CMS published posts) & auto-sync to published_articles
  if (!row) {
    try {
      const ecRow = await db
        .prepare(
          `SELECT slug, title, excerpt, content, published_at, featured_image
           FROM ec_posts WHERE LOWER(slug) = LOWER(?) AND status = 'published' LIMIT 1`,
        )
        .bind(cleanSlug)
        .first<{
          slug: string;
          title: string;
          excerpt: string | null;
          content: string | null;
          published_at: string | null;
          featured_image: string | null;
        }>();

      if (ecRow) {
        let paragraphs: string[] = [];
        if (ecRow.content) {
          try {
            const parsed = JSON.parse(ecRow.content);
            if (Array.isArray(parsed)) {
              paragraphs = parsed
                .filter((block: any) => block?._type === "block" && Array.isArray(block.children))
                .map((block: any) => block.children.map((c: any) => c.text || "").join(""))
                .filter((text: string) => text.trim().length > 0);
            }
          } catch {
            paragraphs = [ecRow.content];
          }
        }
        const bodyJson = JSON.stringify(paragraphs.length > 0 ? paragraphs : [ecRow.excerpt || ecRow.title]);
        const excerptText = ecRow.excerpt || (paragraphs[0] ? paragraphs[0].slice(0, 150) : ecRow.title);
        const pubAt = ecRow.published_at || new Date().toISOString();

        // Auto-sync into published_articles
        await db
          .prepare(
            `INSERT OR REPLACE INTO published_articles (
              slug, title, excerpt, body, channel, tags_json, sources_json, author, published_at, image_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            ecRow.slug,
            ecRow.title,
            excerptText,
            bodyJson,
            "rumah-properti",
            "[]",
            "[]",
            "Redaksi AnekaNews",
            pubAt,
            ecRow.featured_image || "/images/harga-properti-naik-tren-rumah-hemat-milenial-2026.jpg"
          )
          .run();

        row = {
          slug: ecRow.slug,
          title: ecRow.title,
          excerpt: excerptText,
          body: bodyJson,
          channel: "rumah-properti",
          author: "Redaksi AnekaNews",
          published_at: pubAt,
          image_url: ecRow.featured_image || undefined,
          sources_json: "[]",
        };
      }
    } catch (e) {
      console.error("Fallback ec_posts lookup failed:", e);
    }
  }

  if (!row) return getPost(cleanSlug);

  const post = rowToPost(row);

  try {
    const imagesResult = await db
      .prepare(
        `SELECT image_url, alt_text FROM article_images WHERE LOWER(slug) = LOWER(?) ORDER BY position ASC`
      )
      .bind(post.slug)
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
