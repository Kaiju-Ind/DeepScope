# Benchmark the customer cost and the real artifact

Use this page after the shared benchmark skill establishes correctness and a
decision that measurements can change. Keep experiments small before adding a suite.
Record input family/size, output oracle, allocation/setup/teardown scope, target,
runtime, compiler, features, profile, CPU, concurrency, and cold/warm state.

## Choose one primary harness

| Need | Candidate | What still needs separate evidence |
| --- | --- | --- |
| Parameterized Rust kernels and allocation observations | Divan | Peak process memory, external threads, end-to-end product latency |
| Statistical baseline comparisons and reports | Criterion | Correctness, representative data, stable host and artifact identity |
| Stable instruction/cache-model counters in supported native environments | Iai-Callgrind | Real elapsed time, actual CPU behavior, unsupported instruction sets |
| Existing JavaScript/Wasm consumer path | Repository-selected Mitata | Rust-internal attribution and native execution |

Mitata's own repository has JavaScript and C++ implementations. It is not solely
a C++ project, and no official Rust variant was established by this research.
Do not add parallel harnesses merely to collect more kinds of output.
An optional CodSpeed integration can preserve Criterion/Divan tests; verify its
runner, compatibility package, platform limits, data flow, and cost before adoption.

## Make a fair comparison

Check full outputs independently before timing. Include empty, short, long,
malformed, boundary-split, and adversarial input where relevant.
Compare equal decoding, validation, errors, ownership, and cleanup guarantees.
Keep setup inside timing when the customer pays it; state any excluded setup.
Use parameterized inputs and consume outputs. `std::hint::black_box` is best-effort,
not a correctness, security, or universal optimization barrier.
Inspect generated code when a surprising result could be dead-code removal,
constant folding, vectorization, or an unintended instruction baseline.

Measure repeated representative workloads, distributions, variability, and effect
size. Preserve failures and outliers rather than reporting only the fastest sample.
Avoid concurrent builds, uncontrolled CPU sharing, thermal changes, and noisy
cloud gates for small timing differences. Retain a fresh confirmatory comparison
after exploratory tuning when the decision needs a reliable speed claim.

Keep baseline directories keyed by runtime, target, compiler, features, profile,
workload revision, and hardware class. Criterion can automatically compare data
already in its output directory. A native baseline must not silently become the
baseline for a WASI or browser run with a different measurement contract.

For [data-layout comparisons](data-oriented-design.md), isolate pointer layout,
string ownership and allocator choice. Pair narrow scans with complete lifetime
costs, and report retained memory independently from timed allocation activity.

## What the research executed

On 2026-11-26, Divan 0.1.21 and Criterion 0.8.2 both built and ran one byte-count
kernel at 16, 1,024, and 65,536 bytes on Linux native and Node 24.22.3 WASI Preview 1.
Rust/Cargo were 1.100.0. Divan defaults were disabled; Criterion defaults were
disabled with `cargo_bench_support` enabled. Independent byte-alphabet tests passed.
This is harness feasibility evidence. Short shared-host timings do not rank the
harnesses, compare native and Wasm speed, or establish browser compatibility.
The retained first Criterion cross-runtime baseline comparison is marked invalid;
the corrected WASI run used a separate output root.

The resolved Linux graphs contained 14 registry packages for the Divan fixture
and 44 for Criterion, including each harness and transitive build dependencies.
WASI graphs contained 13 and 39. These counts describe the saved lockfiles and
feature selections, not a permanent size or performance guarantee.

See [profiling](profiling.md) for allocation/CPU evidence and [CI](ci.md) for gates.
Primary sources:
[Divan API](https://docs.rs/divan/0.1.21/divan/),
[Divan allocation scope](https://docs.rs/divan/0.1.21/divan/struct.AllocProfiler.html),
[Criterion owner](https://github.com/criterion-rs/criterion.rs),
[Mitata](https://github.com/evanwashere/mitata/tree/8a956d3facd42dbb32c9820852451f34d1c40b44),
[Iai-Callgrind](https://docs.rs/iai-callgrind/0.16.1/iai_callgrind/),
[black_box](https://doc.rust-lang.org/std/hint/fn.black_box.html).

Read the [dated fixtures and raw results](evidence-index.md) before reusing a research observation.
