# Greenwood IT Consultancy

Website for [gitc.digital](https://gitc.digital)

## Structure

```
omega1119.github.io/
├── _config.yml              # Jekyll configuration
├── CNAME                    # Domain configuration (gitc.digital)
├── README.md
└── docs/                    # GitHub Pages root
    ├── index.html           # Redirect page (language detection)
    ├── favicon.svg
    ├── assets/
    │   ├── css/
    │   │   └── styles.css   # Main stylesheet
    │   ├── images/
    │   └── js/
    │       ├── main.js      # Theme toggle & utilities
    │       └── redirect.js  # Language redirect logic
    └── en/                  # English locale
        ├── index.html       # Main landing page
        ├── privacy.html     # Privacy policy
        └── terms.html       # Terms of service
```

## Sections

- **Hero** — Company intro and tagline
- **Our Brands** — Harmonic Tools and Nullform Audio
- **About Us** — Company background and philosophy
- **Core Expertise** — Technical capabilities (Azure, M365, AI, Apple, DSP, Full-Stack)
- **Contact** — Email and GitHub links

## Localization

The site is structured to support multiple languages in the future. To add a new language:

1. Create a new folder under `docs/` (e.g., `docs/de/` for German)
2. Copy the English files and translate content
3. Update `docs/index.html` to add the new language redirect
4. Update language selectors in all HTML files

## Local Development

Open `docs/en/index.html` in a browser, or use a local server:

```bash
cd docs && python3 -m http.server 8080
```

Then visit `http://localhost:8080/en/`

## Deployment

The site is deployed via GitHub Pages from the `docs/` folder on the `main` branch.

## Related Repositories

- [harmonic-tools](https://github.com/omega1119/harmonic-tools) — harmonic.tools website
- [nullform-audio](https://github.com/omega1119/nullform-audio) — nullform.audio website