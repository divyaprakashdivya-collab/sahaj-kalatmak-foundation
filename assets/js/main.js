document.addEventListener('DOMContentLoaded', () => {
  /* ===== PAGE READY ===== */
  document.body.classList.add('page-ready');

  /* ===== YEAR ===== */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== HEADER SCROLL EFFECT ===== */
  const header = document.querySelector('.site-header');

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===== SMART ANCHOR SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

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
    '.hero__content, .panel, .section__head, .about-card, .side-card, .feature-card, .content-card, .quote-band, .footer__grid, .footer-bottom'
  );

  revealItems.forEach((el, index) => {
    el.classList.add('reveal');

    if (el.classList.contains('feature-card') || el.classList.contains('content-card')) {
      el.classList.add(`delay-${(index % 4) + 1}`);
    }
  });

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

  /* ===== PAGE TRANSITION FOR INTERNAL HTML PAGES ===== */
  const internalPageLinks = document.querySelectorAll('a[href$=".html"], a[href*=".html#"]');

  internalPageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (!href) return;
      if (link.target === '_blank') return;
      if (href.startsWith('http')) return;

      e.preventDefault();
      document.body.classList.remove('page-ready');
      document.body.classList.add('page-exit');

      setTimeout(() => {
        window.location.href = href;
      }, 220);
    });
  });
});
