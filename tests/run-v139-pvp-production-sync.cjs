'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..'),pvp=path.join(root,'pvp');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')); assert.strictEqual(pkg.version,'1.39.0');
const meta=JSON.parse(fs.readFileSync(path.join(pvp,'PVP_FRONTEND_BUILD.json'),'utf8')); assert.strictEqual(meta.pvp_version,'v3.50'); assert.strictEqual(meta.website_target_version,'v1.39');
const html=fs.readFileSync(path.join(pvp,'index.html'),'utf8'); assert(html.includes('gl-pvp-3.50-animation-parity-final-2026-09-26'));
assert(fs.existsSync(path.join(pvp,'assets/lobby/swap.png')));
console.log(JSON.stringify({ok:true,website:'v1.39',pvp:'v3.50',cacheRevision:true,swapPng:true},null,2));
