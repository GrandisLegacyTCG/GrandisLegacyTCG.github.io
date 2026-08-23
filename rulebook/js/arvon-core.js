(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.GrandisArvonCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const OFFICIAL_TERMS = Object.freeze([
    'Hero', 'Skill', 'Attack', 'Response', 'Attachment', 'Casting', 'Legacy',
    'Tribute', 'Rank Up', 'Class', 'Racial Trait', 'Class Ability'
  ]);
  const LOCAL_LANGUAGES = Object.freeze(['en', 'id', 'ja', 'es', 'zh-CN']);
  const COPY = Object.freeze({
    en: {
      current: 'Here is the current authoritative entry.',
      sharedRace: 'This is one shared Race-based authority referenced by the listed Hero cards.',
      sharedClass: 'This is one shared Class-based authority referenced by the listed Hero cards.',
      composition: 'Hero composition resolves from one Hero profile, one Race-based Racial Trait, and the Class-based Class Ability for each Rank.',
      cannotDodge: 'This Attack cannot be Dodged because the official card effect says so.',
      cannotBlock: 'This Attack cannot be Blocked because the official card effect says so.',
      doubleCasting: 'Double Casting creates two separate Attack activations and two separate Response windows.',
      technical: 'Technical resolution uses the canonical operation list below; translation does not change gameplay semantics.',
      missing: 'I could not find a clear answer in the current local Rulebook or Season 1 authority. Try an exact card, Racial Trait, Class Ability, or Hero name.'
    },
    id: {
      current: 'Berikut entri otoritatif terkini.',
      sharedRace: 'Ini adalah satu authority berbasis Race yang dipakai bersama oleh kartu Hero yang tercantum.',
      sharedClass: 'Ini adalah satu authority berbasis Class yang dipakai bersama oleh kartu Hero yang tercantum.',
      composition: 'Hero composition diselesaikan dari satu Hero profile, satu Racial Trait berbasis Race, dan Class Ability berbasis Class untuk setiap Rank.',
      cannotDodge: 'Attack ini tidak dapat di-Dodge karena effect kartu resmi menyatakannya secara eksplisit.',
      cannotBlock: 'Attack ini tidak dapat di-Block karena effect kartu resmi menyatakannya secara eksplisit.',
      doubleCasting: 'Double Casting membuat dua aktivasi Attack terpisah dan dua Response window terpisah.',
      technical: 'Penyelesaian teknis memakai daftar operasi canonical di bawah; terjemahan tidak mengubah gameplay semantics.',
      missing: 'Saya tidak menemukan jawaban yang jelas dalam Rulebook lokal atau authority Season 1 terkini. Coba nama kartu, Racial Trait, Class Ability, atau Hero yang tepat.'
    },
    ja: {
      current: '現在の公式 authority エントリーです。',
      sharedRace: 'これは、記載された Hero カードが参照する、Race ベースで共有される単一の authority です。',
      sharedClass: 'これは、記載された Hero カードが参照する、Class ベースで共有される単一の authority です。',
      composition: 'Hero composition は、1つの Hero profile、Race ベースの Racial Trait、各 Rank の Class ベースの Class Ability から解決されます。',
      cannotDodge: '公式カードの effect に明記されているため、この Attack は Dodge できません。',
      cannotBlock: '公式カードの effect に明記されているため、この Attack は Block できません。',
      doubleCasting: 'Double Casting は、2回の独立した Attack activation と2つの独立した Response window を作ります。',
      technical: '技術的な解決は下記の canonical operation に従い、翻訳によって gameplay semantics は変わりません。',
      missing: '現在のローカル Rulebook または Season 1 authority で明確な回答を確認できませんでした。正確なカード名、Racial Trait、Class Ability、または Hero 名を入力してください。'
    },
    es: {
      current: 'Esta es la entrada autoritativa vigente.',
      sharedRace: 'Esta es una única authority compartida basada en Race, referenciada por las cartas Hero indicadas.',
      sharedClass: 'Esta es una única authority compartida basada en Class, referenciada por las cartas Hero indicadas.',
      composition: 'La Hero composition se resuelve con un Hero profile, un Racial Trait basado en Race y la Class Ability basada en Class para cada Rank.',
      cannotDodge: 'Este Attack no puede usar Dodge porque el effect oficial de la carta lo indica expresamente.',
      cannotBlock: 'Este Attack no puede usar Block porque el effect oficial de la carta lo indica expresamente.',
      doubleCasting: 'Double Casting crea dos activaciones de Attack y dos ventanas de Response independientes.',
      technical: 'La resolución técnica usa la lista de operaciones canonical siguiente; la traducción no cambia la gameplay semantics.',
      missing: 'No encontré una respuesta clara en el Rulebook local ni en la authority vigente de Season 1. Prueba el nombre exacto de una carta, Racial Trait, Class Ability o Hero.'
    },
    'zh-CN': {
      current: '这是当前的官方 authority 条目。',
      sharedRace: '这是一个按 Race 共享的单一 authority，由下列 Hero 卡牌共同引用。',
      sharedClass: '这是一个按 Class 共享的单一 authority，由下列 Hero 卡牌共同引用。',
      composition: 'Hero composition 由一个 Hero profile、按 Race 定义的 Racial Trait，以及每个 Rank 按 Class 定义的 Class Ability 解析。',
      cannotDodge: '官方卡牌 effect 已明确说明，因此此 Attack 不能被 Dodge。',
      cannotBlock: '官方卡牌 effect 已明确说明，因此此 Attack 不能被 Block。',
      doubleCasting: 'Double Casting 会创建两次独立的 Attack activation 和两个独立的 Response window。',
      technical: '技术结算采用下方 canonical operation 列表；翻译不会改变 gameplay semantics。',
      missing: '在当前本地 Rulebook 或 Season 1 authority 中未找到明确答案。请尝试输入准确的卡牌名、Racial Trait、Class Ability 或 Hero 名。'
    }
  });

  const LANGUAGE_PROFILES = Object.freeze({
    en: ['what', 'which', 'how', 'does', 'is', 'are', 'can', 'cost', 'effect', 'card', 'tell', 'explain', 'about'],
    id: ['apa', 'apakah', 'bagaimana', 'berapa', 'biaya', 'efek', 'kartu', 'jelaskan', 'tentang', 'bisa', 'boleh', 'dan', 'dari'],
    es: ['que', 'cual', 'como', 'cuanto', 'coste', 'cuesta', 'efecto', 'carta', 'explica', 'sobre', 'puede', 'tiene', 'del', 'una']
  });

  function fold(value) {
    return String(value || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  }

  function normalize(value) {
    return fold(value).replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function detectLanguage(value) {
    const raw = String(value || '');
    const kana = (raw.match(/[\u3040-\u30ff]/g) || []).length;
    const han = (raw.match(/[\u3400-\u9fff]/g) || []).length;
    if (kana > 0) return 'ja';
    if (han > 0) return 'zh-CN';

    const words = fold(raw).match(/[a-z]+/g) || [];
    const scores = { en: 0, id: 0, es: 0 };
    for (const [language, profile] of Object.entries(LANGUAGE_PROFILES)) {
      const terms = new Set(profile);
      for (const word of words) if (terms.has(word)) scores[language] += word.length > 4 ? 2 : 1;
    }
    if (/[¿¡]/.test(raw)) scores.es += 3;
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    if (!ranked[0] || ranked[0][1] === 0) return 'en';
    if (ranked[1] && ranked[0][1] === ranked[1][1]) return 'en';
    return ranked[0][0];
  }

  function presentationLanguage(language) {
    return LOCAL_LANGUAGES.includes(language) ? language : 'en';
  }

  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  function exactMentions(query, rows, key) {
    const nq = normalize(query);
    const hits = rows.filter(row => {
      const candidate = normalize(row[key]);
      return candidate.length > 2 && nq.includes(candidate);
    });
    if (!hits.length) return [];
    const longest = Math.max(...hits.map(row => normalize(row[key]).length));
    return hits.filter(row => normalize(row[key]).length === longest);
  }

  function questionMode(query) {
    const raw = String(query || '');
    const q = normalize(raw);
    if (/\b(cost|mana|biaya|harga|coste|cuesta)\b|コスト|费用|消耗|法力/.test(q + raw)) return 'cost';
    if (/\b(type|jenis|tipe|tipo)\b|種類|类型/.test(q + raw)) return 'type';
    if (/\b(class|rank|kelas|rango)\b|クラス|ランク|职业|等级/.test(q + raw)) return 'class-rank';
    if (/\b(negate|cancel|dodge|block|response|interaction|interaksi|interaccion)\b|無効|回避|防御|响应|闪避|格挡/.test(q + raw)) return 'technical';
    if (/\b(effect|efek|fungsi|hace|efecto)\b|効果|效果|作用/.test(q + raw)) return 'effect';
    return 'summary';
  }

  function sourceRequirement(card) {
    const req = card.source_requirement || {};
    if (card.card_type === 'Hero') {
      const identity = card.identity || {};
      return [identity.race || card.race, identity.class || card.display_class, identity.rank || card.class_rank].filter(Boolean).join(' · ');
    }
    return req.class_rank_label || (Array.isArray(req.legal_active_classes) ? req.legal_active_classes.join(' / ') : req.legal_active_classes) || card.display_class || '—';
  }

  function operationList(card) {
    const kinds = (card.effects || []).map(effect => effect && effect.kind).filter(Boolean);
    if (card.double_casting_policy) kinds.push('double_casting_policy');
    if (card.active_effect) kinds.push('active_effect');
    return [...new Set(kinds)];
  }

  function renderCard(payload, language) {
    const t = COPY[language];
    const card = payload.card;
    const effects = operationList(card);
    const flags = (card.effects || []).filter(Boolean);
    let technical = '';
    if (flags.some(effect => effect.cannot_be_dodged)) technical = t.cannotDodge;
    else if (flags.some(effect => effect.cannot_be_blocked)) technical = t.cannotBlock;
    else if (card.double_casting_policy && card.double_casting_policy.two_separate_response_windows) technical = t.doubleCasting;
    else if (payload.mode === 'technical') technical = t.technical;

    const fields = [
      `<strong>${escapeHTML(card.name)}</strong>`,
      escapeHTML(t.current),
      `<b>Card ID:</b> ${escapeHTML(card.card_id)}`,
      `<b>Card Type:</b> ${escapeHTML([card.card_type, card.classification].filter(Boolean).join(' · '))}`,
      `<b>Class / Rank:</b> ${escapeHTML(sourceRequirement(card))}`,
      `<b>Mana Cost:</b> ${escapeHTML(card.cost_display || '—')}`,
      `<b>Effect (official text):</b> ${escapeHTML(card.card_text || '—')}`
    ];
    if (technical) fields.push(`<b>Technical interaction:</b> ${escapeHTML(technical)}`);
    if (effects.length) fields.push(`<b>Canonical operations:</b> ${escapeHTML(effects.join(' · '))}`);
    fields.push(`<span class="source-link">${escapeHTML(card.card_id)} · cards.runtime.v0.13.1 · registry ${escapeHTML(payload.registryHash)}</span>`);
    return fields.join('<br>');
  }

  function renderComponent(payload, language) {
    const t = COPY[language];
    const row = payload.component;
    const racial = payload.kind === 'racial';
    const id = racial ? row.racial_trait_id : row.class_ability_id;
    const scope = racial ? `Race: ${row.race}` : `Class: ${row.class}`;
    const shared = racial ? t.sharedRace : t.sharedClass;
    const refs = (row.used_by_hero_names || []).join(', ');
    return [
      `<strong>${escapeHTML(row.name)}</strong>`,
      `<b>${racial ? 'Racial Trait' : 'Class Ability'}:</b> ${escapeHTML(id)}`,
      `<b>${escapeHTML(scope)}</b>`,
      `<b>Effect (official text):</b> ${escapeHTML((row.definition || {}).text || '—')}`,
      escapeHTML(shared),
      `<b>Referenced by Hero:</b> ${escapeHTML(refs || '—')}`,
      `<span class="source-link">Hero Component Authority v1.0.0 · registry ${escapeHTML(payload.registryHash)}</span>`
    ].join('<br>');
  }

  function renderComposition(payload, language) {
    const t = COPY[language];
    const profile = payload.profile;
    const racial = payload.racial;
    const rankLines = payload.ranks.map(rank => {
      const ability = rank.ability ? `${rank.ability.name}: ${rank.ability.definition.text}` : '—';
      return `<li><b>${escapeHTML(rank.card_id)} · ${escapeHTML(rank.rank)} · ${escapeHTML(rank.class)}</b><br>Class Ability: ${escapeHTML(ability)}</li>`;
    }).join('');
    return [
      `<strong>${escapeHTML(profile.name)}</strong>`,
      escapeHTML(t.composition),
      `<b>Race:</b> ${escapeHTML(profile.race)}`,
      `<b>Racial Trait:</b> ${escapeHTML(racial.name)} — ${escapeHTML(racial.definition.text)}`,
      `<b>Rank / Class composition:</b><ul>${rankLines}</ul>`,
      `<span class="source-link">Hero Component Authority v1.0.0 · registry ${escapeHTML(payload.registryHash)}</span>`
    ].join('<br>');
  }

  function buildPayload(question, authority) {
    const cards = Array.isArray(authority.cards) ? authority.cards : [];
    const components = authority.components || {};
    const registryHash = authority.registryHash || '';
    const racialHits = exactMentions(question, components.racial_traits || [], 'name');
    if (racialHits[0]) return { kind: 'racial', component: racialHits[0], registryHash };
    const classHits = exactMentions(question, components.class_abilities || [], 'name');
    if (classHits[0]) return { kind: 'classAbility', component: classHits[0], registryHash };

    const profileHits = exactMentions(question, components.hero_profiles || [], 'name');
    if (profileHits[0]) {
      const profile = profileHits[0];
      const racial = (components.racial_traits || []).find(row => row.racial_trait_id === profile.racial_trait_ref);
      const abilities = new Map((components.class_abilities || []).map(row => [row.class_ability_id, row]));
      return {
        kind: 'composition', profile, racial,
        ranks: profile.rank_cards.map(rank => ({ ...rank, ability: rank.class_ability_ref ? abilities.get(rank.class_ability_ref) : null })),
        registryHash
      };
    }

    const cardHits = exactMentions(question, cards, 'name');
    if (cardHits[0]) return { kind: 'card', card: cardHits[0], mode: questionMode(question), registryHash };
    const id = String(question || '').toUpperCase().match(/S1-[A-Z]{3}-(?:H|L)?\d{3}/)?.[0];
    if (id) {
      const card = cards.find(row => row.card_id === id);
      if (card) return { kind: 'card', card, mode: questionMode(question), registryHash };
    }
    return null;
  }

  function answer(question, authority) {
    const detectedLanguage = detectLanguage(question);
    const language = presentationLanguage(detectedLanguage);
    const payload = buildPayload(question, authority || {});
    if (!payload) return { language, detectedLanguage, kind: 'missing', authorityKey: null, html: escapeHTML(COPY[language].missing) };
    const authorityKey = payload.kind === 'card' ? payload.card.card_id
      : payload.kind === 'composition' ? payload.profile.hero_id
        : payload.component.racial_trait_id || payload.component.class_ability_id;
    const html = payload.kind === 'card' ? renderCard(payload, language)
      : payload.kind === 'composition' ? renderComposition(payload, language)
        : renderComponent(payload, language);
    return { language, detectedLanguage, kind: payload.kind, authorityKey, html };
  }

  return Object.freeze({
    OFFICIAL_TERMS,
    LOCAL_LANGUAGES,
    detectLanguage,
    presentationLanguage,
    normalize,
    questionMode,
    buildPayload,
    answer
  });
});
