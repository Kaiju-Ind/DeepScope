# Rust capabilities that run on their declared hosts

Use this handbook for Rust packages, binaries, workers, bindings, tools, and
build mechanics in any project. It applies the anchor-based product method:
identify the next consequential question, run the smallest useful experiment,
and use the observation to choose the next action.

Skills: `rust-software`.

The [shared Rust guide](../../../.agents/guides/rust/README.md) owns the product
policy and evidence contract. The [Rust skill](../../../.agents/skills/rust-software/SKILL.md)
owns detailed implementation references. Read current repository instructions
and the relevant original guides before making their decisions.

Every maintained package and binary needs a functioning Wasm contract, including
internal tools. A successful build or a portable core cannot substitute for the
required operation. An impossible host capability remains a design conflict to
resolve, not an automatic exception. Native, browser, WASI, FFI, and GPU results
must retain their separate scopes.

| Part | Apply it to |
| --- | --- |
| [R01 Declare the complete Wasm contract](01-r01-declare-the-complete-wasm-contract.md) | Inventory artifacts and define equivalent operation on real hosts. |
| [R02 Answer the smallest Rust question](02-r02-answer-the-smallest-rust-question.md) | Alternate current research with direct, interpretable probes. |
| [R03 Preserve memory, stream and FFI correctness](03-r03-preserve-memory-stream-and-ffi-correctness.md) | Make ownership, limits, optimized output, and consumer behavior explicit. |
| [R04 Measure fast, complete builds and CI](04-r04-measure-fast-complete-builds-and-ci.md) | Reduce work without losing required targets, checks, or determinism. |
| [R05 Deliver and resume from verified evidence](05-r05-deliver-and-resume-from-verified-evidence.md) | Validate the actual artifact and preserve a complete continuation record. |
| [R06 Measure data-oriented design](06-r06-measure-data-oriented-design.md) | Compare access patterns, equal semantics, complete lifecycle costs and retention. |
| [T22 Rust product engineering](../tasks/22-t22-rust-product-engineering.md) | Start a copyable task with the same rules, skills, and stopping contract. |

Use [A01](../product/01-a01-start-from-the-product-question.md) for the product
method and the existing [active task record](../agents/01-ae01-maintain-the-active-task-record.md)
for state. These procedures do not require another planning system or a fixed
repository layout. Historical research and PR reviews remain dated evidence;
verify the current source and host before reusing their conclusions.
