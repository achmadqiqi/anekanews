import { describe, expect, it } from "vitest";
import { AiQuotaError } from "../src/lib/automation/gemini";
import {
  advanceNextJob,
  type PipelineDependencies,
} from "../src/lib/automation/pipeline";
import type {
  ArticleDraft,
  AutomationJob,
  JobRepository,
  JobStatus,
} from "../src/lib/automation/types";

const now = new Date("2026-07-24T01:15:00.000Z");
const validBody = Array.from({ length: 820 }, (_, index) => `kata${index}`).join(
  " ",
);
const validDraft: ArticleDraft = {
  title: "Panduan Lengkap Merencanakan Lapangan Olahraga Modern",
  slug: "panduan-lapangan-olahraga-modern",
  excerpt: "Ringkasan informasi fasilitas olahraga.",
  body: validBody,
  channel: "olahraga",
  tags: ["olahraga"],
  sources: [{ title: "Sumber", url: "https://example.org/source" }],
};

class MemoryJobs implements JobRepository {
  jobs: AutomationJob[] = [];
  published = 0;

  async enqueue(job: AutomationJob): Promise<"created" | "duplicate"> {
    if (this.jobs.some((item) => item.idempotencyKey === job.idempotencyKey)) {
      return "duplicate";
    }
    this.jobs.push(job);
    return "created";
  }

  async nextDue(): Promise<AutomationJob | undefined> {
    return this.jobs.find(
      (job) => !["published", "failed", "deferred"].includes(job.status),
    );
  }

  async update(
    id: string,
    status: JobStatus,
    patch: { lastError?: string; payloadJson?: string } = {},
  ): Promise<void> {
    const job = this.jobs.find((item) => item.id === id);
    if (!job) throw new Error("Missing job");
    job.status = status;
    job.attempts += 1;
    Object.assign(job, patch);
    if (status === "published") this.published += 1;
  }

  async publishedCount(): Promise<number> {
    return this.published;
  }
}

function dependencies(
  repository: MemoryJobs,
  patch: Partial<PipelineDependencies> = {},
): PipelineDependencies {
  return {
    repository,
    selectTopic: () => ({
      channel: "olahraga",
      topic: "lapangan olahraga",
    }),
    generateDraft: async () => validDraft,
    publishDraft: async () => undefined,
    createId: () => "job-1",
    ...patch,
  };
}

describe("advanceNextJob", () => {
  it("enqueues only one daily job across duplicate cron invocations", async () => {
    const repository = new MemoryJobs();
    const deps = dependencies(repository);
    expect(await advanceNextJob(deps, now)).toEqual({ status: "enqueued" });
    expect(await advanceNextJob(deps, now)).toEqual({ status: "advanced" });
    expect(repository.jobs).toHaveLength(1);
  });

  it("does not schedule a second daily publication", async () => {
    const repository = new MemoryJobs();
    repository.published = 1;
    expect(await advanceNextJob(dependencies(repository), now)).toEqual({
      status: "daily-limit",
    });
  });

  it("defers a job when free-tier quota is unavailable", async () => {
    const repository = new MemoryJobs();
    repository.jobs.push({
      id: "job-1",
      idempotencyKey: "key",
      channel: "teknologi",
      topic: "AI",
      status: "drafting",
      attempts: 0,
      scheduledFor: now.toISOString(),
    });
    await advanceNextJob(
      dependencies(repository, {
        generateDraft: async () => {
          throw new AiQuotaError();
        },
      }),
      now,
    );
    expect(repository.jobs[0].status).toBe("deferred");
  });

  it("fails validation and never publishes an invalid draft", async () => {
    const repository = new MemoryJobs();
    repository.jobs.push({
      id: "job-1",
      idempotencyKey: "key",
      channel: "olahraga",
      topic: "lapangan",
      status: "validating",
      attempts: 0,
      scheduledFor: now.toISOString(),
      payloadJson: JSON.stringify({ ...validDraft, body: "terlalu singkat" }),
    });
    let publishes = 0;
    await advanceNextJob(
      dependencies(repository, {
        publishDraft: async () => {
          publishes += 1;
        },
      }),
      now,
    );
    expect(repository.jobs[0].status).toBe("failed");
    expect(publishes).toBe(0);
  });

  it("publishes a ready draft exactly once", async () => {
    const repository = new MemoryJobs();
    repository.jobs.push({
      id: "job-1",
      idempotencyKey: "key",
      channel: "olahraga",
      topic: "lapangan",
      status: "ready",
      attempts: 0,
      scheduledFor: now.toISOString(),
      payloadJson: JSON.stringify(validDraft),
    });
    let publishes = 0;
    const deps = dependencies(repository, {
      publishDraft: async () => {
        publishes += 1;
      },
    });
    await advanceNextJob(deps, now);
    await advanceNextJob(deps, now);
    expect(publishes).toBe(1);
    expect(repository.jobs[0].status).toBe("published");
  });
});
