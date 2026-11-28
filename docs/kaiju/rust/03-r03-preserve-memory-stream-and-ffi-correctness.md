# R03 Preserve memory, stream and FFI correctness while optimizing

Begin with the required behavior and a clear safe Rust implementation. Read the
[Rust skill](../../../.agents/skills/rust-software/SKILL.md) topic that owns each
decision. Correct output and lifecycle come before a performance ranking.

## Give data an owner and a bounded lifetime

Name who owns each input/output buffer, borrowed slice, arena, view, handle,
callback, queued item, and asynchronous task. State when it can be mutated,
reused, or released. Reject configured limits before allocating or extending
buffers, and use checked arithmetic for lengths and absolute offsets.

Borrow text/bytes when the caller can keep the source alive. Move ownership
when retention is required. Measure copies and retained backing allocations:
keeping a small slice of a large input may retain more memory than copying it.
Use `Vec`, spans, columns, arenas, or reference counting because the access
pattern and lifecycle justify them, not because the representation sounds fast.

Read [memory](../../../.agents/skills/rust-software/references/memory.md) and
[strings](../../../.agents/skills/rust-software/references/strings.md). Keep
arbitrary bytes, UTF-8 text, source offsets, and OS strings distinct.

## Test complete stream and window semantics

A read chunk, logical record, rolling window, and SIMD block are different
units. Specify carried state, consumed offset, retained bytes, output order,
final partial input, and EOF. Cover short reads, split delimiters/characters,
malformed input, maximum size, cancellation, and buffer reuse.

For short fixtures, compare all partitions with a whole-input oracle. For large
inputs, preserve randomized seeds and include boundaries around block sizes.
Compare values, positions, order, duplicates, and errors. A length or checksum
alone can hide a changed answer. Read
[stream windows](../../../.agents/skills/rust-software/references/stream-windows.md).

## Optimize the cost that matters

Profile the representative operation. Compare ordinary optimized Rust before
adding manual SIMD, threads, custom containers, GPU transfers, or extra
abstractions. Measure runtime, allocation/retention, binary size, compilation,
and integration costs that affect the product decision.

Keep accelerated paths equivalent to an independent reference and preserve a
correct baseline. Verify native CPU dispatch and Wasm artifact feature
selection separately. Test tails, alignment, overflowing values and floating-
point semantics. Read [SIMD](../../../.agents/skills/rust-software/references/simd.md)
and [concurrency](../../../.agents/skills/rust-software/references/concurrency.md).

## Verify foreign consumers and unsafe obligations

Keep unsafe operations small, documented beside their invariants, and exercised
with checks suited to the failure. A raw pointer requires lifetime, allocation,
initialization, alignment, and aliasing proof as well as a numeric range.
Use [unsafe guidance](../../../.agents/skills/rust-software/references/unsafe.md).

Test C/C++/C# allocation ownership, release, encoding, callbacks, errors, and
panic policy through the actual consumer. Test Wasm views through memory growth
and reentrant allocation. A compiled header or generated binding is incomplete
evidence. Read [C ABI](../../../.agents/skills/rust-software/references/ffi-c.md)
and [Wasm bindings](../../../.agents/skills/rust-software/references/wasm-bindings.md).

The exit is equivalent behavior, a reviewable ownership story, and measured
costs with explicit host/workload limits. Unrun consumers remain unverified.
