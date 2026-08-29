# Migration status

The active extension runtime is now the storage-backed live revision model. The old command-era phase notes were removed because they described cache-first tab analysis, targetless replay reads, side-panel polling, and direct page-signal fallback paths that no longer exist in the cleaned runtime.

The current implementation has one user-visible contract:

```text
visible tab identity
  -> exact session snapshot renders first when available
  -> origin snapshot is a same-origin recovery fallback
  -> background/content publish newer snapshot revisions
  -> side panel applies only revisions that still match the visible tab target
```

This status note is intentionally short. Detailed architecture lives in the runtime documents linked from `docs/architecture/README.md`, where each document describes the current ownership model rather than a historical migration phase.

## Completed cleanup

| Area | Current state | Maintainer note |
| --- | --- | --- |
| Side-panel state | Snapshot-owned live revision workflow | The side panel renders stored snapshots, subscribes to storage revisions, and ignores stale target responses. |
| Background orchestration | Visible-tab coordinator | Background validates visible tab targets, queues initial matcher work, records matcher diagnostics, and writes snapshot revisions. |
| Content observation | Page-session snapshot lifecycle | Content writes observation lifecycle revisions instead of feeding an tab cache command path. |
| Matcher runtime | Durable priority scheduler + partition executor | IndexedDB stores small work control records, the background schedules partitions by current tab priority, and two offscreen DedicatedWorkers execute only selected partitions. Development and packaged builds use the same topology. |
| Replay | Target-owned history reads and snapshot summaries | Replay data is attached to explicit visible analysis targets rather than whichever tab is active when hydration completes. |
| Storage | Exact session snapshots plus origin summaries | `DetectionSessionSnapshot` is exact page/session state. `DetectionOriginSummary` and the compact status record drive origin counts and warm startup metadata without pretending to be visible-tab state. |

## Verification focus

Use these checks when reviewing new patches:

- A stale response for a previous tab cannot overwrite the current side-panel target.
- Tab-change events that arrive during an identity sync trigger one trailing sync for the newest visible tab.
- Tab activation should reprioritize without canceling open-tab work. Navigation, tab close, replacement, and superseding document work should keep stale detector output from winning the visible side-panel state.
- Initial matcher work is registered before enrichment passes continue.
- Replay summaries are visible from snapshots even when full history is not hydrated yet.
- Cache and origin counts update from origin summaries or compact status revisions, not command-era cache reads.
- Development and packaged builds exercise the same matcher ownership and cancellation path.

## Remaining work

Background still contains transitional adapter code around the live revision contracts while the runtime modules continue to settle. New work should keep that plumbing isolated behind exact session snapshots, side-panel revisions, session-keyed matcher jobs, and explicit visible-tab commands instead of reviving targetless command-era paths.
