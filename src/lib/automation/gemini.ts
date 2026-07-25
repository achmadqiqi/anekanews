import type { ArticleDraft, ResearchBrief } from "./types";

type Fetcher = typeof fetch;

export class AiQuotaError extends Error {
  constructor(message = "AI free-tier quota is unavailable") {
    super(message);
    this.name = "AiQuotaError";
  }
}

export class AiResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AiResponseError";
  }
}

interface RoutineDraftInput {
  channel: string;
  topic: string;
  sourceExcerpts: string[];
}

interface GeminiGenerateResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
}

function extractText(payload: GeminiGenerateResponse): string {
  const text = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();
  if (!text) throw new AiResponseError("Gemini returned no article text");
  return text.replace(/^```(?:json)?\s*/u, "").replace(/\s*```$/u, "");
}

function parseDraft(text: string): ArticleDraft {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new AiResponseError("Gemini returned invalid article JSON");
  }
  const draft = value as Partial<ArticleDraft>;
  if (
    !draft.title ||
    !draft.slug ||
    !draft.excerpt ||
    !draft.body ||
    !draft.channel ||
    !Array.isArray(draft.tags) ||
    !Array.isArray(draft.sources)
  ) {
    throw new AiResponseError("Gemini article JSON is incomplete");
  }
  return draft as ArticleDraft;
}

export class GeminiEditorialClient {
  constructor(
    private readonly apiKey: string,
    private readonly fetcher: Fetcher = fetch,
  ) {
    if (!apiKey.trim()) throw new Error("Gemini API key is required");
  }

  async generateRoutineDraft(input: RoutineDraftInput): Promise<ArticleDraft> {
    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      "gemini-3.5-flash-lite:generateContent";
    const response = await this.fetcher(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": this.apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: [
                  "Tulis artikel informatif orisinal dalam Bahasa Indonesia.",
                  `Kanal: ${input.channel}`,
                  `Topik: ${input.topic}`,
                  "Panjang minimum 800 kata.",
                  "Jangan mengarang fakta di luar sumber.",
                  "Jangan menyalin susunan kalimat sumber.",
                  "Kembalikan JSON dengan field title, slug, excerpt, body, channel, tags, sources.",
                  "Sumber:",
                  ...input.sourceExcerpts,
                ].join("\n\n"),
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    });

    if (response.status === 429) throw new AiQuotaError();
    if (!response.ok) {
      throw new AiResponseError(`Gemini request failed: ${response.status}`);
    }
    return parseDraft(extractText(await response.json()));
  }

  async runWeeklyResearch(input: {
    topic: string;
    maxTotalTokens?: number;
  }): Promise<ResearchBrief> {
    const response = await this.fetcher(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": this.apiKey,
        },
        body: JSON.stringify({
          agent: "antigravity-preview-05-2026",
          input:
            `Riset topik berikut untuk redaksi media Indonesia: ${input.topic}. ` +
            "Berikan ringkasan dan daftar URL sumber primer.",
          environment: "remote",
          tools: [{ type: "google_search" }, { type: "url_context" }],
          agent_config: {
            type: "antigravity",
            model: "gemini-3.5-flash-lite",
            max_total_tokens: Math.min(input.maxTotalTokens ?? 30_000, 30_000),
          },
        }),
      },
    );
    if (response.status === 429) throw new AiQuotaError();
    if (!response.ok) {
      throw new AiResponseError(
        `Antigravity research failed: ${response.status}`,
      );
    }
    const payload = (await response.json()) as {
      output_text?: string;
      outputs?: Array<{ text?: string }>;
    };
    const summary =
      payload.output_text ??
      payload.outputs?.map((item) => item.text ?? "").join("\n").trim();
    if (!summary) throw new AiResponseError("Antigravity returned no research");
    return { topic: input.topic, summary, sources: [] };
  }
}
