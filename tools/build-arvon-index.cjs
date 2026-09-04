'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cardsPath = path.join(root, 'authority/season1/cards.runtime.v0.14.2.json');
const componentsPath = path.join(root, 'authority/season1/hero-components.runtime.v1.0.0.json');
const cardsOut = path.join(root, 'rulebook/js/card-index.js');
const componentsOut = path.join(root, 'rulebook/js/hero-components.js');
const lockOut = path.join(root, 'sync/website-source-lock.v1.27.json');

const CARD_HASH = '5d362f3c1dd785af82f12297d6ab1ecea4f6c43508a7b0f48319e846dd61139c';
const HERO_HASH = '487aa2620b5be99480a81d462082f1a35ee637ec2cc38ebf42b1bcf1103d06c9';
const REVISED_IDS = [
  'S1-ARC-011','S1-ARC-012','S1-ARC-014','S1-CLE-003','S1-CLE-011','S1-CLE-015','S1-CLE-022',
  'S1-CLE-H004','S1-CLE-H005','S1-CLE-H006','S1-ITM-005','S1-ITM-007','S1-ITM-012','S1-MAG-004',
  'S1-MAG-005','S1-MAG-012','S1-THF-011','S1-THF-015','S1-THF-021','S1-THF-022','S1-THF-H001',
  'S1-THF-H002','S1-THF-H003','S1-WAR-003','S1-WAR-011','S1-WAR-012','S1-WAR-022','S1-WAR-H004',
  'S1-WAR-H005','S1-WAR-H006'
];

const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const fileDigest = file => digest(fs.readFileSync(file));
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const data = readJSON(cardsPath);
const components = readJSON(componentsPath);
assert(data.canonical_registry_hash === CARD_HASH, 'Unexpected canonical card registry hash.');
assert(data.hero_component_registry_hash === HERO_HASH, 'Unexpected Hero Component hash in card runtime.');
assert(components.registry_hash === HERO_HASH, 'Unexpected Hero Component registry hash.');
assert(data.cards.length === 198, 'Season 1 card count must be 198.');
assert(new Set(data.cards.map(card => card.card_id)).size === 198, 'Season 1 card IDs must be unique.');
assert(components.racial_traits.length === 6, 'Expected 6 Racial Trait entities.');
assert(components.class_abilities.length === 16, 'Expected 16 Class Ability entities.');
assert(components.hero_profiles.length === 10, 'Expected 10 Hero profiles.');
assert(components.hero_compositions.length === 30, 'Expected 30 Hero compositions.');
assert(REVISED_IDS.length === 30, 'Expected exactly 30 revised card IDs.');

const byId = new Map(data.cards.map(card => [card.card_id, card]));
const racialById = new Map(components.racial_traits.map(row => [row.racial_trait_id, row]));
const abilityById = new Map(components.class_abilities.map(row => [row.class_ability_id, row]));
assert(byId.get('S1-THF-010')?.name === 'Back Slash', 'S1-THF-010 must be Back Slash.');
assert(!data.cards.some(card => card.name === 'Back Stab'), 'Retired Back Stab title remains.');
const resurrection = byId.get('S1-CLE-015');
const resurrectionText = JSON.stringify(resurrection);
assert(resurrection?.canonical_cost?.mana === 3, 'Resurrection must cost 3 Mana.');
assert(resurrection?.effect?.find(effect => effect.kind === 'revive')?.set_hp === 50, 'Resurrection must revive at 50 HP.');
assert(!resurrectionText.includes('40 HP') && !resurrectionText.includes('Set HP to 40'), 'Resurrection retains stale 40 HP metadata.');
for (const id of REVISED_IDS) assert(byId.has(id), `Missing revised card ${id}.`);
for (const composition of components.hero_compositions) {
  const card = byId.get(composition.card_id);
  const racial = racialById.get(composition.racial_trait_ref);
  assert(card && racial, `Broken Hero composition ${composition.card_id}.`);
  assert(same(card.racial_ability, racial.definition), `Racial cache divergence for ${composition.card_id}.`);
  if (composition.class_ability_ref) {
    const ability = abilityById.get(composition.class_ability_ref);
    assert(ability, `Missing Class Ability ${composition.class_ability_ref}.`);
    assert(same(card.class_ability, ability.definition), `Class Ability cache divergence for ${composition.card_id}.`);
  }
}

