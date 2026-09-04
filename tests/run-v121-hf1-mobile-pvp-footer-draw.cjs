
'use strict';
const assert=require('assert'),fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');const read=r=>fs.readFileSync(path.join(root,r),'utf8');
const home=read('index.html'),pvp=read('pvp/index.html'),css=read('pvp/css/app.css'),app=read('pvp/js/app.bundle.js');
assert(home.includes('assets/site/Cards.png?v=1.22.0'));assert(/\.hero-card-showcase\{[^}]*transform:scale\(1\.82\)/.test(read('css/site.css')));
assert(pvp.includes('gl-pvp-3.38-response-payment'));assert(pvp.includes('assets/favicon.png?v=3.23'));
assert(css.includes('height:max(2px,env(safe-area-inset-bottom,0px))')&&!css.includes('height:calc(64px + env(safe-area-inset-bottom,0px))'));
assert(app.includes("e.reason==='MANDATORY_DRAW_PHASE'")&&app.includes('window.scrollBy(0,overlap)'));assert.strictEqual(require('../package.json').version,'1.27.0');
console.log('PASS Website v1.27 embedded PvP Mobile UI HF2');
