# CI and engineering change evidence

Use this compact record when the project modifies tests, packages, builds or CI. It is an addition to the project
contract, not a second task tracker. See [engineering CI](../engineering/README.md) for the procedure.

| Record                                      | Project evidence                                                                                                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exact source/head, base and migration owner | Full SHA, current and target repository ownership; relevant parallel changes                                                                                                          |
| Required checks and full-work oracle        | Automatic, manual, protected/release, test/build/runtime; actual selection and skip reasons                                                                                           |
| Native versus custom tooling                | Pinned tool/version, current wrapper, consumers, parity test and disposition                                                                                                          |
| Task input/output/environment contract      | Discovered source/test patterns, transitive dependencies, outputs, safe environment identities, OS/architecture, cache owner; no default hand-maintained file inventories             |
| Cache-layer ledger and fresh-runner proof   | Download/compiler/task/BuildKit/release layers; keys, hit/miss reason, bytes, restore/save time, cold/miss, warm/hit, invalidation, corrupt/missing restore and failed-task admission |
| Test quality and runner                     | Behavioral coverage, Node/Deno/Vitest ownership, runner-native discovery, changed/new/renamed/deleted file coverage, independent fixtures, clock determinism and net sharding costs   |
| Package and migration closure               | Published exports, installed consumers, moved test/data owners, generated contracts                                                                                                   |
| Representative cost measurement             | Run IDs, runner time, wall time, setup/cache overhead, comparable work, unverified billing                                                                                            |
| Release and runtime acceptance              | Built artifact, installed package, target runtime, security controls, user journey and remaining gaps                                                                                 |
