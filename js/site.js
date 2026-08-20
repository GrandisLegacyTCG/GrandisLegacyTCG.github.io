(() => {
  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      mobileMenu.hidden = open;
    });
    mobileMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      }
    });
  }

  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const track = carousel.querySelector('.art-track');
  const slides = [...carousel.querySelectorAll('.art-slide')];
  const next = carousel.querySelector('.carousel-next');
  const prev = carousel.querySelector('.carousel-prev');
  let index = 0;
  let timer = null;

  const isCompact = () => window.matchMedia('(max-width: 900px)').matches;
  const render = () => {
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    const gap = isCompact() ? 20 : 40;
    const width = isCompact() ? Math.max(0, window.innerWidth - 48) : 1160;
    if (isCompact()) {
      track.style.transform = `translateX(${-index * (width + gap)}px)`;
    } else {
      track.style.transform = `translateX(calc(-580px - ${index * (width + gap)}px))`;
    }
  };

  const go = (direction) => {
    index = (index + direction + slides.length) % slides.length;
    render();
  };
  const start = () => {
    stop();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = window.setInterval(() => go(1), 6500);
  };
  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  next?.addEventListener('click', () => { go(1); start(); });
  prev?.addEventListener('click', () => { go(-1); start(); });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(1); start(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); start(); }
  });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  window.addEventListener('resize', render, { passive: true });

  render();
  start();
})();
