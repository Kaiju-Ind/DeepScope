# Reuse the measured layout and Oxc results within their scope

Read this when a data-design decision relies on the 2026-11-26 follow-up.
Open the separate layout archive through [the evidence index](evidence-index.md)
before reusing a result. It contains exact source, locks, corpus provenance,
raw samples, failures, artifact identities, reviews and reproduction commands.
Apply [the procedure](data-oriented-design.md) to the current product question.

## What actually executed

Rust/Cargo 1.100.0 built Linux x86-64 and `wasm32-wasip1` artifacts. Node24.22.3
executed the Wasm commands. Timing windows excluded other agents' builds, but
the host remained shared. Hardware performance counters and RSS were not measured.

Published Oxc 0.160.0 identifies revision `87e38f3270b00341695e02e8aaf681e9e985e4a3`.
The earlier semantic-table source review used `58b07b7fe4d2213dacb737a059a93d0be6a0d3da`.
Keep those identities separate. Parsing enabled `regular_expression`; optional
allocator features were disabled. Actual parser and visitor APIs ran on both hosts.

All 13 observed syntax snapshots matched across hosts and arena policies. Seven
cases had independent selected-name/span expectations. Three complete Crawl
TypeScript files parsed without diagnostics. This was not name resolution or an
independent oracle for every AST field. Each malformed family returned a fatal
diagnostic and empty AST; retain source/errors rather than accepting empty content.

## The layout and access loop both affected the result

The source-derived fixture projects nine labels from one 223-byte table test.
It is not Crawl's existing DOM representation or production traffic. Larger
sets repeat these records; 100,000 and 1,048,576 are table-projection stress sizes.
All layouts preserve the same four `u32` fields. Text ownership is tested separately.

Second measurement phase at 16,384 records, candidate time divided by baseline:
the original comparisons repeat in fresh processes; zipped columns are a new
exploratory follow-up with one four-round process per host, not independently confirmed.

| Comparison | Native | WASI |
| --- | ---: | ---: |
| SoA / AoS, flags scan | 0.758 | 0.990 |
| Indexed SoA / AoS, whole-record output | 5.809 | 3.666 |
| Zipped SoA / AoS, whole-record output | 2.596 | 2.067 |
| SoA / AoS, random whole-record lookup | 7.809 | 3.714 |
| SoA / AoS, construct/query/drop | 1.401 | 2.158 |
| Boxed / contiguous, construct/query/drop | 8.538 | 5.882 |
| Spans / owned strings, construct/count/drop | 0.200 | 0.442 |
| Spans / owned strings, prebuilt label output | 1.489 | 1.170 |

Ratios summarize four balanced pairs; all raw samples and observed ranges remain.
They are descriptive, not confidence bounds. The WASI flag advantage did not
repeat clearly: primary 0.899, confirmation 0.990 with range 0.961–1.036.
Safe zipped traversal roughly halved the indexed column cost, yet row-shaped
output still favored rows here. Do not turn an access-API result into a SoA law.
The safe four-vector layout does not reproduce Oxc's single-allocation container.

## Fewer allocations did not imply lower latency or memory

One large Oxc parse followed by 100 small parses retained 2,097,088 usable arena
capacity bytes natively and 1,048,528 in WASI. Small parses used 10,496/7,428 bytes.
A tested 256 KiB discard policy retained 16,320/16,336 after the small sequence.
The threshold is an experiment parameter, not a production default.

Ten repeated large parses reduced allocation calls from 80 to 9 natively and
70 to 8 in WASI, but retained 4,194,240/2,097,104 capacity bytes and increased peak
requested bytes. Primary and confirmation did not establish a reliable parser
latency benefit. Preserve the distinction between these two request sequences.

A separate 8,192-record arena representation repeatedly completed faster than
flat owned records, while peak requested live bytes increased about 18.6% native
and 29.4% WASI. It changed record width/placement and lifetime strategy; it was
not an isolated allocator comparison or a replacement for Oxc's AST.

One four-byte label retained from a 1 MiB source kept 1,048,584 accounted heap
capacity bytes with source spans, versus 28 native/16 WASI with owned text.
These exclude container headers and allocator overhead. Copying a small result
can release a large owner; avoiding copies is not the complete memory objective.

Arena capacity excludes Oxc chunk footers. Used space includes padding and dead
arena allocations. Requested allocator bytes include footers, not system metadata.
None is RSS. Dropping an arena does not promise shrinking Wasm linear memory.

## Carry forward the decision, not an unqualified ranking

Use the evidence to select a small product prototype and its falsifying check.
Measure actual request distribution, full output, handoffs, concurrency and
retention before adoption. Windows/macOS/ARM, browsers, Component Model hosts,
Oxc semantic analysis and live Crawl requests were not exercised in this study.
The archive preserves 17,920 Criterion samples and 3,492 Oxc samples without trimming.

Primary mechanisms: [Oxc allocator](https://github.com/oxc-project/oxc/blob/87e38f3270b00341695e02e8aaf681e9e985e4a3/crates/oxc_allocator/src/allocator.rs),
[chunk accounting](https://github.com/oxc-project/oxc/blob/87e38f3270b00341695e02e8aaf681e9e985e4a3/crates/oxc_allocator/src/arena/chunks.rs),
[semantic tables](https://github.com/oxc-project/oxc/blob/58b07b7fe4d2213dacb737a059a93d0be6a0d3da/crates/oxc_semantic/src/scoping.rs).
