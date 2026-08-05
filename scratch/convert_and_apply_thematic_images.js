import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const brainDir = 'C:/Users/hp/.gemini/antigravity/brain/3861bb6d-90c2-47b6-84e4-e80ca41c98a8';
const publicImgDir = 'd:/CMSFiles/AnekaNews-Antigravity-v1/public/images';

const imageConversions = [
  // Badminton
  {
    srcHero: path.join(brainDir, 'badminton_hero_1785380216695.jpg'),
    srcSub: path.join(brainDir, 'badminton_sub_1785380234006.jpg'),
    destHeroWebp: path.join(publicImgDir, 'strategi-latihan-badminton-pemula-teknik-fisik-2026.webp'),
    destHeroJpg: path.join(publicImgDir, 'strategi-latihan-badminton-pemula-teknik-fisik-2026.jpg'),
    destSubWebp: path.join(publicImgDir, 'strategi-latihan-badminton-pemula-teknik-fisik-2026-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'strategi-latihan-badminton-pemula-teknik-fisik-2026-sub.jpg')
  },
  // Calisthenics
  {
    srcHero: path.join(brainDir, 'calisthenics_hero_1785380246043.jpg'),
    srcSub: path.join(brainDir, 'calisthenics_sub_1785380260952.jpg'),
    destHeroWebp: path.join(publicImgDir, 'manfaat-olahraga-calisthenics-di-rumah-tanpa-alat.webp'),
    destHeroJpg: path.join(publicImgDir, 'manfaat-olahraga-calisthenics-di-rumah-tanpa-alat.jpg'),
    destSubWebp: path.join(publicImgDir, 'manfaat-olahraga-calisthenics-di-rumah-tanpa-alat-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'manfaat-olahraga-calisthenics-di-rumah-tanpa-alat-sub.jpg')
  },
  // Quantum Computing
  {
    srcHero: path.join(brainDir, 'quantum_hero_1785380276051.jpg'),
    srcSub: path.join(brainDir, 'quantum_sub_1785380294211.jpg'),
    destHeroWebp: path.join(publicImgDir, 'tren-pemanfaatan-quantum-computing-industri-2026.webp'),
    destHeroJpg: path.join(publicImgDir, 'tren-pemanfaatan-quantum-computing-industri-2026.jpg'),
    destSubWebp: path.join(publicImgDir, 'tren-pemanfaatan-quantum-computing-industri-2026-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'tren-pemanfaatan-quantum-computing-industri-2026-sub.jpg')
  },
  // Cybersecurity
  {
    srcHero: path.join(brainDir, 'cybersecurity_hero_1785380308175.jpg'),
    srcSub: path.join(brainDir, 'cybersecurity_sub_1785380323214.jpg'),
    destHeroWebp: path.join(publicImgDir, 'panduan-keamanan-cyber-personal-mencegah-kebocoran-data.webp'),
    destHeroJpg: path.join(publicImgDir, 'panduan-keamanan-cyber-personal-mencegah-kebocoran-data.jpg'),
    destSubWebp: path.join(publicImgDir, 'panduan-keamanan-cyber-personal-mencegah-kebocoran-data-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'panduan-keamanan-cyber-personal-mencegah-kebocoran-data-sub.jpg')
  },
  // Atap Rumah
  {
    srcHero: path.join(brainDir, 'atap_rumah_hero_1785380337380.jpg'),
    srcSub: path.join(brainDir, 'eco_house_interior_1785028063156.jpg'),
    destHeroWebp: path.join(publicImgDir, 'panduan-memilih-material-atap-rumah-tahan-cuaca-ekstrem.webp'),
    destHeroJpg: path.join(publicImgDir, 'panduan-memilih-material-atap-rumah-tahan-cuaca-ekstrem.jpg'),
    destSubWebp: path.join(publicImgDir, 'panduan-memilih-material-atap-rumah-tahan-cuaca-ekstrem-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'panduan-memilih-material-atap-rumah-tahan-cuaca-ekstrem-sub.jpg')
  },
  // Taman Minimalis
  {
    srcHero: path.join(brainDir, 'eco_house_interior_1785028063156.jpg'),
    srcSub: path.join(brainDir, 'millennial-eco-house-2026.webp'),
    destHeroWebp: path.join(publicImgDir, 'desain-taman-minimalis-belakang-rumah-mungil-estetik.webp'),
    destHeroJpg: path.join(publicImgDir, 'desain-taman-minimalis-belakang-rumah-mungil-estetik.jpg'),
    destSubWebp: path.join(publicImgDir, 'desain-taman-minimalis-belakang-rumah-mungil-estetik-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'desain-taman-minimalis-belakang-rumah-mungil-estetik-sub.jpg')
  },
  // Local SEO UMKM
  {
    srcHero: path.join(brainDir, 'umkm_micro_store_1785028151403.jpg'),
    srcSub: path.join(brainDir, 'umkm_digital_growth_1785020877876.jpg'),
    destHeroWebp: path.join(publicImgDir, 'strategi-pemasaran-digital-lokal-seo-umkm-2026.webp'),
    destHeroJpg: path.join(publicImgDir, 'strategi-pemasaran-digital-lokal-seo-umkm-2026.jpg'),
    destSubWebp: path.join(publicImgDir, 'strategi-pemasaran-digital-lokal-seo-umkm-2026-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'strategi-pemasaran-digital-lokal-seo-umkm-2026-sub.jpg')
  },
  // Supply Chain
  {
    srcHero: path.join(brainDir, 'arus_kas_hero_1785376338417.jpg'),
    srcSub: path.join(brainDir, 'arus_kas_sub_1785376351825.jpg'),
    destHeroWebp: path.join(publicImgDir, 'efisiensi-manajemen-rantai-pasok-supply-chain-bisnis-kuliner.webp'),
    destHeroJpg: path.join(publicImgDir, 'efisiensi-manajemen-rantai-pasok-supply-chain-bisnis-kuliner.jpg'),
    destSubWebp: path.join(publicImgDir, 'efisiensi-manajemen-rantai-pasok-supply-chain-bisnis-kuliner-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'efisiensi-manajemen-rantai-pasok-supply-chain-bisnis-kuliner-sub.jpg')
  },
  // Slow Living
  {
    srcHero: path.join(brainDir, 'genz_digital_detox_1785020905479.jpg'),
    srcSub: path.join(brainDir, 'soft_travel_nature_1785028074427.jpg'),
    destHeroWebp: path.join(publicImgDir, 'mengenal-gaya-hidup-slow-living-menjaga-kesehatan-mental.webp'),
    destHeroJpg: path.join(publicImgDir, 'mengenal-gaya-hidup-slow-living-menjaga-kesehatan-mental.jpg'),
    destSubWebp: path.join(publicImgDir, 'mengenal-gaya-hidup-slow-living-menjaga-kesehatan-mental-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'mengenal-gaya-hidup-slow-living-menjaga-kesehatan-mental-sub.jpg')
  },
  // Pola Makan Gizi Seimbang
  {
    srcHero: path.join(brainDir, 'rumah_nyaman_hero_1785376364515.jpg'),
    srcSub: path.join(brainDir, 'rumah_nyaman_sub_1785376380497.jpg'),
    destHeroWebp: path.join(publicImgDir, 'panduan-menjaga-pola-makan-gizi-seimbang-pekerja-kantoran.webp'),
    destHeroJpg: path.join(publicImgDir, 'panduan-menjaga-pola-makan-gizi-seimbang-pekerja-kantoran.jpg'),
    destSubWebp: path.join(publicImgDir, 'panduan-menjaga-pola-makan-gizi-seimbang-pekerja-kantoran-sub.webp'),
    destSubJpg: path.join(publicImgDir, 'panduan-menjaga-pola-makan-gizi-seimbang-pekerja-kantoran-sub.jpg')
  }
];

async function convertThematicImages() {
  console.log('Converting thematic images to WebP and JPG...');
  for (const item of imageConversions) {
    if (fs.existsSync(item.srcHero)) {
      await sharp(item.srcHero).resize(1200, 800, { fit: 'cover' }).webp({ quality: 85 }).toFile(item.destHeroWebp);
      await sharp(item.srcHero).resize(1200, 800, { fit: 'cover' }).jpeg({ quality: 85 }).toFile(item.destHeroJpg);
      console.log(`Updated Hero Image: ${path.basename(item.destHeroWebp)}`);
    }
    if (fs.existsSync(item.srcSub)) {
      await sharp(item.srcSub).resize(1200, 800, { fit: 'cover' }).webp({ quality: 85 }).toFile(item.destSubWebp);
      await sharp(item.srcSub).resize(1200, 800, { fit: 'cover' }).jpeg({ quality: 85 }).toFile(item.destSubJpg);
      console.log(`Updated Sub Image: ${path.basename(item.destSubWebp)}`);
    }
  }
  console.log('Finished converting all thematic images!');
}

convertThematicImages().catch(console.error);
