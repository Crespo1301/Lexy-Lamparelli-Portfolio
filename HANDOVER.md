# Handover — Lexy Lamparelli Portfolio

Last updated: 2026-05-21

## Current state

- Working tree is at the **live production state** (`origin/main`, commit `a414f4a "analytics"`) plus the SEO/AEO/GEO changes from this session.
- An earlier, unrelated set of uncommitted edits (~1,145 lines across components/styles) was **abandoned and discarded** at the client's direction — it is not recoverable and was never live.
- Hosting: **Vercel**. Canonical domain is `https://www.lexylamparelli.cv/` (bare domain 307-redirects to `www`).
- Stack: single-page **Vite + React 19** app, no router. Content is data-driven from `src/data/siteContent.js`.

## What changed this session (SEO / AEO / GEO)

See `CHANGELOG.md` for the full list. Summary:
- `index.html`: improved title/description/meta, canonical, JSON-LD (`Person` + `WebSite` + `ProfilePage`), `<noscript>` content fallback.
- New static files served at site root via `public/`: `robots.txt`, `sitemap.xml`, `llms.txt`.

## Not yet done / next steps

- **Changes are committed-pending**: the SEO files are unstaged. Codex to review, commit, and push to deploy via Vercel.
- **Verify after deploy**: confirm `https://www.lexylamparelli.cv/robots.txt`, `/sitemap.xml`, and `/llms.txt` resolve in production.
- **Submit sitemap** in Google Search Console (and Bing Webmaster) once live; request indexing for the homepage.
- **`sitemap.xml` `lastmod`** is hardcoded to `2026-05-21`; bump it on future content changes.
- **SPA indexing limitation**: real page content is client-rendered. The `<noscript>` block + JSON-LD cover the basics for non-JS crawlers, but for stronger SEO consider prerendering/SSG (e.g. a Vite prerender plugin) so the full DOM is in the served HTML. Larger change — out of scope for this quick pass.
- **OG image**: `social-share-preview.png` exists and is referenced; confirm it still reads as intended (alt text was updated away from the old "placeholder" wording).
- Optional: add per-section anchors to the sitemap if those become shareable landing targets.

## How to work here

- `npm run dev` / `npm run build` / `npm run preview` / `npm run lint`.
- Edit copy in `src/data/siteContent.js` — components are presentational and read from it.
- Per CLAUDE.md workflow: Claude handles design/SEO direction; Codex implements, documents, commits, pushes, versions.
