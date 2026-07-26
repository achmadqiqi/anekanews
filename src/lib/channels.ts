export interface Channel {
  slug: string;
  name: string;
  description: string;
  accent: string;
  commercialTarget?: string;
}

export const CHANNELS: readonly Channel[] = [
  {
    slug: "olahraga",
    name: "Olahraga",
    description: "Olahraga, fasilitas, kebugaran, dan komunitas.",
    accent: "#dc2626",
    commercialTarget: "https://ultimatesport.co.id",
  },
  {
    slug: "teknologi",
    name: "Teknologi",
    description: "Teknologi, AI, perangkat lunak, dan transformasi digital.",
    accent: "#2563eb",
    commercialTarget: "https://qoobah.id",
  },
  {
    slug: "rumah-properti",
    name: "Rumah & Properti",
    description: "Hunian, konstruksi, properti, dan kolam renang.",
    accent: "#0891b2",
    commercialTarget: "https://ragapool.co.id",
  },
  {
    slug: "bisnis",
    name: "Bisnis",
    description: "Usaha, manajemen, pemasaran, dan ekonomi praktis.",
    accent: "#b45309",
  },
  {
    slug: "gaya-hidup",
    name: "Gaya Hidup",
    description: "Kehidupan, keluarga, perjalanan, dan inspirasi.",
    accent: "#7c3aed",
  },
];

export function getChannel(slug: string): Channel {
  const normalized = slug === "properti" ? "rumah-properti" : slug === "lifestyle" ? "gaya-hidup" : slug;
  const channel = CHANNELS.find((item) => item.slug === normalized || item.slug === slug);
  if (!channel) throw new Error(`Unknown channel: ${slug}`);
  return channel;
}

export function getCommercialTarget(channel: string): string | undefined {
  return getChannel(channel).commercialTarget;
}
