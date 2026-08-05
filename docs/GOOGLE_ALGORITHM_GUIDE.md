# Panduan Algoritma Google & SEO Best Practices AnekaNews

Dokumen ini berisi rangkuman komprehensif mengenai **Prinsip Kerja Algoritma Google**, **Sistem Ranking**, **Proses Pengindeksan**, serta **Standar Implementasi SEO & Jurnalistik** untuk seluruh publikasi di **AnekaNews**.

---

## 1. Tiga Tahap Kerja Utama Google Search

### A. Tahap 1 — Crawling (Perayapan)
Googlebot mengunjungi halaman web untuk membaca:
- Teks, judul, dan struktur paragraf.
- Gambar (`.webp`, `.jpg`) dan deskripsi `alt_text`.
- Tautan internal (*internal links*) dan tautan eksternal (*sources*).
- HTML semantic, metadata (`meta description`, `title`, `canonical`).
- Peta Situs XML (`sitemap.xml`) dan pembaruan `lastmod`.

> **Prinsip:** Struktur tautan internal yang rapi dan `sitemap.xml` yang valid membuat perayapan Googlebot jauh lebih cepat dan efisien.

### B. Tahap 2 — Indexing (Pengindeksan)
Setelah merayapi, Google:
1. Merender tampilan halaman (termasuk CSS dan JavaScript).
2. Menganalisis keaslian, nilai tambah, dan topik konten.
3. Menentukan `canonical URL` jika terdapat duplikasi atau kemiripan konten.
4. Memutuskan apakah halaman cukup layak dimasukkan ke indeks Google.

> **Catatan Penting:** **Sudah dirayapi belum tentu diindeks.** Halaman bermutu rendah, duplikat, atau error (404/500) akan ditolak masuk indeks.

### C. Tahap 3 — Serving & Ranking (Penentuan Peringkat)
Hasil pencarian diurutkan secara dinamis berdasarkan formula konseptual:

$$\text{Peringkat} = \text{Relevansi} + \text{Kualitas Konten} + \text{Sinyal E-E-A-T} + \text{Otoritas Link} + \text{Kesegaran} + \text{Pengalaman Halaman} - \text{Sinyal Spam}$$

---

## 2. 9 Faktor Utama Penentu Peringkat Google

| Faktor Peringkat | Deskripsi & Implementasi di AnekaNews |
| :--- | :--- |
| **1. Search Intent** | Memenuhi kebutuhan pembaca secara tuntas (*search intent*), bukan mengulang kata kunci (*keyword stuffing*). |
| **2. Orisinalitas & Kualitas** | Memberikan analisis mendalam, informasi asli, serta panduan praktis (bukan sekadar penulisan ulang AI generik). |
| **3. E-E-A-T** | Memperkuat *Experience, Expertise, Authoritativeness, Trustworthiness* dengan profil penulis transparan, transparansi kontak redaksi, dan sumber resmi (`sources_json`). |
| **4. Backlink & Internal Link** | Menghubungkan artikel terkait secara logis (*internal linking*) dalam kanal yang sama. |
| **5. Otoritas Topik** | Membahas topik secara komprehensif dalam kelompok kanal berita (*topical cluster*). |
| **6. Kesegaran (Freshness)** | Memperbarui informasi berita, regulasi terbaru (tahun 2026), dan data tren secara konsisten. |
| **7. Page Experience** | Kecepatan waktu muat (*Core Web Vitals*), bebas error, tata letak *mobile-friendly*, serta spasi antar paragraf/heading yang rapi. |
| **8. Konteks Pengguna** | Lokasi, perangkat (Mobile/Desktop), dan preferensi bahasa pengguna. |
| **9. Bebas Sinyal Spam** | Menghindari praktik manipulatif, cloaking, atau duplikasi teks. |

---

## 3. Estimasi Waktu Perayapan & Peringkat Google

- **Perayapan Halaman Baru:** Beberapa hari hingga beberapa minggu.
- **Pembaruan Isi / Judul:** Setelah halaman dirayapi ulang oleh Googlebot.
- **Dampak Perbaikan SEO:** Beberapa hari hingga beberapa bulan.
- **Data Google Search Console:** Tertunda sekitar 2–3 hari (tampilan 24 jam bersifat sementara).

---

## 4. Checklist Penerapan pada Setiap Artikel AnekaNews

- [x] **Format Paragraf & Heading:** Memiliki spasi 1x enter (`margin-top`) di atas heading H2/H3 dan *Space After* antar paragraf.
- [x] **Panjang Konten:** Minimum 1000–1600 kata dengan paragraf pendek ramah seluler (maksimal 3–4 kalimat).
- [x] **Minimal 2 Gambar:** Hero Image + Sub-Image dalam format WebP beresolusi tinggi dengan `alt_text` relevan.
- [x] **Atribusi Sumber Kredibel:** Terdaftar di `sources_json` dengan tautan kementerian/lembaga resmi.
- [x] **Integritas Sitemap:** Terdaftar otomatis di `https://anekanews.com/sitemap.xml` dengan status `200 OK`.
- [x] **Google Search Console:** Pengajuan pengindeksan (*Request Indexing*) manual untuk artikel prioritas.
