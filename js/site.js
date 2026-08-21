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
    let touchStartX = 0;
    let touchStartY = 0;
    let lastSwipeAt = 0;

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

    next?.addEventListener('click', () => { if (Date.now() - lastSwipeAt < 450) return; go(1); start(); });
    prev?.addEventListener('click', () => { if (Date.now() - lastSwipeAt < 450) return; go(-1); start(); });
    carousel.addEventListener('touchstart', (event) => {
      if (!isMobile() || !event.touches[0]) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      stop();
    }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      if (!isMobile() || !event.changedTouches[0]) return;
      const dx = event.changedTouches[0].clientX - touchStartX;
      const dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.15) {
        lastSwipeAt = Date.now();
        go(dx < 0 ? 1 : -1);
      }
      start();
    }, { passive: true });
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
  const landingSelectors = {
    hero: '#hero',
    discover: '#discover .section-heading',
    features: '#features .feature-grid',
    build: '#build .deck-card-fan',
    play: '#play .play-panel'
  };
  dots.forEach(dot => dot.addEventListener('click', () => {
    const id = dot.dataset.sectionTarget;
    const target = document.querySelector(landingSelectors[id] || `#${id}`);
    if (!target) return;
    const header = document.querySelector('.site-header');
    const headerHeight = header?.getBoundingClientRect().height || 0;
    const gap = window.matchMedia('(max-width: 820px)').matches ? 8 : 14;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - gap;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
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
