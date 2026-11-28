# Engineering and CI

Rules E01 to E06 for CI, test selection, caching, builds and package ownership.

Skills: `test-code`, `benchmark-code`, `deno-software`, `build-devtools`, `rust-software`.

For Rust packages, workers and tooling, also follow [R04](../rust/04-r04-measure-fast-complete-builds-and-ci.md)
and the [Rust guide](../../../.agents/guides/rust/README.md). A faster build does not replace required host execution.

| Part                                                                                                                      | What it covers                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                                                                |                                                                                                                                                                                                          |
| [E01 Establish the real source, owners and required work](01-e01-establish-the-real-source-owners-and.md)                 | Begin with one repository, existing PR/branch and a bounded user-visible or engineering outcome.                                                                                                         |
| [E02 Select native capabilities before maintaining custom code](02-e02-select-native-capabilities-before.md)              | Audit the installed, pinned versions and command help.                                                                                                                                                   |
| [E03 Prove affected-work selection and cache correctness separately](03-e03-prove-affected-work-selection-and-cache.md)   | For each result-owning task, document its source and transitive inputs, manifest/lock versions, command and flags, toolchain and shared tooling pins, environment variable *names and relevant safe v... |
| [E04 Keep meaningful tests, make execution efficient](04-e04-keep-meaningful-tests-make-execution.md)                     | Prefer capability and user-behavior tests over brittle snapshots of source spelling.                                                                                                                     |
| [E05 Measure representative change scenarios and protect releases](05-e05-measure-representative-change-scenarios-and.md) | Record a before/after matrix with at least these relevant changes: source-only service/backend, shared utility and downstream consumer, type-only import, database/schema/migration, unit test, brows... |
| [E06 Preserve a recoverable engineering handoff](06-e06-preserve-a-recoverable-engineering-handoff.md)                    | Make one coherent change and one verified checkpoint at a time.                                                                                                                                          |
