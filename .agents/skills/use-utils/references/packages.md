# Vendored utility package map

Find the owner of a need here, then read the package README beside the code. Every package is a pnpm workspace
package `@utils/<package>` under [`utils/`](../../../../utils/README.md), copied from Kaiju-Ind/Utils with the upstream
`@kaiju-ind/*` names rewritten. Every subpath below is a public `exports` entry of the vendored `package.json`; read
that file before importing, because only the subpaths that DeepScope adopted were copied.

"Adopted" packages are dependencies of the root `package.json`. "Transitive" packages are present only because
adopted code imports them; depend on one directly only after adding it to `utils/sync.json#entries` and resyncing.

## Lifetime, control and cleanup

| Package    | Status     | Use it to                                                            | Subpaths                                                                  | README                                             |
| ---------- | ---------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- |
| `context`  | adopted    | Give related work one lifetime, deadline and cancellation signal     | root, `/types`, `/state`, `/events`, `/testing`                           | [context](../../../../utils/context/README.md)     |
| `dispose`  | adopted    | Give cleanup one owner                                               | root, `/once`, `/run`, `/polyfill`, `/ponyfill`                           | [dispose](../../../../utils/dispose/README.md)     |
| `duration` | adopted    | Write and convert time budgets such as `sec(8)`                      | root, `/units`, `/conversion`, `/instant`, `/temporal`, `/format`, ...    | [duration](../../../../utils/duration/README.md)   |
| `result`   | adopted    | Return success or failure as a value; declare failures; bound faults | root, `/async`, `/failure`, `/fault`, `/failure/migrate`                  | [result](../../../../utils/result/README.md)       |
| `task`     | transitive | Pause, resume or cancel one local operation and await its result     | root, `/types`, `/progress`                                               | [task](../../../../utils/task/README.md)           |

## Work, scheduling and recovery

| Package     | Status     | Use it to                                                              | Subpaths                                                                        | README                                               |
| ----------- | ---------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `scheduler` | adopted    | Reserve capacity and queue accepted work                               | `/capacity`, `/queue`, `/queue/extensions`, `/queue/testing`, `/queue/policy`   | [scheduler](../../../../utils/scheduler/queue/README.md) |
| `pool`      | adopted    | Reuse a costly resource, such as a matcher worker, with leases         | root, `/types`                                                                  | [pool](../../../../utils/pool/README.md)             |
| `worker`    | adopted    | Own a dedicated worker thread and its message protocol                 | `/thread`, `/protocol`                                                          | [worker](../../../../utils/worker/README.md)         |
| `activity`  | adopted    | Declare a named job with checked input and output, and run it          | root, `/engine`, `/local`, `/worker`, `/selection`                              | [activity](../../../../utils/activity/README.md)     |
| `workflow`  | adopted    | Record a program's steps so a new background context can resume it     | root, `/dispatch`, `/history`, `/replay`, `/execution`, `/testing`              | [workflow](../../../../utils/workflow/README.md)     |
| `storage`   | DeepScope  | IndexedDB queue and workflow history; labeled memory queue             | `/indexeddb`, `/queue/indexeddb`, `/queue/memory`, `/workflow/history/indexeddb` | [utils README](../../../../utils/README.md#browser-stores-utilsstorage) |

## Values, schemas and diagnostics (transitive)

| Package      | Use it to                                                    | Subpaths                                                     |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `collection` | Keyed records and catalogs                                   | `/record`, `/record/json`, `/record/change`, `/catalog`      |
| `schema`     | Standard Schema definitions and codecs                       | root, `/codec`                                               |
| `telemetry`  | Optional lifecycle diagnostics                               | root, `/instrument`, `/observe`, `/events`                   |
| `capability` | Resources, requirements, effects and resilience (retry/poll) | `/resource`, `/requirement`, `/effect`, `/resilience`, ...   |
| `authz`      | Permission definitions used by `activity`                    | `/permission`                                                |
| `env`        | Typed environment reads used by `workflow`                   | root, `/standard`                                            |

## Not vendored

`query`, upstream `storage` (PostgreSQL), `scheduler/concurrency`, `worker/process`, `worker/stream`,
`worker/supervisor`, `activity/http`, `activity/process`, `hash`, `http`, `server`, `hono`, `streams`, `input`,
`format` and `runtime`. Most need Node, a server or a database that an extension does not have. The utils README
records why each was left out; read it before vendoring one.

## DeepScope code that stays DeepScope code

`src/utils/fence.ts`, `src/utils/generation.ts` and `src/utils/dictionary.ts` (prototype-safe maps for
page-controlled keys) have no Utils equivalent.
The scheduler's fairness and budget limits are product policy that uses `@utils/scheduler/capacity`, not utilities.
