# Architecture docs

These docs describe the current Kaiju Site Scope extension after the event-runtime cleanup. The browser extension now asks for normalized observations, enriches those observations in the background, and runs the event pipeline as the extension detector path.

Start with the overview when you need the runtime map, then use the workflow or side-panel guide for narrower review questions.

| Document | Use it when |
| --- | --- |
| [`overview.md`](overview.md) | You need the current event runtime map, collector flow, refresh behavior, or remaining architecture work. |
| [`verification-workflow.md`](verification-workflow.md) | You need to decide which commands, targeted tests, or manual Chrome checks belong on a patch or pull request. |
| [`side-panel-composition.md`](side-panel-composition.md) | You are changing side-panel browser ownership, page composition, shared state, routing, or the current named visual regions. |
| [`crash-durable-diagnostics.md`](crash-durable-diagnostics.md) | You are changing diagnostic retention, crash capture, matcher interruption recovery, support reports, or the independent options-page support surface. |
| [`content-page-session-runtime.md`](content-page-session-runtime.md) | You are changing content-owned page observation, snapshot targets, or side-panel-visible lifecycle revisions. |
| [`background-coordinator-runtime.md`](background-coordinator-runtime.md) | You are changing background service-worker lifecycle listeners, tab cleanup, or disposable coordinator state. |
| [`kind-sharded-incremental-matcher.md`](kind-sharded-incremental-matcher.md) | You are changing continuous evidence passes, kind-sharded matcher workers, or side-panel snapshot revisions. |
| [`live-revision-ownership.md`](live-revision-ownership.md) | You are changing side-panel target ownership, snapshot revision application, tab switching, replay hydration, or matcher lifecycle state. |
| [`../migration/status.md`](../migration/status.md) | You need the current migration status matrix and remaining completion notes. |

Migration phase notes remain under [`../migration/`](../migration/). Older notes document how the event path was introduced; the overview records the current shape after the legacy extension path was removed from the background runtime.
- [Non-blocking incremental matcher runtime](./nonblocking-incremental-runtime.md)

- [Cache, lifecycle, and detector revision model](./cache-lifecycle-revision-model.md)

- [Runtime concepts](./runtime-concepts.md) defines the naming boundaries for visible page identity, observation sessions, detection runs, matcher partitions, evidence completeness, snapshots, and replay traces.
