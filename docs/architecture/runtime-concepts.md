# Runtime concepts

Kaiju Site Scope has several moving pieces because the popup, the background service worker, the content script, and the offscreen matcher can all be alive at different times. The safest mental model is to keep page identity, observation, matching, storage, and replay as separate lanes.

## Core model

A visible page has one best detection snapshot. An observation session may keep producing signals for that page. Detection runs match those signals in partitions. The popup renders the best snapshot and separately reports whether detection, evidence collection, or observation is still active.

## Names and boundaries

| Name | Meaning | Durable? | User-visible? |
| --- | --- | --- | --- |
| `VisiblePageIdentity` | The exact active tab/frame/URL the popup is currently about. | Derived from the active tab and hashed URL fields. | No, but it scopes what the popup may render. |
| `ObservationSession` | The content-script watcher for one loaded document. It can be `observing`, `dirty`, `stopped`, or `expired`. | Partly durable through snapshots. | Yes, as the observation lane. |
| `ObservationBatch` | A collected group of normalized page facts such as script URLs, meta tags, resource URLs, and bounded source-content observations. | No. It is a worker input. | No. |
| `DetectionRun` / `MatcherJob` | One attempt to match an observation batch against the compiled registry. | Job records may be stored, but the service worker can still die. | Yes, as the detector lane. |
| `MatcherPartition` | One chunk of matcher work, such as a subset of `scriptSrc` or `scriptContent` observations. | No. It is a concurrency/performance unit. | No. |
| `DetectionEvidenceState` | How complete the evidence surfaces were when a snapshot's analysis was produced. | Yes, stored on snapshots and summaries. | Yes, as the evidence lane. |
| `DetectionSnapshot` | The best renderable detector output for one visible page session. | Yes. This is the popup baseline after service-worker restart. | Yes. |
| `ReplayTrace` | Explanation data for one detector run. | Yes, in replay storage. | Yes, but only when it matches the visible snapshot. |

## Why evidence completeness exists

A matcher run can be complete even when the evidence is not complete.

For example, after a service-worker restart, a recovered refresh may only have the initial page facts. That recovered run can finish matching and produce a replay trace, but it still should not replace a richer snapshot that was produced after HTML, headers, text, script content, and stylesheet content were collected.

Evidence completeness gives storage a way to compare these runs without relying on result count alone:

1. `unknown`
2. `recovered-initial`
3. `initial`
4. `incremental`
5. `enriched`
6. `full`

A lower-completeness recovered snapshot may be displayed when no better snapshot exists. It must not shrink a richer full-evidence snapshot for the same visible document.


## Sticky observations

Observation is additive for one visible document. If a script, link, DOM selector,
resource, or other signal appears and is later removed from the live DOM, the
extension should still treat the signal as observed for that document. Many sites
briefly mount bootstrap elements, preload tags, framework markers, or hydration
containers and remove them after startup. Removing the node does not mean the
technology was never present.

That means the detector output should not shrink just because a later DOM scan no
longer sees a previously observed feature. Within the same visible page, shrinking
should only happen after graph refinement has enough accumulated evidence to prove
one candidate should suppress another. Until the detector has explicit
``graph-contraction`` metadata, storage uses a conservative rule: same-page
snapshots may grow, but lower-count snapshots are treated as lifecycle/progress
updates and preserve the richer analysis already stored for that page.

## Durable rules

The popup and storage code should follow these rules:

1. Stored snapshots are the baseline for popup recovery.
2. Pending responses cannot erase the baseline.
3. Partial matcher partitions cannot shrink the visible count.
4. Lower-completeness recovered runs cannot replace richer runs for the same visible page.
5. Same-page detector snapshots should not shrink the visible result count unless graph refinement explicitly records the contraction.
6. Replay history must be joined to the visible analysis by run identity when available, and by URL, result count, and analysis timestamp as a compatibility fallback.
7. Observation lifecycle is separate from detector completion. The UI may show detection complete while observation is still watching for late page changes.

## Service-worker durability

The background service worker is a transient coordinator, not a durable process. In-memory queues can serialize writes while the worker is alive, but they are not recovery state. The durable recovery state is the best stored `DetectionSnapshot` plus its evidence and replay metadata.

