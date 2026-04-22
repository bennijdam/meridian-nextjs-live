import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const imgs = [
  { photo: '1551288049-bebda4e38f71', name: 'ppc-paid-media' },
  { photo: '1512941937555-1a4d689b0dc4', name: 'app-development-mobile' },
  { photo: '1552664730-d307ca884978', name: 'business-strategy-meeting' },
  { photo: '1497366216548-37526070297c', name: 'london-office-team' },
];

const sizes = [480, 768, 1200, 1920];
const dir = path.resolve('public/img');

function get(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if ((res.statusCode === 301 || res.statusCode === 302) && redirects > 0) {
        resolve(get(res.headers.location, redirects - 1));
      } else {
        resolve(res);
      }
    }).on('error', reject);
  });
}

async function download(url, dest) {
  const res = await get(url);
  if (res.statusCode !== 200) { console.warn(`  SKIP ${res.statusCode}: ${url}`); return false; }
  await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', resolve);
    file.on('error', reject);
  });
  return true;
}

for (const img of imgs) {
  for (const w of sizes) {
    const url = `https://images.unsplash.com/photo-${img.photo}?w=${w}&fm=webp&q=82&fit=crop&crop=entropy`;
    const dest = path.join(dir, `${img.name}-${w}w.webp`);
    process.stdout.write(`${img.name}-${w}w ... `);
    const ok = await download(url, dest);
    console.log(ok ? 'OK' : 'FAILED');
  }
}
console.log('Done.');
