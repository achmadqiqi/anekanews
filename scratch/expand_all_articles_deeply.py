import json
import os
import subprocess

json_dir = "C:/home/qiqi/anekanews/published"

# Define additional rich paragraphs per channel/topic to boost word count to 1100-1400 words
expansion_pack = {
    "strategi-latihan-badminton-pemula-teknik-fisik-2026": [
        "## Evaluasi dan Analisis Video Permainan Sendiri",
        "Salah satu metode paling efektif yang kerap digunakan oleh pemain bulu tangkis profesional adalah merekam video permainan sendiri saat berlatih. Dengan merekam video posisi berdiri dan gerakan melangkah, Anda dapat melihat dengan jelas kesalahan posisi tumpuan kaki atau titik jangkauan memukul raket yang sebelumnya tidak Anda sadari saat bermain.",
        "Cobalah luangkan waktu 10 menit setelah berlatih untuk menonton kembali rekaman tersebut. Bandingkan pergerakan posisi badan Anda dengan rekaman pemain bulu tangkis profesional dunia. Identifikasi area mana yang paling sering membuat Anda kehilangan poin, apakah saat mengembalikan bola smash lawan atau saat tergesa-gesa melakukan netting.",
        "## Pentingnya Asupan Nutrisi dan Hidrasi Elektrolit",
        "Permainan bulu tangkis yang berlangsung dalam durasi 45 hingga 60 menit membakar energi yang sangat masif dan menguras cairan tubuh melalui keringat. Kehilangan 2 persen cairan tubuh saja dapat menurunkan tingkat refleks otak dan koordinasi tangan secara drastis di atas lapangan.",
        "Selalu sediakan botol air putih yang dikombinasikan dengan minuman elektrolit rendah gula. Konsumsilah pisang atau oat bar 30 menit sebelum bertanding untuk memberikan pasokan karbohidrat cepat serap yang menjaga kadar gula darah tetap stabil selama reli-reli panjang."
    ],
    "manfaat-olahraga-calisthenics-di-rumah-tanpa-alat": [
        "## Menjaga Motivasi dan Konsistensi Latihan Jangka Panjang",
        "Tantangan terbesar dari olahraga di rumah tanpa pelatih pribadi adalah mempertahankan konsistensi motivasi harian. Ketika rasa malas melanda setelah pulang dari tempat kerja, tidak sedikit orang yang akhirnya mengabaikan jadwal latihan yang telah disusun.",
        "Untuk mengatasi hal ini, ciptakan lingkungan latihan yang kondusif di dalam rumah. Siapkan matras latihan di area yang bersih dan lapang, putarlah musik energik favorit Anda, dan catatlah setiap pencapaian repetisi harian dalam jurnal atau aplikasi catatan di smartphone Anda. Melihat grafik peningkatan jumlah push-up Anda dari minggu ke minggu akan memberikan dorongan kepuasan psikologis yang luar biasa.",
        "## Kombinasi Calisthenics dengan Aktivitas Kardio Alami",
        "Meskipun calisthenics sangat efektif membangun kekuatan otot, mengombinasikannya dengan latihan kardiovaskular seperti jalan cepat, jogging sore, atau bersepeda seminggu sekali akan melipatgandakan kapasitas paru-paru dan percepatan pembakaran lemak tubuh.",
        "Perpaduan antara massa otot kencang dari calisthenics dan persentase lemak tubuh yang rendah dari latihan kardio akan menghasilkan postur tubuh atletis yang sangat ideal dan prima."
    ],
    "tren-pemanfaatan-quantum-computing-industri-2026": [
        "## Dampak Komputasi Kuantum Terhadap Kecerdasan Buatan (Quantum AI)",
        "Konvergensi antara kecerdasan buatan (*Artificial Intelligence*) dan komputasi kuantum melahirkan era baru yang disebut **Quantum AI**. Algoritma machine learning tradisional membutuhkan waktu berminggu-minggu untuk melatih model bahasa raksasa (*Large Language Models*).",
        "Dengan dukungan akselerasi kuantum, proses pelatihan jaringan saraf tiruan (*deep neural networks*) yang super rumit dapat diselesaikan dalam hitungan detik. Hal ini memungkinkan pengembangan AI cerdas yang mampu memprediksi perubahan iklim global, reaksi kimia atmosfer, dan desain obat genetik secara presisi tinggi.",
        "## Kolaborasi Riset Internasional dan Kesiapan Sumber Daya Manusia",
        "Pengembangan komputasi kuantum membutuhkan integrasi keilmuan multidisiplin yang melibatkan ahli fisika kuantum, insinyur perangkat lunak, matematika terapan, dan pakar keamanan siber.",
        "Perguruan tinggi dan lembaga riset di Indonesia kini didorong untuk memperluas kerja sama dengan laboratorium kuantum global guna mencetak talenta insinyur kuantum muda yang siap bersaing di panggung inovasi teknologi internasional."
    ],
    "panduan-keamanan-cyber-personal-mencegah-kebocoran-data": [
        "## Mengenal Ancaman Deepfake AI dan Penipuan Biometrik",
        "Perkembangan teknologi kecerdasan buatan di tahun 2026 tidak hanya dimanfaatkan untuk hal positif, tetapi juga disalahgunakan oleh penjahat siber. Salah satu ancaman paling berbahaya saat ini adalah penipuan berbasis tiruan suara (*voice cloning*) dan rekaman video palsu (*deepfake*).",
        "Peretas dapat menirukan suara kerabat dekat atau atasan kerja Anda secara sangat mirip menggunakan rekaman suara publik dari media sosial, lalu menelepon Anda untuk meminta transfer uang darurat. Jangan pernah langsung mentransfer uang berdasarkan telepon atau pesan suara; selalu lakukan verifikasi ulang melalui saluran komunikasi sekunder.",
        "## Pentingnya Backup Data Berkala ke Media Luring (Offline)",
        "Selain menjaga integritas kata sandi, proteksi data pribadi wajib dilengkapi dengan sistem pemulihan (*backup*). Selalu simpan salinan dokumen penting Anda di harddisk eksternal yang tidak terhubung terus-menerus ke internet.",
        "Langkah ini sangat efektif melindungi dokumen berharga Anda dari ancaman serangan malware pemeras (*ransomware*) yang mengunci seluruh file komputer."
    ],
    "panduan-memilih-material-atap-rumah-tahan-cuaca-ekstrem": [
        "## Dampak Struktur Rangka Atap Terhadap Keamanan Bangunan",
        "Pemilihan material penutup atap tidak boleh dilepaskan dari kualitas struktur rangka penopangnya. Rangka atap baja ringan (*light steel frame*) kualitas tinggi berstandar SNI kini menjadi pilihan utama menggantikan kayu yang rentan rayap dan pelapukan.",
        "Pastikan perhitungan derajat kemiringan rangka dan ketebalan profil baja (minimal 0.75 mm untuk baja kanal C) telah dikalkulasi oleh teknisi konstruksi berpengalaman sesuai dengan total bobot penutup atap yang Anda pilih.",
        "## Pentingnya Sistem Ventilasi Plafon yang Benar",
        "Suhu panas di dalam rumah tidak hanya berasal dari radiasi atap, tetapi juga dari udara panas yang terperangkap di dalam ruang plafon (*attic space*). Pemasangan louver atau kisi-kisi ventilasi udara di bawah garisan lisplang akan membiarkan udara panas keluar dan digantikan udara dingin, menjaga ruangan tetap sejuk."
    ],
    "desain-taman-minimalis-belakang-rumah-mungil-estetik": [
        "## Tata Pencahayaan Taman (Garden Lighting) untuk Malam Hari",
        "Taman belakang rumah tidak hanya dinikmati saat matahari terbit. Dengan penataan lampu taman (*landscape lighting*) yang tepat, taman belakang mungil Anda akan tampak sangat romantis dan hangat di malam hari.",
        "Gunakan kombinasi lampu sorot (*uplight*) berwarna kuning hangat (*warm white*) yang diarahkan ke bidang tanaman dinding atau batu alam, serta lampu tanam jalur (*pathway light*) berdaya hemat energi surya (*solar panel*).",
        "## Pemilihan Media Tanam dan Pemupukan Organik",
        "Karena luas tanah yang terbatas, pastikan media tanam tanah di taman belakang kaya akan unsur hara. Campurkan tanah humus, pupuk kompos organik, dan sekam bakar dengan perbandingan 2:1:1 untuk memastikan drainase air tetap lancar dan akar tanaman tidak cepat membusuk."
    ],
    "strategi-pemasaran-digital-lokal-seo-umkm-2026": [
        "## Memanfaatkan Konten Video Pendek Berbasis Lokasi (Geotagged Content)",
        "Di era tren konten media sosial 2026, platform seperti TikTok dan Instagram Reels secara agresif merekomendasikan video pendek kepada pengguna berdasarkan titik lokasi geografis mereka.",
        "Pelaku UMKM sangat disarankan untuk rajin menyematkan stiker lokasi (*geotag*) dan menyebutkan nama kota atau area lokal dalam narasi video produk Anda. Contohnya: 'Cobain kuliner mi pedas terfavorit di kawasan Klojen Malang!' Video tersebut akan terdorong otomatis ke beranda pengguna yang berada di kota yang sama.",
        "## Strategi Kemitraan dengan Komunitas dan Influencer Lokal",
        "Bekerja sama dengan *micro-influencer* lokal yang memiliki pengikut setia di kota Anda adalah langkah sangat efektif mendongkrak reputasi toko. Ajak mereka mengulas pengalaman berkunjung ke tempat usaha Anda."
    ],
    "efisiensi-manajemen-rantai-pasok-supply-chain-bisnis-kuliner": [
        "## Pengelolaan Hubungan Baik dengan Pemasok Cadangan (Secondary Supplier)",
        "Menantungkan seluruh pasokan bahan baku makanan hanya pada satu vendor suplier tunggal adalah langkah yang sangat berisiko. Jika vendor utama mengalami kegagalan panen atau kendala pengiriman, dapur restoran Anda bisa lumpuh total.",
        "Selalu bina hubungan profesional dengan minimal 2 hingga 3 pemasok alternatif. Lakukan pengecekan harga dan kualitas bahan baku secara berkala agar Anda selalu memiliki opsi cadangan tanpa mengganggu operasional harian.",
        "## Pentingnya Pelatihan Karyawan Dapur (Kitchen Training)",
        "Efisiensi rantai pasok tidak akan berhasil tanpa kedisiplinan staf dapur. Berikan pelatihan rutin kepada koki dan asisten dapur mengenai teknik pemotongan bahan makanan yang benar untuk meminimalkan bagian bahan baku yang terbuang sia-sia."
    ],
    "mengenal-gaya-hidup-slow-living-menjaga-kesehatan-mental": [
        "## Mengembangkan Hobi Manual Kreatif Tanpa Layar Digital",
        "Salah satu cara paling menyenangkan untuk menikmati slow living adalah dengan menekuni hobi manual yang melibatkan keterampilan tangan langsung, seperti berkebun, merajut, melukis di kanvas, atau memasak resep baru.",
        "Aktivitas manual tanpa interaksi layar monitor terbukti dapat memicu gelombang otak alfa yang memberikan rasa tenang, sekaligus mengasah kreativitas jiwa yang terpendam.",
        "## Menciptakan Ruang Ketenangan (Quiet Zone) di Rumah",
        "Sediakan satu sudut khusus di dalam rumah yang bebas dari perangkat elektronik, TV, atau laptop. Sudut ketenangan ini dapat diisi dengan bantal duduk yang nyaman, beberapa buku bacaan inspiratif, dan lampu baca redup sebagai tempat melepaskan kelelahan pikiran setelah seharian beraktivitas."
    ],
    "panduan-menjaga-pola-makan-gizi-seimbang-pekerja-kantoran": [
        "## Mengatasi Keinginan Makan Berlebihan Saat Stres (Emotional Eating)",
        "Tingginya tekanan pekerjaan di kantor sering kali memicu dorongan untuk mengonsumsi makanan manis atau gurih berlebihan (*emotional eating*) sebagai mekanisme pelarian dari stres.",
        "Saat dorongan ini muncul, cobalah jeda sejenak selama 5 menit. Minumlah segelas air putih hangat dan lakukan relaksasi napas dalam. Sering kali rasa 'lapar' tersebut hanyalah bentuk rasa haus atau sinyal kelelahan otak yang membutuhkan istirahat sejenak, bukan kebutuhan energi riil.",
        "## Pentingnya Waktu Makan Malam yang Teratur",
        "Usahakan untuk menyelesaikan makan malam minimal 2 hingga 3 jam sebelum waktu tidur. Hal ini memberikan waktu bagi organ pencernaan untuk mengolah makanan dengan sempurna, mencegah risiko asam lambung naik (*GERD*), dan memastikan kualitas tidur malam Anda tidak terganggu."
    ]
}

