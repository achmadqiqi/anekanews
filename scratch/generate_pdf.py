import os
import sys
from PIL import Image as PILImage
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, HRFlowable, KeepTogether, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(40, 815, "AnekaNews — Panduan Posting Artikel & Gambar (Emdash CMS)")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(40, 807, 555, 807)
        
        # Footer (all pages)
        page_str = f"Halaman {self._pageNumber} dari {page_count}"
        self.drawRightString(555, 30, page_str)
        self.drawString(40, 30, "© AnekaNews Editorial Team — Dokumen Internal")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(40, 42, 555, 42)
        
        self.restoreState()

def build_pdf(output_pdf_path):
    doc = SimpleDocTemplate(
        output_pdf_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=55
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#475569'),
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#1e293b'),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#2563eb'),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6
    )
    
    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    caption_style = ParagraphStyle(
        'ImgCaption',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#64748b'),
        alignment=1, # Centered
        spaceBefore=4,
        spaceAfter=12
    )
    
    checklist_title = ParagraphStyle(
        'ChecklistTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#065f46')
    )

    checklist_item = ParagraphStyle(
        'ChecklistItem',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#111827')
    )

    story = []
    
    # Title Banner
    story.append(Paragraph("Tutorial Posting Artikel & Mengunggah Gambar", title_style))
    story.append(Paragraph("Panduan Praktis Redaksi AnekaNews — Emdash CMS Admin Panel (https://anekanews.com/admin)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#2563eb'), spaceBefore=0, spaceAfter=14))
    
    # Section 1
    story.append(Paragraph("Langkah 1: Navigasi & Membuat Artikel Baru", h1_style))
    story.append(Paragraph("Setelah masuk ke Dashboard Admin Emdash, perhatikan menu navigasi utama pada bilah sisi (<i>left sidebar</i>):", body_style))
    story.append(Paragraph("• <b>Klik menu Articles atau Posts</b> pada bilah navigasi kiri.", bullet_style))
    story.append(Paragraph("• <b>Klik tombol \"+ New Article\" / \"+ Artikel Baru\"</b> pada bagian kanan atas layar.", bullet_style))
    story.append(Spacer(1, 6))
    
    img1_path = r"C:\Users\hp\.gemini\antigravity\brain\14af388e-667f-43ce-aea5-81732b9ac9a9\tutorial_dashboard_overview_1785116455977.jpg"
    if os.path.exists(img1_path):
        img1 = Image(img1_path, width=475, height=267)
        story.append(img1)
        story.append(Paragraph("Gambar 1: Tampilan Dashboard CMS & Navigasi Buat Artikel Baru", caption_style))
    
    story.append(Spacer(1, 8))
    
    # Section 2
    story.append(Paragraph("Langkah 2: Pengisian Konten Artikel", h1_style))
    story.append(Paragraph("Setelah halaman editor terbuka, isi elemen-elemen utama artikel berita Anda:", body_style))
    story.append(Paragraph("• <b>Judul Artikel (Title)</b>: Tulis judul informatif, lugas, dan sesuai Pedoman Etika Jurnalistik AnekaNews. Hindari clickbait berlebihan.", bullet_style))
    story.append(Paragraph("• <b>Tubuh Artikel (Body Content)</b>: Tulis atau tempel teks berita. Gunakan toolbar editor untuk memformat teks (Heading 2 untuk subjudul, Bold, Italic, atau Bullet List).", bullet_style))
    story.append(Paragraph("• <b>Kategori & Tags (Panel Kanan)</b>: Pilih Kategori yang sesuai (Nasional, Ekonomi, Teknologi, Politik) dan masukkan Tags kata kunci relevan.", bullet_style))
    story.append(Spacer(1, 6))

    img2_path = r"C:\Users\hp\.gemini\antigravity\brain\14af388e-667f-43ce-aea5-81732b9ac9a9\tutorial_article_editor_1785116465940.jpg"
    if os.path.exists(img2_path):
        img2 = Image(img2_path, width=475, height=267)
        story.append(img2)
        story.append(Paragraph("Gambar 2: Tampilan Editor Artikel dan Pengaturan Kategori", caption_style))
        
    story.append(PageBreak())
    
    # Section 3
    story.append(Paragraph("Langkah 3: Mengunggah & Menambahkan Gambar", h1_style))
    story.append(Paragraph("Gambar sangat penting untuk memperkuat daya tarik dan kredibilitas berita. Terdapat dua jenis penyisipan gambar:", body_style))
    
    story.append(Paragraph("A. Menambahkan Gambar Utama (Featured Image)", h2_style))
    story.append(Paragraph("<i>Featured Image</i> adalah gambar header yang muncul di halaman depan situs dan thumbnail media sosial. Pilih menu <b>Featured Image</b> di panel kanan, klik <b>Upload Image</b>, lalu pilih gambar rasio 16:9.", body_style))
    
    story.append(Paragraph("B. Menambahkan Gambar di Dalam Tubuh Artikel (Inline Image)", h2_style))
    story.append(Paragraph("Arahkan kursor ke paragraf yang diinginkan, klik ikon <b>Insert Media / Image</b> pada toolbar editor, lalu unggah gambar.", body_style))
    
    story.append(Paragraph("C. Pengisian Meta Gambar (Wajib SEO & Jurnalistik)", h2_style))
    story.append(Paragraph("• <b>Alt Text (Teks Alternatif)</b>: Deskripsikan isi gambar secara singkat untuk SEO & aksesibilitas (contoh: <i>Presiden meresmikan bendungan baru di Jawa Tengah</i>).", bullet_style))
    story.append(Paragraph("• <b>Caption & Kredit Foto</b>: Tuliskan penjelasan gambar dan sumber foto (contoh: <i>Suasana peresmian bendungan. Foto: Antara/Humas</i>).", bullet_style))
    story.append(Spacer(1, 6))

    img3_path = r"C:\Users\hp\.gemini\antigravity\brain\14af388e-667f-43ce-aea5-81732b9ac9a9\tutorial_image_upload_1785116475443.jpg"
    if os.path.exists(img3_path):
        img3 = Image(img3_path, width=475, height=267)
        story.append(img3)
        story.append(Paragraph("Gambar 3: Modal Pengunggahan Gambar, Alt Text, Caption & Media Manager", caption_style))

    story.append(Spacer(1, 8))

    # Section 4
    story.append(Paragraph("Langkah 4: Pengaturan SEO Meta & Publikasi", h1_style))
    story.append(Paragraph("Sebelum menekan tombol terbit, periksa panel pengaturan publikasi:", body_style))
    story.append(Paragraph("• <b>URL Slug / Permalink</b>: Sesuaikan tautan artikel agar ringkas dan jelas.", bullet_style))
    story.append(Paragraph("• <b>Meta Description</b>: Tuliskan ringkasan artikel 1–2 kalimat (max 160 karakter) untuk hasil pencarian Google.", bullet_style))
    story.append(Paragraph("• <b>Status Publikasi</b>: Pilih <i>Publish Immediately</i> (terbit langsung), <i>Schedule</i> (jadwal tayang), atau <i>Save Draft</i>.", bullet_style))
    story.append(Paragraph("• Klik tombol hijau <b>Publish Article / Terbitkan</b>.", bullet_style))
    story.append(Spacer(1, 6))

    img4_path = r"C:\Users\hp\.gemini\antigravity\brain\14af388e-667f-43ce-aea5-81732b9ac9a9\tutorial_publish_panel_1785116485628.jpg"
    if os.path.exists(img4_path):
        img4 = Image(img4_path, width=475, height=267)
        story.append(img4)
        story.append(Paragraph("Gambar 4: Panel Pengaturan Publikasi SEO Meta dan Tombol Publish", caption_style))

    story.append(Spacer(1, 10))

    # Section 5: Pre-Publish Checklist Card
    checklist_data = [
        [Paragraph("📋 Checklist Ringkas Sebelum Terbit (Pre-Publish Checklist)", checklist_title)],
        [Paragraph("<b>[✓] Judul & Ejaan:</b> Bebas dari salah ketik (typo) dan sesuai standar EYD berita.", checklist_item)],
        [Paragraph("<b>[✓] Featured Image:</b> Gambar utama terpasang bersih dengan rasio disarankan 16:9.", checklist_item)],
        [Paragraph("<b>[✓] Alt Text & Kredit Foto:</b> Gambar memiliki deskripsi Alt Text dan sumber foto yang jelas.", checklist_item)],
        [Paragraph("<b>[✓] Kategori & Tags:</b> Kategori utama dipilih dan minimal 2 tags relevan telah diisi.", checklist_item)],
        [Paragraph("<b>[✓] Meta Description:</b> Ringkasan artikel untuk pencarian Google sudah terisi penuh.", checklist_item)],
    ]
    
    checklist_table = Table(checklist_data, colWidths=[475])
    checklist_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#ecfdf5')),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#10b981')),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#a7f3d0')),
        ('PADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
    ]))
    
    story.append(KeepTogether([checklist_table]))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {output_pdf_path}")

if __name__ == "__main__":
    target_path = r"d:\CMSFiles\AnekaNews-Antigravity-v1\docs\TUTORIAL_POSTING_ARTIKEL.pdf"
    build_pdf(target_path)
    # Also write a copy to brain directory for artifact/access
    artifact_path = r"C:\Users\hp\.gemini\antigravity\brain\14af388e-667f-43ce-aea5-81732b9ac9a9\TUTORIAL_POSTING_ARTIKEL.pdf"
    build_pdf(artifact_path)
