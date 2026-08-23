/* Grandis Legacy PvP v3.07 — static GitHub Pages frontend config.
   Northflank remains the authoritative Room 1 / Room 2 WebSocket backend. */
(function(){
  'use strict';
  window.GL_APP_MODE='PVP';
  window.GL_CONFIG={
    version:'Grandis Legacy PvP v3.07 — GitHub Pages frontend bridge',
    mode:'server-authoritative-human-vs-human',
    wsPath:'/ws',
    publicFrontendUrl:'https://grandislegacytcg.github.io/pvp/',
    homeUrl:'https://grandislegacytcg.github.io/',
    room1WsBase:'wss://p01--grandis-legacy-pvp--2kwws8nzlcc2.code.run',
    room2WsBase:'wss://p01--grandis-legacy-pvp-room2--2kwws8nzlcc2.code.run',
    deckBuilderUrl:'https://grandislegacytcg.github.io/Grandis-Legacy-Deck-Builder/style-1/',
    aiLobbyUrl:'https://grandislegacytcg.github.io/Grandis-Legacy-VS-AI/',
    maxPlayers:2,
    maxSpectators:4,
    spectatorView:'CARD_BACKS'
  };
  window.GL_PVP_CONFIG=window.GL_CONFIG;
})();
