'use strict';

const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const Arvon = require('../rulebook/js/arvon-core.js');

const root = path.resolve(__dirname, '..');
const CARD_HASH = 'b185307752fd523d6c1e4a450f8bdd82b96b4d4cbfbb884fca8a619e8c5c8057';
const HERO_HASH = '487aa2620b5be99480a81d462082f1a35ee637ec2cc38ebf42b1bcf1103d06c9';
const EN_PDF_HASH = '333a5991040cb67777b147f30a86bbfabc7c71c36c116e24068003f26838e0c7';
const ID_PDF_HASH = '45737c52ae3dabf489cc68e154390ac69a35d7956382e87da34dbadb4c8d0859';
const revisedIds = [
  'S1-ARC-011','S1-ARC-012','S1-ARC-014','S1-CLE-003','S1-CLE-011','S1-CLE-015','S1-CLE-022',
  'S1-CLE-H004','S1-CLE-H005','S1-CLE-H006','S1-ITM-005','S1-ITM-007','S1-ITM-012','S1-MAG-004',
  'S1-MAG-005','S1-MAG-012','S1-THF-011','S1-THF-015','S1-THF-021','S1-THF-022','S1-THF-H001',
  'S1-THF-H002','S1-THF-H003','S1-WAR-003','S1-WAR-011','S1-WAR-012','S1-WAR-022','S1-WAR-H004',
  'S1-WAR-H005','S1-WAR-H006'
];

const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const json = rel => JSON.parse(read(rel));
const digest = rel => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, rel))).digest('hex');
const plain = value => JSON.parse(JSON.stringify(value));
const webpDimensions = rel => {
  const data = fs.readFileSync(path.join(root, rel));
  assert.strictEqual(data.toString('ascii', 0, 4), 'RIFF', `${rel}: missing RIFF header.`);
  assert.strictEqual(data.toString('ascii', 8, 12), 'WEBP', `${rel}: missing WEBP signature.`);
  const chunk = data.toString('ascii', 12, 16);
  if (chunk === 'VP8X') {
    return {
      width: 1 + data.readUIntLE(24, 3),
      height: 1 + data.readUIntLE(27, 3)
    };
  }
  if (chunk === 'VP8 ') {
    assert.deepStrictEqual([...data.subarray(23, 26)], [0x9d, 0x01, 0x2a], `${rel}: invalid VP8 frame header.`);
    return {
      width: data.readUInt16LE(26) & 0x3fff,
      height: data.readUInt16LE(28) & 0x3fff
    };
  }
  if (chunk === 'VP8L') {
    assert.strictEqual(data[20], 0x2f, `${rel}: invalid VP8L signature.`);
    return {
      width: 1 + (((data[22] & 0x3f) << 8) | data[21]),
      height: 1 + (((data[24] & 0x0f) << 10) | (data[23] << 2) | ((data[22] & 0xc0) >> 6))
    };
  }
  throw new Error(`${rel}: unsupported WebP chunk ${chunk}.`);
};

const browser = { window: {} };
vm.runInNewContext(read('rulebook/js/card-index.js'), browser);
vm.runInNewContext(read('rulebook/js/hero-components.js'), browser);
const cards = plain(browser.window.GRANDIS_RULEBOOK_CARD_INDEX);
const meta = plain(browser.window.GRANDIS_RULEBOOK_AUTHORITY);
const components = plain(browser.window.GRANDIS_HERO_COMPONENT_AUTHORITY);
const source = json('authority/season1/cards.runtime.v0.13.1.json');
const sourceById = new Map(source.cards.map(card => [card.card_id, card]));
const indexById = new Map(cards.map(card => [card.card_id, card]));
const runtimeBrowser = {};
vm.runInNewContext(read('pvp/js/static-data.js'), runtimeBrowser);
const canonicalAssets = plain(runtimeBrowser.GL_ASSET_MANIFEST);
const sharedManifest = json('shared/season1/v1/manifest.json');

