# T22 Deliver a Rust product capability with verified portability

Use this prompt for Rust research, reviews, implementation, portability, memory,
performance, bindings, or build/CI work. Fill in the actual mode and outcome.

Skills: `rust-software`, `plan-changes`, `verify-behavior`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[AE01](../agents/01-ae01-maintain-the-active-task-record.md),
[R01](../rust/01-r01-declare-the-complete-wasm-contract.md),
[R02](../rust/02-r02-answer-the-smallest-rust-question.md),
[R03](../rust/03-r03-preserve-memory-stream-and-ffi-correctness.md),
[R04](../rust/04-r04-measure-fast-complete-builds-and-ci.md),
[R05](../rust/05-r05-deliver-and-resume-from-verified-evidence.md),
[R06](../rust/06-r06-measure-data-oriented-design.md).

```text
T22 Deliver a Rust product capability with verified portability

CONTEXT
- Repository/source: <owner/name>. Branch/full revision: <revision>. Mode: <research/review/implement>.
- Customer or operator outcome: <operation>. Known questions/evidence: <record>. Required hosts: <matrix or unknowns>.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Verify current source, instructions and dirty work. Use the existing task record.
- Carry forward user intent, constraints and authorization. Resolve technical gaps directly; ask only for a material missing human decision. Preserve paused-work constraints. Review does not authorize fixes, external messages, publication or deployment.

PRODUCT QUESTION AND EVIDENCE
- Follow A01 and .agents/guides/product/README.md. Use the generic profile unless current instructions select another.
- Before substantial implementation, state the outcome, decision, known evidence, consequential unknowns, alternatives and smallest useful probe. Identify immediate tests and named prerequisites separately.
- Research current primary sources, then test useful claims early with an existing executable, public API or tiny fixture. Keep the mechanism under study and remove unrelated setup; do not construct a general harness before it is needed.
- For each 60 minutes of active research, spend at least 10 minutes on relevant experimental preparation, execution, inspection or interpretation. A cycle requires execution or direct observation. Do not count idle waits, pad solved work or invent timing compliance. Preserve setup blockers and unanswered questions.
- Retain exact versions, inputs, features, host, commands, raw output, failures, timing and useful metadata. Report observations and product meaning separately from implementation activity.

SKILLS AND RULES
- Load `rust-software` (.agents/skills/rust-software/SKILL.md), including its mandatory contract and portability references.
- Load `plan-changes` (.agents/skills/plan-changes/SKILL.md) and `verify-behavior` (.agents/skills/verify-behavior/SKILL.md). Select additional owners only when their decisions are in scope.
- Read .agents/guides/rust/README.md, .agents/guides/rust/policy.md and .agents/guides/rust/evidence.md; use .agents/guides/rust/adoption.md when adopting. Keep current original guides authoritative.
- Follow A01 (docs/kaiju/product/01-a01-start-from-the-product-question.md).
- Follow AE01 (docs/kaiju/agents/01-ae01-maintain-the-active-task-record.md).
- Follow R01 (docs/kaiju/rust/01-r01-declare-the-complete-wasm-contract.md).
- Follow R02 (docs/kaiju/rust/02-r02-answer-the-smallest-rust-question.md).
- Follow R03 (docs/kaiju/rust/03-r03-preserve-memory-stream-and-ffi-correctness.md).
- Follow R04 (docs/kaiju/rust/04-r04-measure-fast-complete-builds-and-ci.md).
- Follow R05 (docs/kaiju/rust/05-r05-deliver-and-resume-from-verified-evidence.md).
- For data layout, allocation or ownership design, follow R06 (docs/kaiju/rust/06-r06-measure-data-oriented-design.md), .agents/guides/rust/data-oriented-design.md and the skill's data-oriented-design reference.

STEPS
1. Verify the real starting source and scope. For a PR, pin base/head SHAs and inspect the full affected Rust surfaces, callers, manifests, generated inputs, bindings, tests, docs and CI, including code outside the root workspace.
2. Inventory every maintained package and binary, including workers and tools. Record each required operation, native/Wasm host, target, feature set, imports, limits, errors, cleanup and acceptance test. An empty stub, skipped binary, Unsupported result, or remote call to the native implementation cannot satisfy the Wasm requirement.
3. Run the smallest authorized probe for the next consequential unknown. Keep documented support, compilation, artifact loading, direct behavior, adapter integration and customer-flow evidence separate. An impossible host capability stays blocked pending an implementation or product decision; do not exempt it.
4. Bind the plan to verified files, symbols, APIs, commands, owners, inputs, outputs, state/lifetime transitions, failure behavior and observable exits. Read the Rust topics needed for actual decisions. Label proposed files and unresolved bindings honestly.
5. In implementation mode, preserve safe idiomatic Rust, bounded memory, deliberate string/byte ownership and stream state. For data design, map fields/passes/lifetimes and isolate layout, ownership and allocator changes. Compare complete output, construction/query/release cost and post-request retention. Test scalar/SIMD equivalence, tails and splits before timing. Verify native dispatch, Wasm artifact selection and real FFI consumers. Keep expected errors, partial results and cleanup intact.
6. Use Cargo/Rust conventions for Rust-owned build work. Verify toolchain/Mise ownership, dependency features and actual native/Wasm support. Reduce CI work only after proving complete affected selection, shard coverage and cache invalidation. Measure build/runner costs and worktree contention when relevant.
7. Run checks appropriate to the authorized claim: format/lint, meaningful tests, builds, required host execution, consumer lifecycle and actual artifact inspection. Required unavailable or failing support rows remain open. A research/review result does not assert that an untested product is ready.
8. Review comments, docs, ownership, evidence and the full plan together. Preserve recoverable source and raw attempts. Report a dated anchor with scope, customer meaning, next decision and the next unanswered question.

DELIVERABLE
A source-bound result for the requested mode: question/decision record, complete operation/host matrix, findings or authorized changes, exact validation evidence, scoped measurements and remaining gaps.

EXIT
The requested claim has appropriate evidence and the next action is concrete. Required portable behavior has not been omitted or replaced with a stub. Unverified hosts, unresolved conflicts and incomplete checks are explicit; no broader completion or performance claim is implied.

STOPPING POINT
Preserve the full evolving plan, selected skills/references, source revision and dirty state, operation matrix, research, raw attempts, latest anchors, limitations, cleanup, exact stopping point and next safe command. State the observation that command should produce and the decision it will enable. Stop after the authorized task.
```
