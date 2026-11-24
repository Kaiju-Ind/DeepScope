# Selecting local Tasks and recorded workflow instructions

## Start from the guarantee

An ordinary async function is enough for bounded work whose caller needs only
the result. A local Task adds cooperative pause/resume/cancellation and terminal
settlement after cleanup. A workflow adds named instructions and reusable
recorded completions. Durable restart requires a persistent history and dispatch
owner plus replay-safe effects. Each level solves a different problem.

Make a concrete recommendation for the caller, not just a list of layers:

| Caller needs | Choose | What it does not add |
| --- | --- | --- |
| One bounded result | Ordinary value or Promise | Independent control or recorded recovery |
| Pause/cancel and joined local cleanup | Task, or a `@utils/context` scope | Restart persistence |
| Named instructions with reusable completions | Activity execution plus workflow/history/dispatch | Atomic external effects without a supporting store/sink contract |

`await task.done` returns the work's value only after owned cleanup completes;
work or cleanup failure rejects it. A status/event is observation, not that
terminal result. A cooperative checkpoint cannot preempt an indivisible call.

Do not infer durability from the word workflow, a retry loop, or two successful
executions in one process. Do not require a workflow engine for every async job:
a scan that can be re-collected from the still-open page after the background
unloads does not need recorded history.

## The vendored utility model

The vendored `@utils/*` packages separate Context, Task, activity, workflow,
resource, requirement, and effect capabilities. The capability package's effect
announces consequences; it is distinct from the Effect TypeScript runtime.

```text
import-safe workflow/activity descriptions + exact implementations
  -> generator yields instruction
  -> scheduler checks history
       -> compatible completion: reuse
       -> new work: dispatch -> admitted executor -> completion
  -> resume program -> validate result -> awaited owned cleanup
```

History records instruction outcomes, not live stack frames or ports. Dispatch
owns admission/claim attempts. The executor owns actual side effects. Stable
instruction and effect identity must survive retries according to the selected
version and input contract.

## DeepScope stores

DeepScope runs workflows in-process in the background context, with stores that
survive a service-worker or event-page unload (see `utils/README.md`):

| Store | Package | Use |
| --- | --- | --- |
| Queue | `@utils/storage/queue/indexeddb` | scheduler control records: admit, claim with lease and fencing, `cancelWhere`, `reprioritize`, `abandon` after a restart |
| Workflow history | `@utils/storage/workflow/history/indexeddb` | recorded instruction completions, fenced on the run's queue claim |
| Memory queue and history | `@utils/storage/queue/memory`, `@utils/workflow/history#memory` | private tabs only; nothing reaches disk |

Both IndexedDB stores live in one database so a history write can check the
queue claim in the same transaction. Matcher batches stay transient; only
control records use the queue. `fairness.ts`, `budget.ts`, `fence`,
`generation` and `dictionary` stay DeepScope policy in `src/`.

## Distinct lifetimes and authority

Context supplies cancellation/deadline/clock/identity and scoped cleanup. A Task
checkpoint cooperates with pause; it does not stop an indivisible in-flight call.
Task `done` includes cleanup, while an observation event is not the answer.
Resource collections own their created clients; Tasks and activities borrow
them according to declared access, without independently closing shared values.

Reuse logical keys across retries; do not substitute attempt identity for
consequence identity. A tab, document identity and generation identify a scan;
an attempt is one claim of it.

## Select and verify the implementation

Inspect the vendored exports in `utils/<package>/package.json` and their tests
before choosing a path; use `use-utils` for exact identity and the resync
procedure. Test only the layers affected by the claim: local checkpoint/control
semantics; recorded instruction compatibility; bounded parallelism; stale claim
rejection; cancellation and cleanup; fresh-owner reconstruction after an unload;
and private-tab paths that must never persist. The queue conformance suite
(`utils/scheduler/queue/testing.ts`) runs against every queue store under
`fake-indexeddb`; a new store must pass it. Preserve source-level findings
separately from real-browser evidence.

## Sources and limits

The vendored packages and `utils/README.md` at the commit recorded there. This
reference defines selection and proof criteria; it does not certify behavior in
a given browser.
