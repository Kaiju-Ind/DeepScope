# `utils/`: vendored Kaiju Utils

DeepScope uses a subset of [Kaiju-Ind/Utils](https://github.com/Kaiju-Ind/Utils)
(MIT, © 2026 Okikio; the licence is in [`LICENSE`](./LICENSE)). The packages are
copied here, renamed from `@kaiju-ind/<package>` to `@utils/<package>`, so this
repository builds and publishes without access to the Utils repository or its
registry.

`src/` uses four of them today (source cleanup phase A):

| Package | Used by | For |
| --- | --- | --- |
| `@utils/result` | `src/lib/messaging/result.ts` (and every `ExtensionResult` caller) | `ExtensionResult` is `Result<Value, ExtensionError>`; `ok`/`fail`, failures carry `failure` |
| `@utils/context` | `src/lib/messaging/rpc.ts` | each `withTimeout` wait owns a context (`create`, `cancel`, `observe`, `delay`) |
| `@utils/dispose` | `src/lib/messaging/rpc.ts`, `src/lib/matcher/workers/pool.ts` | `DisposableStack` for a worker slot's listeners, timer and heap; `asyncDispose` key |
| `@utils/scheduler/capacity` | `src/lib/scheduler/budget.ts` | matcher admission leases (8 jobs, 12 MiB) |

The others are declared but not yet imported; DeepScope's pool, queue and
analysis lifecycle move onto them module by module (see "Migrating DeepScope
code" below).

## Layout

Each directory with a `package.json` is a pnpm workspace package
(`pnpm-workspace.yaml` lists `utils/*`). A package is named `@utils/<package>`,
is `private`, and its `exports` keep the upstream subpaths that were copied, so
`@kaiju-ind/scheduler/queue` becomes `@utils/scheduler/queue`. Packages ship
TypeScript source, which Vite (WXT), Vitest and `tsc` compile like `src/`.

Real package boundaries (rather than a path alias) keep each package's
dependencies declared where they are used, let pnpm enforce them, and leave the
packages publishable later. The root `package.json` depends only on the
packages DeepScope adopts; the others are reached through them.

| Package | Role | Source lines | Test lines (files) |
| --- | --- | ---: | ---: |
| `result` | adopted | 847 | 691 (11) |
| `dispose` | adopted | 424 | 376 (4) |
| `scheduler` (`capacity`, `queue`) | adopted | 2,966 | 842 (9) |
| `context` | adopted | 2,225 | 1,495 (11) |
| `duration` | adopted (via `context`) | 781 | 581 (11) |
| `pool` | adopted | 1,010 | 1,045 (6) |
| `worker` (`thread`, `protocol`) | adopted | 2,021 | 1,141 (8) |
| `workflow` | adopted | 10,570 | 3,915 (19) |
| `activity` | adopted | 2,293 | 828 (5) |
| `collection`, `schema`, `telemetry` | transitive: only the files adopted code imports | 4,566 | 2,021 (22) |
| `capability`, `authz`, `env`, `task` | transitive (`workflow`, `activity`) | 6,044 | 3,104 (27) |
| `storage` | DeepScope's own browser stores (below) | 1,257 | 253 (3) |

Line counts include the attribution headers and, for `scheduler` and
`duration`, DeepScope's local files.

Not copied: `query`, upstream `storage` (Postgres), `scheduler/concurrency`,
`scheduler` root (`mod.ts`, `turn.ts`), `worker/process`, `worker/stream`,
`worker/supervisor`, `activity/http`, `activity/process`, `hash`, `http`,
`server`, `hono`, `streams`, `input`, `format`, `runtime`. `task` is present
only because `workflow/serve.ts` imports it.

## Source

- Base: `Kaiju-Ind/Utils` `main` at `47d2c0fca0df98562d23169d00a67e5832ac1fec`.
- Overlay: the head of PR #29 (`perf/quadratic`, `9f2f0a4`) for
  `collection/record/{mod,json}.ts`, `collection/record/capabilities.test.ts`,
  `scheduler/queue/mod.ts` and `workflow/dispatch.ts`. It removes O(n²) work
  from the memory queue (1,000 items: 47.6 ms to 1.2 ms), `dispatch.memory`
  and `record.map`, which private-tab and test paths use directly.
- No other open PR touches these packages except PR #20, which only raises
  dependency versions. The npm versions below are the ones PR #20's lockfile
  resolves, pinned exactly.

| npm dependency | Version | Used by |
| --- | --- | --- |
| `@okikio/observables` | 1.4.0 | context, pool, worker, workflow, telemetry, scheduler |
| `@standard-schema/spec` | 1.1.0 | schema, scheduler, activity |
| `@std/async` | `npm:@jsr/std__async@1.5.1` | context |
| `@std/encoding` | `npm:@jsr/std__encoding@1.0.11` | workflow, capability |
| `temporal-polyfill` | 1.0.8 | duration (Safari builds only, see below) |
| `idb` | 8.0.4 | storage |
| `@std/expect`, `fast-check`, `zod`, `fake-indexeddb` | 1.0.20, 4.11.0, 4.6.7, 6.2.8 | tests only |

`@okikio/observables` is a separate npm package, not part of Utils, so its
name is unchanged.

## Attribution and local changes

Every copied `.ts` file starts with:

```ts
// Vendored from Kaiju-Ind/Utils packages/<path> @ <commit>[ (PR #n)].
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: <none|description>. Resync: scripts/utils/sync.ts.
```

Copied READMEs start with an equivalent HTML comment. Apart from the header and
the `@kaiju-ind/` to `@utils/` rename, **no vendored file is patched**.
`utils/sync.json#patches` and `utils/patches/` are where a patch would go.

DeepScope's own files carry no header and say so in their first comment:

| File | Purpose |
| --- | --- |
| `duration/temporal.native.ts` (+ test) | Native Temporal for Chrome and Firefox builds |
| `scheduler/queue/extensions.ts` | Labels, `cancelWhere`, `reprioritize`, `abandon` (optional queue methods) |
| `scheduler/queue/testing.ts` | Queue conformance suite |
| `storage/**` | IndexedDB queue and workflow history, labeled memory queue |
| `vitest.node-test.ts` | Runs upstream `node:test` files under Vitest |

`extensions.ts`, `testing.ts` and the stores are written to be proposed
upstream unchanged (as `storage/queue/indexeddb.ts` and
`storage/workflow/history/indexeddb.ts`).

### Temporal

Only `duration/temporal.ts` imports `temporal-polyfill`, and it already
prefers `globalThis.Temporal` at run time, so it needs no patch. The static
import would still put the polyfill (about 22 KB gzipped) in every bundle.
`wxt.config.ts` aliases `temporal-polyfill/full/implementation` to
`duration/temporal.native.ts` for Chrome, Edge, Opera and Firefox, whose
minimum versions (Chromium 144, Firefox 140) ship Temporal. Safari 18.4 to 27.2
lacks it, so Safari builds keep the polyfill; Safari's background is a page, so
a static import is acceptable there. Vitest runs on Node 26, which has native
Temporal, without the alias.

## Tests

The `utils` project in `vitest.config.ts` collects `utils/**/*.test.ts`, so
`pnpm test` and `vitest run` run them with everything else. Upstream tests use
`node:test` and `@std/expect`; the project aliases `node:test` to
`vitest.node-test.ts`. Type tests (`types.test.ts`, `*.types.test.ts`) contain
only compile-time assertions, so `pnpm compile` checks them and Vitest skips
them.

A test is copied only when everything it imports is copied (or is a fixture)
and its other imports are listed in `sync.json#testExternals`. The 49 tests
left upstream need code that was not copied (`worker/process`, `schema/time`,
`authz/role`, ...) or Node-only modules (`node:http`, `node:process`); the
sync script prints the list with the reason for each.

## Resync

```sh
git -C ../kaiju-utils fetch origin
# edit utils/sync.json: base, overlays, entries, pinned versions
node scripts/utils/sync.ts --source ../kaiju-utils
pnpm install && pnpm compile && pnpm vitest run --project utils
```

The script follows every import from the entry points in `sync.json`,
copies exactly the files reached plus the tests that stay inside that set,
rewrites `@kaiju-ind/` to `@utils/`, writes headers and package manifests,
applies `utils/patches/*.patch`, and removes vendored files no longer reached.
It never touches files without the vendored header. `--check` writes nothing
and fails when `utils/` differs from a fresh sync.

When an upstream PR merges, drop its overlay and move `base` past it. To adopt
another package, add its entry points; transitive files follow.

## Browser stores (`@utils/storage`)

`@utils/storage/indexeddb` opens one database holding the queue
(`queue.items`, `queue.meta`) and workflow history (`workflow.history`), so a
history write can check the queue claim it depends on in one transaction.

`@utils/storage/queue/indexeddb` implements `Queue` plus every extension:

- one readwrite transaction per operation: admission checks the key and
  capacity and assigns the sequence; a claim promotes due delayed items,
  recovers expired claims and leases in priority/FIFO order;
- fencing: completion, failure, retry, renewal and consumer cancellation
  re-read the row and need the same claim id and owner and an unexpired lease;
- lanes instead of partial indexes: rows are `claimed`, `delayed`, `ready` or
  `terminal`; `order` (`[ns, lane, -priority, seq]`) gives claim order and
  `due` (`[ns, lane, instant]`) gives the next availability, expiry or finish;
- labels in a multi-entry `tags` index for `cancelWhere` and `reprioritize`;
  `abandon({ owner })` or `abandon({ exceptOwner })` releases a dead owner's
  leases at once (DeepScope's `recoverClaims` after a service-worker restart);
- waits wake on local changes, on a `BroadcastChannel` message from another
  context, at the next due instant, or after `poll` (default 1 s).

`@utils/storage/workflow/history/indexeddb` records each instruction's
fingerprint before it runs and its encoded completion after, joins concurrent
calls in one context, raises `ReplayError` on divergence, and with `fence`
writes a completion only while the run's queue claim is live. `forget(runId)`
deletes a finished run.

`@utils/storage/queue/memory` wraps `queue.memory()` with labels,
`cancelWhere` and `abandon` (not `reprioritize`, which the upstream memory
queue cannot do). **Private-tab work must use this and
`@utils/workflow/history#memory` only**, so nothing it does reaches disk.

`scheduler/queue/testing.ts#conformance` runs the same 25 cases (22 core, 3
extension cases that run when a store provides the method) against the
upstream memory queue, the labeled memory queue and the IndexedDB queue under
`fake-indexeddb`, including 30 concurrent claims across three handles on one
database with no item leased twice.

## Migrating DeepScope code

Order (each step is one reviewable change with its own tests):

1. Done: `src/utils/result.ts` callers to `@utils/result`.
2. Done: the reserve/release accounting in `scheduler/matcher.ts` to
   `@utils/scheduler/capacity`; the limits in `budget.ts` stay DeepScope policy.
3. Done for `rpc.ts:withTimeout` (`withLivenessDeadline` composes it). The
   per-tab `AbortController` document-work scopes in the background runtime
   move to child contexts with the runtime split, when `work.ts` owns them
   and a runtime root context exists to parent them.
4. `matcher/workers/pool.ts`, the slot logic in `executor.ts` and the worker
   message loop to `@utils/pool` and `@utils/worker/thread` + `protocol`.
5. `scheduler/database.ts` to `@utils/storage/queue/indexeddb`: one namespace
   per work kind, labels `{ session, window, tab }`; admit/claim/recover/tab
   removal/window reprioritisation become `add`/`claim`/`abandon`/
   `cancelWhere`/`reprioritize`; other browser sessions become `cancelWhere`
   on `session`. Private tabs get `queue/memory`.
6. `scheduler/analysis.ts` to a `@utils/workflow` workflow with the IndexedDB
   history fenced on its queue claim (`history.memory()` in private tabs).
   `fairness.ts`, `fence`, `generation` and `dictionary` stay DeepScope code.
