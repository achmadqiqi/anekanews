import type {
  AutomationJob,
  JobRepository,
  JobStatus,
} from "./types";

const JOB_STATUSES = new Set<JobStatus>([
  "queued",
  "researching",
  "drafting",
  "validating",
  "ready",
  "published",
  "deferred",
  "failed",
]);

interface JobRow {
  id: string;
  idempotency_key: string;
  channel: string;
  topic: string;
  status: string;
  attempts: number;
  scheduled_for: string;
  last_error: string | null;
  payload_json: string | null;
}

export function mapJobRow(row: JobRow): AutomationJob {
  if (!JOB_STATUSES.has(row.status as JobStatus)) {
    throw new Error(`Invalid job status: ${row.status}`);
  }

  return {
    id: row.id,
    idempotencyKey: row.idempotency_key,
    channel: row.channel,
    topic: row.topic,
    status: row.status as JobStatus,
    attempts: row.attempts,
    scheduledFor: row.scheduled_for,
    ...(row.last_error ? { lastError: row.last_error } : {}),
    ...(row.payload_json ? { payloadJson: row.payload_json } : {}),
  };
}

function isUniqueConstraint(error: unknown): boolean {
  return (
    error instanceof Error &&
    /unique constraint|constraint failed/i.test(error.message)
  );
}

export class D1JobRepository implements JobRepository {
  constructor(private readonly db: D1Database) {}

  async enqueue(job: AutomationJob): Promise<"created" | "duplicate"> {
    try {
      await this.db
        .prepare(
          `INSERT INTO automation_jobs
           (id, idempotency_key, channel, topic, status, attempts, scheduled_for, last_error, payload_json)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          job.id,
          job.idempotencyKey,
          job.channel,
          job.topic,
          job.status,
          job.attempts,
          job.scheduledFor,
          job.lastError ?? null,
          job.payloadJson ?? null,
        )
        .run();
      return "created";
    } catch (error) {
      if (isUniqueConstraint(error)) return "duplicate";
      throw error;
    }
  }

  async nextDue(now: string): Promise<AutomationJob | undefined> {
    const row = await this.db
      .prepare(
        `SELECT id, idempotency_key, channel, topic, status, attempts,
                scheduled_for, last_error, payload_json
         FROM automation_jobs
         WHERE status IN ('queued', 'researching', 'drafting', 'validating', 'ready', 'deferred')
           AND scheduled_for <= ?
         ORDER BY scheduled_for ASC, created_at ASC
         LIMIT 1`,
      )
      .bind(now)
      .first<JobRow>();
    return row ? mapJobRow(row) : undefined;
  }

  async update(
    id: string,
    status: JobStatus,
    patch: { lastError?: string; payloadJson?: string } = {},
  ): Promise<void> {
    await this.db
      .prepare(
        `UPDATE automation_jobs
         SET status = ?,
             attempts = attempts + 1,
             last_error = ?,
             payload_json = COALESCE(?, payload_json),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
      )
      .bind(
        status,
        patch.lastError ?? null,
        patch.payloadJson ?? null,
        id,
      )
      .run();
  }

  async publishedCount(datePrefix: string): Promise<number> {
    const row = await this.db
      .prepare(
        `SELECT COUNT(*) AS count
         FROM automation_jobs
         WHERE status = 'published' AND updated_at LIKE ?`,
      )
      .bind(`${datePrefix}%`)
      .first<{ count: number }>();
    return Number(row?.count ?? 0);
  }
}
