  (function () {
    'use strict';

    // Jahr im Footer automatisch setzen
    var yearEl = document.getElementById('year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    // Mobiles Menü
    var navWrap = document.getElementById('navWrap');
    var navToggle = document.getElementById('navToggle');
    if (navToggle && navWrap) {
      navToggle.addEventListener('click', function () {
        var isOpen = navWrap.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      navWrap.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
          navWrap.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Sanftes Einblenden beim Scrollen
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fadeEls = document.querySelectorAll('.fade-in');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      fadeEls.forEach(function (el) { observer.observe(el); });
    }

    // Parallax-Hintergrund: dezentes Mitwandern beim Scrollen (rAF-gedrosselt)
    var parallaxImg = document.getElementById('parallaxImg');
    if (parallaxImg && !prefersReducedMotion) {
      var ticking = false;
      var updateParallax = function () {
        var y = window.scrollY || window.pageYOffset;
        var offset = y * 0.09; // kleines Delta -> Tiefe ohne Ablenkung
        parallaxImg.style.transform = 'translateY(' + offset.toFixed(1) + 'px) scale(1.08)';
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });
      updateParallax();
    }

    // Ruhig wechselnde Hero-Zeile
    var phraseEls = document.querySelectorAll('.hero-phrases .phrase');
    if (phraseEls.length > 1 && !prefersReducedMotion) {
      var phraseIndex = 0;
      setInterval(function () {
        phraseEls[phraseIndex].classList.remove('is-active');
        phraseIndex = (phraseIndex + 1) % phraseEls.length;
        phraseEls[phraseIndex].classList.add('is-active');
      }, 4200);
    }
  })();
