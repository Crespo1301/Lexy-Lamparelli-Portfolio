# CLAUDE.md

Repo role: maintained client project and featured client portfolio entry.

## Business Context

- This repo represents live client-facing brand work.
- Shared workflow rules live in `/home/cresp3/Portfolio/AI-WORKFLOW.md`.

## Claude Role Here

- Use Claude for brand polish, layout critique, social-proof presentation, and visual refinement.
- Let Codex handle implementation, responsive fixes, documentation, and GitHub closeout.

## Working Notes

- Single-page Vite app with no router.
- Treat visual polish and mobile spacing as high priority here.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
npm run stitch:init
npm run stitch:doctor
npm run stitch:proxy
```

## Shared AI Tooling

- Follow `AI-WORKFLOW.md` for the shared CSolutions AI stack.
- Use repo-local `.claude/skills/` for `code-review-graph`, `Impeccable`, and `mattpocock/skills` workflows.
- Use `.mcp.json` with `code-review-graph` after running `code-review-graph build` so exploration and reviews stay token-efficient.
- Use OpenSpec for larger changes that benefit from proposal, spec, and task artifacts.
