## Task 6 Report: Pipeline detail page (`/pipelines/[slug]`)

### File Created
- `src/pages/pipelines/[slug].astro`

### Additional Changes (to fix TypeScript error)
- `src/lib/categories.ts` — extended `STACK_ORDER` to include the 6 domain stacks (`java`, `krakend`, `react`, `nginx`, `contracts`, `shared`) so `CategorySlug` covers all values `d.stack` can hold
- `src/i18n/ui.ts` — added `category.*` labels for the 6 domain stacks

**Root cause:** `Breadcrumb.astro` accepts `category: CategorySlug`; `CategorySlug` was CI-platform-only; `d.stack` is `Stack` (domain slugs). Extending `categories.ts` made `Stack ⊆ CategorySlug` — no cast needed, fully type-safe.

### Props Typing Added
Yes — `interface Props { entry: CollectionEntry<'pipelines'> }` added with `import type { CollectionEntry } from 'astro:content'`.

### Check / Build Summary
- `pnpm check`: **0 errors, 0 warnings** (17 hints are pre-existing z-deprecation hints in `content.config.ts` and an unused variable in `SearchModal.astro`)
- `pnpm build`: **77 `/pipelines/<slug>` routes emitted** — all Task 5 card links now resolve
- Pagefind indexed 84 pages total (77 detail + 6 stacks + 1 home)

### Commit
- SHA: `b5a3dfc`
- Subject: `feat: pipeline detail pages with embedded source + copy button`
- Branch: `feat/mypipelines-v1`

---

## Fix Report: Breadcrumb Critical Review Finding

### Breadcrumb.astro Changes
- Replaced `import type { CategorySlug } from '../lib/categories'` with `import { STACK_LABELS, type Stack } from '../lib/stacks'`
- Retyped prop: `category: CategorySlug` → `category: Stack`
- Link target: `/guides#${category}` → `/stacks/${category}` (dead link removed)
- Label render: `{t(lang, 'category.${category}')}` → `{STACK_LABELS[category]}` (single source of truth)

### categories.ts Deleted
- Grep result before deletion: only `src/components/Breadcrumb.astro` imported from `src/lib/categories`. No other files referenced it. No `category-colors.ts` exists.
- **Deleted:** `src/lib/categories.ts` (the Task 6 CI-platform-widened clone, now dead)

### src/i18n/ui.ts Keys Removed
- Removed 11 `category.*` keys: `category.github-actions`, `category.gitlab-ci`, `category.jenkins`, `category.circleci`, `category.azure-devops`, `category.java`, `category.krakend`, `category.react`, `category.nginx`, `category.contracts`, `category.shared`
- Also removed the `| 'category.${string}'` union from `t()` signature — no longer needed

### Gate Results
| Gate | Result |
|------|--------|
| `pnpm check` | 0 errors, 0 warnings, 17 pre-existing hints |
| `pnpm build` | SUCCESS — 77 `/pipelines/<slug>` routes + 6 `/stacks/<stack>` routes, 84 pages total |
| `grep -rn "guides#" src/` | No matches (exit=1) |
| `grep -rn "category\." src/i18n/ui.ts` | No matches (exit=1) |
| Single source of truth | Stack labels resolve only via `STACK_LABELS` in `src/lib/stacks.ts` |

### Commit
- SHA: `865f5af`
- Subject: `fix: adapt Breadcrumb to pipelines stacks, single label source, correct link target`
- Branch: `feat/mypipelines-v1`
- Files changed: `src/components/Breadcrumb.astro`, `src/i18n/ui.ts`, `src/lib/categories.ts` (deleted)
