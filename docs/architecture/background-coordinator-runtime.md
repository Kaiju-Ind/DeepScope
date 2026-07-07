# Background coordinator runtime

The background service worker is a coordinator, not the only owner of visible extension state. Popup-visible detection state lives in durable snapshot records, and content owns page-local observation while a document is active. The background wakes for commands and browser lifecycle events, then promotes or cleans up stored state without assuming its globals survived.

```text
popup command or tab event
  -> lightweight background listener
  -> content RPC, storage update, or snapshot promotion
  -> durable snapshot revision
  -> popup storage subscription
```

## What the coordinator owns

The background still owns work that needs privileged extension APIs: visible-tab identity, content-script injection, page-main-world probes, same-origin enrichment fetches, response-header collection, and detector promotion. Those operations happen after a popup command or a refresh request. They do not become background startup work.

The background also owns tab lifecycle cleanup. A saved snapshot now refreshes a small tab-session index in storage. When Chrome reports navigation or tab closure, the lifecycle listener can mark old session snapshots `stale` or `stopped` even if the service worker has already lost the in-memory observer maps.

```text
snapshot saved
  -> rd:session-index:<tabId>

tab starts navigation
  -> indexed snapshots become stale

tab closes
  -> indexed snapshots become stopped
  -> tab-session index is removed
```

## What stays disposable

The in-memory maps for content-script injection, active observation batches, and completed enrichment markers remain performance conveniences. Losing them should only force a recollect or cache read. The stored snapshot is the popup-visible source of truth.

## Registry startup note

The WXT registry generation module is now registered so builds prepare the compiled registry artifact consistently. The generated artifact is still consumed by the current registry provider, so a deeper packaged-data split remains a separate build/runtime follow-up. That follow-up should move large registry data behind packaged asset loading rather than adding dynamic code imports to the service worker.

## Validation points

The lifecycle tests protect the coordinator behavior from three directions:

- tab navigation marks indexed snapshots stale
- non-navigation tab updates do not touch stored snapshots
- tab removal stops indexed snapshots, removes the tab index, and clears volatile state through the entrypoint callback
