const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const js=fs.readFileSync(path.join(root,'js/site.js'),'utf8');
const pvpNet=fs.readFileSync(path.join(root,'pvp/js/pvp-network.js'),'utf8');
const pvpCfg=fs.readFileSync(path.join(root,'pvp/config.js'),'utf8');
function ok(c,m){if(!c){console.error('FAIL',m);process.exit(1);}console.log('PASS',m)}
ok(html.includes('id="mobile-menu"')&&html.includes('Grandis-Legacy-Deck-Builder/style-2/'),'Homepage mobile menu points Deck Builder to Style 2');
ok(js.includes("mobileDeckBuilderQuery")&&js.includes("style-2/"),'responsive Homepage Deck Builder routing exists');
ok(html.includes('data-mobile-deck-builder'),'mobile override marks Style 1 desktop actions');
ok(fs.readFileSync(path.join(root,'pvp/index.html'),'utf8').includes('glMobileAppMenuButton'),'embedded PvP has mobile hamburger');
ok(pvpCfg.includes("mobileDeckBuilderUrl:'https://grandislegacytcg.github.io/Grandis-Legacy-Deck-Builder/style-2/'"),'embedded PvP mobile Deck Builder targets Style 2');
console.log('Website v1.10 mobile navigation verification PASS');
