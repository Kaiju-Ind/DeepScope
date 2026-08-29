# Partitioned offscreen matcher runtime

CPU-heavy technology matching must not monopolize the Manifest V3 background service worker. DeepScope therefore separates scheduling from execution.

```text
background service worker
  -> persist small matcher control record
  -> retain bounded transient ObservationBatch
  -> split batch into kind partitions
  -> choose next partition by tab priority and fairness
  -> dispatch at most two independent kinds

matcher offscreen document
  -> own two DedicatedWorker slots
  -> preserve one hot shard owner per observation kind
  -> execute only scheduler-selected partitions
  -> cancel and replace only the worker slot that owns canceled work

matcher dedicated worker
  -> load one observation-kind registry shard
  -> reuse weighted shard cache
  -> compile packaged RegExp values lazily
  -> return one partition result

background service worker
  -> accumulate each partition exactly once
  -> publish bounded partial revisions
  -> run final relationship/candidate emission
```

The offscreen document does not own a waiting job queue. Waiting policy, tab priority, fairness, and durable job control belong to the background scheduler.

## Durable control state

IndexedDB stores only small execution-control records through `idb`.

```text
persisted
  work id
  browser session id
  tab/window/document identity
  semantic priority
  queued/claimed state
  attempt and claim owner
  estimated transient bytes

not persisted by the scheduler
  raw HTML
  page text
  script source
  cookies
  ObservationBatch
  MatcherPartitionResult[]
```

Raw page evidence remains transient. This keeps the scheduler from changing DeepScope into a local page archive merely to survive service-worker replacement.

The background keeps no more than eight matcher jobs and 12 MiB of estimated transient observation evidence. IndexedDB durability does not make RAM buffering unbounded.

## Tab priority and fairness

Tab activation changes the priority of unfinished work. It does not cancel an open tab.

```text
explicit user work     interactive
active automatic work  foreground
inactive open tab       background
cleanup/reconciliation maintenance
```

The active tab normally receives matcher capacity first. When lower-priority work is waiting, the scheduler forces one lower-priority partition after a bounded foreground burst. This prevents a stream of newly active tabs from starving background tabs indefinitely.

Priority changes apply between partitions. A partition already running is allowed to finish. The next partition is selected from current priority state.

## Kind affinity

The scheduler does not run two partitions of the same observation kind concurrently. The offscreen pool maps each active kind to one worker slot for the lifetime of the hot pool.

This matters for large shards such as `scriptSrc` and `jsGlobal`. Keeping one kind on one worker avoids hydrating the same heavy shard into both worker heaps without evidence that duplication improves latency.

Affinity is a performance policy, not job ownership. Different jobs can use the same kind owner over time.

## Cancellation

Closed or replaced documents stop work. Tab switching does not.

```text
tab closes / document changes
  -> abort live collection
  -> remove durable scheduler records
  -> reject queued matcher work
  -> cancel active partitions for that tab
  -> replace only affected DedicatedWorker slots
  -> reject stale publication
```

Per-worker replacement is deliberate. Canceling one tab must not terminate an unrelated partition that another worker is still executing.

A CPU-bound DedicatedWorker cannot process a normal cancellation message while synchronous matcher JavaScript is running. DeepScope therefore cancels an active partition by terminating that one worker slot and creating a fresh worker for later work.

## Service-worker replacement

The browser-session id lives in `chrome.storage.session`. IndexedDB work records survive a Manifest V3 service-worker replacement inside the same browser session.

Analysis intent can be requeued because collection can run again against the live document. Matcher records cannot resume because their raw observation batches are intentionally not durable. A replacement background therefore cancels orphaned offscreen matcher work, removes those matcher records, and schedules fresh analysis for still-valid visible tabs.

This guarantee is service-worker restart recovery. It is not cross-browser-session batch durability.

## Offscreen lifetime

Two matcher workers stay hot across the stages of one analysis lifecycle because recreating them between initial and enriched matching would increase latency.

Normal completion explicitly releases the analysis lifecycle. When no partition and no lifecycle remains, the offscreen host terminates both workers immediately and asks the background to close the document.

A 30-second host-owned timer remains only as a watchdog for a lost background context or missed lifecycle release. The background does not own a competing idle timer.

## Shard memory

Each matcher worker uses one weighted shard cache. The old fixed four-shard LRU and the second `recentShardKinds` cache authority are removed.

Worker diagnostics report:

```text
retained shard bytes
retained shard count
shard cache budget
current shard rule/pattern counts
packaged RegExp compile count
packaged RegExp cache-hit count
```

These measurements are intended to correlate Chrome process memory with actual matcher state. They do not claim that V8 heap size equals Chrome Task Manager memory footprint.

## Build-time routing

The Registry is static for one extension version. Matcher route tables are therefore packaged as numeric references at build time rather than reconstructed by walking every matcher rule on every cold shard load.

Workers hydrate those references against the shard's shared technology/rule objects. Packaged regular expressions remain `{ source, flags }` values until semantic evaluation actually needs a `RegExp`.

## Verification

A packaged Chrome release should prove:

- active-tab work normally wins without starving inactive tabs;
- switching tabs reprioritizes instead of canceling open-tab work;
- closing or replacing a tab stops all work owned by the old document;
- two independent kinds can use both matcher workers;
- two partitions of the same kind do not duplicate the shard across workers;
- canceling one job replaces only worker slots that execute that job;
- one background accumulator owns complete partition results;
- transient observation memory respects both job-count and byte limits;
- orphaned matcher records are reconciled after service-worker replacement;
- worker pools terminate promptly after the final analysis lifecycle releases;
- repeated idle -> scan -> release cycles return to a stable process-memory range;
- build-generated matcher routes are behaviorally equivalent to the reference runtime index builder.
