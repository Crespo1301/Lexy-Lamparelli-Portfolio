# Site Audit: Writing + Design

Date: 2026-05-21. Method: review against `docs/MASTER_RULES_AI.md`, impeccable
`audit` heuristics + deterministic detector (`npx impeccable --json src`), and
ui-ux-pro-max UX guidelines. This is a documentation pass; nothing was changed.
Recommended next steps are at the bottom.

## Health score (impeccable audit, 0-4 per dimension)

| # | Dimension | Score | Key finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3 | Mobile nav links stay keyboard-focusable while the menu is closed; modal has no focus trap/restore |
| 2 | Performance | 3 | `max-height` transition on mobile nav; large unoptimized Canva PNGs with no width/height (CLS risk) |
| 3 | Theming | 3 | Solid token system, but `#fff6f3` is hard-coded in many files instead of a token |
| 4 | Responsive | 3 | Multiple breakpoints, collapses cleanly; a few small touch targets and a magic `max-height` cap |
| 5 | Anti-patterns (AI slop) | 4 | Distinctive and intentional; no common AI tells |
| **Total** | | **16/20** | **Good (address the weak spots, no overhaul needed)** |

## AI-slop verdict: PASS

This does not read as AI-generated. It commits to a single brand color (deep red),
uses an editorial serif display face (Cormorant Garamond) with an italic script-capital
motif, and avoids the usual tells: no gradient text, no glassmorphism, no hero-metric
template, no dark-glow palette. The lightbox and the new image-free "My Work" directory
are intentional choices, not defaults. The only detector flag here is the body font Inter
(very common), which is minor because the serif display already carries the personality.

## Writing review against MASTER_RULES_AI.md

### Resolved
- **Em dashes (severity 5):** removed from all site content on 2026-05-21. None remain.
- **Banned words** (delve, moreover, furthermore, albeit, indeed, certainly): none present.
- **Ellipses:** none present.

### Open findings

1. **[P1] Smart/curly quotes (severity 2).** The rules require straight quotes. Seven
   curly apostrophes remain in shipped copy:
   - `src/data/siteContent.js`: lines 205, 218, 231, 245 (`Alexia’s`) and 268 (`Let’s Work Together`)
   - `src/components/CanvaGallery.jsx`: line 123 (`Alexia’s`)
   - `src/components/SocialShowcase.jsx`: line 79 (`Alexia’s`)
   Fix: replace `’` with `'`. Quick, mechanical, low risk.

2. **[P2] Over-polished prose + rule-of-three habit (severity 4-5).** The bio and section
   intros lean on stacked triads and press-release phrasing, which is exactly the pattern
   the rules call out. Examples:
   - "relocations, extended stays, and corporate assignments"
   - "clear communication, strong organization, and a client-first mindset"
   - "social media strategy, content creation, and hospitality marketing"
   - "creative thinking and polished execution"
   These are factual, so they are not wrong, but the cadence is uniform. Fix: vary list
   length (some pairs, some single, one longer list), and loosen one or two sentences into
   a more conversational voice. This is the client's bio, so changes need her sign-off.

## Design + a11y findings (impeccable + ui-ux-pro-max)

1. **[P1] Mobile nav links are focusable when the menu is closed.**
   `src/components/Navbar.jsx` keeps the mobile `<nav>` in the DOM and hides it with
   `max-height: 0; overflow: hidden` (`layout.css:85`). The links stay in the tab order
   and are reachable by screen readers even when visually collapsed. Fix: toggle `hidden`
   or `inert` on the closed nav (or `visibility: hidden`), and/or `aria-hidden`. WCAG 2.4.3.

2. **[P1] Modal lacks focus management.** `SocialShowcase.jsx` (and likely `CanvaGallery.jsx`)
   handles Escape and arrow keys and locks body scroll, which is good, but focus is not
   moved into the dialog on open, not trapped while open, and not restored to the trigger
   on close. Keyboard users can tab out behind the overlay. Fix: focus the close button on
   open, trap Tab within the panel, restore focus on close. WCAG 2.4.3 / 2.1.2.

3. **[P2] `max-height` transition causes layout thrash.** RESOLVED 2026-05-22 (v1.0.1):
   replaced with a `grid-template-rows: 0fr -> 1fr` transition, magic `22rem` removed,
   `prefers-reduced-motion` guard added. Original finding below. `layout.css:88`
   (`transition: max-height 0.3s`) animates a layout property. The detector also flags the
   same pattern in the dead `global.css`. Fix: animate `transform`/`opacity`, or use a
   `grid-template-rows: 0fr -> 1fr` technique. Also, `mobile-nav-open { max-height: 22rem }`
   is a magic number that will clip if nav items grow.

4. **[P2] Large unoptimized images with no dimensions.** Canva and social PNGs are heavy
   and rendered without explicit `width`/`height`, risking layout shift (CLS) and slow LCP.
   Fix: serve WebP/AVIF and set intrinsic `width`/`height` (or `aspect-ratio`) on `<img>`.
   The "My Work" section no longer uses images, so this applies to the Canva gallery and
   social showcase.

5. **[P3] Decorative unicode glyphs instead of SVG.** `✦` sparks in `About.jsx`, and `↗`,
   `‹`, `›`, `×` in the showcases. ui-ux-pro-max recommends SVG icons over glyphs for
   crisp, consistent rendering. The modal control glyphs already have `aria-label`s (good);
   the `↗` and `✦` are decorative and should be `aria-hidden` or replaced with SVG.

6. **[P3] Body font Inter is very common.** Optional. If more personality is wanted in
   body text, pair the Cormorant display with a less ubiquitous sans. Low priority; the
   display face already differentiates the site.

## What is working (keep it)

- Strong, committed brand identity: one red, cream neutrals, editorial serif display.
- Real ARIA: labeled nav landmarks, `aria-expanded` on the menu toggle, `role="dialog"` +
  `aria-modal` on the lightbox, keyboard (Escape/arrows) and touch-swipe support.
- Images use `loading="lazy"` and `decoding="async"`.
- Reduced-motion is respected in the redesigned "My Work" section.

## Recommended next steps (priority order)

1. **[P1] Straight-quote pass** (`/impeccable clarify`): replace the 7 curly apostrophes.
   Mechanical, ship immediately.
2. **[P1] Mobile nav a11y** (`/impeccable harden`): make closed nav non-focusable (`inert`/`hidden`).
3. **[P1] Modal focus management** (`/impeccable harden`): focus move, trap, and restore in
   the lightbox(es).
4. **[P2] Copy voice pass** (`/impeccable clarify`): vary the triads and warm up the bio,
   pending client sign-off.
5. **[P2] Animate without layout thrash** (`/impeccable optimize`): replace the `max-height`
   nav transition.
6. **[P2] Image optimization** (`/impeccable optimize`): WebP/AVIF + explicit dimensions on
   gallery/social images.
7. **[P3] Glyphs to SVG / aria-hidden** (`/impeccable polish`): decorative `✦` and `↗`.
8. **[P3] Final polish pass** (`/impeccable polish`) after the above.

Cross-reference: code-level cleanup (dead `global.css`, `.gitignore`, ESLint scoping) lives
in `docs/next-steps/refactor-cleanup-plan.md`. Item 5 here overlaps with that plan's CSS work.
