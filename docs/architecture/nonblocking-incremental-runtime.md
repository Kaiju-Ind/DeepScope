# Non-blocking incremental matcher runtime

The visible-tab command now starts the analysis session and returns before CPU-bound matching completes. The popup should treat storage-backed detector snapshots as the receive stream: stored snapshot output paints first, worker partition revisions advance the visible result, and the final matcher result replaces the cache when all partitions finish.

This fixes the older staged shape where the popup waited for one large matcher job, then started later evidence work. In that design, collection took milliseconds but the matcher could occupy the background request for tens of seconds. The content observer could expire while the first matcher job was still running, and popup reopen behavior could race between content lifecycle snapshots and detector snapshots.

```text
popup opens
  -> background reads the visible snapshot or returns a pending response
  -> content/background collectors gather cheap first-pass observations
  -> matcher job is registered and dispatched without blocking the popup RPC
  -> enrichment collectors gather deeper evidence as follow-up revisions
  -> offscreen workers process small kind chunks
  -> each completed chunk publishes a detector snapshot revision
  -> final result updates the detector snapshot and replay storage
```

The registry still plans collection from the complete compiled artifact. Kind shards are used only by workers so each partition can hydrate the smallest matcher index needed for its observation kind. This keeps the product truth surface complete while reducing per-worker matching cost.

## Snapshot precedence

Detector snapshots are the startup source of truth. Content-owned snapshots describe the page-local observation lifecycle and can preserve an exact-session analysis, but they must not replace a background detector result at the origin-latest key just because an observer event wrote a newer timestamp. Origin recovery therefore ranks snapshots as:

```text
background detector snapshot
  > content snapshot with detections
  > content lifecycle placeholder
```

This keeps popup reopen behavior stable. Opening and closing the popup should show the last real detector output immediately, then subscribe to newer revisions for the visible tab.

## Worker progress

Large observation kinds are chunked before they enter the offscreen pool. A single Vercel-style `resourceUrl` or `requestUrl` partition can otherwise block visible progress until the entire kind completes. Chunking turns high-fan-out surfaces into multiple progress events while preserving deterministic merge order through original observation indexes.

The offscreen document keeps a shared worker pool alive for its lifetime. Worker-local shard caches stay warm across initial analysis, refreshes, and follow-up observation jobs. Background logs must show whether each job completed through `offscreen-worker-pool` or fell back to `background-fallback`.

Active work is keyed by visible session rather than only by tab id:

```text
tabId:frameId:documentId:urlHash
```

Navigation, tab close, or a newer job for the same visible session cancels the old matcher job and drops late partition progress before it can write snapshot lifecycle updates.

## Trace markers

A healthy browser trace should show these events:

```text
analysis-requested
analysis-fresh-start
collect-observation-batch-success
matcher-job-dispatch
matcher-partition-complete ...
matcher-partition-complete ...
analysis-queued-persist-complete
```

A trace that shows `matcher-background-fallback` means matching is running in the service worker again. That is a correctness-preserving recovery path, but it is not the intended performance path and should be treated as a bug to diagnose.
