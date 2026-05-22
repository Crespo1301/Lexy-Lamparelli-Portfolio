# Changelog

All notable changes to the Lexy Lamparelli Portfolio are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/); this project
uses [Semantic Versioning](https://semver.org/). Versioning baseline starts at
`1.0.0` (the project was unversioned, `0.0.0`, before this).

## [1.0.2] - 2026-05-22

Copy voice pass (client-approved) + icon polish. Tag `v1.0.2`. Build verified;
no em dashes or banned words; quotes already straight.

### Changed
- **Copy voice pass** (`src/data/siteContent.js`, audit P2 item 2): de-triaded the
  bio and section intros that leaned on stacked rule-of-three lists and press-release
  cadence. Varied list length (some pairs, one single, one deliberate longer list),
  warmed the bio into first person, and cut buzz-pairs ("creative thinking and polished
  execution") and repeated "elevated" phrasing. All facts, titles, companies, and the
  under-a-year promotion preserved. Client (Lexy) signed off on copy edits.
- **Degree icon** (`SkillsSection.jsx`, `content.css`): replaced the 🎓 emoji with an
  inline SVG mortarboard that inherits the brand red via `currentColor` and is
  `aria-hidden` (decorative; the degree text sits beside it). Crisper at all sizes and
  consistent with the brand. Partially addresses audit P3 (decorative glyphs to SVG);
  the `✦` sparks and `◉` list bullets remain as glyphs.

## [1.0.1] - 2026-05-22

Maintenance release: audit P2 + refactor Tier 2 CSS consolidation. Tag `v1.0.1`.
No visual or content changes; build verified, lint clean (one pre-existing Tier 3
hook warning remains).

### Added
- `--cream-light: #fff6f3` token in `tokens.css`. The lighter on-red cream was
  hardcoded in 10 places (8 in `portfolio.css`, 2 in `content.css`); all now use
  the token. Refactor plan Tier 2 item 7.

### Changed
- **Mobile nav transition** (`layout.css`): replaced the `max-height` animation
  (which animates a layout property and relied on a magic `22rem` cap) with a
  `grid-template-rows: 0fr -> 1fr` transition. No layout thrash, no magic number,
  and a `prefers-reduced-motion` guard disables the transition. Audit P2 item 3.

### Removed
- **Dead CSS** (refactor plan Tier 2 item 5): orphan classes with no JS reference,
  confirmed against component markup, removed across four files: `.gallery-grid`
  (the gallery uses `.gallery-scroll`), `.social-scroll` + its scrollbar pseudos
  and `.social-card-scroll` (the social section uses `.social-grid`/`.social-card`),
  and `.topbar-chip` / `.topbar-label` (unused topbar variants). Net -34 lines of CSS.

## [1.0.0] - 2026-05-21

First formally versioned production release. Tag `v1.0.0`.

### Added
- `public/robots.txt`: allows all crawlers plus explicit allow rules for AI/answer-engine
  bots (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended)
  and a `Sitemap:` reference.
- `public/sitemap.xml`: homepage URL with image entry for the social share preview.
- `public/llms.txt`: structured plain-text summary for generative engines (GEO).
- JSON-LD structured data in `index.html` (`@graph`: `WebSite`, `ProfilePage`, `Person`)
  for rich results and answer engines (AEO).
- `<noscript>` content fallback in `index.html` so non-JS crawlers and LLM scrapers see the
  core bio, skills, and links (this is a client-rendered SPA).
- `<link rel="canonical">`, `author`, `keywords`, `og:site_name`, `og:locale`, image `alt`.
- Context captions (`meta`) for the "My Work" cards in `siteContent.js`.
- `docs/next-steps/refactor-cleanup-plan.md`: cleanup backlog.
- `HANDOVER.md`, `CHANGELOG.md`.

### Changed
- **New favicon** (`public/favicon.svg`): replaced the off-brand purple template mark with
  a brand monogram, an italic serif "L" in cream on the brand red, matching the site's
  script-capital motif.
- **"My Work" section redesigned** (`WorkDirectory.jsx`, `content.css`, `siteContent.js`):
  dropped the gradient placeholder tiles and oversized "view section" pills. Now an
  editorial, image-free directory: cream cards on the red section, a large faded italic
  serif index numeral per card, title, a short caption, and a "View" arrow that shifts on
  hover. Subtle lift on hover (transform only), `prefers-reduced-motion` honored, visible
  focus outline. Removed the unused `.placeholder-wave/-bloom/-cloud/-floral` classes.
  (An image-led version was tried first; the available images did not fit, so the section
  was reworked without images.)
- **Em dashes removed** from all site content per brand copy preference: `index.html`
  (title, image alts, JSON-LD name, noscript heading), `Footer.jsx` credit, `public/llms.txt`,
  and `public/readme.html`. Title separators use `|`; inline cases use commas or colons.
- `<title>` now keyword-rich; meta description expanded with location/specialty keywords.
- Canonical host normalized to `https://www.lexylamparelli.cv/` (bare domain redirects to
  `www`); `og:url` and OG/Twitter image URLs updated to the `www` host.
- `robots` meta now includes `max-image-preview:large, max-snippet:-1`.
- `README.md`: corrected live URL to `https://www.lexylamparelli.cv/` and updated status
  from "ready for review" to "live in production / active maintenance".

### Notes
- Google Analytics tag (`G-41SSC36VTV`) unchanged.
- Build verified with `npm run build`; touched source lints clean; no em dashes remain in
  shipped source or the `dist/` build.
- Working tree was restored to the live production state before this work began; an
  unrelated, abandoned set of uncommitted edits was discarded (never live, not recovered).
- The SEO/AEO/GEO files were first pushed in commit `355c6e3`; the redesign, favicon,
  em-dash cleanup, and docs shipped in the follow-up commit tagged `v1.0.0`.