assert.strictEqual(require('../package.json').version, '1.12.0');
assert.strictEqual(meta.website_version, '1.9');
assert.strictEqual(meta.canonical_registry_hash, CARD_HASH);
assert.strictEqual(meta.hero_component_registry_hash, HERO_HASH);
assert.strictEqual(cards.length, 198);
assert.strictEqual(new Set(cards.map(card => card.card_id)).size, 198);
assert.strictEqual(indexById.get('S1-THF-010').name, 'Back Slash');
assert.ok(!cards.some(card => card.name === 'Back Stab'));
assert.deepStrictEqual(meta.revised_card_ids, revisedIds);
for (const id of revisedIds) {
  const current = sourceById.get(id);
  const indexed = indexById.get(id);
  assert.ok(current && indexed, `Missing revised card ${id}.`);
  assert.strictEqual(indexed.canonical_hash, current.canonical_hash, `${id} canonical hash mismatch.`);
  assert.strictEqual(indexed.card_text, current.card_text, `${id} effect text mismatch.`);
  assert.deepStrictEqual(indexed.effects, current.effects || current.effect || [], `${id} operation mismatch.`);
  assert.deepStrictEqual(indexed.canonical_cost, current.canonical_cost || null, `${id} cost mismatch.`);
}
assert.strictEqual(canonicalAssets.counts.cards, 198);
assert.strictEqual(canonicalAssets.counts.webp_card_thumbs, 198);
assert.strictEqual(Object.keys(canonicalAssets.cards).length, 198);
assert.strictEqual(Object.keys(sharedManifest.cards).length, 198);
assert.strictEqual(new Set(Object.values(sharedManifest.cards).map(entry => entry.file)).size, 198, 'Duplicate Website artwork mapping.');
for (const card of source.cards) {
  const id = card.card_id;
  const rel = `shared/season1/v1/cards/thumbs/${id}.webp`;
  const local = sharedManifest.cards[id];
  const canonical = canonicalAssets.cards[id];
  assert.ok(local && canonical, `${id}: missing artwork mapping.`);
  assert.ok(fs.existsSync(path.join(root, rel)), `${id}: artwork file missing.`);
  assert.strictEqual(local.file, `${id}.webp`, `${id}: wrong destination mapping.`);
  assert.strictEqual(local.sha256, digest(rel), `${id}: shared manifest hash mismatch.`);
  assert.strictEqual(local.bytes, fs.statSync(path.join(root, rel)).size, `${id}: shared manifest byte count mismatch.`);
  assert.strictEqual(digest(rel), canonical.sha256, `${id}: physical artwork differs from canonical archive hash.`);
  assert.deepStrictEqual(webpDimensions(rel), { width: 320, height: 448 }, `${id}: dimensions changed.`);
  assert.strictEqual(canonical.local_thumb_path, canonical.local_full_path, `${id}: unexpected independent full-size asset route.`);
}
for (const id of revisedIds) assert.strictEqual(sharedManifest.cards[id].sha256, canonicalAssets.cards[id].sha256, `${id}: revised artwork parity failed.`);
assert.strictEqual(sharedManifest.cards['S1-THF-010'].sha256, 'b543e7ede3403552407106bb85f87781cc3310f326cb87fa1137d9eb23f2fff0');
assert.ok(!fs.readdirSync(path.join(root, 'shared/season1/v1/cards/thumbs')).some(name => /Back[ -]Stab/i.test(name)), 'Retired Back Stab artwork file remains active.');
const resurrection = indexById.get('S1-CLE-015');
assert.strictEqual(resurrection.canonical_cost.mana, 3);
assert.strictEqual(resurrection.effects.find(effect => effect.kind === 'revive').set_hp, 50);
assert.strictEqual(resurrection.revive_policy.set_hp, 50);
assert.ok(!/40 HP|Set HP to 40/.test(JSON.stringify(resurrection)), 'Stale Resurrection metadata remains in Arvon index.');

assert.strictEqual(components.registry_hash, HERO_HASH);
assert.deepStrictEqual([
  components.racial_traits.length,
  components.class_abilities.length,
  components.hero_profiles.length,
  components.hero_compositions.length
], [6,16,10,30]);
const profiles = new Map(components.hero_profiles.map(row => [row.name, row]));
assert.strictEqual(new Set(['Elara Heavens','Vaelis Stormweave','Lucien Voss'].map(name => profiles.get(name).racial_trait_ref)).size, 1);
assert.deepStrictEqual(
  profiles.get('Vaelis Stormweave').rank_cards.slice(1).map(row => row.class_ability_ref),
  profiles.get('Aldric Ashford').rank_cards.slice(1).map(row => row.class_ability_ref)
);

