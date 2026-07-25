export type JobStatus =
  | "queued"
  | "researching"
  | "drafting"
  | "validating"
  | "ready"
  | "published"
  | "deferred"
  | "failed";

export interface AutomationJob {
  id: string;
  idempotencyKey: string;
  channel: string;
  topic: string;
  status: JobStatus;
  attempts: number;
  scheduledFor: string;
  lastError?: string;
  payloadJson?: string;
}

export interface ArticleDraft {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  channel: string;
  tags: string[];
  sources: Array<{ title: string; url: string }>;
  commercialLink?: { url: string; anchor: string };
}

export interface ResearchBrief {
  topic: string;
  summary: string;
  sources: Array<{ title: string; url: string }>;
}

export interface JobRepository {
  enqueue(job: AutomationJob): Promise<"created" | "duplicate">;
  nextDue(now: string): Promise<AutomationJob | undefined>;
  update(
    id: string,
    status: JobStatus,
    patch?: { lastError?: string; payloadJson?: string },
  ): Promise<void>;
  publishedCount(datePrefix: string): Promise<number>;
}
