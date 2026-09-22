# Muhammad Imran Shad — Portfolio

Senior React Native & Full-Stack Engineer · Lahore, Pakistan · 9+ years

[Website](https://imranshad.github.io/) · [Email](mailto:imran.shad@ymail.com) · [LinkedIn](https://linkedin.com/in/imranshad) · [GitHub](https://github.com/imranshad)

A lightweight, responsive portfolio built with semantic HTML and organized CSS. No framework, package install, API key, build step, or JavaScript is required to use the site. The page covers Goally, The Long Game, Pynwheel Tour & Touch, PaxAI, engineering expertise, work history, education, and contact.

## Local preview

From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [the local preview](http://127.0.0.1:8765). Stop the server with Ctrl+C. Opening `index.html` directly also works, although an HTTP server is preferable for checking assets and metadata.

## Files and editing

- `index.html`: content, navigation, project disclosures, SEO, and Person structured data.
- `assets/styles.css`: responsive layout, focus states, reduced-motion and print styles.
- `assets/favicon.svg`: original typographic favicon.
- `assets/social-card.svg`: editable, original sharing artwork; `social-card.png` is its 1200 × 630 export used in Open Graph metadata.
- `sitemap.xml` and `robots.txt`: public indexing metadata.
- `scripts/check-site.cjs`: optional browser checks, separate from the site runtime.
- `docs/delivery-notes.md`: content corrections, verification evidence, and outstanding items.

All displayed fonts are system fonts. Existing files in `public/fonts` remain preserved but are not loaded. Their old README describes an unrelated application and is not a dependency of this portfolio. The original MIT license is unchanged.

The original `#projects` and `#skills` fragments continue to work as aliases for Work and Expertise. Navigation stays visible on small screens. Project details use native HTML disclosures and work without JavaScript.

## GitHub Pages publishing

Read-only GitHub API inspection on 22 September 2026 confirmed that this repository publishes from **`main`, `/` (root)**, with the legacy branch-based Pages build and no custom domain. There is no tracked Pages workflow or CNAME file. This change preserves that configuration.

After reviewing and explicitly approving publication, merge the portfolio changes into `main` and push through the normal repository workflow. GitHub Pages will publish the files from the root. Monitor the Pages deployment in the repository’s Actions / Settings → Pages UI. Do not upload only `index.html`; the `assets` directory must be published with it.

Publishing follows explicit owner approval. Canonical, social-image, and sitemap URLs point to `https://imranshad.github.io/`; the included social image is served from `/assets/social-card.png` after publication.

## Optional browser checks

With Node.js and Playwright available in your development environment, start the preview server, then run:

```sh
node scripts/check-site.cjs
```

If Playwright is installed outside this checkout, set `PLAYWRIGHT_MODULE` to the absolute path of its package. Optional variables: `SITE_URL` (default `http://127.0.0.1:8765`) and `QA_OUTPUT` (default `/tmp/portfolio-qa`). Browser installation is a development concern and is not required to serve the website.

The script checks widths 320, 375, 768, 1024, and 1440px, local assets, anchors, keyboard focus, native disclosures, metadata, reduced motion, and use without JavaScript. It produces full-page screenshots and a JSON result. It does not verify external destinations, send email, or place phone calls.

## Content boundaries

Professional facts come from the owner’s supplied brief. Metrics are attributed to Goally or Intagleo rather than reassigned to individual apps. Pynwheel mobile work is kept separate from other Intagleo MERN work. PaxAI is presented as a React/Node.js contribution; no ownership, benchmark-design, or evaluation-methodology claims are made.

No résumé was present, so there is no download action. Add a relevant, reviewed résumé before introducing one. A public URL for the specific PaxAI evaluation platform still needs confirmation; no guessed destination is published. Commercial project source code is proprietary.
