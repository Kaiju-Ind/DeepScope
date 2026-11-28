# Monorepo layout plan

## Active task: complete the existing PR 7 migration

**Outcome.** Keep the extension's existing lifecycle and persisted contracts
while making each source, dependency and tool owner explicit. The native
starting commit is `1f439b9c33134cbb9755c231db3ced6024f3074b`; the local branch is
`codex/deepscope-structure-20261127`. Earlier Phase A and M1 work is retained.
The independent stress branch remains separate. Source changes are prepared
for review; no merge or publication is implied by this record.

| Step | Implemented result | Acceptance still required |
| --- | --- | --- |
| Phase B/C | Model, content, background, observer, snapshot, journal, scheduler and panel responsibilities have concrete owners. All existing oversize exceptions are retired; provider composition is under 150 lines. | Finish independent follow-up review and execute real-browser lifecycle scenarios. |
| M2 | `packages/dom` owns selector planning, routing and matching with native exports, dependency, check and consumer test. | Real browser DOM and cancellation evidence. |
| M3 | Portable collection/snapshot/replay/failure data removes app dependencies from detection. Registry compiler work is separated from definitions. | Preserve the deliberate wire and dictionary decisions in the ADR; do not claim Failure occurrence adoption. |
| M4 | Registry and detection moved atomically with actual static, type, dynamic and mock consumers. Obsolete app paths are removed without forwarding shims. Final artifact inspection and clean source rebuild pass. | Keep the recorded source and output identities intact during integration. |
| M5 | Compiler alias removed; pure tests co-located; Oxc reads imports/exports/manifest ownership. Five tools packages participate through native checks and discovery. Native release archives and checksum collection pass. | Run hosted gates after the reviewed candidate is published. |
| Handbook | Complete supplied generic guidance merged with retained extension profile, procedures, platform cards and failure records. | Keep all guidance links and native guidance tests green at the final source state. |
| Design Input | Neutral `surface` and native forwarding contract adopted with existing DeepScope styles, Solid 1.9.18 and Kobalte cohort. | Real search/focus/disabled journey in the built extension. |
| Clipboard repair | Fallback node removal is protected by `finally`, including selection/copy exceptions. Six regression cases pass. | Real clipboard interaction in a browser remains separate. |
| Review follow-up | Failed content setup releases acquired hooks; exact-session persistence and lifecycle revisions share a mutation fence; diagnostic category keys retain their dotted format. Named implementation comments are complete. Batch4 is independently preserved. | Keep that immutable recovery separate from later review corrections. |
| Shared storage follow-up | Origin snapshot and summary promotion, aggregate status refresh, and tab-index update/removal each own their shared mutation slot. Five reproduced races are fixed; 50 focused cases and the native root compile pass. | Finish independent review and preserve batch5 before integration. |

**Actual package graph.** Registry depends on `zod`. DOM depends on
`postcss-selector-parser`. Detection depends on Registry, DOM and graphlib.
The old target table below proposed `@utils/result` for schema/detection, but
there is no actual symbol with a compatible contract to adopt in those owners.
The extension already uses the recorded Utils Result and lifecycle packages.
See [public source builds](../adr/01-public-source-builds.md) for current
vendoring, published-release migration options and the plain failure payload.
The table below is historical planning evidence, not the current manifest.

**Native evidence.** Exact Node 26.13.0 and pnpm 12.19.0 run the frozen install,
root checks and Vitest. The frozen batch4 whole suite passes 241 files with
1,730 passing and 4 skipped cases. The baseline had 237 files, 1,770 passing
and 4 skipped cases. Native architecture runs account for the difference:
126 to 65 generated cases, plus 11 initial behavior/guidance cases and 10
review regressions, gives `1774 - 61 + 11 + 10 = 1734`. The directory-based
guards account for the reduction. Batch5 adds 11 shared-storage cases and passes
50 focused cases across five files, including the actual closed-tab cleanup.
The complete suite is not rerun for that focused correction. Its native root
compile passes all existing package, tool, extension, Utils and root projects.
Release validation records exact source and output identities per captured batch;
an earlier archive hash does not describe a later candidate.

**Review follow-up.** Same-build content reinjection already reused diagnostic
hooks. The reproduced leak was partial setup failure before WXT owned cleanup;
the installer now releases acquired resources and preserves the startup error.
Snapshot persistence now serializes the read and write for each exact session
within its owning background context.
Tab retirement allocates its next revision inside that same fence. The journal
keeps its established dotted category key, with a regression against the actual
sink and its retained in-memory rate bucket. Red and green receipts distinguish these
behavior repairs from the documentation pass.

