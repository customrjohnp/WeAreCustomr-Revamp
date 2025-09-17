
const navbar = document.querySelector('.navbar');
const toggle = document.querySelector('.menu-toggle');
if (toggle){ toggle.addEventListener('click', ()=> navbar.classList.toggle('open')); }
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold: 0.15});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));
