# Partitioned offscreen matcher runtime

CPU-heavy technology matching must not monopolize the Manifest V3 background service worker. The background coordinates tabs, durable job state, snapshot publication, and final semantic assembly. The offscreen document owns only the local dedicated-worker host used for rule matching.

```text
background service worker
  -> collect normalized observations
  -> create durable matcher job
  -> retain registry + relationship graph
  -> send compact matcher request

matcher offscreen document
  -> split observations into kind partitions
  -> run partitions through a small worker pool
  -> stream partition results back to background
  -> return ordered partition results

matcher dedicated workers
  -> load only required observation-kind registry shards
  -> match one partition at a time
  -> keep a bounded shard cache

background service worker
  -> merge partition results with retained registry knowledge
  -> validate current visible document ownership
  -> publish partial and final detector snapshot revisions
```

## Ownership

The background remains the authority for browser tab state, current-document identity, matcher job lifecycle, durable storage, and final detector output. The offscreen host does not read tabs, write detector storage, resolve visible-session ownership, or load the complete technology registry.

The runtime message intentionally omits registry-scale fields. It carries the matcher job identity, mode, observation batch, and small execution options. This prevents each offscreen message from cloning the complete registry, matcher index, and relationship graph into the hidden document.

## Scheduling

Observation-kind partitions carry priorities. Lower values run first so cheap, high-value evidence can publish useful revisions before expensive source and asset work finishes. Large high-fan-out kinds are split into smaller partitions so one resource-heavy kind cannot hide all progress until its final item completes.

The offscreen host admits complete matcher jobs through one bounded serial queue. Each active job can use the small worker pool concurrently across its partitions. The queue retains at most eight waiting jobs. That value is a memory safety ceiling because each waiting entry owns a complete observation batch. It is not a claim that eight is the throughput optimum.

Priority remains stable and FIFO within each mode. Every queue mutation publishes the current position and depth. Starting a job publishes a separate running state with `queuedAt` and `startedAt`, so diagnostics can measure queue wait independently from matcher execution.

The background client also uses separate deadlines. One deadline limits how long a job can wait for capacity. A second deadline starts only after the offscreen host reports that matching began. A queue wait can therefore no longer consume the job's complete execution allowance.

Do not increase worker count or queue retention from intuition. Measure job arrival rate, queue wait, execution time, retained heap, and active browser-window count first.

## DOM selectors do not use the offscreen document

DOM selector matching belongs to the content script because the live Chromium document is the authoritative DOM representation.

```text
compiled selector plan
  -> live document traversal
  -> route by right-most tag / attribute / id / class
  -> element.matches(selector)
  -> retain positive evidence
```

The initial document scan yields after bounded element or time slices. MutationObserver callbacks only classify changed nodes and do not run descendant selector queries. Positive matches are sticky for the current document, so already-proven selectors retire from later scans.

Late mutations use one shared element traversal for selector checks, images, scripts, stylesheets, links, metadata, and inline source evidence. The observer does not perform a separate descendant query for each evidence family. Full CSSOM collection is reserved for an explicit complete-document scan instead of being repeated for every changed subtree.

The selector compiler also records structural invalidation. Adjacent and following sibling selectors recheck affected existing siblings. Parent and ancestor-sensitive selectors recheck the required local region. Structural syntax that cannot be invalidated safely with a local region falls back to one time-sliced document scan rather than silently missing evidence.

Each DOM scan publishes bounded diagnostics: elements visited, native selector checks, positive matches, cooperative yields, duration, scope, and cancellation state. Those measurements are retained through the diagnostic journal and can be used to verify renderer churn on representative dynamic applications.

DeepScope does not serialize `document.documentElement.outerHTML` merely to send the DOM to an offscreen `DOMParser`. This removes a second parsed document graph and avoids retaining detached offscreen documents.

## Lifecycle

The dedicated worker pool is deliberately small. Two workers are the default until representative Chrome benchmarks justify another value. Each worker keeps at most four compiled observation-kind shards. The worker pool is disposed after 30 seconds without matcher work.

The hidden offscreen host also closes after 30 seconds without a background matcher request that owns it. Background startup reconciles durable interrupted jobs and then closes an orphaned matcher host left by an older service-worker context. Later matcher work creates a fresh host.

Cancellation and worker failure dispose the active worker pool. A background queue or execution timeout sends an explicit cancel request because ending the caller's Promise does not stop JavaScript already running in the offscreen document.

The background progress map temporarily retains the complete observation batch and compiled registry while partial matcher revisions can still be produced. The complete matcher lifecycle is wrapped in `finally`, so success, cancellation, navigation, worker failure, replay failure, and snapshot persistence failure all release those registry-scale references. Matcher completion is recorded only after the replay and final detector snapshot have been persisted. The side panel therefore exposes distinct `queued`, `matching`, and `recording` stages instead of treating worker completion as durable completion.

## Failure policy

Packaged production builds do not repeat a failed or timed-out offscreen matcher job inside the background service worker. Starting a second full matcher pass while the first copy may still be consuming CPU or memory creates duplicate expensive work and hides the real offscreen failure.

Production behavior is:

```text
offscreen success
  -> executor = offscreen-worker-pool

offscreen timeout or failure
  -> cancel offscreen job
  -> dispose failed worker resources
  -> record structured failure
  -> caller decides whether a later new job is appropriate
```

WXT development mode is different. Its worker transformation and hot-reload environment do not represent the packaged extension runtime, so development can use the explicit `development-background` executor.

## Verification

A release check for this subsystem must prove all of these behaviors in packaged Chrome, not only in source tests:

- the background remains responsive while matcher workers are busy;
- queue, matching, and recording progress describe the real per-tab lifecycle before final completion;
- partition progress produces monotonic visible revisions;
- stale tab or document jobs cannot publish current detector state;
- offscreen failure does not start a duplicate production background matcher;
- cancellation terminates active matcher workers;
- worker and offscreen host heaps are reclaimed after idle cleanup;
- a later matcher job recreates the host and still completes;
- live DOM selectors still detect initial and late evidence without an offscreen DOM parser;
- late adjacent-sibling evidence is detected after insertion and after removal creates new adjacency;
- repeated subtree mutations do not trigger repeated complete CSSOM reads;
- queued batches respect the hard retention limit and queue wait is measured separately from execution;
- replay or snapshot persistence failure releases active matcher progress state;
- renderer scan diagnostics remain within the accepted long-task budget on representative dynamic sites;
- retained memory reaches a stable range across repeated scans and tab changes.
