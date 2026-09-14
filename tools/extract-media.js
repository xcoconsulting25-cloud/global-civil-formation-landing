// Extracts base64 data URIs from tools/source.html into /public files,
// and writes a cleaned index.html (project root) with relative paths.
// Note: filenames are auto-generated as image-N.jpg/mp4; after running this,
// the images were manually deduped/renamed to public/logo-global-civil.jpg
// and public/instructor-photo.jpg, and the video to
// public/hero-structure-demo.mp4 (see README.md).
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const srcPath = path.join(__dirname, 'source.html');
let html = fs.readFileSync(srcPath, 'utf8');

const publicDir = path.join(projectRoot, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const extFor = (mime) => {
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png') return 'png';
  if (mime === 'video/mp4') return 'mp4';
  return 'bin';
};

// Match data:<mime>;base64,<payload> where payload is base64 chars up to the
// closing quote (") that terminates the HTML attribute value.
const dataUriRegex = /data:([a-zA-Z0-9/.+-]+);base64,([A-Za-z0-9+/=]+)/g;

let match;
const found = [];
while ((match = dataUriRegex.exec(html)) !== null) {
  found.push({ full: match[0], mime: match[1], payload: match[2], index: match.index });
}

console.log(`Found ${found.length} data URIs`);

// Assign filenames based on order of appearance + mime type, with sensible names.
const nameCounters = {};
const replacements = []; // { full, replacement }

// We know the structure: 1) favicon jpeg, 2) header logo jpeg, 3) video mp4,
// 4) footer logo jpeg, 5) instructor photo jpeg (order may vary; we detect by index).
found.forEach((f, i) => {
  const ext = extFor(f.mime);
  let base;
  if (f.mime === 'video/mp4') {
    base = 'hero-structure-demo';
  } else {
    // jpeg images - name sequentially, will rename meaningfully after inspection
    nameCounters.img = (nameCounters.img || 0) + 1;
    base = `image-${nameCounters.img}`;
  }
  const filename = `${base}.${ext}`;
  const filePath = path.join(publicDir, filename);
  const buffer = Buffer.from(f.payload, 'base64');
  fs.writeFileSync(filePath, buffer);
  console.log(`Wrote public/${filename} (${(buffer.length / 1024).toFixed(1)} KB) mime=${f.mime}`);
  replacements.push({ full: f.full, filename });
});

// Replace each data URI occurrence in the html with the public path.
// Do it via split/join on the exact matched string to avoid re-matching issues.
replacements.forEach(({ full, filename }) => {
  const idx = html.indexOf(full);
  if (idx === -1) {
    console.warn('WARNING: could not find match to replace for', filename);
    return;
  }
  html = html.slice(0, idx) + `public/${filename}` + html.slice(idx + full.length);
});

fs.writeFileSync(path.join(projectRoot, 'index.html'), html, 'utf8');
console.log('Wrote index.html, new size:', fs.statSync(path.join(projectRoot, 'index.html')).size, 'bytes');
