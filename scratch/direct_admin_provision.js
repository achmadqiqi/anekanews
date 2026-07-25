// Seed Super Admin achmadqiqi888@gmail.com directly into D1 database
import { execSync } from 'child_process';

const sql = `
INSERT INTO options (name, value) VALUES ('emdash:setup_complete', '"true"') ON CONFLICT(name) DO UPDATE SET value = '"true"';
INSERT INTO options (name, value) VALUES ('emdash:site_title', '"AnekaNews"') ON CONFLICT(name) DO UPDATE SET value = '"AnekaNews"';
INSERT INTO users (id, email, name, role, email_verified, created_at, updated_at) 
VALUES ('01KYBDJVCGG10WZ54KEDB2CWK7', 'achmadqiqi888@gmail.com', 'Achmad Baihaqi', 50, 1, datetime('now'), datetime('now'))
ON CONFLICT(email) DO UPDATE SET role = 50, name = 'Achmad Baihaqi';
`;

console.log("Executing SQL on Remote D1 Database...");
try {
  const output = execSync(`npx wrangler d1 execute DB --remote --command="${sql.replace(/\n/g, ' ')}"`, { encoding: 'utf-8' });
  console.log("Remote D1 Result:\n", output);
} catch (err) {
  console.error("Error executing remote SQL:", err);
}
