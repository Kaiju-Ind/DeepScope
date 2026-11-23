# Non-blocking incremental matcher runtime

The visible-tab command starts analysis and can return useful stored or initial state before all CPU-heavy matching and enrichment finishes. Storage-backed detector snapshots are the side panel's receive stream. Worker partition revisions advance that snapshot until the final matcher result is persisted.

```text
side panel
  -> render exact-session/origin recovery snapshot
  -> request or join analysis intent

background scheduler
  -> collect cheap initial observations
  -> queue matcher work
  -> continue deeper evidence passes

partition scheduler
  -> choose work by current tab priority
  -> execute at most two independent observation kinds
  -> publish completed partition revisions

background coordinator
  -> merge accumulated partition evidence
  -> persist final detector snapshot and replay state
```

## Collection cost follows the Registry plan

Initial collection uses evidence that is already cheap and visible. Expensive HTML/text/source surfaces are collected only when the rule-free runtime Registry plan requires them. Long-lived observation sessions retain the same item and byte limits used by direct collection.

The Registry plan is complete detector truth. Cost tiers describe collection cost, not a separate reduced detector model.

## Snapshot precedence

Detector snapshots remain the startup truth for visible detections. Content-owned lifecycle snapshots can preserve exact-session state, but they do not replace a newer background detector result merely because they have a later timestamp.

```text
background detector snapshot
  > content snapshot with detections
  > content lifecycle placeholder
```

## Partition progress

Large observation kinds are chunked before worker execution. The background owns the partition scheduler, so priority can change between chunks when the user activates another tab.

The offscreen document does not keep a second waiting queue. It owns only two active DedicatedWorker slots. Kind affinity keeps a large observation-kind shard on one worker while the pool is hot.

Tab activation changes priority. It does not cancel the old tab. Navigation, tab close, tab replacement, or a newer job for the same document can cancel old work and block stale publication.

## Service-worker recovery

Small scheduler records live in IndexedDB. Raw `ObservationBatch` values do not.

After a background replacement:

- analysis intent can be requeued and recollected from a still-live document;
- matcher work from the old context is canceled because its transient observation payload no longer exists;
- the old offscreen host is told to cancel orphan partitions;
- a valid visible tab can receive fresh analysis work.

This avoids pretending that in-memory matcher progress is checkpoint-resumable.

## Trace markers

A healthy trace should show scheduler ownership explicitly:

```text
analysis-requested
scheduler-analysis-complete / scheduler-analysis-failed
scheduler-matcher-queued
matcher-job-running
matcher-partition-complete ...
matcher-worker-pool-disposed
matcher-host-idle
```

A matcher failure must remain a failed or canceled matcher job. DeepScope does not start a hidden second full matcher implementation in the background service worker.
