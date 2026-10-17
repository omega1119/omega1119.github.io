# Multilingual Support Setup

This site uses a static, per-language folder approach (no JavaScript-based translations).

## Supported Languages (current)

- **English**: `/en/`

Each language has its own fully rendered HTML pages. Language switching is done with
plain links.

## How It Works

- **Canonical content** lives under `/en/`.
- **Root URLs** (`/index.html`, `/privacy.html`, `/terms.html`) are small HTML redirect
  shells. `assets/js/redirect.js` sends the visitor to a locale folder using the
  `data-redirect-<lang>` attributes on its `<script>` tag, falling back to
  `data-default-lang`.
- **Language selector**: each page has a `.language-selector` element whose
  `data-languages` attribute is a JSON map of locale code to relative path, rendered by
  `assets/js/main.js`.
- **hreflang** is not written in the HTML and this site does not inject it today.
  `plugscope-app` and `harmonic-tools` inject it from a `HREFLANG_LANGS` array in
  `main.js`; copy that pattern here when a second locale is added.

## Adding Another Language (later)

1. Copy `/en/` to a new folder named after the locale (e.g. `/de/`) and translate the
   HTML copy.
2. Update the `data-languages` JSON on every page so each locale lists all the others.
3. Add a `data-redirect-<lang>` attribute for the new locale to the root redirect shells.
4. Add the locale to `LANG_NAMES` in `main.js` if it is not already there.

## Local Testing

Run a server at the repo root:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/en/`.
