/* Grandis Legacy PvP v2.6.20 — static GitHub Pages deployment config.
   Northflank still serves its own dynamic /config.js; this file is used only when public/ is published statically. */
(function(){
  'use strict';
  window.GL_APP_MODE='PVP';
  window.GL_CONFIG={
    version:'Grandis Legacy PvP v2.6.20 — /pvp/ GitHub Pages frontend',
    mode:'server-authoritative-human-vs-human',
    wsPath:'/ws',
    publicFrontendUrl:'https://grandislegacytcg.github.io/pvp/',
    homeUrl:'https://grandislegacytcg.github.io/',
    room1WsBase:'wss://p01--grandis-legacy-pvp--2kwws8nzlcc2.code.run',
    room2WsBase:'wss://p01--grandis-legacy-pvp-room2--2kwws8nzlcc2.code.run',
    deckBuilderUrl:'https://grandislegacytcg.github.io/Grandis-Legacy-Deck-Builder/',
    aiLobbyUrl:'https://grandislegacytcg.github.io/Grandis-Legacy-VS-AI/',
    maxPlayers:2,
    maxSpectators:4,
    spectatorView:'CARD_BACKS'
  };
  window.GL_PVP_CONFIG=window.GL_CONFIG;
})();
