# Matcher runtime bottleneck

Kaiju Deepscope now has durable popup snapshots, content-owned page observation, a disposable background coordinator, and packaged registry JSON artifacts. Those pieces make visible state safer, but they do not make CPU-bound matching fast by themselves.

The current slow-load trace points at one dominant cost:

```text
content collection                  fast
registry loading                    measurable but bounded
storage writes                      fast
replay trace creation               fast
candidate creation and refinement   fast
indexed observation matching        tens of seconds on Vercel traces
```

That means the next runtime work should optimize or relocate matching before adding more popup streaming machinery. Storage remains the delivery channel for visible state, but the matcher decides when useful detection state is available.

## Immediate fix before worker migration

The initial visible-tab pass disables high-fan-out URL-like evidence surfaces so the popup can show cheap page-local detections first. The matcher must honor that decision before routing observations into candidate-rule buckets.

```text
observation arrives
  -> disabled kind? skip before routing
  -> exact-key / literal / fallback routing
  -> semantic rule match
```

Skipping after routing is too late. On script-heavy pages, a disabled `scriptSrc` or `resourceUrl` observation can still touch thousands of candidate rules before the lower-level guard rejects each match. The early skip keeps initial matching aligned with the collection plan: expensive URL-like evidence belongs in enrichment, not in the first visible pass.

## Diagnostics needed for the next decision

The matcher timing span should include per-kind routing counts:

```text
observationsByKind
skippedObservationsByKind
candidateRulesByKind
candidateRuleCount
fallbackRuleCount
literalRejectedRuleCount
```

These counters let a Vercel trace prove whether the remaining cost is dominated by URL-like surfaces, broad fallback buckets, HTML/text matching, or another route. That confirmation decides whether the next step is more indexing or offscreen worker execution.

## Streaming should stay simpler

The previous storage work should not grow into a complex frame protocol just to make the popup look busy. Until the matcher can produce real partial detector output, a lifecycle stream only tells the user that work is happening. It does not solve first-result latency.

Prefer one throttle-based batching policy:

```text
flush when enough detector results are ready
or 50-100ms elapsed since the last flush
or the job completes
```

That policy is enough for worker partials later. Extra frame-size concepts should wait until there is a real worker result stream to batch.

## Offscreen matcher host direction

If early matcher pruning does not bring the initial pass into the target range, CPU-heavy matching should move out of the background service worker. The background service worker should coordinate jobs and persist snapshots, while an offscreen document owns one worker or a small worker pool.

```text
background service worker
  -> durable job records
  -> offscreen host creation
  -> stale-result rejection
  -> snapshot persistence

hidden offscreen matcher host
  -> worker lifecycle
  -> in-memory execution queue
  -> partial/done/error messages

matcher worker
  -> registry hydration
  -> indexed matching
  -> candidate/refinement output for the assigned job
```

The durable queue belongs in background-owned storage. Poolifier, if used, is only the execution layer inside the offscreen host. It should not own tab identity, cancellation policy, durable queue state, or side-panel-visible snapshots.

Start with a single-worker executor before Poolifier. A single worker proves the message protocol, stale-result rejection, snapshot merge behavior, and parity with the in-process matcher. A fixed Poolifier executor can follow behind the same adapter after benchmarks prove that parallel workers beat single-worker execution enough to justify duplicated registry memory and startup cost.

## Queue and cancellation policy

A matcher job must carry the active document identity:

```text
job id
tab id
frame id
document id when available
url hash
input snapshot revision
status
```

Before background applies a worker result, it must verify that the tab still exists, the document identity still matches, the result revision is newer than the last applied revision, and the job has not been canceled or marked stale.

This is the part that protects tab switching:

```text
tab A starts matching
user switches to tab B
job A finishes late
background rejects job A for tab B's visible stream
```

## Phase comparison

The phases already completed still matter:

```text
Durable snapshots       keep the latest visible result recoverable
Storage-first popup     lets cached state render before new work
Content page sessions   keep page-local observation outside background memory
Background coordinator  treats service-worker globals as disposable
Registry JSON assets    keep the full registry out of startup imports
Enrichment stream       separates first visible analysis from deeper evidence
```

The missing piece is not another popup state model. The missing piece is a fast or isolated matcher. Early disabled-kind pruning is the low-risk fix to try first. Offscreen workers are the next architectural move if the matcher remains CPU-bound after pruning and stronger indexes.
