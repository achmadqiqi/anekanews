import { execSync } from 'child_process';
import fs from 'fs';

const tables = [
  'users',
  'options',
  'published_articles',
  'passkeys',
  'sessions',
  'auth_tokens',
  'auth_challenges',
  'collections',
  'fields',
  'taxonomies',
  'terms',
  'redirects',
  'widget_areas',
  'sections',
  'settings'
];

const backup = {};

for (const t of tables) {
  try {
    const cmd = `npx wrangler d1 execute DB --remote --command="SELECT * FROM ${t};" --json`;
    const out = execSync(cmd, { cwd: process.cwd() }).toString();
    const parsed = JSON.parse(out);
    backup[t] = parsed[0]?.results || [];
    console.log(`Backed up table '${t}': ${backup[t].length} rows`);
  } catch (e) {
    console.log(`Skipped table '${t}' (not found or error)`);
  }
}

fs.writeFileSync('scratch/d1_backup.json', JSON.stringify(backup, null, 2));
console.log('Complete database backup saved to scratch/d1_backup.json');
