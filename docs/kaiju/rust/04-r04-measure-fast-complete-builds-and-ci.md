# R04 Measure fast, complete Rust builds and CI

Fast feedback is useful only while the required artifacts and behavior remain
covered. Apply the existing [engineering rules](../engineering/README.md) and
the [Rust adoption guide](../../../.agents/guides/rust/adoption.md). Start with
the actual package graph, task owners, and a measured baseline.

## Keep Rust-owned construction in Rust and Cargo

Use the pinned toolchain, Cargo package/workspace rules, features, profiles,
and build-script conventions. Confirm how Mise selects the compiler and
components. Keep one authority for each version and command.

Use a build script for genuine compilation prerequisites, with declared inputs,
target configuration and outputs. Do not recreate Cargo's dependency tracking
in an unrelated scripting layer. Avoid unnecessary code generation and
host-only helper binaries. The portability contract includes maintained tools.

Read [Cargo](../../../.agents/skills/rust-software/references/cargo.md),
[build scripts](../../../.agents/skills/rust-software/references/build-scripts.md),
and [toolchains](../../../.agents/skills/rust-software/references/toolchains.md).

## Prove what can be omitted before omitting it

Register every result-owning task's source, manifests/locks, generated inputs,
toolchain, flags, features, environment and downstream consumers. Compare
affected selection with a full oracle. Include shared configuration, embedded
assets, build scripts, tests and package dependencies. Unknown or unexpectedly
empty selections must not become skipped success.

Keep native checks, required Wasm builds, host execution, FFI consumers,
doctests, and artifact validation visible. Select feature combinations
deliberately; `--all-features` is not a universal portability proof.

Use the runner's supported partitioning. Prove that shard union covers the
expected tests with the intended duplicate policy. Reusing a built test archive
requires compatible runner/target/runtime conditions. Benchmarks need their
own execution and noise policy; do not turn a fluctuating shared-host timing
into a fragile correctness gate.

## Reuse build work without sharing incompatible state

Cache downloads and compiler outputs where supported and beneficial. Include
the required toolchain, target, features, flags, lock state, and trust scope in
the identity. Inspect restoration and invalidation behavior before expanding
the cache. A cache hit is not proof that the selected task was correct.

Keep mutable build state isolated for concurrent worktrees/configurations as
required by the selected tools. Measure lock contention, eviction, transfer
cost, and duplicate compilation. Do not assume a shared `target` directory
improves parallel work merely because it reuses files.

Read [CI](../../../.agents/skills/rust-software/references/ci.md),
[sharding](../../../.agents/skills/rust-software/references/sharding.md),
[caching](../../../.agents/skills/rust-software/references/caching.md), and
[worktrees](../../../.agents/skills/rust-software/references/worktrees.md).

## Report the complete cost and remaining risk

Compare cold, restored, repeated, and representative small-edit builds. Record
total runner time as well as elapsed time, cache transfer and contention.
Verify deterministic selection/output separately from timing noise. A package
or host gate removed by the optimization invalidates the claimed improvement.

The exit is a repeatable improvement for named change classes with equivalent
required coverage, explicit invalidation, and a recoverable task record.