Independent review then reproduced races between different sessions that share
an origin, a tab index, or the aggregate status key. Origin comparison, snapshot
write and matching summary now share one slot. Status enumeration and write have
their own slot; tab-index merge, retention, eviction and removal share a per-tab
slot. With the exact-session slot held, the writer acquires and releases origin,
then status, then index. Shared slots never overlap or call back into session
mutation. Failed operations release their keys and independent origins and tabs
still progress. These are background-context fences, not browser-wide locks.

Tab close still refuses new saves before cleanup and performs a second removal
after admitted saves settle. Index removal joins an update already queued for
that tab, but does not wait for admitted saves while holding the index slot.
Five red regressions cover the origin, summary, index, aggregate status and
pending-index removal cases. Six control cases cover independence and failure
release. Persisted key strings, ranking, schemas and the 20-entry limit remain
unchanged. The new TypeScript audit checks the three production owners and their
regressions; all 13 named production implementations retain purpose comments.

The TypeScript inventory finds 2,316 named function and method implementations,
all with purpose or contract comments, across app, package and tool sources.
Unchanged vendored Utils and tests are excluded. Anonymous callbacks and field
declarations have a separate inventory; this count does not claim an individual
comment on every such site. Parsed token comparison separates 213 comment-only
files from seven behavior/regression files and one precise test-mock type change.
The ordinary-string audit reviews all 170 changed owner records for path-shaped
literals separately from import and resource edges. Output inspection also
caught Tailwind utility names in new prose; revised comments preserve the exact
prior stylesheet bytes in Chrome, Firefox and Safari.

**Experiments and decisions.** Package extraction exposed WXT's textual Solid
auto-import of a property/parameter named `batch` into renderer-free code.
The existing Utils exclusion now also covers `packages/`, and the build passes.
The batch4 AST pass resolves 20,596 imports across 8,990 modules with no syntax
errors or unresolved local/package source import. Its one runtime cycle is
retained inside the unchanged vendored capability source. The schema module's
existing Zod configuration is declared in package `sideEffects`.
Batch5 adds two resolved imports of the existing keyed fence and removes the
only cross-file imports of the now-private origin-summary functions.

**Frozen artifact evidence.** Native archives regenerate for all three
browsers. The release collector produces four archives and verified SHA-256
checksums. A clean Firefox source extraction installs the frozen public-package
closure offline from the existing download store, then rebuilds all 56 Firefox
files byte-for-byte. Chrome static artifact inspection passes 21 checks.
Firefox web-ext 10.8.0 lint reports 0 errors, 0 notices and 2 warnings: Solid's
HTML template helper and Zod's disabled evaluation probe. TypeScript symbol
tracing finds 149 current template calls, all with static HTML literals; the
actual scheduler schema accepts/rejects data with the global Function constructor
disabled and makes zero attempted calls. These source checks do not replace
real browser CSP evidence. actionlint 1.7.12 and offline zizmor 1.32.0 pass.
Safari's two manifest checks pass; its packager cannot run without `xcrun`.

The final root check runs the unchanged native task with scoped compiler
resource limits (`GOMAXPROCS=2`, `GOMEMLIMIT=1536MiB`). Earlier concurrent and
resource-constrained attempts exited 137 and remain recorded. A follow-up test
worker was killed by the host with two workers; the whole suite passes with one
worker and unchanged discovery, assertions and timeouts. Earlier rebuild
dependencies were removed after their receipts were saved. The batch4 source
rebuild uses the same frozen public lockfile. The focused architecture/UI/guidance suite
from the earlier batch passed 162 cases; the batch4 whole suite covers those
owners again. A native Node 26 consumer also resolves the real package
exports and checks DOM matching/cancellation without the extension runtime.

**Blocked evidence.** Full Chrome for Testing 159.0.8154.6 was installed and its
archive digest verified, but this host rejected Chrome's local socket creation.
The normal reviewed execution request was rejected by the current approval
policy. The extracted browser was removed after its receipts were retained.
Do not repeat the same denied action through another launcher. Actual
Chrome, Firefox and Safari journeys remain open; Safari additionally requires
a macOS host and Apple tools. Source checks and static artifacts do not replace
them. The historical Utils attribution refresh also needs both exact recorded
upstream Git objects; the currently recovered Utils checkout contains neither.
Do not substitute a newer main commit.

**Next action and continuation.** Read this record, the current branch and dirty
state, the [source map](../architecture/source-layout.md), the
[source-layout plan](source-layout-plan.md), and the final local validation
report. Preserve the complete uncommitted recovery before integration, retaining
immutable batch3 and batch4 plus the separate shared-storage follow-up in batch5.
Read the five red cases, 50 focused passing cases, and exact acquisition-order
trace in the shared-storage review record. Finish independent
review; run browser scenarios
on a host that permits them; then let the integration owner prepare coherent
commits and update the existing PR stack. Keep every failed or blocked receipt.

## Original recorded plan (retained)

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
