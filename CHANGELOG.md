# Changelog

All notable changes to the Lexy Lamparelli Portfolio are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## 2026-05-21 — SEO / AEO / GEO pass

### Added
- `public/robots.txt` — allows all crawlers plus explicit allow rules for AI/answer-engine bots (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended) and a `Sitemap:` reference.
- `public/sitemap.xml` — single-URL sitemap for the homepage with image entry for the social share preview.
- `public/llms.txt` — structured plain-text summary of who Lexy is, her skills/services, work, and contact links, for generative engines (GEO).
- JSON-LD structured data in `index.html` (`@graph` with `WebSite`, `ProfilePage`, and `Person`) covering name, alternate names, job titles, Boston location, employer, education, skills (`knowsAbout`), and social profiles (`sameAs`) — for rich results and answer engines (AEO).
- `<noscript>` content fallback in `index.html` so crawlers and LLM scrapers that don't run JavaScript still see the core bio, skills, and links (this is a client-rendered SPA).
- `<link rel="canonical">`, `author`, `keywords`, `og:site_name`, `og:locale`, and image `alt` meta tags.

### Changed
- `<title>` is now keyword-rich: "Lexy Lamparelli — Boston Content Creator & Social Media Marketing Portfolio".
- Meta description expanded with location and specialty keywords.
- Canonical host normalized to `https://www.lexylamparelli.cv/` (the bare domain 307-redirects to `www`); `og:url`, OG/Twitter image URLs updated to the `www` host.
- `robots` meta now includes `max-image-preview:large, max-snippet:-1` for richer search snippets.

### Notes
- Google Analytics tag (`G-41SSC36VTV`) left unchanged.
- Build verified with `npm run build`; all SEO files emit to `dist/` and JSON-LD validates.
- Restored working tree to the live production state before this pass (discarded an unrelated, abandoned set of uncommitted edits).
