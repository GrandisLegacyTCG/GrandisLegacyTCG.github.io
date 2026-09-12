const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const net=fs.readFileSync(path.join(root,'pvp/js/pvp-network.js'),'utf8');
const html=fs.readFileSync(path.join(root,'pvp/index.html'),'utf8');
function ok(c,m){if(!c){console.error('FAIL',m);process.exit(1);}console.log('PASS',m)}
ok(net.includes('.pvp-v260-topbar{position:relative;padding-right:42px}'),'embedded PvP mobile header reserves right-side hamburger space');
ok(net.includes('.pvp-v260-mobile-menu-button{position:absolute;right:0;left:auto;top:7px'),'embedded PvP hamburger is anchored on the right');
ok(net.includes('.pvp-v260-mobile-menu{position:absolute;right:0;left:auto;top:48px'),'embedded PvP dropdown is anchored on the right');
ok(!net.includes('.pvp-v260-topbar{position:relative;padding-left:42px}'),'stale left-side header padding removed');
ok(!net.includes('.pvp-v260-mobile-menu-button{position:absolute;left:0;top:7px'),'stale left-side hamburger anchor removed');
ok(html.includes('js/pvp-network.js?v=gl-pvp-3.09-web-1.11'),'embedded PvP navigation script cache-bust updated');
console.log('Website v1.11 embedded PvP mobile navigation right-alignment PASS');
