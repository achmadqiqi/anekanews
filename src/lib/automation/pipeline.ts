import { AiQuotaError } from "./gemini";
import type {
  ArticleDraft,
  AutomationJob,
  JobRepository,
} from "./types";
import { validateDraft } from "./validate";

export interface PipelineDependencies {
  repository: JobRepository;
  selectTopic: () => { channel: string; topic: string };
  generateDraft: (input: {
    channel: string;
    topic: string;
  }) => Promise<ArticleDraft>;
  publishDraft: (draft: ArticleDraft) => Promise<void>;
  createId: () => string;
}

export interface PipelineResult {
  status: "enqueued" | "advanced" | "daily-limit" | "idle";
}

function jakartaDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function parsePayload(job: AutomationJob): ArticleDraft {
  if (!job.payloadJson) throw new Error("Job has no article payload");
  return JSON.parse(job.payloadJson) as ArticleDraft;
}

export async function advanceNextJob(
  deps: PipelineDependencies,
  now: Date,
): Promise<PipelineResult> {
  const dateKey = jakartaDate(now);
  if ((await deps.repository.publishedCount(dateKey)) >= 1) {
    return { status: "daily-limit" };
  }

  const job = await deps.repository.nextDue(now.toISOString());
  if (!job) {
    const topic = deps.selectTopic();
    const result = await deps.repository.enqueue({
      id: deps.createId(),
      idempotencyKey: `${dateKey}:${topic.channel}:daily`,
      channel: topic.channel,
      topic: topic.topic,
      status: "queued",
      attempts: 0,
      scheduledFor: now.toISOString(),
    });
    return { status: result === "created" ? "enqueued" : "idle" };
  }

  try {
    switch (job.status) {
      case "queued":
        await deps.repository.update(job.id, "researching");
        break;
      case "researching":
        await deps.repository.update(job.id, "drafting");
        break;
      case "drafting": {
        const draft = await deps.generateDraft({
          channel: job.channel,
          topic: job.topic,
        });
        await deps.repository.update(job.id, "validating", {
          payloadJson: JSON.stringify(draft),
        });
        break;
      }
      case "validating": {
        const draft = parsePayload(job);
        const validation = validateDraft(draft);
        if (!validation.ok) {
          await deps.repository.update(job.id, "failed", {
            lastError: validation.errors.join("; "),
          });
        } else {
          await deps.repository.update(job.id, "ready");
        }
        break;
      }
      case "ready": {
        const draft = parsePayload(job);
        await deps.publishDraft(draft);
        await deps.repository.update(job.id, "published");
        break;
      }
      case "deferred":
      case "published":
      case "failed":
        return { status: "idle" };
    }
  } catch (error) {
    if (error instanceof AiQuotaError) {
      await deps.repository.update(job.id, "deferred", {
        lastError: error.message,
      });
    } else {
      await deps.repository.update(job.id, "failed", {
        lastError: error instanceof Error ? error.message : "Unknown failure",
      });
    }
  }

  return { status: "advanced" };
}
