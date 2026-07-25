# Pedoman Operasional AnekaNews Content Pipeline

Pedoman ini berisi alur kerja 10 tahap, struktur folder, format nama file, dan aturan mutlak untuk mengelola, menulis, dan menerbitkan artikel pada **anekanews.com**.

---

## 1. Lokasi Pipeline & Struktur Folder
Seluruh berkas pipeline disimpan pada direktori:
* **Host Path:** `C:\home\qiqi\anekanews\` (diakses dalam sistem sebagai `/home/qiqi/anekanews/`)

Struktur folder yang digunakan:
* `draft/` : Menyimpan berkas artikel yang sedang ditulis (status: `draft`).
* `queue/` : Menyimpan berkas artikel yang siap diterbitkan dan menunggu jadwal (status: `queue`).
* `published/` : Menyimpan berkas artikel yang sudah sukses tayang/live (status: `published`).
* `media/` : Menyimpan berkas gambar utama artikel.

---

## 2. Format Penamaan Berkas
* **Berkas Artikel (JSON):**
  `YYYY-MM-DD_[channel]_[slug].json`
  *Contoh:* `2026-07-26_teknologi_ai-agent-umkm-2026.json`
* **Berkas Gambar:**
  `YYYY-MM-DD_[channel]_[slug-singkat].webp`
  *Contoh:* `2026-07-26_teknologi_ai-agent-umkm.webp`

---

## 3. Format Isi Berkas Artikel (JSON)
Setiap file artikel wajib ditulis dalam format JSON berikut:
```json
{
  "slug": "slug-artikel-tanpa-tanggal",
  "title": "Judul Artikel Maksimal 60 Karakter",
  "excerpt": "Ringkasan 120-150 karakter",
  "body": [
    "Paragraf 1",
    "Paragraf 2",
    "Paragraf 3"
  ],
  "channel": "teknologi",
  "tags": ["tag1", "tag2", "tag3"],
  "sources": ["https://sumber1.com", "https://sumber2.com"],
  "author": "Redaksi AnekaNews",
  "keyword": "focus keyword utama",
  "status": "draft",
  "scheduled_at": "2026-07-26T08:00:00",
  "published_at": null,
  "image": "2026-07-26_teknologi_ai-agent-umkm.webp"
}
```

---

## 4. Kredensial Database (D1)
* **Account ID:** `c22018ef1434d958e89d537c898f446b`
* **DB UUID:** `e4f6f6e7-63c4-4c0d-ad37-0ebe7e96ded6`
* **CF API Token:** `cfut_osOBuyS6i6yEEOtJ4kerG0mo7myqstoRoVshKZJZ0e9f93a3`
* **Target Site URL:** `https://anekanews.com/artikel/[slug]`

---

## 5. Channel Valid
Artikel hanya boleh dimasukkan ke dalam salah satu channel valid berikut:
`teknologi`, `bisnis`, `rumah-properti`, `gaya-hidup`, `produk`, `pilihan`

---

## 6. Alur Kerja 10 Tahap

### TAHAP 1 - DISCOVERY (Penemuan Topik)
* Cari 5-10 topik trending hari ini via web search.
* Sumber terpercaya: Google Trends Indonesia, media nasional terpercaya, media sosial populer.
* Kriteria: Sedang viral/hangat, relevan dengan Indonesia, berusia maksimal 48 jam, bernilai edukatif.

### TAHAP 2 - SELEKSI
* Pilih 1 topik terbaik dari hasil Discovery berdasarkan:
  * Volume pencarian tinggi
  * Relevansi dengan kategori di AnekaNews
  * Kesegaran berita (maksimal 48 jam)
  * Nilai edukasi untuk pembaca
* Output berupa: 1 topik terpilih beserta argumen/justifikasi singkat pemilihannya.

### TAHAP 3 - RISET MENDALAM
* Cari 3-5 sumber kredibel.
* Ekstrak fakta, data numerik/statistik, kutipan, dan kronologi secara detail.
* Catat URL setiap sumber berita.
* **DILARANG KERAS** mengarang data, statistik, atau kutipan.

### TAHAP 4 - KEYWORD RESEARCH (Riset Kata Kunci)
* Tentukan 1 Focus Keyword utama dan 2-3 Secondary Keywords.
* Focus keyword wajib diletakkan di: Judul, Paragraf Pertama (Lead), dan minimal 1 Subheading (H2).

### TAHAP 5 - PENULISAN ARTIKEL
* **Judul:** 50-60 karakter, wajib mengandung focus keyword.
* **Excerpt:** 120-150 karakter.
* **Body:** 1000-1600 kata, ditulis sebagai JSON array of strings (tiap string adalah paragraf).
* **Paragraf:** Maksimal 3 kalimat (ramah perangkat mobile).
* **Gaya Bahasa:** Menarik, informatif, dan netral.
* **Struktur:** Hook/Lead -> 3-5 Poin Penjelasan -> Kesimpulan -> Catatan Sumber.
* Lakukan parafrase penuh. **DILARANG** melakukan copy-paste langsung.

