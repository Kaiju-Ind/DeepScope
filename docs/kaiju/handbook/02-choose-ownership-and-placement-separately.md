# Choose ownership and placement separately

Two questions are separate: who owns a piece of code (its artifact strategy), and which extension context runs it
(its placement).

## Ownership

| Strategy                 | What DeepScope maintains                                              | How an update arrives                                   | First checks                                                  |
| ------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| npm dependency           | The exact pin, the lockfile and the integration tests                 | A Renovate pull request                                 | Public exports, browser support, bundle cost, licence         |
| Vendored `@utils/*`      | The copy, its attribution and DeepScope's own files beside it         | `tools/utils/sync.ts` from Kaiju-Ind/Utils            | The sync source commit, `--check`, the `utils` Vitest project |
| Owned source             | Behavior, tests and docs                                              | Ordinary commits                                        | Types, tests, three browser builds, real-browser scenarios    |
| Catalog data             | `src/registry/` technology definitions derived from upstream data    | Edits or an upstream data import                        | Provenance and licence, golden matcher output, unsafe patterns |
| Generated output         | Nothing by hand: registry JSON, `.wxt/`, `.output/`                   | The build                                               | Byte-identical rebuild, no committed output                   |

Prove each requirement before it creates maintenance. A familiar example or a copied default does not establish what
DeepScope needs. A new dependency, polyfill or fork needs a demonstrated gap, an owner, an update path and a removal
condition. Never infer a provider from a framework: seeing Next.js on a page does not mean Vercel.

## Placement

Each piece of runtime code has one owning context. The [cross-browser plan](../../migration/cross-browser-runtime-plan.md)
records which context exists in which browser.

| Context                         | Owns                                                                       | Constraints                                                                          |
| ------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Background                      | Scheduling, tab identity, content-script calls, snapshots, the badge      | Chrome: service worker (no `Worker`, no DOM). Firefox: event page. Safari: non-persistent background page. All can unload while idle. |
| Offscreen document (Chrome)     | The matcher worker pool when the background cannot create workers         | Chromium only                                                                        |
| Matcher workers                 | Rule matching over observation shards                                     | Created only from a page (offscreen document or background page); per-partition deadline |
| Content script                  | Reading the page: DOM scan, metadata, resources, observation              | Runs in every frame it is injected into; page-controlled keys; must stay responsive  |
| MAIN-world probe                | Page JavaScript globals                                                   | Cannot import modules; builds its own null-prototype record                          |
| Panel surfaces                  | One Solid app: side panel, sidebar, popup, full page, options             | Never the source of truth; renders published snapshots                               |

Choose by capability, not by browser name: if the background has `Worker`, run the pool there; otherwise use the
offscreen document. Put logic that needs no browser API in modules with no browser imports, so it runs under Vitest in
Node.

## Layout today and the planned direction

The repository is a pnpm workspace. The WXT app is `apps/extension/` (`@deepscope/extension`): `src/entrypoints/`,
`src/app/`, `src/lib/`, `src/registry/`, `src/utils/`, `src/tests/`, `bench/` and `modules/` (WXT modules). Beside it
sit `utils/` (vendored `@utils/*`), `tools/` (registry, release, utils sync, verify and lint programs) and
`docs/architecture/`.

The planned monorepo splits DeepScope's reusable code into `packages/dom`, `packages/registry` and
`packages/detection` (published as `@deepscope/*`), keeps `utils/*` as `@utils/*`, and adds `docs/adr/` for decisions. New code should already respect those boundaries: no
browser API in what will become a package, and no app import from library code. The
[source layout plan](../../migration/source-layout-plan.md) has the module rules.
