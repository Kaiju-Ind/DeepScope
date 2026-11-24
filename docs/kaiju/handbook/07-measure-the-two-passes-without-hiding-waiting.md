# Measure the two passes without hiding waiting

Record the request, prerequisite report, prerequisite readiness, passing checks, usable preview, release selection,
published release and store acceptance times. Split elapsed time into active work, CI queueing, owner wait, store review
wait and rework.

The two main measures are request-to-usable-preview and tag-to-published-release. Store review time is reported
separately, because DeepScope does not control it.

Measure the product too, with the same discipline: page analysis time (cold and steady state), extension memory while
active and while the background is unloaded, build time and archive size. The
[cross-browser plan](../../migration/cross-browser-runtime-plan.md) records current figures with how each was
measured. Report sample count, machine and cold or warm conditions before drawing conclusions; correctness comes before
speed, so a faster variant must reproduce the golden output first.

Current [DORA metrics](https://dora.dev/guides/dora-metrics/) (change lead time, deployment frequency, recovery time,
change fail rate, rework rate) apply to releases as well.
