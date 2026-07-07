# Content page-session runtime

Content page sessions make the first visible page lifecycle state durable before the background finishes privileged work. The popup already knows how to render stored snapshot revisions. The next step is letting the content script publish safe lifecycle revisions for the current document while the background remains disposable.

The content script still does not own the full detector. It owns page-local observation: the initial page facts, mutation-driven updates, resource timing updates, and stop/expiry state for the document it can see. Background still owns tab identity, visible-tab permission flow, page-main-world global probes, same-origin source fetch policy, headers, enrichment, and snapshot promotion.

```text
background receives visible tab identity
  -> background sends snapshot target to content
  -> content starts page-local observation
  -> content writes revision 1 as observing
  -> background writes later enriched revisions
  -> content writes stopped or observing lifecycle revisions as observers flush
  -> popup applies the newest storage revision
```

The important detail is the snapshot target. A content script can observe the page, but it cannot ask Chrome which tab id owns it. The background therefore passes a `ContentPageSessionSnapshotTarget` when it starts observation. That target contains the durable storage key, URL hash, hostname, and incognito flag for the current page session.

## What content writes

Content-owned revisions are intentionally small. They reuse the best existing `SiteAnalysis` for the same URL when one exists. If no analysis exists yet, content writes an empty `SiteAnalysis` with `status: "observing"` so the popup can show a truthful live state without storing raw observations.

```text
no detector output yet
  -> revision 1: observing, empty results, enrichment not-needed

background already promoted results
  -> revision n+1: observing or stopped, same analysis results preserved
```

This keeps the storage record safe and stable. Raw HTML, cookie values, storage values, script contents, stylesheet contents, and full observation batches do not become part of the content-owned snapshot.

## Why this moves the architecture forward

The final architecture wants page facts to arrive as events, not as one large popup-requested scan. Content-owned page-session revisions are a runtime bridge toward that model. They prove that the content script can keep the popup-visible session moving without background memory, while the heavier detector and enrichment work remain in the correct privileged contexts.

This also reduces the service-worker risk. If the background suspends after starting observation, the content script can still write lifecycle revisions for the active document. When the background wakes again, it can enrich or promote a newer revision instead of reconstructing the visible UI state from globals.

## Limits that remain intentional

Content does not load the full technology registry in this step. It does not run privileged enrichment. It does not fetch cross-origin resources, read response headers, run page-main-world probes, or store raw observation payloads. Those limits preserve the split between page-local observation and background-owned enrichment while the runtime moves toward storage-backed streaming.

## Validation points

The tests and benchmark protect the new behavior from three directions:

- content writes an initial observing revision when no detector analysis exists yet
- content preserves background detector results while advancing lifecycle state
- late observation batches publish newer snapshot revisions while the popup is open
- benchmark coverage measures page-signal normalization for common and late-heavy content bootstrap workloads

## Faster observer revisions

Late page facts now publish a content-owned snapshot as soon as the observer's throttled mutation scan queues new observations. The background still owns the detector rerun and enrichment, but the popup can see the session advance without waiting for the next background refresh request.

```text
MutationObserver batch
  -> throttled content scan
  -> observation batch queue accepts new facts
  -> content writes snapshot revision: observing
  -> popup storage listener applies the newer revision
```

The snapshot does not contain the raw observation batch. It only preserves the best existing `SiteAnalysis` and advances the lifecycle state, so this keeps the storage stream responsive without expanding what content persists.
