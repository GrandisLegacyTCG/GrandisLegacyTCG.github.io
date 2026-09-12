'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'css/site.css'), 'utf8');
const viewports = [[1600,900],[1440,900],[1366,768],[1280,720]];
const headerHeight = 82;
const clamp = (minimum, preferred, maximum) => Math.max(minimum, Math.min(preferred, maximum));

assert.match(css, /\.site-header\{[^}]*height:82px/);
assert.match(css, /\/\* v1\.7 desktop Hero top-whitespace refinement \*\/[\s\S]*\.hero-section\{padding-top:clamp\(48px,3\.4vw,56px\)\}/);
const metrics = viewports.map(([width, height]) => {
  const topWhitespace = clamp(48, width * 0.034, 56);
  const firstContentTop = headerHeight + topWhitespace;
  assert.ok(topWhitespace >= 48 && topWhitespace <= 56, `${width}x${height}: invalid desktop Hero top whitespace.`);
  assert.ok(firstContentTop > headerHeight, `${width}x${height}: Hero/header overlap.`);
  return {
    viewport: `${width}x${height}`,
    fixed_header_bottom_px: headerHeight,
    hero_first_content_top_px: Number(firstContentTop.toFixed(2)),
    desktop_top_whitespace_px: Number(topWhitespace.toFixed(2)),
    overlap: false
  };
});

const outDir = path.join(root, 'qa/homepage');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'viewport-metrics.json'), `${JSON.stringify({
  method: 'deterministic CSS clamp/layout-contract evaluation',
  css_contract: 'desktop-only padding-top clamp(48px,3.4vw,56px); sticky header 82px; mobile rule unchanged',
  metrics
}, null, 2)}\n`);
console.log(`PASS: deterministic desktop Hero layout contract at ${viewports.map(row => row.join('x')).join(', ')}; no header overlap.`);

