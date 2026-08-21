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
  if (carousel) {
    const track = carousel.querySelector('.art-track');
    const slides = [...carousel.querySelectorAll('.art-slide')];
    const next = carousel.querySelector('.carousel-next');
    const prev = carousel.querySelector('.carousel-prev');
    let index = 0;
    let timer = null;

    const isMobile = () => window.matchMedia('(max-width: 820px)').matches;
    const render = () => {
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      if (!slides.length) return;
      const width = slides[0].getBoundingClientRect().width;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      track.style.transform = isMobile()
        ? `translateX(${-index * (width + gap)}px)`
        : `translateX(${-width / 2 - index * (width + gap)}px)`;
    };

    const go = (direction) => {
      index = (index + direction + slides.length) % slides.length;
      render();
    };
    const stop = () => { if (timer) window.clearInterval(timer); timer = null; };
    const start = () => {
      stop();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = window.setInterval(() => go(1), 6500);
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
  }

  const dots = [...document.querySelectorAll('.section-dot[data-section-target]')];
  const sections = dots.map(dot => document.getElementById(dot.dataset.sectionTarget)).filter(Boolean);
  const setActiveDot = (id) => {
    dots.forEach(dot => {
      const active = dot.dataset.sectionTarget === id;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
    });
  };
  dots.forEach(dot => dot.addEventListener('click', () => {
    document.getElementById(dot.dataset.sectionTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const candidates = entries.filter(entry => entry.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (candidates[0]) setActiveDot(candidates[0].target.id);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0,.05,.15,.35] });
    sections.forEach(section => observer.observe(section));
  }
})();
