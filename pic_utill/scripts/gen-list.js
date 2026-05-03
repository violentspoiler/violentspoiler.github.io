const fs = require('fs');
const path = require('path');

// ✅ 一定要存在
const IMAGE_EXTS = new Set([
  '.jpg','.jpeg','.png','.webp','.gif',
  '.mp4','.webm','.ogg','.mov'
]);

const ROOT = path.join(__dirname, '..', 'images');
const OUTPUT = path.join(__dirname, '..', 'list.json');

function walk(dir, base = '') {
  let result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      result = result.concat(walk(path.join(dir, entry.name), rel));
    } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      result.push(rel.replace(/\\/g, '/'));
    }
  }
  return result;
}

if (!fs.existsSync(ROOT)) {
  console.error('images directory not found:', ROOT);
  process.exit(0); // 不抛错，避免 Actions 失败
}

const list = walk(ROOT);
fs.writeFileSync(OUTPUT, JSON.stringify(list, null, 2), 'utf-8');

console.log('✅ list.json generated, total:', list.length);