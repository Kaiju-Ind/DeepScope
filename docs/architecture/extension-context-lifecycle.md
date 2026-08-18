# Extension context lifecycle

DeepScope has several browser runtimes that can outlive each other. The side panel is a view of durable detector state. It is not the owner of a scan. A correct implementation must therefore identify which context owns each state transition and must reject responses that belong to an older tab or document.

## Context map

```text
Chrome window and tabs
  │
  ├─ tabs.onActivated / tabs.onUpdated
  │            │
  │            ├──────────────────────────────┐
  │            ▼                              ▼
  │     background service worker       mounted side panel
  │            │                              │
  │            │ privileged commands          │ exact visible identity
  │            │ automatic scans              │ TanStack route/search state
  │            │ matcher coordination         │ local drawers/scroll/filter state
  │            │                              │
  │            ├──── content RPC ─────────────► content script
  │            │                                  │
  │            │                                  └─ page observation and late facts
  │            │
  │            ├──── matcher work ────────────► offscreen matcher / workers
  │            │
  │            └──── durable revisions ───────► chrome.storage.local
  │                                               │
  └──────────────── side panel subscribes ◄───────┘
```

### Chrome tabs and windows

Chrome owns active-tab selection and document navigation. A mounted side panel belongs to one browser window. Events from another window do not retarget it.

### Background service worker

Background owns privileged browser APIs, automatic scan decisions, exact tab validation, matcher scheduling, and durable detector publication. It can stop and restart independently of the side panel and content script.

### Content script

Content owns page-local observation for one document only while an explicit observation session is active. The injected RPC runtime can remain in the document after the session stops, but its MutationObserver, PerformanceObserver, timers, queued observations, and retained page-evidence cache must not.

### Offscreen matcher and workers

The matcher owns CPU-heavy rule evaluation. Matcher output must carry enough session identity and revision information for storage to reject obsolete results. The background sends only a compact job plus the page observation batch to the offscreen host. Registry-scale matcher indexes and relationship data are not cloned into each runtime message, and the offscreen host never loads the full technology registry. Dedicated workers load only the observation-kind shards required by their current partitions. The host returns partition matches, then background finalizes those partitions with the registry and relationship graph it already owns. The offscreen document can remain available for DOM parsing, but dedicated matcher workers are not permanent. Their worker pool is terminated after 30 seconds without matcher work, and each worker retains at most four compiled observation-kind shards while it is alive. Cancellation or worker failure also disposes those worker heaps immediately.

### Durable storage

Storage owns detector state that must survive side-panel closure and background suspension. The current visible result is recovered from storage before new work replaces it.

### Side panel

The side panel owns only the current browser-window projection, transient UI state, and at most one panel-requested observation target. It must react to tab changes without remounting the whole Solid application. Moving to another tab or closing the panel releases that observation target. It may request work, but it must not assume that an RPC response still belongs to the tab that is visible when the response resolves.

## Visible-tab state machine

```text
unavailable
  │ active inspectable tab
  ▼
resolving-identity
  │ exact identity {windowId, tabId, frameId, originHash, urlHash}
  ▼
switching-tab
  │
  ├─ release the previous panel-owned observation target
  ├─ immediately clear document-owned state from the previous identity
  ├─ subscribe to the new durable revision stream
  └─ read retained detector state
        │
        ├─ retained result exists ──► showing-retained-result
        │
        └─ no retained result ──────► stable empty projection
                                      │
                                      ├─ background auto-scan revision ─► visible
                                      └─ manual refresh ────────────────► analyzing

visible
  ├─ late revision ─► visible + new-result indicator
  ├─ refresh ───────► analyzing + panel observation
  ├─ navigation ────► resolving-identity
  └─ tab activation ► resolving-identity
```

Identity resolution and analysis do not share one lock. The identity-resolution lock ends before storage reads, detector RPC, or observation synchronization. This lets a new `tabs.onActivated` event retarget the existing Solid tree while older work is still completing.

## Message timeline: tab A to tab B while A is still analyzing

```text
Chrome            Side panel               Background             Storage
  │                    │                        │                     │
  │ activate A         │                        │                     │
  ├───────────────────►│ resolve A              │                     │
  │                    ├───────────────────────►│ validate A          │
  │                    │◄───────────────────────┤ identity A          │
  │                    │ clear old projection  │                     │
  │                    ├─────────────────────────────────────────────►│ read A
  │                    ├───────────────────────►│ analyze A           │
  │                    │                        │                     │
  │ activate B         │                        │                     │
  ├───────────────────►│ resolve B              │                     │
  │                    ├───────────────────────►│ validate B          │
  │                    │◄───────────────────────┤ identity B          │
  │                    │ clear A projection    │                     │
  │                    ├─────────────────────────────────────────────►│ read B
  │                    │ show retained B       │                     │
  │                    ├───────────────────────►│ stop A session      │
  │                    │                        │                     │
  │                    │◄───────────────────────┤ A response          │
  │                    │ reject: identity != B │                     │
  │                    ├───────────────────────►│ stop stale A target │
  │                    │                        │                     │
  │                    │ B scan only if background auto-scan is enabled
```

