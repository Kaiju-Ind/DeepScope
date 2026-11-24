# Monorepo layout plan

DeepScope becomes a pnpm monorepo shaped like the Kaiju repositories (Crawl,
Kaiju Utils), adapted to a single browser-extension product. Recorded
2026-11-24 against `e9bcd4bc`; Crawl guidance read at `a00f0036d`.

## Target

```text
apps/extension/        @deepscope/extension, the WXT root
  wxt.config.ts  vitest.config.ts  tsconfig.json  components.json  package.json
  modules/             registry build module (WXT autoloads <root>/modules)
  public/  src/  bench/
packages/
  dom/                 @deepscope/dom        selector planning, routing, matching
  registry/            @deepscope/registry   technology definitions, schema, catalog
  detection/           @deepscope/detection  observations, evidence, matching, compiler, pipeline
utils/*                @utils/*              vendored Kaiju Utils (unchanged)
tools/                 verify/ release/ registry/ utils/ lint/  (from scripts/)
docs/adr/              decision records
.output/               build output stays at the repo root
```

| Package | Depends on | Stays out because |
| --- | --- | --- |
| `@deepscope/dom` | `postcss-selector-parser` | — |
| `@deepscope/registry` | `zod`, `@utils/result` | — |
| `@deepscope/detection` | registry, dom, `@utils/*` | — |
| app only: messaging, ui, storage, scheduler, background, content, workers | — | one consumer, or browser APIs (the composition root chooses adapters) |

Dependency direction: `utils` → `dom` → `registry` → `detection` → `apps/extension`.
Packages export TypeScript source (no build step, nothing is published), use
relative imports inside a package and package subpaths across packages, and
never import `wxt`, `comctx`, `@/` or `apps/`; a boundary test enforces it.

## Mechanics

- `pnpm-workspace.yaml`: `apps/*`, `packages/*`, `utils/*`.
- TypeScript: `tsconfig.base.json` with the strict options; the app extends
  `.wxt/tsconfig.json`; packages and utils extend the base without WXT types.
  `mise run check` runs each package's check.
- Vitest: root `projects: ['apps/extension', 'packages/*', 'utils']`, native
  discovery in each.
- WXT: `outDir` at the repo root, `zip.name` unchanged, `zip.sourcesRoot` at
  the repo root so the AMO sources zip still rebuilds from a clean checkout.
  The root `package.json` keeps delegating `build:*`/`zip:*` scripts because
  `.mise/` is not in the sources zip.
- CI runs the full suite (every package feeds one bundle); cache keys include
  every workspace manifest. Renovate ignores `utils/**` (the sync script owns
  those pins).

## Why the move is staged

`src/lib` has import cycles: detection ↔ lib/registry, detection ↔
observations ↔ evidence, messaging ↔ storage, observations/messaging →
content/observe types, detection/types → messaging/failure. Moving files into
packages without breaking them first only relabels the tangle (the Kaiju
library guide lists that as a failure signature).

1. **M1 (after cleanup Phase A merges, before Phase B/C):** move the app into
   `apps/extension/` and `scripts/` into `tools/`, with config edits only. Gate:
   check, tests, three zips, identical zip file lists, a byte-identical rebuild
   from the unzipped sources zip, `web-ext lint`, a release dry run. *Done*: app
   Vitest projects run as `extension (runtime)` and `extension (ui)`; the root
   keeps delegating `build`/`zip:*` scripts; the sync header template and the
   `utils/**/*.ts` headers still say `scripts/utils/sync.ts` (change both in one resync).
2. **Phase B/C** (file splits, short names) inside `apps/extension/src`.
3. **M2:** extract `@deepscope/dom` after the content-script lane merges.
4. **M3:** break the cycles, one behaviour-neutral commit each (`ExtensionError`
   onto `@utils/result` failures; observation signal types into detection;
   registry→collectors edges into detection; redaction into detection).
5. **M4:** extract `@deepscope/registry` and `@deepscope/detection`, each as one
   atomic cutover (`git mv` plus an import codemod, no re-export shims).
6. **M5:** remove the registry build alias, co-locate package tests, add the
   boundary test.

## Deliberate differences from Crawl

- Utilities are vendored, not depended on: AMO reviewers must rebuild offline
  without private registries (record as an ADR).
- No `services/`, `workers/`, `infra/`: one product under `apps/`.
- pnpm and Vitest, because WXT and Vite own the toolchain.
