/* Grandis Legacy Season 1 PvP v3.51: intentionally OFFLINE lobby archive.
   No WebSocket, no backend, no match engine, no external network requests. */
(() => {
  'use strict';
  const PRESETS = [{"id":"starter-1","label":"Starter 1 — ElementalLord / Conqueror / Renegade","title":"Starter Deck 1","classes":"ELEMENTAL LORD / CONQUEROR / RENEGADE","heroes":[{"base_id":"S1-MAG-H001","name":"Vaelis Stormweave","ranks":["S1-MAG-H001","S1-MAG-H002","S1-MAG-H003"]},{"base_id":"S1-WAR-H001","name":"Draxen Blacksand","ranks":["S1-WAR-H001","S1-WAR-H002","S1-WAR-H003"]},{"base_id":"S1-THF-H001","name":"Finnian Copperpot","ranks":["S1-THF-H001","S1-THF-H002","S1-THF-H003"]}],"stats":{"heroes":9,"legacies":3,"skills":47,"items":7,"events":6,"main":60}},{"id":"starter-2","label":"Starter 2 — Saint / Crusader / GrandRanger","title":"Starter Deck 2","classes":"SAINT / CRUSADER / GRAND RANGER","heroes":[{"base_id":"S1-CLE-H004","name":"Thrain Sunborn","ranks":["S1-CLE-H004","S1-CLE-H005","S1-CLE-H006"]},{"base_id":"S1-WAR-H004","name":"Aurex Sunsworn","ranks":["S1-WAR-H004","S1-WAR-H005","S1-WAR-H006"]},{"base_id":"S1-ARC-H001","name":"Korvak Ironfang","ranks":["S1-ARC-H001","S1-ARC-H002","S1-ARC-H003"]}],"stats":{"heroes":9,"legacies":3,"skills":46,"items":7,"events":7,"main":60}},{"id":"starter-3","label":"Starter 3 — ArcaneDuelist / ElementalLord / Saint","title":"Starter Deck 3","classes":"ARCANE DUELIST / ELEMENTAL LORD / SAINT","heroes":[{"base_id":"S1-THF-H004","name":"Lucien Voss","ranks":["S1-THF-H004","S1-THF-H005","S1-THF-H006"]},{"base_id":"S1-MAG-H004","name":"Aldric Ashford","ranks":["S1-MAG-H004","S1-MAG-H005","S1-MAG-H006"]},{"base_id":"S1-CLE-H001","name":"Elara Heavens","ranks":["S1-CLE-H001","S1-CLE-H002","S1-CLE-H003"]}],"stats":{"heroes":9,"legacies":3,"skills":45,"items":7,"events":8,"main":60}},{"id":"starter-4","label":"Starter 4 — GrandRanger / GrandArbalest / Renegade","title":"Starter Deck 4","classes":"GRAND RANGER / GRAND ARBALEST / RENEGADE","heroes":[{"base_id":"S1-ARC-H001","name":"Korvak Ironfang","ranks":["S1-ARC-H001","S1-ARC-H002","S1-ARC-H003"]},{"base_id":"S1-ARC-H004","name":"Alden Sterling","ranks":["S1-ARC-H004","S1-ARC-H005","S1-ARC-H006"]},{"base_id":"S1-THF-H001","name":"Finnian Copperpot","ranks":["S1-THF-H001","S1-THF-H002","S1-THF-H003"]}],"stats":{"heroes":9,"legacies":3,"skills":46,"items":7,"events":7,"main":60}},{"id":"starter-5","label":"Starter 5 — Renegade / ArcaneDuelist / ElementalLord","title":"Starter Deck 5","classes":"RENEGADE / ARCANE DUELIST / ELEMENTAL LORD","heroes":[{"base_id":"S1-THF-H001","name":"Finnian Copperpot","ranks":["S1-THF-H001","S1-THF-H002","S1-THF-H003"]},{"base_id":"S1-THF-H004","name":"Lucien Voss","ranks":["S1-THF-H004","S1-THF-H005","S1-THF-H006"]},{"base_id":"S1-MAG-H004","name":"Aldric Ashford","ranks":["S1-MAG-H004","S1-MAG-H005","S1-MAG-H006"]}],"stats":{"heroes":9,"legacies":3,"skills":44,"items":8,"events":8,"main":60}}];
  const $ = id => document.getElementById(id);
  const lanes = ['LEFT','CENTER','RIGHT'];
  const rankNames = ['I','II','III'];
  let deckIndex = 0;
  let rank = 0;
  let formation = [...PRESETS[0].heroes];
  let modalRestoreFocus = null;
  const thumb = id => `../shared/season1/v1/cards/thumbs/${encodeURIComponent(id)}.webp`;
  const add = (tag,cl,txt) => {
    const node=document.createElement(tag);
    if(cl)node.className=cl;
    if(txt!==undefined)node.textContent=txt;
    return node;
  };
  const deckSelect = $('pvpSetupDeck');
  PRESETS.forEach((deck,i) => {
    const opt=add('option','',deck.label);opt.value=String(i);deckSelect.appendChild(opt);
  });
  function renderDeck() {
    const deck=PRESETS[deckIndex];
    $('pvpDeckTitle').textContent=deck.title;
    $('pvpDeckClassLine').textContent=deck.classes;
    $('pvpRankLabel').textContent='RANK '+rankNames[rank];
    $('pvpRankPrev').disabled=rank===0;
    $('pvpRankNext').disabled=rank===2;
    const stats=$('pvpDeckStats');stats.replaceChildren();
    for(const [label,count,cl] of [
      ['HEROES',deck.stats.heroes,'stat-heroes'],
      ['LEGACIES',deck.stats.legacies,'stat-legacies'],
      ['LEGACY DECK',deck.stats.heroes+deck.stats.legacies,'total stat-legacy-deck'],
      ['SKILLS',deck.stats.skills,'stat-skills'],
      ['ITEM',deck.stats.items,'stat-item'],
      ['EVENT',deck.stats.events,'stat-event'],
      ['MAIN DECK',deck.stats.main,'total stat-main-deck']]) {
      const row=add('div',cl);row.append(add('dt','',label),add('dd','',String(count)));stats.appendChild(row);
    }
    const root=$('pvpFormationPreview');root.replaceChildren();
    formation.forEach((hero,i) => {
      if(i>0){
        const swap=add('button','pvp-v260-swap-button');
        swap.type='button';swap.setAttribute('aria-label',`Swap ${lanes[i-1]} and ${lanes[i]} Heroes`);
        const swapImage=add('img');swapImage.src='assets/lobby/swap.png';swapImage.alt='';swapImage.setAttribute('aria-hidden','true');swap.append(swapImage);
        swap.addEventListener('click',()=>{
          [formation[i-1],formation[i]]=[formation[i],formation[i-1]];
          renderDeck();
        });root.append(swap);
      }
      const wrap=add('article','pvp-v260-hero');
      const button=add('button','pvp-v260-card');button.type='button';
      button.setAttribute('aria-label',`View ${hero.name} Hero Progression`);
      const image=add('img');image.src=thumb(hero.ranks[rank]);image.alt=`${hero.name} Rank ${rankNames[rank]}`;image.decoding='async';
      button.append(image);
      button.addEventListener('click',()=>showProgression(hero,button));
      wrap.append(button,add('div','pvp-v260-position',lanes[i][0]+lanes[i].slice(1).toLowerCase()));root.append(wrap);
    });
  }
  function showProgression(hero, opener){
    modalRestoreFocus=opener;
    $('archiveHeroName').textContent=`${hero.name} — Hero Progression`;
    const cards=$('archiveHeroCards');cards.replaceChildren();
    hero.ranks.forEach((id,i)=>{
      const wrap=add('div');const img=add('img');img.src=thumb(id);img.alt=`${hero.name} Rank ${rankNames[i]}`;
      wrap.append(img,add('span','',`RANK ${rankNames[i]}`));cards.append(wrap);
    });
    $('archiveHeroModal').hidden=false;
    $('archiveHeroClose').focus();
  }
  function closeProgression(){
    $('archiveHeroModal').hidden=true;
    if(modalRestoreFocus?.isConnected)modalRestoreFocus.focus();
  }
  deckSelect.addEventListener('change',()=>{
    deckIndex=Math.max(0,Math.min(PRESETS.length-1,Number(deckSelect.value)||0));
    formation=[...PRESETS[deckIndex].heroes];rank=0;renderDeck();
  });
  $('pvpRankPrev').addEventListener('click',()=>{rank=Math.max(0,rank-1);renderDeck();});
  $('pvpRankNext').addEventListener('click',()=>{rank=Math.min(2,rank+1);renderDeck();});
  $('archiveHeroClose').addEventListener('click',closeProgression);
  $('archiveHeroModal').addEventListener('click',e=>{if(e.target===$('archiveHeroModal'))closeProgression();});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!$('archiveHeroModal').hidden)closeProgression();
    if(e.key==='Tab'&&!$('archiveHeroModal').hidden){
      e.preventDefault();$('archiveHeroClose').focus();
    }
  });
  renderDeck();
})();
