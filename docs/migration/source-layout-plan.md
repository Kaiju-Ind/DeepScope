# Source layout cleanup plan

## Current implementation record

The continuation starts from PR #7 commit
`1f439b9c33134cbb9755c231db3ced6024f3074b` on
`integrate/cross-browser-runtime`. The recovered batch5 working tree is
`5ec68fe6020da894ec8bed8bcadfaffb2094f30a`, before the current review repairs.
The native history contains the completed
Phase A and M1 changes. The separate `fix/stress-green` branch is not part of
this baseline. This record and the [monorepo plan](monorepo-plan.md) describe
one migration; the registry extraction follows the source splits below.

The intended reader is a maintainer tracing a scan from a browser event through
collection, matching, persistence and the panel. Each cut must identify the
state owner, update every current consumer, retain useful comments, remove the
obsolete path, and pass the owning type and behaviour checks before the next cut.

1. Split the pure panel model and explicitly install its artifact probe at
   panel startup. Move named consumers directly to their new owners.
2. Separate the content install guard, RPC lifetime, collection and diagnostics;
   preserve private-tab filtering and start/stop write ordering.
3. Separate background browser adapters and listener registration from runtime
   state, then extract runtime state owners in the dependency order below.
4. Split observer mutation/evidence ownership and panel state/effects without
   moving reactive setup across an asynchronous call.
5. Complete monorepo M2–M5 with public package subpaths, package-owned tests,
   native workspace discovery and no app imports from the extracted packages.
6. Merge the supplied handbook by intent, preserving the extension guidance and
   the public source-build contract. Record the vendored-versus-published Utils
   decision as an ADR. Inspect the actual generated browser archives, rebuild
   the Firefox sources archive, and report each real-browser gate separately.

Validation starts with the declared Node 26.13.0, pnpm 12.19.0 and frozen
lockfile. The existing cleanup, panel reset, RPC, privacy and architecture tests
are retained. Passing source tests or bundles alone does not close the real
Chrome, Firefox or Safari checks. The original dated plan follows unchanged
until each implemented step has evidence recorded here.

## Implemented source owners and stopping point

The six migration steps above are implemented in the working source. See
[source ownership](../architecture/source-layout.md) for the full current paths,
state owners and exact package/tool graph. The 14 application/package oversized-module and two
thick-entrypoint exceptions have been removed after their owning code was
split. The panel provider remains under its 150-line target. The matcher reason
is typed; browser and persistence implementations are injected into the runtime.

The recovered batch4/batch5 records contain earlier successful source checks,
tests and browser builds. After the executor reset, the exact five-commit
candidate has a fresh successful frozen install, native type check and Chrome
build. Its full test run passed 242 files before one DOM worker exceeded the
explicit 512 MiB heap cap; that file's 17 cases pass with a 1,536 MiB heap.
These results and the retained earlier failures are recorded in the
[monorepo plan](monorepo-plan.md). The new stress ownership split has passing
focused checks; a full rerun on the final tree is still required. Current archive
rebuilds and browser interaction remain open, and the exact Chrome for Testing
download still returns HTTP 403. The historical vendor-header refresh needs exact
upstream objects. The active record in the [monorepo plan](monorepo-plan.md)
contains decisions, failed probes and the next action. The original dated
problem statement and target below are preserved as history; use the source
map for current paths rather than recreating obsolete files.

## Original recorded plan (retained)

`src/entrypoints`, `src/app` and the background runtime they drive are too
large to follow. This plan splits them into small modules with one owner per
piece of state, without changing behaviour. The registry (catalog, compiler,
artifact formats) is out of scope. Recorded 2026-11-23 against `7c86fbbf`.

## Where the size is

| File | Lines | What it mixes |
| --- | --- | --- |
| `src/lib/background/runtime.ts` | 3,159 | one closure with 11 maps: tab identity, content reachability, document work scopes, observation refresh, analysis, evidence passes, sessions, matcher jobs, progress revisions, snapshot/replay/badge publication, API routing |
| `src/app/provider.tsx` | 1,361 | 20 signals and 6 loose variables, RPC client created at import time, snapshot subscription, analysis queue, tab targeting, observation, settings |
| `src/app/model.ts` | 995 | pure panel model plus an import-time side effect (`publishArtifactRuntime`) |
| `src/entrypoints/content.ts` | 662 | logging summaries, signal collection, content API, install guard |
| `src/entrypoints/background.ts` | 347 | RPC client, loggers, badge painting, executor choice, scheduler wiring, every listener |

