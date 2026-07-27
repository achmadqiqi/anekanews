# Tutorial Posting Artikel & Gambar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membuat tutorial terstruktur dan visual (dilengkapi screenshot UI) untuk pembuatan artikel dan pengunggahan/penyisipan gambar pada Emdash CMS AnekaNews Admin (`/admin`).

**Architecture:** Dokumen Markdown interaktif yang mengintegrasikan panduan langkah demi langkah dengan media screenshot UI visual hasil sintesis `generate_image`.

**Tech Stack:** Markdown, AI Image Generation (`generate_image`), Emdash CMS Admin patterns.

## Global Constraints
- Target CMS: Emdash CMS Admin Panel AnekaNews (`/admin`)
- Tidak menyertakan alur login sesuai instruksi pengguna
- Menggunakan bahasa Indonesia yang lugas, profesional, dan mudah dipahami
- Setiap screenshot harus jelas memperlihatkan elemen UI terkait

---

### Task 1: Generate Visual UI Screenshots

**Files:**
- Create: `C:\Users\hp\.gemini\antigravity\brain\14af388e-667f-43ce-aea5-81732b9ac9a9\tutorial_dashboard_overview.png`
- Create: `C:\Users\hp\.gemini\antigravity\brain\14af388e-667f-43ce-aea5-81732b9ac9a9\tutorial_article_editor.png`
- Create: `C:\Users\hp\.gemini\antigravity\brain\14af388e-667f-43ce-aea5-81732b9ac9a9\tutorial_image_upload.png`
- Create: `C:\Users\hp\.gemini\antigravity\brain\14af388e-667f-43ce-aea5-81732b9ac9a9\tutorial_publish_panel.png`

- [ ] **Step 1: Generate Screenshot 1 (Dashboard Overview)**
  Prompt UI: Modern web dashboard UI for Emdash CMS admin at /admin, displaying sidebar navigation with "Articles", "Media", "Settings", and a prominent "+ New Article" button. Clean modern layout with dark/light hybrid theme.

- [ ] **Step 2: Generate Screenshot 2 (Article Editor)**
  Prompt UI: Modern article editor web application interface showing article title input field, markdown/rich text toolbar, content editor area with sample text, category selection dropdown, and tag input pill tags.

- [ ] **Step 3: Generate Screenshot 3 (Image Upload & Media Manager)**
  Prompt UI: Web UI modal dialog for image upload and media management, showing image preview thumbnail, featured image toggle button, Alt Text input field, Caption textarea, and "Insert Into Article" button.

- [ ] **Step 4: Generate Screenshot 4 (Publishing Settings & SEO Meta)**
  Prompt UI: Web app sidebar panel for article publishing settings, displaying Slug permalink field, Meta Description input, Status radio buttons (Draft, Scheduled, Published), and a prominent green "Publish Article" button.

---

### Task 2: Create Tutorial Markdown Document

**Files:**
- Create: `docs/TUTORIAL_POSTING_ARTIKEL.md`

- [ ] **Step 1: Write complete tutorial content**
  Menulis dokumen panduan `docs/TUTORIAL_POSTING_ARTIKEL.md` berformat Markdown dengan struktur:
  - Judul & Pengantar
  - Bagian 1: Membuka Editor & Membuat Artikel Baru
  - Bagian 2: Mengisi Konten, Kategori, dan Tags
  - Bagian 3: Mengunggah & Memasukkan Gambar (Featured Image & Inline Image, Alt Text, Caption)
  - Bagian 4: Pengaturan SEO Meta & Menertbitkan Artikel
  - Bagian 5: Checklist Kualitas Sebelum Publish

- [ ] **Step 2: Embed generated screenshots into tutorial**
  Memastikan setiap gambar hasil Task 1 ditautkan secara konsisten menggunakan sintesis markdown media `![caption](path)`.

- [ ] **Step 3: Verify document completeness and formatting**
  Memeriksa kejelasan dan kelengkapan tutorial.
