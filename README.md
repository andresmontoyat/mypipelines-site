# mypipelines

Browsable catalog of the CI/CD pipelines from [`ci-templates`](../../devops/ci-templates),
organized by stack. Static site built with Astro, deployed on Vercel.

## What's inside

- **Pipelines** by stack: Java (Spring Boot), KrakenD (including Go plugins),
  React, NGINX, Contracts (Hardhat/Solidity) and Shared (cross-cutting).
- **Actions**: Codehunters' own GitHub Actions (e.g. Delete Package
  Versions).
- **Gradle**: usage guides (GitHub Packages, multi-project, quality gates,
  testing and diagrams).
- **Guides & Reference**: quick start, GitFlow, deploy targets, base images,
  rulesets and CODEOWNERS — folded into the Pipelines home and reachable from the
  footer.
- **Search**: client-side full-text search (Pagefind).

The content under `src/content/pipelines/` is **generated** from
`../../devops/ci-templates` via `scripts/sync-pipelines.mjs`. It's not edited by hand.
Pages whose source file was renamed or deleted upstream are removed on sync.
Point `CI_TEMPLATES_DIR` at another checkout to sync from elsewhere.

## Development

```bash
pnpm install
pnpm sync      # regenerate src/content/pipelines/; fails if ci-templates is missing
pnpm dev       # local dev server with hot reload
```

Other commands:

```bash
pnpm build     # sync + astro build (output in dist/)
pnpm preview   # serve the production build
pnpm check     # astro check (type-checks .astro files)
pnpm test      # node --test (tests in tests/)
```

`pnpm build` runs the sync step and then `astro build`. When ci-templates is
not there (Vercel) the build skips the sync and publishes the committed pages,
so a wrong path goes unnoticed: that is why `pnpm sync` is strict. Re-run it
whenever `ci-templates` changes and commit the result.

## Tech stack

- [Astro](https://astro.build) 7 — static output
- Tailwind CSS 4
- MDX for content
- Expressive Code — syntax highlighting (Dracula theme, dark-only)
- Pagefind — static search
- pnpm workspace · Node ≥ 20

## Structure

```
scripts/sync-pipelines.mjs   # generates content/pipelines from ci-templates
src/
  content/                   # pipelines (generated), gradle, guides, actions
  lib/stacks.ts              # order and labels for stacks/kinds/types
  pages/                     # routes: stacks, pipelines, guides, reference, search
  components/ · layouts/     # UI
```

## Deploy

Push to the default branch → Vercel runs `pnpm build` (`vercel.json`).
Site at https://mypipelines.vercel.app
