const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const css=fs.readFileSync(path.join(root,'pvp/css/app.css'),'utf8');
if(/touch-action\s*:\s*pan-x\s*!important/i.test(css)) throw new Error('embedded PvP: stale pan-x-only touch-action remains');
if(!/overflow-x\s*:\s*auto\s*!important/i.test(css)) throw new Error('embedded PvP: horizontal Hand scrolling was lost');
if(!/touch-action\s*:\s*auto\s*!important/i.test(css)) throw new Error('embedded PvP: native touch-action auto fail-safe missing');
console.log('PASS: superseded Website v1.15 embedded mobile touch regression remains compatible with v1.16.');
