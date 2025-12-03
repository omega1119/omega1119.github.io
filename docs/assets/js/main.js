(function(){
  const root = document.documentElement;
  const themeBtn = document.querySelector('.theme-toggle');
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const yearEl = document.getElementById('year');

  // Update theme-aware images
  function updateThemeImages(theme) {
    document.querySelectorAll('picture').forEach(picture => {
      const darkSource = picture.querySelector('source[data-theme="dark"]');
      const img = picture.querySelector('img');
      if (darkSource && img) {
        if (theme === 'dark') {
          img.src = darkSource.getAttribute('srcset');
        } else {
          // Reset to the default (light) src
          const defaultSrc = img.getAttribute('data-default-src');
          if (defaultSrc) {
            img.src = defaultSrc;
          }
        }
      }
    });
  }

  // Theme
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);
  
  // Store default image sources and update images for initial theme
  document.querySelectorAll('picture img').forEach(img => {
    if (!img.hasAttribute('data-default-src')) {
      img.setAttribute('data-default-src', img.src);
    }
  });
  updateThemeImages(initial);
  
  if(themeBtn){
    themeBtn.textContent = initial === 'dark' ? '☀️' : '🌙';
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
      updateThemeImages(next);
    });
  }

  // Mobile nav
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      const isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // Year
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Email obfuscation: contact|gitc.digital => contact@gitc.digital
  document.querySelectorAll('[data-email]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const val = a.getAttribute('data-email');
      const [user, domain] = val.split('|');
      const mailto = `mailto:${user}@${domain}`;
      a.textContent = `${user}@${domain}`;
      a.setAttribute('href', mailto);
    });
  });
})();
