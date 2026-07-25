# Deploy AnekaNews dari Antigravity

Paket ini disiapkan untuk Cloudflare Free. Resource D1, R2, KV, sesi, dan domain
akan dibuat atau dihubungkan oleh Wrangler. Kunci API tidak disimpan di paket.

## Prasyarat

- Node.js 22 atau lebih baru
- Domain `anekanews.com` sudah aktif di akun Cloudflare
- Akun Cloudflare mempunyai akses ke Workers, D1, R2, dan KV
- Gemini API key

## Langkah deployment

1. Ekstrak ZIP, lalu buka folder `anekanews` di Antigravity.
2. Buka terminal pada folder proyek.
3. Jalankan:

   ```bash
   npm install
   npx wrangler login
   ```

4. Browser Anda akan membuka Cloudflare. Setujui akses Wrangler, lalu kembali
   ke terminal setelah muncul pesan login berhasil.
5. Jalankan:

   ```bash
   npm run deploy:setup
   ```

6. Saat terminal meminta `GEMINI_API_KEY`, tempel kunci Gemini di terminal.
   Jangan menulisnya ke file atau mengirimkannya melalui chat.

Skrip akan melakukan pengujian, build, deployment awal, migrasi D1, pemasangan
secret Gemini, dan deployment final. Resource tanpa ID di `wrangler.jsonc`
memang disengaja agar Wrangler melakukan auto-provisioning pada akun Anda.

## Setelah online

- Situs: `https://anekanews.com`
- Admin EmDash: `https://anekanews.com/admin`
- RSS: `https://anekanews.com/rss.xml`
- Sitemap: `https://anekanews.com/sitemap.xml`

Artikel otomatis dijadwalkan setiap hari pukul 08.15 WIB. Maksimal satu artikel
per hari. Jika kuota gratis Gemini habis, pekerjaan ditunda dan tidak beralih
ke model berbayar.

## Jika deployment berhenti

- `not authenticated`: jalankan ulang `npx wrangler login`.
- domain tidak ditemukan: pastikan `anekanews.com` berada dalam akun Cloudflare
  yang sama.
- izin ditolak: login dengan akun pemilik domain atau perbarui izin token.
- Gemini gagal: jalankan `npx wrangler secret put GEMINI_API_KEY`, kemudian
  `npm run deploy`.
