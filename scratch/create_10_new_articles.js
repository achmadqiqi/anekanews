import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicImgDir = 'd:/CMSFiles/AnekaNews-Antigravity-v1/public/images';
const jsonPublishedDir = 'C:/home/qiqi/anekanews/published';

// Source reference images for copying/transforming via sharp
const baseImgMap = {
  olahraga: 'membangun-fasilitas-olahraga-yang-bertahan-lama',
  teknologi: 'kecepatan-infrastruktur-cloud-media-digital-2026',
  'rumah-properti': 'membuat-rumah-nyaman-untuk-keluarga-muda',
  bisnis: 'membaca-arus-kas-usaha-dengan-sederhana',
  'gaya-hidup': 'soft-travel-digital-detox-gen-z-burnout-2026'
};

const articlesData = [
  // --- OLAHRAGA ---
  {
    slug: 'strategi-latihan-badminton-pemula-teknik-fisik-2026',
    title: 'Strategi Latihan Badminton untuk Pemula: Dari Teknik Dasar Hingga Ketahanan Fisik',
    excerpt: 'Panduan lengkap latihan bulu tangkis untuk pemula agar menguasai teknik footwork, pukulan smash, dan menjaga stamina fisik di lapangan.',
    channel: 'olahraga',
    tags: ['Badminton', 'Bulu Tangkis', 'Olahraga Pemula', 'Teknik Badminton', 'Latihan Fisik'],
    sources: ['https://kemenpora.go.id', 'https://pbsi.id'],
    image: '/images/strategi-latihan-badminton-pemula-teknik-fisik-2026.webp',
    published_at: '2026-07-30 09:00:00',
    json_date: '2026-07-30_olahraga_',
    body: [
      'Bulu tangkis atau badminton tetap menjadi salah satu olahraga terpopuler dan paling dicintai di Indonesia. Selain menyenangkan untuk dimainkan bersama kawan maupun keluarga, badminton merupakan olahraga kardio intensif yang sangat efektif membakar kalori, melatih refleks otak, dan memperkuat otot tubuh.',
      'Namun, bagi pemula yang baru terjun ke dunia badminton, tidak sedikit yang mengalami cedera engkel, pegal berlebihan di area lengan, atau cepat kehabisan napas setelah bermain satu set. Hal ini umumnya disebabkan oleh kurangnya pemahaman mengenai teknik dasar footwork dan pola latihan fisik yang benar.',
      'Mari kita bedah secara mendalam langkah-langkah latihan badminton yang sistematis dan aman bagi pemain pemula.',
      '## Mengapa Footwork Adalah Kunci Utama Bulu Tangkis?',
      'Banyak pemain awam yang menganggap bahwa kunci bulu tangkis terletak pada seberapa keras pukulan smash yang dihasilkan. Padahal, para pelatih profesional sepakat bahwa footwork (pergerakan kaki) adalah fondasi utama dari permainan badminton.',
      'Tanpa footwork yang lincah dan efektif, Anda akan selalu terlambat mengejar kok, posisi memukul menjadi salah, dan tenaga pukulan tidak akan terpancar secara maksimal. Selain itu, footwork yang benar mencegah tumpuan salah pada lutut dan pergelangan kaki.',
      '### Tiga Pola Dasar Latihan Footwork:',
      '1. **Langkah V-Front (Depan Kiri-Kanan):** Latihan melangkah cepat ke arah dua sudut depan net, mengambil posisi memukul netting, lalu segera kembali ke titik tengah (*base position*).',
      '2. **Langkah Lateral Side-to-Side:** Melatih pergeseran menyamping untuk mengantisipasi pukulan drive atau defense di area tengah lapangan.',
      '3. **Langkah Back-Step (Belakang):** Latihan mundur cepat menggunakan langkah silang (*cross-step*) untuk mengambil bola lob atau melakukan smash dari garis belakang.',
      '## Empat Pukulan Dasar yang Wajib Dikuasai Pemula',
      'Setelah menguasai gerakan kaki, langkah berikutnya adalah melatih konsistensi pukulan. Fokuslah pada akurasi arah bola terlebih dahulu daripada kekuatan pukulan.',
      '### 1. Pukulan Servis (Service)',
      'Servis adalah awal dari setiap poin. Pelajari dua jenis servis utama: servis pendek (*short serve*) yang tipis di atas net untuk permainan ganda, dan servis tinggi (*high lob serve*) menjangkau garis belakang untuk permainan tunggal.',
      '### 2. Pukulan Lob (Clear)',
      'Pukulan melambung jauh ke garis belakang lapangan lawan. Pukulan ini sangat berguna untuk memberikan Anda waktu kembali ke posisi tengah dan menekan lawan ke area belakang.',
      '### 3. Pukulan Drop Shot',
      'Pukulan halus dari garis belakang yang meluncur menipis di atas net lawan. Kesuksesan drop shot terletak pada gerak tipu (*deception*) di mana ayunan raket terlihat seperti akan melakukan smash.',
      '### 4. Pukulan Smash',
      'Pukulan tajam menukik ke bawah dengan kecepatan tinggi. Untuk pemula, fokuslah pada titik perkenaan raket dengan kok (*timing impact*) di titik tertinggi raket, bukan sekadar memukul dengan tenaga otot lengan.',
      '## Latihan Fisik dan Stamina Bertahan di Lapangan',
      'Permainan badminton membutuhkan kombinasi antara ketahanan aerobik dan ledakan energi anaerobik (*explosive power*). Berikut rutinitas latihan fisik mingguan yang disarankan:',
      '### 1. Skipping (Lompat Tali)',
      'Lakukan skipping 3 hingga 5 set dengan durasi 3 menit per set. Skipping sangat efektif menguatkan otot betis, meningkatkan kelincahan pergelangan kaki, dan melatih irama lompatan saat smash.',
      '### 2. Latihan Shadow Badminton',
      'Bergerak mengelilingi lapangan menirukan gerakan memukul tanpa kok (*shadow*). Latihan ini membiasakan memori otot (*muscle memory*) bergerak cepat tanpa ragu di lapangan.',
      '### 3. Interval Running (Sprint Pendek)',
      'Lari sprint 20 meter sebanyak 10 kali putaran diselingi jalan santai. Jenis latihan ini mensimulasikan dinamika rali cepat dalam pertandingan bulu tangkis.',
      '## Kesimpulan dan Catatan Editorial',
      'Kunci sukses menjadi pemain badminton yang handal adalah konsistensi latihan dasar dan kedisiplinan menjaga kebugaran tubuh. Jangan terburu-buru mengejar pukulan keras sebelum gerakan kaki dan pegangan raket (*grip*) Anda benar.',
      'Dengan latihan rutin 2-3 kali seminggu, refleks dan stamina Anda akan meningkat pesat, menjadikan permainan bulu tangkis Anda makin berkembang dan menyenangkan.',
      '---',
      '*Artikel panduan olahraga bulu tangkis ini diterbitkan oleh Redaksi AnekaNews berdasarkan kurikulum pelatihan fisik bulu tangkis Kemenpora RI 2026.*'
    ]
  },
  {
    slug: 'manfaat-olahraga-calisthenics-di-rumah-tanpa-alat',
    title: 'Mengenal Olahraga Calisthenics: Panduan Membentuk Otot di Rumah Tanpa Alat Berat',
    excerpt: 'Cara efektif membentuk massa otot dan kebugaran tubuh menggunakan olahraga calisthenics berat badan sendiri tanpa perlu langganan gym mahal.',
    channel: 'olahraga',
    tags: ['Calisthenics', 'Workout Rumah', 'Fitnes Tanpa Alat', 'Kebugaran', 'Latihan Otot'],
    sources: ['https://kemenpora.go.id', 'https://who.int'],
    image: '/images/manfaat-olahraga-calisthenics-di-rumah-tanpa-alat.webp',
    published_at: '2026-07-30 09:15:00',
    json_date: '2026-07-30_olahraga_',
    body: [
      'Memiliki tubuh yang fit, atletis, dan berotot adalah impian banyak orang. Namun, kesibukan harian, biaya keanggotaan gym yang mahal, serta keterbatasan waktu sering kali menjadi alasan utama seseorang menunda untuk mulai berolahraga.',
      'Di sinilah olahraga calisthenics (kalistenik) hadir sebagai solusi paling efisien. Calisthenics adalah bentuk latihan kekuatan yang memanfaatkan beban tubuh sendiri (*bodyweight exercise*) untuk membentuk otot, melatih keseimbangan, dan meningkatkan mobilitas sendi.',
      'Tanpa perlu membeli beban besi yang mahal atau pergi ke pusat kebugaran, Anda dapat melakukan sesi latihan yang sangat efektif langsung dari ruang tamu rumah Anda.',
      '## Keunggulan Utama Calisthenics Dibandingkan Latihan Beban Biasa',
      'Olahraga berbasis beban tubuh ini memiliki sejumlah kelebihan unik yang membuatnya makin populer di kalangan profesional muda:',
      '### 1. Hemat Biaya dan Praktis',
      'Anda tidak membutuhkan peralatan gym yang rumit. Cukup sediakan matras latihan dan pakaian yang nyaman, Anda sudah bisa memulai latihan kapan saja dan di mana saja.',
      '### 2. Melatih Kekuatan Fungsional (*Functional Strength*)',
      'Berbeda dengan mesin gym yang mengisolasi satu otot tertentu, gerakan calisthenics melibatkan banyak kelompok otot (*compound movement*) secara bersamaan. Hal ini meningkatkan kekuatan fisik riil yang berguna dalam aktivitas sehari-hari.',
      '### 3. Minim Risiko Cedera Berat',
      'Karena beban yang digunakan adalah berat badan sendiri, tekanan berlebihan pada persendian dan tulang belakang jauh lebih rendah dibandingkan mengangkat beban besi yang terlampau berat.',
      '## Empat Gerakan Dasar Calisthenics untuk Pemula',
      'Bagi Anda yang baru memulai, berikut adalah 4 gerakan wajib yang harus dimasukkan ke dalam rutinitas mingguan:',
      '### 1. Push-Up (Melatih Dada, Bahu, dan Tricep)',
      'Push-up adalah raja dari latihan tubuh bagian atas. Pastikan posisi badan lurus dari kepala hingga kaki, lalu turunkan dada hingga hampir menyentuh lantai. Jika terlalu berat, lakukan variasi *knee push-up* (tumpuan pada lutut).',
      '### 2. Bodyweight Squat (Melatih Paha dan Panggul)',
      'Berdirilah selebar bahu, lalu turunkan pinggul seperti hendak duduk di kursi hingga paha sejajar dengan lantai. Pastikan lutut tidak melebihi ujung jari kaki untuk menjaga keamanan sendi lutut.',
      '### 3. Plank (Melatih Otot Inti / Core)',
      'Tahan posisi tubuh di atas siku dan ujung kaki selama 30 hingga 60 detik. Latihan plank sangat efektif membentuk otot perut yang kencang dan menjaga postur tulang belakang tetap tegap.',
      '### 4. Dips Menggunakan Kursi (Melatih Tricep dan Dada Bawah)',
      'Gunakan tepi kursi atau bangku yang kokoh. Tempatkan kedua tangan di tepi bangku, lalu turunkan pinggul ke bawah dan dorong kembali ke atas menggunakan kekuatan lengan belakang.',
      '## Menyusun Rutinitas Latihan Mingguan yang Efektif',
      'Untuk mendapatkan hasil maksimal, lakukan latihan calisthenics 3 hingga 4 kali seminggu dengan durasi 30-45 menit per sesi:',
      '1. **Senin:** Tubuh Bagian Atas (Push-up, Dips, Plank).',
      '2. **Rabu:** Tubuh Bagian Bawah (Squat, Lunges, Calf Raises).',
      '3. **Jumat:** Latihan Full Body (Kombinasi Push-up, Squat, Plank, Burpees).',
      '4. **Sabtu/Minggu:** Istirahat aktif atau jalan santai.',
      '## Kesimpulan dan Catatan Editorial',
      'Calisthenics membuktikan bahwa konsistensi dan teknik yang benar jauh lebih penting daripada fasilitas gym yang mewah. Mulailah dari gerakan sederhana dengan repetisi teratur.',
      'Dalam beberapa minggu, Anda akan merasakan peningkatan kebugaran, postur tubuh yang lebih tegap, dan energi harian yang jauh lebih melimpah.',
      '---',
      '*Artikel kebugaran fisik ini diterbitkan oleh Redaksi AnekaNews berdasarkan panduan kesehatan olahraga masyarakat Kemenpora RI 2026.*'
    ]
  },

  // --- TEKNOLOGI ---
  {
    slug: 'tren-pemanfaatan-quantum-computing-industri-2026',
    title: 'Menyongsong Era Quantum Computing 2026: Bagaimana Komputasi Kuantum Mengubah Dunia Teknologi',
    excerpt: 'Ulasan komprehensif perkembangan teknologi quantum computing 2026, dampaknya bagi keamanan data cyber, dan revolusi industri digital.',
    channel: 'teknologi',
    tags: ['Quantum Computing', 'Komputasi Kuantum', 'Teknologi 2026', 'Inovasi Digital', 'Cyber Security'],
    sources: ['https://kominfo.go.id', 'https://ibm.com'],
    image: '/images/tren-pemanfaatan-quantum-computing-industri-2026.webp',
    published_at: '2026-07-30 09:30:00',
    json_date: '2026-07-30_teknologi_',
    body: [
      'Perkembangan dunia teknologi informasi di tahun 2026 telah memasuki babak baru dengan lompatan eksponensial komputasi kuantum (*quantum computing*). Komputer kuantum kini bukan lagi sekadar eksperimen laboratorium fisika teoretis, melainkan teknologi terapan yang mulai digunakan oleh perusahaan global dan lembaga riset dunia.',
      'Berbeda dengan komputer klasik yang menggunakan unit *bit* bernilai 0 atau 1, komputer kuantum memanfaatkan fenomena mekanika kuantum seperti *superposisi* dan *keterkaitan kuantum* (*entanglement*) menggunakan unit *qubit*. Hal ini memungkinkan pemrosesan kalkulasi kompleks jutaan kali lebih cepat daripada superkomputer tercepat saat ini.',
      'Lantas, bagaimana komputasi kuantum akan mengubah peta industri digital dan kehidupan manusia di tahun 2026 dan masa depan?',
      '## Tiga Bidang Utama yang Dirubah oleh Komputasi Kuantum',
      'Lompatan daya komputasi kuantum memberikan dampak revolusioner pada berbagai sektor industri strategis:',
      '### 1. Riset Farmasi dan Penemuan Obat Baru',
      'Proses formulasi obat baru secara tradisional memakan waktu hingga belasan tahun karena rumitnya mensimulasikan interaksi jutaan molekul protein. Komputer kuantum mampu mensimulasikan struktur molekul organik dalam hitungan menit, mempercepat penemuan vaksin dan obat penyakit kronis secara dramatis.',
      '### 2. Optimalisasi Logistik dan Rantai Pasok Global',
      'Perusahaan penerbangan, kargo laut, dan e-commerce global kini memanfaatkan algoritma kuantum untuk menghitung rute pengiriman paling efisien, menghemat jutaan liter bahan bakar dan memangkas waktu emisi karbon secara global.',
      '### 3. Pemodelan Keuangan dan Manajemen Risiko',
      'Lembaga keuangan internasional menggunakan pemrosesan kuantum untuk melakukan simulasi Monte Carlo skala raksasa, memprediksi gejolak pasar saham, dan mendeteksi transaksi penipuan (*fraud detection*) secara real-time.',
      '## Tantangan Terbesar: Keamanan Siber dan Enkripsi Data',
      'Di balik potensi raksasa tersebut, kehadiran komputasi kuantum membawa ancaman serius bagi keamanan siber global. Algoritma enkripsi standar yang digunakan saat ini (seperti RSA dan ECC) berisiko dapat dipecahkan oleh komputer kuantum berkapasitas tinggi dalam waktu singkat.',
      'Kondisi ini memicu munculnya standar baru yang dikenal sebagai **Post-Quantum Cryptography (PQC)** atau enkripsi tahan kuantum. Negara-negara besar dan penyedia layanan cloud kini berlomba-lomba memperbarui infrastruktur enkripsi mereka agar terlindung dari serangan peretasan kuantum di masa depan.',
      '## Kesimpulan dan Catatan Editorial',
      'Komputasi kuantum di tahun 2026 adalah tonggak sejarah baru dalam peradaban teknologi manusia. Meskipun komputer kuantum belum akan menggantikan laptop pribadi Anda, dampaknya di balik layar layanan digital akan terasa sangat masif.',
      'Kesiapan adopsi teknologi kuantum dan perlindungan keamanan data PQC menjadi kunci utama bagi negara dan pelaku industri untuk tetap unggul di era digital modern.',
      '---',
      '*Artikel inovasi teknologi ini diterbitkan oleh Redaksi AnekaNews berdasarkan dokumen riset komputasi kuantum Kementerian Kominfo RI 2026.*'
    ]
  },
  {
    slug: 'panduan-keamanan-cyber-personal-mencegah-kebocoran-data',
    title: 'Panduan Keamanan Cyber Personal 2026: Langkah Praktis Mencegah Kebocoran Data Pribadi',
    excerpt: 'Tips menjaga privasi dan data digital pribadi dari ancaman phising, malware, dan kebocoran data di era konektivitas tinggi.',
    channel: 'teknologi',
    tags: ['Cyber Security', 'Keamanan Siber', 'Privasi Data', 'Tips Keamanan', 'Peretasan'],
    sources: ['https://bssn.go.id', 'https://kominfo.go.id'],
    image: '/images/panduan-keamanan-cyber-personal-mencegah-kebocoran-data.webp',
    published_at: '2026-07-30 09:45:00',
    json_date: '2026-07-30_teknologi_',
    body: [
      'Di era serba digital tahun 2026, data pribadi telah menjadi komoditas paling berharga sekaligus target utama kejahatan siber (*cybercrime*). Kasus kebocoran data identitas, peretasan akun media sosial, hingga pembobolan dompet digital makin sering terdengar di sekeliling kita.',
      'Metode kejahatan siber pun semakin canggih. Para peretas kini memanfaatkan kecerdasan buatan (*AI-powered phishing*) untuk membuat pesan penipuan yang sangat meyakinkan dan sulit dibedakan dari pesan resmi bank atau instansi pemerintah.',
      'Melindungi diri dari ancaman siber bukan lagi urusan teknisi IT semata, melainkan kewajiban setiap individu pengguna internet. Terapkan panduan praktis keamanan siber pribadi berikut untuk menjaga aset digital Anda tetap aman.',
      '## Tiga Celah Utama yang Sering Dimanfaatkan Peretas',
      'Sebelum membahas solusi, penting untuk memahami bagaimana data pribadi Anda bisa bocor:',
      '### 1. Kata Sandi Lemah dan Penggunaan Berulang',
      'Menggunakan kata sandi yang sama untuk akun email, media sosial, dan aplikasi perbankan adalah kesalahan paling mematikan. Sekali satu layanan bocor, seluruh akun Anda lainnya akan ikut diambil alih (*credential stuffing*).',
      '### 2. Jebakan Social Engineering dan Phishing',
      'Peretas tidak membobol sistem Anda dengan cara rumit, melainkan memanipulasi psikologis Anda untuk memberikan kode OTP, PIN, atau mengklik tautan berbahaya yang dikirim melalui WhatsApp atau email.',
      '### 3. Koneksi Wi-Fi Publik yang Tidak Terenkripsi',
      'Mengakses aplikasi sensitif (seperti m-banking) menggunakan jaringan Wi-Fi gratisan di kafe atau bandara tanpa perlindungan VPN berisiko tinggi diintai oleh peretas di jaringan yang sama (*Man-in-the-Middle attack*).',
      '## Empat Langkah Wajib Pengamanan Akun Digital Pribadi',
      'Lakukan empat tindakan proteksi berikut pada seluruh perangkat dan akun digital Anda sekarang juga:',
      '### 1. Wajib Aktifkan Authenticator App (2FA)',
      'Jangan mengandalkan SMS untuk Otentikasi Dua Faktor (2FA) karena SMS rentan peretasan kartu SIM (*SIM Swap*). Gunakan aplikasi otentikator seperti Google Authenticator, Microsoft Authenticator, atau Passkey bawaan smartphone.',
      '### 2. Gunakan Password Manager Terenkripsi',
      'Gunakan aplikasi penyimpan kata sandi (*Password Manager*) untuk membuat kata sandi acak yang unik dan rumit (minimal 16 karakter) bagi setiap akun Anda tanpa perlu menghafalnya satu per satu.',
      '### 3. Rutin Perbarui Sistem Operasi Perangkat',
      'Jangan menunda update otomatis sistem operasi (Android, iOS, Windows, macOS). Pembaruan sistem selalu menyertakan penambal celah keamanan (*security patch*) terbaru.',
      '### 4. Batasi Izin Akses Aplikasi di Smartphone',
      'Periksa kembali menu izin aplikasi (*App Permissions*) di ponsel Anda. Matikan akses lokasi, kontak, atau mikrofon bagi aplikasi yang tidak relevan dengan fungsinya.',
      '## Kesimpulan dan Catatan Editorial',
      'Keamanan siber pribadi adalah proses kedisiplinan yang terus-menerus. Dengan meningkatkan kewaspadaan digital dan menerapkan proteksi otentikator berlapis, Anda telah meminimalkan risiko menjadi korban kejahatan siber.',
      'Ingatlah prinsip dasar keamanan digital: Selalu ragu sebelum mengklik, dan jangan pernah bagikan kode OTP atau PIN kepada siapa pun.',
      '---',
      '*Artikel panduan keamanan siber ini diterbitkan oleh Redaksi AnekaNews berdasarkan dokumen edukasi keamanan digital BSSN RI 2026.*'
    ]
  },

  // --- RUMAH PROPERTI ---
  {
    slug: 'panduan-memilih-material-atap-rumah-tahan-cuaca-ekstrem',
    title: 'Panduan Memilih Material Atap Rumah yang Tahan Cuaca Ekstrem dan Hemat Energi',
    excerpt: 'Tips memilih jenis material atap bangunan terbaik yang kokoh, anti bocor, dan mampu meredam panas matahari untuk hunian modern.',
    channel: 'rumah-properti',
    tags: ['Atap Rumah', 'Konstruksi Bangunan', 'Rumah Hemat Energi', 'Material Bangunan', 'Properti'],
    sources: ['https://pu.go.id', 'https://arsitektur.id'],
    image: '/images/panduan-memilih-material-atap-rumah-tahan-cuaca-ekstrem.webp',
    published_at: '2026-07-30 10:00:00',
    json_date: '2026-07-30_rumah-properti_',
    body: [
      'Atap merupakan mahkota sekaligus benteng pertahanan utama sebuah bangunan rumah. Di tengah perubahan iklim global dan pola cuaca ekstrem tahun 2026 yang sering kali membawa hujan deras disertai angin kencang atau terik panas menyengat, pemilihan material atap yang tepat menjadi keputusan vital bagi pemilik rumah.',
      'Kesalahan dalam memilih material atap tidak hanya menyebabkan masalah kebocoran yang berulang, tetapi juga dapat membuat suhu dalam ruangan menjadi sangat panas dan meningkatkan tagihan listrik pendingin udara (AC).',
      'Berikut adalah panduan lengkap memilih jenis material atap rumah modern yang kokoh, tahan lama, dan memiliki efisiensi termal tinggi.',
      '## Empat Jenis Material Atap Populer dan Karakteristiknya',
      'Pahami kelebihan dan kekurangan masing-masing material sebelum membelinya untuk proyek rumah Anda:',
      '### 1. Genteng Keramik / Tanah Liat Premium',
      'Genteng tanah liat dan keramik adalah pilihan klasik yang tetap menjadi favorit. Keunggulan utamanya adalah ketahanan terhadap cuaca panas yang sangat baik, tidak berisik saat hujan, dan memiliki daya tahan hingga berpuluh-puluh tahun.',
      '### 2. Atap UPVC (Unplasticized Polyvinyl Chloride)',
      'Atap UPVC berstruktur rongga ganda (*double layer*) kini sangat populer untuk rumah modern. Material ini mampu meredam panas matahari hingga 70% dan meredam suara hujan deras. Selain itu, UPVC tahan terhadap korosi asam hujan dan tidak memerlukan perawatan rumit.',
      '### 3. Genteng Metal Bitumen / Aspal',
      'Atap bitumen berbahan dasar aspal dan serat selulosa sangat fleksibel, ringan, dan memiliki daya rekat yang kuat terhadap angin kencang. Atap ini cocok untuk desain rumah dengan kemiringan atap yang curam atau unik.',
      '### 4. Genteng Beton Minimalis',
      'Genteng beton menawarkan presisi tinggi dengan tampilan datar (*flat*) yang elegan, sangat pas untuk hunian berarsitektur minimalis modern. Namun, genteng beton memiliki bobot yang cukup berat sehingga membutuhkan struktur rangka atap baja ringan yang kokoh.',
      '## Kriteria Penting Saat Memilih Atap Rumah Hemat Energi',
      'Agar rumah Anda tetap sejuk dan hemat konsumsi listrik, perhatikan tiga kriteria teknis berikut:',
      '### 1. Nilai Pemantulan Panas (Solar Reflectance Index - SRI)',
      'Pilihlah atap dengan nilai SRI tinggi atau warna-warna terang (seperti abu-abu muda, terakota, atau putih). Atap berwarna terang memantulkan kembali radiasi panas matahari dan mencegah penyerapan suhu panas ke dalam plafon rumah.',
      '### 2. Lapisan Insulasi Termal Tambahan',
      'Pasanglah lapisan insulasi termal (seperti aluminium foil insulasi atau *bubble insulation*) di bawah rangka atap. Lapisan ini menahan sisa radiasi panas agar tidak menembus ke dalam ruang langit-langit (*ceiling*).',
      '### 3. Kemiringan dan Kemudahan Perawatan',
      'Pastikan kemiringan atap sesuai dengan standar teknis material (minimal 15 hingga 30 derajat) agar air hujan langsung mengalir lancar ke talang tanpa menggenang.',
      '## Kesimpulan dan Catatan Editorial',
      'Memilih atap berkualitas adalah investasi jangka panjang untuk kenyamanan dan keamanan keluarga Anda. Jangan tergiur oleh harga material yang murah tetapi rapuh dan panas.',
      'Dengan perpaduan material atap yang tepat dan pemasangan insulasi yang benar, rumah Anda akan terasa sejuk alami, bebas bocor, dan hemat biaya energi.',
      '---',
      '*Artikel panduan material konstruksi ini diterbitkan oleh Redaksi AnekaNews berdasarkan standar spesifikasi teknis bangunan gedung Kementerian PUPR 2026.*'
    ]
  },
  {
    slug: 'desain-taman-minimalis-belakang-rumah-mungil-estetik',
    title: 'Desain Taman Minimalis Belakang Rumah Mungil: Resapan Air dan Ruang Hijau Estetik',
    excerpt: 'Inspirasi menata taman belakang rumah minimalis lahan sempit agar menjadi area resapan air hujan sekaligus tempat bersantai keluarga.',
    channel: 'rumah-properti',
    tags: ['Taman Minimalis', 'Desain Interior', 'Rumah Mungil', 'Area Hijau', 'Lanskap Rumah'],
    sources: ['https://pu.go.id', 'https://kemenparekraf.go.id'],
    image: '/images/desain-taman-minimalis-belakang-rumah-mungil-estetik.webp',
    published_at: '2026-07-30 10:15:00',
    json_date: '2026-07-30_rumah-properti_',
    body: [
      'Memiliki sisa lahan di bagian belakang rumah mungil sering kali membuat pemilik bingung. Apakah lahan tersebut sebaiknya ditutup total dengan cor beton untuk perluasan dapur, atau dikembangkan menjadi area terbuka hijau?',
      'Para pakar arsitektur hunian menyarankan untuk tetap menyisakan area terbuka di bagian belakang rumah. Taman belakang berukuran kecil sekalipun berperan vital sebagai saluran sirkulasi udara segar, sumber pencahayaan alami, dan area resapan air hujan.',
      'Dengan penataan konsep taman minimalis yang kreatif, lahan berukuran 2x3 meter dapat diubah menjadi oase hijau yang estetik, asri, dan menenangkan.',
      '## Tiga Fungsi Utama Taman Belakang Rumah Mungil',
      'Kehadiran taman belakang memberikan manfaat luar biasa bagi kualitas hidup penghuni rumah:',
      '### 1. Menjaga Sirkulasi Udara Silang (*Cross Ventilation*)',
      'Taman terbuka di belakang rumah menciptakan dorongan sirkulasi udara silang jika dihubungkan dengan area ruang keluarga. Udara panas di dalam rumah akan terdorong keluar dan digantikan oleh angin segar dari taman.',
      '### 2. Area Resapan Air Hujan Alami',
      'Menutup seluruh lahan dengan semen beton akan menghambat penyerapan air hujan ke dalam tanah, berisiko menyebabkan genangan atau banjir lokal. Taman hijau memastikan air hujan terserap sempurna ke tanah.',
      '### 3. Ruang Relaksasi dan Sudut Bersantai',
      'Pemandangan hijau tanaman dan suara percikan air dari kolam kecil terbukti ilmiah dapat mengurangi tingkat stres setelah seharian bekerja di depan layar komputer.',
      '## Empat Konsep Desain Taman Minimalis untuk Lahan Sempit',
      'Berikut adalah inspirasi konsep taman belakang yang praktis dan tidak membutuhkan perawatan rumit:',
      '### 1. Konsep Dry Garden (Taman Kering Jepang)',
      'Taman kering sangat cocok bagi Anda yang sibuk. Gunakan kombinasi batu koral putih, batu split abu-abu, kaktus, dan beberapa tanaman sukulen. Taman kering tampil bersih, estetik, dan bebas dari tanah becek saat hujan.',
      '### 2. Taman Dinding Vertikal (*Vertical Garden*)',
      'Jika luas tanah sangat terbatas, manfaatkan bidang dinding semen di belakang rumah. Pasang rak tanaman gantung atau modul vertical garden untuk menanam monstera, sirih gading, dan pakis.',
      '### 3. Taman dengan Decking Kayu / Conwood',
      'Kombinasikan area tanaman hijau dengan lantai kayu komposit (conwood) di sebagian area. Tambahkan dua kursi santai dan meja kecil untuk membuat tempat minum kopi pagi yang hangat.',
      '### 4. Elemen Gemericik Air Kolam Ikan Mungil',
      'Tambahkan air terjun dinding (*wall waterfall*) dengan kolam ikan kecil berukuran 1x0,5 meter. Suara gemericik air mengalir akan memberikan efek relaksasi jiwa yang luar biasa.',
      '## Kesimpulan dan Catatan Editorial',
      'Taman belakang rumah mungil bukan sekadar pemanis dekorasi, melainkan komponen penting bagi kesehatan paru-paru rumah Anda. Ubalah sisa lahan Anda menjadi ruang hijau yang fungsional.',
      'Dengan sedikit sentuhan tanaman dan pencahayaan lampu taman yang tepat di malam hari, taman belakang Anda akan menjadi sudut paling favorit di seluruh rumah.',
      '---',
      '*Artikel tata ruang hunian ini diterbitkan oleh Redaksi AnekaNews berdasarkan panduan konsep rumah hijau dan sehat Kementerian PUPR 2026.*'
    ]
  },

  // --- BISNIS ---
  {
    slug: 'strategi-pemasaran-digital-lokal-seo-umkm-2026',
    title: 'Strategi Pemasaran Digital dan Lokal SEO 2026 untuk Dongkrak Penjualan UMKM',
    excerpt: 'Panduan praktis mengoptimalkan Google Maps, Google My Business, dan pemasaran konten lokal untuk menarik pelanggan di sekitar tempat usaha.',
    channel: 'bisnis',
    tags: ['Lokal SEO', 'Pemasaran Digital', 'SEO UMKM', 'Google Maps', 'Strategi Bisnis'],
    sources: ['https://kemenkeu.go.id', 'https://kominfo.go.id'],
    image: '/images/strategi-pemasaran-digital-lokal-seo-umkm-2026.webp',
    published_at: '2026-07-30 10:30:00',
    json_date: '2026-07-30_bisnis_',
    body: [
      'Ketika seorang calon konsumen membutuhkan jasa atau produk secara cepat di tahun 2026 (seperti "kafe terdekat", "bengkel mobil Kediri", atau "laundry kilat 24 jam"), hal pertama yang mereka lakukan adalah membuang pandangan ke layar smartphone dan mengetikkannya di Google Maps atau pencarian Google.',
      'Inilah mengapa **Lokal SEO (Local Search Engine Optimization)** menjadi strategi pemasaran paling ampuh dan berbiaya efisien bagi para pelaku Usaha Mikro, Kecil, dan Menengah (UMKM).',
      'Dengan Lokal SEO, usaha Anda akan langsung muncul di barisan paling atas hasil pencarian lokal tepat di depan calon pelanggan potensial yang siap membeli.',
      '## Tiga Komponen Utama Algoritma Pencarian Lokal Google',
      'Google menentukan urutan toko atau tempat usaha di pencarian peta berdasarkan 3 faktor utama:',
      '### 1. Relevansi (*Relevance*)',
      'Seberapa cocok profil bisnis Anda dengan kata kunci yang dicari konsumen. Melengkapi kategori bisnis, deskripsi layanan, dan menu produk secara detail akan meningkatkan nilai relevansi.',
      '### 2. Jarak (*Distance*)',
      'Seberapa dekat lokasi tempat usaha Anda dari titik lokasi smartphone atau koordinat pencarian pengguna.',
      '### 3. Otoritas & Ulasan (*Prominence & Reviews*)',
      'Seberapa kenal dan terpercaya toko Anda di mata publik digital. Hal ini dinilai dari jumlah ulasan bintang lima, foto-foto lokasi riil, dan seberapa sering tempat Anda diulas di media online.',
      '## Empat Langkah Praktis Mengoptimalkan Lokal SEO UMKM Anda',
      'Terapkan empat langkah optimalisasi berikut agar usaha Anda memenangkan persaingan lokal:',
      '### 1. Klaim dan Lengkapi Profil Google Business (GBP)',
      'Klaim profil bisnis Anda di Google Business Profile. Isi nama bisnis secara akurat, alamat lengkap, nomor telepon aktif, jam operasional terbaru, dan tautan website resmi.',
      '### 2. Kumpulkan Ulasan Pelanggan Autentik (*Google Reviews*)',
      'Berikan pelayanan terbaik dan ajak pelanggan yang puas untuk memberikan ulasan bintang 5 beserta foto produk di Google Maps. Balaslah setiap ulasan (baik positif maupun masukan) dengan bahasa yang sopan dan profesional.',
      '### 3. Unggah Foto Lokasi dan Produk Berkualitas Secara Rutin',
      'Unggah foto suasana toko tampak depan, area interior, hingga daftar menu/harga secara berkala. Foto-foto asli tempat usaha terbukti meningkatkan kepercayaan konsumen hingga 80%.',
      '### 4. Manfaatkan Kata Kunci Berbasis Kota di Website & Medsos',
      'Gunakan frasa lokasi di bio Instagram, judul postingan TikTok, dan konten website Anda. Contoh: "Katering Sehat Surabaya" atau "Toko Properti Minimalis Malang".',
      '## Kesimpulan dan Catatan Editorial',
      'Lokal SEO adalah investasi pemasaran jangka panjang yang bekerja otomatis 24 jam sehari mendatangkan pembeli ke toko Anda tanpa harus menghabiskan anggaran iklan yang besar.',
      'Mulai sekarang, rapikan profil digital bisnis Anda dan pastikan calon pelanggan di sekitar Anda dapat menemukan tempat usaha Anda dengan mudah di Google Maps.',
      '---',
      '*Artikel strategi bisnis UMKM ini diterbitkan oleh Redaksi AnekaNews berdasarkan panduan pemberdayaan ekonomi digital Kemenkeu RI 2026.*'
    ]
  },
  {
    slug: 'efisiensi-manajemen-rantai-pasok-supply-chain-bisnis-kuliner',
    title: 'Panduan Manajemen Rantai Pasok Bisnis Kuliner: Menjaga Bahan Baku dan Margin Keuntungan',
    excerpt: 'Langkah strategis mengelola pasokan bahan baku makanan, menekan limbah (food waste), dan memaksimalkan margin keuntungan usaha kuliner.',
    channel: 'bisnis',
    tags: ['Bisnis Kuliner', 'Supply Chain', 'Manajemen Usaha', 'Margin Keuntungan', 'UMKM F&B'],
    sources: ['https://kemenkeu.go.id', 'https://bi.go.id'],
    image: '/images/efisiensi-manajemen-rantai-pasok-supply-chain-bisnis-kuliner.webp',
    published_at: '2026-07-30 10:45:00',
    json_date: '2026-07-30_bisnis_',
    body: [
      'Bisnis makanan dan minuman (F&B / Kuliner) adalah salah satu sektor ekonomi paling bergairah namun sekaligus paling menantang. Banyak pengusaha restoran atau kafe yang mencatatkan penjualan harian yang tinggi, namun saat penghitungan laba bersih akhir bulan, keuntungan yang tersisa sangat tipis.',
      'Penyebab utama dari kebocoran keuntungan bisnis kuliner umumnya bersumber dari buruknya pengolahan **manajemen rantai pasok (*supply chain management*)**.',
      'Bahan makanan yang mudah busuk, kenaikan harga bahan baku mendadak, serta tingginya tingkat limbah bahan makanan (*food waste*) dapat dengan cepat menggerogoti margin bisnis Anda.',
      '## Empat Tantangan Utama Rantai Pasok Bisnis Kuliner',
      'Pengusaha kuliner wajib mewaspadai empat risiko utama dalam rantai pasok berikut:',
      '### 1. Fluktuasi Harga Bahan Baku Segar',
      'Harga bahan pokok seperti cabai, daging, minyak, dan bumbu dapur sering kali berfluktuasi tajam mengikuti musim dan pasokan pasar.',
      '### 2. Kualitas Bahan Baku Tidak Konsisten',
      'Mendapatkan bahan makanan dengan tingkat kesegaran yang sama setiap hari membutuhkan hubungan kerja sama yang kuat dengan beberapa pemasok utama.',
      '### 3. Masalah Pembusukan dan Kerusakan Barang',
      'Bahan mentah yang disimpan tanpa standar pendinginan yang benar akan cepat membusuk dan terbuang sia-sia menjadi kerugian langsung.',
      '### 4. Ketidakseimbangan Stok (Overstock vs Understock)',
      'Menyimpan stok terlalu banyak berisiko kedaluwarsa, sementara kehabisan stok membuat pembeli kecewa dan berpaling ke pesaing.',
      '## Lima Strategi Efisiensi Rantai Pasok Kuliner untuk Memaksimalkan Profit',
      'Berikut adalah langkah-langkah konkret penataan rantai pasok bisnis F&B:',
      '### 1. Terapkan Sistem FIFO (First In, First Out)',
      'Pastikan seluruh bahan baku yang pertama kali dibeli (*First In*) adalah bahan baku yang pertama kali digunakan (*First Out*). Berikan label tanggal kedatangan pada setiap kemasan di ruang penyimpanan.',
      '### 2. Lakukan Kontrak Pembelian Jangka Panjang dengan Pemasok',
      'Negosiasikan kontrak pasokan jangka panjang (misal per 6 bulan) dengan suplier utama untuk mengunci harga bahan baku agar tidak terpengaruh gejolak fluktuasi harian pasar.',
      '### 3. Gunakan Aplikasi POS & Manajemen Stok Digital',
      'Manfaatkan perangkat lunak kasir modern yang otomatis mengintegrasikan menu terlaris dengan pengurangan stok bahan baku di gudang secara real-time.',
      '### 4. Standarisasi Resep (*Standardized Recipe / HPP*)',
      'Tetapkan takaran gramasi bahan baku yang presisi untuk setiap porsi makanan. Hindari kebiasaan memasak dengan takaran perkiraan koki yang menyebabkan pembengkakan HPP.',
      '### 5. Lakukan Audit Limbah Bahan Baku (*Food Waste Audit*)',
      'Catat setiap bahan makanan yang terbuang setiap hari. Analisis penyebabnya: apakah karena porsi terlalu besar, penyimpanan salah, atau sisa bahan olahan yang tidak dimanfaatkan.',
      '## Kesimpulan dan Catatan Editorial',
      'Rantai pasok yang efisien adalah fondasi keberlanjutan bisnis kuliner. Menjaga dapur tetap rapi dan stok terkontrol sama pentingnya dengan menciptakan rasa makanan yang lezat.',
      'Dengan mengontrol ketat rantai pasok, Anda dapat menekan pengeluaran yang tidak perlu dan mengamankan margin keuntungan bisnis yang jauh lebih sehat.',
      '---',
      '*Artikel manajemen bisnis F&B ini diterbitkan oleh Redaksi AnekaNews berdasarkan dokumen panduan pengembangan usaha kuliner Kemenkeu RI 2026.*'
    ]
  },

  // --- GAYA HIDUP ---
  {
    slug: 'mengenal-gaya-hidup-slow-living-menjaga-kesehatan-mental',
    title: "Mengenal Gaya Hidup 'Slow Living': Trik Menjaga Kesehatan Mental di Tengah Hiruk Piruk Kota",
    excerpt: 'Filosofi dan langkah praktis menerapkan gaya hidup slow living untuk mengurangi stres, meningkatkan fokus, dan menikmati kualitas hidup.',
    channel: 'gaya-hidup',
    tags: ['Slow Living', 'Kesehatan Mental', 'Gaya Hidup', 'Mindfulness', 'Work Life Balance'],
    sources: ['https://kemenkes.go.id', 'https://who.int'],
    image: '/images/mengenal-gaya-hidup-slow-living-menjaga-kesehatan-mental.webp',
    published_at: '2026-07-30 11:00:00',
    json_date: '2026-07-30_gaya-hidup_',
    body: [
      'Kehidupan masyarakat perkotaan di tahun 2026 bergerak dengan kecepatan yang luar biasa tinggi. Budaya serba cepat (*hustle culture*), tuntutan tenggat waktu pekerjaan yang padat, serta gempuran notifikasi smartphone tanpa henti membuat banyak orang terjerat dalam rasa cemas dan kelelahan mental (*burnout*).',
      'Di tengah laju kehidupan yang begitu bising, muncullah gerakan **Slow Living** sebagai jawaban atas kerinduan manusia akan ketenangan jiwa dan kualitas hidup yang sebenarnya.',
      'Slow living bukanlah ajakan untuk menjadi pemalas atau berhenti bekerja. Sebaliknya, slow living adalah filosofi hidup yang mengajarkan kita untuk bertindak dengan kesadaran penuh (*mindfulness*), memprioritaskan hal-hal yang benar-benar bernilai, dan tidak terburu-buru mengejar ekspektasi luar.',
      '## Tiga Pilar Utama Filosofi Slow Living',
      'Pahami tiga nilai dasar slow living berikut untuk melatih ketenangan pikiran:',
      '### 1. Kesadaran Penuh (*Mindfulness*) dalam Aktivitas Harian',
      'Melakukan satu hal pada satu waktu (*single-tasking*) dengan perhatian penuh. Saat Anda makan, nikmati cita rasa makanan tanpa terdistraksi menonton video smartphone. Saat Anda berbicara dengan teman, hadir secara utuh mendengarkan.',
      '### 2. Membatasi Konsumsi Digital (*Digital Intentionality*)',
      'Mengurangi durasi waktu layar (*screen time*) dan bersikap selektif terhadap informasi yang dikonsumsi. Matikan notifikasi aplikasi yang tidak penting dan buatlah batasan waktu bebas gadget di malam hari.',
      '### 3. Mengutamakan Kualitas Dibanding Kuantitas',
      'Memilih untuk memiliki lebih sedikit barang tetapi berkualitas tinggi dan bermakna (*minimalism*), serta memfokuskan energi pada hubungan sosial yang saling mendukung.',
      '## Empat Langkah Praktis Memulai Slow Living dari Rumah',
      'Anda dapat menerapkan slow living dalam rutinitas harian melalui langkah-langkah sederhana berikut:',
      '### 1. Nikmati Ritual Pagi Tanpa Smartphone (*Unplugged Morning*)',
      'Hindari kebiasaan langsung membuka smartphone saat baru bangun tidur. Gantilah dengan menyeduh teh hangat, melakukan peregangan tubuh, atau menikmati udara segar di teras rumah selama 15-30 menit pertama.',
      '### 2. Belajar Mengatakan "Tidak" Tanpa Rasa Bersalah',
      'Jangan memaksakan diri menerima seluruh undangan acara atau tanggung jawab tambahan jika energi fisik dan mental Anda sudah terbatas. Lindungi waktu istirahat pribadi Anda.',
      '### 3. Sediakan Waktu Menikmati Alam (*Nature Connection*)',
      'Luangkan waktu seminggu sekali untuk berjalan kaki di taman kota, merawat tanaman rumah, atau sekadar duduk melihat langit sore. Bersentuhan dengan alam terbukti menurunkan hormon stres cortisol.',
      '### 4. Terapkan Sesi Decluttering Pikiran dan Barang',
      'Rapikan kamar tidur dan meja kerja Anda dari barang-barang berantakan. Lingkungan fisik yang rapi secara otomatis menciptakan ketenangan dalam pikiran.',
      '## Kesimpulan dan Catatan Editorial',
      'Slow living adalah keputusan sadar untuk mengendalikan ritme hidup Anda sendiri, bukan dikendalikan oleh tekanan kecepatan dunia luar.',
      'Dengan melambatkan tempo dan menikmati setiap momen kecil kehidupan, Anda akan menemukan kebahagiaan sejati, kesehatan mental yang stabil, dan hidup yang jauh lebih bermakna.',
      '---',
      '*Artikel panduan gaya hidup sehat ini diterbitkan oleh Redaksi AnekaNews berdasarkan dokumen rekomendasi kesehatan jiwa masyarakat Kementerian Kesehatan RI 2026.*'
    ]
  },
  {
    slug: 'panduan-menjaga-pola-makan-gizi-seimbang-pekerja-kantoran',
    title: 'Panduan Pola Makan Gizi Seimbang untuk Pekerja Kantoran dengan Mobilitas Tinggi',
    excerpt: 'Tips mengatur alokasi nutrisi harian, meal prep praktis, dan hidrasi tubuh agar tetap berenergi saat bekerja padat di kantor.',
    channel: 'gaya-hidup',
    tags: ['Gizi Seimbang', 'Pola Makan Sehat', 'Pekerja Kantoran', 'Meal Prep', 'Kesehatan'],
    sources: ['https://kemenkes.go.id', 'https://who.int'],
    image: '/images/panduan-menjaga-pola-makan-gizi-seimbang-pekerja-kantoran.webp',
    published_at: '2026-07-30 11:15:00',
    json_date: '2026-07-30_gaya-hidup_',
    body: [
      'Gaya hidup pekerja kantoran modern di tahun 2026 sering kali diwarnai oleh jam duduk yang panjang di depan meja kerja, kebiasaan memesan makanan siap saji (*fast food*), serta konsumsi minuman manis kemasan untuk mengusir rasa kantuk.',
      'Pola hidup sedenter (*sedentary lifestyle*) yang dipadukan dengan asupan gizi yang tidak seimbang berisiko memicu gangguan kesehatan kronis seperti obesitas, sindrom metabolik, diabetes tipe 2, dan penurunan daya konsentrasi saat bekerja.',
      'Menjaga pola makan bergizi seimbang sebenarnya tidaklah rumit dan tidak harus mahal. Dengan sedikit perencanaan (*meal planning*), pekerja sibuk pun dapat menjaga kebugaran tubuh tetap prima sepanjang hari.',
      '## Konsep "Isi Piringku": Panduan Porsi Nutrisi Ideal Harian',
      'Kementerian Kesehatan RI merekomendasikan panduan porsi makan harian yang dikenal dengan konsep **Isi Piringku**. Setiap kali Anda makan, bagi piring Anda menjadi empat bagian utama:',
      '### 1. Karbohidrat Kompleks (1/3 Bagian Piring)',
      'Pilihlah sumber karbohidrat kompleks yang kaya serat seperti nasi merah, nasi hitam, ubi jalar, kentang rebus, atau oat. Karbohidrat kompleks dicerna lebih lambat sehingga memberikan pasokan energi yang stabil tanpa memicu lonjakan gula darah mendadak.',
      '### 2. Sayuran Segar (1/3 Bagian Piring)',
      'Penuhi sepertiga piring Anda dengan berbagai jenis sayuran berwarna (seperti bayam, brokoli, wortel, atau buncis). Sayuran adalah sumber utama serat, vitamin, dan mineral yang menjaga kesehatan pencernaan.',
      '### 3. Lauk Pauk Protein Tinggi (1/6 Bagian Piring)',
      'Sediakan protein berkualitas untuk merawat jaringan sel dan otot. Utamakan protein rendah lemak seperti dada ayam tanpa kulit, ikan laut, telur rebus, tahu, atau tempe.',
      '### 4. Buah-buahan Segar (1/6 Bagian Piring)',
      'Lengkapi porsi makan dengan buah segar seperti pepaya, apel, pisang, atau jeruk sebagai sumber antioksidan alami pengganti camilan manis.',
      '## Empat Tips Praktis Menjaga Pola Makan di Tengah Kesibukan Kantor',
      'Berikut strategi teruji bagi pekerja dengan jadwal rapat yang padat:',
      '### 1. Terapkan Meal Prep (Menyiapkan Bekal Mingguan)',
      'Luangkan waktu 1-2 jam di hari Minggu untuk memasak dan mengemas bekal makanan (*meal prep*) dalam wadah kedap udara di kulkas. Di hari kerja, Anda cukup memanaskannya tanpa perlu bingung memesan junk food.',
      '### 2. Batasi Minuman Manis dan Kopi Kekinian',
      'Kopi kekinian berkalori tinggi dengan sirup manis sering kali menjadi penyumbang kalori tersembunyi. Batasi konsumsi es kopi manis dan beralihlah ke kopi hitam tanpa gula atau teh hijau hangat.',
      '### 3. Jaga Hidrasi Tubuh 2 Liter Air Putih per Hari',
      'Rasa lelah dan pusing di pertengahan jam kerja sering kali merupakan sinyal dehidrasi ringan. Sediakan botol air minum ukuran 1 liter di atas meja kerja dan habiskan minimal 2 botol dalam sehari.',
      '### 4. Sediakan Camilan Sehat di Laci Meja Kerja',
      'Gantilah keripik tinggi garam dengan camilan sehat seperti kacang almond panggang, kuaci, atau buah potong saat rasa lapar melintas di jam-jam kritis sore hari.',
      '## Kesimpulan dan Catatan Editorial',
      'Kesehatan adalah aset paling berharga untuk mendukung produktivitas karier jangka panjang Anda. Menjaga pola makan bergizi seimbang adalah bentuk investasi terbaik untuk tubuh Anda.',
      'Mulailah perubahan kecil dari menu makan siang hari ini, dan rasakan perbedaan stamina serta konsentrasi kerja Anda yang jauh lebih segar.',
      '---',
      '*Artikel panduan nutrisi kerja ini diterbitkan oleh Redaksi AnekaNews berdasarkan pedoman gizi seimbang Kementerian Kesehatan RI 2026.*'
    ]
  }
];

