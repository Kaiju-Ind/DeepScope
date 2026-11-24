# CI and engineering change evidence

Use this compact record when the work changes tests, packages, builds or CI. It is an addition to the plan, not a second
task tracker. See [engineering CI](../engineering/README.md) for the procedure and [`docs/ci.md`](../../ci.md) for the
current layout.

| Record                                 | Evidence                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Source, base and other writers         | Full SHA; parallel changes to the same files                                                                 |
| Required checks                        | Which Verify jobs must pass (Type checks, Tests, Build per browser, Workflow lint, Firefox lint) and why       |
| Native versus custom tooling           | Pinned tool and version, any wrapper, its consumers and the reason it exists                                 |
| Test discovery                         | Vitest project globs; proof that an added, renamed or deleted test is picked up with no list edited          |
| Cache layers                           | Mise tool cache and pnpm store: key inputs, hit or miss, restore and save time, who may write                |
| Test quality                           | Behavior covered, deterministic clocks, independent fixtures, Node-only versus Solid UI project              |
| Package closure                        | Workspace packages and exports used; vendored files unchanged except through the sync script                 |
| Cost                                   | Run ids, wall time, sum of job time, setup and cache overhead                                                |
| Release and runtime acceptance         | Built archives, reproducibility, real-browser results and remaining gaps                                    |
