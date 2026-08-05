import fs from 'fs';
import path from 'path';

const distDir = 'd:/CMSFiles/AnekaNews-Antigravity-v1/node_modules/emdash/dist/';

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (file.endsWith('.mjs') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('preview-D4Jnbfx7') || content.includes('buildPreviewUrl')) {
        console.log(`Found reference in file: ${fullPath}`);
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes('preview-D4Jnbfx7') || line.includes('buildPreviewUrl') || line.includes('import')) {
            const start = Math.max(0, index - 2);
            const end = Math.min(lines.length - 1, index + 8);
            console.log(`Line ${index + 1}: ${line}`);
            console.log('--- Context ---');
            console.log(lines.slice(start, end).join('\n'));
            console.log('---------------\n');
          }
        });
      }
    }
  }
}

searchDir(distDir);
