import json
import os

json_dir = "C:/home/qiqi/anekanews/published"

mega_pack = {
    "efisiensi-manajemen-rantai-pasok-supply-chain-bisnis-kuliner": [
        "## Penerapan Pengemasan Produk Kedap Udara (Vacuum Sealing)",
        "Pengemasan porsi bahan makanan menggunakan mesin *vacuum sealer* terbukti memperpanjang masa simpan protein hewani hingga 3 kali lebih lama di dalam freezer tanpa merusak tekstur daging. Metode ini meminimalkan risiko pembakaran beku (*freezer burn*) dan menjaga kesegaran bahan baku hingga siap diolah di garis dapur.",
        "## Manajemen Persediaan Bahan Baku Musiman (Seasonal Sourcing)",
        "Susunlah variasi menu spesial berbasis bahan makanan yang sedang melimpah di musim panen lokal. Saat buah atau sayuran tertentu sedang panen raya, harganya akan turun drastis di tingkat petani lokal. Memanfaatkan pasokan musiman ini memungkinkan Anda menawarkan promo menu menarik dengan margin keuntungan yang sangat tebal."
    ],
    "strategi-pemasaran-digital-lokal-seo-umkm-2026": [
        "## Pentingnya Konsistensi Data NAP (Name, Address, Phone)",
        "Google menilai tingkat kepercayaan tempat usaha berdasarkan konsistensi informasi NAP (*Name, Address, Phone*) di seluruh direktori internet. Pastikan penulisan nama toko, ejaan alamat jalan, dan nomor telepon di website, akun Instagram, Facebook Page, dan Google Business Profile 100 persen identik tanpa perbedaan kecil.",
        "## Pemanfaatan Iklan Pencarian Lokal (Google Local Services Ads)",
        "Bagi UMKM yang memiliki anggaran promosi, mengombinasikan optimasi organik Lokal SEO dengan iklan *Google Local Services Ads* akan menempatkan lencana hijau verifikasi bisnis (*Google Guaranteed*) di hasil pencarian. Lencana ini memberikan jaminan rasa aman ekstra bagi calon pembeli."
    ],
    "mengenal-gaya-hidup-slow-living-menjaga-kesehatan-mental": [
        "## Seni Menikmati Makanan Tanpa Tergesa-Gesa (Slow Food Movement)",
        "Gerakan slow living berakar dari gerakan *Slow Food* yang dimulai di Italia sebagai perlawanan terhadap dominasi makanan cepat saji industri. Menyiapkan makanan sehat dari bahan pangan lokal yang segar dan menyantapnya secara perlahan bersama keluarga adalah salah satu bentuk perayaan kehidupan terbaik.",
        "## Membatasi Paparan Berita Negatif (Media Diet)",
        "Paparan informasi berita sensasional dan narasi konflik tanpa henti di media sosial dapat memicu kelelahan empati dan rasa cemas berlebihan. Terapkan 'diet media' dengan hanya membaca ringkasan berita tepercaya di pagi hari dan menghindari membaca berita konflik sebelum tidur malam."
    ],
    "panduan-menjaga-pola-makan-gizi-seimbang-pekerja-kantoran": [
        "## Menyiapkan Suplemen dan Vitamin Pendukung Aktivitas Kerja",
        "Meskipun nutrisi utama berasal dari makanan riil, pekerja kantoran beraktivitas indoor sering mengalami kekurangan vitamin D akibat kurangnya paparan sinar matahari pagi. Pertimbangkan konsumsi suplemen Vitamin D3 dan Omega-3 atas rekomendasi dokter untuk menjaga imunitas dan daya fokus otak.",
        "## Pentingnya Istirahat Peregangan Otot Setiap 2 Jam",
        "Pola makan bergizi seimbang harus diimbangi dengan pergerakan fisik harian. Lakukan peregangan ringan (*office stretching*) selama 3 hingga 5 menit setiap 2 jam duduk untuk melancarkan sirkulasi darah dan mencegah tumpukan lemak perifer."
    ],
    "desain-taman-minimalis-belakang-rumah-mungil-estetik": [
        "## Pemilihan Jenis Pot dan Planter Box Minimalis",
        "Gunakan wadah tanam berbentuk *planter box* dari semen ekspos datar atau pot serat kaca (*fiberglass*) berwarna abu-abu charcoal atau putih matt. Bentuk pot geometris yang bersih memberikan aksen estetika arsitektur modern yang mewah.",
        "## Pengolahan Kompos Mandiri dari Sisa Dapur (Home Composting)",
        "Sediakan komposter komposter kecil berukuran 5 liter di sudut taman belakang. Olah sisa saringan sisa buah dan sayur dapur menjadi pupuk organik cair yang kaya nutrisi untuk menyuburkan tanaman taman Anda secara alami gratis."
    ],
    "panduan-memilih-material-atap-rumah-tahan-cuaca-ekstrem": [
        "## Perlindungan Atap dari Risiko Angin Puting Beliung",
        "Di wilayah ter terbuka yang sering dilanda angin kencang, perhatikan pemasangan pengikat jepit genteng (*roof tile clips*). Pengikat mekanis ini mengunci lembaran genteng secara rapat ke reng baja ringan sehingga atap tidak akan terangkat saat disapu angin badai kencang.",
        "## Penanganan Risiko Kebocoran di Area Sambungan Dinding (Flashing)",
        "Area pertemuan antara garis atap dan dinding semen adalah titik paling rawan kebocoran. Pasang pelat seng aluminium (*flashing*) dan tutup celah tepi dengan sealant elastis bermutu tinggi yang tahan pemuaian panas matahari."
    ],
    "panduan-keamanan-cyber-personal-mencegah-kebocoran-data": [
        "## Mengamankan Kartu Kredit dan Transaksi Belanja Online",
        "Saat berbelanja di platform e-commerce baru, gunakan fitur kartu kredit virtual (*Virtual Credit Card*) atau dompet digital yang memungkinkan batasan transaksi harian secara mandiri. Jangan pernah menyimpan informasi nomor CVV kartu debit/kredit Anda di situs e-commerce.",
        "## Langkah Proteksi Kartu SIM dari Kejahatan SIM Swap",
        "Pasang kode PIN pada kartu SIM fisik Anda melalui menu pengaturan ponsel. Langkah ini mencegah pelaku kejahatan memindahkan kartu SIM Anda ke perangkat lain jika ponsel Anda hilang atau dicuri."
    ],
    "tren-pemanfaatan-quantum-computing-industri-2026": [
        "## Transformasi Sektor Penerbangan dan Dirgantara",
        "Produsen pesawat terbang terkemuka dunia memanfaatkan simulasi kuantum untuk menguji aerodinamika sayap pesawat dan struktur bahan komposit ringan. Hal ini memungkinkan terciptanya desain pesawat terbang yang jauh lebih efisien bahan bakar dan sangat aman.",
        "## Kesiapan Kurikulum Pendidikan dan Pelatihan SDM",
        "Untuk menyongsong gelombang industri kuantum, sekolah vokasi dan perguruan tinggi di Indonesia mulai memasukkan mata kuliah mekanika kuantum terapan dan pemrograman algoritma kuantum ke dalam kurikulum ilmu komputer."
    ]
}

