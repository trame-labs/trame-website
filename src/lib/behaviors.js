// Interactions of the example cards, ported from the mock-up's script.js. Pages keep the mock-up's
// markup and data attributes (data-ledger, data-trame, data-for, data-autocycle, data-tabs/data-pane),
// and attachBehaviors() wires them up on the rendered page. Returns a cleanup function.
export function attachBehaviors(root) {
  const ac = new AbortController();
  const on = (el, type, fn, opts) => el.addEventListener(type, fn, { signal: ac.signal, ...opts });
  const timers = [];

  // Example cards: clicking a row opens where it comes from; the segmented control changes who is looking.
  root.querySelectorAll('[data-ledger]').forEach((card) => {
    const rows = card.querySelectorAll('tr.pick');
    const panels = card.querySelectorAll('[data-trame]');
    const show = (id) => {
      rows.forEach((r) => {
        const sel = r.getAttribute('data-row') === id;
        r.classList.toggle('on', sel);
        r.setAttribute('aria-expanded', sel ? 'true' : 'false');
      });
      panels.forEach((p) => { p.hidden = p.getAttribute('data-trame') !== id; });
    };
    rows.forEach((r) => {
      r.setAttribute('tabindex', '0');
      r.setAttribute('role', 'button');
      on(r, 'click', () => show(r.getAttribute('data-row')));
      on(r, 'keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(r.getAttribute('data-row')); }
      });
    });
    const seg = card.querySelectorAll('.seg button');
    seg.forEach((b) => {
      on(b, 'click', () => {
        seg.forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
        const who = b.getAttribute('data-who');
        card.querySelectorAll('[data-for]').forEach((el) => {
          el.hidden = el.getAttribute('data-for').split(' ').indexOf(who) === -1;
        });
      });
    });
  });

  // Hero card: the "seen by" control cycles on its own until the visitor's first gesture.
  if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    root.querySelectorAll('[data-autocycle]').forEach((card) => {
      const btns = [...card.querySelectorAll('.seg button')];
      if (!btns.length) return;
      let i = 0;
      const timer = setInterval(() => { i = (i + 1) % btns.length; btns[i].click(); }, 3500);
      timers.push(timer);
      const stop = () => clearInterval(timer);
      on(card, 'pointerdown', stop, { once: true });
      on(card, 'keydown', stop, { once: true });
    });
  }

  // Tabs (demo page: book a slot / be called back).
  root.querySelectorAll('[data-tabs]').forEach((group) => {
    const btns = group.querySelectorAll('button');
    btns.forEach((b) => {
      on(b, 'click', () => {
        btns.forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
        const t = b.getAttribute('data-show');
        root.querySelectorAll('[data-pane]').forEach((p) => { p.hidden = p.getAttribute('data-pane') !== t; });
      });
    });
  });
  if (window.location.hash === '#rappel') root.querySelector('[data-tabs] button[data-show="call"]')?.click();

  return () => { ac.abort(); timers.forEach(clearInterval); };
}
