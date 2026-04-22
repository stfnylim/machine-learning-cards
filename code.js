// code.js
(function () {
  'use strict';

  // ─── State ─────────────────────────────────────────────────────────────────
  let pyodide       = null;
  let currentCh     = null;
  let activeFilter  = 'all';
  let solved        = {};   // { [challenge_id]: true }

  const STORAGE_SOLVED = 'flashterm-solved';
  const STORAGE_CODE   = 'flashterm-code-';

  // ─── Persistence ───────────────────────────────────────────────────────────
  function loadSolved() {
    try { solved = JSON.parse(localStorage.getItem(STORAGE_SOLVED) || '{}'); } catch (_) {}
  }
  function saveSolved(id) {
    solved[id] = true;
    try { localStorage.setItem(STORAGE_SOLVED, JSON.stringify(solved)); } catch (_) {}
  }
  function saveCode(id, code) {
    try { localStorage.setItem(STORAGE_CODE + id, code); } catch (_) {}
  }
  function loadCode(id) {
    try { return localStorage.getItem(STORAGE_CODE + id); } catch (_) { return null; }
  }

  // ─── DOM refs ───────────────────────────────────────────────────────────────
  const loadingOverlay  = document.getElementById('loadingOverlay');
  const loadingStatus   = document.getElementById('loadingStatus');
  const loadingFill     = document.getElementById('loadingFill');
  const codeApp         = document.getElementById('codeApp');
  const challengeList   = document.getElementById('challengeList');
  const filterRow       = document.getElementById('filterRow');
  const solvedCount     = document.getElementById('solvedCount');
  const problemTitle    = document.getElementById('problemTitle');
  const problemMeta     = document.getElementById('problemMeta');
  const problemDesc     = document.getElementById('problemDesc');
  const codeEditor      = document.getElementById('codeEditor');
  const runBtn          = document.getElementById('runBtn');
  const resetBtn        = document.getElementById('resetBtn');
  const hintBtn         = document.getElementById('hintBtn');
  const hintBox         = document.getElementById('hintBox');
  const stdoutBox       = document.getElementById('stdoutBox');
  const testResultsBox  = document.getElementById('testResultsBox');
  const successBanner   = document.getElementById('successBanner');
  const mobileSidebarBtn= document.getElementById('mobileSidebarBtn');
  const sidebar         = document.getElementById('sidebar');

  // ─── Pyodide init ───────────────────────────────────────────────────────────
  async function initPyodide() {
    loadingFill.style.width = '20%';
    loadingStatus.textContent = '> loading python runtime (pyodide)...';
    pyodide = await loadPyodide();

    loadingFill.style.width = '60%';
    loadingStatus.textContent = '> loading numpy...';
    await pyodide.loadPackage('numpy');

    loadingFill.style.width = '100%';
    loadingStatus.textContent = '> ready.';

    setTimeout(() => {
      loadingOverlay.style.display = 'none';
      codeApp.style.display        = 'flex';
      runBtn.disabled              = false;
    }, 300);
  }

  // ─── Code execution ─────────────────────────────────────────────────────────
  async function runCode(userCode, tests) {
    pyodide.globals.set('_user_code', userCode);
    pyodide.globals.set('_test_pairs', pyodide.toPy(tests.map(t => [t.code, t.description])));

    const script = `
import sys
from io import StringIO as _SIO

_buf = _SIO()
_old = sys.stdout
sys.stdout = _buf

_ns  = {}
_err = None
_res = []

try:
    exec(_user_code, _ns)
except Exception as _e:
    _err = type(_e).__name__ + ': ' + str(_e)

if _err is None:
    for _tc, _td in _test_pairs:
        try:
            exec(_tc, _ns)
            _res.append(('pass', _td, ''))
        except AssertionError as _e:
            _res.append(('fail', _td, str(_e) or 'assertion failed'))
        except Exception as _e:
            _res.append(('error', _td, type(_e).__name__ + ': ' + str(_e)))

sys.stdout = _old
[_buf.getvalue(), _err, _res]
`;

    const raw = await pyodide.runPythonAsync(script);
    const arr = raw.toJs({ dict_converter: Object.fromEntries });
    return { stdout: arr[0], execError: arr[1], results: arr[2] };
  }

  // ─── Render sidebar list ────────────────────────────────────────────────────
  function renderList() {
    challengeList.innerHTML = '';
    const list = activeFilter === 'all'
      ? CHALLENGES
      : CHALLENGES.filter(c => c.cat === activeFilter);

    list.forEach(ch => {
      const item = document.createElement('div');
      item.className = 'ch-item'
        + (solved[ch.id] ? ' solved'  : '')
        + (currentCh?.id === ch.id ? ' active' : '');
      item.dataset.id = ch.id;

      const diffClass = { easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' }[ch.difficulty] || '';
      const typeClass  = ch.type === 'debug' ? 'badge-debug' : 'badge-impl';
      const typeLabel  = ch.type === 'debug' ? 'DEBUG' : 'IMPL';

      item.innerHTML = `
        <div class="ch-name">${ch.title}</div>
        <div class="ch-badges">
          <span class="badge ${diffClass}">${ch.difficulty.toUpperCase()}</span>
          <span class="badge ${typeClass}">${typeLabel}</span>
        </div>`;

      item.addEventListener('click', () => {
        loadChallenge(ch);
        sidebar.classList.remove('open');
      });
      challengeList.appendChild(item);
    });

    updateProgress();
  }

  // ─── Load a challenge ───────────────────────────────────────────────────────
  function loadChallenge(ch) {
    currentCh = ch;

    const catLabel = (CATEGORIES.find(c => c.id === ch.cat) || {}).label || ch.cat;
    const diffClass = { easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' }[ch.difficulty] || '';
    const typeClass  = ch.type === 'debug' ? 'badge-debug' : 'badge-impl';

    problemTitle.textContent = ch.title;
    problemMeta.innerHTML = `
      <span class="badge ${diffClass}">${ch.difficulty.toUpperCase()}</span>
      <span class="badge ${typeClass}">${ch.type === 'debug' ? '&#128027; DEBUG' : '&#9112; IMPLEMENT'}</span>
      <span class="badge badge-impl">${catLabel}</span>`;
    problemDesc.textContent = ch.description;

    codeEditor.value = loadCode(ch.id) || ch.starter;

    // Reset output
    stdoutBox.textContent       = '(no output yet)';
    testResultsBox.innerHTML    = '';
    successBanner.style.display = 'none';
    hintBox.style.display       = 'none';
    hintBox.textContent         = '';

    renderList();
  }

  // ─── Render test results ────────────────────────────────────────────────────
  function renderResults(stdout, execError, results) {
    stdoutBox.textContent = stdout || '(no output)';

    testResultsBox.innerHTML    = '';
    successBanner.style.display = 'none';

    if (execError) {
      const row = document.createElement('div');
      row.className = 'test-row err';
      row.innerHTML = `<span class="test-icon">&#x2717;</span><span class="test-desc">Runtime error: ${escHtml(execError)}</span>`;
      testResultsBox.appendChild(row);
      return;
    }

    let allPass = results.length > 0;
    results.forEach(r => {
      const [status, desc, msg] = Array.isArray(r) ? r : [r.get(0), r.get(1), r.get(2)];
      if (status !== 'pass') allPass = false;

      const row = document.createElement('div');
      row.className = `test-row ${status === 'pass' ? 'pass' : status === 'fail' ? 'fail' : 'err'}`;
      const icon  = status === 'pass' ? '&#x2713;' : '&#x2717;';
      const extra = msg ? `<span class="test-msg"> — ${escHtml(msg)}</span>` : '';
      row.innerHTML = `<span class="test-icon">${icon}</span><span class="test-desc">${escHtml(desc)}${extra}</span>`;
      testResultsBox.appendChild(row);
    });

    if (allPass) {
      successBanner.style.display = 'block';
      saveSolved(currentCh.id);
      renderList();
    }
  }

  // ─── Build filter buttons from CATEGORIES ──────────────────────────────────
  function buildFilters() {
    // Get cats present in CHALLENGES
    const usedCats = new Set(CHALLENGES.map(c => c.cat));
    CATEGORIES.filter(c => usedCats.has(c.id)).forEach(cat => {
      const btn = document.createElement('button');
      btn.className    = 'filter-btn';
      btn.dataset.filter = cat.id;
      btn.textContent  = cat.label.split(' ')[0].toUpperCase(); // short label
      filterRow.appendChild(btn);
    });
  }

  // ─── Progress ───────────────────────────────────────────────────────────────
  function updateProgress() {
    const total = CHALLENGES.length;
    const done  = CHALLENGES.filter(c => solved[c.id]).length;
    solvedCount.textContent = `${done} / ${total}`;
  }

  // ─── Utility ────────────────────────────────────────────────────────────────
  function escHtml(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ─── Events ─────────────────────────────────────────────────────────────────

  // Run button
  runBtn.addEventListener('click', async () => {
    if (!pyodide || !currentCh) return;
    saveCode(currentCh.id, codeEditor.value);

    runBtn.disabled  = true;
    runBtn.classList.add('running');
    runBtn.textContent = '&#9654; RUNNING...';

    try {
      const { stdout, execError, results } = await runCode(codeEditor.value, currentCh.tests);
      renderResults(stdout, execError, results);
    } catch (e) {
      stdoutBox.textContent = '';
      testResultsBox.innerHTML = `<div class="test-row err"><span class="test-icon">&#x2717;</span><span class="test-desc">Unexpected error: ${escHtml(e.message)}</span></div>`;
    }

    runBtn.disabled  = false;
    runBtn.classList.remove('running');
    runBtn.innerHTML = '&#9654; RUN';
  });

  // Keyboard shortcut: Ctrl/Cmd+Enter to run
  codeEditor.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runBtn.click();
    }
    // Tab → 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;
      codeEditor.value = codeEditor.value.substring(0, s) + '    ' + codeEditor.value.substring(end);
      codeEditor.selectionStart = codeEditor.selectionEnd = s + 4;
    }
  });

  // Auto-save on edit
  codeEditor.addEventListener('input', () => {
    if (currentCh) saveCode(currentCh.id, codeEditor.value);
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    if (!currentCh) return;
    if (confirm('Reset to starter code?')) {
      localStorage.removeItem(STORAGE_CODE + currentCh.id);
      codeEditor.value = currentCh.starter;
    }
  });

  // Hint
  hintBtn.addEventListener('click', () => {
    if (!currentCh) return;
    if (hintBox.style.display === 'none') {
      hintBox.textContent = '> Hint: ' + currentCh.hint;
      hintBox.style.display = 'block';
    } else {
      hintBox.style.display = 'none';
    }
  });

  // Category filter
  filterRow.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderList();
  });

  // Mobile sidebar
  mobileSidebarBtn.addEventListener('click', () => sidebar.classList.toggle('open'));

  // ─── Init ───────────────────────────────────────────────────────────────────
  loadSolved();
  buildFilters();
  renderList();
  if (CHALLENGES.length) loadChallenge(CHALLENGES[0]);

  initPyodide().catch(e => {
    loadingStatus.textContent = '> Failed to load Python: ' + e.message;
    loadingFill.style.background = '#b04040';
  });

})();
