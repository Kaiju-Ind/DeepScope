# Deliver the capability on every required host

Read this file for every Rust task. Read the repository's `AGENTS.md`, current
skills router, applicable original guides and product handbook before editing.
Use their owners and existing tasks. This skill supplements them with Rust rules.
User requirements and current repository facts outrank illustrative examples.

## Start with a decision and an early observation

Name the customer outcome, next decision, known evidence and consequential
unknowns. Extract supplied questions; investigate technical gaps yourself.
Ask only for a missing human choice that changes the intended outcome or scope.
Run the smallest useful direct probe before substantial solution implementation.
Use a function, existing executable or tiny fixture before adding infrastructure.

Alternate research and execution. For each 60 minutes of active research, spend
at least 10 minutes actively preparing, running or interpreting relevant probes.
Begin early. Count a cycle only when it includes execution or direct observation.
Do not count idle waits, pad solved questions or invent timing compliance.
Keep source claims, observed behavior, inference and blocked checks distinct.
This cadence is the user's operating rule, not an experimentally optimal ratio.

## Non-negotiable product rules

1. Every maintained Rust package and binary needs an explicit Wasm compilation
   and execution contract. Include internal workers, tools and maintained executable examples.
   Inventory actual Cargo targets; a folder name does not determine ownership.
2. Preserve the required operation on a declared Wasm host. A removed target,
   empty main, `Unsupported` result or remote call to the original native service
   does not establish a portable implementation. See [portability](portability.md).
3. Verify scalar/reference correctness before ranking accelerated paths. Keep
   safe fallback behavior and test tail lengths, alignment and relevant states.
4. State ownership, bounds and release points for buffers, views, handles,
   threads, futures and foreign resources. Enforce limits before growing memory.
5. Prefer a small dependency surface. A well-maintained, measured dependency
   can be safer and cheaper than a local reimplementation. Verify exact features,
   target support, source ownership, licenses and transitive build costs.
6. Use Cargo and Rust conventions for Rust-owned build logic. Keep CI as an
   orchestrator. Do not add a parallel JS/Python build implementation by habit.
7. Measure runtime cost, allocations, peak/retained memory, binary size and
   build cost when those costs affect the decision. No abstraction or SIMD label
   alone establishes a useful speed improvement.
8. Treat errors, partial output, cancellation and cleanup as public behavior.
   Preserve useful failure evidence and metadata according to data policy.
9. Apply Rust naming, rustfmt and rustdoc conventions. Do not translate TS-only
   casing, TSDoc or schema rules mechanically into Rust.
10. Report actual checks and remaining gaps. Build success does not prove runtime
    support; a component test does not prove the customer flow.

## Make the plan executable

Bind each item to verified files, symbols, owners, inputs, outputs, lifetimes,
failure paths, commands and expected evidence. Label proposed new files and APIs.
Trace consumers, feature sets, build inputs, package output and host adapters.
Recheck guidance when the task changes from review to edit or touches a new owner.
Do not silently expand review authority into fixes, publication or deployment.

After each useful result, share an anchor: dated observation, exact scope and
evidence, customer meaning, next decision and remaining question. A negative
result is useful when it rules out an option. An inconclusive timebox does not
close the original question. Use [continuity](continuity.md) before handoff.

## Completion contract

Run relevant tests, lint, builds, runtime checks and artifact inspection against
the exact revision and feature sets being delivered. Validate the extracted
archive or packaged crate when making delivery claims. A failed required host
gate blocks release; preserve the best recoverable state and name the gap.
Do not claim that prose, lint or a skill can guarantee future agent compliance.
Use executable gates plus explicit evidence and a resumable record.

Sources: the user's Rust and anchor-based product requirements; the repository's
current original guides; [Rust targets](https://doc.rust-lang.org/rustc/platform-support.html)
and [Cargo targets](https://doc.rust-lang.org/cargo/reference/cargo-targets.html).
