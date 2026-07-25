export interface AuthorProfile {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  expertise: string[];
  email?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

export const AUTHORS: Record<string, AuthorProfile> = {
  "redaksi-anekanews": {
    slug: "redaksi-anekanews",
    name: "Redaksi AnekaNews",
    role: "Tim Redaksi & Fact-Checker",
    bio: "Tim editorial independen AnekaNews yang menyajikan berita dan panduan praktis berdasarkan rilis resmi, riset data, dan verifikasi sumber terpercaya.",
    expertise: ["Berita Umum", "Teknologi", "Properti", "Bisnis", "Gaya Hidup"],
    email: "redaksi@anekanews.com",
  },
  "budi-santoso": {
    slug: "budi-santoso",
    name: "Budi Santoso",
    role: "Jurnalis Senior Teknologi & AI",
    bio: "Jurnalis teknologi dengan pengalaman lebih dari 8 tahun mengulas perkembangan kecerdasan buatan, komputasi awan, dan transformasi digital UMKM di Indonesia.",
    expertise: ["Artificial Intelligence", "Cloud Computing", "Digital Transformation"],
    email: "budi.santoso@anekanews.com",
  },
  "sitia-nurfadilah": {
    slug: "sitia-nurfadilah",
    name: "Sitia Nurfadilah",
    role: "Editor Bisnis & Keuangan UMKM",
    bio: "Spesialis analisis kebijakan ekonomi mikro, perbankan nasional, program KUR, dan strategi pertumbuhan bisnis ritel.",
    expertise: ["Manajemen Keuangan", "Kredit Usaha Rakyat (KUR)", "Bisnis Ritel"],
    email: "sitia.nurfadilah@anekanews.com",
  },
};

export function getAuthor(slug: string): AuthorProfile | undefined {
  return AUTHORS[slug] || (slug === "redaksi-anekanews" ? AUTHORS["redaksi-anekanews"] : undefined);
}
