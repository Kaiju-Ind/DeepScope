# Candidate backlog: serialization and parallelism

Use [dependency acceptance](dependencies.md) before adopting these packages.
The fixtures executed on Rust 1.100.0 Linux x86-64 and Node 24.22.3 WASI Preview 1.
The tested APIs and features are a small sample, not universal support.
Source versions and registry packages were inspected on 2026-11-26.

## Serde 1.0.229 and serde_json 1.0.154

Purpose: typed serialization and JSON parsing with explicit ownership.
Licenses: MIT OR Apache-2.0. Declared minimum Rust: Serde 1.56; JSON 1.71.
The fixture uses Serde's default `std` plus `derive`, and JSON's defaults.
Derive introduces a host procedural macro and its compilation dependencies.
Use manual implementations only when their ongoing correctness cost is justified.

A borrowed result must not outlive the input that stores its bytes.
Use `Deserialize<'de>` for borrowing and `DeserializeOwned` when the input
will not remain alive. Reader-based APIs cannot lend temporary input indefinitely.
Escaped JSON text may need new storage even when the output type permits borrowing.
The `rc` feature serializes values; it does not preserve shared-reference identity.
JSON `preserve_order`, `arbitrary_precision`, `raw_value`, and number options
change semantics or costs. Enable each for an explicit product requirement.
Unbounded nesting needs its own stack/memory/denial-of-service strategy.

Observed: `Cow<'a, str>` with `#[serde(borrow)]` borrowed the plain input
`"hello"` and owned the decoded input `"he\u006clo"` in both executed hosts.
That result does not establish zero-copy parsing for every field or input.
Next evidence: nesting/size limits, malformed input, numeric round trips, field
policies, stream framing, retained source size, and actual serialization throughput.
[Serde manifest](https://github.com/serde-rs/serde/blob/5be4690236e16d8a16d80f76703e59091ac3be2e/serde/Cargo.toml),
[JSON manifest](https://github.com/serde-rs/json/blob/f51fa15a7015c7d02817a46d2db44c899a0016e8/Cargo.toml),
[deserializer lifetimes](https://serde.rs/lifetimes.html)

## Rayon 1.12.0 with rayon-core 1.13.0

Purpose: CPU parallel iterators and structured fork/join work.
License: MIT OR Apache-2.0. Declared minimum Rust for Rayon: 1.85.
The fixture uses default features, which do not create browser worker support.
The graph includes work-stealing machinery and dependencies such as Crossbeam.
Parallelism is useful only when useful work exceeds scheduling and synchronization.
Define CPU, memory, cancellation, and output-order budgets before adding workers.

Wasm compilation alone is especially weak evidence here.
The documented fallback on hosts that report unsupported thread creation can
execute structured operations sequentially. A queued `spawn` may not make progress
until another operation yields to it. An explicitly built thread pool can fail.
Browser threading needs a separate runtime, shared-memory, and worker contract;
a feature name or successfully linked module does not create that environment.

Observed in the WASI Preview 1 fixture:

- `rayon::join(|| 20, || 22)` completed with both values.
- An explicit 1-thread pool returned an error.
- A spawned task left a completion flag false before `rayon::yield_now()`.
- Yield executed the task and the flag became true.
These are intentional fallback checks on a single-thread host, not a performance
comparison or evidence that background work will progress by itself.

Next evidence: serial reference equivalence, empty/tiny/skewed workloads,
cancellation and panic behavior, pool ownership, oversubscription, and the actual
threaded Wasm host if required. Benchmark worker count and task grain separately.
Floating-point parallel reductions need an explicit reproducibility contract.
[Rayon manifest](https://github.com/rayon-rs/rayon/blob/599425d4a4c64714632817f48496dbc53f656a90/Cargo.toml),
[fallback documentation](https://github.com/rayon-rs/rayon/blob/599425d4a4c64714632817f48496dbc53f656a90/rayon-core/src/lib.rs).

Read the [dated fixtures and raw results](evidence-index.md) before reusing a research observation.
