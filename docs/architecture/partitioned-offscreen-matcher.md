# Partitioned offscreen matcher runtime

The visible-tab slowdown came from one CPU-bound matcher run monopolizing the Manifest V3 background service worker. Content collection and background enrichment were already fast enough to answer messages, but the indexed matcher could run for tens of seconds on the background thread. Moving matcher work into an offscreen-owned worker pool lets the background keep answering popup, tab, and storage messages while matching continues.

The first implementation keeps final detection authority in one coordinator pass. Workers emit rule-match evidence for one observation kind at a time. The offscreen host merges those partition results, runs candidate creation, graph refinement, and final emission, then returns a normal event-pipeline result to the background.

```text
background
  -> collect observations
  -> create matcher job record
  -> ensure offscreen matcher host
  -> dispatch job

matcher offscreen host
  -> queue jobs by mode
  -> split observations by kind
  -> feed a small worker pool
  -> merge partition results
  -> emit SiteAnalysis-compatible output

matcher workers
  -> load compiled registry once per worker
  -> match one kind partition
  -> return evidence deltas
```

## Scheduling model

The scheduler replaces the hard initial/enrichment split with priority tiers. Cheap facts run before high-fan-out asset and source-content facts.

```text
priority 1: url, htmlMatch, meta, dom
priority 2: headers, links, cookies, storage, page globals
priority 3: script/resource/request URLs
priority 4: full HTML, text, script content, stylesheet content, DNS, probes
```

A live popup session receives a bootstrap matcher job first. That job only runs priority 1 and priority 2 partitions, which gives the popup a first useful result without evaluating every asset URL and source-content rule. If lower-priority observations exist, the background schedules a complete matcher job that writes a newer detector snapshot. The popup snapshot subscription can then apply the stored result once it advances.

## Lifecycle policy

Background remains the authority for tab and storage decisions. The offscreen document can only use runtime messaging, so it never reads tabs, writes storage, or decides whether a result is safe for the current page.

The background records each matcher job before dispatch. When a result returns, the background checks whether the tab still points at the same document. A navigated tab makes the result stale and prevents snapshot writes. A closed tab is still allowed to complete because the result can safely populate the origin snapshot without updating a live popup session.

```text
tab still on same document -> persist result
tab navigated              -> mark stale and reject result
tab closed                 -> allow cache completion
manual refresh/newer job    -> future cancellation hook
```

## Worker policy

The first worker pool is deliberately small. Two workers are enough to prove that matching no longer blocks the background and to avoid multiplying registry hydration costs before benchmarks justify a larger pool. The pool lives in the offscreen host rather than in the background, because WXT dev and Chrome worker behavior can differ between development and production builds.

The worker script is one static module loaded with `new Worker(new URL('./matcher.worker.ts', import.meta.url), { type: 'module' })`. This keeps the Vite/WXT worker reference visible to the bundler and avoids runtime-created worker URLs.

## What remains

The current implementation returns a bootstrap result and a later complete cached result. It does not yet stream every partition as a visible popup revision. Offscreen emits partition progress messages to the background and updates job records, so the next step is to merge safe partials into user-visible stored snapshots instead of only using progress for diagnostics.

The next hardening pass should add explicit cancellation for manual refresh and newer same-session jobs, more lifecycle tests for visible-tab switches, and browser-level validation in both WXT dev and production builds.

## Parity and observation recovery

The bootstrap response is only a first paint. It must not be the last detector result for a normal visible-tab session. Many accurate detections come from script URLs, resource URLs, request URLs, full HTML, text, and source-content observations, so the background schedules a complete matcher pass as soon as the full compiled registry is available. That complete pass runs before deeper enrichment collection waits on same-origin source fetches or content-script RPC, because matcher parity should not depend on whether enrichment collection succeeds.

Stored snapshots also reopen observation when the popup asks for live watching. A snapshot hit can paint immediately, but the content script still needs a fresh observation session so late script, link, meta, and resource facts can queue storage revisions. Observation refreshes use the complete compiled registry because late facts often arrive as asset URL observations, and those are intentionally outside the bootstrap partition set.
