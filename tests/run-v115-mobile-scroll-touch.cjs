const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const css=fs.readFileSync(path.join(root,'pvp/css/app.css'),'utf8');
if(/touch-action\s*:\s*pan-x\s*!important/i.test(css)) throw new Error('embedded PvP: stale pan-x-only touch-action remains');
const dual=(css.match(/touch-action\s*:\s*pan-x\s+pan-y\s*!important/gi)||[]).length;
if(dual<2) throw new Error(`embedded PvP: expected mobile Hand + Hand-card pan-x pan-y rules, found ${dual}`);
if(!/overflow-x\s*:\s*auto\s*!important/i.test(css)) throw new Error('embedded PvP: horizontal Hand scrolling was lost');
console.log('PASS: Website v1.15 embedded PvP mobile vertical-scroll touch contract.');
