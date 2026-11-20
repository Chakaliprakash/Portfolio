/**
 * PRAKASH CHAKALI — PORTFOLIO CORE CONTROLLER
 * Architecture & Interactions:
 * 1. Kinetic Concurrency Topology Canvas (Hero Centerpiece)
 * 2. MysteryStay Interactive Concurrency & Double-Booking Prevention Lab
 * 3. MysteryStay DSA Top-K Bounded Min-Heap Benchmark Engine
 * 4. In-Memory MiniDB SQL Sandbox Terminal
 * 5. Theme Switcher (Editorial Light / Studio Dark)
 * 6. Native Web Audio Generative Soundscape
 * 7. Live IST Telemetry & Scrollspy Navigation
 * 8. Asynchronous Web3Forms Integration
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. THEME CONTROLLER & SYSTEM INITIALIZATION
     -------------------------------------------------------------------------- */
  const THEME_STORAGE_KEY = 'prakash_portfolio_theme';
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');

  function initTheme() {
    let savedTheme = null;
    try { savedTheme = localStorage.getItem(THEME_STORAGE_KEY); } catch (_) { /* Storage may be unavailable in private contexts. */ }
    if (savedTheme === 'dark' || savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeLabel(savedTheme);
    } else {
      // Default is light editorial
      document.documentElement.setAttribute('data-theme', 'light');
      updateThemeLabel('light');
    }
  }

  function updateThemeLabel(currentTheme) {
    if (themeLabel) {
      themeLabel.textContent = currentTheme === 'dark' ? 'Light' : 'Dark';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const target = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', target);
      try { localStorage.setItem(THEME_STORAGE_KEY, target); } catch (_) { /* Theme still works for this session. */ }
      updateThemeLabel(target);
    });
  }

  initTheme();

  /* --------------------------------------------------------------------------
     2. LIVE IST TELEMETRY CLOCK
     -------------------------------------------------------------------------- */
  const liveClockEl = document.getElementById('live-ist-clock');

  function updateClock() {
    if (!liveClockEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      liveClockEl.textContent = `IST ${timeStr}`;
    } catch (e) {
      liveClockEl.textContent = 'IST active';
    }
  }

  setInterval(updateClock, 30000);
  updateClock();

  /* --------------------------------------------------------------------------
     3. READING PROGRESS & ACTIVE NAV SCROLLSPY
     -------------------------------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollProgress) {
      const progress = (window.scrollY / totalHeight) * 100;
      scrollProgress.style.width = `${progress}%`;
    }

    // Scrollspy
    let currentSection = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  let scrollFrame = 0;
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      handleScroll();
      scrollFrame = 0;
    });
  }, { passive: true });
  handleScroll();

  /* --------------------------------------------------------------------------
     4. EDITORIAL CURSOR (FINE POINTERS ONLY)
     -------------------------------------------------------------------------- */
  const cursor = document.getElementById('editorial-cursor');
  const cursorDot = cursor ? cursor.querySelector('.cursor-dot') : null;
  const cursorRing = cursor ? cursor.querySelector('.cursor-ring') : null;

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    let cursorFrame = 0;
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      if (Math.abs(mouseX - ringX) > 0.5 || Math.abs(mouseY - ringY) > 0.5) {
        cursorFrame = requestAnimationFrame(renderCursor);
      } else {
        cursorFrame = 0;
      }
    }
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      if (!cursorFrame) cursorFrame = requestAnimationFrame(renderCursor);
    }, { passive: true });

    const interactives = document.querySelectorAll('a, button, input, textarea, select, .preset-btn, .thread-chip');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* --------------------------------------------------------------------------
     5. MOBILE DRAWER NAVIGATION
     -------------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileDrawer.inert = false;
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (drawerClose) drawerClose.focus();
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileDrawer.inert = true;
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (!mobileDrawer || !mobileDrawer.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = [...mobileDrawer.querySelectorAll('a[href], button:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* --------------------------------------------------------------------------
     6. KINETIC CONCURRENCY TOPOLOGY CANVAS (HERO CENTERPIECE)
     -------------------------------------------------------------------------- */
  const topologyCanvas = document.getElementById('topology-canvas');
  if (topologyCanvas) {
    const ctx = topologyCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animFrameId = null;
    let isVisible = !document.hidden;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mouse = { x: -1000, y: -1000, active: false };

    function resizeCanvas() {
      const rect = topologyCanvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      topologyCanvas.width = Math.max(1, Math.round(width * dpr));
      topologyCanvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    topologyCanvas.addEventListener('mousemove', (e) => {
      const rect = topologyCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    topologyCanvas.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Architecture Topology Nodes: HTTP Gateway -> JWT Filter -> Spring Dispatcher -> Service Mesh -> DB Lock
    const nodes = [
      { id: 'gateway', label: 'HTTP Gateway', xRatio: 0.12, yRatio: 0.5, radius: 18, type: 'entry' },
      { id: 'security', label: 'Spring Security (JWT)', xRatio: 0.32, yRatio: 0.28, radius: 15, type: 'filter' },
      { id: 'controller', label: 'REST Controllers', xRatio: 0.34, yRatio: 0.72, radius: 15, type: 'filter' },
      { id: 'orchestrator', label: 'Service Layer', xRatio: 0.54, yRatio: 0.5, radius: 20, type: 'core' },
      { id: 'heapRanker', label: 'Min-Heap Top-K', xRatio: 0.74, yRatio: 0.25, radius: 15, type: 'algo' },
      { id: 'lockManager', label: 'PESSIMISTIC_LOCK', xRatio: 0.74, yRatio: 0.75, radius: 17, type: 'lock' },
      { id: 'dbLedger', label: 'MySQL 8.4 (InnoDB)', xRatio: 0.90, yRatio: 0.5, radius: 22, type: 'db' }
    ];

    const links = [
      ['gateway', 'security'],
      ['gateway', 'controller'],
      ['security', 'orchestrator'],
      ['controller', 'orchestrator'],
      ['orchestrator', 'heapRanker'],
      ['orchestrator', 'lockManager'],
      ['heapRanker', 'dbLedger'],
      ['lockManager', 'dbLedger']
    ];

    // Transactional Data Packets
    const packets = [];
    const packetColors = ['#DE5326', '#38BDF8', '#10B981', '#F59E0B'];

    for (let i = 0; i < 18; i++) {
      packets.push({
        linkIndex: Math.floor(Math.random() * links.length),
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        color: packetColors[Math.floor(Math.random() * packetColors.length)],
        payloadSize: Math.floor(Math.random() * 6) + 1
      });
    }

    let tick = 0;

    function renderTopology() {
      tick++;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const wireColor = isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(20, 22, 26, 0.09)';
      const nodeFill = isDark ? '#141720' : '#FFFFFF';
      const textColor = isDark ? '#94A3B8' : '#4B5563';

      // 1. Draw Links
      links.forEach(([fromId, toId]) => {
        const from = nodes.find(n => n.id === fromId);
        const to = nodes.find(n => n.id === toId);
        if (!from || !to) return;

        const x1 = from.xRatio * width;
        const y1 = from.yRatio * height;
        const x2 = to.xRatio * width;
        const y2 = to.yRatio * height;

        ctx.beginPath();
        ctx.strokeStyle = wireColor;
        ctx.lineWidth = 1.5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // 2. Draw Packets
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.linkIndex = Math.floor(Math.random() * links.length);
        }

        const [fromId, toId] = links[p.linkIndex];
        const from = nodes.find(n => n.id === fromId);
        const to = nodes.find(n => n.id === toId);
        if (!from || !to) return;

        const x1 = from.xRatio * width;
        const y1 = from.yRatio * height;
        const x2 = to.xRatio * width;
        const y2 = to.yRatio * height;

        const px = x1 + (x2 - x1) * p.progress;
        const py = y1 + (y2 - y1) * p.progress;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Draw Nodes
      nodes.forEach((n) => {
        let nx = n.xRatio * width;
        let ny = n.yRatio * height;

        // Interactive mouse perturbation
        if (mouse.active) {
          const dx = mouse.x - nx;
          const dy = mouse.y - ny;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (1 - dist / 100) * 8;
            nx -= (dx / dist) * force;
            ny -= (dy / dist) * force;
          }
        }

        // Pulse ring around Lock and DB
        if (n.type === 'lock' || n.type === 'core') {
          const pulse = (Math.sin(tick * 0.05) + 1) * 3;
          ctx.beginPath();
          ctx.strokeStyle = n.type === 'lock' ? 'rgba(222, 83, 38, 0.3)' : 'rgba(16, 185, 129, 0.3)';
          ctx.lineWidth = 1;
          ctx.arc(nx, ny, n.radius + 4 + pulse, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Node Circle
        ctx.beginPath();
        ctx.fillStyle = nodeFill;
        ctx.strokeStyle = n.type === 'lock' ? '#DE5326' : (n.type === 'db' ? '#3B82F6' : (isDark ? '#4B5563' : '#CBD5E1'));
        ctx.lineWidth = n.type === 'lock' ? 2.5 : 1.8;
        ctx.arc(nx, ny, n.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node Center Core
        ctx.beginPath();
        ctx.fillStyle = n.type === 'lock' ? '#DE5326' : (n.type === 'entry' ? '#10B981' : (n.type === 'db' ? '#3B82F6' : '#94A3B8'));
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label Text
        ctx.font = '600 9px "JetBrains Mono", monospace';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.fillText(n.label, nx, ny + n.radius + 14);
      });

      if (isVisible && !prefersReducedMotion) {
        animFrameId = requestAnimationFrame(renderTopology);
      }
    }

    function syncTopologyAnimation() {
      isVisible = !document.hidden && topologyCanvas.getBoundingClientRect().bottom > 0 && topologyCanvas.getBoundingClientRect().top < window.innerHeight;
      if (isVisible && !prefersReducedMotion && !animFrameId) {
        animFrameId = requestAnimationFrame(renderTopology);
      } else if ((!isVisible || prefersReducedMotion) && animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
        renderTopology();
      }
    }

    if ('IntersectionObserver' in window) {
      const topologyObserver = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting && !document.hidden;
        if (isVisible && !prefersReducedMotion && !animFrameId) {
          animFrameId = requestAnimationFrame(renderTopology);
        } else if (!isVisible && animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      }, { threshold: 0.05 });
      topologyObserver.observe(topologyCanvas);
    }
    document.addEventListener('visibilitychange', syncTopologyAnimation);
    window.addEventListener('resize', syncTopologyAnimation, { passive: true });
    if (!prefersReducedMotion && isVisible) {
      animFrameId = requestAnimationFrame(renderTopology);
    } else {
      renderTopology();
    }
  }

  /* --------------------------------------------------------------------------
     7. FLAGSHIP LAB A: CONCURRENCY LOCK & DOUBLE-BOOKING SIMULATOR
     -------------------------------------------------------------------------- */
  const runSimBtn = document.getElementById('run-concurrency-sim');
  const resetSimBtn = document.getElementById('reset-concurrency-sim');
  const threadsContainer = document.getElementById('threads-container');
  const simTerminal = document.getElementById('sim-terminal');
  const inventoryCounter = document.getElementById('inventory-counter');

  const THREAD_COUNT = 10;
  let isSimRunning = false;

  function initThreads() {
    if (!threadsContainer) return;
    threadsContainer.innerHTML = '';
    for (let i = 1; i <= THREAD_COUNT; i++) {
      const chip = document.createElement('div');
      chip.className = 'thread-chip';
      chip.id = `th-chip-${i}`;
      chip.innerHTML = `
        <span class="th-name">Thread #${i}</span>
        <span class="th-state" id="th-state-${i}">READY</span>
      `;
      threadsContainer.appendChild(chip);
    }
    if (inventoryCounter) inventoryCounter.textContent = '1 Room';
  }

  initThreads();

  function logTerminal(msg, type = 'prompt') {
    if (!simTerminal) return;
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    const timestamp = new Date().toISOString().substring(11, 23);
    line.textContent = `[${timestamp}] ${msg}`;
    simTerminal.appendChild(line);
    simTerminal.scrollTop = simTerminal.scrollHeight;
  }

  if (runSimBtn) {
    runSimBtn.addEventListener('click', () => {
      if (isSimRunning) return;
      isSimRunning = true;
      runSimBtn.disabled = true;

      logTerminal('--- SPAWNING 10 CONCURRENT BOOKING THREADS ---', 'prompt');
      logTerminal('Executing SQL: SELECT * FROM room_inventories WHERE id = 101 FOR UPDATE;', 'prompt');

      // Random winner thread (e.g. Thread #4 or #7)
      const winnerId = Math.floor(Math.random() * THREAD_COUNT) + 1;

      for (let i = 1; i <= THREAD_COUNT; i++) {
        const chip = document.getElementById(`th-chip-${i}`);
        const stateEl = document.getElementById(`th-state-${i}`);
        if (chip && stateEl) {
          chip.className = 'thread-chip running';
          stateEl.textContent = 'ACQUIRING';
        }
      }

      // Simulate lock contention resolution after 850ms
      setTimeout(() => {
        let conflictCount = 0;

        for (let i = 1; i <= THREAD_COUNT; i++) {
          const chip = document.getElementById(`th-chip-${i}`);
          const stateEl = document.getElementById(`th-state-${i}`);

          if (i === winnerId) {
            if (chip && stateEl) {
              chip.className = 'thread-chip success';
              stateEl.textContent = 'LOCK ACQUIRED (200)';
            }
            logTerminal(`[Thread-${i}] Lock granted! Reserved Room 101. Decrementing available_rooms -> 0. Status: 200 OK`, 'win');
          } else {
            conflictCount++;
            if (chip && stateEl) {
              chip.className = 'thread-chip conflict';
              stateEl.textContent = '409 CONFLICT';
            }
          }
        }

        if (inventoryCounter) inventoryCounter.textContent = '0 Rooms (LOCKED)';
        logTerminal(`[PESSIMISTIC_WRITE Guard] ${conflictCount} threads rejected with 409 Conflict. Double-booking prevented.`, 'err');
        logTerminal('--- TRANSACTION SERIALIZATION VERIFIED SUCCESSFULLY ---', 'win');

        isSimRunning = false;
        runSimBtn.disabled = false;
      }, 900);
    });
  }

  if (resetSimBtn) {
    resetSimBtn.addEventListener('click', () => {
      if (isSimRunning) return;
      initThreads();
      if (simTerminal) {
        simTerminal.innerHTML = '<div class="term-line prompt">> System ready. Press "Simulate 10 Concurrent Requests" to trigger parallel transactions.</div>';
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. FLAGSHIP LAB B: DSA TOP-K VS TIMSORT BENCHMARK CALCULATOR
     -------------------------------------------------------------------------- */
  const dealCountRange = document.getElementById('deal-count-range');
  const kCountRange = document.getElementById('k-count-range');
  const dealCountDisplay = document.getElementById('deal-count-display');
  const kCountDisplay = document.getElementById('k-count-display');
  const timsortOps = document.getElementById('timsort-ops');
  const heapOps = document.getElementById('heap-ops');
  const heapProgressBar = document.getElementById('heap-progress-bar');
  const speedupMultiplier = document.getElementById('speedup-multiplier');
  const memorySavings = document.getElementById('memory-savings');

  function updateDsaBenchmark() {
    if (!dealCountRange || !kCountRange) return;

    const N = parseInt(dealCountRange.value, 10);
    const K = parseInt(kCountRange.value, 10);

    if (dealCountDisplay) dealCountDisplay.textContent = N.toLocaleString();
    if (kCountDisplay) kCountDisplay.textContent = K.toString();

    // Calculate operations:
    // TimSort = N * log2(N)
    // Bounded Min-Heap = N * log2(K)
    const log2N = Math.log2(N);
    const log2K = Math.log2(K);

    const timsortOperations = Math.round(N * log2N);
    const heapOperations = Math.round(N * log2K);
    const speedup = (timsortOperations / heapOperations).toFixed(2);
    const memRatio = Math.round(N / K);

    if (timsortOps) timsortOps.textContent = `~ ${timsortOperations.toLocaleString()} ops`;
    if (heapOps) heapOps.textContent = `~ ${heapOperations.toLocaleString()} ops`;
    if (speedupMultiplier) speedupMultiplier.textContent = `${speedup}× Faster`;
    if (memorySavings) memorySavings.textContent = `${memRatio.toLocaleString()}× Less Memory`;

    if (heapProgressBar) {
      const percentage = Math.min(Math.max((heapOperations / timsortOperations) * 100, 8), 100);
      heapProgressBar.style.width = `${percentage.toFixed(1)}%`;
    }
  }

  if (dealCountRange && kCountRange) {
    dealCountRange.addEventListener('input', updateDsaBenchmark);
    kCountRange.addEventListener('input', updateDsaBenchmark);
    updateDsaBenchmark();
  }

  /* --------------------------------------------------------------------------
     9. IN-MEMORY MINIDB SQL SANDBOX TERMINAL
     -------------------------------------------------------------------------- */
  const minidbForm = document.getElementById('minidb-form');
  const minidbInput = document.getElementById('minidb-input');
  const minidbOutput = document.getElementById('minidb-output');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Mini in-memory database table mock matching MiniDB's exact implementation
  let dbRows = [
    { id: 1, name: 'Alice', age: 22 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 19 }
  ];

  function formatAsciiTable(rows, columns = ['id', 'name', 'age']) {
    if (rows.length === 0) {
      return '(0 rows returned)';
    }

    // Calculate max width per column
    const widths = {};
    columns.forEach(col => {
      widths[col] = col.length;
      rows.forEach(r => {
        const valStr = String(r[col] ?? '');
        if (valStr.length > widths[col]) widths[col] = valStr.length;
      });
      widths[col] += 2; // padding
    });

    // Divider
    const makeDivider = () => '+' + columns.map(col => '-'.repeat(widths[col] + 2)).join('+') + '+';
    const makeRow = (obj) => '| ' + columns.map(col => String(obj[col] ?? '').padEnd(widths[col])).join(' | ') + ' |';

    let out = [];
    out.push(makeDivider());
    const headerObj = {};
    columns.forEach(c => headerObj[c] = c.toUpperCase());
    out.push(makeRow(headerObj));
    out.push(makeDivider());
    rows.forEach(r => out.push(makeRow(r)));
    out.push(makeDivider());
    out.push(`(${rows.length} row${rows.length === 1 ? '' : 's'} in set)`);
    return out.join('\n');
  }

  function executeSql(sql) {
    const raw = sql.trim();
    if (!raw) return '';

    let res = `\nminidb> ${raw}\n`;

    const clean = raw.replace(/;$/, '').trim();

    // 1. SELECT * FROM users WHERE id = X (PK O(1) Lookup)
    const selectPkMatch = clean.match(/^SELECT\s+(.+?)\s+FROM\s+users\s+WHERE\s+id\s*=\s*(\d+)$/i);
    if (selectPkMatch) {
      const cols = selectPkMatch[1].trim() === '*' ? ['id', 'name', 'age'] : selectPkMatch[1].split(',').map(s => s.trim().toLowerCase());
      const targetId = parseInt(selectPkMatch[2], 10);
      const row = dbRows.find(r => r.id === targetId);
      res += `[MiniDB Engine] Primary Key Hash Index O(1) hit for id = ${targetId}\n`;
      res += formatAsciiTable(row ? [row] : [], cols);
      return res;
    }

    // 2. SELECT with WHERE comparison (e.g. age > 20)
    const selectWhereMatch = clean.match(/^SELECT\s+(.+?)\s+FROM\s+users\s+WHERE\s+age\s*(>|<|>=|<=|=)\s*(\d+)$/i);
    if (selectWhereMatch) {
      const cols = selectWhereMatch[1].trim() === '*' ? ['id', 'name', 'age'] : selectWhereMatch[1].split(',').map(s => s.trim().toLowerCase());
      const op = selectWhereMatch[2];
      const targetAge = parseInt(selectWhereMatch[3], 10);

      const filtered = dbRows.filter(r => {
        if (op === '>') return r.age > targetAge;
        if (op === '<') return r.age < targetAge;
        if (op === '>=') return r.age >= targetAge;
        if (op === '<=') return r.age <= targetAge;
        if (op === '=') return r.age === targetAge;
        return false;
      });

      res += `[MiniDB Engine] Table Scan evaluation for condition 'age ${op} ${targetAge}':\n`;
      res += formatAsciiTable(filtered, cols);
      return res;
    }

    // 3. Simple SELECT * FROM users
    if (/^SELECT\s+\*\s+FROM\s+users$/i.test(clean)) {
      res += formatAsciiTable(dbRows, ['id', 'name', 'age']);
      return res;
    }

    // 4. INSERT INTO users VALUES (id, 'name', age)
    const insertMatch = clean.match(/^INSERT\s+INTO\s+users\s+VALUES\s*\(\s*(\d+)\s*,\s*['"](.+?)['"]\s*,\s*(\d+)\s*\)$/i);
    if (insertMatch) {
      const id = parseInt(insertMatch[1], 10);
      const name = insertMatch[2];
      const age = parseInt(insertMatch[3], 10);

      // Check PK conflict
      if (dbRows.some(r => r.id === id)) {
        res += `Error: Duplicate entry '${id}' for key 'PRIMARY'. Insertion aborted.`;
        return res;
      }

      dbRows.push({ id, name, age });
      res += `1 row inserted. Primary Key index updated for id=${id}.`;
      return res;
    }

    // 5. DELETE FROM users WHERE id = X
    const deleteMatch = clean.match(/^DELETE\s+FROM\s+users\s+WHERE\s+id\s*=\s*(\d+)$/i);
    if (deleteMatch) {
      const id = parseInt(deleteMatch[1], 10);
      const initial = dbRows.length;
      dbRows = dbRows.filter(r => r.id !== id);
      const removed = initial - dbRows.length;
      res += `${removed} row${removed === 1 ? '' : 's'} deleted.`;
      return res;
    }

    // 6. CREATE TABLE
    if (/^CREATE\s+TABLE/i.test(clean)) {
      res += `Table created successfully. Schema registered.`;
      return res;
    }

    res += `Supported SQL syntax: CREATE TABLE, INSERT INTO, SELECT [columns] FROM users [WHERE ...], DELETE FROM users WHERE id = X.`;
    return res;
  }

  if (minidbForm && minidbInput && minidbOutput) {
    minidbForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = minidbInput.value;
      if (!val.trim()) return;
      const result = executeSql(val);
      minidbOutput.textContent += result;
      minidbOutput.scrollTop = minidbOutput.scrollHeight;
      minidbInput.value = '';
    });
  }

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sql = btn.getAttribute('data-sql');
      if (minidbInput && sql) {
        minidbInput.value = sql;
        if (minidbForm) {
          const result = executeSql(sql);
          if (minidbOutput) {
            minidbOutput.textContent += result;
            minidbOutput.scrollTop = minidbOutput.scrollHeight;
          }
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     10. GENERATIVE WEB AUDIO AMBIENT SOUNDSCAPE (CALM WARM SYNTH)
     -------------------------------------------------------------------------- */
  const soundToggle = document.getElementById('sound-toggle');
  const soundLabel = document.getElementById('sound-label');

  let audioCtx = null;
  let isAudioPlaying = false;
  let synthTimer = null;

  // Pentatonic warm chords (Ebmaj9, Cm9, Fm9)
  const chordBank = [
    [155.56, 196.00, 233.08, 293.66], // Ebmaj9
    [130.81, 196.00, 233.08, 261.63], // Cm7
    [174.61, 207.65, 261.63, 311.13]  // Fm7
  ];

  function playAmbientVoice(freq, duration) {
    if (!audioCtx || !isAudioPlaying) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.025, audioCtx.currentTime + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio node cleanup
    }
  }

  function triggerAmbientChord() {
    if (!isAudioPlaying) return;
    const chord = chordBank[Math.floor(Math.random() * chordBank.length)];
    chord.forEach((noteFreq, idx) => {
      setTimeout(() => {
        playAmbientVoice(noteFreq, 4.5);
      }, idx * 120);
    });

    synthTimer = setTimeout(triggerAmbientChord, 5200);
  }

  function toggleAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (isAudioPlaying) {
      isAudioPlaying = false;
      if (synthTimer) clearTimeout(synthTimer);
      if (soundToggle) soundToggle.classList.remove('playing');
      if (soundLabel) soundLabel.textContent = 'Audio';
    } else {
      isAudioPlaying = true;
      if (soundToggle) soundToggle.classList.add('playing');
      if (soundLabel) soundLabel.textContent = 'Mute';
      triggerAmbientChord();
    }
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', toggleAudio);
  }

  /* --------------------------------------------------------------------------
     11. ASYNCHRONOUS WEB3FORMS CONTACT FORM
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitText = document.getElementById('submit-btn-text');
  const submitIcon = document.getElementById('submit-btn-icon');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');
      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      // Reset errors
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';
      if (formFeedback) {
        formFeedback.className = 'form-feedback';
        formFeedback.style.display = 'none';
      }

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      let hasError = false;
      if (!name) {
        if (nameError) nameError.textContent = 'Name is required.';
        hasError = true;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (emailError) emailError.textContent = 'Valid email is required.';
        hasError = true;
      }
      if (!message || message.length < 10) {
        if (messageError) messageError.textContent = 'Please enter a message (min 10 characters).';
        hasError = true;
      }

      if (hasError) return;

      // Loading state
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'Transmitting...';
      if (submitIcon) submitIcon.className = 'fa-solid fa-spinner fa-spin';

      const formData = new FormData(contactForm);
      const jsonObject = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(jsonObject)
        });

        const data = await res.json();

        if (res.status === 200 && data.success) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been transmitted successfully to prakashchakali6216@gmail.com. I will reply within 24 hours.`;
          formFeedback.style.display = 'block';
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Transmission failed.');
        }
      } catch (err) {
        formFeedback.className = 'form-feedback error';
        formFeedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Transmission notice: Webhook delivery could not be completed. Please write directly to <a href="mailto:prakashchakali6216@gmail.com" style="text-decoration:underline; font-weight:700;">prakashchakali6216@gmail.com</a>.`;
        formFeedback.style.display = 'block';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Transmit Message';
        if (submitIcon) submitIcon.className = 'fa-solid fa-paper-plane';
      }
    });
  }

})();