const authority = { cards, components, registryHash: HERO_HASH };
const fixtures = [
  ['What is the cost of Back Slash?', 'en', 'S1-THF-010', ['Here is', '5 Mana', 'Back Slash']],
  ['Berapa biaya Back Slash?', 'id', 'S1-THF-010', ['Berikut', '5 Mana', 'Back Slash']],
  ['StonebloodのRacial Traitを説明して', 'ja', 'RACIAL-DWARF-STONEBLOOD', ['これは', '30 HP', 'Stoneblood']],
  ['¿Qué efecto tiene Fire Wall?', 'es', 'S1-MAG-012', ['Esta es', 'Block 70', 'Burn', '2 turns']],
  ['请解释 Dragon Scale 的 Racial Trait', 'zh-CN', 'RACIAL-DRAGONBORN-DRAGON-SCALE', ['这是', 'Block 50', 'Dragon Scale']]
];
for (const [query, language, key, fragments] of fixtures) {
  const answer = Arvon.answer(query, authority);
  assert.strictEqual(answer.language, language, `${query}: wrong language.`);
  assert.strictEqual(answer.authorityKey, key, `${query}: wrong authority.`);
  for (const fragment of fragments) assert.ok(answer.html.includes(fragment), `${query}: missing ${fragment}.`);
}
assert.strictEqual(Arvon.answer('Apa cost dan efek Back Slash?', authority).language, 'id');
assert.strictEqual(Arvon.answer('Back Slash qzxv', authority).language, 'en');
const englishFireWall = Arvon.answer('What is the effect of Fire Wall?', authority);
const spanishFireWall = Arvon.answer('¿Qué efecto tiene Fire Wall?', authority);
assert.strictEqual(englishFireWall.authorityKey, spanishFireWall.authorityKey, 'Translation changed rule authority.');
for (const term of Arvon.OFFICIAL_TERMS) assert.ok(Arvon.OFFICIAL_TERMS.includes(term));

const composition = Arvon.answer('Explain Vaelis Stormweave Hero composition', authority);
for (const fragment of ['Vaelis Stormweave','Elf','Ancestral Focus','Elementalist','Elemental Mastery','Elemental Lord','Elemental Sovereignty']) assert.ok(composition.html.includes(fragment), `Composition missing ${fragment}.`);
assert.strictEqual(composition.kind, 'composition');
const secondChance = Arvon.answer('Explain Halfling Second Chance', authority);
for (const fragment of ['Second Chance','dodge incoming Physical or Magical damage']) assert.ok(secondChance.html.includes(fragment), `Second Chance answer missing ${fragment}.`);
const resurrectionAnswer = Arvon.answer('What is the cost and effect of Resurrection?', authority);
for (const fragment of ['Resurrection','3 Mana','50 HP']) assert.ok(resurrectionAnswer.html.includes(fragment), `Resurrection answer missing ${fragment}.`);

assert.strictEqual(digest('rulebook/assets/Grandis_Legacy_Player_Rulebook_v2_EN.pdf'), EN_PDF_HASH);
assert.strictEqual(digest('rulebook/assets/Grandis_Legacy_Panduan_Pemain_v2_ID.pdf'), ID_PDF_HASH);