Known duplicates: tab-identity equality (`runtime.ts:690`, `provider.tsx:139`),
replay summary (`runtime.ts:1265`, `model.ts:556`), `isReplaySummaryForAnalysis`,
`getEvidenceCompletenessRank`, `createEvidencePreview`, log-summary
formatting, the snapshot-then-replay read (three copies), tab-removed cleanup
(two copies), four panel reset blocks. `runtime.ts:queueSnapshotWrite`
re-implements `@/utils/fence`.

## Target layout

```text
src/entrypoints/            composition only, ≤120 lines each
  background.ts             logging, crash hooks, coordinator.create(), listeners.register()
  content.ts                defineContentScript -> content/install.start()

src/lib/background/         code that touches browser APIs
  coordinator.ts            executor, schedulers, runtime, scheduled API, autoscan, recovery set
  listeners.ts              every listener; one forgetTab(tabId, reason) fan-out
  executor.ts  logging.ts  content-client.ts  badge.ts  toolbar.ts  startup.ts

src/lib/background/runtime/ no browser APIs; each stateful module is create(deps) + forgetTab()
  index.ts      wiring in dependency order (createBackgroundRuntime)
  types.ts      exported dependency and runtime types
  tabs.ts       inspectability, identity, scheduled targets, isCurrentDocument
  content.ts    ensure/ping/inject, one call(tabId, op, signal) helper
  work.ts       cancelable work scope per document
  output.ts     pure builders (analysis output, keys, statuses, job records)
  publish.ts    ordered snapshot writes (via fence), badge publication, readStored
  jobs.ts       matcher job queue, run, save, supersede, cancel
  progress.ts   matcher state and partition progress revisions
  refresh.ts    observation refresh baselines, timers, deferral
  sessions.ts   refresh/stop/get session targets, recovery
  analysis.ts   analyze a tab target, snapshot-first, fresh analysis
  evidence.ts   incremental evidence passes
  api.ts        BackgroundApi and runtime message routing

src/lib/content/            install.ts  api.ts  collect.ts  logging.ts
  observe/                  runtime.ts  mutations.ts  evidence.ts (one typed ObserverState)

src/app/
  model/        pure: matcher, revision, replay, observation, explanations, update, categories
  panel/        provider.tsx (≤150), state, background, snapshots, targeting, analysis,
                observation, settings, context, route-memory
  browser/      the only app code touching wxt or persistence: tabs, stored, surface
  artifact.ts   release-check probe, called from mountPanel
  pages/ components/ diagnostics/   unchanged
```

Shared helpers move to the library that owns the data: identity equality to
`lib/messaging/identity.ts`, replay summary to `lib/pipeline/replay.ts`,
observation batch merging to `lib/observations/merge.ts`, log summaries to
`lib/diagnostics/summary.ts`.

## Rules

These rules are also carried in [`AGENTS.md`](../../AGENTS.md) and the
[naming guide](../../.agents/guides/naming-and-folder-structure-guide.md).

- Files aim for ≤300 lines; review above 400; hard cap 500 (tests, generated
  files, `src/registry`, `src/ui` excluded). A ratchet test lists today's
  oversized files and only lets them shrink.
- Every map, set, `let` and signal has one owning module and changes only
  through its API.
- `entrypoints` -> `app`, `lib`. `app` -> public `lib` modules only; concrete
  persistence only from `app/browser/**`. `lib` never imports `app`.
  `lib/background/runtime/**` never imports `wxt/browser`, `comctx`,
  `lib/storage` or `lib/persistence/browser`. `app/model/**` stays pure.
- Names are concrete; no new `runtime`, `helper` or `manager` modules.
  Persisted values, storage keys and log event names stay byte-identical.
- Names are short (owner decision, 2026-11-23). A dash in a file or folder
  name usually hides a subfolder: `detection-snapshots.ts` becomes
  `snapshots/…`, `observation-matcher-index.ts` becomes `matcher/index.ts`.
  Identifiers are short too; the module namespace carries the context, so
  `createBrowserContentPageSessionSnapshotStore` becomes
  `snapshots.store.create` and
  `clearScheduledObservationRefreshesForTab` becomes `refresh.clear(tabId)`.
  Today there are 110 dashed file names outside `src/registry` and `src/ui`,
  and dozens of identifiers of 38 or more characters. Renames happen inside
  the moves of each lane, not as a separate sweep, so each file is touched
  once.
