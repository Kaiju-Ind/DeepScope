# Migration status

The active extension runtime is now the storage-backed live revision model. The old command-era phase notes were removed because they described cache-first tab analysis, targetless replay reads, side-panel polling, and direct page-signal fallback paths that no longer exist in the cleaned runtime.

The visible tab identity selects the exact session snapshot first, with an origin
snapshot only as a same-origin recovery fallback. Background and content owners
publish newer revisions. The panel applies a revision only while it still matches
the visible target.

This status note is intentionally short. Detailed architecture lives in the runtime documents linked from `docs/architecture/README.md`, where each document describes the current ownership model rather than a historical migration phase.

## Completed cleanup

| Area | Current state | Maintainer note |
| --- | --- | --- |
| Side-panel state | Snapshot-owned live revision workflow | The side panel renders stored snapshots, subscribes to storage revisions, and ignores stale target responses. |
| Background orchestration | Visible-tab coordinator | Background validates visible tab targets, queues initial matcher work, records matcher diagnostics, and writes snapshot revisions. |
| Content observation | Page-session snapshot lifecycle | Content writes observation lifecycle revisions instead of feeding a tab cache command path. |
| Matcher runtime | Durable priority scheduler and partition executor | IndexedDB stores small work control records. The background schedules partitions by tab priority; dedicated workers execute selected partitions. Chrome uses an offscreen host, while capable Firefox/Safari background pages host workers locally. |
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

The [active action list](monorepo-plan.md) records current publication and exact
validation evidence. Remaining work includes WebDriver setup/disposal, the large
background API test harness, large detection/storage/observation/UI owners, exact
Utils provenance and the full browser journeys. Keep those changes behind exact
session snapshots, session-keyed matcher jobs and explicit visible-tab commands.
Do not revive targetless command paths or call the semantic review complete
because a source/build/startup gate passes.
