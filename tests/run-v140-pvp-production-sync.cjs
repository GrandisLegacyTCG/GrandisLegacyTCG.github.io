const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..'),pvp=path.join(root,'pvp');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')); assert.strictEqual(pkg.version,'1.40.0');
const meta=JSON.parse(fs.readFileSync(path.join(pvp,'PVP_FRONTEND_BUILD.json'),'utf8')); assert.strictEqual(meta.pvp_version,'v3.51'); assert.strictEqual(meta.package_version,'3.0.51'); assert.strictEqual(meta.website_target_version,'v1.40');
const cfg=fs.readFileSync(path.join(pvp,'config.js'),'utf8'); assert(cfg.includes('Grandis Legacy PvP v3.51'));
const html=fs.readFileSync(path.join(pvp,'index.html'),'utf8'); assert(html.includes('gl-pvp-3.51-minor-correction-r2-2026-09-28'));
console.log(JSON.stringify({ok:true,website:'v1.40',pvp:'v3.51',exactMirrorMetadata:true},null,2));
