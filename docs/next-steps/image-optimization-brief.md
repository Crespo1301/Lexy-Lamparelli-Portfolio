# Build Brief: Image Optimization (audit P2 #4 / refactor plan Tier 2 #10)

Status: **planned, not started.** Created 2026-05-22. To be executed in a later session
(by Codex, Claude, or Carlos). This is a self-contained brief: read it top to bottom and
you have everything needed to do the work.

## Why

The Canva gallery and social showcase ship ~6.9 MB of PNGs (largest ~1.5 MB), all rendered
with no `width`/`height`. This is the site's biggest remaining performance problem: heavy
LCP and layout shift (CLS) on first view, worst on mobile data. The "My Work" directory is
image-free and not affected.

## Decision (locked by senior-dev review 2026-05-22)

- **Format: WebP only.** No AVIF, no `<picture>` PNG fallback. WebP has universal browser
  support in 2026; AVIF + `<picture>` adds encode time and markup for marginal gain on ~12
  images. (If belt-and-suspenders is ever wanted, the only change is wrapping each `<img>`
  in `<picture>` with a PNG `<source>`.)
- **Two sizes per asset:** ~480px-wide card thumbnail and ~1200px-wide modal image.
- **Explicit `width`/`height`** on every `<img>` (not bare `aspect-ratio`) — intrinsic sizes
  are known and fixed, the most robust CLS fix.
- **Build-time generation via a Vite plugin** (`vite-imagetools` preferred, or
  `vite-plugin-image-optimizer`). Not manual export — manual drifts the moment an asset is
  swapped, and there is no test suite to catch it.

## What exists already (use it)

`src/data/siteContent.js` already has the right data shape, mostly unused:
- Canva items: `image` (full), some have `previewImage` (e.g. `canva-work-2-preview.png`).
- Social items: `thumbnail`, optional `modalImage`.

The components already separate card vs modal rendering:
- `src/components/CanvaGallery.jsx`: card `<img>` ~line 137-145 (`gallery-media`), modal
  `<img>` in the `gallery-modal-media` block. Currently the modal reuses the full card PNG.
- `src/components/SocialShowcase.jsx`: card `social-preview-image` (`item.thumbnail`), modal
  `social-modal-image` (`item.modalImage || item.thumbnail`).

## Steps

1. Add the plugin: `npm i -D vite-imagetools` (or `vite-plugin-image-optimizer`), register in
   `vite.config.js`.
2. Decide source-of-truth: keep originals under `public/assets/...` or move to `src/assets`
   so the plugin can transform on import. `vite-imagetools` works on imported assets, so
   importing from `src/assets` with `?w=480;1200&format=webp&as=picture` (or `srcset`) is the
   clean path. If keeping `public/`, use `vite-plugin-image-optimizer` which optimizes in place.
3. Generate 480w (card) and 1200w (modal) WebP variants for every Canva and social image.
4. Wire the card `<img>` to the 480w variant, the modal `<img>` to the 1200w variant.
5. Add `width`/`height` (intrinsic px of each variant) to every `<img>`. The gallery cards
   use `aspect-ratio` already in CSS; keep that and add the attributes for the browser's
   pre-layout reservation.
6. Keep `loading="lazy"` and `decoding="async"` (already present).
7. Build, then run **Lighthouse** (this closes refactor plan Tier 4 #12). Target: no CLS from
   gallery/social images, LCP image well under 200 KB.

## Acceptance

- Total image transfer for the gallery + social sections drops by ~70-80%.
- No layout shift when images load (DevTools > Performance > Experience, or Lighthouse CLS).
- Card and modal both render WebP at the right size; modal is sharper than the card.
- `npm run build` clean; visual smoke test of gallery + social on desktop and mobile.

## Out of scope

- The "My Work" directory (image-free).
- Re-exporting the favicon or OG share image (`sitemap.xml` references an OG image; leave it).
