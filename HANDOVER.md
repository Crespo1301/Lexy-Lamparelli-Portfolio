# Handover: Lexy Lamparelli Portfolio

Last updated: 2026-05-21

## Current state

- **Live in production** at `https://www.lexylamparelli.cv/`, hosted on **Vercel**
  (auto-deploys on push to `main`; bare domain redirects to `www`).
- Stack: single-page **Vite + React 19**, no router. Content is data-driven from
  `src/data/siteContent.js`; components are presentational.
- Version: **1.0.0** (`package.json`). Versioning baseline established this session.

## Shipped this session (all pushed to `main`)

1. **SEO/AEO/GEO pass** (commit `355c6e3`): meta/canonical/JSON-LD/`<noscript>` in
   `index.html`, plus `public/robots.txt`, `sitemap.xml`, `llms.txt`.
2. **"My Work" redesign, favicon, em-dash cleanup, docs, versioning** (follow-up commit,
   tagged `v1.0.0`):
   - "My Work" reworked as an image-free editorial directory (cream cards, faded italic
     serif index numerals, title, caption, hover arrow). Files: `WorkDirectory.jsx`,
     `content.css`, `siteContent.js`.
   - New brand favicon `public/favicon.svg` (italic serif "L", cream on red).
   - Em dashes removed from all site content (`index.html`, `Footer.jsx`, `llms.txt`,
     `readme.html`).
   - Docs: `CHANGELOG.md`, `README.md`, `package.json` (1.0.0),
     `docs/next-steps/refactor-cleanup-plan.md`, this file.

## Post-deploy checks

- Confirm `/robots.txt`, `/sitemap.xml`, `/llms.txt` resolve (200) on the live site.
- Confirm the new favicon shows in the browser tab (hard-refresh; browsers cache favicons).
- Confirm the `#my-work` section renders the new image-free cards.
- Submit the sitemap in Google Search Console; request homepage indexing.

## Next phase: refactor & cleanup

See `docs/next-steps/refactor-cleanup-plan.md`. Highest-value first items:
- Delete dead `src/styles/global.css` (1,103 lines, not imported).
- Remove stale `src.zip`; fix `.gitignore` gaps (`.mcp.json`, `.code-review-graph/`, `*.zip`).
- Add `ignores` to `eslint.config.js` so `npm run lint` is clean (today's 60 errors are all
  from vendored skill scripts, not real source).

Note: `public/readme.html` is linked from the footer ("Project README"), so it is NOT a
stray. Keep and maintain it, or remove both the file and the footer link together.

## Carried-over follow-ups

- Bump `sitemap.xml` `lastmod` on content changes.
- Consider prerender/SSG for stronger indexing of client-rendered content (plan Tier 4).
- The favicon uses `<text>` with a serif fallback (Cormorant is not embedded). For
  pixel-exact Cormorant at all sizes, convert the glyph to a vector path later.

## How to work here

- `npm run dev` / `npm run build` / `npm run preview` / `npm run lint`.
- Edit copy in `src/data/siteContent.js`; components read from it.
- Workflow (CLAUDE.md): Claude handles design/SEO direction and critique; Codex implements,
  documents, and owns version tags. (This session, the user asked Claude to push directly.)
