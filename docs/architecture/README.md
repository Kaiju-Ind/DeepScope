# Architecture docs

These docs describe the current Kaiju Site Scope extension after the event-runtime cleanup. The browser extension now asks for normalized observations, enriches those observations in the background, and runs the event pipeline as the extension detector path.

Start with the overview when you need the runtime map, then use the workflow or popup guide for narrower review questions.

| Document | Use it when |
| --- | --- |
| [`overview.md`](overview.md) | You need the current event runtime map, collector flow, refresh behavior, or remaining architecture work. |
| [`verification-workflow.md`](verification-workflow.md) | You need to decide which commands, targeted tests, or manual Chrome checks belong on a patch or pull request. |
| [`popup-composition.md`](popup-composition.md) | You are changing the Solid popup shell, named regions, status feedback, or explanation/replay placement. |
| [`content-page-session-runtime.md`](content-page-session-runtime.md) | You are changing content-owned page observation, snapshot targets, or popup-visible lifecycle revisions. |
| [`background-coordinator-runtime.md`](background-coordinator-runtime.md) | You are changing background service-worker lifecycle listeners, tab cleanup, or disposable coordinator state. |
| [`kind-sharded-incremental-matcher.md`](kind-sharded-incremental-matcher.md) | You are changing continuous evidence passes, kind-sharded matcher workers, or popup snapshot revisions. |
| [`live-revision-ownership.md`](live-revision-ownership.md) | You are changing popup target ownership, snapshot revision application, tab switching, replay hydration, or matcher lifecycle state. |
| [`../migration/status.md`](../migration/status.md) | You need the current migration status matrix and remaining completion notes. |

Migration phase notes remain under [`../migration/`](../migration/). Older notes document how the event path was introduced; the overview records the current shape after the legacy extension path was removed from the background runtime.
- [Non-blocking incremental matcher runtime](./nonblocking-incremental-runtime.md)

- [Cache, lifecycle, and detector revision model](./cache-lifecycle-revision-model.md)

- [Runtime concepts](./runtime-concepts.md) defines the naming boundaries for visible page identity, observation sessions, detection runs, matcher partitions, evidence completeness, snapshots, and replay traces.
