import json
import os

json_dir = "C:/home/qiqi/anekanews/published"

super_pack = {
    "efisiensi-manajemen-rantai-pasok-supply-chain-bisnis-kuliner": [
        "## Peran Teknologi Internet of Things (IoT) dalam Penyimpanan Bahan Makanan",
        "Pemanfaatan sensor pintar berbasis Internet of Things (IoT) kini makin terjangkau bagi para pemilik bisnis F&B skala menengah. Sensor suhu dan kelembapan otomatis dapat dipasang di dalam freezer dan ruang pendingin (chiller).",
        "Sensor ini akan mengirimkan peringatan darurat langsung ke smartphone manajer operasional jika terjadi penurunan suhu dingin atau pemadaman listrik secara mendadak. Dengan respon cepat, potensi kerusakan bahan baku berharga belasan juta rupiah dapat digagalkan secara instan.",
        "## Mengelola Limbah Makanan Menjadi Produk Sampingan Berdaya Jual",
        "Selain menekan food waste di area dapur, pengusaha kuliner kreatif di tahun 2026 mulai mengolah sisa potongan bahan makanan menjadi produk sampingan bernilai tambah. Contohnya, sisa potongan kulit buah atau sayuran dapat diolah menjadi larutan eco-enzyme pembersih ramah lingkungan, sementara sisa tulang iga atau ayam diolah menjadi stok kaldu (bone broth) kemasan gurih yang siap dijual kembali kepada pelanggan.",
        "## Evaluasi Kinerja Vendor Pasokan Secara Berkala (Key Performance Indicator)",
        "Tetapkan standar indikator kinerja utama (KPI) bagi para vendor suplier bahan baku Anda. Kriteria evaluasi mencakup tiga poin krusial: ketepatan waktu pengiriman (on-time delivery), persentase kesegaran bahan baku yang diterima, serta kepatuhan pada kesepakatan harga kontrak.",
        "Jika suplier konsisten mempertahankan nilai KPI tinggi, berikan kepastian pesanan jangka panjang. Sebaliknya, jika suplier sering terlambat atau mengirimkan bahan baku berkualitas rendah, jangan ragu beralih ke pemasok alternatif yang lebih profesional demi menjaga reputasi rasa masakan Anda."
    ],
    "strategi-pemasaran-digital-lokal-seo-umkm-2026": [
        "## Integrasi Fitur Chat WhatsApp dan Booking Langsung di Google Maps",
        "Di era serba praktis tahun 2026, calon pelanggan tidak lagi mau direpotkan dengan harus menyimpan nomor telepon atau mencari alamat website yang rumit. Hubungkan profil Google Business Anda dengan fitur tombol Click to WhatsApp atau sistem reservasi meja otomatis.",
        "Ketika pengguna menemukan toko Anda di Google Maps, mereka dapat memencet satu tombol untuk langsung mengobrol dengan tim layanan pelanggan Anda atau memesan slot reservasi secara instan. Kemudahan aksesibilitas ini terbukti meningkatkan konversi penjualan dari pencarian pencarian lokal hingga 45 persen.",
        "## Mengoptimalkan Konten Website dengan Skema Struktur Data (Schema Markup)",
        "Bagi para pemilik UMKM yang sudah memiliki website resmi, pastikan untuk menerapkan kode LocalBusiness Schema Markup pada sistem website Anda. Kode data terstruktur ini memberikan petunjuk langsung kepada mesin pencari Google mengenai jam buka toko, koordinat peta lokasi, kisaran harga menu, serta wilayah jangkauan pengiriman.",
        "## Pemantauan Analitik Pencarian Lokal (Google Business Insights)",
        "Manfaatkan fitur analitik bawaan Google Business Insights untuk mempelajari perilaku calon pelanggan Anda. Anda dapat melihat berapa banyak orang yang meminta petunjuk arah (directions) menuju toko Anda, berapa banyak panggilan telepon yang masuk, serta kata kunci lokal apa saja yang paling sering diketik pengguna untuk menemukan bisnis Anda."
    ],
    "mengenal-gaya-hidup-slow-living-menjaga-kesehatan-mental": [
        "## Filosofi 'Wabi-Sabi': Menghargai Ketidaksempurnaan Hidup",
        "Konsep slow living sangat erat kaitannya dengan filosofi tradisional Jepang yang disebut Wabi-Sabi—yaitu seni menemukan keindahan dalam ketidaksempurnaan, keretakan, dan proses alamiah kehidupan.",
        "Banyak stres dan kecemasan modern bersumber dari obsesi perfeksionisme yang berlebihan: harus memiliki rumah yang selalu rapi sempurna seperti di majalah, karier yang melesat tanpa hambatan, atau penampilan tanpa celah. Dengan mengadopsi prinsip Wabi-Sabi, kita belajar menerima pasang surut kehidupan dengan lapang dada dan mengurangi tekanan mental yang tidak perlu.",
        "## Membangun Hubungan Sosial yang Mendalam (Deep Social Connections)",
        "Di era media sosial tahun 2026, seseorang bisa memiliki ribuan teman atau pengikut virtual namun tetap merasa sangat kesepian di dunia nyata. Slow living mengajak kita mengalihkan fokus dari jumlah interaksi superfisial menuju kualitas hubungan tatap muka.",
        "Luangkan waktu tanpa distraksi gadget untuk mengobrol hangat dengan anggota keluarga di meja makan, berjalan-jalan sore bersama sahabat, atau berkontribusi dalam kegiatan sosial masyarakat di sekitar tempat tinggal Anda.",
        "## Praktik Jurnalisme Rasa Syukur (Gratitude Journaling)",
        "Sediakan waktu 5 menit setiap malam sebelum tidur untuk menuliskan 3 hal sederhana yang Anda syukuri hari ini di dalam buku catatan pribadi. Kebiasaan mencatat rasa syukur terbukti secara ilmiah melatih otak untuk fokus pada aspek positif kehidupan dan meningkatkan kualitas tidur malam Anda."
    ],
    "panduan-menjaga-pola-makan-gizi-seimbang-pekerja-kantoran": [
        "## Pentingnya Mengunyah Makanan Secara Perlahan (Mindful Eating)",
        "Akibat dikejar tenggat waktu rapat yang padat, tidak sedikit pekerja kantoran yang menyantap makan siang secara terburu-buru sambil mengetik di laptop atau membalas pesan WhatsApp. Kebiasaan makan tergesa-gesa membuat Anda menelan udara lebih banyak (memicu perut kembung) dan membuat otak terlambat menerima sinyal kenyang dari lambung.",
        "Terapkan teknik mindful eating: kunyah setiap suapan makanan sebanyak 20 hingga 30 kali hingga lembut. Nikmati tekstur dan aroma makanan secara sadar. Kebiasaan ini membantu proses pencernaan bekerja lebih ringan dan mencegah rasa begah berlebihan setelah makan siang.",
        "## Pengelolaan Jadwal Jam Makan dan Puasa Intermiten (Intermittent Fasting)",
        "Bagi pekerja kantoran yang ingin menjaga berat badan ideal sekaligus meningkatkan kejernihan pikiran (mental clarity), metode Intermittent Fasting pola 16:8 (16 jam puasa dan 8 jam jendela makan) dapat menjadi opsi yang sangat efektif.",
        "Misalnya, Anda dapat memulai jendela makan pertama di jam 11 siang dan mengakhirinya di jam 7 malam. Selama periode puasa, Anda tetap diperbolehkan minum air putih atau teh hijau tanpa gula. Pola ini membantu menurunkan kadar insulin dan memberi kesempatan bagi organ pencernaan untuk beristirahat.",
        "## Rekomendasi Menu Bekal Sehat Mingguan Praktis",
        "Berikut adalah ide kombinasi bekal sehat yang mudah disiapkan dari rumah:\n- Senin: Dada ayam panggang bumbu rempah, nasi merah, dan tumis brokoli wortel.\n- Selasa: Ikan kembung bakar, kentang rebus, dan salad sayur minyak zaitun.\n- Rabu: Tahu tempe bacem, nasi hitam, dan tumis kangkung garlic.\n- Kamis: Daging sapi tumis paprika, oat gurih, dan rebusan buncis.\n- Jumat: Omelet telur sayuran, ubi jalar kukus, dan salad buah segar."
    ],
    "desain-taman-minimalis-belakang-rumah-mungil-estetik": [
        "## Memilih Jenis Pembatas Taman (Garden Edging) yang Rapi",
        "Untuk memberikan kesan struktur lanskap yang bersih dan teratur pada taman belakang mungil Anda, pasanglah pembatas taman (garden edging). Anda dapat menggunakan batu bata terakota, batu alam hitam, atau pembatas fleksibel berbahan alumunium.",
        "Pembatas ini berfungsi memisahkan area rumput hijau, batu koral, dan tanah media tanam agar tidak saling berserakan saat disiram atau terkena hujan deras.",
        "## Integrasi Sistem Penyiraman Otomatis (Drip Irrigation)",
        "Bagi pemilik rumah yang sering bepergian luar kota atau bertugas dinas, kekhawatiran terbesar adalah tanaman taman mati layu karena lupa disiram. Solusinya adalah memasang sistem penyiraman tetes otomatis (drip irrigation system) yang terhubung dengan timer stopkontak digital.",
        "Sistem ini akan otomatis menyiramkan tetesan air secara presisi langsung ke area akar tanaman selama 5 menit setiap pagi dan sore hari, menghemat penggunaan air sekaligus menjaga kesegaran taman Anda secara konsisten.",
        "## Pemanfaatan Ornaments Cermin Dinding untuk Efek Ilusi Ruang Luas",
        "Trik rahasia para desainer lanskap profesional untuk menyiasati lahan taman yang sangat sempit adalah memasang cermin dinding luar (outdoor mirror) berbahan kaca tempered pada salah satu sudut dinding taman. Pantulan pemandangan tanaman hijau pada cermin akan memberikan ilusi visual seolah-olah taman belakang Anda memiliki kedalaman ruang dua kali lebih luas."
    ],
    "panduan-memilih-material-atap-rumah-tahan-cuaca-ekstrem": [
        "## Sistem Keamanan Pembungan Air Hujan (Talang dan Downspout)",
        "Ketahanan atap terhadap kebocoran tidak hanya ditentukan oleh lembaran genteng, tetapi juga oleh sistem pembuangan air hujan (drainage system). Pastikan ukuran diameter pipa talang tegak (downspout) cukup besar (minimal ukuran 3 hingga 4 inci) untuk menampung curahan air hujan lebat berkepadatan tinggi.",
        "Pasang pula saringan jebakan sampah (gutter guard) pada lubang talang untuk mencegah daun-daun kering meluncur masuk dan menyumbat saluran pembuangan.",
        "## Pentingnya Garansi Pabrikan dan Sertifikasi Standar Mutu",
        "Saat membeli material atap (terutama atap UPVC dan genteng bitumen metal), pastikan produk tersebut memiliki garansi resmi pabrikan minimal 10 hingga 15 tahun terhadap risiko kerapuhan UV dan kebocoran.",
        "Selalu periksa sertifikasi Standar Nasional Indonesia (SNI) atau sertifikasi standar internasional ISO untuk memastikan material yang Anda gunakan telah lolos uji ketahanan beban angin, sifat tahan api (fire retardant), dan daya tahan warna dari kepudaran."
    ],
    "panduan-keamanan-cyber-personal-mencegah-kebocoran-data": [
        "## Pengamanan Perangkat Pintar Rumah (Smart Home & IoT Devices)",
        "Di era rumah pintar tahun 2026, celah kejahatan siber tidak hanya datang dari laptop atau smartphone, tetapi juga dari perangkat IoT di rumah seperti IP camera CCTV, smart TV, dan router Wi-Fi.",
        "Peretas dapat mengeksploitasi kata sandi bawaan pabrik (default password) dari router atau CCTV murah untuk menyusup ke dalam jaringan Wi-Fi rumah Anda. Selalu ubah kata sandi administrator bawaan router dan aktifkan sistem enkripsi Wi-Fi WPA3 yang lebih tangguh.",
        "## Kebersihan Jejak Digital (Digital Footprint Hygiene)",
        "Lakukan pembersihan jejak digital secara berkala: hapus akun-akun media sosial lama atau situs web e-commerce yang sudah tidak lagi Anda gunakan. Semakin sedikit platform digital tempat data Anda tersimpan, semakin kecil pula risiko kebocoran identitas Anda di masa depan."
    ],
    "tren-pemanfaatan-quantum-computing-industri-2026": [
        "## Pengaruh Komputasi Kuantum Terhadap Pengembangan Energi Terbarukan",
        "Salah satu terobosan paling menjanjikan dari komputasi kuantum adalah kemampuannya mensimulasikan reaksi katalis kimia untuk penangkapan karbon (carbon capture) langsung dari udara atmosfer.",
        "Komputer kuantum juga mempercepat penemuan material superkonduktor suhu ruangan (room-temperature superconductors), yang berpotensi menghilangkan kehilangan energi listrik (power loss) saat transmisi daya dari pembangkit menuju pemukiman warga.",
        "## Etika dan Tata Kelola Penggunaan Komputer Kuantum Global",
        "Seiring raksasanya daya pemrosesan data kuantum, komunitas dunia kini menyusun piagam tata kelola etika komputasi kuantum (Quantum Ethics Charter). Hal ini bertujuan memastikan bahwa teknologi kuantum dimanfaatkan untuk kesejahteraan kemanusiaan dan riset medis, bukan untuk senjata pemusnah siber atau peretasan massal kedaulatan negara lain."
    ]
}

