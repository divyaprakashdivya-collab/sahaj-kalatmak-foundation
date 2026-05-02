document.addEventListener('DOMContentLoaded', () => {
  /* ===== PAGE READY ===== */
  document.body.classList.add('page-ready');

  /* ===== YEAR ===== */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===== HEADER SCROLL EFFECT ===== */
  const header = document.querySelector('.site-header');

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===== HAMBURGER MENU ===== */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav__menu');

  const closeMenu = () => {
    if (!navToggle || !navMenu) return;
    navMenu.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.classList.contains('show')) return;
      if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });
  }

  /* ===== SMART ANCHOR SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeMenu();

      const headerHeight = header ? header.offsetHeight : 0;
      const extraGap = 28;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - extraGap;

      window.scrollTo({
        top: Math.max(targetPosition, 0),
        behavior: 'smooth'
      });

      history.pushState(null, '', targetId);
    });
  });

  /* ===== SCROLL REVEAL ===== */
  const revealItems = document.querySelectorAll(
    '.hero__content, .panel, .impact-strip, .section__head, .about-card, .side-card, .feature-card, .content-card, .quote-band, .footer__grid, .footer-bottom'
  );

  revealItems.forEach((el, index) => {
    el.classList.add('reveal');

    if (el.classList.contains('feature-card') || el.classList.contains('content-card')) {
      el.classList.add(`delay-${(index % 4) + 1}`);
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  /* ===== PAGE TRANSITION FOR INTERNAL HTML PAGES ===== */
  const internalPageLinks = document.querySelectorAll('a[href$=".html"], a[href*=".html#"]');

  internalPageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');

      if (!href) return;
      if (link.target === '_blank') return;
      if (href.startsWith('http')) return;
      if (href.startsWith('#')) return;

      event.preventDefault();
      closeMenu();

      document.body.classList.remove('page-ready');
      document.body.classList.add('page-exit');

      setTimeout(() => {
        window.location.href = href;
      }, 220);
    });
  });
});
