'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'qa/homepage');
const viewports = [[1600,900],[1440,900],[1366,768],[1280,720]];

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const metrics = [];
  try {
    for (const [width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      await page.route(/^https?:/, route => route.abort());
      await page.goto(pathToFileURL(path.join(root, 'index.html')).href, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts && document.fonts.ready);
      const result = await page.evaluate(() => {
        const rect = selector => {
          const value = document.querySelector(selector).getBoundingClientRect();
          return { top: value.top, bottom: value.bottom, left: value.left, right: value.right, width: value.width, height: value.height };
        };
        const header = rect('.site-header');
        const copy = rect('.hero-copy');
        const fan = rect('.hero-card-fan');
        const title = rect('#hero-title');
        return { header, copy, fan, title, firstContentTop: Math.min(copy.top, fan.top) };
      });
      const gap = result.firstContentTop - result.header.bottom;
      assert.ok(gap >= 40, `${width}x${height}: Hero overlaps or is too close to the header (${gap}px).`);
      assert.ok(gap <= 62, `${width}x${height}: desktop top whitespace remains too large (${gap}px).`);
      assert.ok(result.copy.top >= result.header.bottom && result.fan.top >= result.header.bottom, `${width}x${height}: header overlap.`);
      metrics.push({ viewport: `${width}x${height}`, header_bottom: result.header.bottom, first_content_top: result.firstContentTop, top_whitespace: gap, copy: result.copy, fan: result.fan, title: result.title });
      await page.screenshot({ path: path.join(outDir, `homepage-${width}x${height}.png`), fullPage: false });
      await page.close();
    }
  } finally {
    await browser.close();
  }
  fs.writeFileSync(path.join(outDir, 'viewport-metrics.json'), `${JSON.stringify(metrics, null, 2)}\n`);
  console.log(`PASS: Homepage desktop QA captured at ${viewports.map(row => row.join('x')).join(', ')}.`);
})().catch(error => { console.error(error); process.exitCode = 1; });

