import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/hp/.gemini/antigravity/brain/3861bb6d-90c2-47b6-84e4-e80ca41c98a8';
const publicImgDir = 'd:/CMSFiles/AnekaNews-Antigravity-v1/public/images';

const imagesToProcess = [
  {
    src: path.join(brainDir, 'arus_kas_hero_1785376338417.jpg'),
    destBase: 'membaca-arus-kas-usaha-dengan-sederhana'
  },
  {
    src: path.join(brainDir, 'arus_kas_sub_1785376351825.jpg'),
    destBase: 'membaca-arus-kas-usaha-dengan-sederhana-sub'
  },
  {
    src: path.join(brainDir, 'rumah_nyaman_hero_1785376364515.jpg'),
    destBase: 'membuat-rumah-nyaman-untuk-keluarga-muda'
  },
  {
    src: path.join(brainDir, 'rumah_nyaman_sub_1785376380497.jpg'),
    destBase: 'membuat-rumah-nyaman-untuk-keluarga-muda-sub'
  }
];

async function convertImages() {
  for (const item of imagesToProcess) {
    if (!fs.existsSync(item.src)) {
      console.error(`Source missing: ${item.src}`);
      continue;
    }
    const webpPath = path.join(publicImgDir, `${item.destBase}.webp`);
    const jpgPath = path.join(publicImgDir, `${item.destBase}.jpg`);

    await sharp(item.src)
      .resize(1200, 800, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(webpPath);

    await sharp(item.src)
      .resize(1200, 800, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toFile(jpgPath);

    console.log(`Successfully converted: ${item.destBase}.webp and .jpg`);
  }
}

convertImages().catch(console.error);
