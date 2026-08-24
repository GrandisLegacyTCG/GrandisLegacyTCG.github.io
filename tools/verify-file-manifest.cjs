'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'FILE_MANIFEST_SHA256.csv');
if (!fs.existsSync(manifestPath)) throw new Error('FILE_MANIFEST_SHA256.csv is missing.');
const rows = fs.readFileSync(manifestPath, 'utf8').trim().split(/\r?\n/).filter(Boolean);
if (rows.shift() !== 'path,sha256,size_bytes') throw new Error('Unexpected manifest header.');
let checked = 0;
for (const row of rows) {
  const match = row.match(/^(.*),([a-f0-9]{64}),(\d+)$/i);
  if (!match) throw new Error(`Invalid manifest row: ${row}`);
  const [, relative, expectedHash, expectedBytes] = match;
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) throw new Error(`${relative} is missing.`);
  const content = fs.readFileSync(file);
  const actualHash = crypto.createHash('sha256').update(content).digest('hex');
  if (actualHash !== expectedHash) throw new Error(`${relative}: SHA-256 mismatch.`);
  if (content.length !== Number(expectedBytes)) throw new Error(`${relative}: byte-count mismatch.`);
  checked += 1;
}
console.log(`PASS: Website v1.9 manifest verification: ${checked} files.`);
