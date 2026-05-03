const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'images');
const OUTPUT = path.join(__dirname, '..', 'list.json');
const exts = new Set(['.jpg','.jpeg','.png','.webp','.gif','.mp4','.webm','.ogg','.mov']);
function walk(dir, base = '') {
  let res = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      res = res.concat(walk(path.join(dir, entry.name), rel));
    } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      res.push(rel.replace(/\\/g, '/'));
    }
  }
  return res;
}

const list = walk(IMAGES_DIR);
fs.writeFileSync(OUTPUT, JSON.stringify(list, null, 2), 'utf-8');