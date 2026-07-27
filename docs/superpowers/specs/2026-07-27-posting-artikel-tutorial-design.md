# Spec: Tutorial Posting Artikel dan Gambar pada Emdash CMS AnekaNews

## Context & Objectives
Membuat panduan tutorial komprehensif bagi editor/penulis AnekaNews untuk mempublikasikan artikel dan menyisipkan media (gambar) melalui Emdash CMS Admin Panel (`https://anekanews.com/admin`). 
Tutorial ini disertai screenshot UI visual untuk setiap langkah penting, tanpa menyertakan bagian login sesuai arahan pengguna.

## Deliverables
1. File tutorial utama: `docs/TUTORIAL_POSTING_ARTIKEL.md`
2. Asset gambar (screenshot UI) yang dihasilkan oleh `generate_image`:
   - `docs/images/tutorial_dashboard_overview.png` - Dashboard Emdash CMS & Navigasi Buat Artikel
   - `docs/images/tutorial_article_editor.png` - Tampilan Editor Artikel (Judul, Konten, Kategori)
   - `docs/images/tutorial_image_upload.png` - Pengaturan Upload Gambar, Featured Image, Alt Text & Caption
   - `docs/images/tutorial_publish_panel.png` - Panel Publikasi, Status, SEO Meta & Tombol Publish

## Outline Dokumen Tutorial (`docs/TUTORIAL_POSTING_ARTIKEL.md`)

### 1. Navigasi & Membuat Artikel Baru
- Mengakses menu **Articles / Posts** pada Dashboard Emdash Admin (`/admin`).
- Menekan tombol **"Create New Article" / "+ Artikel Baru"**.
- Screenshot: `tutorial_dashboard_overview.png`

### 2. Pengisian Konten Artikel
- Penulisan **Judul Artikel (Title)** yang menarik dan SEO-friendly.
- Penulisan **Tubuh Artikel (Body)** menggunakan Rich Text / Markdown Editor.
- Pemilihan **Kategori Berita** (misal: Nasional, Ekonomi, Teknologi) dan **Tags**.
- Screenshot: `tutorial_article_editor.png`

### 3. Mengunggah & Memasukkan Gambar (Media)
- **Menambahkan Gambar Utama (Featured Image)**:
  - Mengunggah file dari komputer / media library.
  - Mengisi **Alt Text** untuk kecocokan SEO & Aksesibilitas.
  - Mengisi **Caption / Kredit Foto** (cth: *Foto: Antara/Humas*).
- **Menambahkan Gambar di Dalam Tubuh Artikel (Inline Image)**:
  - Menyisipkan blok media pada editor.
  - Mengatur rata letak (Center, Left, Right).
- Screenshot: `tutorial_image_upload.png`

### 4. Pengaturan SEO Meta & Publikasi
- Memeriksa **Slug / Permalink**.
- Mengisi **Meta Description** (ringkasan artikel untuk Google Search).
- Memilih status publikasi: **Draft**, **Schedule (Jadwal)**, atau **Publish Immediately**.
- Menekan tombol **Publish**.
- Screenshot: `tutorial_publish_panel.png`

### 5. Checklist Ringkas Sebelum Terbit
- Pengecekan judul & ejaan (Pedoman Jurnalistik AnekaNews).
- Pengecekan ketersediaan Featured Image & Alt Text.
- Pengecekan kategori & tags.

## Plan & Verification
- Menghasilkan 4 gambar screenshot UI dengan tool `generate_image`.
- Menyusun file Markdown `docs/TUTORIAL_POSTING_ARTIKEL.md` dengan menyertakan tautan embed gambar.
- Memverifikasi kelengkapan file dan keterbacaan panduan.