### TAHAP 6 - EDITORIAL CHECKLIST
Sebelum melanjutkan ke tahap penyimpanan, pastikan checklist berikut terpenuhi:
* [ ] Tidak ada data, statistik, atau kutipan yang dikarang/fiktif.
* [ ] Semua sumber tercantum dengan benar di dalam field `sources`.
* [ ] Bahasa netral, tidak menyinggung SARA atau memicu ujaran kebencian.
* [ ] Tidak melanggar ketentuan UU ITE.
* [ ] Bebas dari unsur plagiarisme (plagiarism-free).
* [ ] Menyertakan disclaimer sumber jika diperlukan.
* [ ] Bebas dari kesalahan ketik (*typo*).

### TAHAP 7 - SIMPAN SEBAGAI DRAFT
* Buat berkas JSON dengan format penamaan yang sesuai.
* Set `"status": "draft"`.
* Simpan berkas JSON tersebut ke dalam direktori `/home/qiqi/anekanews/draft/`.
* Pastikan semua field wajib terisi dengan benar.

### TAHAP 8 - REVIEW & QUEUE
* Setelah editorial checklist dinyatakan lolos secara manual/sistem:
* Update field `"status": "queue"`.
* Pindahkan berkas JSON dari folder `draft/` ke folder `queue/`.
* Set field `scheduled_at` dengan waktu target publikasi.

### TAHAP 9 - PUBLISH KE D1
* Baca berkas JSON dari folder `queue/`.
* Eksekusi query INSERT ke database D1 produksi melalui API Cloudflare.
* **Format payload query (`/tmp/payload.json`):**
  ```json
  {
    "sql": "INSERT OR REPLACE INTO published_articles (slug, title, excerpt, body, channel, tags_json, sources_json, author, published_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))",
    "params": [slug, title, excerpt, body_json, channel, tags_json, sources_json, author]
  }
  ```
* **Perintah Curl eksekusi:**
  ```bash
  curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/c22018ef1434d958e89d537c898f446b/d1/database/e4f6f6e7-63c4-4c0d-ad37-0ebe7e96ded6/query" \
    -H "Authorization: Bearer cfut_osOBuyS6i6yEEOtJ4kerG0mo7myqstoRoVshKZJZ0e9f93a3" \
    -H "Content-Type: application/json" \
    -d @/tmp/payload.json
  ```
* **Jika Sukses (`changes: 1`):**
  * Update berkas JSON di lokal: `"status": "published"` dan masukkan waktu tayang di `published_at`.
  * Pindahkan berkas JSON tersebut dari folder `queue/` ke folder `published/`.
* **Jika Gagal:**
  * Jangan pindahkan berkas. Tetap biarkan berkas JSON berada di folder `queue/`.
  * Laporkan rincian error kepada pengguna (user).

### TAHAP 10 - VERIFIKASI LIVE
* Lakukan pengecekan status HTTP dengan curl:
  `curl -s -o /dev/null -w "%{http_code}" https://anekanews.com/artikel/[slug]`
  *Harus menghasilkan kode status:* **200**
* Pastikan tag judul halaman ter-render dengan benar:
  `curl -s https://anekanews.com/artikel/[slug] | grep -oP '<title>[^<]+</title>'`
* Jika menghasilkan **302** atau **404**, segera laporkan ke user secara transparan.
* Tampilkan laporan akhir kepada user yang berisi:
  * Status (LIVE / GAGAL)
  * URL Artikel
  * Judul Artikel
  * Kategori/Channel
  * Jumlah Kata
  * Jumlah Sumber
  * Keyword Utama

---

## 7. Penanganan Gambar
* Karena endpoint upload R2 (`POST /api/upload-image`) belum siap, tetap isi field `"image"` di JSON dengan nama file yang direncanakan.
* Simpan berkas gambar berformat `.webp` di folder `/home/qiqi/anekanews/media/`.
* Apabila infrastruktur R2 sudah siap sepenuhnya, lakukan upload gambar dan perbarui `image_url` pada database D1.

---

## 8. Aturan Mutlak (Aturan Emas)
1. **Dilarang keras mempublikasikan artikel tanpa tahap riset sumber yang valid.**
2. **Dilarang keras mengarang data, statistik, angka, atau kutipan tokoh.**
3. **Wajib melakukan verifikasi live (Tahap 10) setelah penerbitan.**
4. **Jika terjadi kegagalan verifikasi live, wajib segera melapor kepada user.**
5. **Maksimum pembuatan artikel adalah 2 artikel per sesi.**
6. **Setiap artikel harus terekam secara persisten sebagai berkas JSON pada folder pipeline yang sesuai.**
7. **Dilarang langsung mempublikasikan artikel tanpa melalui proses penyimpanan draft (`draft/`) terlebih dahulu.**
8. **Jika diminta untuk "publish semua di queue", baca seluruh berkas di folder `queue/` lalu lakukan proses pengunggahan dan verifikasi satu per satu.**
9. **Bahasa penulisan wajib Bahasa Indonesia dengan gaya formal-kasual.**
10. **Status alur berkas JSON harus selalu diperbarui secara runtut: `draft` -> `queue` -> `published`.**
