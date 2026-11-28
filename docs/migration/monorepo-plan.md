# Monorepo layout plan

## Active task: review and save the existing PR 7 migration

The 2026-11-28 continuation uses `integrate/cross-browser-runtime`, the existing
PR #7 head, at `1f439b9c33134cbb9755c231db3ced6024f3074b`. The recovered batch5
source has tree `5ec68fe6020da894ec8bed8bcadfaffb2094f30a`; its source ZIP has
SHA-256 `40c6f7222a9769f0e7e13db013d8468da39d4db57eeb47d99e044e92595f20d0`.
All 9,906 recovered files matched their saved bytes and modes before editing.
The separate stress branch remains unmerged. The user authorized continuation
and updates to this existing PR; release creation and store submission are
separate actions.

The supplied handbook attachment resolves to distribution 1.5.0 at
`7b299bb14a97fe33b6254c8206cdf491b3d7528d`. All 663 installation paths are
retained alongside the extension's project-specific guidance. The review
corrects references that claimed the restored shared incident chapters were
absent, routes local incidents to the extension procedures, and distinguishes
Safari's classic WebDriver extension commands from BiDi support.

### Current implementation and validation

Three reproduced defects have focused repairs. The installed comctx package
kept a reply listener after browser delivery rejected; the pinned dependency
patch releases that request before preserving its transport error. Registry
validation accepted inherited Object names as categories; it now requires an
own category entry. Chrome artifact validation could wait forever after a
debugger socket closed; `tools/verify/chrome/cdp.mjs` owns bounded commands and
releases their promises, timers and event subscriptions on closure.

The CI Chrome job requires its existing validator and exactly one downloaded
archive. Its success can no longer mean that the validation script was absent.
The workflow and CI guide also stop applying an old fixed macOS billing
multiplier to the public repository's standard GitHub-hosted runners.

| Check on this continuation | Result and limit |
| --- | --- |
| Frozen baseline install, Node 26.13.0 / pnpm 12.19.0 | Passed before the new changes. |
| Native baseline `mise run check` | Passed for recovered tree `5ec68fe6`. This is not a pass for later edits. |
| RPC adapter regression | Unpatched comctx fails 4 of 8 cases. The patched package passes all 8, including concurrent calls and original error identity. |
| Registry category regression | Four inherited-name cases fail before the repair. All 9 schema cases pass after it. |
| Filtered Vitest projects | 116 cases in 13 files pass across `registry`, `dom`, `extension (ui)`, `guidance` and `verify`. The separate 8 RPC cases bring the reviewed selection to 124 cases in 14 files. |
| Changed-test type check | The strict native TypeScript check for the RPC and registry-schema tests and their imported source closure passes. It does not load the full registry catalog or replace the root gate. |
| Native workflow lint | actionlint 1.7.12 and offline zizmor 1.32.0 pass; the existing single ignored audit remains. |
| Current native root type check | Failed when the registry compiler was killed with exit 137. Serial execution also failed. The new verify package's TypeScript and syntax checks passed before that failure. |
| Timed registry type check | Killed after 7.65 seconds; maximum recorded child RSS was 433,856 KiB. A 256 MiB Go target and one CPU did not resolve the host kill. No compiler diagnostic was produced. |
| Registry file discovery | Native `--listFilesOnly` succeeds: 8,591 files, including 8,173 catalog paths and 8,182 repository TypeScript files. No incremental/composite option or `.tsbuildinfo` was found. |
| Whole Vitest suite | Three bounded attempts were killed with exit 137 before reporting a test file. The focused passing selection does not replace the whole suite. |
| Current native Chrome build | Killed by SIGKILL during WXT startup. No current bundle, archive or source rebuild is claimed. |
| Restored frozen install | Relinked 491 packages from cache; WXT prepare then exited 137. Scoped dependency-patch installation with lifecycle scripts disabled passed, which does not replace the failed prepare step. |
| Real browsers | Chrome for Testing download returned HTTP 403 on this host. Chrome and Firefox journeys have not run on the current candidate. Safari needs a macOS host. |

The process kills are observed failures; their exact host cause remains
unconfirmed. The earlier successful source check does not justify weakening
current discovery, assertions or schemas. The old batch4/batch5 archive and
runtime receipts below retain their original source identities.

The recovered source is now committed as
`b28d7cf3ce2b84572fa64b061d9e6c9b318bb377`, with the exact saved tree.
The reviewed fixes follow it as `cbca1870` (RPC listener cleanup), `1e4db848`
(category validation) and `ad84805e` (Chrome artifact verification). These
commits preserve the native PR ancestry. Local commits do not establish that
the remote PR was updated or its current checks passed.

### Action list and stopping point

1. Verify independent read-back of the binary-capable patches, native history
   and current checkpoint records, then publish the coherent commit batch to
   existing PR #7 and verify its full remote head. Preserve the completed
   migration and each focused repair as separate reviewable commits.
2. Run the complete native type and test gates on a host with sufficient
   resources. Keep the current failed receipts. Rebuild all three browser
   archives and inspect their output; the Firefox sources archive must include
   `patches/` and rebuild without private package credentials.
3. Run the affected generated panel, observation, navigation, private-window,
   cleanup and search/focus journeys in the actual browsers. A CDP connection
   unit test or static archive inspection does not complete those journeys.
4. Finish the tools structure review. The full 962-line `tools/verify/stress.mjs`
   mixes scenario planning, browser actions, observations and reporting. Its
   split is still open; the application/package size guard does not cover it.
   Preserve seeded action order and the persisted-state oracle when separating
   those responsibilities, and rerun the browser stress scenarios.
5. Review cancellation separately from transport failure. The comctx patch
   fixes rejected sends. A caller timeout does not by itself cancel the remote
   operation or settle its RPC promise; preserve late-response cleanup when a
   panel closes. Chrome's HTTP startup polling and process teardown also need
   their own failure-path review beyond the repaired WebSocket owner.
6. Reproduce the vendor header refresh only from its exact recorded upstream
   objects. Do not replace the pinned closure with a newer Utils branch or
   replay the already incorporated follow-up/artifact patches.

Resume from this record, the actual branch/index/worktree and the saved
validation logs. The prior batch5 follow-up is a delta into the recovered
candidate, not another patch to apply. Read the source map and the review
tests before changing ownership. This restructure is not marked complete while
the current full gates, tool split and real-browser acceptance remain open.

## Recovered batch5 implementation and evidence

**Outcome.** Keep the extension's existing lifecycle and persisted contracts
while making each source, dependency and tool owner explicit. The native
starting commit is `1f439b9c33134cbb9755c231db3ced6024f3074b`; the local branch is
`codex/deepscope-structure-20261127` in that saved batch. Earlier Phase A and M1 work is retained.
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
