(function(){
  const root = document.documentElement;
  const themeBtn = document.querySelector('.theme-toggle');
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const yearEl = document.getElementById('year');

  // Theme-aware <picture> swapping
  function updateThemeImages(theme) {
    // First: explicit theme-src swapping (used for store badges).
    document.querySelectorAll('img[data-theme-src-light][data-theme-src-dark]').forEach((img) => {
      const lightSrc = img.getAttribute('data-theme-src-light') || '';
      const darkSrc = img.getAttribute('data-theme-src-dark') || '';
      const targetSrc = theme === 'light' ? lightSrc : darkSrc;
      if (!targetSrc) return;
      if (img.getAttribute('src') !== targetSrc) img.setAttribute('src', targetSrc);
    });

    document.querySelectorAll('picture').forEach((picture) => {
      const darkSource = picture.querySelector('source[data-theme="dark"]');
      const img = picture.querySelector('img');
      if (!darkSource || !img) return;

      // Persist the light (default) and dark sources once.
      if (!img.hasAttribute('data-default-src')) {
        img.setAttribute('data-default-src', img.getAttribute('src') || '');
      }
      if (!darkSource.hasAttribute('data-dark-srcset')) {
        darkSource.setAttribute('data-dark-srcset', darkSource.getAttribute('srcset') || '');
      }

      const defaultSrc = img.getAttribute('data-default-src') || '';
      const darkSrcset = darkSource.getAttribute('data-dark-srcset') || '';

      const shouldEnableDarkSource = theme === 'dark';

      if (shouldEnableDarkSource) {
        // Ensure the themed <source> is present, and also set <img> as a hard fallback.
        if (darkSrcset) darkSource.setAttribute('srcset', darkSrcset);
        if (darkSrcset) img.setAttribute('src', darkSrcset);
      } else {
        // Disable the themed <source> so the <img> wins.
        // Removing `srcset` tends to be more reliable than toggling `media`.
        darkSource.removeAttribute('srcset');
        if (defaultSrc) img.setAttribute('src', defaultSrc);
      }
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    updateThemeImages(theme);
  }

  // Theme: keep the last-commit behavior (localStorage key `theme`, system-follow when unset)
  const stored = (() => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', (e) => {
      // Only follow system if user hasn't manually set a preference
      let hasStored = false;
      try { hasStored = !!localStorage.getItem('theme'); } catch { hasStored = false; }
      if (hasStored) return;
      applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch { /* ignore */ }
      applyTheme(next);
    });
  }

  // Mobile nav
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // Year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Optional email obfuscation helper (kept from last commit)
  document.querySelectorAll('[data-email]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const val = a.getAttribute('data-email');
      if (!val) return;
      const [user, domain] = val.split('|');
      if (!user || !domain) return;
      const mailto = `mailto:${user}@${domain}`;
      a.textContent = `${user}@${domain}`;
      a.setAttribute('href', mailto);
    });
  });
})();
