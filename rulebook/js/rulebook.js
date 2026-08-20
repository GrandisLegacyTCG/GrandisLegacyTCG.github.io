(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const normalize = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();
  const stop = new Set('apa apakah itu yang dan di ke dari pada untuk dengan kalau jika gimana bagaimana bisa boleh adalah dalam saat saya gw gue lu hero kartu card the a an of is are can do does how what when where why'.split(' '));
  const synonyms = {
    mati:['defeated','defeat','legacy'], kalah:['defeat','deck out','menang'], menang:['defeat','3 hero'],
    cast:['casting'], casting:['posisi','attachment','counter'], beku:['freeze'], racun:['poison'], terbakar:['burn'], stun:['stun'], bleed:['healing'],
    dodge:['freeze','response'], block:['response','damage'], negate:['response','cancel'], mana:['mana shard','mana pool','mana regen'],
    exp:['tribute','rank up'], rank:['rank up','exp','tribute'], tribute:['reform','exp'], revive:['legacy','defeat'],
    pindah:['reposition'], posisi:['positioning','reposition','area of attack'], serang:['attack','battle'], attack:['battle','response','area of attack'],
    deck:['main deck','deck out','60'], hand:['opening hand','hand limit'], token:['racial token'], attachment:['2 attachment slot']
  };
  const tokensFor = (q) => {
    const arr = normalize(q).split(/\s+/).filter(t => t.length > 1 && !stop.has(t));
    const expanded = [...arr];
    arr.forEach(t => (synonyms[t] || []).forEach(x => expanded.push(...normalize(x).split(' '))));
    return [...new Set(expanded)];
  };

  const sections = $$('.doc-section').map(el => ({
    el,
    id: el.id,
    title: $('h1,h2', el)?.textContent.trim() || 'Rulebook',
    page: el.dataset.page || '',
    tags: el.dataset.tags || '',
    text: el.textContent.replace(/\s+/g,' ').trim()
  }));

  const chunks = [];
  sections.forEach(sec => {
    $$('p,li,tr,.callout,.rule-card,.flow-list>div', sec.el).forEach(el => {
      const text = el.textContent.replace(/\s+/g,' ').trim();
      if (text.length >= 28 && text.length <= 900) chunks.push({section:sec,text});
    });
  });

  const scoreText = (text, tags, query) => {
    const n = normalize(text), nt = normalize(tags), nq = normalize(query), tokens = tokensFor(query);
    let score = 0;
    if (n.includes(nq) && nq.length > 2) score += 18;
    tokens.forEach(t => {
      const re = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`, 'g');
      const hits = (n.match(re) || []).length;
      score += Math.min(hits,4) * 3;
      if (nt.includes(t)) score += 4;
    });
    return score;
  };

  // Sidebar active state.
  const navLinks = $$('.nav-group a');
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
  }, {rootMargin:'-18% 0px -68% 0px',threshold:[0,.1,.4]});
  sections.slice(1).forEach(s => observer.observe(s.el));

  // Mobile sidebar.
  const sidebar = $('#docs-sidebar');
  const toggle = $('.sidebar-toggle');
  toggle?.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  sidebar?.addEventListener('click', e => { if (e.target.closest('a') && innerWidth <= 820) { sidebar.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); } });

  // Search.
  const modal = $('#search-modal'), searchInput = $('#search-input'), results = $('#search-results');
  const openSearch = () => { modal.hidden = false; setTimeout(() => searchInput.focus(),20); renderSearch(searchInput.value); };
  const closeSearch = () => { modal.hidden = true; };
  $('.search-trigger')?.addEventListener('click', openSearch);
  $('.search-backdrop')?.addEventListener('click', closeSearch);
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') { closeSearch(); if (!$('#arvon-panel').hidden) closeArvon(); }
  });
  const renderSearch = (q) => {
    results.innerHTML = '';
    if (!q.trim()) { results.innerHTML = '<p class="empty-state">Ketik untuk mencari di seluruh Player Rulebook.</p>'; return; }
    const ranked = sections.map(s => ({...s,score:scoreText(s.text,s.tags,q)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,8);
    if (!ranked.length) { results.innerHTML = '<p class="empty-state">Tidak ada hasil yang cocok di Player Rulebook v1.</p>'; return; }
    ranked.forEach(r => {
      const a=document.createElement('a'); a.className='search-result'; a.href=`#${r.id}`;
      const n=normalize(r.text), tq=tokensFor(q).find(t=>n.includes(t)); let preview=r.text.slice(0,150);
      if (tq) { const i=n.indexOf(tq); preview=r.text.slice(Math.max(0,i-55), Math.min(r.text.length,i+125)); }
      a.innerHTML=`<b>${escapeHTML(r.title)}</b><span>Page ${escapeHTML(r.page)} · ${escapeHTML(preview)}${preview.length<r.text.length?'…':''}</span>`;
      a.addEventListener('click',closeSearch); results.appendChild(a);
    });
  };
  searchInput?.addEventListener('input', e => renderSearch(e.target.value));

  // Arvon: optional remote endpoint, with rulebook-only local fallback.
  const launcher=$('#arvon-launcher'), panel=$('#arvon-panel'), closeBtn=$('#arvon-close'), form=$('#arvon-form'), input=$('#arvon-input'), messages=$('#arvon-messages');
  const openArvon=()=>{panel.hidden=false;launcher.hidden=true;launcher.setAttribute('aria-expanded','true');setTimeout(()=>input.focus(),20)};
  const closeArvon=()=>{panel.hidden=true;launcher.hidden=false;launcher.setAttribute('aria-expanded','false')};
  launcher?.addEventListener('click',openArvon); closeBtn?.addEventListener('click',closeArvon);
  const addMessage=(who,html)=>{const row=document.createElement('div');row.className=`chat-row ${who}`;const b=document.createElement('div');b.className='bubble';b.innerHTML=html;row.appendChild(b);messages.appendChild(row);messages.scrollTop=messages.scrollHeight;return row};
  const localAnswer=(q)=>{
    const ranked=chunks.map(c=>({...c,score:scoreText(c.text,c.section.tags,q)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
    if (!ranked.length || ranked[0].score < 4) return {text:'Saya belum menemukan jawaban yang cukup jelas di Player Rulebook v1. Coba gunakan istilah yang tertulis pada kartu, misalnya “Casting”, “Rank Up”, “Freeze”, atau “Attachment”.'};
    const top=ranked[0], second=ranked.find(x=>x.section.id!==top.section.id && x.score>=top.score*.72);
    let text=`Menurut <strong>${escapeHTML(top.section.title)}</strong>: ${escapeHTML(top.text)}`;
    if (second) text+=`<br><br>Juga terkait: ${escapeHTML(second.text)}`;
    text+=`<a class="source-link" href="#${top.section.id}">Buka Chapter · Page ${escapeHTML(top.section.page)} →</a>`;
    return {html:text};
  };
  const askRemote=async(q)=>{
    const endpoint=window.GRANDIS_ARVON_ENDPOINT;
    if (!endpoint) return null;
    try{
      const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,source:'Grandis Legacy Player Rulebook v1'})});
      if(!r.ok) return null; const d=await r.json();
      if(!d?.answer) return null; return {text:d.answer,source:d.source||''};
    }catch{return null;}
  };
  form?.addEventListener('submit',async e=>{
    e.preventDefault(); const q=input.value.trim(); if(!q)return; input.value=''; addMessage('user',escapeHTML(q));
    const wait=addMessage('bot','Mencari di Rulebook…');
    const remote=await askRemote(q); wait.remove();
    if(remote){addMessage('bot',`${escapeHTML(remote.text)}${remote.source?`<span class="source-link">${escapeHTML(remote.source)}</span>`:''}`);return;}
    const ans=localAnswer(q); addMessage('bot',ans.html||escapeHTML(ans.text));
  });

  function escapeHTML(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
})();
