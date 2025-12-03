# Local Development (Python Static Server)

This site is a static HTML/CSS/JS site under the `docs/` folder. The fastest way to preview locally is to serve the `docs/` directory with Python’s built‑in HTTP server.

## Prerequisites
- macOS with Python 3 installed (`python3 --version`)
- Default shell: zsh

## Start the server
```zsh
cd "/repos/omega1119.github.io/docs"
python3 -m http.server 8080
```

## Open in the browser
- Visit: `http://localhost:8080/`
- English landing: `http://localhost:8080/`
- Polish: `http://localhost:8080/pl/`
- Portuguese (Portugal): `http://localhost:8080/ptpt/`
- Portuguese (Brazil): `http://localhost:8080/ptbr/`
- Product pages:
  - BeatBar (macOS): `http://localhost:8080/products/beatbar.html`
  - BeatBar Pocket (iOS): `http://localhost:8080/products/beatbar-pocket.html`
  - BeatLab (macOS): `http://localhost:8080/products/beatlab.html`
  - BeatLab iOS: `http://localhost:8080/products/beatlab-ios.html`

## Stop the server
- Press `Ctrl+C` in the terminal.

## Troubleshooting
- If App Store badges don’t load, ensure you are serving from the `docs/` folder root. Relative image paths rely on `docs` being the server root.
- Clear cache/hard refresh if assets look stale.
- If port 8080 is in use, pick another port:
```zsh
python3 -m http.server 9000
```

## Optional: Node http-server
```zsh
npm install -g http-server
cd "/repos/omega1119.github.io/docs"
http-server -p 8080
```

## Optional: Jekyll (GitHub Pages style)
If you want to emulate a Jekyll build:
```zsh
cd "/repos/omega1119.github.io"
jekyll serve --source docs --livereload
```
Then visit `http://localhost:4000/`.
