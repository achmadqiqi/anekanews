import { describe, expect, it } from "vitest";
import { mapJobRow } from "../src/lib/automation/repository";

describe("automation repository", () => {
  it("maps D1 snake-case rows into job contracts", () => {
    expect(
      mapJobRow({
        id: "job-1",
        idempotency_key: "2026-07-24:olahraga:daily",
        channel: "olahraga",
        topic: "lapangan padel",
        status: "queued",
        attempts: 0,
        scheduled_for: "2026-07-24T01:15:00.000Z",
        last_error: null,
        payload_json: null,
      }),
    ).toEqual({
      id: "job-1",
      idempotencyKey: "2026-07-24:olahraga:daily",
      channel: "olahraga",
      topic: "lapangan padel",
      status: "queued",
      attempts: 0,
      scheduledFor: "2026-07-24T01:15:00.000Z",
    });
  });

  it("rejects unknown persisted statuses", () => {
    expect(() =>
      mapJobRow({
        id: "job-1",
        idempotency_key: "key",
        channel: "olahraga",
        topic: "topic",
        status: "mystery",
        attempts: 0,
        scheduled_for: "2026-07-24T01:15:00.000Z",
        last_error: null,
        payload_json: null,
      }),
    ).toThrow("Invalid job status");
  });
});
