# Context, tasks, activities and workflows

## Choose by the recovery claim

| Need                                                        | Owner                                                    | What it does not give you                          |
| ----------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------- |
| Cancellation, deadline and cleanup for one scope            | `@utils/context`                                     | Persisted execution                                |
| Pause, resume or cancel one local operation, await cleanup  | `@utils/task`                                        | Restart in another process                         |
| A typed job with resources and placement                    | `@utils/activity` and a selected engine              | Durable dispatch without a durable adapter         |
| A named program whose steps are recorded                    | `@utils/workflow`                                    | Exactly-once effects at an arbitrary external sink |
| Recorded completions                                        | `@utils/workflow/history`                            | Atomicity with an external write                   |
| Admission, claims and attempts                              | `@utils/workflow/dispatch`                           | Persistence from the in-memory implementation      |
| Durable queue and workflow history in IndexedDB             | `@utils/storage/{queue,workflow/history}/indexeddb`  | Correct fencing in the code that calls them        |
| Memory-only queue for private tabs                          | `@utils/storage/queue/memory`                        | Anything that survives the background unloading    |
| A required consequence announcement                         | `@utils/capability/effect`                           | A transaction with an earlier business write       |
| Bounded concurrency and capacity                            | `@utils/scheduler`                                   | Durable admission                                  |
| Optional lifecycle diagnostics                              | `@utils/telemetry`                                   | An authoritative result                            |

Choose these public contracts instead of an application-specific worker loop.

## A local Task

`task.start()` takes an ordinary work function and returns a live handle. `pause()` needs a cooperative checkpoint in
the work; it cannot freeze an arbitrary provider call. `resume()` releases that checkpoint. `cancel()` acts through the
lifetime signal. `done` settles after the Task's own cleanup. A Task borrows injected resources; it does not dispose
its callers' clients.

A process-local Task suits an interactive import without a persisted scheduler. Do not add a workflow engine when
those weaker guarantees are enough. A Task cannot meet a restart requirement by being retried.

## A workflow

An import-safe definition declares an ID, a version, input and result schemas, its activities and its dependencies.
The implementation is a generator that yields requests such as `yield* activity.request(Definition, input, { key })`.
The scheduler matches each request against history: it reuses a compatible completion or admits new work to
dispatch. An executor runs the admitted attempt with a selected engine and records its result.

The generator is not a saved stack. Replay restores accepted results. Check request keys, path identity, version and
input compatibility, bounded parallelism, cancellation, and failure or compensation rules before you claim that a
workflow recovers. A new definition with the same ID is not automatically the original.

In-memory dispatch and history reuse completed work while the process lives. They do not survive the loss of the
process, and they do not cover a crash between an external write and its recorded completion. Production needs
durable history and dispatch, attempt fencing and replay-safe effects. In DeepScope that is
`@utils/storage/workflow/history/indexeddb` fenced on an `@utils/storage/queue/indexeddb` claim, in one database so
one transaction can check both. A Chrome service worker, a Firefox event page and a Safari background page can all be
unloaded mid-scan; design for that loss. Private-tab work uses `@utils/storage/queue/memory` and the workflow history
`memory()` only, so nothing it does reaches disk.

## Acceptance and crash windows

An emitter's successful return means it accepted responsibility under its own contract. A memory callback, a durable
queue and a transactional outbox give different guarantees. Reuse one stable logical key across retries; an attempt
number is not the identity of a side effect.

Check each transition: from the business write to acceptance, from the claim to the external effect, and from the
effect to the recorded completion. A queue and a stable key alone do not make an arbitrary sink exactly-once. After
durable acceptance, a caller's cancellation follows the operation's continuation policy; it does not revoke an
accepted fact.

## Verification ladder

For a local Task, test checkpoints, cancellation, cleanup and the settlement of `done` with explicit signals, not
timing guesses. For a workflow or recovery claim, test replay, a changed version or input, duplicate and stale claims,
provider failure, cancellation and the crash window in question. Add real process loss and a fresh owner when you claim
persistence. Use the real adapter and sink for transaction and fencing claims.

`build-workflows` owns durable design and `build-libraries` owns a change to a public utility API.

## Sources and freshness

Written from the Kaiju-Ind/Utils task, workflow and effect guides (inspected 2026-11-22) and checked against the
vendored copies in `utils/` (base `47d2c0f`; see [utils/README.md](../../../../utils/README.md)). The IndexedDB and
labeled memory stores are DeepScope's own (`utils/storage/`); upstream PostgreSQL storage is not vendored. In a fake
IndexedDB test (`fake-indexeddb`), a claim proves fencing logic, not real browser durability; check the real browser
before claiming persistence across a background unload.
