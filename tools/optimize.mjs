// Writes a smaller .webp next to every heavy PNG/JPG in assets/img (build.mjs then references the .webp).
// One-off: cd tools && npm i && node optimize.mjs   (needs `sharp`; originals are kept)
import fs from 'fs'; import path from 'path'; import sharp from 'sharp';
import { fileURLToPath } from 'url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../assets/img');
let saved = 0, n = 0;
async function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) { await walk(p); continue; }
    if (!/\.(png|jpe?g)$/i.test(f.name) || fs.statSync(p).size < 100 * 1024) continue;
    const out = p.replace(/\.(png|jpe?g)$/i, '.webp');
    if (fs.existsSync(out)) continue;
    const buf = await sharp(p).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toBuffer();
    if (buf.length < fs.statSync(p).size * 0.85) { fs.writeFileSync(out, buf); saved += fs.statSync(p).size - buf.length; n++; }
  }
}
await walk(ROOT);
console.log(`${n} images optimised, ${(saved / 1048576).toFixed(1)} MB saved`);
