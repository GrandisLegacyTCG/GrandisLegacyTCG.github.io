(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escapeHTML = (s) => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  const enSections = {
    overview: `
      <div class="eyebrow">GRANDIS LEGACY · SEASON 1</div>
      <h1>Player Rulebook</h1>
      <p class="lead">Grandis Legacy Season 1 player guide for 3 vs 3 Hero TCG battles.</p>
      <div class="hero-actions">
        <a class="primary-action" href="#chapter-1">Start reading</a>
        <a class="secondary-action" data-pdf-button href="assets/Grandis_Legacy_Player_Rulebook_v2_EN.pdf" target="_blank" rel="noopener">Open English PDF</a>
      </div>
      <div class="callout info"><strong>Reading order:</strong> Chapters 1-8 explain the core game functions. Use the following chapters when Skill symbols, Response, Attachment, Casting, Status, or Healing appear.</div>`,

    'chapter-1': `
      <div class="eyebrow">GAME BASICS · PAGE 3</div>
      <h2>1. Understanding Grandis Legacy and the Battlefield</h2>
      <p>Grandis Legacy is a Trading Card Game built around <strong>3 Hero vs 3 Hero</strong> battles. Players manage Hero positions, use cards from the Main Deck, Rank Up, and use Legacy to maintain their strategy after a Hero is defeated.</p>
      <div class="two-col">
        <div class="rule-card"><h3>Primary win condition</h3><p>Defeat all 3 opposing Heroes.</p></div>
        <div class="rule-card"><h3>Deck-out</h3><p>If the Main Deck is empty and the mandatory Draw Phase draw cannot be performed, that player loses.</p></div>
      </div>
      <div class="callout"><strong>Two separate conditions:</strong> defeating all 3 opposing Heroes is how you win. Maintaining your Main Deck prevents you from losing when a mandatory Draw Phase draw cannot be made.</div>
      <h3>Battlefield Areas</h3>
      <div class="table-wrap"><table><thead><tr><th>Area</th><th>Function</th></tr></thead><tbody>
        <tr><td>Hero Left / Center / Right</td><td>Holds a Hero or Legacy.</td></tr>
        <tr><td>Attachment Slot</td><td>Two active-effect slots per Hero.</td></tr>
        <tr><td>Legacy Deck</td><td>Hero Rank I-III and Legacy Cards.</td></tr>
        <tr><td>Racial Token</td><td>Used for Racial Traits.</td></tr>
        <tr><td>Main Deck</td><td>Source of Skill, Item, and Event Cards.</td></tr>
        <tr><td>Discard Pile</td><td>Holds resolved or discarded cards.</td></tr>
        <tr><td>Mana Pool</td><td>Holds available Mana Shards.</td></tr>
        <tr><td>Hand</td><td>A player's private cards.</td></tr>
      </tbody></table></div>
      <p><strong>Legacy Deck:</strong> three Hero progression packages. Each package contains Hero Rank I, Rank II, Rank III, and 1 Legacy Card. <strong>Main Deck:</strong> contains Skill, Item, and Event Cards; it is shuffled and supplies cards to the Hand.</p>`,

    'chapter-2': `
      <div class="eyebrow">BEFORE PLAY · PAGE 4</div>
      <h2>2. Setup, Turn Structure, and Mana</h2>
      <h3>Game Setup</h3>
      <ol class="steps">
        <li>Choose three Hero packages for the Legacy Deck.</li>
        <li>Place Hero Rank I in Left, Center, and Right.</li>
        <li>Shuffle the Main Deck.</li>
        <li>Draw 6 cards as your opening hand.</li>
        <li>Start with 2 Mana Shards, Mana Regen 1, and 2 Racial Tokens.</li>
        <li>Determine the first player and begin at the Draw Phase.</li>
      </ol>
      <div class="table-wrap"><table><thead><tr><th>Section</th><th>Rule</th></tr></thead><tbody>
        <tr><td>Main Deck</td><td>60 cards: Skill, Item, and Event. Any mix allowed.</td></tr>
        <tr><td>Legacy Deck</td><td>12 cards: three Hero and Legacy packages.</td></tr>
        <tr><td>Copy limit</td><td>Normal cards: maximum 2 copies; Ultimate: maximum 1 copy.</td></tr>
        <tr><td>Hand limit</td><td>Maximum 8 at the end of the turn.</td></tr>
      </tbody></table></div>
      <h3>Turn Structure</h3>
      <figure class="source-figure infographic"><img src="assets/turn-structure.png" alt="Grandis Legacy Turn Structure"><figcaption>Turn Structure — visual reference.</figcaption></figure>
      <div class="phase-strip" aria-label="Turn order"><span>DRAW</span><span>DEPLOY</span><span>BATTLE</span><span>REFORM</span><span>END</span></div>
      <ul>
        <li><strong>Draw:</strong> Ready Heroes, draw 1 mandatory card, then gain Mana.</li>
        <li><strong>Deploy:</strong> Tactical, Item, Event, Ability, Racial Trait, Legacy Ability, Reposition.</li>
        <li><strong>Battle:</strong> Attack, Response, and any Casting that is ready.</li>
        <li><strong>Reform:</strong> Support, Tribute, Legacy Ability, Reposition.</li>
        <li><strong>End:</strong> Resolve Status/end-of-turn effects; reduce Hand to 8; pass turn.</li>
      </ul>
      <h3>Mana Pool and Mana Shard</h3>
      <p>Mana Shards pay for cards and abilities. Available Mana is stored in the Mana Pool. <strong>Mana Pool maximum: 12.</strong> Mana Cost is the amount of Mana paid. Mana Regen is gained during the Draw Phase and can increase to 6.</p>
      <div class="callout warning"><strong>Timing:</strong> cards can only be used during the phase or timing stated on the card. <strong>The first player cannot attack during their first turn.</strong></div>`,

    'chapter-3': `
      <div class="eyebrow">CORE RULES · PAGE 5</div>
      <h2>3. Heroes and Combat Basics</h2>
      <h3>Formation and Area of Attack</h3>
      <div class="table-wrap"><table><thead><tr><th>Attacker position</th><th>Normal targets</th></tr></thead><tbody>
        <tr><td>Left</td><td>Left or Center</td></tr>
        <tr><td>Center</td><td>Left, Center, or Right</td></tr>
        <tr><td>Right</td><td>Center or Right</td></tr>
      </tbody></table></div>
      <div class="two-col">
        <div class="rule-card"><h3>Range Attack</h3><p>An Attack that is not restricted by the normal Area of Attack based on Hero position.</p></div>
        <div class="rule-card"><h3>Area Attack</h3><p>Does not select targets one by one. The Attack affects all opposing Heroes within the user's Area of Attack.</p></div>
      </div>
      <h3>How to Use an Attack Skill</h3>
      <ol class="steps"><li>Choose an Attack Skill from Hand.</li><li>Choose a Hero that meets the card's Class, Rank, and other requirements.</li><li>Choose a legal target if required.</li><li>Confirm, pay Mana, and Exhaust the Hero if required.</li><li>The opponent receives a Response opportunity.</li><li>Resolve the card's damage and effects.</li></ol>
      <h3>Reposition</h3>
      <p>Reposition swaps two adjacent positions. Left is adjacent to Center; Right is adjacent to Center.</p>
      <div class="table-wrap"><table><thead><tr><th>Swap</th><th>Result</th></tr></thead><tbody><tr><td>Hero ↔ Hero</td><td>Both become Exhausted.</td></tr><tr><td>Hero ↔ Legacy</td><td>Only the Hero becomes Exhausted.</td></tr><tr><td>Legacy ↔ Legacy</td><td>Not legal.</td></tr></tbody></table></div>
      <p>HP, EXP, Status, Attachment, Casting, and Exhaust move with the Hero. Reposition from a card effect does not automatically Exhaust unless stated.</p>
      <ul><li>All non-Area Attacks must choose a target, unless the card determines its own target or states that it does not use a target.</li><li>The number of targets follows the card text.</li><li>An Attack that selects multiple positions follows the card choices; each affected Hero receives a separate Response opportunity.</li><li>Legacy is not a Hero target unless a card specifically targets a position and allows Legacy.</li></ul>
      <div class="callout info"><strong>Position impact:</strong> Hero position limits Attack targets during the Battle Phase. Card use outside the Battle Phase is not position-restricted unless a card states otherwise.</div>`,

    'chapter-4': `
      <div class="eyebrow">POSITIONING SYSTEM · PAGE 6</div>
      <h2>4. Positioning System</h2>
      <p>Heroes fight as part of a battlefield formation. Your position determines which opposing Heroes you can attack.</p>
      <figure class="source-figure"><img src="assets/positioning-system-v2.png" alt="Grandis Legacy Positioning System"><figcaption>Positioning System — visual reference.</figcaption></figure>`,

    'chapter-5': `
      <div class="eyebrow">LEGACY DECK - HERO · PAGE 7</div>
      <h2>5. Reading a Hero Card and Exhaust</h2>
      <figure class="source-figure anatomy"><img src="assets/hero-detail.png" alt="Grandis Legacy Hero Card detail"><figcaption>Hero Card detail — visual reference.</figcaption></figure>
      <div class="anatomy-grid">
        <div><b>Hero Name</b><span>Hero identity.</span></div><div><b>Total HP</b><span>HP limit before the Hero is defeated.</span></div>
        <div><b>Class Detail</b><span>Shows the Hero's Race, Class, and Rank.</span></div><div><b>Hero Quote</b><span>Character quote.</span></div>
        <div><b>EXP</b><span>EXP requirement for the Hero's Rank.</span></div><div><b>Racial Trait</b><span>Ability based on Race.</span></div>
        <div><b>Class Ability</b><span>Hero-specific ability.</span></div><div><b>Rank Up Bonus</b><span>Bonus gained when reaching a Rank.</span></div>
        <div><b>Card Codex</b><span>Card identification code.</span></div>
      </div>
      <p><strong>Use the Hero's Class and Rank to determine which Skills can be played.</strong></p>
      <h3>Exhaust and Racial Token</h3>
      <div class="two-col"><div class="rule-card"><h3>Ready</h3><p>A Hero can perform legal active actions.</p><p><strong>Exhausted:</strong> the Hero cannot perform normal active Skill or Ability actions.</p></div><div class="rule-card"><h3>Return to Ready</h3><p>A Hero normally becomes Ready during its owner's Draw Phase. A Hero that is still Casting remains Exhausted.</p><p><strong>Racial Token:</strong> maximum pool 2. A player may use at most 1 Racial Token during one active turn.</p></div></div>
      <div class="callout">A legal <strong>Racial Trait</strong> can still be used while the Hero is Exhausted, unless the card states otherwise.</div>`,

    'chapter-6': `
      <div class="eyebrow">HERO PROGRESSION · PAGE 8</div>
      <h2>6. Tribute and Rank Up</h2>
      <h3>Tribute</h3>
      <p>Tribute converts 1 Skill Card from Hand into EXP for a chosen Hero.</p>
      <div class="table-wrap"><table><thead><tr><th>Tribute rule</th><th>Explanation</th></tr></thead><tbody><tr><td>Timing</td><td>Reform Phase.</td></tr><tr><td>Limit</td><td>Maximum 1 normal Tribute each Reform Phase.</td></tr><tr><td>Mana</td><td>The Skill's Mana Cost is not paid.</td></tr><tr><td>EXP value</td><td>Normal Skill = 100 EXP. Ultimate = 200 EXP.</td></tr><tr><td>Ultimate</td><td>Can only be given to the Hero owner stated on the card.</td></tr></tbody></table></div>
      <figure class="source-figure infographic"><img src="assets/rank-up-detail.png" alt="Grandis Legacy Rank Up detail"><figcaption>Rank Up detail — visual reference.</figcaption></figure>
      <h3>Rank Up</h3>
      <p>When a Hero's total EXP reaches the requirement for the next Rank, replace that Hero Card with the corresponding Rank card.</p>
      <div class="table-wrap"><table><thead><tr><th>EXP</th><th>New Rank</th><th>Rank Up Bonus</th></tr></thead><tbody><tr><td>300</td><td>Rank II</td><td>Draw 2 cards and Mana Regen +1.</td></tr><tr><td>700</td><td>Rank III</td><td>Draw 3 cards and Mana Regen +1.</td></tr></tbody></table></div>
      <p>When Ranking Up, move all EXP Cards beneath the Hero to the Discard Pile. Damage already taken still counts against the new Max HP. Status, Attachment, Casting, and Exhaust remain with the Hero. The Mana Pool does not increase immediately.</p>
      <div class="callout info">Reducing EXP does not make a Hero Rank down. A Rank III Hero cannot Rank Up again.</div>`,

    'chapter-7': `
      <div class="eyebrow">LEGACY DECK · PAGE 9</div>
      <h2>7. Legacy Cards, Defeat, and Revive</h2>
      <h3>What is a Legacy?</h3>
      <p>When a Hero is defeated, choose the corresponding legal Legacy Card to occupy that Hero's position. A Legacy is not a Hero. It has no HP, Class, Rank, EXP, Status, Exhaust, or Attachment Slot. A Legacy cannot be targeted as a Hero, but it can swap positions with a Hero.</p>
      <p>Legacy keeps Skill Cards related to the defeated Hero useful as a cost. Use the required Skill Card as the cost without paying Mana, then resolve the printed Legacy Ability.</p>
      <div class="callout"><strong>Legacy timing:</strong> a Legacy Ability can only be used during the Deploy Phase or Reform Phase. Each Legacy can use its Ability once per turn and does not become Exhausted.</div>
      <h3>Hero Defeated</h3>
      <ul><li>Attachments go to Discard.</li><li>Status is cleared.</li><li>EXP Cards move according to the defeat rules.</li><li>If all three Heroes are defeated, the player loses.</li></ul>
      <h3>Revive</h3>
      <ul><li>Legacy returns to the Legacy Deck.</li><li>The Hero returns to that position.</li><li>HP, EXP, Status, and Exhaust follow the revive card.</li></ul>`,

    'chapter-8': `
      <div class="eyebrow">MAIN DECK · PAGE 10</div>
      <h2>8. Main Deck and Reading a Skill Card</h2>
      <p>The Main Deck contains 60 cards made up of Skill, Item, and Event Cards. Players may choose any mix. A resolved card normally goes to Discard unless it becomes an Attachment or another effect moves it elsewhere.</p>
      <div class="visual-pair">
        <figure class="source-figure"><img src="assets/skill-card.png" alt="Grandis Legacy Skill Card detail"><figcaption>Skill Card detail — visual reference.</figcaption></figure>
        <figure class="source-figure"><img src="assets/ultimate-skill-card.png" alt="Grandis Legacy Ultimate Skill Card detail"><figcaption>Ultimate Skill Card detail — visual reference.</figcaption></figure>
      </div>
      <h3>Lineage and Effect Fallback</h3>
      <p><strong>Lineage</strong> is the Hero Class progression path from Rank I to Rank II and Rank III. A Hero can use Skills from earlier Classes in the same Lineage.</p>
      <p>Use the effect row matching the Hero's Class and Rank. If there is no exact row, use the highest earlier effect row in that Lineage.</p>
      <div class="callout info"><strong>Example:</strong> Conqueror Rank III can still use Deflect from the Warrior → Gladiator → Conqueror Lineage. If Deflect has Warrior Rank I and Gladiator Rank II rows, use the Gladiator Rank II effect.</div>
      <p>Before playing a Skill, check Mana Cost, Skill type, timing, Class, Rank, Lineage, target, and effect text.</p>`,

    'chapter-9': `
      <div class="eyebrow">CARD SYMBOLS · PAGE 11</div>
      <h2>9. Skill Symbols, Skill Types, Items, and Events</h2>
      <div class="rule-grid skill-symbol-grid">
        <div class="rule-card"><img class="skill-symbol-badge" src="assets/badges/physical-attack.png" alt="Physical Attack"><p>Must choose a target inside Area of Attack and deals Physical damage.</p></div>
        <div class="rule-card"><img class="skill-symbol-badge" src="assets/badges/magical-attack.png" alt="Magical Attack"><p>Must choose a target inside Area of Attack and deals Magical damage.</p></div>
        <div class="rule-card"><img class="skill-symbol-badge" src="assets/badges/area-attack.png" alt="Area Attack"><p>Affects all opposing Heroes inside Area of Attack without choosing targets one by one.</p></div>
        <div class="rule-card"><img class="skill-symbol-badge" src="assets/badges/range-attack.png" alt="Range Attack"><p>Must choose a target, but is not restricted by normal Area of Attack based on Hero position.</p></div>
        <div class="rule-card"><img class="skill-symbol-badge" src="assets/badges/casting-attack.png" alt="Casting Attack"><p>Choose the target position when played. That position stays locked until Casting resolves during the Battle Phase.</p></div>
        <div class="rule-card"><img class="skill-symbol-badge" src="assets/badges/defend-skill.png" alt="Defend Skill"><p>Used during Response for Block, Dodge, Negate, redirect, or other protection.</p></div>
        <div class="rule-card"><img class="skill-symbol-badge" src="assets/badges/support-skill.png" alt="Support Skill"><p>Healing, recovery, or other help for a Hero. Timing follows the card.</p></div>
        <div class="rule-card"><img class="skill-symbol-badge" src="assets/badges/tactical-skill.png" alt="Tactical Skill"><p>Setup, Reposition, buff, draw, or disruption. Timing follows the card.</p></div>
      </div>
      <div class="callout">The number of targets follows the card text.</div>
      <h3>General Skill Timing</h3>
      <div class="table-wrap"><table><thead><tr><th>Type</th><th>General timing</th><th>Function</th></tr></thead><tbody><tr><td>Attack</td><td>Battle Phase</td><td>Attack an opposing Hero.</td></tr><tr><td>Defense</td><td>During Response</td><td>Protect a Hero or stop an Attack.</td></tr><tr><td>Tactical</td><td>Deploy Phase or as stated</td><td>Prepare strategy and change the game state.</td></tr><tr><td>Support</td><td>Deploy or Reform as stated</td><td>Healing, recovery, or other support.</td></tr></tbody></table></div>
      <div class="two-col"><div class="rule-card"><h3>Item Card</h3><p>Provides healing, buffs, modifiers, or special functions. It may resolve immediately or become an Attachment if its effect stays active.</p></div><div class="rule-card"><h3>Event Card</h3><p>Represents an event that affects the game. It does not always require a Hero as the user.</p></div></div>`,

    'chapter-10': `
      <div class="eyebrow">CARD RESOLUTION · PAGE 12</div>
      <h2>10. Response, Attachment, and Casting</h2>
      <h3>Response</h3>
      <p>After an action is played and its costs are paid, the opponent receives a Response opportunity. If a Response is answered again, resolve effects from the most recently played card back toward the original action.</p>
      <div class="table-wrap"><table><thead><tr><th>Defense result</th><th>Meaning</th></tr></thead><tbody><tr><td>Block</td><td>Reduces damage, including to 0.</td></tr><tr><td>Dodge</td><td>The Hero avoids the Attack.</td></tr><tr><td>Redirect</td><td>Changes the Attack target according to the card text.</td></tr><tr><td>Negate / Cancel</td><td>Stops a card or effect according to the card text.</td></tr></tbody></table></div>
      <div class="callout info"><strong>Area and multi-target:</strong> each affected Hero receives its own Response opportunity.</div>
      <h3>Attachment</h3>
      <ul><li>Each Hero has 2 Attachment Slots.</li><li>A card becomes an Attachment if its effect remains active after the card is played and must be tracked for later timing.</li><li>An effect that resolves immediately is not placed in an Attachment Slot.</li><li>A slot must be available before playing a card that requires an Attachment.</li><li>Attachment follows the Hero during Reposition.</li><li>Use the same counter to track remaining turns or uses.</li><li>When the effect ends, is used, or the Hero is defeated, the card goes to Discard.</li></ul>
      <h3>Casting</h3>
      <div class="callout warning"><strong>Casting locks the target position, not the Hero.</strong> Choose the opposing position when Casting is played. When released, Casting hits the Hero currently occupying that position.</div>
      <ul><li>If the target position contains a Legacy Card when Casting is released, the Attack finishes without dealing damage.</li><li>All Casting is released and resolved only during the Battle Phase.</li><li>Casting uses an Attachment Slot and makes the user Hero Exhausted.</li><li>If the user Hero changes position or is Stunned before Casting is released, Casting is canceled.</li><li>Normal Casting reduces its counter at the start of the next Battle Phase.</li><li>When the counter reaches 0 during the Battle Phase, the Attack is released and the opponent receives a Response.</li><li>After Casting resolves, the user Hero remains Exhausted until the next Draw Phase.</li></ul>`,

    'chapter-11': `
      <div class="eyebrow">SUPPORT REFERENCE · PAGE 13</div>
      <h2>11. Status and Healing</h2>
      <p>Status stays attached to a Hero and moves with that Hero during Reposition. Legacy cannot receive Hero Status.</p>
      <div class="table-wrap"><table><thead><tr><th>Status</th><th>Effect</th></tr></thead><tbody>
        <tr><td>Bleed</td><td>The Hero cannot receive healing while Bleed is active. Bleed does not deal extra damage.</td></tr>
        <tr><td>Burn</td><td>If a Hero with Burn receives damage from an Attack, that Attack deals 10 additional damage.</td></tr>
        <tr><td>Freeze</td><td>The Hero cannot change position through normal Reposition or Skill effects and cannot use Dodge.</td></tr>
        <tr><td>Poison</td><td>Deals 10 damage during the Hero owner's End Phase for each turn of duration.</td></tr>
        <tr><td>Stun</td><td>The Hero cannot be chosen as the user or source of a Skill, Item, Event, Ability, or active effect while Stun is active.</td></tr>
      </tbody></table></div>
      <div class="callout"><strong>Status duration:</strong> duration decreases during the Hero owner's End Phase and ends when it reaches 0. Poison deals damage before its duration decreases.</div>
      <h3>Healing</h3>
      <ul><li>Healing cannot exceed Max HP.</li><li>Single-target healing requires an injured Hero without Bleed.</li><li>For multi-target healing, Heroes at full HP, defeated Heroes, and Heroes with Bleed are skipped.</li><li>Healing Done and Healing Received modifiers apply when present.</li></ul>
      <div class="callout info"><strong>Taunt</strong> is an Attachment effect that limits Attack choices; it is not one of the Status effects above.</div>`,

    'chapter-12': `
      <div class="eyebrow">QUICK REFERENCE · PAGE 14</div>
      <h2>12. Quick Reference</h2>
      <div class="table-wrap"><table><thead><tr><th>Topic</th><th>Short rule</th></tr></thead><tbody>
        <tr><td>Win</td><td>Defeat all 3 opposing Heroes.</td></tr><tr><td>Deck-out</td><td>Lose only when a mandatory Draw Phase draw fails.</td></tr><tr><td>Turn</td><td>Draw → Deploy → Battle → Reform → End.</td></tr><tr><td>Area of Attack</td><td>Left: Left/Center; Center: all; Right: Center/Right.</td></tr><tr><td>Range</td><td>Must choose a target but ignores normal Area of Attack restriction.</td></tr><tr><td>Position</td><td>Limits Attack targets during the Battle Phase; cards outside the Battle Phase are not position-restricted unless stated.</td></tr><tr><td>Reposition</td><td>Hero moves with HP, EXP, Status, Attachment, Casting, and Exhaust.</td></tr><tr><td>Tribute</td><td>1 Skill becomes EXP during the Reform Phase.</td></tr><tr><td>Rank Up</td><td>300 EXP to Rank II; 700 EXP to Rank III; all EXP Cards go to Discard when Ranking Up.</td></tr><tr><td>Attachment</td><td>2 slots per Hero; used when an effect remains active after a card is played.</td></tr><tr><td>Legacy</td><td>Uses a specified Skill as a cost to resolve a Legacy Ability during Deploy or Reform.</td></tr><tr><td>Racial Token</td><td>Maximum 2; use at most 1 during one active turn.</td></tr>
      </tbody></table></div>
      <h3>Three Main Flows</h3>
      <div class="flow-list"><div><b>Attack</b><span>Choose card → choose Hero → choose target → pay Mana → Response → resolve.</span></div><div><b>Rank Up</b><span>Tribute → gain EXP → reach 300/700 → move EXP to Discard → replace Hero → gain bonus.</span></div><div><b>Defeat</b><span>HP 0 → check defeat-prevention effects → Hero defeated → choose Legacy.</span></div></div>
      <h3>Hand and Search</h3>
      <ul><li>Hand is private.</li><li>After searching or viewing the Main Deck, shuffle unless a card states otherwise.</li><li>A draw effect draws as many cards as are available, including 0, without immediately losing.</li></ul>
      <div class="end-mark">END OF PLAYER RULEBOOK</div>`
  };

  const ui = {
    en: {
      brandTitle:'Player Rulebook', searchTrigger:'Search rulebook...', sidebarHome:'Rulebook Season 1',
      navGroups:['GETTING STARTED','HERO & LEGACY','CARDS & RESOLUTION','REFERENCE'],
      navLinks:{'chapter-1':'Understanding Grandis Legacy','chapter-2':'Setup, Turn, Mana','chapter-3':'Heroes & Combat','chapter-4':'Positioning System','chapter-5':'Hero Card & Exhaust','chapter-6':'Tribute & Rank Up','chapter-7':'Legacy, Defeat, Revive','chapter-8':'Main Deck & Skill Card','chapter-9':'Skill Symbols & Types','chapter-10':'Response, Attachment, Casting','chapter-11':'Status & Healing','chapter-12':'Quick Reference'},
      homeLink:'← Grandis Legacy Home', searchPlaceholder:'Search rules, e.g. Casting, Poison, Rank Up...', searchEmpty:'Type to search the entire Player Rulebook.', searchNone:'No matching result found in Player Rulebook v2.',
      arvonLaunch:'Ask rules & interactions', arvonPanel:'Game Guide · Rulebook v2', arvonInput:'Ask Arvon...', arvonWelcome:'I am Arvon. Ask me about Grandis Legacy rules. I will cite the relevant chapter and page when the local Rulebook supports the answer.',
      arvonNote:'Rulebook source is available locally. Advanced card-interaction rulings use the Arvon backend when connected.', arvonSearching:'Searching the Rulebook…', arvonMissing:'I could not find a clear answer in Player Rulebook v2. Try the exact term printed on the card, such as “Casting”, “Rank Up”, “Freeze”, or “Attachment”.', sourceWord:'Open Chapter', pdf:'assets/Grandis_Legacy_Player_Rulebook_v2_EN.pdf'
    },
    id: {
      brandTitle:'Panduan Pemain', searchTrigger:'Cari panduan...', sidebarHome:'Panduan Pemain Season 1',
      navGroups:['MULAI','HERO & LEGACY','KARTU & PENYELESAIAN','REFERENSI'],
      navLinks:{'chapter-1':'Mengenal Grandis Legacy','chapter-2':'Persiapan, Turn, Mana','chapter-3':'Hero & Pertarungan','chapter-4':'Positioning System','chapter-5':'Hero Card & Exhaust','chapter-6':'Tribute & Rank Up','chapter-7':'Legacy, Defeat, Revive','chapter-8':'Main Deck & Skill Card','chapter-9':'Simbol & Jenis Skill','chapter-10':'Response, Attachment, Casting','chapter-11':'Status & Healing','chapter-12':'Ringkasan Cepat'},
      homeLink:'← Beranda Grandis Legacy', searchPlaceholder:'Cari aturan, mis. Casting, Poison, Rank Up...', searchEmpty:'Ketik untuk mencari di seluruh Panduan Pemain.', searchNone:'Tidak ada hasil yang cocok di Panduan Pemain v2.',
      arvonLaunch:'Tanya aturan & interaksi', arvonPanel:'Panduan Game · Rulebook v2', arvonInput:'Tanya Arvon...', arvonWelcome:'Saya Arvon. Tanyakan aturan Grandis Legacy. Jika jawabannya didukung Rulebook lokal, saya akan menunjuk chapter dan page sumbernya.',
      arvonNote:'Sumber Rulebook tersedia lokal. Ruling interaksi kartu lanjutan memakai backend Arvon jika sudah terhubung.', arvonSearching:'Mencari di Rulebook…', arvonMissing:'Saya belum menemukan jawaban yang cukup jelas di Panduan Pemain v2. Coba gunakan istilah yang tertulis pada kartu, misalnya “Casting”, “Rank Up”, “Freeze”, atau “Attachment”.', sourceWord:'Buka Chapter', pdf:'assets/Grandis_Legacy_Panduan_Pemain_v2_ID.pdf'
    }
  };

  const sectionEls = $$('.doc-section');
  const idSections = Object.fromEntries(sectionEls.map(el => [el.id, el.innerHTML]));
  let currentLang = 'en';
  let sections = [];
  let chunks = [];
  let observer = null;

  const normalize = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();
  const stop = new Set('apa apakah itu yang dan di ke dari pada untuk dengan kalau jika gimana bagaimana bisa boleh adalah dalam saat saya gw gue lu hero kartu card the a an of is are can do does how what when where why'.split(' '));
  const synonyms = {
    mati:['defeated','defeat','legacy'], kalah:['defeat','deck out','win'], menang:['defeat','3 hero','win'], win:['defeat','3 hero'],
    cast:['casting'], casting:['position','attachment','counter','posisi'], beku:['freeze'], racun:['poison'], terbakar:['burn'], dodge:['freeze','response'], block:['response','damage'], negate:['response','cancel'],
    mana:['mana shard','mana pool','mana regen'], exp:['tribute','rank up'], rank:['rank up','exp','tribute'], tribute:['reform','exp'], revive:['legacy','defeat'],
    pindah:['reposition'], posisi:['positioning','reposition','area of attack'], serang:['attack','battle'], attack:['battle','response','area of attack'], deck:['main deck','deck out','60'], hand:['opening hand','hand limit'], token:['racial token'], attachment:['2 attachment slot']
  };
  const tokensFor = (q) => {
    const arr = normalize(q).split(/\s+/).filter(t => t.length > 1 && !stop.has(t));
    const expanded = [...arr];
    arr.forEach(t => (synonyms[t] || []).forEach(x => expanded.push(...normalize(x).split(' '))));
    return [...new Set(expanded)];
  };
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

  function rebuildIndex(){
    sections = sectionEls.map(el => ({el,id:el.id,title:$('h1,h2',el)?.textContent.trim() || 'Rulebook',page:el.dataset.page || '',tags:el.dataset.tags || '',text:el.textContent.replace(/\s+/g,' ').trim()}));
    chunks = [];
    sections.forEach(sec => {
      $$('p,li,tr,.callout,.rule-card,.flow-list>div', sec.el).forEach(el => {
        const text = el.textContent.replace(/\s+/g,' ').trim();
        if (text.length >= 28 && text.length <= 900) chunks.push({section:sec,text});
      });
    });
    observer?.disconnect();
    observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      $$('.nav-group a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
    }, {rootMargin:'-18% 0px -68% 0px',threshold:[0,.1,.4]});
    sections.slice(1).forEach(s => observer.observe(s.el));
  }

  function setLanguage(lang){
    currentLang = lang === 'id' ? 'id' : 'en';
    document.documentElement.lang = currentLang;
    sectionEls.forEach(el => { el.innerHTML = currentLang === 'en' ? enSections[el.id] : idSections[el.id]; });
    const t = ui[currentLang];
    $('[data-ui="brand-title"]') && ($('[data-ui="brand-title"]').textContent=t.brandTitle);
    $('[data-ui="search-trigger-text"]') && ($('[data-ui="search-trigger-text"]').textContent=t.searchTrigger);
    $('[data-ui="sidebar-home"]') && ($('[data-ui="sidebar-home"]').textContent=t.sidebarHome);
    $$('[data-nav-group]').forEach((el,i)=>{el.textContent=t.navGroups[i] || el.textContent});
    $$('[data-nav-link]').forEach(a=>{const span=a.querySelector('span');const n=t.navLinks[a.dataset.navLink];if(n){a.childNodes.forEach(node=>{if(node.nodeType===3)node.remove()});a.append(document.createTextNode(n));if(span)a.prepend(span)}});
    $('[data-ui="home-link"]') && ($('[data-ui="home-link"]').textContent=t.homeLink);
    $('[data-ui="search-input"]') && ($('[data-ui="search-input"]').placeholder=t.searchPlaceholder);
    $('[data-ui="search-empty"]') && ($('[data-ui="search-empty"]').textContent=t.searchEmpty);
    $('[data-ui="arvon-launch-sub"]') && ($('[data-ui="arvon-launch-sub"]').textContent=t.arvonLaunch);
    $('[data-ui="arvon-panel-sub"]') && ($('[data-ui="arvon-panel-sub"]').textContent=t.arvonPanel);
    $('[data-ui="arvon-input"]') && ($('[data-ui="arvon-input"]').placeholder=t.arvonInput);
    $('[data-ui="arvon-note"]') && ($('[data-ui="arvon-note"]').textContent=t.arvonNote);
    $('[data-ui="arvon-welcome"]') && ($('[data-ui="arvon-welcome"]').textContent=t.arvonWelcome);
    $$('[data-pdf-button]').forEach(a=>a.href=t.pdf);
    $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===currentLang)));
    try{localStorage.setItem('grandis-rulebook-lang',currentLang)}catch{}
    rebuildIndex();
    const q=$('#search-input')?.value || '';
    if (!$('#search-modal')?.hidden) renderSearch(q);
  }

  $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));

  const sidebar = $('#docs-sidebar');
  const toggle = $('.sidebar-toggle');
  toggle?.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  sidebar?.addEventListener('click', e => { if (e.target.closest('a') && innerWidth <= 820) { sidebar.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); } });

  const modal = $('#search-modal'), searchInput = $('#search-input'), results = $('#search-results');
  const openSearch = () => { modal.hidden = false; setTimeout(() => searchInput.focus(),20); renderSearch(searchInput.value); };
  const closeSearch = () => { modal.hidden = true; };
  $('.search-trigger')?.addEventListener('click', openSearch);
  $('.search-backdrop')?.addEventListener('click', closeSearch);
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') { closeSearch(); if (!$('#arvon-panel').hidden) closeArvon(); }
  });
  function renderSearch(q){
    results.innerHTML = '';
    const t=ui[currentLang];
    if (!q.trim()) { results.innerHTML = `<p class="empty-state">${escapeHTML(t.searchEmpty)}</p>`; return; }
    const ranked = sections.map(s => ({...s,score:scoreText(s.text,s.tags,q)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,8);
    if (!ranked.length) { results.innerHTML = `<p class="empty-state">${escapeHTML(t.searchNone)}</p>`; return; }
    ranked.forEach(r => {
      const a=document.createElement('a'); a.className='search-result'; a.href=`#${r.id}`;
      const n=normalize(r.text), tq=tokensFor(q).find(tk=>n.includes(tk)); let preview=r.text.slice(0,150);
      if (tq) { const i=n.indexOf(tq); preview=r.text.slice(Math.max(0,i-55), Math.min(r.text.length,i+125)); }
      a.innerHTML=`<b>${escapeHTML(r.title)}</b><span>Page ${escapeHTML(r.page)} · ${escapeHTML(preview)}${preview.length<r.text.length?'…':''}</span>`;
      a.addEventListener('click',closeSearch); results.appendChild(a);
    });
  }
  searchInput?.addEventListener('input', e => renderSearch(e.target.value));

  const launcher=$('#arvon-launcher'), panel=$('#arvon-panel'), closeBtn=$('#arvon-close'), form=$('#arvon-form'), input=$('#arvon-input'), messages=$('#arvon-messages');
  const openArvon=()=>{panel.hidden=false;launcher.hidden=true;launcher.setAttribute('aria-expanded','true');setTimeout(()=>input.focus(),20)};
  const closeArvon=()=>{panel.hidden=true;launcher.hidden=false;launcher.setAttribute('aria-expanded','false')};
  launcher?.addEventListener('click',openArvon); closeBtn?.addEventListener('click',closeArvon);
  const addMessage=(who,html)=>{const row=document.createElement('div');row.className=`chat-row ${who}`;const b=document.createElement('div');b.className='bubble';b.innerHTML=html;row.appendChild(b);messages.appendChild(row);messages.scrollTop=messages.scrollHeight;return row};
  const localAnswer=(q)=>{
    const t=ui[currentLang];
    const ranked=chunks.map(c=>({...c,score:scoreText(c.text,c.section.tags,q)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
    if (!ranked.length || ranked[0].score < 4) return {text:t.arvonMissing};
    const top=ranked[0], second=ranked.find(x=>x.section.id!==top.section.id && x.score>=top.score*.72);
    let text=`<strong>${escapeHTML(top.section.title)}</strong>: ${escapeHTML(top.text)}`;
    if (second) text+=`<br><br>${escapeHTML(second.text)}`;
    text+=`<a class="source-link" href="#${top.section.id}">${escapeHTML(t.sourceWord)} · Page ${escapeHTML(top.section.page)} →</a>`;
    return {html:text};
  };
  const askRemote=async(q)=>{
    const endpoint=window.GRANDIS_ARVON_ENDPOINT;
    if (!endpoint) return null;
    try{
      const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,language:currentLang,source:'Grandis Legacy Rulebook v2',requestedSources:['rulebook','season1_cards','authority']})});
      if(!r.ok) return null; const d=await r.json(); if(!d?.answer) return null; return {text:d.answer,source:d.source||''};
    }catch{return null;}
  };
  form?.addEventListener('submit',async e=>{
    e.preventDefault(); const q=input.value.trim(); if(!q)return; input.value=''; addMessage('user',escapeHTML(q));
    const wait=addMessage('bot',escapeHTML(ui[currentLang].arvonSearching));
    const remote=await askRemote(q); wait.remove();
    if(remote){addMessage('bot',`${escapeHTML(remote.text)}${remote.source?`<span class="source-link">${escapeHTML(remote.source)}</span>`:''}`);return;}
    const ans=localAnswer(q); addMessage('bot',ans.html||escapeHTML(ans.text));
  });

  let initial='en';
  try{const saved=localStorage.getItem('grandis-rulebook-lang');if(saved==='id'||saved==='en')initial=saved}catch{}
  setLanguage(initial);
})();
