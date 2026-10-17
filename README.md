# Greenwood IT Consultancy

Website for [gitc.digital](https://gitc.digital)

## Structure

```
omega1119.github.io/
├── _config.yml              # Jekyll configuration
├── CNAME                    # Domain configuration (gitc.digital)
├── README.md
├── index.html               # Redirect shell (language detection) into en/
├── privacy.html             # Redirect shell into en/privacy.html
├── terms.html               # Redirect shell into en/terms.html
├── favicon.svg
├── assets/
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   ├── fonts/               # Self-hosted Inter
│   ├── images/
│   └── js/
│       ├── main.js          # Theme toggle, nav, footer, cookie consent
│       └── redirect.js      # Language redirect logic
└── en/                      # English locale
    ├── index.html           # Main landing page
    ├── privacy.html         # Privacy policy
    └── terms.html           # Terms of service
```

The site files live at the repository root, not in a `docs/` folder.

## Sections

- **Hero**: Company intro and tagline
- **Our Brands**: Harmonic Tools and Nullform Audio
- **About Us**: Company background and philosophy
- **Core Expertise**: Technical capabilities (Azure, M365, AI, Apple, DSP, Full-Stack)
- **Contact**: Email and GitHub links

## Localization

The site is English only today. See [MULTILINGUAL_SETUP.md](MULTILINGUAL_SETUP.md) for
how locales are structured and what adding one involves.

## Local Development

See [LOCAL_DEV.md](LOCAL_DEV.md). Quick start:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/en/`

## Deployment

The site is deployed via GitHub Pages from the root of the `main` branch. A push to
`main` publishes live, so open a pull request for changes.

## Related Repositories

- [harmonic-tools](https://github.com/omega1119/harmonic-tools): harmonic.tools website
- [nullform-audio](https://github.com/omega1119/nullform-audio): nullform.audio website