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

    if (window.scrollY > 16) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===== SCROLL REVEAL ===== */
  const revealItems = document.querySelectorAll(
    '.hero__content, .panel, .section__head, .about-card, .side-card, .feature-card, .content-card, .quote-band, .footer__grid, .footer-bottom'
  );

  revealItems.forEach((el, index) => {
    el.classList.add('reveal');

    if (el.classList.contains('feature-card') || el.classList.contains('content-card')) {
      const cycle = index % 4;
      if (cycle === 0) el.classList.add('delay-1');
      if (cycle === 1) el.classList.add('delay-2');
      if (cycle === 2) el.classList.add('delay-3');
      if (cycle === 3) el.classList.add('delay-4');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach(el => observer.observe(el));

  /* ===== PAGE TRANSITION FOR INTERNAL HTML PAGES ===== */
  const internalPageLinks = document.querySelectorAll('a[href$=".html"], a[href*=".html#"]');

  internalPageLinks.forEach(link => {
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
