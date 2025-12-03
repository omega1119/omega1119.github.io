(function(){
  const root = document.documentElement;
  const themeBtn = document.querySelector('.theme-toggle');
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const yearEl = document.getElementById('year');

  // Language support: detect from URL path first, then stored, then browser
  function detectLangFromPath() {
    const p = window.location.pathname.toLowerCase();
    if (p.startsWith('/pl/') || p === '/pl/' || p.includes('/pl/privacy') || p.includes('/pl/terms')) return 'pl';
    if (p.startsWith('/ptpt/') || p === '/ptpt/' || p.includes('/ptpt/privacy') || p.includes('/ptpt/terms')) return 'ptpt';
    if (p.startsWith('/ptbr/') || p === '/ptbr/' || p.includes('/ptbr/privacy') || p.includes('/ptbr/terms')) return 'ptbr';
    if (p.startsWith('/es/')) return 'es';
    if (p.startsWith('/de/')) return 'de';
    if (p.startsWith('/fr/')) return 'fr';
    if (p.startsWith('/ja/')) return 'ja';
    if (p.startsWith('/ko/')) return 'ko';
    return null;
  }

  let currentLang = detectLangFromPath() || localStorage.getItem('language') || (navigator.language && navigator.language.split('-')[0]) || 'en';
  if (!translations[currentLang]) currentLang = 'en';

  function translate(key) {
    return translations[currentLang]?.[key] || translations.en[key] || key;
  }

  function updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translate(key);
      } else {
        el.textContent = translate(key);
      }
    });
    
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.setAttribute('title', translate(key));
      el.setAttribute('aria-label', translate(key));
    });

    root.setAttribute('lang', currentLang);
  }

  function setLanguage(lang) {
    if (translations[lang]) {
      currentLang = lang;
      localStorage.setItem('language', lang);
      updatePageLanguage();
      updateAppStoreBadges(lang);
      
      // Update language selector
      document.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
      });
    }
  }

  // Update App Store badges based on language
  function updateAppStoreBadges(lang) {
    // Map language codes to badge folder names
    const langToBadgeFolder = {
      'en': 'US',
      'es': 'ES',
      'de': 'DE',
      'fr': 'FR',
      'ja': 'JP',
      'ko': 'KR',
      'pl': 'PL',
      'ptpt': 'PTPT',
      'ptbr': 'PTBR'
    };
    
    const folder = langToBadgeFolder[lang] || 'US';
    
      // Determine base path (with or without ../ depending on page location)
      const isSubPage = window.location.pathname.includes('/products/');
      const pathPrefix = isSubPage ? '../' : './';
    
    // Update iOS App Store badges
    document.querySelectorAll('img[data-badge="ios"]').forEach(img => {
      const basePath = `${pathPrefix}assets/images/Download-on-the-App-Store`;
      img.src = `${basePath}/${folder}/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_${folder === 'US' ? 'US-UK' : folder}_RGB_blk_${getBadgeDate(folder, 'ios')}.svg`;
    });
    
    // Update macOS App Store badges
    document.querySelectorAll('img[data-badge="macos"]').forEach(img => {
      const basePath = `${pathPrefix}assets/images/Download-on-the-Mac-App-Store`;
      img.src = `${basePath}/${folder}/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_${folder === 'US' ? 'US-UK' : folder}_RGB_blk_${getBadgeDate(folder, 'macos')}.svg`;
    });
  }
  
  function getBadgeDate(folder, type) {
    // Map folder/type to specific badge file dates
    const dates = {
      ios: {
        'US': '092917',
        'ES': '100217',
        'DE': '092917',
        'FR': '100517',
        'JP': '100317',
        'KR': '100317',
        'PL': '092917',
        'PTPT': '092917',
        'PTBR': '092917'
      },
      macos: {
        'US': '092917',
        'ES': '100217',
        'DE': '092917',
        'FR': '100217',
        'JP': '100317',
        'KR': '100317',
        'PL': '092917',
        'PTPT': '092917',
        'PTBR': '092917'
      }
    };
    return dates[type]?.[folder] || '092917';
  }

  // Initialize language
  updatePageLanguage();
  updateAppStoreBadges(currentLang);

  // Language selector event
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(option.getAttribute('data-lang'));
    });
  });

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
  
  // Listen for system theme changes
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', (e) => {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      root.setAttribute('data-theme', newTheme);
      if (themeBtn) {
        themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      }
      updateThemeImages(newTheme);
    }
  });
  
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
