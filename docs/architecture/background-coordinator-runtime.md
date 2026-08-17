# Background coordinator runtime

The background service worker entrypoint is now a composition root, not the coordinator implementation itself. Popup-visible detection state lives in durable snapshot records, content owns page-local observation while a document is active, and `createBackgroundRuntime(...)` owns the disposable orchestration state for one service-worker lifetime. The entrypoint selects browser adapters, registers listeners, and exposes RPC; it does not implement analysis workflows.

```text
popup command or tab event
  -> lightweight background listener
  -> content RPC or persistence-port command
  -> durable snapshot revision
  -> popup storage subscription
```

## Composition boundary

```text
background.ts (composition root)
  -> active-tab browser adapter
  -> content RPC client factory
  -> extension observation collector
  -> compiled registry provider
  -> offscreen matcher adapter
  -> persistence ports
  -> logging adapter
  -> createBackgroundRuntime(...)
       -> BackgroundApi
       -> runtime message handler
       -> navigation/close cleanup callbacks
```

The runtime module imports no `wxt/browser` or `comctx` implementation. This keeps browser registration and RPC wiring at the edge while making the analysis coordinator constructible in tests without importing an extension entrypoint. Mutable maps for active observation batches, matcher ownership, refresh scheduling, and progress are scoped to the runtime instance instead of module-global entrypoint state.

## What the coordinator owns

The background still owns work that needs privileged extension APIs: visible-tab identity, content-script injection, page-main-world probes, same-origin enrichment fetches, response-header collection, and detector promotion. Those operations happen after a popup command or a refresh request. They do not become background startup work.

The background does not own snapshot storage as a subsystem. The background entrypoint is a composition root that receives the browser persistence adapter, while lifecycle code depends only on a snapshot-lifecycle capability. Popup and content compose the same infrastructure independently for their read/write roles.

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

The in-memory maps for content-script injection, active observation batches, and completed enrichment markers remain performance conveniences. Losing them should only force a recollect or cache read. The stored snapshot is the side-panel-visible source of truth.

## Registry startup note

The WXT registry generation module is now registered so builds prepare the compiled registry artifact consistently. The generated artifact is still consumed by the current registry provider, so a deeper packaged-data split remains a separate build/runtime follow-up. That follow-up should move large registry data behind packaged asset loading rather than adding dynamic code imports to the service worker.

## Validation points

The lifecycle tests protect the coordinator behavior from three directions:

- tab navigation marks indexed snapshots stale
- non-navigation tab updates do not touch stored snapshots
- tab removal stops indexed snapshots, removes the tab index, and clears volatile state through the entrypoint callback
