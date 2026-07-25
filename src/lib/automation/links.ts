import { getCommercialTarget } from "../channels";
import type { ArticleDraft } from "./types";

interface LinkInventory {
  recentTargets: Array<string | undefined>;
  recentAnchors: string[];
}

const ANCHORS: Readonly<Record<string, readonly string[]>> = {
  "https://ultimatesport.co.id": [
    "penyedia fasilitas olahraga",
    "solusi lapangan olahraga",
    "fasilitas olahraga profesional",
  ],
  "https://qoobah.id": [
    "pengembangan solusi digital",
    "layanan teknologi untuk bisnis",
    "mitra pengembangan aplikasi",
  ],
  "https://ragapool.co.id": [
    "perencanaan kolam renang",
    "kontraktor kolam renang",
    "layanan pembangunan kolam",
  ],
};

export function applyCommercialLink(
  draft: ArticleDraft,
  inventory: LinkInventory,
): ArticleDraft {
  if (draft.commercialLink) return draft;

  const destination = getCommercialTarget(draft.channel);
  if (!destination) return draft;

  const recentCommercialCount = inventory.recentTargets
    .slice(0, 5)
    .filter(Boolean).length;
  if (recentCommercialCount >= 3) return draft;

  const candidates = ANCHORS[destination] ?? [];
  const anchor =
    candidates.find((candidate) => !inventory.recentAnchors.includes(candidate)) ??
    candidates[0];
  if (!anchor) return draft;

  return {
    ...draft,
    commercialLink: { url: destination, anchor },
  };
}