The important rule is that completion order cannot change ownership. Every asynchronous apply path compares the response target with the exact visible identity before mutating document-owned UI state.

## Message timeline: automatic scan after tab activation

```text
Chrome tabs.onActivated
  -> background receives {windowId, tabId}
  -> automatic scanning setting is read
  -> background validates that this tab is still active
  -> snapshot-first one-shot scan starts for the exact identity
  -> observation mode is none
  -> detector revisions are persisted
  -> badge reads/publishes the newest durable result
  -> an open side panel receives the same durable revision
  -> a closed side panel can recover it on the next mount
```

Side-panel visibility is not part of the automatic scan ownership rule. Automatic scanning never creates a live content observation session. The live observer is reserved for explicit panel-open or Refresh work.

A content observation stop names the exact `sessionId` and expected document URL. The content runtime validates both values immediately before disconnecting observers. This makes the stop operation atomic inside the content runtime: a delayed stop from tab A or an older session cannot terminate a newer session that reused the same tab id. Background tab activation also cancels matcher work and requests a targeted stop for observation sessions that belong to the previously active tab in that window.

## Message timeline: late WordPress/plugin evidence

```text
initial detector revision
  -> side panel shows current technologies
  -> live observation is active
  -> UI shows "Watching for additional technologies"
  -> late script / stylesheet / DOM evidence arrives
  -> content flushes observations
  -> background schedules a newer matcher revision
  -> storage publishes a monotonic detector revision
  -> side panel computes newly added technology ids
  -> UI shows "Additional technologies detected"
  -> newly arrived technology rows receive a New marker
```

This keeps incremental detection visible instead of making technologies appear without explanation.

## Navigation and same-URL scenarios

### Different tabs with the same URL

URL equality is not enough. The panel compares `windowId`, `tabId`, `frameId`, `originHash`, and `urlHash`. A result from tab A cannot update tab B merely because both show the same URL.

### Same tab navigates to another document

`tabs.onUpdated` retargets the panel when the active tab starts or completes relevant navigation. The previous document-owned state is cleared before the new document is analyzed or restored.

### Side panel closes and reopens

Closing the side panel removes transient panel state and best-effort stops the current panel-owned content observation. While the panel remains mounted, Chrome tab-close events also remove route, scroll, search, and view state for the closed tab so an hours-long panel session does not accumulate state for tabs that no longer exist. Durable detector snapshots, replay data, and background-owned one-shot automatic scans continue according to their own lifecycle. Reopening reads the newest durable result before requesting additional work for the newly mounted panel.

### Side panel misses an event

Visibility recovery re-resolves the active tab. Durable storage is authoritative, so reopening or becoming visible can repair a missed runtime notification without requiring an application remount.

## State ownership table

| State | Owner | Survives side-panel close | Exact identity required |
| --- | --- | --- | --- |
| Active browser tab | Chrome | yes | window + tab |
| Detector snapshot | storage/background | yes | tab/session or origin revision key |
| Automatic scan | background | yes | window + tab + validated document |
| Page observation | content, requested by the mounted panel | no after panel release/close; otherwise only while the exact session remains active | session + document |
| Matcher job | background/offscreen | yes, subject to cancellation policy | session/revision |
| Badge count | background projection | yes | active tab |
| Side-panel current page | side panel projection | no | exact visible identity |
| TanStack route/search | side panel | no | panel instance |
| Filter/drawer/scroll state | side panel | no | panel instance/page |
| Late-detection marker | side panel from revision delta | no, recomputed from durable revisions | exact visible identity |

## Required invariants

1. A tab event from another window cannot retarget the mounted panel.
2. Identity lookup is never held across detector analysis or storage hydration.
3. Changing visible identity clears the previous document-owned presentation immediately.
4. A late storage/RPC response can apply only when its exact identity is still visible.
5. Automatic scanning is background-owned and works when the side panel is closed.
6. Automatic scanning is one-shot and does not leave a content observer active in each visited tab.
7. A mounted panel owns at most one live observation target and releases it on tab change or panel close.
8. Durable results outlive side-panel mount state.
9. Kobalte group labels are always inside their matching group provider.
10. Diagnostic Timeline virtualization uses fixed-height rows and does not call `measureElement()`.
11. Idle matcher workers are terminated so their compiled shard caches can be reclaimed.
12. Generated content and side-panel bundles execute in Chromium as part of the release gate.
13. Generated HTML does not preload extension chunks or fonts that are not guaranteed to be consumed immediately.
