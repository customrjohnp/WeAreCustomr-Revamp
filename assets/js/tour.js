(function () {
  // =======================
  // PERSONALIZED TOUR STEPS
  // =======================
  // Edit copy, selectors, placement, and CTA per step.
  const steps = [
    {
      selector: '.hero h1',
      title: 'Start here',
      body:
        "We’re your go-to team for Customer Data & Insights, CRM, Loyalty & Tech. In 60 minutes we’ll surface quick wins and a clear next step—no fluff.",
      placement: 'bottom',
      cta: { label: 'Book an intro call', href: 'contact.html' }
    },
    {
      selector: '.services-grid .card:nth-child(1)', // Data & Insights
      title: 'Data & Insights',
      body:
        "Messy data? We turn it into decisions. We’ll audit what you track, clean naming, and show exactly what to measure so growth isn’t a guessing game.",
      placement: 'right',
      cta: { label: 'See data services', href: 'services.html#data' }
    },
    {
      selector: '.services-grid .card:nth-child(2)', // CRM
      title: 'CRM that compounds',
      body:
        "From flows to campaigns, we build the engine: Welcome, Browse/Cart, Post-Purchase, Win-back—tested, named properly, and tied to GA4.",
      placement: 'left',
      cta: { label: 'See CRM services', href: 'services.html#crm' }
    },
    {
      selector: '.services-grid .card:nth-child(3)', // Loyalty
      title: 'Loyalty that pays for itself',
      body:
        "Tiers, points, rewards—done commercially. We design the model so benefits ladder up to profit, not just perks.",
      placement: 'right',
      cta: { label: 'See Loyalty', href: 'services.html#loyalty' }
    },
    {
      selector: '.cta-band',
      title: 'Make it real',
      body:
        "Tell us where you are and where you want to be. We’ll map a 90-day plan grounded in your data—and build it with you.",
      placement: 'top',
      cta: { label: 'Book an audit', href: 'contact.html' }
    }
  ];

  // =========
  // ELEMENTS
  // =========
  const overlay   = document.createElement('div'); overlay.className = 'tour-overlay';
  const highlight = document.createElement('div'); highlight.className = 'tour-highlight'; overlay.appendChild(highlight);
  const tooltip   = document.createElement('div'); tooltip.className   = 'tour-tooltip';   overlay.appendChild(tooltip);
  document.body.appendChild(overlay);

  let i = 0;

  // ==================
  // SCROLL + POSITION
  // ==================
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function smoothScrollTo(y) {
    return new Promise((resolve) => {
      if (prefersReducedMotion()) {
        window.scrollTo(0, y);
        return resolve();
      }
      let timer;
      const onScroll = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          window.removeEventListener('scroll', onScroll);
          resolve();
        }, 120);
      };
      window.addEventListener('scroll', onScroll);
      window.scrollTo({ top: y, behavior: 'smooth' });
      onScroll();
    });
  }

  function elForStep(idx) {
    const sel = steps[idx]?.selector;
    return sel ? document.querySelector(sel) : null;
  }

  async function position(doScroll = false) {
    const step = steps[i];
    const el = elForStep(i);
    if (!step || !el) { next(); return; }

    if (doScroll) {
      const headerH = document.querySelector('.site-header')?.offsetHeight || 0;
      const r = el.getBoundingClientRect();
      const targetY = Math.max(0, window.scrollY + r.top - headerH - 16);
      const needsScroll = r.top < headerH + 20 || r.bottom > window.innerHeight - 20;
      if (needsScroll) await smoothScrollTo(targetY);
    }

    const r2 = el.getBoundingClientRect();
    const pad = 6;
    highlight.style.left   = (r2.left - pad) + 'px';
    highlight.style.top    = (r2.top  - pad) + 'px';
    highlight.style.width  = (r2.width  + pad * 2) + 'px';
    highlight.style.height = (r2.height + pad * 2) + 'px';

    // Build tooltip content (progress + CTA support)
    const total = steps.length;
    const progress = `<div class="small" style="opacity:.65;margin-bottom:6px">Step ${i+1} of ${total}</div>`;
    const ctaBtn = step.cta
      ? `<a class="btn" href="${step.cta.href}" style="margin-right:8px">${step.cta.label}</a>`
      : '';

    // Build tooltip content (progress + CTA support)
const total = steps.length;
const progress = `<div class="small" style="opacity:.65;margin-bottom:6px">Step ${i+1} of ${total}</div>`;
const ctaBtn = step.cta
  ? `<a class="btn cta" href="${step.cta.href}">${step.cta.label}</a>` // <-- make CTA orange
  : '';
const isLast = (i + 1 === total);

// All nav buttons are ghost; only CTA is brand (orange)
tooltip.innerHTML = `
  ${progress}
  <h4 style="margin-top:0">${step.title}</h4>
  <p>${step.body}</p>
  <div class="tour-controls">
    ${ctaBtn}
    <button class="btn ghost" data-action="prev">Back</button>
    <button class="btn ghost" data-action="next">${isLast ? 'Finish' : 'Next'}</button>
    <button class="btn ghost" data-action="close">Close</button>
  </div>
`;


    const t = tooltip.getBoundingClientRect();
    let left = r2.left, top = r2.top;
    if (step.placement === 'bottom') { top = r2.bottom + 12; left = r2.left; }
    if (step.placement === 'top')    { top = r2.top - t.height - 12; left = r2.left; }
    if (step.placement === 'right')  { left = r2.right + 12; top = r2.top; }
    if (step.placement === 'left')   { left = r2.left - t.width - 12; top = r2.top; }

    // keep tooltip on-screen
    const safeL = Math.max(12, Math.min(window.innerWidth  - t.width  - 12, left));
    const safeT = Math.max(12, Math.min(window.innerHeight - t.height - 12, top));
    tooltip.style.left = safeL + 'px';
    tooltip.style.top  = safeT + 'px';
  }

  // =========
  // CONTROLS
  // =========
  function open()  { overlay.classList.add('active'); i = 0; position(true); }
  function close() { overlay.classList.remove('active'); }
  function next() {
  if (i >= steps.length - 1) {  // already on last step
    close();                    // close the tour
    return;
  }
  i = i + 1;
  position(true);
}

  function prev()  { i = Math.max(0, i - 1);               position(true); }

  // Maintain alignment on resize/scroll
  window.addEventListener('resize', () => overlay.classList.contains('active') && position(false));
  window.addEventListener('scroll', () => overlay.classList.contains('active') && position(false));

  // Click outside overlay to close
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  // Tooltip buttons
  overlay.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    if (action === 'close') close();
    if (action === 'next')  next();
    if (action === 'prev')  prev();
  });

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'Escape')     close();
  });

  // Trigger: any element with data-start-tour
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-start-tour]');
    if (t) { e.preventDefault(); open(); }
  });

  // Optional: start with ?tour=1
  if (new URLSearchParams(location.search).get('tour') === '1') {
    open();
  }
})();