const cardIndex = data.cards.map(card => ({
  card_id: card.card_id,
  canonical_hash: card.canonical_hash,
  name: card.name,
  family: card.family,
  card_type: card.card_type,
  classification: card.classification,
  action_category: card.action_category,
  display_class: card.display_class || '',
  class_group: card.class_group || '',
  rank_numeric: card.rank_numeric == null ? null : card.rank_numeric,
  cost_display: card.cost_display || '',
  card_text: card.card_text || '',
  is_ultimate: Boolean(card.is_ultimate),
  ultimate_owner: card.ultimate_owner || '',
  race: card.race || card.identity?.race || '',
  class_rank: card.class_rank || card.identity?.rank || '',
  identity: card.identity || null,
  hero_components: card.hero_components || null,
  racial_ability: card.racial_ability || null,
  class_ability: card.class_ability || null,
  timing: card.timing || null,
  source_requirement: card.source_requirement || null,
  canonical_cost: card.canonical_cost || null,
  attack: card.attack || null,
  active_effect: card.active_effect || null,
  double_casting_policy: card.double_casting_policy || null,
  targeting: card.targeting || null,
  runtime_semantics: card.runtime_semantics || null,
  interaction_flow: card.interaction_flow || null,
  revive_policy: card.revive_policy || null,
  effects: card.effects || card.effect || []
}));

const meta = {
  website_version: '1.25',
  source_stack: 'Grandis Legacy One Source Authority v1.7.3',
  cards_version: '0.14.2',
  hero_components_version: '1.0.0',
  canonical_registry_hash: CARD_HASH,
  hero_component_registry_hash: HERO_HASH,
  count: cardIndex.length,
  revised_card_ids: REVISED_IDS
};

fs.mkdirSync(path.dirname(cardsOut), { recursive: true });
fs.mkdirSync(path.dirname(lockOut), { recursive: true });
fs.writeFileSync(cardsOut, `window.GRANDIS_RULEBOOK_AUTHORITY=${JSON.stringify(meta)};\nwindow.GRANDIS_RULEBOOK_CARD_INDEX=${JSON.stringify(cardIndex)};\n`);
fs.writeFileSync(componentsOut, `window.GRANDIS_HERO_COMPONENT_AUTHORITY=${JSON.stringify(components)};\n`);

const lock = {
  schema_version: '1.0.0',
  website_version: '1.27',
  generated_at: '2026-09-05',
  source_stack: {
    one_source_authority: '1.7.3',
    season1_cards: '0.14.2',
    hero_components: '1.0.0',
    canonical_registry_hash: CARD_HASH,
    hero_component_registry_hash: HERO_HASH
  },
  embedded_pvp: {
    pvp_version: '3.38',
    build_id: 'gl-pvp-3.38-2026-09-05',
    source_stack: '1.7.4',
    runtime_data: '0.14.3',
    effect_recipe: '0.13.3',
    runtime_foundation: '1.90',
    runtime_core: '0.58',
    application_runtime_sync: '2.52'
  },
  contracts: {
    card_count: 198,
    revised_card_count: 30,
    renamed_card: { card_id: 'S1-THF-010', current_name: 'Back Slash', retired_name: 'Back Stab' },
    hero_component_counts: { racial_traits: 6, class_abilities: 16, hero_profiles: 10, hero_compositions: 30 }
  },
  files: {
    'authority/season1/cards.runtime.v0.14.2.json': fileDigest(cardsPath),
    'authority/season1/hero-components.runtime.v1.0.0.json': fileDigest(componentsPath),
    'rulebook/js/card-index.js': fileDigest(cardsOut),
    'rulebook/js/hero-components.js': fileDigest(componentsOut),
    'shared/season1/v1/manifest.json': fileDigest(path.join(root, 'shared/season1/v1/manifest.json')),
    'pvp/assets/audio/Coin Flip.mp3': fileDigest(path.join(root, 'pvp/assets/audio/Coin Flip.mp3')),
    'pvp/assets/audio/Card Sound.mp3': fileDigest(path.join(root, 'pvp/assets/audio/Card Sound.mp3')),
    'pvp/js/app.bundle.js': fileDigest(path.join(root, 'pvp/js/app.bundle.js')),
    'pvp/js/pvp-network.js': fileDigest(path.join(root, 'pvp/js/pvp-network.js')),
    'pvp/PVP_FRONTEND_BUILD.json': fileDigest(path.join(root, 'pvp/PVP_FRONTEND_BUILD.json')),
    'pvp/assets/battle/Heal.png': fileDigest(path.join(root, 'pvp/assets/battle/Heal.png')),
    'pvp/assets/audio/battle/Heal.mp3': fileDigest(path.join(root, 'pvp/assets/audio/battle/Heal.mp3'))
  },
  revised_card_ids: REVISED_IDS
};
fs.writeFileSync(lockOut, `${JSON.stringify(lock, null, 2)}\n`);
console.log('PASS: Arvon index built from cards v0.14.2 and Hero Component Authority v1.0.0.');
