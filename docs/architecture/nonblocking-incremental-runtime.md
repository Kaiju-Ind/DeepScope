# Non-blocking incremental matcher runtime

The visible-tab command now starts the analysis session and returns before CPU-bound matching completes. The side panel should treat storage-backed detector snapshots as the receive stream: stored snapshot output paints first, worker partition revisions advance the visible result, and the final matcher result replaces the stored detector snapshot when all partitions finish.

This fixes the older staged shape where the side panel waited for one large matcher job, then started later evidence work. In that design, collection took milliseconds but the matcher could occupy the background request for tens of seconds. The content observer could expire while the first matcher job was still running, and side-panel reopen behavior could race between content lifecycle snapshots and detector snapshots.

```text
side panel opens
  -> background reads the visible snapshot or returns a pending response
  -> content/background collectors gather cheap first-pass observations
  -> matcher job is registered and dispatched without blocking the side-panel RPC
  -> enrichment collectors gather deeper evidence as follow-up revisions
  -> offscreen workers process small kind chunks
  -> each completed chunk publishes a detector snapshot revision
  -> final result updates the detector snapshot and replay storage
```

The registry still plans collection from the complete compiled artifact. Kind shards are used only by workers so each partition can hydrate the smallest matcher index needed for its observation kind. This keeps the product truth surface complete while reducing per-worker matching cost.


## Collection cost follows the registry plan

The observer must not collect every evidence surface on every pass. Cheap route and DOM evidence stays available to the initial matcher, while large inline or accessible source text is collected only when the compiled enrichment plan has rules that require it.

```text
initial collection
  -> URLs, DOM selectors, links, metadata, resources
  -> no script or stylesheet source unless requested

enrichment collection
  -> add only the expensive surfaces required by the registry

live observation
  -> keep the same source-content flags for late mutations
```

Accumulated script and stylesheet source also obey the same item, per-item character, and total-character limits used by one direct collection pass. A long-lived observation session therefore cannot exceed the payload contract merely because many valid snapshots were merged over time.

## Snapshot precedence

Detector snapshots are the startup source of truth. Content-owned snapshots describe the page-local observation lifecycle and can preserve an exact-session analysis, but they must not replace a background detector result at the origin-latest key just because an observer event wrote a newer timestamp. Origin recovery therefore ranks snapshots as:

```text
background detector snapshot
  > content snapshot with detections
  > content lifecycle placeholder
```

This keeps side-panel reopen behavior stable. Opening and closing the side panel should show the last real detector output immediately, then subscribe to newer revisions for the visible tab.

## Worker progress

Large observation kinds are chunked before they enter the offscreen pool. A single Vercel-style `resourceUrl` or `requestUrl` partition can otherwise block visible progress until the entire kind completes. Chunking turns high-fan-out surfaces into multiple progress events while preserving deterministic merge order through original observation indexes.

DOM selector matching now stays in the content script and reads the live browser document directly. The selector plan routes each traversed element by its right-most tag, attribute, id, or class when possible. The initial full-document scan yields after bounded element or time slices, mutation callbacks only queue affected roots, and positive selector matches retire from later scans for that document. The content script never serializes the full DOM merely to run selector rules in another extension context.

The offscreen document now has one job: host CPU-heavy technology matching. It reuses one small dedicated-worker pool across nearby jobs, then terminates the worker pool after 30 seconds without matcher work. Each worker keeps at most four observation-kind compiled shards in a least-recently-used cache. The background also closes the offscreen document itself after 30 seconds without an owning matcher request. A restarted background closes any orphaned matcher host after durable job reconciliation before later work recreates it. This releases the host heap, listeners, and worker-host state rather than keeping them for the complete browser session.

The background-to-offscreen runtime message is deliberately compact. It contains the matcher job identity, page observation batch, mode, and small execution options. It does not clone the full technology registry, matcher index, or relationship graph into every runtime message. The offscreen host also does not load a full finalization registry. Workers load only the observation-kind shards they need and return partition matches. Background then finalizes those partitions with the registry and relationship graph it already holds for collection planning. This removes a second full registry object graph from the offscreen context while keeping CPU-heavy rule matching in dedicated workers.

A timeout only ends the background's wait for the offscreen response. It does not stop JavaScript that is already running in the offscreen document. The background therefore sends an explicit cancel request and the offscreen host terminates the active worker pool on cancellation or worker failure. Production does not start a second full matcher pass in the background service worker after an offscreen timeout or failure. That duplicate fallback previously allowed two expensive copies of the same job to overlap. WXT development mode keeps the explicit `development-background` executor because its dev-time worker transformation does not represent the packaged Chrome runtime.

Active work is keyed by visible session rather than only by tab id:

```text
tabId:frameId:documentId:urlHash
```

Navigation, tab deactivation in the same browser window, tab close, or a newer job for the same visible session cancels the old matcher job and drops late partition progress before it can write snapshot lifecycle updates. Background also rechecks the current tab and document before it creates a matcher job, after expensive evidence collection, and before it persists a completed result.

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

A packaged Chrome trace should report `offscreen-worker-pool` for matcher completion. An offscreen timeout or failure must appear as a failed/canceled matcher job and diagnostic record, not as a second production matcher pass in the background service worker. Development builds can report `development-background` explicitly.
