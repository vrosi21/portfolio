# vrosi21.pages.dev

My CV and project portfolio. One static page, two tabs (`#projects`, `#cv`), no framework
and no build step.

- `index.html` holds all the content, so it reads fine without JavaScript (both sections
  show one after the other)
- `app.js` switches tabs from the URL hash, filters projects and toggles the theme
- `_headers` sets the Content-Security-Policy and other headers on Cloudflare Pages.
  If the inline theme script in `index.html` changes, update its sha256 there.
- `kemal-sivro-cv.pdf` is the downloadable CV

Deployed on Cloudflare Pages from `main`: no build command, output directory `/`.
