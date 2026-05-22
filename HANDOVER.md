# Handover: Lexy Lamparelli Portfolio

Last updated: 2026-05-22

## Current state

- **Live in production** at `https://www.lexylamparelli.cv/`, hosted on **Vercel**
  (auto-deploys on push to `main`; bare domain redirects to `www`).
- Stack: single-page **Vite + React 19**, no router. Content is data-driven from
  `src/data/siteContent.js`; components are presentational.
- Version: **1.1.0** (`package.json`). 1.1.0 = site-wide scroll-reveal + glyph SVGs + visible
  bio twinkle; 1.0.2 = client-approved copy voice pass + degree icon SVG; 1.0.1 = maintenance
  (audit P2 nav + Tier 2 CSS); 1.0.0 baseline.

## ⚠️ Needs eyeball before/after v1.1.0 push

v1.1.0 is a **visual** change and was built in an environment with **no headless browser**, so
it was verified by build + lint + code reasoning only, NOT by screenshot. Before trusting it in
production, preview locally (`npm run dev`) and check:
- Scroll down: About, Skills, My Work, Canva, Social, Experience, Contact each fade/rise in.
  Nothing should stay invisible. Card grids should stagger.
- Bio section: the three white sparkles around the portrait twinkle and are clearly visible.
- Mobile width (<640px): reveals are subtler and quick; no content stuck hidden; no sideways
  scroll.
- Toggle OS "reduce motion": reveals and twinkle should be off (content shown immediately).
The reveal is gated by a `.reveal-ready` class the hook only adds when JS runs, and falls back
to instant-show if `IntersectionObserver` is missing, so a JS failure shows all content.

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

**Audit resolved 2026-05-22:**
- Copy voice pass (P2 #2, v1.0.2): de-triaded bio/intros, client-approved. Done.
- Decorative glyphs to SVG (P3): 🎓 (v1.0.2), then `✦` sparks + `◉` bullets (v1.1.0). The
  modal controls (`↗ ‹ › × →`) were already `aria-hidden`. P3 glyph item effectively done.

Remaining audit items: **image WebP + dimensions (P2 #4)** — see the dedicated build brief
`docs/next-steps/image-optimization-brief.md` (decision locked: WebP, 2 sizes, build-time
Vite plugin). Body font Inter (P3, optional) is the only other open item.

**New this session (v1.1.0): scroll-reveal motion.** Found that the reveal CSS was missing
entirely (the hook + `data-reveal` existed but did nothing). Added the CSS and extended reveal
to all content sections. See CHANGELOG 1.1.0 and the eyeball checklist above.

## Refactor & cleanup

Tier 1 of `docs/next-steps/refactor-cleanup-plan.md` is DONE (2026-05-21): deleted dead
`global.css`, removed `src.zip`, fixed `.gitignore`, scoped ESLint (`npm run lint` now clean,
0 errors). `public/readme.html` was kept (it is linked from the footer).

Tier 2 items 5 (dead-CSS sweep) and 7 (cream token) are DONE (2026-05-22, v1.0.1). Remaining
Tier 2: item 6 (reorganize styles by concern) — **decided: Option A** (group + co-locate in the
split files, NOT CSS Modules); do it last, internal-only, highest regression surface. Tier 3 to 4
remain. Image work (P2 #4 / Tier 2 #10) has its own brief (see above).

## Pending actions (next session)

- **Eyeball v1.1.0 visually** (see checklist above), then push to production if it holds.
- **Client email to Lexy** (owner: Codex, per Carlos): a short note that the site got a copy
  refresh, icon/visual polish, and new scroll animations. Not yet written or sent.
- Execute the **image-optimization brief** (biggest remaining perf win), then the Lighthouse
  pass (Tier 4 #12), then the Option-A CSS reorg.

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
