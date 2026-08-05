-- Migration to auto-activate the emdash-sync-plugin in D1 database
INSERT OR IGNORE INTO _plugin_state (plugin_id, version, status, source, installed_at, activated_at)
VALUES ('emdash-sync-plugin', '1.0.0', 'active', 'config', datetime('now'), datetime('now'));