def mega_expand():
    print("Running MEGA EXPANSION to hit 1100-1400 total words per article...")
    sql_statements = []
    
    for filename in os.listdir(json_dir):
        if not filename.endswith(".json"):
            continue
            
        filepath = os.path.join(json_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        slug = data.get("slug")
        if slug in mega_pack:
            body = data["body"]
            
            insert_idx = len(body) - 4
            for i, p in enumerate(body):
                if "Kesimpulan" in p or "---" in p:
                    insert_idx = i
                    break
                    
            extra_paragraphs = mega_pack[slug]
            data["body"] = body[:insert_idx] + extra_paragraphs + body[insert_idx:]
            
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                
            word_count = sum(len(p.split()) for p in data["body"])
            print(f"MEGA EXPANDED {slug}: total words in body = {word_count}")
            
            body_json_str = json.dumps(data["body"], ensure_ascii=False).replace("'", "''")
            sql_statements.append(f"UPDATE published_articles SET body = '{body_json_str}' WHERE slug = '{slug}';")

    sql_path = "d:/CMSFiles/AnekaNews-Antigravity-v1/scratch/apply_mega_expansion.sql"
    with open(sql_path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(sql_statements))
    print(f"Successfully generated SQL script at: {sql_path}")

if __name__ == "__main__":
    mega_expand()
