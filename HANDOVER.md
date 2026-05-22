# Handover: Lexy Lamparelli Portfolio

Last updated: 2026-05-22

## Current state

- **Live in production** at `https://www.lexylamparelli.cv/`, hosted on **Vercel**
  (auto-deploys on push to `main`; bare domain redirects to `www`).
- Stack: single-page **Vite + React 19**, no router. Content is data-driven from
  `src/data/siteContent.js`; components are presentational.
- Version: **1.0.1** (`package.json`). 1.0.1 is a no-visual-change maintenance release
  (audit P2 + refactor Tier 2 CSS); 1.0.0 established the versioning baseline.

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

## Audit (2026-05-21)

Writing + design audit against `docs/MASTER_RULES_AI.md`, impeccable, and ui-ux-pro-max:
`docs/audits/2026-05-21-site-audit.md`. Health score 16/20 (Good), AI-slop PASS.

**Audit P1 resolved 2026-05-21:**
- Straight quotes: all curly apostrophes replaced (escaped in `siteContent.js` string literals).
- Mobile nav: closed nav is now `inert` + `aria-hidden`, so its links leave the tab order.
- Lightbox focus management: new `src/hooks/useModalA11y.js` (focus move + Tab trap + restore
  + scroll lock), used by both `CanvaGallery` and `SocialShowcase`; close button gets initial focus.

**Audit P2 resolved 2026-05-22 (v1.0.1):**
- `max-height` nav transition replaced with a `grid-template-rows` transition (no layout
  thrash, no magic `22rem`, reduced-motion guard) in `layout.css`.

Remaining audit items: copy voice pass (P2, needs client sign-off), image WebP + dimensions
(P2), decorative glyphs to SVG (P3). See the audit doc.

## Refactor & cleanup

Tier 1 of `docs/next-steps/refactor-cleanup-plan.md` is DONE (2026-05-21): deleted dead
`global.css`, removed `src.zip`, fixed `.gitignore`, scoped ESLint (`npm run lint` now clean,
0 errors). `public/readme.html` was kept (it is linked from the footer).

Tier 2 items 5 (dead-CSS sweep) and 7 (cream token) are DONE (2026-05-22, v1.0.1). Remaining
Tier 2: item 6 (reorganize styles by concern, Option A vs B not yet decided). Tier 3 to 4 remain.

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
