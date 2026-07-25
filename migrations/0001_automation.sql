CREATE TABLE IF NOT EXISTS automation_jobs (
  id TEXT PRIMARY KEY,
  idempotency_key TEXT NOT NULL UNIQUE,
  channel TEXT NOT NULL,
  topic TEXT NOT NULL,
  status TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  scheduled_for TEXT NOT NULL,
  last_error TEXT,
  payload_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_automation_jobs_due
ON automation_jobs(status, scheduled_for);

CREATE TABLE IF NOT EXISTS source_allowlist (
  host TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  feed_url TEXT,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS outbound_link_log (
  article_slug TEXT PRIMARY KEY,
  channel TEXT NOT NULL,
  target_host TEXT NOT NULL,
  anchor_text TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS automation_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