- Stateful factories expose `dispose()` and `forgetTab()` so they can adopt
  the vendored `dispose` utilities.

## Sequence

Every commit passes `pnpm compile`, the full Vitest suite, and
`wxt build -b chrome|firefox|safari`. Moves add or remove no `await`; review
with `git diff -M --color-moved=zebra`. Behaviour fixes ship as separate
commits.

1. **Characterisation tests and guardrails** (serial): cleanup order after
   navigation and tab close, badge restore on snapshot-first, replaced vs
   removed tab cleanup, synchronous first-tick listener registration, the four
   panel reset paths, and `architecture/boundaries.test.ts` (size ratchet and
   dependency rules).
2. **Shared foundations** (serial): vendor `result`, `dispose` and the
   `signal` helpers from Kaiju Utils (see the cross-browser plan); switch
   `ExtensionResult` to the vendored Result (`error` -> `failure`); rebuild
   `rpc.ts:withTimeout` on `signal`; move the duplicated helpers listed above.
3. **Parallel lanes with exclusive files:** L1 `lib/storage/**` (split
   `detection-snapshots.ts` into guards, clone, operations); L2 `app/model.ts`
   into `app/model/**` and delete dead exports; L3 `entrypoints/content.ts` and
   `lib/content/*.ts`; L4 `lib/content/observe/**`; L5
   `entrypoints/background.ts` and `lib/background/*.ts` (not `runtime`).
4. **Background runtime** (serial, one owner): `git mv` to `runtime/index.ts`,
   then extract output, tabs, content, work, publish, jobs and progress,
   refresh and sessions, analysis, evidence and api, one commit each; finally
   replace the untyped `details` bag with a typed `MatcherRunReason`. Guard:
   `src/tests/messaging/background-api.test.ts` unchanged.
5. **Panel** (serial, one owner, can run beside step 4): state, background
   client, snapshots and stored reads, targeting, analysis, observation and
   settings, then shrink `provider.tsx` and move browser-touching code to
   `app/browser/`. Guard: `panel-privacy` and the app tests.
6. **Docs and architecture tests**: update the architecture documents that
   describe these files, add `docs/architecture/source-layout.md`, shrink the
   size allowlist.

## Risks

- Ownership checks compare object identity; modules share single map
  instances and never clone identities. `forgetTab` keeps today's order (abort
  work, then cancel matchers).
- Solid signals, memos and `onCleanup` are created synchronously inside the
  provider owner, never at module scope.
- MV3 listeners register synchronously; the toolbar click stays synchronous
  for Firefox's sidebar. New modules touch no browser API at import time,
  because WXT imports entrypoints in Node during the build.
- Private-window field filtering in summaries moves verbatim.

## Phase A status (2026-11-24, branch `cleanup/foundations`)

Steps 1 and 2 are done. Guards: `tests/background/cleanup.test.ts`,
`tests/lifecycle/listeners.test.ts`, `tests/app/reset.test.ts` and
`tests/architecture/boundaries.test.ts`; `tests/support/runtime.ts` is a
small runtime harness for new tests. Shared helpers: `lib/messaging/identity`
(`same`), `lib/pipeline/replay` (`summarize`, `describes`),
`storage/session#evidenceRank`, `app/model#createEvidencePreview`,
`lib/diagnostics/summary` (`format`); snapshot writes use `utils/fence`.

Notes for the next steps:

- The ratchet records exact sizes. A fix that adds lines to an oversized file
  fails it; split first or land the fix with its own justified re-recording.
- Document-work scopes stay `AbortController`s. They become child contexts in
  `runtime/work.ts` once a runtime root context exists; the lifecycle release
  now in `completion.finally` would move to `scope.defer`, which changes its
  ordering and needs its own test.
- A replaced tab id releases the same memory as a closed tab but does not
  mark snapshots stopped or drop the session index (pinned in
  `listeners.test.ts`). Decide this when `listeners.ts` gets one
  `forgetTab(tabId, reason)`; changing it is a behaviour fix.
- The panel imports `same as sameTab` to keep its call sites; rename them in
  the panel split. `errorResponse` is the last long result helper.
- `background-api.test.ts` keeps its own harness as the step 4 guard.

## Separate behaviour fixes found

- Done: `runtime.ts` (`updateMatcherState`) and `scheduler/matcher.ts`
  (`finishIfComplete`) hard-coded `'offscreen-worker-pool'` as the executor;
  the executor now declares its kind (DS-08).
- Done: content-runtime injection moved from `runtime.ts` to
  `background/injection.ts`.
