import { CHANNELS } from "../channels";

const TOPICS: Record<string, readonly string[]> = {
  olahraga: [
    "Cara merencanakan fasilitas olahraga luar ruang yang tahan cuaca",
    "Prinsip dasar drainase dan perawatan lapangan olahraga",
  ],
  teknologi: [
    "Panduan praktis keamanan data untuk UMKM",
    "Cara menilai manfaat otomasi AI untuk pekerjaan rutin",
  ],
  "rumah-properti": [
    "Hal yang perlu direncanakan sebelum membangun kolam renang rumah",
    "Panduan memilih material area luar rumah yang mudah dirawat",
  ],
  bisnis: [
    "Cara sederhana mengelola arus kas usaha kecil",
    "Menyusun proses kerja yang rapi sebelum melakukan otomasi",
  ],
  "gaya-hidup": [
    "Membuat rumah nyaman dan fleksibel untuk keluarga muda",
    "Kebiasaan sederhana untuk menjaga keseimbangan aktivitas harian",
  ],
};

const SOURCES: Record<string, readonly string[]> = {
  olahraga: [
    "https://www.kemenpora.go.id/",
    "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
  ],
  teknologi: [
    "https://www.bssn.go.id/",
    "https://www.komdigi.go.id/",
  ],
  "rumah-properti": [
    "https://sahabat.pu.go.id/",
    "https://www.bmkg.go.id/",
  ],
  bisnis: [
    "https://www.bi.go.id/",
    "https://www.ojk.go.id/",
  ],
  "gaya-hidup": [
    "https://ayosehat.kemkes.go.id/",
    "https://www.who.int/health-topics/physical-activity",
  ],
};

export function selectDailyTopic(now: Date): {
  channel: string;
  topic: string;
  sourceExcerpts: string[];
} {
  const day = Math.floor(now.getTime() / 86_400_000);
  const channel = CHANNELS[day % CHANNELS.length].slug;
  const choices = TOPICS[channel];
  return {
    channel,
    topic: choices[Math.floor(day / CHANNELS.length) % choices.length],
    sourceExcerpts: SOURCES[channel].map((url) => `Sumber primer: ${url}`),
  };
}
