# Refactor & Code Cleanup: Next Steps

Owner split: Claude defines direction; Codex implements, documents, and pushes.
Created: 2026-05-21. Status: planned (not yet started).

This plan is the backlog for the cleanup phase. Each item is independently shippable.
Tackle top to bottom; tiers reflect risk/effort, not hard ordering.

## Tier 1: Safe deletions & config (low risk, high payoff) — DONE 2026-05-21

All four items below shipped on 2026-05-21: deleted `global.css`, removed `src.zip`,
fixed `.gitignore` (`.mcp.json`, `.code-review-graph/`, `*.zip`), and scoped ESLint
(`.agents`, `.claude`, `.code-review-graph`, `**/*.umd.js`). `npm run lint` is now clean
(0 errors; one pre-existing Tier 3 hook warning remains). `readme.html` was kept (linked).

1. **Delete dead stylesheet `src/styles/global.css` (1,103 lines).**
   - Verified not imported anywhere (`src/styles/index.css` imports tokens, layout,
     hero, content, portfolio, responsive, never global). It is a stale duplicate of
     the active rules.
   - Action: delete the file. Build and visual smoke test (no class should change).

2. **Remove the stale repo artifact `src.zip`.**
   - `src.zip` (55 KB, tracked at repo root) is a zipped source snapshot, not a build input.
   - Action: `git rm src.zip` after confirmation.
   - Note: `public/readme.html` is NOT stray; it is linked from the footer ("Project README").
     Either keep and maintain it, or remove both the file and the footer link in `Footer.jsx`.

3. **Fix `.gitignore` gaps.**
   - Not currently ignored: `.mcp.json` (CLAUDE.md says never commit it),
     `.code-review-graph/` (local graph DB), `src.zip` / `*.zip`.
   - `.env.ai.local` is already covered by the `*.local` rule; verify.
   - Action: add `.mcp.json`, `.code-review-graph/`, `*.zip` to `.gitignore`.

4. **Scope ESLint so `npm run lint` is meaningful.**
   - Currently 60 errors, all from vendored minified JS in `.agents/` and `.claude/`
     skill scripts (for example `modern-screenshot.umd.js`). Real source is clean.
   - Action: add an `ignores` block to `eslint.config.js` for `.agents/**`,
     `.claude/**`, `dist/**`, `**/*.umd.js`. Target: a clean `npm run lint`.

## Tier 2: CSS consolidation (medium risk)

5. **Audit for more dead CSS.** — DONE 2026-05-22 (v1.0.1).
   - The "My Work" redesign already removed the unused `.placeholder-wave/-bloom/-cloud/-floral`
     gradient classes. Sweep `content.css` / `portfolio.css` for other orphaned rules.
   - Swept all `src/styles/*.css` against component/data markup. Removed 5 orphan classes
     (no JS reference, verified): `.gallery-grid`, `.social-scroll` (+ scrollbar pseudos),
     `.social-card-scroll`, `.topbar-chip`, `.topbar-label`. Net -34 lines.

6. **Reorganize styles by concern/component.** — DECIDED: Option A (not started).
   - `content.css` mixes bio, skills, work-directory, tool cards, and "final polish"
     overrides; `responsive.css` scatters work-directory overrides across 5 breakpoints.
   - Option A (low effort): keep the split files, but group each section's rules together
     and co-locate its responsive overrides.
   - Option B (higher effort): move to CSS Modules or per-component stylesheets so each
     component owns its styles. Decide before starting; do not half-migrate.
   - **Senior-dev decision (2026-05-22): Option A.** A 2,200-line single-author site has no
     scoping problem worth a full Modules migration; Option B would touch every component's
     `className` with no test suite on a live client site. Do `content.css` then
     `responsive.css` first (pull the scattered work-directory breakpoint rules together);
     pure move-and-comment, no selector/value changes. Verify with a build + per-breakpoint
     visual smoke test. `portfolio.css` follows if time allows. Schedule LAST of the
     remaining work (internal-only, highest regression surface).

7. **Normalize the color system.** — DONE 2026-05-22 (v1.0.1).
   - `tokens.css` defines `--cream: #f1efeb`, but `#fff6f3` (a lighter cream) is hardcoded
     in many places as on-red text. Promote it to a token (for example `--cream-light`) and
     replace the literals. README mislabeled cream as `#FFF6F3`; fix once tokens settle.
   - Added `--cream-light: #fff6f3`; replaced all 10 hex literals (8 `portfolio.css`,
     2 `content.css`). Remaining: a few `rgba(255, 246, 243, ...)` alpha variants left as-is
     (a solid token can't carry per-use opacity). README `#FFF6F3` note still open.

## Tier 3: Code quality & a11y (medium risk)

8. **Fix `useRevealOnScroll.js` exhaustive-deps warning** (spread element in dependency
   array). Stabilize deps or restructure the effect.

9. **Accessibility pass on the redesigned "My Work" cards.**
   - Confirm title/caption contrast meets 4.5:1 (red text and dark muted caption on cream,
     should pass).
   - The "View" arrow and `:focus-within` lift are keyboard-friendly; confirm on device.

10. **Image weight.** Canva PNGs are large. Consider WebP/AVIF plus explicit `width`/`height`
    to cut transfer and prevent layout shift (CLS). Relevant to the Canva gallery and social
    sections (the "My Work" directory no longer uses images).
    - **Senior-dev decision (2026-05-22): WebP only (no AVIF, no `<picture>` fallback),
      two sizes per asset (~480w card thumbnail via `previewImage`, ~1200w modal via
      `modalImage`), explicit `width`/`height` on every `<img>`, generated at build time via
      a Vite plugin (`vite-imagetools` or `vite-plugin-image-optimizer`).** Context: ~6.9MB
      of PNGs, largest 1.5MB, all rendered with no dimensions; the modal currently reuses the
      full-size card PNG. AVIF/`<picture>` not worth the complexity for ~12 images given
      universal WebP support. The data shape already has `previewImage`/`modalImage` fields
      (mostly unused). This is the **highest user-facing payoff** of the remaining work; do it
      before the CSS reorg so the closing Lighthouse run (#12) measures the optimized state.

## Tier 4: Larger / optional

11. **SEO: prerender/SSG.** Real content is client-rendered. The `<noscript>` plus JSON-LD
    cover basics, but a Vite prerender plugin would put full DOM in the served HTML for
    stronger indexing. (Carried over from the SEO pass; see HANDOVER.md.)

12. **Lighthouse/perf pass** once Tier 1 to 3 land. Was on the original README final
    checklist and never run.

## Doc hygiene (do alongside)

- `README.md`: updated 2026-05-21 (live URL plus status). Keep in sync with reality.
- `CHANGELOG.md` / `HANDOVER.md`: update on every shippable change; tag versions.
- `client-updates/`: running client-facing weekly log; keep historical entries, add new ones.
- Keep this plan current: check items off or move them to CHANGELOG as they ship.
- Brand copy rule: no em dashes anywhere in site content (use commas, colons, or `|`).