def expand_all():
    print("Starting deep expansion of 10 articles...")
    
    sql_statements = []
    
    for filename in os.listdir(json_dir):
        if not filename.endswith(".json"):
            continue
            
        filepath = os.path.join(json_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        slug = data.get("slug")
        if slug in expansion_pack:
            # Append new rich paragraphs before conclusion
            body = data["body"]
            
            # Find insertion index (before "## Kesimpulan")
            insert_idx = len(body) - 4
            for i, p in enumerate(body):
                if "Kesimpulan" in p or "---" in p:
                    insert_idx = i
                    break
                    
            extra_paragraphs = expansion_pack[slug]
            data["body"] = body[:insert_idx] + extra_paragraphs + body[insert_idx:]
            
            # Save updated JSON
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                
            word_count = sum(len(p.split()) for p in data["body"])
            print(f"Expanded JSON for {slug}: total words in body = {word_count}")
            
            # Build SQL update
            body_json_str = json.dumps(data["body"], ensure_ascii=False).replace("'", "''")
            sql_statements.append(f"UPDATE published_articles SET body = '{body_json_str}' WHERE slug = '{slug}';")

    sql_path = "d:/CMSFiles/AnekaNews-Antigravity-v1/scratch/apply_deep_expansion.sql"
    with open(sql_path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(sql_statements))
    print(f"Successfully generated SQL script at: {sql_path}")

if __name__ == "__main__":
    expand_all()
