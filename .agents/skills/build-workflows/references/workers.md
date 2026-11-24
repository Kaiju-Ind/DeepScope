# Workers, queues, schedules, waits, and flow control

## Snapshot scope (2026-10-14)

Use the vendored `@utils/*` packages (`use-utils`) for utility contracts. Query parsing,
local Task control, recorded workflow instructions, and durable external
execution have distinct owners and guarantees. Inspect the selected package and
adapter; apply transaction, authorization, and recovery criteria to the actual
claim. Dated application observations do not establish current package defects,
public exports, required folder layouts, or a need for a workflow engine.


## Contents

- [Worker process contract](#worker-process-contract)
- [Atomic queue claims and leases](#atomic-queue-claims-and-leases)
- [Retry and poison work](#retry-and-poison-work)
- [Timers and schedules](#timers-and-schedules)
- [Waits, signals, and updates](#waits-signals-and-updates)
- [Backpressure and fairness](#backpressure-and-fairness)
- [Cancellation and shutdown](#cancellation-and-shutdown)
- [Observability](#observability)
- [Tests and failure signatures](#tests-and-failure-signatures)

## Worker process contract

The worker entrypoint owns:

- validated environment-specific config;
- database/queue/engine connections;
- exact workflow/activity catalog;
- queue/task-queue names and build/version identity;
- loop supervision and failure policy;
- concurrency, rate, lease, heartbeat, polling, and batch settings;
- health/readiness and graceful shutdown;
- logs, traces, metrics, and secret redaction.

Worker readiness requires a compatible catalog and active pollers/loops against
the intended queue/engine. A boot function returning `{ loops: [] }` or a process
blocked before registration is not ready.

Separate execution hosts by capability and cost when appropriate: in DeepScope,
matcher partitions run in `DedicatedWorker`s (in the offscreen document on
Chrome, in the background page on Firefox and Safari), while scheduler control
and badge updates stay in the background. They should not share one queue.

## Atomic queue claims and leases

Use one atomic claim primitive. In DeepScope that is one IndexedDB readwrite
transaction in `@utils/storage/queue/indexeddb`: IndexedDB serialises readwrite
transactions on a store across the extension origin, so the service worker and
the offscreen document cannot lease the same item.

```text
readwrite transaction on queue.items
  promote due delayed rows; recover rows whose lease expired
  open cursor on index order = [namespace, 'ready', -priority, seq]
  first row -> lane 'claimed', claim id, owner, lease expiry, attempt + 1
  commit
```

Stable ordering needs a tie-breaker (`seq`). Never split the read and the write
across two transactions.

Lease semantics:

- owner uniquely identifies worker process/build;
- expiry is durable and based on database/engine time where possible;
- heartbeat extends only a still-owned generation;
- completion/ack requires matching owner/fencing token;
- expired work becomes recoverable;
- a late worker cannot commit after takeover;
- effect idempotency still protects external consequences.

## Retry and poison work

Classify before retry:

| Failure | Examples | Action |
|---|---|---|
| Invalid/permanent | Schema, unsupported version, auth/policy | Quarantine/fail, no retry |
| Transient | 503, connection loss, lock timeout | Backoff/jitter within budget |
| Rate limited | 429/provider quota | Honor reset/retry-after and global budget |
| Ambiguous | Timeout after possible commit | Reconcile by operation key |
| Defect | Invariant/code bug | Fail/alert; retry only after rollout/decision |
| Cancellation | User/operator/shutdown | Cooperative terminal/requeue policy |

Persist attempt count, next available time, safe structured last error, and
history. Move exhausted/permanent work to a visible dead-letter/quarantine state
with inspect, correct, and redrive commands. Do not retry malformed poison work
forever.

Coordinate retry budgets across engine, queue, Activity, HTTP client, and
provider SDK. Nested retries can multiply load and exceed business deadlines.

## Timers and schedules

Differentiate:

- durable one-shot delay;
- workflow timer/wait timeout;
- fixed interval;
- calendar/cron schedule;
- backfill/replay campaign.

Schedule contract includes timezone, daylight-saving behavior, overlap, missed
runs, catch-up window, jitter, pause/resume, backfill, start identity, and
cancellation.

Do not compute cron behavior with an interval helper. The uploaded scheduler
explicitly declines to advance cron without calendar/timezone expansion; retain
that honesty. Use a tested parser/platform and fixture DST transitions.

Publishing a due schedule and advancing `next_run_at` must be atomic or
reconciled. Stable schedule-occurrence IDs deduplicate repeat scans.

## Waits, signals, and updates

Wait record:

- wait ID, execution ID, name/type, schema version;
- authorization scope and correlation key;
- created/timeout timestamps;
- resume token/engine identity;
- active/resolved/timed-out/cancelled state;
- winning message/event ID and payload reference;
- buffered signal policy.

Signal procedure:

1. authenticate/authorize sender and execution scope;
2. validate message version/payload;
3. deduplicate signal ID;
4. find eligible wait or buffer according to contract;
5. atomically choose winner against timeout/cancel;
6. enqueue/complete engine resume and append timeline;
7. acknowledge acceptance versus processed result accurately.

Do not lose early signals that arrive before a wait unless the contract explicitly
rejects them. Bound buffered signals and retention.

Queries are read-only. Signals are accepted asynchronous state changes. Updates
can return an accepted/processed result in engines such as Temporal. A custom
control plane must define its own semantics rather than using the names loosely.

## Backpressure and fairness

Control:

- global and per-worker concurrency;
- per-tenant/workflow/resource slots;
- provider concurrency/rate;
- queue depth and admission shedding;
- claim batch and prefetch;
- memory/open files/connections;
- priority aging/starvation prevention;
- parked runs versus active slots;
- replay/backfill budgets separated from live traffic.

Concurrency limits active execution; a durable wait normally should not consume
an active worker slot. Store enough state to reacquire admission fairly on resume.

Avoid prefetch larger than workers can heartbeat/process within lease duration.
Measure queue wait, runnable age, schedule-to-start, active slots, retry rate,
tenant fairness, provider saturation, and oldest poison item.

## Cancellation and shutdown

Cancellation states can include requested, observed, compensating/cleanup, and
terminal cancelled. Workers check cancellation before new effects and at safe
points in long work. Heartbeats can deliver cancellation in engines that support
it.

Shutdown:

1. mark worker unready;
2. stop claims/polls;
3. request interruption of in-flight work where safe;
4. drain within deadline while heartbeating owned leases;
5. acknowledge completed effects and persist checkpoints;
6. leave/release remaining work according to engine contract;
7. flush telemetry and close resources.

Never release a lease while its old effect can still commit without fencing.

## Observability

Per work item record queue wait, lease owner/generation, workflow/run, activity,
attempt, retry delay, deadline, cancellation, worker build, safe cause, and
result/checkpoint identity. Correlate with originating request/event and tenant
without leaking payloads.

Alert on no pollers, expired leases, oldest runnable age, retry storms, dead
letters, stuck cancellation, due timers, unprocessed signals, worker loop exit,
and downstream saturation.

## Tests and failure signatures

- Run two workers claiming the same queue under load.
- Kill after claim, effect commit, checkpoint, and ack.
- Let a late old owner commit after lease takeover; fencing must reject it.
- Test retry classes, `Retry-After`, budgets, and poison redrive.
- Exercise interval/cron timezone, DST, missed/overlap/catch-up behavior.
- Race signal, timeout, cancellation, duplicate, and early signal.
- Saturate one tenant/provider and verify fairness/backpressure.
- Shutdown with idle, queued, running, waiting, and heartbeating work.

| Signature | Defect | Correction |
|---|---|---|
| Same item leased twice | Read/update race or expiry error | Atomic claim + generation |
| Old worker overwrites new result | No fencing/CAS | Generation-bound commit |
| Cron drifts or doubles at DST | Interval/naive local-time math | Calendar/timezone engine |
| Signal accepted but run never wakes | Non-atomic wait/resume | Transaction/reconciler |
| Queue grows while CPU idle | Admission/worker settings contradict | End-to-end capacity audit |
| One tenant starves others | Global FIFO only | Scoped limits/fair scheduling |
| Worker “ready” with dead loop | Readiness ignores supervision | Loop health policy |

## Sources and freshness

- IndexedDB transaction lifetime and ordering: https://w3c.github.io/IndexedDB/#transaction-lifetime
  (primary source).
- `utils/storage/` and the queue conformance suite in
  `utils/scheduler/queue/testing.ts` (30 concurrent claims, no double lease).
- Attachments, verified 2026-07-17: `evidence/app/product/utils/workflows/worker/`
  and `utils/workflows/env.ts` (observed source with cron and atomicity gaps called out).
