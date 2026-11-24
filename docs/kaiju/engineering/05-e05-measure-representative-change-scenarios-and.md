# E05 Measure representative change scenarios and protect releases

Record a before/after matrix with at least these relevant changes: source-only service/backend, shared utility and
downstream consumer, type-only import, database/schema/migration, unit test, browser test, benchmark, published package
or lockfile, frontend, worker, documentation, workflow/shared tooling, Dockerfile/build-context and release
configuration. For each, compare the full-work oracle to the selected work, and record _why_ a task executed, reused a
cache or was skipped. Expand the matrix for the project's actual components; the Core CI v20 `SCENARIO-MATRIX.csv` is a
research reference, not a universal test count.

In the change-impact matrix, include a new test under an existing discovered directory, a new nested package, test
rename/deletion, two unrelated changes within a formerly monolithic test file, and changes to shared fixtures, runner
configuration, source globs and output patterns. Explain whether each cache layer hit, restored, invalidated or was
intentionally bypassed. Show **test count and name inventory parity**, not just exit status. Demonstrate that
segmentation saves _net_ time after additional fixture setup, cache uploads/downloads and runner boot.

Measure **both** workflow wall-clock and total executed runner time (sum of job durations), with setup, downloads,
restore/save transfers, failed attempts, runner SKU/architecture, cache traffic and exact commit/run IDs. Compare
identical workloads under comparable cold and warm conditions. If billing rates and cache-storage charges are verified,
calculate currency cost; otherwise report runner-seconds, not invented dollars. Faster shards may use more total runner
time. Moving tests to manual reduces automatic work but does not prove a faster equal-work execution.

Before declaring an implementation done, run and inspect the applicable strict type checks, meaningful tests, frozen
installs, builds, produced artifact contents, installed-package consumers, target-runtime checks and deployment/user
journeys. Protected release security checks, exact-source provenance and migration compatibility survive every
optimization. State exactly what remains blocked, skipped or unverified. Do not dispatch expensive workflows, mutate
infrastructure or merge another PR without applicable authorization.
