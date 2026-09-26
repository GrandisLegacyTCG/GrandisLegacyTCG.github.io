'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert');
const root=path.resolve(__dirname,'..'), pvp=path.join(root,'pvp');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')); assert.strictEqual(pkg.version,'1.37.0');
const meta=JSON.parse(fs.readFileSync(path.join(pvp,'PVP_FRONTEND_BUILD.json'),'utf8')); assert.strictEqual(meta.pvp_version,'v3.48'); assert.strictEqual(meta.website_target_version,'v1.37');
assert(fs.existsSync(path.join(pvp,'assets/lobby/swap.png')),'Lobby swap PNG missing from Website mirror');
const idx=fs.readFileSync(path.join(pvp,'index.html'),'utf8'); assert(idx.includes('gl-pvp-3.48-final-bugfix-2026-09-26'),'final cache revision missing');
console.log(JSON.stringify({ok:true,website:'v1.37',pvp:'v3.48',cacheRevision:true,swapPng:true},null,2));
