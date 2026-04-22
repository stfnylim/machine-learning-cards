// app.js
(function () {
  'use strict';

  // ─── State ───────────────────────────────────────────────────────────────────
  let deck = [];          // active filtered + (optionally shuffled) deck
  let currentIndex = 0;
  let isFlipped = false;
  let shuffleOn = false;
  let activeCat = 'all';  // 'all' or a category id
  let cardStatus = {};    // { [originalIndex]: 'got' | 'review' }

  const STORAGE_KEY = 'flashterm-status';

  // ─── Persistence ─────────────────────────────────────────────────────────────
  function loadStatus() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) cardStatus = JSON.parse(raw);
    } catch (_) {}
  }

  function saveStatus() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cardStatus));
    } catch (_) {}
  }

  // ─── Deck helpers ─────────────────────────────────────────────────────────────
  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildDeck() {
    // Tag each card with its original index
    let source = CARDS.map((c, i) => ({ ...c, originalIndex: i }));
    // Filter by category
    if (activeCat !== 'all') {
      source = source.filter(c => c.cat === activeCat);
    }
    deck = shuffleOn ? shuffleArray(source) : source;
  }

  // ─── Category nav ─────────────────────────────────────────────────────────────
  function buildCatNav() {
    const nav = document.getElementById('catNav');
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn';
      btn.dataset.cat = cat.id;
      btn.textContent = cat.label.toUpperCase();
      nav.appendChild(btn);
    });
  }

  function getCatLabel(catId) {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat ? cat.label : '';
  }

  // ─── DOM refs ─────────────────────────────────────────────────────────────────
  const card          = document.getElementById('card');
  const cardScene     = document.getElementById('cardScene');
  const questionText  = document.getElementById('questionText');
  const answerText    = document.getElementById('answerText');
  const faceCatTag    = document.getElementById('faceCatTag');
  const faceCatTagBack= document.getElementById('faceCatTagBack');
  const progressFill  = document.getElementById('progressFill');
  const progressCur   = document.getElementById('progressCurrent');
  const progressTot   = document.getElementById('progressTotal');
  const progressStats = document.getElementById('progressStats');
  const statusPip     = document.getElementById('statusPip');
  const prevBtn       = document.getElementById('prevBtn');
  const nextBtn       = document.getElementById('nextBtn');
  const gotItBtn      = document.getElementById('gotItBtn');
  const reviewBtn     = document.getElementById('reviewBtn');
  const shuffleBtn    = document.getElementById('shuffleBtn');

  // ─── Render ───────────────────────────────────────────────────────────────────
  function pad(n) { return String(n).padStart(2, '0'); }

  function render(keepFlip = false) {
    if (!deck.length) return;
    const entry  = deck[currentIndex];
    const total  = deck.length;
    const status = cardStatus[entry.originalIndex];
    const label  = getCatLabel(entry.cat);

    if (!keepFlip && isFlipped) unflip();

    questionText.textContent    = entry.q;
    answerText.textContent      = entry.a;
    faceCatTag.textContent      = label;
    faceCatTagBack.textContent  = label;

    progressCur.textContent  = pad(currentIndex + 1);
    progressTot.textContent  = pad(total);
    progressFill.style.width = ((currentIndex + 1) / total * 100) + '%';

    // Stats: count within active view
    const viewIndices = deck.map(c => c.originalIndex);
    const gotCount    = viewIndices.filter(i => cardStatus[i] === 'got').length;
    const reviewCount = viewIndices.filter(i => cardStatus[i] === 'review').length;
    if (gotCount || reviewCount) {
      progressStats.innerHTML =
        `<span class="stat-got">&#x2713;${gotCount}</span>` +
        ` <span class="stat-review">&#x21BA;${reviewCount}</span>`;
    } else {
      progressStats.textContent = '';
    }

    statusPip.className = 'status-pip' + (status ? ' ' + status : '');
    statusPip.title = status === 'got' ? 'Got it' : status === 'review' ? 'Still reviewing' : '';

    gotItBtn.classList.toggle('active', status === 'got');
    reviewBtn.classList.toggle('active', status === 'review');

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === total - 1;
  }

  // ─── Flip ─────────────────────────────────────────────────────────────────────
  function flip() {
    isFlipped = !isFlipped;
    card.classList.toggle('flipped', isFlipped);
  }

  function unflip() {
    if (isFlipped) {
      isFlipped = false;
      card.classList.remove('flipped');
    }
  }

  // ─── Navigation ───────────────────────────────────────────────────────────────
  function goTo(index) {
    if (index < 0 || index >= deck.length) return;
    currentIndex = index;
    render(false);
  }

  // ─── Mark card ────────────────────────────────────────────────────────────────
  function markCard(status) {
    const key = deck[currentIndex].originalIndex;
    cardStatus[key] = cardStatus[key] === status ? undefined : status;
    if (cardStatus[key] === undefined) delete cardStatus[key];
    saveStatus();
    if (!isFlipped) flip();
    render(true);
  }

  // ─── Category filter ──────────────────────────────────────────────────────────
  function setCategory(catId) {
    activeCat = catId;

    // Update button states
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === catId);
    });

    buildDeck();
    currentIndex = 0;
    render(false);
  }

  // ─── Shuffle toggle ───────────────────────────────────────────────────────────
  function toggleShuffle() {
    shuffleOn = !shuffleOn;
    shuffleBtn.classList.toggle('active', shuffleOn);
    shuffleBtn.setAttribute('aria-pressed', String(shuffleOn));

    const savedOriginalIndex = deck[currentIndex]?.originalIndex;
    buildDeck();
    const newIdx = deck.findIndex(c => c.originalIndex === savedOriginalIndex);
    currentIndex = newIdx >= 0 ? newIdx : 0;
    render(false);
  }

  // ─── Event listeners ─────────────────────────────────────────────────────────
  cardScene.addEventListener('click', flip);
  cardScene.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
  });

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
  gotItBtn.addEventListener('click', e => { e.stopPropagation(); markCard('got'); });
  reviewBtn.addEventListener('click', e => { e.stopPropagation(); markCard('review'); });
  shuffleBtn.addEventListener('click', toggleShuffle);

  document.getElementById('catNav').addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (btn) setCategory(btn.dataset.cat);
  });

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case ' ':          e.preventDefault(); flip(); break;
      case 'ArrowLeft':  e.preventDefault(); goTo(currentIndex - 1); break;
      case 'ArrowRight': e.preventDefault(); goTo(currentIndex + 1); break;
      case 'g': case 'G': markCard('got'); break;
      case 'r': case 'R': markCard('review'); break;
      case 's': case 'S': toggleShuffle(); break;
    }
  });

  // ─── Service worker ───────────────────────────────────────────────────────────
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    });
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────
  loadStatus();
  buildCatNav();
  buildDeck();
  render(false);

})();
