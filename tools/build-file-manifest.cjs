'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const excludedDirectories = new Set(['node_modules']);

function walk(base, prefix = '') {
  const out = [];
  for (const entry of fs.readdirSync(base, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const abs = path.join(base, entry.name);
    if (entry.isDirectory()) out.push(...walk(abs, rel));
    else if (entry.isFile() && rel !== 'FILE_MANIFEST_SHA256.csv') out.push(rel);
  }
  return out;
}

const rows = ['path,sha256,size_bytes'];
for (const rel of walk(root)) {
  const data = fs.readFileSync(path.join(root, rel));
  rows.push(`${rel},${crypto.createHash('sha256').update(data).digest('hex')},${data.length}`);
}
fs.writeFileSync(path.join(root, 'FILE_MANIFEST_SHA256.csv'), `${rows.join('\n')}\n`);
console.log(`PASS: Website v1.27 manifest generated for ${rows.length - 1} files.`);
