# Event architecture overview

The extension now tells one runtime story: facts from the visible tab become observations, observations become rule matches, rule matches become candidate technologies, graph rules refine those candidates, and final detections are shown in the popup.

```text
facts from the page
  -> rules that matched those facts
  -> technologies we think are present
  -> relationship rules clean up that list
  -> final detections shown to the user
```

The implementation vocabulary is the same story with the engine terms attached:

```text
observations
  -> evidence
  -> candidates
  -> graph refinement
  -> detections + replay trace
```

## Current runtime map

The popup still owns user interaction, the background runtime coordinates privileged extension work, and the content script owns page-local DOM reads. The detector path is event-only for extension analysis. The service-worker entrypoint itself is only a composition root: it wires concrete browser/RPC/persistence adapters into `createBackgroundRuntime(...)` and registers listeners.

```text
Popup extension page
  -> snapshot/replay persistence ports
      -> browser storage adapter
      -> read latest DetectionSessionSnapshot
  -> BackgroundApi.analyzeVisibleTab(target)
      -> visible target validation
      -> origin snapshot lookup
      -> content script readiness
      -> ExtensionObservationCollector
          -> ContentApi.collectObservationBatch()
          -> background observation enrichment
              -> response headers
              -> MAIN-world js globals
              -> same-origin script/style text
      -> runObservationBatchPipeline()
          -> indexed observation matching
          -> evidence entries
          -> candidate technologies
          -> relationship refinement
          -> SiteAnalysis emission
      -> createDetectionReplayTrace()
      -> snapshot/replay persistence ports
          -> browser storage adapter
          -> save DetectionSessionSnapshot + replay trace
  -> popup view model
  -> popup named regions
```

The content script still uses the bounded DOM collector internally because it is the safe place to read the active document. That snapshot is an implementation detail inside the content runtime. The background receives normalized observations and does not call the old direct `analyzeSite(signals, technologies)` path for extension analysis.

### Background composition boundary

```text
Browser service-worker entrypoint
  -> wires browser tabs / scripting
  -> wires content RPC client factory
  -> wires registry + collector + matcher adapters
  -> wires persistence + logging
  -> createBackgroundRuntime(...)
       -> owns disposable coordination state
       -> exposes BackgroundApi
       -> handles runtime notifications
       -> exposes tab lifecycle cleanup callbacks
```

This separates extension startup mechanics from the analysis workflow. Background API tests can construct the runtime directly with fake adapters, while the browser entrypoint stays small and declarative.

### Persistence boundary

Snapshot persistence is a shared infrastructure capability, not background-owned state. Content can publish lifecycle revisions, background can publish detector revisions, and popup can read or subscribe to revisions. Application modules depend on narrow persistence ports; the browser entrypoints wire those ports to the concrete `chrome.storage` adapter.

```text
content runtime ── snapshot writer ──┐
background runtime ─ snapshot/replay ├─> persistence ports -> browser storage adapter -> chrome.storage.local
popup runtime ─ snapshot/replay read ┘                         |
            └─ revision subscription <-------------------------┘
```

This keeps the single-source revision rules in the storage implementation while preventing content, popup, and lifecycle application logic from depending directly on browser storage APIs.

## Durable visible state

The extension now has a durable snapshot contract for side-panel-visible detection state. `DetectionSessionSnapshot` stores the latest normalized `SiteAnalysis`, session identity, enrichment status, and a compact replay summary in `chrome.storage.local`. The side panel can use this record before it asks the background to refresh the visible page.

```text
DetectionSessionSnapshot revision
  -> exact session key
  -> origin latest key
  -> popup snapshot-first render
```

This storage model supports the streaming rewrite without changing detector semantics. Observations still become evidence, candidates, graph-refined detections, and replay traces. The snapshot is the durable visible output of that pipeline.

## Dirty refresh behavior

Late page changes are not merged as final detections. A final-result merge can break graph semantics because `requires`, `excludes`, and `implies` need to see the whole candidate set together.

The current refresh flow keeps an event batch for the active popup session:

```text
initial event batch
  + late observer batch
  -> deduplicated combined observations
  -> rerun matching/evidence/candidates/graph/emission
```

If the Manifest V3 service worker loses that in-memory batch, the background recollects the current document and reruns event analysis. That recovery path is slower, but it is safer than treating a late-only batch as a complete explanation.

## Collector capability model

The extension collector can collect DOM, HTML snippets, script URLs, stylesheet URLs, resource URLs, request-like performance entries, readable cookie names, metadata, storage keys, response headers, page globals, and bounded same-origin source text. It still does not collect request headers, DNS records, certificate issuers, robots.txt, or arbitrary probe responses in the extension runtime. Those are CLI or future permission-expansion concerns, not hidden extension behavior.

## Replay and explanation model

Fresh event runs create a redacted replay trace beside the visible detector snapshot. The trace stores stage names, counts, scalar diagnostics, final emission metadata, and per-detection explanation summaries. It does not store raw HTML, raw cookies, page text, source bodies, or full observation payloads.

## Remaining architecture work

The scoped extension runtime is event-first. The remaining work is no longer about switching the popup from legacy to event mode. It is mostly hardening:

- browser-level Manifest V3 tests for service-worker suspension, runtime injection, popup teardown, and visible-tab permission timing
- a full replay inspector if maintainers need step-by-step event debugging in the popup
- JSON or YAML registry source migration if the team wants to replace the TypeScript rule tree
- more principled exclusion-component solving for conflicts where local pairwise tie-breaks are not enough
- explicit privacy and incognito handling before store-readiness review
