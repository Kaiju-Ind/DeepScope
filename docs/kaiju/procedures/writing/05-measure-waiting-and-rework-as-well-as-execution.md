# Measure waiting and rework as well as execution

The [current DORA guide][metrics] defines five delivery metrics:

| Metric                          | Meaning                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------- |
| Change lead time                | Time from a committed change to production deployment.                       |
| Deployment frequency            | How often production deployments occur.                                      |
| Failed deployment recovery time | Time to recover from a deployment failure that needs immediate intervention. |
| Change fail rate                | Share of deployments that need immediate intervention.                       |
| Deployment rework rate          | Share of deployments that are unplanned responses to production incidents.   |

DeepScope also needs **request-to-preview** and **preview-to-release** measurements. These are additional measures with
their own start and end events. Do not relabel them as DORA change lead time.

Record request acceptance, prerequisite report, prerequisite completion, candidate creation, preview readiness,
release selection, and release acceptance. Keep total wall time visible. Separately record waiting, queueing,
active work, rework, and failure class. A credential delay must remain part of the total, even if an execution-only
measure is also useful.

[DORA's value-stream guidance][value-stream] distinguishes elapsed lead time, uninterrupted process time, and handoffs
that arrive complete enough to avoid rework. That helps locate the actual delay. Making a two-minute build one minute
faster has limited value when package access consumes most of the day.

Measure a service against its own earlier runs. Report sample counts; use individual observations when the sample is too
small for useful percentiles. Any time targets in the handbook are proposed operating targets, not measured performance
or provider guarantees. DORA warns against one-dimensional goals that encourage gaming. A target miss should expose the
slow stage, never justify a skipped check.

[metrics]: https://dora.dev/guides/dora-metrics/
[value-stream]: https://dora.dev/capabilities/work-visibility-in-value-stream/
