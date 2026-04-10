/* ══════════════════════════════════════════
   CYBER CREDO — main.js
   Theme | Nav | Tag Filter | Skill Bars
   Count-Up | Q&A Accordion
══════════════════════════════════════════ */

/* ── 1. Theme ── */
(function () {
  const STORAGE_KEY = 'cc-theme';

  function getPreferred() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Apply immediately (also done inline in <head>, but ensures toggle works)
  applyTheme(getPreferred());

  window.__toggleTheme = function () {
    var current = document.documentElement.dataset.theme;
    applyTheme(current === 'dark' ? 'light' : 'dark');
  };
})();

/* ── 2. Enable color transitions after first paint ── */
window.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.body.classList.add('theme-transitions');
  }, 100);
});

/* ── 3. Mobile Nav toggle ── */
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var drawer = document.getElementById('nav-drawer');
  var toggleIcons = document.querySelectorAll('.nav-toggle span');

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var isOpen = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Theme toggle button
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      window.__toggleTheme();
    });
  }
});

/* ── 4. Tag Filtering (Blog Index) ── */
document.addEventListener('DOMContentLoaded', function () {
  var filters = document.querySelectorAll('.tag-filter');
  var cards = document.querySelectorAll('#posts-grid .post-card[data-tags]');

  if (!filters.length) return;

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active state
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var tag = btn.dataset.tag;

      cards.forEach(function (card) {
        var tags = card.dataset.tags || '';
        var matches = tag === 'all' || tags.split(',').map(function (t) { return t.trim(); }).includes(tag);

        if (matches) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });
});

/* ── 5. Skill Bar Scroll Animation ── */
document.addEventListener('DOMContentLoaded', function () {
  var bars = document.querySelectorAll('.skill-bar-fill[data-width]');
  if (!bars.length) return;

  var animated = false;

  function animateBars() {
    if (animated) return;

    var grid = document.querySelector('.skills-grid');
    if (!grid) return;

    var rect = grid.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      animated = true;
      bars.forEach(function (bar) {
        var target = bar.dataset.width;
        bar.style.width = target + '%';
      });
    }
  }

  // Check immediately (in case already visible)
  animateBars();

  // Use IntersectionObserver if available
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          bars.forEach(function (bar) {
            bar.style.width = bar.dataset.width + '%';
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skills-grid').forEach(function (grid) {
      observer.observe(grid);
    });
  } else {
    window.addEventListener('scroll', animateBars, { passive: true });
    animateBars();
  }
});

/* ── 6. Count-Up Animation (Stat Strip) ── */
document.addEventListener('DOMContentLoaded', function () {
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  var counted = false;

  function countUp(el, target, duration) {
    var start = 0;
    var step = target / (duration / 16);
    var timer = setInterval(function () {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(start);
    }, 16);
  }

  function runCountUp() {
    if (counted) return;
    var strip = document.querySelector('.stat-strip');
    if (!strip) return;
    var rect = strip.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      counted = true;
      statNumbers.forEach(function (el) {
        var target = parseInt(el.dataset.target, 10);
        countUp(el, target, 800);
      });
    }
  }

  if ('IntersectionObserver' in window) {
    var strip = document.querySelector('.stat-strip');
    if (strip) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !counted) {
          counted = true;
          statNumbers.forEach(function (el) {
            countUp(el, parseInt(el.dataset.target, 10), 800);
          });
          observer.disconnect();
        }
      }, { threshold: 0.3 });
      observer.observe(strip);
    }
  } else {
    window.addEventListener('scroll', runCountUp, { passive: true });
    runCountUp();
  }
});

/* ── 7. Q&A Accordion (Interview Prep) ── */
document.addEventListener('DOMContentLoaded', function () {
  var qaCards = document.querySelectorAll('.qa-card');
  if (!qaCards.length) return;

  qaCards.forEach(function (card) {
    var question = card.querySelector('.qa-question');
    var answer = card.querySelector('.qa-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isOpen = card.classList.contains('open');

      // Close all others
      qaCards.forEach(function (c) {
        c.classList.remove('open');
        var a = c.querySelector('.qa-answer');
        if (a) a.style.maxHeight = '0';
      });

      // Toggle current
      if (!isOpen) {
        card.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });

    // Set initial state
    answer.style.maxHeight = '0';
  });
});
