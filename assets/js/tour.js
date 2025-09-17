
(function(){
  const steps = [
    { selector: '.hero h1', title: 'Brand Promise', body: 'High-level positioning pulled from the live site copy.', placement: 'bottom' },
    { selector: '.services-grid', title: 'Core Services', body: 'Data & Insights, CRM, Loyalty, Technology.', placement: 'right' },
    { selector: '.cta-band', title: 'Contact', body: 'Clear call-to-action to start a project.', placement: 'top' }
  ];
  const overlay = document.createElement('div'); overlay.className='tour-overlay';
  const highlight = document.createElement('div'); highlight.className='tour-highlight'; overlay.appendChild(highlight);
  const tooltip = document.createElement('div'); tooltip.className='tour-tooltip'; overlay.appendChild(tooltip);
  document.body.appendChild(overlay);
  let i = 0;
  function position(){
    const step = steps[i]; const el = document.querySelector(step.selector); if(!el){ next(); return; }
    const r = el.getBoundingClientRect(); const pad = 6;
    highlight.style.left = (r.left - pad) + 'px'; highlight.style.top = (r.top - pad) + 'px';
    highlight.style.width = (r.width + pad*2) + 'px'; highlight.style.height = (r.height + pad*2) + 'px';
    tooltip.innerHTML = `<h4>${step.title}</h4><p>${step.body}</p>
      <div class="tour-controls"><button class="btn ghost" data-action="prev">Back</button>
      <button class="btn" data-action="next">Next</button><button class="btn ghost" data-action="close">Close</button></div>`;
    const t = tooltip.getBoundingClientRect(); let left = r.left, top = r.top;
    if(step.placement === 'bottom'){ top = r.bottom + 12; left = r.left }
    if(step.placement === 'top'){ top = r.top - t.height - 12; left = r.left }
    if(step.placement === 'right'){ left = r.right + 12; top = r.top }
    if(step.placement === 'left'){ left = r.left - t.width - 12; top = r.top }
    tooltip.style.left = Math.max(12, Math.min(window.innerWidth - t.width - 12, left)) + 'px';
    tooltip.style.top  = Math.max(12, Math.min(window.innerHeight - t.height - 12, top)) + 'px';
  }
  function open(){ overlay.classList.add('active'); i = 0; position(); }
  function close(){ overlay.classList.remove('active'); }
  function next(){ i = Math.min(steps.length-1, i+1); position(); }
  function prev(){ i = Math.max(0, i-1); position(); }
  window.addEventListener('resize', ()=> overlay.classList.contains('active') && position());
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
  overlay.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-action]'); if(!btn) return;
    const action = btn.getAttribute('data-action');
    if(action==='close') close(); if(action==='next') next(); if(action==='prev') prev();
  });
  document.addEventListener('click', (e)=>{ const t = e.target.closest('[data-start-tour]'); if(t) { e.preventDefault(); open(); } });
})();
