// Language redirect script
(function() {
  const script = document.currentScript;
  const defaultLang = script.getAttribute('data-default-lang') || 'en';
  const timeout = parseInt(script.getAttribute('data-country-timeout-ms'), 10) || 2500;
  
  // Get supported languages from data attributes
  const supportedLangs = [];
  for (const attr of script.attributes) {
    if (attr.name.startsWith('data-redirect-')) {
      const lang = attr.name.replace('data-redirect-', '');
      supportedLangs.push(lang);
    }
  }
  
  function getRedirectUrl(lang) {
    return script.getAttribute(`data-redirect-${lang}`) || script.getAttribute(`data-redirect-${defaultLang}`);
  }
  
  function detectLanguage() {
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    if (supportedLangs.includes(langCode)) {
      return langCode;
    }
    
    return defaultLang;
  }
  
  function redirect() {
    const lang = detectLanguage();
    const url = getRedirectUrl(lang);
    if (url) {
      window.location.replace(url);
    }
  }
  
  // Redirect after a short delay or immediately
  setTimeout(redirect, 100);
})();