const home = read('index.html');
const homeJs = read('js/site.js');
const css = read('css/site.css');
const rulebook = read('rulebook/index.html');
assert.ok(home.includes('G-FVQCYF8PKQ'), 'GA4 was not preserved.');
for (const href of ['Grandis-Legacy-VS-AI/tutorial/','rulebook/','Grandis-Legacy-Deck-Builder/style-1/','Grandis-Legacy-VS-AI/','pvp/']) assert.ok(home.includes(`href="${href}"`), `Navigation missing ${href}.`);
assert.ok(home.includes('discord.gg/xg6zTeRCBP'), 'Discord link missing.');
assert.ok(home.includes('venom-binding.png'), 'Venom Binding carousel slide missing.');
assert.ok(homeJs.includes("touchstart") && homeJs.includes('normalizeLoopEdge'), 'Circular/mobile carousel behavior missing.');
assert.match(css, /\/\* v1\.7 desktop Hero top-whitespace refinement \*\/[\s\S]*@media\(min-width:821px\)[\s\S]*\.hero-section\{padding-top:clamp\(48px,3\.4vw,56px\)\}/);
assert.ok(css.includes('.hero-section{padding:44px 18px 56px}'), 'Mobile Hero layout changed unexpectedly.');
assert.ok(rulebook.includes('hero-components.js?v=1.0.0') && rulebook.includes('arvon-core.js?v=1.9.0') && rulebook.includes('card-index.js?v=0.13.1'));
assert.ok(read('pvp/index.html').includes('gl-pvp-3.12'), 'Embedded public PvP package is not v3.09.');
const embeddedNetwork = read('pvp/js/pvp-network.js');
for (const retired of ['racial_second_chance','resolveSecondChanceChoice','data-second-chance-choice']) assert.ok(!embeddedNetwork.includes(retired), `${retired} remains in embedded PvP routing.`);
for (const name of fs.readdirSync(path.join(root, 'pvp/starter_deck_examples')).filter(file => file.endsWith('.json'))) {
  const content = read(`pvp/starter_deck_examples/${name}`);
  assert.ok(!content.includes('Back Stab'), `${name}: retired card name remains in embedded PvP preset.`);
  assert.ok(!content.includes('Public Deck Builder v2.1'), `${name}: stale Deck Builder format metadata remains.`);
  assert.ok(content.includes('Public Deck Builder v1.16'), `${name}: current Deck Builder format metadata is missing.`);
  assert.ok(content.includes(CARD_HASH), `${name}: current registry hash is missing.`);
}

const embeddedBundle = read('pvp/js/app.bundle.js');
const audioHashes = {
  'Coin Flip.mp3': 'b4842f9a3f2d25004223313f5473bef74afd79915b6af9bdb35c70f6df8c2b50',
  'Card Sound.mp3': '1c04e41918b392a643c22d6c02ef34eeab0341c70d46b7d517078725b79d8ee4'
};
for (const [name, expected] of Object.entries(audioHashes)) {
  const rel = `pvp/assets/audio/${name}`;
  assert.ok(fs.existsSync(path.join(root, rel)), `${rel} missing.`);
  assert.strictEqual(digest(rel), expected, `${rel} content changed.`);
  assert.ok(embeddedBundle.includes(`assets/audio/${name}`), `${rel} executable reference missing.`);
  assert.ok(new URL(`assets/audio/${name}`, 'https://example.invalid/').pathname.includes('%20'), `${name}: unsafe URL handling.`);
}
for (const old of ['freesound_community-coin-flip-37787','freesound_community-flipcard-91468']) {
  assert.ok(!embeddedBundle.includes(old), `Stale embedded audio route remains: ${old}.`);
  assert.ok(!fs.readdirSync(path.join(root, 'pvp/assets/audio')).some(name => name.includes(old)), `Stale embedded audio file remains: ${old}.`);
}

const lock = json('sync/website-source-lock.v1.9.json');
assert.strictEqual(lock.website_version, '1.9');
assert.strictEqual(lock.source_stack.canonical_registry_hash, CARD_HASH);
assert.strictEqual(lock.source_stack.hero_component_registry_hash, HERO_HASH);
assert.deepStrictEqual(lock.contracts.hero_component_counts, { racial_traits:6, class_abilities:16, hero_profiles:10, hero_compositions:30 });
for (const [rel, expected] of Object.entries(lock.files)) assert.strictEqual(digest(rel), expected, `Lock mismatch for ${rel}.`);

for (const rel of ['js/site.js','rulebook/js/arvon-core.js','rulebook/js/rulebook.js','tools/build-arvon-index.cjs','tools/build-file-manifest.cjs']) {
  new Function(read(rel));
}
console.log('PASS Website v1.12: 198 canonical physical artworks, all 30 revised cards, Back Slash, renamed audio, multilingual Arvon, Rulebook v2, v1.7 homepage layout, PvP v3.12 embed, and source lock.');
