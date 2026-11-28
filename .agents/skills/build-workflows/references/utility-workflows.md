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
| Pause/cancel and joined local cleanup | Task | Restart persistence |
| Named instructions with reusable completions | Activity execution plus workflow/history/dispatch | Atomic external effects without a supporting store/sink contract |

`await task.done` returns the work's value only after owned cleanup completes;
work or cleanup failure rejects it. A status/event is observation, not that
terminal result. A cooperative checkpoint cannot preempt an indivisible call.

Do not infer durability from the word workflow, a retry loop, or two successful
executions in one process. Do not require a workflow engine for every async job.

## Current supplied utility model

The Kaiju Utils packages separate Context, Task, activity,
workflow, resource, requirement, and effect capabilities. Its effect package
announces consequences; it is distinct from the Effect TypeScript runtime.

```text
import-safe workflow/activity descriptions + exact implementations
  -> generator yields instruction
  -> scheduler checks history
       -> compatible completion: reuse
       -> new work: dispatch -> admitted executor/provider -> completion
  -> resume program -> validate result -> awaited owned cleanup
```

History records instruction outcomes, not live stack frames or provider sockets.
Dispatch owns admission/claim attempts. The provider owns actual side effects.
Placement selects eligible engines/hosts. Stable instruction and effect identity
must survive retries according to the selected version and input contract.

The current workspace example uses memory dispatch and history. It demonstrates replay
while those owners live. Reconstructing a fresh process from durable stores is a
separate proof, as is preventing duplication after a crash between an external
write and recording the instruction result.

## Distinct lifetimes and authority

Context supplies cancellation/deadline/clock/identity and scoped cleanup. A Task
checkpoint cooperates with pause; it does not stop an indivisible in-flight call.
Task `done` includes cleanup, while an observation event is not the answer.
Resource collections own their created clients; Tasks and activities borrow
them according to declared access, without independently closing shared values.

Effect announcements require acceptance by the chosen emitter. An effect owner
is not an optional telemetry sink, and an effect declaration is not proof of
durable delivery. Business mutation and acceptance need one authoritative
transaction/outbox if they must commit together. Reuse logical keys across
retries; do not substitute attempt identity for consequence identity.

## Select and verify the implementation

The published `@kaiju-ind/workflow` 1.0.0 exports `/dispatch`, `/history` and
`/replay`; `@kaiju-ind/task` and `@kaiju-ind/scheduler` are separate packages.
Inspect the installed exports and tests before choosing a path. Use
`use-kaiju-utils` for exact identity and versions.

Test only the layers affected by the claim: local checkpoint/control semantics;
recorded instruction compatibility; bounded parallelism; stale claim rejection;
cancellation and cleanup; fresh-owner reconstruction; crash-window atomicity;
and replay-safe sink behavior. Preserve source-level findings separately from
executed runtime or deployment evidence.

## Sources and limits

Inspected 2026-11-22: the published `@kaiju-ind/context`, `task`, `activity`,
`workflow` and `capability` packages and the Kaiju-Ind/utils guides.
This reference defines selection and proof criteria; it does not certify a
durable external engine, database adapter, or deployed host.