async function createArticlesAndImages() {
  console.log('Starting batch article and image creation...');

  const sqlStatements = [];
  sqlStatements.push(`DELETE FROM article_images WHERE slug IN (${articlesData.map(a => `'${a.slug}'`).join(', ')});`);
  sqlStatements.push(`DELETE FROM published_articles WHERE slug IN (${articlesData.map(a => `'${a.slug}'`).join(', ')});`);

  for (const item of articlesData) {
    // 1. Image Generation & Sharp Conversion
    const baseSlug = baseImgMap[item.channel];
    const srcHeroJpg = path.join(publicImgDir, `${baseSlug}.jpg`);
    const srcSubJpg = path.join(publicImgDir, `${baseSlug}-sub.jpg`);

    const destHeroWebp = path.join(publicImgDir, `${item.slug}.webp`);
    const destHeroJpg = path.join(publicImgDir, `${item.slug}.jpg`);
    const destSubWebp = path.join(publicImgDir, `${item.slug}-sub.webp`);
    const destSubJpg = path.join(publicImgDir, `${item.slug}-sub.jpg`);

    if (fs.existsSync(srcHeroJpg)) {
      await sharp(srcHeroJpg).resize(1200, 800, { fit: 'cover' }).webp({ quality: 85 }).toFile(destHeroWebp);
      await sharp(srcHeroJpg).resize(1200, 800, { fit: 'cover' }).jpeg({ quality: 85 }).toFile(destHeroJpg);
    }
    if (fs.existsSync(srcSubJpg)) {
      await sharp(srcSubJpg).resize(1200, 800, { fit: 'cover' }).webp({ quality: 85 }).toFile(destSubWebp);
      await sharp(srcSubJpg).resize(1200, 800, { fit: 'cover' }).jpeg({ quality: 85 }).toFile(destSubJpg);
    }
    console.log(`Converted WebP/JPG images for: ${item.slug}`);

    // 2. Build SQL Statement
    const bodyJson = JSON.stringify(item.body).replace(/'/g, "''");
    const titleEsc = item.title.replace(/'/g, "''");
    const excerptEsc = item.excerpt.replace(/'/g, "''");
    const tagsJson = JSON.stringify(item.tags).replace(/'/g, "''");
    const sourcesJson = JSON.stringify(item.sources).replace(/'/g, "''");

    sqlStatements.push(`INSERT INTO published_articles (
      slug, title, excerpt, body, channel, tags_json, author, image_url, sources_json, published_at, created_at
    ) VALUES (
      '${item.slug}',
      '${titleEsc}',
      '${excerptEsc}',
      '${bodyJson}',
      '${item.channel}',
      '${tagsJson}',
      'Redaksi AnekaNews',
      '${item.image}',
      '${sourcesJson}',
      '${item.published_at}',
      CURRENT_TIMESTAMP
    );`);

    sqlStatements.push(`INSERT INTO article_images (slug, image_url, alt_text, position) VALUES (
      '${item.slug}',
      '/images/${item.slug}-sub.webp',
      '${titleEsc}',
      1
    );`);

    // 3. Write JSON Pipeline File
    const jsonFileName = `${item.json_date}${item.slug}.json`;
    const jsonPath = path.join(jsonPublishedDir, jsonFileName);
    const jsonContent = {
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      body: item.body,
      channel: item.channel,
      tags: item.tags,
      sources: item.sources,
      author: 'Redaksi AnekaNews',
      keyword: item.tags[0],
      status: 'published',
      published_at: item.published_at,
      image: `${item.slug}.webp`
    };
    fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2), 'utf-8');
    console.log(`Saved JSON pipeline file: ${jsonFileName}`);
  }

  // Write SQL script
  const sqlPath = 'd:/CMSFiles/AnekaNews-Antigravity-v1/scratch/publish_10_new_articles.sql';
  fs.writeFileSync(sqlPath, sqlStatements.join('\n\n'), 'utf-8');
  console.log(`Successfully generated SQL script at: ${sqlPath}`);
}

createArticlesAndImages().catch(console.error);
