import { spawnSync } from "node:child_process";

const command = process.platform === "win32" ? "npx.cmd" : "npx";

function run(args, options = {}) {
  console.log(`\n▶ npx ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
    ...options,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`
AnekaNews — Cloudflare Free deployment

Skrip ini akan:
1. Memastikan akun Cloudflare terhubung
2. Menjalankan pengujian dan build
3. Membuat resource D1, R2, dan KV secara otomatis saat deploy
4. Menjalankan migrasi database
5. Memasang secret Gemini secara terenkripsi
6. Menerbitkan ke anekanews.com
`);

run(["wrangler", "whoami"]);
run(["astro", "check"]);
run(["vitest", "run"]);
run(["astro", "build"]);
run(["wrangler", "deploy"]);
run(["wrangler", "d1", "migrations", "apply", "DB", "--remote"]);

console.log(`
Masukkan Gemini API key pada prompt berikut.
Nilainya disimpan sebagai Cloudflare Worker Secret dan tidak masuk ke kode.
`);
run(["wrangler", "secret", "put", "GEMINI_API_KEY"]);
run(["wrangler", "deploy"]);

console.log(`
Selesai. Buka:
- https://anekanews.com
- https://anekanews.com/admin

Cron artikel otomatis berjalan setiap hari pukul 08.15 WIB.
`);
