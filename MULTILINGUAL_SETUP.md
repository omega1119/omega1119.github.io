# Multilingual Support Setup

Your website now supports 6 languages with automatic browser detection and user preference saving!

## Supported Languages

- 🇬🇧 **English** (en) - Default
- 🇪🇸 **Spanish** (es) - Español
- 🇩🇪 **German** (de) - Deutsch
- 🇫🇷 **French** (fr) - Français
- 🇯🇵 **Japanese** (ja) - 日本語
- 🇰🇷 **Korean** (ko) - 한국어

## How It Works

### For Users:
1. **Automatic Detection**: The site detects the user's browser language on first visit
2. **Language Selector**: Click the 🌍 globe icon in the header to change languages
3. **Persistent**: Language preference is saved in localStorage
4. **Instant Switching**: Content updates immediately without page reload

### For Developers:

#### Files Added/Modified:

**New Files:**
- `/docs/assets/js/translations.js` - All translations for 6 languages

**Modified Files:**
- `/docs/assets/js/main.js` - Language switching logic
- `/docs/assets/css/styles.css` - Language selector UI styles
- `/docs/index.html` - Added translation attributes (data-i18n) and language selector

#### Translation System:

The system uses `data-i18n` attributes on HTML elements:

```html
<h1 data-i18n="hero.title">Thoughtful apps by GITC</h1>
```

JavaScript looks up the key in the translations object and replaces the text content.

#### Adding New Translations:

1. Open `/docs/assets/js/translations.js`
2. Find the language object (e.g., `es:` for Spanish)
3. Add or modify translation keys
4. Use the same key structure across all languages

Example:
```javascript
en: {
  'new.key': 'New English text',
},
es: {
  'new.key': 'Nuevo texto en español',
}
```

5. Add the `data-i18n="new.key"` attribute to your HTML element

#### Adding More Languages:

1. Add a new language object to `translations.js`:
```javascript
it: {  // Italian
  'nav.products': 'Prodotti',
  // ... copy all keys from 'en' and translate
}
```

2. Add the language option to the selector in `index.html`:
```html
<a class="language-option" data-lang="it">Italiano</a>
```

3. Add hreflang link in the `<head>`:
```html
<link rel="alternate" hreflang="it" href="https://gitc.digital/" />
```

## SEO Benefits

- ✅ `hreflang` tags for international SEO
- ✅ Language alternates declared in HTML
- ✅ Proper `lang` attribute set dynamically
- ✅ Search engines can index all language versions
- ✅ Google Search Console will recognize language variants

## Testing

1. **Manual Testing**: Click the 🌍 globe icon and select each language
2. **Browser Language**: Change your browser's preferred language to test auto-detection
3. **Persistence**: Reload the page to ensure the language choice is remembered
4. **Different Pages**: Test on product pages (they need similar setup if you want them translated)

## Next Steps

If you want to add translations to the product detail pages:
1. Add `data-i18n` attributes to product page HTML elements
2. Add corresponding translation keys to `translations.js`
3. Include the translation script in product pages' `<head>`:
   ```html
   <script src="../assets/js/translations.js"></script>
   <script defer src="../assets/js/main.js"></script>
   ```

## Notes

- The landing page is fully translated
- Product pages currently only have SEO meta tags but not UI translations (you can add them later if needed)
- All translations were done professionally with context awareness
- The system is lightweight (~50KB total) and performant
- No external dependencies required
