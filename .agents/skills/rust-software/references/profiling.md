# Attribute the cost before changing the representation

Use this page when a benchmark identifies a material CPU, memory, or build cost.
Start with one hypothesis and a baseline. Select the measurement that can reject it.
Do not attach every profiler to every change.

| Question | Useful observation | Common misinterpretation |
| --- | --- | --- |
| Where does runtime CPU go? | Sampling profile with symbols and correct target | A hot function alone proves the root cause |
| Why does memory grow? | Allocation/retention trace over a full lifecycle | Fewer allocations means a lower retained peak |
| Does layout improve a scan? | Equal output, throughput, bytes moved, cache behavior | A smaller struct always makes the whole pipeline faster |
| Does SIMD execute? | Final artifact instructions plus runtime feature path | A compiler flag proves the hot loop vectorized |
| Why is the build slow? | Cargo timings, repeated edit loop, linker time | Total wall time equals compiler work |
| Is CI noise hiding a regression? | Controlled repetitions or relevant stable counters | Instruction count equals latency on every CPU |

## Preserve scope and ownership

Measure peak, retained, and allocated bytes separately.
State whether memory includes the Rust allocator, Wasm linear memory, JS heap,
native dependencies, worker processes, GPU allocations, or only one component.
Track temporary copies and the owner that retains shared backing storage.
Measure before/after cleanup and across repeated work, not only at process exit.
Sampling resident memory can miss short peaks; allocator events can miss non-Rust memory.

Divan's allocator wrapper measures allocations during its timed scope and adds
measurement overhead. Its documentation excludes threads outside its control.
Do not present that count as whole-process memory or universal thread coverage.
Use separate runs when instrumentation changes the latency under investigation.

Valgrind-backed tools observe a modeled machine on supported native platforms.
The published AMD64 support list reaches AVX2; do not assume AVX-512, GPU kernels,
browser Wasm, or every host OS can be measured by the same tool.
Hardware counters need permission and target-specific interpretation.
Keep unsupported counters absent with a reason, not zero-valued as if measured.

## Inspect compilation as an experiment

Use Cargo timings first. Inspect generated assembly or Wasm for a concrete claim.
For small owned code, `rustc --emit=asm` can isolate an optimization question.
Preserve source, compiler, target, flags, and output files.
Do not derive instruction semantics from a token count alone.

The 2026-11-26 probe compiled a safe iterator-based ASCII-digit count with Rust
1.100.0. At `opt-level=3`, the generated x86-64 function contained SSE2 operations
and the `+simd128` Wasm function contained vector operations. At `opt-level=z`,
those functions used scalar loops. This observes generated code for that function;
it does not prove a speedup, every input's dispatch path, or other CPU behavior.

An optimization decision must include its full cost: runtime work, allocation,
peak retention, artifact size, compile/link time, portability, and maintenance.
Static dispatch can increase monomorphized code and build work. Dynamic dispatch
can reduce duplication while adding indirection. Measure the actual call pattern.
Do not add `inline(always)`, custom allocators, unsafe layout, or CPU-specific
instructions without an observed need and correctness evidence.

Primary sources, reviewed 2026-11-26:
[Cargo timings](https://doc.rust-lang.org/cargo/reference/timings.html),
[Cargo profiles](https://doc.rust-lang.org/cargo/reference/profiles.html),
[Divan AllocProfiler](https://docs.rs/divan/0.1.21/divan/struct.AllocProfiler.html),
[Valgrind platforms](https://valgrind.org/info/platforms.html),
[rustc emission](https://doc.rust-lang.org/rustc/command-line-arguments.html#--emit-specifies-the-types-of-output-files-to-generate).

Read the [dated fixtures and raw results](evidence-index.md) before reusing a research observation.