def super_expand():
    print("Running SUPER EXPANSION on all articles...")
    sql_statements = []
    
    for filename in os.listdir(json_dir):
        if not filename.endswith(".json"):
            continue
            
        filepath = os.path.join(json_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        slug = data.get("slug")
        if slug in super_pack:
            body = data["body"]
            
            # Find insertion index (before "## Kesimpulan")
            insert_idx = len(body) - 4
            for i, p in enumerate(body):
                if "Kesimpulan" in p or "---" in p:
                    insert_idx = i
                    break
                    
            extra_paragraphs = super_pack[slug]
            data["body"] = body[:insert_idx] + extra_paragraphs + body[insert_idx:]
            
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                
            word_count = sum(len(p.split()) for p in data["body"])
            print(f"SUPER EXPANDED {slug}: total words in body = {word_count}")
            
            body_json_str = json.dumps(data["body"], ensure_ascii=False).replace("'", "''")
            sql_statements.append(f"UPDATE published_articles SET body = '{body_json_str}' WHERE slug = '{slug}';")

    sql_path = "d:/CMSFiles/AnekaNews-Antigravity-v1/scratch/apply_super_expansion.sql"
    with open(sql_path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(sql_statements))
    print(f"Successfully generated SQL script at: {sql_path}")

if __name__ == "__main__":
    super_expand()
