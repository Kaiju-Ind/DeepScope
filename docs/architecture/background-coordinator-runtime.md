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

Navigation first clears volatile state and invalidates the automatic scan for the previous page. If that scan is still awaiting a response, the completed load for the replacement page can wait behind it. Each tab keeps at most one waiting scan. A later navigation discards that waiting request, and tab closure releases the tab's scheduling state. Before it starts the waiting scan, the controller reads the current preference and checks that the tab is still active in the requested window.

Snapshot cleanup can fail after the volatile state has been cleared. The background reports the tab ID and lifecycle reason and can still handle later tab events.

Matcher ownership is also revoked before navigation, tab deactivation, or a replacement analysis requests cancellation. The live offscreen adapter sends cancellation on a best-effort basis. If the cancellation capability or an ordinary matcher-record update rejects, the runtime reports the job ID, tab ID, lifecycle reason, and error type. A rejected cleanup request does not restore the old job's publication rights.

Registered matchers check that they still own the visible session after tab validation and storage waits, before starting the next snapshot, replay, or badge publication. Queued snapshot writes check again when their turn arrives and after reading the previous revision. These checks cannot cancel a storage or badge write already submitted to its adapter. They also do not add a browser document ID or change how a job acquires its first owner.

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

## Private matcher records

Ordinary matcher jobs keep lifecycle records in `browser.storage.local` so a new background context can identify interrupted work. Private jobs carry the same execution metadata in memory, including `incognito: true`. The matcher store returns their supplied record on save and returns `null` on update. These transitions never access local storage, so matcher-job storage failures cannot delay private dispatch, completion, or cancellation.

Earlier versions could store private job records with both the expected URL and the observation target URL. Ordinary reads, listings, retention, and diagnostic exports filter those records. At startup, reconciliation sends only the job ID of each active legacy private record to the offscreen cancellation client before removing its storage key. The host must acknowledge the same ID, or Chrome must confirm that the matcher document is gone. An unacknowledged send with a live or unknown host leaves the key for retry. Terminal private records need no cancellation. When cancellation or removal fails, startup logs the failed stage and record count and continues recovering ordinary jobs. Records left behind stay hidden from ordinary APIs and can be retried on a later startup.

Private collection, matcher, automatic scan, content lifecycle, and panel command diagnostics omit page addresses and raw exception messages on the covered paths. Content obtains its privacy context from Chrome and uses it for observation logs, snapshot scheduling, and crash capture. A private content runtime skips lifecycle snapshot writes even when an RPC caller omits the target's privacy flag. Its crash records retain a fixed event message and error type. The current panel can still display its own error. Uncontextualized background crash reports and historical journal entries have separate retention work remaining.

This policy applies to matcher-job persistence and the named diagnostic producers. Snapshot and replay retention have separate owners. Private scans still use a queued analysis response without a final-result delivery channel to the panel. The complete private side-panel journey and background restart behavior still need packaged-extension verification.

## Registry startup

During prepare and build, `modules/compile-registry.ts` writes the registry products and selects the assets shipped with the extension. Fresh analysis loads `registry.runtime.json` for collection planning and relationship refinement. Dedicated matcher workers load observation-kind shards when they need rules. The complete authored registry stays in the build process. See [Registry JSON artifacts](registry-json-artifacts.md) for the generated files and their consumers.

## Validation points

The lifecycle tests protect the coordinator behavior from three directions:

- tab navigation marks indexed snapshots stale
- non-navigation tab updates do not touch stored snapshots
- tab removal stops indexed snapshots, removes the tab index, and clears volatile state through the entrypoint callback
