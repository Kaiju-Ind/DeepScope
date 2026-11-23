# Source layout cleanup plan

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
   panel reset paths, and `module-boundaries.test.ts` (size ratchet and
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

## Separate behaviour fixes found

- `runtime.ts:2975` records `'offscreen-worker-pool'` as the executor even when
  the Firefox or Safari local executor ran the job; the value is persisted.
