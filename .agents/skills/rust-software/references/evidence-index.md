# Inspect the recorded experiment before reusing its conclusion

Use this page when a reference mentions an observation from the 2026-11-26
research. Those observations are dated anchors, not permanent guarantees.
The following immutable evidence archive contains source, lockfiles, commands,
all retained attempts, raw output, source identities and measured scope.

[Rust product engineering evidence](https://chatgpt.com/library?file_id=libfile_fde3_f-7299e2bd83648191bcb5541240fcca48_2a999c65827881919d40239cf9ff24e7&account_id=personal)

Filename: `rust-product-engineering-evidence-2026-11-26.zip`.
SHA256: `3c705470a569d9f231651045c2611319a0c91a9d89703309eeba019aa568e404`.
The saved file was read back and its checksum matched before this index was added.
The archive root is `rust-product-engineering-evidence/`; paths below are relative
to that root. `FILES.json` lists exact payload hashes. It contains 380 files.

## Open only the evidence needed for the decision

| Observation | Exact source and raw record |
| --- | --- |
| Native/baseline/simd128 byte-kernel equivalence | `portability/probes/kernel/{lib.rs,simd.rs,tests.rs,verify-wasm.mjs}`; `portability/probes/final-validation.json`; `portability/probes/kernel/wasm-results.json` |
| Streaming partitions and split UTF-8 | `portability/probes/stream.rs`; `portability/probes/stream-final-results.json` |
| Rust/JS allocation and stale memory views | Kernel files above; `portability/probes/kernel/wasm-results.json`; `portability/probes/wasm-host-results.json` |
| C++ allocation/release consumer | `portability/probes/ffi.cc`; kernel Rust exports; `portability/probes/ffi-results.json` |
| Stable std::simd rejection | `portability/probes/negative/portable-simd.rs`; `portability/probes/negative-results-corrected.json` |
| Compiled Wasm with unavailable fs/thread APIs | `portability/probes/host-capabilities.rs`; `portability/probes/host-capabilities-results.json` |
| Stripped Wasm size and behavior | `portability/probes/kernel/strip-results.json` |
| Shared worktree output and isolated control | `workflow/probes/build-loop/`; `workflow/probes/build-loop-other/`; `workflow/evidence/worktree-state.json`; `workflow/evidence/shared-fingerprint-trace.json` |
| Divan/Criterion native/WASI feasibility | `workflow/probes/{divan,criterion}/`; `workflow/notes/experiment-harnesses.md`; `workflow/evidence/` command receipts |
| Bytes retention, Serde borrowing, decoding, Rayon progress | `workflow/probes/dependencies/`; `workflow/notes/experiment-dependencies.md`; `workflow/evidence/workflowDependency*.json` |
| Optimizer/vectorization observation | `workflow/probes/build-loop/src/lib.rs`; `workflow/probes/results/codegen/`; `workflow/evidence/workflowCodegen*.json` |
| wgpu native/Wasm build and failed GPU host check | `gpu/probe/`; `gpu/native-test.json`; `gpu/wasm-build.json`; `gpu/clippy-{native,wasm}.json` |
| Exact GPUI source contracts | `gpu/source/zed/`; `gpu/source/zed-provenance.json` |
| Crawl PR108 frame and CI defects | `pr108/probes/`; `pr108/source/`; `independent-review/`; pinned identities in `pr108/README.md` |

Brace and wildcard notation above denotes related actual files, not a command
to execute blindly. Use the file manifest to resolve each path. Commands with
old workspace paths need the corresponding local path after extraction.
The full guides distribution also includes these records under `research/rust/`.

## Data-oriented design follow-up

[Measured layout and Oxc evidence](https://chatgpt.com/library?file_id=libfile_fde3_f-19479ce4f1a88191acc4b27b9738c5b5_2a999c65827881919d40239cf9ff24e7&account_id=personal)

Filename: `rust-data-oriented-evidence-2026-11-26.zip`; 249 files.
SHA256: `8f6935ae0aff99e2ba112c96c79487eee7f5a4ea2d747cd93502b643ebfe26ab`.
The saved archive passed read-back, CRC and every payload hash check.
Its root is `rust-data-oriented-evidence/`; `FILES.json` inventories the payload.
This is a separate immutable follow-up. The earlier archive remains unchanged.

| Decision | Relative evidence path |
| --- | --- |
| AoS/SoA, pointer ownership and strings | `comparisons/README.md`; `comparisons/evidence/{raw-samples,summary}.json` |
| Oxc parser/traversal, allocation and retention | `oxc/REPORT.md`; `oxc/evidence/{native,wasi,native-confirm,wasi-confirm}/` |
| Source and fixture provenance | `corpus/README.md`; both experiment `export-manifest.json` files |
| Independent result review | `results-review/REVIEW.md`; `results-review/verification.json` |
| Fresh-context procedure trial | `trial/PLAN.md`; `trial/REVIEW.md` |

Start with [layout evidence](layout-evidence.md) for the exact observation scope.
Follow each experiment's `REPRODUCE.md` into a fresh output directory. Preserve
existing raw records. These timings do not establish live product improvement.

## Keep the experiment separate from future product evidence

Read the relevant report and result together. Match source hash, compiler,
target, feature flags, runner, input and expected output before reproducing.
Do not promote a corrected attempt while silently discarding the failed one.
An initial contaminated timing or incorrect measurement remains labeled invalid.

The work used Rust1.100.0 and Node24.22.3 on Linux x86-64. C++ used g++14.2.
The PR itself pins Rust1.99.1; no full paused workspace build was run.
The byte/FFI probes do not establish an entire product's performance or safety.
GPU compilation passed but the actual adapter-required runtime check failed.
Browser, Windows, macOS, ARM, C#, WASI2/3, GPU kernels, GPUI apps, ML inference,
Miri, sanitizers and fuzz campaigns were not executed in this record.

The archive is frozen research, including its then-current plan. Later skill
and package validation has a separate delivery record. This archive does not
claim the live repository, CI or global instructions were modified.

If the host cannot retrieve the archive, record that evidence as unavailable.
Use the linked primary sources and perform the relevant fresh probe. Never
claim to have inspected a result from the count or description in a guide.
Use [continuity](continuity.md) to preserve the new result and its limits.
