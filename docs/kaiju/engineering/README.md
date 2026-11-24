# Engineering and CI

Rules E01 to E06 for CI, test selection, caching, builds and package ownership.

Skills: `test-code`, `benchmark-code`, `build-devtools`.

| Part                                                                                                                      | What it covers                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                                                                | DeepScope's toolchain and what this chapter does and does not claim.                                                                                                                                     |
| [E01 Establish the real source, owners and required work](01-e01-establish-the-real-source-owners-and.md)                 | Begin with one repository, branch and a bounded outcome; discovery is the default input contract.                                                                                                         |
| [E02 Select native capabilities before maintaining custom code](02-e02-select-native-capabilities-before.md)              | Audit the installed, pinned versions and command help.                                                                                                                                                   |
| [E03 Prove affected-work selection and cache correctness separately](03-e03-prove-affected-work-selection-and-cache.md)   | Selection decides what runs; cache admission decides what is reused. DeepScope caches downloads only. |
| [E04 Keep meaningful tests, make execution efficient](04-e04-keep-meaningful-tests-make-execution.md)                     | Prefer capability and user-behavior tests over brittle snapshots of source spelling.                                                                                                                     |
| [E05 Measure representative change scenarios and protect releases](05-e05-measure-representative-change-scenarios-and.md) | A before/after matrix of representative changes, wall and runner time, and release protection. |
| [E06 Preserve a recoverable engineering handoff](06-e06-preserve-a-recoverable-engineering-handoff.md)                    | Make one coherent change and one verified checkpoint at a time.                                                                                                                                          |
