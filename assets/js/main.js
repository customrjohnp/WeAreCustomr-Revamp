
const navbar = document.querySelector('.navbar');
const toggle = document.querySelector('.menu-toggle');
if (toggle){ toggle.addEventListener('click', ()=> navbar.classList.toggle('open')); }
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold: 0.15});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));
// ========== Brands Carousel ==========
(function () {
  const slider = document.querySelector('.logo-slider');
  if (!slider) return;

  const track = slider.querySelector('.track');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  const intervalMs = Number(slider.dataset.interval || 2500);
  const autoplay = (slider.dataset.autoplay || 'true') === 'true';

  // duplicate items to allow looping
  const originals = Array.from(track.children);
  originals.forEach(el => track.appendChild(el.cloneNode(true)));

  // robust gap + card width detection
  let cardWidth = 0;
  function updateCardWidth() {
    const first = track.firstElementChild;
    if (!first) return;
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.gap || cs.columnGap || '16') || 16;
    cardWidth = first.getBoundingClientRect().width + gap;
    if (!Number.isFinite(cardWidth) || cardWidth <= 0) cardWidth = 300; // fallback
  }
  updateCardWidth();
  window.addEventListener('resize', updateCardWidth);

  const halfLen = track.children.length / 2;

  function step(dir = 1) {
    track.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });

    // after the smooth scroll, normalize position so we never hit the end
    // (small timeout so scrollLeft updates)
    setTimeout(() => {
      if (track.scrollLeft >= cardWidth * halfLen) {
        track.scrollLeft = 0;
      } else if (track.scrollLeft < 0) {
        track.scrollLeft = cardWidth * (halfLen - 1);
      }
    }, 300);
  }

  // wire buttons
  prev.addEventListener('click', (e) => { e.preventDefault(); step(-1); });
  next.addEventListener('click', (e) => { e.preventDefault(); step(1); });

  // drag / touch
  let isDown = false, startX = 0, startScroll = 0;
  const onDown = (e) => {
    isDown = true;
    startX = (e.touches ? e.touches[0].pageX : e.pageX);
    startScroll = track.scrollLeft;
    track.classList.add('dragging');
  };
  const onMove = (e) => {
    if (!isDown) return;
    const x = (e.touches ? e.touches[0].pageX : e.pageX);
    track.scrollLeft = startScroll - (x - startX);
  };
  const onUp = () => { isDown = false; track.classList.remove('dragging'); };

  track.addEventListener('mousedown', onDown);
  track.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  track.addEventListener('touchstart', onDown, { passive: true });
  track.addEventListener('touchmove', onMove, { passive: true });
  track.addEventListener('touchend', onUp);

  // autoplay (pause on hover/focus)
  let timer = null;
  const start = () => { if (autoplay && !timer) timer = setInterval(() => step(1), intervalMs); };
  const stop  = () => { if (timer) { clearInterval(timer); timer = null; } };
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);

  start();
})();
